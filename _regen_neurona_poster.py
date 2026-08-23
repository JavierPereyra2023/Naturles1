"""Regenera el audio del cartel de la neurona + subtitulos para sincronizar cards."""
import asyncio
import edge_tts
from pathlib import Path

TEXTO = (
    "La neurona es la celula que te permite pensar, sentir y moverte. "
    "Es una celula animal, con nucleo y mitocondrias, pero su forma es unica: "
    "tiene un cuerpo central llamado soma, dendritas que parecen ramas de un arbol, "
    "y un axon largo que puede medir mas de un metro. "
    "Las dendritas reciben seniales. El soma las procesa. "
    "Y el axon las lleva hasta otra neurona, envuelto en una sustancia blanca llamada mielina. "
    "La mielina hace que la senial viaje rapidisimo, saltando de un nodulo a otro. "
    "Al final, la neurona libera neurotransmisores, que transmiten el mensaje a la celula siguiente. "
    "Asi, miles de millones de neuronas conectadas forman tu cerebro, "
    "tu medula espinal y los nervios que recorren todo tu cuerpo."
)

VOZ = "es-AR-TomasNeural"
RATE = "+18%"
OUT_MP3 = Path("assets/biologia/celulas/neurona-poster.mp3")
OUT_VTT = Path("assets/biologia/celulas/neurona-poster.vtt")


async def main() -> None:
    OUT_MP3.parent.mkdir(parents=True, exist_ok=True)
    communicate = edge_tts.Communicate(TEXTO, VOZ, rate=RATE, boundary="WordBoundary")
    submaker = edge_tts.SubMaker()
    with open(OUT_MP3, "wb") as f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                submaker.feed(chunk)
    OUT_VTT.write_text(submaker.get_srt() or submaker.get_vtt() or "", encoding="utf-8")
    print(f"OK -> {OUT_MP3} + {OUT_VTT}")


if __name__ == "__main__":
    asyncio.run(main())
