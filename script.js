/* ═══════════════════════════════════════════
   DR. BALJIT SINGH SAINI — PORTFOLIO
   script.js
═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── CUSTOM CURSOR ── */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mx = -100, my = -100;
  let fx = -100, fy = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function animFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animFollower);
  })();

  // Hide on mobile (no hover)
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    document.body.style.cursor = 'auto';
  }

  /* ── NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ── HAMBURGER / MOBILE NAV ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  /* ── SMOOTH ACTIVE NAV ── */
  const sections  = document.querySelectorAll('section[id], .section[id]');
  const navItems  = document.querySelectorAll('.nav-link');

  const activateNav = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navItems.forEach(link => {
      link.classList.remove('active-nav');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active-nav');
      }
    });
  };
  window.addEventListener('scroll', activateNav);

  /* ── INTERSECTION OBSERVER — REVEAL ANIMATIONS ── */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObs.observe(el));

  /* ── SKILL BAR ANIMATION ── */
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const width  = target.dataset.width || '0%';
        setTimeout(() => { target.style.width = width; }, 200);
        skillObs.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  skillFills.forEach(el => skillObs.observe(el));

  /* ── COUNTER ANIMATION ── */
  const counters = document.querySelectorAll('.stat-num');

  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el  = entry.target;
        const end = parseInt(el.dataset.count, 10);
        let  cur  = 0;
        const step = Math.ceil(end / 40);
        const timer = setInterval(() => {
          cur += step;
          if (cur >= end) { cur = end; clearInterval(timer); }
          el.textContent = cur;
        }, 40);
        countObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => countObs.observe(el));

  /* ── PUBLICATION FILTER ── */
  const filterBtns = document.querySelectorAll('.pub-filter');
  const pubItems   = document.querySelectorAll('.pub-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      pubItems.forEach(item => {
        const type = item.dataset.type;
        if (filter === 'all' || type === filter) {
          item.classList.remove('hidden');
          item.style.animation = 'fadeInUp 0.35s ease forwards';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // Apply the default active filter on load (SCI/Scopus)
  const defaultFilterBtn = document.querySelector('.pub-filter.active') || document.querySelector('.pub-filter');
  if (defaultFilterBtn) {
    const filter = defaultFilterBtn.dataset.filter;
    pubItems.forEach(item => {
      if (filter === 'all' || item.dataset.type === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  // Inject keyframe if not present
  if (!document.querySelector('#dynStyles')) {
    const style = document.createElement('style');
    style.id = 'dynStyles';
    style.textContent = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: none; }
      }
      .nav-link.active-nav { color: var(--gold) !important; }
      .nav-link.active-nav::after { width: 100% !important; }
    `;
    document.head.appendChild(style);
  }

  /* ── CONTACT FORM ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      const original = btn.textContent;
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#52c07a';
      btn.style.color = '#000';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.style.color = '';
        form.reset();
      }, 3000);
    });
  }

  /* ── HERO PHOTO PARALLAX ── */
  const heroPhoto = document.getElementById('heroPhoto');
  window.addEventListener('mousemove', e => {
    if (!heroPhoto) return;
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    heroPhoto.style.transform = `translate(${dx * 6}px, ${dy * 6}px)`;
  });

  /* ── SECTION LABEL TICKER ── */
  // Subtle typing effect on section labels
  const labels = document.querySelectorAll('.section-label');
  const labelObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el   = entry.target;
        const text = el.textContent;
        el.textContent = '';
        let i = 0;
        const t = setInterval(() => {
          el.textContent += text[i];
          i++;
          if (i >= text.length) clearInterval(t);
        }, 28);
        labelObs.unobserve(el);
      }
    });
  }, { threshold: 0.8 });

  labels.forEach(el => labelObs.observe(el));

  /* ── TIMELINE CARD HOVER GLOW ── */
  document.querySelectorAll('.timeline-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--gx', x + '%');
      card.style.setProperty('--gy', y + '%');
      card.style.background =
        `radial-gradient(circle at ${x}% ${y}%, rgba(201,168,76,0.06), var(--surface) 60%)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

  /* ── RESEARCH CARD TILT ── */
  document.querySelectorAll('.research-card, .award-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `translateY(-4px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
    card.style.transformStyle = 'preserve-3d';
    card.style.transition = 'transform 0.2s ease, border-color 0.3s, background 0.3s';
  });

  console.log('%c Dr. Baljit Singh Saini — Portfolio ', 'background:#c9a84c;color:#000;font-size:14px;padding:4px 12px;border-radius:3px;font-weight:bold;');
  console.log('%c Designed with ♥ for academic excellence ', 'color:#c9a84c;font-size:11px;');

})();
