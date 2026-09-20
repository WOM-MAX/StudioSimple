"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Banknote, BookOpen, Building2, Check, CircleHelp, ExternalLink, FastForward, Home as HomeIcon, Info, KeyRound, LogOut, Monitor, Pause, Play, RefreshCcw, Rewind, RotateCcw, Send, Shield, Sparkles, Thermometer, UserRound, UsersRound, Volume2, VolumeX, Waves } from "lucide-react";

type Mode="split"|"adult"|"student";
type Stage="landing"|"cover"|"prep"|"routeOverview"|"routeToday"|"thermo"|"thermoMeaning"|"hook"|"conversationIntro"|"preQuestions"|"formalization"|"postIntro"|"postQuestions"|"summary"|"practiceIntro"|"practice"|"reasoningIntro"|"reasoning"|"challenge"|"strategy"|"practiceSummary"|"miniquiz"|"results"|"review"|"recoveryIntro"|"recovery"|"closing"|"catalog";
type Feedback={kind:"support"|"success"|"reveal";text:string}|null;
type Session={stage:Stage;feedback:Feedback;attempt:number;conversationIndex:number;postIndex:number;practiceIndex:number;summaryIdea:number;quizVisible:boolean;hookStarted:boolean;hookEnded:boolean;formalStarted:boolean;formalEnded:boolean;video:{kind:"hook"|"formal"|null;playing:boolean;seek:number;command:number};miniAnswers:string[];miniScore:number;reviewQueue:number[];reviewIndex:number;recoveryItems:number[];recoveryIndex:number;recoveryVisible:boolean;recoveryAnswer:string;supportCount:number;reasoningIndependent:boolean;challengeCompleted:boolean};
type Updater=(change:Partial<Session>|((s:Session)=>Session))=>void;
type GuidedItem={context:string;question:string;expected:string;success:string;support:string;reveal:string;studentReveal:string};
type SyncStatus="local"|"connecting"|"connected"|"offline"|"error";
type SessionEnvelope={code:string;state:Session;revision:number};

const initial:Session={stage:"landing",feedback:null,attempt:0,conversationIndex:0,postIndex:0,practiceIndex:0,summaryIdea:0,quizVisible:false,hookStarted:false,hookEnded:false,formalStarted:false,formalEnded:false,video:{kind:null,playing:false,seek:0,command:0},miniAnswers:["","",""],miniScore:0,reviewQueue:[],reviewIndex:0,recoveryItems:[],recoveryIndex:0,recoveryVisible:false,recoveryAnswer:"",supportCount:0,reasoningIndependent:false,challengeCompleted:false};
const storeKey="estudiosimple-clase1-session-v3-actualizado",channelKey="estudiosimple-clase1-sync-v3-actualizado";
const steps=["Inicio","Video Motivacional","Recorrido","Video Explicativo","Práctica","Resumen","Miniquiz","Cierre"];
const stageStarts:Stage[]=["routeOverview","hook","conversationIntro","formalization","practiceIntro","practiceSummary","miniquiz","closing"];
const preQuestions:GuidedItem[]=[
 {context:"Punto de referencia",question:"En el recorrido del submarino, ¿qué lugar representa el cero?",expected:"La superficie del mar representa el cero.",success:"¡Muy bien! En este recorrido usamos la superficie del mar como punto de referencia y la representamos con el número cero.",support:"Recuerda que la profundidad comienza a medirse desde la superficie del mar. Ese es el lugar desde donde contamos cuántos metros baja el submarino. Con esta pista, ¿qué lugar representa el cero?",reveal:"En este recorrido, la superficie del mar representa el cero porque desde allí comenzamos a medir la profundidad.",studentReveal:"La superficie del mar representa el cero."},
 {context:"Ubicación del submarino",question:"¿Qué significa que el submarino se encuentre a −20 m?",expected:"El submarino se encuentra veinte metros bajo la superficie del mar.",success:"¡Exacto! Significa que el submarino se encuentra veinte metros bajo la superficie del mar, que usamos como punto de referencia. Como −20 m nos indica dónde se encuentra, decimos que representa una posición.",support:"Recuerda que la superficie del mar representa el cero. En −20 m, el signo negativo indica que el submarino está debajo de ese punto y el número 20 indica la distancia desde el cero hasta el submarino. Con esta pista, ¿qué significa −20 m?",reveal:"−20 m significa que el submarino se encuentra veinte metros bajo la superficie del mar. Esta información representa su posición.",studentReveal:"El submarino está veinte metros bajo la superficie. Esa es su posición."}
];
const postQuestions:GuidedItem[]=[
 {context:"Movimiento 1 de 2",question:"La expresión “el submarino baja quince metros”, ¿representa una posición o un movimiento?",expected:"Un movimiento.",success:"¡Correcto! Bajar quince metros representa un movimiento porque indica cómo cambia de lugar el submarino, la dirección y la distancia que recorre.",support:"La palabra “baja” indica un cambio de lugar y “quince metros” indica la distancia recorrida. Con esta pista, responde la misma pregunta.",reveal:"Representa un movimiento: el submarino cambia de lugar, baja y recorre quince metros.",studentReveal:"Bajar 15 metros representa un movimiento."},
 {context:"Movimiento 2 de 2",question:"La expresión “el submarino sube ocho metros”, ¿representa una posición o un movimiento?",expected:"Un movimiento.",success:"¡Muy bien! Subir ocho metros representa un movimiento porque indica cómo cambia de lugar el submarino, la dirección y la distancia que recorre.",support:"La palabra “sube” indica un cambio de lugar y “ocho metros” indica la distancia recorrida. Con esta pista, responde la misma pregunta.",reveal:"Representa un movimiento: el submarino cambia de lugar, sube y recorre ocho metros.",studentReveal:"Subir 8 metros representa un movimiento."}
];
const practice:GuidedItem[]=[
 {context:"Temperatura",question:"Un termómetro marca cuatro grados Celsius bajo cero. ¿Qué número entero representa esa temperatura?",expected:"−4",success:"¡Muy bien! El número entero es −4. El signo negativo indica que la temperatura está bajo cero.",support:"Recuerda que las cantidades bajo cero se representan con un signo negativo. Conservamos el número 4 y agregamos ese signo. Entonces, ¿qué número entero representa la temperatura?",reveal:"El número entero es −4: el 4 indica la cantidad de grados y el signo negativo indica que están bajo cero.",studentReveal:"−4"},
 {context:"Ascensor",question:"Un ascensor baja cinco pisos. En esta frase, ¿se está representando una posición o un movimiento?",expected:"Un movimiento.",success:"¡Genial! Representa un movimiento porque indica cómo cambia de lugar el ascensor.",support:"Fíjate en la palabra “baja”: indica que el ascensor cambia de lugar. Con esta pista, responde la misma pregunta.",reveal:"Representa un movimiento porque “baja cinco pisos” indica cómo cambia de lugar el ascensor.",studentReveal:"Un movimiento."},
 {context:"Saldo de una cuenta",question:"Si una cuenta bancaria tiene un saldo de menos cinco mil pesos, ¿qué significa el signo negativo?",expected:"Significa que existe una deuda de cinco mil pesos.",success:"¡Excelente! En esta situación, el signo negativo indica que existe una deuda de cinco mil pesos.",support:"En una cuenta bancaria, un saldo positivo indica dinero disponible y un saldo negativo indica una deuda. Con esta pista, ¿qué significa el signo negativo?",reveal:"El signo negativo indica que existe una deuda de cinco mil pesos. Aquí su significado depende del contexto.",studentReveal:"Existe una deuda de $5.000."}
];
const mini=[
 {q:"Un buzo se encuentra siete metros bajo la superficie del mar. Si la superficie representa el cero, ¿qué número entero representa la posición del buzo?",options:["−7","+7","7"],correct:"−7",fixExplain:"La superficie representa el cero. Como el buzo está siete metros debajo, usamos el signo negativo: la respuesta es −7."},
 {q:"Un ascensor sube seis pisos. Esta frase, ¿representa una posición o un movimiento?",options:["Una posición","Un movimiento"],correct:"Un movimiento",fixExplain:"La palabra “sube” indica que el ascensor cambia de lugar. Por eso representa un movimiento."},
 {q:"En una cuenta bancaria aparece un saldo de −$8.000. ¿Qué situación representa ese saldo?",options:["Hay $8.000 disponibles","Hay una deuda de $8.000","No hay dinero disponible ni una deuda"],correct:"Hay una deuda de $8.000",fixExplain:"En este contexto, el signo negativo indica una deuda. Por eso −$8.000 representa una deuda de $8.000."}
];
const recovery=[
 {title:"Posiciones bajo el punto de referencia",explain:"Cuando una posición está debajo del punto de referencia, utilizamos un número negativo.",q:"Una entrada está cinco metros bajo el nivel de la calle, que representa el cero. ¿Qué entero representa su posición?",options:["−5","+5"],correct:"−5",correctText:"¡Eso es! La posición se representa con −5.",fixText:"La respuesta correcta es −5: el signo negativo indica que está bajo el punto de referencia."},
 {title:"Posición y movimiento",explain:"Una posición dice dónde está algo. Un movimiento dice cómo cambia de lugar.",q:"Un globo sube cuatro metros. ¿Representa una posición o un movimiento?",options:["Una posición","Un movimiento"],correct:"Un movimiento",correctText:"¡Eso es! Subir cuatro metros representa un movimiento.",fixText:"La respuesta correcta es movimiento, porque “sube” indica un cambio de lugar."},
 {title:"Significado del signo negativo",explain:"El significado del signo depende del contexto. En una temperatura, puede indicar que está bajo cero.",q:"Una temperatura de −2 °C está…",options:["Dos grados bajo cero","Dos grados sobre cero"],correct:"Dos grados bajo cero",correctText:"¡Eso es! −2 °C significa dos grados bajo cero.",fixText:"La respuesta correcta es dos grados bajo cero."}
];

function stepFor(stage:Stage){if(stage==="cover"||stage==="prep"||stage==="landing")return -1;if(["routeOverview","routeToday","thermo","thermoMeaning"].includes(stage))return 0;if(stage==="hook")return 1;if(["conversationIntro","preQuestions"].includes(stage))return 2;if(["formalization","postIntro","postQuestions","summary"].includes(stage))return 3;if(["practiceIntro","practice","reasoningIntro","reasoning","challenge"].includes(stage))return 4;if(["strategy","practiceSummary"].includes(stage))return 5;if(["miniquiz","results","review","recoveryIntro","recovery"].includes(stage))return 6;return 7}
function locked(stage:Stage){return ["results","review","recoveryIntro","recovery","closing","catalog","landing"].includes(stage)}

