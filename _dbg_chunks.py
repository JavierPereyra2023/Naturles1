"""Debug: ver que tipo de chunks emite edge-tts."""
import asyncio
import edge_tts
from pathlib import Path

TEXTO = "La neurona es la celula que te permite pensar."

VOZ = "es-AR-TomasNeural"
RATE = "+18%"

async def main():
    communicate = edge_tts.Communicate(TEXTO, VOZ, rate=RATE)
    types = {}
    n = 0
    async for chunk in communicate.stream():
        n += 1
        t = chunk.get("type")
        types[t] = types.get(t, 0) + 1
        if t == "WordBoundary":
            print(chunk)
        if n < 5:
            print(chunk.keys(), list(chunk.values())[:3] if 'data' not in chunk else f"<audio {len(chunk['data'])} bytes>")
    print("Total chunks:", n, "Types:", types)

asyncio.run(main())
