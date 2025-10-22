/* ========== Icons ========== */
const renderIcons = () => {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  } else {
    setTimeout(renderIcons, 60);
  }
};

/* ========== i18n dictionaries (FA/EN) ========== */
const I18N = {
  fa: {
    "meta.title":"آکادمی بازی‌سازی — ثبت‌نام",
    "meta.desc":"دوره پروژه‌محور بازی‌سازی با یونیتی/آنریل: از ایده تا انتشار. منتورینگ، پرتفولیو، و آماده‌سازی شغلی.",
    "brand":"آکادمی بازی‌سازی",
    "nav.work":"نمونه‌ها","nav.stack":"سرفصل‌ها","nav.testimonials":"نظرات","nav.hire":"ثبت‌نام",
    "lang.btn":"FA / EN",
    "hero.title":"بازی بساز که دیده بشه؛ سریع، زیبا و قابل انتشار.",
    "hero.subtitle":"دوره پروژه‌محور یونیتی/آنریل از ایده تا لانچ. تمرکز روی گیم‌پلی، پرفورمنس، پولیش هنری و انتشار روی مارکت‌ها.",
    "hero.p1":"گیم‌پلی","hero.p2":"گرافیک و VFX","hero.p3":"پکیج پروداکشن","hero.p4":"انتشار",
    "hero.cta1":"همین حالا ثبت‌نام","hero.cta2":"مشاهده پروژه‌ها",
    "logos.1":"Unity","logos.2":"Unreal Engine","logos.3":"Blender","logos.4":"FMOD","logos.5":"Steam / Mobile",
    "work.title":"گزیده پروژه‌ها",
    "filters.all":"همه","filters.mobile":"موبایل","filters.pc":"PC","filters.vr":"VR",
    "work.a.title":"Runner با مانع‌زنی پویا","work.a.badge":"+120k دانلود","work.a.desc":"Unity + Addressables، سیستم Wave، آنالیتیکس و بهینه‌سازی GC برای 60fps.",
    "work.b.title":"شوترین سوم‌شخص با AI تاکتیکی","work.b.badge":"Build پایدار","work.b.desc":"Unreal + Behavior Tree، LOD/VFX Budget، و Multi-threaded Streaming.",
    "work.c.title":"تجربه VR با تعاملات دست","work.c.badge":"NPS 9.2","work.c.desc":"XR Toolkit، Grab/Throw فیزیکی، Pass-through UX.",
    "work.d.title":"ادیتور لِول داخلی","work.d.badge":"۳× تولید سریع‌تر","work.d.desc":"ScriptableObjects، Prefab Variants، Export برای تیم طراحی.",
    "stack.title":"سرفصل‌ها و مهارت‌ها",
    "stack.a.title":"طراحی گیم‌پلی","stack.a.desc":"لوپ هسته، توازن، ماموریت‌ها، اقتصاد و تلِه‌متری.",
    "stack.b.title":"گرافیک و VFX","stack.b.desc":"Shader/Material، نورپردازی، PostFX و بودجه GPU.",
    "stack.c.title":"انتشار و مارکت","stack.c.desc":"Build Pipeline، مارکت‌های موبایل/PC، آنالیتیکس و A/B.",
    "testi.title":"نظر هنرجوها",
    "testi.a":"«اولین بازی موبایلم را در همین دوره منتشر کردم؛ بازخوردها عالی بود.»","testi.a.by":"— پویا، اندی میکر",
    "testi.b":"«پکیج کامل از طراحی تا مارکت؛ منتورینگ خیلی کمک کرد.»","testi.b.by":"— هانیه، یونیتی دولوپر",
    "testi.c":"«با پروفایلینگ به 60fps پایدار رسیدم؛ تفاوتش واضحه.»","testi.c.by":"— سامان، تکنیکال آرتیست",
    "contact.title":"همین امروز بازی‌ساز شو","contact.subtitle":"فرم زیر را پر کن؛ در اسرع وقت تماس می‌گیریم.",
    "form.name.label":"نام و نام خانوادگی","form.name.ph":"مثلاً: سینا راد","form.name.err":"حداقل ۳ کاراکتر وارد کنید.",
    "form.email.label":"ایمیل","form.email.ph":"you@mail.com","form.email.err":"ایمیل معتبر وارد کنید.",
    "form.phone.label":"تلفن / واتساپ","form.phone.ph":"+98 912 000 0000","form.phone.err":"شماره معتبر وارد کنید.",
    "form.source.label":"از کجا آشنا شدی؟","form.source.sel":"انتخاب…",
    "form.source.opt.google":"گوگل","form.source.opt.instagram":"اینستاگرام","form.source.opt.youtube":"یوتیوب","form.source.opt.ref":"معرفی دوستان","form.source.opt.other":"سایر",
    "form.source.err":"یک گزینه انتخاب کن.",
    "form.msg.label":"درباره اهدافت بگو","form.msg.ph":"سبک بازی، پلتفرم هدف، زمان‌بندی…","form.msg.err":"حداقل ۱۰ کاراکتر بنویس.",
    "form.consent":"با تماس درباره این درخواست موافقم.",
    "form.submit":"ارسال درخواست","form.ok":"✅ ارسال شد! به‌زودی پاسخ می‌دیم.","form.fail":"❌ مشکلی پیش آمد. دوباره تلاش کن.",
    "privacy":"اطلاعاتت فقط برای پیگیری ثبت‌نام استفاده می‌شود.",
    "footer.email":"ایمیل","footer.rights":"تمامی حقوق محفوظ است."
  },
  en: {
    "meta.title":"GameDev Academy — Signup",
    "meta.desc":"Project-based game development with Unity/Unreal. From idea to release. Mentoring, portfolio, and job-ready skills.",
    "brand":"GameDev Academy",
    "nav.work":"Work","nav.stack":"Syllabus","nav.testimonials":"Testimonials","nav.hire":"Enroll",
    "lang.btn":"FA / EN",
    "hero.title":"Build games that play great, look polished, and ship.",
    "hero.subtitle":"Unity/Unreal, project-first. Gameplay design, performance, art polish, and releasing to stores.",
    "hero.p1":"Gameplay","hero.p2":"Graphics & VFX","hero.p3":"Production Pack","hero.p4":"Publishing",
    "hero.cta1":"Enroll now","hero.cta2":"See projects",
    "logos.1":"Unity","logos.2":"Unreal Engine","logos.3":"Blender","logos.4":"FMOD","logos.5":"Steam / Mobile",
    "work.title":"Selected Projects",
    "filters.all":"All","filters.mobile":"Mobile","filters.pc":"PC","filters.vr":"VR",
    "work.a.title":"Dynamic Runner","work.a.badge":"+120k downloads","work.a.desc":"Unity + Addressables, wave system, analytics, and GC tuning for 60fps.",
    "work.b.title":"TPS with Tactical AI","work.b.badge":"Stable build","work.b.desc":"Unreal + Behavior Tree, VFX budgets, multi-threaded streaming.",
    "work.c.title":"VR Hand Interaction","work.c.badge":"NPS 9.2","work.c.desc":"XR toolkit, physical grab/throw, pass-through UX.",
    "work.d.title":"Internal Level Editor","work.d.badge":"3× faster production","work.d.desc":"ScriptableObjects, prefab variants, export for design team.",
    "stack.title":"Syllabus & Skills",
    "stack.a.title":"Gameplay Design","stack.a.desc":"Core loops, balance, quests, economy, and player telemetry.",
    "stack.b.title":"Graphics & VFX","stack.b.desc":"Shaders/materials, lighting, PostFX, GPU budgets.",
    "stack.c.title":"Publishing","stack.c.desc":"Build pipelines, stores, analytics, and A/B.",
    "testi.title":"What students say",
    "testi.a":"“Shipped my first mobile game during the course. Great feedback!”","testi.a.by":"— Pouya, Indie Maker",
    "testi.b":"“End-to-end training. Mentoring sessions were gold.”","testi.b.by":"— Hanieh, Unity Dev",
    "testi.c":"“Profiling got us a stable 60fps. The difference is clear.”","testi.c.by":"— Saman, Tech Artist",
    "contact.title":"Become a game dev today","contact.subtitle":"Fill the form — we’ll reach out ASAP.",
    "form.name.label":"Full name","form.name.ph":"e.g. Sara R.","form.name.err":"Please enter at least 3 characters.",
    "form.email.label":"Email","form.email.ph":"you@mail.com","form.email.err":"Enter a valid email.",
    "form.phone.label":"Phone / WhatsApp","form.phone.ph":"+1 415 555 0133","form.phone.err":"Enter a valid number.",
    "form.source.label":"How did you find us?","form.source.sel":"Select…",
    "form.source.opt.google":"Google","form.source.opt.instagram":"Instagram","form.source.opt.youtube":"YouTube","form.source.opt.ref":"Referral","form.source.opt.other":"Other",
    "form.source.err":"Please choose an option.",
    "form.msg.label":"Tell us your goals","form.msg.ph":"Preferred genre, target platform, timeline…","form.msg.err":"Write at least 10 characters.",
    "form.consent":"I agree to be contacted about my inquiry.",
    "form.submit":"Send request","form.ok":"✅ Sent! We’ll reply soon.","form.fail":"❌ Something went wrong. Please try again.",
    "privacy":"Your info is only used to follow up on this signup.",
    "footer.email":"Email","footer.rights":"All rights reserved."
  }
};

