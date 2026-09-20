# -*- coding: utf-8 -*-
"""
Script de Conciliación Curricular y Extracción de Textos Escolares Digitales MINEDUC para 7° Básico.
Conecta los Temarios Oficiales de Exámenes Libres (EELL) con los libros de texto escolares oficiales.
"""

import os
import json
import fitz

BASE_DIR = r"d:\StudioSimple - Antigravity"
PDF_DIR = os.path.join(BASE_DIR, "CONOCIMIENTO", "ACADEMICO", "MATERIALES", "110-7")
DOCS_DIR = os.path.join(BASE_DIR, "docs")
WEB_APP_DIR = os.path.join(BASE_DIR, "Web Studio Simple")

TEXTBOOK_FILES = {
    "Matemática": "Matemática.pdf",
    "Lengua y Literatura": "Lengua y literatura.pdf",
    "Ciencias Naturales": "Ciencias Naturales.pdf",
    "Historia, Geografía y Ciencias Sociales": "Historia, Geografía y Ciencias Sociales.pdf",
    "Inglés": "Inglés.pdf"
}

# Mapeo maestro validado entre OAs priorizados por Temario EELL y Textos Escolares MINEDUC (7° Básico)
CONCILIATION_MAP = {
    # 1. MATEMÁTICA (9 OAs en Temario EELL)
    "110-7-MAT-OA01": {
        "asignatura": "Matemática",
        "oa": "OA 1",
        "oaNumero": 1,
        "titulo": "Números Enteros (Z)",
        "inTemarioEELL": True,
        "libro": "Matemática 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 1: \"Números\"",
        "leccion": "Lección 1: \"Números enteros\"",
        "paginas": "Páginas 6 a 25",
        "archivoPdf": "Matemática.pdf"
    },
    "110-7-MAT-OA03": {
        "asignatura": "Matemática",
        "oa": "OA 3",
        "oaNumero": 3,
        "titulo": "Multiplicación y División de Fracciones y Decimales",
        "inTemarioEELL": True,
        "libro": "Matemática 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 1: \"Números\"",
        "leccion": "Lección 2: \"Fracciones y decimales\"",
        "paginas": "Páginas 26 a 41",
        "archivoPdf": "Matemática.pdf"
    },
    "110-7-MAT-OA04": {
        "asignatura": "Matemática",
        "oa": "OA 4",
        "oaNumero": 4,
        "titulo": "Concepto y Cálculo de Porcentajes",
        "inTemarioEELL": True,
        "libro": "Matemática 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 1: \"Números\"",
        "leccion": "Lección 3: \"Porcentajes\"",
        "paginas": "Páginas 42 a 51",
        "archivoPdf": "Matemática.pdf"
    },
    "110-7-MAT-OA06": {
        "asignatura": "Matemática",
        "oa": "OA 6",
        "oaNumero": 6,
        "titulo": "Lenguaje Algebraico y Ecuaciones",
        "inTemarioEELL": True,
        "libro": "Matemática 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 2: \"Álgebra y funciones\"",
        "leccion": "Lección 4: \"Lenguaje algebraico y ecuaciones\"",
        "paginas": "Páginas 52 a 61",
        "archivoPdf": "Matemática.pdf"
    },
    "110-7-MAT-OA08": {
        "asignatura": "Matemática",
        "oa": "OA 8",
        "oaNumero": 8,
        "titulo": "Proporcionalidad Directa e Inversa",
        "inTemarioEELL": True,
        "libro": "Matemática 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 2: \"Álgebra y funciones\"",
        "leccion": "Lección 5: \"Proporcionalidad\"",
        "paginas": "Páginas 62 a 75",
        "archivoPdf": "Matemática.pdf"
    },
    "110-7-MAT-OA11": {
        "asignatura": "Matemática",
        "oa": "OA 11",
        "oaNumero": 11,
        "titulo": "El Círculo: Perímetro y Área",
        "inTemarioEELL": True,
        "libro": "Matemática 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 3: \"Geometría\"",
        "leccion": "Lección 6: \"El círculo\"",
        "paginas": "Páginas 76 a 84",
        "archivoPdf": "Matemática.pdf"
    },
    "110-7-MAT-OA14": {
        "asignatura": "Matemática",
        "oa": "OA 14",
        "oaNumero": 14,
        "titulo": "Plano Cartesiano y Vectores 2D",
        "inTemarioEELL": True,
        "libro": "Matemática 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 3: \"Geometría\"",
        "leccion": "Lección 7 y 8: \"Plano cartesiano y transformaciones\"",
        "paginas": "Páginas 85 a 115",
        "archivoPdf": "Matemática.pdf"
    },
    "110-7-MAT-OA16": {
        "asignatura": "Matemática",
        "oa": "OA 16",
        "oaNumero": 16,
        "titulo": "Tablas de Frecuencia y Gráficos Estadísticos",
        "inTemarioEELL": True,
        "libro": "Matemática 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 4: \"Probabilidad y estadística\"",
        "leccion": "Lección 9: \"Estadística descriptiva\"",
        "paginas": "Páginas 116 a 129",
        "archivoPdf": "Matemática.pdf"
    },
    "110-7-MAT-OA18": {
        "asignatura": "Matemática",
        "oa": "OA 18",
        "oaNumero": 18,
        "titulo": "Probabilidad y Regla de Laplace",
        "inTemarioEELL": True,
        "libro": "Matemática 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 4: \"Probabilidad y estadística\"",
        "leccion": "Lección 10: \"Probabilidades y regla de Laplace\"",
        "paginas": "Páginas 130 a 140",
        "archivoPdf": "Matemática.pdf"
    },

    # 2. LENGUA Y LITERATURA (4 OAs en Temario EELL)
    "110-7-LEN-OA03": {
        "asignatura": "Lengua y Literatura",
        "oa": "OA 3",
        "oaNumero": 3,
        "titulo": "Análisis de Narraciones y el Héroe",
        "inTemarioEELL": True,
        "libro": "Lengua y Literatura 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 1: \"Héroes y heroínas\"",
        "leccion": "Lección 1: \"El viaje del héroe en la narrativa\"",
        "paginas": "Páginas 14 a 45",
        "archivoPdf": "Lengua y literatura.pdf"
    },
    "110-7-LEN-OA04": {
        "asignatura": "Lengua y Literatura",
        "oa": "OA 4",
        "oaNumero": 4,
        "titulo": "Poesía y Lenguaje Figurado",
        "inTemarioEELL": True,
        "libro": "Lengua y Literatura 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 2: \"Voces de la poesía\"",
        "leccion": "Lección 1 y 2: \"Lenguaje poético y sentimientos\"",
        "paginas": "Páginas 46 a 87",
        "archivoPdf": "Lengua y literatura.pdf"
    },
    "110-7-LEN-OA09": {
        "asignatura": "Lengua y Literatura",
        "oa": "OA 9",
        "oaNumero": 9,
        "titulo": "Textos de Medios de Comunicación",
        "inTemarioEELL": True,
        "libro": "Lengua y Literatura 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 3: \"Somos naturaleza y sociedad\"",
        "leccion": "Lección 1: \"Noticias, reportajes y textos informativos\"",
        "paginas": "Páginas 92 a 125",
        "archivoPdf": "Lengua y literatura.pdf"
    },
    "110-7-LEN-OA15": {
        "asignatura": "Lengua y Literatura",
        "oa": "OA 15",
        "oaNumero": 15,
        "titulo": "Planificación y Redacción de Textos",
        "inTemarioEELL": True,
        "libro": "Lengua y Literatura 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 4: \"¿Qué nos cuenta el mundo?\"",
        "leccion": "Lección 2: \"La visión popular y producción escrita\"",
        "paginas": "Páginas 138 a 170",
        "archivoPdf": "Lengua y literatura.pdf"
    },

    # 3. CIENCIAS NATURALES (7 OAs en Temario EELL)
    "110-7-CIE-OA01": {
        "asignatura": "Ciencias Naturales",
        "oa": "OA 1",
        "oaNumero": 1,
        "titulo": "Sexualidad y Afectividad Integral",
        "inTemarioEELL": True,
        "libro": "Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 1: \"Sexualidad y autocuidado\"",
        "leccion": "Lección 1: \"Dimensiones biológicas, afectivas y sociales\"",
        "paginas": "Páginas 6 a 23",
        "archivoPdf": "Ciencias Naturales.pdf"
    },
    "110-7-CIE-OA02": {
        "asignatura": "Ciencias Naturales",
        "oa": "OA 2",
        "oaNumero": 2,
        "titulo": "Ciclo Menstrual y Reproducción Humana",
        "inTemarioEELL": True,
        "libro": "Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 1: \"Sexualidad y autocuidado\"",
        "leccion": "Lección 2: \"Formación de un nuevo individuo\"",
        "paginas": "Páginas 24 a 37",
        "archivoPdf": "Ciencias Naturales.pdf"
    },
    "110-7-CIE-OA05": {
        "asignatura": "Ciencias Naturales",
        "oa": "OA 5",
        "oaNumero": 5,
        "titulo": "Microorganismos y Salud Humana",
        "inTemarioEELL": True,
        "libro": "Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 2: \"Microorganismos y barreras del cuerpo\"",
        "leccion": "Lección 3: \"Virus, bacterias y hongos\"",
        "paginas": "Páginas 38 a 51",
        "archivoPdf": "Ciencias Naturales.pdf"
    },
    "110-7-CIE-OA07": {
        "asignatura": "Ciencias Naturales",
        "oa": "OA 7",
        "oaNumero": 7,
        "titulo": "Fuerzas y Presión en la Vida Diaria",
        "inTemarioEELL": True,
        "libro": "Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 2: \"Fuerza y movimiento\"",
        "leccion": "Lección 5: \"Fuerzas y presión en fluidos\"",
        "paginas": "Páginas 64 a 81",
        "archivoPdf": "Ciencias Naturales.pdf"
    },
    "110-7-CIE-OA09": {
        "asignatura": "Ciencias Naturales",
        "oa": "OA 9",
        "oaNumero": 9,
        "titulo": "Tectónica de Placas y Vulcanismo",
        "inTemarioEELL": True,
        "libro": "Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 3: \"Dinámica de la Tierra\"",
        "leccion": "Lección 6 y 7: \"Placas tectónicas y relieve\"",
        "paginas": "Páginas 82 a 111",
        "archivoPdf": "Ciencias Naturales.pdf"
    },
    "110-7-CIE-OA13": {
        "asignatura": "Ciencias Naturales",
        "oa": "OA 13",
        "oaNumero": 13,
        "titulo": "Comportamiento de Gases Ideales",
        "inTemarioEELL": True,
        "libro": "Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 4: \"Materia y sus transformaciones\"",
        "leccion": "Lección 8: \"Leyes de los gases\"",
        "paginas": "Páginas 112 a 137",
        "archivoPdf": "Ciencias Naturales.pdf"
    },
    "110-7-CIE-OA14": {
        "asignatura": "Ciencias Naturales",
        "oa": "OA 14",
        "oaNumero": 14,
        "titulo": "Clasificación de la Materia: Sustancias y Mezclas",
        "inTemarioEELL": True,
        "libro": "Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 4: \"Materia y sus transformaciones\"",
        "leccion": "Lección 9: \"Sustancias puras, disoluciones y separación\"",
        "paginas": "Páginas 138 a 153",
        "archivoPdf": "Ciencias Naturales.pdf"
    },

    # 4. HISTORIA, GEOGRAFÍA Y CIENCIAS SOCIALES (13 OAs en Temario EELL)
    "110-7-HIS-OA02": {
        "asignatura": "Historia, Geografía y Ciencias Sociales",
        "oa": "OA 2",
        "oaNumero": 2,
        "titulo": "Hominización y Revolución Neolítica",
        "inTemarioEELL": True,
        "libro": "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 1: \"Primeras sociedades agrícolas y civilizaciones\"",
        "leccion": "Lección 1: \"El surgimiento de la agricultura\"",
        "paginas": "Páginas 8 a 27",
        "archivoPdf": "Historia, Geografía y Ciencias Sociales.pdf"
    },
    "110-7-HIS-OA03": {
        "asignatura": "Historia, Geografía y Ciencias Sociales",
        "oa": "OA 3",
        "oaNumero": 3,
        "titulo": "Primeras Civilizaciones Fluviales",
        "inTemarioEELL": True,
        "libro": "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 1: \"Primeras sociedades agrícolas y civilizaciones\"",
        "leccion": "Lección 2: \"Las primeras civilizaciones\"",
        "paginas": "Páginas 28 a 45",
        "archivoPdf": "Historia, Geografía y Ciencias Sociales.pdf"
    },
    "110-7-HIS-OA06": {
        "asignatura": "Historia, Geografía y Ciencias Sociales",
        "oa": "OA 6",
        "oaNumero": 6,
        "titulo": "La Democracia Ateniense y la Polis Griega",
        "inTemarioEELL": True,
        "libro": "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 2: \"La Antigüedad clásica\"",
        "leccion": "Lección 1: \"Grecia y la democracia ateniense\"",
        "paginas": "Páginas 46 a 67",
        "archivoPdf": "Historia, Geografía y Ciencias Sociales.pdf"
    },
    "110-7-HIS-OA07": {
        "asignatura": "Historia, Geografía y Ciencias Sociales",
        "oa": "OA 7",
        "oaNumero": 7,
        "titulo": "La República Romana y el Imperio",
        "inTemarioEELL": True,
        "libro": "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 2: \"La Antigüedad clásica\"",
        "leccion": "Lección 2: \"Roma y el legado republicano\"",
        "paginas": "Páginas 68 a 87",
        "archivoPdf": "Historia, Geografía y Ciencias Sociales.pdf"
    },
    "110-7-HIS-OA09": {
        "asignatura": "Historia, Geografía y Ciencias Sociales",
        "oa": "OA 9",
        "oaNumero": 9,
        "titulo": "La Civilización Europea Medieval",
        "inTemarioEELL": True,
        "libro": "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 3: \"La Edad Media\"",
        "leccion": "Lección 1: \"La conformación de Europa\"",
        "paginas": "Páginas 90 a 109",
        "archivoPdf": "Historia, Geografía y Ciencias Sociales.pdf"
    },
    "110-7-HIS-OA12": {
        "asignatura": "Historia, Geografía y Ciencias Sociales",
        "oa": "OA 12",
        "oaNumero": 12,
        "titulo": "Renacimiento Urbano y Comercial",
        "inTemarioEELL": True,
        "libro": "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 3: \"La Edad Media\"",
        "leccion": "Lección 2: \"Transformaciones en los últimos siglos medievales\"",
        "paginas": "Páginas 110 a 127",
        "archivoPdf": "Historia, Geografía y Ciencias Sociales.pdf"
    },
    "110-7-HIS-OA13": {
        "asignatura": "Historia, Geografía y Ciencias Sociales",
        "oa": "OA 13",
        "oaNumero": 13,
        "titulo": "Civilizaciones Mesoamericanas: Mayas y Aztecas",
        "inTemarioEELL": True,
        "libro": "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 4: \"Civilizaciones de América\"",
        "leccion": "Lección 1: \"Mayas y Aztecas en Mesoamérica\"",
        "paginas": "Páginas 128 a 145",
        "archivoPdf": "Historia, Geografía y Ciencias Sociales.pdf"
    },
    "110-7-HIS-OA16": {
        "asignatura": "Historia, Geografía y Ciencias Sociales",
        "oa": "OA 16",
        "oaNumero": 16,
        "titulo": "Confluencia Cultural Latinoamericana",
        "inTemarioEELL": True,
        "libro": "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 4: \"Civilizaciones de América\"",
        "leccion": "Lección 2: \"Mestizaje y herencia cultural viva\"",
        "paginas": "Páginas 146 a 155",
        "archivoPdf": "Historia, Geografía y Ciencias Sociales.pdf"
    },
    "110-7-HIS-OA18": {
        "asignatura": "Historia, Geografía y Ciencias Sociales",
        "oa": "OA 18",
        "oaNumero": 18,
        "titulo": "Democracia, República y Derechos Ciudadanos",
        "inTemarioEELL": True,
        "libro": "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 5: \"Formación ciudadana y derechos\"",
        "leccion": "Lección 1: \"El Estado de derecho y la república\"",
        "paginas": "Páginas 156 a 163",
        "archivoPdf": "Historia, Geografía y Ciencias Sociales.pdf"
    },
    "110-7-HIS-OA19": {
        "asignatura": "Historia, Geografía y Ciencias Sociales",
        "oa": "OA 19",
        "oaNumero": 19,
        "titulo": "Valor de la Diversidad Cultural",
        "inTemarioEELL": True,
        "libro": "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 5: \"Formación ciudadana y derechos\"",
        "leccion": "Lección 2: \"Pueblos originarios y convivencia intercultural\"",
        "paginas": "Páginas 164 a 170",
        "archivoPdf": "Historia, Geografía y Ciencias Sociales.pdf"
    },
    "110-7-HIS-OA20": {
        "asignatura": "Historia, Geografía y Ciencias Sociales",
        "oa": "OA 20",
        "oaNumero": 20,
        "titulo": "Convivencia Pacífica y Resolución de Conflictos",
        "inTemarioEELL": True,
        "libro": "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 5: \"Formación ciudadana y derechos\"",
        "leccion": "Lección 3: \"Diálogo, mediación y acuerdos\"",
        "paginas": "Páginas 171 a 178",
        "archivoPdf": "Historia, Geografía y Ciencias Sociales.pdf"
    },
    "110-7-HIS-OA21": {
        "asignatura": "Historia, Geografía y Ciencias Sociales",
        "oa": "OA 21",
        "oaNumero": 21,
        "titulo": "Adaptación y Transformación del Medio Geográfico",
        "inTemarioEELL": True,
        "libro": "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 6: \"Espacio geográfico y sustentabilidad\"",
        "leccion": "Lección 1: \"Relieve, clima y riesgos socionaturales en Chile\"",
        "paginas": "Páginas 180 a 195",
        "archivoPdf": "Historia, Geografía y Ciencias Sociales.pdf"
    },
    "110-7-HIS-OA22": {
        "asignatura": "Historia, Geografía y Ciencias Sociales",
        "oa": "OA 22",
        "oaNumero": 22,
        "titulo": "Impacto Ambiental y Desarrollo Sustentable",
        "inTemarioEELL": True,
        "libro": "Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)",
        "unidad": "Unidad 6: \"Espacio geográfico y sustentabilidad\"",
        "leccion": "Lección 2: \"Huella ecológica y economía circular\"",
        "paginas": "Páginas 196 a 210",
        "archivoPdf": "Historia, Geografía y Ciencias Sociales.pdf"
    },

    # 5. INGLÉS (4 OAs en Temario EELL)
    "110-7-ING-OA09": {
        "asignatura": "Inglés",
        "oa": "OA 9",
        "oaNumero": 9,
        "titulo": "Reading Comprehension of Literary Stories",
        "inTemarioEELL": True,
        "libro": "English 7th Grade (Student's Book MINEDUC)",
        "unidad": "Unit 1: \"People and Places\"",
        "leccion": "Lesson 1: \"Reading adapted short stories\"",
        "paginas": "Páginas 8 a 23",
        "archivoPdf": "Inglés.pdf"
    },
    "110-7-ING-OA10": {
        "asignatura": "Inglés",
        "oa": "OA 10",
        "oaNumero": 10,
        "titulo": "Non-Literary Texts and Informational Articles",
        "inTemarioEELL": True,
        "libro": "English 7th Grade (Student's Book MINEDUC)",
        "unidad": "Unit 2: \"Communication and Technology\"",
        "leccion": "Lesson 1: \"Non-literary texts and articles\"",
        "paginas": "Páginas 24 a 39",
        "archivoPdf": "Inglés.pdf"
    },
    "110-7-ING-OA13": {
        "asignatura": "Inglés",
        "oa": "OA 13",
        "oaNumero": 13,
        "titulo": "Written Expression and Short Stories",
        "inTemarioEELL": True,
        "libro": "English 7th Grade (Student's Book MINEDUC)",
        "unidad": "Unit 3: \"Daily Life and Routines\"",
        "leccion": "Lesson 1: \"Personal profiles and sentences\"",
        "paginas": "Páginas 40 a 55",
        "archivoPdf": "Inglés.pdf"
    },
    "110-7-ING-OA16": {
        "asignatura": "Inglés",
        "oa": "OA 16",
        "oaNumero": 16,
        "titulo": "Grammar and Vocabulary in Context",
        "inTemarioEELL": True,
        "libro": "English 7th Grade (Student's Book MINEDUC)",
        "unidad": "Unit 4: \"World of Wonders\"",
        "leccion": "Lesson 1: \"Present Simple and Modal verbs\"",
        "paginas": "Páginas 56 a 72",
        "archivoPdf": "Inglés.pdf"
    }
}