export default function Home(){
 const [mode,setMode]=useState<Mode>("split"),[session,setSession]=useState<Session>(initial),[ready,setReady]=useState(false),[navTick,setNavTick]=useState(0),[backAvailable,setBackAvailable]=useState(false),[forwardAvailable,setForwardAvailable]=useState(false),[sessionCode,setSessionCode]=useState(""),[joinCode,setJoinCode]=useState(""),[syncStatus,setSyncStatus]=useState<SyncStatus>("local"),[syncError,setSyncError]=useState(""),[copied,setCopied]=useState(false);const channel=useRef<BroadcastChannel|null>(null),past=useRef<Session[]>([]),future=useRef<Session[]>([]),codeRef=useRef(""),revisionRef=useRef(-1),pendingWrites=useRef(0),saveChain=useRef<Promise<void>>(Promise.resolve());
 const normalizedCode=(value:string)=>value.trim().toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6);
 const localKey=(code=codeRef.current)=>code?`${storeKey}-${code}`:storeKey;
 const replaceUrl=(nextMode:Mode,code=codeRef.current)=>{const u=new URL(location.href);u.searchParams.set("mode",nextMode);if(code)u.searchParams.set("session",code);else u.searchParams.delete("session");history.replaceState({},"",u)};
 const acceptRemote=useCallback((envelope:SessionEnvelope)=>{revisionRef.current=envelope.revision;const next={...initial,...envelope.state};localStorage.setItem(`${storeKey}-${envelope.code}`,JSON.stringify(next));setSession(next);setSyncStatus("connected");setSyncError("")},[]);
 const fetchSession=useCallback(async(code:string)=>{const response=await fetch(`/api/sessions/${code}`,{cache:"no-store"});if(!response.ok)throw new Error(response.status===404?"No encontramos una sesión con ese código.":"No fue posible conectar con la sesión.");return await response.json() as SessionEnvelope},[]);
 const createSession=useCallback(async()=>{setSyncStatus("connecting");setSyncError("");try{const response=await fetch("/api/sessions",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({state:initial})});if(!response.ok)throw new Error();const envelope=await response.json() as SessionEnvelope;codeRef.current=envelope.code;setSessionCode(envelope.code);acceptRemote(envelope);replaceUrl("adult",envelope.code)}catch{setSyncStatus("local");setSyncError("")}},[acceptRemote]);
 const joinSession=useCallback(async(codeValue:string)=>{const code=normalizedCode(codeValue);if(code.length!==6){setSyncError("Ingresa el código de seis caracteres.");return}setSyncStatus("connecting");setSyncError("");try{const envelope=await fetchSession(code);codeRef.current=code;setSessionCode(code);setJoinCode(code);acceptRemote(envelope);replaceUrl("student",code)}catch(error){setSyncStatus("error");setSyncError(error instanceof Error?error.message:"No fue posible conectar con la sesión.")}},[acceptRemote,fetchSession]);
 const saveRemote=useCallback((next:Session)=>{const code=codeRef.current;if(!code)return;pendingWrites.current+=1;saveChain.current=saveChain.current.catch(()=>undefined).then(async()=>{try{const response=await fetch(`/api/sessions/${code}`,{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({state:next})});if(!response.ok)throw new Error();const result=await response.json() as {revision:number};revisionRef.current=Math.max(revisionRef.current,result.revision);setSyncStatus("connected");setSyncError("")}catch{setSyncStatus("offline");setSyncError("Conexión interrumpida. Intentando reconectar…")}finally{pendingWrites.current-=1}})},[]);
 useEffect(()=>{let cancelled=false;const params=new URLSearchParams(location.search),requested=params.get("mode"),code=normalizedCode(params.get("session")??"");channel.current=new BroadcastChannel(channelKey);channel.current.onmessage=e=>{if(!codeRef.current)setSession(e.data as Session)};queueMicrotask(async()=>{const nextMode=requested==="adult"||requested==="student"||requested==="split"?requested:"split";setMode(nextMode);if(code){setSyncStatus("connecting");try{const envelope=await fetchSession(code);if(cancelled)return;codeRef.current=code;setSessionCode(code);setJoinCode(code);acceptRemote(envelope)}catch(error){if(cancelled)return;setSyncStatus("error");setSyncError(error instanceof Error?error.message:"No fue posible conectar con la sesión.")}}else{try{const saved=localStorage.getItem(storeKey);if(saved)setSession({...initial,...JSON.parse(saved)})}catch{localStorage.removeItem(storeKey)}}if(!cancelled)setReady(true)});return()=>{cancelled=true;channel.current?.close()}},[acceptRemote,createSession,fetchSession]);
 useEffect(()=>{if(!sessionCode)return;let active=true;const poll=async()=>{if(pendingWrites.current>0)return;try{const envelope=await fetchSession(sessionCode);if(!active)return;if(envelope.revision>revisionRef.current)acceptRemote(envelope);else if(syncStatus==="offline")setSyncStatus("connected")}catch{if(active){setSyncStatus("offline");setSyncError("Conexión interrumpida. Intentando reconectar…")}}};const timer=window.setInterval(poll,500);return()=>{active=false;window.clearInterval(timer)}},[acceptRemote,fetchSession,sessionCode,syncStatus]);
 const publish=useCallback((next:Session)=>{localStorage.setItem(localKey(),JSON.stringify(next));if(!codeRef.current)channel.current?.postMessage(next);setSession(next);saveRemote(next)},[saveRemote]);
 const update=useCallback<Updater>(change=>setSession(current=>{const changed=typeof change==="function"?change(current):{...current,...change};const passiveVideo=typeof change!=="function"&&Object.keys(change).length===1&&Boolean(change.video)&&change.video?.command===current.video.command;if(!passiveVideo){past.current.push(current);future.current=[];setBackAvailable(true);setForwardAvailable(false)}const addedSupport=changed.feedback?.kind==="support"&&current.feedback?.kind!=="support"?1:0;const next={...changed,supportCount:current.supportCount+addedSupport};localStorage.setItem(localKey(),JSON.stringify(next));if(!codeRef.current)channel.current?.postMessage(next);saveRemote(next);setNavTick(n=>n+1);return next}),[saveRemote]);
 const travel=(from:React.MutableRefObject<Session[]>,to:React.MutableRefObject<Session[]>)=>{const next=from.current.pop();if(!next)return;to.current.push(session);publish(next);setBackAvailable(past.current.length>0);setForwardAvailable(future.current.length>0);setNavTick(n=>n+1)};
 const reset=()=>{past.current=[];future.current=[];setBackAvailable(false);setForwardAvailable(false);publish(initial)};
 const jump=(i:number)=>{const current=stepFor(session.stage);if(i<=current&&!locked(session.stage))update({...session,stage:stageStarts[i],feedback:null,attempt:0,video:{...session.video,playing:false,command:session.video.command+1}})};
 const changeMode=(next:Mode)=>{setMode(next);replaceUrl(next);if(next==="adult"&&!codeRef.current&&sessionCode)void createSession()};
 const openRole=(role:"adult"|"student")=>{const u=new URL(location.href);u.searchParams.set("mode",role);if(codeRef.current)u.searchParams.set("session",codeRef.current);window.open(u,"_blank","noopener,noreferrer")};
 const copyStudentLink=async()=>{const u=new URL(location.href);u.searchParams.set("mode","student");u.searchParams.set("session",sessionCode);await navigator.clipboard.writeText(u.toString());setCopied(true);window.setTimeout(()=>setCopied(false),1800)};
 if(!ready)return <main className="loading">Preparando la clase…</main>;
 if(session.stage==="landing")return <LandingPage onEnterCatalog={()=>update({stage:"catalog"})}/>;
 const needsJoin=mode==="student"&&!sessionCode;
 return <main className="prototype" data-nav={navTick}><video className="media-preload" src="/media/gancho-submarino.mp4" preload="auto"/><video className="media-preload" src="/media/formalizacion-enteros-v2.mp4" preload="auto"/><header className="tester"><div className="tester-title"><i/><div><b>Prototipo funcional · Clase 1 · Versión 3 actualizada</b><span>Candidato para validación</span></div></div><div className="mode-switch"><ModeButton active={mode==="split"} onClick={()=>changeMode("split")} icon={<UsersRound/>}>Ambas</ModeButton><ModeButton active={mode==="adult"} onClick={()=>changeMode("adult")} icon={<UserRound/>}>Adulto</ModeButton><ModeButton active={mode==="student"} onClick={()=>changeMode("student")} icon={<Monitor/>}>Estudiante</ModeButton></div>{sessionCode&&<div className={`session-chip ${syncStatus}`}><span>Sesión</span><b>{sessionCode}</b><em>{syncStatus==="connected"?"Conectada":syncStatus==="offline"?"Reconectando":"Conectando"}</em></div>}<div className="tester-actions"><button onClick={()=>update({stage:session.stage==="landing"?"catalog":"landing"})} style={{display:"inline-flex",alignItems:"center",gap:"5px",fontSize:"12px",padding:"4px 10px",borderRadius:"6px",backgroundColor:"rgba(18,161,164,0.15)",color:"#12a1a4",border:"1px solid rgba(18,161,164,0.3)",cursor:"pointer",fontWeight:700}}><HomeIcon style={{width:"13px",height:"13px"}}/>{session.stage==="landing"?"Ver Catálogo":"Ir a Landing"}</button><button onClick={()=>update({stage:session.stage==="catalog"?"cover":"catalog"})} style={{display:"inline-flex",alignItems:"center",gap:"5px",fontSize:"12px",padding:"4px 10px",borderRadius:"6px",backgroundColor:"rgba(18,161,164,0.15)",color:"#12a1a4",border:"1px solid rgba(18,161,164,0.3)",cursor:"pointer",fontWeight:700}}><BookOpen style={{width:"13px",height:"13px"}}/>{session.stage==="catalog"?"Entrar a Clase 1":"Menú de Clases"}</button><a href="/admin" style={{display:"inline-flex",alignItems:"center",gap:"5px",fontSize:"12px",padding:"4px 10px",borderRadius:"6px",backgroundColor:"rgba(30,41,59,0.9)",color:"#38bdf8",border:"1px solid #475569",textDecoration:"none",fontWeight:700}}><KeyRound style={{width:"13px",height:"13px"}}/>Portal Admin</a>{mode==="adult"&&sessionCode&&<button onClick={copyStudentLink}><ExternalLink/>{copied?"Enlace copiado":"Copiar enlace estudiante"}</button>}<button onClick={()=>openRole("adult")}><ExternalLink/>Adulto</button><button onClick={()=>openRole("student")}><ExternalLink/>Estudiante</button><button onClick={reset}><RefreshCcw/>Reiniciar</button></div></header>{syncError&&sessionCode&&syncStatus==="offline"&&!needsJoin&&<div className="sync-notice">{syncError}</div>}{needsJoin?<JoinSession code={joinCode} setCode={setJoinCode} onJoin={()=>void joinSession(joinCode)} status={syncStatus} error={syncError}/>:<section className={`screens ${mode}`}>{mode!=="student"&&<div className="screen-wrap">{mode==="split"&&<small>VISTA DEL ADULTO</small>}<Adult session={session} update={update} back={()=>travel(past,future)} forward={()=>travel(future,past)} canBack={backAvailable} canForward={forwardAvailable} jump={jump} connected={syncStatus==="connected"}/></div>}{mode!=="adult"&&<div className="screen-wrap">{mode==="split"&&<small>VISTA DEL ESTUDIANTE</small>}<Student session={session} update={update}/></div>}</section>}</main>;
}
function ModeButton({active,onClick,icon,children}:{active:boolean;onClick:()=>void;icon:React.ReactNode;children:React.ReactNode}){return <button className={active?"active":""} onClick={onClick}>{icon}{children}</button>}

