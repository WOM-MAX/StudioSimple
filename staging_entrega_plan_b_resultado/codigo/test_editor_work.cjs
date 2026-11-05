/** Pruebas de Work sobre los módulos y handlers REALES. No simula una sesión de navegador. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),test=require('node:test');
const ts=require(process.env.WORK_TYPESCRIPT||'typescript');
const root=process.env.WORK_EDITOR_ROOT||path.resolve(__dirname,'..');
const lib=path.join(root,'Web Studio Simple/src/lib'),editorFile=path.join(root,'Web Studio Simple/src/components/admin/cms/LessonEditorView.tsx');
const fixtureFile=path.join(__dirname,'fixtures/CNA_OA01_C02.json');
const original=JSON.parse(fs.readFileSync(fixtureFile,'utf8'));
const ref=JSON.parse(fs.readFileSync(path.join(root,'Web Studio Simple/src/data/canonicalReference.json'),'utf8'));
const clone=v=>JSON.parse(JSON.stringify(v));
function compile(source,name){const out=ts.transpileModule(source,{fileName:name,reportDiagnostics:true,compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.React}});assert.equal((out.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0);return out.outputText;}
function evalModule(file,imports,globals={}){const sandbox={exports:{},...globals};sandbox.require=n=>{if(Object.hasOwn(imports,n))return imports[n];throw Error('Import no proporcionado: '+n);};vm.createContext(sandbox);vm.runInContext(compile(fs.readFileSync(file,'utf8'),file),sandbox,{filename:file});return sandbox.exports;}
const validator=evalModule(path.join(lib,'lesson-canonical-validator.ts'),{'../data/canonicalReference.json':ref});
const selected={grade:'7° Básico',subject:'Ciencias Naturales',oaCode:'OA 1',lessonNumber:2};
function storage(){const data=new Map();return{data,failKey:null,getItem:k=>data.get(k)??null,setItem(k,v){if(this.failKey===k)throw Error('Fallo de almacenamiento de prueba');data.set(k,String(v));},removeItem:k=>data.delete(k)};}
function setup(){
 const localStorage=storage(),warnings=[];
 const mat={metadata:{grade:'7° Básico',subject:'Matemática',oaCode:'OA 1',lessonNumber:1},approvedSentinel:'NO_MODIFICAR'};
 const adapters=evalModule(path.join(lib,'lesson-adapter.ts'),{'./lesson-generator':{buildHookPromptText:()=>'',buildExplicativoPromptText:()=>''}});
 const factory={CNA:clone(original),MAT:clone(mat)};
 const repo=evalModule(path.join(lib,'lesson-repository.ts'),{'./lesson-canonical-validator':validator,'./lesson-adapter':adapters,'../data/lessons':factory},{window:{},localStorage,console:{warn:(...x)=>warnings.push(x),error:(...x)=>warnings.push(x),log(){}},fetch:async()=>({ok:false})});
 return{repo,localStorage,warnings,mat,adapters};
}
const savedKey='7_cie_oa1_2',playerKey='estudiosimple_custom_player_lessons';
function save(env,data){return env.repo.saveCustomPlayerLesson(selected.grade,selected.subject,selected.oaCode,2,data);}
function load(env){return env.repo.findInjectedLesson(selected.grade,selected.subject,selected.oaCode,2);}
const editorSource=fs.readFileSync(editorFile,'utf8'),editorAst=ts.createSourceFile(editorFile,editorSource,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
function initializer(name){let found;function visit(n){if(ts.isVariableDeclaration(n)&&n.name.getText(editorAst)===name)found=n.initializer;ts.forEachChild(n,visit);}visit(editorAst);assert.ok(found,'Handler ausente '+name);return found.getText(editorAst);}
function makeEditor(env,data=clone(original)){
 const shell=editorContext(env,data);
 for(const name of ['getEditorSelectionKey','persistEditorLesson','canLeaveCurrentLesson','loadLesson','handleSaveLesson','handleSwitchLesson','handleGradeChange','handleSubjectChange','handleOAChange','handlePersistCurrentVideo','handleTestInLivePlayer','handleDownloadPrompt']){
  vm.runInContext(compile(`globalThis.${name} = ${initializer(name)};`,name+'.tsx'),shell.ctx);
 }
 return shell;
}
function editorContext(env,data){
 const state={active:null,exported:null,status:null,error:null};
 const ctx={...env.repo,...validator,selectedGrade:selected.grade,selectedSubject:selected.subject,selectedLessonNum:2,currentOA:{oa:'OA 1',id:'CNA-OA01'},lessonData:data,lessonDataRef:{current:data},loadedLessonKeyRef:{current:null},activeStepId:'prep',totalLessons:6,
 setSaveStatus:x=>state.status=x,setValidationErrorMsg:x=>state.error=x,setValidationErrors:x=>state.details=x,setIsCustom:x=>state.isCustom=x,setLessonData:x=>state.loaded=x,setActiveSynchronizedLesson:x=>state.active=x,setViewMode:x=>state.view=x,
 setSelectedGrade:x=>state.selectedGrade=x,setSelectedSubject:x=>state.selectedSubject=x,setSelectedLessonNum:x=>state.selectedNum=x,setSelectedOAId:x=>state.selectedOA=x,
 setVideoSaveFeedback:x=>state.video=x,setTimeout:()=>{},useCallback:fn=>fn,window:{},localStorage:env.localStorage,sessionStorage:storage(),console:{warn(){},error(){}},downloadLessonPromptFile:x=>state.exported=x};
 vm.createContext(ctx);return{ctx,state};
}
test('Ciencias fuente válida, dos ideas y videos pendientes permitidos',()=>{const d=clone(original);d.hook.videoSrc='';d.formalization.videoSrc='';assert.equal(validator.validateLessonCanonical(d,selected).isValid,true);});
const mutations={
 'título ajeno':d=>d.metadata.lessonTitle='Álgebra', 'puente ajeno':d=>d.metadata.nextLessonTitle='Otra clase',
 'OA sin referencia':d=>d.metadata.oaCode='OA 99','curso ajeno':d=>d.metadata.courseId='110-8',
 'total incorrecto':d=>d.metadata.totalLessonsInOa=99,'asignatura ajena':d=>d.metadata.subject='Historia',
 'clase ajena':d=>d.metadata.lessonNumber=3,'metadata sin actividades':d=>{for(const k of Object.keys(d))if(k!=='metadata')delete d[k];},
 'preguntas vacías':d=>d.preQuestions=[], 'alternativa vacía':d=>d.mini[0].options[1]='',
 'clave vacía':d=>d.mini[0].correct='', 'clave ajena':d=>d.mini[0].correct='Z',
 'resumen vacío':d=>d.summaryIdeas=[], 'referencia ausente':d=>delete d.reference,
 'tarea abierta con alternativas inventadas':d=>d.recovery[0].options=['A','B','C','D'],
 'título sin tildes':d=>d.metadata.lessonTitle=d.metadata.lessonTitle.normalize('NFD').replace(/[\u0300-\u036f]/g,'')
};
for(const [name,mutate]of Object.entries(mutations))test('Rechaza '+name+' antes de escribir y cargar',()=>{
 const env=setup();assert.equal(save(env,clone(original)).ok,true);const before=[...env.localStorage.data];const d=clone(original);mutate(d);
 assert.equal(validator.validateLessonCanonical(d,selected).isValid,false);assert.equal(save(env,d).ok,false);assert.deepEqual([...env.localStorage.data],before);
 env.localStorage.setItem(playerKey,JSON.stringify({[savedKey]:d}));assert.equal(load(env).metadata.lessonTitle,original.metadata.lessonTitle);assert.ok(env.repo.getLastLessonLoadIssue());
});
test('Sin referencia es NO_VERIFICABLE, no un permiso implícito',()=>{const d=clone(original);d.metadata.oaCode='OA 99';assert.equal(validator.validateLessonCanonical(d).status,'NO_VERIFICABLE');});
test('Comparación admite sólo espacios inocuos y Unicode equivalente',()=>{const d=clone(original);d.metadata.lessonTitle=' '+d.metadata.lessonTitle.normalize('NFD')+'  ';assert.equal(validator.validateLessonCanonical(d,selected).isValid,true);});
test('Cierre de última clase incorrecto rechazado',()=>{const c=ref.lessons.find(l=>l.subject==='cie'&&l.lesson===6),d=clone(original);Object.assign(d.metadata,{lessonNumber:6,lessonTitle:c.title,nextLessonTitle:'Clase inventada'});assert.equal(validator.validateLessonCanonical(d).isValid,false);});
test('Edición válida se guarda, reabre y conserva todos los datos',()=>{const env=setup(),d=clone(original);d.prep.routeToday+=' PRUEBA_EDITOR_WORK';assert.equal(save(env,d).ok,true);assert.deepEqual(JSON.parse(JSON.stringify(load(env))),d);assert.equal(env.repo.isPlayerLessonCustomized(selected.grade,selected.subject,selected.oaCode,2),true);});
for(const key of [playerKey,'estudiosimple_custom_lessons','estudiosimple_injected_lessons'])test('Error en '+key+' conserva la última versión y no anuncia éxito',()=>{const env=setup();assert.equal(save(env,clone(original)).ok,true);const before=[...env.localStorage.data];env.localStorage.failKey=key;const d=clone(original);d.prep.routeToday+=' marca';const saved=save(env,d);assert.equal(saved.ok,false);assert.deepEqual([...env.localStorage.data],before);assert.equal(load(env).prep.routeToday,original.prep.routeToday);});
test('Matemática OA01 permanece exclusivamente de fábrica y no se escribe',()=>{const env=setup(),before=[...env.localStorage.data];const d=clone(env.mat);assert.equal(env.repo.saveCustomPlayerLesson('7° Básico','Matemática','OA 1',1,d).ok,false);assert.deepEqual([...env.localStorage.data],before);assert.equal(env.repo.findInjectedLesson('7° Básico','Matemática','OA 1',1).approvedSentinel,'NO_MODIFICAR');});
test('Guardar no sobrescribe paquetes de otros OAs todavía no inicializados',()=>{const env=setup();const other={oaId:'otro',curso:'8° Básico',asignatura:'Inglés',oaCodigo:'OA 9',lessons:[],isCustomized:true,totalLecciones:6};env.localStorage.setItem('estudiosimple_custom_lessons',JSON.stringify([other]));assert.equal(save(env,clone(original)).ok,true);assert.deepEqual(JSON.parse(env.localStorage.getItem('estudiosimple_custom_lessons'))[0],other);});
test('Datos de almacenamiento corruptos no se destruyen',()=>{const env=setup();env.localStorage.setItem(playerKey,'no JSON');const before=[...env.localStorage.data];assert.equal(save(env,clone(original)).ok,false);assert.deepEqual([...env.localStorage.data],before);assert.ok(load(env));assert.ok(env.repo.getLastLessonLoadIssue());});
test('Guardar legado no permite saltar la validación Player',()=>{const env=setup();assert.equal(env.repo.saveCustomLessonData(selected.grade,selected.subject,selected.oaCode,'CNA',{num:2,title:'inventada'},6).ok,false);assert.equal(env.localStorage.data.size,0);});
test('Handler real de carga conserva exactamente la lección, sin strategy ni focos inventados',()=>{const e=makeEditor(setup());e.ctx.loadLesson(true);assert.deepEqual(JSON.parse(JSON.stringify(e.state.loaded)),original);});
test('Handler real de carga rechaza datos esenciales ausentes sin fabricarlos',()=>{const env=setup();env.repo.findInjectedLesson=()=>({metadata:clone(original.metadata)});const e=makeEditor(env);e.ctx.loadLesson(true);assert.equal(e.state.loaded,null);assert.ok(e.state.error);});
test('Handler real de guardar/probar/exportar bloquea título ajeno y no escribe',()=>{const env=setup(),d=clone(original);d.metadata.lessonTitle='Ajeno';const e=makeEditor(env,d);assert.equal(e.ctx.handleSaveLesson(),false);e.ctx.handleTestInLivePlayer();e.ctx.handleDownloadPrompt();assert.equal(e.state.active,null);assert.equal(e.state.exported,null);assert.equal(env.localStorage.data.size,0);assert.ok(e.state.error);});
test('Handler real de probar detiene el aula cuando falla el almacenamiento',()=>{const env=setup();env.localStorage.failKey=playerKey;const e=makeEditor(env);e.ctx.handleTestInLivePlayer();assert.equal(e.state.active,null);assert.ok(e.state.error);assert.equal(e.state.status,null);});
test('Handlers reales: guardar, reabrir, probar y exportar conservan la marca y dos ideas',()=>{const env=setup(),d=clone(original);d.prep.routeToday+=' PRUEBA_EDITOR_WORK';const e=makeEditor(env,d);assert.equal(e.ctx.handleSaveLesson(),true);e.ctx.loadLesson(true);assert.equal(e.state.loaded.prep.routeToday,d.prep.routeToday);e.ctx.handleTestInLivePlayer();e.ctx.handleDownloadPrompt();assert.equal(e.state.active.prep.routeToday,d.prep.routeToday);assert.equal(e.state.exported.summaryIdeas.length,2);});
test('Cambio de asignatura no persiste una edición inválida ni abandona su revisión',()=>{const env=setup(),d=clone(original);d.metadata.nextLessonTitle='Ajeno';const e=makeEditor(env,d);e.ctx.handleSubjectChange('Historia');assert.equal(e.state.selectedSubject,undefined);assert.equal(env.localStorage.data.size,0);});
test('Todos los archivos modificados son TypeScript/TSX sintácticamente válidos',()=>{for(const p of [path.join(lib,'lesson-canonical-validator.ts'),path.join(lib,'lesson-repository.ts'),editorFile]){const sf=ts.createSourceFile(p,fs.readFileSync(p,'utf8'),ts.ScriptTarget.Latest,true,p.endsWith('.tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);assert.equal(sf.parseDiagnostics.length,0,p);}});
test('Matemática de otro curso no hereda la excepción de OA01 aprobado',()=>{const d=clone(original);Object.assign(d.metadata,{grade:'8° Básico',subject:'Matemática'});const r=validator.validateLessonCanonical(d);assert.equal(r.isProtectedOa,false);assert.equal(r.isValid,false);});
test('Ruta de acompañamiento mal formada no se acepta como estructura completa',()=>{const d=clone(original);d.route.blocks=[null];assert.equal(validator.validateLessonCanonical(d,selected).isValid,false);});
test('Inicialización no muta el objeto fuente congelado',()=>{const env=setup();const originalJson=JSON.stringify(original);makeEditor(env).ctx.loadLesson(true);assert.equal(JSON.stringify(original),originalJson);});
test('Handler audiovisual no muestra éxito si falla el guardado',()=>{const env=setup();env.localStorage.failKey=playerKey;const e=makeEditor(env);e.ctx.handlePersistCurrentVideo('hook');assert.equal(e.state.video,undefined);assert.ok(e.state.error);});
test('Exportar una lección no verificable no produce archivo',()=>{const d=clone(original);d.metadata.oaCode='OA 99';const e=makeEditor(setup(),d);e.ctx.handleDownloadPrompt();assert.equal(e.state.exported,null);assert.ok(e.state.error);});
test('Control de referencia del build: acepta misma versión y rechaza cambios sin reescribir',()=>{
 const os=require('node:os'),crypto=require('node:crypto');const base=fs.mkdtempSync(path.join(os.tmpdir(),'ref-work-'));
 const verifier=require(path.join(root,'scripts/verify_editor_reference.cjs'));const sha=v=>crypto.createHash('sha256').update(v).digest('hex');
 const put=(p,v)=>{fs.mkdirSync(path.dirname(path.join(base,p)),{recursive:true});fs.writeFileSync(path.join(base,p),v);};
 try{
  put('fuente.md','contenido');put('manifest.json','{}');const reference={schema:'estudiosimple.canonical-titles.v1',lessons:[{source:'fuente.md',sourceSha256:sha('contenido')}],manifests:[{path:'manifest.json',sha256:sha('{}')}]};
  const a='docs/auditorias/REFERENCIA_CANONICA_TITULOS_CONTINUIDAD.json',b='Web Studio Simple/src/data/canonicalReference.json';put(a,JSON.stringify(reference));put(b,JSON.stringify(reference));assert.equal(verifier.verify(base).unchanged,true);
  put('fuente.md','cambio');assert.throws(()=>verifier.verify(base),/Fuente cambiada/);put('fuente.md','contenido');
  put('manifest.json','cambio');assert.throws(()=>verifier.verify(base),/Manifiesto cambiado/);put('manifest.json','{}');
  put(b,JSON.stringify({...reference,lessons:[]}));assert.throws(()=>verifier.verify(base),/no son idénticas/);assert.equal(fs.readFileSync(path.join(base,a),'utf8'),JSON.stringify(reference));
 }finally{fs.rmSync(base,{recursive:true,force:true});}
});
