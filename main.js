// =============================================================
//  PORTFOLIO — Matteo Campemenoso — BTS SIO SLAM 2026
//  main.js : tous les comportements interactifs du site
// =============================================================
//
//  Ce fichier est divisé en 8 sections indépendantes :
//
//  1. SIDEBAR MOBILE       → ouverture/fermeture du menu sur téléphone
//  2. NAV ACTIVE           → lien de navigation mis en surbrillance
//                            selon la section visible à l'écran
//  3. REVEAL ON SCROLL     → animation d'apparition au défilement
//  4. TYPED EFFECT         → texte qui se tape automatiquement
//  5. CAROUSELS            → diaporama des cartes projets
//  6. FILTRE PROJETS       → tri des projets par catégorie
//  7. SYSTÈME MODAL        → fenêtres de détail des projets
//  8. LIGHTBOX             → zoom sur une image en plein écran
//
// =============================================================


// ─────────────────────────────────────────────────────────────
// 1. SIDEBAR MOBILE
//    Quand on clique sur le bouton hamburger (mobBtn), on ajoute
//    la classe CSS "open" à la sidebar et au fond sombre (overlay).
//    Cliquer sur la croix ou sur le fond sombre referme tout.
// ─────────────────────────────────────────────────────────────
const sidebar   = document.getElementById('sidebar');
const sbOverlay = document.getElementById('sbOverlay');
const mobBtn    = document.getElementById('mobBtn');
const sbClose   = document.getElementById('sbClose');

function openSB()  { sidebar.classList.add('open');    sbOverlay.classList.add('open');    }
function closeSB() { sidebar.classList.remove('open'); sbOverlay.classList.remove('open'); }

if (mobBtn)    mobBtn.addEventListener('click', openSB);
if (sbClose)   sbClose.addEventListener('click', closeSB);
if (sbOverlay) sbOverlay.addEventListener('click', closeSB);


// ─────────────────────────────────────────────────────────────
// 2. NAV ACTIVE
//    IntersectionObserver surveille chaque section (.sec).
//    Dès qu'une section occupe 30 % de l'écran, le lien de nav
//    correspondant reçoit la classe "active" (surbrillance bleue).
//    threshold: 0.3 → déclenché quand 30 % de la section est visible
//    rootMargin    → zone de détection réduite (ignore le haut et bas)
// ─────────────────────────────────────────────────────────────
const navLinks = document.querySelectorAll('.sn');
const secEls   = document.querySelectorAll('.sec');

const navIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const lnk = document.querySelector('.sn[href="#' + e.target.id + '"]');
      if (lnk) lnk.classList.add('active');
    }
  });
}, { threshold: .3, rootMargin: '-10% 0px -60% 0px' });

secEls.forEach(s => navIO.observe(s));


// ─────────────────────────────────────────────────────────────
// 3. REVEAL ON SCROLL
//    Chaque élément avec la classe "reveal" est invisible au départ.
//    IntersectionObserver ajoute la classe "vis" quand il entre
//    dans le viewport → le CSS fait apparaître l'élément en fondu.
//    unobserve() : on arrête de surveiller une fois l'animation faite.
// ─────────────────────────────────────────────────────────────
const revIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('vis');
      revIO.unobserve(e.target); // plus besoin de surveiller après
    }
  });
}, { threshold: .1 });

document.querySelectorAll('.reveal').forEach(el => revIO.observe(el));


// ─────────────────────────────────────────────────────────────
// 4. EFFET TEXTE TAPÉ (Typewriter)
//    Un tableau de mots est parcouru un par un.
//    La fonction typeStep() ajoute ou supprime une lettre
//    à chaque appel, créant l'illusion d'une machine à écrire.
//
//    Variables :
//      wi  = index du mot en cours (word index)
//      ci  = index du caractère en cours (char index)
//      del = true quand on efface, false quand on écrit
//
//    Vitesse : 90ms pour écrire, 55ms pour effacer, 1600ms de pause.
// ─────────────────────────────────────────────────────────────
const words   = ['Matteo Campemenoso', 'Développeur Web', 'Étudiant BTS SIO SLAM', 'Apprenti PHP & MySQL'];
let wi = 0, ci = 0, del = false;
const typedEl = document.getElementById('typed-text');

