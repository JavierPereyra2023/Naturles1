/* Banco de quizzes — Ciencias Naturales 1° año
   Formato pregunta: [texto, [opciones], índiceCorrecto, feedback, dificultad?]
   dificultad: 0 inicial · 1 intermedio · 2 desafío
*/
const QUIZ_LESSONS = {
  materia: '../unidades/quimica/materia-propiedades/index.html',
  mezclas: '../unidades/quimica/mezclas/index.html',
  agua: '../unidades/quimica/agua/index.html',
  energia: '../unidades/fisica/energia/index.html',
  'calor-sonido': '../unidades/fisica/calor-sonido/index.html',
  movimientos: '../unidades/fisica/movimientos/index.html',
  'sistema-solar': '../unidades/fisica/sistema-solar/index.html',
  'seres-vivos': '../unidades/biologia/seres-vivos/index.html',
  celulas: '../unidades/biologia/celulas/index.html',
  ecologia: '../unidades/biologia/ecologia/index.html',
  plantas: '../unidades/biologia/plantas/index.html',
  animales: '../unidades/biologia/animales/index.html',
  'cuerpo-humano': '../unidades/biologia/cuerpo-humano/index.html'
};

const RAW = {
  materia: {
    area: 'quimica', title: 'Materia y propiedades', icon: 'lucide:scale',
    topics: ['Propiedades de la materia', 'Medición', 'Clasificación'],
    questions: [
      ['¿Cuál es una propiedad extensiva?', ['Densidad', 'Masa', 'Color', 'Solubilidad'], 1, 'La masa depende de la cantidad de material.', 0],
      ['¿Qué instrumento permite medir el volumen de un líquido?', ['Balanza', 'Termómetro', 'Probeta', 'Regla'], 2, 'La probeta graduada se usa para medir volumen.', 0],
      ['¿Qué propiedad puede percibirse con los sentidos?', ['Olor', 'Conductividad', 'Masa', 'Punto de ebullición'], 0, 'El olor es una propiedad organoléptica.', 0],
      ['Dos objetos ocupan el mismo volumen, pero uno tiene más masa. ¿Cuál es más denso?', ['El de menor masa', 'El de mayor masa', 'Ambos siempre tienen la misma densidad', 'No se puede comparar'], 1, 'A igual volumen, mayor masa implica mayor densidad.', 1],
      ['¿Cuál es una unidad adecuada para medir la masa de una manzana?', ['Kilogramo o gramo', 'Litro', 'Metro cuadrado', 'Grado Celsius'], 0, 'La masa se expresa habitualmente en gramos o kilogramos.', 0],
      ['Una propiedad intensiva se caracteriza porque...', ['Depende de la cantidad de materia', 'No depende de la cantidad de materia', 'Solo se mide con una balanza', 'Siempre es visible'], 1, 'La densidad y la temperatura son ejemplos de propiedades intensivas.', 1],
      ['La dureza de un material indica...', ['Cuánto pesa', 'Cuánto resiste ser rayado', 'Su color', 'Si flota en el agua'], 1, 'La dureza se relaciona con la resistencia a ser rayado o deformado.', 1],
      ['Si un material conduce bien el calor, es un buen...', ['Aislante térmico', 'Conductor térmico', 'Filtro de luz', 'Disolvente'], 1, 'Los metales suelen ser buenos conductores del calor y de la electricidad.', 1],
      ['Para comparar si un objeto flota en agua conviene conocer su...', ['Color', 'Densidad', 'Olor', 'Forma únicamente'], 1, 'Si su densidad es menor que la del agua, tiende a flotar.', 2],
      ['Registramos datos en una tabla porque...', ['Queda más bonito', 'Organiza observaciones y permite comparar', 'Reemplaza a la medición', 'Evita pensar hipótesis'], 1, 'Las tablas ayudan a ordenar mediciones y hallar patrones.', 1]
    ]
  },
  mezclas: {
    area: 'quimica', title: 'Mezclas', icon: 'lucide:blend',
    topics: ['Tipos de mezclas', 'Separación de mezclas', 'Aplicaciones'],
    questions: [
      ['Una mezcla de agua y sal es...', ['Heterogénea', 'Homogénea', 'Sustancia pura', 'Elemento'], 1, 'La sal se disuelve y forma una sola fase visible.', 0],
      ['¿Qué método separa arena del agua?', ['Filtración', 'Destilación', 'Imantación', 'Cromatografía'], 0, 'El filtro retiene la arena y deja pasar el agua.', 0],
      ['Para separar limaduras de hierro y arena se usa...', ['Decantación', 'Evaporación', 'Un imán', 'Tamizado'], 2, 'El hierro es atraído por el imán.', 0],
      ['Una ensalada con aceite, agua y verduras es una mezcla...', ['Homogénea', 'Heterogénea', 'Una sustancia pura', 'Un elemento'], 1, 'Se distinguen varias fases o componentes.', 0],
      ['Para obtener la sal del agua salada se puede usar...', ['Evaporación', 'Imantación', 'Filtración', 'Tamizado'], 0, 'Al evaporarse el agua, la sal queda como residuo.', 1],
      ['La filtración permite separar...', ['Un sólido insoluble de un líquido', 'Dos líquidos miscibles', 'Dos gases', 'Una sustancia pura en sus elementos'], 0, 'El filtro retiene el sólido insoluble y deja pasar el líquido.', 1],
      ['En una solución, el componente que está en mayor proporción suele llamarse...', ['Soluto', 'Solvente', 'Precipitado', 'Coloide'], 1, 'En agua salada, el agua es el solvente y la sal el soluto.', 1],
      ['El tamizado se usa cuando los componentes sólidos tienen...', ['El mismo color', 'Distinto tamaño de partícula', 'La misma masa', 'Igual densidad siempre'], 1, 'El tamiz deja pasar las partículas más chicas y retiene las grandes.', 1],
      ['Aceite y agua juntos forman una mezcla heterogénea porque...', ['Se mezclan en una sola fase', 'Se ven dos fases que no se disuelven bien', 'Son el mismo material', 'No tienen masa'], 1, 'Son inmiscibles: se separan en capas.', 1],
      ['Para separar dos líquidos con distinto punto de ebullición conviene...', ['Destilación', 'Tamizado', 'Imantación', 'Solo un embudo sin calentar'], 0, 'La destilación aprovecha que hierven a distintas temperaturas.', 2]
    ]
  },
  agua: {
    area: 'quimica', title: 'Agua', icon: 'lucide:droplets',
    topics: ['Propiedades del agua', 'Ciclo del agua', 'Cuidado del agua'],
    questions: [
      ['El proceso que vuelve apta el agua para beber se llama...', ['Evaporación', 'Potabilización', 'Fusión', 'Filtración solar'], 1, 'Potabilizar elimina o reduce riesgos para la salud.', 0],
      ['El agua líquida se convierte en vapor por...', ['Condensación', 'Solidificación', 'Evaporación', 'Precipitación'], 2, 'La evaporación es el paso de líquido a gas.', 0],
      ['Cuidar el agua es importante porque...', ['Es infinita', 'No tiene usos industriales', 'Es un bien vital y un derecho', 'No participa en ecosistemas'], 2, 'Es esencial para la vida, la salud y los ecosistemas.', 0],
      ['En la potabilización, la desinfección busca principalmente...', ['Agregar nutrientes', 'Reducir microorganismos peligrosos', 'Aumentar la salinidad', 'Congelar el agua'], 1, 'La desinfección reduce microorganismos que pueden causar enfermedades.', 1],
      ['¿Cuál es una acción responsable para ahorrar agua?', ['Dejar la canilla abierta', 'Reparar pérdidas y cerrar la canilla', 'Usar agua potable para limpiar veredas siempre', 'Volcar residuos al río'], 1, 'Reparar pérdidas y evitar usos innecesarios reduce el consumo.', 0],
      ['La condensación ocurre cuando el agua pasa de...', ['Sólido a líquido', 'Líquido a gas', 'Gas a líquido', 'Líquido a sólido'], 2, 'El vapor se enfría y forma gotas de agua líquida.', 1],
      ['En el ciclo del agua, las nubes se relacionan con...', ['Solo solidificación del suelo', 'Condensación del vapor en la atmósfera', 'Fusión del hierro', 'Destilación del petróleo'], 1, 'El vapor se condensa y forma gotitas que componen las nubes.', 1],
      ['El agua del río Reconquista es un ejemplo de recurso que...', ['Nunca se contamina', 'Requiere cuidado ambiental y gestión comunitaria', 'Solo sirve para nadar', 'No forma parte de la cuenca local'], 1, 'Los ríos locales se ven afectados por basura y efluentes: cuidarlos es responsabilidad colectiva.', 1],
      ['El hielo flota en el agua líquida porque...', ['Es más denso', 'Es menos denso que el agua líquida', 'No tiene masa', 'Está caliente'], 1, 'El hielo tiene menor densidad que el agua líquida a 4 °C.', 2],
      ['Tirar aceite o pintura al desagüe es problemático porque...', ['Limpia las cañerías', 'Contamina agua que después hay que tratar', 'Ayuda a la potabilización', 'No llega a ríos ni plantas de tratamiento'], 1, 'Esos residuos dificultan el tratamiento y dañan ecosistemas acuáticos.', 1]
    ]
  },
  energia: {
    area: 'fisica', title: 'Energía', icon: 'lucide:zap',
    topics: ['Formas de energía', 'Transformaciones', 'Conservación', 'Fuentes renovables', 'Fuentes no renovables', 'Energía en Argentina'],
    questions: [
      ['La energía asociada al movimiento es...', ['Térmica', 'Cinética', 'Química', 'Nuclear'], 1, 'Un objeto que se mueve posee energía cinética.', 0],
      ['En una linterna, la energía química de la pila se transforma principalmente en...', ['Luz', 'Masa', 'Sonido solamente', 'Materia'], 0, 'La pila permite producir energía eléctrica que se convierte en luz.', 0],
      ['La unidad de energía del Sistema Internacional es...', ['Metro', 'Joule', 'Newton', 'Litro'], 1, 'El joule (J) es la unidad de energía.', 0],
      ['Cuando una lámpara se enciende, parte de la energía eléctrica se transforma en...', ['Luz y calor', 'Masa', 'Agua', 'Gravedad'], 0, 'Ninguna transformación es perfectamente eficiente: también suele liberarse calor.', 1],
      ['Un objeto ubicado a cierta altura posee energía...', ['Cinética únicamente', 'Potencial gravitatoria', 'Sonora únicamente', 'Química únicamente'], 1, 'La altura respecto de una referencia permite asociar energía potencial gravitatoria.', 0],
      ['La energía se conserva cuando...', ['Desaparece por completo', 'Se transforma o transfiere sin crearse ni destruirse', 'Solo queda en los seres vivos', 'No hay movimiento'], 1, 'La energía puede cambiar de forma y transferirse, pero la cantidad total se conserva.', 1],
      ['Un resorte comprimido almacena principalmente energía...', ['Elástica', 'Sonora', 'Nuclear', 'Luminosa'], 0, 'Al deformarse elásticamente, el resorte guarda energía potencial elástica.', 1],
      ['En una rampa, al bajar un carrito la energía potencial se transforma en...', ['Cinética (y algo de calor por fricción)', 'Solo masa', 'Solo color', 'Nada: desaparece'], 0, 'Al bajar gana velocidad; parte se disipa por fricción como calor.', 1],
      ['El kWh que aparece en la boleta de luz mide...', ['Masa de electrones', 'Energía eléctrica consumida', 'Temperatura de la casa', 'Velocidad de la corriente'], 1, 'Es una unidad de energía usada en el consumo doméstico.', 2],
      ['Una fuente renovable de energía es...', ['El sol (energía solar)', 'El carbón siempre', 'El petróleo únicamente', 'El gas natural solo'], 0, 'La energía solar se renueva a escala humana; los combustibles fósiles no.', 1],
      ['Los paneles fotovoltaicos convierten principalmente...', ['Luz solar en energía eléctrica', 'Viento en energía química', 'Calor terrestre en petróleo', 'Mareas en carbón'], 0, 'El efecto fotovoltaico permite transformar la radiación solar en corriente eléctrica.', 0],
      ['En un aerogenerador, la energía cinética del viento se transforma primero en...', ['Movimiento de las aspas y del eje', 'Energía nuclear', 'Combustible líquido', 'Agua potable'], 0, 'El viento hace girar las palas y ese movimiento acciona el generador.', 1],
      ['Una central hidroeléctrica aprovecha principalmente...', ['La energía potencial y cinética del agua', 'La combustión del carbón', 'La radiación de la Luna', 'La energía química del uranio'], 0, 'El agua ubicada a cierta altura adquiere energía potencial y al caer mueve turbinas.', 0],
      ['La energía mareomotriz se caracteriza porque utiliza...', ['El movimiento periódico de las mareas', 'La descomposición de residuos', 'La combustión de gas natural', 'La luz de las estrellas'], 0, 'Las mareas producen corrientes y diferencias de altura que pueden mover turbinas.', 1],
      ['La energía geotérmica aprovecha...', ['El calor interno de la Tierra', 'La energía química del carbón', 'La luz reflejada por la Luna', 'El movimiento de los automóviles'], 0, 'El calor del subsuelo puede utilizarse para calefacción o para generar electricidad.', 0],
      ['La biomasa puede producir energía a partir de...', ['Residuos orgánicos y agrícolas', 'Rocas sin materia orgánica', 'Agua destilada solamente', 'Luz sin ningún material'], 0, 'El bagazo, los residuos forestales y otros materiales orgánicos pueden transformarse en energía.', 0],
      ['¿Cuál de estas fuentes es un combustible fósil líquido?', ['Petróleo', 'Energía solar', 'Energía eólica', 'Energía mareomotriz'], 0, 'El petróleo se formó a partir de materia orgánica durante millones de años.', 1],
      ['Durante su combustión, el carbón suele generar...', ['Emisiones de dióxido de carbono y otros contaminantes', 'Solo vapor de agua', 'Radiación solar', 'Oxígeno en grandes cantidades'], 0, 'El carbón es un combustible fósil con elevadas emisiones y contaminantes atmosféricos.', 1],
      ['El gas natural está compuesto principalmente por...', ['Metano', 'Oxígeno', 'Hierro', 'Cloruro de sodio'], 0, 'El metano es el componente principal del gas natural.', 0],
      ['En una central nuclear, la fisión del uranio produce principalmente...', ['Calor que luego se usa para generar electricidad', 'Viento que mueve aspas', 'Biomasa para combustión', 'Mareas artificiales'], 0, 'La fisión libera calor; ese calor produce vapor que mueve turbinas.', 1]
    ]
  },
  'calor-sonido': {
    area: 'fisica', title: 'Calor, luz y sonido', icon: 'lucide:waveform',
    topics: ['Calor', 'Sonido', 'Luz'],
    questions: [
      ['El calor se transfiere espontáneamente desde...', ['Menor a mayor temperatura', 'Mayor a menor temperatura', 'El vacío al Sol', 'Un objeto sin energía'], 1, 'El intercambio ocurre del cuerpo más caliente al más frío.', 0],
      ['El sonido necesita para propagarse...', ['Un medio material', 'Luz solar', 'Ausencia de materia', 'Solo agua'], 0, 'El sonido no se propaga en el vacío.', 0],
      ['La luz blanca puede descomponerse en colores con...', ['Un prisma', 'Un imán', 'Un filtro de café', 'Una balanza'], 0, 'El prisma desvía cada color de manera diferente.', 0],
      ['En una habitación, el calor pasa espontáneamente de...', ['La pared fría al aire caliente', 'El cuerpo más caliente al más frío', 'La sombra al Sol', 'Un objeto vacío a otro'], 1, 'La transferencia espontánea ocurre por diferencia de temperatura.', 0],
      ['Una guitarra produce sonido cuando...', ['Sus cuerdas vibran', 'Sus cuerdas se derriten', 'Absorbe toda la luz', 'No hay medio material'], 0, 'La vibración de la cuerda produce una perturbación que se propaga por el aire.', 0],
      ['Un material transparente permite principalmente que la luz...', ['Lo atraviese y podamos ver a través de él', 'Desaparezca', 'Se convierta en sonido siempre', 'Se vuelva materia'], 0, 'El vidrio limpio es un ejemplo de material transparente.', 0],
      ['Calentar agua en una cacerola metálica implica conducción porque...', ['El calor viaja por el metal por contacto', 'No hay diferencia de temperatura', 'El sonido hierve el agua', 'La luz se convierte en masa'], 0, 'La conducción transfiere energía térmica por contacto entre partículas.', 1],
      ['La convección en un líquido ocurre cuando...', ['Hay movimiento de fluidos por diferencias de temperatura', 'Solo hay un sólido rígido', 'No hay gravedad ni calor', 'La luz se refleja'], 0, 'El fluido caliente sube y el frío baja, formando corrientes.', 1],
      ['En el vacío del espacio, un astronauta no oiría una explosión cercana porque...', ['El sonido no se propaga sin medio material', 'La luz no existe', 'No hay energía', 'Las explosiones no emiten ondas'], 0, 'Sin aire u otro medio, las ondas sonoras no viajan.', 2],
      ['Un objeto negro al sol se calienta más que uno blanco porque...', ['Absorbe más radiación', 'Refleja toda la luz', 'No tiene temperatura', 'Emite solo sonido'], 0, 'Las superficies oscuras absorben más energía radiante.', 1]
    ]
  },
  movimientos: {
    area: 'fisica', title: 'Movimientos', icon: 'lucide:move-right',
    topics: ['MRU', 'Gráficos', 'Rapidez y aceleración'],
    questions: [
      ['En un MRU la velocidad es...', ['Variable', 'Constante', 'Siempre cero', 'Negativa'], 1, 'En el movimiento rectilíneo uniforme la velocidad no cambia.', 0],
      ['En un gráfico posición-tiempo, una línea horizontal indica...', ['Reposo', 'Aceleración', 'Caída libre', 'Más masa'], 0, 'La posición no cambia con el tiempo.', 0],
      ['Si un auto aumenta su velocidad, su movimiento es...', ['Uniforme', 'Acelerado', 'Estático', 'Circular necesariamente'], 1, 'Cambiar la velocidad implica aceleración.', 0],
      ['En un gráfico velocidad-tiempo, una línea horizontal indica...', ['Velocidad constante', 'Reposo siempre', 'Aceleración creciente', 'Cambio de trayectoria'], 0, 'La velocidad permanece constante cuando no cambia con el tiempo.', 1],
      ['La pendiente de un gráfico posición-tiempo representa...', ['La masa', 'La velocidad', 'La temperatura', 'El volumen'], 1, 'La variación de posición por unidad de tiempo es la velocidad.', 1],
      ['Si un ciclista recorre 120 m en 20 s, su rapidez media es...', ['2 m/s', '6 m/s', '20 m/s', '140 m/s'], 1, 'Rapidez media = distancia / tiempo = 120 m / 20 s = 6 m/s.', 1],
      ['En un MRUV con aceleración constante, el gráfico v-t es...', ['Una recta con pendiente', 'Un círculo', 'Siempre un punto', 'Una parábola de posición invertida'], 0, 'La velocidad cambia de forma uniforme: la gráfica v-t es una recta inclinada.', 2],
      ['Un objeto en reposo tiene rapidez...', ['Máxima', 'Cero', 'Infinita', 'Igual a su masa'], 1, 'Si no se desplaza, su rapidez es 0.', 0],
      ['La unidad de aceleración en el SI es...', ['m/s²', 'kg', 'Joule', 'litro'], 0, 'Aceleración = variación de velocidad / tiempo → m/s por segundo.', 1],
      ['Si en un gráfico x-t la recta es más inclinada, el móvil...', ['Va más lento', 'Va más rápido (mayor rapidez)', 'Está detenido', 'Tiene más masa'], 1, 'Mayor pendiente en x-t significa mayor velocidad.', 1]
    ]
  },
  'sistema-solar': {
    area: 'fisica', title: 'Sistema Solar', icon: 'lucide:orbit',
    topics: ['Sistema Solar', 'Movimientos terrestres', 'Modelos'],
    questions: [
      ['La estrella central del Sistema Solar es...', ['La Luna', 'Júpiter', 'El Sol', 'La Tierra'], 2, 'El Sol es la estrella alrededor de la cual orbitan los planetas.', 0],
      ['La rotación de la Tierra produce principalmente...', ['Las estaciones', 'El día y la noche', 'Los eclipses', 'Las mareas'], 1, 'La Tierra gira sobre su eje aproximadamente cada 24 horas.', 0],
      ['Un modelo a escala sirve para...', ['Copiar exactamente la realidad', 'Representar proporciones de forma simplificada', 'Eliminar distancias', 'Cambiar las órbitas'], 1, 'Los modelos ayudan a estudiar sistemas enormes o complejos.', 0],
      ['La traslación de la Tierra alrededor del Sol se relaciona principalmente con...', ['Las estaciones junto con la inclinación del eje', 'El día y la noche', 'Las fases de la Luna únicamente', 'Los terremotos'], 0, 'Las estaciones se explican por la traslación y la inclinación del eje terrestre.', 1],
      ['La Luna brilla porque...', ['Produce luz como una estrella', 'Refleja luz del Sol', 'Tiene fuego en su superficie', 'Absorbe la oscuridad'], 1, 'La Luna no es una estrella: vemos luz solar reflejada en su superficie.', 0],
      ['Los planetas interiores son, en general...', ['Rocosos y cercanos al Sol', 'Gaseosos y más lejanos', 'Todos satélites', 'Cometas con cola'], 0, 'Mercurio, Venus, Tierra y Marte son planetas rocosos interiores.', 1],
      ['En los polos hay meses de noche polar porque...', ['El Sol se apaga', 'La inclinación del eje deja zonas sin luz solar directa por un tiempo', 'La Luna tapa el Sol siempre', 'No hay atmósfera'], 1, 'La inclinación del eje hace que un polo quede en sombra durante parte del año.', 2],
      ['Un satélite natural de la Tierra es...', ['Marte', 'La Luna', 'El Sol', 'Júpiter'], 1, 'La Luna orbita la Tierra.', 0],
      ['El heliocentrismo propone que...', ['La Tierra es el centro de todo', 'El Sol está cerca del centro del Sistema Solar', 'Los planetas no se mueven', 'La Luna es una estrella'], 1, 'Históricamente se pasó del geocentrismo al modelo heliocéntrico.', 1],
      ['Artemis y Perseverance son ejemplos de...', ['Exploración espacial actual', 'Plantas del jardín', 'Métodos de filtración', 'Tipos de células'], 0, 'Son misiones espaciales contemporáneas.', 1]
    ]
  },
  'seres-vivos': {
    area: 'biologia', title: 'Seres vivos', icon: 'lucide:sprout',
    topics: ['Características', 'Clasificación', 'Reinos', 'Virus'],
    questions: [
      ['Una característica compartida por los seres vivos es...', ['Estar hechos de metal', 'Intercambiar materia y energía', 'No cambiar nunca', 'Vivir todos en tierra'], 1, 'Los seres vivos se nutren, se relacionan y se reproducen.', 0],
      ['Clasificar seres vivos permite...', ['Ordenar y comparar su diversidad', 'Cambiar sus genes', 'Hacerlos iguales', 'Evitar observarlos'], 0, 'La clasificación usa criterios para estudiar la biodiversidad.', 0],
      ['La biodiversidad es...', ['La variedad de seres vivos', 'Un tipo de célula', 'Un planeta', 'Una mezcla'], 0, 'Incluye diversidad de especies, genes y ecosistemas.', 0],
      ['El Reino Monera agrupa principalmente a...', ['Bacterias procariotas', 'Hongos con quitina', 'Plantas con flor', 'Animales con columna'], 0, 'Monera son unicelulares sin núcleo (procariotas).', 0],
      ['Los hongos se diferencian de las plantas porque...', ['Son heterótrofos por absorción y tienen pared de quitina', 'Hacen fotosíntesis con cloroplastos', 'No tienen células', 'Siempre son animales'], 0, 'Fungi no fotosintetiza; digiere afuera y absorbe.', 1],
      ['Un virus no se clasifica en un reino porque...', ['No es una célula (es acelular)', 'Es siempre una planta', 'Vive solo en el espacio', 'No tiene material genético'], 0, 'Los virus son partículas acelulares fuera de los 5 reinos.', 1],
      ['Los seres vivos se reproducen para...', ['Dar continuidad a su especie', 'Dejar de nutrirse', 'Eliminar el agua del planeta', 'Dejar de relacionarse con el medio'], 0, 'La reproducción permite el nacimiento de nuevos individuos.', 0],
      ['Un criterio útil para clasificar en reinos es...', ['Tipo de célula y forma de nutrición', 'El color favorito del observador', 'El día de la semana', 'El precio en el supermercado'], 0, 'Whittaker usó célula, organización y nutrición.', 1],
      ['Las plantas y los animales se diferencian, entre otras cosas, en que...', ['Muchas plantas fabrican su alimento por fotosíntesis', 'Los animales siempre tienen raíces', 'Las plantas nunca se relacionan con el medio', 'Solo los animales están formados por células'], 0, 'Las plantas son autótrofas; los animales son heterótrofos.', 1],
      ['Fuera de una célula, un virus está...', ['Inerte (sin metabolismo propio)', 'Creciendo como una planta', 'Respirando oxígeno', 'Formando tejidos'], 0, 'Solo se multiplica usando la maquinaria de un huésped.', 1]
    ]
  },
  celulas: {
    area: 'biologia', title: 'Células', icon: 'lucide:microscope',
    topics: ['Teoría celular', 'Organelas', 'Tipos de células'],
    questions: [
      ['La célula es...', ['La unidad básica de los seres vivos', 'Un órgano', 'Un tipo de roca', 'Una molécula'], 0, 'Todos los seres vivos están formados por una o más células.', 0],
      ['La membrana celular regula...', ['La entrada y salida de sustancias', 'La gravedad', 'Las estaciones', 'La órbita terrestre'], 0, 'Actúa como un límite selectivo.', 0],
      ['La mitocondria participa principalmente en...', ['Obtener energía a partir de nutrientes', 'Fabricar paredes celulares', 'Guardar agua únicamente', 'Producir luz'], 0, 'Se la asocia con la liberación de energía para la célula.', 0],
      ['Una célula vegetal se diferencia de una animal porque posee...', ['Cloroplastos y pared celular', 'Huesos y músculos', 'Solo membrana celular', 'Pulmones'], 0, 'Los cloroplastos participan en la fotosíntesis y la pared celular brinda sostén.', 1],
      ['El núcleo de una célula eucariota contiene principalmente...', ['El material genético', 'La sangre', 'El alimento sin transformar', 'La pared del organismo'], 0, 'El núcleo contiene el ADN organizado en cromosomas.', 0],
      ['Las células procariotas se caracterizan por...', ['No tener núcleo delimitado por membrana', 'Tener muchos órganos', 'Ser siempre animales', 'No tener material genético'], 0, 'Su material genético se encuentra en una región del citoplasma, sin núcleo membranoso.', 1],
      ['Los cloroplastos permiten a la célula vegetal...', ['Realizar fotosíntesis', 'Bombear sangre', 'Formar huesos', 'Oír sonidos'], 0, 'Contienen clorofila y captan luz para fabricar materia orgánica.', 1],
      ['Una neurona es una célula especializada en...', ['Transmitir señales', 'Hacer fotosíntesis', 'Formar la pared del tallo', 'Filtrar orina como único rol'], 0, 'Su forma (dendritas y axón) se adapta a la comunicación.', 1],
      ['Tejido → órgano → sistema es un ejemplo de...', ['Niveles de organización', 'Mezcla heterogénea', 'MRU', 'Potabilización'], 0, 'Las células se organizan en estructuras cada vez más complejas.', 1],
      ['Si una célula no tuviera membrana...', ['No controlaría bien su interior', 'Haría mejor la fotosíntesis', 'Viviría sin agua siempre', 'Se volvería un planeta'], 0, 'La membrana delimita y regula el intercambio con el entorno.', 2]
    ]
  },
  ecologia: {
    area: 'biologia', title: 'Ecología', icon: 'lucide:trees',
    topics: ['Poblaciones', 'Relaciones ecológicas', 'Factores ambientales'],
    questions: [
      ['Una población está formada por...', ['Individuos de la misma especie en un lugar', 'Todos los seres vivos del planeta', 'Solo plantas', 'Una célula'], 0, 'Comparten especie, lugar y tiempo.', 0],
      ['La relación en la que ambos organismos se benefician es...', ['Parasitismo', 'Mutualismo', 'Depredación', 'Competencia'], 1, 'En el mutualismo ambas especies obtienen beneficios.', 0],
      ['Un factor abiótico es...', ['La luz', 'Un hongo', 'Un zorro', 'Una bacteria'], 0, 'Es un componente no vivo del ambiente.', 0],
      ['La capacidad de carga de un ambiente es...', ['La cantidad máxima de individuos que puede sostener en ciertas condiciones', 'El número de especies extintas', 'La velocidad de un depredador', 'La cantidad de lluvia de un día'], 0, 'Depende de los recursos y condiciones del ambiente.', 1],
      ['En una cadena trófica, la energía comienza principalmente en...', ['El Sol', 'Los descomponedores', 'Los consumidores secundarios', 'El suelo únicamente'], 0, 'Los productores captan energía solar y la incorporan a materia orgánica.', 1],
      ['Los descomponedores cumplen la función de...', ['Reciclar materia al degradar restos', 'Producir luz solar', 'Cazar siempre', 'Eliminar todos los nutrientes'], 0, 'Hongos y bacterias descomponen materia orgánica y devuelven nutrientes al ambiente.', 1],
      ['En la depredación...', ['Un organismo caza y se alimenta de otro', 'Ambos se benefician igual', 'Ninguno interactúa', 'Solo hay rocas'], 0, 'El depredador obtiene alimento; la presa es consumida.', 0],
      ['La competencia ocurre cuando...', ['Dos especies o individuos buscan el mismo recurso limitado', 'No hay recursos en juego', 'Solo hay un ser vivo en el planeta', 'El Sol deja de brillar'], 0, 'Comida, espacio o luz pueden ser recursos por los que se compite.', 1],
      ['Un factor biótico es...', ['Una planta o un animal', 'La temperatura sola', 'La roca sin vida', 'La gravedad'], 0, 'Los factores bióticos son los seres vivos del ecosistema.', 0],
      ['Si desaparecen los productores de un ecosistema...', ['Se afecta toda la red trófica', 'Nada cambia', 'Solo ganan los carnívoros', 'Aumenta el Sol'], 0, 'Sin productores, falta la base de materia y energía para el resto.', 2]
    ]
  },
  plantas: {
    area: 'biologia', title: 'Plantas', icon: 'lucide:leaf',
    topics: ['Estructuras', 'Fotosíntesis', 'Reproducción'],
    questions: [
      ['Durante la fotosíntesis las plantas usan...', ['Luz, agua y dióxido de carbono', 'Solo oxígeno', 'Arena y metal', 'Sonido'], 0, 'Con esos materiales elaboran glucosa y liberan oxígeno.', 0],
      ['La raíz cumple principalmente la función de...', ['Absorber agua y fijar la planta', 'Producir sonido', 'Transportar sangre', 'Ver colores'], 0, 'También puede almacenar sustancias.', 0],
      ['La germinación comienza cuando...', ['Una semilla encuentra condiciones adecuadas', 'Una hoja se cae', 'La planta deja de crecer', 'No hay agua'], 0, 'Agua, oxígeno y temperatura adecuada favorecen el proceso.', 0],
      ['Las hojas son importantes para la fotosíntesis porque...', ['Captan luz y permiten el intercambio de gases', 'Absorben sangre', 'Forman huesos', 'Producen sonidos'], 0, 'En las hojas se encuentran muchos cloroplastos y estomas.', 0],
      ['El tallo ayuda principalmente a...', ['Sostener hojas y transportar sustancias', 'Digerir alimentos', 'Producir neuronas', 'Formar una columna vertebral'], 0, 'Conduce agua y sales minerales, y distribuye sustancias elaboradas.', 1],
      ['Una planta es autótrofa porque...', ['Produce materia orgánica a partir de sustancias simples', 'Solo come otros animales', 'No necesita energía', 'No intercambia gases'], 0, 'Mediante la fotosíntesis fabrica materia orgánica usando luz, agua y dióxido de carbono.', 1],
      ['En la respiración celular la planta...', ['Usa nutrientes para obtener energía', 'Deja de ser un ser vivo', 'Solo produce luz', 'Elimina todas sus raíces'], 0, 'Como otros seres vivos, obtiene energía de la materia orgánica.', 1],
      ['Los estomas en la hoja permiten...', ['Intercambio de gases con el aire', 'Circular la sangre', 'Oír el viento', 'Formar el núcleo'], 0, 'Entran y salen gases como CO₂ y O₂; también se pierde vapor de agua.', 1],
      ['Si una planta no recibe luz durante mucho tiempo...', ['La fotosíntesis se reduce y crece mal', 'Produce más oxígeno siempre', 'Se vuelve animal', 'No necesita agua nunca'], 0, 'Sin luz no puede fabricar bien su alimento.', 1],
      ['Una semilla en un lugar seco y frío probablemente...', ['No germine hasta que mejoren las condiciones', 'Germine al instante siempre', 'Se convierta en animal', 'Haga fotosíntesis como una hoja madura'], 0, 'La germinación requiere condiciones adecuadas de humedad y temperatura.', 2]
    ]
  },
  animales: {
    area: 'biologia', title: 'Animales', icon: 'lucide:rabbit',
    topics: ['Clasificación', 'Adaptaciones', 'Alimentación'],
    questions: [
      ['Un animal herbívoro se alimenta principalmente de...', ['Plantas', 'Carne', 'Rocas', 'Luz'], 0, 'Su dieta se basa en partes de plantas o algas.', 0],
      ['Los vertebrados tienen...', ['Columna vertebral', 'Cloroplastos', 'Pared celular', 'Raíces'], 0, 'Peces, anfibios, reptiles, aves y mamíferos son vertebrados.', 0],
      ['La fauna local es importante porque...', ['Forma parte de los ecosistemas cercanos', 'Solo existe en zoológicos', 'No cambia nunca', 'No necesita hábitat'], 0, 'Conocerla ayuda a valorar y cuidar el ambiente.', 0],
      ['Los invertebrados se caracterizan por...', ['No tener columna vertebral', 'Tener cloroplastos', 'Ser todos microscópicos', 'Vivir solo en el agua'], 0, 'Es un grupo muy diverso que incluye insectos, moluscos, arácnidos y muchos otros animales.', 0],
      ['Una adaptación de un animal es...', ['Una característica que favorece su supervivencia', 'Un órgano que todos los animales comparten', 'Una roca de su hábitat', 'Una mezcla de sustancias'], 0, 'Las adaptaciones se relacionan con el ambiente y el modo de vida.', 1],
      ['En una red trófica, un herbívoro suele actuar como...', ['Consumidor primario', 'Productor', 'Descomponedor exclusivamente', 'Factor abiótico'], 0, 'Se alimenta de productores, por eso ocupa el nivel de consumidor primario.', 1],
      ['Un carnívoro se alimenta principalmente de...', ['Otros animales', 'Solo luz solar', 'Rocas', 'Agua destilada únicamente'], 0, 'Obtiene materia y energía consumiendo otros animales.', 0],
      ['Los insectos son...', ['Invertebrados', 'Vertebrados con plumas', 'Plantas', 'Hongos'], 0, 'No tienen columna vertebral; muchos tienen exoesqueleto.', 0],
      ['Un animal del conurbano bonaerense puede adaptarse a...', ['Ambientes urbanos y restos de vegetación', 'Solo vivir en la Luna', 'Hacer fotosíntesis como principal nutrición', 'No necesitar agua nunca'], 0, 'La fauna local incluye especies que conviven con la ciudad y zonas verdes.', 1],
      ['Comparar picos o dientes de distintos animales ayuda a inferir...', ['Su tipo de alimentación', 'Su número exacto de células', 'El color del Sol', 'Si son mezclas homogéneas'], 0, 'La forma de las estructuras se relaciona con la dieta.', 2]
    ]
  },
  'cuerpo-humano': {
    area: 'biologia', title: 'Cuerpo humano', icon: 'lucide:heart-pulse',
    topics: ['Sistemas', 'Funciones vitales', 'Salud'],
    questions: [
      ['El sistema digestivo transforma...', ['Alimentos en nutrientes aprovechables', 'Oxígeno en sangre', 'Huesos en músculos', 'Luz en sonido'], 0, 'Obtiene nutrientes que las células pueden usar.', 0],
      ['El corazón impulsa la sangre por...', ['El sistema circulatorio', 'El sistema solar', 'Las raíces', 'Los pulmones solamente'], 0, 'La circulación transporta sustancias por el cuerpo.', 0],
      ['Cuidar el cuerpo incluye...', ['Alimentación, descanso y actividad física', 'Ignorar señales de malestar', 'No tomar agua', 'Dormir muy poco siempre'], 0, 'La salud es integral: física, emocional y social.', 0],
      ['El sistema respiratorio permite principalmente...', ['Intercambiar oxígeno y dióxido de carbono', 'Digerir grasas', 'Mover los huesos', 'Filtrar la orina'], 0, 'El intercambio gaseoso permite incorporar oxígeno y eliminar dióxido de carbono.', 0],
      ['El sistema nervioso coordina respuestas mediante...', ['Señales y órganos especializados', 'Raíces', 'Filtros de agua', 'Cloroplastos'], 0, 'Recibe información, la procesa y coordina respuestas del organismo.', 1],
      ['La sangre transporta...', ['Gases, nutrientes y desechos', 'Solo huesos', 'Luz solar', 'Paredes celulares'], 0, 'La circulación distribuye sustancias y contribuye al equilibrio interno.', 0],
      ['Los riñones participan principalmente en...', ['Filtrar la sangre y formar orina', 'Hacer la digestión de grasas', 'Bombear aire a los huesos', 'Producir luz'], 0, 'Forman parte del sistema excretor/urinario.', 1],
      ['Los huesos del esqueleto permiten...', ['Sostén, protección y movimiento junto a músculos', 'La fotosíntesis', 'Solo almacenar aire', 'Reemplazar al cerebro'], 0, 'El sistema locomotor integra huesos y músculos.', 1],
      ['Una alimentación saludable distingue...', ['Alimentos y nutrientes que el cuerpo necesita', 'Solo comidas dulces', 'Evitar toda el agua', 'Comer sin horarios ni variedad siempre'], 0, 'Nutrientes como proteínas, hidratos, lípidos, vitaminas y minerales cumplen roles distintos.', 1],
      ['Si corrés y te falta el aire, trabajan juntos sobre todo...', ['Respiratorio y circulatorio', 'Solo el sistema solar', 'Solo las raíces', 'Únicamente el oído'], 0, 'Los pulmones oxigenan la sangre y el corazón la distribuye a los músculos.', 2]
    ]
  }
};

window.QUIZ_LESSONS = QUIZ_LESSONS;

window.QUIZ_UNITS = Object.keys(RAW).map(id => {
  const u = RAW[id];
  const n = u.questions.length;
  return {
    id,
    area: u.area,
    title: u.title,
    icon: u.icon,
    lesson: QUIZ_LESSONS[id],
    topics: u.topics,
    questions: u.questions.map((q, i) => ({
      id: id + '-' + i,
      text: q[0],
      options: q[1],
      correct: q[2],
      feedback: q[3],
      difficulty: q[4] != null ? q[4] : (i % 3),
      topic: u.topics[i % u.topics.length],
      points: 100 / n
    }))
  };
});
