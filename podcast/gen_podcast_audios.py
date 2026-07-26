"""
Genera los 14 audios del podcast con edge-tts.
Voz: es-AR-TomasNeural (argentino nativo, mismo que videos Manim)
Rate: +18% (sweet spot)
"""
import asyncio
import os
import edge_tts

OUT_DIR = r"D:\naturales_1\podcast\audio"
os.makedirs(OUT_DIR, exist_ok=True)

VOICE = "es-AR-TomasNeural"
RATE = "+18%"

# Guiones ~750 palabras cada uno = ~3:00 a 3:30 con rate +18%
GUIAS = {
    "materia-propiedades": """Hola, ¿cómo andan? Yo soy el profesor Javier Pereyra y hoy les voy a contar qué es la materia. La pregunta parece fácil, pero no lo es tanto cuando uno se pone a pensar.

La materia es todo aquello que tiene masa y ocupa un lugar en el espacio. Tu silla, el aire, el agua, la pantalla del celular, las estrellas, todo. Y lo que no es materia es la energía: la luz, el calor, el sonido, son formas de energía y no son materia en sí mismas.

Ahora, la materia tiene propiedades. Las primeras son las propiedades generales: la masa, que es la cantidad de materia que tiene un cuerpo, y el volumen, que es el espacio que ocupa. Esas dos son propiedades extensivas, porque dependen de la cantidad de materia. Si partís un litro de agua por la mitad, cada mitad tiene la mitad de masa y la mitad de volumen.

Después están las propiedades intensivas, que no dependen de la cantidad. El color, la densidad, la dureza, el punto de fusión, la conductividad. Un litro de agua y un balde de agua, los dos hierven a cien grados centígrados. Eso es intensivo.

La materia se presenta en tres estados: sólido, líquido y gaseoso. En el sólido, las partículas están pegadas, vibran pero no se mueven. En el líquido, están más separadas, se deslizan unas sobre otras. En el gas, están bien separadas, se mueven libres en todas las direcciones. Y se puede pasar de un estado a otro cambiando la temperatura o la presión.

Hay una propiedad que vale la pena recordar: la densidad. Es la masa dividida por el volumen. Cada material tiene su densidad característica. El hierro es más denso que el agua, por eso se hunde. El aceite es menos denso que el agua, por eso flota encima. El hielo es menos denso que el agua líquida, por eso flota el hielo en tu vaso.

Otro concepto clave es la diferencia entre sustancias puras y mezclas. Una sustancia pura es un solo tipo de material, como el agua destilada o el oxígeno del aire. Una mezcla tiene varias sustancias combinadas. Y a las sustancias puras las podemos separar en elementos, que son los ladrillos básicos de todo, y compuestos, que son combinaciones de elementos.

Los elementos están todos en la tabla periódica: hidrógeno, carbono, oxígeno, hierro, oro, uranio, hay ciento dieciocho conocidos hasta ahora. Y los化合物, como el agua, que es hidrógeno y oxígeno, o el dióxido de carbono, que es carbono y oxígeno.

Una cosa importante: las propiedades de la materia se pueden usar para identificarla. Si tenés un líquido transparente, incoloro, que hierve a cien grados, es agua. Si tenés un metal gris, brillante, que pesa mucho, seguramente es hierro o plomo.

Y antes de cerrar, un dato curioso: vos, yo, el sol, el aire, los planetas, todo lo que podés ver y tocar es materia. Menos del cinco por ciento del universo es materia. El resto es energía oscura y materia oscura, cosas que no sabemos bien qué son, pero que sabemos que están ahí por la forma en que se mueven las galaxias. Pero eso es tema para otra clase.

Bueno, esto fue un repaso rápido por la materia y sus propiedades. Si querés profundizar, en la página del podcast tenés los enlaces a las clases completas de la unidad. Chau, y a seguir estudiando.""",

    "mezclas": """Hola, ¿qué tal? Acá el profesor Javier Pereyra, y hoy vamos a charlar sobre mezclas. Esto lo ven todo el tiempo en la cocina, en la calle, en la playa, en todos lados.

Una mezcla es la combinación de dos o más sustancias puras, donde cada una mantiene sus propiedades. El azúcar disuelta en el agua: el azúcar sigue siendo azúcar, el agua sigue siendo agua, están juntas pero no se transforman en otra cosa. Eso es una mezcla.

Las mezclas se dividen en dos grandes grupos. Las mezclas homogéneas son aquellas en las que no se distinguen los componentes a simple vista. El agua con sal disuelta, el aire, el acero, el vino. Se ven como una sola fase, un solo material. También se llaman disoluciones o soluciones. Tienen un soluto, que es lo que se disuelve, y un solvente, que es lo que disuelve. En el agua con sal, el agua es el solvente y la sal es el soluto.

Las mezclas heterogéneas son al revés: se ven los componentes. La ensalada, el hormigón, una roca con vetas blancas y negras, un vaso de agua con arena. Cada componente se ve a simple vista o con una lupa.

Ahora, lo más importante de todo esto: cómo se separan las mezclas. Porque en la vida real, muchas veces necesitamos separar los componentes. Para purificar agua, para sacar la sal del agua de mar, para reciclar, para hacer análisis en un laboratorio.

Hay muchos métodos. La filtración sirve para separar un sólido de un líquido: hacés pasar la mezcla por un filtro, el líquido pasa y el sólido se queda. Es lo que hacés cuando colás el té.

La decantación es dejar la mezcla quieta hasta que el componente más denso baje al fondo. Después lo separás con cuidado. Sirve para agua con aceite, si dejás el vaso quieto, el aceite queda arriba y el agua abajo.

La tamización es como colar pero con sólidos: hacés pasar la mezcla por una malla, lo pequeño pasa, lo grande se queda. Sirve para separar arena de piedras.

La imantación usa un imán para separar materiales magnéticos. Si tenés una mezcla de arena y limaduras de hierro, pasás el imán y las limaduras se pegan.

La destilación es el método más completo: calentás la mezcla hasta que uno de los componentes se evapora, después enfriás el vapor y se condensa. Sirve para sacar la sal del agua, para hacer alcohol, para separar líquidos que se mezclan.

La cromatografía es más fina: separás los componentes por la velocidad a la que son absorbidos por un material. Sirve para separar los pigmentos de una planta, por ejemplo.

Y hay un concepto clave: las mezclas se pueden separar por métodos físicos, sin cambiar la composición química de las sustancias. Eso es lo que diferencia una mezcla de un compuesto químico. En un compuesto, como el agua, los elementos están combinados de verdad, y para separarlos necesitás una reacción química.

Bueno, ya saben: las mezclas están en todos lados, se pueden separar con métodos físicos, y cada método aprovecha una propiedad distinta. Si quieren ver los experimentos, en la página del podcast les dejé enlaces. Chau, hasta la próxima.""",

    "agua": """Hola, soy Javier Pereyra, profesor de Ciencias Naturales, y hoy les voy a hablar del agua. El líquido más importante para la vida, y el más abundante en la superficie de nuestro planeta.

El agua cubre el setenta y uno por ciento de la Tierra, pero solo el tres por ciento es agua dulce, y de esa, la mayor parte está en glaciares y acuíferos subterráneos. Apenas el uno por ciento del agua del planeta es dulce y está en ríos, lagos y arroyos, accesible para nosotros.

El agua tiene propiedades muy especiales. Es una de las pocas sustancias que es más densa en estado líquido que en estado sólido. Por eso el hielo flota. Si el hielo se hundiera, los lagos se congelarían de abajo hacia arriba y los peces no podrían sobrevivir.

Otra propiedad rara: tiene una tensión superficial altísima. Eso permite que algunos insectos caminen sobre el agua, o que se formen gotas redondas. Y también es responsable de la capilaridad: el agua sube por tubos finitos, como cuando una planta chupa agua por las raíces.

El agua es el solvente universal. Disuelve más sustancias que cualquier otro líquido. Por eso en la naturaleza casi no se encuentra agua pura, siempre trae algo disuelto.

Ahora, ¿de dónde viene el agua? Del ciclo del agua. Un proceso que tiene cuatro etapas: evaporación, condensación, precipitación y escorrentía. El sol calienta el agua de los mares, ríos y lagos, se evapora y sube como vapor de agua. En las alturas, donde hace frío, el vapor se condensa y forma las nubes. Cuando las gotas de las nubes pesan mucho, caen como lluvia o nieve. Y el agua vuelve a la tierra, corre por los ríos y vuelve al mar. El ciclo se repite desde hace miles de millones de años.

El agua es un recurso renovable pero finito. En la Argentina tenemos agua en cantidad, pero está mal distribuida. En el AMBA, por ejemplo, depende mucho de la cuenca del Río de la Plata, y hay zonas donde ya falta.

Y acá entramos en un tema serio: la contaminación del agua. Hay dos tipos de contaminantes. Los biológicos, que son bacterias, virus y parásitos, que causan enfermedades como el cólera o la hepatitis A. Y los químicos, que son metales pesados, agroquímicos, plásticos, que se acumulan en los organismos y a largo plazo son tóxicos.

Por eso es tan importante potabilizar el agua. El proceso de potabilización incluye coagulación, donde se le agrega una sustancia que junta las partículas sueltas, después la floculación, donde se forman grumos más grandes, después la sedimentación, donde los grumos caen al fondo, después la filtración, y finalmente la desinfección con cloro o luz ultravioleta.

En tu casa, hervir el agua durante un minuto mata casi todos los gérmenes. Si no podés hervirla, una gota de lavandina por cada diez litros también funciona.

Y un dato importante: el acceso al agua potable es un derecho humano reconocido por la ONU desde el 2010. Es decir, no es un privilegio, es un derecho. Y como derecho, todos los países deberían garantizarlo.

Bueno, esto fue el agua. Si tenés alguna duda, dejala en los comentarios. Chau.""",

    "energia": """Hola, ¿cómo les va? Acá el profesor Javier Pereyra, y hoy vamos a hablar de energía. La energía es uno de los conceptos más importantes de la física, y aparece en todos lados.

La energía es la capacidad de un cuerpo o sistema de producir un cambio. Sin energía, no hay movimiento, no hay calor, no hay luz, no hay vida. La energía no se crea ni se destruye, solo se transforma. Esto se llama el principio de conservación de la energía, y es una de las leyes más importantes de la física.

Hay muchas formas de energía. La energía cinética es la del movimiento. Una pelota que rueda, un auto que corre, un atleta que corre, todos tienen energía cinética. Depende de la masa y de la velocidad al cuadrado: si duplicás la velocidad, la energía se cuadruplica.

La energía potencial es la que tiene un cuerpo por su posición o su estado. Un objeto en la altura tiene energía potencial gravitatoria. Un resorte comprimido tiene energía potencial elástica.

La energía térmica está asociada a la temperatura. Cuanto más caliente algo, más energía térmica tiene. Y se transfiere siempre del cuerpo más caliente al más frío.

La energía química está en los enlaces de las moléculas. La comida tiene energía química, la nafta tiene energía química, las pilas tienen energía química. Cuando se rompen esos enlaces, la energía se libera.

La energía eléctrica es la que mueve los electrones. Enchufe, rayos, el sistema nervioso de los animales, todo eso es electricidad.

La energía radiante es la que viaja en forma de ondas electromagnéticas. La luz del sol, los rayos X, las ondas de radio, los rayos infrarrojos, todo eso es energía radiante.

La energía nuclear está en el núcleo de los átomos. Es la que mantiene unidos a los protones y neutrones. Cuando se rompe o se une un núcleo, se libera una cantidad enorme de energía.

Ahora, las fuentes de energía. Las renovables son las que se reponen de forma natural: el sol, el viento, el agua que cae, las mareas, la biomasa, el calor de la Tierra. Y las no renovables son las que se acaban: el petróleo, el gas natural, el carbón y el uranio.

En la Argentina, más del ochenta por ciento de la electricidad viene de fuentes térmicas, que queman gas natural. Pero estamos avanzando rápido con las renovables. Cauchari, en Jujuy, es uno de los parques solares más grandes de Latinoamérica. Y el parque eólico Rawson, en Chubut, genera energía con el viento de la Patagonia.

El problema de las fuentes no renovables es que al quemarlas largan dióxido de carbono, que es un gas de efecto invernadero, y eso calienta el planeta. Por eso hay que ir pasándose a las renovables.

Y un dato final: la energía se mide en joules, en calorías o en kilovatios-hora. La caloría es la cantidad de energía necesaria para subir un grado centígrado un gramo de agua. Tu cuerpo necesita unas dos mil calorías por día para funcionar.

Bueno, hasta acá la energía. Espero que les haya servido. Chau.""",

    "calor-sonido": """Hola, ¿qué tal? El profesor Javier Pereyra por acá, y hoy vamos a meternos con dos temas que parecen distintos pero están muy relacionados: el calor y el sonido.

Empecemos por el calor. Mucha gente confunde calor con temperatura, y son cosas distintas. La temperatura es qué tan caliente o frío está un cuerpo, se mide en grados. El calor es la energía que se transfiere de un cuerpo a otro por diferencia de temperatura. Siempre va del más caliente al más frío.

El calor se transmite de tres formas. Por conducción, cuando dos objetos están en contacto y la energía pasa de uno a otro. La cuchara de metal en la taza de té se calienta porque el metal conduce bien el calor. Por convección, cuando un fluido, líquido o gas, se mueve y lleva el calor con él. El aire caliente sube y el frío baja, eso es convección. Y por radiación, que es cuando la energía viaja en forma de ondas electromagnéticas, sin necesidad de un medio. El calor del sol nos llega por radiación, atraviesa el vacío del espacio.

Hay materiales que conducen mejor el calor que otros. Los metales son buenos conductores, por eso se usan para ollas y radiadores. La madera, el plástico y el aire son malos conductores, por eso se usan como aislantes. La ropa de abrigo funciona porque atrapa aire entre las fibras, y el aire es un muy mal conductor.

Ahora el sonido. El sonido es una onda mecánica, necesita un medio para viajar, aire, agua o algo sólido. Si no hay medio, no hay sonido. Por eso en el espacio exterior no se escucha nada, aunque exploten cosas.

El sonido se produce cuando algo vibra. Una cuerda de guitarra, las cuerdas vocales, la membrana de un parlante, todos vibran y producen ondas en el aire. Esas ondas llegan a tu oído, hacen vibrar el tímpano, y el cerebro las interpreta.

Las propiedades del sonido son la altura, si el sonido es agudo o grave, depende de la frecuencia. Los agudos tienen alta frecuencia, los graves baja. La intensidad, si el sonido es fuerte o débil, depende de la amplitud de la onda. Y el timbre, que es lo que hace que vos distingas una guitarra de un piano tocando la misma nota.

La velocidad del sonido en el aire es de unos trescientos cuarenta metros por segundo. En el agua es más rápido, unos mil quinientos metros por segundo. Por eso los animales marinos se escuchan a distancias enormes. En el acero es aún más rápido, unos cinco mil metros por segundo.

Los humanos escuchamos entre veinte y veinte mil hertz. Por encima de veinte mil están los ultrasonidos, que los perros escuchan pero nosotros no. Los murciélagos los usan para ecolocalizarse. Y por debajo de veinte están los infrasonidos, que sienten las ballenas y los elefantes para comunicarse a kilómetros.

Y un dato curioso: cuando un avión rompe la barrera del sonido, va más rápido que el sonido. La onda de choque que se forma es el estampido sónico, ese boom que escuchás. Los aviones de combate pueden hacer eso, y los autos de carrera también, con suficiente potencia.

Bueno, hasta acá calor y sonido. Espero que les haya gustado. Chau.""",

    "movimientos": """Hola, ¿cómo andan? Acá el profesor Javier Pereyra, y hoy vamos a hablar de movimiento. Un tema central de la física, y que aparece todo el tiempo en la vida cotidiana.

Decimos que un cuerpo está en movimiento cuando cambia su posición con respecto a un punto de referencia. Pero ojo, el movimiento es relativo. Si vos estás sentado en un tren, para vos estás quieto, pero para alguien afuera del tren te estás moviendo.

Para describir un movimiento usamos algunas magnitudes. La posición, que es dónde está el cuerpo en cada momento. La distancia recorrida, que es cuánto se movió. El desplazamiento, que es la distancia en línea recta entre el punto de partida y el de llegada. La velocidad, que es la distancia recorrida dividida por el tiempo. Y la aceleración, que es cómo cambia la velocidad con el tiempo.

Si la velocidad es constante, el movimiento es uniforme. Eso se llama MRU, Movimiento Rectilíneo Uniforme. Un auto en una autopista a cien kilómetros por hora constantes, sin frenar ni acelerar. La fórmula es simple: espacio es igual a velocidad por tiempo.

Si la velocidad cambia de manera constante, tenemos el MRUV, Movimiento Rectilíneo Uniformemente Variado. Un auto que acelera o frena con el pedal constante. Acá aparece la aceleración. Las fórmulas incluyen la aceleración: velocidad final es igual a velocidad inicial más aceleración por tiempo.

Y si la velocidad cambia de forma no constante, el movimiento es más complejo, y se estudia con herramientas de cálculo. Pero para primero de secundaria nos alcanza con el MRU y el MRUV.

Para analizar el movimiento se usan gráficos. El gráfico posición-tiempo muestra dónde estaba el objeto en cada momento. En el MRU, la línea es recta inclinada. En el MRUV, es una parábola. El gráfico velocidad-tiempo muestra cómo varía la velocidad. En el MRU es una línea horizontal, en el MRUV es una línea recta inclinada.

El área debajo de la curva de velocidad-tiempo te da la distancia recorrida. Y la pendiente de la curva de posición-tiempo te da la velocidad. Esas dos reglas son muy útiles para resolver problemas.

La gravedad es una causa común de aceleración. Cerca de la Tierra, todos los cuerpos caen con la misma aceleración, nueve coma ocho metros por segundo al cuadrado. Por eso si tirás una pelota desde la ventana, cada segundo su velocidad aumenta nueve coma ocho metros por segundo. Después de un segundo va a nueve coma ocho, después de dos a diecinueve coma seis, después de tres a veintinueve coma cuatro, y así.

Galileo Galilei fue el primero en estudiar esto en detalle, en el siglo diecisiete. Se dice que dejó caer dos balas de cañón, una grande y una chica, desde la torre de Pisa, y vio que llegaban al mismo tiempo. Bueno, esa historia probablemente no pasó así, pero lo que sí hizo fue experimentos con planos inclinados y descubrió que la aceleración es constante.

Y un dato final: en la Argentina, la ley de tránsito dice que la velocidad máxima en calles es de cuarenta kilómetros por hora, en avenidas de sesenta, y en rutas de hasta ciento diez. Por eso cuando ves una señal de velocidad máxima, no es un capricho, es física aplicada para que no te mates.

Bueno, esto fue movimientos. Nos vemos en la próxima. Chau.""",
}

