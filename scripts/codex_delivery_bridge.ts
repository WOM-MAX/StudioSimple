import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execSync } from 'child_process';

export interface ManifestData {
  [fileName: string]: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  manifest?: ManifestData;
  filesVerified: string[];
}

export interface BridgeConfig {
  inboxDir: string;
  targetDir: string;
  archiveDir?: string;
  deliveryPrefix: string;
  protectedPatterns: string[];
}

export const DEFAULT_CONFIG: BridgeConfig = {
  inboxDir: path.resolve('INBOX_CODEX_PLANES'),
  targetDir: path.resolve('PLANES MAESTROS PRESENTACIONES'),
  deliveryPrefix: 'Planes_Maestros_EstudioSimple_7B_Coherencia_',
  protectedPatterns: [
    'Paquete_Maestro_EstudioSimple_7B',
    '04_PLANES_OA_Y_PROMPTS',
    '*.pptx',
    '*.mp4',
    '*.mov'
  ]
};

export function computeSha256(filePath: string): string {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

export function validatePackageFolder(folderPath: string): ValidationResult {
  const result: ValidationResult = {
    valid: false,
    errors: [],
    filesVerified: []
  };

  if (!fs.existsSync(folderPath)) {
    result.errors.push(`Directorio no existe: ${folderPath}`);
    return result;
  }

  const files = fs.readdirSync(folderPath);
  const manifestFileName = files.find((f) => f.startsWith('MANIFIESTO_SHA256_') && f.endsWith('.json'));

  if (!manifestFileName) {
    result.errors.push(`No se encontró archivo de manifiesto (MANIFIESTO_SHA256_AAAA-MM-DD.json) en ${folderPath}`);
    return result;
  }

  const manifestPath = path.join(folderPath, manifestFileName);
  let manifest: ManifestData;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    result.manifest = manifest;
  } catch (err: any) {
    result.errors.push(`Error al parsear el manifiesto JSON: ${err.message}`);
    return result;
  }

  const manifestKeys = Object.keys(manifest);
  if (manifestKeys.length === 0) {
    result.errors.push('El manifiesto no contiene archivos registrados.');
    return result;
  }

  for (const fileName of manifestKeys) {
    const expectedHash = manifest[fileName].trim().toLowerCase();
    const targetFilePath = path.join(folderPath, fileName);

    if (!fs.existsSync(targetFilePath)) {
      result.errors.push(`Archivo declarado en manifiesto no existe en el paquete: ${fileName}`);
      continue;
    }

    const actualHash = computeSha256(targetFilePath).toLowerCase();
    if (actualHash !== expectedHash) {
      result.errors.push(`Discrepancia de hash SHA256 en ${fileName}. Esperado: ${expectedHash}, Calculado: ${actualHash}`);
    } else {
      result.filesVerified.push(fileName);
    }
  }

  result.valid = result.errors.length === 0;
  return result;
}

export function extractZipToFolder(zipPath: string, extractDir: string): boolean {
  if (fs.existsSync(extractDir)) {
    fs.rmSync(extractDir, { recursive: true, force: true });
  }
  fs.mkdirSync(extractDir, { recursive: true });

  try {
    // Uso de tar nativo de Windows (bsdtar)
    execSync(`tar -xf "${zipPath}" -C "${extractDir}"`, { stdio: 'pipe' });
    return true;
  } catch (err: any) {
    // Alternativa con PowerShell Expand-Archive si tar falla
    try {
      execSync(`powershell -NoProfile -Command "Expand-Archive -LiteralPath '${zipPath}' -DestinationPath '${extractDir}' -Force"`, { stdio: 'pipe' });
      return true;
    } catch (fallbackErr: any) {
      return false;
    }
  }
}

export function isProtectedPath(itemPath: string, config: BridgeConfig): boolean {
  const base = path.basename(itemPath);
  for (const pat of config.protectedPatterns) {
    if (pat.startsWith('*.') && base.endsWith(pat.substring(1))) {
      return true;
    }
    if (base === pat || base.startsWith(pat)) {
      return true;
    }
  }
  return false;
}