/* ========== Theme ========== */
(function theme(){
  const root = document.documentElement;
  const key = 'theme';
  const saved = localStorage.getItem(key);
  const sysLight = matchMedia('(prefers-color-scheme: light)').matches;
  const initial = saved || (sysLight ? 'light' : 'dark');
  apply(initial);

  function setIcon(mode){
    const el = document.getElementById('themeIcon');
    el?.setAttribute('data-lucide', mode === 'light' ? 'moon' : 'sun');
    renderIcons();
  }
  function apply(mode){
    root.setAttribute('data-theme', mode);
    localStorage.setItem(key, mode);
    setIcon(mode);
  }
  document.getElementById('themeToggle')?.addEventListener('click', ()=>{
    const cur = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    apply(cur === 'light' ? 'dark' : 'light');
  });
})();

/* ========== Header & Progress Bar ========== */
(function(){
  const header = document.getElementById('siteHeader');
  const bar = document.getElementById('scrollbar');
  function onScroll(){
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = Math.max(0, Math.min(1, (scrollY||0) / (max||1)));
    bar.style.transform = `scaleX(${p})`;
    if (scrollY > 24) header.classList.add('scrolled'); else header.classList.remove('scrolled');
  }
  onScroll(); addEventListener('scroll', onScroll, {passive:true});
})();

