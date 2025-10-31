import { initHero3D } from './hero3d.js';
import { initFormTelegram } from './form-telegram.js';

const COURSES = [
  {
    id: 'unity-mini',
    duration: '1×/week · 2h',
    tags: ['Unity', 'Rapid'],
    fa: {
      title: 'مینی دوره بازی‌سازی با Unity',
      summary: 'شروع سریع با محیط یونیتی و ساخت یک مینی‌گیم قابل انتشار.',
      outcomes: ['تنظیم پروژه و دارایی‌ها', 'کار با Scene و Prefab', 'ساخت گیم‌پلی ساده', 'خروجی برای پلتفرم']
    },
    en: {
      title: 'Unity Mini Course',
      summary: 'Kick-start Unity skills and ship a playable mini game.',
      outcomes: ['Project & asset setup', 'Scenes & prefabs', 'Core gameplay loop', 'Simple build pipeline']
    }
  },
  {
    id: 'pro-gamedev',
    duration: '1×/week · 2h',
    tags: ['Pipeline'],
    fa: {
      title: 'دوره بازی‌ساز حرفه‌ای',
      summary: 'از ایده تا نسخه قابل تست با تمرکز روی فرآیند کامل تولید و انتشار.',
      outcomes: ['طراحی لوپ گیم‌پلی', 'تهیه ویژن آرت', 'پروتوتایپ سریع', 'برنامه انتشار آلفا']
    },
    en: {
      title: 'Pro Game Developer',
      summary: 'End-to-end pipeline from concept to polished alpha.',
      outcomes: ['Gameplay loop design', 'Art vision doc', 'Rapid prototyping', 'Alpha launch planning']
    }
  },
  {
    id: 'modeling-3d',
    duration: '1×/week · 2h',
    tags: ['3D'],
    fa: {
      title: 'مدل‌سازی سه‌بعدی برای بازی',
      summary: 'ساخت مدل‌های Low/High Poly با UV تمیز و آماده ورود به موتور بازی.',
      outcomes: ['مدل‌سازی اصولی', 'UV Unwrap و Bake', 'متریال مناسب بازی', 'بهینه‌سازی خروجی']
    },
    en: {
      title: '3D Modeling for Games',
      summary: 'Craft clean low/high poly assets ready for real-time engines.',
      outcomes: ['Modeling workflows', 'UV unwrap & bake', 'Game-ready materials', 'Optimization pass']
    }
  },
  {
    id: 'game-animation',
    duration: '1×/week · 2h',
    tags: ['Animation'],
    fa: {
      title: 'انیمیشن‌سازی در بازی',
      summary: 'Rig، وزن‌دهی و ساخت چرخه‌های حرکت برای کاراکترهای بازی.',
      outcomes: ['Rig & Weight', 'لوپ حرکت/حمله', 'خروجی FBX تمیز', 'ادغام در موتور بازی']
    },
    en: {
      title: 'Game Animation',
      summary: 'Rig, weight, and animate hero loops for responsive gameplay.',
      outcomes: ['Rig & weighting', 'Walk / attack cycles', 'Clean FBX export', 'Engine integration']
    }
  },
  {
    id: 'uiux-game',
    duration: '1×/week · 2h',
    tags: ['UI/UX'],
    fa: {
      title: 'طراحی UI/UX برای بازی',
      summary: 'طراحی HUD و منوهای تعاملی با اصول تجربه‌کاربری مخصوص بازی.',
      outcomes: ['طراحی Wireframe بازی', 'طراحی HUD / Menu', 'مدیریت حالات UI', 'نظام تایپوگرافی']
    },
    en: {
      title: 'Game UI/UX Design',
      summary: 'Responsive HUD/Menu systems with production-ready UX.',
      outcomes: ['Game wireframes', 'HUD / menu flows', 'State management', 'Typography systems']
    }
  },
  {
    id: 'oop-csharp',
    duration: '1×/week · 2h',
    tags: ['Code'],
    fa: {
      title: 'برنامه‌نویسی شی‌گرا (C#)',
      summary: 'اصول OOP با مثال‌های عملی گیم‌پلی و معماری تمیز در یونیتی.',
      outcomes: ['کلاس و اینترفیس', 'اصول ساده SOLID', 'Event & State Machine', 'ساختاردهی پروژه']
    },
    en: {
      title: 'OOP for Games (C#)',
      summary: 'Apply OOP principles inside Unity gameplay architecture.',
      outcomes: ['Classes & interfaces', 'SOLID essentials', 'Events & state machines', 'Project architecture']
    }
  }
];

