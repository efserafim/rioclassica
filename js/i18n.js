// Traduções do site, PT-BR, EN, ES, FR

(function () {
  const STORAGE_KEY = 'rioclassica-lang';
  const DEFAULT_LANG = 'pt-BR';

  const LANG_META = {
    'pt-BR': { flagClass: 'fi-br', code: 'PT' },
    en: { flagClass: 'fi-us', code: 'EN' },
    es: { flagClass: 'fi-es', code: 'ES' },
    fr: { flagClass: 'fi-fr', code: 'FR' }
  };

  const translations = {
    'pt-BR': {
      'nav.about': 'Quem Somos',
      'nav.flaneur': 'Flâneur',
      'nav.more': 'Mais',
      'nav.services': 'Serviços',
      'nav.projects': 'Projetos',
      'nav.saturdays': 'Experiências',
      'nav.roteiros': 'Roteiros',
      'nav.gallery': 'Galeria',
      'nav.contact': 'Contato',
      'nav.language': 'Idioma',
      'hero.eyebrow': 'Rioclássica · Turismo e Cultura',
      'hero.title': 'Mais que turismo, experiências de vida',
      'hero.subtitle':
        'Roteiros culturais para quem quer conhecer o Rio e para empresas, marcas e instituições que querem conectar pessoas à cidade.',
      'hero.btn': 'Ver próximas experiências',
      'hero.btnSecondary': 'Explorar roteiros',
      'about.title': 'A cidade como lugar de encontro e descoberta',
      'about.subtitle': 'Conhecer o Rio Antigo é conhecer a própria história.',
      'about.text':
        'A Rioclássica é uma agência de turismo e cultura que cria experiências a partir da história, da literatura, da arquitetura, da arte e da memória do Rio de Janeiro. Com pesquisa e curadoria autoral, desenvolvemos roteiros que aproximam as pessoas da cidade e ampliam seu repertório cultural.',
      'about.text2':
        'Atendemos quem deseja viver o Rio Antigo em um sábado aberto ou em um roteiro privativo, e também empresas, marcas e instituições que buscam experiências alinhadas ao público e aos objetivos de cada projeto.',
      'about.h1.title': 'Para você',
      'about.h1.text':
        'Experiências de sábado e roteiros privativos para conhecer a cidade com profundidade e presença.',
      'about.h2.title': 'Para empresas e instituições',
      'about.h2.text':
        'Press tours, programação cultural e ações sob medida: do encontro presencial à apresentação no palco.',
      'about.h3.title': 'Pesquisa e curadoria',
      'about.h3.text':
        'Roteiros autorais que conectam história, literatura, arquitetura e memória aos lugares do Rio.',
      'flaneur.eyebrow': 'Comunidade Rioclássica',
      'flaneur.title': 'O espírito do Flâneur na Rioclássica',
      'flaneur.text1':
        'Na Rioclássica, acreditamos que uma cidade não se revela na pressa. Por isso, resgatamos a figura histórica do flâneur (pronuncia-se flanêr), o caminhante observador que nasceu na Paris do século XIX e encontrou morada natural no Rio da Belle Époque.',
      'flaneur.text2':
        'Consagrado por Charles Baudelaire como o "observador apaixonado" da vida urbana, definido por Honoré de Balzac como a "gastronomia dos olhos" e traduzido para a alma carioca por João do Rio como "a distinção de perambular com inteligência", o flâneur é aquele que desacelera o passo para ler as ruas como um livro aberto.',
      'flaneur.text3':
        'Mais do que visitar monumentos, convidamos você a caminhar com olhar atento e curioso, transformando cada fachada, café histórico e esquina em descoberta cultural.',
      'flaneur.proof':
        'Mais de 3.000 flâneurs do Brasil e do mundo já caminharam pelo Rio com a Rioclássica.',
      'flaneur.cta': 'Quero ser um flâneur',
      'flaneur.ctaSecondary': 'Ver próximas experiências',
      'services.title': 'O que podemos criar juntos',
      'services.subtitle':
        'Para quem quer viver a cidade e para organizações que querem oferecer essa experiência',
      'services.s0.title': 'Roteiros abertos e privativos',
      'services.s0.text':
        'Experiências de sábado e percursos sob medida para pessoas, famílias e pequenos grupos.',
      'services.s1.title': 'Experiências para clientes e convidados',
      'services.s1.text':
        'Roteiros culturais para ações de relacionamento, recepção de visitantes e encontros especiais.',
      'services.s2.title': 'Press tours e ações de marca',
      'services.s2.text':
        'Percursos que conectam a cidade ao universo de uma produção, campanha ou marca.',
      'services.s3.title': 'Programação para eventos',
      'services.s3.text':
        'Caminhadas temáticas e tours virtuais que integram a programação de festivais e encontros corporativos.',
      'services.s4.title': 'Experiências educativas',
      'services.s4.text':
        'Roteiros para escolas e instituições de ensino, aproximando os conteúdos da vivência na cidade.',
      'services.s5.title': 'Palestras e encontros',
      'services.s5.text':
        'Conversas sobre turismo cultural, economia criativa, empreendedorismo e criação de experiências.',
      'projects.title': 'Projetos e parcerias',
      'projects.subtitle': 'Alguns caminhos que já trilhamos com marcas, instituições e escolas',
      'founder.title': 'Quem está à frente da Rioclássica',
      'founder.role': 'Fundadora e diretora',
      'founder.text1':
        'Empresária à frente da Rioclássica, guia de turismo e pesquisadora do Rio Antigo, Fernanda Duarte dedica seu trabalho a criar novas formas de conhecer e vivenciar a cidade.',
      'founder.text2':
        'Sua atuação reúne pesquisa histórica, literatura, patrimônio e criação de experiências, com atenção às histórias que dão sentido aos lugares. É colunista do Diário do Rio, onde assina “Aconteceu no Rio Antigo”, e leva sua experiência a palestras, encontros e projetos culturais.',
      'founder.text3':
        'Na Rioclássica, dirige a criação de roteiros e o desenvolvimento de propostas para diferentes públicos e instituições.',
      'process.title': 'Nosso processo',
      'process.subtitle':
        'Cada experiência começa com uma boa conexão entre você (ou sua organização), o perfil do público e as histórias da cidade.',
      'process.p1.title': 'Entender',
      'process.p1.text': 'Conhecemos os objetivos, o público e o contexto da ação.',
      'process.p2.title': 'Criar',
      'process.p2.text': 'Selecionamos temas, lugares e narrativas para desenvolver a proposta.',
      'process.p3.title': 'Planejar',
      'process.p3.text': 'Definimos o formato, a duração, o percurso e os recursos necessários.',
      'process.p4.title': 'Realizar',
      'process.p4.text':
        'Conduzimos a experiência com atenção ao conteúdo, à organização e aos participantes.',
      'universes.title': 'Universos que exploramos',
      'universes.text':
        'Literatura e Machado de Assis · História da moda · Igrejas históricas e música sacra · Confeitarias e gastronomia · Patrimônio e memória do Rio',
      'universes.note':
        'Os temas e formatos podem ser combinados em propostas desenvolvidas para cada projeto.',
      'partners.title': 'Apoio',
      'partners.subtitle': 'Instituições e marcas que caminham conosco',
      'saturdays.title': 'Experiências de Sábado',
      'saturdays.subtitle': 'Roteiros abertos | Vagas limitadas para garantir profundidade',
      'roteiros.title': 'Roteiros fixos',
      'roteiros.subtitle': 'Experiências privativas | Customize sua jornada histórica',
      'card.e.title': 'Um dia no Rio Antigo',
      'card.e.subtitle': 'Patrimônio, memória e descoberta',
      'card.e.desc':
        'Um percurso pelo Centro Histórico que aproxima os participantes dos lugares e das histórias que moldaram a cidade. Uma imersão no patrimônio carioca para conhecer o Rio Antigo e a própria história.',
      'card.a.title': 'Tour pelas Igrejas Históricas',
      'card.a.subtitle': 'Fé, Arquitetura Barroca e Colonial',
      'card.a.desc':
        'Caminhada através dos templos que definiram a paisagem espiritual do Rio. Inclui a Basílica da Candelária, Igreja de São Francisco da Penitência e suas gemas arquitetônicas escondidas.',
      'card.b.title': 'Centro do Rio Imperial',
      'card.b.subtitle': 'Uma Viagem no Tempo pela Corte',
      'card.b.desc':
        'Praça XV, Paço Imperial e as intrigas políticas que moldaram a história. Compreenda os trâmites administrativos e as estratégias que construíram a identidade carioca.',
      'card.c.title': 'Confeitarias Históricas do Rio',
      'card.c.subtitle': 'A Sofisticação da Belle Époque',
      'card.c.desc':
        'Degustação e história através da Confeitaria Colombo, Casa Cavé, Manon e outras joias da tradição carioca. Uma experiência sensorial que conecta passado e presente.',
      'card.d.title': 'Encontro Literário',
      'card.d.subtitle': 'Machado de Assis e Contexto Histórico',
      'card.d.desc':
        'Imersão nos contos clássicos como "A Cartomante" e "Missa do Galo". Uma fusão de leitura dramatizada, análise contextual e caminhada pelos espaços que inspiraram os textos.',
      'meta.duration': '⏱️ 3h a 4h',
      'meta.languages': '🌍 PT / EN / ES / FR',
      'gallery.title': 'Galeria dos nossos flâneurs',
      'gallery.subtitle': 'Registros dos nossos flâneurs desvendando a alma do Rio',
      'playlist.title': 'Trilha Sonora',
      'playlist.subtitle': 'Ouça a playlist que acompanha a experiência Rioclássica',
      'playlist.label': 'Rioclássica · Spotify',
      'playlist.by': 'Curadoria de Fernanda Duarte',
      'playlist.open': 'Abrir no Spotify',
      'contact.title': 'Qual história vamos viver juntos?',
      'contact.subtitle':
        'Pronto para se tornar um flâneur? Escolha um roteiro de sábado ou personalize sua imersão privativa.',
      'contact.whatsapp': 'Conversar no WhatsApp',
      'contact.instagram': '@rioclassica',
      'contact.founder': 'Fernanda Duarte · Fundadora e diretora',
      'footer.company': 'Rioclássica · Turismo e Cultura',
      'footer.desc': 'Mais que turismo, experiências de vida.',
      'footer.nav': 'Navegação',
      'footer.about': 'Quem Somos',
      'footer.flaneur': 'Flâneur',
      'footer.projects': 'Projetos',
      'footer.saturdays': 'Sábados',
      'footer.roteiros': 'Roteiros',
      'footer.contact': 'Contato',
      'footer.social': 'Redes Sociais',
      'footer.copyright': '© 2026 Rioclássica. Todos os direitos reservados.',
      'ui.viewDetails': 'Ver detalhes',
      'ui.reserveNow': 'Reservar agora',
      'ui.loading': 'Carregando conteúdo…',
      'ui.whatsappTitle': 'Conversar no WhatsApp',
      'page.title': 'Rioclássica · Turismo e Cultura'
    },
    en: {
      'nav.about': 'About Us',
      'nav.flaneur': 'Flâneur',
      'nav.more': 'More',
      'nav.services': 'Services',
      'nav.projects': 'Projects',
      'nav.saturdays': 'Experiences',
      'nav.roteiros': 'Tours',
      'nav.gallery': 'Gallery',
      'nav.contact': 'Contact',
      'nav.language': 'Language',
      'hero.eyebrow': 'Rioclássica · Tourism & Culture',
      'hero.title': 'More than tourism: life experiences',
      'hero.subtitle':
        'Cultural itineraries for people who want to know Rio and for companies, brands and institutions that want to connect people to the city.',
      'hero.btn': 'See upcoming experiences',
      'hero.btnSecondary': 'Explore tours',
      'about.title': 'The city as a place of encounter and discovery',
      'about.subtitle': 'To know Old Rio is to know your own history.',
      'about.text':
        'Rioclássica is a tourism and culture agency that creates experiences from the history, literature, architecture, art and memory of Rio de Janeiro. With research and original curation, we develop itineraries that bring people closer to the city and expand their cultural repertoire.',
      'about.text2':
        'We welcome anyone who wants to experience Old Rio on an open Saturday or a private tour, and also companies, brands and institutions seeking experiences aligned with their audience and project goals.',
      'about.h1.title': 'For you',
      'about.h1.text':
        'Saturday experiences and private itineraries to know the city with depth and presence.',
      'about.h2.title': 'For companies and institutions',
      'about.h2.text':
        'Press tours, cultural programming and tailored actions: from walking tours to the stage.',
      'about.h3.title': 'Research and curation',
      'about.h3.text':
        'Original itineraries connecting history, literature, architecture and memory to places in Rio.',
      'flaneur.eyebrow': 'Rioclássica Community',
      'flaneur.title': 'The spirit of the Flâneur at Rioclássica',
      'flaneur.text1':
        'At Rioclássica, we believe a city does not reveal itself in a hurry. That is why we reclaim the historical figure of the flâneur (pronounced flanêr), the observant walker born in nineteenth-century Paris who found a natural home in Belle Époque Rio.',
      'flaneur.text2':
        'Celebrated by Charles Baudelaire as the "passionate observer" of urban life, defined by Honoré de Balzac as the "gastronomy of the eyes" and translated into the carioca soul by João do Rio as "the distinction of wandering with intelligence", the flâneur is the one who slows down to read the streets like an open book.',
      'flaneur.text3':
        'More than visiting monuments, we invite you to walk with an attentive and curious gaze, turning every façade, historic café and street corner into a cultural discovery.',
      'flaneur.proof':
        'Over 3,000 flâneurs from Brazil and around the world have walked through Rio with Rioclássica.',
      'flaneur.cta': 'I want to be a flâneur',
      'flaneur.ctaSecondary': 'See upcoming experiences',
      'services.title': 'What we can create together',
      'services.subtitle':
        'For people who want to live the city and for organizations that want to offer that experience',
      'services.s0.title': 'Open and private tours',
      'services.s0.text':
        'Saturday experiences and tailored routes for individuals, families and small groups.',
      'services.s1.title': 'Experiences for clients and guests',
      'services.s1.text':
        'Cultural itineraries for relationship actions, visitor reception and special gatherings.',
      'services.s2.title': 'Press tours and brand actions',
      'services.s2.text':
        'Routes that connect the city to the universe of a production, campaign or brand.',
      'services.s3.title': 'Event programming',
      'services.s3.text':
        'Thematic walks and virtual tours that integrate festival and corporate event programs.',
      'services.s4.title': 'Educational experiences',
      'services.s4.text':
        'Itineraries for schools and educational institutions, bringing content into the city.',
      'services.s5.title': 'Talks and meetings',
      'services.s5.text':
        'Conversations on cultural tourism, creative economy, entrepreneurship and experience design.',
      'projects.title': 'Projects and partnerships',
      'projects.subtitle': 'Experiences delivered with brands, institutions and schools',
      'founder.title': 'Who leads Rioclássica',
      'founder.role': 'Founder and director',
      'founder.text1':
        'Entrepreneur behind Rioclássica, tour guide and researcher of Old Rio, Fernanda Duarte dedicates her work to creating new ways to know and experience the city.',
      'founder.text2':
        'Her work brings together historical research, literature, heritage and experience design, with attention to the stories that give meaning to places. She is a columnist at Diário do Rio (“Aconteceu no Rio Antigo”) and brings her experience to talks, gatherings and cultural projects.',
      'founder.text3':
        'At Rioclássica, she directs itinerary creation and proposals for different audiences and institutions.',
      'process.title': 'Our process',
      'process.subtitle':
        'Every experience starts with a good connection between you (or your organization), the audience and the city\'s stories.',
      'process.p1.title': 'Understand',
      'process.p1.text': 'We learn the goals, audience and context of the action.',
      'process.p2.title': 'Create',
      'process.p2.text': 'We select themes, places and narratives to develop the proposal.',
      'process.p3.title': 'Plan',
      'process.p3.text': 'We define format, duration, route and required resources.',
      'process.p4.title': 'Deliver',
      'process.p4.text':
        'We lead the experience with attention to content, organization and participants.',
      'universes.title': 'Universes we explore',
      'universes.text':
        'Literature and Machado de Assis · Fashion history · Historic churches and sacred music · Pastry shops and gastronomy · Heritage and memory of Rio',
      'universes.note':
        'Themes and formats can be combined into proposals developed for each project.',
      'partners.title': 'Support',
      'partners.subtitle': 'Institutions and brands that walk with us',
      'saturdays.title': 'Saturday Experiences',
      'saturdays.subtitle': 'Open tours | Limited spots for depth',
      'roteiros.title': 'Fixed itineraries',
      'roteiros.subtitle': 'Private experiences | Customize your historical journey',
      'card.e.title': 'A Day in Old Rio',
      'card.e.subtitle': 'Heritage, memory and discovery',
      'card.e.desc':
        'A walk through the Historic Center that brings participants closer to the places and stories that shaped the city. An immersion in carioca heritage to know Old Rio and your own history.',
      'card.a.title': 'Historic Churches Tour',
      'card.a.subtitle': 'Faith, Baroque and Colonial Architecture',
      'card.a.desc':
        'A walk through the temples that defined Rio\'s spiritual landscape. Includes Candelária Basilica, São Francisco da Penitência Church and their hidden architectural gems.',
      'card.b.title': 'Imperial Rio Downtown',
      'card.b.subtitle': 'A Journey Through the Court',
      'card.b.desc':
        'Praça XV, Imperial Palace and the political intrigues that shaped history. Understand the administrative processes and strategies that built carioca identity.',
      'card.c.title': 'Historic Rio Pastry Shops',
      'card.c.subtitle': 'Belle Époque Sophistication',
      'card.c.desc':
        'Tasting and history at Confeitaria Colombo, Casa Cavé, Manon and other jewels of carioca tradition. A sensory experience connecting past and present.',
      'card.d.title': 'Literary Gathering',
      'card.d.subtitle': 'Machado de Assis and Historical Context',
      'card.d.desc':
        'Immersion in classic tales such as "The Fortune Teller" and "The Christmas Eve Mass." A blend of dramatic reading, contextual analysis and a walk through inspiring spaces.',
      'meta.duration': '⏱️ 3 to 4 hours',
      'meta.languages': '🌍 PT / EN / ES / FR',
      'gallery.title': 'Gallery of our flâneurs',
      'gallery.subtitle': 'Moments of our flâneurs uncovering the soul of Rio',
      'playlist.title': 'Soundtrack',
      'playlist.subtitle': 'Listen to the playlist that accompanies the Rioclássica experience',
      'playlist.label': 'Rioclássica · Spotify',
      'playlist.by': 'Curated by Fernanda Duarte',
      'playlist.open': 'Open on Spotify',
      'contact.title': 'Which story shall we live together?',
      'contact.subtitle':
        'Ready to become a flâneur? Choose a Saturday itinerary or customize your private immersion.',
      'contact.whatsapp': 'Chat on WhatsApp',
      'contact.instagram': '@rioclassica',
      'contact.founder': 'Fernanda Duarte · Founder and director',
      'footer.company': 'Rioclássica · Tourism & Culture',
      'footer.desc': 'More than tourism: life experiences.',
      'footer.nav': 'Navigation',
      'footer.about': 'About Us',
      'footer.flaneur': 'Flâneur',
      'footer.projects': 'Projects',
      'footer.saturdays': 'Saturdays',
      'footer.roteiros': 'Tours',
      'footer.contact': 'Contact',
      'footer.social': 'Social Media',
      'footer.copyright': '© 2026 Rioclássica. All rights reserved.',
      'ui.viewDetails': 'View details',
      'ui.reserveNow': 'Book now',
      'ui.loading': 'Loading content…',
      'ui.whatsappTitle': 'Chat on WhatsApp',
      'page.title': 'Rioclássica · Tourism & Culture'
    },
    es: {
      'nav.about': 'Quiénes Somos',
      'nav.flaneur': 'Flâneur',
      'nav.more': 'Más',
      'nav.services': 'Servicios',
      'nav.projects': 'Proyectos',
      'nav.saturdays': 'Experiencias',
      'nav.roteiros': 'Recorridos',
      'nav.gallery': 'Galería',
      'nav.contact': 'Contacto',
      'nav.language': 'Idioma',
      'hero.eyebrow': 'Rioclássica · Turismo y Cultura',
      'hero.title': 'Experiencias culturales para empresas, marcas e instituciones',
      'hero.subtitle':
        'Historia, creatividad y curaduría para conectar personas a Río de Janeiro. Más que turismo, experiencias de vida.',
      'hero.btn': 'Conocer nuestros proyectos',
      'about.title': 'La ciudad como lugar de encuentro y descubrimiento',
      'about.subtitle': 'Conocer el Río Antiguo es conocer la propia historia.',
      'about.text':
        'Rioclássica es una agencia de turismo y cultura que crea experiencias a partir de la historia, la literatura, la arquitectura, el arte y la memoria de Río de Janeiro. Con investigación y curaduría autoral, desarrollamos recorridos que acercan a las personas a la ciudad y amplían su repertorio cultural.',
      'about.text2':
        'Para empresas, marcas e instituciones, traducimos ese trabajo en experiencias alineadas al perfil del público y a los objetivos de cada proyecto, del encuentro presencial a la presentación en el escenario.',
      'about.h1.title': 'Investigación y curaduría',
      'about.h1.text':
        'Recorridos autorales que conectan historia, literatura, arquitectura y memoria con los lugares de la ciudad.',
      'about.h2.title': 'Para marcas e instituciones',
      'about.h2.text':
        'Experiencias alineadas al perfil del público y a los objetivos de cada proyecto: del tour presencial al escenario.',
      'about.h3.title': 'Más que turismo',
      'about.h3.text':
        'Experiencias de vida que acercan a las personas a la ciudad y amplían el repertorio cultural.',
      'flaneur.eyebrow': 'Comunidad Rioclássica',
      'flaneur.title': 'El espíritu del Flâneur en Rioclássica',
      'flaneur.text1':
        'En Rioclássica creemos que una ciudad no se revela con prisa. Por eso rescatamos la figura histórica del flâneur (se pronuncia flanêr), el caminante observador que nació en el París del siglo XIX y encontró morada natural en el Río de la Belle Époque.',
      'flaneur.text2':
        'Consagrado por Charles Baudelaire como el "observador apasionado" de la vida urbana, definido por Honoré de Balzac como la "gastronomía de los ojos" y traducido al alma carioca por João do Rio como "la distinción de deambular con inteligencia", el flâneur es quien desacelera el paso para leer las calles como un libro abierto.',
      'flaneur.text3':
        'Más que visitar monumentos, te invitamos a caminar con mirada atenta y curiosa, transformando cada fachada, café histórico y esquina en un descubrimiento cultural.',
      'flaneur.proof':
        'Más de 3.000 flâneurs de Brasil y del mundo ya caminaron por Río con Rioclássica.',
      'flaneur.cta': 'Quiero ser un flâneur',
      'flaneur.ctaSecondary': 'Ver próximas experiencias',
      'services.title': 'Qué podemos crear juntos',
      'services.subtitle': 'Formatos a medida para el propósito de su organización',
      'services.s1.title': 'Experiencias para clientes e invitados',
      'services.s1.text':
        'Recorridos culturales para acciones de relacionamiento, recepción de visitantes y encuentros especiales.',
      'services.s2.title': 'Press tours y acciones de marca',
      'services.s2.text':
        'Trayectos que conectan la ciudad al universo de una producción, campaña o marca.',
      'services.s3.title': 'Programación para eventos',
      'services.s3.text':
        'Caminatas temáticas y tours virtuales que integran la programación de festivales y encuentros corporativos.',
      'services.s4.title': 'Experiencias educativas',
      'services.s4.text':
        'Recorridos para escuelas e instituciones de enseñanza, acercando los contenidos a la vivencia en la ciudad.',
      'services.s5.title': 'Charlas y encuentros',
      'services.s5.text':
        'Conversaciones sobre turismo cultural, economía creativa, emprendimiento y creación de experiencias.',
      'projects.title': 'Proyectos y alianzas',
      'projects.subtitle': 'Experiencias realizadas con marcas, instituciones y escuelas',
      'founder.title': 'Quién está al frente de Rioclássica',
      'founder.role': 'Fundadora y directora',
      'founder.text1':
        'Empresaria al frente de Rioclássica, guía de turismo e investigadora del Río Antiguo, Fernanda Duarte dedica su trabajo a crear nuevas formas de conocer y vivir la ciudad.',
      'founder.text2':
        'Su actuación reúne investigación histórica, literatura, patrimonio y creación de experiencias, con atención a las historias que dan sentido a los lugares. Es columnista de Diário do Rio (“Aconteceu no Rio Antigo”) y lleva su experiencia a charlas, encuentros y proyectos culturales.',
      'founder.text3':
        'En Rioclássica, dirige la creación de recorridos y el desarrollo de propuestas para distintos públicos e instituciones.',
      'process.title': 'Nuestro proceso',
      'process.subtitle':
        'Cada proyecto comienza con una buena conexión entre el propósito de su organización, el perfil del público y las historias de la ciudad.',
      'process.p1.title': 'Entender',
      'process.p1.text': 'Conocemos los objetivos, el público y el contexto de la acción.',
      'process.p2.title': 'Crear',
      'process.p2.text': 'Seleccionamos temas, lugares y narrativas para desarrollar la propuesta.',
      'process.p3.title': 'Planificar',
      'process.p3.text': 'Definimos el formato, la duración, el recorrido y los recursos necesarios.',
      'process.p4.title': 'Realizar',
      'process.p4.text':
        'Conducimos la experiencia con atención al contenido, a la organización y a los participantes.',
      'universes.title': 'Universos que exploramos',
      'universes.text':
        'Literatura y Machado de Assis · Historia de la moda · Iglesias históricas y música sacra · Confiterías y gastronomía · Patrimonio y memoria de Río',
      'universes.note':
        'Los temas y formatos pueden combinarse en propuestas desarrolladas para cada proyecto.',
      'partners.title': 'Realización y apoyo',
      'partners.subtitle': 'Instituciones y marcas que caminan con nosotros',
      'saturdays.title': 'Experiencias del Sábado',
      'saturdays.subtitle': 'Recorridos abiertos | Plazas limitadas para profundidad',
      'roteiros.title': 'Recorridos fijos',
      'roteiros.subtitle': 'Experiencias privadas | Personaliza tu viaje histórico',
      'card.e.title': 'Un día en el Río Antiguo',
      'card.e.subtitle': 'Patrimonio, memoria y descubrimiento',
      'card.e.desc':
        'Un recorrido por el Centro Histórico que acerca a los participantes a los lugares e historias que moldearon la ciudad. Una inmersión en el patrimonio carioca para conocer el Río Antiguo y la propia historia.',
      'card.a.title': 'Tour por las Iglesias Históricas',
      'card.a.subtitle': 'Fe, Arquitectura Barroca y Colonial',
      'card.a.desc':
        'Caminata por los templos que definieron el paisaje espiritual del Río. Incluye la Basílica de la Candelaria, la Iglesia de San Francisco de la Penitencia y sus joyas arquitectónicas ocultas.',
      'card.b.title': 'Centro del Río Imperial',
      'card.b.subtitle': 'Un Viaje en el Tiempo por la Corte',
      'card.b.desc':
        'Praça XV, Palacio Imperial y las intrigas políticas que moldearon la historia. Comprende los trámites administrativos y las estrategias que construyeron la identidad carioca.',
      'card.c.title': 'Confiterías Históricas del Río',
      'card.c.subtitle': 'La Sofisticación de la Belle Époque',
      'card.c.desc':
        'Degustación e historia en la Confeitaria Colombo, Casa Cavé, Manon y otras joyas de la tradición carioca. Una experiencia sensorial que conecta pasado y presente.',
      'card.d.title': 'Encuentro Literario',
      'card.d.subtitle': 'Machado de Assis y Contexto Histórico',
      'card.d.desc':
        'Inmersión en cuentos clásicos como "La cartomante" y "La misa del gallo". Fusión de lectura dramatizada, análisis contextual y caminata por los espacios que inspiraron los textos.',
      'meta.duration': '⏱️ 3h a 4h',
      'meta.languages': '🌍 PT / EN / ES / FR',
      'gallery.title': 'Galería de nuestros flâneurs',
      'gallery.subtitle': 'Registros de nuestros flâneurs descubriendo el alma de Río',
      'playlist.title': 'Banda Sonora',
      'playlist.subtitle': 'Escucha la playlist que acompaña la experiencia Rioclássica',
      'playlist.label': 'Rioclássica · Spotify',
      'playlist.by': 'Curaduría de Fernanda Duarte',
      'playlist.open': 'Abrir en Spotify',
      'contact.title': '¿Qué historia vamos a vivir juntos?',
      'contact.subtitle':
        '¿Listo para convertirte en un flâneur? Elige un recorrido de sábado o personaliza tu inmersión privada.',
      'contact.whatsapp': 'Hablar por WhatsApp',
      'contact.instagram': '@rioclassica',
      'contact.founder': 'Fernanda Duarte · Fundadora y directora',
      'footer.company': 'Rioclássica · Turismo y Cultura',
      'footer.desc': 'Más que turismo, experiencias de vida.',
      'footer.nav': 'Navegación',
      'footer.about': 'Quiénes Somos',
      'footer.flaneur': 'Flâneur',
      'footer.projects': 'Proyectos',
      'footer.saturdays': 'Sábados',
      'footer.roteiros': 'Recorridos',
      'footer.contact': 'Contacto',
      'footer.social': 'Redes Sociales',
      'footer.copyright': '© 2026 Rioclássica. Todos los derechos reservados.',
      'ui.viewDetails': 'Ver detalles',
      'ui.reserveNow': 'Reservar ahora',
      'ui.loading': 'Cargando contenido…',
      'ui.whatsappTitle': 'Chatear en WhatsApp',
      'page.title': 'Rioclássica · Turismo y Cultura'
    },
    fr: {
      'nav.about': 'Qui Sommes-Nous',
      'nav.flaneur': 'Flâneur',
      'nav.more': 'Plus',
      'nav.services': 'Services',
      'nav.projects': 'Projets',
      'nav.saturdays': 'Expériences',
      'nav.roteiros': 'Parcours',
      'nav.gallery': 'Galerie',
      'nav.contact': 'Contact',
      'nav.language': 'Langue',
      'hero.eyebrow': 'Rioclássica · Tourisme et Culture',
      'hero.title': 'Expériences culturelles pour entreprises, marques et institutions',
      'hero.subtitle':
        'Histoire, créativité et curation pour relier les personnes à Rio de Janeiro. Plus que du tourisme, des expériences de vie.',
      'hero.btn': 'Découvrir nos projets',
      'about.title': 'La ville comme lieu de rencontre et de découverte',
      'about.subtitle': 'Connaître le Vieux Rio, c\'est connaître sa propre histoire.',
      'about.text':
        'Rioclássica est une agence de tourisme et de culture qui crée des expériences à partir de l\'histoire, de la littérature, de l\'architecture, de l\'art et de la mémoire de Rio de Janeiro. Avec recherche et curation originale, nous développons des parcours qui rapprochent les personnes de la ville et élargissent leur répertoire culturel.',
      'about.text2':
        'Pour les entreprises, marques et institutions, nous traduisons ce travail en expériences alignées sur le public et les objectifs de chaque projet, de la rencontre en présentiel à la présentation sur scène.',
      'about.h1.title': 'Recherche et curation',
      'about.h1.text':
        'Parcours originaux qui relient histoire, littérature, architecture et mémoire aux lieux de la ville.',
      'about.h2.title': 'Pour marques et institutions',
      'about.h2.text':
        'Expériences alignées sur le public et les objectifs de chaque projet: de la visite à pied à la scène.',
      'about.h3.title': 'Plus que du tourisme',
      'about.h3.text':
        'Des expériences de vie qui rapprochent les personnes de la ville et élargissent le répertoire culturel.',
      'flaneur.eyebrow': 'Communauté Rioclássica',
      'flaneur.title': 'L\'esprit du Flâneur chez Rioclássica',
      'flaneur.text1':
        'Chez Rioclássica, nous croyons qu\'une ville ne se révèle pas dans la précipitation. C\'est pourquoi nous ressuscitons la figure historique du flâneur (prononcé flanêr), le marcheur observateur né dans le Paris du XIXe siècle et qui trouva une demeure naturelle dans le Rio de la Belle Époque.',
      'flaneur.text2':
        'Consacré par Charles Baudelaire comme l\'"observateur passionné" de la vie urbaine, défini par Honoré de Balzac comme la "gastronomie des yeux" et traduit dans l\'âme carioca par João do Rio comme "la distinction de flâner avec intelligence", le flâneur est celui qui ralentit le pas pour lire les rues comme un livre ouvert.',
      'flaneur.text3':
        'Plus que visiter des monuments, nous vous invitons à marcher avec un regard attentif et curieux, transformant chaque façade, café historique et coin de rue en découverte culturelle.',
      'flaneur.proof':
        'Plus de 3 000 flâneurs du Brésil et du monde entier ont déjà parcouru Rio avec Rioclássica.',
      'flaneur.cta': 'Je veux être un flâneur',
      'flaneur.ctaSecondary': 'Voir les prochaines expériences',
      'services.title': 'Ce que nous pouvons créer ensemble',
      'services.subtitle': 'Formats sur mesure pour la mission de votre organisation',
      'services.s1.title': 'Expériences pour clients et invités',
      'services.s1.text':
        'Parcours culturels pour actions relationnelles, accueil de visiteurs et rencontres spéciales.',
      'services.s2.title': 'Press tours et actions de marque',
      'services.s2.text':
        'Itinéraires qui relient la ville à l\'univers d\'une production, d\'une campagne ou d\'une marque.',
      'services.s3.title': 'Programmation pour événements',
      'services.s3.text':
        'Promenades thématiques et tours virtuels qui intègrent la programmation de festivals et de rencontres d\'entreprise.',
      'services.s4.title': 'Expériences éducatives',
      'services.s4.text':
        'Parcours pour écoles et institutions d\'enseignement, rapprochant les contenus de la ville.',
      'services.s5.title': 'Conférences et rencontres',
      'services.s5.text':
        'Échanges sur le tourisme culturel, l\'économie créative, l\'entrepreneuriat et la création d\'expériences.',
      'projects.title': 'Projets et partenariats',
      'projects.subtitle': 'Expériences réalisées avec des marques, institutions et écoles',
      'founder.title': 'Qui dirige Rioclássica',
      'founder.role': 'Fondatrice et directrice',
      'founder.text1':
        'Entrepreneure à la tête de Rioclássica, guide de tourisme et chercheuse du Vieux Rio, Fernanda Duarte consacre son travail à créer de nouvelles façons de connaître et de vivre la ville.',
      'founder.text2':
        'Son travail réunit recherche historique, littérature, patrimoine et création d\'expériences, avec attention aux histoires qui donnent sens aux lieux. Elle est chroniqueuse au Diário do Rio (« Aconteceu no Rio Antigo ») et partage son expérience dans des conférences, rencontres et projets culturels.',
      'founder.text3':
        'Chez Rioclássica, elle dirige la création de parcours et le développement de propositions pour différents publics et institutions.',
      'process.title': 'Notre processus',
      'process.subtitle':
        'Chaque projet commence par une bonne connexion entre la mission de votre organisation, le profil du public et les histoires de la ville.',
      'process.p1.title': 'Comprendre',
      'process.p1.text': 'Nous connaissons les objectifs, le public et le contexte de l\'action.',
      'process.p2.title': 'Créer',
      'process.p2.text': 'Nous sélectionnons thèmes, lieux et récits pour développer la proposition.',
      'process.p3.title': 'Planifier',
      'process.p3.text': 'Nous définissons le format, la durée, le parcours et les ressources nécessaires.',
      'process.p4.title': 'Réaliser',
      'process.p4.text':
        'Nous conduisons l\'expérience avec attention au contenu, à l\'organisation et aux participants.',
      'universes.title': 'Univers que nous explorons',
      'universes.text':
        'Littérature et Machado de Assis · Histoire de la mode · Églises historiques et musique sacrée · Pâtisseries et gastronomie · Patrimoine et mémoire de Rio',
      'universes.note':
        'Les thèmes et formats peuvent être combinés dans des propositions développées pour chaque projet.',
      'partners.title': 'Réalisation et soutien',
      'partners.subtitle': 'Institutions et marques qui marchent avec nous',
      'saturdays.title': 'Expériences du Samedi',
      'saturdays.subtitle': 'Parcours ouverts | Places limitées pour la profondeur',
      'roteiros.title': 'Parcours fixes',
      'roteiros.subtitle': 'Expériences privées | Personnalisez votre voyage historique',
      'card.e.title': 'Une journée dans le Vieux Rio',
      'card.e.subtitle': 'Patrimoine, mémoire et découverte',
      'card.e.desc':
        'Un parcours dans le Centre Historique qui rapproche les participants des lieux et des histoires qui ont façonné la ville. Une immersion dans le patrimoine carioca pour connaître le Vieux Rio et sa propre histoire.',
      'card.a.title': 'Tour des Églises Historiques',
      'card.a.subtitle': 'Foi, Architecture Baroque et Coloniale',
      'card.a.desc':
        'Promenade à travers les temples qui ont défini le paysage spirituel de Rio. Inclut la basilique Candelária, l\'église São Francisco da Penitência et leurs joyaux architecturaux cachés.',
      'card.b.title': 'Centre du Rio Impérial',
      'card.b.subtitle': 'Un Voyage dans le Temps à la Cour',
      'card.b.desc':
        'Praça XV, Palais Impérial et les intrigues politiques qui ont façonné l\'histoire. Comprenez les démarches administratives et les stratégies qui ont construit l\'identité carioca.',
      'card.c.title': 'Pâtisseries Historiques de Rio',
      'card.c.subtitle': 'La Sophistication de la Belle Époque',
      'card.c.desc':
        'Dégustation et histoire à la Confeitaria Colombo, Casa Cavé, Manon et d\'autres joyaux de la tradition carioca. Une expérience sensorielle entre passé et présent.',
      'card.d.title': 'Rencontre Littéraire',
      'card.d.subtitle': 'Machado de Assis et Contexte Historique',
      'card.d.desc':
        'Immersion dans des contes classiques comme « La Voyante » et « La Messe du coq ». Fusion de lecture dramatisée, analyse contextuelle et promenade dans les lieux inspirateurs.',
      'meta.duration': '⏱️ 3h à 4h',
      'meta.languages': '🌍 PT / EN / ES / FR',
      'gallery.title': 'Galerie de nos flâneurs',
      'gallery.subtitle': 'Images de nos flâneurs découvrant l\'âme de Rio',
      'playlist.title': 'Bande Sonore',
      'playlist.subtitle': 'Écoutez la playlist qui accompagne l\'expérience Rioclássica',
      'playlist.label': 'Rioclássica · Spotify',
      'playlist.by': 'Sélection de Fernanda Duarte',
      'playlist.open': 'Ouvrir sur Spotify',
      'contact.title': 'Quelle histoire allons-nous vivre ensemble ?',
      'contact.subtitle':
        'Prêt à devenir un flâneur ? Choisissez un parcours du samedi ou personnalisez votre immersion privée.',
      'contact.whatsapp': 'Discuter sur WhatsApp',
      'contact.instagram': '@rioclassica',
      'contact.founder': 'Fernanda Duarte · Fondatrice et directrice',
      'footer.company': 'Rioclássica · Tourisme et Culture',
      'footer.desc': 'Plus que du tourisme, des expériences de vie.',
      'footer.nav': 'Navigation',
      'footer.about': 'Qui Sommes-Nous',
      'footer.flaneur': 'Flâneur',
      'footer.projects': 'Projets',
      'footer.saturdays': 'Samedis',
      'footer.roteiros': 'Parcours',
      'footer.contact': 'Contact',
      'footer.social': 'Réseaux Sociaux',
      'footer.copyright': '© 2026 Rioclássica. Tous droits réservés.',
      'ui.viewDetails': 'Voir les détails',
      'ui.reserveNow': 'Réserver',
      'ui.loading': 'Chargement du contenu…',
      'ui.whatsappTitle': 'Discuter sur WhatsApp',
      'page.title': 'Rioclássica · Tourisme et Culture'
    }
  };

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }

  function t(key) {
    const lang = getLang();
    return translations[lang]?.[key] ?? translations[DEFAULT_LANG]?.[key] ?? key;
  }

  function applyLanguage(lang) {
    if (!translations[lang]) lang = DEFAULT_LANG;

    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = translations[lang][key];
      if (value == null) return;
      el.textContent = value;
    });

    document.title = translations[lang]['page.title'] || translations[DEFAULT_LANG]['page.title'];

    const waFloat = document.getElementById('whatsapp-float');
    if (waFloat) {
      waFloat.title = translations[lang]['ui.whatsappTitle'] || '';
    }

    document.querySelectorAll('.lang-option').forEach((btn) => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    updateLangDropdownTrigger(lang);
    closeLangDropdown();

    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  function updateLangDropdownTrigger(lang) {
    const meta = LANG_META[lang] || LANG_META[DEFAULT_LANG];
    const flagEl = document.getElementById('langCurrentFlag');
    const codeEl = document.getElementById('langCurrentCode');
    if (flagEl) {
      flagEl.className = `lang-flag fi ${meta.flagClass}`;
      flagEl.setAttribute('aria-hidden', 'true');
    }
    if (codeEl) codeEl.textContent = meta.code;
  }

  function isMobileNav() {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  function closeLangDropdown() {
    const root = document.getElementById('langDropdown');
    const menu = document.getElementById('langDropdownMenu');
    const trigger = document.getElementById('langDropdownTrigger');
    if (!root) return;
    root.classList.remove('open');
    if (isMobileNav()) {
      if (menu) menu.hidden = false;
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      return;
    }
    if (menu) menu.hidden = true;
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  }

  function toggleLangDropdown() {
    if (isMobileNav()) return;
    const root = document.getElementById('langDropdown');
    const menu = document.getElementById('langDropdownMenu');
    const trigger = document.getElementById('langDropdownTrigger');
    if (!root || !menu || !trigger) return;
    const open = !root.classList.contains('open');
    root.classList.toggle('open', open);
    menu.hidden = !open;
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function initLanguageSelector() {
    const trigger = document.getElementById('langDropdownTrigger');
    const root = document.getElementById('langDropdown');
    const menu = document.getElementById('langDropdownMenu');

    trigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleLangDropdown();
    });

    const syncMobileLangMenu = () => {
      if (!menu) return;
      if (isMobileNav()) {
        menu.hidden = false;
        root?.classList.remove('open');
      } else if (!root?.classList.contains('open')) {
        menu.hidden = true;
      }
    };

    window.addEventListener('resize', syncMobileLangMenu);
    syncMobileLangMenu();

    document.querySelectorAll('.lang-option').forEach((btn) => {
      btn.addEventListener('click', () => {
        applyLanguage(btn.dataset.lang);
        if (typeof window.closeMobileNav === 'function') {
          window.closeMobileNav();
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!root?.contains(e.target)) closeLangDropdown();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLangDropdown();
    });

    applyLanguage(getLang());
  }

  window.t = t;
  window.getLang = getLang;
  window.applyLanguage = applyLanguage;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSelector);
  } else {
    initLanguageSelector();
  }
})();
