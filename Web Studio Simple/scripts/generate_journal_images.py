import os
from PIL import Image, ImageDraw, ImageFont

target_dirs = [
    r"d:\StudioSimple - Antigravity\Web Studio Simple\public\images",
    r"E:\CMS\public\images"
]

for d in target_dirs:
    os.makedirs(d, exist_ok=True)

configs = [
    {
        "filename": "journal-mineduc.webp",
        "bg_start": (11, 37, 77),      # #0B254D
        "bg_end": (18, 161, 164),      # #12A1A4
        "accent": (248, 173, 34),      # #F8AD22
        "category": "MINEDUC · OFICIAL",
        "title": "Exámenes Libres 2026",
        "subtitle": "Guía oficial de inscripción, requisitos y fechas"
    },
    {
        "filename": "journal-cuaderno.webp",
        "bg_start": (18, 58, 114),     # #123A72
        "bg_end": (238, 117, 28),      # #EE751C
        "accent": (255, 255, 255),
        "category": "MÉTODO PEDAGÓGICO",
        "title": "Pantalla y Cuaderno",
        "subtitle": "Por qué escribir a mano reduce la fatiga escolar"
    },
    {
        "filename": "journal-neuro.webp",
        "bg_start": (76, 29, 149),     # Purple
        "bg_end": (16, 185, 129),      # Mint
        "accent": (251, 191, 36),
        "category": "NEURODIVERSIDAD · TDAH & TEA",
        "title": "Ritmo Propio y Serenidad",
        "subtitle": "Aprender sin ansiedad frente a la evaluación formal"
    },
    {
        "filename": "journal-default.webp",
        "bg_start": (14, 40, 78),
        "bg_end": (18, 161, 164),
        "accent": (248, 173, 34),
        "category": "ESTUDIOSIMPLE JOURNAL",
        "title": "Educación y Homeschooling",
        "subtitle": "Orientación para familias y tutores de 3° a 8° básico"
    },
    {
        "filename": "cuaderno_muestra_1.webp",
        "bg_start": (20, 50, 90),
        "bg_end": (30, 90, 140),
        "accent": (248, 173, 34),
        "category": "MUESTRA DE CUADERNO REAL",
        "title": "Registro Escolar de Matemática",
        "subtitle": "Resolución paso a paso: Punto de referencia y ascensor"
    },
    {
        "filename": "infografia_celula.webp",
        "bg_start": (12, 74, 96),
        "bg_end": (16, 185, 129),
        "accent": (251, 191, 36),
        "category": "INFOGRAFÍA PEDAGÓGICA",
        "title": "La Célula y sus Organelos",
        "subtitle": "Esquema visual a color para el cuaderno de Ciencias 7° Básico"
    }
]

W, H = 800, 500

for item in configs:
    img = Image.new("RGB", (W, H))
    draw = ImageDraw.Draw(img)
    
    # 1. Gradient
    for y in range(H):
        ratio = y / H
        r = int(item["bg_start"][0] * (1 - ratio) + item["bg_end"][0] * ratio)
        g = int(item["bg_start"][1] * (1 - ratio) + item["bg_end"][1] * ratio)
        b = int(item["bg_start"][2] * (1 - ratio) + item["bg_end"][2] * ratio)
        draw.line([(0, y), (W, y)], fill=(r, g, b))
        
    # 2. Decorative elements (circles, cards)
    draw.ellipse([W - 220, -60, W + 120, 280], fill=(255, 255, 255, 18), outline=item["accent"], width=3)
    draw.ellipse([-80, H - 200, 180, H + 60], fill=(255, 255, 255, 15))
    
    # Card simulation in bottom right
    card_box = [W - 280, H - 190, W - 40, H - 40]
    draw.rounded_rectangle(card_box, radius=20, fill=(255, 255, 255, 220), outline=(255, 255, 255), width=2)
    draw.rounded_rectangle([W - 260, H - 170, W - 180, H - 150], radius=8, fill=item["bg_start"])
    draw.rounded_rectangle([W - 260, H - 130, W - 60, H - 118], radius=6, fill=(200, 210, 225))
    draw.rounded_rectangle([W - 260, H - 105, W - 100, H - 95], radius=5, fill=(220, 225, 235))
    draw.rounded_rectangle([W - 260, H - 85, W - 140, H - 77], radius=4, fill=(230, 235, 240))
    
    # 3. Text rendering using default font
    try:
        font_cat = ImageFont.truetype("arialbd.ttf", 16)
        font_title = ImageFont.truetype("arialbd.ttf", 36)
        font_sub = ImageFont.truetype("arial.ttf", 20)
    except:
        font_cat = ImageFont.load_default()
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        
    # Badge
    badge_x, badge_y = 50, 70
    badge_w, badge_h = 240, 34
    draw.rounded_rectangle([badge_x, badge_y, badge_x + badge_w, badge_y + badge_h], radius=12, fill=item["accent"])
    draw.text((badge_x + 16, badge_y + 8), item["category"], fill=(15, 23, 42), font=font_cat)
    
    # Title & Subtitle
    draw.text((50, 140), item["title"], fill=(255, 255, 255), font=font_title)
    draw.text((50, 205), item["subtitle"], fill=(241, 245, 249), font=font_sub)
    
    # Watermark
    draw.text((50, H - 60), "EstudioSimple · Exámenes Libres", fill=(255, 255, 255, 180), font=font_cat)
    
    for d in target_dirs:
        out_path = os.path.join(d, item["filename"])
        img.save(out_path, "WEBP", quality=92)
        print(f"Generada portada: {out_path}")

print("--- Todas las portadas WebP generadas con éxito ---")
