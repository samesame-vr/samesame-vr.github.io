/* ── Same Same Verona — shared.js ─────────────────────────────────────
   Handles: language switch (IT/EN), nav injection, footer injection,
   active nav link, smooth scroll, and mobile menu.
   Usage: <script src="shared.js"></script> at end of <body>.
   Set window.SS_PAGE = 'home' | 'lavori' | 'preventivo' | 'contatti'
   before including this script to highlight the correct nav link.
──────────────────────────────────────────────────────────────────────── */

/* ── TRANSLATIONS ─────────────────────────────────────────────────────── */
const T = {
  it: {
    nav_come:      'Come funziona',
    nav_lavori:    'Lavori',
    nav_preventivo:'Preventivo',
    nav_contatti:  'Contatti',
    footer_copy:   '© 2026 Same Same Verona · Stampa 3D & Design',
    footer_made:   'Fatto con cura a Verona',
    lang_label:    'EN',
    lang_title:    'Switch to English',
  },
  en: {
    nav_come:      'How it works',
    nav_lavori:    'Work',
    nav_preventivo:'Get a quote',
    nav_contatti:  'Contact',
    footer_copy:   '© 2026 Same Same Verona · 3D Printing & Design',
    footer_made:   'Made with care in Verona',
    lang_label:    'IT',
    lang_title:    'Passa all\'italiano',
  }
};

/* ── LANGUAGE STATE ───────────────────────────────────────────────────── */
let lang = localStorage.getItem('ss_lang') || 'it';

function setLang(l) {
  lang = l;
  localStorage.setItem('ss_lang', l);
  document.documentElement.lang = l;
  document.querySelectorAll('[data-it]').forEach(el => {
    el.textContent = el.getAttribute('data-' + l) || el.getAttribute('data-it');
  });
  document.querySelectorAll('[data-it-html]').forEach(el => {
    el.innerHTML = el.getAttribute('data-' + l + '-html') || el.getAttribute('data-it-html');
  });
  const btn = document.getElementById('lang-btn');
  if (btn) {
    btn.textContent = T[l].lang_label;
    btn.title = T[l].lang_title;
  }
  // update nav texts
  const map = {
    'nav-come':      [T[l].nav_come],
    'nav-lavori':    [T[l].nav_lavori],
    'nav-preventivo':[T[l].nav_preventivo],
    'nav-contatti':  [T[l].nav_contatti],
  };
  Object.entries(map).forEach(([id, [txt]]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
  });
  // footer
  const fc = document.getElementById('footer-copy');
  const fm = document.getElementById('footer-made');
  if (fc) fc.textContent = T[l].footer_copy;
  if (fm) fm.textContent = T[l].footer_made;
}

/* ── NAV HTML ─────────────────────────────────────────────────────────── */
function buildNav() {
  const page = window.SS_PAGE || '';
  const isActive = (p) => p === page ? ' nav-active' : '';
  const nav = document.createElement('nav');
  nav.id = 'site-nav';
  nav.innerHTML = `
    <div class="nav-inner">
      <a class="nav-brand" href="index.html" aria-label="Same Same Verona — home">
        <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="12" y="12" width="20" height="20" rx="2" fill="none" stroke="#2D5A1B" stroke-width="1.2" opacity="0.45"/>
          <line x1="12" y1="17.5" x2="32" y2="17.5" stroke="#2D5A1B" stroke-width="0.7" opacity="0.35"/>
          <line x1="12" y1="23"   x2="32" y2="23"   stroke="#2D5A1B" stroke-width="0.7" opacity="0.35"/>
          <line x1="12" y1="28.5" x2="32" y2="28.5" stroke="#2D5A1B" stroke-width="0.7" opacity="0.35"/>
          <rect x="4" y="4" width="20" height="20" rx="2" fill="#F7F4EE" stroke="#1A1A18" stroke-width="1.2"/>
          <line x1="4" y1="9.5"  x2="24" y2="9.5"  stroke="#1A1A18" stroke-width="0.6" opacity="0.4"/>
          <line x1="4" y1="15"   x2="24" y2="15"   stroke="#1A1A18" stroke-width="0.6" opacity="0.4"/>
          <line x1="4" y1="20.5" x2="24" y2="20.5" stroke="#1A1A18" stroke-width="0.6" opacity="0.4"/>
          <circle cx="24" cy="24" r="2.5" fill="#2D5A1B"/>
        </svg>
        <span class="nav-brand-text">Same Same</span>
      </a>
      <button class="nav-burger" id="nav-burger" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links" id="nav-links" role="list">
        <li><a href="index.html#come-funziona" id="nav-come" class="nav-link${isActive('come')}">${T[lang].nav_come}</a></li>
        <li><a href="lavori.html"     id="nav-lavori"     class="nav-link${isActive('lavori')}">${T[lang].nav_lavori}</a></li>
        <li><a href="preventivo.html" id="nav-preventivo" class="nav-link${isActive('preventivo')}">${T[lang].nav_preventivo}</a></li>
        <li><a href="contatti.html"   id="nav-contatti"   class="nav-link${isActive('contatti')}">${T[lang].nav_contatti}</a></li>
        <li>
          <button id="lang-btn" class="nav-lang" title="${T[lang].lang_title}"
                  onclick="setLang(lang==='it'?'en':'it')">
            ${T[lang].lang_label}
          </button>
        </li>
      </ul>
    </div>
  `;
  document.body.prepend(nav);

  // burger
  document.getElementById('nav-burger').addEventListener('click', function() {
    const links = document.getElementById('nav-links');
    const open = links.classList.toggle('open');
    this.setAttribute('aria-expanded', open);
  });
}

/* ── FOOTER HTML ──────────────────────────────────────────────────────── */
function buildFooter() {
  const footer = document.createElement('footer');
  footer.id = 'site-footer';
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="footer-name">Same Same Verona</span>
        <span class="footer-sub" id="footer-made">${T[lang].footer_made}</span>
      </div>
      <div class="footer-links">
        <a href="https://instagram.com/same.same_vr" target="_blank" rel="noopener">Instagram</a>
        <a href="mailto:samesame.verona@gmail.com">Email</a>
        <a href="https://www.cal.eu/same-same/15min" target="_blank" rel="noopener">Consulenza</a>
      </div>
      <p class="footer-copy" id="footer-copy">${T[lang].footer_copy}</p>
    </div>
  `;
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
  setLang(lang);
  initReveal();
});
