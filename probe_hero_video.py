import os
import subprocess
import json

video_path = os.path.join(os.path.dirname(__file__), "HERO", "HERO NUEVO ESTUDIOSIMPLE.mp4")

cmd = [
    "ffprobe",
    "-v", "quiet",
    "-print_format", "json",
    "-show_format",
    "-show_streams",
    video_path
]

res = subprocess.run(cmd, capture_output=True, text=True)
if res.returncode == 0:
    data = json.loads(res.stdout)
    video_stream = next((s for s in data.get("streams", []) if s.get("codec_type") == "video"), None)
    if video_stream:
        print("Codec:", video_stream.get("codec_name"))
        print("Width:", video_stream.get("width"))
        print("Height:", video_stream.get("height"))
        print("r_frame_rate:", video_stream.get("r_frame_rate"))
        print("avg_frame_rate:", video_stream.get("avg_frame_rate"))
        print("nb_frames:", video_stream.get("nb_frames"))
        print("duration:", video_stream.get("duration"))
    print("Format duration:", data.get("format", {}).get("duration"))
else:
    print("ffprobe error:", res.stderr)