function JoinSession({code,setCode,onJoin,status,error}:{code:string;setCode:(value:string)=>void;onJoin:()=>void;status:SyncStatus;error:string}){return <section className="join-session"><div><img src="/logo-estudiosimple.png" alt="EstudioSimple"/><Kicker>Vista del estudiante</Kicker><h1>Ingresa a la clase</h1><p>Escribe el código de seis caracteres que aparece en la pantalla del adulto.</p><form onSubmit={event=>{event.preventDefault();onJoin()}}><input autoFocus inputMode="text" autoComplete="off" maxLength={6} value={code} onChange={event=>setCode(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g,""))} aria-label="Código de sesión" placeholder="ABC234"/><button type="submit" disabled={status==="connecting"}>{status==="connecting"?"Conectando…":"Ingresar a la clase"}</button></form>{error&&<strong>{error}</strong>}</div></section>}

function Adult({session,update,back,forward,canBack,canForward,jump,connected}:{session:Session;update:Updater;back:()=>void;forward:()=>void;canBack:boolean;canForward:boolean;jump:(i:number)=>void;connected:boolean}){if(session.stage==="catalog")return <Catalog role="adult" onStartClass={()=>update({stage:"cover"})} onGoLanding={()=>update({stage:"landing"})} onLogout={()=>{try{localStorage.removeItem(storeKey);sessionStorage.clear();}catch{}update({stage:"landing"});}}/>;const step=stepFor(session.stage);return <section className="product adult-product"><aside><img src="/logo-estudiosimple.png" alt="EstudioSimple"/><p>CLASE 1 · OA1</p><h2>¿Dónde está<br/>el cero?</h2><em>{step<0?"Antes de comenzar":`Etapa ${step+1} de 8 · ${steps[step]}`}</em><nav>{steps.map((name,i)=><button key={name} disabled={i>step||locked(session.stage)} onClick={()=>jump(i)} className={i===step?"current":i<step?"done":""}><span>{i<step?<Check/>:i+1}</span>{name}</button>)}</nav></aside><div className="adult-main"><header><div className="history-controls"><button className="exit-btn" onClick={()=>update({stage:"catalog"})} title="Salir de la clase y volver al menú principal"><ArrowLeft style={{width:"12px",height:"12px"}}/>Salir al Menú</button><button className="back" disabled={!canBack} onClick={back}><ArrowLeft/>Volver</button><button className="back" disabled={!canForward} onClick={forward}>Avanzar<ArrowRight/></button></div><span style={{cursor:"pointer",textDecoration:"underline"}} onClick={()=>update({stage:"catalog"})} title="Haga clic para salir al menú de clases">7° Básico › Matemática › OA1 › Clase 1 (← Menú)</span><b>● {connected?"Sincronización activa":"Preparando sincronización"}</b></header>{step>=0&&<LessonProgress step={step}/>}<div className="adult-body"><AdultStage session={session} update={update}/></div></div></section>}

function AdultStage({session,update}:{session:Session;update:Updater}){
 const success=(text:string)=>update({feedback:{kind:"success",text}}),support=(text:string)=>update({feedback:{kind:"support",text},attempt:1}),reveal=(text:string)=>update({feedback:{kind:"reveal",text},attempt:2});
 if(session.stage==="cover")return <Center><p className="eyebrow">Matemática · Objetivo de Aprendizaje 1</p><h1>Números enteros</h1><h2>Posiciones y movimientos respecto de un punto de referencia</h2><p className="muted">Clase 1 de 6 · 30–35 minutos</p><Action onClick={()=>update({stage:"prep"})}>Comenzar clase</Action><Disclosure>Este botón abre únicamente tu preparación privada. La pantalla del estudiante continuará en espera.</Disclosure></Center>;
 if(session.stage==="prep")return <><Title>Antes de comenzar</Title><div className="flow"><Flow title="TU OBJETIVO" color="green">Guiar al estudiante para que comprenda que los números enteros pueden representar la ubicación de algo en relación con un punto de referencia, que distinga entre posición y movimiento y que explique al menos una idea con sus propias palabras.</Flow><Flow title="RUTA DE HOY" color="orange">Introducción → conexión inicial → video introductorio → conversación guiada → video explicativo → práctica → comparación → estrategia para pensar → resumen → miniquiz → refuerzo si es necesario → cierre.</Flow><Flow title="¡RECUERDA!" color="yellow"><ol><li>Sigue el orden indicado.</li><li>Lee en voz alta únicamente los recuadros DILE y PREGÚNTALE.</li><li>No leas los recuadros SOLO PARA TI ni AYUDA DE LECTURA.</li><li>Haz cada pregunta y espera la respuesta antes de seleccionar una opción.</li><li>Considera correcta una respuesta si expresa la idea matemática, aunque use palabras distintas.</li><li>Si el estudiante necesita apoyo, usa únicamente la ayuda que aparecerá.</li><li>Si propone otra explicación o no está de acuerdo, escúchalo completo y valora su razonamiento antes de guiarlo.</li></ol></Flow></div><ActionBar><Action onClick={()=>update({stage:"routeOverview"})}>Comenzar con el estudiante</Action></ActionBar></>;
 if(session.stage==="routeOverview")return <><Title>Nuestra ruta de Matemática</Title><Private>Los títulos orientan la clase. Lee en voz alta solamente lo que aparezca en los recuadros DILE o PREGÚNTALE.</Private><Prompt label="DILE">Hoy comenzamos la ruta de Matemática de séptimo básico. Durante este curso trabajaremos cuatro grandes bloques: Números, Álgebra, Geometría y Datos y azar. En cada bloque conoceremos distintos temas, los practicaremos paso a paso y comprobaremos lo que vamos aprendiendo.</Prompt><ActionBar><Action onClick={()=>update({stage:"routeToday"})}>Conozcamos el primer tema</Action></ActionBar></>;
 if(session.stage==="routeToday")return <><Title>La clase de hoy</Title><Prompt label="DILE">En la clase de hoy comenzaremos con los números enteros. Aprenderemos a representar la ubicación de objetos o valores comparándolos con un punto de referencia, como una temperatura comparada con cero grados o la profundidad de un submarino comparada con la superficie del mar. También aprenderemos a distinguir una posición de un movimiento y a explicar cómo llegamos a una respuesta.</Prompt><ActionBar><Action onClick={()=>update({stage:"thermo"})}>Comencemos</Action></ActionBar></>;
 if(session.stage==="thermo")return <ThermoAdult session={session} update={update}/>;
 if(session.stage==="thermoMeaning")return <ThermoMeaning session={session} update={update}/>;
 if(session.stage==="hook")return <><Title>El recorrido del submarino</Title>{!session.hookStarted?<><Prompt label="DILE">Ahora veremos un video sobre el recorrido de un submarino. Mientras lo ves, fíjate en tres cosas: dónde comienza el submarino, cuánto baja y cuánto sube.</Prompt><ActionBar><Action onClick={()=>startVideo("hook",session,update)} icon={<Play/>}>Reproducir video</Action></ActionBar></>:<AdultVideo src="/media/gancho-submarino.mp4" kind="hook" session={session} update={update}/>} {session.hookEnded&&<><Private>La pregunta final queda planteada como desafío. No la respondas todavía.</Private><ActionBar><Secondary onClick={()=>startVideo("hook",session,update)}>Ver nuevamente</Secondary><Action onClick={()=>update({stage:"conversationIntro",video:{...session.video,playing:false}})}>Comprendamos el recorrido</Action></ActionBar></>}</>;
 if(session.stage==="conversationIntro")return <><Title>Comprendamos el recorrido</Title><Prompt label="DILE">Conversemos sobre lo que acabamos de ver. Voy a hacerte dos preguntas para que juntos comprendamos mejor el recorrido del submarino.</Prompt><ActionBar><Action onClick={()=>update({stage:"preQuestions",conversationIndex:0,feedback:null,attempt:0})}>Mostrar primera pregunta</Action></ActionBar></>;
 if(session.stage==="preQuestions")return <GuidedAdult item={preQuestions[session.conversationIndex]} session={session} onSuccess={()=>success(preQuestions[session.conversationIndex].success)} onSupport={()=>support(preQuestions[session.conversationIndex].support)} onReveal={()=>reveal(preQuestions[session.conversationIndex].reveal)} onNext={()=>session.conversationIndex===0?update({conversationIndex:1,feedback:null,attempt:0}):update({stage:"formalization",feedback:null,attempt:0})}/>;
 if(session.stage==="formalization")return <><Title>Aprendamos sobre posición y movimiento</Title>{!session.formalStarted?<><Prompt label="DILE">Ya identificamos el punto de referencia de este recorrido y comprendimos que menos veinte metros indica dónde se encuentra el submarino. A eso lo llamamos una posición. Ahora veremos un video para aprender qué es un movimiento y cómo distinguirlo de una posición.</Prompt><ReadingAid>−20 m se lee “menos veinte metros”.</ReadingAid><ActionBar><Action onClick={()=>startVideo("formal",session,update)} icon={<Play/>}>Reproducir video explicativo</Action></ActionBar></>:<AdultVideo src="/media/formalizacion-enteros-v2.mp4" kind="formal" session={session} update={update}/>} {session.formalEnded&&<ActionBar><Secondary onClick={()=>startVideo("formal",session,update)}>Ver nuevamente</Secondary><Action onClick={()=>update({stage:"postIntro",video:{...session.video,playing:false}})}>Continuar</Action></ActionBar>}</>;
 if(session.stage==="postIntro")return <><Title>Posición y movimiento</Title><Prompt label="DILE">Comprobemos que comprendiste la diferencia entre una posición y un movimiento.<br/><br/>Te haré dos preguntas para comprobarlo.</Prompt><ActionBar><Action onClick={()=>update({stage:"postQuestions",postIndex:0,feedback:null,attempt:0})}>Mostrar primera pregunta</Action></ActionBar></>;
 if(session.stage==="postQuestions")return <GuidedAdult item={postQuestions[session.postIndex]} session={session} onSuccess={()=>success(postQuestions[session.postIndex].success)} onSupport={()=>support(postQuestions[session.postIndex].support)} onReveal={()=>reveal(postQuestions[session.postIndex].reveal)} onNext={()=>session.postIndex===0?update({postIndex:1,feedback:null,attempt:0}):update({stage:"summary",feedback:null})}/>;
 if(session.stage==="summary")return <><Title>En resumen</Title><Prompt label="DILE">En este recorrido usamos la superficie del mar como punto de referencia y la representamos con el número cero. Una posición indica dónde se encuentra algo respecto de ese punto; por eso, menos veinte metros representa la posición inicial del submarino. Un movimiento indica cómo cambia de lugar, hacia dónde se mueve y qué distancia recorre; por eso, bajar quince metros y subir ocho metros representan movimientos.</Prompt><ActionBar><Action onClick={()=>update({stage:"practiceIntro",practiceIndex:0})}>Practiquemos juntos</Action></ActionBar></>;
 if(session.stage==="practiceIntro")return <PracticeIntro session={session} update={update}/>;
 if(session.stage==="practice")return <GuidedAdult item={practice[session.practiceIndex]} session={session} onSuccess={()=>success(practice[session.practiceIndex].success)} onSupport={()=>support(practice[session.practiceIndex].support)} onReveal={()=>reveal(practice[session.practiceIndex].reveal)} onNext={()=>session.practiceIndex<2?update({stage:"practiceIntro",practiceIndex:session.practiceIndex+1,feedback:null,attempt:0}):update({stage:"reasoningIntro",feedback:null,attempt:0})}/>;
 if(session.stage==="reasoningIntro")return <><Title>Comparemos dos situaciones</Title><Prompt label="DILE">Antes de resumir, comparemos dos situaciones. No necesitas repetir una frase exacta: lo importante es que expliques la idea con tus propias palabras.</Prompt><ActionBar><Action onClick={()=>update({stage:"reasoning",feedback:null,attempt:0,reasoningIndependent:false})}>Mostrar comparación</Action></ActionBar></>;
 if(session.stage==="reasoning")return <ReasoningAdult session={session} update={update}/>;
 if(session.stage==="challenge")return <ChallengeAdult session={session} update={update}/>;
 if(session.stage==="strategy")return <StrategyAdult update={update}/>;
 if(session.stage==="practiceSummary")return <SummaryAdult session={session} update={update}/>;
 if(session.stage==="miniquiz")return <MiniQuizAdult session={session} update={update}/>;
 if(session.stage==="results")return <ResultsAdult session={session} update={update}/>;
 if(session.stage==="review")return <ReviewAdult session={session} update={update}/>;
 if(session.stage==="recoveryIntro")return <><Title>Refuerzo breve</Title><Prompt label="DILE">Revisaremos paso a paso las ideas que todavía necesitan un poco de práctica. Después harás una comprobación breve.</Prompt><ActionBar><Action onClick={()=>update({stage:"recovery",recoveryIndex:0,recoveryVisible:false,recoveryAnswer:""})}>Comenzar refuerzo</Action></ActionBar></>;
 if(session.stage==="recovery")return <RecoveryAdult session={session} update={update}/>;
 return <><Title>Terminamos por hoy</Title><Prompt label="DILE">¡Felicitaciones! Hoy aprendiste que el cero puede funcionar como punto de referencia, que los signos positivo y negativo se interpretan de acuerdo con cada situación, y que una posición indica dónde se encuentra algo mientras un movimiento indica cómo cambia de lugar.</Prompt><Prompt label="DILE" tone="teal">En la próxima clase ubicaremos números enteros en la recta numérica para saber dónde está cada uno y compararlos.</Prompt><SessionRecord session={session}/><ActionBar><Action onClick={()=>update({stage:"catalog"})}>Volver a mis clases</Action></ActionBar><Disclosure>Este botón llevará a ambos usuarios al listado provisional de clases del OA1.</Disclosure></>
}

