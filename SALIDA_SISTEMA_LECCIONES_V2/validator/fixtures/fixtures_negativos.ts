/**
 * fixtures_negativos.ts — Fixtures negativos para pruebas rigurosas del validador.
 */

import { CompleteLesson } from '../types';
import { FIXTURE_VALIDO } from './fixture_valido';

// 1. Error de Campos Protegidos (campo eliminado y campo no autorizado inyectado)
export const FIXTURE_CAMPOS_PROTEGIDOS_MUTADOS: any = {
  ...FIXTURE_VALIDO,
  subobjective: undefined, // Campo protegido eliminado
  campoInyectadoNoAutorizado: 'valor_prohibido' // Campo no autorizado agregado
};

// 2. Error de Etapas Incompletas (Falta etapa3_recorrido)
export const FIXTURE_ETAPAS_INCOMPLETAS: CompleteLesson = {
  ...FIXTURE_VALIDO,
  id: '110-7-CIE-OA01-ERR-ETAPAS',
  stages: {
    ...FIXTURE_VALIDO.stages,
    etapa3_recorrido: undefined as any
  }
};

// 3. Error en Conteo de Videos (Video Motivacional con 6 diapositivas en lugar de 7)
export const FIXTURE_VIDEOS_INCORRECTOS: CompleteLesson = {
  ...FIXTURE_VALIDO,
  id: '110-7-CIE-OA01-ERR-VIDEOS',
  stages: {
    ...FIXTURE_VALIDO.stages,
    etapa2_videoMotivacional: {
      ...FIXTURE_VALIDO.stages.etapa2_videoMotivacional,
      slides: FIXTURE_VALIDO.stages.etapa2_videoMotivacional.slides.slice(0, 6) // Solo 6 slides
    }
  }
};

// 4. Error en Miniquiz (2 preguntas en vez de 3, y pregunta 1 solo con opciones A, B, C)
export const FIXTURE_MINIQUIZ_INCORRECTO: CompleteLesson = {
  ...FIXTURE_VALIDO,
  id: '110-7-CIE-OA01-ERR-QUIZ',
  stages: {
    ...FIXTURE_VALIDO.stages,
    etapa7_miniquiz: {
      ...FIXTURE_VALIDO.stages.etapa7_miniquiz,
      questions: [
        {
          ...FIXTURE_VALIDO.stages.etapa7_miniquiz.questions[0],
          options: {
            A: 'Opción A',
            B: 'Opción B',
            C: 'Opción C'
          } as any // Falta opción D
        },
        FIXTURE_VALIDO.stages.etapa7_miniquiz.questions[1]
      ] // Solo 2 preguntas
    }
  }
};

// 5. Error en Cláusula Anti-Texto (Lámina 2 sin la cláusula obligatoria)
export const FIXTURE_SLIDE_SIN_ANTI_TEXT: CompleteLesson = {
  ...FIXTURE_VALIDO,
  id: '110-7-CIE-OA01-ERR-ANTITEXT',
  stages: {
    ...FIXTURE_VALIDO.stages,
    etapa2_videoMotivacional: {
      ...FIXTURE_VALIDO.stages.etapa2_videoMotivacional,
      slides: [
        FIXTURE_VALIDO.stages.etapa2_videoMotivacional.slides[0],
        {
          ...FIXTURE_VALIDO.stages.etapa2_videoMotivacional.slides[1],
          hasAntiTextClause: false,
          visualDescription: 'Tomás y Sofía en el patio escolar conversando alegremente.' // Sin la frase requerida
        },
        ...FIXTURE_VALIDO.stages.etapa2_videoMotivacional.slides.slice(2)
      ]
    }
  }
};
