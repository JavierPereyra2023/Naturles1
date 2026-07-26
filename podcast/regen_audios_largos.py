"""
Regenera los 5 audios que quedaron por debajo de 2:50,
añadiendo un párrafo final con más contenido para acercarlos a 3:00-3:10.
"""
import asyncio
import os
import edge_tts

OUT_DIR = r"D:\naturales_1\podcast\audio"
VOICE = "es-AR-TomasNeural"
RATE = "+18%"

EXTENSIONES = {
    "digestion": """Una cosa más que vale la pena tener en cuenta: el sistema digestivo no trabaja solo. Está en comunicación constante con el cerebro, por una vía que se llama el eje intestino-cerebro. Por eso cuando estás nervioso o con ansiedad, sentís el estómago revuelto, o se te cierra el apetito. Y al revés: lo que comés afecta tu estado de ánimo. Una dieta rica en fibra y baja en ultraprocesados favorece una flora intestinal sana, y eso se asocia a mejor ánimo y mejor sueño. Así que cuidar la digestión es también cuidar la cabeza.""",

    "respiracion": """Algo que pocos saben: el sistema respiratorio tiene defensas propias. La nariz tiene pelitos que filtran partículas, el moco atrapa polvo y gérmenes, y en la tráquea hay células con cilios que barren el moco hacia arriba para que se pueda tragar o toser. Cuando tosés o estornudás, estás usando esas defensas. El sistema respiratorio también puede enfermarse. El asma, por ejemplo, es una inflamación crónica de los bronquios, que se cierran y dificultan el paso del aire. La bronquitis es una infección de los bronquios. Y la neumonía afecta a los alvéolos. Todas se previenen en gran parte con buena alimentación, no fumar, hacer ejercicio, y mantener las vacunas al día, sobre todo la de la gripe y la del neumococo en los grupos de riesgo.""",

    "sistema-solar": """Hay cosas que todavía no sabemos del Sistema Solar. Por ejemplo, en el cinturón de Kuiper, más allá de Neptuno, seguro que hay más planetas enanos por descubrir. Y en la nube de Oort, una esfera de cuerpos helados que rodea todo el sistema, están los núcleos de los cometas que de vez en cuando caen hacia el sol. Algunos científicos creen que podría haber un noveno planeta, llamado Planeta Nueve, mucho más allá de Neptuno, que explicaría las órbitas raras de algunos objetos del cinturón de Kuiper. Todavía no se confirmó, pero es una hipótesis apasionante. Y exoplanetas, o sea planetas que orbitan otras estrellas, ya se descubrieron más de cinco mil. Algunos están en la zona habitable de su estrella, donde podría haber agua líquida. Quién sabe, quizás uno de esos sea el próximo lugar al que la humanidad pueda llegar.""",

    "plantas": """Algo que se enseña en ESI pero que tiene mucho que ver con la biología: la relación entre las plantas, el ambiente y nosotros. La deforestación, el uso de agroquímicos, el cambio climático, todo eso afecta a las plantas, y al revés, las plantas son las que regulan la composición de la atmósfera. Un solo árbol adulto puede absorber unos veinte kilos de dióxido de carbono por año. Y un metro cuadrado de selva produce el oxígeno que necesita una persona por día. Por eso cuidar las plantas es cuidarnos a nosotros mismos. Y un detalle final: las plantas también sienten. No tienen sistema nervioso, pero responden a estímulos, se orientan hacia la luz, producen sustancias químicas para defenderse de los herbívoros, y algunas, como la venus atrapamoscas, hasta se mueven para atrapar insectos. Las plantas son más activas de lo que parecen.""",

    "seres-vivos": """Una última cosa que vale la pena saber: el árbol de la vida. Todos los seres vivos que existen, o que existieron, están emparentados. Si retrocedemos lo suficiente, todos tenemos un antepasado común, una célula primitiva que vivió hace unos tres mil ochocientos millones de años, en los océanos primitivos. Desde ahí, la vida se fue diversificando, por selección natural, que fue descripta por Charles Darwin en mil ochocientos cincuenta y nueve. Los que mejor se adaptaban al ambiente sobrevivían y dejaban descendencia, y los que no, se extinguían. Por eso hoy hay tal diversidad. Y la diversidad es clave: un ecosistema con muchas especies es más resistente y más estable que uno con pocas. Por eso la pérdida de biodiversidad, que está ocurriendo ahora a un ritmo alarmante, es una de las grandes crisis ambientales del siglo veintiuno.""",
}

