"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight, Check, CircleHelp, ExternalLink, Info, Monitor,
  Play, RefreshCcw, Sparkles, UserRound, UsersRound,
} from "lucide-react";

type Mode = "split" | "adult" | "student";
type Stage = "cover" | "prep" | "route" | "thermo" | "reference" | "hook" |
  "conversation" | "formalization" | "idea" | "practice" | "miniquiz" |
  "results" | "recovery" | "closing" | "completed" | "paused";
type Feedback = { kind: "support" | "success"; text: string } | null;
type Session = {
  stage: Stage; feedback: Feedback; conversationIndex: number; practiceIndex: number;
  hookStarted: boolean; hookEnded: boolean; formalStarted: boolean; formalEnded: boolean;
  miniAnswers: string[]; miniScore: number; reviewIndex: number;
  recoveryIndex: number; recoveryVisible: boolean; recoveryResults: boolean[];
  closure: "none" | "one" | "support" | "done";
};

const initial: Session = {
  stage: "cover", feedback: null, conversationIndex: 0, practiceIndex: 0,
  hookStarted: false, hookEnded: false, formalStarted: false, formalEnded: false,
  miniAnswers: ["", "", ""], miniScore: 0, reviewIndex: 0,
  recoveryIndex: 0, recoveryVisible: false, recoveryResults: [], closure: "none",
};
const storeKey = "estudiosimple-clase1-session";
const channelKey = "estudiosimple-clase1-sync";
const steps = ["Preparación", "Conexión", "Video", "Conversación", "Explicación", "Práctica", "Miniquiz", "Cierre"];

const conversation = [
  ["¿Dónde está el cero en esta historia?", "La superficie del mar.", "Busca el lugar desde donde medimos la profundidad. ¿Qué punto separa estar bajo el mar de estar sobre él?", "Superficie del mar = 0"],
  ["¿Qué significa que el submarino esté a −20 metros?", "Indica una posición: está 20 metros bajo la superficie.", "¿La frase nos dice dónde está el submarino o cómo se está moviendo?", "−20 m = posición bajo la superficie"],
  ["“Bajar 15 metros”, ¿indica una posición o un movimiento?", "Un movimiento.", "Fíjate en la palabra bajar. ¿Describe dónde está o cómo cambia de lugar?", "Bajar 15 m = movimiento"],
  ["“Subir 8 metros”, ¿indica una posición o un movimiento?", "Un movimiento.", "Fíjate en la acción subir. ¿Indica un lugar fijo o un cambio de lugar?", "Subir 8 m = movimiento"],
] as const;

const practice = [
  ["Temperatura", "El termómetro marca 4 °C bajo cero. ¿Qué número entero representa la temperatura?", "−4 °C", "Ubica primero el 0. Como está bajo ese punto, ¿qué signo necesitamos?"],
  ["Ascensor", "El ascensor baja 5 pisos. ¿La frase indica una posición o un movimiento?", "Un movimiento", "Fíjate en el verbo baja. ¿Dice dónde está o cómo cambia de lugar?"],
  ["Altura", "Un campamento está a 120 metros bajo el mirador usado como referencia. ¿Qué entero lo representa?", "−120 m", "El mirador es el punto 0. Si está bajo ese punto, ¿qué signo corresponde?"],
] as const;

const mini = [
  { q: "Un buzo está 7 m bajo la superficie. ¿Qué entero lo representa?", options: ["−7", "+7", "7 sin signo"], correct: "−7" },
  { q: "La temperatura baja 6 grados. ¿La frase indica posición o movimiento?", options: ["Posición", "Movimiento"], correct: "Movimiento" },
  { q: "Un saldo de −$8.000, ¿qué indica el signo negativo?", options: ["Que el saldo está bajo cero", "Que el saldo está sobre cero", "Que el dinero se está moviendo"], correct: "Que el saldo está bajo cero" },
];

const recovery = [
  { title: "Posición respecto del cero", explain: "La superficie funciona como punto de referencia. Una posición bajo ese punto se representa con un número negativo.", q: "Un túnel está 5 metros bajo el nivel de la calle. ¿Qué entero lo representa?", options: ["−5", "+5"], correct: "−5" },
  { title: "Posición y movimiento", explain: "Una posición dice dónde está algo. Un movimiento describe cómo cambia de lugar.", q: "Un globo sube 4 metros. ¿La frase indica posición o movimiento?", options: ["Posición", "Movimiento"], correct: "Movimiento" },
  { title: "Significado del signo", explain: "El signo se interpreta usando un punto de referencia y el contexto de la situación.", q: "Una temperatura de −2 °C está…", options: ["2 grados bajo cero", "2 grados sobre cero"], correct: "2 grados bajo cero" },
];