/* ========== Mobile Menu ========== */
document.getElementById('menuBtn')?.addEventListener('click', ()=>{
  document.getElementById('mobileMenu')?.classList.toggle('hidden');
});
document.getElementById('langToggleMobile')?.addEventListener('click', ()=> switchLang());

/* ========== Language Switch ========== */
const LANG_KEY = 'lang';
const supported = ['fa','en'];
function detectLang(){
  const saved = localStorage.getItem(LANG_KEY);
  if (supported.includes(saved)) return saved;
  const nav = (navigator.language || 'fa').toLowerCase();
  return nav.startsWith('fa') ? 'fa' : 'en';
}
function applyDir(lang){
  const html = document.documentElement;
  const body = document.body;
  if(lang==='fa'){
    html.setAttribute('lang','fa'); html.setAttribute('dir','rtl');
    body.classList.add('use-fa'); body.classList.remove('use-en');
    html.classList.add('lang-fa'); html.classList.remove('lang-en');
  }else{
    html.setAttribute('lang','en'); html.setAttribute('dir','ltr');
    body.classList.add('use-en'); body.classList.remove('use-fa');
    html.classList.add('lang-en'); html.classList.remove('lang-fa');
  }
}
function trAttr(el, attrKey, dict){
  const key = el.getAttribute(attrKey);
  if(key && dict[key]) el.setAttribute(attrKey.replace('data-i18n-',''), dict[key]);
}
function translate(lang){
  const dict = I18N[lang] || I18N.fa;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k = el.getAttribute('data-i18n'); if(dict[k]) el.textContent = dict[k];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=> trAttr(el, 'data-i18n-placeholder', dict));
  const t = dict['meta.title']; if(t) document.title = t;
  const d = dict['meta.desc']; if(d){ const m = document.querySelector('meta[name="description"]'); m && m.setAttribute('content', d) }
  applyDir(lang);
  localStorage.setItem(LANG_KEY, lang);
  renderIcons();
}
function switchLang(){
  const cur = localStorage.getItem(LANG_KEY) || detectLang();
  translate(cur === 'fa' ? 'en' : 'fa');
}
document.getElementById('langToggle')?.addEventListener('click', switchLang);
translate(detectLang());

