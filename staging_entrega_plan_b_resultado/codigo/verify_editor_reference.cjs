/** Sólo lectura: evita compilar un cliente con una referencia distinta o desactualizada. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
function verify(root){
 const bytes=rel=>{const p=path.resolve(root,rel);if(path.relative(root,p).split(path.sep).includes('..'))throw Error('Ruta fuera del repositorio');return fs.readFileSync(p);};
 const server=bytes('docs/auditorias/REFERENCIA_CANONICA_TITULOS_CONTINUIDAD.json');
 const client=bytes('Web Studio Simple/src/data/canonicalReference.json');
 if(!server.equals(client))throw Error('Las referencias del auditor y del editor no son idénticas. No se modificó ninguna.');
 const ref=JSON.parse(server.toString('utf8'));
 if(ref.schema!=='estudiosimple.canonical-titles.v1'||!Array.isArray(ref.lessons)||!ref.lessons.length||!Array.isArray(ref.manifests))throw Error('Referencia no interpretable');
 const sha=rel=>crypto.createHash('sha256').update(bytes(rel)).digest('hex');
 for(const m of ref.manifests)if(sha(m.path)!==m.sha256)throw Error('Manifiesto cambiado: '+m.path);
 for(const l of ref.lessons)if(sha(l.source)!==l.sourceSha256)throw Error('Fuente cambiada: '+l.source);
 return {lessons:ref.lessons.length,unchanged:true};
}
module.exports={verify};
if(require.main===module){try{console.log('REFERENCIA_EDITOR_VERIFICADA',verify(path.resolve(__dirname,'..')));}catch(e){console.error('NO_VERIFICABLE:',e.message);process.exitCode=2;}}
