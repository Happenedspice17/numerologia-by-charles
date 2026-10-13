(function (root) {
  const T = {};

  T.numero = {
    1: { nombre: 'El Líder', planeta: 'Sol', luz: 'Independencia, iniciativa, liderazgo, fuerza de voluntad.', sombra: 'Egocentrismo, impaciencia.' },
    2: { nombre: 'El Diplomático', planeta: 'Luna', luz: 'Cooperación, sensibilidad, mediación, equilibrio emocional.', sombra: 'Inseguridad, dependencia.' },
    3: { nombre: 'El Comunicador', planeta: 'Júpiter', luz: 'Creatividad, optimismo, sociabilidad, expresión artística.', sombra: 'Dispersión, superficialidad.' },
    4: { nombre: 'El Constructor', planeta: 'Urano', luz: 'Organización, estabilidad, responsabilidad, trabajo duro.', sombra: 'Rigidez, terquedad.' },
    5: { nombre: 'El Aventurero', planeta: 'Mercurio', luz: 'Cambio, libertad, curiosidad, versatilidad.', sombra: 'Impulsividad, inestabilidad.' },
    6: { nombre: 'El Cuidador', planeta: 'Venus', luz: 'Amor, responsabilidad, familia, servicio a los demás.', sombra: 'Sobreprotección, sacrificio personal.' },
    7: { nombre: 'El Filósofo', planeta: 'Neptuno', luz: 'Introspección, espiritualidad, análisis, sabiduría interior.', sombra: 'Aislamiento, frialdad emocional.' },
    8: { nombre: 'El Poderoso', planeta: 'Saturno', luz: 'Ambición, éxito material, autoridad, confianza.', sombra: 'Dominación, materialismo excesivo.' },
    9: { nombre: 'El Humanitario', planeta: 'Marte', luz: 'Altruismo, compasión, idealismo, servicio a la humanidad.', sombra: 'Desilusión, sacrificio exagerado.' },
    11: { nombre: 'El Iluminado', planeta: 'Maestro', luz: 'Inspiración espiritual, intuición, canal de energías superiores.', sombra: 'Ansiedad, nerviosismo.' },
    22: { nombre: 'El Maestro Constructor', planeta: 'Maestro', luz: 'Visión y construcción a gran escala; manifiesta ideas en lo material.', sombra: 'Presión interna, materialismo.' },
    33: { nombre: 'El Maestro Sanador', planeta: 'Maestro', luz: 'Amor incondicional, servicio elevado, conciencia universal.', sombra: 'Autosacrificio excesivo, pérdida de identidad.' },
  };

  T.karmico = {
    13: 'Kármico 13 · Transformación forzada. Vigila el catastrofismo anticipatorio; la vida pide trabajo constante y orden.',
    14: 'Kármico 14 · Limitación impuesta. Vigila la autoridad internalizada; aprende libertad con medida y sin excesos.',
    16: 'Kármico 16 · Caída del ego. Vigila el pensamiento dicotómico extremo; lo que se derrumba abre paso a algo más auténtico.',
    19: 'Kármico 19 · Abuso de poder. Vigila la magnificación del ego; la independencia se gana sirviendo, no imponiendo.',
  };

  T.esencia = {
    1: 'Cualidades de mando; desea gobernar, ser independiente y salirse de lo común. Impulso creador y original. Debe aprender paciencia, tacto y diplomacia. Cuidar: egocentrismo, impaciencia, terquedad, tiranía.',
    2: 'Yo profundo sensible, receptivo y sutil; puente entre lo espiritual y lo material. Escucha su intuición, busca armonía y trabajo en equipo; le disgusta la soledad. Cuidar: indecisión, ser influenciable, exceso de simbiosis.',
    3: 'Motivación rica en expresión creativa, comunicación y optimismo. Ama lo social, el arte, los niños y los animales. Aprende con facilidad pero se dispersa. Cuidar: superficialidad, complacer demasiado, palabras hirientes.',
    4: 'Alma honesta y franca, con deseo de construir, organizar y controlar. Respeta las tradiciones familiares; práctica, analítica y confiable. Cuidar: rigidez, testarudez, tacañería, adicción al trabajo.',
    5: 'Yo profundo que desea movimiento, cambio y libertad. Aventurero, versátil, comerciante nato. Se resiste a lo convencional. Cuidar: dispersión, impaciencia, inestabilidad emocional, excesos.',
    6: 'Busca amor, armonía, ternura y belleza. Ama el hogar y la familia; docente natural y consejero. Necesita reconocimiento. Cuidar: hipersensibilidad, dudar de sí, ser la mula de carga de la familia.',
    7: 'Yo profundo de reflexión, meditación y búsqueda de la sabiduría. Introspectivo, ama los misterios y las leyes espirituales. Cuidar: exceso de análisis, melancolía, aislamiento, miedo a no estar a la altura de su ideal.',
    8: 'Impulsos de justicia, generosidad y estrategia; compromete el espíritu en la materia. Buen juicio y tacto para los negocios. Cuidar: materialismo, orgullo, prepotencia, tiranía.',
    9: 'Impulsos humanitarios e ideales elevados; desea sanar y servir. Ama la música, las artes y el teatro. Debe aprender a dar sin esperar recompensa. Cuidar: idealismo excesivo, falta de contacto con la realidad.',
    11: 'Alma despierta espiritualmente, intuitiva en extremo; guía y canal de conocimiento. Desea libertad y debe compartir lo que sabe con todos. Cuidar: intolerancia, superioridad, pérdida del equilibrio interior.',
    22: 'Soñador y constructor inspirado (idealismo del 11 + disciplina del 4). Prepara cimientos para el futuro; ambiciones por encima del promedio. Cuidar: exceso de trabajo, estrés y depresión.',
    33: 'Características del 6 muy elevadas; intuición que percibe lo que otros sienten y lo que va a ocurrir. Pionero y visionario. Cuidar: holgazanería, desidia, falta de introspección.',
  };

  T.personalidad = {
    1: 'Se le ve distante, dominante, creativo, de voluntad férrea e ideas claras. Debe asumir el liderazgo que su energía le pide.',
    2: 'Se le ve pacífico, diplomático, modesto y cooperativo. Talento para asociarse y aconsejar; debe cultivar la escucha y la reciprocidad.',
    3: 'Se le ve amistoso, sociable, confiable y convincente; disfruta la belleza y la comodidad. Debe desarrollar su capacidad de expresión.',
    4: 'Se le ve preciso, constante, práctico, conservador y confiable. Orden, método y disciplina lo llevan al éxito.',
    5: 'Se le ve magnético, juvenil, versátil, atractivo y sociable; líder en la moda. Debe arriesgarse a exponer ideas nuevas.',
    6: 'Se le ve pulcro, encantador, maternal/paternal y hogareño; crea atmósferas armónicas. Debe vivir plenamente la reconciliación y el amor.',
    7: 'Se le ve distinguido, perfeccionista, reservado y algo excéntrico. Debe desarrollar discernimiento y un camino independiente.',
    8: 'Se le ve de buena posición, persuasivo y dominante, cuidadoso al vestir. Debe valorar con coraje su capacidad de realización.',
    9: 'Se le ve generoso, romántico, magnético y amigable, como hermano de la humanidad. Talento para la acción social.',
    11: 'Se le ve soñador, idealista, inspirador y espiritual. Gran capacidad de transmitir mensajes y despertar conciencias.',
    22: 'Parece experto en cualquier campo; carisma que pacifica y devuelve el equilibrio. Da impresión de riqueza: las apariencias engañan.',
    33: 'Proyecta una energía 6 elevada: cuidado, enseñanza y servicio que inspiran confianza inmediata.',
  };

  T.mision = {
    1: 'El independiente. Ser líder y precursor; el triunfo llega con iniciativa, voluntad y originalidad. Cuidarse de ser tirano o dominante.',
    2: 'El conciliador. Pacificar, mediar y armonizar con tacto. Le convienen las sociedades, el trabajo en equipo y la pareja.',
    3: 'El artista. Autoexpresión auténtica; el don de la palabra para transmitir y relacionarse. Evitar la dispersión.',
    4: 'El trabajador. Construir con honestidad y dedicación, con los pies en la tierra; asumir responsabilidades.',
    5: 'El aventurero. Aprender a ser libre y no temer a lo nuevo; uno de los destinos más alegres.',
    6: 'El místico. Prodigarse en el hogar y la comunidad; docente por naturaleza. Le favorece formar pareja estable.',
    7: 'El sabio. Especializarse en ciencias o misterios de la vida; buscar dentro las respuestas que busca afuera.',
    8: 'El emprendedor equilibrado. Negocios y finanzas con equilibrio entre lo material y lo espiritual; la recompensa es la tarea bien hecha.',
    9: 'El altruista. Gran hermano de la humanidad; ser feliz dando sin esperar recompensa ni aferrarse a lo material.',
    11: 'El generoso incondicional. Liderazgo espiritual al servicio del público; eliminar la duda y salir de bambalinas.',
    22: 'El empresario internacional. Trabajar con grandes grupos, trascender fronteras; si no, queda encerrado en lo rutinario.',
    33: 'El maestro de la Luz. Gran generosidad; enfocado en ayudar como maestro o cuidador.',
  };

  T.misionKarmica = {
    1: 'Ser pionero y original, al frente de su propio negocio; aprender humildad.',
    2: 'Desarrollar tacto y diplomacia; su éxito depende de ayudar sin esperar recompensa y de cooperar.',
    3: 'Expresarse bien (escritura, oratoria, escena); creatividad e intuición. Cuidar la dispersión.',
    4: 'Ser práctico, objetivo y confiable; mente clara y organizada. Energía de la seguridad y el terreno firme.',
    5: 'Ser versátil y libre: viajar, aprender, cambiar. Evitar los vicios; eterno joven.',
    6: 'Formar hogar, asumir responsabilidades y servir. Primera energía mística; evitar ser dominante o testarudo.',
    7: 'Elevarse y elevar a otros; buscador de la verdad. Necesita soledad para estudiar y meditar.',
    8: 'Organización y capacidad ejecutiva; la realización llega al equilibrar fortuna y espiritualidad.',
    9: 'Amar a la humanidad y servir sin esperar nada; tolerancia y compasión.',
    11: 'Maestro espiritual: desarrollar la capacidad psíquica y seguir sus corazonadas sin dejar de ser práctico.',
    22: 'Práctico e inspirador; visión a gran escala. Si reprime su fuerza, vive como un 4.',
    33: 'Maestro de maestros, ultra perceptivo (solo cuando proviene de 11 + 11 + 11).',
  };

  T.natalicio = {
    1: 'Original, creador, líder natural. Tiende a posponer sus logros; parece frío pero necesita afecto y reconocimiento.',
    2: 'Pacificador con tacto; talento artístico y emotivo. Debe superar la necesidad constante de aprobación.',
    3: 'Autoexpresión, sociabilidad y buen humor. Cuidar la crítica y la dispersión de talentos.',
    4: 'Ordenado, honesto y ahorrador; inclinación al comercio. Debe aprender a divertirse.',
    5: 'Versátil, curioso e imaginativo; ama la libertad y los viajes, le desagradan las ataduras.',
    6: 'Arraigado a la familia y la comunidad; buen padre o madre. Perfeccionista; sufre con la crítica.',
    7: 'Perfeccionista y buscador de la verdad; muy psíquico. Trabaja mejor solo.',
    8: 'Hábil en negocios; independencia económica temprana. Facilidad para generar dinero.',
    9: 'Humanitario y artístico; vive cambios y pérdidas hasta aprender a vivir impersonalmente.',
    10: 'Mente ágil y audaz; debe trabajar solo o dirigir. Creativo, poco hogareño.',
    11: 'Ideas elevadas, tranquilo por fuera y volcánico por dentro. Debe guiarse por la intuición.',
    12: 'Analítico y capaz; debe tener tacto. Necesita mantenerse ocupado para evitar la depresión.',
    13: 'Ordenado, práctico y minucioso; necesita base hogareña y naturaleza. Le cuesta expresar emociones.',
    14: 'Versátil y dual; ama el cambio. Le conviene comprometerse temprano. Psíquico.',
    15: 'Ama el hogar; buen padre o maestro. Don de atraer; aprende observando. Artístico.',
    16: 'Perfeccionista e irritable cuando otros no cumplen sus expectativas. Necesita meditación y afecto.',
    17: 'Excelente para los negocios, de decisiones firmes. Tendencia al materialismo.',
    18: 'Contrariedades, pérdidas y cambios hasta que aprende a vivir para los demás. Refinado y crítico.',
    19: 'Independiente y original, sujeto a extremos. Nervioso; aprende por experiencia propia.',
    20: 'Pacificador natural; prefiere ser dirigido. Debe defender sus derechos y salir de su zona de confort.',
    21: 'Inclinaciones sociales; se dispersa con facilidad. Mejor en la amistad que en el matrimonio.',
    22: 'Natalicio maestro: funciona bien en lo material; nervioso y tenso, necesita descanso y tacto.',
    23: 'Rápido y encantador; mejor en rumbos profesionales (psicología). Aspiraciones elevadas.',
    24: 'Naturaleza de padre, madre o maestro; cuida mayores. Cuidar celos, pereza y crítica.',
    25: 'Perfeccionista e intuitivo; debe interesarse por lo metafísico y vivir en calma. Subestima su capacidad.',
    26: 'Bueno con números y el comercio; atrae dinero y apoyo. Le conviene comprometerse temprano.',
    27: 'Líder nato, versátil y muy psíquico; cauteloso con lo esotérico. Trabajo individual.',
    28: 'Afectuoso, idealista y de voluntad de acero; empieza cosas que no concluye.',
    29: 'Próspero si se dirige bien; oscila entre extremos emocionales. Camino de guía espiritual.',
    30: 'Debe canalizar su capacidad expresiva; buen directivo, intuitivo y magnético. Terco.',
    31: 'Trabajador, leal y ahorrativo; necesita familia. No olvida lo bueno ni lo malo. Inflexible.',
  };

  T.ultimoDigito = {
    0: 'Carácter franco, agresivo, varonil, caprichoso e independiente.',
    1: 'Orgulloso, inteligente y versátil, de carácter cambiante; imaginación para crear negocios.',
    2: 'Logra todo por su esfuerzo, sin ayuda familiar. Bondadoso y generoso; sociedades favorables si no termina sometido.',
    3: 'Rebelde y difícil de tratar; conflictos familiares. Le conviene el trabajo independiente.',
    4: 'Nunca pierde el ánimo; trabajador y enérgico, capaz de dirigir. Posibles mudanzas inesperadas.',
    5: 'Muy inteligente pero le cuesta ubicarse en la realidad; dificultad para manejar el dinero.',
    6: 'Buena presencia, elegante y talentoso; gran amigo de todos y generoso.',
    7: 'Alma desarrollada, tendencia al misticismo y la investigación oculta; carácter delicado.',
    8: 'Ligado a la justicia, economía, ingeniería o carrera militar; orgulloso y enérgico.',
    9: 'Dos tipos: caritativo y amable, o avasallador y dominante. Se destaca por su propio esfuerzo.',
  };

  T.vocal = {
    A: { base: 'Audaz, independiente, inquisitivo, interesado en la investigación. Sabe lo que quiere y por qué.', exceso: 'Con 3 o más: tendencia al egoísmo, cinismo y crítica cruel.' },
    E: { base: 'Vida excitante y llena de acontecimientos; versátil y de aprendizaje fácil, a veces nervioso.', exceso: 'Con más de 3: naturaleza inconstante.' },
    I: { base: 'Intuitivo; se interesa por las artes, el teatro o las ciencias.', exceso: 'Con más de 3: sensible, tímido y demasiado emocional.' },
    O: { base: 'Franco y metódico; cree en la ley, el sistema y el orden. Poco expresivo emocionalmente.', exceso: 'Con más de 3: terco, lento y apagado.' },
    U: { base: 'Mente universal de grandes ideales; le gusta acumular, coleccionista.', exceso: 'Con más de 3: sensación de pérdida y egoísmo (la copa se derrama).' },
  };

  T.letra = {
    A: '1 · Alma, acción, apertura. Iniciativa, mando y autoridad; originalidad, aventuras, independencia y viajes.',
    B: '2 · Bondad, bendición. Receptiva y delicada; gran necesidad de amor, conexión con la sabiduría ancestral; tendencia a la timidez.',
    C: '3 · Conocer, captar, crear. Capta vibraciones e inspiración; dispersa, impaciente e impulsiva.',
    D: '4 · Determinación, dirección, dominio. Ancla de solidez; constructor que se realiza en lo material.',
    E: '5 · Escuchar, expresar. Se comunica con libertad; cambios repentinos y transformaciones. Muy cambiante.',
    F: '6 · Familia, fortaleza. Compasión, deber familiar, lealtad; se adapta y se brinda al servicio.',
    G: '7 · Germinación. Misticismo, intuición, inventiva; reservado y hermético. Suerte y buena salud.',
    H: '8 · Humanidad, habilidad. Crea y ejecuta; atrae éxito y dinero, puede ganar o perder mucho.',
    I: '9 · Inteligencia, intuición, ideas. Creatividad con nerviosismo e hipersensibilidad; ley de causa y efecto.',
    J: '10/1 · Justicia. Honradez, inventiva, juicio y criterio; todo lo que piensa se manifiesta: cuidar pensamiento y palabra.',
    K: '11 · Kharma. Letra maestra: extremos en fortuna, salud y espiritualidad; magnetismo y poder de persuasión.',
    L: '12/3 · Lenguaje, lógica, logro. Lleva el pensamiento a lo concreto; buen manejo del lenguaje. Le cuesta terminar.',
    M: '13/4 · Medida, método, matriz. Fortaleza ante las dificultades; hogar y seguridad por encima de todo; regeneración.',
    N: '14/5 · Novedad. Imaginación viva, cambios, energía en movimiento; amor por el lujo y el placer.',
    O: '15/6 · Observar, ofrendar. Protección y cuidado, sentido del deber; rencoroso, virtud o vicio sin término medio.',
    P: '16/7 · Percepción, profundidad. Inteligencia aguda y profundidad mental; tendencia a pensar demasiado.',
    Q: '17/8 · Quantum. Originalidad, intensidad y liderazgo; muchísima intuición.',
    R: '18/9 · Reflexión, respeto. Compasión y tolerancia; impulsivo y emocional, forja fortaleza de carácter.',
    S: '19/1 · Sensación, sintonía. Fuerza espiritual, cambios inesperados y gran magnetismo.',
    T: '20/2 · Tesón, tarea, triunfo. Gran carga emocional que debe gobernar; logra sus propósitos perseverando.',
    U: '21/3 · Universalidad. Copa de talento, encanto y suerte; riesgo de indecisión si actúa por impulso.',
    V: '22 · Voluntad, valentía. Constructor magistral, determinación; naturaleza dual que necesita constancia.',
    W: '23/5 · Magnetismo, potencia, intuición; reacciones explosivas si se desconecta de la realidad.',
    X: '24/6 · Fuerza vital. Dualidad entre lo elevado y lo denso; energía muy conectada con lo sexual.',
    Y: '25/7 · Yin-yang. Ancla energías del cielo en la tierra; buscará la unidad experimentando la dualidad.',
    Z: '26/8 · Autodominio; plasma en la materia lo que fue energía. Equilibrio entre espiritualidad y mundo material.',
  };

  T.talentos = {
    1: { saldado: 'Se lanza de manera autónoma y segura, acepta el rol de autoridad y abre nuevos rumbos.', talento: 'Ambición e independencia muy marcadas; puede volverse egoísta o dominante. Ha tenido que luchar solo.', deuda: 'Falta de confianza en sí mismo; se oculta, dispersa su talento, complejo de inferioridad.' },
    2: { saldado: 'Intuición y sensibilidad con control sano; tacto, diplomacia y tolerancia.', talento: 'Hipersensible y manejable; enganchado con recuerdos del pasado.', deuda: 'Le faltó tacto; puede ser muy tímido. Debe aprender paciencia y a trabajar con otros.' },
    3: { saldado: 'Capacidad de expresión, imaginación y buen humor; facilidad para escribir.', talento: 'Debe asumir responsabilidades y no hablar de más para ser aceptado.', deuda: 'Dificultad para expresarse; falta de confianza, dispersión de talento.' },
    4: { saldado: 'Estructura y organización con éxito; ritmo propio, pausado pero firme.', talento: 'Buena administración, orden y trabajo arduo; testarudo. Necesita casas grandes.', deuda: 'Viene a edificar buenos cimientos sin eludir el trabajo; posible dificultad con la vivienda propia.' },
    5: { saldado: 'Vida de apertura y novedades vividas con armonía.', talento: 'Interés en los placeres; impulsivo, muchos cambios. Facilidad para idiomas.', deuda: 'Miedo a los cambios; se queda en zona segura aunque se sienta asfixiado.' },
    6: { saldado: 'Ternura y amor hacia su clan; responsable, hogareño, padre o maestro natural.', talento: 'Puede ser discutidor, protector y dominante con su familia e hijos.', deuda: 'Viene a aprender responsabilidad familiar y a expresar afecto.' },
    7: { saldado: 'Análisis, discernimiento y sabiduría; anhela perfección, ética y estética.', talento: 'Muy analítico y abierto; buscador de la verdad, interés en lo metafísico.', deuda: 'Tiende al escepticismo y falta de análisis; puede dejar huella si se encamina bien.' },
    8: { saldado: 'Afirma sus talentos en lo material; invitación a vivir con audacia y ambición.', talento: 'Capacidad comercial y don de mando; debe conectar con lo espiritual.', deuda: 'Debe aprender el valor del dinero y la organización de su economía.' },
    9: { saldado: 'Compasión con sano equilibrio; apertura del corazón, camino del Maestro Interior.', talento: 'Perspectiva universal, artística y literaria; muchos viajes. Pueden abusar de su bondad.', deuda: 'Le faltó comprensión; vivirá sobresaltos para aprender generosidad y compasión.' },
  };

  T.omitido = {
    1: 'Necesita estimular el mando, el valor y la osadía; aprender a decidir y afirmar su individualidad.',
    2: 'Debe aprender cooperación, tacto y diplomacia; ponerse en segundo plano. Puede indicar falta de mamá.',
    3: 'Debe aprender a expresarse (oratoria, teatro, idiomas) y adoptar una visión optimista y social.',
    4: 'Debe adoptar orden, disciplina y trabajo; cuidar las finanzas y usar la razón.',
    5: 'Necesita ajustarse a los cambios, viajar y relacionarse con personas diversas.',
    6: 'Debe expresar más amor y responsabilidad hacia su clan y su comunidad.',
    7: 'Necesita desarrollar la mente intuitiva y filosófica; retiros de introspección.',
    8: 'Debe canalizar su energía en lo material y desarrollar el sentido de los negocios.',
    9: 'Debe desarrollar amor universal, compasión y servicio a la humanidad.',
  };

  T.planos = {
    mental: {
      titulo: 'Plano Mental', formula: 'cantidad de 1 + 8',
      0: 'Muy cerrado; se desespera ante los cambios y no se adapta.',
      1: 'Todo lo analiza según su conveniencia; gobernado por el ego. Pensador independiente y obstinado.',
      2: 'Dualidad e indecisión: "quiero… no quiero".',
      3: 'Necesita abrirse a la comunicación; todo le interesa y se dispersa en grandes proyectos.',
      4: 'Estructurado y organizado; cuidar no ser ortodoxo y terco.',
      5: 'Plano mental alto y equilibrado; capacidad psíquica para organizar y concretar grandes ideas.',
      6: 'Capacidad psíquica; busca servir con amor y necesita armonía total. Le cuesta adaptarse.',
      7: 'Tendencia a la depresión; se canaliza en estudio, ciencia y lo místico. Debe socializar.',
      8: 'Gran energía mental; ejecutivo, ambicioso y lógico. Puede ser vidente o muy agresivo.',
      9: 'Características del 8; si acepta la evolución muestra su genialidad.',
    },
    fisico: {
      titulo: 'Plano Físico', formula: 'cantidad de 4 + 5',
      0: 'Salud delicada; atender el sistema inmunológico.',
      1: 'Todo repercute en su cuerpo; somatiza con facilidad.',
      2: 'Inconformidad con su cuerpo; puede ser hipocondríaco.',
      3: 'Dispersa mucha energía; cansancio permanente.',
      4: 'Plano fuerte y sano; práctico, eficiente y responsable.',
      5: 'Le gusta mostrarse; excesos en todo. Aventurero, promotor y vendedor natural.',
      6: 'El más hipocondríaco; vuelca lo depresivo en el físico.',
      7: 'Gran depresivo; tendencia a golpes, caídas y operaciones. Cuidar el corazón.',
      8: 'Gran depresivo; tendencia a golpes, caídas y operaciones. Cuidar el corazón.',
      9: 'Si no se nivela, vibra como un 5 destructivo; debe canalizarse en estudio y crecimiento.',
    },
    emocional: {
      titulo: 'Plano Emocional', formula: 'cantidad de 2 + 3 + 6',
      0: 'Dificultad para relacionarse afectivamente.',
      1: 'No muestra sus emociones; ama si se cumplen sus expectativas.',
      2: 'Duda al decidir y al entregarse emocionalmente.',
      3: 'Le motiva la conquista; muy artístico y creativo, impulsivo.',
      4: 'Necesita relaciones fijas, seguras y ordenadas; poco demostrativo.',
      5: 'Le mueve el riesgo y lo nuevo; vive las emociones con intensidad.',
      6: 'Pone sus emociones al servicio de los demás; necesita un hogar cálido.',
      7: 'Le cuesta decidir por su carácter depresivo; necesita introspección.',
      8: 'Le cuesta manejar la agresividad; si no la expresa, enferma.',
      9: 'Consciente de su potencial, abierto a apoyar sin límites.',
    },
    intuitivo: {
      titulo: 'Plano Intuitivo-Espiritual', formula: 'cantidad de 7 + 9',
      0: 'Puede ser gran renovador o negador total de su potencial.',
      1: 'Viene a aprender la espiritualidad; gran intuición.',
      2: 'Adquiere conocimiento esotérico pero le cuesta despertar; le ayuda un maestro guía.',
      3: 'Búsqueda espiritual incesante; puede llegar a un conocimiento superior.',
      4: 'Sigue la tradición religiosa familiar; teme lo que rompa su estructura.',
      5: 'Busca cambios revolucionarios en el pensamiento espiritual.',
      6: 'Trasciende sirviendo a otros, sin quedarse en su zona de confort.',
      7: 'Trae experiencia de vidas pasadas; buscador de la verdad, psíquico y analítico.',
      8: 'Trae experiencia de vidas pasadas en lo místico; debe ponerla en práctica.',
      9: 'Conexión importante con el Ser Superior; necesita guía para no perderse en sus ideales.',
    },
  };

  T.cuadroPlanos = {
    mental: 'Plano Mental (3 · 6 · 9): memoria, pensamiento, análisis, imaginación, ambición e idealismo.',
    emocional: 'Plano Emocional/Espiritual (2 · 5 · 8): sensibilidad, intuición, amor, libertad y sabiduría.',
    fisico: 'Plano Físico (1 · 4 · 7): expresión verbal, motivación, lenguaje corporal y aprendizaje por sacrificio.',
  };

  T.cuadro = {
    1: ['Dificultad para explicar sus pensamientos internos; debe pensar antes de hablar.', 'Don de la expresión equilibrada; ve ambos lados de una situación.', 'Parlanchín alegre, o tranquilo y tímido; se expresa mejor por escrito.', 'Dificultad verbal, se le malinterpreta; oculta la confusión con una sonrisa.', 'Supresión del ego, aislamiento y depresiones en la juventud.'],
    2: ['Intuición básica y sólida, no siempre suficiente.', 'Sensibilidad intuitiva equilibrada; buenas primeras impresiones.', 'Hipersensibilidad; se involucra en los problemas ajenos.', 'Muy hipersensible e impaciente; intuición poco confiable.', 'Personalidad muy sensible y reactiva; su sensibilidad puede ser fortaleza.'],
    3: ['Ancla de la memoria; mente alerta y confianza en sí mismo.', 'Imaginación y capacidad literaria acentuadas; necesita disciplina mental.', 'Pierde contacto con la realidad; vive en escenarios futuros.', 'Imaginación desmedida, miedos y preocupación.', 'Imaginación desmedida, miedos y preocupación.'],
    4: ['Práctico y organizado; prefiere lo concreto a la teoría.', 'Perspectiva centrada en lo físico y material; buscar equilibrio.', 'Le cuesta elevarse por encima de lo material.', 'Gran atracción por lo físico; cuidar las extremidades inferiores.', 'Gran atracción por lo físico; cuidar las extremidades inferiores.'],
    5: ['Comprende sus sentimientos y los de los demás.', 'Intensidad y determinación; tendencia a magnificar los problemas.', 'Intensidad emocional difícil de manejar.', 'Estrés avanzado; propenso a accidentes.', 'Estrés avanzado; propenso a accidentes.'],
    6: ['Creatividad expresada en el amor al hogar y las artes.', 'Puede generar preocupación, ansiedad e irritabilidad en casa y trabajo.', 'Preocupación excesiva por el hogar; amor posesivo.', 'Quiere dominar al clan; quejas interminables.', 'Quiere dominar al clan; quejas interminables.'],
    7: ['Sacrificios en salud, amor o dinero: renunciar para adquirir.', 'Pérdidas en dos áreas de la vida; despierta el interés metafísico.', 'Pérdidas en las tres áreas; profundo pensamiento filosófico.', 'Requiere ayuda cuidadosa; gran potencial de crecimiento espiritual.', 'Requiere ayuda cuidadosa; gran potencial de crecimiento espiritual.'],
    8: ['Metódico y meticuloso, atento a los detalles.', 'Gran poder de evaluación; riesgo de volverse dictador.', 'Inquietud aguda y victimización; necesita guía y amor.', 'Hiperactivo e inquieto; no reprimirlo.', 'Hiperactivo e inquieto; no reprimirlo.'],
    9: ['Ambición, responsabilidad e idealismo.', 'Idealismo intenso, poco práctico; cuidar la crítica.', 'Idealismo y ambición difíciles de manejar; arrebatos de mal genio.', 'Soñador idealista que se aparta, o beligerante.', 'Ser práctico y compasivo es su mayor desafío.'],
  };

  T.saeta = {
    organizacion: { nombre: 'Saeta de la Organización', linea: 'Buen planificador; vincula ego e intuición. Debe protegerse de la pereza sutil y atender los detalles.' },
    voluntad: { nombre: 'Saeta de la Voluntad', linea: 'Dinamismo y fuerza impulsora; equilibrio de los planos. Suele ignorar consejos e intuición.' },
    frustracion: { nombre: 'Saeta de la Frustración', linea: 'Cuadro dividido, voluntad débil; frustración por expectativas incumplidas, pérdidas y desilusiones.' },
    actividad: { nombre: 'Saeta de la Actividad', linea: 'Gran expresión que puede volverse hiperactividad; nerviosismo y dolencias por exceso.' },
    pasividad: { nombre: 'Saeta de la Pasividad', linea: 'Pensadores y guías detrás de escena; tendencia a la pereza. Necesita actividad física.' },
    practicidad: { nombre: 'Saeta de la Practicidad', linea: 'Personas muy activas y hábiles con las manos; pueden ser malos jueces de otras opiniones.' },
    trastorno: { nombre: 'Saeta del Trastorno', linea: 'Sin números en el plano físico; debe compensar con los planos emocional y mental, con orden.' },
    balance: { nombre: 'Saeta del Balance Emocional', linea: 'Equilibrio emocional natural; sensibilidad que le permite interpretar roles.' },
    hipersensibilidad: { nombre: 'Saeta de la Hipersensibilidad', linea: 'Sensibilidad expuesta; se lastima con facilidad y puede volverse tímido.' },
    intelecto: { nombre: 'Saeta del Intelecto', linea: 'Cerebro muy activo y buena memoria; brillante y alerta si no cae en la pereza.' },
    pocaMemoria: { nombre: 'Saeta de Poca Memoria', linea: 'Debe ejercitar la memoria toda la vida; la creatividad la mantiene activa.' },
    determinacion: { nombre: 'Saeta de la Determinación', linea: 'Determinación y persistencia; usarla con sabiduría y no por terquedad.' },
    demora: { nombre: 'Saeta de la Demora', linea: 'Separa lo analítico-intuitivo de lo práctico; las cosas se retrasan y cuesta materializar.' },
    espiritualidad: { nombre: 'Saeta de la Espiritualidad', linea: 'Une Mente 3, Alma 5 y Tierra 7: conciencia profunda; aprende por experiencia propia.' },
    esceptico: { nombre: 'Saeta del Investigador/Escéptico', linea: 'Escepticismo inicial que se vuelve búsqueda incansable del porqué; necesita filosofía de vida.' },
    ninguna: { nombre: 'Sin Saetas', linea: 'Persona adaptable; necesita perseverancia para desarrollar sus fortalezas. Lección: ser asertivo.' },
  };

  T.anioPersonal = {
    1: 'Nuevos comienzos, iniciativa.',
    2: 'Cooperación, paciencia.',
    3: 'Expansión, creatividad.',
    4: 'Trabajo duro, estructura.',
    5: 'Cambios, libertad.',
    6: 'Responsabilidades, familia.',
    7: 'Introspección, espiritualidad.',
    8: 'Logros, éxito material.',
    9: 'Finalización, preparación para nuevos ciclos.',
  };

  T.desafio = {
    0: 'Desafío de elección: no hay una lección única; todas las energías están disponibles y la tarea es elegir con conciencia.',
    1: 'Afirmar la identidad propia sin depender de expectativas externas; iniciativa sin dominar.',
    2: 'Sensibilidad excesiva y dependencia; aprender a cooperar sin perderse en el otro.',
    3: 'Miedo a expresarse; salir de la zona de confort y confiar en la propia creatividad.',
    4: 'Orden, disciplina y responsabilidad material, sin caer en rigidez ni pereza.',
    5: 'Libertad con equilibrio; adaptarse a los cambios sin caer en excesos.',
    6: 'Responsabilidad afectiva con límites sanos; no sacrificarse ni controlar.',
    7: 'Aceptarse sin perfeccionismo; confiar y abrirse en lugar de aislarse.',
    8: 'Relación sana con el dinero y el poder; resiliencia ante lo material.',
  };

  T.equilibrio = {
    1: 'Recupera el equilibrio con acción individual concreta.',
    2: 'Se regula dialogando con alguien de confianza.',
    3: 'Se equilibra expresándose: escribir, hablar, crear.',
    4: 'Se estabiliza con rutina, estructura y tareas prácticas.',
    5: 'Necesita movimiento, cambio de ambiente o novedad.',
    6: 'Se regula cuidando a alguien o algo.',
    7: 'Recupera el equilibrio en soledad, estudio o silencio.',
    8: 'Se estabiliza ejerciendo autoridad o tomando decisiones importantes.',
    9: 'Recupera el centro con perspectiva amplia: lectura, naturaleza, servicio.',
    11: 'Se regula en contacto con lo inspiracional: meditación, arte, visión.',
    22: 'Se estabiliza con proyectos de propósito colectivo.',
    33: 'Se regula sirviendo con amor desde la guía y la enseñanza.',
  };

  T.subconsciente = (n) =>
    n <= 3 ? 'Repertorio reactivo estrecho: bajo estrés tiende a responder siempre igual.'
      : n <= 5 ? 'Repertorio moderado: respuestas algo predecibles bajo presión, con capacidad de ajuste.'
      : n <= 7 ? 'Flexibilidad reactiva media-alta: varios registros de respuesta bajo estrés.'
      : 'Alta flexibilidad reactiva: accede a recursos variados incluso bajo presión.';

  if (typeof module !== 'undefined' && module.exports) module.exports = T;
  else root.Textos = T;
})(typeof window !== 'undefined' ? window : globalThis);
