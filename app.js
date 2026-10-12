/* ==========================================================================
   ANA DENTAL | app.js
   Loader, i18n (EN/ES), smooth scroll, scroll choreography, hero particle
   network, accordion, live open/closed badge and the form -> WhatsApp flow.
   Libraries (local): GSAP + ScrollTrigger, Lenis.
   ========================================================================== */
(() => {
    'use strict';

    /* ---------------------------------------------------------------------
       CONFIG: change the WhatsApp number here (country code + number, no +)
       --------------------------------------------------------------------- */
    const WA_NUMBER = '19282543018';

    const $ = (s, c = document) => c.querySelector(s);
    const $$ = (s, c = document) => [...c.querySelectorAll(s)];
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const hasGsap = !!(window.gsap && window.ScrollTrigger);
    if (hasGsap) gsap.registerPlugin(ScrollTrigger);

    /* =====================================================================
       I18N: English lives in the HTML; Spanish overrides live here.
       ===================================================================== */
    const ES = {
        'skip': 'Saltar al contenido',
        'loader': 'Preparando tu sonrisa',
        'brand.tag': 'Implant &amp; Endodontic Solutions',
        'nav.treatments': 'Tratamientos', 'nav.doctor': 'Dr. Ana', 'nav.process': 'Proceso', 'nav.visit': 'Visítanos', 'nav.faq': 'Preguntas',
        'nav.cta': 'Presupuesto gratis',

        'hero.eyebrow': 'Implantes y endodoncia en Los Algodones',
        'hero.title': 'Recupera tu <span class="hl">sonrisa</span> con precisión.',
        'hero.sub': 'Implantes dentales y tratamiento de conductos con el Dr. Noe Ana Ramirez, justo al cruzar la frontera. Presupuesto gratis.',
        'hero.cta1': 'Quiero mi nueva sonrisa', 'hero.cta2': 'Ver tratamientos',
        'hero.alt': 'Modelo de implante dental en corte con poste de titanio y corona',
        'hero.hot1': 'Implante de titanio', 'hero.hot2': 'Corona de aspecto natural',

        'ins.title': 'Aceptamos los principales seguros dentales',

        'promise.text': 'La buena odontología debe sentirse clara, tranquila y al alcance de todos. En Ana Dental recibes un diagnóstico honesto, un presupuesto transparente y un dentista que te explica cada paso.',
        'stat1': 'Calificación en Google, 9 reseñas', 'stat2': 'Tratamientos bajo un mismo techo', 'stat3': 'Días abiertos cada semana', 'stat4': 'Costo de tu primer presupuesto',
        'promise.cta': 'Estoy listo para mi presupuesto gratis',

        'tx.eyebrow': '14 tratamientos, una clínica',
        'tx.title': 'Cuidado dental hecho para <span class="hl">tu sonrisa.</span>',
        'tx.sub': 'Desde una primera revisión hasta un plan completo de implantes, todo tratamiento empieza con un presupuesto gratis y una explicación clara.',
        'tx1.alt': 'Dentista revisando un estudio 3D para planear implantes dentales',
        'tx1.label': 'Implantes dentales', 'tx1.lead': 'Dientes perdidos, recuperados para siempre.',
        'tx1.body': 'Implantes de titanio que se ven y se sienten como tus propios dientes, planeados con imagen digital según tu hueso y tu presupuesto.',
        'chip.implants': 'Implantes dentales', 'chip.crowns': 'Coronas y puentes', 'chip.dentures': 'Dentaduras', 'chip.partials': 'Parciales',
        'tx1.cta': 'Planear mis implantes',
        'tx2.alt': 'Dentista examinando radiografías de los conductos de un diente',
        'tx2.label': 'Endodoncia', 'tx2.lead': 'Salva el diente que creías perdido.',
        'tx2.body': 'Tratamiento de conductos que elimina el dolor y conserva tu diente natural, para que sigas masticando, sonriendo y viviendo.',
        'chip.root': 'Conductos', 'chip.extractions': 'Extracciones', 'chip.surgery': 'Cirugía oral',
        'tx2.cta': 'Salvar mi diente',
        'tx3.alt': 'Mujer con una sonrisa brillante y segura',
        'tx3.label': 'Odontología estética', 'tx3.lead': 'Una sonrisa más brillante que sigue siendo tuya.',
        'tx3.body': 'Blanqueamiento, carillas y resinas que afinan color, forma y simetría sin verse artificiales.',
        'chip.whitening': 'Blanqueamiento dental', 'chip.veneers': 'Carillas', 'chip.bonding': 'Resinas estéticas',
        'tx3.cta': 'Iluminar mi sonrisa',
        'tx4.alt': 'Dentista realizando una revisión con espejo dental',
        'tx4.label': 'Cuidado diario', 'tx4.lead': 'Pequeñas revisiones que evitan grandes problemas.',
        'tx4.body': 'Revisiones, limpiezas, empastes y cuidado de encías que detectan problemas a tiempo, cuando aún son sencillos y accesibles de tratar.',
        'chip.checkups': 'Revisiones y limpiezas', 'chip.fillings': 'Empastes', 'chip.inlays': 'Incrustaciones', 'chip.perio': 'Cuidado periodontal',
        'tx4.cta': 'Reservar mi revisión',

        'doc.alt1': 'El Dr. Noe Ana Ramirez atendiendo a un paciente en Ana Dental',
        'doc.alt2': 'Retrato del Dr. Noe Ana Ramirez, D.D.S.',
        'doc.title': 'Conoce al Dr. Noe Ana Ramirez.',
        'doc.p1': 'Un dentista formado en la U.A.B.C. que se enfoca en lo que más importa a sus pacientes: salvar dientes naturales, reemplazar los que faltan y lograr sonrisas que se ven naturales.',
        'cred1.t': 'Tratamiento de conductos', 'cred1.d': 'Primero el alivio, después un diente que dura.',
        'cred2.t': 'Implantes dentales', 'cred2.d': 'Planeados con cuidado, colocados con precisión.',
        'cred3.t': 'Odontología estética', 'cred3.d': 'Resultados naturales, a la medida de tu rostro.',
        'doc.cta': 'Hablar con el Dr. Ana',

        'proc.title': 'Del primer mensaje a tu <span class="hl">sonrisa terminada.</span>',
        'proc.sub': 'Cuatro pasos claros, sin sorpresas. Siempre sabes qué sigue y cuánto cuesta.',
        'step1.t': 'Escríbenos', 'step1.d': 'Cuéntanos qué necesitas por WhatsApp o teléfono. Recibes un presupuesto claro y gratuito, sin compromiso.',
        'step1.alt': 'Dentista conversando con un paciente en una clínica luminosa',
        'step2.t': 'Cruza la frontera', 'step2.d': 'Estamos en Los Algodones, a pocas cuadras del cruce fronterizo. Busca el letrero azul de Ana Dental.',
        'step2.alt': 'Entrada de la clínica Ana Dental con su letrero azul',
        'step3.t': 'Recibe tu plan', 'step3.d': 'Revisión, radiografías y una conversación directa. El Dr. Ana te explica cada opción y su costo antes de empezar.',
        'step3.alt': 'Dentista mostrando una radiografía dental en una tableta',
        'step4.t': 'Sal sonriendo', 'step4.d': 'Tratamiento amable, seguimiento honesto y resultados hechos para durar, para que regreses al otro lado con confianza.',
        'step4.alt': 'Dentista con lupas atendiendo a un paciente',
        'proc.cta': 'Toca aquí y saluda',

        'visit.eyebrow': 'Visítanos',
        'visit.title': 'A pocas cuadras de la <span class="hl">frontera con EE. UU.</span>',
        'visit.addr.t': 'Dirección', 'visit.addr.d': 'Calle 1ra. y Av. "A" No. 74, 21970 Los Algodones, B.C., México',
        'visit.hours.t': 'Horario', 'visit.hours.d': 'Lunes a sábado, 8:00 am a 4:00 pm hora de Arizona. Domingo con cita.',
        'visit.phone.t': 'Teléfono', 'visit.mail.t': 'Correo',
        'visit.dir': 'Cómo llegar', 'visit.call': 'Llamar al (928) 254-3018',
        'visit.alt': 'Entrada de la clínica Ana Dental en Los Algodones', 'visit.cap': 'Busca el letrero azul de Ana Dental.',

        'faq.title': 'Preguntas respondidas <span class="hl">antes de que las hagas.</span>',
        'q1': '¿Los presupuestos son realmente gratis?', 'a1': 'Sí. Envía tu consulta por WhatsApp o visita la clínica y el Dr. Ana te dará un presupuesto claro y gratuito antes de iniciar cualquier tratamiento.',
        'q2': '¿Qué seguros aceptan?', 'a2': 'Aceptamos los principales seguros, entre ellos UnitedHealthcare, Aetna, MetLife y BlueCross BlueShield. Envíanos tu plan y confirmamos los detalles.',
        'q3': '¿Cuál es su horario?', 'a3': 'De lunes a sábado, de 8:00 am a 4:00 pm hora de Arizona. Los domingos atendemos con cita.',
        'q4': '¿Dónde están ubicados?', 'a4': 'En Calle 1ra. y Av. "A" No. 74, Los Algodones, B.C., a pocas cuadras del cruce fronterizo con EE. UU. Busca el letrero azul de Ana Dental.',
        'q5': '¿Qué tratamientos ofrecen?', 'a5': 'Implantes dentales, tratamientos de conductos, coronas y puentes, extracciones, cirugía oral, empastes, incrustaciones, cuidado periodontal, blanqueamiento, carillas, resinas estéticas, dentaduras, parciales, revisiones y limpiezas.',
        'q6': '¿Necesito una cita?', 'a6': 'Recomendamos agendar para que el Dr. Ana dedique el tiempo que tu caso necesita. Los domingos son únicamente con cita.',
        'faq.more': '¿Aún tienes una duda?', 'faq.cta': 'Pregúntale al Dr. Ana por WhatsApp',

        'contact.title': 'Tu nueva sonrisa empieza con <span class="hl">un mensaje.</span>',
        'contact.p': 'Cuéntanos qué necesitas. El equipo del Dr. Ana responde por WhatsApp con un presupuesto gratuito y sin presión.',
        'tick1': 'Presupuesto gratis, sin compromiso', 'tick2': 'Seguros de EE. UU. bienvenidos', 'tick3': 'Lunes a sábado, 8:00 am a 4:00 pm (hora de Arizona)',
        'f.name': 'Nombre completo', 'f.name.ph': 'Tu nombre',
        'f.phone': 'Teléfono o WhatsApp', 'f.opt': '(opcional)', 'f.phone.ph': '+1 000 000 0000',
        'f.treat': '¿Qué necesitas?',
        'opt.0': 'Elige un tratamiento', 'opt.1': 'Implantes dentales', 'opt.2': 'Tratamiento de conductos', 'opt.3': 'Odontología estética',
        'opt.4': 'Coronas y puentes', 'opt.5': 'Dentaduras y parciales', 'opt.6': 'Revisión y limpieza', 'opt.7': 'Algo diferente',
        'f.msg': 'Cuéntanos más', 'f.msg.ph': 'Dolor, dientes faltantes, dudas sobre costos...',
        'f.submit': 'Enviarme mi presupuesto gratis',
        'f.note': 'Se abrirá WhatsApp con tu mensaje listo para enviar.',

        'foot.blurb': 'Implantes, tratamientos de conductos y odontología estética con el Dr. Noe Ana Ramirez, D.D.S. en Los Algodones, México.',
        'foot.explore': 'Explorar', 'foot.contact': 'Contacto', 'foot.hours': 'Horario',
        'foot.hours1': 'Lunes a sábado<br>8:00 am a 4:00 pm hora de Arizona', 'foot.hours2': 'Domingo con cita',
        'foot.addr': 'Calle 1ra. y Av. "A" No. 74, Los Algodones, B.C., México',
        'wa.aria': 'Chatear por WhatsApp', 'wa.label': 'Escríbenos'
    };

    /* JS-only strings */
    const T = {
        en: {
            title: 'Ana Dental | Dental Implants & Root Canals in Los Algodones, Mexico',
            desc: 'Dental implants, root canal therapy and cosmetic dentistry by Dr. Noe Ana Ramirez, D.D.S. in Los Algodones, B.C. Free estimates. Major US insurance accepted.',
            openNow: 'Open now', closed: 'Closed now, opens at 8:00 am (AZ)', sunday: 'Sunday: by appointment',
            errName: 'Please enter your name so we know who to reply to.',
            errPhone: 'Please check your phone number.',
            errTreat: 'Please choose the treatment you are interested in.',
            opening: 'Opening WhatsApp...',
            done: 'Done. If WhatsApp did not open, <a href="%URL%" target="_blank" rel="noopener">tap here</a>.',
            toggle: 'Cambiar a español', menuOpen: 'Open menu', menuClose: 'Close menu',
            msg: {
                general: "Hi Dr. Ana, I'd like a free estimate.",
                hero: "Hi Dr. Ana, I'd like to know more about my new smile and get a free estimate.",
                implants: "Hi Dr. Ana, I'm interested in dental implants.",
                endo: 'Hi Dr. Ana, I need help with a root canal.',
                cosmetic: "Hi Dr. Ana, I'd like to improve my smile.",
                care: "Hi Dr. Ana, I'd like to book a check-up.",
                doctor: "Hi Dr. Ana, I'd like to schedule a consultation.",
                process: "Hi Dr. Ana, I'd like to start with a free estimate.",
                faq: 'Hi Dr. Ana, I have a question.'
            },
            form: (n, t, p, m) => `Hi Dr. Ana, my name is ${n}. I'm interested in: ${t}.${m ? ' ' + m : ''}${p ? ' My phone: ' + p + '.' : ''} I'd like a free estimate.`,
            treat: { implants: 'dental implants', root: 'a root canal', cosmetic: 'cosmetic dentistry', crowns: 'crowns and bridges', dentures: 'dentures and partials', checkup: 'a check-up and cleaning', other: 'a dental treatment' }
        },
        es: {
            title: 'Ana Dental | Implantes Dentales y Endodoncia en Los Algodones, México',
            desc: 'Implantes dentales, tratamiento de conductos y odontología estética con el Dr. Noe Ana Ramirez, D.D.S. en Los Algodones, B.C. Presupuesto gratis. Seguros de EE. UU. aceptados.',
            openNow: 'Abierto ahora', closed: 'Cerrado ahora, abre a las 8:00 am (hora de Arizona)', sunday: 'Domingo: solo con cita',
            errName: 'Escribe tu nombre para saber a quién responder.',
            errPhone: 'Revisa tu número de teléfono.',
            errTreat: 'Elige el tratamiento que te interesa.',
            opening: 'Abriendo WhatsApp...',
            done: 'Listo. Si WhatsApp no se abrió, <a href="%URL%" target="_blank" rel="noopener">toca aquí</a>.',
            toggle: 'Switch to English', menuOpen: 'Abrir menú', menuClose: 'Cerrar menú',
            msg: {
                general: 'Hola Dr. Ana, me gustaría un presupuesto gratis.',
                hero: 'Hola Dr. Ana, quiero información sobre mi nueva sonrisa y un presupuesto gratis.',
                implants: 'Hola Dr. Ana, me interesan los implantes dentales.',
                endo: 'Hola Dr. Ana, necesito ayuda con un tratamiento de conductos.',
                cosmetic: 'Hola Dr. Ana, me gustaría mejorar mi sonrisa.',
                care: 'Hola Dr. Ana, me gustaría agendar una revisión.',
                doctor: 'Hola Dr. Ana, me gustaría agendar una consulta.',
                process: 'Hola Dr. Ana, quiero empezar con un presupuesto gratis.',
                faq: 'Hola Dr. Ana, tengo una pregunta.'
            },
            form: (n, t, p, m) => `Hola Dr. Ana, mi nombre es ${n}. Me interesa: ${t}.${m ? ' ' + m : ''}${p ? ' Mi teléfono: ' + p + '.' : ''} Me gustaría un presupuesto gratis.`,
            treat: { implants: 'implantes dentales', root: 'un tratamiento de conductos', cosmetic: 'odontología estética', crowns: 'coronas y puentes', dentures: 'dentaduras y parciales', checkup: 'una revisión y limpieza', other: 'un tratamiento dental' }
        }
    };

    let lang = 'en';
    const orig = new WeakMap();      // original EN html / attrs
    const ATTRS = [['i18nAlt', 'alt'], ['i18nPh', 'placeholder'], ['i18nAria', 'aria-label']];

    function cacheOriginals() {
        $$('[data-i18n],[data-i18n-html]').forEach(el => orig.set(el, el.innerHTML));
        ATTRS.forEach(([ds, attr]) => $$(`[data-${ds.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}]`).forEach(el => {
            el.dataset['en' + ds.slice(4)] = el.getAttribute(attr) || '';
        }));
    }

    function applyLang(next, persist) {
        lang = next;
        root.lang = lang;
        const es = lang === 'es';

        $$('[data-i18n],[data-i18n-html]').forEach(el => {
            const key = el.dataset.i18n || el.dataset.i18nHtml;
            el.innerHTML = es && ES[key] !== undefined ? ES[key] : orig.get(el);
        });
        ATTRS.forEach(([ds, attr]) => {
            const sel = `[data-${ds.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}]`;
            $$(sel).forEach(el => {
                const key = el.dataset[ds];
                el.setAttribute(attr, es && ES[key] !== undefined ? ES[key] : el.dataset['en' + ds.slice(4)]);
            });
        });

        document.title = T[lang].title;
        const md = $('meta[name="description"]'); if (md) md.setAttribute('content', T[lang].desc);
        const lb = $('#lang-toggle'); if (lb) lb.setAttribute('aria-label', T[lang].toggle);
        const bg = $('#burger'); if (bg) bg.setAttribute('aria-label', menuOpen ? T[lang].menuClose : T[lang].menuOpen);

        updateWaLinks();
        updateOpen();
        clearFormFeedback();
        if (initialised) { splitHeadings(true); buildWords(); if (hasGsap) ScrollTrigger.refresh(); }

        if (persist) { try { localStorage.setItem('ana-lang', lang); } catch (e) { /* storage unavailable */ } }
    }

    /* =====================================================================
       WhatsApp links
       ===================================================================== */
    const waUrl = msg => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    function updateWaLinks() {
        $$('[data-wa]').forEach(a => {
            const m = T[lang].msg[a.dataset.wa] || T[lang].msg.general;
            a.setAttribute('href', waUrl(m));
        });
    }

    /* =====================================================================
       Live open / closed badge (Arizona time, Mon-Sat 8:00-16:00)
       ===================================================================== */
    function updateOpen() {
        const badge = $('#open-now'), txt = $('#open-now-text');
        if (!badge || !txt) return;
        let wd = '', h = 0, m = 0;
        try {
            const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Phoenix', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
            parts.forEach(p => { if (p.type === 'weekday') wd = p.value; if (p.type === 'hour') h = +p.value % 24; if (p.type === 'minute') m = +p.value; });
        } catch (e) { return; }
        const mins = h * 60 + m;
        const open = wd !== 'Sun' && mins >= 480 && mins < 960;
        badge.hidden = false;
        badge.classList.toggle('is-closed', !open);
        txt.textContent = open ? T[lang].openNow : (wd === 'Sun' ? T[lang].sunday : T[lang].closed);
    }

    /* =====================================================================
       Text splitting
       ===================================================================== */
    function splitWordsInto(el, cls, withMask) {
        let i = 0;
        const walk = node => {
            [...node.childNodes].forEach(ch => {
                if (ch.nodeType === 3) {
                    const frag = document.createDocumentFragment();
                    ch.textContent.split(/(\s+)/).forEach(tok => {
                        if (!tok) return;
                        if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(' ')); return; }
                        if (withMask) {
                            const w = document.createElement('span'); w.className = 'w';
                            const wi = document.createElement('span'); wi.className = 'wi';
                            wi.style.setProperty('--i', i++); wi.textContent = tok;
                            w.appendChild(wi); frag.appendChild(w);
                        } else {
                            const s = document.createElement('span'); s.className = cls; s.textContent = tok; frag.appendChild(s);
                        }
                    });
                    ch.replaceWith(frag);
                } else if (ch.nodeType === 1 && ch.tagName !== 'BR') walk(ch);
            });
        };
        walk(el);
    }

    function splitHeadings(instant) {
        $$('[data-split]').forEach(el => {
            // rebuild from current language html (innerHTML was just reset by applyLang) or first run
            if (el.querySelector('.w')) return;
            splitWordsInto(el, '', true);
            if (el.classList.contains('hero__title')) el.style.setProperty('--base', '380ms');
            if (instant && el.classList.contains('in')) { /* already revealed: stays visible */ }
        });
    }

    let wordsTween = null;
    function buildWords() {
        const p = $('[data-words]'); if (!p) return;
        if (wordsTween) { wordsTween.scrollTrigger && wordsTween.scrollTrigger.kill(); wordsTween.kill(); wordsTween = null; }
        splitWordsInto(p, 'pw', false);
        if (!hasGsap || reduce) { $$('.pw', p).forEach(w => w.style.opacity = 1); return; }
        wordsTween = gsap.fromTo($$('.pw', p), { opacity: .16 }, {
            opacity: 1, ease: 'none', stagger: { each: .12 }, duration: .5,
            scrollTrigger: { trigger: p, start: 'top 82%', end: 'bottom 48%', scrub: true }
        });
    }

    /* =====================================================================
       Reveal observers (CSS driven, no scroll listeners)
       ===================================================================== */
    function initReveals() {
        // children that should reveal in sequence
        $$('.stat, .chips li, .info li, .ticks li, .creds li').forEach((el, i) => {
            el.classList.add('rv'); el.style.setProperty('--d', ((i % 5) * 0.09) + 's');
        });
        const targets = $$('.rv, [data-split], .reveal-img').filter(el => !el.classList.contains('hero__title') && !el.classList.contains('hero-in'));
        if (reduce || !('IntersectionObserver' in window)) { targets.forEach(el => el.classList.add('in')); return; }
        const io = new IntersectionObserver((entries, o) => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); o.unobserve(e.target); } });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
        targets.forEach(el => io.observe(el));
    }

    /* =====================================================================
       Smooth scroll (Lenis) wired to ScrollTrigger
       ===================================================================== */
    let lenis = null;
    function initScroll() {
        if (!reduce && window.Lenis) {
            lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, smoothWheel: true });
            if (hasGsap) {
                lenis.on('scroll', ScrollTrigger.update);
                gsap.ticker.add(t => lenis.raf(t * 1000));
                gsap.ticker.lagSmoothing(0);
            } else {
                const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
                requestAnimationFrame(raf);
            }
            lenis.stop();
        }
        $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (!id || id.length < 2) return;
            const target = id === '#top' ? document.body : $(id);
            if (!target) return;
            e.preventDefault();
            closeMenu();
            if (lenis) lenis.scrollTo(id === '#top' ? 0 : target, { offset: id === '#top' ? 0 : -8, duration: 1.5, easing: t => 1 - Math.pow(1 - t, 4) });
            else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        }));
    }

    /* =====================================================================
       Mobile menu
       ===================================================================== */
    let menuOpen = false;
    const menu = $('#menu'), burger = $('#burger');
    function openMenu() {
        if (!menu || menuOpen) return;
        menuOpen = true; menu.hidden = false;
        requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('is-open')));
        burger.setAttribute('aria-expanded', 'true'); burger.setAttribute('aria-label', T[lang].menuClose);
        if (lenis) lenis.stop(); else root.style.overflow = 'hidden';
    }
    function closeMenu() {
        if (!menu || !menuOpen) return;
        menuOpen = false; menu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', T[lang].menuOpen);
        if (lenis) lenis.start(); else root.style.overflow = '';
        setTimeout(() => { if (!menuOpen) menu.hidden = true; }, 850);
    }
    if (burger) burger.addEventListener('click', () => (menuOpen ? closeMenu() : openMenu()));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', e => { if (e.matches) closeMenu(); });

    /* =====================================================================
       Marquee: build enough copies for a seamless loop
       ===================================================================== */
    function buildMarquee() {
        const track = $('.marquee__track'); if (!track || reduce) return;
        $$('[data-clone]', track).forEach(n => n.remove());
        const base = $$('li', track);
        const setW = base.reduce((a, li) => a + li.getBoundingClientRect().width, 0);
        if (!setW) return;
        const need = Math.max(1, Math.ceil(window.innerWidth / setW));
        for (let k = 0; k < need * 2 - 1; k++) {
            base.forEach(li => { const c = li.cloneNode(true); c.dataset.clone = '1'; c.setAttribute('aria-hidden', 'true'); $$('img', c).forEach(i => i.alt = ''); track.appendChild(c); });
        }
        track.style.setProperty('--dur', ((need * setW) / 55).toFixed(1) + 's');
    }

    /* =====================================================================
       Hero particle network (canvas)
       ===================================================================== */
    function initNetwork() {
        const canvas = $('#net'); if (!canvas) return;
        const ctx = canvas.getContext('2d'); if (!ctx) return;
        const hero = $('.hero');
        let w = 0, h = 0, dpr = 1, pts = [], running = false, raf = 0;
        const mouse = { x: -9999, y: -9999 };

        function resize() {
            const r = hero.getBoundingClientRect();
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = r.width; h = r.height;
            canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const n = Math.round(Math.min(95, Math.max(30, (w * h) / 15500)));
            pts = Array.from({ length: n }, () => ({
                x: Math.random() * w, y: Math.random() * h,
                vx: (Math.random() - .5) * .38, vy: (Math.random() - .5) * .38,
                r: Math.random() * 1.7 + .9, c: Math.random() < .22
            }));
            if (!running) draw();
        }
        function draw() {
            ctx.clearRect(0, 0, w, h);
            const maxD = Math.min(150, Math.max(105, w / 9));
            for (let i = 0; i < pts.length; i++) {
                const p = pts[i];
                if (running) {
                    p.x += p.vx; p.y += p.vy;
                    if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
                    if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;
                    const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
                    if (d2 < 14000) { const d = Math.sqrt(d2) || 1, f = (1 - d / 118) * 1.6; p.x += (dx / d) * f; p.y += (dy / d) * f; }
                }
                for (let j = i + 1; j < pts.length; j++) {
                    const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.hypot(dx, dy);
                    if (d < maxD) {
                        ctx.strokeStyle = `rgba(27,60,184,${(1 - d / maxD) * .3})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
                    }
                }
            }
            for (const p of pts) {
                ctx.fillStyle = p.c ? 'rgba(46,176,234,.9)' : 'rgba(27,60,184,.5)';
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
                if (p.c) { ctx.fillStyle = 'rgba(60,192,240,.16)'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.4, 0, Math.PI * 2); ctx.fill(); }
            }
        }
        function loop() { if (!running) return; draw(); raf = requestAnimationFrame(loop); }
        function start() { if (running || reduce) return; running = true; raf = requestAnimationFrame(loop); }
        function stop() { running = false; cancelAnimationFrame(raf); }

        resize();
        let t; window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(resize, 200); });
        hero.addEventListener('pointermove', e => { const r = hero.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; }, { passive: true });
        hero.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });
        if ('IntersectionObserver' in window) {
            new IntersectionObserver(es => es.forEach(e => (e.isIntersecting ? start() : stop())), { threshold: 0 }).observe(hero);
        } else start();
    }

    /* =====================================================================
       Hero: pointer tilt + depth on hotspots
       ===================================================================== */
    function initHeroPointer() {
        if (!hasGsap || reduce || !finePointer) return;
        const hero = $('.hero'), arch = $('#arch'); if (!hero || !arch) return;
        const rY = gsap.quickTo(arch, 'rotationY', { duration: .9, ease: 'power3.out' });
        const rX = gsap.quickTo(arch, 'rotationX', { duration: .9, ease: 'power3.out' });
        const hots = $$('.hot').map(el => ({ x: gsap.quickTo(el, 'x', { duration: .9, ease: 'power3.out' }), y: gsap.quickTo(el, 'y', { duration: .9, ease: 'power3.out' }), d: +el.dataset.depth || 20 }));
        hero.addEventListener('pointermove', e => {
            const r = hero.getBoundingClientRect();
            const nx = (e.clientX - r.left) / r.width * 2 - 1, ny = (e.clientY - r.top) / r.height * 2 - 1;
            rY(nx * 7); rX(-ny * 5);
            hots.forEach(h => { h.x(nx * h.d); h.y(ny * h.d * .6); });
        }, { passive: true });
        hero.addEventListener('pointerleave', () => { rY(0); rX(0); hots.forEach(h => { h.x(0); h.y(0); }); });
    }

    /* =====================================================================
       Magnetic buttons + spotlight cards
       ===================================================================== */
    function initInteractions() {
        if (hasGsap && !reduce && finePointer) {
            $$('[data-magnet]').forEach(btn => {
                const xTo = gsap.quickTo(btn, 'x', { duration: .6, ease: 'power3.out' });
                const yTo = gsap.quickTo(btn, 'y', { duration: .6, ease: 'power3.out' });
                btn.addEventListener('pointermove', e => {
                    const r = btn.getBoundingClientRect();
                    xTo((e.clientX - (r.left + r.width / 2)) * .22);
                    yTo((e.clientY - (r.top + r.height / 2)) * .32);
                });
                btn.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
            });
        }
        $$('.spot').forEach(card => {
            card.addEventListener('pointermove', e => {
                const r = card.getBoundingClientRect();
                card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
                card.style.setProperty('--my', (e.clientY - r.top) + 'px');
            }, { passive: true });
        });
    }

    /* =====================================================================
       Scroll choreography (GSAP ScrollTrigger)
       ===================================================================== */
    function initScrollFX() {
        if (!hasGsap) return;
        ScrollTrigger.config({ ignoreMobileResize: true });

        // progress bar + nav state
        const bar = $('#progress');
        ScrollTrigger.create({ start: 0, end: 'max', onUpdate: s => { if (bar) bar.style.transform = `scaleX(${s.progress})`; } });
        ScrollTrigger.create({ start: 60, end: 'max', toggleClass: { targets: '#nav', className: 'is-scrolled' } });

        // active nav link (IntersectionObserver: independent of pin spacing)
        const links = $$('.nav__links a');
        if ('IntersectionObserver' in window) {
            const spy = new IntersectionObserver(entries => entries.forEach(e => {
                links.forEach(a => { if (a.getAttribute('href') === '#' + e.target.id) a.classList.toggle('is-active', e.isIntersecting); });
            }), { rootMargin: '-46% 0px -50% 0px' });
            ['treatments', 'doctor', 'process', 'visit', 'faq'].forEach(id => { const el = document.getElementById(id); if (el) spy.observe(el); });
        }

        // counters
        $$('.count').forEach(el => {
            const to = parseFloat(el.dataset.to), dec = +el.dataset.dec || 0;
            const from = el.dataset.from !== undefined ? parseFloat(el.dataset.from) : 0;
            if (reduce) { el.textContent = to.toFixed(dec); return; }
            el.textContent = from.toFixed(dec);
            ScrollTrigger.create({
                trigger: el, start: 'top 92%', once: true,
                onEnter: () => { const o = { v: from }; gsap.to(o, { v: to, duration: 2, ease: 'power3.out', onUpdate: () => { el.textContent = o.v.toFixed(dec); } }); }
            });
        });

        if (reduce) return;

        const mm = gsap.matchMedia();

        // hero scroll-out
        mm.add('(min-width: 0px)', () => {
            gsap.to('.hero__copy', { yPercent: -10, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
            gsap.to('.arch__frame img', { yPercent: 7, scale: 1.4, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
            gsap.to('.hero__bg canvas', { yPercent: 14, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
        });

        // image parallax
        mm.add('(min-width: 0px)', () => {
            $$('[data-parallax]').forEach(img => {
                const amt = (parseFloat(img.dataset.parallax) || .08) * 100;
                gsap.fromTo(img, { yPercent: -amt }, { yPercent: amt, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
            });
        });

        // sticky stack: previous card recedes as the next one arrives
        mm.add('(min-width: 0px)', () => {
            const steps = $$('.step');
            steps.forEach((card, i) => {
                if (i === steps.length - 1) return;
                const topPx = 84 + (i + 1) * 16;
                gsap.to(card, {
                    scale: 0.94, ease: 'none', transformOrigin: '50% 0',
                    scrollTrigger: { trigger: steps[i + 1], start: 'top bottom', end: `top ${topPx + 40}px`, scrub: true }
                });
            });
        });

        // treatments: horizontal pan on desktop, native stack elsewhere
        mm.add('(min-width: 1024px)', () => {
            const sec = $('#treatments'), stage = $('.pan__stage'), track = $('.pan__track'), fill = $('#pan-bar');
            if (!sec || !stage || !track) return;
            sec.classList.add('is-pan');
            const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
            const tween = gsap.to(track, {
                x: () => -dist(), ease: 'none',
                scrollTrigger: {
                    trigger: stage, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
                    onUpdate: s => { if (fill) fill.style.transform = `scaleX(${s.progress})`; }
                }
            });
            $$('[data-pan-img]').forEach(img => {
                gsap.fromTo(img, { xPercent: -6 }, {
                    xPercent: 6, ease: 'none',
                    scrollTrigger: { trigger: img.closest('.tx'), containerAnimation: tween, start: 'left right', end: 'right left', scrub: true }
                });
            });
            // cards enter the viewport inside the pan: reveal on horizontal entry
            $$('.tx').forEach(card => {
                gsap.fromTo(card, { opacity: .35, scale: .94 }, {
                    opacity: 1, scale: 1, ease: 'none',
                    scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left 98%', end: 'left 62%', scrub: true }
                });
            });
            return () => { sec.classList.remove('is-pan'); if (fill) fill.style.transform = ''; };
        });

        // footer wordmark rises in
        mm.add('(min-width: 0px)', () => {
            gsap.fromTo('.foot__word', { yPercent: 28, opacity: 0 }, { yPercent: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: '.foot__word', start: 'top bottom', end: 'bottom 92%', scrub: true } });
        });

        // triggers created before the pin must be re-sorted so pin spacing is accounted for
        ScrollTrigger.sort();
    }

    /* =====================================================================
       Accordion
       ===================================================================== */
    function initAccordion() {
        const items = $$('.acc__item');
        items.forEach((item, idx) => {
            const btn = $('.acc__q', item);
            const set = open => { item.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', String(open)); };
            btn.addEventListener('click', () => {
                const willOpen = !item.classList.contains('is-open');
                items.forEach(o => { if (o !== item) { o.classList.remove('is-open'); $('.acc__q', o).setAttribute('aria-expanded', 'false'); } });
                set(willOpen);
                if (hasGsap) setTimeout(() => ScrollTrigger.refresh(), 650);
            });
            if (idx === 0) set(true);
        });
    }

    /* =====================================================================
       Form -> WhatsApp
       ===================================================================== */
    const form = $('#lead');
    function clearFormFeedback() {
        if (!form) return;
        $$('.field', form).forEach(f => f.classList.remove('is-invalid'));
        $$('.field__err', form).forEach(e => { e.textContent = ''; });
        const st = $('#form-status'); if (st) st.innerHTML = '';
    }
    function initForm() {
        if (!form) return;
        const name = $('#f-name'), phone = $('#f-phone'), treat = $('#f-treat'), msg = $('#f-msg');
        const status = $('#form-status'), btn = $('#submit');
        const mark = (input, errId, text) => {
            const field = input.closest('.field'); const err = $('#' + errId);
            field.classList.toggle('is-invalid', !!text);
            input.setAttribute('aria-invalid', text ? 'true' : 'false');
            if (err) err.textContent = text || '';
            return !text;
        };
        const check = {
            name: () => mark(name, 'e-name', name.value.trim().length < 2 ? T[lang].errName : ''),
            phone: () => { const v = phone.value.trim(); const digits = v.replace(/\D/g, ''); return mark(phone, 'e-phone', v && (digits.length < 7 || digits.length > 15 || /[^\d+\-().\s]/.test(v)) ? T[lang].errPhone : ''); },
            treat: () => mark(treat, 'e-treat', !treat.value ? T[lang].errTreat : '')
        };
        name.addEventListener('blur', check.name); phone.addEventListener('blur', check.phone); treat.addEventListener('change', check.treat);
        [name, phone].forEach(i => i.addEventListener('input', () => { if (i.closest('.field').classList.contains('is-invalid')) check[i === name ? 'name' : 'phone'](); }));

        form.addEventListener('submit', e => {
            e.preventDefault();
            const ok = [check.name(), check.phone(), check.treat()];
            if (ok.includes(false)) { const bad = $('.field.is-invalid input, .field.is-invalid select', form); if (bad) bad.focus(); return; }
            const text = T[lang].form(name.value.trim(), T[lang].treat[treat.value] || T[lang].treat.other, phone.value.trim(), msg.value.trim());
            const url = waUrl(text);
            btn.classList.add('is-loading');
            status.textContent = T[lang].opening;
            const win = window.open(url, '_blank', 'noopener');
            setTimeout(() => {
                btn.classList.remove('is-loading');
                status.innerHTML = win ? T[lang].done.replace('%URL%', url) : T[lang].done.replace('%URL%', url);
            }, 900);
        });
    }

    /* =====================================================================
       Loader
       ===================================================================== */
    let initialised = false;
    function runLoader() {
        const loader = $('#loader'), num = $('#ld-num'), prog = $('.ld__prog');
        if (!loader) { finishIntro(); return; }
        const MIN = reduce ? 500 : 2100;
        const t0 = performance.now();
        let loaded = document.readyState === 'complete', p = 0, done = false;
        window.addEventListener('load', () => { loaded = true; }, { once: true });
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { /* fonts settled */ });
        const render = v => { num.textContent = Math.round(v); prog.style.setProperty('--p', v.toFixed(2)); };

        function tick(now) {
            const el = now - t0;
            const ready = (loaded && el > MIN) || el > 7000;
            const target = ready ? 100 : Math.min(90, (el / MIN) * 90);
            p += (target - p) * (ready ? .16 : .07);
            render(p);
            if (ready && p > 99.4 && !done) {
                done = true; render(100);
                setTimeout(() => {
                    loader.classList.add('is-done');
                    setTimeout(finishIntro, 520);
                    setTimeout(() => { loader.remove(); if (hasGsap) ScrollTrigger.refresh(); }, 1500);
                }, 260);
                return;
            }
            requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    function finishIntro() {
        root.classList.remove('is-loading');
        root.classList.add('ready');
        if (lenis) lenis.start();
        const h1 = $('.hero__title'); if (h1) h1.classList.add('in');
        $$('.hero-in').forEach(el => el.classList.add('in'));
    }

    /* =====================================================================
       Boot
       ===================================================================== */
    function boot() {
        root.classList.add('is-loading');
        cacheOriginals();

        let saved = null;
        try { saved = localStorage.getItem('ana-lang'); } catch (e) { /* ignore */ }
        const initial = saved || ((navigator.language || 'en').toLowerCase().startsWith('es') ? 'es' : 'en');
        applyLang(initial, false);

        splitHeadings(false);
        buildWords();
        initialised = true;

        const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();
        const lb = $('#lang-toggle'); if (lb) lb.addEventListener('click', () => applyLang(lang === 'en' ? 'es' : 'en', true));

        initScroll();
        initReveals();
        initScrollFX();
        initAccordion();
        initForm();
        initInteractions();
        initHeroPointer();
        initNetwork();
        buildMarquee();
        let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(buildMarquee, 250); });
        setInterval(updateOpen, 60000);

        runLoader();
        window.addEventListener('load', () => { if (hasGsap) { ScrollTrigger.sort(); ScrollTrigger.refresh(); } buildMarquee(); });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
})();
