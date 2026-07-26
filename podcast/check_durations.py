import os
from mutagen.mp3 import MP3
audio_dir = r'D:\naturales_1\podcast\audio'
print(f'{"Archivo":30}  {"Duracion"}')
print('-' * 50)
total = 0
for f in sorted(os.listdir(audio_dir)):
    if f.endswith('.mp3'):
        path = os.path.join(audio_dir, f)
        try:
            audio = MP3(path)
            d = audio.info.length
            m = int(d//60)
            s = int(d%60)
            total += d
            print(f'{f:30}  {m}:{s:02d}  ({d:.1f}s)')
        except Exception as e:
            print(f'{f:30}  error: {e}')
print('-' * 50)
print(f'Total: {total/60:.1f} min')
