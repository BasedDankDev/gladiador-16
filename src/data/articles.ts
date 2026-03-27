export interface ArticleSection {
  subtitle: string;
  image?: string;
  imageAlt?: string;
  paragraphs: string[];
}

export interface Article {
  slug: string;
  category: string;
  title: string;
  author: string;
  date: string;
  coverImage: string;
  intro: string;
  sections: ArticleSection[];
}

export const articles: Article[] = [
  {
    slug: "historia-camisetas-saprissa",
    category: "HISTORIA",
    title: "HISTORIA DE LAS CAMISETAS DE SAPRISSA",
    author: "Gladiador 16",
    date: "10 Marzo, 2026",
    coverImage: "/images/editorial/camiseta-81-83.webp",
    intro:
      "Repasamos la historia que sucedió mientras el Deportivo Saprissa vestía algunas de sus camisetas más icónicas. Desde los años 80 hasta la era moderna, cada jersey cuenta una historia única del club más grande de Costa Rica.",
    sections: [
      {
        subtitle: "Camisa Saprissa 1981–1983",
        image: "/images/editorial/camiseta-81-83.webp",
        imageAlt: "Camiseta de Saprissa temporada 1981-1983",
        paragraphs: [
          "Con su característico color morado y su logo minimalista que es solo una \"S\", el Deportivo Saprissa arranca una temporada agridulce en 1981. Un novato prometedor se convierte en el goleador del campeonato con 23 goles, su nombre: Evaristo Coronado. Mas el equipo no pudo conseguir ninguna posición importante.",
          "Para que Saprissa lograra un título de campeonato con esta camiseta tuvieron que esperar hasta la temporada de 1982. Un agónico gol bastó para darle el título al Saprissa frente al Municipal Puntarenas.",
          "Para la temporada 1983, el Saprissa quedó fuera de las finales del campeonato, siendo su acérrimo rival, la Liga Deportiva Alajuelense, quien consiguiera la máxima posición ese año.",
        ],
      },
      {
        subtitle: "Camisa Saprissa 1986",
        image: "/images/editorial/camiseta-86.webp",
        imageAlt: "Camiseta Saprissa 1986",
        paragraphs: [
          "Con esta camiseta de visitante, el equipo morado apenas pudo clasificar a la pentagonal que se disputaba para ver quién se enfrentaría al Municipal Puntarenas en la Gran Final. Esto a pesar de tener a un Alexandre Guimarães y a un Evaristo Coronado anotando 22 goles entre ambos.",
          "Nadie fue oponente para Leonidas Flores, quien con sus 18 goles, llevó al equipo porteño a su primer título de campeón.",
        ],
      },
      {
        subtitle: "Camisa Saprissa 1987",
        image: "/images/editorial/camiseta-87.webp",
        imageAlt: "Tercera camiseta Saprissa 1987",
        paragraphs: [
          "Otro año sin título para el Saprissa. A pesar de quedar segundo en la tabla, a un punto del primer lugar, el Club Sport Herediano, el \"Monstruo\" no pudo sobrevivir la pentagonal, quedando tercero.",
        ],
      },
      {
        subtitle: "Camiseta 1992–1993",
        image: "/images/editorial/camiseta-92.webp",
        imageAlt: "Camiseta Saprissa retro temporada 92",
        paragraphs: [
          "Para estas instancias el campeonato nacional elevó su número de participantes de 10 a 12 con un formato de 3 grupos. Los primeros 2 de cada grupo celebraban una hexagonal y los 2 primeros de esa fase iban a la gran final. Los saprissistas perdieron el título por un único gol frente al Alajuelense.",
          "La temporada 93 fue una temporada para el olvido de los morados. Apenas pudiendo clasificar a una cuadrangular grupal, quedando de último en su grupo.",
          "Con esta camiseta, el equipo probó un logo muy particular que no tuvo mucha acogida entre la afición, con una S atravesada por una pelota de fútbol.",
        ],
      },
      {
        subtitle: "Camiseta 1997–1998",
        image: "/images/editorial/camiseta-97.webp",
        imageAlt: "Camisa Deportivo Saprissa 97",
        paragraphs: [
          "En este entonces, los campeonatos dejaron de celebrarse de enero a noviembre, para pasar a celebrarse desde agosto o septiembre hasta junio o julio del año siguiente. El campeonato se dividió en dos temporadas, una de invierno y otra de verano.",
          "Con este uniforme con su tradicional \"S\" y este formato, el Deportivo Saprissa elevó el trofeo, ganándole al Alajuelense.",
          "Uno de los refuerzos extranjeros del Saprissa en ese entonces fue Alejandro Larrea. Quedando como máximo goleador, la afición saprissista todavía recuerda con mucho cariño a este jugador.",
        ],
      },
      {
        subtitle: "Camiseta 1998–1999",
        image: "/images/editorial/camiseta-99.webp",
        imageAlt: "Camisa Saprissa visitante 1999",
        paragraphs: [
          "Con algunos cambios particulares para el campeonato, el \"Monstruo\" lideró tanto el Torneo de Apertura como el Torneo de Clausura. Fue un torneo de rendimiento al estilo europeo, todos contra todos y quien hace más puntos gana.",
          "Con este formato El Saprissa alcanzó 99 puntos en la tabla acumulada.",
        ],
      },
      {
        subtitle: "Camisa Saprissa 2005–2006",
        image: "/images/editorial/camiseta-05.webp",
        imageAlt: "Camisa visita Saprissa temporada 2005-2006",
        paragraphs: [
          "Una temporada que los morados recordarán para siempre. Como si de una película se tratara, el equipo vivió un periodo de transición único en la historia del país.",
          "Primero, el equipo fue adquirido por el empresario mexicano Jorge Vergara, algo que no gustó a algunos. Vergara implementó la política de que todos los jugadores del equipo tenían que ser costarricenses. Esta visión la traía de su otro club, el Chivas de Guadalajara, donde entonces solo militaban mexicanos.",
          "Su plan tuvo frutos confiando en parte de la camada de las ligas menores del Saprissa más talento costarricense, los morados, además de obtener el campeonato nacional, clasifican al Mundial de Clubes en Japón, al ganar la Copa de Campeones de Concacaf.",
          "En este certamen, el Deportivo Saprissa logra dos victorias para quedar tercero, solo perdiendo la semifinal contra el Liverpool de Inglaterra.",
          "Esta camiseta se destacó por no contar con marcas de ningún producto o empresa, tendencia que no duraría mucho.",
        ],
      },
      {
        subtitle: "Camiseta 2008–2009",
        image: "/images/editorial/camiseta-08.webp",
        imageAlt: "Segunda camiseta de local Saprissa 2008-2009",
        paragraphs: [
          "Para estas instancias cada temporada contaba como un campeonato ganado. Esto causó que hubieran dos campeonatos por cada año. El Saprissa ganó el Campeonato de Invierno, mientras el Campeonato de Verano fue para Liberia Mía.",
          "Un joven Keylor Navas, con apenas 23 años, empezaba a destacar ganando el galardón de mejor portero del año.",
        ],
      },
      {
        subtitle: "Camiseta 2009–2010",
        image: "/images/editorial/camiseta-09.webp",
        imageAlt: "Camiseta Saprissa 2009-2010",
        paragraphs: [
          "Los morados tuvieron un campeonato de invierno en 2009 para olvidar, no quedando ni siquiera dentro de los 4 primeros del torneo.",
          "Para la temporada del 2010, los morados sí pudieron subir al podio como los grandes ganadores, de la mano de Walter Centeno, Keylor Navas y Alejandro Sequeira (goleador del campeonato). Este último vio esta temporada como su última participación en el fútbol profesional, retirándose después de 20 años desde su debut en el equipo morado en 1991.",
        ],
      },
    ],
  },
  {
    slug: "nuestra-historia-saprissa",
    category: "INSTITUCIONAL",
    title: "NUESTRA HISTORIA: ASÍ NACIÓ EL MÁS GRANDE DE CENTROAMÉRICA",
    author: "Gladiador 16",
    date: "25 Marzo, 2026",
    coverImage: "/images/editorial/saprissa-logo-historia.png",
    intro:
      "Así fue como nos convertimos en el más grande y ganador de la región. Desde una zapatería en el barrio Los Ángeles de San José en 1935 hasta 40 títulos nacionales y la cima de CONCACAF — esta es la historia del Deportivo Saprissa.",
    sections: [
      {
        subtitle: "1935 — Fundación de Saprissa",
        paragraphs: [
          "El 16 de julio de 1935 un grupo de niños, de la mano de Beto Fernández, funda el Saprissa FC, en una zapatería en el barrio Los Ángeles de San José. Junto a don Beto, zapatero de la época, presentaron el proyecto a Ricardo Saprissa Aymá.",
          "Este último decidió apadrinar a aquellos muchachos que iniciaron con un sueño y lo transformaron en un verdadero Monstruo.",
        ],
      },
      {
        subtitle: "1949 — Debut en Primera División",
        paragraphs: [
          "El 21 de agosto de 1949 el Deportivo Saprissa debuta en la Primera División con victoria de 3-1 sobre el Club Sport La Libertad. Manolo Rodríguez anota el primer gol morado en la máxima categoría.",
          "El 15 de mayo de 1948 los seguidores de Saprissa FC deciden legalizar la institución. Así fue como se conforma la junta directiva del que llamarían Deportivo Saprissa FC. Don Ricardo Saprissa asumiría la presidencia.",
          "Ese mismo año el equipo fue inscrito en la Segunda División. En la serie final, para buscar la clasificación a Primera, el Saprissa cayó ante Gimnástica, club que por medio de sus federativos presentó una moción para que los morados jugaran en la máxima categoría. La iniciativa fue aprobada y es aceptada para felicidad de los seguidores del Saprissa.",
        ],
      },
      {
        subtitle: "1952 — Primer Campeonato Invicto",
        paragraphs: [
          "En 1952 los Morados consiguen su primer título en la Primera División tras terminar invicto la temporada. En las últimas dos fechas del torneo el cuadro dirigido por Otto Pedro Bumbell se deleitó goleando a sus rivales para alcanzar su primera corona.",
          "Queda para la historia aquella planilla: Rodolfo Sanabria, Greivin Zumbado, Alex Sánchez, Alberto Ramírez, Constantino Quirós, Isaías Araya, Elías Valenciano, Rodolfo Herrera, Álvaro Murillo, Manuel Rodríguez, Rubén Jiménez, José Soto, Carlos Láscarez, Ulises Agüero, Claudio León, Francisco Campos, Guillermo Hernández, Ismael Molina, Jorge Alpízar, Mario Cordero, Jorge Gamboa y Orlando León.",
          "Al año siguiente, Saprissa repite el título con una sola derrota a cuestas.",
        ],
      },
      {
        subtitle: "1959 — Gira Mundial",
        paragraphs: [
          "El Saprissa en 1959 toma las valijas y se marcha a la primera gira mundial de un equipo de fútbol. A bordo del vuelo de KLM 988, un DC-6 llamado el 'Holandés Volador', parten los expedicionarios a enfrentar una osada gira que marcó la historia del club.",
          "Tras 74 días, los morados regresan victoriosos a Costa Rica. El club partió el 29 de marzo de 1959 y regresó a casa el 10 de junio de 1959, tras jugar 22 partidos en los cuales triunfó en 14 oportunidades, empató 1 y perdió 7. El equipo marcó 66 goles y recibió 46. Se visitaron 38 lugares, 25 naciones y 35 aeropuertos.",
        ],
      },
      {
        subtitle: "1972 — Encuentro con Pelé",
        paragraphs: [
          "En febrero de 1972, el Saprissa y el Santos de Brasil igualan 1-1 en un extraordinario partido disputado en el Estadio Nacional, en una gira centroamericana del equipo liderado por el histórico Pelé.",
          "El club latinoamericano solicitó un nuevo enfrentamiento que se realizó el 18 de febrero. El arquero argentino Cejas aplaudió el gol de Edgar Marín, al que luego califica como obra de arte.",
        ],
      },
      {
        subtitle: "1972 — Inauguración del Estadio",
        paragraphs: [
          "El 27 de agosto de 1972 es inaugurado el estadio Ricardo Saprissa Aymá, un homenaje a quien dio todo por el deporte. Eduardo 'Flaco' Chavarría consigue el primer gol morado en el empate 1-1 contra el Comunicaciones de Guatemala.",
        ],
      },
      {
        subtitle: "1977 — Hexacampeonato",
        paragraphs: [
          "En 1977 el Deportivo Saprissa impone una nueva marca en el fútbol costarricense tras obtener el hexacampeonato al derrotar al Cartaginés.",
        ],
      },
      {
        subtitle: "1993–1995 — Conquista de CONCACAF",
        paragraphs: [
          "En 1993 y 1995 conquista sus primeros dos títulos de la CONCACAF, el único cetro que aún se le resistía en la región.",
          "El 27 de agosto de 1995, se retira del fútbol Evaristo Coronado, máximo realizador en la historia del Deportivo Saprissa con 181 goles desde 1981.",
        ],
      },
      {
        subtitle: "2005 — Campeón de CONCACAF y Mundial de Clubes",
        paragraphs: [
          "El Deportivo Saprissa se proclamó campeón de la edición tras derrotar al Pumas de la UNAM con marcador global en la final por 2-3 y logró la clasificación al Mundial de Clubes.",
          "Tras ganar su tercera copa de Concacaf, el Deportivo Saprissa se hace merecedor de participar en el II Mundial de Clubes de la FIFA, donde los morados obtienen el tercer puesto en el torneo disputado en Japón en 2005.",
        ],
      },
      {
        subtitle: "2009 — Equipo del Siglo",
        paragraphs: [
          "La Federación Internacional de Historia y Estadística del Fútbol (IFFHS) designa al Deportivo Saprissa equipo del siglo XX en la CONCACAF.",
        ],
      },
      {
        subtitle: "2012 — Nace el Equipo Femenino",
        paragraphs: [
          "Saprissa funda su equipo femenino, año en el que debuta en la máxima categoría y consigue su primer cetro nacional.",
        ],
      },
      {
        subtitle: "2014 — Título Nacional #30",
        paragraphs: [
          "El 10 de mayo de 2014, el Deportivo Saprissa se convierte en el primer equipo de la CONCACAF en alcanzar su título nacional número 30 tras derrotar en la serie final al Alajuelense.",
        ],
      },
      {
        subtitle: "2019 — Títulos Internacionales",
        paragraphs: [
          "Histórico primer cetro internacional de Saprissa Fútbol Femenino obtenido en Nicaragua. Lo ganó de forma invicta.",
          "El Monstruo juega la Liga de Campeones y la obtiene al dejar en el camino en sus respectivas series al Belmopan Bandits de Belice (6-2), Águila de El Salvador (2-1), Independiente de Panamá (4-2), Olimpia de Honduras (4-3), y Motagua de Honduras (1-0).",
        ],
      },
      {
        subtitle: "2020 — Estrella #35 en Pandemia",
        paragraphs: [
          "En medio de la pandemia del Covid-19, que paralizó al mundo, Saprissa alcanzó su estrella número 35 y tuvo que celebrar sin público.",
        ],
      },
      {
        subtitle: "2022 — 50 Años del Estadio y Centro Deportivo",
        paragraphs: [
          "En medio de una gran celebración, con presencia de exjugadores, actividades especiales y muchos recuerdos, Saprissa celebró los 50 años de la inauguración del mítico Estadio Ricardo Saprissa Aymá. El 31 de agosto, ante el Municipal Grecia, la afición Morada se unió para esta gran fiesta.",
          "El Deportivo Saprissa inaugura su Centro Deportivo Roberto 'Beto' Fernández, en honor a uno de sus fundadores. Este centro se convierte así en la nueva casa de preparación de sus equipos masculino como femenino, así como de las Divisiones Menores.",
        ],
      },
      {
        subtitle: "2023 — Retiro de Christian Bolaños",
        paragraphs: [
          "En una emotiva conferencia de prensa, el histórico Christian Bolaños anunció su retiro del fútbol al final del Torneo de Apertura 2023. De manera espectacular, en la final del certamen, Bolaños ingresó de cambio y aportó la asistencia del último gol que selló el Tricampeonato de Saprissa.",
          "El histórico 'Bolañitos' se retiró por lo alto.",
        ],
      },
      {
        subtitle: "2024 — Título #40 y Tetracampeonato",
        paragraphs: [
          "Junto con el Tetracampeonato, conseguido entre 2022 y 2024, llega un hito histórico en América Central: el título número 40. Convirtiéndonos así en el equipo más ganador de CONCACAF en su liga doméstica.",
        ],
      },
    ],
  },
  {
    slug: "gabriel-badilla-gladiador-de-la-vida",
    category: "HOMENAJE",
    title: "GABRIEL BADILLA: EL GLADIADOR DE LA VIDA",
    author: "Gladiador 16",
    date: "25 Marzo, 2026",
    coverImage: "/images/editorial/badilla-1.jpg",
    intro:
      "Apodado el Gladiador por ser un luchador en el terreno de juego, por no dar una bola por perdida, por pelearse con quien fuera para el beneficio de su amado Saprissa. Su legado va mucho más allá de las rivalidades futbolísticas.",
    sections: [
      {
        subtitle: "El debut de un guerrero",
        image: "/images/editorial/badilla-2.jpg",
        imageAlt: "Gabriel Badilla con la camiseta del Saprissa",
        paragraphs: [
          "Desde que debutó en 2001 con 17 años, demostró su coraje en la zona baja del fútbol costarricense, mismo que ya había mostrado en el Mundial Infantil de Trinidad y Tobago ese mismo año.",
          "Saprissa y el New England Revolution de la MLS fueron sus únicos clubes.",
        ],
      },
      {
        subtitle: "Un palmarés de leyenda",
        paragraphs: [
          "Nueve títulos nacionales, uno de Uncaf y uno de Concacaf fue el palmarés de Badilla en su carrera con el conjunto morado, pero quizá fue el tercer lugar en el Mundial de Clubes de 2005 su mayor logro.",
          "Con la Selección Nacional vivió momentos únicos: Copa Uncaf, amistosos, Copa Oro, eliminatorias… Pero su mayor recuerdo fue ser parte de la Tricolor en la Copa del Mundo de Alemania, en 2006.",
        ],
      },
      {
        subtitle: "La batalla más difícil",
        paragraphs: [
          "Con 29 años, una noticia hizo estremecer su amor por el fútbol. Un problema en el corazón lo obligó a apartarse temporalmente de las canchas.",
          "El 15 de junio de 2013, Badilla entró al quirófano para extraerle un tumor benigno. Los resultados fueron exitosos, y meses después el jugador estaba de nuevo con la camiseta puesta.",
          "También fue un luchador de la vida. En 2013 un problema en el corazón lo mandó al quirófano, pero lo superó y volvió a jugar fútbol.",
        ],
      },
      {
        subtitle: "Legado eterno",
        image: "/images/editorial/badilla-1.jpg",
        imageAlt: "Gabriel Badilla - El Gladiador",
        paragraphs: [
          "Se retiró con 32 años y se estaba dedicando a labores administrativas en el equipo de sus amores.",
          "Gabriel Badilla falleció mientras participaba en la carrera Lindora Run. Su legado quedará escrito por siempre en letras moradas.",
        ],
      },
    ],
  },
  {
    slug: "ricardo-saprissa-ayma-visionario",
    category: "INSTITUCIONAL",
    title: "RICARDO SAPRISSA AYMÁ: UN VISIONARIO QUE TRANSFORMÓ EL FÚTBOL NACIONAL",
    author: "Gladiador 16",
    date: "25 Marzo, 2026",
    coverImage: "/images/editorial/saprissa-ayma-1.webp",
    intro:
      "Nacido en 1901, Ricardo Saprissa Aymá se destacó no solo como un atleta excepcional en diversas disciplinas, sino también como un hombre cuya pasión y dedicación trascendieron fronteras. Esta es la historia del hombre que le dio nombre al más grande.",
    sections: [
      {
        subtitle: "Hijo de catalanes, forjado en Centroamérica",
        image: "/images/editorial/saprissa-ayma-2.webp",
        imageAlt: "Ricardo Saprissa Aymá",
        paragraphs: [
          "Hijo de catalanes radicados en El Salvador, Saprissa encontró su amor por el deporte en una etapa temprana. Tras la muerte repentina de su padre, regresó a San Salvador desde Barcelona, donde había iniciado su educación en la Escuela Pías de Sarriá.",
          "En El Salvador, su talento para el béisbol comenzó a brillar, siendo descrito por la prensa como una \"muralla\" en el campo. Además, se convirtió en uno de los mejores tenistas de Centroamérica y nunca dejó de lado el fútbol, una pasión que comenzó en su escuela en Barcelona.",
        ],
      },
      {
        subtitle: "Barcelona, los Olímpicos y el deporte de élite",
        paragraphs: [
          "En 1921, Saprissa se graduó como ingeniero topógrafo y regresó a Barcelona con su madre y dos hermanos, con la intención de continuar sus estudios. Sin embargo, la Universidad de Barcelona no reconoció su título, obligándolo a abrir una tienda para subsistir.",
          "A pesar de este revés, su amor por el deporte no se apagó. Se unió al América para jugar béisbol y al equipo de tenis Pompeya, destacando en la modalidad de dobles junto a Antonio Juanico, con quien fue campeón de España en 1923 y 1924, y participando en los Juegos Olímpicos de París en 1924.",
          "Saprissa también dejó su marca en el hockey sobre hierba, ganando campeonatos de España con el Real Club de Polo y siendo internacional con la selección española.",
        ],
      },
      {
        subtitle: "El defensa del RCD Espanyol",
        image: "/images/editorial/saprissa-ayma-3.webp",
        imageAlt: "Ricardo Saprissa en su época deportiva",
        paragraphs: [
          "En el fútbol, su habilidad no pasó desapercibida y en 1922 se unió al Real Club Deportivo Español de Barcelona, donde jugó como defensa y estableció una fuerte amistad con el legendario Ricardo Zamora.",
          "Su estilo de juego limpio y contundente, sin una sola expulsión, le ganó el respeto tanto dentro como fuera del campo. Un episodio destacado en su carrera fue su enfrentamiento con Paulino Alcántara del Barcelona, donde su fuerte pero legal carga provocó conmoción y controversia, aumentando su popularidad.",
          "En 1928, Saprissa formó parte del equipo del Espanyol que ganó el Campeonato de España, y aunque una lesión le impidió jugar el primer partido de la Liga en 1929, su fortaleza física y carácter deportivo quedaron inmortalizados en anécdotas de su tiempo en el campo.",
        ],
      },
      {
        subtitle: "Costa Rica: un nuevo hogar, un legado eterno",
        paragraphs: [
          "Finalmente, tras una brillante carrera deportiva, Saprissa se trasladó a Costa Rica para apoyar a su hermano en la administración de una fábrica textil. La Guerra Civil Española y nuevas amistades en Costa Rica le hicieron decidir establecerse definitivamente en este país, donde dejó una huella imborrable.",
          "Hoy recordamos y celebramos la vida de Ricardo Saprissa Aymá, un verdadero pionero del deporte, cuyo legado sigue inspirando a nuevas generaciones.",
        ],
      },
    ],
  },
  {
    slug: "keylor-navas-halcon-de-la-cueva",
    category: "LEYENDA",
    title: "EL HALCÓN QUE CRECIÓ EN LA CUEVA: KEYLOR NAVAS",
    author: "Gladiador 16",
    date: "25 Marzo, 2026",
    coverImage: "/images/editorial/keylor-1.webp",
    intro:
      "Keylor Antonio Navas Gamboa, apodado 'Halcón' por su agilidad, visión y reflejos, es indiscutiblemente el mejor portero de la historia de nuestra región, y fue formado en las Divisiones Menores del Deportivo Saprissa.",
    sections: [
      {
        subtitle: "El debut en la Cueva",
        image: "/images/editorial/keylor-2.webp",
        imageAlt: "Keylor Navas en sus inicios con Saprissa",
        paragraphs: [
          "Su debut profesional se dio el 6 de noviembre de 2005, ante Carmelita. Faltando pocas semanas para competir en el Mundial de Clubes, Keylor Navas se estrenó en el arco del Monstruo. Con 19 años y 10 meses, un joven portero oriundo de Pérez Zeledón comenzó a escribir el capítulo más dorado en la historia del fútbol costarricense.",
          "Ese día, Saprissa empató 1 por 1 ante Carmelita en un duelo por la fecha 12 del campeonato de Primera División Apertura 2005. Richard 'La Pantera' Smith fue el anotador del primer gol en la carrera profesional de Keylor Navas, y Ronald 'La Bala' Gómez el encargado de igualar el marcador.",
        ],
      },
      {
        subtitle: "Mundial de Clubes y primeros pasos",
        image: "/images/editorial/keylor-3.webp",
        imageAlt: "Keylor Navas con el Deportivo Saprissa",
        paragraphs: [
          "Keylor Navas asistió a su primer Mundial de Clubes como el tercer guardameta del Deportivo Saprissa, por detrás de José Francisco Porras y Fausto González. El arquero jugó dos partidos en la temporada 2005-2006: uno ante Carmelita a finales de 2005 y uno ante Ramonense a comienzos del 2006.",
        ],
      },
      {
        subtitle: "Dueño del arco morado",
        image: "/images/editorial/keylor-4.webp",
        imageAlt: "Keylor Navas portero del Saprissa",
        paragraphs: [
          "Navas se adueñó del arco morado en la temporada 2007-2008. El mítico portero ganó seis títulos nacionales y una Copa de Campeones de la Concacaf con Saprissa, y fue considerado el mejor portero de la Uncaf en 2009 y del campeonato local en 2010.",
        ],
      },
      {
        subtitle: "De la Cueva a la cima del mundo",
        image: "/images/editorial/keylor-1.webp",
        imageAlt: "Keylor Navas - El Halcón",
        paragraphs: [
          "Posterior a ello, Navas mereció el reconocimiento al mejor portero de La Liga Española en la temporada 2013-2014, firmó una de las actuaciones más memorables de un portero en un mundial en Brasil 2014, fichó por el Real Madrid, ganó tres UEFA Champions League consecutivas, fue elegido como el portero del año de la Champions en 2018 y como el jugador del año de la Concacaf en 2014, 2016 y 2017.",
        ],
      },
    ],
  },
  {
    slug: "evaristo-coronado-caballero-del-futbol",
    category: "LEYENDA",
    title: "EVARISTO CORONADO: EL CABALLERO DEL FÚTBOL",
    author: "Gladiador 16",
    date: "25 Marzo, 2026",
    coverImage: "/images/editorial/evaristo-1.webp",
    intro:
      "El apodado 'Caballero del Fútbol' colgó sus botines un 27 de agosto de 1995. Máximo anotador histórico del Deportivo Saprissa, su icónico dorsal número 11 cuelga en lo más alto de sombra este de la Cueva. Esta es su historia.",
    sections: [
      {
        subtitle: "De Palmar Sur a la Cueva",
        image: "/images/editorial/evaristo-3.webp",
        imageAlt: "Evaristo Coronado con la camiseta del Saprissa",
        paragraphs: [
          "Evaristo Ulises Coronado Salas nació el 13 de septiembre de 1960, en Palmar Sur, en Osa de Puntarenas. Cuando creció, se trasladó a San José para completar sus estudios universitarios y, siendo estudiante y deportista de la Universidad de Costa Rica, jugó un colectivo contra el Deportivo Saprissa.",
          "Su capacidad en los movimientos y su distintiva característica goleadora llamaron la atención de los directivos y cuerpo técnico del conjunto morado, quienes le invitaron a participar en los entrenamientos del club.",
        ],
      },
      {
        subtitle: "El debut y la explosión goleadora",
        image: "/images/editorial/evaristo-4.webp",
        imageAlt: "Evaristo Coronado en acción",
        paragraphs: [
          "Debutó en Primera División el 3 de mayo de 1981, a sus 20 años, ante Herediano en el Estadio Ricardo Saprissa. Concretó el primer gol de su carrera unas semanas después, el 24 de mayo de 1981, contra San Carlos.",
          "El Deportivo Saprissa ganó ese encuentro con un marcador de 4 a 2, con 3 goles de Evaristo Coronado. Finalizó la primera temporada de su carrera profesional como el máximo anotador de la liga, con 23 goles. En 1988, lo logró nuevamente, contabilizando 19 tantos.",
        ],
      },
      {
        subtitle: "14 años, un solo amor",
        image: "/images/editorial/evaristo-5.webp",
        imageAlt: "Evaristo Coronado goleador histórico",
        paragraphs: [
          "A lo largo de su carrera, Coronado jugó 621 partidos a nivel de clubes y anotó 172 goles. Desde su debut hasta su retiro, durante 14 años, Coronado solo jugó para un club: el Deportivo Saprissa.",
          "Consiguió cinco títulos de liga nacional (en 1982, 1988, 1989, 1994 y 1995) y uno de la Copa de Campeones de la Concacaf, en 1993. Disputó 52 partidos a nivel de selecciones, anotando 10 goles.",
        ],
      },
      {
        subtitle: "La despedida del número 11",
        image: "/images/editorial/evaristo-2.webp",
        imageAlt: "Entrada para el juego de despedida de Evaristo Coronado",
        paragraphs: [
          "El legendario centro delantero saprissista anunció su retiro el 4 de agosto de 1995, en conferencia de prensa. Su partido de despedida fue el 27 de agosto de 1995, en el Estadio Ricardo Saprissa Aymá, contra Comunicaciones de Guatemala. El partido finalizó con un resultado de 3 a 1, a favor de los morados.",
          "Se retiró a sus 34 años, como bicampeón nacional, con el respeto, la admiración y el amor de toda la familia morada.",
        ],
      },
      {
        subtitle: "Legado eterno",
        image: "/images/editorial/evaristo-6.webp",
        imageAlt: "Evaristo Coronado leyenda del Saprissa",
        paragraphs: [
          "La historia de don Evaristo y el Deportivo Saprissa están intrínsecamente ligadas. Su retiro coincide con el aniversario de la Cueva, y su icónico dorsal número 11 cuelga en lo más alto de sombra este. Es el máximo anotador histórico del equipo masculino, con 148 tantos en 537 apariciones en torneo nacional.",
          "Coronado, además de jugador, ha sido director técnico y gerente deportivo de la institución.",
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
