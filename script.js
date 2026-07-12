// ============================================================
// SCRIPT DO PORTFOLIO — menu hambúrguer + efeitos visuais de scroll
// Tudo em JS puro, sem bibliotecas externas.
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

    // ------------------------------------------------------------
    // 1) MENU HAMBÚRGUER (mobile)
    // ------------------------------------------------------------
    const botaoHamburguer = document.getElementById('botaoHamburguer');
    const menuMobile = document.getElementById('menuMobile');
    const overlayMenu = document.getElementById('overlayMenu');

    function abrirMenu() {
        botaoHamburguer.classList.add('aberto');
        menuMobile.classList.add('aberto');
        overlayMenu.classList.add('visivel');
        botaoHamburguer.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // trava o scroll de fundo enquanto o menu tá aberto
    }

    function fecharMenu() {
        botaoHamburguer.classList.remove('aberto');
        menuMobile.classList.remove('aberto');
        overlayMenu.classList.remove('visivel');
        botaoHamburguer.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (botaoHamburguer && menuMobile && overlayMenu) {
        botaoHamburguer.addEventListener('click', function () {
            const estaAberto = menuMobile.classList.contains('aberto');
            if (estaAberto) {
                fecharMenu();
            } else {
                abrirMenu();
            }
        });

        // Fecha o menu se clicar fora (no overlay escuro)
        overlayMenu.addEventListener('click', fecharMenu);

        // Fecha o menu ao clicar em qualquer link dele
        menuMobile.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', fecharMenu);
        });

        // Fecha o menu se a pessoa aumentar a tela pro modo desktop
        window.addEventListener('resize', function () {
            if (window.innerWidth > 720) {
                fecharMenu();
            }
        });
    }


    // ------------------------------------------------------------
    // 2) FADE-IN AO ROLAR (IntersectionObserver)
    //    Todo elemento com a classe .fade-in ganha .visivel quando
    //    entra na área visível da tela.
    // ------------------------------------------------------------
    const elementosFade = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window && elementosFade.length > 0) {
        const observerFade = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add('visivel');
                    // Uma vez visível, não precisa mais observar (economiza processamento)
                    observerFade.unobserve(entrada.target);
                }
            });
        }, {
            threshold: 0.15,       // dispara quando 15% do elemento aparece
            rootMargin: '0px 0px -50px 0px'
        });

        elementosFade.forEach(function (elemento) {
            observerFade.observe(elemento);
        });
    } else {
        // Navegador muito antigo sem suporte: mostra tudo direto
        elementosFade.forEach(function (el) {
            el.classList.add('visivel');
        });
    }


    // ------------------------------------------------------------
    // 3) PARALLAX LEVE nas seções com fundo de imagem
    //    Move o background-position verticalmente conforme o scroll,
    //    de forma bem sutil. Funciona bem no mobile (diferente do
    //    background-attachment: fixed, que trava no iOS Safari).
    // ------------------------------------------------------------
    const secoesParallax = document.querySelectorAll('.efeito-parallax');
    let ticking = false;

    function aplicarParallax() {
        const scrollY = window.scrollY || window.pageYOffset;

        secoesParallax.forEach(function (secao) {
            const velocidade = parseFloat(secao.dataset.parallax) || 0.2;
            const retangulo = secao.getBoundingClientRect();
            const offsetSecao = retangulo.top + scrollY;

            // Só calcula o efeito quando a seção está perto da tela
            // (evita cálculo desnecessário em seções longe)
            if (retangulo.bottom > -200 && retangulo.top < window.innerHeight + 200) {
                const distancia = (scrollY - offsetSecao) * velocidade;
                secao.style.backgroundPosition = 'center calc(50% + ' + distancia + 'px)';
            }
        });

        ticking = false;
    }

    function agendarParallax() {
        if (!ticking) {
            window.requestAnimationFrame(aplicarParallax);
            ticking = true;
        }
    }

    // Desliga o parallax se a pessoa preferir menos movimento (acessibilidade)
    const prefereReduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (secoesParallax.length > 0 && !prefereReduzirMovimento) {
        window.addEventListener('scroll', agendarParallax, { passive: true });
        aplicarParallax(); // aplica uma vez no carregamento
    }


    // ------------------------------------------------------------
    // 4) HEADER GANHA FUNDO SÓLIDO AO ROLAR A PÁGINA
    // ------------------------------------------------------------
    const header = document.getElementById('headerPrincipal');

    function atualizarHeader() {
        if (window.scrollY > 40) {
            header.classList.add('header-rolado');
        } else {
            header.classList.remove('header-rolado');
        }
    }

    if (header) {
        window.addEventListener('scroll', atualizarHeader, { passive: true });
        atualizarHeader();
    }


    // ------------------------------------------------------------
    // 5) BARRA DE PROGRESSO DE LEITURA (topo da página)
    // ------------------------------------------------------------
    const barraProgresso = document.getElementById('barraProgresso');

    function atualizarBarraProgresso() {
        const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollAtual = window.scrollY || window.pageYOffset;
        const porcentagem = alturaTotal > 0 ? (scrollAtual / alturaTotal) * 100 : 0;
        barraProgresso.style.width = porcentagem + '%';
    }

    if (barraProgresso) {
        window.addEventListener('scroll', atualizarBarraProgresso, { passive: true });
        window.addEventListener('resize', atualizarBarraProgresso);
        atualizarBarraProgresso();
    }


    // ------------------------------------------------------------
    // 6) BOTÃO "VOLTAR AO TOPO"
    // ------------------------------------------------------------
    const botaoTopo = document.getElementById('botaoTopo');

    function atualizarBotaoTopo() {
        if (window.scrollY > 500) {
            botaoTopo.classList.add('visivel');
        } else {
            botaoTopo.classList.remove('visivel');
        }
    }

    if (botaoTopo) {
        window.addEventListener('scroll', atualizarBotaoTopo, { passive: true });
        botaoTopo.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        atualizarBotaoTopo();
    }

});