/* ========== Portfolio Filter ========== */
(function(){
  const btns = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-cat]');
  if(!btns.length) return;
  function setActive(f){
    btns.forEach(b=> b.classList.toggle('active', b.getAttribute('data-filter')===f));
  }
  btns.forEach(b=>{
    b.addEventListener('click', ()=>{
      const f = b.getAttribute('data-filter');
      setActive(f);
      cards.forEach(c=>{
        const cat = c.getAttribute('data-cat');
        c.style.display = (f==='all' || f===cat) ? 'block' : 'none';
      });
    });
  });
})();

/* ========== Init Icons + Year ========== */
document.addEventListener('DOMContentLoaded', ()=>{
  renderIcons();
  const y = document.getElementById('y'); if (y) y.textContent = new Date().getFullYear();
});

/* ========== Lead form → Serverless (Telegram forward) ========== */
// گیت‌پیجز استاتیکه؛ توکن رو هرگز این‌جا نذار. یک وب‌هوک سرورلس بساز (Cloudflare Worker / GAS).
// سپس URL آن را در ENDPOINT تنظیم کن.
(function(){
  const ENDPOINT = 'https://YOUR_WORKER_SUBDOMAIN.workers.dev'; // <-- webhook شما
  const form = document.getElementById('lead-form');
  if(!form) return;

  const err = id => document.getElementById(id);
  const show = (el, on) => el && el.classList.toggle('show', on === true);

  function validate(){
    const data = Object.fromEntries(new FormData(form).entries());
    const okName = (data.name||'').trim().length >= 3;
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email||'');
    const okPhone = /^[+0-9 ()-]{8,}$/.test(data.phone||'');
    const okSource = !!data.source;
    const okMsg = (data.message||'').trim().length >= 10;
    const okConsent = form.querySelector('#consent')?.checked;

    show(err('err-name'), !okName);
    show(err('err-email'), !okEmail);
    show(err('err-phone'), !okPhone);
    show(err('err-source'), !okSource);
    show(err('err-message'), !okMsg);

    return okName && okEmail && okPhone && okSource && okMsg && okConsent;
  }

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    document.getElementById('ok')?.classList.add('hidden');
    document.getElementById('fail')?.classList.add('hidden');

    if(!validate()) return;

    const payload = Object.fromEntries(new FormData(form).entries());
    if (payload.website && String(payload.website).trim().length) return; // honeypot

    payload._ts = new Date().toISOString();
    payload._lang = localStorage.getItem(LANG_KEY) || detectLang();
    const usp = new URLSearchParams(location.search);
    ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach(k=>{
      if(usp.get(k)) payload[k] = usp.get(k);
    });

    try{
      const r = await fetch(ENDPOINT, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      });
      if(r.ok){
        document.getElementById('ok')?.classList.remove('hidden');
        form.reset();
      }else{
        document.getElementById('fail')?.classList.remove('hidden');
      }
    }catch(e){
      document.getElementById('fail')?.classList.remove('hidden');
    }
  });
})();