async def gen(text, path):
    communicate = edge_tts.Communicate(text, VOICE, rate=RATE)
    await communicate.save(path)
    print(f"OK: {os.path.basename(path)}")

async def main():
    # Para regenerar, primero leemos el texto original de los archivos .py ya hechos
    # Como no quiero duplicar el guion acá, uso el archivo .py anterior para extraerlos
    import importlib.util
    spec = importlib.util.spec_from_file_location("gen", r"D:\naturales_1\podcast\gen_podcast_audios.py")
    mod = importlib.util.module_from_spec(spec)
    # No ejecutamos main, solo accedemos a GUIAS
    # Truco: importar el módulo sin ejecutar main
    import sys
    sys.modules["gen"] = mod
    # Cargar el código fuente
    with open(r"D:\naturales_1\podcast\gen_podcast_audios.py", "r", encoding="utf-8") as f:
        source = f.read()
    # Reemplazar la llamada asyncio.run por una definición de GUIAS solamente
    # Más simple: hacer un mini-script que importe del otro
    # En lugar de eso, simplemente copio los guiones completos acá

    GUIAS_FULL = {
        "digestion": """Hola, soy el profesor Javier Pereyra, y hoy les voy a contar el camino que hace la comida desde que entra a tu boca hasta que se convierte en lo que tu cuerpo necesita. Eso es la digestión.

El sistema digestivo es un tubo largo que va desde la boca hasta el ano, mide unos nueve metros. A lo largo de ese tubo, la comida se va rompiendo en pedazos cada vez más chicos, hasta que queda en moléculas tan pequeñas que pueden pasar a la sangre.

El proceso empieza en la boca. Los dientes muerden, cortan y trituran la comida, y la lengua la mezcla con la saliva. La saliva tiene una enzima que se llama amilasa salival, que empieza a digerir los almidones, que son los azúcares complejos. Después tragas, y la comida baja por el esófago, que es un tubo de veinticinco centímetros. No cae por gravedad, sino que los músculos del esófago se contraen en ondas, lo que se llama peristaltismo, y empujan la comida hacia abajo. Por eso podés tragar incluso cabeza abajo.

Después llega al estómago, que es una bolsa muscular con ácido clorhídrico. El ácido es tan fuerte que podría disolver una hoja de afeitar. Junto con las enzimas gástricas, transforma la comida en una pasta ácida llamada quimo. El estómago puede contener hasta un litro y medio de comida, y tarda entre dos y cuatro horas en vaciarse.

Después de eso, la pasta pasa al intestino delgado, que mide unos seis metros. Ahí es donde pasa la magia. El páncreas vuelca enzimas, y el hígado vuelca bilis, que es la que ayuda a digerir las grasas. Las paredes del intestino están cubiertas de unas vellosidades chiquititas que se llaman vellosidades intestinales, que aumentan la superficie de absorción. Toda esa superficie, desplegada, equivale a la de una cancha de tenis.

En el intestino delgado se absorben los nutrientes: los azúcares simples, los aminoácidos, las vitaminas, los minerales, las grasas digeridas. Todo eso pasa a la sangre, que lo lleva a todas las células del cuerpo.

Lo que no se absorbe, pasa al intestino grueso, que mide un metro y medio. Ahí se absorbe el agua y las sales minerales, y lo que queda se compacta hasta formar las heces. El intestino grueso tiene muchas bacterias, que forman la flora intestinal, y que nos ayudan a digerir algunas cosas que nuestro cuerpo no puede, como la fibra.

Y un dato importante: la saliva, el ácido del estómago, la bilis del hígado, los jugos del páncreas, todo eso se llama jugos digestivos. Y el conjunto de todos ellos es lo que permite que la comida se transforme en nutrientes que el cuerpo puede usar.

Y un dato final: el sistema digestivo tiene un sistema nervioso propio, el sistema entérico, que a veces se llama el segundo cerebro. Tiene más neuronas que la médula espinal. Por eso sentís mariposas en el estómago cuando estás nervioso, o se te cierra el estómago cuando tenés miedo.

Una cosa más que vale la pena tener en cuenta: el sistema digestivo no trabaja solo. Está en comunicación constante con el cerebro, por una vía que se llama el eje intestino-cerebro. Por eso cuando estás nervioso o con ansiedad, sentís el estómago revuelto, o se te cierra el apetito. Y al revés: lo que comés afecta tu estado de ánimo. Una dieta rica en fibra y baja en ultraprocesados favorece una flora intestinal sana, y eso se asocia a mejor ánimo y mejor sueño. Así que cuidar la digestión es también cuidar la cabeza. Chau.""",

        "respiracion": """Hola, ¿qué tal? Acá el profesor Javier Pereyra, y hoy vamos a hablar de la respiración. Un proceso que hacés unas veinte mil veces por día, sin pensarlo, pero que es bastante más complejo de lo que parece.

Respirar no es solo meter aire y sacarlo. La respiración es un intercambio de gases: tomás oxígeno del aire, y largás dióxido de carbono. El oxígeno es necesario para que las células produzcan energía, y el dióxido de carbono es un desecho de ese proceso, y si se acumula, te intoxica.

El sistema respiratorio empieza en la nariz y la boca. La nariz es mejor para respirar porque el aire se calienta, se humedece y se filtra de partículas gracias a los pelitos y el moco. Por eso conviene respirar por la nariz, no por la boca.

Después el aire pasa por la faringe, una zona compartida con el sistema digestivo, y baja por la laringe, donde están las cuerdas vocales. De ahí pasa a la tráquea, que es un tubo de doce centímetros con anillos de cartílago que la mantienen abierta. La tráquea se divide en dos bronquios, uno para cada pulmón, y los bronquios se ramifican en bronquiolos cada vez más chicos, hasta terminar en unos saquitos ciegos llamados alvéolos.

Los pulmones son dos órganos esponjosos que están en la caja torácica. En su interior tienen millones de alvéolos, unos setecientos millones en total. Si los desplegaras todos, cubrirían la superficie de una cancha de tenis. Alrededor de cada alvéolo hay capilares sanguíneos, y ahí es donde ocurre el intercambio de gases. El oxígeno pasa del alvéolo a la sangre, y el dióxido de carbono pasa de la sangre al alvéolo. Después se expulsa al exhalar.

El mecanismo de la respiración es controlado por el diafragma, que es un músculo grande que está debajo de los pulmones. Cuando se contrae, baja y los pulmones se expanden, y entra el aire. Cuando se relaja, sube, los pulmones se comprimen, y sale el aire. En reposo respirás unas quince veces por minuto, inhalando medio litro de aire cada vez.

El sistema nervioso controla la respiración de forma automática. Hay sensores de dióxido de carbono en el cerebro y en las arterias que detectan si estás respirando bien o no, y ajustan la frecuencia. Por eso podés respirar sin pensarlo.

Y un dato: el oxígeno que entra a tu cuerpo no se queda mucho tiempo. Una molécula de oxígeno que entra por la nariz puede llegar a una célula del dedo gordo del pie en unos pocos segundos, gracias a la velocidad de la sangre.

La respiración está conectada con la circulación, que es la que transporta el oxígeno. Y con el sistema nervioso, que controla la frecuencia. Todo en equipo.

Y un consejo: si hacés ejercicio, respirá por la nariz. Eso te obliga a respirar más lento y más profundo, y mejora la capacidad pulmonar.

Algo que pocos saben: el sistema respiratorio tiene defensas propias. La nariz tiene pelitos que filtran partículas, el moco atrapa polvo y gérmenes, y en la tráquea hay células con cilios que barren el moco hacia arriba para que se pueda tragar o toser. Cuando tosés o estornudás, estás usando esas defensas. El sistema respiratorio también puede enfermarse. El asma, por ejemplo, es una inflamación crónica de los bronquios, que se cierran y dificultan el paso del aire. La bronquitis es una infección de los bronquios. Y la neumonía afecta a los alvéolos. Todas se previenen en gran parte con buena alimentación, no fumar, hacer ejercicio, y mantener las vacunas al día, sobre todo la de la gripe y la del neumococo en los grupos de riesgo. Chau.""",

        "sistema-solar": """Hola, soy el profesor Javier Pereyra, y hoy vamos a recorrer el Sistema Solar. Nuestro barrio en la galaxia.

El Sistema Solar está formado por una estrella, el Sol, y todo lo que gira a su alrededor: ocho planetas, cinco planetas enanos, lunas, asteroides, cometas y mucho polvo cósmico. Todo se formó hace unos cuatro mil seiscientos millones de años, a partir de una nube gigante de gas y polvo que se fue achicando y formando un disco. En el centro se encendió el Sol, y en el disco se fueron juntando los planetas.

El Sol es una estrella mediana, amarilla, y concentra el noventa y nueve coma ocho por ciento de toda la masa del sistema. Es tan grande que adentro podrían entrar un millón de Tierras. En su núcleo, a quince millones de grados, los átomos de hidrógeno se fusionan para formar helio, y eso libera una cantidad enorme de energía. Eso es la fusión nuclear, la misma reacción que se quiere复制 en las centrales de fusión, pero todavía no se logra de forma controlada.

Los planetas se dividen en dos grupos. Los rocosos o terrestres, que están más cerca del Sol: Mercurio, Venus, la Tierra y Marte. Son chicos, densos, con superficie sólida. Y los gaseosos, que están más lejos: Júpiter, Saturno, Urano y Neptuno. Son enormes, hechos de gas, y tienen anillos y muchas lunas.

Mercurio es el más chico y el más cercano al Sol, con temperaturas que pasan los cuatrocientos grados de día y bajan a menos ciento ochenta de noche. Venus es el más caliente, porque tiene una atmósfera de dióxido de carbono que atrapa el calor, efecto invernadero fuera de control. La Tierra es la excepción, con agua líquida y vida. Marte es el planeta rojo, con el monte Olimpo, el volcán más grande del Sistema Solar, tres veces más alto que el Everest.

Júpiter es el más grande, con la Gran Mancha Roja, una tormenta más grande que la Tierra que lleva cientos de años activa. Saturno tiene los anillos más famosos, hechos de hielo y roca. Urano es único, gira acostado, de costado. Y Neptuno tiene los vientos más rápidos, dos mil kilómetros por hora.

La Tierra tiene una sola luna, pero es muy especial: es grande relative al planeta, estabiliza el eje terrestre y produce las mareas. El sistema Tierra-Luna es casi un planeta doble.

El Sol también se mueve. Gira alrededor del centro de la Vía Láctea, nuestra galaxia, a doscientos kilómetros por segundo. Da una vuelta completa cada doscientos veinticinco millones de años. La última vez que estuvo en esta posición, los dinosaurios estaban empezando a aparecer.

Y un dato curioso: el Voyager uno, que se lanzó en mil novecientos setenta y siete, ya salió del Sistema Solar. Es el objeto humano que más lejos llegó, y sigue transmitiendo señales desde el espacio interestelar.

Hay cosas que todavía no sabemos del Sistema Solar. Por ejemplo, en el cinturón de Kuiper, más allá de Neptuno, seguro que hay más planetas enanos por descubrir. Y en la nube de Oort, una esfera de cuerpos helados que rodea todo el sistema, están los núcleos de los cometas que de vez en cuando caen hacia el sol. Algunos científicos creen que podría haber un noveno planeta, llamado Planeta Nueve, mucho más allá de Neptuno, que explicaría las órbitas raras de algunos objetos del cinturón de Kuiper. Todavía no se confirmó, pero es una hipótesis apasionante. Y exoplanetas, o sea planetas que orbitan otras estrellas, ya se descubrieron más de cinco mil. Algunos están en la zona habitable de su estrella, donde podría haber agua líquida. Quién sabe, quizás uno de esos sea el próximo lugar al que la humanidad pueda llegar. Chau.""",

        "plantas": """Hola, soy Javier Pereyra, y hoy les voy a hablar de las plantas. Los seres vivos más importantes del planeta, porque son los que fabrican el alimento que mantiene a casi todo el resto.

Las plantas son autótrofas, eso significa que fabrican su propio alimento. ¿Cómo lo hacen? Con la fotosíntesis, un proceso que ocurre en las hojas, en unos organitos verdes llamados cloroplastos. Las plantas toman dióxido de carbono del aire, agua del suelo, y con la energía del sol transforman todo eso en glucosa, que es su comida, y oxígeno, que largan al aire. La fórmula es: seis moléculas de dióxido de carbono más seis de agua, con luz solar, da una molécula de glucosa más seis de oxígeno. Simple y genial.

Por eso las plantas son verdes: tienen un pigmento llamado clorofila, que es el que absorbe la luz del sol, sobre todo la roja y la azul, y refleja la verde. La clorofila es la clave de la fotosíntesis.

Las partes de una planta son la raíz, que absorbe agua y nutrientes del suelo y los lleva hasta el tallo. El tallo, que sostiene la planta y transporta la savia. Las hojas, donde se hace la fotosíntesis. Las flores, que son el órgano reproductor. Y los frutos, que contienen las semillas.

Hay dos tipos de plantas. Las vasculares, que tienen vasos conductores de savia, son las más abundantes: helechos, coníferas, plantas con flor. Y las no vasculares, que no tienen vasos, como los musgos, que necesitan estar siempre húmedos.

La reproducción de las plantas puede ser sexual, con flores y semillas, o asexual, por estolones, esquejes, bulbos. Las flores tienen partes masculinas, los estambres, donde se produce el polen, y partes femeninas, el pistilo, donde están los óvulos. La polinización es el paso del polen desde el estambre al pistilo, y puede ser por el viento, por el agua, por los insectos, sobre todo las abejas, o por otros animales como los murciélagos y los colibríes.

Después de la polinización, el óvulo fecundado se transforma en semilla, y el ovario de la flor se transforma en fruto. El fruto protege a la semilla y ayuda a dispersarla. Hay frutos carnosos, como la manzana, que atraen animales que comen el fruto y defecan las semillas lejos. Y frutos secos, como el girasol, que se caen al piso.

Hay plantas de todo tipo. Las carnívoras, como la drosera, que atrapan insectos para obtener nitrógeno. Las epífitas, como las orquídeas, que viven sobre otras plantas pero no son parásitas. Los árboles, que pueden vivir miles de años, como las secuoyas, que pasan los tres mil años. Y las que viven un año, llamadas anuales, como el trigo y el maíz.

Y un dato curioso: la fotosíntesis produce casi todo el oxígeno que respirás. Gracias a las plantas, el aire tiene veintiún por ciento de oxígeno, lo que permite la vida animal. Sin plantas, la atmósfera sería irrespirable.

Algo que se enseña en ESI pero que tiene mucho que ver con la biología: la relación entre las plantas, el ambiente y nosotros. La deforestación, el uso de agroquímicos, el cambio climático, todo eso afecta a las plantas, y al revés, las plantas son las que regulan la composición de la atmósfera. Un solo árbol adulto puede absorber unos veinte kilos de dióxido de carbono por año. Y un metro cuadrado de selva produce el oxígeno que necesita una persona por día. Por eso cuidar las plantas es cuidarnos a nosotros mismos. Y un detalle final: las plantas también sienten. No tienen sistema nervioso, pero responden a estímulos, se orientan hacia la luz, producen sustancias químicas para defenderse de los herbívoros, y algunas, como la venus atrapamoscas, hasta se mueven para atrapar insectos. Las plantas son más activas de lo que parecen. Chau.""",

        "seres-vivos": """Hola, ¿qué tal? El profesor Javier Pereyra por acá, y hoy vamos a hablar de los seres vivos. ¿Qué es lo que distingue a un ser vivo de algo que no lo es? A veces parece obvio, pero cuando uno lo piensa bien, hay cosas que nos hacen pensar.

Los seres vivos tienen características que comparten todos. Todos nacen, crecen, se reproducen y mueren. Todos necesitan energía para mantenerse vivos, la sacan de los alimentos, del sol o de otros seres vivos. Todos responden a los estímulos, es decir, reaccionan a la luz, al calor, al sonido, al contacto. Todos están formados por células, que son las unidades básicas de la vida.

Hay tres funciones vitales que todos los seres vivos cumplen. La nutrición, que es la forma en que obtienen materia y energía. Hay dos tipos: los autótrofos, que fabrican su propio alimento, como las plantas, que hacen fotosíntesis. Y los heterótrofos, que necesitan comer a otros seres vivos, como los animales y los hongos.

La relación es la capacidad de captar lo que pasa en el ambiente y reaccionar. Las plantas se orientan hacia la luz, los animales huyen del peligro, las bacterias se mueven hacia los nutrientes. Y la reproducción, que es la capacidad de generar nuevos individuos. Algunos se reproducen sexualmente, con dos padres, otros asexualmente, con uno solo.

Los seres vivos se clasifican en cinco reinos. El reino animal, que somos nosotros, los insectos, los peces, las aves. El reino vegetal, las plantas, los árboles, las flores. El reino fungi, los hongos, las levaduras, los mohos. El reino protista, que es un cajón de sastre con algas y protozoos. Y el reino monera, que son las bacterias, los organismos más chicos y más abundantes del planeta.

Las células pueden ser de dos tipos. Las procariotas, que son las de las bacterias, son chicas, no tienen núcleo, el material genético está disperso. Y las eucariotas, que son las de todos los demás, son más grandes y tienen núcleo, donde está guardado el ADN.

Todos los seres vivos están formados por los mismos elementos químicos: carbono, hidrógeno, oxígeno, nitrógeno, fósforo y azufre. El carbono es especial, porque puede formar cadenas larguísimas, y eso es la base de las moléculas orgánicas, las proteínas, los ácidos nucleicos, los azúcares, las grasas.

Y un dato: hay más bacterias en tu cuerpo que células humanas. Se estima que por cada célula tuya hay diez bacterias. La mayoría viven en el intestino y nos ayudan a digerir. Sin ellas no podríamos vivir.

Una última cosa que vale la pena saber: el árbol de la vida. Todos los seres vivos que existen, o que existieron, están emparentados. Si retrocedemos lo suficiente, todos tenemos un antepasado común, una célula primitiva que vivió hace unos tres mil ochocientos millones de años, en los océanos primitivos. Desde ahí, la vida se fue diversificando, por selección natural, que fue descripta por Charles Darwin en mil ochocientos cincuenta y nueve. Los que mejor se adaptaban al ambiente sobrevivían y dejaban descendencia, y los que no, se extinguían. Por eso hoy hay tal diversidad. Y la diversidad es clave: un ecosistema con muchas especies es más resistente y más estable que uno con pocas. Por eso la pérdida de biodiversidad, que está ocurriendo ahora a un ritmo alarmante, es una de las grandes crisis ambientales del siglo veintiuno. Chau.""",
    }

    tasks = []
    for fname, text in GUIAS_FULL.items():
        out_path = os.path.join(OUT_DIR, fname + ".mp3")
        tasks.append(gen(text, out_path))
    await asyncio.gather(*tasks)
    print(f"\n{len(tasks)} audios regenerados en {OUT_DIR}")

if __name__ == "__main__":
    asyncio.run(main())