export function deployDelivery(
  sourceDeliveryDir: string,
  deliveryFolderName: string,
  config: BridgeConfig = DEFAULT_CONFIG
): { success: boolean; replacedFolders: string[]; targetPath: string; error?: string } {
  const finalDestPath = path.join(config.targetDir, deliveryFolderName);

  // 1. Validar integridad antes de tocar el destino
  const validation = validatePackageFolder(sourceDeliveryDir);
  if (!validation.valid) {
    return {
      success: false,
      replacedFolders: [],
      targetPath: finalDestPath,
      error: `Validación fallida: ${validation.errors.join('; ')}`
    };
  }

  // 2. Garantizar que existe el directorio de destino principal
  if (!fs.existsSync(config.targetDir)) {
    fs.mkdirSync(config.targetDir, { recursive: true });
  }

  // 3. Identificar versiones anteriores generadas por este mismo flujo
  const existingItems = fs.readdirSync(config.targetDir);
  const replacedFolders: string[] = [];

  for (const item of existingItems) {
    const itemFullPath = path.join(config.targetDir, item);
    const stat = fs.statSync(itemFullPath);

    if (stat.isDirectory()) {
      // Proteger carpetas protegidas
      if (isProtectedPath(itemFullPath, config)) {
        continue;
      }

      // Si coincide con el prefijo de entregas de este flujo pero no es la carpeta exacta que vamos a copiar
      if (item.startsWith(config.deliveryPrefix) && item !== deliveryFolderName) {
        replacedFolders.push(item);
      }
    }
  }

  // 4. Copiar los archivos validados a la nueva ubicación
  if (fs.existsSync(finalDestPath)) {
    fs.rmSync(finalDestPath, { recursive: true, force: true });
  }
  fs.mkdirSync(finalDestPath, { recursive: true });

  const packageFiles = fs.readdirSync(sourceDeliveryDir);
  for (const file of packageFiles) {
    const srcFile = path.join(sourceDeliveryDir, file);
    const destFile = path.join(finalDestPath, file);
    fs.copyFileSync(srcFile, destFile);
  }

  // 5. Eliminar estrictamente las versiones anteriores reemplazadas
  for (const oldFolder of replacedFolders) {
    const oldPath = path.join(config.targetDir, oldFolder);
    console.log(`[Puente] Eliminando versión anterior reemplazada: ${oldFolder}`);
    fs.rmSync(oldPath, { recursive: true, force: true });
  }

  return {
    success: true,
    replacedFolders,
    targetPath: finalDestPath
  };
}

export function processInbox(config: BridgeConfig = DEFAULT_CONFIG): {
  processed: number;
  rejected: number;
  results: Array<{ item: string; status: 'SUCCESS' | 'REJECTED'; reason?: string; targetPath?: string }>;
} {
  const summary: ReturnType<typeof processInbox> = {
    processed: 0,
    rejected: 0,
    results: []
  };

  if (!fs.existsSync(config.inboxDir)) {
    fs.mkdirSync(config.inboxDir, { recursive: true });
    return summary;
  }

  const items = fs.readdirSync(config.inboxDir);
  const tempExtractBase = path.join(config.inboxDir, '.temp_validation');

  for (const item of items) {
    if (item.startsWith('.') || item === '.temp_validation') continue;

    const itemPath = path.join(config.inboxDir, item);
    const stat = fs.statSync(itemPath);

    if (stat.isFile() && item.endsWith('.zip')) {
      const folderNameWithoutZip = path.basename(item, '.zip');
      const extractTarget = path.join(tempExtractBase, folderNameWithoutZip);

      const extractOk = extractZipToFolder(itemPath, extractTarget);
      if (!extractOk) {
        summary.rejected++;
        summary.results.push({ item, status: 'REJECTED', reason: 'Error al descomprimir archivo ZIP' });
        continue;
      }

      // Buscar si el ZIP contenía una subcarpeta interna o los archivos en la raíz
      let payloadDir = extractTarget;
      const subEntries = fs.readdirSync(extractTarget);
      if (subEntries.length === 1 && fs.statSync(path.join(extractTarget, subEntries[0])).isDirectory()) {
        payloadDir = path.join(extractTarget, subEntries[0]);
      }

      const deployResult = deployDelivery(payloadDir, folderNameWithoutZip, config);
      if (deployResult.success) {
        summary.processed++;
        summary.results.push({
          item,
          status: 'SUCCESS',
          targetPath: deployResult.targetPath
        });
        // Eliminar ZIP del inbox tras despliegue exitoso
        fs.rmSync(itemPath, { force: true });
      } else {
        summary.rejected++;
        summary.results.push({
          item,
          status: 'REJECTED',
          reason: deployResult.error
        });
      }

      // Limpiar temporal
      if (fs.existsSync(tempExtractBase)) {
        fs.rmSync(tempExtractBase, { recursive: true, force: true });
      }
    } else if (stat.isDirectory()) {
      const deployResult = deployDelivery(itemPath, item, config);
      if (deployResult.success) {
        summary.processed++;
        summary.results.push({
          item,
          status: 'SUCCESS',
          targetPath: deployResult.targetPath
        });
        // Eliminar carpeta del inbox tras despliegue exitoso
        fs.rmSync(itemPath, { recursive: true, force: true });
      } else {
        summary.rejected++;
        summary.results.push({
          item,
          status: 'REJECTED',
          reason: deployResult.error
        });
      }
    }
  }

  return summary;
}

