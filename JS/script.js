// Toggle menú mobile
const btn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (btn && nav) btn.addEventListener('click', () => nav.classList.toggle('open'));

// ===== Carruseles de flyers (Home y/o Eventos) =====
// Busca todas las tiras con estructura:
// <div class="events-shell">
//   <button class="events-btn prev">…</button>
//   <div class="events-viewport"><div class="events-track">…cards…</div></div>
//   <button class="events-btn next">…</button>
// </div>
function initEventsCarousel(root) {
  const viewport = root.querySelector('.events-viewport');
  const track = root.querySelector('.events-track');
  const prev = root.querySelector('.events-btn.prev');
  const next = root.querySelector('.events-btn.next');
  if (!viewport || !track || !prev || !next) return;

  let offset = 0;
  const GAP = 20; // Debe matchear con CSS: .events-track { gap: 20px; }

  const cardStep = () => {
    const card = track.querySelector('.event-card');
    if (!card) return 0;
    const rect = card.getBoundingClientRect();
    return Math.round(rect.width + GAP);
  };

  const maxOffset = () =>
    Math.max(0, track.scrollWidth - viewport.clientWidth);

  const go = (dir) => {
    const step = cardStep();
    if (!step) return;
    offset += dir * step;
    offset = Math.max(0, Math.min(offset, maxOffset()));
    track.style.transform = `translateX(${-offset}px)`;
  };

  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));

  // Reajusta en resize
  window.addEventListener('resize', () => {
    offset = Math.max(0, Math.min(offset, maxOffset()));
    track.style.transform = `translateX(${-offset}px)`;
  });
}

// Inicializa todos los carruseles que encuentre
document.querySelectorAll('.events-shell').forEach(initEventsCarousel);

