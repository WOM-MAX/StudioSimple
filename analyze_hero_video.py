import os
import subprocess
import json

video_path = os.path.join(os.path.dirname(__file__), "HERO", "HERO NUEVO ESTUDIOSIMPLE.mp4")

print("Checking video path:", video_path)
print("Exists:", os.path.exists(video_path))
if os.path.exists(video_path):
    print("Size in bytes:", os.path.getsize(video_path))

# Check for ffmpeg
try:
    res = subprocess.run(["ffmpeg", "-version"], capture_output=True, text=True)
    print("ffmpeg installed:", res.returncode == 0)
    if res.returncode == 0:
        print("ffmpeg version info:", res.stdout.splitlines()[0])
except Exception as e:
    print("ffmpeg check failed:", str(e))

# Check for opencv or imageio
try:
    import cv2
    print("OpenCV installed, version:", cv2.__version__)
    cap = cv2.VideoCapture(video_path)
    if cap.isOpened():
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fps = cap.get(cv2.CAP_PROP_FPS)
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        duration = total_frames / fps if fps > 0 else 0
        print(f"Video Properties: {width}x{height}, FPS: {fps}, Total Frames: {total_frames}, Duration: {duration:.2f}s")
        cap.release()
except ImportError:
    print("OpenCV not installed in this Python environment.")
except Exception as e:
    print("OpenCV error:", str(e))