function stepFor(stage: Stage) {
  if (stage === "cover" || stage === "prep") return 0;
  if (["route", "thermo", "reference"].includes(stage)) return 1;
  if (stage === "hook") return 2;
  if (stage === "conversation") return 3;
  if (["formalization", "idea"].includes(stage)) return 4;
  if (stage === "practice") return 5;
  if (["miniquiz", "results", "recovery"].includes(stage)) return 6;
  return 7;
}

export default function Home() {
  const [mode, setMode] = useState<Mode>("split");
  const [session, setSession] = useState<Session>(initial);
  const [ready, setReady] = useState(false);
  const channel = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    const requested = new URLSearchParams(location.search).get("mode");
    channel.current = new BroadcastChannel(channelKey);
    channel.current.onmessage = (event) => setSession(event.data as Session);
    queueMicrotask(() => {
      if (requested === "adult" || requested === "student" || requested === "split") setMode(requested);
      try {
        const saved = localStorage.getItem(storeKey);
        if (saved) setSession({ ...initial, ...JSON.parse(saved) });
      } catch { localStorage.removeItem(storeKey); }
      setReady(true);
    });
    return () => channel.current?.close();
  }, []);

  const update = useCallback((change: Partial<Session> | ((s: Session) => Session)) => {
    setSession((current) => {
      const next = typeof change === "function" ? change(current) : { ...current, ...change };
      localStorage.setItem(storeKey, JSON.stringify(next));
      channel.current?.postMessage(next);
      return next;
    });
  }, []);

  function changeMode(next: Mode) {
    setMode(next);
    const url = new URL(location.href); url.searchParams.set("mode", next); history.replaceState({}, "", url);
  }
  function openRole(role: "adult" | "student") {
    const url = new URL(location.href); url.searchParams.set("mode", role); window.open(url, "_blank", "noopener,noreferrer");
  }
  if (!ready) return <main className="loading">Preparando la clase…</main>;

  return <main className="prototype">
    <header className="tester">
      <div className="tester-title"><i /><div><b>Prototipo funcional · Clase 1</b><span>Modo de prueba</span></div></div>
      <div className="mode-switch">
        <ModeButton active={mode === "split"} onClick={() => changeMode("split")} icon={<UsersRound />}>Ambas</ModeButton>
        <ModeButton active={mode === "adult"} onClick={() => changeMode("adult")} icon={<UserRound />}>Adulto</ModeButton>
        <ModeButton active={mode === "student"} onClick={() => changeMode("student")} icon={<Monitor />}>Estudiante</ModeButton>
      </div>
      <div className="tester-actions">
        <button onClick={() => openRole("adult")}><ExternalLink />Adulto</button>
        <button onClick={() => openRole("student")}><ExternalLink />Estudiante</button>
        <button onClick={() => update(initial)}><RefreshCcw />Reiniciar</button>
      </div>
    </header>
    <section className={`screens ${mode}`}>
      {mode !== "student" && <div className="screen-wrap">{mode === "split" && <small>VISTA DEL ADULTO</small>}<Adult session={session} update={update} /></div>}
      {mode !== "adult" && <div className="screen-wrap">{mode === "split" && <small>VISTA DEL ESTUDIANTE</small>}<Student session={session} update={update} /></div>}
    </section>
  </main>;
}

