import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Packer } from '../Web Studio Simple/node_modules/docx';
import { adaptPlayerLessonToGenerator } from '../Web Studio Simple/src/lib/lesson-adapter';
import { buildOAPackageDocx } from '../Web Studio Simple/src/lib/docx-export';
import { buildLessonPromptText } from '../Web Studio Simple/src/lib/prompt-export';
import { GeneratedOAPackage, OACatalogItem } from '../Web Studio Simple/src/lib/lesson-generator';
import { LessonData } from '../Web Studio Simple/src/types/lesson';

// Cargar clases base actuales
import { CIENCIAS_7B_OA01_CLASE01 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase01';
import { CIENCIAS_7B_OA01_CLASE02 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase02';
import { CIENCIAS_7B_OA01_CLASE03 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase03';
import { CIENCIAS_7B_OA01_CLASE04 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase04';
import { CIENCIAS_7B_OA01_CLASE05 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase05';
import { CIENCIAS_7B_OA01_CLASE06 } from '../Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase06';

function sha256File(filePath: string): string {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

function wordCount(str: string): number {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

// Clonar objetos para mutación segura
const c1: LessonData = JSON.parse(JSON.stringify(CIENCIAS_7B_OA01_CLASE01));
const c2: LessonData = JSON.parse(JSON.stringify(CIENCIAS_7B_OA01_CLASE02));
const c3: LessonData = JSON.parse(JSON.stringify(CIENCIAS_7B_OA01_CLASE03));
const c4: LessonData = JSON.parse(JSON.stringify(CIENCIAS_7B_OA01_CLASE04));
const c5: LessonData = JSON.parse(JSON.stringify(CIENCIAS_7B_OA01_CLASE05));
const c6: LessonData = JSON.parse(JSON.stringify(CIENCIAS_7B_OA01_CLASE06));

console.log('=== INICIANDO CALIBRACIÓN Y CORRECCIÓN INTEGRAL DE CIENCIAS OA01 (7° BÁSICO) ===\n');

// ============================================================================
// 1. CLASE 1: Las 4 Dimensiones de la Sexualidad Humana
// ============================================================================
console.log('Aplicando correcciones a Clase 1...');
c1.prep.adultObjective = "Guiar al estudiante a comprender que la sexualidad humana es una vivencia integral organizada didácticamente en cuatro dimensiones fundamentales: biológica, afectiva, social y ética, articulando los aspectos curriculares del Texto Escolar Ciencias Naturales 7° Básico MINEDUC (Edición SM, Unidad 1, Lección 1, págs. 16 a 29) con valores de respeto mutuo y responsabilidad personal, superando la visión reducida a lo reproductivo.";

// Acortar subtítulo explicativo 7 (era 10 palabras con signos)
c1.formalization.slides[6].overlaySubtitle = "Cuatro dimensiones unidas en salud integral";

// Diapositiva 2 de Explicación Clase 1: Eje endocrino unificado
c1.formalization.slides[1].vectorialOverlayPptx = "Diagrama endocrino: Hipotálamo (GnRH) -> Hipófisis anterior (LH y FSH) -> Gónadas (hormonas sexuales) -> Cambios puberales";
c1.formalization.slides[1].mathOverlayPptx = "Diagrama endocrino: Hipotálamo (GnRH) -> Hipófisis anterior (LH y FSH) -> Gónadas (hormonas sexuales) -> Cambios puberales";
c1.formalization.slides[1].speakerNotes = "La pubertad inicia cuando el hipotálamo (GnRH) estimula a la hipófisis anterior para secretar LH y FSH, las cuales activan a las gónadas a producir hormonas sexuales que inducen los cambios puberales.";

// Miniquiz Clase 1 a 4 alternativas (A, B, C, D)
c1.mini[0].options = [
  "Es una dimensión integral presente a lo largo de toda la vida que une lo biológico, afectivo, social y ético.",
  "Se reduce exclusivamente a la reproducción biológica y a los órganos del cuerpo humano.",
  "Es un tema que únicamente involucra a los adultos sin relación con las emociones.",
  "Es un fenómeno que solo aparece en la vejez y depende del clima ambiental."
];
c1.mini[0].correct = "Es una dimensión integral presente a lo largo de toda la vida que une lo biológico, afectivo, social y ético.";

c1.mini[1].options = [
  "Dimensión Social",
  "Dimensión Biológica",
  "Dimensión Ética",
  "Dimensión Afectiva"
];
c1.mini[1].correct = "Dimensión Biológica";

c1.mini[2].options = [
  "Dimensión ética y moral",
  "Exclusivamente biológica",
  "Únicamente climática",
  "Dimensión química y mineral"
];
c1.mini[2].correct = "Dimensión ética y moral";

// Recovery Clase 1 a 4 alternativas
c1.recovery[0].options = [
  "Las dimensiones afectiva (cariño) y social (amistades).",
  "Únicamente la dimensión biológica anatómica.",
  "Solamente la dimensión climática y meteorológica.",
  "Ninguna dimensión humana reconocible."
];
c1.recovery[0].correct = "Las dimensiones afectiva (cariño) y social (amistades).";

// ============================================================================
// 2. CLASE 2: Transformaciones Físicas y Emocionales en la Pubertad
// ============================================================================
console.log('Aplicando correcciones a Clase 2...');

// Acortar subtítulo explicativo 1 (era 9 palabras)
c1.formalization.slides[0].overlaySubtitle = "Comprender la sexualidad como dimensión integral";
c2.formalization.slides[0].overlaySubtitle = "Diferenciar caracteres sexuales primarios de secundarios";

// Gancho Diapositiva 2: Esquema endocrino unificado
c2.hook.slides[1].vectorialOverlayPptx = "Esquema endocrino: Hipotálamo (GnRH) -> Hipófisis anterior (LH y FSH) -> Gónadas (hormonas sexuales) -> Cambios puberales";
c2.hook.slides[1].mathOverlayPptx = "Esquema endocrino: Hipotálamo (GnRH) -> Hipófisis anterior (LH y FSH) -> Gónadas (hormonas sexuales) -> Cambios puberales";
c2.hook.slides[1].speakerNotes = "En el encéfalo, el hipotálamo libera GnRH estimulando a la hipófisis anterior para secretar LH y FSH, las cuales activan a las gónadas a producir hormonas sexuales.";

// Diapositiva 2 de Explicación: Eje Hipotálamo-Hipófisis-Gónadas unificado canónico
c2.formalization.slides[1].overlayTitle = "El sistema endocrino en acción";
c2.formalization.slides[1].overlaySubtitle = "Señales de LH, FSH y hormonas sexuales";
c2.formalization.slides[1].vectorialOverlayPptx = "Diagrama fisiológico: Hipotálamo (GnRH) -> Hipófisis anterior (LH y FSH) -> Gónadas (hormonas sexuales) -> Cambios puberales";
c2.formalization.slides[1].mathOverlayPptx = "Diagrama fisiológico: Hipotálamo (GnRH) -> Hipófisis anterior (LH y FSH) -> Gónadas (hormonas sexuales) -> Cambios puberales";
c2.formalization.slides[1].speakerNotes = "La pubertad inicia cuando el hipotálamo (GnRH) estimula a la hipófisis anterior para liberar LH y FSH; estas viajan por la sangre y activan a las gónadas a producir hormonas sexuales como estrógenos y testosterona que inducen los cambios puberales.";
c2.formalization.slides[1].visualPrompt = "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, in a modern science laboratory observing blank modular comparison panels representing the endocrine pathway with hypothalamus, pituitary and gonads, with generous negative space for text overlays. No text drawn by AI.";

// Diapositiva 3 de Explicación: Caracteres Primarios (prompt visual corregido a caracteres primarios)
c2.formalization.slides[2].overlayTitle = "Caracteres sexuales primarios";
c2.formalization.slides[2].overlaySubtitle = "Estructuras anatómicas presentes desde el nacimiento";
c2.formalization.slides[2].vectorialOverlayPptx = "Capa anatómica: Órganos reproductores congénitos presentes desde la gestación y el nacimiento";
c2.formalization.slides[2].mathOverlayPptx = "Capa anatómica: Órganos reproductores congénitos presentes desde la gestación y el nacimiento";
c2.formalization.slides[2].speakerNotes = "Los caracteres primarios son los órganos reproductores congénitos presentes desde el nacimiento; se formaron durante la gestación y existen antes de las señales hormonales de la pubertad.";
c2.formalization.slides[2].visualPrompt = "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, studying a respectful anatomical diagram of primary reproductive organs present from birth, with generous negative space for text overlays. No text drawn by AI.";

// Diapositiva 4 de Explicación: Caracteres Secundarios
c2.formalization.slides[3].overlaySubtitle = "Rasgos corporales activados en la pubertad";
c2.formalization.slides[3].speakerNotes = "Los caracteres secundarios surgen en la pubertad por estímulo de las hormonas sexuales: provocan el estirón de estatura, cambio de voz, desarrollo mamario y aparición de vello.";

// Miniquiz Clase 2 a 4 alternativas
c2.mini[0].options = [
  "La glándula hipófisis (ubicada en la base del cerebro)",
  "El páncreas (encargado de la digestión)",
  "Las glándulas sudoríparas de la piel",
  "El apéndice cecal del sistema digestivo"
];
c2.mini[0].correct = "La glándula hipófisis (ubicada en la base del cerebro)";

c2.mini[1].options = [
  "La presencia de ovarios o testículos desde el nacimiento",
  "El aumento acelerado de estatura (estirón puberal)",
  "La formación del corazón en la etapa embrionaria",
  "La presencia de los pulmones al nacer"
];
c2.mini[1].correct = "El aumento acelerado de estatura (estirón puberal)";

c2.mini[2].options = [
  "Significa obligatoriamente que uno de ellos tiene una deficiencia permanente",
  "Todos los seres humanos deben comenzar la pubertad el mismo día",
  "Cada cuerpo posee un ritmo biológico individual normal influenciado por factores genéticos y de salud",
  "Demuestra que la pubertad no depende de señales hormonales"
];
c2.mini[2].correct = "Cada cuerpo posee un ritmo biológico individual normal influenciado por factores genéticos y de salud";

// Recovery Clase 2 a 4 alternativas
c2.recovery[0].options = [
  "El cambio en el tono de la voz en la adolescencia",
  "El ensanchamiento de hombros durante la pubertad",
  "Los órganos reproductores anatómicos presentes al nacer",
  "La aparición de vello corporal durante el estirón"
];
c2.recovery[0].correct = "Los órganos reproductores anatómicos presentes al nacer";

// ============================================================================
// 3. CLASE 3: Vínculos afectivos, respeto mutuo e intimidad
// ============================================================================
console.log('Aplicando correcciones a Clase 3...');

// Gancho Diapositiva 5: Alineación estricta con intimidad digital (reemplazar reciprocidad)
c3.hook.slides[4].overlayTitle = "Cuidado de la intimidad digital";
c3.hook.slides[4].overlaySubtitle = "Proteger la privacidad propia y ajena en redes";
c3.hook.slides[4].vectorialOverlayPptx = "Escudo digital: Respeto a fotos privadas, contraseñas y mensajes personales";
c3.hook.slides[4].mathOverlayPptx = "Escudo digital: Respeto a fotos privadas, contraseñas y mensajes personales";
c3.hook.slides[4].visualPrompt = "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, responsibly reviewing privacy settings on digital tablets with a protective digital shield icon, respecting personal boundaries and digital privacy, with generous negative space for text overlays. No text drawn by AI.";
c3.hook.slides[4].speakerNotes = "Cuidar la intimidad digital significa respetar las fotos, mensajes y contraseñas de los demás, recordando que la privacidad personal es un derecho innegociable en redes sociales.";

// Acortar subtítulo explicativo 1 (era 15 palabras)
c3.formalization.slides[0].overlaySubtitle = "Comprender empatía, reciprocidad e intimidad en vínculos";

// Miniquiz Clase 3 a 4 alternativas
c3.mini[0].options = [
  "Escuchar con atención los sentimientos del otro e intentar comprender su perspectiva sin burlarse ni juzgar",
  "Interrumpir constantemente al amigo para demostrar superioridad",
  "Obligar al compañero a cambiar de opinión para que piense igual",
  "Ignorar lo que la otra persona expresa y retirarse con enojo"
];
c3.mini[0].correct = "Escuchar con atención los sentimientos del otro e intentar comprender su perspectiva sin burlarse ni juzgar";

c3.mini[1].options = [
  "Únicamente los bienes materiales que una persona compra en tiendas",
  "La obligación de publicar toda la vida en redes sociales",
  "Los pensamientos, emociones, vivencias personales y la privacidad del propio cuerpo frente a intromisiones no deseadas",
  "El deber de someterse a las opiniones del grupo de pares"
];
c3.mini[1].correct = "Los pensamientos, emociones, vivencias personales y la privacidad del propio cuerpo frente a intromisiones no deseadas";

c3.mini[2].options = [
  "Una de las partes impone su voluntad gritando o amenazando",
  "Se dialoga de manera asertiva, buscando acuerdos donde ambas personas sean valoradas",
  "Se corta el diálogo indefinidamente sin buscar solución",
  "Se presiona a la otra persona hasta que ceda por cansancio"
];
c3.mini[2].correct = "Se dialoga de manera asertiva, buscando acuerdos donde ambas personas sean valoradas";

// Recovery Clase 3 a 4 alternativas
c3.recovery[0].options = [
  "No divulgar sus secretos personales ni compartir sus fotografías sin su consentimiento",
  "Publicar sus anécdotas privadas en internet para llamar la atención",
  "Compartir sus contraseñas con otros compañeros de curso",
  "Grabar conversaciones privadas y difundirlas en grupos"
];
c3.recovery[0].correct = "No divulgar sus secretos personales ni compartir sus fotografías sin su consentimiento";

// ============================================================================
// 4. CLASE 4: Responsabilidad individual, consentimiento y autocuidado
// ============================================================================
console.log('Aplicando correcciones a Clase 4...');

// Acortar subtítulo explicativo 1 (era 9 palabras)
c4.formalization.slides[0].overlaySubtitle = "Reconocer consentimiento mutuo, límites corporales y autocuidado";

// Acortar subtítulo explicativo 7 (era 9 palabras con pipes)
c4.formalization.slides[6].overlaySubtitle = "Límites claros y respeto corporal mutuo";

// Miniquiz Clase 4 a 4 alternativas
c4.mini[0].options = [
  "Obligatorio por presión del grupo aunque exista incomodidad",
  "Libre de presiones, informado, específico para la situación y revocable en todo momento",
  "Otorgado una única vez en la vida sin posibilidad de cambiar de opinión",
  "Aceptado por temor a perder una amistad o sufrir burlas"
];
c4.mini[0].correct = "Libre de presiones, informado, específico para la situación y revocable en todo momento";

c4.mini[1].options = [
  "Expresar con claridad, calma y firmeza las propias decisiones y límites respetando al interlocutor",
  "Imponer la propia voluntad gritando y agrediendo a quien piense distinto",
  "Guardar silencio y aceptar todo lo que los demás exijan para no discutir",
  "Aceptar presiones grupales para evitar el rechazo social"
];
c4.mini[1].correct = "Expresar con claridad, calma y firmeza las propias decisiones y límites respetando al interlocutor";

c4.mini[2].options = [
  "Insistir varias veces más hasta que la persona se acostumbre",
  "Enojarse y descalificarla frente a todo el grupo",
  "Detenerse inmediatamente y respetar su límite sin hacer preguntas ni burlarse",
  "Ignorar la petición y continuar argumentando que es solo una broma"
];
c4.mini[2].correct = "Detenerse inmediatamente y respetar su límite sin hacer preguntas ni burlarse";

// Recovery Clase 4 a 4 alternativas
c4.recovery[0].options = [
  "Continuar insistiendo hasta que cambie de parecer",
  "Aceptar su respuesta de inmediato y respetar su decisión sin presionar",
  "Burlarse de su decisión con los demás compañeros",
  "Presionarlo mediante amenazas de dejar de ser amigos"
];
c4.recovery[0].correct = "Aceptar su respuesta de inmediato y respetar su decisión sin presionar";

// ============================================================================
// 5. CLASE 5: Variabilidad biológica, mitos y convivencia saludable
// ============================================================================
console.log('Aplicando correcciones a Clase 5...');

// Acortar subtítulo Gancho 4 (era 10 palabras)
c5.hook.slides[3].overlaySubtitle = "Las emociones y valores no tienen género";

// Explicación Diapositiva 2: Distinción entre inicio puberal (8-13 niñas, 9-14 niños) y estirón
c5.formalization.slides[1].visualPrompt = "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, in a modern science laboratory observing blank modular comparison panels on a digital display, with generous negative space for text overlays. No text drawn by AI.";
c5.formalization.slides[1].overlayTitle = "Rangos biológicos de la pubertad";
c5.formalization.slides[1].overlaySubtitle = "Inicio puberal y sus variaciones habituales";
c5.formalization.slides[1].vectorialOverlayPptx = "Inicio puberal habitual: 8 a 13 años en niñas y 9 a 14 años en niños (MedlinePlus / OMS)";
c5.formalization.slides[1].mathOverlayPptx = "Inicio puberal habitual: 8 a 13 años en niñas y 9 a 14 años en niños (MedlinePlus / OMS)";
c5.formalization.slides[1].speakerNotes = "El inicio de la pubertad varía entre personas: suele ocurrir entre los 8 y 13 años en niñas y entre los 9 y 14 en niños según MedlinePlus y la OMS. Este inicio habitual no debe confundirse con el momento del estirón de estatura, que ocurre en etapas posteriores.";

// Gancho Diapositivas 2 y 3: Estirón respaldado y prompt visual aclarando estirón de estatura vs inicio puberal
c5.hook.slides[1].vectorialOverlayPptx = "Variabilidad del crecimiento: Estirón de estatura con amplia dispersión saludable (Tanner / MedlinePlus)";
c5.hook.slides[1].mathOverlayPptx = "Variabilidad del crecimiento: Estirón de estatura con amplia dispersión saludable (Tanner / MedlinePlus)";
c5.hook.slides[2].visualPrompt = "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, in a modern science classroom observing blank modular panels representing the height growth spurt window (between ages 10 and 16, distinct from earlier pubertal onset), with generous negative space for text overlays. No text drawn by AI.";
c5.hook.slides[2].speakerNotes = "El estirón de estatura suele ocurrir como un hito posterior de la pubertad (habitualmente entre los 10 y 16 años según Tanner y MedlinePlus), mientras el inicio puberal ocurre antes (8-13 años en niñas y 9-14 en niños según MedlinePlus). Crecer a ritmos distintos es completamente normal.";

// Explicación Diapositiva 4: Estereotipos sin afirmaciones dogmáticas de neurociencia
c5.formalization.slides[3].speakerNotes = "Los estereotipos que asignan roles rígidos carecen de fundamento científico. Los estereotipos sociales no deben limitar los intereses, talentos ni oportunidades de cada estudiante.";

// Explicación Diapositiva 5: Reemplazar locución de nutrición/sueño por efecto de burlas y ambiente seguro
c5.formalization.slides[4].overlayTitle = "Efectos del juicio y la burla";
c5.formalization.slides[4].overlaySubtitle = "Fomentar un entorno escolar seguro";
c5.formalization.slides[4].vectorialOverlayPptx = "Mecanismo protector: Validación entre pares + Comunicación asertiva + Cero burlas corporales";
c5.formalization.slides[4].mathOverlayPptx = "Mecanismo protector: Validación entre pares + Comunicación asertiva + Cero burlas corporales";
c5.formalization.slides[4].visualPrompt = "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, fostering an inclusive and supportive environment with classmates in a bright classroom, rejecting teasing and body judgment, with generous negative space for text overlays. No text drawn by AI.";
c5.formalization.slides[4].speakerNotes = "Las burlas sobre el cuerpo pueden generar inseguridad y aislamiento. Promover un entorno escolar seguro exige empatía, detener los comentarios dañinos y recordar que cada persona vive su desarrollo a su propio ritmo.";

// Explicación Diapositiva 6: Eliminar rango 10-16 como estirón universal y no dictaminar normalidad sin datos
c5.formalization.slides[5].overlayTitle = "Caso Modelado: Variabilidad en el crecimiento";
c5.formalization.slides[5].overlaySubtitle = "Comprender ritmos diversos sin diagnósticos apresurados";
c5.formalization.slides[5].vectorialOverlayPptx = "El ritmo de crecimiento es individual; ante dudas o inquietudes, consultar con un adulto de confianza o profesional de salud";
c5.formalization.slides[5].mathOverlayPptx = "El ritmo de crecimiento es individual; ante dudas o inquietudes, consultar con un adulto de confianza o profesional de salud";
c5.formalization.slides[5].speakerNotes = "Si un estudiante de 13 años nota que sus compañeros crecen a distinto ritmo, debe recordar que los momentos del estirón varían. Una curva general no diagnostica a una persona; ante cualquier inquietud, lo adecuado es conversarlo con un adulto de confianza o un profesional de salud.";

// Miniquiz Clase 5 a 4 alternativas
c5.mini[0].q = "La variabilidad en el inicio habitual de la pubertad (8 a 13 años en niñas y 9 a 14 en niños) demuestra que:";
c5.mini[0].options = [
  "Quienes comienzan más tarde presentan obligatoriamente una deficiencia grave",
  "Cada organismo tiene un ritmo biológico y genético individual dentro de rangos normales de salud",
  "Todos los adolescentes deberían recibir tratamientos hormonales para igualar su crecimiento",
  "La estatura final depende exclusivamente de comenzar la pubertad de manera temprana"
];
c5.mini[0].correct = "Cada organismo tiene un ritmo biológico y genético individual dentro de rangos normales de salud";
c5.mini[0].fixExplain = "La variabilidad cronológica en el inicio puberal es normal y saludable; cada persona tiene su propio ritmo genético.";

c5.mini[1].q = "¿Cuál de las siguientes afirmaciones sobre los estereotipos sociales de género está respaldada por la ciencia?";
c5.mini[1].options = [
  "Son leyes biológicas inmutables determinadas estrictamente por los cromosomas",
  "Permiten organizar la sociedad asignando tareas según el potencial cerebral de cada sexo",
  "Los estereotipos sociales no deben limitar los intereses, talentos ni oportunidades de cada estudiante",
  "La neurociencia demuestra que los gustos e intereses están prefijados por el sexo al nacer"
];
c5.mini[1].correct = "Los estereotipos sociales no deben limitar los intereses, talentos ni oportunidades de cada estudiante";
c5.mini[1].fixExplain = "Los estereotipos son construcciones culturales arbitrarias; cada estudiante debe desarrollar plenamente sus intereses, talentos y oportunidades.";

c5.mini[2].options = [
  "Reírse de las burlas corporales para demostrar sentido del humor en el grupo",
  "Respetar la apariencia física y los ritmos personales de todos, rechazando apodos y juicios sobre el cuerpo",
  "Aconsejar a los compañeros que oculten sus emociones para no mostrar debilidad",
  "Juzgar a quienes crecen más lento o más rápido que el promedio del curso"
];
c5.mini[2].correct = "Respetar la apariencia física y los ritmos personales de todos, rechazando apodos y juicios sobre el cuerpo";

// Recovery Clase 5 a 4 alternativas
c5.recovery[0].options = [
  "Sí, porque todos los seres humanos deben crecer exactamente la misma cantidad de centímetros al mes",
  "No, porque la diversidad de ritmos y tiempos es normal; ante dudas se consulta a un profesional de salud",
  "Sí, porque las diferencias de estatura indican una anomalía biológica inmediata",
  "Sí, porque el estirón debe ocurrir exactamente en la misma fecha en todos los adolescentes"
];
c5.recovery[0].correct = "No, porque la diversidad de ritmos y tiempos es normal; ante dudas se consulta a un profesional de salud";

// ============================================================================
// 6. CLASE 6: Síntesis integral y evaluación tipo Examen Libre
// ============================================================================
console.log('Aplicando correcciones a Clase 6...');

// Referencia inicial: Organizador didáctico sin atribuir a Bases Curriculares 4 dimensiones
c6.reference.expectedAnswer = "Porque la sexualidad humana se organiza didácticamente en cuatro dimensiones fundamentales (biológica, afectiva, social y ética) para estructurar los aspectos curriculares del OA 1 y los valores de respeto mutuo, por lo que reducirla solo a lo biológico resulta incompleto y erróneo.";

// Explicación Diapositivas 2, 3, 4: Prompts visuales específicos
c6.formalization.slides[1].visualPrompt = "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, examining a three-category diagram of typical exam distractors: factual errors, biological reductionism, and sweeping generalizations, with generous negative space for text overlays. No text drawn by AI.";
c6.formalization.slides[1].speakerNotes = "En las preguntas de ciencias encontramos tres tipos comunes de distractores: el error fáctico con datos falsos, el reduccionismo que olvida lo afectivo o social, y las generalizaciones absolutas sin respaldo.";

c6.formalization.slides[2].visualPrompt = "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, analyzing an exam question prompt on a digital display, highlighting the core verb and key scientific conditions, with generous negative space for text overlays. No text drawn by AI.";
c6.formalization.slides[2].speakerNotes = "El primer paso consiste en leer el enunciado para aislar la pregunta central: identificamos el sujeto del caso, la situación descrita y el verbo rector que define la tarea científica pedida.";

c6.formalization.slides[3].visualPrompt = "Modern anime style 16:9 widescreen illustration. Two 13-year-old student explorers, a girl with braided hair and a boy in a teal jacket, methodically evaluating four blank interactive choice cards against scientific criteria on a test review board, with generous negative space for text overlays. No text drawn by AI.";
c6.formalization.slides[3].speakerNotes = "En el segundo paso evaluamos críticamente cada alternativa: revisamos las opciones A, B, C y D una por una, comprobando si contienen errores fácticos, si son incompletas o si cumplen todas las condiciones científicas del enunciado.";

// Explicación Diapositiva 5: Notas al orador desarrollan selección de clave autosuficiente
c6.formalization.slides[4].speakerNotes = "En el tercer paso seleccionamos la respuesta correcta asegurándonos de que sea completa y autosuficiente: debe responder directamente a lo preguntado, tener coherencia con el marco curricular del MINEDUC y carecer de contradicciones científicas.";

// Explicación Diapositiva 6: Nomenclatura reactivo de práctica y organizador didáctico
c6.formalization.slides[5].overlayText = "Caso Modelado: Reactivo de Práctica";
c6.formalization.slides[5].overlayTitle = "Caso Modelado: Reactivo de Práctica";
c6.formalization.slides[5].overlaySubtitle = "Análisis y descarte de 4 alternativas";
c6.formalization.slides[5].speakerNotes = "Analicemos un reactivo de práctica elaborado para esta clase según el estándar de 7° Básico: un estudiante afirma que la sexualidad se limita exclusivamente a órganos y procreación. A partir del Texto Escolar Ciencias Naturales 7° Básico Edición SM (Unidad 1, pág. 16), la opción B es correcta porque establece que la sexualidad se organiza didácticamente en cuatro dimensiones fundamentales: biológica, afectiva, social y ética.";

c6.practice[0].context = "Caso 1: Reactivo de práctica elaborado para esta clase";

// Recovery Clase 6 a 4 alternativas y organizador didáctico
c6.recovery[0].q = "¿Qué dimensiones articulan didácticamente la sexualidad humana como organizador de esta unidad (Edición SM, pág. 16)?";
c6.recovery[0].correctText = "¡Exacto! El organizador didáctico de cuatro dimensiones (biológica, afectiva, social y ética) articula los aspectos curriculares con los valores de respeto y responsabilidad.";
c6.recovery[0].options = [
  "Únicamente la dimensión biológica y la reproducción en la etapa adulta",
  "Biológica, afectiva, social y ética a lo largo de toda la vida",
  "Exclusivamente la dimensión económica y laboral",
  "Solamente los cambios anatómicos visibles en la adolescencia"
];
c6.recovery[0].correct = "Biológica, afectiva, social y ética a lo largo de toda la vida";

// ============================================================================
// VERIFICACIÓN AUTOMÁTICA DE INVARIANTES EN LAS 6 LECCIONES
// ============================================================================
console.log('\n--- VERIFICANDO INVARIANTES DE CALIDAD PEDAGÓGICA ---');
const allLessons = [c1, c2, c3, c4, c5, c6];

allLessons.forEach((l, idx) => {
  const cNum = idx + 1;
  const allSlides = [...(l.hook?.slides || []), ...(l.formalization?.slides || [])];
  
  if (allSlides.length !== 14) {
    throw new Error(`Clase ${cNum} no tiene 14 diapositivas (tiene ${allSlides.length})`);
  }

  allSlides.forEach((s) => {
    const subWords = wordCount(s.overlaySubtitle || '');
    if (subWords > 8) {
      throw new Error(`Clase ${cNum} Lámina ${s.slideNumber}: subtítulo supera 8 palabras (${subWords}): "${s.overlaySubtitle}"`);
    }

    if (!s.visualPrompt.includes('Two 13-year-old student explorers')) {
      throw new Error(`Clase ${cNum} Lámina ${s.slideNumber}: visualPrompt no menciona a ambos exploradores`);
    }

    if (!s.visualPrompt.includes('No text drawn by AI')) {
      throw new Error(`Clase ${cNum} Lámina ${s.slideNumber}: visualPrompt no incluye la restricción 'No text drawn by AI'`);
    }
  });

  (l.mini || []).forEach((m, qi) => {
    if (m.options?.length !== 4) {
      throw new Error(`Clase ${cNum} Miniquiz Q${qi + 1} no tiene 4 opciones (tiene ${m.options?.length})`);
    }
    if (!m.options.includes(m.correct)) {
      throw new Error(`Clase ${cNum} Miniquiz Q${qi + 1} la clave correcta no coincide con ninguna opción`);
    }
  });

  (l.recovery || []).forEach((r, ri) => {
    if (r.options?.length !== 4) {
      throw new Error(`Clase ${cNum} Recovery Q${ri + 1} no tiene 4 opciones (tiene ${r.options?.length})`);
    }
    if (!r.options.includes(r.correct)) {
      throw new Error(`Clase ${cNum} Recovery Q${ri + 1} la clave correcta no coincide con ninguna opción`);
    }
  });

  console.log(`✓ Clase ${cNum} (${l.metadata.lessonTitle}): 14 láminas calibradas, subtítulos <= 8 palabras, 4 alternativas A-D en evaluación.`);
});

// ============================================================================
// ESCRIBIR ARCHIVOS TYPESCRIPT EN Web Studio Simple/src/data/lessons/
// ============================================================================
console.log('\n--- ESCRIBIENDO ARCHIVOS TYPESCRIPT DE LECCIONES ---');
const lessonsDir = path.resolve('Web Studio Simple/src/data/lessons');
const tsFiles = [
  { name: 'ciencias_7b_oa01_clase01.ts', varName: 'CIENCIAS_7B_OA01_CLASE01', data: c1 },
  { name: 'ciencias_7b_oa01_clase02.ts', varName: 'CIENCIAS_7B_OA01_CLASE02', data: c2 },
  { name: 'ciencias_7b_oa01_clase03.ts', varName: 'CIENCIAS_7B_OA01_CLASE03', data: c3 },
  { name: 'ciencias_7b_oa01_clase04.ts', varName: 'CIENCIAS_7B_OA01_CLASE04', data: c4 },
  { name: 'ciencias_7b_oa01_clase05.ts', varName: 'CIENCIAS_7B_OA01_CLASE05', data: c5 },
  { name: 'ciencias_7b_oa01_clase06.ts', varName: 'CIENCIAS_7B_OA01_CLASE06', data: c6 }
];

for (const tf of tsFiles) {
  const filePath = path.join(lessonsDir, tf.name);
  const code = `import { LessonData } from '../../types/lesson';\n\nexport const ${tf.varName}: LessonData = ${JSON.stringify(tf.data, null, 2)};\n`;
  fs.writeFileSync(filePath, code, 'utf8');
  console.log(`✓ Actualizado ${tf.name} (${fs.statSync(filePath).size} bytes)`);
}

// También actualizar scripts/ciencias_data/clase02_data.ts a clase06_data.ts
const scriptsCienciasDir = path.resolve('scripts/ciencias_data');
if (fs.existsSync(scriptsCienciasDir)) {
  fs.writeFileSync(path.join(scriptsCienciasDir, 'clase02_data.ts'), `export function buildClase02() {\n  return ${JSON.stringify(c2, null, 2)};\n}\n`, 'utf8');
  fs.writeFileSync(path.join(scriptsCienciasDir, 'clase03_data.ts'), `export function buildClase03() {\n  return ${JSON.stringify(c3, null, 2)};\n}\n`, 'utf8');
  fs.writeFileSync(path.join(scriptsCienciasDir, 'clase04_data.ts'), `export function buildClase04() {\n  return ${JSON.stringify(c4, null, 2)};\n}\n`, 'utf8');
  fs.writeFileSync(path.join(scriptsCienciasDir, 'clase05_data.ts'), `export function buildClase05() {\n  return ${JSON.stringify(c5, null, 2)};\n}\n`, 'utf8');
  fs.writeFileSync(path.join(scriptsCienciasDir, 'clase06_data.ts'), `export function buildClase06() {\n  return ${JSON.stringify(c6, null, 2)};\n}\n`, 'utf8');
  console.log('✓ Archivos auxiliares en scripts/ciencias_data/ actualizados.');
}

// ============================================================================
// CONSTRUCCIÓN DEL PAQUETE CURRICULAR (DOCX, TXT Y MANIFIESTO)
// ============================================================================
async function buildOutputs() {
  console.log('\n--- COMPILANDO PLAN MAESTRO DOCX OFICIAL Y PROMPTS PARA WORK ---');

  const rootDir = process.cwd();
  const targetOaDir = path.resolve(rootDir, 'LECCIONES/110-7/Ciencias_Naturales/OA01');
  const catalogPath = path.resolve(rootDir, 'Web Studio Simple/public/data/curriculum_catalog.json');
  const catalog: OACatalogItem[] = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

  const catalogItem = catalog.find((c) => c.id === '110-7-CIE-OA01') || {
    id: '110-7-CIE-OA01',
    curso: '7° Básico',
    asignatura: 'Ciencias Naturales',
    eje: 'Biología',
    oa: 'OA 1',
    oaNumero: 1,
    inTemarioEELL: true,
    temarioPosicion: 1,
    isPriorityDemo: true,
    descripcion: 'Explicar los aspectos biológicos, afectivos y sociales que se integran en la sexualidad humana, considerando: Los cambios físicos que ocurren durante la pubertad. La relación con los pares y la familia. El reconocimiento de la propia identidad. Las responsabilidades individuales y el respeto mutuo.',
    referenciaTextoEscolar: {
      libro: 'Texto del Estudiante Ciencias Naturales 7° Básico (MINEDUC / Edición SM)',
      unidad: 'Unidad 1: Sexualidad y Afectividad',
      leccion: 'Lección 1: Las Dimensiones de la Sexualidad Humana',
      paginas: 'págs. 16 a 29'
    },
    indicadores: [
      'Diferencian aspectos físicos, biológicos, afectivos y sociales de la sexualidad humana.',
      'Interpretan la pubertad como una etapa de maduración biológica y psicológica universal.',
      'Explican la sexualidad como una dimensión integral presente en todas las etapas de la vida.',
      'Discuten en torno a la responsabilidad individual, los límites corporales y el consentimiento informado.'
    ],
    conceptosClave: [
      'Sexualidad integral',
      'Pubertad',
      'Caracteres sexuales primarios y secundarios',
      'Eje hipotálamo-hipófisis-gónadas',
      'Consentimiento informado',
      'Variabilidad biológica'
    ],
    leccionesSugeridas: 6,
    justificacionLecciones: 'Dosificación oficial en 6 lecciones completas según estándar de ChatGPT Work y cobertura exhaustiva de EELL.'
  };

  // Convertir las 6 lecciones al formato del generador
  const generatorLessons = allLessons.map((l) => adaptPlayerLessonToGenerator(l));

  const pkg: GeneratedOAPackage = {
    oa: catalogItem,
    totalLessons: 6,
    lessons: generatorLessons
  };

  // 1. Compilar DOCX oficial
  console.log('Compilando DOCX oficial (buildOAPackageDocx)...');
  const doc = buildOAPackageDocx(pkg);
  const docxBuffer = await Packer.toBuffer(doc);
  const docxFilename = 'Plan_Maestro_7Básico_110-7-CIE-OA01_6Lecciones.docx';
  const docxPath = path.join(targetOaDir, docxFilename);
  fs.writeFileSync(docxPath, docxBuffer);

  const docxBytes = fs.statSync(docxPath).size;
  const docxSha256 = sha256File(docxPath);
  console.log(`✓ DOCX oficial generado en su ruta canónica: ${docxPath}`);
  console.log(`  -> Bytes: ${docxBytes}`);
  console.log(`  -> SHA-256: ${docxSha256}`);

  // Sincronizar copias en public/descargas_planes_maestros y DESCARGA_LECCIONES
  const publicDir = path.resolve('Web Studio Simple/public/descargas_planes_maestros');
  const descargaDir = path.resolve('DESCARGA_LECCIONES');

  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, docxFilename), docxBuffer);
    fs.writeFileSync(path.join(publicDir, 'Ciencias_OA01.docx'), docxBuffer);
    console.log(`✓ Sincronizado en ${publicDir}`);
  }

  if (fs.existsSync(descargaDir)) {
    fs.writeFileSync(path.join(descargaDir, docxFilename), docxBuffer);
    fs.writeFileSync(path.join(descargaDir, 'Ciencias_OA01.docx'), docxBuffer);
    console.log(`✓ Sincronizado en ${descargaDir}`);
  }

  // 2. Compilar TXT de Prompts para Work (84 láminas)
  console.log('\nGenerando archivo TXT consolidado de Prompts para Work (84 láminas)...');
  let promptText = '';
  promptText += `================================================================================\n`;
  promptText += `STUDIOSIMPLE - PAQUETE DE PROMPTS Y GUIONES OFICIALES PARA CHATGPT WORK\n`;
  promptText += `ASIGNATURA: CIENCIAS NATURALES | CURSO: 7° BÁSICO | OBJETIVO: OA 01\n`;
  promptText += `PAQUETE COMPLETO: 6 LECCIONES CANÓNICAS (14 LÁMINAS POR LECCIÓN = 84 LÁMINAS)\n`;
  promptText += `================================================================================\n\n`;

  for (let i = 0; i < allLessons.length; i++) {
    const l = allLessons[i];
    promptText += `################################################################################\n`;
    promptText += `LECCIÓN ${i + 1} DE 6: ${l.metadata.lessonTitle.toUpperCase()}\n`;
    promptText += `################################################################################\n\n`;
    promptText += buildLessonPromptText(l);
    promptText += `\n\n`;
  }

  const txtFilename = 'Prompts_Work_Ciencias_7B_OA01.txt';
  const txtPath = path.join(targetOaDir, txtFilename);
  fs.writeFileSync(txtPath, promptText, 'utf8');
  const txtBytes = fs.statSync(txtPath).size;
  const txtSha256 = sha256File(txtPath);
  console.log(`✓ TXT consolidado generado en: ${txtPath}`);
  console.log(`  -> Bytes: ${txtBytes}`);
  console.log(`  -> SHA-256: ${txtSha256}`);

  const txtDescargasDir = path.resolve('DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK');
  if (fs.existsSync(txtDescargasDir)) {
    fs.writeFileSync(path.join(txtDescargasDir, txtFilename), promptText, 'utf8');
    console.log(`✓ Sincronizado en ${txtDescargasDir}`);
  }

  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, txtFilename), promptText, 'utf8');
    console.log(`✓ Sincronizado en ${publicDir}`);
  }

  // Sincronizar catálogo JSON en public/data (injected_lessons_7b.json e injected_lessons_all_grades.json)
  const canonicalPkgData = {
    oaId: "110-7-CIE-OA01",
    curso: "7° Básico",
    asignatura: "Ciencias Naturales",
    oaCodigo: "OA 1",
    totalLecciones: 6,
    lessons: generatorLessons
  };

  const syncJsonFile = (relPath: string) => {
    const fPath = path.resolve(relPath);
    if (!fs.existsSync(fPath)) return;
    const list = JSON.parse(fs.readFileSync(fPath, 'utf8'));
    let replaced = false;
    for (let i = 0; i < list.length; i++) {
      const it = list[i];
      if (
        it.oaId === '110-7-CIE-OA01' ||
        (it.curso?.includes('7') &&
          it.asignatura?.includes('Ciencias') &&
          !it.asignatura?.includes('Sociales') &&
          (it.oaCodigo === 'OA 1' || it.oaCodigo === 'OA 01' || it.oaCodigo === 'OA1'))
      ) {
        list[i] = canonicalPkgData;
        replaced = true;
        break;
      }
    }
    if (!replaced) list.unshift(canonicalPkgData);
    fs.writeFileSync(fPath, JSON.stringify(list, null, 2), 'utf8');
    console.log(`✓ Sincronizado paquete canónico en ${relPath}`);
  };

  syncJsonFile('Web Studio Simple/public/data/injected_lessons_7b.json');
  syncJsonFile('Web Studio Simple/public/data/injected_lessons_all_grades.json');

  // 3. Actualizar manifest.json
  console.log('\nActualizando manifest.json...');
  const manifestPath = path.join(targetOaDir, 'manifest.json');
  const manifest = {
    curso: "110-7",
    asignatura: "Ciencias_Naturales",
    oa: "OA01",
    identificador_paquete: "110-7-CIE-OA01",
    version: "1.5.0",
    fecha_actualizacion: "2026-10-07",
    estado: "REQUIERE_AJUSTES",
    total_clases: 6,
    fuente_oficial_unica_docx: {
      archivo: docxFilename,
      rol: "Unica fuente oficial de produccion de lecciones y prompts",
      sha256: docxSha256,
      bytes: docxBytes
    },
    prompts_asociados: {
      archivo: txtFilename,
      ruta_origen_zip_anterior: `DESCARGA_LECCIONES/PROMPTS_TXT_PARA_WORK/${txtFilename}`,
      total_laminas: 84,
      laminas_por_clase: 14,
      perfil_evaluacion: "Perfil 7° Básico (14 láminas bimodales: 7 Gancho + 7 Explicación; 4 alternativas A-D en todas las preguntas)"
    },
    fundamentacion_curricular: {
      temario_eell: {
        archivo: "TEMARIOS EELL/temario 7° basico.pdf",
        pagina: 7,
        seccion: "Eje Biología - Objetivo de Aprendizaje N° 1: Explicar los aspectos biológicos, afectivos y sociales que se integran en la sexualidad humana.",
        plan_estudios_complementario: "TEMARIOS EELL/Septimo/Plan_de_Estudios_Optimizado_7Basico.docx",
        documento_detallado: "TEMARIOS EELL/Septimo/Ciencias/Clase_1_Ciencias_Naturales_Detallada.pdf"
      },
      insumos_mineduc: {
        texto_estudiante_pdf: "INSUMOS/LIBROS DIGITALES Y GUÍAS/110-7/Ciencias Naturales.pdf",
        unidad_y_paginas: "Unidad 1: Sexualidad y Afectividad, Lección 1 (pág. 16 a 29)",
        banco_digital_actividades: "INSUMOS/LIBROS DIGITALES Y GUÍAS/110-7/BDA_CNA_7B/",
        resumen_oficial: "INSUMOS/RESUMENES/110-7/RESUMEN CIENCIAS NATURALES.pdf",
        ensayos_oficiales: "INSUMOS/ENSAYOS/110-7/CIENCIAS NATURALES.pdf"
      }
    },
    resolucion_rutas_typescript: {
      raiz_repositorio: "d:/StudioSimple - Antigravity/",
      raiz_app_spa: "Web Studio Simple/",
      alias_tsconfig: "@/* -> ./src/* (definido en Web Studio Simple/tsconfig.json)",
      archivos_clases_ts: [
        "Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase01.ts",
        "Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase02.ts",
        "Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase03.ts",
        "Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase04.ts",
        "Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase05.ts",
        "Web Studio Simple/src/data/lessons/ciencias_7b_oa01_clase06.ts"
      ]
    }
  };

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`✓ manifest.json actualizado con estado REQUIERE_AJUSTES y SHA-256 real.`);
}

buildOutputs().catch((err) => {
  console.error('Error durante la construcción del paquete:', err);
  process.exit(1);
});