const LANG_STORAGE_KEY = 'coocidev:lang';
const THEME_STORAGE_KEY = 'coocidev:theme';

const translationsCache = new Map();
let revealObserver = null;

const ensureRevealObserver = () => {
  if (revealObserver) return revealObserver;
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -12% 0px' });
  return revealObserver;
};

const registerRevealElement = (el) => {
  if (!el) return;
  ensureRevealObserver().observe(el);
};

const initRevealAnimations = () => {
  document.querySelectorAll('[data-reveal]').forEach(registerRevealElement);
};

const loadDictionary = async (lang) => {
  if (translationsCache.has(lang)) return translationsCache.get(lang);
  const res = await fetch(`../assets/i18n/${lang}.json`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load i18n ${lang}`);
  const dict = await res.json();
  translationsCache.set(lang, dict);
  return dict;
};

const applyTranslations = (dict) => {
  const lookup = (path) => path.split('.').reduce((acc, key) => acc?.[key], dict);

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const text = lookup(key);
    if (typeof text === 'string') el.textContent = text;
  });

  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.getAttribute('data-i18n-attr')
      .split(',')
      .map((chunk) => chunk.trim())
      .forEach((pair) => {
        const [attr, key] = pair.split(':');
        if (!attr || !key) return;
        const text = lookup(key);
        if (typeof text === 'string') el.setAttribute(attr, text);
      });
  });
};

const applyLanguageShell = (lang) => {
  const html = document.documentElement;
  const body = document.body;
  const isRTL = ['fa', 'ar'].includes(lang);

  html.lang = lang;
  html.dir = isRTL ? 'rtl' : 'ltr';
  html.classList.toggle('lang-fa', isRTL);
  html.classList.toggle('lang-en', !isRTL);
  body.classList.toggle('lang-fa', isRTL);
  body.classList.toggle('lang-en', !isRTL);
};

const initI18n = async (lang) => {
  const fallback = lang || localStorage.getItem(LANG_STORAGE_KEY) || document.documentElement.lang || 'fa';
  try {
    const dict = await loadDictionary(fallback);
    applyLanguageShell(fallback);
    applyTranslations(dict);
    localStorage.setItem(LANG_STORAGE_KEY, fallback);
    return fallback;
  } catch (err) {
    console.error('[i18n] falling back to fa:', err);
    if (fallback !== 'fa') return initI18n('fa');
    return 'fa';
  }
};

const renderLangToggle = (lang) => {
  const btn = document.getElementById('langToggle');
  if (!btn) return;
  btn.dataset.lang = lang;
  btn.textContent = lang === 'fa' ? 'FA / EN' : 'EN / FA';
};

const renderCourses = (lang) => {
  const grid = document.querySelector('[data-courses]');
  const select = document.getElementById('course');
  if (!grid || !select) return;

  const locale = lang === 'fa' ? 'fa' : 'en';

  grid.innerHTML = '';
  select.innerHTML = `<option value="" disabled selected>${locale === 'fa' ? 'یک دوره را انتخاب کنید…' : 'Select a course…'}</option>`;

  COURSES.forEach((course) => {
    const copy = course[locale];
    const article = document.createElement('article');
    article.className = 'card course-card';
    article.dataset.reveal = 'up';
    article.innerHTML = `
      <header>
        <div class="meta">
          <span class="badge">${course.tags.join(' · ')}</span>
          <span class="duration">${course.duration}</span>
        </div>
        <strong>${copy.title}</strong>
      </header>
      <p class="text-ink-2">${copy.summary}</p>
      <ul>
        ${copy.outcomes.map((item) => `<li>${item}</li>`).join('')}
      </ul>
      <footer>
        <button class="btn w-full" type="button" data-course="${course.id}">
          ${locale === 'fa' ? 'ثبت‌نام' : 'Enroll'}
        </button>
      </footer>
    `;

    grid.appendChild(article);
    registerRevealElement(article);

    const opt = document.createElement('option');
    opt.value = course.id;
    opt.textContent = `${copy.title} — ${course.duration}`;
    select.appendChild(opt);
  });
};

const initCourseCtas = () => {
  const grid = document.querySelector('[data-courses]');
  const form = document.getElementById('lead-form');
  const select = document.getElementById('course');
  if (!grid || !form || !select) return;

  grid.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-course]');
    if (!btn) return;
    select.value = btn.getAttribute('data-course');
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    select.focus({ preventScroll: true });
  });
};

const initScrollProgress = () => {
  const bar = document.getElementById('scrollbar');
  const header = document.querySelector('header');
  const update = () => {
    if (!bar) return;
    const max = document.body.scrollHeight - window.innerHeight;
    const pct = max <= 0 ? 0 : Math.min(1, window.scrollY / max);
    bar.style.transform = `scaleX(${pct.toFixed(3)})`;
    header?.classList.toggle('scrolled', window.scrollY > 4);
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
};

const initMobileMenu = () => {
  const btn = document.getElementById('menuBtn');
  const panel = document.getElementById('mobileMenu');
  if (!btn || !panel) return;

  const close = () => {
    panel.classList.add('hidden');
    panel.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
  };

  btn.addEventListener('click', () => {
    const hidden = panel.classList.contains('hidden');
    panel.classList.toggle('hidden');
    panel.setAttribute('aria-hidden', String(!hidden));
    btn.setAttribute('aria-expanded', String(hidden));
    if (hidden) {
      panel.querySelector('a')?.focus({ preventScroll: true });
    }
  });

  panel.addEventListener('click', (event) => {
    if (event.target === panel || event.target.closest('a')) close();
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
};

const initThemeToggle = () => {
  const toggle = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const root = document.documentElement;
  if (!toggle) return;

  const applyTheme = (mode, { persist = true } = {}) => {
    root.setAttribute('data-theme', mode);
    toggle.setAttribute('aria-pressed', mode === 'light' ? 'true' : 'false');
    toggle.setAttribute('data-theme-toggle', mode);
    toggle.title = mode === 'light' ? 'Switch to dark theme' : 'Switch to light theme';
    if (icon) icon.textContent = mode === 'light' ? '☀️' : '🌙';
    if (persist) localStorage.setItem(THEME_STORAGE_KEY, mode);
  };

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  const media = window.matchMedia?.('(prefers-color-scheme: light)');
  const initial = stored || (media?.matches ? 'light' : 'dark');
  applyTheme(initial, { persist: false });

  media?.addEventListener?.('change', (event) => {
    if (localStorage.getItem(THEME_STORAGE_KEY)) return;
    applyTheme(event.matches ? 'light' : 'dark', { persist: false });
  });

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
  });
};

const initWorkFilters = () => {
  const groups = document.querySelectorAll('[data-filters]');
  const cards = document.querySelectorAll('[data-cards] [data-cat]');
  if (!groups.length || !cards.length) return;

  groups.forEach((group) => {
    group.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-filter]');
      if (!btn) return;
      const selected = btn.getAttribute('data-filter');
      group.querySelectorAll('[data-filter]').forEach((el) => el.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach((card) => {
        const visible = selected === 'all' || card.getAttribute('data-cat') === selected;
        card.style.display = visible ? '' : 'none';
        if (visible) registerRevealElement(card);
      });
    });
  });
};

const initHeroCanvas = () => {
  const canvas = document.getElementById('hero3d');
  if (!canvas) return;
  initHero3D(canvas, { model: '../../public/models/mascot.glb' });
};

const initAnchorScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
};

document.addEventListener('DOMContentLoaded', async () => {
  initScrollProgress();
  initMobileMenu();
  initThemeToggle();
  initWorkFilters();
  initHeroCanvas();
  initAnchorScroll();
  initRevealAnimations();

  let activeLang = await initI18n();
  renderLangToggle(activeLang);
  renderCourses(activeLang);
  initCourseCtas();
  initFormTelegram({
    onSuccess: () => {
      renderCourses(activeLang);
    }
  });

  const langBtn = document.getElementById('langToggle');
  langBtn?.addEventListener('click', async () => {
    const current = langBtn.dataset.lang === 'fa' ? 'fa' : 'en';
    const next = current === 'fa' ? 'en' : 'fa';
    activeLang = await initI18n(next);
    renderLangToggle(activeLang);
    renderCourses(activeLang);
  });

  const year = document.getElementById('y');
  if (year) year.textContent = new Date().getFullYear().toString();
});
