// Header ganha fundo sólido ao rolar a página
const header = document.getElementById('headerPrincipal');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        header.classList.add('header-rolado');
    } else {
        header.classList.remove('header-rolado');
    }

    // Barra de progresso de leitura
    const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
    const progresso = alturaTotal > 0 ? (window.scrollY / alturaTotal) * 100 : 0;
    document.getElementById('barraProgresso').style.width = progresso + '%';

    // Botão de voltar ao topo
    const botaoTopo = document.getElementById('botaoTopo');
    if (window.scrollY > 400) {
        botaoTopo.classList.add('visivel');
    } else {
        botaoTopo.classList.remove('visivel');
    }
});

// Menu mobile (hambúrguer)
const botaoHamburguer = document.getElementById('botaoHamburguer');
const menuMobile = document.getElementById('menuMobile');
const overlayMenu = document.getElementById('overlayMenu');

function alternarMenu() {
    const aberto = menuMobile.classList.toggle('aberto');
    botaoHamburguer.classList.toggle('aberto', aberto);
    overlayMenu.classList.toggle('visivel', aberto);
    botaoHamburguer.setAttribute('aria-expanded', aberto);
}

botaoHamburguer.addEventListener('click', alternarMenu);
overlayMenu.addEventListener('click', alternarMenu);

// Fecha o menu ao clicar em algum link dele
menuMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (menuMobile.classList.contains('aberto')) alternarMenu();
    });
});

// Botão de voltar ao topo
document.getElementById('botaoTopo').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Fade-in ao rolar a página (IntersectionObserver)
const elementosFade = document.querySelectorAll('.fade-in');
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
        }
    });
}, { threshold: 0.15 });

elementosFade.forEach(el => observador.observe(el));
