// Esperar a que todo el contenido esté cargado
document.addEventListener("DOMContentLoaded", () => {

    // --- 1. CARGAR TEXTOS DESDE textos.js ---
    if(typeof MIS_TEXTOS !== 'undefined') {
        
        // Título intro
        const titleEl = document.getElementById('intro-title-text');
        if(titleEl) {
            titleEl.innerHTML = `${MIS_TEXTOS.inicio.titulo} <svg viewBox="0 0 24 24" width="0.8em" height="0.8em" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="vertical-align: baseline;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
        }
        
        // Boton intro
        const startBtn = document.getElementById('start-btn');
        if(startBtn) {
            startBtn.innerText = MIS_TEXTOS.inicio.boton;
        }

        // Generar páginas dinámicamente
        const bookContainer = document.getElementById('book-container');
        if(bookContainer) {
            bookContainer.innerHTML = ''; // Limpiar contenido estático
            const totalPages = MIS_TEXTOS.paginas.length;
            
            MIS_TEXTOS.paginas.forEach((pagina, index) => {
                const pageNum = index + 1;
                const zIndex = totalPages - index; // Para que la pág 1 esté arriba
                
                let htmlContent = '';
                
                // Decoraciones esquineras (SVG vintage)
                const cornerDecor = `
                    <svg class="corner-decor top-left" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="var(--gold)" stroke-width="3" d="M10,50 Q10,10 50,10 M10,10 L30,30 M10,10 L10,30 M10,10 L30,10" /></svg>
                    <svg class="corner-decor top-right" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="var(--gold)" stroke-width="3" d="M90,50 Q90,10 50,10 M90,10 L70,30 M90,10 L90,30 M90,10 L70,10" /></svg>
                    <svg class="corner-decor bottom-left" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="var(--gold)" stroke-width="3" d="M10,50 Q10,90 50,90 M10,90 L30,70 M10,90 L10,70 M10,90 L30,90" /></svg>
                    <svg class="corner-decor bottom-right" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="var(--gold)" stroke-width="3" d="M90,50 Q90,90 50,90 M90,90 L70,70 M90,90 L90,70 M90,90 L70,90" /></svg>
                `;

                if(pagina.titulo) {
                    htmlContent += `<h2 class="page-title">${pagina.titulo}</h2>`;
                    // Divisor elegante bajo el título
                    htmlContent += `<div class="divider"><svg viewBox="0 0 100 10"><path stroke="var(--gold)" stroke-width="1.5" fill="none" d="M0,5 Q50,0 100,5" /><circle cx="50" cy="3" r="2" fill="var(--gold)"/></svg></div>`;
                }

                if(pagina.mostrarFlor) {
                    htmlContent += `
                        <div class="flower-illustration">
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 22c-3.5-3.5-5-8-5-12 0-3 2.5-5 5-5s5 2 5 5c0 4-1.5 8.5-5 12z"/>
                                <path d="M12 5a3 3 0 0 0-3-3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3 3z"/>
                            </svg>
                        </div>`;
                }

                if(pagina.texto) {
                    htmlContent += `<p class="page-text">${pagina.texto}</p>`;
                }

                if(pagina.opciones) {
                    htmlContent += `
                        <div class="button-container" style="margin-top:25px; display:flex; gap:10px; justify-content:center; width:100%;">
                            <button class="gold-btn decision-btn" onclick="sendDiscordResponse('si', this)">${pagina.opciones.si}</button>
                            <button class="gold-btn outline-btn decision-btn" onclick="sendDiscordResponse('no', this)">${pagina.opciones.no}</button>
                        </div>`;
                } else if(pagina.botonFinal) {
                    htmlContent += `
                        <div class="button-container" style="margin-top:20px;">
                            <button class="gold-btn end-btn" style="width:100%; font-size:1.1rem;">${pagina.botonFinal} 
                                <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" style="vertical-align: text-top; margin-top: -2px;">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                            </button>
                        </div>`;
                }

                let navButtons = '<div class="page-nav">';
                if(index > 0) {
                    navButtons += `<button class="nav-btn prev-btn" onclick="prevPage(${pageNum - 1})">➔ Anterior</button>`;
                }
                if(index < totalPages - 1) {
                    navButtons += `<button class="nav-btn next-btn" onclick="nextPage(${pageNum})">Siguiente ➔</button>`;
                }
                navButtons += '</div>';
                
                const pageNumberHTML = `<div class="page-number">- ${pageNum} -</div>`;
                let bgDiv = '';
                const bgImage = pagina.imagen || MIS_TEXTOS.imagenFondoGlobal;
                if(bgImage) {
                    bgDiv = `<div class="page-bg" style="background-image: url('${bgImage}')"></div>`;
                }

                const pageDiv = document.createElement('div');
                pageDiv.className = 'page';
                pageDiv.id = `page-${pageNum}`;
                pageDiv.style.zIndex = zIndex;
                pageDiv.innerHTML = `
                    ${bgDiv}
                    ${cornerDecor}
                    <div class="page-content" style="padding:10px 0; height:80%; justify-content:center;">
                        ${htmlContent}
                    </div>
                    ${navButtons}
                    ${pageNumberHTML}
                `;
                
                bookContainer.appendChild(pageDiv);
            });
        }
    }

    // --- 2. CONTROL DE AUDIO / VOLUMEN ---
    const audio = document.getElementById("audio");
    const muteBtn = document.getElementById("mute-btn");
    
    if(muteBtn && audio) {
        muteBtn.addEventListener('click', () => {
            if(audio.muted || audio.volume === 0) {
                audio.muted = false;
                audio.volume = 1;
                muteBtn.innerText = "🔊";
                muteBtn.classList.remove('muted');
            } else {
                audio.muted = true;
                audio.volume = 0;
                muteBtn.innerText = "🔈";
                muteBtn.classList.add('muted');
            }
        });
    }

    // --- 3. LÓGICA DE INICIO ---
    const startBtn = document.getElementById('start-btn');
    if(startBtn) {
        startBtn.addEventListener('click', function() {
            if(audio) {
                audio.volume = 1;
                audio.muted = false;
                audio.play().catch(e => console.log("El navegador previno el autoplay.", e));
            }
            document.getElementById('intro-screen').classList.add('hidden');
            setTimeout(() => {
                document.getElementById('book-wrapper').classList.add('visible');
            }, 800);
        });
    }

    // --- 4. PARTICULAS Y FLORES ---
    tsParticles.load("particles-js", {
        fpsLimit: 60,
        particles: {
            number: { value: 35, density: { enable: true, value_area: 800 } },
            color: { value: ["#ff9fb4", "#ffe4e1", "#ffffff"] },
            shape: { type: "circle" },
            opacity: { value: 0.6, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 } },
            size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.5 } },
            move: { enable: true, speed: 0.6, direction: "none", random: true, outModes: "bounce" }
        },
        interactivity: {
            events: { onHover: { enable: true, mode: "bubble" } },
            modes: { bubble: { distance: 200, size: 5, duration: 2, opacity: 0.8 } }
        },
        retina_detect: true
    });

    function createFlowers() {
        const container = document.getElementById('falling-flowers');
        const colors = ['#ffd1dc', '#ffb7c5', '#ffc0cb', '#ffe4e1']; 
        
        setInterval(() => {
            if(!container) return;
            const flower = document.createElement('div');
            flower.classList.add('flower-petal');
            
            const left = Math.random() * 100;
            const size = Math.random() * 15 + 8;
            const duration = Math.random() * 6 + 6;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            flower.style.left = left + 'vw';
            flower.style.width = size + 'px';
            flower.style.height = size + 'px';
            flower.style.animationDuration = duration + 's';
            flower.style.background = `radial-gradient(circle, ${color}, transparent)`;
            
            container.appendChild(flower);
            setTimeout(() => flower.remove(), duration * 1000);
        }, 500);
    }
    createFlowers();

    // --- 5. CONTADOR DE TIEMPO FIJO ---
    const startDate = new Date('2024-02-14T00:00:00');
    const endDate = new Date('2024-07-06T00:00:00');
    
    function showTimeTogether() {
        const diff = endDate - startDate;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const counterEl = document.getElementById('time-counter');
        if(counterEl) {
            counterEl.innerText = `Fueron ${days} días maravillosos`;
        }
    }
    showTimeTogether();

    // --- 6. FRASES ROTATIVAS ---
    const phrases = (typeof MIS_TEXTOS !== 'undefined' && MIS_TEXTOS.frases) ? MIS_TEXTOS.frases : ["Te quiero..."];
    let phraseIndex = 0;
    const phraseElement = document.getElementById('rotating-phrase');
    if(phraseElement) {
        phraseElement.innerText = phrases[0];
        setInterval(() => {
            phraseElement.style.opacity = 0;
            setTimeout(() => {
                phraseIndex = (phraseIndex + 1) % phrases.length;
                phraseElement.innerText = phrases[phraseIndex];
                phraseElement.style.opacity = 1;
            }, 1000);
        }, 8000);
    }

});

// --- FUNCIONES GLOBALES PARA PASAR PÁGINAS ---
window.nextPage = function(pageNum) {
    const page = document.getElementById('page-' + pageNum);
    if(page) {
        page.classList.add('flipped');
    }
};

window.prevPage = function(pageNumToUnflip) {
    const page = document.getElementById('page-' + pageNumToUnflip);
    if(page) {
        page.classList.remove('flipped');
    }
};

window.sendDiscordResponse = function(respuesta, btnElement) {
    const webhookUrl = "https://canary.discord.com/api/webhooks/1524319303334363256/7j9j4v7j031OvbUCUbP6OCaHxEasxkm4o7vO_t46Kxm3rHxZvyB0NBNpL_XteTrXBGqw";
    let mensaje = "";
    
    if(respuesta === 'si') {
        mensaje = "💖 **¡Excelentes noticias!** Ha respondido que **SÍ TE PERDONA**. ¡Felicidades! 🎉";
    } else {
        mensaje = "💔 **Lo siento mucho.** Ha respondido que **NO TE PERDONA**. 😔";
    }

    const container = btnElement.parentElement;
    container.innerHTML = `<p style="color: var(--gold); font-size: 1.2rem; font-style: italic;">Enviando respuesta...</p>`;

    fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: mensaje })
    }).then(res => {
        container.innerHTML = `<p style="color: var(--gold); font-size: 1.2rem; font-style: italic;">Tu respuesta ha sido enviada. Gracias. ✨</p>`;
    }).catch(err => {
        console.error("Error enviando webhook:", err);
        container.innerHTML = `<p style="color: var(--gold); font-size: 1.2rem; font-style: italic;">Hubo un error al enviar la respuesta, pero tu decisión ha sido tomada. ✨</p>`;
    });
};