function ThermoAdult({session,update}:{session:Session;update:Updater}){
 const supportText=session.attempt===0?"Estuviste cerca. El número 3 está correcto porque indica la cantidad de grados, pero falta el signo que indica que la temperatura está bajo cero. ¿Recuerdas qué signo utilizamos para representar una cantidad bajo cero?":"Vamos paso a paso. El número 3 indica la cantidad de grados. Como la temperatura está bajo cero, necesitamos el signo menos. La respuesta que buscábamos es −3.";
 return <><Title>El cero como punto de referencia</Title><ReadingAid>0 °C se lee “cero grados Celsius”. · 3 °C se lee “tres grados Celsius”. · +3 °C se lee “más tres grados Celsius”.</ReadingAid><Prompt label="DILE">Observa este termómetro. Tomaremos 0 °C como punto de referencia. Una temperatura de tres grados sobre cero es positiva: podemos escribirla como 3 °C o, si queremos mostrar expresamente su signo, como +3 °C. Ahora pensemos: ¿qué número entero representa una temperatura de tres grados bajo cero?</Prompt><Expected>−3</Expected><ReadingAid>−3 se lee “menos tres”.</ReadingAid><FeedbackBox feedback={session.feedback}/>{!session.feedback&&<Choice title="¿Qué respondió el estudiante?" options={[["Respondió −3",()=>update({feedback:{kind:"success",text:"¡Correcto! El número entero que representa esa temperatura es −3."}})],["Respondió 3",()=>update({feedback:{kind:"support",text:supportText},attempt:1})],["No sabe o dio otra respuesta",()=>update({feedback:{kind:"support",text:"Vamos paso a paso. El número 3 indica la cantidad de grados. Como la temperatura está bajo cero necesitamos el signo que representa una cantidad bajo cero. ¿Cuál es ese signo?"},attempt:1})]]}/>} {session.feedback?.kind==="support"&&session.attempt===1&&<Choice title="¿Qué respondió ahora?" options={[["Respondió signo negativo",()=>update({feedback:{kind:"success",text:"¡Eso es! Utilizamos el signo negativo porque la temperatura está bajo cero. Por eso escribimos −3 °C."},attempt:2})],["Respondió signo positivo",()=>update({feedback:{kind:"reveal",text:"El signo positivo representa una cantidad sobre cero. Como buscamos tres grados bajo cero, la respuesta es −3."},attempt:2})],["Todavía no sabe",()=>update({feedback:{kind:"reveal",text:"La respuesta que buscábamos es −3. El signo menos indica que la temperatura está bajo cero."},attempt:2})]]}/>} {(session.feedback?.kind==="success"||session.feedback?.kind==="reveal")&&<ActionBar><Action onClick={()=>update({stage:"thermoMeaning",feedback:null,attempt:0})}>Comprendamos la respuesta</Action></ActionBar>}</>
}
function ThermoMeaning({session,update}:{session:Session;update:Updater}){return <><Title>Comprendamos la respuesta</Title><Private>El estudiante ya identificó el número. Ahora comprobarás si comprende qué representan el signo negativo y el número 3.</Private><ReadingAid>−3 °C se lee “menos tres grados Celsius”.</ReadingAid><Prompt label="DILE">Ahora veamos qué significa −3 °C. El signo menos indica que la temperatura está bajo cero. El número 3 indica que está a tres grados del cero.</Prompt><Prompt label="PREGÚNTALE" tone="teal">Entonces, dime con tus palabras: ¿qué representa −3 °C?</Prompt><Expected>Representa una temperatura de tres grados Celsius bajo cero.</Expected><FeedbackBox feedback={session.feedback}/>{!session.feedback&&<Choice title="¿Cómo respondió?" options={[["Respondió correctamente",()=>update({feedback:{kind:"success",text:"¡Exacto! Comprendiste que −3 °C representa una temperatura de tres grados Celsius bajo cero."}})],["Necesita apoyo",()=>update({feedback:{kind:"support",text:"Mira nuevamente el termómetro: el signo menos indica bajo cero y el 3 indica la distancia desde el cero. −3 °C representa tres grados Celsius bajo cero."},attempt:1})]]}/>} {session.feedback&&<ActionBar><Action onClick={()=>update({stage:"hook",feedback:null})}>Seguir con el video</Action></ActionBar>}</>}
function GuidedAdult({item,session,onSuccess,onSupport,onReveal,onNext}:{item:GuidedItem;session:Session;onSuccess:()=>void;onSupport:()=>void;onReveal:()=>void;onNext:()=>void}){return <><Counter>{item.context}</Counter><Prompt label="PREGÚNTALE">{item.question}</Prompt><Criterion>{item.expected}</Criterion><FeedbackBox feedback={session.feedback}/>{!session.feedback&&<Choice title="¿Cómo respondió?" options={[["Respondió correctamente",onSuccess],["Necesita apoyo",onSupport]]}/>} {session.feedback?.kind==="support"&&<Choice title="Después de la pista…" options={[["Ahora respondió correctamente",onSuccess],["Todavía necesita apoyo",onReveal]]}/>} {(session.feedback?.kind==="success"||session.feedback?.kind==="reveal")&&<ActionBar><Action onClick={onNext}>Continuar</Action></ActionBar>}</>}
function ReasoningAdult({session,update}:{session:Session;update:Updater}){
 const question="En una temperatura de −4 °C y en un saldo de −$4.000 aparece el signo negativo. ¿Significa lo mismo en las dos situaciones? Explica qué representa en cada una.";
 const supportText="Pensemos en cada situación por separado. En el termómetro, el cero separa temperaturas sobre y bajo cero. En la cuenta, el cero separa dinero disponible y deuda. Con esta pista, explica qué indica el signo negativo en cada caso.";
 const successText="¡Excelente razonamiento! Reconociste que el mismo signo puede comunicar ideas diferentes según la situación.";
 const revealText="No significa exactamente lo mismo. En −4 °C indica una temperatura de cuatro grados bajo cero. En −$4.000 indica una deuda de cuatro mil pesos. El signo negativo se interpreta según el contexto.";
 return <><Title>Comparemos dos situaciones</Title><Prompt label="PREGÚNTALE">{question}</Prompt><Criterion>En −4 °C el signo indica una temperatura bajo cero y en −$4.000 indica una deuda.</Criterion><FeedbackBox feedback={session.feedback}/>{!session.feedback&&<Choice title="¿Cómo explicó su respuesta?" options={[["Explicó ambas ideas",()=>update({feedback:{kind:"success",text:successText},reasoningIndependent:true})],["Explicó solo una idea",()=>update({feedback:{kind:"support",text:supportText},attempt:1,reasoningIndependent:false})],["Necesita apoyo",()=>update({feedback:{kind:"support",text:supportText},attempt:1,reasoningIndependent:false})]]}/>} {session.feedback?.kind==="support"&&<Choice title="Después de la pista…" options={[["Ahora explicó ambas ideas",()=>update({feedback:{kind:"success",text:successText},reasoningIndependent:false})],["Todavía necesita apoyo",()=>update({feedback:{kind:"reveal",text:revealText},attempt:2,reasoningIndependent:false})]]}/>} {(session.feedback?.kind==="success"||session.feedback?.kind==="reveal")&&<ActionBar><Action onClick={()=>update({stage:session.reasoningIndependent?"challenge":"strategy",feedback:null,attempt:0})}>{session.reasoningIndependent?"Ir al desafío breve":"Ver estrategia para pensar"}</Action></ActionBar>}</>
}
function ChallengeAdult({session,update}:{session:Session;update:Updater}){
 const successText="¡Muy bien! −2 °C indica la posición inicial de la temperatura respecto del cero; “sube cinco grados” indica el movimiento o cambio.";
 const supportText="Revisémoslo juntos. −2 °C dice dónde está la temperatura al comenzar, por eso representa una posición. “Sube cinco grados” dice cómo cambia, por eso representa un movimiento.";
 return <><Title>Desafío breve</Title><Private>Esta profundización aparece porque resolvió la comparación anterior sin apoyo. Valora su explicación aunque utilice palabras diferentes.</Private><Prompt label="PREGÚNTALE">Una temperatura está en −2 °C y luego sube cinco grados. ¿Qué parte representa una posición y qué parte representa un movimiento? Explica cómo lo sabes.</Prompt><Criterion>−2 °C representa la posición inicial; “sube cinco grados” representa el movimiento.</Criterion><FeedbackBox feedback={session.feedback}/>{!session.feedback&&<Choice title="¿Cómo respondió?" options={[["Explicó correctamente",()=>update({feedback:{kind:"success",text:successText},challengeCompleted:true})],["Necesita apoyo",()=>update({feedback:{kind:"support",text:supportText},challengeCompleted:true})]]}/>} {session.feedback&&<ActionBar><Action onClick={()=>update({stage:"strategy",feedback:null})}>Ver estrategia para pensar</Action></ActionBar>}</>
}
function StrategyAdult({update}:{update:Updater}){return <><Title>Cómo analizar una situación</Title><Prompt label="DILE">Cuando analices una situación con números enteros, puedes seguir tres pasos. Primero, identifica el punto de referencia. Luego, observa qué indica el signo en ese contexto. Finalmente, pregúntate si la información dice dónde se encuentra algo o cómo cambia.</Prompt><ActionBar><Action onClick={()=>update({stage:"practiceSummary",summaryIdea:0,feedback:null})}>Recordemos lo aprendido</Action></ActionBar></>}
function PracticeIntro({session,update}:{session:Session;update:Updater}){const i=session.practiceIndex;const copy=i===0?"Ahora apliquemos lo que hemos aprendido en tres situaciones distintas. Para eso, te haré algunas preguntas y las resolveremos paso a paso.":i===1?"Pasemos a la segunda situación. Ahora hablaremos de un ascensor.":"Vamos con la última situación. Esta vez veremos que el significado de un signo también depende del contexto.";return <><Title>Practiquemos juntos</Title><Prompt label="DILE">{copy}</Prompt>{i===2&&<Prompt label="DILE" tone="teal">En una cuenta bancaria, el cero indica que no hay dinero disponible ni deuda. Un saldo positivo representa dinero disponible y un saldo negativo representa una deuda.</Prompt>}<ActionBar><Action onClick={()=>update({stage:"practice",feedback:null,attempt:0})}>Mostrar {i===0?"primera":i===1?"segunda":"última"} situación</Action></ActionBar></>}
const summaryIdeas=[
 ["1 · Punto de referencia","En cada situación identificamos un punto o valor de referencia y lo representamos con el número cero. Desde ese punto podemos determinar dónde se encuentra algo."],
 ["2 · Números positivos y negativos","En los ejemplos de temperatura y profundidad, los valores sobre el punto de referencia se representaron con números positivos y los valores bajo ese punto, con números negativos. En una cuenta bancaria, positivo indica dinero disponible y negativo indica una deuda. El significado se interpreta según el contexto."],
 ["3 · Posición y movimiento","Una posición indica dónde se encuentra algo respecto del punto de referencia. Por su parte, un movimiento indica cómo ese objeto o valor cambia de lugar, hacia dónde se mueve y qué distancia recorre."]
];
function SummaryAdult({session,update}:{session:Session;update:Updater}){return <><Title>Recordemos lo aprendido</Title>{session.summaryIdea===0&&<Prompt label="DILE">Antes de terminar, recordemos las tres ideas más importantes que aprendimos hoy.</Prompt>}{summaryIdeas.slice(0,session.summaryIdea).map(([title,text])=><Prompt key={title} label={`DILE · ${title}`} tone="teal">{text}</Prompt>)}<ActionBar>{session.summaryIdea<3?<Action onClick={()=>update({summaryIdea:session.summaryIdea+1})}>Mostrar idea {session.summaryIdea+1}</Action>:<Action onClick={()=>update({stage:"miniquiz",quizVisible:false})}>Continuar al miniquiz</Action>}</ActionBar></>}
function MiniQuizAdult({session,update}:{session:Session;update:Updater}){if(!session.quizVisible)return <><Title>Miniquiz de la clase</Title><Prompt label="DILE">Para terminar, responderás un miniquiz con tres preguntas sobre lo que aprendimos hoy. Tendrás que responderlo en tu pantalla. Cuando lo envíes, revisaremos juntos tus resultados.</Prompt><ActionBar><Action onClick={()=>update({quizVisible:true})}>Mostrar miniquiz</Action></ActionBar></>;return <><Title>Miniquiz en curso</Title><Private>Permite que el estudiante responda sin ayuda. Cuando envíe el miniquiz recibirás los resultados. Se aprueba con al menos dos respuestas correctas.</Private><Waiting>El estudiante está respondiendo en su pantalla.</Waiting></>}
function ResultsAdult({session,update}:{session:Session;update:Updater}){const pass=session.miniScore>=2;const title=session.miniScore===3?"¡Excelente trabajo!":pass?"¡Muy bien! Aprobaste la clase.":"Sigamos aprendiendo";return <><Title>Resultado del miniquiz</Title><Score score={session.miniScore} passed={pass} label={title}/><Prompt label="DILE">{session.miniScore===3?"¡Excelente trabajo! Respondiste correctamente las tres preguntas. Comprendiste muy bien lo que aprendimos hoy.":pass?"¡Muy bien! Aprobaste la clase. Revisaremos las respuestas para que todo quede claro.":"Vamos a revisar las respuestas que necesitan apoyo y luego haremos una comprobación breve."}</Prompt><ActionBar><Action onClick={()=>update({stage:"review",reviewIndex:0})}>Recordemos las respuestas</Action></ActionBar></>}
function ReviewAdult({session,update}:{session:Session;update:Updater}){const qi=session.reviewQueue[session.reviewIndex]??0,item=mini[qi],last=session.reviewIndex>=session.reviewQueue.length-1;const next=()=>last?update({stage:session.miniScore>=2?"closing":"recoveryIntro"}):update({reviewIndex:session.reviewIndex+1});return <><Title>Revisemos la respuesta {session.reviewIndex+1} de {session.reviewQueue.length}</Title><div className="review-answer"><span>Pregunta</span><p>{item.q}</p><div>Respondió: <b>{session.miniAnswers[qi]}</b><strong>Respuesta correcta: {item.correct}</strong></div></div><Prompt label="DILE">{item.fixExplain}</Prompt><ActionBar><Action onClick={next}>{last?(session.miniScore>=2?"Ir al cierre":"Ir al refuerzo"):"Siguiente respuesta"}</Action></ActionBar></>}
function RecoveryAdult({session,update}:{session:Session;update:Updater}){const ri=session.recoveryItems[session.recoveryIndex]??0,item=recovery[ri],answered=Boolean(session.recoveryAnswer),correct=session.recoveryAnswer===item.correct;const next=()=>{if(session.recoveryIndex>=session.recoveryItems.length-1)update({stage:"closing"});else update({recoveryIndex:session.recoveryIndex+1,recoveryVisible:false,recoveryAnswer:""})};return <><Title>Refuerzo {session.recoveryIndex+1} de {session.recoveryItems.length}</Title><Prompt label="DILE">{item.explain}</Prompt>{!session.recoveryVisible?<ActionBar><Action onClick={()=>update({recoveryVisible:true})}>Mostrar comprobación</Action></ActionBar>:!answered?<Waiting>El estudiante está respondiendo.</Waiting>:<><Prompt label="DILE" tone={correct?"green":"orange"}>{correct?item.correctText:item.fixText}</Prompt><ActionBar><Action onClick={next}>{session.recoveryIndex>=session.recoveryItems.length-1?"Finalizar refuerzo":"Siguiente refuerzo"}</Action></ActionBar></>}</>}
function SessionRecord({session}:{session:Session}){return <div className="session-record"><Info/><div><b>Registro de la sesión · Solo para ti</b><p>{session.supportCount===0?"El estudiante completó las actividades orales sin apoyo guiado.":`Se utilizaron apoyos guiados en ${session.supportCount} ${session.supportCount===1?"momento":"momentos"}.`} {session.reasoningIndependent?"Explicó la comparación de contextos de manera autónoma.":"Completó la comparación de contextos con acompañamiento."} Resultado del miniquiz: {session.miniScore} de 3.</p></div></div>}

