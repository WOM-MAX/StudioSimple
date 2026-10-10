/**
 * validate_system.ts — Validador del Sistema Global de Lecciones v2.0
 */

import fs from 'fs';
import path from 'path';
import {
  RulesCatalog,
  CatalogRule,
  CompleteLesson,
  ValidationFinding,
  ValidationReport,
  Severity
} from './types';

export const OFFICIAL_STAGE_KEYS = [
  'etapa1_inicio',
  'etapa2_videoMotivacional',
  'etapa3_recorrido',
  'etapa4_videoExplicativo',
  'etapa5_practica',
  'etapa6_resumen',
  'etapa7_miniquiz',
  'etapa8_cierre'
] as const;

export const PROTECTED_METADATA_FIELDS = [
  'id',
  'grade',
  'subject',
  'oaCode',
  'classNumber',
  'subobjective',
  'officialSource',
  'governanceStatus',
  'stages'
] as const;

export class LessonSystemValidator {
  private catalog: RulesCatalog;
  private ruleMap: Map<string, CatalogRule> = new Map();

  constructor(catalogPath?: string) {
    const resolvedPath = catalogPath ?? path.resolve(__dirname, '..', 'Catalogo_de_reglas.json');
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`No se encontró el catálogo de reglas en: ${resolvedPath}`);
    }
    const rawData = fs.readFileSync(resolvedPath, 'utf-8');
    this.catalog = JSON.parse(rawData) as RulesCatalog;
    
    // Indexar reglas y verificar códigos únicos
    const seenIds = new Set<string>();
    for (const rule of this.catalog.rules) {
      if (seenIds.has(rule.id)) {
        throw new Error(`Código de regla duplicado en el catálogo: ${rule.id}`);
      }
      seenIds.add(rule.id);
      this.ruleMap.set(rule.id, rule);
    }
  }

  public getCatalog(): RulesCatalog {
    return this.catalog;
  }

  public getRuleCount(): number {
    return this.catalog.rules.length; // Cálculo dinámico exacto
  }

  public getRule(ruleId: string): CatalogRule | undefined {
    return this.ruleMap.get(ruleId);
  }

  /**
   * Crea un hallazgo derivando la severidad y nombre directamente del catálogo.
   * Rechaza severidades incompatibles con el catálogo.
   */
  public createFinding(
    ruleId: string,
    message: string,
    stage?: string,
    location?: string,
    assertedSeverity?: Severity
  ): ValidationFinding {
    const rule = this.ruleMap.get(ruleId);
    if (!rule) {
      throw new Error(`Regla no identificada en el catálogo: ${ruleId}`);
    }

    if (assertedSeverity && assertedSeverity !== rule.severity) {
      throw new Error(
        `Incompatibilidad de severidad para la regla ${ruleId}: el catálogo prescribe '${rule.severity}', pero se intentó declarar '${assertedSeverity}'.`
      );
    }

    return {
      ruleId: rule.id,
      ruleName: rule.name,
      severity: rule.severity,
      stage,
      message,
      location
    };
  }

  /**
   * Valida la integridad estructural de campos protegidos.
   */
  public validateProtectedFields(lessonObj: Record<string, unknown>): ValidationFinding[] {
    const findings: ValidationFinding[] = [];

    // 1. Detectar campos protegidos obligatorios ausentes
    for (const field of PROTECTED_METADATA_FIELDS) {
      if (!(field in lessonObj) || lessonObj[field] === undefined || lessonObj[field] === null) {
        findings.push(
          this.createFinding(
            'UNI-011',
            `Campo protegido obligatorio ausente o nulo: '${field}'.`,
            'Metadatos',
            `lesson.${field}`
          )
        );
      }
    }

    // 2. Detectar campos agregados no autorizados en la raíz
    for (const key of Object.keys(lessonObj)) {
      if (!PROTECTED_METADATA_FIELDS.includes(key as any)) {
        findings.push(
          this.createFinding(
            'UNI-011',
            `Campo no autorizado agregado a la estructura raíz de la lección: '${key}'.`,
            'Metadatos',
            `lesson.${key}`
          )
        );
      }
    }

    return findings;
  }

  /**
   * Ejecuta la validación integral e independiente de una lección real.
   */
  public validateLesson(lesson: CompleteLesson, targetName?: string): ValidationReport {
    const findings: ValidationFinding[] = [];
    const notes: string[] = [];

    // 1. Validación de campos protegidos
    findings.push(...this.validateProtectedFields(lesson as unknown as Record<string, unknown>));

    // 2. Validación de Fuente Oficial y Cita Canónica (UNI-014)
    if (!lesson.officialSource || !lesson.officialSource.document || !lesson.officialSource.pages) {
      findings.push(
        this.createFinding(
          'UNI-014',
          'La lección no incluye respaldo verificable de Texto Escolar MINEDUC o páginas de referencia.',
          'Metadatos',
          'lesson.officialSource'
        )
      );
    }

    // 3. Validación de las Ocho Etapas Obligatorias (UNI-001, UNI-011)
    const stages = lesson.stages as Record<string, unknown>;
    if (!stages) {
      findings.push(
        this.createFinding('UNI-011', 'La propiedad stages no está definida.', 'Estructura')
      );
      return this.buildReport(findings, notes, targetName ?? lesson.id);
    }

    for (const stageKey of OFFICIAL_STAGE_KEYS) {
      if (!(stageKey in stages) || !stages[stageKey]) {
        findings.push(
          this.createFinding(
            'UNI-011',
            `Falta la etapa obligatoria '${stageKey}' en la estructura de la clase.`,
            stageKey,
            `stages.${stageKey}`
          )
        );
      }
    }

    // 4. Validación de Videos Audiovisuales (7 + 7 diapositivas) (UNI-001, 7B-001)
    const motivacionalSlides = lesson.stages?.etapa2_videoMotivacional?.slides ?? [];
    if (motivacionalSlides.length !== 7) {
      findings.push(
        this.createFinding(
          '7B-001',
          `El Video Motivacional (Etapa 2) debe contener exactamente 7 diapositivas; contiene ${motivacionalSlides.length}.`,
          'etapa2_videoMotivacional',
          'slides.length'
        )
      );
    }

    const explicativoSlides = lesson.stages?.etapa4_videoExplicativo?.slides ?? [];
    if (explicativoSlides.length !== 7) {
      findings.push(
        this.createFinding(
          '7B-001',
          `El Video Explicativo (Etapa 4) debe contener exactamente 7 diapositivas; contiene ${explicativoSlides.length}.`,
          'etapa4_videoExplicativo',
          'slides.length'
        )
      );
    }

    // Validación independiente en cada diapositiva (UNI-004: Anti-texto en Arte IA)
    const allSlides = [
      ...motivacionalSlides.map((s, idx) => ({ ...s, stage: 'etapa2_videoMotivacional', idx: idx + 1 })),
      ...explicativoSlides.map((s, idx) => ({ ...s, stage: 'etapa4_videoExplicativo', idx: idx + 1 }))
    ];

    for (const slide of allSlides) {
      if (!slide.hasAntiTextClause && !slide.visualDescription?.toLowerCase().includes('no text drawn by ai')) {
        findings.push(
          this.createFinding(
            'UNI-004',
            `La diapositiva ${slide.number} de ${slide.stage} carece de la cláusula obligatoria 'No text drawn by AI'.`,
            slide.stage,
            `slide[${slide.idx}].visualDescription`
          )
        );
      }
    }

    // 5. Validación de Etapa 3: Recorrido independiente (UNI-009, UNI-011)
    const inquiryQuestions = lesson.stages?.etapa3_recorrido?.inquiryQuestions ?? [];
    if (inquiryQuestions.length === 0) {
      findings.push(
        this.createFinding(
          'UNI-011',
          'La etapa Recorrido debe contener preguntas de indagación guiada.',
          'etapa3_recorrido',
          'inquiryQuestions'
        )
      );
    }

    // 6. Validación de Etapa 5: Práctica con Cuaderno Físico (UNI-008, UNI-005)
    const exercises = lesson.stages?.etapa5_practica?.exercises ?? [];
    if (exercises.length === 0) {
      findings.push(
        this.createFinding(
          'UNI-011',
          'La etapa Práctica debe contener al menos un ejercicio aplicado.',
          'etapa5_practica',
          'exercises'
        )
      );
    } else {
      const hasNotebookExercise = exercises.some((e) => e.notebookRequired);
      if (!hasNotebookExercise) {
        findings.push(
          this.createFinding(
            'UNI-008',
            'La etapa Práctica debe articular trabajo explícito en cuaderno físico.',
            'etapa5_practica',
            'exercises.notebookRequired'
          )
        );
      }
    }

    // 7. Validación de Etapa 7: Miniquiz (UNI-006, 7B-003)
    const quizQuestions = lesson.stages?.etapa7_miniquiz?.questions ?? [];
    if (quizQuestions.length !== 3) {
      findings.push(
        this.createFinding(
          'UNI-006',
          `El Miniquiz debe contener exactamente 3 preguntas formales; contiene ${quizQuestions.length}.`,
          'etapa7_miniquiz',
          'questions.length'
        )
      );
    }

    // Validación independiente de 4 alternativas (A-D) en cada reactivo presente (7B-003)
    for (let i = 0; i < quizQuestions.length; i++) {
      const q = quizQuestions[i];
      const options = q.options ? Object.keys(q.options) : [];
      if (options.length !== 4 || !['A', 'B', 'C', 'D'].every((opt) => options.includes(opt))) {
        findings.push(
          this.createFinding(
            '7B-003',
            `La pregunta ${i + 1} del Miniquiz debe tener exactamente 4 opciones (A, B, C, D).`,
            'etapa7_miniquiz',
            `questions[${i}].options`
          )
        );
      }
    }

    // Bucle de recuperación en Miniquiz
    const remediation = lesson.stages?.etapa7_miniquiz?.remediationLoop;
    if (!remediation || remediation.thresholdPassing !== 2 || !remediation.remedialPracticeItem) {
      findings.push(
        this.createFinding(
          'UNI-006',
          'El Miniquiz debe incluir bucle de recuperación formativa no punitiva con umbral de 2 aciertos.',
          'etapa7_miniquiz',
          'remediationLoop'
        )
      );
    }

    // 8. Validación de Guía del Adulto Mentor (UNI-011)
    const adultGuideStages: Array<keyof LessonStages> = [
      'etapa1_inicio',
      'etapa3_recorrido',
      'etapa5_practica',
      'etapa6_resumen',
      'etapa8_cierre'
    ];

    for (const stg of adultGuideStages) {
      const stageObj = lesson.stages?.[stg] as { adultGuide?: Record<string, string> };
      if (!stageObj?.adultGuide || !stageObj.adultGuide.dile || !stageObj.adultGuide.espera) {
        findings.push(
          this.createFinding(
            'UNI-011',
            `La etapa '${stg}' carece de guía estructurada para el adulto responsable ('DILE', 'ESPERA').`,
            stg,
            `stages.${stg}.adultGuide`
          )
        );
      }
    }

    return this.buildReport(findings, notes, targetName ?? lesson.id);
  }

  private buildReport(
    findings: ValidationFinding[],
    notes: string[],
    targetName: string
  ): ValidationReport {
    const summary = {
      critico: findings.filter((f) => f.severity === 'critico').length,
      mayor: findings.filter((f) => f.severity === 'mayor').length,
      menor: findings.filter((f) => f.severity === 'menor').length
    };

    // Criterio de aprobación: 0 críticos, 0 mayores, hasta 3 menores
    const isApproved = summary.critico === 0 && summary.mayor === 0 && summary.menor <= 3;

    return {
      timestamp: new Date().toISOString(),
      target: targetName,
      catalogVersion: this.catalog.version,
      totalCatalogRules: this.getRuleCount(),
      findings,
      summary,
      isApproved,
      notes
    };
  }
}