if (typedEl) {
  (function typeStep() {
    const w = words[wi];
    if (!del) {
      // Mode écriture : on ajoute une lettre
      typedEl.textContent = w.slice(0, ++ci);
      if (ci === w.length) { del = true; setTimeout(typeStep, 1600); return; }
    } else {
      // Mode effacement : on retire une lettre
      typedEl.textContent = w.slice(0, --ci);
      if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(typeStep, del ? 55 : 90);
  })();
}


// ─────────────────────────────────────────────────────────────
// 5. CAROUSELS (grille des projets)
//    Chaque carte projet contient un carrousel (.carousel).
//    initCarousel() met en place :
//      - les boutons ← → pour naviguer entre les slides
//      - les points de navigation (dots) cliquables
//      - le défilement automatique toutes les 4,5 secondes
//      - le swipe tactile (glisser le doigt sur mobile)
//    goTo(n) déplace le .car-track en CSS translate pour faire
//    défiler les slides (technique classique de carrousel CSS).
// ─────────────────────────────────────────────────────────────
function initCarousel(car) {
  const track  = car.querySelector('.car-track');
  const prev   = car.querySelector('.car-prev');
  const next   = car.querySelector('.car-next');
  const dotsW  = car.querySelector('.car-dots');
  const slides = track.querySelectorAll('.car-slide, .car-ph');
  if (!slides.length || !dotsW) return;

  let cur = 0; // slide actuellement affichée

  // Création des points de navigation
  slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'car-dot' + (i === 0 ? ' on' : '');
    d.addEventListener('click', () => goTo(i));
    dotsW.appendChild(d);
  });

  // Déplace le carrousel vers le slide n
  function goTo(n) {
    cur = ((n % slides.length) + slides.length) % slides.length; // boucle infinie
    track.style.transform = `translateX(-${cur * 100}%)`;
    dotsW.querySelectorAll('.car-dot').forEach((d, i) => d.classList.toggle('on', i === cur));
  }

  prev.addEventListener('click', () => goTo(cur - 1));
  next.addEventListener('click', () => goTo(cur + 1));

  // Swipe tactile : on enregistre la position X du doigt au départ
  let sx = null;
  car.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  car.addEventListener('touchend',   e => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) { dx < 0 ? goTo(cur + 1) : goTo(cur - 1); }
    sx = null;
  }, { passive: true });

  // Défilement automatique (pause au survol)
  if (slides.length > 1) {
    let t = setInterval(() => goTo(cur + 1), 4500);
    car.addEventListener('mouseenter', () => clearInterval(t));
    car.addEventListener('mouseleave', () => { t = setInterval(() => goTo(cur + 1), 4500); });
  }
}

document.querySelectorAll('.carousel').forEach(initCarousel);


// ─────────────────────────────────────────────────────────────
// 6. FILTRE PROJETS
//    Chaque bouton de filtre (.pfbtn) porte un attribut data-f
//    ("all", "web", "app"…). Au clic :
//      1. On retire la classe "active" de tous les boutons
//      2. On l'ajoute seulement sur le bouton cliqué
//      3. On affiche/cache chaque carte selon sa catégorie (data-cat)
// ─────────────────────────────────────────────────────────────
document.querySelectorAll('.pfbtn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pfbtn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const f = btn.dataset.f; // filtre sélectionné
    document.querySelectorAll('.pcard').forEach(c => {
      const cats = (c.dataset.cat || '').split(' ');
      c.classList.toggle('hidden', f !== 'all' && !cats.includes(f));
    });
  });
});