function marineAmbientActive(session:Session){
 if(["cover","prep"].includes(session.stage))return true;
 if(["conversationIntro","preQuestions","postIntro","postQuestions","summary"].includes(session.stage))return true;
 if(session.stage==="hook")return !session.hookStarted||session.hookEnded;
 if(session.stage==="formalization")return !session.formalStarted||session.formalEnded;
 return false;
}
function Student({session,update}:{session:Session;update:Updater}){
 const audio=useRef<HTMLAudioElement>(null),active=marineAmbientActive(session),[soundOn,setSoundOn]=useState(true),[blocked,setBlocked]=useState(false);
 useEffect(()=>{const player=audio.current;if(!player)return;player.volume=.12;if(active&&soundOn){player.play().then(()=>setBlocked(false)).catch(()=>setBlocked(true))}else{player.pause();if(!active)player.currentTime=0}},[active,soundOn]);
 const toggle=()=>{if(soundOn&&!blocked){setSoundOn(false);return}setSoundOn(true);const player=audio.current;if(player){player.volume=.12;player.play().then(()=>setBlocked(false)).catch(()=>setBlocked(true))}};
 if(session.stage==="catalog")return <Catalog role="student" onStartClass={()=>update({stage:"cover"})} onGoLanding={()=>update({stage:"landing"})} onLogout={()=>{try{localStorage.removeItem(storeKey);sessionStorage.clear();}catch{}update({stage:"landing"});}}/>;const step=stepFor(session.stage);
 return <section className="product student-product"><audio ref={audio} src="/media/ambiente-submarino.mp3" loop preload="auto"/><header><img src="/logo-estudiosimple.png" alt="EstudioSimple"/><span>Matemática · 7° básico</span><button className="student-exit-btn" onClick={()=>update({stage:"catalog"})} title="Salir al menú de clases">← Menú</button>{active&&<button className={`ambient-toggle ${soundOn&&!blocked?"on":""}`} onClick={toggle} aria-label={soundOn&&!blocked?"Silenciar sonido ambiente":"Activar sonido ambiente"}>{soundOn&&!blocked?<Volume2/>:<VolumeX/>}<span>{soundOn&&!blocked?"Sonido ambiente":"Activar sonido"}</span></button>}<b>OA1 · Clase 1</b></header>{step>=0&&<LessonProgress step={step}/>}<div className="student-body"><StudentStage session={session} update={update}/></div></section>
}
function StudentStage({session,update}:{session:Session;update:Updater}){
 if(session.stage==="cover"||session.stage==="prep")return <Hero image="/visuals/mision-portada.png"><div className="glass waiting"><i/>La clase comenzará pronto</div></Hero>;
 if(session.stage==="routeOverview")return <div className="student-route"><Kicker>Nuestra ruta de Matemática</Kicker><h1>Cuatro grandes bloques</h1><div className="route-grid"><Route n="01" title="Números" text="Enteros, fracciones y decimales" color="blue"/><Route n="02" title="Álgebra" text="Patrones, relaciones y ecuaciones" color="orange"/><Route n="03" title="Geometría" text="Formas, medidas y transformaciones" color="yellow"/><Route n="04" title="Datos y azar" text="Información, gráficos y probabilidades" color="teal"/></div></div>;
 if(session.stage==="routeToday")return <div className="today-screen"><Kicker>La clase de hoy</Kicker><h1>Números enteros</h1><div className="today-cards"><article><Thermometer/><b>Temperaturas</b><span>Comparadas con cero grados</span></article><article><Waves/><b>Profundidades</b><span>Comparadas con la superficie</span></article><article><ArrowRight/><b>Posición y movimiento</b><span>Dónde está y cómo cambia</span></article></div><p>Aprenderemos a representar ubicaciones y a explicar cómo llegamos a una respuesta.</p></div>;
 if(session.stage==="thermo")return <StudentContext image="/visuals/contexto-termometro-v3.png"><Kicker>El cero como punto de referencia</Kicker><h1>¿Qué número entero representa tres grados bajo cero?</h1><ThermometerVisual reveal={session.feedback?.kind==="success"||session.feedback?.kind==="reveal"} support={session.feedback?.kind==="support"}/>{session.feedback?.kind==="support"&&<StudentHint/>}{(session.feedback?.kind==="success"||session.feedback?.kind==="reveal")&&<Positive>La respuesta es −3.</Positive>}</StudentContext>;
 if(session.stage==="thermoMeaning")return <StudentContext image="/visuals/contexto-termometro-v3.png"><Kicker>Comprendamos la respuesta</Kicker><h1>¿Qué representa −3 °C?</h1><ThermometerVisual reveal support={Boolean(session.feedback)}/>{session.feedback?.kind==="support"&&<StudentHint/>}{(session.feedback?.kind==="success"||session.feedback?.kind==="reveal")&&<Positive>Representa tres grados Celsius bajo cero.</Positive>}</StudentContext>;
 if(session.stage==="hook"){if(!session.hookStarted)return <Hero image="/visuals/mision-portada.png"><div className="mission-card"><Kicker>El recorrido del submarino</Kicker><h1>Mientras observas, fíjate en…</h1><ul><li>Dónde comienza.</li><li>Cuánto baja.</li><li>Cuánto sube.</li></ul></div></Hero>;if(!session.hookEnded)return <SyncedVideo src="/media/gancho-submarino.mp4" kind="hook" session={session}/>;return <Hero image="/visuals/submarino-20.png"><div className="submarine-panel"><h1>El recorrido continúa</h1><p>Ahora comprenderemos la información del video.</p></div></Hero>}
 if(session.stage==="conversationIntro")return <Hero image="/visuals/submarino-20.png"><div className="submarine-panel"><Kicker>Comprendamos el recorrido</Kicker><h1>Pensemos juntos</h1><p>Primero identificaremos el punto de referencia y la posición inicial.</p></div></Hero>;
 if(session.stage==="preQuestions")return <StudentGuided item={preQuestions[session.conversationIndex]} index={session.conversationIndex} total={2} feedback={session.feedback} image="/visuals/submarino-20.png"/>;
 if(session.stage==="formalization"){if(!session.formalStarted)return <Hero image="/visuals/posicion-movimiento.png"><div className="submarine-panel"><Kicker>Ahora aprenderemos</Kicker><h1>Posición y movimiento</h1><p>Dónde se encuentra algo y cómo cambia de lugar.</p></div></Hero>;if(!session.formalEnded)return <SyncedVideo src="/media/formalizacion-enteros-v2.mp4" kind="formal" session={session}/>;return <Hero image="/visuals/posicion-movimiento.png"><div className="submarine-panel"><h1>Posición y movimiento</h1><p>Ahora comprobaremos lo aprendido.</p></div></Hero>}
 if(session.stage==="postIntro")return <Hero image="/visuals/posicion-movimiento.png"><div className="submarine-panel"><Kicker>Comprobemos lo aprendido</Kicker><h1>Posición y movimiento</h1><p>Responderemos dos preguntas sobre el video.</p></div></Hero>;
 if(session.stage==="postQuestions")return <StudentGuided item={postQuestions[session.postIndex]} index={session.postIndex} total={2} feedback={session.feedback} image="/visuals/posicion-movimiento.png"/>;
 if(session.stage==="summary")return <Hero image="/visuals/posicion-movimiento.png"><div className="summary-panel"><Kicker>En resumen</Kicker><div className="concept-pair"><article><span>POSICIÓN</span><b>Dónde se encuentra</b><strong>−20 m</strong></article><article><span>MOVIMIENTO</span><b>Cómo cambia de lugar</b><strong>Baja 15 m · Sube 8 m</strong></article></div></div></Hero>;
 if(session.stage==="practiceIntro")return <ContextIntro index={session.practiceIndex}/>;
 if(session.stage==="practice")return <PracticeStudent item={practice[session.practiceIndex]} index={session.practiceIndex} feedback={session.feedback}/>;
 if(session.stage==="reasoningIntro")return <ReasoningStudent intro/>;
 if(session.stage==="reasoning")return <ReasoningStudent feedback={session.feedback}/>;
 if(session.stage==="challenge")return <ChallengeStudent feedback={session.feedback}/>;
 if(session.stage==="strategy")return <StrategyStudent/>;
 if(session.stage==="practiceSummary")return <SummaryStudent idea={session.summaryIdea}/>;
 if(session.stage==="miniquiz")return session.quizVisible?<MiniQuiz session={session} update={update}/>:<SummaryStudent idea={3} waiting/>;
 if(session.stage==="results")return <StudentResult score={session.miniScore}/>;
 if(session.stage==="review"){const qi=session.reviewQueue[session.reviewIndex]??0,item=mini[qi];return <div className="student-result"><div className="review"><Kicker>Recordemos la respuesta</Kicker><h2>{item.q}</h2><p>Tu respuesta: <b>{session.miniAnswers[qi]}</b></p><strong>Respuesta correcta: {item.correct}</strong><p className="student-explanation">{item.fixExplain}</p></div></div>}
 if(session.stage==="recoveryIntro")return <div className="recovery"><Kicker>Refuerzo breve</Kicker><h1>Volvamos a mirar estas ideas</h1><p className="recovery-lead">Primero veremos una explicación y después responderás una pregunta breve.</p></div>;
 if(session.stage==="recovery")return <RecoveryStudent session={session} update={update}/>;
 return <Celebration score={session.miniScore}/>
}

