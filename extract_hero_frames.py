import os
import subprocess

base_dir = os.path.dirname(os.path.abspath(__file__))
video_path = os.path.join(base_dir, "HERO", "HERO NUEVO ESTUDIOSIMPLE.mp4")
output_dir = os.path.join(base_dir, "Web Studio Simple", "public", "hero-frames")

# Clean
for f in os.listdir(output_dir):
    try:
        os.remove(os.path.join(output_dir, f))
    except Exception:
        pass

output_pattern = os.path.join(output_dir, "frame_%04d.webp")
cmd = [
    "ffmpeg",
    "-y",
    "-i", video_path,
    "-vf", "fps=15,scale=1280:720",
    "-c:v", "libwebp",
    "-quality", "80",
    output_pattern
]

print("Extracting WebP frames with ffmpeg...")
res = subprocess.run(cmd, capture_output=True, text=True)
if res.returncode == 0:
    frames = sorted([f for f in os.listdir(output_dir) if f.endswith(".webp")])
    print(f"Extraction successful: {len(frames)} WebP frames extracted!")
    total_size = sum(os.path.getsize(os.path.join(output_dir, f)) for f in frames)
    print(f"Total size: {total_size / (1024 * 1024):.2f} MB")
else:
    print("ffmpeg error:", res.stderr)