// ─────────────────────────────────────────────────────────────
// 7. SYSTÈME MODAL UNIVERSEL
//
//    MODAL_MAP : table de correspondance entre l'id d'un bouton
//    et la modale + le carrousel qu'il doit ouvrir.
//    → Ajouter un nouveau projet = ajouter une ligne ici.
//
//    openModal(cfg) :
//      - rend la modale visible (classe "open")
//      - bloque le scroll de la page
//      - remet le contenu en haut
//      - initialise le carrousel interne
//
//    closeModal() :
//      - enlève la classe "open"
//      - restaure le scroll
//
//    Fermeture possible via :
//      - bouton ✕ (.modal-close)
//      - clic sur le fond sombre (overlay)
//      - touche Échap
// ─────────────────────────────────────────────────────────────
const MODAL_MAP = {
  'openGestmegot':     { modal: 'modalGestmegot',  track: 'track_modalGestmegot',  dots: 'dots_modalGestmegot'  },
  'openGestmegotBtn':  { modal: 'modalGestmegot',  track: 'track_modalGestmegot',  dots: 'dots_modalGestmegot'  },
  'openVelolaon':      { modal: 'modalVelolaon',   track: 'track_modalVelolaon',   dots: 'dots_modalVelolaon'   },
  'openVelolaonBtn':   { modal: 'modalVelolaon',   track: 'track_modalVelolaon',   dots: 'dots_modalVelolaon'   },
  'openMondevache':    { modal: 'modalMondevache', track: 'track_modalMondevache', dots: 'dots_modalMondevache' },
  'openMondevacheBtn': { modal: 'modalMondevache', track: 'track_modalMondevache', dots: 'dots_modalMondevache' },
  'openChatbot':       { modal: 'modalChatbot',    track: 'track_modalChatbot',    dots: 'dots_modalChatbot'    },
  'openChatbotBtn':    { modal: 'modalChatbot',    track: 'track_modalChatbot',    dots: 'dots_modalChatbot'    },
  'openTracemoi':      { modal: 'modalTracemoi',   track: 'mcTrack',               dots: 'mcDots'               },
  'openTracemoiBtn':   { modal: 'modalTracemoi',   track: 'mcTrack',               dots: 'mcDots'               },
};

let activeModal = null; // modale actuellement ouverte

function openModal(cfg) {
  const overlay = document.getElementById(cfg.modal);
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden'; // empêche le scroll de la page
  const scroll = overlay.querySelector('.modal-scroll');
  if (scroll) scroll.scrollTop = 0; // remet en haut à chaque ouverture
  activeModal = cfg;
  initModalCarousel(cfg.track, cfg.dots);
}

function closeModal() {
  if (!activeModal) return;
  const overlay = document.getElementById(activeModal.modal);
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = ''; // restaure le scroll
  activeModal = null;
}

// Branchement de chaque bouton à sa modale
Object.entries(MODAL_MAP).forEach(([btnId, cfg]) => {
  const btn = document.getElementById(btnId);
  if (btn) btn.addEventListener('click', e => { e.preventDefault(); openModal(cfg); });
});

// Fermer via le bouton ✕
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', closeModal);
});

// Fermer en cliquant sur le fond sombre (pas sur la modale elle-même)
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
});

// Fermer avec la touche Échap
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });


// ─────────────────────────────────────────────────────────────
// 7b. CARROUSEL INTERNE AUX MODALES
//    Même principe que le carrousel des cartes (section 5),
//    mais adapté aux modales (.mc-slide au lieu de .car-slide).
//    initializedCarousels évite de re-initialiser un carrousel
//    déjà prêt si on rouvre la même modale plusieurs fois.
// ─────────────────────────────────────────────────────────────
const initializedCarousels = new Set();

function initModalCarousel(trackId, dotsId) {
  if (initializedCarousels.has(trackId)) return; // déjà initialisé
  const track = document.getElementById(trackId);
  const dotsW = document.getElementById(dotsId);
  if (!track || !dotsW) return;
  const slides = track.querySelectorAll('.mc-slide, .mc-ph');
  if (!slides.length) return;
  initializedCarousels.add(trackId);

  let cur = 0;

  // Création des points
  slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'mc-dot' + (i === 0 ? ' on' : '');
    d.addEventListener('click', () => mcGoto(i));
    dotsW.appendChild(d);
  });

  function mcGoto(n) {
    cur = ((n % slides.length) + slides.length) % slides.length;
    track.style.transform = `translateX(-${cur * 100}%)`;
    dotsW.querySelectorAll('.mc-dot').forEach((d, i) => d.classList.toggle('on', i === cur));
    // Mise à jour du compteur "1 / 5" s'il existe
    const car = track.closest('.modal-carousel');
    if (car) {
      const counter = car.querySelector('.mc-counter');
      if (counter) counter.textContent = `${cur + 1} / ${slides.length}`;
    }
  }

  const car = track.closest('.modal-carousel');
  if (car) {
    car.querySelector('.mc-prev')?.addEventListener('click', () => mcGoto(cur - 1));
    car.querySelector('.mc-next')?.addEventListener('click', () => mcGoto(cur + 1));
    // Swipe tactile
    let sx = null;
    car.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    car.addEventListener('touchend',   e => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) { dx < 0 ? mcGoto(cur + 1) : mcGoto(cur - 1); }
      sx = null;
    }, { passive: true });
  }
}


