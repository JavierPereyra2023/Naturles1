"""Genera el audio del cartel/poster de la neurona con edge-tts."""
import asyncio
import edge_tts
from pathlib import Path

# Texto didactico para 1ro de secundaria, en castellano argentino.
# Calibrado a ~30 segundos hablado a +18% (sweet spot de Javier).
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
OUT = Path("assets/biologia/celulas/neurona-poster.mp3")


async def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    communicate = edge_tts.Communicate(TEXTO, VOZ, rate=RATE)
    await communicate.save(str(OUT))
    size = OUT.stat().st_size
    print(f"OK -> {OUT}  ({size/1024:.1f} KB)")


if __name__ == "__main__":
    asyncio.run(main())
