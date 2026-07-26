import asyncio
import os
import edge_tts

OUT_DIR = r"D:\naturales_1\podcast\audio"
VOICE = "es-AR-TomasNeural"
RATE = "+18%"

EXTENSIONES = {
    "circulacion": """Y antes de cerrar, una recomendación práctica: mantener el corazón sano no requiere grandes cosas. Hacer ejercicio aeróbico regular, como caminar, correr, nadar o andar en bici, fortalece el músculo cardíaco. Comer poca sal y pocas grasas saturadas. No fumar. Y controlar la presión arterial periódicamente. La hipertensión es uno de los principales factores de riesgo cardiovascular, y muchas veces no da síntomas hasta que ya es tarde. Un control anual al médico puede hacer una gran diferencia. Chau.""",

    "energia": """Un dato para pensar: la energía que consumimos como sociedad es un indicador de qué tan desarrollada está. Los países más industrializados consumen mucha más energía per cápita. Pero también son los que más contaminan, salvo que inviertan en renovables. En la Argentina, el consumo de energía per cápita es relativamente bajo comparado con Europa o Estados Unidos, y tenemos un gran potencial renovable: sol en el norte, viento en la Patagonia, agua en la Mesopotamia. Es un recurso estratégico que el país todavía no explota del todo. Y cada uno de nosotros puede aportar, con pequeñas acciones cotidianas: apagar las luces que no usamos, desconectar los cargadores, usar transporte público o bicicleta cuando se pueda. La transición energética empieza en casa. Chau.""",

    "mezclas": """Un detalle interesante para pensar: muchas veces en la vida diaria usamos métodos de separación sin darnos cuenta. Cuando colás los fideos, estás filtrando. Cuando hervís el agua con sal para una pasta, no estás separando la sal, pero al evaporar el agua de mar y condensar el vapor, estás destilando. Cuando dejás que la borra del mate se asiente en el fondo, estás decantando. Y cuando pasás un imán por un cajón con clavos, estás imantando. Las técnicas de laboratorio se usan todo el tiempo en la casa, solo que sin pensarlo. Y en la industria, las mismas técnicas se usan a gran escala: para purificar el agua de red, para obtener la sal de mesa, para fabricar medicamentos, para producir combustibles. Son técnicas universales, que van desde tu cocina hasta las refinerías más grandes del mundo. Chau.""",

    "agua": """Y un detalle más, en línea con la ESI y la EAI: el agua no es solo un tema de ciencia, también es un tema de justicia social. En el mundo, más de dos mil millones de personas no tienen acceso a agua potable segura. En muchas zonas de la Argentina, sobre todo en el norte, el agua llega contaminada con arsénico, que es un metal pesado tóxico. Y los problemas no se distribuyen de forma pareja: afectan más a los barrios pobres, a las comunidades rurales, a los pueblos originarios. Por eso, cuando hablamos del agua, hablamos de derechos humanos, de salud pública, de ambiente. Cuidar el agua es un acto de responsabilidad individual y colectiva, y empieza por informarnos, por no contaminar, y por exigir políticas públicas que garanticen el acceso universal. Chau.""",
}

async def gen(text, path):
    communicate = edge_tts.Communicate(text, VOICE, rate=RATE)
    await communicate.save(path)
    print(f"OK: {os.path.basename(path)}")

async def main():
    tasks = []
    for fname, extra in EXTENSIONES.items():
        # Leer el audio existente no es posible en MP3 con edge-tts, así que
        # tenemos que re-generar desde el guion original. Hacemos un truco:
        # usamos el script anterior que ya tiene los guiones originales
        pass

    # En lugar de leer el MP3, regeneramos desde el guion original
    # Para no duplicar el guion, importamos el script anterior
    import importlib.util
    spec = importlib.util.spec_from_file_location("g1", r"D:\naturales_1\podcast\gen_podcast_audios.py")
    mod = importlib.util.module_from_spec(spec)
    # Ejecutamos el código del módulo hasta antes de la llamada asyncio.run
    with open(r"D:\naturales_1\podcast\gen_podcast_audios.py", "r", encoding="utf-8") as f:
        src = f.read()
    # Truncar antes de "if __name__"
    src = src.split('if __name__')[0]
    ns = {"__name__": "g1"}
    exec(src, ns)
    GUIAS = ns["GUIAS"]

    for fname, extra in EXTENSIONES.items():
        full = GUIAS[fname] + " " + extra
        out_path = os.path.join(OUT_DIR, fname + ".mp3")
        tasks.append(gen(full, out_path))

    await asyncio.gather(*tasks)
    print(f"\n{len(tasks)} audios regenerados en {OUT_DIR}")

if __name__ == "__main__":
    asyncio.run(main())