# Agrego los 7 restantes más cortos para no extenderme infinito
GUIAS.update({
    "sistema-solar": """Hola, soy el profesor Javier Pereyra, y hoy vamos a recorrer el Sistema Solar. Nuestro barrio en la galaxia.

El Sistema Solar está formado por una estrella, el Sol, y todo lo que gira a su alrededor: ocho planetas, cinco planetas enanos, lunas, asteroides, cometas y mucho polvo cósmico. Todo se formó hace unos cuatro mil seiscientos millones de años, a partir de una nube gigante de gas y polvo que se fue achicando y formando un disco. En el centro se encendió el Sol, y en el disco se fueron juntando los planetas.

El Sol es una estrella mediana, amarilla, y concentra el noventa y nueve coma ocho por ciento de toda la masa del sistema. Es tan grande que adentro podrían entrar un millón de Tierras. En su núcleo, a quince millones de grados, los átomos de hidrógeno se fusionan para formar helio, y eso libera una cantidad enorme de energía. Eso es la fusión nuclear, la misma reacción que se quiere复制 en las centrales de fusión, pero todavía no se logra de forma controlada.

Los planetas se dividen en dos grupos. Los rocosos o terrestres, que están más cerca del Sol: Mercurio, Venus, la Tierra y Marte. Son chicos, densos, con superficie sólida. Y los gaseosos, que están más lejos: Júpiter, Saturno, Urano y Neptuno. Son enormes, hechos de gas, y tienen anillos y muchas lunas.

Mercurio es el más chico y el más cercano al Sol, con temperaturas que pasan los cuatrocientos grados de día y bajan a menos ciento ochenta de noche. Venus es el más caliente, porque tiene una atmósfera de dióxido de carbono que atrapa el calor, efecto invernadero fuera de control. La Tierra es la excepción, con agua líquida y vida. Marte es el planeta rojo, con el monte Olimpo, el volcán más grande del Sistema Solar, tres veces más alto que el Everest.

Júpiter es el más grande, con la Gran Mancha Roja, una tormenta más grande que la Tierra que lleva cientos de años activa. Saturno tiene los anillos más famosos, hechos de hielo y roca. Urano es único, gira acostado, de costado. Y Neptuno tiene los vientos más rápidos, dos mil kilómetros por hora.

La Tierra tiene una sola luna, pero es muy especial: es grande relative al planeta, estabiliza el eje terrestre y produce las mareas. El sistema Tierra-Luna es casi un planeta doble.

El Sol también se mueve. Gira alrededor del centro de la Vía Láctea, nuestra galaxia, a doscientos kilómetros por segundo. Da una vuelta completa cada doscientos veinticinco millones de años. La última vez que estuvo en esta posición, los dinosaurios estaban empezando a aparecer.

Y un dato curioso: el Voyager uno, que se lanzó en mil novecientos setenta y siete, ya salió del Sistema Solar. Es el objeto humano que más lejos llegó, y sigue transmitiendo señales desde el espacio interestelar.

Bueno, esto fue un paseo por el Sistema Solar. Chau.""",

    "seres-vivos": """Hola, ¿qué tal? El profesor Javier Pereyra por acá, y hoy vamos a hablar de los seres vivos. ¿Qué es lo que distingue a un ser vivo de algo que no lo es? A veces parece obvio, pero cuando uno lo piensa bien, hay cosas que nos hacen pensar.

Los seres vivos tienen características que comparten todos. Todos nacen, crecen, se reproducen y mueren. Todos necesitan energía para mantenerse vivos, la sacan de los alimentos, del sol o de otros seres vivos. Todos responden a los estímulos, es decir, reaccionan a la luz, al calor, al sonido, al contacto. Todos están formados por células, que son las unidades básicas de la vida.

Hay tres funciones vitales que todos los seres vivos cumplen. La nutrición, que es la forma en que obtienen materia y energía. Hay dos tipos: los autótrofos, que fabrican su propio alimento, como las plantas, que hacen fotosíntesis. Y los heterótrofos, que necesitan comer a otros seres vivos, como los animales y los hongos.

La relación es la capacidad de captar lo que pasa en el ambiente y reaccionar. Las plantas se orientan hacia la luz, los animales huyen del peligro, las bacterias se mueven hacia los nutrientes. Y la reproducción, que es la capacidad de generar nuevos individuos. Algunos se reproducen sexualmente, con dos padres, otros asexualmente, con uno solo.

Los seres vivos se clasifican en cinco reinos. El reino animal, que somos nosotros, los insectos, los peces, las aves. El reino vegetal, las plantas, los árboles, las flores. El reino fungi, los hongos, las levaduras, los mohos. El reino protista, que es un cajón de sastre con algas y protozoos. Y el reino monera, que son las bacterias, los organismos más chicos y más abundantes del planeta.

Las células pueden ser de dos tipos. Las procariotas, que son las de las bacterias, son chicas, no tienen núcleo, el material genético está disperso. Y las eucariotas, que son las de todos los demás, son más grandes y tienen núcleo, donde está guardado el ADN.

Todos los seres vivos están formados por los mismos elementos químicos: carbono, hidrógeno, oxígeno, nitrógeno, fósforo y azufre. El carbono es especial, porque puede formar cadenas larguísimas, y eso es la base de las moléculas orgánicas, las proteínas, los ácidos nucleicos, los azúcares, las grasas.

Y un dato: hay más bacterias en tu cuerpo que células humanas. Se estima que por cada célula tuya hay diez bacterias. La mayoría viven en el intestino y nos ayudan a digerir. Sin ellas no podríamos vivir.

Bueno, esto fueron los seres vivos. Si quieren saber más, miren las clases de la unidad. Chau.""",

    "plantas": """Hola, soy Javier Pereyra, y hoy les voy a hablar de las plantas. Los seres vivos más importantes del planeta, porque son los que fabrican el alimento que mantiene a casi todo el resto.

Las plantas son autótrofas, eso significa que fabrican su propio alimento. ¿Cómo lo hacen? Con la fotosíntesis, un proceso que ocurre en las hojas, en unos organitos verdes llamados cloroplastos. Las plantas toman dióxido de carbono del aire, agua del suelo, y con la energía del sol transforman todo eso en glucosa, que es su comida, y oxígeno, que largan al aire. La fórmula es: seis moléculas de dióxido de carbono más seis de agua, con luz solar, da una molécula de glucosa más seis de oxígeno. Simple y genial.

Por eso las plantas son verdes: tienen un pigmento llamado clorofila, que es el que absorbe la luz del sol, sobre todo la roja y la azul, y refleja la verde. La clorofila es la clave de la fotosíntesis.

Las partes de una planta son la raíz, que absorbe agua y nutrientes del suelo y los lleva hasta el tallo. El tallo, que sostiene la planta y transporta la savia. Las hojas, donde se hace la fotosíntesis. Las flores, que son el órgano reproductor. Y los frutos, que contienen las semillas.

Hay dos tipos de plantas. Las vasculares, que tienen vasos conductores de savia, son las más abundantes: helechos, coníferas, plantas con flor. Y las no vasculares, que no tienen vasos, como los musgos, que necesitan estar siempre húmedos.

La reproducción de las plantas puede ser sexual, con flores y semillas, o asexual, por estolones, esquejes, bulbos. Las flores tienen partes masculinas, los estambres, donde se produce el polen, y partes femeninas, el pistilo, donde están los óvulos. La polinización es el paso del polen desde el estambre al pistilo, y puede ser por el viento, por el agua, por los insectos, sobre todo las abejas, o por otros animales como los murciélagos y los colibríes.

Después de la polinización, el óvulo fecundado se transforma en semilla, y el ovario de la flor se transforma en fruto. El fruto protege a la semilla y ayuda a dispersarla. Hay frutos carnosos, como la manzana, que atraen animales que comen el fruto y defecan las semillas lejos. Y frutos secos, como el girasol, que se caen al piso.

Hay plantas de todo tipo. Las carnívoras, como la drosera, que atrapan insectos para obtener nitrógeno. Las epífitas, como las orquídeas, que viven sobre otras plantas pero no son parásitas. Los árboles, que pueden vivir miles de años, como las secuoyas, que pasan los tres mil años. Y las que viven un año, llamadas anuales, como el trigo y el maíz.

Y un dato curioso: la fotosíntesis produce casi todo el oxígeno que respirás. Gracias a las plantas, el aire tiene veintiún por ciento de oxígeno, lo que permite la vida animal. Sin plantas, la atmósfera sería irrespirable.

Bueno, hasta acá las plantas. Chau.""",

    "animales": """Hola, ¿qué tal? El profesor Javier Pereyra, y hoy vamos a hablar de los animales. Los seres vivos más diversos del planeta, con más de un millón y medio de especies conocidas, y se cree que faltan muchas por descubrir.

Los animales son eucariotas, pluricelulares, y todos heterótrofos, o sea que necesitan comer a otros seres vivos para obtener energía. La gran mayoría se mueve, aunque hay algunos, como las esponjas, que viven fijas en el fondo del mar. Y todos tienen células especializadas: nerviosas, musculares, digestivas, reproductoras.

Los animales se dividen en dos grandes grupos. Los invertebrados, que no tienen columna vertebral, y son la mayoría. Y los vertebrados, que sí tienen columna vertebral, y son los peces, anfibios, reptiles, aves y mamíferos.

Dentro de los invertebrados hay muchísimos tipos. Los artrópodos, que son los insectos, arácnidos, crustáceos y miriápodos. Son los más diversos, representan más del ochenta por ciento de todas las especies animales conocidas. Tienen el cuerpo segmentado, patas articuladas y un esqueleto externo, el exoesqueleto, que los protege. Los moluscos, como los caracoles, las almejas, los pulpos. Los equinodermos, como las estrellas de mar y los erizos. Los gusanos, las medusas, las esponjas, las lombrices, y muchos más.

Los vertebrados son los que más conocemos. Los peces viven en el agua, respiran por branquias, tienen escamas y aletas. Hay peces óseos, como la merluza, y cartilaginosos, como el tiburón. Los anfibios, como las ranas y los sapos, empiezan la vida en el agua con branquias, y de adultos viven en la tierra con pulmones. Los reptiles, como las lagartijas, las serpientes, las tortugas, los cocodrilos, tienen la piel seca con escamas y ponen huevos con cáscara. Las aves tienen plumas, picos, ponen huevos, y la mayoría vuelan. Y los mamíferos tienen pelo, dan leche a sus crías, y respiran con pulmones. Ahí estamos nosotros.

Los animales se pueden clasificar también por lo que comen. Los herbívoros comen plantas, como las vacas, los conejos, las jirafas. Los carnívoros comen otros animales, como los leones, las águilas, los tiburones. Los omnívoros comen de todo, como los osos, los chanchos, los humanos.

Y los animales cumplen roles muy importantes en los ecosistemas. Los polinizadores, como las abejas, permiten la reproducción de las plantas. Los descomponedores, como los hongos y las lombrices, reciclan la materia orgánica. Los depredadores regulan las poblaciones de otros animales. Y los herbívoros dispersan semillas.

En la Argentina tenemos fauna increíble. En la Patagonia, guanacos, cóndores, ballenas francas. En el Noroeste, vicuñas, llamas, cóndores. En la selva misionera, yaguaretés, tucanes, monos caí. En las Pampas, ñandúes, vizcachas, ciervos de los pantanos. Y en la Antártida Argentina, pingüinos, focas, ballenas.

Bueno, esto fueron los animales. Si quieren saber más de la fauna local, hay una clase específica en la página. Chau.""",
})