export function runSelfTest(): { success: boolean; steps: string[]; errors: string[] } {
  const steps: string[] = [];
  const errors: string[] = [];
  const testRoot = path.resolve('test_codex_bridge_sandbox');
  const testInbox = path.join(testRoot, 'inbox');
  const testTarget = path.join(testRoot, 'target');

  const testConfig: BridgeConfig = {
    inboxDir: testInbox,
    targetDir: testTarget,
    deliveryPrefix: 'Planes_Maestros_EstudioSimple_7B_Coherencia_',
    protectedPatterns: [
      'Paquete_Maestro_EstudioSimple_7B',
      '04_PLANES_OA_Y_PROMPTS',
      '*.pptx',
      '*.mp4'
    ]
  };

  try {
    steps.push('1. Inicializar sandbox de pruebas aislado');
    if (fs.existsSync(testRoot)) {
      fs.rmSync(testRoot, { recursive: true, force: true });
    }
    fs.mkdirSync(testInbox, { recursive: true });
    fs.mkdirSync(testTarget, { recursive: true });

    // Crear archivos y carpetas protegidas en destino
    const protectedDir = path.join(testTarget, 'Paquete_Maestro_EstudioSimple_7B', '04_PLANES_OA_Y_PROMPTS');
    fs.mkdirSync(protectedDir, { recursive: true });
    fs.writeFileSync(path.join(protectedDir, 'Planes_Fuente_Inalterables.docx'), 'CONTENIDO_FUENTE_PROTEGIDO');
    fs.writeFileSync(path.join(testTarget, 'video_clase.mp4'), 'VIDEO_BINARIO_SIMULADO');
    fs.writeFileSync(path.join(testTarget, 'presentacion_master.pptx'), 'PRESENTACION_SIMULADA');

    // Crear versión previa de entrega simulada
    const oldDeliveryDir = path.join(testTarget, 'Planes_Maestros_EstudioSimple_7B_Coherencia_2026-10-01_v1');
    fs.mkdirSync(oldDeliveryDir, { recursive: true });
    fs.writeFileSync(path.join(oldDeliveryDir, 'Plan_Anterior.docx'), 'VERSION_OBSOLETA');

    steps.push('2. Crear entrega válida de prueba con manifiesto SHA256');
    const validPkgName = 'Planes_Maestros_EstudioSimple_7B_Coherencia_2026-10-03_v1';
    const validPkgDir = path.join(testInbox, validPkgName);
    fs.mkdirSync(validPkgDir, { recursive: true });

    const doc1Name = 'Plan_Maestro_Matematica_7B_v1.docx';
    const doc2Name = 'Plan_Maestro_Ciencias_7B_v1.docx';
    fs.writeFileSync(path.join(validPkgDir, doc1Name), 'CONTENIDO_VALIDO_MATEMATICA_123');
    fs.writeFileSync(path.join(validPkgDir, doc2Name), 'CONTENIDO_VALIDO_CIENCIAS_456');

    const manifestData: ManifestData = {
      [doc1Name]: computeSha256(path.join(validPkgDir, doc1Name)),
      [doc2Name]: computeSha256(path.join(validPkgDir, doc2Name))
    };
    fs.writeFileSync(
      path.join(validPkgDir, 'MANIFIESTO_SHA256_2026-10-03.json'),
      JSON.stringify(manifestData, null, 2)
    );

    // Empaquetar en ZIP en el inbox
    const validZipPath = path.join(testInbox, `${validPkgName}.zip`);
    execSync(`tar -a -cf "${validZipPath}" -C "${testInbox}" "${validPkgName}"`, { stdio: 'pipe' });
    fs.rmSync(validPkgDir, { recursive: true, force: true }); // Dejar solo el ZIP en inbox

    steps.push('3. Ejecutar procesamiento de entrega válida');
    const result1 = processInbox(testConfig);
    if (result1.processed !== 1 || result1.rejected !== 0) {
      errors.push(`Entrega válida no fue procesada correctamente: ${JSON.stringify(result1)}`);
    }

    const deployedValidDir = path.join(testTarget, validPkgName);
    if (!fs.existsSync(deployedValidDir)) {
      errors.push(`Directorio desplegado no existe en destino: ${deployedValidDir}`);
    }

    // Verificar que la versión anterior fue eliminada
    if (fs.existsSync(oldDeliveryDir)) {
      errors.push(`La versión anterior no fue eliminada tras el reemplazo exitoso: ${oldDeliveryDir}`);
    }

    // Verificar que los archivos protegidos no fueron alterados
    if (!fs.existsSync(path.join(protectedDir, 'Planes_Fuente_Inalterables.docx'))) {
      errors.push('CRÍTICO: El archivo fuente protegido fue eliminado o modificado.');
    }
    if (!fs.existsSync(path.join(testTarget, 'video_clase.mp4'))) {
      errors.push('CRÍTICO: El video protegido fue eliminado.');
    }
    if (!fs.existsSync(path.join(testTarget, 'presentacion_master.pptx'))) {
      errors.push('CRÍTICO: La presentación protegida fue eliminada.');
    }

    steps.push('4. Probar entrega corrupta (hash modificado/tampered)');
    const corruptPkgName = 'Planes_Maestros_EstudioSimple_7B_Coherencia_2026-10-04_v1';
    const corruptPkgDir = path.join(testInbox, corruptPkgName);
    fs.mkdirSync(corruptPkgDir, { recursive: true });

    fs.writeFileSync(path.join(corruptPkgDir, doc1Name), 'CONTENIDO_CORRUPTO_INCORRECTO');
    fs.writeFileSync(
      path.join(corruptPkgDir, 'MANIFIESTO_SHA256_2026-10-04.json'),
      JSON.stringify(
        {
          [doc1Name]: 'hash_falso_que_no_coincide_00000000000000000000000000000000'
        },
        null,
        2
      )
    );

    const corruptZipPath = path.join(testInbox, `${corruptPkgName}.zip`);
    execSync(`tar -a -cf "${corruptZipPath}" -C "${testInbox}" "${corruptPkgName}"`, { stdio: 'pipe' });
    fs.rmSync(corruptPkgDir, { recursive: true, force: true });

    const result2 = processInbox(testConfig);
    if (result2.rejected !== 1) {
      errors.push('La entrega corrupta no fue rechazada como correspondía.');
    }

    // Verificar que la versión previa (2026-10-03_v1) se conservó intacta
    if (!fs.existsSync(deployedValidDir)) {
      errors.push('La versión anterior válida fue destruida al fallar la entrega corrupta.');
    }

    steps.push('5. Limpieza de sandbox de prueba');
    fs.rmSync(testRoot, { recursive: true, force: true });

    return {
      success: errors.length === 0,
      steps,
      errors
    };
  } catch (err: any) {
    errors.push(`Excepción no controlada durante las pruebas: ${err.message}`);
    if (fs.existsSync(testRoot)) {
      fs.rmSync(testRoot, { recursive: true, force: true });
    }
    return {
      success: false,
      steps,
      errors
    };
  }
}

// Ejecución CLI directa
if (process.argv.includes('--test')) {
  console.log('Iniciando batería de pruebas unitarias y de integración del puente...');
  const testRes = runSelfTest();
  console.log('\n--- PASOS EJECUTADOS ---');
  testRes.steps.forEach((s) => console.log(`✓ ${s}`));

  if (testRes.success) {
    console.log('\n✅ RESULTADO: Todas las pruebas de validación, desempaquetado, reemplazo y protección pasaron con éxito (0 fallos).');
    process.exit(0);
  } else {
    console.error('\n❌ RESULTADO: Se detectaron fallos durante las pruebas:');
    testRes.errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }
}

if (process.argv.includes('--process')) {
  console.log('Procesando buzón de entrada de entregas...');
  const res = processInbox();
  console.log(`Procesados con éxito: ${res.processed}, Rechazados: ${res.rejected}`);
  res.results.forEach((r) => console.log(`- [${r.status}] ${r.item} ${r.reason || `-> ${r.targetPath}`}`));
}
