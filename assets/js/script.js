// ========================================
// MENU HAMBÚRGUER
// ========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ========================================
// VALIDAÇÃO E ENVIO DE FORMULÁRIO
// ========================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obter valores do formulário
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const servico = document.getElementById('servico').value;
    const mensagem = document.getElementById('mensagem').value.trim();

    // Validação básica
    if (!nome || !email || !telefone || !servico) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido!');
        return;
    }

    // Validar telefone (apenas números e caracteres especiais)
    const telefoneRegex = /^[\d\s\-\(\)]+$/;
    if (!telefoneRegex.test(telefone)) {
        alert('Por favor, insira um telefone válido!');
        return;
    }

    // Simular envio (em produção, isso seria enviado para um servidor)
    console.log({
        nome,
        email,
        telefone,
        servico,
        mensagem
    });

    // Mensagem de sucesso
    alert(`Obrigado, ${nome}! Sua solicitação foi enviada com sucesso. Entraremos em contato em breve!`);

    // Limpar formulário
    contactForm.reset();
});

// ========================================
// SCROLL SUAVE E ATIVA LINK DE NAV
// ========================================

window.addEventListener('scroll', () => {
    let current = '';

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========================================
// LAZY LOADING DE IMAGENS
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// ANIMAÇÃO AO SCROLL
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.servico-card, .galeria-item, .depoimento-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// SUPORTE A DARK MODE (OPCIONAL)
// ========================================

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

if (prefersDarkScheme.matches) {
    document.documentElement.style.setProperty('--text-color', '#E0E0E0');
    document.documentElement.style.setProperty('--light-color', '#1A1A1A');
    document.documentElement.style.setProperty('--white', '#2C2C2C');
}

// ========================================
// ANALYTICS E TRACKING
// ========================================

// Rastrear cliques em CTAs
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', () => {
        console.log('CTA clicado:', button.textContent);
        // Aqui você pode adicionar Google Analytics ou outro serviço de tracking
    });
});

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Site Saly Tranças Afro carregado com sucesso!');
});
