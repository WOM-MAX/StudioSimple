/** Política canónica compartida por editor y repositorio; no fabrica contenido. */
import canonicalData from '../data/canonicalReference.json';
export interface LessonSelection { grade: string | number; subject: string; oaCode: string | number; lessonNumber: number; courseId?: string; }
export interface CanonicalValidationDetail { field: string; expected: string; found: string; }
export interface CanonicalValidationResult {
  isValid: boolean; status: 'VERIFICADO' | 'NO_VERIFICABLE' | 'FALLO_CORRESPONDENCIA' | 'PROTEGIDO_NO_INTERVENIDO';
  error?: string; details: CanonicalValidationDetail[]; canonicalEntry?: any; isProtectedOa?: boolean;
}
export const text = (v: unknown): string => String(v ?? '').normalize('NFC').replace(/\s+/g, ' ').trim();
export const key = (v: unknown): string => text(v).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export function subjectKey(v: unknown): string {
  const aliases: Record<string,string> = {mat:'mat',matematica:'mat',cna:'cie',cie:'cie',ciencias_naturales:'cie','ciencias naturales':'cie',his:'his',historia:'his',historia_geografia:'his','historia, geografia y ciencias sociales':'his',ing:'ing',ingles:'ing',english:'ing','idioma extranjero ingles':'ing',lyl:'len',len:'len',lengua:'len',lengua_literatura:'len','lengua y literatura':'len'};
  return aliases[key(v)] ?? '';
}
export function oaNumber(v: unknown): number { const m=text(v).match(/^OA\s*0*(\d+)$/i); return m?Number(m[1]):typeof v==='number'&&Number.isInteger(v)?v:0; }
export function gradeNumber(v: unknown): number { const m=text(v).match(/^(\d+)(?:\D|$)/); return m?Number(m[1]):0; }
const obj=(v:any): v is Record<string,any> => Boolean(v)&&typeof v==='object'&&!Array.isArray(v);
const filled=(v:any)=>typeof v==='string'&&text(v).length>0;
export function findCanonicalReferenceEntry(grade:string|number,subject:string,oa:string|number,lesson:number,courseId?:string) {
  const list=canonicalData.lessons.filter(x=>x.grade===gradeNumber(grade)&&x.subject===subjectKey(subject)&&x.oa===oaNumber(oa)&&x.lesson===lesson&&(!courseId||x.course===courseId));
  return list.length===1?list[0]:undefined;
}
export function validateLessonCanonical(lesson:any,selection?:LessonSelection):CanonicalValidationResult {
  const details:CanonicalValidationDetail[]=[];
  const add=(field:string,expected:unknown,found:unknown)=>details.push({field,expected:String(expected),found:found===undefined?'(ausente)':typeof found==='string'?found:JSON.stringify(found)});
  const result=(status:CanonicalValidationResult['status'],error?:string,canonicalEntry?:any):CanonicalValidationResult=>({isValid:status==='VERIFICADO'||status==='PROTEGIDO_NO_INTERVENIDO',status,error,details,canonicalEntry,isProtectedOa:status==='PROTEGIDO_NO_INTERVENIDO'});
  if(!obj(lesson)||!obj(lesson.metadata))return result('NO_VERIFICABLE','Faltan metadatos verificables.');
  if(canonicalData.schema!=='estudiosimple.canonical-titles.v1'||!Array.isArray(canonicalData.lessons))return result('NO_VERIFICABLE','Referencia canónica no compatible.');
  const m=lesson.metadata;
  const s=selection??{grade:m.grade,subject:m.subject,oaCode:m.oaCode,lessonNumber:m.lessonNumber,courseId:m.courseId};
  const g=gradeNumber(s.grade),sub=subjectKey(s.subject),oa=oaNumber(s.oaCode),num=s.lessonNumber;
  if(!g||!sub||!oa||!Number.isInteger(num)||num<1)return result('NO_VERIFICABLE','Identidad seleccionada incompleta o desconocida.');
  for(const [field,wanted,actual] of [['grade',g,gradeNumber(m.grade)],['subject',sub,subjectKey(m.subject)],['oaCode',oa,oaNumber(m.oaCode)],['lessonNumber',num,m.lessonNumber]] as Array<[string,unknown,unknown]>)if(wanted!==actual)add(field,wanted,actual);
  const protectedGroup=canonicalData.protected.find(p=>p.subject===sub&&p.oa===oa&&Number(p.course.match(/-(\d+)$/)?.[1])===g&&(!s.courseId||p.course===s.courseId));
  if(protectedGroup){
    if(m.courseId!==undefined&&m.courseId!==protectedGroup.course)add('courseId',protectedGroup.course,m.courseId);
    if(num>protectedGroup.total)add('lessonNumber',`1–${protectedGroup.total}`,num);
    if(details.length)return result('FALLO_CORRESPONDENCIA','Identidad contradictoria con el paquete protegido.');
    return result('PROTEGIDO_NO_INTERVENIDO');
  }
  const c=findCanonicalReferenceEntry(s.grade,s.subject,s.oaCode,num,s.courseId);
  if(!c)return result('NO_VERIFICABLE','No existe referencia única para esta selección. No se puede promover la edición.');
  if(m.courseId!==undefined&&m.courseId!==c.course)add('courseId',c.course,m.courseId);
  if(m.totalLessonsInOa!==c.total)add('totalLessonsInOa',c.total,m.totalLessonsInOa);
  if(typeof m.lessonTitle!=='string'||text(m.lessonTitle)!==text(c.title))add('lessonTitle',c.title,m.lessonTitle);
  if(typeof m.nextLessonTitle!=='string'||text(m.nextLessonTitle)!==text(c.nextTitle))add('nextLessonTitle',c.nextTitle,m.nextLessonTitle);
  for(const name of ['prep','route','situation','reference','hook','formalization'])if(!obj(lesson[name]))add(name,'Objeto requerido por LessonData',lesson[name]);
  for(const [parent,field] of [['prep','adultObjective'],['prep','routeToday'],['situation','dilePrompt'],['reference','question'],['reference','expectedAnswer']])if(!filled(lesson[parent]?.[field]))add(`${parent}.${field}`,'Texto no vacío',lesson[parent]?.[field]);
  if(!Array.isArray(lesson.route?.blocks)||!lesson.route.blocks.length||lesson.route.blocks.some((b:any)=>!obj(b)||!filled(b.title)||typeof b.id!=='string'))add('route.blocks','Bloques pedagógicos de la fuente',lesson.route?.blocks);
  if(!Array.isArray(lesson.situation?.options))add('situation.options','Opciones de acompañamiento de la fuente',lesson.situation?.options);
  for(const name of ['preQuestions','postQuestions','practice']){
    const list=lesson[name];
    if(!Array.isArray(list)||!list.length)add(name,'Actividades de la fuente, sin copiar otra etapa',list);
    else list.forEach((item:any,i:number)=>{if(!obj(item)||!filled(item.question)||!filled(item.expected))add(`${name}[${i}]`,'Consigna y respuesta privada',item);});
  }
  const optionsValid=(q:any)=>Array.isArray(q?.options)&&q.options.length===4&&q.options.every(filled)&&new Set(q.options).size===4&&filled(q.correct)&&(q.options.includes(q.correct)||/^[A-D]$/.test(q.correct));
  if(!Array.isArray(lesson.mini)||lesson.mini.length!==3)add('mini','Tres reactivos del contrato vigente',lesson.mini?.length);
  if(Array.isArray(lesson.mini))lesson.mini.forEach((q:any,i:number)=>{if(!filled(q?.q)||!optionsValid(q))add(`mini[${i}]`,'Enunciado, cuatro alternativas y clave válida',q);});
  if(!Array.isArray(lesson.summaryIdeas)||!lesson.summaryIdeas.length||lesson.summaryIdeas.some((p:any)=>!Array.isArray(p)||p.length!==2||!p.every(filled)))add('summaryIdeas','Ideas de la fuente en pares, sin exigir tres',lesson.summaryIdeas);
  if(!Array.isArray(lesson.recovery)||!lesson.recovery.length)add('recovery','Recuperación de la fuente',lesson.recovery);
  else lesson.recovery.forEach((q:any,i:number)=>{
    if(!filled(q?.q)||!filled(q?.correctText)||!filled(q?.fixText))add(`recovery[${i}]`,'Consigna, criterio privado y apoyo',q);
    if(q?.kind==='multiple_choice'&&!optionsValid(q))add(`recovery[${i}].options`,'Cuatro alternativas y clave de la fuente',q.options);
    if(['open_response','open_task'].includes(q?.kind)&&Array.isArray(q.options)&&q.options.length)add(`recovery[${i}].options`,'Sin alternativas artificiales en tarea abierta',q.options);
  });
  if(!filled(lesson.closure?.congratulations)&&!filled(lesson.paso8_cierre?.preguntaSintesis))add('closure','Cierre de la fuente',undefined);
  return details.length?result('FALLO_CORRESPONDENCIA','La edición no coincide con la referencia o faltan elementos esenciales.',c):result('VERIFICADO',undefined,c);
}
