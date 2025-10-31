const PHONE_REGEX = /^09\d{9}$/;

const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

const encodePayload = (payload) => `<pre><code>${escapeHtml(JSON.stringify(payload, null, 2))}</code></pre>`;

const splitMessage = (text, limit = 3800) => {
  if (text.length <= limit) return [text];
  const parts = [];
  let start = 0;
  while (start < text.length) {
    parts.push(text.slice(start, start + limit));
    start += limit;
  }
  return parts;
};

const sendViaProxy = async (text) => {
  const url = window.TELEGRAM_PROXY_URL;
  const chatId = window.TELEGRAM_CHAT_ID;
  if (!url) throw new Error('Missing proxy URL');
  if (!chatId) throw new Error('Missing chat id');

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' })
  });
  if (!res.ok) throw new Error(`Proxy error ${res.status}`);
};

const sendDirect = async (text) => {
  const chatId = window.TELEGRAM_CHAT_ID;
  const token = window.TELEGRAM_BOT_TOKEN;
  if (!chatId || !token) throw new Error('Missing Telegram credentials');

  const messages = splitMessage(text);
  for (let i = 0; i < messages.length; i++) {
    const label = messages.length > 1 ? ` (${i + 1}/${messages.length})` : '';
    const payload = {
      chat_id: chatId,
      text: messages[i] + label,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    };
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`Telegram error ${res.status}`);
  }
};

const setHelper = (id, valid) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('show', !valid);
};

const toggleStatus = (el, show) => {
  if (!el) return;
  el.classList.toggle('show', show);
};

export function initFormTelegram(options = {}) {
  const form = document.getElementById('lead-form');
  if (!form) return;

  const okBanner = document.getElementById('ok');
  const failBanner = document.getElementById('fail');

  const toggleSubmitting = (state) => {
    const submit = form.querySelector('button[type="submit"]');
    if (!submit) return;
    submit.disabled = state;
    submit.dataset.loading = state ? '1' : '';
  };

  const serialize = () => {
    const data = new FormData(form);
    return {
      fullName: (data.get('fullName') || '').toString().trim(),
      phone: (data.get('phone') || '').toString().trim(),
      course: (data.get('course') || '').toString(),
      note: (data.get('note') || '').toString().trim()
    };
  };

  const validate = (data) => {
    const okName = data.fullName.length >= 3;
    const okPhone = PHONE_REGEX.test(data.phone);
    const okCourse = Boolean(data.course);
    const okNote = data.note.length === 0 || data.note.length >= 10;
    const consent = form.querySelector('#consent')?.checked ?? false;

    setHelper('err-fullName', okName);
    setHelper('err-phone', okPhone);
    setHelper('err-course', okCourse);
    const consentHelp = document.getElementById('consentHelp');
    if (consentHelp) consentHelp.classList.toggle('show', !consent);
    const noteHelper = document.getElementById('err-note');
    if (noteHelper) noteHelper.classList.toggle('show', !okNote && data.note.length > 0);

    form.fullName?.setAttribute('aria-invalid', okName ? 'false' : 'true');
    form.phone?.setAttribute('aria-invalid', okPhone ? 'false' : 'true');
    form.course?.setAttribute('aria-invalid', okCourse ? 'false' : 'true');

    if (!(okName && okPhone && okCourse && consent && okNote)) {
      const firstInvalid = form.querySelector('[aria-invalid="true"], #consent:not(:checked)');
      firstInvalid?.focus({ preventScroll: false });
      return false;
    }
    return true;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    toggleStatus(okBanner, false);
    toggleStatus(failBanner, false);

    const data = serialize();
    if (!validate(data)) {
      toggleStatus(failBanner, true);
      return;
    }

    const payload = {
      type: 'lead',
      academy: 'CoociDev',
      ts: new Date().toISOString(),
      page: window.location.href,
      lang: document.documentElement.lang || 'fa',
      data,
      utm: ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].reduce((acc, key) => {
        const val = new URLSearchParams(window.location.search).get(key);
        if (val) acc[key] = val;
        return acc;
      }, {}),
      client: {
        ua: navigator.userAgent,
        viewport: { w: window.innerWidth, h: window.innerHeight }
      }
    };

    toggleSubmitting(true);
    const message = encodePayload(payload);

    try {
      if (window.TELEGRAM_PROXY_URL) {
        await sendViaProxy(message);
      } else {
        await sendDirect(message);
      }
      form.reset();
      toggleStatus(okBanner, true);
      toggleStatus(failBanner, false);
      options.onSuccess?.();
    } catch (error) {
      console.error('[form] telegram error', error);
      toggleStatus(failBanner, true);
    } finally {
      toggleSubmitting(false);
    }
  });
}
