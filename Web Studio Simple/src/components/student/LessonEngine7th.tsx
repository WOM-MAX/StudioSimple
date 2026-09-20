import React, { useState } from 'react';
import { MOCK_LESSON_7TH } from '../../data/mockData';
import { EmotionalBattery, DUAMode, GradeLevel } from '../../types';
import { useApp } from '../../context/AppContext';

interface LessonEngine7thProps {
  onComplete?: () => void;
}

// SIMULADOR INTERACTIVO KINESTÉSICO DE NÚMEROS ENTEROS (MATEMÁTICAS)
const MathNumberLineSimulator: React.FC = () => {
  const [items, setItems] = useState([
    { id: 'm1', text: 'Deuda en el banco de $15.000', correctZone: 'negativo', placedZone: null as string | null },
    { id: 'm2', text: 'Temperatura de -8°C en Coyhaique', correctZone: 'negativo', placedZone: null as string | null },
    { id: 'm3', text: 'Depósito a favor de $50.000', correctZone: 'positivo', placedZone: null as string | null },
    { id: 'm4', text: 'Altitud de +2.500m en la Cordillera', correctZone: 'positivo', placedZone: null as string | null },
    { id: 'm5', text: 'Profundidad submarina de -300m', correctZone: 'negativo', placedZone: null as string | null },
  ]);

  const handleClassify = (id: string, zone: 'negativo' | 'positivo') => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, placedZone: zone } : item));
  };

  const unassigned = items.filter(i => i.placedZone === null);
  const correctCount = items.filter(i => i.placedZone === i.correctZone).length;
  const isAllClassified = unassigned.length === 0;

  return (
    <div className="space-y-6">
      {/* Recta Numérica Interactiva (Zona Negativa <--- 0 ---> Zona Positiva) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Zona Negativa (-) */}
        <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-3">
          <div className="flex items-center justify-between border-b border-red-500/20 pb-2">
            <span className="font-bold text-sm text-red-400">← Números Negativos (-)</span>
            <span className="text-[10px] text-white/50">Deudas / Bajo Cero / Profundidades</span>
          </div>
          <div className="min-h-[120px] space-y-2">
            {items.filter(i => i.placedZone === 'negativo').map(item => (
              <div key={item.id} className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-xs font-bold text-white flex justify-between items-center">
                <span>{item.text}</span>
                <span className="text-red-300 font-mono text-[10px]">(-) Negativo</span>
              </div>
            ))}
          </div>
        </div>

        {/* Zona Positiva (+) */}
        <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
            <span className="font-bold text-sm text-emerald-400">Números Positivos (+) →</span>
            <span className="text-[10px] text-white/50">Saldos / Sobre Cero / Altitudes</span>
          </div>
          <div className="min-h-[120px] space-y-2">
            {items.filter(i => i.placedZone === 'positivo').map(item => (
              <div key={item.id} className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-xs font-bold text-white flex justify-between items-center">
                <span>{item.text}</span>
                <span className="text-emerald-300 font-mono text-[10px]">(+) Positivo</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tarjetas por clasificar */}
      {unassigned.length > 0 ? (
        <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3">
          <span className="text-[10px] font-extrabold uppercase text-[#F8AD22]">Situaciones Reales por Clasificar en la Recta:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {unassigned.map(item => (
              <div key={item.id} className="p-3 rounded-xl bg-black/30 border border-white/15 text-xs font-bold text-white flex flex-col justify-between gap-2">
                <span>{item.text}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleClassify(item.id, 'negativo')}
                    className="flex-1 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white font-bold text-[10px] transition-all border border-red-500/40"
                  >
                    Asignar a Negativo (-)
                  </button>
                  <button
                    onClick={() => handleClassify(item.id, 'positivo')}
                    className="flex-1 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white font-bold text-[10px] transition-all border border-emerald-500/40"
                  >
                    Asignar a Positivo (+)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-5 rounded-2xl bg-emerald-500/20 border border-emerald-500 text-center space-y-2">
          <div className="text-3xl">🎉</div>
          <h4 className="text-base font-black text-white">¡Simulación Completada! ({correctCount} / {items.length} Correctos)</h4>
          <p className="text-xs text-white/80">Has demostrado la comprensión kinestésica del origen y la recta numérica de enteros (+ y -).</p>
        </div>
      )}
    </div>
  );
};

const LESSONS_BY_SUBJECT: Record<string, typeof MOCK_LESSON_7TH> = {
  Historia: MOCK_LESSON_7TH,
  Matemáticas: {
    id: 'les-mat-701',
    title: 'Operaciones con Números Enteros (Positivos y Negativos) en Situaciones Reales',
    subject: 'Matemáticas',
    grade: '7° Básico',
    durationMinutes: 30,
    copiloto: {
      mineducOA: 'Mostrar que comprenden la adición y la sustracción de números enteros en contextos cotidianos (deudas, temperaturas, altitudes).',
      simplification: 'Explicaremos los números enteros usando situaciones reales como saldo a favor (+), deudas (-), sobre el nivel del mar (+) y bajo cero (-).',
      openingScript: 'Imagina que tienes $5.000 en el bolsillo pero le debes $8.000 a un amigo. ¿Tienes dinero o tienes una deuda? Hoy entenderemos cómo funcionan los números enteros positivos y negativos en la vida diaria.',
      alerts: ['Recuerda recalcar que el cero es el punto de origen neutro en la recta numérica.'],
      counterExample: 'Ojo: -10 es menor que -2 aunque 10 sea más grande que 2, porque está más lejos a la izquierda del cero.',
      finalSummaryScript: '¡Excelente trabajo! Hoy aprendiste a representar y operar números enteros en la recta numérica.',
      mentorTraining: {
        audioTitle: '🎧 Cápsula Podcast Mentor: Cómo explicar números enteros sin enredarse',
        audioDuration: '1:30 min',
        videoTitle: '🎥 Video Express (60s): La Recta Numérica y Situaciones Reales',
        summaryBulletPoints: [
          'Números Positivos (+): Representan ganancias, temperaturas sobre cero y altitudes.',
          'Números Negativos (-): Representan deudas, temperaturas bajo cero y profundidades.',
          'El Cero (0): Es el punto de origen neutro (ni positivo ni negativo).',
        ],
        homeAnalogy: 'Compáralo con el ascensor de un edificio: los pisos hacia arriba son positivos (+) y los subterráneos son negativos (-). El piso 0 es la calle.',
        commonMistakes: [
          'Confundir que -8 es mayor que -2 (en realidad -2 es mayor porque está más cerca de 0).',
        ],
        socraticQuestions: [
          'Si la temperatura en Coyhaique es de -3°C y baja 5°C más, ¿cuál es la nueva temperatura?',
        ],
      },
    },
    studentMission: 'Dominar la recta numérica y resolver operaciones con números enteros positivos y negativos en situaciones cotidianas.',
    cards: [
      {
        id: 'card-mat-1',
        title: 'Tarjeta 1: Origen y Recta Numérica',
        content: 'Los números enteros (ℤ) incluyen los positivos (+), los negativos (-) y el cero (0) como origen neutro.',
        copilotoAlert: 'Recordatorio: Los negativos siempre van a la izquierda del 0.',
      },
      {
        id: 'card-mat-2',
        title: 'Tarjeta 2: Suma de Enteros',
        content: 'Al sumar números del mismo signo, se suman los valores y se mantiene el signo. Si tienen signos distintos, se restan y gana el signo del mayor.',
        copilotoAlert: 'Usa el ejemplo del dinero: ganancia (+) vs deuda (-).',
      },
    ],
    mineducExam: [
      {
        id: 'qm1',
        question: '1. ¿Cuál es el resultado de la siguiente operación con números enteros: (-15) + (+20)?',
        options: [
          'a) -35',
          'b) +5',
          'c) -5',
          'd) +35'
        ],
        correctIndex: 1,
        explanation: '¡Correcto! (Opción b). Al sumar un número negativo (-15) con uno positivo (+20), restamos sus valores (20 - 15 = 5) y conservamos el signo del número de mayor valor absoluto (+).'
      },
      {
        id: 'qm2',
        question: '2. Un buzo se encuentra a -12 metros bajo el nivel del mar y desciende 8 metros más. ¿A qué profundidad se encuentra ahora?',
        options: [
          'a) -4 metros',
          'b) +20 metros',
          'c) -20 metros',
          'd) -96 metros'
        ],
        correctIndex: 2,
        explanation: '¡Correcto! (Opción c). Al descender 8 metros más desde -12 m, sumamos dos cantidades negativas: (-12) + (-8) = -20 metros.'
      },
      {
        id: 'qm3',
        question: '3. ¿Qué representa el número entero 0 en la recta numérica?',
        options: [
          'a) El valor positivo más grande',
          'b) El punto de origen y equilibrio neutro (ni positivo ni negativo)',
          'c) Un número estrictamente negativo',
          'd) Un valor indeterminado'
        ],
        correctIndex: 1,
        explanation: '¡Correcto! (Opción b). El cero es el origen neutro; separa los valores negativos a la izquierda de los positivos a la derecha.'
      },
      {
        id: 'qm4',
        question: '4. ¿Cuál de las siguientes relaciones de orden entre números enteros es CORRECTA?',
        options: [
          'a) -10 > -2',
          'b) -5 > +1',
          'c) -8 < -3',
          'd) 0 < -15'
        ],
        correctIndex: 2,
        explanation: '¡Correcto! (Opción c). En los números negativos, cuanto más a la izquierda del cero está un número, menor es su valor. Por eso -8 es menor que -3 (-8 < -3).'
      }
    ],
    dragDropGame: {
      title: 'Simulador: La Recta Numérica de Enteros',
      items: [
        { id: 'item-m1', text: 'Deuda bancaria de $15.000', targetGroup: 'nomada' },
        { id: 'item-m2', text: 'Depósito a favor de $50.000', targetGroup: 'sedentario' },
        { id: 'item-m3', text: 'Temperatura de -8°C', targetGroup: 'nomada' },
        { id: 'item-m4', text: 'Altitud de +2.500m', targetGroup: 'sedentario' },
      ],
      copilotoQuestion: 'Pregunta guía: "¿Qué zona de la recta representa las situaciones de saldo a favor o elevación sobre el nivel del mar?"',
    },
    duaOptions: [
      { mode: 'audio', title: 'A) Modo Audio 🎙️', instruction: 'Explica con tus palabras por qué -5 es mayor que -10.', icon: 'mic' },
      { mode: 'visual', title: 'B) Modo Visual ✏️', instruction: 'Dibuja una recta numérica con el cero en el centro.', icon: 'draw' },
      { mode: 'text', title: 'C) Modo Texto 💬', instruction: 'Escribe un problema cotidiano que use números negativos.', icon: 'chat' },
    ],
    exitTicket: {
      question1: {
        text: '1. ¿Cuál es el resultado de (-5) + (+5)?',
        options: [
          { id: 'opt-m1', text: '0 (Neutro)', isCorrect: true },
          { id: 'opt-m2', text: '+10', isCorrect: false },
        ],
      },
      question2: {
        text: '2. ¿El número -100 está más lejos del 0 que el número -10?',
        isTrueFalse: true,
        correctAnswer: true,
      },
      metacognitionQuestion: '3. ¿Qué fue lo más fácil de entender sobre los números positivos y negativos?',
    },
  },
  Lenguaje: {
    id: 'les-len-701',
    title: 'Comprensión de Textos Narrativos e Inferencias de Lectura',
    subject: 'Lenguaje',
    grade: '7° Básico',
    durationMinutes: 30,
    copiloto: {
      mineducOA: 'Hacer inferencias en la lectura de textos narrativos e identificar la idea principal y el conflicto central.',
      simplification: 'Aprenderemos a leer entre líneas descubriendo pistas que el autor deja en la historia.',
      openingScript: 'Un buen lector es como un detective: no solo lee las palabras explícitas, sino que descubre las pistas ocultas. ¡Hoy resolveremos misterios narrativos!',
      alerts: ['Asegúrate de explicar la diferencia entre información explícita e implícita.'],
      counterExample: 'Inferencia no es inventar; requiere basarse en pistas reales del texto.',
      finalSummaryScript: '¡Felicitaciones! Has demostrado habilidades de detective literario haciendo inferencias precisas.',
      mentorTraining: {
        audioTitle: '🎧 Cápsula Podcast Mentor: Cómo hacer inferencias sin adivinar',
        audioDuration: '1:30 min',
        videoTitle: '🎥 Video Express (60s): Pistas Explícitas e Implícitas',
        summaryBulletPoints: [
          'Información Explícita: Está escrita directamente en el texto.',
          'Información Implícita: Debes deducirla uniendo pistas del texto con tus conocimientos.',
        ],
        homeAnalogy: 'Si ves a alguien entrar con paraguas mojado y abrigo goteando, infieres que está lloviendo afuera aunque no te lo digan.',
        commonMistakes: ['Confundir una inferencia basada en texto con una suposición al azar sin pruebas.'],
        socraticQuestions: ['¿Qué pistas del texto te permitieron saber lo que sentía el personaje sin que lo dijera?'],
      },
    },
    studentMission: 'Convertirte en un detective de la lectura descubriendo las ideas implícitas en relatos narrativos.',
    cards: [
      { id: 'card-len-1', title: 'Tarjeta 1: Pistas Explícitas', content: 'Son los datos que el autor escribe directamente.', copilotoAlert: 'Ejemplo: "Juan llevaba abrigo rosa".' },
      { id: 'card-len-2', title: 'Tarjeta 2: Inferencias Implícitas', content: 'Es lo que deduces al unir las pistas del relato con tu experiencia.', copilotoAlert: 'Pista: Si tiritaba, infieres que tenía frío.' },
    ],
    mineducExam: [
      {
        id: 'ql1',
        question: '1. ¿Qué es hacer una inferencia en la lectura de un texto narrativo?',
        options: [
          'a) Repetir exactamente las palabras escritas por el autor',
          'b) Inventar un final alternativo para la historia',
          'c) Deducir información implícita uniendo pistas del texto con conocimientos previos',
          'd) Buscar el significado de palabras en el diccionario'
        ],
        correctIndex: 2,
        explanation: '¡Correcto! (Opción c). Hacer una inferencia es leer entre líneas: descubrir información no dicha explícitamente a partir de pistas del texto.'
      },
      {
        id: 'ql2',
        question: '2. En una narración, ¿cuál es la función del conflicto dramático o problema central?',
        options: [
          'a) Impulsar las acciones de los personajes y desencadenar el desarrollo de la trama',
          'b) Describir únicamente el paisaje del relato',
          'c) Confundir al lector para que no entienda la historia',
          'd) Presentar la biografía del autor'
        ],
        correctIndex: 0,
        explanation: '¡Correcto! (Opción a). El conflicto rompe el equilibrio inicial y obliga a los personajes a actuar para solucionarlo.'
      },
      {
        id: 'ql3',
        question: '3. ¿Qué caracteriza al narrador en primera persona (protagonista)?',
        options: [
          'a) Conoce los pensamientos de todos los personajes sin estar presente',
          'b) Relata los hechos participando directamente en la historia como personaje',
          'c) Habla desde fuera de la historia usando la tercera persona',
          'd) Es un personaje secundario que no influye en la trama'
        ],
        correctIndex: 1,
        explanation: '¡Correcto! (Opción b). El narrador en primera persona cuenta los acontecimientos desde su perspectiva vivida.'
      },
      {
        id: 'ql4',
        question: '4. ¿Por qué es fundamental identificar la idea principal de un párrafo?',
        options: [
          'a) Para sintetizar el mensaje clave sin perderse en detalles secundarios',
          'b) Para contar el número de palabras por oración',
          'c) Para memorizar los nombres de todos los personajes',
          'd) Para corregir la ortografía del texto'
        ],
        correctIndex: 0,
        explanation: '¡Correcto! (Opción a). Identificar la idea principal permite extraer la esencia del texto.'
      }
    ],
    dragDropGame: {
      title: 'Simulador: Detectives de la Lectura',
      items: [
        { id: 'item-l1', text: '"Pedro sonreía y daba saltos"', targetGroup: 'sedentario' },
        { id: 'item-l2', text: 'Inferencia: Pedro está feliz', targetGroup: 'nomada' },
      ],
      copilotoQuestion: '¿Qué pistas te permiten inferir el estado de ánimo de un personaje?',
    },
    duaOptions: [
      { mode: 'audio', title: 'A) Modo Audio 🎙️', instruction: 'Resume la historia escuchada en un audio de 30s.', icon: 'mic' },
      { mode: 'visual', title: 'B) Modo Visual ✏️', instruction: 'Dibuja la escena principal del relato.', icon: 'draw' },
      { mode: 'text', title: 'C) Modo Texto 💬', instruction: 'Escribe la idea principal en una frase corta.', icon: 'chat' },
    ],
    exitTicket: {
      question1: { text: '1. ¿Una inferencia requiere pistas reales del texto?', options: [{ id: 'opt-l1', text: 'Sí, siempre', isCorrect: true }] },
      question2: { text: '2. ¿La idea principal es lo mismo que un detalle secundario?', isTrueFalse: true, correctAnswer: false },
      metacognitionQuestion: '3. ¿Qué estrategia usas cuando no entiendes un párrafo?',
    },
  },
  Ciencias: {
    id: 'les-cie-701',
    title: 'La Célula como Unidad Estructural y Funcional de la Vida',
    subject: 'Ciencias Naturales',
    grade: '7° Básico',
    durationMinutes: 30,
    copiloto: {
      mineducOA: 'Reconocer que la célula es la unidad básica de los seres vivos y diferenciar sus orgánulos principales.',
      simplification: 'Descubriremos que todos los seres vivos estamos construidos por diminutas fábricas vivas llamadas células.',
      openingScript: '¿Sabías que tu cuerpo tiene más de 30 billones de pequeñas fábricas trabajando 24/7? Esas fábricas son tus células. ¡Hoy entraremos a su laboratorio!',
      alerts: ['Explicar la diferencia entre célula vegetal y animal.'],
      counterExample: 'Los virus no son células completas porque no pueden reproducirse solos.',
      finalSummaryScript: '¡Gran trabajo biológico! Has identificado la estructura fundamental de la vida.',
      mentorTraining: {
        audioTitle: '🎧 Cápsula Podcast Mentor: La célula explicada como una ciudad',
        audioDuration: '1:30 min',
        videoTitle: '🎥 Video Express (60s): Célula Animal vs Célula Vegetal',
        summaryBulletPoints: [
          'Membrana Plasmática: La muralla o aduana de la célula.',
          'Mitocondrias: Las centrales eléctricas que producen energía (ATP).',
          'Núcleo: El centro de mando que guarda el ADN.',
        ],
        homeAnalogy: 'Imagina una ciudad: el núcleo es la municipalidad, las mitocondrias la central eléctrica y la membrana los límites de la ciudad.',
        commonMistakes: ['Confundir célula vegetal (con pared celular y cloroplastos) con célula animal.'],
        socraticQuestions: ['¿Qué pasaría si la membrana celular dejara entrar todo sin filtro?'],
      },
    },
    studentMission: 'Explorar los orgánulos celulares y comprender por qué la célula es la unidad viva de todo ser existente.',
    cards: [
      { id: 'card-c-1', title: 'Tarjeta 1: Membrana Celular', content: 'Controla lo que entra y sale de la célula.', copilotoAlert: 'Aduana celular.' },
      { id: 'card-c-2', title: 'Tarjeta 2: Mitocondria', content: 'Produce la energía (ATP) para que la célula trabaje.', copilotoAlert: 'Central eléctrica.' },
    ],
    mineducExam: [
      {
        id: 'qc1',
        question: '1. ¿Cuál es la función principal de la membrana plasmática celular?',
        options: [
          'a) Producir energía mediante fotosíntesis',
          'b) Almacenar el material genético de la célula',
          'c) Regular el transporte de sustancias hacia el interior y exterior celular',
          'd) Destruir las proteínas inservibles'
        ],
        correctIndex: 2,
        explanation: '¡Correcto! (Opción c). La membrana celular regula selectivamente el paso de agua, nutrientes y desechos.'
      },
      {
        id: 'qc2',
        question: '2. ¿Qué orgánulo celular es responsable de la respiración celular y generación de energía (ATP)?',
        options: [
          'a) Los ribosomas',
          'b) Las mitocondrias',
          'c) El aparato de Golgi',
          'd) Los lisosomas'
        ],
        correctIndex: 1,
        explanation: '¡Correcto! (Opción b). Las mitocondrias transforman la glucosa y oxígeno en energía celular (ATP).'
      },
      {
        id: 'qc3',
        question: '3. ¿Qué estructuras diferencian a una célula vegetal de una célula animal?',
        options: [
          'a) Pared celular de celulosa y cloroplastos',
          'b) Ausencia de núcleo definido',
          'c) Presencia de flagelos móviles',
          'd) Ausencia de membrana celular'
        ],
        correctIndex: 0,
        explanation: '¡Correcto! (Opción a). Las células vegetales poseen pared rígida y cloroplastos para fotosíntesis.'
      },
      {
        id: 'qc4',
        question: '4. ¿Por qué se define a la célula como la unidad funcional de los seres vivos?',
        options: [
          'a) Porque es visible a simple vista',
          'b) Porque no necesita oxígeno',
          'c) Porque ejecuta por sí misma las funciones vitales de nutrición, relación y reproducción',
          'd) Porque solo existe en animales'
        ],
        correctIndex: 2,
        explanation: '¡Correcto! (Opción c). Es la unidad funcional básica porque en su interior ocurren todas las reacciones químicas vitales.'
      }
    ],
    dragDropGame: {
      title: 'Simulador: Fábrica Celular',
      items: [
        { id: 'item-c1', text: 'Pared celular', targetGroup: 'sedentario' },
        { id: 'item-c2', text: 'Membrana flexible', targetGroup: 'nomada' },
      ],
      copilotoQuestion: '¿Qué orgánulo fabrica la energía de la célula?',
    },
    duaOptions: [
      { mode: 'audio', title: 'A) Modo Audio 🎙️', instruction: 'Explica la función de la mitocondria.', icon: 'mic' },
      { mode: 'visual', title: 'B) Modo Visual ✏️', instruction: 'Dibuja una célula vegetal con sus cloroplastos.', icon: 'draw' },
      { mode: 'text', title: 'C) Modo Texto 💬', instruction: 'Describe 3 partes principales de la célula.', icon: 'chat' },
    ],
    exitTicket: {
      question1: { text: '1. ¿Las plantas tienen células vegetales con pared rígida?', options: [{ id: 'opt-c1', text: 'Sí, de celulosa', isCorrect: true }] },
      question2: { text: '2. ¿El núcleo guarda la información genética (ADN)?', isTrueFalse: true, correctAnswer: true },
      metacognitionQuestion: '3. ¿Qué analogía usarías para explicar la célula a un amigo?',
    },
  },
  Inglés: {
    id: 'les-ing-701',
    title: 'Daily Routines and Everyday Vocabulary (Present Simple)',
    subject: 'Inglés',
    grade: '7° Básico',
    durationMinutes: 30,
    copiloto: {
      mineducOA: 'Comprender y expresar acciones cotidianas en Presente Simple.',
      simplification: 'Aprenderemos a hablar sobre nuestras rutinas diarias en inglés.',
      openingScript: 'Welcome! Today we will learn how to describe your everyday activities in English: from waking up to studying!',
      alerts: ['Recuerda la regla de la tercera persona singular (-s / -es).'],
      counterExample: 'En preguntas se usa "Do/Does" antes del sujeto.',
      finalSummaryScript: 'Great job! You can now talk about daily habits in English with confidence.',
      mentorTraining: {
        audioTitle: '🎧 Podcast Capsule: Daily habits in English',
        audioDuration: '1:30 min',
        videoTitle: '🎥 Express Video: Present Simple Rules',
        summaryBulletPoints: [
          'I/You/We/They -> base verb (I play).',
          'He/She/It -> verb + s (She plays).',
        ],
        homeAnalogy: 'Es como tu horario escolar diario: lo que haces habitualmente todos los días.',
        commonMistakes: ['Olvidar la -s en He/She/It.'],
        socraticQuestions: ['What time do you usually wake up on Mondays?'],
      },
    },
    studentMission: 'Master the Present Simple tense to talk about habits and daily routines.',
    cards: [
      { id: 'card-i-1', title: 'Card 1: Morning Routine', content: 'I wake up at 7:00 AM every morning.', copilotoAlert: 'Acción habitual.' },
      { id: 'card-i-2', title: 'Card 2: Third Person (-s)', content: 'He plays football after school.', copilotoAlert: 'Añadir -s a He/She.' },
    ],
    mineducExam: [
      {
        id: 'qi1',
        question: '1. Which sentence is correctly written in the Present Simple tense for daily routines?',
        options: [
          'a) She playing basketball yesterday.',
          'b) She plays basketball every Tuesday.',
          'c) She play basketball tomorrow.',
          'd) She played basketball right now.'
        ],
        correctIndex: 1,
        explanation: 'Correct! (Option b). In Present Simple for third-person singular (she), we add "-s" to the verb when describing regular habits.'
      },
      {
        id: 'qi2',
        question: '2. What is the correct question format to ask about someone\'s morning routine?',
        options: [
          'a) What time do you usually wake up?',
          'b) What time you wake up?',
          'c) Where waking up you?',
          'd) Why do wake up you?'
        ],
        correctIndex: 0,
        explanation: 'Correct! (Option a). Questions in Present Simple with "you" use the auxiliary verb "do" before the subject.'
      },
      {
        id: 'qi3',
        question: '3. Complete the negative sentence: "My brother __________ cold milk in the morning."',
        options: [
          'a) not likes',
          'b) do not like',
          'c) does not like',
          'd) is not like'
        ],
        correctIndex: 2,
        explanation: 'Correct! (Option c). For third person (my brother = he), we use "does not" (doesn\'t) followed by the base verb.'
      },
      {
        id: 'qi4',
        question: '4. What does the frequency adverb "usually" mean in Spanish?',
        options: [
          'a) Nunca / Jamás',
          'b) Usualmente / Por lo general',
          'c) Rara vez / Casi nunca',
          'd) Siempre / Todos los segundos'
        ],
        correctIndex: 1,
        explanation: 'Correct! (Option b). "Usually" indicates an action that happens regularly (usualmente).'
      }
    ],
    dragDropGame: {
      title: 'Simulator: Daily Routine Match',
      items: [
        { id: 'item-i1', text: 'I wake up at 7 AM', targetGroup: 'sedentario' },
        { id: 'item-i2', text: 'She plays tennis', targetGroup: 'nomada' },
      ],
      copilotoQuestion: 'What is the auxiliary verb for negative sentences with "He"?',
    },
    duaOptions: [
      { mode: 'audio', title: 'A) Audio Mode 🎙️', instruction: 'Say 2 sentences about your daily routine.', icon: 'mic' },
      { mode: 'visual', title: 'B) Visual Mode ✏️', instruction: 'Draw your favorite morning activity.', icon: 'draw' },
      { mode: 'text', title: 'C) Text Mode 💬', instruction: 'Write 3 sentences about your habits.', icon: 'chat' },
    ],
    exitTicket: {
      question1: { text: '1. Do we add "-s" to the verb for "She" in Present Simple?', options: [{ id: 'opt-i1', text: 'Yes, always for He/She/It', isCorrect: true }] },
      question2: { text: '2. Does "usually" mean "never" in English?', isTrueFalse: true, correctAnswer: false },
      metacognitionQuestion: '3. Which English routine word was easiest to remember today?',
    },
  },
};

export const LessonEngine7th: React.FC<LessonEngine7thProps> = ({ onComplete }) => {
  const { authSession } = useApp();
  const isAdmin = authSession?.role === 'admin';

  // Curriculum selection state
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('7° Básico');
  const [selectedSubject, setSelectedSubject] = useState<'Historia' | 'Matemáticas' | 'Lenguaje' | 'Ciencias' | 'Inglés'>('Historia');
  const [selectedAxis, setSelectedAxis] = useState('Eje Historia Universal: Civilizaciones y Sociedad');
  const [selectedOaCode, setSelectedOaCode] = useState('OA 01');

  const lesson = LESSONS_BY_SUBJECT[selectedSubject] || MOCK_LESSON_7TH;

  // State
  const [currentStep, setCurrentStep] = useState<number>(1); // Steps 1 to 7
  const [maxReachedStep, setMaxReachedStep] = useState<number>(1); // Step-locking control
  const [isAutonomyAwarded, setIsAutonomyAwarded] = useState<boolean>(false);
  const [battery, setBattery] = useState<EmotionalBattery | null>(null);
  const [isShortRoute, setIsShortRoute] = useState<boolean>(false);
  const [selectedMood, setSelectedMood] = useState<'motivated' | 'calm' | 'tired' | 'anxious' | null>(null);
  const [isPlayingMentorAudio, setIsPlayingMentorAudio] = useState<boolean>(false);
  const [showBreathingModal, setShowBreathingModal] = useState<boolean>(false);
  const [showCurriculumSelector, setShowCurriculumSelector] = useState<boolean>(false);
  const [activeInfographicTab, setActiveInfographicTab] = useState<'thermometer' | 'finance'>('thermometer');
  const [showInfographicModal, setShowInfographicModal] = useState<boolean>(false);

  // Estado de Hibridación Emocional Adaptativa (Pena, Frustración, Cansancio, Expresión Libre)
  const [customEmotionInput, setCustomEmotionInput] = useState<string>('');
  const [hybridEmotionState, setHybridEmotionState] = useState<{
    emotionType: 'sadness' | 'grief' | 'frustration' | 'fatigue' | 'anxiety' | 'normal';
    label: string;
    pedagogicalAdaptation: string;
    isMicroVictoriesActive: boolean;
  } | null>(null);

  const analyzeAndHybridizeEmotion = (inputText: string) => {
    const text = inputText.toLowerCase().trim();
    if (!text) return;

    if (text.includes('pena') || text.includes('triste') || text.includes('duelo') || text.includes('dolor') || text.includes('angustia') || text.includes('llor') || text.includes('solo') || text.includes('mal')) {
      const state = {
        emotionType: 'sadness' as const,
        label: 'Pena / Tristeza o Afligimiento',
        pedagogicalAdaptation: 'Hibridación Activa: Modo Micro-Victorias. Cápsulas breves de 3 minutos, cero temporizadores de presión, pistas automáticas sin penalización y evaluación adaptativa de éxito sostenido.',
        isMicroVictoriesActive: true
      };
      setHybridEmotionState(state);
      setSelectedMood('anxious');
      setIsShortRoute(true);
    } else if (text.includes('frustra') || text.includes('rabia') || text.includes('enojad') || text.includes('molest') || text.includes('bronca')) {
      const state = {
        emotionType: 'frustration' as const,
        label: 'Frustración o Impaciencia',
        pedagogicalAdaptation: 'Hibridación Activa: Descomposición de Ejemplos. Paso directo a resolución asistida con ejemplos resueltos en papel y feedback sin juicio.',
        isMicroVictoriesActive: true
      };
      setHybridEmotionState(state);
      setSelectedMood('anxious');
    } else if (text.includes('cansa') || text.includes('sueño') || text.includes('agota') || text.includes('sin ganas') || text.includes('floj')) {
      const state = {
        emotionType: 'fatigue' as const,
        label: 'Cansancio o Fatiga Mental',
        pedagogicalAdaptation: 'Hibridación Activa: Ruta Corta de 15 Minutos sintética y descansos guiados de respiración.',
        isMicroVictoriesActive: true
      };
      setHybridEmotionState(state);
      setSelectedMood('tired');
      setIsShortRoute(true);
    } else {
      const state = {
        emotionType: 'normal' as const,
        label: `Estado Expresado: "${inputText}"`,
        pedagogicalAdaptation: 'Hibridación Activa: Acompañamiento personalizado y ritmo adaptado al alumno.',
        isMicroVictoriesActive: false
      };
      setHybridEmotionState(state);
      setSelectedMood('calm');
    }
  };

  // Tono Binaural de Relajación para Pausa de Respiración (432Hz)
  const playAmbientBreathingTone = (durationSeconds: number) => {
    try {
      if (typeof window === 'undefined') return;
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.5);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + durationSeconds);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + durationSeconds);
    } catch (e) {
      console.log('Audio Ambient not supported');
    }
  };
  
  // Drag and drop simulator state
  const [dragItems, setDragItems] = useState(lesson.dragDropGame.items.map(item => ({ ...item, placedIn: null as 'nomada' | 'sedentario' | null })));
  
  // DUA response state
  const [selectedDuaMode, setSelectedDuaMode] = useState<DUAMode | null>(null);
  const [duaTextInput, setDuaTextInput] = useState('');
  const [duaAudioRecorded, setDuaAudioRecorded] = useState(false);
  const [duaVisualDone, setDuaVisualDone] = useState(false);

  // Exit ticket state
  const [q1Answer, setQ1Answer] = useState<string | null>(null);
  const [q2Answer, setQ2Answer] = useState<boolean | null>(null);
  const [metacognitionInput, setMetacognitionInput] = useState('');
  const [showExitFeedback, setShowExitFeedback] = useState(false);
  // Mineduc exam state
  const [examAnswers, setExamAnswers] = useState<Record<string, number>>({});
  const [showExamResult, setShowExamResult] = useState(false);

  const handleSelectExamAnswer = (questionId: string, optionIndex: number) => {
    setExamAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateExamScore = () => {
    if (!lesson.mineducExam) return 100;
    let correct = 0;
    lesson.mineducExam.forEach(q => {
      if (examAnswers[q.id] === q.correctIndex) correct++;
    });
    return Math.round((correct / lesson.mineducExam.length) * 100);
  };

  // Handlers
  const handleSelectBattery = (selected: EmotionalBattery) => {
    setBattery(selected);
    if (selected === 'low') {
      setIsShortRoute(true);
    } else {
      setIsShortRoute(false);
    }
  };

  const handlePlaceItem = (itemId: string, target: 'nomada' | 'sedentario') => {
    setDragItems(prev => prev.map(item => item.id === itemId ? { ...item, placedIn: target } : item));
  };

  const isDragGameComplete = dragItems.every(i => i.placedIn !== null);

  const handleFinishExitTicket = () => {
    setShowExitFeedback(true);
    if (onComplete) onComplete();
  };

  // Curriculum selection state (definida al inicio de LessonEngine7th)
  const SUBJECTS = [
    { id: 'Historia', name: 'Historia y Geografía', icon: '📜', axis: 'Eje Historia Universal: Civilizaciones y Sociedad', oas: [
      { code: 'OA 01', title: 'Proceso de sedentarización humana en el Neolítico (Activo)', active: true, unlocked: true },
      { code: 'OA 02', title: 'Surgimiento de las primeras civilizaciones (Mesopotamia, Egipto)', active: false, unlocked: false },
      { code: 'OA 03', title: 'El legado del mundo clásico (Grecia y Roma)', active: false, unlocked: false }
    ]},
    { id: 'Matemáticas', name: 'Matemáticas', icon: '📐', axis: 'Eje Números y Álgebra', oas: [
      { code: 'OA 01', title: 'Operaciones con números enteros (Activo)', active: true, unlocked: true },
      { code: 'OA 02', title: 'Razones y proporciones', active: false, unlocked: false },
      { code: 'OA 03', title: 'Álgebra y expresiones compuestas', active: false, unlocked: false }
    ]},
    { id: 'Lenguaje', name: 'Lenguaje y Comunicación', icon: '📚', axis: 'Eje Lectura y Comprensión Literaria', oas: [
      { code: 'OA 01', title: 'Comprensión de textos narrativos e inferencias', active: true, unlocked: true },
      { code: 'OA 02', title: 'Análisis de textos argumentativos y postura del autor', active: false, unlocked: false }
    ]},
    { id: 'Ciencias', name: 'Ciencias Naturales', icon: '🔬', axis: 'Eje Biología y Ecosistemas', oas: [
      { code: 'OA 01', title: 'La célula como unidad estructura de la vida', active: true, unlocked: true },
      { code: 'OA 02', title: 'Sistemas del cuerpo humano e interacción', active: false, unlocked: false }
    ]},
    { id: 'Inglés', name: 'Inglés', icon: '🔤', axis: 'Eje Comunicación Oral y Escrita', oas: [
      { code: 'OA 01', title: 'Comprensión auditiva y vocabulario cotidiano', active: true, unlocked: true },
      { code: 'OA 02', title: 'Expresión escrita y estructuras gramaticales básicas', active: false, unlocked: false }
    ]}
  ];

  const currentSubjectObj = SUBJECTS.find(s => s.id === selectedSubject) || SUBJECTS[0];

  return (
    <div className="space-y-6">

      {/* BARRA DE NAVEGACIÓN Y SELECCIÓN CURRICULAR NORDIC CLEAN (ULTRA-SLIM GLASSMORPHIC HEADER) */}
      <div className="relative z-30 bg-[#1C3257]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-xl flex flex-wrap items-center justify-between gap-3">
        
        {/* Izquierda: Selector de Curso y Asignatura en Píldoras Desplegables */}
        <div className="flex items-center gap-2">
          {/* Selector de Curso (Admin o Fijo) */}
          {isAdmin ? (
            <div className="flex items-center gap-1.5 bg-[#18AFCB]/15 border border-[#18AFCB]/30 rounded-xl px-3 py-1">
              <span className="text-[11px] font-semibold text-[#18AFCB]">Curso:</span>
              <select
                value={selectedGrade}
                onChange={e => setSelectedGrade(e.target.value as GradeLevel)}
                className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
              >
                {['3° Básico', '4° Básico', '5° Básico', '6° Básico', '7° Básico', '8° Básico'].map(g => (
                  <option key={g} value={g} className="bg-[#1E293B] text-white">{g}</option>
                ))}
              </select>
            </div>
          ) : (
            <span className="bg-white/10 text-white/90 font-semibold text-xs px-3 py-1.5 rounded-xl border border-white/10">
              🎓 {selectedGrade}
            </span>
          )}

          {/* Desplegable de Asignatura */}
          <div className="relative">
            <button
              onClick={() => setShowCurriculumSelector(!showCurriculumSelector)}
              className="bg-[#18AFCB]/15 hover:bg-[#18AFCB]/25 text-white font-semibold text-xs px-3 py-1.5 rounded-xl border border-[#18AFCB]/30 flex items-center gap-2 transition-all shadow-sm"
            >
              <span>{currentSubjectObj.icon}</span>
              <span>{currentSubjectObj.name}</span>
              <span className="material-symbols-outlined text-sm opacity-60">expand_more</span>
            </button>

            {/* Menu Desplegable de Asignaturas */}
            {showCurriculumSelector && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-[#1E293B] border border-white/15 rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 space-y-1">
                <div className="text-[10px] font-bold uppercase text-white/50 px-3 py-1 tracking-wider">Asignatura</div>
                {SUBJECTS.map(subj => (
                  <button
                    key={subj.id}
                    onClick={() => {
                      setSelectedSubject(subj.id as any);
                      setSelectedAxis(subj.axis);
                      setSelectedOaCode(subj.oas[0].code);
                      setShowCurriculumSelector(false);
                      setCurrentStep(1);
                      setMaxReachedStep(1);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2.5 ${
                      selectedSubject === subj.id
                        ? 'bg-[#18AFCB] text-white font-semibold'
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <span>{subj.icon}</span>
                    <span>{subj.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Centro: Selector Unificado Desplegable de Objetivo de Aprendizaje (OA) */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-[#F8AD22] hidden md:inline">Objetivo:</span>
          <select
            value={selectedOaCode}
            onChange={e => setSelectedOaCode(e.target.value)}
            className="bg-black/40 border border-white/15 text-white text-xs font-medium rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer hover:bg-white/10 transition-all max-w-[280px] md:max-w-md truncate"
          >
            {currentSubjectObj.oas.map(oa => {
              const isUnlocked = isAdmin || oa.unlocked;
              return (
                <option
                  key={oa.code}
                  value={oa.code}
                  disabled={!isUnlocked}
                  className="bg-[#1E293B] text-white py-1 font-medium"
                >
                  {oa.code}: {oa.title} {!isUnlocked ? '(🔒 Requisito pendiente)' : ''}
                </option>
              );
            })}
          </select>
        </div>

        {/* Derecha: Badge Fino de Rol */}
        <div className="flex items-center gap-2">
          {isAdmin ? (
            <span className="bg-amber-500/20 text-amber-300 text-[11px] font-semibold px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1">
              <span>🛡️ Super-Admin</span>
            </span>
          ) : (
            <span className="bg-emerald-500/20 text-emerald-400 text-[11px] font-semibold px-3 py-1 rounded-full border border-emerald-500/30">
              ✓ Estudiante
            </span>
          )}
        </div>

      </div>
      
      {/* STEPS BREADCRUMB PROGRESS BAR (SECUENCIA PEDAGÓGICA CON PASOS DESBLOQUEABLES ONE-BY-ONE) */}
      <div className="bento-card p-3 rounded-2xl border border-white/10 flex items-center justify-between overflow-x-auto gap-2">
        {[
          { num: 1, label: '1. Check-in Emocional 💙' },
          { num: 2, label: '2. Propósito 🎯' },
          { num: 3, label: '3. La Chispa ⚡' },
          { num: 4, label: '4. Exploración 🔍' },
          { num: 5, label: '5. Desafío DUA 🎨' },
          { num: 6, label: '6. Simulador MINEDUC 📝' },
          { num: 7, label: '7. Cierre & Ticket 🏁' },
        ].map(step => {
          const isUnlocked = step.num <= maxReachedStep;
          return (
            <button
              key={step.num}
              onClick={() => {
                if (isUnlocked) setCurrentStep(step.num);
              }}
              disabled={!isUnlocked}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                currentStep === step.num
                  ? 'bg-[#18AFCB] text-white shadow-lg scale-105'
                  : isUnlocked
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                  : 'bg-black/40 text-white/30 border border-white/5 cursor-not-allowed opacity-50'
              }`}
            >
              <span>{step.label}</span>
              {!isUnlocked && <span className="text-[10px]">🔒</span>}
            </button>
          );
        })}
      </div>

      {/* SHORT ROUTE BADGE IF LOW BATTERY */}
      {isShortRoute && (
        <div className="bg-[#F8AD22]/15 border border-[#F8AD22]/40 rounded-2xl p-4 flex items-center gap-3 text-xs text-[#F8AD22] font-bold">
          <span className="material-symbols-outlined text-lg">bolt</span>
          <span>Modo Ruta Corta Activado: Adaptamos el contenido para terminar tu sesión en 15 minutos sin fatiga mental.</span>
        </div>
      )}

      {/* STEP 1: CHECK-IN EMOCIONAL (SINTONIZACIÓN AFECTIVA Y HIBRIDACIÓN PEDAGÓGICA NORDIC CLEAN) */}
      {currentStep === 1 && (
        <div className="bento-card p-8 md:p-10 rounded-3xl space-y-8 border border-white/10 bg-gradient-to-br from-[#1C3257]/40 via-[#0A192F]/60 to-black/40 backdrop-blur-xl shadow-2xl">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-[#18AFCB]/20 text-[#18AFCB] material-symbols-outlined text-xl">psychology</span>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-[#18AFCB] tracking-wider">Paso 1 • Estación de Bienvenida & Bienestar</span>
                <h2 className="text-lg md:text-xl font-black text-white">¿Cómo te sientes hoy para aprender?</h2>
              </div>
            </div>
            <span className="text-[11px] font-mono text-white/60 bg-white/5 px-3 py-1 rounded-full border border-white/10 hidden sm:inline">
              Espacio Seguro • Sin Notas Punitivas
            </span>
          </div>

          {/* Burbuja Elegante del Tutor (Texto Nítido y Claro) */}
          <div className="p-6 rounded-3xl bg-[#1C3257]/60 border border-white/15 flex items-start gap-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#18AFCB]/20 border border-[#18AFCB]/40 flex items-center justify-center text-2xl shrink-0">
              🦊
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-[#18AFCB]">Tutor Mateo</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full">Acompañamiento Pedagógico</span>
              </div>
              <p className="text-xs md:text-sm text-white/90 leading-relaxed font-medium">
                {selectedMood === 'motivated' && 'Excelente disposición. La lección mantendrá un ritmo dinámico de exploración directa.'}
                {selectedMood === 'calm' && 'Avanzaremos paso a paso a un ritmo sereno y constante, sin presiones de tiempo.'}
                {selectedMood === 'tired' && 'Ruta Corta Activada: Adaptamos la lección a cápsulas esenciales de 15 minutos para evitar la fatiga mental.'}
                {selectedMood === 'anxious' && 'En EstudioSimple el error es una pista valiosa para comprender, no un castigo.'}
                {!selectedMood && 'Hola. Selecciona una opción o escribe tus palabras para adaptar la lección a tu estado de ánimo.'}
              </p>
            </div>
          </div>

          {/* Opciones Principales de Estado de Ánimo (Diseño Espacioso y Limpio) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => {
                setSelectedMood('motivated');
                handleSelectBattery('full');
              }}
              className={`p-6 rounded-3xl border text-left transition-all duration-300 space-y-3 ${
                selectedMood === 'motivated'
                  ? 'bg-emerald-500/20 border-emerald-500 shadow-2xl scale-[1.01] ring-2 ring-emerald-400/30'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">🚀</span>
                {selectedMood === 'motivated' && <span className="text-emerald-400 text-xs font-black">✓ Activo</span>}
              </div>
              <div>
                <div className="font-bold text-sm text-white">Motivado/a y con Energía</div>
                <p className="text-xs text-white/60 leading-relaxed mt-1">Con ganas de resolver todos los desafíos interactivos hoy.</p>
              </div>
            </button>

            <button
              onClick={() => {
                setSelectedMood('calm');
                handleSelectBattery('half');
              }}
              className={`p-6 rounded-3xl border text-left transition-all duration-300 space-y-3 ${
                selectedMood === 'calm'
                  ? 'bg-[#18AFCB]/20 border-[#18AFCB] shadow-2xl scale-[1.01] ring-2 ring-[#18AFCB]/30'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">🧘</span>
                {selectedMood === 'calm' && <span className="text-[#18AFCB] text-xs font-black">✓ Activo</span>}
              </div>
              <div>
                <div className="font-bold text-sm text-white">Tranquilo/a y Enfocado/a</div>
                <p className="text-xs text-white/60 leading-relaxed mt-1">Avanzar a un ritmo sereno, constante y sin apuros.</p>
              </div>
            </button>

            <button
              onClick={() => {
                setSelectedMood('tired');
                handleSelectBattery('low');
              }}
              className={`p-6 rounded-3xl border text-left transition-all duration-300 space-y-3 ${
                selectedMood === 'tired'
                  ? 'bg-[#F8AD22]/20 border-[#F8AD22] shadow-2xl scale-[1.01] ring-2 ring-[#F8AD22]/30'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">🌧️</span>
                {selectedMood === 'tired' && <span className="text-[#F8AD22] text-xs font-black">✓ Ruta Corta</span>}
              </div>
              <div>
                <div className="font-bold text-sm text-white">Cansado/a o Fatigado/a</div>
                <p className="text-xs text-white/60 leading-relaxed mt-1">Activa la Ruta Corta de 15 minutos sin sobrecarga.</p>
              </div>
            </button>

            <button
              onClick={() => {
                setSelectedMood('anxious');
                handleSelectBattery('half');
              }}
              className={`p-6 rounded-3xl border text-left transition-all duration-300 space-y-3 ${
                selectedMood === 'anxious'
                  ? 'bg-purple-500/20 border-purple-500 shadow-2xl scale-[1.01] ring-2 ring-purple-400/30'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">⚡</span>
                {selectedMood === 'anxious' && <span className="text-purple-300 text-xs font-black">✓ Apoyo Activo</span>}
              </div>
              <div>
                <div className="font-bold text-sm text-white">Inseguro/a o con Temor a Fallar</div>
                <p className="text-xs text-white/60 leading-relaxed mt-1">Acompañamiento sin juicios ni notas punitivas.</p>
              </div>
            </button>
          </div>

          {/* Campo de Expresión Emocional Libre (Hibridación del Estado Emocional) */}
          <div className="p-6 rounded-3xl bg-black/30 border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#F8AD22] flex items-center gap-2">
                <span className="material-symbols-outlined text-base">edit_note</span>
                <span>O expresa con tus palabras cómo te sientes hoy:</span>
              </span>
              <span className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Respuesta Adaptativa</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={customEmotionInput}
                onChange={e => setCustomEmotionInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    analyzeAndHybridizeEmotion(customEmotionInput);
                  }
                }}
                placeholder='Ejemplo: "Tengo pena porque mi perro se enfermó", "Estoy frustrado por una prueba"...'
                className="flex-1 bg-black/50 border border-white/15 rounded-2xl px-5 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#F8AD22] transition-all shadow-inner"
              />
              <button
                onClick={() => analyzeAndHybridizeEmotion(customEmotionInput)}
                className="px-6 py-3 rounded-2xl bg-[#F97316] hover:bg-[#EA580C] text-white font-black text-xs transition-all shadow-lg shrink-0 flex items-center justify-center gap-2 hover:scale-105"
              >
                <span>Hibridar Lección</span>
                <span className="material-symbols-outlined text-sm">psychology</span>
              </button>
            </div>

            {/* Banner de Hibridación Emocional Activa */}
            {hybridEmotionState && (
              <div className="p-5 rounded-2xl bg-orange-500/15 border border-orange-500/30 text-xs text-orange-200 space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-2 text-[#F97316]">
                    <span className="material-symbols-outlined text-base">verified_user</span>
                    <span>Estado Adaptado: {hybridEmotionState.label}</span>
                  </span>
                  <span className="text-[10px] bg-[#F97316]/20 font-mono px-3 py-1 rounded-full text-[#F97316] border border-[#F97316]/40 font-black">
                    ✓ Modo Micro-Victorias Habilitado
                  </span>
                </div>
                <p className="text-xs text-white/90 leading-relaxed font-medium">
                  {hybridEmotionState.pedagogicalAdaptation}
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => {
                setMaxReachedStep(prev => Math.max(prev, 2));
                setCurrentStep(2);
              }}
              className="px-8 py-3.5 rounded-2xl bg-[#F97316] hover:bg-[#EA580C] text-white font-black text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Avanzar al Propósito & ¿Para qué sirve?</span>
              <span className="material-symbols-outlined text-base font-black">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: PROPÓSITO & ¿PARA QUÉ SIRVE APRENDER ESTO EN LA VIDA REAL? (CON CÁPSULA EN VIDEO E IMÁGENES DIDÁCTICAS) */}
      {currentStep === 2 && (
        <div className="bento-card p-8 md:p-10 rounded-3xl space-y-8 border border-white/10 bg-gradient-to-br from-[#1C3257]/40 via-[#0A192F]/60 to-black/40 backdrop-blur-xl shadow-2xl">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-[#18AFCB]/20 text-[#18AFCB] material-symbols-outlined text-xl">flag</span>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-[#18AFCB] tracking-wider">Paso 2 • Propósito & Sentido Real (Multimodal)</span>
                <h2 className="text-lg md:text-xl font-black text-white">
                  {selectedSubject === 'Historia' ? lesson.title : `Lección Interactiva: ${currentSubjectObj.name} (${selectedOaCode})`}
                </h2>
              </div>
            </div>

            {/* Banner de Conexión con el Check-in Emocional Previo */}
            <div className="bg-purple-500/20 border border-purple-400/30 px-3.5 py-1.5 rounded-2xl text-xs text-purple-200 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-purple-300">psychology</span>
              <span className="font-semibold text-[11px]">
                Encuadre Adaptado a tu Estado: {hybridEmotionState ? hybridEmotionState.label : (selectedMood ? selectedMood : 'Enfocado')}
              </span>
            </div>
          </div>

          {/* CÁPSULA DE VIDEO ANIMADA E INFOGRAFÍA DIDÁCTICA (MAPEO DINÁMICO POR ASIGNATURA) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Reproductor de Video Embebido según Asignatura */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl group relative">
              <div className="aspect-video w-full relative">
                <iframe
                  className="w-full h-full rounded-3xl"
                  src={
                    selectedSubject === 'Historia' 
                      ? "https://www.youtube-nocookie.com/embed/G2tUkEvo_lM?controls=1&rel=0&modestbranding=1"
                      : selectedSubject === 'Lenguaje'
                      ? "https://www.youtube-nocookie.com/embed/5mEaQ5_E31Y?controls=1&rel=0&modestbranding=1"
                      : selectedSubject === 'Ciencias'
                      ? "https://www.youtube-nocookie.com/embed/URUJD5NEXC8?controls=1&rel=0&modestbranding=1"
                      : selectedSubject === 'Inglés'
                      ? "https://www.youtube-nocookie.com/embed/KxD_QmP4C84?controls=1&rel=0&modestbranding=1"
                      : "https://www.youtube-nocookie.com/embed/S2kWjS63i3E?controls=1&rel=0&modestbranding=1"
                  }
                  title={`Cápsula Explicativa Didáctica - ${currentSubjectObj.name}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-3 bg-[#1C3257]/80 flex items-center justify-between border-t border-white/10">
                <span className="text-[11px] font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-500 text-base">play_circle</span>
                  <span>
                    {selectedSubject === 'Historia' && 'Cápsula: La Revolución Neolítica y el paso al Sedentarismo'}
                    {selectedSubject === 'Matemáticas' && 'Cápsula: ¿Por qué existen los números negativos en la vida diaria?'}
                    {selectedSubject === 'Lenguaje' && 'Cápsula: Cómo distinguir Hecho de Opinión en un artículo'}
                    {selectedSubject === 'Ciencias' && 'Cápsula: La Estructura de la Célula y sus Organelos'}
                    {selectedSubject === 'Inglés' && 'Cápsula: Expressing Daily Routines and Habits'}
                  </span>
                </span>
                <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full font-mono">1:15 min</span>
              </div>
            </div>

            {/* INFOGRAFÍA DIDÁCTICA INTERACTIVA ESPECÍFICA POR ASIGNATURA */}
            <div className="lg:col-span-5 space-y-3">
              <div className="rounded-3xl border border-white/15 bg-[#1C3257]/80 p-5 shadow-2xl space-y-4">
                
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-xl bg-[#F8AD22]/20 text-[#F8AD22] material-symbols-outlined text-sm">analytics</span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Infografía Didáctica {currentSubjectObj.name}</span>
                  </div>
                  
                  {selectedSubject === 'Matemáticas' && (
                    <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10 text-[10px] font-bold">
                      <button
                        onClick={() => setActiveInfographicTab('thermometer')}
                        className={`px-2 py-0.5 rounded-lg transition-all ${
                          activeInfographicTab === 'thermometer' ? 'bg-[#18AFCB] text-white shadow-md' : 'text-white/60'
                        }`}
                      >
                        🌡️ Temp
                      </button>
                      <button
                        onClick={() => setActiveInfographicTab('finance')}
                        className={`px-2 py-0.5 rounded-lg transition-all ${
                          activeInfographicTab === 'finance' ? 'bg-[#F8AD22] text-[#0A192F] shadow-md' : 'text-white/60'
                        }`}
                      >
                        💳 Saldos
                      </button>
                    </div>
                  )}
                </div>

                {/* INFOGRAFÍA 1: HISTORIA Y GEOGRAFÍA */}
                {selectedSubject === 'Historia' && (
                  <div className="space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between text-[11px] font-bold text-white/90">
                      <span>Diagrama: Revolución Neolítica</span>
                      <span className="text-[#F8AD22] font-mono">Transición Cultural</span>
                    </div>

                    <div className="relative bg-black/50 rounded-2xl p-4 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between bg-amber-500/20 border border-amber-500/40 p-2 rounded-xl text-xs">
                        <span className="font-bold text-amber-300">🏕️ Estilo Nómada (Paleolítico)</span>
                        <span className="font-mono text-[10px] bg-amber-500/40 px-2 py-0.5 rounded-full text-white">Caza y Cavernas</span>
                      </div>
                      
                      <div className="flex items-center justify-between bg-[#18AFCB]/20 border border-[#18AFCB]/40 p-2 rounded-xl text-xs font-bold text-white">
                        <span>🌾 Estilo Sedentario (Neolítico)</span>
                        <span className="font-mono text-[10px] bg-[#18AFCB]/40 px-2 py-0.5 rounded-full">Agricultura y Aldeas</span>
                      </div>

                      <div className="flex items-center justify-between bg-purple-500/20 border border-purple-500/40 p-2 rounded-xl text-xs">
                        <span className="font-bold text-purple-300">🏛️ Primeras Ciudades</span>
                        <span className="font-mono text-[10px] bg-purple-500/40 px-2 py-0.5 rounded-full text-white">Leyes y Comercio</span>
                      </div>
                    </div>
                    
                    <p className="text-[10px] text-white/70 italic leading-relaxed">
                      💡 El descubrimiento de la agricultura permitió a la humanidad construir casas fijas y almacenar alimentos.
                    </p>
                  </div>
                )}

                {/* INFOGRAFÍA 2: MATEMÁTICAS (INFOGRAFÍA OFICIAL CÓMIC ILUSTRADA) */}
                {selectedSubject === 'Matemáticas' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between text-[11px] font-bold text-white/90">
                      <span className="text-[#F8AD22]">Los Números Enteros: Un Viaje por la Recta Numérica</span>
                      <button
                        onClick={() => setShowInfographicModal(true)}
                        className="px-2.5 py-1 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-[10px] flex items-center gap-1 shadow-md transition-all hover:scale-105"
                      >
                        <span className="material-symbols-outlined text-xs">zoom_in</span>
                        <span>Ampliar Infografía 🔍</span>
                      </button>
                    </div>

                    {/* Imagen de la Infografía Oficial Estilo Cómic */}
                    <div
                      onClick={() => setShowInfographicModal(true)}
                      className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl cursor-pointer group hover:border-[#F97316] transition-all bg-black/60"
                    >
                      <img
                        src="/infographics/numeros_enteros_infografia.webp"
                        alt="Los Números Enteros: Un Viaje por la Recta Numérica"
                        className="w-full h-auto object-cover group-hover:scale-[1.02] transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end justify-center p-3">
                        <span className="text-xs font-black text-white bg-[#F97316] px-4 py-1.5 rounded-full shadow-xl flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm">fullscreen</span>
                          <span>Hacer clic para ver en Pantalla Completa</span>
                        </span>
                      </div>
                    </div>

                    {/* 6 Secciones Didácticas Interactivas de la Infografía */}
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold">
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
                        <span className="text-[#F8AD22] block font-bold">1. El Conjunto Z (ℤ)</span>
                        <p className="text-white/70 text-[9px] leading-tight">Positivos (+1, +2), Cero (0) y Negativos (-1, -2).</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
                        <span className="text-[#18AFCB] block font-bold">2. Recta al Infinito</span>
                        <p className="text-white/70 text-[9px] leading-tight">Positivos crecen a la derecha, negativos a la izquierda.</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
                        <span className="text-purple-300 block font-bold">3. Valor Absoluto</span>
                        <p className="text-white/70 text-[9px] leading-tight">Distancia exacta al cero sin importar el signo.</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
                        <span className="text-emerald-400 block font-bold">4. Ganancias vs Deudas</span>
                        <p className="text-white/70 text-[9px] leading-tight">Lo que posees (+13€) vs lo que debes (-23€).</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
                        <span className="text-blue-300 block font-bold">5. Altitud & Profundidad</span>
                        <p className="text-white/70 text-[9px] leading-tight">Everest (+8848m) vs Mar Muerto (-423m).</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
                        <span className="text-amber-300 block font-bold">6. Edificio & Ascensor</span>
                        <p className="text-white/70 text-[9px] leading-tight">Subir 5 pisos (+5) vs Bajar al sótano 2 (-2).</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* INFOGRAFÍA 3: LENGUAJE */}
                {selectedSubject === 'Lenguaje' && (
                  <div className="space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between text-[11px] font-bold text-white/90">
                      <span>Diagrama: Hecho vs Opinión</span>
                      <span className="text-purple-300 font-mono">Comprensión Lectora</span>
                    </div>

                    <div className="relative bg-black/50 rounded-2xl p-4 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between bg-blue-500/20 border border-blue-500/40 p-2 rounded-xl text-xs">
                        <span className="font-bold text-blue-300">📌 Hecho Verificable</span>
                        <span className="font-mono text-[10px] bg-blue-500/40 px-2 py-0.5 rounded-full text-white">Objetivo</span>
                      </div>
                      
                      <div className="flex items-center justify-between bg-purple-500/20 border border-purple-500/40 p-2 rounded-xl text-xs font-bold text-white">
                        <span>💬 Opinión del Emisor</span>
                        <span className="font-mono text-[10px] bg-purple-500/40 px-2 py-0.5 rounded-full">Subjetivo</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* INFOGRAFÍA 4: CIENCIAS NATURALES */}
                {selectedSubject === 'Ciencias' && (
                  <div className="space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between text-[11px] font-bold text-white/90">
                      <span>Diagrama: Células Biológicas</span>
                      <span className="text-emerald-400 font-mono">Biología Celular</span>
                    </div>

                    <div className="relative bg-black/50 rounded-2xl p-4 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between bg-emerald-500/20 border border-emerald-500/40 p-2 rounded-xl text-xs">
                        <span className="font-bold text-emerald-300">🌱 Célula Vegetal</span>
                        <span className="font-mono text-[10px] bg-emerald-500/40 px-2 py-0.5 rounded-full text-white">Fotosíntesis</span>
                      </div>
                      
                      <div className="flex items-center justify-between bg-blue-500/20 border border-blue-500/40 p-2 rounded-xl text-xs font-bold text-white">
                        <span>🦁 Célula Animal</span>
                        <span className="font-mono text-[10px] bg-blue-500/40 px-2 py-0.5 rounded-full">Membrana Flexible</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* INFOGRAFÍA 5: INGLÉS */}
                {selectedSubject === 'Inglés' && (
                  <div className="space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between text-[11px] font-bold text-white/90">
                      <span>Diagram: Daily Routines</span>
                      <span className="text-[#18AFCB] font-mono">English Grammar</span>
                    </div>

                    <div className="relative bg-black/50 rounded-2xl p-4 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between bg-blue-500/20 border border-blue-500/40 p-2 rounded-xl text-xs">
                        <span className="font-bold text-blue-300">⏰ Morning Habits</span>
                        <span className="font-mono text-[10px] bg-blue-500/40 px-2 py-0.5 rounded-full text-white">Wake up & Eat</span>
                      </div>
                      
                      <div className="flex items-center justify-between bg-purple-500/20 border border-purple-500/40 p-2 rounded-xl text-xs font-bold text-white">
                        <span>🌙 Evening Habits</span>
                        <span className="font-mono text-[10px] bg-purple-500/40 px-2 py-0.5 rounded-full">Read & Sleep</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Tarjeta 1: Objetivo / Misión del Estudiante */}
            <div className="bg-[#18AFCB]/10 border border-[#18AFCB]/30 rounded-3xl p-6 space-y-3 shadow-lg">
              <h3 className="font-bold text-sm text-[#18AFCB] flex items-center gap-2">
                <span>🎯</span>
                <span>Objetivo MINEDUC</span>
              </h3>
              <p className="text-xs text-white/90 leading-relaxed font-medium">
                {selectedSubject === 'Historia'
                  ? lesson.studentMission
                  : `${currentSubjectObj.oas.find(o => o.code === selectedOaCode)?.title || 'Operaciones con números enteros'}.`}
              </p>
            </div>

            {/* Tarjeta 2: ¿PARA QUÉ SIRVE APRENDER ESTO EN LA VIDA REAL? */}
            <div className="bg-[#F8AD22]/10 border border-[#F8AD22]/30 rounded-3xl p-6 space-y-3 shadow-lg">
              <h3 className="font-bold text-sm text-[#F8AD22] flex items-center gap-2">
                <span>💡</span>
                <span>¿Para qué sirve en la vida real?</span>
              </h3>
              <p className="text-xs text-white/90 leading-relaxed font-medium">
                {selectedSubject === 'Matemáticas'
                  ? 'Sirve para entender saldos y deudas bancarias, calcular altitudes de aviones y medir temperaturas extremas en la Patagonia.'
                  : selectedSubject === 'Lenguaje'
                  ? 'Sirve para no dejarte engañar por noticias falsas o publicidad persuasiva, aprendiendo a argumentar con evidencias.'
                  : selectedSubject === 'Ciencias'
                  ? 'Sirve para entender cómo funciona tu propio cuerpo a nivel celular y cuidar tu salud digestiva e inmunológica.'
                  : selectedSubject === 'Inglés'
                  ? 'Sirve para comunicarte globalmente, jugar en servidores internacionales y acceder a información técnica.'
                  : 'Sirve para comprender cómo los descubrimientos y leyes del pasado crearon nuestras ciudades y democracia actual.'}
              </p>
            </div>

            {/* Tarjeta 3: VALORES Y HÁBITOS DE ESTUDIO */}
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-3xl p-6 space-y-3 shadow-lg">
              <h3 className="font-bold text-sm text-purple-300 flex items-center gap-2">
                <span>🛡️</span>
                <span>Valores & Hábitos de la Lección</span>
              </h3>
              <p className="text-xs text-white/90 leading-relaxed font-medium">
                {selectedSubject === 'Matemáticas'
                  ? '🧘 Hábito: Pausar y verificar los signos (+ y -). 🛡️ Valor: Resiliencia y honestidad para aprender del error.'
                  : selectedSubject === 'Lenguaje'
                  ? '🧘 Hábito: Lectura atenta sin distracciones. 🛡️ Valor: Pensamiento crítico y empatía intelectual.'
                  : selectedSubject === 'Ciencias'
                  ? '🧘 Hábito: Registro de evidencias y método. 🛡️ Valor: Curiosidad y respeto por el entorno natural.'
                  : selectedSubject === 'Inglés'
                  ? '🧘 Hábito: Practicar la escucha activa. 🛡️ Valor: Apertura cultural y constancia diaria.'
                  : '🧘 Hábito: Análisis de fuentes y contexto. 🛡️ Valor: Conciencia histórica y compromiso ciudadano.'}
              </p>
            </div>
          </div>

          {/* Micro-Compromiso de Aprendizaje Interactivo */}
          <div className="p-5 rounded-3xl bg-black/40 border border-white/10 space-y-3">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-[#F97316]">assignment_turned_in</span>
              <span>Elige tu compromiso personal para esta lección:</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                '🎯 Comprender a mi propio ritmo sin apuros',
                '💡 Descubrir la aplicación en la vida real',
                '📝 Ejercitar y anotar en mi cuaderno físico'
              ].map((intent, i) => (
                <button
                  key={i}
                  onClick={() => setCustomEmotionInput(intent)}
                  className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white/90 text-left transition-all hover:border-[#F97316]"
                >
                  {intent}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-between items-center">
            <button onClick={() => setCurrentStep(1)} className="px-4 py-2 text-xs font-semibold text-white/60 hover:text-white transition-all">Atrás</button>
            <button
              onClick={() => {
                setMaxReachedStep(prev => Math.max(prev, 3));
                setCurrentStep(3);
              }}
              className="px-8 py-3.5 rounded-2xl bg-[#F97316] hover:bg-[#EA580C] text-white font-black text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Ir a La Chispa (Enganche Didáctico)</span>
              <span className="material-symbols-outlined text-base font-black">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: LA CHISPA (ADAPTADO A LA BATERÍA DE ENERGÍA) */}
      {currentStep === 3 && (
        <div className="bento-card p-6 md:p-8 rounded-3xl space-y-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#F8AD22] uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">lightbulb</span>
              <span>3. La Chispa • {isShortRoute ? 'Versión Express (Ruta Corta ⚡)' : 'Enganche Profundo'}</span>
            </div>
            {battery && (
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                battery === 'low' ? 'bg-red-500/20 text-red-300 border-red-500/40' :
                battery === 'half' ? 'bg-[#F8AD22]/20 text-[#F8AD22] border-[#F8AD22]/40' :
                'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              }`}>
                {battery === 'low' ? '⚡ Baja Energía (Ruta Corta 15 min)' : battery === 'half' ? '⚡⚡ Energía Media' : '⚡⚡⚡ Energía Máxima (Modo Pro)'}
              </span>
            )}
          </div>

          {/* Adaptación dinámica según energía y asignatura seleccionada */}
          {selectedSubject === 'Matemáticas' ? (
            battery === 'low' ? (
              <div className="bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/30 p-6 rounded-2xl space-y-3">
                <span className="text-[10px] font-extrabold uppercase text-red-400">⚡ Chispa Express • Matemáticas (Números Enteros)</span>
                <h3 className="text-lg font-bold text-white leading-snug">
                  Si la temperatura cae a -5°C en la noche y sube 12°C al medio día... ¿Estás sobre cero o bajo cero?
                </h3>
                <p className="text-xs text-white/80 leading-relaxed font-mono bg-black/30 p-3 rounded-xl">
                  💡 **Resumen Ultra Rápido**: Los números negativos representan deudas, temperaturas bajo cero o profundidades. ¡Usamos los signos + y - para calcular la posición exacta!
                </p>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-[#18AFCB]/15 to-transparent border border-[#18AFCB]/30 p-6 rounded-2xl space-y-4">
                <span className="text-[10px] font-extrabold uppercase text-[#18AFCB]">📐 La Chispa Matemática</span>
                <h3 className="text-xl font-bold text-white leading-relaxed">
                  ¿Cómo representas el saldo de una cuenta bancaria con $0 pesos cuando debes $15.000? ¿Existen los números menores que cero en la vida real?
                </h3>
                <p className="text-xs text-white/70 italic leading-relaxed">
                  En el mundo real usamos números enteros para medir temperaturas extremas, altitudes bajo el nivel del mar y balances financieros.
                </p>
              </div>
            )
          ) : selectedSubject === 'Lenguaje' ? (
            <div className="bg-gradient-to-br from-purple-500/15 to-transparent border border-purple-500/30 p-6 rounded-2xl space-y-3">
              <span className="text-[10px] font-extrabold uppercase text-purple-300">📚 La Chispa de Lenguaje</span>
              <h3 className="text-xl font-bold text-white leading-relaxed">
                ¿Un titular de noticia siempre dice la verdad o intenta convencerte de una opinión?
              </h3>
              <p className="text-xs text-white/70 italic leading-relaxed">
                Aprender a distinguir hechos de opiniones es la clave para la comprensión de textos argumentativos en tu Examen Libre.
              </p>
            </div>
          ) : selectedSubject === 'Ciencias' ? (
            <div className="bg-gradient-to-br from-emerald-500/15 to-transparent border border-emerald-500/30 p-6 rounded-2xl space-y-3">
              <span className="text-[10px] font-extrabold uppercase text-emerald-400">🔬 La Chispa de Ciencias Naturales</span>
              <h3 className="text-xl font-bold text-white leading-relaxed">
                ¿Sabías que una sola gota de sangre contiene millones de ciudades diminutas llamadas células?
              </h3>
              <p className="text-xs text-white/70 italic leading-relaxed">
                La célula es la unidad de vida básica que nos permite respirar, movernos y obtener energía de los alimentos.
              </p>
            </div>
          ) : selectedSubject === 'Inglés' ? (
            <div className="bg-gradient-to-br from-blue-500/15 to-transparent border border-blue-500/30 p-6 rounded-2xl space-y-3">
              <span className="text-[10px] font-extrabold uppercase text-blue-300">🔤 La Chispa de Inglés</span>
              <h3 className="text-xl font-bold text-white leading-relaxed">
                What do you do every day when you wake up?
              </h3>
              <p className="text-xs text-white/70 italic leading-relaxed">
                Aprenderemos a expresar rutinas diarias y actividades cotidianas en inglés con pronunciación fluida.
              </p>
            </div>
          ) : (
            /* Historia y Geografía (Default) */
            battery === 'low' ? (
              <div className="bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/30 p-6 rounded-2xl space-y-3">
                <span className="text-[10px] font-extrabold uppercase text-red-400">⚡ Chispa Express para Baja Energía</span>
                <h3 className="text-lg font-bold text-white leading-snug">
                  Imagina que para comer hoy tuvieras que caminar 20 km a pie. Sin casa ni refrigerador.
                </h3>
                <p className="text-xs text-white/80 leading-relaxed font-mono bg-black/30 p-3 rounded-xl">
                  💡 **Resumen Ultra Rápido**: El Neolítico fue el momento en que el ser humano descubrió cómo cultivar y guardar comida en un solo lugar. ¡Eso nos permitió construir ciudades!
                </p>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-[#F8AD22]/15 to-transparent border border-[#F8AD22]/30 p-6 rounded-2xl space-y-4">
                <h3 className="text-xl font-bold text-white leading-relaxed">
                  Si tuvieras que caminar 20 kilómetros todos los días solo para conseguir un plato de sopa... ¿Tendrías tiempo de inventar la rueda, dibujar en una tablet o construir una casa?
                </h3>
                <p className="text-xs text-white/70 italic leading-relaxed">
                  Esa era la realidad de la humanidad durante el Paleolítico: Vivían persiguiendo a los animales y recolectando frutos día tras día.
                </p>
              </div>
            )
          )}

          <div className="pt-4 flex justify-between">
            <button onClick={() => setCurrentStep(2)} className="px-4 py-2 text-xs font-bold text-white/60 hover:text-white">Atrás</button>
            <button
              onClick={() => {
                setMaxReachedStep(prev => Math.max(prev, 4));
                setCurrentStep(4);
              }}
              className="px-8 py-3.5 rounded-2xl bg-[#F97316] hover:bg-[#EA580C] text-white font-black text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Ir a la Exploración {isShortRoute ? 'Express' : 'Completa'}</span>
              <span className="material-symbols-outlined text-base font-black">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: EXPLORACIÓN & SIMULADOR KINESTÉSICO */}
      {currentStep === 4 && (
        <div className="bento-card p-6 md:p-8 rounded-3xl space-y-6 border border-white/10">
          <div className="flex items-center gap-2 text-xs font-bold text-[#18AFCB] uppercase tracking-wider">
            <span className="material-symbols-outlined text-base">extension</span>
            <span>4. Exploración • Simulador Kinestésico DUA ({currentSubjectObj.name})</span>
          </div>

          {selectedSubject === 'Matemáticas' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-white">Simulador Interactivo: Recta Numérica de Enteros (OA 01)</h2>
                  <p className="text-xs text-white/70">Clasifica las situaciones reales en la zona correspondiente de la recta numérica (+ / -):</p>
                </div>
              </div>

              {/* SIMULADOR INTERACTIVO MATEMÁTICO REAL */}
              <MathNumberLineSimulator />
            </div>
          ) : selectedSubject === 'Lenguaje' ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Laboratorio de Inferencia: Hechos vs. Opiniones</h2>
              <p className="text-xs text-white/70">Identifica la intención del emisor en los siguientes fragmentos:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-[10px] font-extrabold text-[#18AFCB] uppercase">Texto 1</span>
                  <p className="text-xs text-white/90">"El evento ocurrió a las 15:30 hrs en la avenida principal."</p>
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">📌 Hecho Objetivo</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-[10px] font-extrabold text-[#F8AD22] uppercase">Texto 2</span>
                  <p className="text-xs text-white/90">"Fue la mejor presentación de la década en nuestra ciudad."</p>
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-[#F8AD22]/20 text-[#F8AD22] font-bold text-[10px]">💬 Opinión Subjetiva</span>
                </div>
              </div>
            </div>
          ) : selectedSubject === 'Ciencias' ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Explorador Microscópico: Célula Animal vs. Vegetal</h2>
              <p className="text-xs text-white/70">Observa los organelos que hacen única a cada célula:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                  <span className="font-bold text-sm text-emerald-300">🌱 Célula Vegetal</span>
                  <p className="text-xs text-white/80">Contiene Pared Celular y Cloroplastos para realizar la Fotosíntesis.</p>
                </div>
                <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/30 space-y-2">
                  <span className="font-bold text-sm text-blue-300">🦁 Célula Animal</span>
                  <p className="text-xs text-white/80">Posee Membrana Plasmática flexible y Mitocondrias activas.</p>
                </div>
              </div>
            </div>
          ) : selectedSubject === 'Inglés' ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Interactive Routine Matcher</h2>
              <p className="text-xs text-white/70">Relaciona la acción en inglés con su horario cotidiano:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
                  <span className="text-2xl">⏰ 07:00 AM</span>
                  <p className="text-xs font-bold text-[#18AFCB]">Wake up & Have breakfast</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
                  <span className="text-2xl">🏫 08:30 AM</span>
                  <p className="text-xs font-bold text-[#F8AD22]">Start online class session</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
                  <span className="text-2xl">🌙 09:30 PM</span>
                  <p className="text-xs font-bold text-purple-300">Read a book & go to sleep</p>
                </div>
              </div>
            </div>
          ) : (
            /* Historia (Default) */
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">{lesson.dragDropGame.title}</h2>
              <p className="text-xs text-white/70">Clasifica los elementos arrastrándolos o haciendo clic en el grupo correspondiente:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nomada Drop Zone */}
                <div className="p-5 rounded-2xl bg-[#1C3257]/80 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-bold text-sm text-[#F8AD22]">🏕️ Estilo Nómada</span>
                    <span className="text-[10px] text-white/50">Cazadores Recolectores</span>
                  </div>
                  <div className="min-h-[120px] space-y-2">
                    {dragItems.filter(i => i.placedIn === 'nomada').map(item => (
                      <div key={item.id} className="p-3 rounded-xl bg-white/10 border border-white/15 text-xs font-bold text-white flex justify-between items-center">
                        <span>{item.text}</span>
                        <span className="text-emerald-400 font-mono text-[10px]">✓ Clasificado</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sedentario Drop Zone */}
                <div className="p-5 rounded-2xl bg-[#1C3257]/80 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-bold text-sm text-[#18AFCB]">🌾 Estilo Sedentario</span>
                    <span className="text-[10px] text-white/50">Agricultores Neolíticos</span>
                  </div>
                  <div className="min-h-[120px] space-y-2">
                    {dragItems.filter(i => i.placedIn === 'sedentario').map(item => (
                      <div key={item.id} className="p-3 rounded-xl bg-white/10 border border-white/15 text-xs font-bold text-white flex justify-between items-center">
                        <span>{item.text}</span>
                        <span className="text-emerald-400 font-mono text-[10px]">✓ Clasificado</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Unplaced Items */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
                <span className="text-[10px] font-extrabold uppercase text-white/60">Elementos por clasificar (Haz clic para asignar)</span>
                <div className="flex flex-wrap gap-2">
                  {dragItems.filter(i => i.placedIn === null).map(item => (
                    <div key={item.id} className="flex items-center gap-1 bg-white/10 border border-white/20 rounded-xl p-2 text-xs font-bold text-white">
                      <span>{item.text}</span>
                      <button onClick={() => handlePlaceItem(item.id, 'nomada')} className="px-2 py-1 bg-[#F8AD22]/20 hover:bg-[#F8AD22] text-[#F8AD22] hover:text-[#0A192F] rounded-lg text-[10px]">Nómada</button>
                      <button onClick={() => handlePlaceItem(item.id, 'sedentario')} className="px-2 py-1 bg-[#18AFCB]/20 hover:bg-[#18AFCB] text-[#18AFCB] hover:text-white rounded-lg text-[10px]">Sedentario</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-between">
            <button onClick={() => setCurrentStep(3)} className="px-4 py-2 text-xs font-bold text-white/60 hover:text-white">Atrás</button>
            <button
              onClick={() => {
                setMaxReachedStep(prev => Math.max(prev, 5));
                setCurrentStep(5);
              }}
              className="px-8 py-3.5 rounded-2xl bg-[#F97316] hover:bg-[#EA580C] text-white font-black text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Ir al Desafío DUA</span>
              <span className="material-symbols-outlined text-base font-black">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: EL DESAFÍO (MENÚ DE EXPRESIÓN DUA) */}
      {currentStep === 5 && (
        <div className="bento-card p-6 md:p-8 rounded-3xl space-y-6 border border-white/10">
          <div className="flex items-center gap-2 text-xs font-bold text-[#57d6f3] uppercase tracking-wider">
            <span className="material-symbols-outlined text-base">palette</span>
            <span>5. El Desafío • Menú de Expresión DUA</span>
          </div>

          <h2 className="text-2xl font-bold text-white">¡Demuestra lo que descubriste! Elige tu forma de responder:</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {lesson.duaOptions.map(opt => (
              <button
                key={opt.mode}
                onClick={() => setSelectedDuaMode(opt.mode)}
                className={`p-6 rounded-2xl border text-left transition-all space-y-3 ${
                  selectedDuaMode === opt.mode
                    ? 'bg-[#12A1A4]/20 border-[#12A1A4] scale-105 shadow-xl'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#F8AD22]">{opt.title}</span>
                  <span className="material-symbols-outlined text-[#12A1A4]">{opt.icon}</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">{opt.instruction}</p>
              </button>
            ))}
          </div>

          {/* DUA Response Input Area */}
          {selectedDuaMode === 'audio' && (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-center">
              <p className="text-xs font-bold text-white">Grabadora de Voz Simulada (30 Segundos)</p>
              <button
                onClick={() => setDuaAudioRecorded(true)}
                className={`px-6 py-3 rounded-full font-bold text-xs flex items-center justify-center gap-2 mx-auto transition-all ${
                  duaAudioRecorded
                    ? 'bg-emerald-500 text-white'
                    : 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                }`}
              >
                <span className="material-symbols-outlined">mic</span>
                <span>{duaAudioRecorded ? 'Audio Grabado con Éxito (0:28 s)' : 'Presionar para Grabar Audio'}</span>
              </button>
            </div>
          )}

          {selectedDuaMode === 'visual' && (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-center">
              <p className="text-xs font-bold text-white">Lienzo de Dibujo Digital</p>
              <div className="h-32 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-xs text-white/40 font-mono">
                [Lienzo interactivo táctil listo para dibujar]
              </div>
              <button
                onClick={() => setDuaVisualDone(true)}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold"
              >
                {duaVisualDone ? '✓ Dibujo Guardado' : 'Guardar Esquema'}
              </button>
            </div>
          )}

          {selectedDuaMode === 'text' && (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <p className="text-xs font-bold text-white">Mensaje Corto de Chat</p>
              <textarea
                value={duaTextInput}
                onChange={e => setDuaTextInput(e.target.value)}
                placeholder="Escribe aquí tu respuesta sobre la Revolución Neolítica..."
                className="w-full h-24 rounded-xl p-3 text-xs bg-black/40 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-[#12A1A4]"
              />
            </div>
          )}

          <div className="pt-4 flex justify-between">
            <button onClick={() => setCurrentStep(4)} className="px-4 py-2 text-xs font-bold text-white/60 hover:text-white">Atrás</button>
            <button
              onClick={() => {
                setMaxReachedStep(prev => Math.max(prev, 6));
                setCurrentStep(6);
              }}
              className="px-8 py-3.5 rounded-2xl bg-[#F97316] hover:bg-[#EA580C] text-white font-black text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Ir al Simulador MINEDUC 📝</span>
              <span className="material-symbols-outlined text-base font-black">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: SIMULADOR EXAMEN LIBRE MINEDUC (FORMATO OFICIAL 4 ALTERNATIVAS A, B, C, D) */}
      {currentStep === 6 && (
        <div className="bento-card p-6 md:p-8 rounded-3xl space-y-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#F8AD22] uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">quiz</span>
              <span>6. Simulador Examen Libre MINEDUC • Formato Oficial 2026</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#18AFCB]/20 text-[#18AFCB] font-mono font-bold text-xs border border-[#18AFCB]/30">
              4 Alternativas (a, b, c, d)
            </span>
          </div>

          <div className="bg-[#12A1A4]/10 border border-[#12A1A4]/30 rounded-2xl p-5 space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>📝</span>
              <span>Encuadre de Evaluación Oficial (Examen 7° Básico)</span>
            </h3>
            <p className="text-xs text-white/80 leading-relaxed">
              Las siguientes preguntas fueron extraídas directamente del documento de ensayo oficial del MINEDUC. Tómate tu tiempo, lee cada alternativa con calma y responde como en tu examen real.
            </p>
          </div>

          {/* Arreglo de Preguntas del Examen */}
          <div className="space-y-6">
            {lesson.mineducExam?.map(q => (
              <div key={q.id} className="p-6 rounded-2xl bg-[#1C3257]/80 border border-white/10 space-y-4 shadow-md">
                <h4 className="font-bold text-sm text-white leading-snug">{q.question}</h4>
                
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = examAnswers[q.id] === optIdx;
                    const isCorrect = optIdx === q.correctIndex;
                    
                    let btnStyle = 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10';
                    if (showExamResult) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-red-500/20 border-red-500 text-red-300 font-bold';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-[#18AFCB]/20 border-[#18AFCB] text-white font-bold shadow-md';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => !showExamResult && handleSelectExamAnswer(q.id, optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl text-xs transition-all border flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {showExamResult && isCorrect && (
                          <span className="text-emerald-400 font-bold text-xs shrink-0 ml-2">✓ Respuesta Correcta</span>
                        )}
                        {showExamResult && isSelected && !isCorrect && (
                          <span className="text-red-400 font-bold text-xs shrink-0 ml-2">❌ Alternativa Incorrecta</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Autopsia de Distractores al Evaluar */}
                {showExamResult && (
                  <div className="mt-3 p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/90 leading-relaxed font-mono">
                    <span className="text-[#F8AD22] font-bold block mb-1">💡 Autopsia Pedagógica del MINEDUC:</span>
                    {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          {!showExamResult ? (
            <button
              onClick={() => setShowExamResult(true)}
              className="w-full py-4 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined font-black">fact_check</span>
              <span>Evaluar Respuestas del Simulador MINEDUC</span>
            </button>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500 space-y-4 text-center">
              <div className="text-4xl">🎓</div>
              <h3 className="text-xl font-black text-white">
                Puntaje de Maestría MINEDUC: {calculateExamScore()}% de Logro
              </h3>
              <p className="text-xs text-white/90 max-w-md mx-auto">
                {calculateExamScore() >= 80 
                  ? '¡Felicitaciones! Has alcanzado la maestría necesaria (>=80%) exigida por la normativa para avanzar al siguiente Objetivo de Aprendizaje (OA 02).'
                  : 'Buen intento. Te recomendamos repasar las tarjetas de la lección para reforzar la maestría del 80%.'}
              </p>
            </div>
          )}

          <div className="pt-4 flex justify-between">
            <button onClick={() => setCurrentStep(5)} className="px-4 py-2 text-xs font-bold text-[#18AFCB] hover:underline">Atrás al Desafío</button>
            <button
              onClick={() => {
                setMaxReachedStep(prev => Math.max(prev, 7));
                setCurrentStep(7);
              }}
              className="px-8 py-3.5 rounded-2xl bg-[#F97316] hover:bg-[#EA580C] text-white font-black text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Ir al Cierre & Ticket Final</span>
              <span className="material-symbols-outlined text-base font-black">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 7: CONSOLIDACIÓN, TICKET DE SALIDA Y INSIGNIA DE AUTONOMÍA */}
      {currentStep === 7 && (
        <div className="bento-card p-6 md:p-8 rounded-3xl space-y-6 border border-white/10">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <span className="material-symbols-outlined text-base">verified</span>
            <span>7. Consolidación y Cierre • Ticket Final & Autonomía</span>
          </div>

          <h2 className="text-2xl font-bold text-white">Reflexión y Recompensas de Autonomía</h2>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <p className="text-xs font-bold text-[#F8AD22]">¿Cómo te sientes al haber completado esta lección por ti mismo/a?</p>
              <input
                type="text"
                value={metacognitionInput}
                onChange={e => setMetacognitionInput(e.target.value)}
                placeholder="Escribe tu reflexión... (Ej: Me siento orgulloso de haberlo logrado sin ayuda)"
                className="w-full rounded-xl px-4 py-3 text-xs bg-black/40 border border-white/15 text-white placeholder:text-white/30"
              />
            </div>
          </div>

          {!showExitFeedback ? (
            <button
              onClick={() => {
                handleFinishExitTicket();
                setIsAutonomyAwarded(true);
              }}
              className="w-full py-4 rounded-xl bg-[#F8AD22] hover:bg-[#e09a1e] text-[#0A192F] font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">stars</span>
              <span>Finalizar Misión y Reclamar Insignia de Autonomía 🌟</span>
            </button>
          ) : (
            <div className="space-y-4">
              {/* Tarjeta de Insignia de Autonomía Total */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 via-emerald-500/20 to-transparent border border-amber-400/40 text-center space-y-3 shadow-2xl animate-pulse">
                <div className="text-5xl">🌟🏆</div>
                <h3 className="text-2xl font-black text-amber-300">¡Insignia de Autonomía Total Desbloqueada!</h3>
                <p className="text-xs text-white/90 max-w-lg mx-auto leading-relaxed">
                  Has completado toda la lección de <strong>{currentSubjectObj.name} ({selectedOaCode})</strong> de forma 100% independiente. ¡Demostraste que eres capaz de aprender solo/a!
                </p>
                <div className="bg-black/30 p-3 rounded-xl border border-white/10 max-w-md mx-auto">
                  <span className="text-[11px] font-bold text-[#18AFCB] block">📢 Notificación Enviada al Apoderado:</span>
                  <p className="text-[11px] text-white/80 italic">
                    "¡Mamá / Papá: Completé la lección del OA 01 100% por mí mismo sin necesitar ayuda!"
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-start">
            <button onClick={() => setCurrentStep(6)} className="px-4 py-2 text-xs font-bold text-white/60 hover:text-white">Atrás al Simulador</button>
          </div>
        </div>
      )}

      {/* MODAL PAUSA DE AUTORREGULACIÓN Y RESPIRACIÓN GUIADA (30s) */}
      {showBreathingModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-white/15 rounded-3xl p-6 md:p-8 max-w-md w-full text-center space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-[#18AFCB] uppercase tracking-wider">🌬️ Pausa de Autorregulación • Respiración 4-4-4</span>
              <button
                onClick={() => setShowBreathingModal(false)}
                className="w-7 h-7 rounded-full bg-white/10 text-white/70 hover:bg-white/20 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#18AFCB] to-indigo-500 mx-auto flex items-center justify-center text-4xl shadow-2xl animate-pulse ring-8 ring-indigo-500/20">
                🫁
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Sintoniza tu respiración</h3>
                <p className="text-xs text-white/70">Inhala lentamente en 4s, sostén el aire 4s y exhala suavemente en 4s.</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-mono text-[#F8AD22] space-y-1">
                <div className="font-bold">Ciclo de Tranquilidad:</div>
                <div className="text-white/80">Inhala (4s) ➔ Sostén (4s) ➔ Exhala (4s)</div>
              </div>
            </div>

            <button
              onClick={() => setShowBreathingModal(false)}
              className="w-full py-3.5 rounded-xl bg-[#12A1A4] hover:bg-[#0e8b8e] text-white font-bold text-xs shadow-lg transition-all"
            >
              ¡Me siento más relajado/a, continuar! 🚀
            </button>
          </div>
        </div>
      )}

      {/* MODAL LECTOR PANTALLA COMPLETA DE INFOGRAFÍA CÓMIC ILUSTRADA */}
      {showInfographicModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8 animate-in fade-in">
          <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#0A192F] border border-white/20 rounded-3xl p-4 md:p-6 shadow-2xl flex flex-col space-y-4 overflow-hidden">
            
            {/* Cabecera del Modal */}
            <div className="flex items-center justify-between border-b border-white/15 pb-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-[#F97316]/20 text-[#F97316] material-symbols-outlined text-lg">collections_bookmark</span>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#F97316] tracking-wider">Infografía Ilustrada Didáctica DUA</span>
                  <h3 className="text-base font-black text-white">Los Números Enteros: Un Viaje por la Recta Numérica</h3>
                </div>
              </div>
              <button
                onClick={() => setShowInfographicModal(false)}
                className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all flex items-center justify-center shrink-0"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Contenido de la Infografía con Zoom / Scroll Nítido */}
            <div className="flex-1 overflow-y-auto rounded-2xl border border-white/10 bg-black/80 p-2 shadow-inner">
              <img
                src="/infographics/numeros_enteros_infografia.webp"
                alt="Infografía Oficial Los Números Enteros"
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>

            {/* Pie del Modal */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10 shrink-0">
              <span className="text-xs font-semibold text-white/70 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
                <span>Infografía Oficial MINEDUC • Formato Cómic Explora DUA</span>
              </span>
              <button
                onClick={() => setShowInfographicModal(false)}
                className="px-6 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-black text-xs shadow-lg transition-all"
              >
                Cerrar Visor ✖
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
