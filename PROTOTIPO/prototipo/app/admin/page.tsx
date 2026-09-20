"use client";

import { useEffect, useState, useMemo } from "react";
import {
  BookOpen,
  Check,
  Code,
  Copy,
  Download,
  KeyRound,
  Lock,
  LogOut,
  Sparkles,
  Star
} from "lucide-react";
import {
  OACatalogItem,
  GeneratedOAPackage,
  generateOAPackage
} from "../../lib/lesson-generator";
import { exportOAPackageToDocx } from "../../lib/docx-export";

// Mapeo curricular de los Libros Escolares Oficiales (MATERIALES/110-7)
const TEXTBOOK_MAPPINGS: Record<string, { libro: string; unidad: string; leccion: string; paginas: string }> = {
  "110-7-MAT-OA01": {
    libro: "Matemática 7° Básico (Texto del Estudiante MINEDUC)",
    unidad: 'Unidad 1: "Números"',
    leccion: 'Lección 1: "Números enteros"',
    paginas: "Páginas 6 a 25"
  },
  "110-7-MAT-OA03": {
    libro: "Matemática 7° Básico (Texto del Estudiante MINEDUC)",
    unidad: 'Unidad 1: "Números"',
    leccion: 'Lección 2: "Fracciones y decimales"',
    paginas: "Páginas 26 a 41"
  },
  "110-7-CIE-OA01": {
    libro: "Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)",
    unidad: 'Unidad 1: "Sexualidad y autocuidado"',
    leccion: 'Lección 1: "Dimensiones biológicas y afectivas"',
    paginas: "Páginas 10 a 29"
  },
  "110-7-CIE-OA02": {
    libro: "Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)",
    unidad: 'Unidad 1: "Sexualidad y autocuidado"',
    leccion: 'Lección 2: "Formación de un nuevo individuo"',
    paginas: "Páginas 30 a 45"
  },
  "110-7-HIS-OA02": {
    libro: "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)",
    unidad: 'Unidad 1: "De los primeros humanos a las primeras civilizaciones"',
    leccion: 'Lección 1: "Hominización y revolución neolítica"',
    paginas: "Páginas 12 a 35"
  },
  "110-7-HIS-OA03": {
    libro: "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)",
    unidad: 'Unidad 1: "De los primeros humanos a las primeras civilizaciones"',
    leccion: 'Lección 2: "Estados organizados y primeras civilizaciones"',
    paginas: "Páginas 36 a 55"
  },
  "110-7-LEN-OA03": {
    libro: "Lengua y Literatura 7° Básico (Texto del Estudiante MINEDUC)",
    unidad: 'Unidad 1: "Héroes y heroínas"',
    leccion: 'Lección 1: "El viaje del héroe en la narrativa"',
    paginas: "Páginas 14 a 45"
  },
  "110-7-LEN-OA04": {
    libro: "Lengua y Literatura 7° Básico (Texto del Estudiante MINEDUC)",
    unidad: 'Unidad 2: "Voces de la poesía"',
    leccion: 'Lección 1: "Lenguaje figurado en la poesía"',
    paginas: "Páginas 60 a 85"
  },
  "110-7-ING-OA09": {
    libro: "English 7th Grade (Student's Book MINEDUC)",
    unidad: 'Unit 1: "People and Places"',
    leccion: 'Lesson 1: "Reading literary stories"',
    paginas: "Páginas 8 a 23"
  },
  "110-7-ING-OA10": {
    libro: "English 7th Grade (Student's Book MINEDUC)",
    unidad: 'Unit 2: "Communication and Technology"',
    leccion: 'Lesson 1: "Non-literary texts and articles"',
    paginas: "Páginas 30 a 47"
  }
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState("admin@estudiosimple.cl");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const [catalog, setCatalog] = useState<OACatalogItem[]>([]);
  const [selectedSubject, setSelectedSubject] = useState("Matemática");
  const [selectedOAId, setSelectedOAId] = useState("110-7-MAT-OA01");
  const [customLessonCount, setCustomLessonCount] = useState<number | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generatedSuccess, setGeneratedSuccess] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Verificar autenticación previa
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("estudiosimple_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Cargar catálogo de OAs
  useEffect(() => {
    async function loadCatalog() {
      try {
        const res = await fetch("/data/curriculum_catalog.json");
        if (res.ok) {
          const data: OACatalogItem[] = await res.json();
          setCatalog(data);
        }
      } catch (err) {
        console.error("Error al cargar catálogo curricular:", err);
      }
    }
    loadCatalog();
  }, []);

  const subjects = useMemo(() => {
    if (!catalog.length) return ["Matemática", "Ciencias Naturales", "Historia, Geografía y Ciencias Sociales", "Lengua y Literatura", "Inglés"];
    return Array.from(new Set(catalog.map((c) => c.asignatura)));
  }, [catalog]);

  const availableOAs = useMemo(() => {
    return catalog.filter((c) => c.asignatura === selectedSubject);
  }, [catalog, selectedSubject]);

  const currentOA = useMemo(() => {
    return catalog.find((c) => c.id === selectedOAId) || availableOAs[0] || null;
  }, [catalog, selectedOAId, availableOAs]);

  const currentBookRef = useMemo(() => {
    if (!currentOA) return null;
    return TEXTBOOK_MAPPINGS[currentOA.id] || {
      libro: `${currentOA.asignatura} 7° Básico (Texto Oficial MINEDUC)`,
      unidad: `Unidad Oficial`,
      leccion: `Objetivo ${currentOA.oa}`,
      paginas: "Texto del Estudiante"
    };
  }, [currentOA]);

  const totalLessons = customLessonCount || (currentOA ? currentOA.leccionesSugeridas : 5);

  const currentPackage: GeneratedOAPackage | null = useMemo(() => {
    if (!currentOA) return null;
    return generateOAPackage(currentOA, totalLessons);
  }, [currentOA, totalLessons]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Clave de administrador (soporta admin o admin123)
    if (passwordInput === "admin" || passwordInput === "admin123" || passwordInput === "estudiosimple") {
      setIsAuthenticated(true);
      sessionStorage.setItem("estudiosimple_admin_auth", "true");
      setLoginError("");
    } else {
      setLoginError("Contraseña incorrecta. Intenta nuevamente.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("estudiosimple_admin_auth");
    setPasswordInput("");
  };

  const handleSubjectChange = (subj: string) => {
    setSelectedSubject(subj);
    const first = catalog.find((c) => c.asignatura === subj);
    if (first) {
      setSelectedOAId(first.id);
      setCustomLessonCount(first.leccionesSugeridas);
    }
    setGeneratedSuccess(false);
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentPackage) return;
    setGenerating(true);
    setGeneratedSuccess(false);

    try {
      // Simular procesamiento y descargar DOCX
      await new Promise((r) => setTimeout(r, 600));
      const blob = await exportOAPackageToDocx(currentPackage);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Plan_Maestro_${currentPackage.oa.id}_${currentPackage.totalLessons}Lecciones.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setGeneratedSuccess(true);
    } catch (err) {
      console.error("Error al generar:", err);
      alert("Error al generar el Plan Maestro.");
    } finally {
      setGenerating(false);
    }
  };

  const handleCopyPrompts = async () => {
    if (!currentPackage) return;
    let allPrompts = `# Prompts ChatGPT Work: ${currentPackage.oa.asignatura} - ${currentPackage.oa.oa}\n\n`;
    currentPackage.lessons.forEach((l) => {
      allPrompts += `## Clase ${l.num}: ${l.title}\n\n`;
      allPrompts += `### Paso 2: Video Motivacional (7 Slides)\n${l.paso2_hook.fullPrompt}\n\n`;
      allPrompts += `### Paso 4: Video Explicativo (7 Slides)\n${l.paso4_explicativo.fullPrompt}\n\n`;
    });
    await navigator.clipboard.writeText(allPrompts);
    setCopiedKey("prompts");
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleCopyJson = async () => {
    if (!currentPackage) return;
    await navigator.clipboard.writeText(JSON.stringify(currentPackage, null, 2));
    setCopiedKey("json");
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // ================= PANTALLA 1: LOGIN DE ADMINISTRADOR =================
  if (!isAuthenticated) {
    return (
      <div className="admin-page-wrap" style={{ justifyContent: "center", alignItems: "center" }}>
        <div className="admin-login-box">
          <img src="/logo-estudiosimple.png" alt="EstudioSimple" />
          <h1 style={{ color: "white", fontSize: "22px", margin: "10px 0 6px" }}>Portal de Administración</h1>
          <p style={{ color: "#94a3b8", fontSize: "13px", margin: "0 0 24px", lineHeight: 1.45 }}>
            Ingresa con tu clave de administrador para acceder al Generador de Planes Maestros.
          </p>

          {loginError && <div className="admin-alert-error">{loginError}</div>}

          <form onSubmit={handleLogin} style={{ textAlign: "left" }}>
            <div className="admin-form-group">
              <label className="admin-label">Usuario / Correo:</label>
              <input
                type="text"
                className="admin-input"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Contraseña:</label>
              <input
                type="password"
                className="admin-input"
                placeholder="Ingresa tu contraseña"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoFocus
                required
              />
            </div>
            <button type="submit" className="admin-btn-primary" style={{ marginTop: "12px" }}>
              <KeyRound style={{ width: "16px", height: "16px" }} />
              Iniciar Sesión
            </button>
          </form>

          <div style={{ marginTop: "24px", paddingTop: "18px", borderTop: "1px solid #334155" }}>
            <a href="/" style={{ color: "#14b8a6", fontSize: "12px", textDecoration: "none", fontWeight: 700 }}>
              ← Volver a la Landing / Portal de Clases
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ================= PANTALLA 2: CONSOLA GENERADORA EJECUTIVA =================
  return (
    <div className="admin-page-wrap">
      {/* Barra Superior */}
      <header className="admin-nav">
        <div className="admin-brand">
          <img src="/logo-estudiosimple.png" alt="EstudioSimple" />
          <span>ADMINISTRACIÓN CURRICULAR</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <a
            href="/"
            style={{
              color: "#94a3b8",
              fontSize: "12px",
              textDecoration: "none",
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid #334155"
            }}
          >
            ← Volver a la Landing / Clases
          </a>
          <span style={{ fontSize: "12px", color: "#64748b" }}>admin@estudiosimple.cl</span>
          <button className="admin-logout-btn" onClick={handleLogout} title="Cerrar sesión">
            <LogOut style={{ width: "13px", height: "13px", display: "inline", marginRight: "4px" }} />
            Salir
          </button>
        </div>
      </header>

      {/* Contenedor Principal */}
      <main className="admin-body-container">
        <div className="admin-card">
          <h1 className="admin-title">Generador de Planes Maestros por OA</h1>
          <p className="admin-subtitle">
            Selecciona la asignatura y el objetivo curricular. El sistema compilará automáticamente las lecciones, los guiones para ChatGPT Work y Google Vids (7 slides de gancho y 7 de explicación) y las referencias al Texto Escolar oficial del MINEDUC.
          </p>

          <form onSubmit={handleGenerate}>
            {/* 1. Selector de Asignatura */}
            <div className="admin-form-group">
              <label className="admin-label">1. Selecciona la Asignatura (7° Básico):</label>
              <select
                className="admin-select"
                value={selectedSubject}
                onChange={(e) => handleSubjectChange(e.target.value)}
              >
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Selector de Objetivo de Aprendizaje */}
            <div className="admin-form-group">
              <label className="admin-label">2. Selecciona el Objetivo de Aprendizaje (OA):</label>
              <select
                className="admin-select"
                value={selectedOAId}
                onChange={(e) => {
                  setSelectedOAId(e.target.value);
                  const found = catalog.find((c) => c.id === e.target.value);
                  if (found) setCustomLessonCount(found.leccionesSugeridas);
                  setGeneratedSuccess(false);
                }}
              >
                {availableOAs.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.oa} {item.isPriorityDemo ? `[TEMARIO EELL #${item.temarioPosicion}]` : ""} : {item.descripcion.slice(0, 85)}...
                  </option>
                ))}
              </select>
            </div>

            {/* Ficha de Referencia al Texto Escolar (de la carpeta MATERIALES/110-7) */}
            {currentBookRef && currentOA && (
              <div className="admin-book-card">
                <BookOpen style={{ width: "24px", height: "24px", color: "#2dd4bf", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <b>Referencia al Texto Escolar Oficial (MINEDUC):</b>
                  <p>
                    <strong>Libro:</strong> {currentBookRef.libro}<br />
                    <strong>Ubicación:</strong> {currentBookRef.unidad} · {currentBookRef.leccion} ({currentBookRef.paginas})<br />
                    <strong>Dosificación didáctica:</strong> {totalLessons} clases de 30 minutos ({currentOA.justificacionLecciones})
                  </p>
                </div>
              </div>
            )}

            {/* Botón Principal de Acción (Enter) */}
            <button
              type="submit"
              className="admin-btn-primary"
              disabled={generating || !currentPackage}
            >
              {generating ? (
                <>
                  <Sparkles style={{ width: "18px", height: "18px", animation: "spin 1s linear infinite" }} />
                  <span>Compilando Plan Maestro y Guiones...</span>
                </>
              ) : (
                <>
                  <Download style={{ width: "18px", height: "18px" }} />
                  <span>Generar y Descargar Plan Maestro (.docx) (Presiona Enter)</span>
                </>
              )}
            </button>
          </form>

          {/* Tarjeta de Confirmación tras Generar */}
          {generatedSuccess && currentPackage && (
            <div
              style={{
                marginTop: "28px",
                padding: "24px",
                borderRadius: "16px",
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                display: "flex",
                flexDirection: "column",
                gap: "14px"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#34d399", fontWeight: 800 }}>
                <Check style={{ width: "20px", height: "20px" }} />
                <span>¡Plan Maestro generado y descargado exitosamente!</span>
              </div>
              <p style={{ margin: 0, color: "#cbd5e1", fontSize: "13px", lineHeight: 1.45 }}>
                El archivo <strong>Plan_Maestro_{currentPackage.oa.id}_{currentPackage.totalLessons}Lecciones.docx</strong> ya se encuentra en tus descargas, completo con la portada institucional, referencias del texto escolar, guiones audiovisuales de 7 slides para Paso 2 y Paso 4, y los ejercicios formativos.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "6px" }}>
                <button
                  type="button"
                  onClick={() => handleGenerate()}
                  className="admin-logout-btn"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "white", borderColor: "#10b981" }}
                >
                  <Download style={{ width: "13px", height: "13px" }} />
                  Descargar nuevamente
                </button>
                <button
                  type="button"
                  onClick={handleCopyPrompts}
                  className="admin-logout-btn"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "white" }}
                >
                  <Copy style={{ width: "13px", height: "13px" }} />
                  {copiedKey === "prompts" ? "¡Prompts Copiados!" : "Copiar Prompts ChatGPT Work"}
                </button>
                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="admin-logout-btn"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "white" }}
                >
                  <Code style={{ width: "13px", height: "13px" }} />
                  {copiedKey === "json" ? "¡JSON Copiado!" : "Copiar JSON para App"}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