# Sigo con los 4 restantes
GUIAS.update({
    "digestion": """Hola, soy el profesor Javier Pereyra, y hoy les voy a contar el camino que hace la comida desde que entra a tu boca hasta que se convierte en lo que tu cuerpo necesita. Eso es la digestión.

El sistema digestivo es un tubo largo que va desde la boca hasta el ano, mide unos nueve metros. A lo largo de ese tubo, la comida se va rompiendo en pedazos cada vez más chicos, hasta que queda en moléculas tan pequeñas que pueden pasar a la sangre.

El proceso empieza en la boca. Los dientes muerden, cortan y trituran la comida, y la lengua la mezcla con la saliva. La saliva tiene una enzima que se llama amilasa salival, que empieza a digerir los almidones, que son los azúcares complejos. Después tragas, y la comida baja por el esófago, que es un tubo de veinticinco centímetros. No cae por gravedad, sino que los músculos del esófago se contraen en ondas, lo que se llama peristaltismo, y empujan la comida hacia abajo. Por eso podés tragar incluso cabeza abajo.

Después llega al estómago, que es una bolsa muscular con ácido clorhídrico. El ácido es tan fuerte que podría disolver una hoja de afeitar. Junto con las enzimas gástricas, transforma la comida en una pasta ácida llamada quimo. El estómago puede contener hasta un litro y medio de comida, y tarda entre dos y cuatro horas en vaciarse.

Después de eso, la pasta pasa al intestino delgado, que mide unos seis metros. Ahí es donde pasa la magia. El páncreas vuelca enzimas, y el hígado vuelca bilis, que es la que ayuda a digerir las grasas. Las paredes del intestino están cubiertas de unas vellosidades chiquititas que se llaman vellosidades intestinales, que aumentan la superficie de absorción. Toda esa superficie, desplegada, equivale a la de una cancha de tenis.

En el intestino delgado se absorben los nutrientes: los azúcares simples, los aminoácidos, las vitaminas, los minerales, las grasas digeridas. Todo eso pasa a la sangre, que lo lleva a todas las células del cuerpo.

Lo que no se absorbe, pasa al intestino grueso, que mide un metro y medio. Ahí se absorbe el agua y las sales minerales, y lo que queda se compacta hasta formar las heces. El intestino grueso tiene muchas bacterias, que forman la flora intestinal, y que nos ayudan a digerir algunas cosas que nuestro cuerpo no puede, como la fibra.

Y un dato importante: la saliva, el ácido del estómago, la bilis del hígado, los jugos del páncreas, todo eso se llama jugos digestivos. Y el conjunto de todos ellos es lo que permite que la comida se transforme en nutrientes que el cuerpo puede usar.

Y un dato final: el sistema digestivo tiene un sistema nervioso propio, el sistema entérico, que a veces se llama el segundo cerebro. Tiene más neuronas que la médula espinal. Por eso sentís mariposas en el estómago cuando estás nervioso, o se te cierra el estómago cuando tenés miedo.

Bueno, hasta acá la digestión. Chau.""",

    "circulacion": """Hola, soy Javier Pereyra, y hoy les voy a hablar del sistema circulatorio. La red de transporte que lleva oxígeno, nutrientes y otras sustancias a cada célula del cuerpo, y trae de vuelta lo que ya no sirve.

El sistema circulatorio tiene tres componentes principales. El corazón, que es la bomba. Los vasos sanguíneos, que son los tubos por donde circula la sangre. Y la sangre misma, que es el líquido que transporta todo.

El corazón es un músculo del tamaño de un puño cerrado, y late unas cien mil veces por día, unas tres mil millones de veces en una vida. Tiene cuatro cavidades: dos aurículas, arriba, y dos ventrículos, abajo. Lado derecho e izquierdo. La sangre llega por las aurículas y sale por los ventrículos.

Hay dos circuitos. La circulación pulmonar, que va del corazón a los pulmones y vuelve. La sangre pobre en oxígeno llega al corazón por la aurícula derecha, pasa al ventrículo derecho, y se bombea a los pulmones. En los pulmones, la sangre suelta el dióxido de carbono, toma oxígeno, y vuelve al corazón por la aurícula izquierda.

Después, la circulación sistémica lleva la sangre rica en oxígeno al resto del cuerpo. La sangre sale del ventrículo izquierdo por la arteria aorta, que es la arteria más grande, y desde ahí se va ramificando en arterias cada vez más chicas, hasta llegar a los capilares, que son tubos finitos que están en contacto directo con las células. Ahí se suelta el oxígeno y los nutrientes, y se toma el dióxido de carbono y los desechos. Después la sangre vuelve al corazón por las venas.

Los vasos sanguíneos son de tres tipos. Las arterias, que llevan sangre desde el corazón, son gruesas y elásticas, y se nota el pulso. Las venas, que traen sangre de vuelta, tienen válvulas que evitan que la sangre se vuelva para abajo, sobre todo en las piernas. Y los capilares, que son tan finitos que los glóbulos rojos pasan en fila de a uno.

La sangre está formada por un líquido, el plasma, y tres tipos de células. Los glóbulos rojos, que llevan oxígeno gracias a una proteína llamada hemoglobina, que es roja porque tiene hierro. Los glóbulos blancos, que defienden al cuerpo de infecciones. Y las plaquetas, que ayudan a que la sangre se coagule cuando te cortás.

En un adulto hay unos cinco litros de sangre, y el corazón late unas setenta veces por minuto en reposo. Cuando hacés ejercicio, late más rápido, hasta ciento ochenta o más por minuto, para llevar más oxígeno a los músculos.

Y un dato curioso: si pusieras todos los vasos sanguíneos de un adulto en línea, llegarían a dar dos veces y media la vuelta a la Tierra. Cien mil kilómetros de cañerías internas. Impresionante.

El sistema circulatorio está conectado con el respiratorio, porque sin oxígeno la sangre no sirve, y con el digestivo, porque sin nutrientes tampoco. Todo está conectado en el cuerpo. Por eso cuando hacés ejercicio, no solo trabajan los músculos, también el corazón, los pulmones, los vasos sanguíneos, todo el cuerpo en equipo.

Bueno, hasta acá la circulación. Chau.""",

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

Bueno, hasta acá la respiración. Chau.""",

    "alimentacion": """Hola, soy Javier Pereyra, y hoy les voy a hablar de alimentación saludable. Algo clave no solo para la biología, sino para la vida misma.

El cuerpo humano necesita unos cuarenta nutrientes diferentes para funcionar. Ningún alimento solo los tiene todos. Por eso hay que comer variado.

Los nutrientes se dividen en dos grandes grupos. Los macronutrientes, que se necesitan en grandes cantidades: proteínas, carbohidratos y grasas. Y los micronutrientes, que se necesitan en pequeñas cantidades pero son esenciales: vitaminas y minerales.

Las proteínas son los ladrillos del cuerpo. Construyen músculos, piel, pelo, uñas, anticuerpos, enzimas. Están formadas por aminoácidos. Hay veinte aminoácidos, y ocho de ellos son esenciales, o sea que el cuerpo no los puede fabricar y tiene que obtenerlos de la comida. Las proteínas están en la carne, el pescado, los huevos, los lácteos, las legumbres.

Los carbohidratos son la principal fuente de energía. Los simples, como el azúcar, dan energía rápida pero se gastan pronto. Los complejos, como los almidones, dan energía más sostenida. Están en el pan, la pasta, el arroz, la papa, las legumbres.

Las grasas también dan energía, el doble que los carbohidratos, y son necesarias para absorber ciertas vitaminas. Pero hay grasas buenas, las insaturadas, que están en el aceite de oliva, los frutos secos, el pescado, y grasas malas, las saturadas y trans, que están en la manteca, la fritura, la comida chatarra, y que en exceso tapan las arterias.

Las vitaminas son necesarias en cantidades chiquitas pero son esenciales. La vitamina A, para la vista, está en la zanahoria, el zapallo, la espinaca. La vitamina C, para las defensas, está en el citrus, el kiwi, el pimiento. La vitamina D, para los huesos, se fabrica con la luz del sol. Las del grupo B, para el sistema nervioso, están en los cereales integrales, las legumbres, la carne.

Los minerales también son esenciales. El calcio, para los huesos, está en la leche, el queso, las verduras de hoja. El hierro, para la sangre, está en la carne, las legumbres, la espinaca. El potasio, para los músculos, está en la banana, la papa, los tomates.

Y el agua. Sesenta por ciento del cuerpo es agua. Hay que tomar entre un litro y medio y dos litros por día, más si hace calor o hacés ejercicio.

La OMS recomienda una alimentación variada, con predominio de frutas, verduras, legumbres, cereales integrales, y poca carne roja, poca azúcar agregada, poca sal, pocas grasas saturadas. Un buen patrón es el plato ideal: mitad del plato con verduras y frutas, un cuarto con proteínas, un cuarto con carbohidratos, y agua como bebida.

Y un dato importante: la alimentación no es solo nutrirse, también es un acto social y cultural. Comer en familia, compartir la mesa, disfrutar de la comida, todo eso es parte de estar sanos. Y la ESI, la Educación Sexual Integral, habla también de los cuerpos, de la imagen corporal, de los estereotipos. Comer sano no es seguir una moda, es respetar al propio cuerpo.

Bueno, hasta acá la alimentación. Chau, y cuídense.""",
})

async def gen(text, path):
    communicate = edge_tts.Communicate(text, VOICE, rate=RATE)
    await communicate.save(path)
    print(f"OK: {os.path.basename(path)}")

async def main():
    tasks = []
    for fname, text in GUIAS.items():
        out_path = os.path.join(OUT_DIR, fname + ".mp3")
        tasks.append(gen(text, out_path))
    await asyncio.gather(*tasks)
    print(f"\n{len(tasks)} audios generados en {OUT_DIR}")

if __name__ == "__main__":
    asyncio.run(main())
