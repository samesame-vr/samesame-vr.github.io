/* ── Same Same Verona — shared.js ──────────────────────────────────────
   Nav injection, footer injection, language switch (IT/EN),
   scroll reveal, mobile menu.
──────────────────────────────────────────────────────────────────────── */

/* ── TRANSLATIONS ─────────────────────────────────────────────────────── */
const T = {
  it: {
    nav_come:        'Come funziona',
    nav_lavori:      'Lavori',
    nav_contatti:    'Contatti',
    footer_copy:     '© 2026 Same Same Verona · Gadget & Design 3D',
    footer_made:     'Fatto con cura a Verona',
    footer_disclaimer: "Same Same Verona è un progetto di stampa 3D curato da Antonio Obaid, con il supporto del team. I lavori sono realizzati a titolo di prestazione occasionale e non costituiscono attività d'impresa.",
    lang_label:      'EN',
    lang_title:      'Switch to English',
  },
  en: {
    nav_come:        'How it works',
    nav_lavori:      'Work',
    nav_contatti:    'Contact',
    footer_copy:     '© 2026 Same Same Verona · 3D Gadgets & Design',
    footer_made:     'Made with care in Verona',
    footer_disclaimer: "Same Same Verona is a 3D printing project run by Antonio Obaid, with the support of the team. Work is carried out as occasional service and does not constitute a business activity.",
    lang_label:      'IT',
    lang_title:      "Passa all'italiano",
  }
};

/* ── LANGUAGE STATE ───────────────────────────────────────────────────── */
// Leggiamo subito — nessun listener, nessun DOMContentLoaded
let currentLang = localStorage.getItem('ss_lang') || 'it';

function applyLang(l) {
  currentLang = l;
  localStorage.setItem('ss_lang', l);
  document.documentElement.lang = l;

  // testi semplici
  document.querySelectorAll('[data-it]').forEach(el => {
    const val = el.getAttribute('data-' + l);
    if (val !== null) el.textContent = val;
  });

  // testi HTML
  document.querySelectorAll('[data-it-html]').forEach(el => {
    const val = el.getAttribute('data-' + l + '-html');
    if (val !== null) el.innerHTML = val;
  });

  // bottone lingua
  const btn = document.getElementById('lang-btn');
  if (btn) {
    btn.textContent = T[l].lang_label;
    btn.title       = T[l].lang_title;
  }

  // link nav
  const ids = {
    'nav-come':     T[l].nav_come,
    'nav-lavori':   T[l].nav_lavori,
    'nav-contatti': T[l].nav_contatti,
  };
  Object.entries(ids).forEach(([id, txt]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
  });

  // footer
  const fc = document.getElementById('footer-copy');
  const fm = document.getElementById('footer-made');
  const fd = document.getElementById('footer-disclaimer');
  if (fc) fc.textContent = T[l].footer_copy;
  if (fm) fm.textContent = T[l].footer_made;
  if (fd) fd.textContent = T[l].footer_disclaimer;
}

/* ── NAV ──────────────────────────────────────────────────────────────── */
function buildNav() {
  const page     = window.SS_PAGE || '';
  const active   = (p) => p === page ? ' nav-active' : '';
  const l        = currentLang;

  const nav      = document.createElement('nav');
  nav.id         = 'site-nav';
  nav.innerHTML  = `
    <div class="nav-inner">
      <a class="nav-brand" href="index.html" aria-label="Same Same Verona — home">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="11" y="11" width="20" height="20" rx="2" fill="none" stroke="#2D5A1B" stroke-width="1.5" opacity="0.35"/>
          <rect x="3"  y="3"  width="20" height="20" rx="2" fill="#F7F4EE" stroke="#1A1A18" stroke-width="1.8"/>
          <line x1="7" y1="10" x2="19" y2="10" stroke="#1A1A18" stroke-width="1" opacity="0.35"/>
          <line x1="7" y1="15" x2="19" y2="15" stroke="#1A1A18" stroke-width="1" opacity="0.35"/>
          <line x1="7" y1="20" x2="19" y2="20" stroke="#1A1A18" stroke-width="1" opacity="0.35"/>
          <circle cx="23" cy="23" r="3.5" fill="#2D5A1B"/>
        </svg>
        <span class="nav-brand-text">Same Same</span>
      </a>
      <button class="nav-burger" id="nav-burger" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links" id="nav-links" role="list">
        <li><a href="index.html#come-funziona" id="nav-come"     class="nav-link${active('come')}">${T[l].nav_come}</a></li>
        <li><a href="lavori.html"              id="nav-lavori"   class="nav-link${active('lavori')}">${T[l].nav_lavori}</a></li>
        <li><a href="contatti.html"            id="nav-contatti" class="nav-link${active('contatti')}">${T[l].nav_contatti}</a></li>
        <li>
          <button id="lang-btn" class="nav-lang" title="${T[l].lang_title}">
            ${T[l].lang_label}
          </button>
        </li>
      </ul>
    </div>`;

  document.body.prepend(nav);

  // Lingua — addEventListener dopo il prepend, la funzione è già in scope
  document.getElementById('lang-btn').addEventListener('click', () => {
    applyLang(currentLang === 'it' ? 'en' : 'it');
  });

  // Burger menu mobile
  document.getElementById('nav-burger').addEventListener('click', function () {
    const links = document.getElementById('nav-links');
    const open  = links.classList.toggle('open');
    this.setAttribute('aria-expanded', String(open));
  });
}

/* ── FOOTER ───────────────────────────────────────────────────────────── */
function buildFooter() {
  const l      = currentLang;
  const footer = document.createElement('footer');
  footer.id    = 'site-footer';
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="footer-name">Same Same Verona</span>
        <span class="footer-sub" id="footer-made">${T[l].footer_made}</span>
      </div>
      <div class="footer-links">
        <a href="https://instagram.com/same.same_vr" target="_blank" rel="noopener">Instagram</a>
        <a href="mailto:samesame.verona@gmail.com">Email</a>
        <a href="https://www.cal.eu/same-same/15min" target="_blank" rel="noopener">Consulenza</a>
      </div>
      <p class="footer-copy" id="footer-copy">${T[l].footer_copy}</p>
    </div>
    <p class="footer-disclaimer" id="footer-disclaimer">${T[l].footer_disclaimer}</p>`;
  document.body.appendChild(footer);
}

/* ── SCROLL REVEAL ────────────────────────────────────────────────────── */
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ── INIT ─────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildNav();
  buildFooter();
  // Applica la lingua DOPO aver costruito nav e footer
  // ma NON toccare il bottone lang (già renderizzato correttamente in buildNav)
  applyLang(currentLang);
  initReveal();
});