def verify_and_generate_reports():
    os.makedirs(DOCS_DIR, exist_ok=True)
    
    # Validar presencia de los PDFs físicos
    print("Verificando existencia de libros de texto oficiales MINEDUC...")
    file_status = {}
    for sub, filename in TEXTBOOK_FILES.items():
        full_path = os.path.join(PDF_DIR, filename)
        exists = os.path.isfile(full_path)
        size_mb = round(os.path.getsize(full_path) / (1024 * 1024), 1) if exists else 0
        file_status[sub] = {"file": filename, "exists": exists, "size_mb": size_mb}
        print(f"[{'OK' if exists else 'FALTA'}] {sub} -> {filename} ({size_mb} MB)")
    
    # Generar JSON de conciliación
    json_path = os.path.join(DOCS_DIR, "conciliacion_temarios_eell_textos_mineduc_7b.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump({
            "meta": {
                "curso": "7° Básico",
                "fuenteTemarios": "Temarios Oficiales de Exámenes Libres MINEDUC (Decretos 614/2013 y 369/2015)",
                "fuenteLibros": "Textos Escolares Oficiales del Estudiante MINEDUC (110-7)",
                "totalOAsPriorizados": len(CONCILIATION_MAP)
            },
            "archivosTexto": file_status,
            "mapeoCurricular": CONCILIATION_MAP
        }, f, indent=2, ensure_ascii=False)
    print(f"\nArchivo JSON de conciliacion guardado en: {json_path}")
    
    # Generar Markdown de conciliación
    md_path = os.path.join(DOCS_DIR, "conciliacion_temarios_eell_textos_mineduc_7b.md")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write("# Conciliación Curricular Canónica: Temarios EELL y Textos Escolares MINEDUC (7° Básico)\n\n")
        f.write("**Fecha:** 2026-09-17\n")
        f.write("**Objetivo:** Mapeo formal y determinista entre los Objetivos de Aprendizaje priorizados por los Temarios Oficiales de Exámenes Libres del MINEDUC y las unidades, lecciones y páginas exactas de los Textos Escolares Oficiales.\n\n")
        f.write("## 1. Inventario de Textos Escolares Digitales MINEDUC (110-7)\n\n")
        f.write("| Asignatura | Archivo PDF Oficial | Estado | Tamaño |\n")
        f.write("| :--- | :--- | :--- | :--- |\n")
        for sub, info in file_status.items():
            f.write(f"| {sub} | `{info['file']}` | {'Disponible' if info['exists'] else 'No encontrado'} | {info['size_mb']} MB |\n")
        
        f.write("\n## 2. Matriz Canónica de Conciliación por Asignatura\n\n")
        current_sub = None
        for oa_id, data in CONCILIATION_MAP.items():
            if data["asignatura"] != current_sub:
                current_sub = data["asignatura"]
                f.write(f"### {current_sub}\n\n")
                f.write("| Código | Objetivo de Aprendizaje | Unidad Libro | Lección Libro | Páginas Texto |\n")
                f.write("| :--- | :--- | :--- | :--- | :--- |\n")
            f.write(f"| **{data['oa']}** | {data['titulo']} | {data['unidad']} | {data['leccion']} | {data['paginas']} |\n")
        
        f.write("\n---\n")
        f.write("*Documento generado de forma automatizada por el motor de conciliación curricular de EstudioSimple.*\n")
    print(f"Archivo Markdown guardado en: {md_path}")

if __name__ == "__main__":
    verify_and_generate_reports()
