const QUIZ_EXTRA = {
  materia: [
    ['Dos objetos ocupan el mismo volumen, pero uno tiene más masa. ¿Cuál es más denso?', ['El de menor masa','El de mayor masa','Ambos siempre tienen la misma densidad','No se puede comparar'],1,'A igual volumen, mayor masa implica mayor densidad.'],
    ['¿Cuál es una unidad adecuada para medir la masa de una manzana?', ['Kilogramo o gramo','Litro','Metro cuadrado','Grado Celsius'],0,'La masa se expresa habitualmente en gramos o kilogramos.'],
    ['Una propiedad intensiva se caracteriza porque...', ['Depende de la cantidad de materia','No depende de la cantidad de materia','Solo se mide con una balanza','Siempre es visible'],1,'La densidad y la temperatura son ejemplos de propiedades intensivas.']],
  mezclas: [
    ['Una ensalada con aceite, agua y verduras es una mezcla...', ['Homogénea','Heterogénea','Una sustancia pura','Un elemento'],1,'Se distinguen varias fases o componentes.'],
    ['Para obtener la sal del agua salada se puede usar...', ['Evaporación','Imantación','Filtración','Tamizado'],0,'Al evaporarse el agua, la sal queda como residuo.'],
    ['La filtración permite separar...', ['Un sólido insoluble de un líquido','Dos líquidos miscibles','Dos gases','Una sustancia pura en sus elementos'],0,'El filtro retiene el sólido insoluble y deja pasar el líquido.']],
  agua: [
    ['En la potabilización, la desinfección busca principalmente...', ['Agregar nutrientes','Reducir microorganismos peligrosos','Aumentar la salinidad','Congelar el agua'],1,'La desinfección reduce microorganismos que pueden causar enfermedades.'],
    ['¿Cuál es una acción responsable para ahorrar agua?', ['Dejar la canilla abierta','Reparar pérdidas y cerrar la canilla','Usar agua potable para limpiar veredas siempre','Volcar residuos al río'],1,'Reparar pérdidas y evitar usos innecesarios reduce el consumo.'],
    ['La condensación ocurre cuando el agua pasa de...', ['Sólido a líquido','Líquido a gas','Gas a líquido','Líquido a sólido'],2,'El vapor se enfría y forma gotas de agua líquida.']],
  energia: [
    ['Cuando una lámpara se enciende, parte de la energía eléctrica se transforma en...', ['Luz y calor','Masa','Agua','Gravedad'],0,'Ninguna transformación es perfectamente eficiente: también suele liberarse calor.'],
    ['Un objeto ubicado a cierta altura posee energía...', ['Cinética únicamente','Potencial gravitatoria','Sonora únicamente','Química únicamente'],1,'La altura respecto de una referencia permite asociar energía potencial gravitatoria.'],
    ['La energía se conserva cuando...', ['Desaparece por completo','Se transforma o transfiere sin crearse ni destruirse','Solo queda en los seres vivos','No hay movimiento'],1,'La energía puede cambiar de forma y transferirse, pero la cantidad total se conserva.']],
  'calor-sonido': [
    ['En una habitación, el calor pasa espontáneamente de...', ['La pared fría al aire caliente','El cuerpo más caliente al más frío','La sombra al Sol','Un objeto vacío a otro'],1,'La transferencia espontánea ocurre por diferencia de temperatura.'],
    ['Una guitarra produce sonido cuando...', ['Sus cuerdas vibran','Sus cuerdas se derriten','Absorbe toda la luz','No hay medio material'],0,'La vibración de la cuerda produce una perturbación que se propaga por el aire.'],
    ['Un material transparente permite principalmente que la luz...', ['Lo atraviese y podamos ver a través de él','Desaparezca','Se convierta en sonido siempre','Se vuelva materia'],0,'El vidrio limpio es un ejemplo de material transparente.']],
  movimientos: [
    ['En un gráfico velocidad-tiempo, una línea horizontal indica...', ['Velocidad constante','Reposo siempre','Aceleración creciente','Cambio de trayectoria'],0,'La velocidad permanece constante cuando no cambia con el tiempo.'],
    ['La pendiente de un gráfico posición-tiempo representa...', ['La masa','La velocidad','La temperatura','El volumen'],1,'La variación de posición por unidad de tiempo es la velocidad.'],
    ['Si un ciclista recorre 120 m en 20 s, su rapidez media es...', ['2 m/s','6 m/s','20 m/s','140 m/s'],1,'Rapidez media = distancia / tiempo = 120 m / 20 s = 6 m/s.']],
  'sistema-solar': [
    ['La traslación de la Tierra alrededor del Sol se relaciona principalmente con...', ['Las estaciones junto con la inclinación del eje','El día y la noche','Las fases de la Luna únicamente','Los terremotos'],0,'Las estaciones se explican por la traslación y la inclinación del eje terrestre.'],
    ['La Luna brilla porque...', ['Produce luz como una estrella','Refleja luz del Sol','Tiene fuego en su superficie','Absorbe la oscuridad'],1,'La Luna no es una estrella: vemos luz solar reflejada en su superficie.'],
    ['Los planetas interiores son, en general...', ['Rocosos y cercanos al Sol','Gaseosos y más lejanos','Todos satélites','Cometas con cola'],0,'Mercurio, Venus, Tierra y Marte son planetas rocosos interiores.']],
  'seres-vivos': [
    ['La nutrición de un ser vivo incluye...', ['Obtener y utilizar materia y energía','Solo dormir','Cambiar de especie','No intercambiar sustancias'],0,'La nutrición permite incorporar materia y obtener energía para las funciones vitales.'],
    ['Una adaptación es...', ['Una característica que favorece la vida en un ambiente','Un cambio instantáneo elegido por un individuo','Una enfermedad siempre','Una clasificación sin criterio'],0,'Las adaptaciones son características que pueden favorecer la supervivencia y reproducción.'],
    ['Un ecosistema está formado por...', ['Seres vivos y factores no vivos que interactúan','Solo animales','Solo agua','Una única especie aislada'],0,'Incluye componentes bióticos y abióticos, además de sus relaciones.']],
  celulas: [
    ['Una célula vegetal se diferencia de una animal porque posee...', ['Cloroplastos y pared celular','Huesos y músculos','Solo membrana celular','Pulmones'],0,'Los cloroplastos participan en la fotosíntesis y la pared celular brinda sostén.'],
    ['El núcleo de una célula eucariota contiene principalmente...', ['El material genético','La sangre','El alimento sin transformar','La pared del organismo'],0,'El núcleo contiene el ADN organizado en cromosomas.'],
    ['Las células procariotas se caracterizan por...', ['No tener núcleo delimitado por membrana','Tener muchos órganos','Ser siempre animales','No tener material genético'],0,'Su material genético se encuentra en una región del citoplasma, sin núcleo membranoso.']],
  ecologia: [
    ['La capacidad de carga de un ambiente es...', ['La cantidad máxima de individuos que puede sostener en ciertas condiciones','El número de especies extintas','La velocidad de un depredador','La cantidad de lluvia de un día'],0,'Depende de los recursos y condiciones del ambiente.'],
    ['En una cadena trófica, la energía comienza principalmente en...', ['El Sol','Los descomponedores','Los consumidores secundarios','El suelo únicamente'],0,'Los productores captan energía solar y la incorporan a materia orgánica.'],
    ['Los descomponedores cumplen la función de...', ['Reciclar materia al degradar restos','Producir luz solar','Cazar siempre','Eliminar todos los nutrientes'],0,'Hongos y bacterias descomponen materia orgánica y devuelven nutrientes al ambiente.']],
  plantas: [
    ['Las hojas son importantes para la fotosíntesis porque...', ['Captan luz y permiten el intercambio de gases','Absorben sangre','Forman huesos','Producen sonidos'],0,'En las hojas se encuentran muchos cloroplastos y estomas.'],
    ['El tallo ayuda principalmente a...', ['Sostener hojas y transportar sustancias','Digestionar alimentos','Producir neuronas','Formar una columna vertebral'],0,'Conduce agua y sales minerales, y distribuye sustancias elaboradas.'],
    ['Una planta es autótrofa porque...', ['Produce materia orgánica a partir de sustancias simples','Solo come otros animales','No necesita energía','No intercambia gases'],0,'Mediante la fotosíntesis fabrica materia orgánica usando luz, agua y dióxido de carbono.']],
  animales: [
    ['Los invertebrados se caracterizan por...', ['No tener columna vertebral','Tener cloroplastos','Ser todos microscópicos','Vivir solo en el agua'],0,'Es un grupo muy diverso que incluye insectos, moluscos, arácnidos y muchos otros animales.'],
    ['Una adaptación de un animal es...', ['Una característica que favorece su supervivencia','Un órgano que todos los animales comparten','Una roca de su hábitat','Una mezcla de sustancias'],0,'Las adaptaciones se relacionan con el ambiente y el modo de vida.'],
    ['En una red trófica, un herbívoro suele actuar como...', ['Consumidor primario','Productor','Descomponedor exclusivamente','Factor abiótico'],0,'Se alimenta de productores, por eso ocupa el nivel de consumidor primario.']],
  'cuerpo-humano': [
    ['El sistema respiratorio permite principalmente...', ['Intercambiar oxígeno y dióxido de carbono','Digerir grasas','Mover los huesos','Filtrar la orina'],0,'El intercambio gaseoso permite incorporar oxígeno y eliminar dióxido de carbono.'],
    ['El sistema nervioso coordina respuestas mediante...', ['Señales y órganos especializados','Raíces','Filtros de agua','Cloroplastos'],0,'Recibe información, la procesa y coordina respuestas del organismo.'],
    ['La sangre transporta...', ['Gases, nutrientes y desechos','Solo huesos','Luz solar','Paredes celulares'],0,'La circulación distribuye sustancias y contribuye al equilibrio interno.']]
};

