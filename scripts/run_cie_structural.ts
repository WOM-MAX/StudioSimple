import { runFullAudit } from './audit_structural_rules';

const result = runFullAudit();
const cie = result.results.filter(r => r.identity?.includes('cie'));
console.log('=== CIE Structural Audit Results ===');
cie.forEach(c => {
  console.log(`Clase ${c.identity} (${c.file}):`);
  console.log(`  - status: ${c.status}`);
  console.log(`  - diffs: ${JSON.stringify(c.differences)}`);
  console.log(`  - technicalFailures: ${JSON.stringify(c.technicalFailures)}`);
  console.log(`  - pendingContent: ${JSON.stringify(c.pendingContent)}`);
  console.log(`  - notes: ${JSON.stringify(c.notes)}`);
  console.log(`  - counts: ${JSON.stringify(c.counts)}`);
  console.log('');
});
console.log(`Total CIE verified: ${cie.filter(c => c.status === 'VERIFICADO').length} / ${cie.length}`);