function StudentGuided({item,index,total,feedback,image}:{item:GuidedItem;index:number;total:number;feedback:Feedback;image:string}){return <Hero image={image}><div className="submarine-question"><Kicker>Pregunta {index+1} de {total}</Kicker><h1>{item.question}</h1>{feedback?.kind==="support"&&<StudentHint/>}{(feedback?.kind==="success"||feedback?.kind==="reveal")&&<><Confetti/><div className={`student-answer ${feedback.kind}`}><Sparkles/><span>{item.studentReveal}</span></div></>}</div></Hero>}
function StudentHint(){return <div className="student-hint"><CircleHelp/>¡Presta atención a la pista!</div>}
const contextImages=["/visuals/contexto-termometro-v3.png","/visuals/contexto-ascensor-v3.png","/visuals/contexto-cuenta-v3.png"];
function ContextIntro({index}:{index:number}){const items=[{icon:<Thermometer/>,title:"Temperatura",text:"Primera situación"},{icon:<Building2/>,title:"Ascensor",text:"Segunda situación"},{icon:<Banknote/>,title:"Saldo de una cuenta",text:"Última situación"}],item=items[index];return <StudentContext image={contextImages[index]}><div className="context-intro-card">{item.icon}<Kicker>{item.text}</Kicker><h1>{item.title}</h1><p>Escucha la situación antes de responder.</p></div></StudentContext>}
function PracticeStudent({item,index,feedback}:{item:GuidedItem;index:number;feedback:Feedback}){const icons=[<Thermometer key="t"/>,<Building2 key="b"/>,<Banknote key="m"/>];return <StudentContext image={contextImages[index]}><div className="student-practice contextual"><Kicker>Situación {index+1} de 3</Kicker><div className="practice-icon">{icons[index]}</div><h1>{item.context}</h1><div className="practice-card"><p>{item.question}</p>{(feedback?.kind==="success"||feedback?.kind==="reveal")&&<strong>{item.studentReveal}</strong>}</div>{feedback?.kind==="support"&&<StudentHint/>}{(feedback?.kind==="success"||feedback?.kind==="reveal")&&<><Confetti/><Positive>{item.studentReveal}</Positive></>}</div></StudentContext>}
function ReasoningStudent({intro=false,feedback=null}:{intro?:boolean;feedback?:Feedback}){return <div className="reasoning-screen"><Kicker>Pensemos y comparemos</Kicker><h1>{intro?"Una misma señal puede comunicar ideas distintas":"¿El signo negativo significa lo mismo?"}</h1><div className="comparison-grid"><article style={{backgroundImage:"url('/visuals/contexto-termometro-v3.png')"}}><span>TEMPERATURA</span><strong>−4 °C</strong><p>Cuatro grados bajo cero</p></article><article style={{backgroundImage:"url('/visuals/contexto-cuenta-v3.png')"}}><span>CUENTA BANCARIA</span><strong>−$4.000</strong><p>Un saldo negativo</p></article></div>{intro?<Waiting>Escucha la indicación antes de responder.</Waiting>:<><p className="reasoning-question">Explica con tus palabras qué representa el signo negativo en cada situación.</p>{feedback?.kind==="support"&&<StudentHint/>}{feedback?.kind==="success"&&<><Confetti/><Positive>¡Muy bien! El significado depende del contexto.</Positive></>}{feedback?.kind==="reveal"&&<div className="student-explanation reasoning-answer">En la temperatura indica cuatro grados bajo cero; en la cuenta indica una deuda de cuatro mil pesos.</div>}</>}</div>}
function ChallengeStudent({feedback}:{feedback:Feedback}){return <div className="challenge-screen"><Kicker>Desafío breve</Kicker><h1>Posición y movimiento</h1><div className="challenge-expression"><strong>−2 °C</strong><ArrowRight/><strong>sube 5 grados</strong></div><p>¿Qué parte representa una posición y qué parte representa un movimiento?</p>{feedback?.kind==="success"&&<><Confetti/><Positive>¡Muy bien explicado!</Positive></>}{feedback?.kind==="support"&&<div className="student-explanation reasoning-answer"><b>−2 °C</b> es la posición inicial. <b>Sube cinco grados</b> es el movimiento.</div>}</div>}
function StrategyStudent(){return <div className="strategy-screen"><Kicker>Una estrategia para pensar</Kicker><h1>Cómo analizar una situación</h1><div className="strategy-steps"><article><span>1</span><div><b>Identifica</b><p>¿Cuál es el punto de referencia?</p></div></article><article><span>2</span><div><b>Interpreta</b><p>¿Qué indica el signo en este contexto?</p></div></article><article><span>3</span><div><b>Distingue</b><p>¿Dice dónde se encuentra algo o cómo cambia?</p></div></article></div></div>}
function SummaryStudent({idea,waiting=false}:{idea:number;waiting?:boolean}){return <div className="learning-summary"><Kicker>Recordemos lo aprendido</Kicker><h1>Tres ideas importantes</h1><div className="learning-cards">{summaryIdeas.slice(0,idea).map(([title,text])=><article key={title}><b>{title}</b><p>{text}</p></article>)}</div>{idea===0&&<Waiting>Comenzaremos el resumen en un momento.</Waiting>}{waiting&&<Waiting>El miniquiz aparecerá cuando el adulto lo indique.</Waiting>}</div>}
function MiniQuiz({session,update}:{session:Session;update:Updater}){const complete=session.miniAnswers.every(Boolean);return <div className="quiz"><Kicker>Números enteros · Clase 1</Kicker><h1>Miniquiz</h1><p>Responde las tres preguntas y luego envía tus respuestas.</p><div className="quiz-list">{mini.map((item,i)=><fieldset key={item.q}><legend><span>{i+1}</span>{item.q}</legend><div>{item.options.map(option=><label key={option} className={session.miniAnswers[i]===option?"selected":""}><input type="radio" name={`q${i}`} checked={session.miniAnswers[i]===option} onChange={()=>update(s=>{const answers=[...s.miniAnswers];answers[i]=option;return {...s,miniAnswers:answers}})}/>{option}</label>)}</div></fieldset>)}</div><button disabled={!complete} onClick={()=>{const score=session.miniAnswers.filter((a,i)=>a===mini[i].correct).length;const wrong=mini.map((_,i)=>session.miniAnswers[i]!==mini[i].correct?i:-1).filter(i=>i>=0);update({miniScore:score,stage:"results",reviewQueue:score>=2?[0,1,2]:wrong,reviewIndex:0,recoveryItems:buildRecoveryItems(wrong),recoveryIndex:0,recoveryVisible:false,recoveryAnswer:""})}}>Enviar respuestas <Send/></button></div>}
function buildRecoveryItems(wrong:number[]){const mapped:number[]=[];if(wrong.includes(0))mapped.push(0);if(wrong.includes(1))mapped.push(1);if(wrong.includes(2))mapped.push(2);return (mapped.length?mapped:[0]).slice(0,2)}
function StudentResult({score}:{score:number}){if(score===3)return <div className="student-result celebration"><Confetti/><div className="result perfect"><strong>3 / 3</strong><h1>¡Excelente trabajo!</h1><p>Respondiste correctamente las tres preguntas.</p></div></div>;if(score===2)return <div className="student-result"><div className="result passed"><strong>2 / 3</strong><h1>¡Muy bien! Aprobaste la clase.</h1><p>Ahora revisaremos juntos las respuestas.</p></div></div>;return <div className="student-result"><div className="result needs"><strong>{score} / 3</strong><h1>Sigamos aprendiendo</h1><p>Revisaremos algunas ideas y después haremos una comprobación breve.</p></div></div>}
function RecoveryStudent({session,update}:{session:Session;update:Updater}){const item=recovery[session.recoveryItems[session.recoveryIndex]??0],answered=Boolean(session.recoveryAnswer),correct=session.recoveryAnswer===item.correct;return <div className="recovery"><Kicker>Refuerzo {session.recoveryIndex+1} de {session.recoveryItems.length}</Kicker><h1>{item.title}</h1><div className="explain">{item.explain}</div>{session.recoveryVisible&&!answered&&<fieldset><legend>{item.q}</legend>{item.options.map(option=><button key={option} onClick={()=>update({recoveryAnswer:option})}>{option}</button>)}</fieldset>}{answered&&<div className={correct?"recovery-result correct":"recovery-result fix"}><b>{correct?"¡Muy bien!":"Revisemos la respuesta"}</b><p>{correct?item.correctText:item.fixText}</p></div>}</div>}
function Celebration({score}:{score:number}){const title=score===3?"¡Excelente trabajo!":score===2?"¡Muy bien!":"¡Buen trabajo!";return <Hero image="/visuals/mision-cierre.png"><Confetti/><div className="glass finish"><div className="complete-icon"><Check/></div><Kicker>Terminamos por hoy</Kicker><h1>{title}</h1><p>Completaste la clase de hoy.</p><span>Próxima clase: ubicaremos números enteros en la recta numérica.</span></div></Hero>}
const catalogLessons = [
  {
    num: 1,
    title: "¿Dónde está el cero? Posiciones respecto a un punto de referencia",
    desc: "El punto de referencia, el cero y la distinción entre posición y movimiento.",
    status: "ready",
    bookPages: "Páginas 6 a 13 del Texto Escolar"
  },
  {
    num: 2,
    title: "Subiendo y bajando: Sumas de números con el mismo signo",
    desc: "Adición de enteros positivos y negativos con apoyo de la recta numérica.",
    status: "locked",
    bookPages: "Páginas 14 a 17 del Texto Escolar"
  },
  {
    num: 3,
    title: "Batalla de signos: Sumas de enteros con distinto signo",
    desc: "Resolución de adiciones con signos contrarios y cálculo del valor absoluto.",
    status: "locked",
    bookPages: "Páginas 18 a 21 del Texto Escolar"
  },
  {
    num: 4,
    title: "El opuesto en acción: La resta como suma del opuesto",
    desc: "Transformación de sustracción a adición del elemento inverso.",
    status: "locked",
    bookPages: "Páginas 22 a 25 del Texto Escolar"
  },
  {
    num: 5,
    title: "Extremos en el mapa: Problemas de variación y distancia",
    desc: "Aplicación contextual en temperaturas, altitud y saldos financieros.",
    status: "locked",
    bookPages: "Páginas 26 a 31 del Texto Escolar"
  },
  {
    num: 6,
    title: "Dominio de la recta Z: Síntesis y verificación",
    desc: "Consolidación de adición y sustracción en problemas de evaluación.",
    status: "locked",
    bookPages: "Páginas 32 a 37 del Texto Escolar"
  }
];

