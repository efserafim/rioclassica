// ============================================
// RIO CLÁSSICA - JAVASCRIPT INTERATIVO
// ============================================

/**
 * MENU RESPONSIVO - Toggle do menu mobile
 */
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
let mobileMenuOpen = false;

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        mobileMenuOpen = !mobileMenuOpen;
        if (mobileMenuOpen) {
            navLinks.classList.add('visible');
            menuToggle.textContent = '✕';
        } else {
            navLinks.classList.remove('visible');
            menuToggle.textContent = '☰';
        }
    });
}

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        mobileMenuOpen = false;
        navLinks.classList.remove('visible');
        menuToggle.textContent = '☰';
    });
});

/**
 * SCROLL SUAVE - Animação ao navegar entre seções
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offset = 80; // Altura do header fixo
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * HEADER - Adicionar sombra ao fazer scroll
 */
const header = document.querySelector('.header');
let lastScrollY = 0;

window.addEventListener('scroll', function() {
    lastScrollY = window.scrollY;
    
    if (lastScrollY > 50) {
        header.style.boxShadow = '0 4px 16px rgba(10, 37, 64, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(10, 37, 64, 0.08)';
    }
});

/**
 * OBSERVADOR DE ELEMENTOS - Animações ao entrar em view
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar cards de roteiros
document.querySelectorAll('.roteiro-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Observar items de contato
document.querySelectorAll('.contact-item').forEach(item => {
    item.style.opacity = '0';
    observer.observe(item);
});

/**
 * VALIDAÇÃO DE LINKS DINÂMICOS
 * Função auxiliar para atualizar facilmente URLs do Google Forms e WhatsApp
 */
function updateFormLinks() {
    // INSTRUÇÕES: Atualize estes valores com suas URLs reais
    
    const GOOGLE_FORMS_SATURDAY = 'https://forms.gle/seu-formulario-aqui'; // Altere com sua URL
    const WHATSAPP_NUMBER = '21990234090'; // Altere com seu número
    
    // Atualizar todos os links do Google Forms
    document.querySelectorAll('a[href*="forms.gle"]').forEach(link => {
        link.href = GOOGLE_FORMS_SATURDAY;
    });
    
    // Atualizar links do WhatsApp (exceto o card dinâmico do dashboard)
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        if (link.closest('#featured-saturday-mount')) return;
        const whatsappUrl = link.getAttribute('href');
        const message = whatsappUrl.split('?text=')[1];
        link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message || 'Olá Rio Clássica!'}`;
    });
}

// Executar ao carregar a página
document.addEventListener('DOMContentLoaded', updateFormLinks);

/**
 * FUNÇÃO AUXILIAR - Gerar link dinâmico de WhatsApp com mensagem pré-configurada
 */
function generateWhatsAppLink(roteiro, number = '21990234090') {
    const message = `Olá Rio Clássica! Gostaria de solicitar um roteiro privativo - ${roteiro}`;
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * EVENT LISTENERS - Botões de Sábado
 */
const saturdayButton = document.querySelector('.featured .btn-secondary');
if (saturdayButton) {
    saturdayButton.addEventListener('click', function(e) {
        console.log('Redirecionar para formulário de sábado');
    });
}

/**
 * SUPORTE A PREFERÊNCIA DE TEMA (Modo claro/escuro - Opcional)
 */
function initThemeToggle() {
    // Esta função pode ser expandida para suportar temas
    // Por enquanto, mantemos apenas o tema claro como no briefing
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (prefersDark.matches) {
        // Implementar tema escuro se necessário
    }
}

initThemeToggle();

/**
 * ANALYTICS - Rastreamento de cliques (Opcional)
 * Descomente se estiver usando Google Analytics ou similar
 */
function trackButtonClick(buttonName) {
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'button_click', {
    //         'button_name': buttonName
    //     });
    // }
    console.log(`Clique rastreado: ${buttonName}`);
}

// Adicionar rastreamento aos botões principais
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        trackButtonClick(buttonText);
    });
});

/**
 * VALIDAÇÃO DE LINKS EXTERNOS
 */
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Validação básica
        if (!href || href === '#') {
            e.preventDefault();
            console.warn('Link inválido:', href);
            return false;
        }
    });
});

/**
 * SUPORTE A NAVEGAÇÃO TECLADO
 */
document.addEventListener('keydown', function(e) {
    // ESC para fechar menu mobile
    if (e.key === 'Escape' && mobileMenuOpen) {
        mobileMenuOpen = false;
        navLinks.classList.remove('visible');
        menuToggle.textContent = '☰';
    }
    
    // Home para voltar ao topo
    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

/**
 * LAZY LOADING DE IMAGENS (Placeholder)
 */
function setupLazyLoading() {
    const imagePlaceholders = document.querySelectorAll('.image-placeholder, .roteiro-image-placeholder, .saturday-image-placeholder');
    
    imagePlaceholders.forEach(placeholder => {
        // Quando imagens reais forem adicionadas, elas carregarão dinamicamente
        placeholder.style.transition = 'all 0.3s ease-in-out';
    });
}

setupLazyLoading();

/**
 * DEBUGGER - Função auxiliar para desenvolvimento
 * Descomente console.log para ver informações úteis
 */
function debugInfo() {
    console.log('%cRio Clássica - Debug Info', 'color: #d4af37; font-size: 16px; font-weight: bold');
    console.log('Página carregada com sucesso');
    console.log('URLs a atualizar:');
    console.log('- Google Forms: [ ALTERAR EM updateFormLinks() ]');
    console.log('- WhatsApp: [ ALTERAR EM updateFormLinks() ]');
}

// Descomentar para debug
// debugInfo();

/**
 * PERFORMANCE - Dicas de otimização
 */
if ('performance' in window) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Tempo de carregamento: ${pageLoadTime}ms`);
    });
}

/**
 * ACESSIBILIDADE - Focus management para teclado
 */
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// ============================================
// FIM - Pronto para desenvolvimento!
// ============================================