function ModeButton({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return <button className={active ? "active" : ""} onClick={onClick}>{icon}{children}</button>;
}

function Adult({ session, update }: { session: Session; update: Updater }) {
  const step = stepFor(session.stage);
  return <section className="product adult-product">
    <aside>
      <img src="/logo-estudiosimple.png" alt="EstudioSimple" />
      <p>CLASE 1 · OA1</p><h2>¿Dónde está<br />el cero?</h2>
      <em>Paso {step + 1} de 8 · {steps[step]}</em>
      <nav>{steps.map((name, i) => <div key={name} className={i === step ? "current" : i < step ? "done" : ""}><span>{i < step ? <Check /> : i + 1}</span>{name}</div>)}</nav>
    </aside>
    <div className="adult-main">
      <header><span>7° Básico › Matemática › OA1 › Clase 1</span><b>● Estudiante conectado</b></header>
      <div className="adult-body"><AdultStage session={session} update={update} /></div>
    </div>
  </section>;
}

type Updater = (change: Partial<Session> | ((s: Session) => Session)) => void;

function AdultStage({ session, update }: { session: Session; update: Updater }) {
  const support = (text: string) => update({ feedback: { kind: "support", text } });
  const success = (text: string) => update({ feedback: { kind: "success", text } });

  if (session.stage === "cover") return <Center>
    <p className="eyebrow">Matemática · Objetivo de Aprendizaje 1</p><h1>Números enteros</h1>
    <h2>Posiciones respecto de un punto de referencia</h2><p className="muted">Clase 1 de 6 · 30–35 minutos</p>
    <Action onClick={() => update({ stage: "prep" })}>Comenzar clase</Action>
    <Disclosure>Este botón abre únicamente tu preparación privada. La pantalla del estudiante continuará en espera.</Disclosure>
  </Center>;

  if (session.stage === "prep") return <><Title>Antes de partir</Title><div className="flow">
    <Flow title="TU OBJETIVO" color="green">Guiar al estudiante para que comprenda que los números enteros representan posiciones respecto de un punto de referencia.</Flow>
    <Flow title="RUTA DE HOY" color="orange">Termómetro → video del submarino → explicación → práctica → miniquiz → cierre.</Flow>
    <Flow title="¡RECUERDA!" color="yellow">Sigue las indicaciones en pantalla, paso a paso. Haz cada pregunta y espera la respuesta. Si necesita apoyo, utiliza únicamente la ayuda que aparecerá.</Flow>
  </div><ActionBar><Action onClick={() => update({ stage: "route" })}>Comencemos</Action></ActionBar></>;

  if (session.stage === "route") return <><Title>Nuestra ruta de Matemática</Title>
    <Prompt label="DILE">Hoy comenzamos la ruta de Matemática de 7° básico. Durante las próximas clases conoceremos distintos temas, los practicaremos paso a paso y comprobaremos lo que vamos aprendiendo. En la clase de hoy comenzaremos con los números enteros.</Prompt>
    <Prompt label="DILE" tone="teal">En esta primera clase aprenderemos a reconocer posiciones usando el cero como punto de referencia.</Prompt>
    <ActionBar><Action onClick={() => update({ stage: "thermo" })}>Continuemos</Action><Disclosure>Al continuar avanzarán ambas pantallas y aparecerá la actividad del termómetro.</Disclosure></ActionBar>
  </>;

  if (session.stage === "thermo") return <><Title>¡Comencemos!</Title>
    <Private>Lee en voz alta únicamente el contenido de los recuadros DILE y espera la respuesta antes de continuar.</Private>
    <Prompt label="DILE">Observa este termómetro. El 0 es nuestro punto de referencia. Si la temperatura está tres grados sobre cero, escribimos +3 °C. ¿Qué número usaríamos para representar una temperatura de tres grados bajo cero?</Prompt>
    <Expected>−3 °C</Expected><FeedbackBox feedback={session.feedback} />
    <Choice title="¿Qué respondió el estudiante?" options={[
      ["Respondió −3 °C", () => update({ stage: "reference", feedback: null })],
      ["Respondió 3 °C", () => support("Está bien que todavía no lo tengas. Mira el 0: tres grados bajo cero necesita un signo que muestre que está debajo. ¿Cuál usamos?")],
      ["No sabe", () => support("Vamos paso a paso. Si +3 representa tres grados sobre cero, el mismo número bajo cero se escribe con el signo contrario. ¿Cómo quedaría?")],
      ["Otra respuesta", () => support("Gracias por responder. Volvamos al punto de referencia: ¿la temperatura está sobre el 0 o bajo el 0?")],
    ]} /></>;

  if (session.stage === "reference") return <><Title>Fijemos el punto de referencia</Title>
    <Private>Usa la frase que corresponda al camino recorrido. Mantén siempre un tono positivo.</Private>
    <Prompt label="DILE">En este termómetro usamos el 0 como punto de referencia. Las temperaturas sobre 0 se representan con números positivos; las que están bajo 0, con números negativos.</Prompt>
    <Prompt label="PREGUNTA" tone="orange">Entonces, ¿qué representa −3 °C?</Prompt><Expected>3 grados bajo cero</Expected><FeedbackBox feedback={session.feedback} />
    <Choice options={[["Respondió correctamente", () => success("Muy bien. Usaste el cero como referencia y reconociste una posición bajo cero.")], ["Necesita apoyo", () => support("El 3 indica cuántos grados; el signo − indica que están bajo el cero.")]]} />
    {session.feedback?.kind === "success" && <ActionBar><Action onClick={() => update({ stage: "hook", feedback: null })}>Seguir con el video</Action></ActionBar>}
  </>;

  if (session.stage === "hook") return <><Title>El recorrido del submarino</Title>
    <Prompt label="DILE">Antes de comenzar, observa dónde inicia el submarino y presta atención a cuánto baja y cuánto sube.</Prompt>
    <Prompt label="HAZ" tone="teal">Cuando termines de leer, reproduce el video en la pantalla del estudiante.</Prompt>
    {!session.hookStarted ? <ActionBar><Action icon={<Play />} onClick={() => update({ hookStarted: true })}>Reproducir video</Action></ActionBar> : !session.hookEnded ? <Waiting>El video se está reproduciendo en la pantalla del estudiante.</Waiting> : <><Prompt label="DILE" tone="orange">Guardaremos esa pregunta para más adelante. Primero comprenderemos la información del recorrido.</Prompt><ActionBar><Action onClick={() => update({ stage: "conversation", conversationIndex: 0 })}>Continuar</Action></ActionBar></>}
  </>;

  if (session.stage === "conversation") {
    const item = conversation[session.conversationIndex];
    return <><Title>Posición y movimiento</Title>
      {session.conversationIndex === 0 && <Prompt label="DILE">Ahora vamos a conversar sobre lo que acabamos de ver en el video. Te haré algunas preguntas para que pensemos juntos en el recorrido del submarino.</Prompt>}
      <Counter>Pregunta {session.conversationIndex + 1} de 4</Counter><Prompt label="PREGUNTA" tone="orange">{item[0]}</Prompt><Expected>{item[1]}</Expected><FeedbackBox feedback={session.feedback} />
      <Choice options={[["Respondió correctamente", () => success(`Muy bien. ${item[3]}`)], ["Necesita apoyo", () => support(item[2])]]} />
      {session.feedback?.kind === "success" && <ActionBar><Action onClick={() => session.conversationIndex < 3 ? update({ conversationIndex: session.conversationIndex + 1, feedback: null }) : update({ stage: "formalization", feedback: null })}>{session.conversationIndex < 3 ? "Siguiente pregunta" : "Continuar"}</Action></ActionBar>}
    </>;
  }

  if (session.stage === "formalization") return <><Title>Damos nombre a lo que descubrimos</Title>
    <Prompt label="DILE">Ya descubrimos que una cosa es dónde está el submarino y otra distinta es cómo se mueve. Ahora veremos cómo las matemáticas representan estas ideas utilizando números enteros.</Prompt>
    <Prompt label="HAZ" tone="teal">Reproduce el siguiente video. En él se explicarán formalmente las ideas que acaban de reconocer.</Prompt>
    {!session.formalStarted ? <ActionBar><Action icon={<Play />} onClick={() => update({ formalStarted: true })}>Reproducir explicación</Action></ActionBar> : !session.formalEnded ? <Waiting>La explicación se está reproduciendo.</Waiting> : <ActionBar><Action onClick={() => update({ stage: "idea" })}>Continuar</Action></ActionBar>}
  </>;

  if (session.stage === "idea") return <><Title>La idea que debe quedar</Title>
    <Prompt label="DILE">Un número entero puede representar una posición respecto de un punto de referencia. El 0 marca ese punto. Una posición indica dónde está algo; un movimiento indica cómo cambia de lugar.</Prompt>
    <Prompt label="COMPRUEBA" tone="orange">El ascensor está en el piso −2 y después baja 3 pisos. ¿Cuál parte indica una posición y cuál indica un movimiento?</Prompt><Expected>−2 = posición · baja 3 pisos = movimiento</Expected><FeedbackBox feedback={session.feedback} />
    <Choice options={[["Respondió correctamente", () => success("Exacto: −2 señala dónde está; bajar 3 pisos describe cómo se mueve.")], ["Necesita apoyo", () => support("¿Qué expresión dice dónde está el ascensor? ¿Cuál contiene la acción de bajar?")]]} />
    {session.feedback?.kind === "success" && <ActionBar><Action onClick={() => update({ stage: "practice", practiceIndex: 0, feedback: null })}>Practiquemos</Action></ActionBar>}
  </>;

  if (session.stage === "practice") {
    const item = practice[session.practiceIndex];
    return <><Title>Apliquemos la misma idea</Title>{session.practiceIndex === 0 && <Prompt label="DILE">Ahora aplicaremos lo que aprendimos en tres situaciones diferentes.</Prompt>}
      <Counter>Situación {session.practiceIndex + 1} de 3 · {item[0]}</Counter><Prompt label="PREGUNTA" tone="orange">{item[1]}</Prompt><Expected>{item[2]}</Expected><FeedbackBox feedback={session.feedback} />
      <Choice options={[["Respondió correctamente", () => success(`Muy bien. La respuesta es ${item[2]}.`)], ["Necesita apoyo", () => support(item[3])]]} />
      {session.feedback?.kind === "success" && <ActionBar><Action onClick={() => session.practiceIndex < 2 ? update({ practiceIndex: session.practiceIndex + 1, feedback: null }) : update({ stage: "miniquiz", feedback: null })}>{session.practiceIndex < 2 ? "Siguiente situación" : "Ir al miniquiz"}</Action></ActionBar>}
    </>;
  }

  if (session.stage === "miniquiz") return <><Title>Miniquiz de la clase</Title>
    <Prompt label="DILE">Ahora responderás tres preguntas sobre lo que aprendimos hoy. Cuando termines, revisaremos juntos tus respuestas.</Prompt>
    <Prompt label="HAZ" tone="teal">Permite que responda sin ayuda. Cuando envíe el miniquiz, recibirás los resultados y las indicaciones para revisarlos.</Prompt>
    <div className="criterion">Criterio de aprobación: 2 respuestas correctas de 3</div><Waiting>Esperando que el estudiante envíe sus respuestas.</Waiting>
  </>;

  if (session.stage === "results") {
    const passed = session.miniScore >= 2; const item = mini[session.reviewIndex];
    const answer = session.miniAnswers[session.reviewIndex]; const correct = answer === item.correct;
    return <><Title>{passed ? "Revisemos el resultado" : "Reforcemos antes de cerrar"}</Title><Score score={session.miniScore} passed={passed} />
      {passed ? <><Counter>Revisión {session.reviewIndex + 1} de 3</Counter><Prompt label="PREGUNTA">{item.q}</Prompt>
        <div className="answer"><span>Respondió: <b>{answer}</b></span><strong className={correct ? "ok" : "fix"}>{correct ? "Correcta" : `Correcta: ${item.correct}`}</strong></div>
        <Prompt label="DILE" tone={correct ? "teal" : "orange"}>{correct ? "Muy bien. Explica brevemente por qué esa respuesta usa correctamente el punto de referencia." : recovery[session.reviewIndex].explain}</Prompt>
        <ActionBar><Action onClick={() => session.reviewIndex < 2 ? update({ reviewIndex: session.reviewIndex + 1 }) : update({ stage: "closing", closure: "none" })}>{session.reviewIndex < 2 ? "Siguiente respuesta" : "Ir al cierre oral"}</Action></ActionBar>
      </> : <><Private>Revisarán cada error, usarás el apoyo específico y después aparecerá una pregunta equivalente. Mantén un lenguaje positivo.</Private>
        <Prompt label="DILE">Vamos a revisar estas ideas juntos. Equivocarse también nos ayuda a descubrir qué necesitamos practicar.</Prompt>
        <div className="button-row"><Action onClick={() => update({ stage: "recovery", recoveryIndex: 0, recoveryVisible: false, recoveryResults: [] })}>Comenzar refuerzo</Action><Secondary onClick={() => update({ stage: "paused" })}>Terminar por hoy</Secondary></div>
      </>}
    </>;
  }

  if (session.stage === "recovery") {
    const failed = mini.map((q, i) => session.miniAnswers[i] !== q.correct ? i : -1).filter(i => i >= 0);
    const indices = session.miniScore === 1 ? failed.slice(0, 2) : failed.slice(0, 3);
    const total = indices.length, required = session.miniScore === 1 ? 1 : 2;
    const achieved = session.recoveryResults.filter(Boolean).length, complete = session.recoveryResults.length >= total;
    const item = recovery[indices[session.recoveryIndex] ?? 0];
    if (complete) return <><Title>Resultado del refuerzo</Title><Score score={achieved} total={total} passed={achieved >= required} />
      {achieved >= required ? <><Prompt label="DILE" tone="teal">Muy bien. Revisaste las ideas necesarias y pudiste aplicarlas en situaciones nuevas.</Prompt><ActionBar><Action onClick={() => update({ stage: "closing", closure: "none" })}>Ir al cierre oral</Action></ActionBar></> : <><Prompt label="DILE" tone="orange">Has trabajado con atención. Estas ideas necesitan un poco más de práctica.</Prompt><div className="button-row"><Action onClick={() => update({ recoveryIndex: 0, recoveryVisible: false, recoveryResults: [] })}>Repetir refuerzo</Action><Secondary onClick={() => update({ stage: "paused" })}>Terminar por hoy</Secondary></div></>}
    </>;
    return <><Title>Refuerzo guiado</Title><Counter>Idea {session.recoveryIndex + 1} de {total} · {item.title}</Counter><Prompt label="DILE">{item.explain}</Prompt>
      {!session.recoveryVisible ? <ActionBar><Action onClick={() => update({ recoveryVisible: true })}>Mostrar pregunta equivalente</Action></ActionBar> : <Waiting>El estudiante está respondiendo una pregunta equivalente.</Waiting>}
    </>;
  }

  if (session.stage === "closing") return <><Title>Explícalo con tus palabras</Title>
    <Prompt label="DILE">Con tus palabras, ¿para qué sirven el cero y los signos positivo y negativo cuando queremos representar una situación real?</Prompt>
    <Private>Está lograda si explica que el cero funciona como punto de referencia y que los signos indican dónde se encuentra un valor respecto de ese punto.</Private>
    {session.closure === "one" && <FeedbackBox feedback={{ kind: "support", text: "Reconoció una idea. Pregunta solo la faltante: ¿qué información entregan los signos positivo y negativo respecto del cero?" }} />}
    {session.closure === "support" && <FeedbackBox feedback={{ kind: "support", text: "Vuelve al termómetro: ¿qué representa el 0? ¿Cómo sabemos si una temperatura está sobre o bajo ese punto? Luego pídele reformular." }} />}
    <Choice options={[["Explicó ambas ideas", () => update({ closure: "done" })], ["Explicó una idea", () => update({ closure: "one" })], ["Necesita apoyo", () => update({ closure: "support" })]]} />
    {session.closure === "done" && <><Prompt label="DILE" tone="teal">Muy bien, terminamos la clase de hoy. En la próxima clase construiremos una recta numérica para saber dónde se ubica cada entero y cuál es mayor o menor.</Prompt><ActionBar><Action onClick={() => update({ stage: "completed" })}>Finalizar clase</Action></ActionBar></>}
  </>;

  if (session.stage === "completed") return <Center><div className="complete-icon"><Check /></div><p className="eyebrow">Clase completada</p><h1>¡Buen trabajo!</h1><p className="muted">Miniquiz aprobado · cierre oral realizado · próxima clase habilitada.</p><div className="next">Próxima clase: recta numérica, ubicación y comparación de enteros.</div></Center>;
  return <Center><p className="eyebrow">Sesión guardada</p><h1>Terminaremos por hoy</h1><Prompt label="DILE">Hoy trabajamos varias ideas nuevas. La próxima vez retomaremos las que todavía necesitan práctica y seguiremos avanzando paso a paso.</Prompt><p className="muted">La clase queda pendiente y retomará el refuerzo antes de avanzar a la Clase 2.</p></Center>;
}

function Student({ session, update }: { session: Session; update: Updater }) {
  return <section className="product student-product"><header><img src="/logo-estudiosimple.png" alt="EstudioSimple" /><span>Matemática · 7° básico</span><b>OA1 · Clase 1</b></header><div className="student-body"><StudentStage session={session} update={update} /></div></section>;
}

function StudentStage({ session, update }: { session: Session; update: Updater }) {
  if (session.stage === "cover" || session.stage === "prep") return <Hero image="/visuals/mision-portada.png"><div className="glass waiting"><i />La clase comenzará pronto</div></Hero>;
  if (session.stage === "route") return <div className="student-route"><Kicker>Nuestra ruta de Matemática</Kicker><h1>Cuatro grandes bloques</h1><div className="route-grid">
    <Route n="01" title="Números" text="Enteros, fracciones y decimales" color="blue" /><Route n="02" title="Álgebra" text="Patrones, relaciones y ecuaciones" color="orange" /><Route n="03" title="Geometría" text="Formas, medidas y transformaciones" color="yellow" /><Route n="04" title="Datos y azar" text="Información, gráficos y probabilidades" color="teal" />
  </div><div className="today"><Sparkles />Hoy comenzamos con números enteros</div></div>;
  if (session.stage === "thermo" || session.stage === "reference") {
    const reveal = session.stage === "reference" && session.feedback?.kind === "success";
    return <div className="thermo"><Kicker>El cero como punto de referencia</Kicker><h1>{session.stage === "thermo" ? "¿Qué número representa tres grados bajo cero?" : "¿Qué representa −3 °C?"}</h1><div className="thermo-card"><div className="tube"><i /></div><div className="bulb" /><div className="tick-list"><b>+3 °C</b><span>sobre cero</span><b>0 °C</b><span>punto de referencia</span><b>{reveal ? "−3 °C" : "?"}</b><span>bajo cero</span></div></div>{reveal && <Positive>−3 °C representa 3 grados bajo cero</Positive>}</div>;
  }
  if (session.stage === "hook") return <Video src="/media/gancho-submarino.mp4" poster="/visuals/mision-portada.png" play={session.hookStarted} onEnded={() => update({ hookEnded: true })} />;
  if (session.stage === "conversation") { const item = conversation[session.conversationIndex]; return <Hero image="/visuals/desafio-submarino.png"><div className="glass question"><Kicker>Pregunta {session.conversationIndex + 1} de 4</Kicker><h1>{item[0]}</h1>{session.feedback?.kind === "success" && <Positive>{item[3]}</Positive>}</div></Hero>; }
  if (session.stage === "formalization") return <Video src="/media/formalizacion-enteros.mp4" poster="/visuals/cero-referencia.png" play={session.formalStarted} onEnded={() => update({ formalEnded: true })} />;
  if (session.stage === "idea") return <Hero image="/visuals/posicion-movimiento.png" position="center"><div className="glass concept"><Kicker>Comprobemos</Kicker><h1>El ascensor está en el piso −2 y después baja 3 pisos.</h1><div><b>−2</b><b>baja 3 pisos ↓</b></div>{session.feedback?.kind === "success" && <Positive>−2 = posición · bajar 3 pisos = movimiento</Positive>}</div></Hero>;
  if (session.stage === "practice") { const item = practice[session.practiceIndex]; return <div className="student-practice"><Kicker>Practiquemos juntos</Kicker><span>Situación {session.practiceIndex + 1} de 3</span><h1>{item[0]}</h1><div className="practice-card"><p>{item[1]}</p><strong>{session.feedback?.kind === "success" ? item[2] : "?"}</strong></div>{session.feedback?.kind === "success" && <Positive>¡Muy bien! Sigamos avanzando.</Positive>}</div>; }
  if (session.stage === "miniquiz") return <MiniQuiz session={session} update={update} />;
  if (session.stage === "results") { const passed = session.miniScore >= 2; const item = mini[session.reviewIndex]; return <div className="student-result"><div className={passed ? "result passed" : "result needs"}><strong>{session.miniScore} / 3</strong><h1>{passed ? "¡Lograste el mínimo de la clase!" : "Revisemos algunas ideas"}</h1><p>{passed ? "Ahora revisarán juntos cada respuesta." : "Aprender también significa volver a intentarlo."}</p></div>{passed && <div className="review"><Kicker>Revisión {session.reviewIndex + 1} de 3</Kicker><h2>{item.q}</h2><p>Tu respuesta: <b>{session.miniAnswers[session.reviewIndex]}</b></p></div>}</div>; }
  if (session.stage === "recovery") return <RecoveryStudent session={session} update={update} />;
  if (session.stage === "closing") return <div className="student-closing"><div className="zero">0</div><Kicker>Para cerrar…</Kicker><h1>¿Para qué sirven el cero y los signos positivo y negativo cuando representamos una situación real?</h1><p>Respóndelo con tus propias palabras.</p></div>;
  if (session.stage === "completed") return <Hero image="/visuals/mision-cierre.png"><div className="glass finish"><div className="complete-icon"><Check /></div><h1>¡Clase completada!</h1><p>Hoy aprendiste a usar el cero como referencia y a reconocer posiciones con números enteros.</p><span>Próxima clase: ubicaremos y compararemos enteros en la recta numérica.</span></div></Hero>;
  return <Hero image="/visuals/mision-cierre.png"><div className="glass finish"><h1>Buen trabajo por hoy</h1><p>La próxima vez retomaremos estas ideas y practicaremos un poco más.</p><span>Tu avance quedó guardado.</span></div></Hero>;
}

function MiniQuiz({ session, update }: { session: Session; update: Updater }) {
  const complete = session.miniAnswers.every(Boolean);
  return <div className="quiz"><Kicker>Números enteros · Clase 1</Kicker><h1>Miniquiz</h1><p>Responde las tres preguntas y luego envía tus respuestas.</p><div className="quiz-list">{mini.map((item, i) => <fieldset key={item.q}><legend><span>{i + 1}</span>{item.q}</legend><div>{item.options.map(option => <label key={option} className={session.miniAnswers[i] === option ? "selected" : ""}><input type="radio" name={`q${i}`} checked={session.miniAnswers[i] === option} onChange={() => update(s => { const answers = [...s.miniAnswers]; answers[i] = option; return { ...s, miniAnswers: answers }; })} />{option}</label>)}</div></fieldset>)}</div><button disabled={!complete} onClick={() => { const score = session.miniAnswers.filter((a, i) => a === mini[i].correct).length; update({ miniScore: score, stage: "results", reviewIndex: 0 }); }}>Enviar respuestas <ArrowRight /></button></div>;
}

function RecoveryStudent({ session, update }: { session: Session; update: Updater }) {
  const failed = mini.map((q, i) => session.miniAnswers[i] !== q.correct ? i : -1).filter(i => i >= 0);
  const indices = session.miniScore === 1 ? failed.slice(0, 2) : failed.slice(0, 3);
  const total = indices.length, required = session.miniScore === 1 ? 1 : 2;
  const achieved = session.recoveryResults.filter(Boolean).length, complete = session.recoveryResults.length >= total;
  if (complete) return <div className="student-result"><div className={achieved >= required ? "result passed" : "result needs"}><strong>{achieved} / {total}</strong><h1>{achieved >= required ? "¡Comprobación lograda!" : "Seguiremos practicando"}</h1><p>{achieved >= required ? "Aplicaste las ideas en situaciones nuevas." : "Tu avance quedó guardado."}</p></div></div>;
  const item = recovery[indices[session.recoveryIndex] ?? 0];
  return <div className="recovery"><Kicker>Revisemos una idea</Kicker><h1>{item.title}</h1><div className="explain">{item.explain}</div>{session.recoveryVisible && <fieldset><legend>{item.q}</legend>{item.options.map(option => <button key={option} onClick={() => update({ recoveryResults: [...session.recoveryResults, option === item.correct], recoveryIndex: session.recoveryIndex + 1, recoveryVisible: false })}>{option}</button>)}</fieldset>}<p>Aprender también significa volver a intentarlo.</p></div>;
}

function Video({ src, poster, play, onEnded }: { src: string; poster: string; play: boolean; onEnded: () => void }) {
  const ref = useRef<HTMLVideoElement>(null); useEffect(() => { if (play) ref.current?.play().catch(() => undefined); }, [play]);
  return <div className="video"><video ref={ref} src={src} poster={poster} controls playsInline onEnded={onEnded} /></div>;
}

function Hero({ image, position = "center", children }: { image: string; position?: string; children: React.ReactNode }) { return <div className="hero" style={{ backgroundImage: `url('${image}')`, backgroundPosition: position }}>{children}</div>; }
function Center({ children }: { children: React.ReactNode }) { return <div className="center">{children}</div>; }
function Title({ children }: { children: React.ReactNode }) { return <h1 className="page-title">{children}</h1>; }
function Kicker({ children }: { children: React.ReactNode }) { return <p className="kicker">{children}</p>; }
function Counter({ children }: { children: React.ReactNode }) { return <p className="counter">{children}</p>; }
function Prompt({ label, tone = "green", children }: { label: string; tone?: "green" | "teal" | "orange"; children: React.ReactNode }) { return <div className={`prompt ${tone}`}><span>{label}</span><p>{children}</p></div>; }
function Private({ children }: { children: React.ReactNode }) { return <div className="private"><Info /><div><b>Solo para ti</b><p>{children}</p></div></div>; }
function Expected({ children }: { children: React.ReactNode }) { return <div className="expected"><span>Respuesta esperada</span><b>{children}</b></div>; }
function FeedbackBox({ feedback }: { feedback: Feedback }) { return feedback ? <div className={`feedback ${feedback.kind}`}>{feedback.kind === "success" ? <Check /> : <CircleHelp />}<p>{feedback.text}</p></div> : null; }
function Choice({ title, options }: { title?: string; options: [string, () => void][] }) { return <div className="choices">{title && <p>{title}</p>}<div>{options.map(([label, action]) => <button key={label} onClick={action}>{label}</button>)}</div></div>; }
function Action({ onClick, icon, children }: { onClick: () => void; icon?: React.ReactNode; children: React.ReactNode }) { return <button className="action" onClick={onClick}>{icon}{children}<ArrowRight /></button>; }
function Secondary({ onClick, children }: { onClick: () => void; children: React.ReactNode }) { return <button className="secondary" onClick={onClick}>{children}</button>; }
function ActionBar({ children }: { children: React.ReactNode }) { return <div className="action-bar">{children}</div>; }
function Disclosure({ children }: { children: React.ReactNode }) { return <details className="disclosure"><summary><Info />¿Qué ocurrirá?</summary><p>{children}</p></details>; }
function Flow({ title, color, children }: { title: string; color: string; children: React.ReactNode }) { return <article className={color}><b>{title}</b><p>{children}</p></article>; }
function Waiting({ children }: { children: React.ReactNode }) { return <div className="waiting-state"><i />{children}</div>; }
function Positive({ children }: { children: React.ReactNode }) { return <div className="positive"><Check />{children}</div>; }
function Route({ n, title, text, color }: { n: string; title: string; text: string; color: string }) { return <article className={color}><span>{n}</span><h2>{title}</h2><p>{text}</p></article>; }
function Score({ score, total = 3, passed }: { score: number; total?: number; passed: boolean }) { return <div className={`score ${passed ? "passed" : "needs"}`}><b>{score} / {total}</b><span>{passed ? "Comprobación lograda" : "Necesita refuerzo"}</span></div>; }
