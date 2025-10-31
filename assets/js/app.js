import { initHero3D } from './hero3d.js';
import { initFormTelegram } from './form-telegram.js';

const COURSES = [
  {
    id: 'unity-mini',
    duration: { en: '1x/week • 2h', fa: '۱ بار در هفته • ۲ ساعت' },
    tags: { en: ['Unity', 'Rapid'], fa: ['یونیتی', 'سریع'] },
    fa: {
      title: 'دوره فشرده یونیتی',
      summary: 'شروعی سریع برای مهارت‌های یونیتی و ساخت یک بازی کوچک قابل‌بازی.',
      outcomes: [
        'راه‌اندازی پروژه و دارایی‌ها',
        'مدیریت صحنه‌ها و پری‌فب‌ها',
        'طراحی حلقه اصلی گیم‌پلی',
        'آماده‌سازی ساده برای بیلد'
      ]
    },
    en: {
      title: 'Unity Mini Course',
      summary: 'Kick-start Unity skills and ship a playable mini game.',
      outcomes: [
        'Project & asset setup',
        'Scenes & prefabs',
        'Core gameplay loop',
        'Simple build pipeline'
      ]
    }
  },
  {
    id: 'pro-gamedev',
    duration: { en: '1x/week • 2h', fa: '۱ بار در هفته • ۲ ساعت' },
    tags: { en: ['Pipeline'], fa: ['پایپ‌لاین'] },
    fa: {
      title: 'دوره حرفه‌ای توسعه بازی',
      summary: 'مسیر کامل از ایده تا نسخه آلفای صیقل‌خورده.',
      outcomes: [
        'طراحی حلقه گیم‌پلی',
        'سند دید هنری',
        'نمونه‌سازی سریع',
        'برنامه‌ریزی لانچ آلفا'
      ]
    },
    en: {
      title: 'Pro Game Developer',
      summary: 'End-to-end pipeline from concept to polished alpha.',
      outcomes: [
        'Gameplay loop design',
        'Art vision doc',
        'Rapid prototyping',
        'Alpha launch planning'
      ]
    }
  },
  {
    id: 'modeling-3d',
    duration: { en: '1x/week • 2h', fa: '۱ بار در هفته • ۲ ساعت' },
    tags: { en: ['3D'], fa: ['سه‌بعدی'] },
    fa: {
      title: 'مدل‌سازی سه‌بعدی برای بازی',
      summary: 'ساخت مدل‌های Low/High Poly تمیز و آماده برای موتورهای زمان-واقعی.',
      outcomes: [
        'فرآیندهای مدل‌سازی',
        'باز کردن UV و پخت',
        'متریال‌های مناسب بازی',
        'بهینه‌سازی نهایی'
      ]
    },
    en: {
      title: '3D Modeling for Games',
      summary: 'Craft clean low/high poly assets ready for real-time engines.',
      outcomes: [
        'Modeling workflows',
        'UV unwrap & bake',
        'Game-ready materials',
        'Optimization pass'
      ]
    }
  },
  {
    id: 'game-animation',
    duration: { en: '1x/week • 2h', fa: '۱ بار در هفته • ۲ ساعت' },
    tags: { en: ['Animation'], fa: ['انیمیشن'] },
    fa: {
      title: 'انیمیشن بازی',
      summary: 'ریگ، وزن‌دهی و انیمیت لوپ‌های قهرمان برای گیم‌پلی واکنش‌گرا.',
      outcomes: [
        'ریگ و وزن‌دهی',
        'سیکل‌های راه‌رفتن و حمله',
        'خروجی تمیز FBX',
        'انتگره‌کردن با موتور'
      ]
    },
    en: {
      title: 'Game Animation',
      summary: 'Rig, weight, and animate hero loops for responsive gameplay.',
      outcomes: [
        'Rig & weighting',
        'Walk / attack cycles',
        'Clean FBX export',
        'Engine integration'
      ]
    }
  },
  {
    id: 'uiux-game',
    duration: { en: '1x/week • 2h', fa: '۱ بار در هفته • ۲ ساعت' },
    tags: { en: ['UI/UX'], fa: ['UI/UX'] },
    fa: {
      title: 'طراحی UI/UX بازی',
      summary: 'سیستم‌های HUD و منو واکنش‌گرا با تجربه کاربری آماده تولید.',
      outcomes: [
        'وایرفریم‌های بازی',
        'جریان‌های HUD و منو',
        'مدیریت حالت',
        'سیستم‌های تایپوگرافی'
      ]
    },
    en: {
      title: 'Game UI/UX Design',
      summary: 'Responsive HUD/Menu systems with production-ready UX.',
      outcomes: [
        'Game wireframes',
        'HUD / menu flows',
        'State management',
        'Typography systems'
      ]
    }
  },
  {
    id: 'oop-csharp',
    duration: { en: '1x/week • 2h', fa: '۱ بار در هفته • ۲ ساعت' },
    tags: { en: ['Code'], fa: ['کدنویسی'] },
    fa: {
      title: 'OOP برای بازی‌ها (C#)',
      summary: 'به‌کارگیری اصول OOP در معماری گیم‌پلی یونیتی.',
      outcomes: [
        'کلاس‌ها و اینترفیس‌ها',
        'الزامات SOLID',
        'رویدادها و ماشین‌حالت‌ها',
        'معماری پروژه'
      ]
    },
    en: {
      title: 'OOP for Games (C#)',
      summary: 'Apply OOP principles inside Unity gameplay architecture.',
      outcomes: [
        'Classes & interfaces',
        'SOLID essentials',
        'Events & state machines',
        'Project architecture'
      ]
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
  select.innerHTML = `<option value="" disabled selected>${locale === 'fa' ? 'لطفاً یک دوره انتخاب کنید…' : 'Select a course…'}</option>`;

  COURSES.forEach((course) => {
    const copy = course[locale];
    const tags = Array.isArray(course.tags) ? course.tags : course.tags?.[locale] || course.tags?.en || [];
    const duration = typeof course.duration === 'string' ? course.duration : course.duration?.[locale] || course.duration?.en || '';
    const article = document.createElement('article');
    article.className = 'card course-card';
    article.dataset.reveal = 'up';
    article.innerHTML = `
      <header>
        <div class="meta">
          <span class="badge">${tags.join(' • ')}</span>
          <span class="duration">${duration}</span>
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
    opt.textContent = `${copy.title} — ${duration}`;
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
