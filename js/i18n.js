// Traduções do site — PT-BR, EN, ES, FR

(function () {
  const STORAGE_KEY = 'rioclassica-lang';
  const DEFAULT_LANG = 'pt-BR';

  const LANG_META = {
    'pt-BR': { flag: '🇧🇷', code: 'PT' },
    en: { flag: '🇺🇸', code: 'EN' },
    es: { flag: '🇪🇸', code: 'ES' },
    fr: { flag: '🇫🇷', code: 'FR' }
  };

  const translations = {
    'pt-BR': {
      'nav.about': 'Quem Somos',
      'nav.saturdays': 'Experiências de Sábado',
      'nav.roteiros': 'Roteiros',
      'nav.contact': 'Contato',
      'nav.language': 'Idioma',
      'hero.title': 'Reimagine o Rio: cada pedra conta uma história que define quem você é.',
      'hero.subtitle':
        'Experiências curadas para viajantes da história. Imersões profundas no patrimônio carioca onde arquitetura, literatura e memória se entrelaçam para revelar a identidade singular do Rio.',
      'hero.btn': 'Explorar Próximas Experiências',
      'about.title': 'Quem Somos',
      'about.subtitle': 'Resgate de Identidade e Imersão Histórica',
      'about.text':
        'A RIOCLÁSSICA é uma agência de cultura e turismo histórico dedicada a proporcionar experiências que vão além dos tradicionais passeios turísticos. Fundada no Rio de Janeiro pela Fernanda Duarte, sua missão é oferecer roteiros que mergulham na rica história e cultura do Rio de Janeiro, permitindo que os participantes vivenciem a essência da cidade. Acreditamos que cada passeio é uma oportunidade única de conexão com o passado e com as histórias que moldaram o presente carioca.',
      'about.h1.title': 'Historiadores Credenciados',
      'about.h1.text':
        'Eruditos com formação acadêmica em história, arquitetura e patrimônio que revelam contextos invisíveis a olho desarmado.',
      'about.h2.title': 'Roteiro Iconográfico',
      'about.h2.text':
        'Mapa visual exclusivo de cada experiência, síntese de paisagem, cronologia e significado que você leva para casa.',
      'about.h3.title': 'Aquarela Autoral',
      'about.h3.text':
        'Obra original de Fernanda Duarte: testemunho artístico e tangível de sua jornada pelo patrimônio carioca.',
      'saturdays.title': 'Experiências de Sábado',
      'saturdays.subtitle': 'Roteiros abertos | Vagas limitadas para garantir profundidade',
      'roteiros.title': 'Os Quatro Alicerces',
      'roteiros.subtitle': 'Experiências privativas | Customize sua jornada histórica',
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
      'contact.title': 'Entre em Contato',
      'contact.subtitle': 'Personalize sua próxima imersão histórica',
      'contact.whatsapp': 'Conversar com Atendimento',
      'contact.instagram': '@rioclassica',
      'footer.company': 'Agência Rioclássica de Turismo e Cultura',
      'footer.desc': 'Roteiros culturais exclusivos pelo patrimônio histórico do Rio de Janeiro.',
      'footer.nav': 'Navegação',
      'footer.about': 'Quem Somos',
      'footer.saturdays': 'Sábados',
      'footer.roteiros': 'Roteiros Privativos',
      'footer.contact': 'Contato',
      'footer.social': 'Redes Sociais',
      'footer.copyright': '© 2026 Rio Clássica. Todos os direitos reservados.',
      'ui.viewDetails': 'Ver detalhes',
      'ui.reserveNow': 'Reservar agora',
      'ui.loading': 'Carregando conteúdo…',
      'ui.whatsappTitle': 'Conversar no WhatsApp',
      'page.title': 'Rio Clássica - Roteiros Culturais Exclusivos'
    },
    en: {
      'nav.about': 'About Us',
      'nav.saturdays': 'Saturday Experiences',
      'nav.roteiros': 'Tours',
      'nav.contact': 'Contact',
      'nav.language': 'Language',
      'hero.title': 'Reimagine Rio: every stone tells a story that defines who you are.',
      'hero.subtitle':
        'Curated experiences for history travelers. Deep immersions in Rio\'s heritage where architecture, literature and memory intertwine to reveal the city\'s unique identity.',
      'hero.btn': 'Explore Upcoming Experiences',
      'about.title': 'About Us',
      'about.subtitle': 'Identity Recovery and Historical Immersion',
      'about.text':
        'RIOCLÁSSICA is a cultural and historical tourism agency dedicated to experiences that go beyond traditional sightseeing. Founded in Rio de Janeiro by Fernanda Duarte, its mission is to offer tours that dive into the city\'s rich history and culture, allowing participants to experience the essence of Rio. We believe every tour is a unique opportunity to connect with the past and the stories that shaped carioca life today.',
      'about.h1.title': 'Accredited Historians',
      'about.h1.text':
        'Scholars trained in history, architecture and heritage who reveal contexts invisible to the untrained eye.',
      'about.h2.title': 'Iconographic Tour Map',
      'about.h2.text':
        'An exclusive visual map of each experience—a synthesis of landscape, chronology and meaning you take home.',
      'about.h3.title': 'Original Watercolor',
      'about.h3.text':
        'An original work by Fernanda Duarte: an artistic, tangible witness to your journey through Rio\'s heritage.',
      'saturdays.title': 'Saturday Experiences',
      'saturdays.subtitle': 'Open tours | Limited spots for depth',
      'roteiros.title': 'The Four Pillars',
      'roteiros.subtitle': 'Private experiences | Customize your historical journey',
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
      'meta.duration': '⏱️ 3–4 hours',
      'meta.languages': '🌍 PT / EN / ES / FR',
      'contact.title': 'Get in Touch',
      'contact.subtitle': 'Customize your next historical immersion',
      'contact.whatsapp': 'Chat on WhatsApp',
      'contact.instagram': '@rioclassica',
      'footer.company': 'Rioclássica Tourism and Culture Agency',
      'footer.desc': 'Exclusive cultural tours through Rio de Janeiro\'s historic heritage.',
      'footer.nav': 'Navigation',
      'footer.about': 'About Us',
      'footer.saturdays': 'Saturdays',
      'footer.roteiros': 'Private Tours',
      'footer.contact': 'Contact',
      'footer.social': 'Social Media',
      'footer.copyright': '© 2026 Rio Clássica. All rights reserved.',
      'ui.viewDetails': 'View details',
      'ui.reserveNow': 'Book now',
      'ui.loading': 'Loading content…',
      'ui.whatsappTitle': 'Chat on WhatsApp',
      'page.title': 'Rio Clássica - Exclusive Cultural Tours'
    },
    es: {
      'nav.about': 'Quiénes Somos',
      'nav.saturdays': 'Experiencias del Sábado',
      'nav.roteiros': 'Recorridos',
      'nav.contact': 'Contacto',
      'nav.language': 'Idioma',
      'hero.title': 'Reimagina Río: cada piedra cuenta una historia que define quién eres.',
      'hero.subtitle':
        'Experiencias curadas para viajeros de la historia. Inmersiones profundas en el patrimonio carioca donde arquitectura, literatura y memoria se entrelazan para revelar la identidad singular del Río.',
      'hero.btn': 'Explorar Próximas Experiencias',
      'about.title': 'Quiénes Somos',
      'about.subtitle': 'Rescate de Identidad e Inmersión Histórica',
      'about.text':
        'RIOCLÁSSICA es una agencia de cultura y turismo histórico dedicada a experiencias que van más allá de los paseos tradicionales. Fundada en Río de Janeiro por Fernanda Duarte, su misión es ofrecer recorridos que sumergen en la rica historia y cultura de la ciudad, permitiendo vivenciar su esencia. Creemos que cada paseo es una oportunidad única de conexión con el pasado y las historias que moldearon el presente carioca.',
      'about.h1.title': 'Historiadores Acreditados',
      'about.h1.text':
        'Eruditos con formación en historia, arquitectura y patrimonio que revelan contextos invisibles a simple vista.',
      'about.h2.title': 'Recorrido Iconográfico',
      'about.h2.text':
        'Mapa visual exclusivo de cada experiencia: síntesis de paisaje, cronología y significado que te llevas a casa.',
      'about.h3.title': 'Acuarela Autoral',
      'about.h3.text':
        'Obra original de Fernanda Duarte: testimonio artístico y tangible de tu recorrido por el patrimonio carioca.',
      'saturdays.title': 'Experiencias del Sábado',
      'saturdays.subtitle': 'Recorridos abiertos | Plazas limitadas para profundidad',
      'roteiros.title': 'Los Cuatro Pilares',
      'roteiros.subtitle': 'Experiencias privadas | Personaliza tu viaje histórico',
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
      'contact.title': 'Contáctanos',
      'contact.subtitle': 'Personaliza tu próxima inmersión histórica',
      'contact.whatsapp': 'Hablar por WhatsApp',
      'contact.instagram': '@rioclassica',
      'footer.company': 'Agencia Rioclássica de Turismo y Cultura',
      'footer.desc': 'Recorridos culturales exclusivos por el patrimonio histórico de Río de Janeiro.',
      'footer.nav': 'Navegación',
      'footer.about': 'Quiénes Somos',
      'footer.saturdays': 'Sábados',
      'footer.roteiros': 'Recorridos Privados',
      'footer.contact': 'Contacto',
      'footer.social': 'Redes Sociales',
      'footer.copyright': '© 2026 Rio Clássica. Todos los derechos reservados.',
      'ui.viewDetails': 'Ver detalles',
      'ui.reserveNow': 'Reservar ahora',
      'ui.loading': 'Cargando contenido…',
      'ui.whatsappTitle': 'Chatear en WhatsApp',
      'page.title': 'Rio Clássica - Recorridos Culturales Exclusivos'
    },
    fr: {
      'nav.about': 'Qui Sommes-Nous',
      'nav.saturdays': 'Expériences du Samedi',
      'nav.roteiros': 'Parcours',
      'nav.contact': 'Contact',
      'nav.language': 'Langue',
      'hero.title': 'Réinventez Rio : chaque pierre raconte une histoire qui vous définit.',
      'hero.subtitle':
        'Expériences conçues pour les voyageurs d\'histoire. Immersions profondes dans le patrimoine carioca où architecture, littérature et mémoire se mêlent pour révéler l\'identité singulière de la ville.',
      'hero.btn': 'Découvrir les Prochaines Expériences',
      'about.title': 'Qui Sommes-Nous',
      'about.subtitle': 'Retrouver son Identité et Immersion Historique',
      'about.text':
        'RIOCLÁSSICA est une agence de culture et de tourisme historique dédiée à des expériences qui vont au-delà des visites traditionnelles. Fondée à Rio de Janeiro par Fernanda Duarte, sa mission est d\'offrir des parcours qui plongent dans la riche histoire et la culture de la ville, permettant de vivre son essence. Chaque visite est une occasion unique de se connecter au passé et aux histoires qui ont façonné le présent carioca.',
      'about.h1.title': 'Historiens Accrédités',
      'about.h1.text':
        'Érudits formés en histoire, architecture et patrimoine qui révèlent des contextes invisibles à l\'œil nu.',
      'about.h2.title': 'Parcours Iconographique',
      'about.h2.text':
        'Carte visuelle exclusive de chaque expérience : synthèse de paysage, chronologie et sens que vous rapportez chez vous.',
      'about.h3.title': 'Aquarelle Originale',
      'about.h3.text':
        'Œuvre originale de Fernanda Duarte : témoignage artistique et tangible de votre parcours dans le patrimoine carioca.',
      'saturdays.title': 'Expériences du Samedi',
      'saturdays.subtitle': 'Parcours ouverts | Places limitées pour la profondeur',
      'roteiros.title': 'Les Quatre Piliers',
      'roteiros.subtitle': 'Expériences privées | Personnalisez votre voyage historique',
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
      'contact.title': 'Contactez-nous',
      'contact.subtitle': 'Personnalisez votre prochaine immersion historique',
      'contact.whatsapp': 'Discuter sur WhatsApp',
      'contact.instagram': '@rioclassica',
      'footer.company': 'Agence Rioclássica Tourisme et Culture',
      'footer.desc': 'Parcours culturels exclusifs dans le patrimoine historique de Rio de Janeiro.',
      'footer.nav': 'Navigation',
      'footer.about': 'Qui Sommes-Nous',
      'footer.saturdays': 'Samedis',
      'footer.roteiros': 'Parcours Privés',
      'footer.contact': 'Contact',
      'footer.social': 'Réseaux Sociaux',
      'footer.copyright': '© 2026 Rio Clássica. Tous droits réservés.',
      'ui.viewDetails': 'Voir les détails',
      'ui.reserveNow': 'Réserver',
      'ui.loading': 'Chargement du contenu…',
      'ui.whatsappTitle': 'Discuter sur WhatsApp',
      'page.title': 'Rio Clássica - Parcours Culturels Exclusifs'
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
    if (flagEl) flagEl.textContent = meta.flag;
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