// ─────────────────────────────────────────────────────────────
// 8. FORMULAIRE DE CONTACT
//    preventDefault() empêche le rechargement de la page.
//    On affiche un message de succès 4 secondes puis on l'efface.
//    (EmailJS peut être branché ici pour envoyer vraiment le mail)
// ─────────────────────────────────────────────────────────────
const form     = document.getElementById('contactForm');
const fsuccess = document.getElementById('fsuccess');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (fsuccess) fsuccess.classList.add('show');
    form.reset();
    setTimeout(() => { if (fsuccess) fsuccess.classList.remove('show'); }, 4000);
  });
}


// ─────────────────────────────────────────────────────────────
// 9. BOUTON RETOUR EN HAUT
//    Devient visible quand on descend de plus de 400px.
//    scrollTo avec behavior:'smooth' fait défiler en douceur.
// ─────────────────────────────────────────────────────────────
const btt = document.getElementById('btt');
if (btt) {
  window.addEventListener('scroll', () => btt.classList.toggle('show', window.scrollY > 400), { passive: true });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}


// ─────────────────────────────────────────────────────────────
// 10. LIGHTBOX (zoom image plein écran)
//    Quand on clique sur une image dans un carrousel, la lightbox
//    s'ouvre et affiche l'image en grand avec son titre.
//    On peut naviguer avec ← →, le clavier ou les boutons.
//
//    bindSlides() : parcourt les slides d'un groupe, collecte
//    les images (src, alt, légende) dans un tableau, puis pose
//    un écouteur click sur chaque image.
//
//    Pour les modales : MutationObserver attend que la modale
//    soit ouverte (classe "open") avant de binder les images,
//    car leur contenu peut ne pas être visible avant.
// ─────────────────────────────────────────────────────────────
(function () {
  const lb        = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');
  const lbCounter = document.getElementById('lbCounter');
  const lbClose   = document.getElementById('lbClose');
  const lbPrev    = document.getElementById('lbPrev');
  const lbNext    = document.getElementById('lbNext');
  if (!lb) return;

  let images = [], cur = 0;

  function openLb(imgs, idx) {
    images = imgs; cur = idx;
    render();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  function render() {
    const s = images[cur];
    lbImg.src = s.src;
    lbImg.alt = s.alt || '';
    lbCaption.textContent = s.caption || '';
    lbCounter.textContent = images.length > 1 ? `${cur + 1} / ${images.length}` : '';
    lbPrev.style.visibility = images.length > 1 ? 'visible' : 'hidden';
    lbNext.style.visibility = images.length > 1 ? 'visible' : 'hidden';
  }
  function prev() { cur = (cur - 1 + images.length) % images.length; render(); }
  function next() { cur = (cur + 1) % images.length; render(); }

  lbClose.addEventListener('click', closeLb);
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  lbPrev.addEventListener('click',  e => { e.stopPropagation(); prev(); });
  lbNext.addEventListener('click',  e => { e.stopPropagation(); next(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')    closeLb();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // Collecte les images d'un groupe de slides et pose le zoom-in
  function bindSlides(slides, captionClass) {
    if (!slides.length) return;
    const imgs = [];
    slides.forEach(s => {
      const img = s.querySelector('img');
      const cap = s.querySelector(captionClass);
      if (img) imgs.push({ src: img.src, alt: img.alt, caption: cap ? cap.textContent.trim() : '' });
    });
    slides.forEach((s, i) => {
      const img = s.querySelector('img');
      if (!img) return;
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => openLb(imgs, i));
    });
  }

  // Carrousels dans les modales
  function bindModalCarousel(carEl) {
    if (!carEl || carEl._lbBound) return;
    carEl._lbBound = true;
    bindSlides(Array.from(carEl.querySelectorAll('.mc-slide')), '.mc-slide-caption');
  }

  // Carrousels dans les cartes projets
  function bindCardCarousel(carEl) {
    if (!carEl || carEl._lbBound) return;
    carEl._lbBound = true;
    bindSlides(Array.from(carEl.querySelectorAll('.car-slide')), '.car-caption');
  }

  // Les cartes sont toujours dans le DOM → on bind directement
  document.querySelectorAll('.carousel').forEach(bindCardCarousel);

  // Les modales s'ouvrent dynamiquement → on attend l'ajout de "open"
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    const observer = new MutationObserver(() => {
      if (overlay.classList.contains('open')) {
        overlay.querySelectorAll('.modal-carousel').forEach(bindModalCarousel);
      }
    });
    observer.observe(overlay, { attributes: true, attributeFilter: ['class'] });
  });
})();