function Catalog({role, onStartClass, onGoLanding, onLogout}:{role:"adult"|"student"; onStartClass?: ()=>void; onGoLanding?: ()=>void; onLogout?: ()=>void}){
  const [selectedSubject, setSelectedSubject] = useState("Matemática");
  const subjects = ["Matemática", "Ciencias Naturales", "Historia, Geografía y C.S.", "Lengua y Literatura", "Inglés"];

  return (
    <section className="product catalog">
      <header>
        <img src="/logo-estudiosimple.png" alt="EstudioSimple"/>
        <span style={{fontWeight: 700}}>EstudioSimple · 7° Básico</span>
        <b>{role==="adult" ? "Panel del Adulto Guía" : "Panel del Estudiante"}</b>
        <div className="catalog-header-actions">
          {onGoLanding && (
            <button className="catalog-nav-btn" onClick={onGoLanding} title="Volver a la portada institucional">
              <HomeIcon style={{width:"13px",height:"13px"}}/>
              Volver a la Landing
            </button>
          )}
          <a href="/admin" className="catalog-nav-btn" title="Ingresar al Portal Administrador">
            <KeyRound style={{width:"13px",height:"13px"}}/>
            Administrador
          </a>
          {onLogout && (
            <button className="catalog-logout-btn" onClick={onLogout} title="Cerrar la sesión de estudio">
              <LogOut style={{width:"13px",height:"13px"}}/>
              Cerrar Sesión
            </button>
          )}
        </div>
      </header>
      <div className="catalog-body">
        <div className="catalog-header-bar">
          <div>
            <Kicker>7° Básico · Temario Oficial de Exámenes Libres</Kicker>
            <h1 style={{margin: "4px 0 8px", color: "var(--navy)", fontSize: "32px"}}>Plan de Estudios y Catálogo de Clases</h1>
            <p style={{margin: 0, color: "#64748b", fontSize: "14px"}}>
              Selecciona tu asignatura y la clase que trabajarás hoy en tu sesión de estudio.
            </p>
          </div>
        </div>

        <div className="catalog-tabs">
          {subjects.map((s) => (
            <button
              key={s}
              className={`catalog-tab ${selectedSubject === s ? "active" : ""}`}
              onClick={() => setSelectedSubject(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {selectedSubject === "Matemática" ? (
          <div>
            <div style={{marginBottom: "20px", padding: "16px 20px", borderRadius: "14px", background: "white", border: "1px solid var(--line)"}}>
              <span className="lesson-meta-badge">EJE NÚMEROS · OA 01 (TEMARIO OFICIAL EELL #1)</span>
              <h2 style={{margin: "6px 0 4px", color: "var(--navy)", fontSize: "20px"}}>
                Adición y Sustracción de Números Enteros (6 Lecciones de 30 min)
              </h2>
              <div className="lesson-book-ref">
                <BookOpen style={{width: "14px", height: "14px", color: "var(--teal)"}}/>
                <span>
                  <strong>Texto Escolar MINEDUC:</strong> Matemática 7° Básico, Unidad 1 "Números", Lección 1 (Páginas 6 a 25)
                </span>
              </div>
            </div>

            <div className="catalog-grid">
              {catalogLessons.map((c) => (
                <article key={c.num} className={c.status === "ready" ? "ready-class" : "locked"}>
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <span style={{fontWeight: 800, color: "var(--teal)"}}>Clase {c.num} · 30 min</span>
                    {c.status === "ready" && (
                      <span style={{background: "#e0f2fe", color: "#0369a1", fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "6px"}}>
                        Lista para iniciar
                      </span>
                    )}
                  </div>
                  <h2 style={{fontSize: "17px", margin: "10px 0 6px", color: "var(--navy)"}}>{c.title}</h2>
                  <p style={{margin: 0, color: "#52647a", fontSize: "13px", lineHeight: "1.45"}}>{c.desc}</p>
                  <div style={{fontSize: "11px", color: "#64748b", marginTop: "10px", fontWeight: 600}}>
                    📖 {c.bookPages}
                  </div>
                  {c.status === "ready" ? (
                    <button className="btn-enter-lesson" onClick={onStartClass}>
                      <Play style={{width: "13px", height: "13px"}}/>
                      Entrar a la Clase 1
                    </button>
                  ) : (
                    <p style={{fontSize: "11px", color: "#94a3b8", marginTop: "12px", fontStyle: "italic"}}>Próxima lección en la ruta</p>
                  )}
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div style={{padding: "50px 30px", textAlign: "center", background: "white", borderRadius: "18px", border: "1px solid var(--line)"}}>
            <h3 style={{color: "var(--navy)", margin: "0 0 10px", fontSize: "22px"}}>Asignatura: {selectedSubject}</h3>
            <p style={{color: "#64748b", margin: 0, fontSize: "14px", maxWidth: "600px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.5}}>
              Los contenidos de esta asignatura corresponden al Temario Oficial de Exámenes Libres.
              Selecciona Matemática para ingresar al reproductor interactivo activo.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function startVideo(kind:"hook"|"formal",session:Session,update:Updater){update({hookStarted:kind==="hook"?true:session.hookStarted,hookEnded:kind==="hook"?false:session.hookEnded,formalStarted:kind==="formal"?true:session.formalStarted,formalEnded:kind==="formal"?false:session.formalEnded,video:{kind,playing:true,seek:0,command:session.video.command+1}})}
function AdultVideo({src,kind,session,update}:{src:string;kind:"hook"|"formal";session:Session;update:Updater}){const ref=useRef<HTMLVideoElement>(null),lastSharedSecond=useRef(-1),[time,setTime]=useState(0),[duration,setDuration]=useState(0);useEffect(()=>{const v=ref.current;if(!v||session.video.kind!==kind)return;if(Math.abs(v.currentTime-session.video.seek)>1.2)v.currentTime=session.video.seek;if(session.video.playing)v.play().catch(()=>undefined);else v.pause()},[kind,session.video]);const command=(playing:boolean,seek=ref.current?.currentTime??0)=>update({video:{kind,playing,seek,command:session.video.command+1}});return <div className="adult-video"><Private>Este video está silenciado aquí para evitar audio duplicado. Los controles también actúan sobre la pantalla del estudiante.</Private><video ref={ref} src={src} muted playsInline preload="auto" onTimeUpdate={e=>{const current=e.currentTarget.currentTime;setTime(current);const second=Math.floor(current);if(session.video.playing&&second!==lastSharedSecond.current){lastSharedSecond.current=second;update({video:{...session.video,kind,seek:current}})}}} onLoadedMetadata={e=>setDuration(e.currentTarget.duration)} onCanPlay={()=>{if(session.video.playing)ref.current?.play().catch(()=>undefined)}} onEnded={()=>update(kind==="hook"?{hookEnded:true,video:{...session.video,playing:false,seek:ref.current?.duration??session.video.seek}}:{formalEnded:true,video:{...session.video,playing:false,seek:ref.current?.duration??session.video.seek}})}/><div className="video-controls"><button onClick={()=>command(!session.video.playing)}>{session.video.playing?<Pause/>:<Play/>}{session.video.playing?"Pausar":"Continuar"}</button><button aria-label="Retroceder diez segundos" onClick={()=>command(false,Math.max(0,(ref.current?.currentTime??0)-10))}><Rewind/>10 s</button><button aria-label="Adelantar diez segundos" onClick={()=>command(false,Math.min(duration,(ref.current?.currentTime??0)+10))}>10 s<FastForward/></button><button onClick={()=>command(false,0)}><RotateCcw/>Reiniciar</button><input aria-label="Posición del video" type="range" min="0" max={duration||0} step="0.1" value={Math.min(time,duration||0)} onChange={e=>command(false,Number(e.target.value))}/><span>{formatTime(time)} / {formatTime(duration)}</span></div></div>}
function SyncedVideo({src,kind,session}:{src:string;kind:"hook"|"formal";session:Session}){const ref=useRef<HTMLVideoElement>(null);useEffect(()=>{const v=ref.current;if(!v||session.video.kind!==kind)return;v.currentTime=session.video.seek;if(session.video.playing)v.play().catch(()=>undefined);else v.pause()},[kind,session.video.command,session.video.kind,session.video.playing,session.video.seek]);return <div className="video"><video ref={ref} src={src} playsInline preload="auto" poster={kind==="hook"?"/visuals/mision-portada.png":"/visuals/posicion-movimiento.png"}/></div>}
function formatTime(v:number){if(!Number.isFinite(v))return "0:00";return `${Math.floor(v/60)}:${Math.floor(v%60).toString().padStart(2,"0")}`}
function LessonProgress({step}:{step:number}){return <div className="lesson-progress"><div className="progress-copy"><span>Avance de la clase</span><b>{Math.round(((step+1)/8)*100)}%</b></div><div className="progress-segments">{steps.map((_,i)=><i key={i} className={i<step?"complete":i===step?"current":""}/>)}</div></div>}
function ThermometerVisual({reveal,support}:{reveal:boolean;support:boolean}){return <div className={`thermo-card ${support?"guided":""}`}><div className="thermometer-graphic"><div className="tube"><i/></div><div className="bulb"/></div><div className="tick-list"><b>+3 °C</b><span>tres grados sobre cero</span><b>0 °C</b><span>punto de referencia</span><b>{reveal?"−3 °C":"?"}</b><span>{reveal?"tres grados bajo cero":""}</span></div></div>}
function Confetti(){return <div className="confetti" aria-hidden="true">{Array.from({length:18},(_,i)=><i key={i}/>)}</div>}
function Hero({image,children}:{image:string;children:React.ReactNode}){return <div className="hero" style={{backgroundImage:`url('${image}')`}}>{children}</div>}
function StudentContext({image,children}:{image:string;children:React.ReactNode}){return <div className="student-context" style={{backgroundImage:`linear-gradient(rgba(241,247,247,.78),rgba(241,247,247,.88)),url('${image}')`}}>{children}</div>}
function Center({children}:{children:React.ReactNode}){return <div className="center">{children}</div>}
function Title({children}:{children:React.ReactNode}){return <h1 className="page-title">{children}</h1>}
function Kicker({children}:{children:React.ReactNode}){return <p className="kicker">{children}</p>}
function Counter({children}:{children:React.ReactNode}){return <p className="counter">{children}</p>}
function Prompt({label,tone="green",children}:{label:string;tone?:"green"|"teal"|"orange";children:React.ReactNode}){return <div className={`prompt ${tone}`}><span>{label}</span><p>{children}</p></div>}
function Private({children}:{children:React.ReactNode}){return <div className="private"><Info/><div><b>Solo para ti · No leer en voz alta</b><p>{children}</p></div></div>}
function ReadingAid({children}:{children:React.ReactNode}){return <div className="reading-aid"><Info/><div><b>Ayuda de lectura · Solo para ti</b><p>{children}</p></div></div>}
function Expected({children}:{children:React.ReactNode}){return <div className="expected"><span>Respuesta esperada</span><b>{children}</b></div>}
function Criterion({children}:{children:React.ReactNode}){return <div className="expected criterion"><span>Criterio para considerar correcta</span><b>Acepta sus propias palabras si expresan esta idea: {children}</b></div>}
function FeedbackBox({feedback}:{feedback:Feedback}){return feedback?<div className={`feedback ${feedback.kind}`}>{feedback.kind==="success"?<Check/>:<CircleHelp/>}<div><b>{feedback.kind==="support"?"AYUDA · DILE":feedback.kind==="reveal"?"EXPLICACIÓN · DILE":"VALIDACIÓN · DILE"}</b><p>{feedback.text}</p></div></div>:null}
function Choice({title,options}:{title?:string;options:[string,()=>void][]}){return <div className="choices">{title&&<p>{title}</p>}<div>{options.map(([label,action])=><button key={label} onClick={action}>{label}</button>)}</div></div>}
function Action({onClick,icon,children}:{onClick:()=>void;icon?:React.ReactNode;children:React.ReactNode}){return <button className="action" onClick={onClick}>{icon}{children}<ArrowRight/></button>}
function Secondary({onClick,children}:{onClick:()=>void;children:React.ReactNode}){return <button className="secondary" onClick={onClick}>{children}</button>}
function ActionBar({children}:{children:React.ReactNode}){return <div className="action-bar">{children}</div>}
function Disclosure({children}:{children:React.ReactNode}){return <details className="disclosure"><summary><Info/>¿Qué ocurrirá?</summary><p>{children}</p></details>}
function Flow({title,color,children}:{title:string;color:string;children:React.ReactNode}){return <article className={color}><b>{title}</b><div>{children}</div></article>}
function Waiting({children}:{children:React.ReactNode}){return <div className="waiting-state"><i/>{children}</div>}
function Positive({children}:{children:React.ReactNode}){return <div className="positive"><Check/>{children}</div>}
function Route({n,title,text,color}:{n:string;title:string;text:string;color:string}){return <article className={color}><span>{n}</span><h2>{title}</h2><p>{text}</p></article>}
function Score({score,passed,label}:{score:number;passed:boolean;label:string}){return <div className={`score ${score===3?"perfect":passed?"passed":"needs"}`}><b>{score} / 3</b><span>{label}</span></div>}

function LandingPage({ onEnterCatalog }: { onEnterCatalog: () => void }) {
  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src="/logo-estudiosimple.png"
            alt="EstudioSimple"
            className="landing-logo"
            onClick={onEnterCatalog}
          />
        </div>
        <div className="landing-nav-links">
          <span className="landing-nav-link" onClick={onEnterCatalog}>
            Catálogo 7° Básico
          </span>
          <span
            className="landing-nav-link"
            onClick={() => {
              const el = document.getElementById("pilares");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Pilares Pedagógicos
          </span>
        </div>
        <div className="landing-nav-actions">
          <a
            href="/admin"
            className="landing-btn-admin"
            title="Panel de control docente y administración"
          >
            <KeyRound style={{ width: "14px", height: "14px" }} />
            Acceso Administrador
          </a>
          <button
            onClick={onEnterCatalog}
            className="landing-btn-primary"
            title="Ingresar a las clases de 7° Básico"
          >
            <Play style={{ width: "14px", height: "14px" }} />
            Ver Catálogo de Clases
          </button>
        </div>
      </nav>

      <main>
        <section className="landing-hero">
          <span className="landing-hero-kicker">
            Homeschooling Riguroso · 7° Básico
          </span>
          <h1 className="landing-hero-title">
            El Puente Inteligente entre el Cuaderno
            <br />y la Pantalla Digital
          </h1>
          <p className="landing-hero-subtitle">
            EstudioSimple estructura el aprendizaje diario para familias de
            educación libre en Chile. Conectamos los Temarios Oficiales de
            Exámenes Libres del MINEDUC y los Textos Escolares con lecciones
            guiadas de 30 minutos, mediación del adulto y práctica en el
            cuaderno físico.
          </p>
          <div className="landing-hero-actions">
            <button
              onClick={onEnterCatalog}
              className="landing-btn-hero-primary"
            >
              <BookOpen style={{ width: "18px", height: "18px" }} />
              Explorar Catálogo de Clases
            </button>
            <a
              href="/admin"
              className="landing-btn-hero-admin"
              title="Ingreso administrativo docente"
            >
              <Shield style={{ width: "18px", height: "18px" }} />
              Acceso Administrador
            </a>
          </div>
        </section>

        <section id="pilares" className="landing-pillars-section">
          <div className="landing-pillars-container">
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
              <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--teal)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Modelo Pedagógico EstudioSimple
              </span>
              <h2 style={{ fontSize: "28px", color: "var(--navy)", margin: "8px 0 12px", fontWeight: 800 }}>
                Diseñado para el Éxito en los Exámenes Libres
              </h2>
              <p style={{ color: "#64748b", fontSize: "14px", margin: 0, lineHeight: 1.6 }}>
                Combinamos el rigor de la evaluación formal chilena con una experiencia amable, sin sobrecarga cognitiva y con mediación paso a paso.
              </p>
            </div>

            <div className="landing-pillars-grid">
              <article className="landing-pillar-card">
                <div className="landing-pillar-icon">
                  <BookOpen style={{ width: "24px", height: "24px" }} />
                </div>
                <h3 className="landing-pillar-title">100% Alineado al MINEDUC</h3>
                <p className="landing-pillar-desc">
                  Priorización curricular y temarios oficiales de Exámenes Libres. Cada lección se vincula de forma explícita con las páginas y actividades del Texto Escolar Oficial del MINEDUC.
                </p>
              </article>

              <article className="landing-pillar-card">
                <div className="landing-pillar-icon">
                  <Sparkles style={{ width: "24px", height: "24px", color: "var(--orange)" }} />
                </div>
                <h3 className="landing-pillar-title">Mediación Adulto y Cuaderno</h3>
                <p className="landing-pillar-desc">
                  El adulto guía la sesión con un guion pedagógico claro (recuadros DILE / PREGÚNTALE) mientras el estudiante reflexiona, escribe y dibuja en su cuaderno físico.
                </p>
              </article>

              <article className="landing-pillar-card">
                <div className="landing-pillar-icon">
                  <Shield style={{ width: "24px", height: "24px", color: "var(--navy)" }} />
                </div>
                <h3 className="landing-pillar-title">Evaluación Formativa y Rigor</h3>
                <p className="landing-pillar-desc">
                  Miniquiz al cierre de cada lección con retroalimentación inmediata, análisis de errores conceptuales y bucle de refuerzo adaptativo sin frustración punitiva.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div>
          <div style={{ fontWeight: 800, color: "white", fontSize: "15px", marginBottom: "4px" }}>
            EstudioSimple · Plataforma EdTech
          </div>
          <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}>
            Educación y nivelación escolar para familias de homeschooling en Chile.
          </p>
        </div>
        <div className="landing-footer-links">
          <button
            onClick={onEnterCatalog}
            className="landing-footer-link"
            style={{ background: "none", border: 0, cursor: "pointer", padding: 0 }}
          >
            Catálogo de Clases
          </button>
          <a href="/admin" className="landing-footer-link">
            Acceso Administrador
          </a>
          <span className="landing-footer-link" style={{ cursor: "default" }}>
            7° Básico · Exámenes Libres
          </span>
        </div>
      </footer>
    </div>
  );
}