window.QUIZ_UNITS = [
  {id:'materia', area:'quimica', title:'Materia y propiedades', icon:'lucide:scale', questions:[
    ['¿Cuál es una propiedad extensiva?', ['Densidad','Masa','Color','Solubilidad'],1,'La masa depende de la cantidad de material.'],
    ['¿Qué instrumento permite medir el volumen de un líquido?', ['Balanza','Termómetro','Probeta','Regla'],2,'La probeta graduada se usa para medir volumen.'],
    ['¿Qué propiedad puede percibirse con los sentidos?', ['Olor','Conductividad','Masa','Punto de ebullición'],0,'El olor es una propiedad organoléptica.']]},
  {id:'mezclas', area:'quimica', title:'Mezclas', icon:'lucide:blend', questions:[
    ['Una mezcla de agua y sal es...', ['Heterogénea','Homogénea','Sustancia pura','Elemento'],1,'La sal se disuelve y forma una sola fase.'],
    ['¿Qué método separa arena del agua?', ['Filtración','Destilación','Imantación','Cromatografía'],0,'El filtro retiene la arena.'],
    ['Para separar limaduras de hierro y arena se usa...', ['Decantación','Evaporación','Un imán','Tamizado'],2,'El hierro es atraído por el imán.']]},
  {id:'agua', area:'quimica', title:'Agua', icon:'lucide:droplets', questions:[
    ['El proceso que vuelve apta el agua para beber se llama...', ['Evaporación','Potabilización','Fusión','Filtración solar'],1,'Potabilizar elimina o reduce riesgos para la salud.'],
    ['El agua líquida se convierte en vapor por...', ['Condensación','Solidificación','Evaporación','Precipitación'],2,'La evaporación es el paso de líquido a gas.'],
    ['Cuidar el agua es importante porque...', ['Es infinita','No tiene usos industriales','Es un bien vital y un derecho','No participa en ecosistemas'],2,'Es esencial para la vida, la salud y los ecosistemas.']]},
  {id:'energia', area:'fisica', title:'Energía', icon:'lucide:zap', questions:[
    ['La energía asociada al movimiento es...', ['Térmica','Cinética','Química','Nuclear'],1,'Un objeto que se mueve posee energía cinética.'],
    ['En una linterna, la energía química de la pila se transforma principalmente en...', ['Luz','Masa','Sonido solamente','Materia'],0,'La pila permite producir energía eléctrica que se convierte en luz.'],
    ['La unidad de energía del Sistema Internacional es...', ['Metro','Joule','Newton','Litro'],1,'El joule (J) es la unidad de energía.']]},
  {id:'calor-sonido', area:'fisica', title:'Calor, luz y sonido', icon:'lucide:waveform', questions:[
    ['El calor se transfiere espontáneamente desde...', ['Menor a mayor temperatura','Mayor a menor temperatura','El vacío al Sol','Un objeto sin energía'],1,'El intercambio ocurre del cuerpo más caliente al más frío.'],
    ['El sonido necesita para propagarse...', ['Un medio material','Luz solar','Ausencia de materia','Solo agua'],0,'El sonido no se propaga en el vacío.'],
    ['La luz blanca puede descomponerse en colores con...', ['Un prisma','Un imán','Un filtro de café','Una balanza'],0,'El prisma desvía cada color de manera diferente.']]},
  {id:'movimientos', area:'fisica', title:'Movimientos', icon:'lucide:move-right', questions:[
    ['En un MRU la velocidad es...', ['Variable','Constante','Siempre cero','Negativa'],1,'En el movimiento rectilíneo uniforme la velocidad no cambia.'],
    ['En un gráfico posición-tiempo, una línea horizontal indica...', ['Reposo','Aceleración','Caída libre','Más masa'],0,'La posición no cambia con el tiempo.'],
    ['Si un auto aumenta su velocidad, su movimiento es...', ['Uniforme','Acelerado','Estático','Circular necesariamente'],1,'Cambiar la velocidad implica aceleración.']]},
  {id:'sistema-solar', area:'fisica', title:'Sistema Solar', icon:'lucide:orbit', questions:[
    ['La estrella central del Sistema Solar es...', ['La Luna','Júpiter','El Sol','La Tierra'],2,'El Sol es la estrella alrededor de la cual orbitan los planetas.'],
    ['La rotación de la Tierra produce principalmente...', ['Las estaciones','El día y la noche','Los eclipses','Las mareas'],1,'La Tierra gira sobre su eje aproximadamente cada 24 horas.'],
    ['Un modelo a escala sirve para...', ['Copiar exactamente la realidad','Representar proporciones de forma simplificada','Eliminar distancias','Cambiar las órbitas'],1,'Los modelos ayudan a estudiar sistemas enormes o complejos.']]},
  {id:'seres-vivos', area:'biologia', title:'Seres vivos', icon:'lucide:sprout', questions:[
    ['Una característica compartida por los seres vivos es...', ['Estar hechos de metal','Intercambiar materia y energía','No cambiar nunca','Vivir todos en tierra'],1,'Los seres vivos se nutren, se relacionan y se reproducen.'],
    ['Clasificar seres vivos permite...', ['Ordenar y comparar su diversidad','Cambiar sus genes','Hacerlos iguales','Evitar observarlos'],0,'La clasificación usa criterios para estudiar la biodiversidad.'],
    ['La biodiversidad es...', ['La variedad de seres vivos','Un tipo de célula','Un planeta','Una mezcla'],0,'Incluye diversidad de especies, genes y ecosistemas.']]},
  {id:'celulas', area:'biologia', title:'Células', icon:'lucide:microscope', questions:[
    ['La célula es...', ['La unidad básica de los seres vivos','Un órgano','Un tipo de roca','Una molécula'],0,'Todos los seres vivos están formados por una o más células.'],
    ['La membrana celular regula...', ['La entrada y salida de sustancias','La gravedad','Las estaciones','La órbita terrestre'],0,'Actúa como un límite selectivo.'],
    ['La mitocondria participa principalmente en...', ['Obtener energía a partir de nutrientes','Fabricar paredes celulares','Guardar agua únicamente','Producir luz'],0,'Se la asocia con la liberación de energía para la célula.']]},
  {id:'ecologia', area:'biologia', title:'Ecología', icon:'lucide:trees', questions:[
    ['Una población está formada por...', ['Individuos de la misma especie en un lugar','Todos los seres vivos del planeta','Solo plantas','Una célula'],0,'Comparten especie, lugar y tiempo.'],
    ['La relación en la que ambos organismos se benefician es...', ['Parasitismo','Mutualismo','Depredación','Competencia'],1,'En el mutualismo ambas especies obtienen beneficios.'],
    ['Un factor abiótico es...', ['La luz','Un hongo','Un zorro','Una bacteria'],0,'Es un componente no vivo del ambiente.']]},
  {id:'plantas', area:'biologia', title:'Plantas', icon:'lucide:leaf', questions:[
    ['Durante la fotosíntesis las plantas usan...', ['Luz, agua y dióxido de carbono','Solo oxígeno','Arena y metal','Sonido'],0,'Con esos materiales elaboran glucosa y liberan oxígeno.'],
    ['La raíz cumple principalmente la función de...', ['Absorber agua y fijar la planta','Producir sonido','Transportar sangre','Ver colores'],0,'También puede almacenar sustancias.'],
    ['La germinación comienza cuando...', ['Una semilla encuentra condiciones adecuadas','Una hoja se cae','La planta deja de crecer','No hay agua'],0,'Agua, oxígeno y temperatura adecuada favorecen el proceso.']]},
  {id:'animales', area:'biologia', title:'Animales', icon:'lucide:rabbit', questions:[
    ['Un animal herbívoro se alimenta principalmente de...', ['Plantas','Carne','Rocas','Luz'],0,'Su dieta se basa en partes de plantas o algas.'],
    ['Los vertebrados tienen...', ['Columna vertebral','Cloroplastos','Pared celular','Raíces'],0,'Peces, anfibios, reptiles, aves y mamíferos son vertebrados.'],
    ['La fauna local es importante porque...', ['Forma parte de los ecosistemas cercanos','Solo existe en zoológicos','No cambia nunca','No necesita hábitat'],0,'Conocerla ayuda a valorar y cuidar el ambiente.']]},
  {id:'cuerpo-humano', area:'biologia', title:'Cuerpo humano', icon:'lucide:heart-pulse', questions:[
    ['El sistema digestivo transforma...', ['Alimentos en nutrientes aprovechables','Oxígeno en sangre','Huesos en músculos','Luz en sonido'],0,'Obtiene nutrientes que las células pueden usar.'],
    ['El corazón impulsa la sangre por...', ['El sistema circulatorio','El sistema solar','Las raíces','Los pulmones solamente'],0,'La circulación transporta sustancias por el cuerpo.'],
    ['Cuidar el cuerpo incluye...', ['Alimentación, descanso y actividad física','Ignorar señales de malestar','No tomar agua','Dormir muy poco siempre'],0,'La salud es integral: física, emocional y social.']]}
].map(unit => ({...unit, questions: [...unit.questions, ...(QUIZ_EXTRA[unit.id] || [])].map((q,i) => ({id:unit.id+'-'+i, text:q[0], options:q[1], correct:q[2], feedback:q[3], points:100/(unit.questions.length + (QUIZ_EXTRA[unit.id] || []).length)}))}));
