/* G-NRG 360 — bilingual energy illustration, questionnaire and explicit contact form. */
(function () {
  'use strict';
  const BASE_LOW = 32, BASE_HIGH = 16, LOW_CENTS = 60, HIGH_CENTS = 120, MAX_SHIFT = 10;
  const normalizeLang = lang => /^en(?:-|$)/i.test(String(lang || '')) ? 'en' : 'he';
  function calculateShift(value) {
    const shift = Math.min(MAX_SHIFT, Math.max(0, Math.round(Number.isFinite(Number(value)) ? Number(value) : 0)));
    const low = BASE_LOW + shift, high = BASE_HIGH - shift;
    const before = BASE_LOW * LOW_CENTS + BASE_HIGH * HIGH_CENTS;
    const after = low * LOW_CENTS + high * HIGH_CENTS;
    return {shift, low, high, total: low + high, before, after, saving: before - after};
  }
  const content = {
    he: {
      questions: {
        route: {title: 'באיזה סוג נכס מדובר?', options: {industry: 'מפעל / עסק / רשות מקומית / תשתיות', home: 'בית או נכס פרטי'}},
        concern: {title: 'מה בעיקר מטריד אתכם?', options: {cost: 'הוצאות אנרגיה גבוהות', unusual: 'צריכה חריגה או לא ברורה', upgrade: 'שדרוג או שיפוץ מתוכנן', overview: 'רוצים תמונת מצב מסודרת'}},
        home: {title: 'באיזו מערכת הייתם רוצים להתמקד?', options: {hvac: 'מיזוג וחימום', water: 'מים חמים או בריכה', controls: 'תאורה ובקרה', unknown: 'עדיין לא יודעים'}},
        industry: {title: 'באיזו מערכת הייתם רוצים להתמקד?', options: {hvac: 'מיזוג וקירור', process: 'ייצור ותשתיות', controls: 'מדידה ובקרת אנרגיה', unknown: 'עדיין לא יודעים'}}
      },
      summary: (route, concern, topic) => `סוג הנכס: ${route}\nמה נרצה לבדוק: ${concern}\nמערכת להתמקדות: ${topic}`,
      recommendations: {home: 'מומלץ להתחיל בשיחת תיחום ולהגדיר הצעת מחיר לבדק אנרגטי לבית.', industry: 'מומלץ להתחיל בשיחה מקצועית על הנתונים והמערכות ולבחון התאמה לבדיקה ראשונית.'},
      unit: 'קוט״ש', shifted: amount => `${amount} קוט״ש הוסטו`,
      lensLive: (total, cost, saving) => `צריכה ${total} קוט״ש בשני המצבים. עלות אחרי ${cost}. חיסכון בדוגמה ${saving}.`,
      questionProgress: step => `שאלה ${step} מתוך 3`, completed: 'סיימתם את השאלון', next: 'לשאלה הבאה', previous: 'לשאלה הקודמת', showSummary: 'הצגת התקציר', restart: 'התחלה מחדש',
      summaryHeading: 'תקציר לקראת השיחה', summaryContext: 'אם זמינים, כדאי להכין חשבונות חשמל ופרטים בסיסיים על שעות ההפעלה. התקציר אינו אבחון ולא הצעת חיסכון.',
      copy: 'העתקת התקציר', copied: 'התקציר הועתק. אפשר להדביק אותו בהודעה משלכם.', copyFailed: 'העתקה אוטומטית אינה זמינה כאן. סמנו והעתיקו את התקציר ידנית; דבר לא נשלח.', contact: 'לתיאום שיחת היכרות', choose: 'יש לבחור תשובה כדי להמשיך.',
      form: {send: 'הכנת טיוטת דוא״ל', subject: 'פנייה חדשה מאתר G-NRG 360', preview: 'תצוגה מקומית בלבד — הטיוטה לא נפתחה ולא נשלחה.', ready: 'טיוטת הדוא״ל מוכנה — פתחו אותה ושלחו בעצמכם. דבר לא נשלח.', long: 'הטיוטה ארוכה מדי לפתיחה כקישור. העתיקו את הטקסט להודעת דוא״ל חדשה ושלחו בעצמכם. דבר לא נשלח.', invalid: 'יש למלא שם, כתובת דוא״ל והודעה כדי להכין טיוטה.', open: 'פתיחת טיוטה בדוא״ל', copy: 'העתקת פרטי הטיוטה', copied: 'הטיוטה הועתקה ללוח. אפשר להדביק ולשלוח אותה ביישום הדוא״ל שלכם.', copyFailed: 'סמנו והעתיקו את הטקסט ידנית; דבר לא נשלח.', label: 'טיוטה להעתקה ידנית', toLabel: 'אל', subjectLabel: 'נושא', nameLabel: 'שם', emailLabel: 'דוא״ל', phoneLabel: 'טלפון', messageLabel: 'הודעה'}
    },
    en: {
      questions: {
        route: {title: 'What type of property or organization is it?', options: {industry: 'Plant, business, municipality or infrastructure', home: 'Home or private property'}},
        concern: {title: 'What is your main concern?', options: {cost: 'High energy costs', unusual: 'Unusual or unexplained consumption', upgrade: 'A planned upgrade or renovation', overview: 'A clearer picture of energy use'}},
        home: {title: 'Which system should we focus on?', options: {hvac: 'Air conditioning and heating', water: 'Hot water or swimming pool', controls: 'Lighting and controls', unknown: 'Not sure yet'}},
        industry: {title: 'Which system should we focus on?', options: {hvac: 'Heating, ventilation and cooling', process: 'Production and infrastructure', controls: 'Energy metering and controls', unknown: 'Not sure yet'}}
      },
      summary: (route, concern, topic) => `Property / organization: ${route}\nWhat to investigate: ${concern}\nSystem to focus on: ${topic}`,
      recommendations: {home: 'A good next step is a scoping call and a tailored proposal for a home energy assessment.', industry: 'A good next step is a technical conversation about your systems and data, to assess whether an initial review is suitable.'},
      unit: 'kWh', shifted: amount => `${amount} kWh shifted`,
      lensLive: (total, cost, saving) => `Consumption is ${total} kWh in both scenarios. Cost after shifting: ${cost}. Illustrative saving: ${saving}.`,
      questionProgress: step => `Question ${step} of 3`, completed: 'Questionnaire complete', next: 'Next question', previous: 'Previous question', showSummary: 'View summary', restart: 'Start over',
      summaryHeading: 'Your discussion summary', summaryContext: 'If available, prepare electricity bills and basic operating-hour information. This summary is not a diagnosis or an estimate of savings.',
      copy: 'Copy summary', copied: 'Summary copied. You can paste it into your own message.', copyFailed: 'Automatic copying is unavailable here. Select and copy the summary manually; nothing was sent.', contact: 'Arrange an introductory call', choose: 'Choose an answer to continue.',
      form: {send: 'Prepare email draft', subject: 'New inquiry from G-NRG 360 website', preview: 'Preview only — email draft not opened or sent.', ready: 'Email draft prepared — open it and send it yourself. Nothing has been sent.', long: 'The draft is too long for an email link. Copy the text into a new email and send it yourself. Nothing has been sent.', invalid: 'Enter your name, email address and message to prepare a draft.', open: 'Open email draft', copy: 'Copy draft details', copied: 'Draft copied. Paste it into your email app and send it yourself.', copyFailed: 'Select and copy the text manually; nothing was sent.', label: 'Draft text for manual copying', toLabel: 'To', subjectLabel: 'Subject', nameLabel: 'Name', emailLabel: 'Email', phoneLabel: 'Phone', messageLabel: 'Message'}
    }
  };
  function getQuestion(step, answers = [], lang = 'he') {
    const questions = content[normalizeLang(lang)].questions;
    if (step === 0) return questions.route;
    if (step === 1) return questions.concern;
    return questions[answers[0]] || questions.home;
  }
  function createSummary(answers, lang = 'he') {
    const words = content[normalizeLang(lang)], questions = words.questions;
    if (!Array.isArray(answers) || !Object.hasOwn(questions.route.options, answers[0]) || !Object.hasOwn(questions.concern.options, answers[1]) || !Object.hasOwn(questions[answers[0]].options, answers[2])) return null;
    const route = questions.route.options[answers[0]];
    const concern = questions.concern.options[answers[1]];
    const topic = questions[answers[0]].options[answers[2]];
    return {text: words.summary(route, concern, topic), next: words.recommendations[answers[0]]};
  }
  function isProductionHost(hostname) {
    return hostname === 'www.gnrg360.com' || hostname === 'gnrg360.com';
  }
  const CONTACT_EMAIL = 'evgeni@gnrg360.com';
  function createContactDraft(values, lang = 'he') {
    const messages = content[normalizeLang(lang)].form;
    const field = key => String(values?.[key] || '').trim();
    const name = field('name'), email = field('email'), phone = field('phone'), message = field('message');
    if (!name || !email || !message) return null;
    const body = [
      `${messages.nameLabel}: ${name}`,
      `${messages.emailLabel}: ${email}`,
      ...(phone ? [`${messages.phoneLabel}: ${phone}`] : []),
      '', `${messages.messageLabel}:`, message
    ].join('\n').replace(/\r\n|\r|\n/g, '\r\n');
    let uri = null;
    try {
      const candidate = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(messages.subject)}&body=${encodeURIComponent(body)}`;
      if (candidate.length <= 1800) uri = candidate;
    } catch (_) { /* Keep the full body available for manual copying. */ }
    return {subject: messages.subject, body, uri};
  }
  const api = {calculateShift, getQuestion, createSummary, isProductionHost, createContactDraft};
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; return; }
  const lang = normalizeLang(document.documentElement.lang), words = content[lang];
  const questions = words.questions;
  const locale = lang === 'he' ? 'he-IL' : 'en-IL';
  const number = new Intl.NumberFormat(locale);
  const money = new Intl.NumberFormat(locale, {minimumFractionDigits: 2, maximumFractionDigits: 2});
  const displayMoney = cents => lang === 'he' ? `${money.format(cents / 100)} ₪` : `₪${money.format(cents / 100)}`;
  const id = key => document.getElementById(key);
  const set = (key, text) => { const el = id(key); if (el) el.textContent = text; };
  function make(tag, cls, txt) {
    const element = document.createElement(tag);
    if (cls) element.className = cls;
    if (txt !== undefined) element.textContent = txt;
    return element;
  }
  // Each component is set up in isolation: a missing element or an error in one
  // component must never stop the others from working.
  function setup(name, init) {
    try { init(); } catch (error) { if (window.console && console.warn) console.warn(`G-NRG 360: ${name} could not start.`, error); }
  }

  function initLens() {
    const slider = id('shift'), controls = id('lens-controls');
    if (!slider || !controls) return;
    const lowBar = id('after-low-bar'), highBar = id('after-high-bar');
    function updateLens(announce) {
      const r = calculateShift(slider.value);
      set('after-low', number.format(r.low)); set('after-high', number.format(r.high));
      set('after-low-label', number.format(r.low)); set('after-high-label', number.format(r.high));
      set('after-price', displayMoney(r.after)); set('shift-output', `${number.format(r.shift)} ${words.unit}`); set('day-saving', displayMoney(r.saving));
      if (lowBar) lowBar.style.setProperty('--share', `${100 * r.low / r.total}%`);
      if (highBar) highBar.style.setProperty('--share', `${100 * r.high / r.total}%`);
      slider.setAttribute('aria-valuetext', words.shifted(number.format(r.shift)));
      if (announce) set('lens-live', words.lensLive(number.format(r.total), displayMoney(r.after), displayMoney(r.saving)));
    }
    updateLens(false);
    controls.hidden = false;
    slider.addEventListener('input', () => updateLens(false));
    slider.addEventListener('change', () => updateLens(true));
  }

  // The questionnaire never transmits or stores answers. Copying is a deliberate action.
  // Its "arrange a call" link goes to data-contact-href on #check-app or any ancestor (default #contact).
  function initCheck() {
    const app = id('check-app');
    if (!app) return;
    const nextButton = id('check-next'), prevButton = id('check-prev');
    const content = id('check-content'), error = id('check-error');
    if (!nextButton || !prevButton || !content || !error) return; // Keep the static fallback.
    const contactHost = app.closest('[data-contact-href]');
    const contactHref = (contactHost && contactHost.getAttribute('data-contact-href')) || '#contact';
    let answers = [null, null, null], step = 0;
    prevButton.textContent = words.previous; error.textContent = words.choose;
    function showQuestion(moveFocus) {
      content.replaceChildren();
      error.hidden = true; set('copy-status', '');
      prevButton.hidden = step === 0;
      const result = step === 3;
      set('progress-text', result ? words.completed : words.questionProgress(number.format(step + 1)));
      const progressBar = id('progress-bar');
      if (progressBar) progressBar.style.transform = `scaleX(${result ? 3 : step + 1})`;
      nextButton.textContent = result ? words.restart : step === 2 ? words.showSummary : words.next;
      if (result) {
        const summary = createSummary(answers, lang);
        if (!summary) { step = 0; answers = [null, null, null]; showQuestion(moveFocus); return; }
        const wrapper = make('div', 'check-result');
        const heading = make('h3', '', words.summaryHeading); heading.tabIndex = -1;
        const box = make('div', 'check-summary');
        const summaryText = make('p', '', summary.text); box.append(summaryText);
        const advice = make('p', '', summary.next);
        const context = make('p', 'small-note', words.summaryContext);
        const copy = make('button', 'btn btn-dark copy-button', words.copy); copy.type = 'button';
        copy.addEventListener('click', async () => {
          try {
            if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
            await navigator.clipboard.writeText(summary.text);
            set('copy-status', words.copied);
          } catch (_) {
            const selection = window.getSelection();
            if (selection && document.createRange) { const range = document.createRange(); range.selectNodeContents(summaryText); selection.removeAllRanges(); selection.addRange(range); }
            set('copy-status', words.copyFailed);
          }
        });
        const contact = make('a', 'btn btn-quiet copy-button', words.contact); contact.href = contactHref;
        const actions = make('div', 'summary-actions'); actions.append(copy, contact);
        wrapper.append(heading, box, advice, actions, context); content.append(wrapper);
        if (moveFocus) heading.focus();
        return;
      }
      const q = getQuestion(step, answers, lang), fieldset = make('fieldset');
      const legend = make('legend', '', q.title); legend.tabIndex = -1;
      const options = make('div', 'check-options');
      Object.entries(q.options).forEach(([key, name]) => {
        const label = make('label', 'check-option');
        const input = make('input'); input.type = 'radio'; input.name = `check-step-${step}`; input.value = key; input.checked = answers[step] === key;
        input.addEventListener('change', () => {
          if (step === 0 && answers[0] !== key) answers[2] = null;
          answers[step] = key; error.hidden = true; fieldset.removeAttribute('aria-describedby');
        });
        label.append(input, make('span', '', name)); options.append(label);
      });
      fieldset.append(legend, options); content.append(fieldset);
      if (moveFocus) legend.focus();
    }
    nextButton.addEventListener('click', () => {
      if (step === 3) {step = 0; answers = [null, null, null]; showQuestion(true); return;}
      if (!answers[step]) {error.hidden = false; const group = content.querySelector('fieldset'); if (group) group.setAttribute('aria-describedby', 'check-error'); const first = content.querySelector('input'); if (first) first.focus(); return;}
      step += 1; showQuestion(true);
    });
    prevButton.addEventListener('click', () => { if (step > 0) {step -= 1; showQuestion(true);} });
    document.querySelectorAll('[data-check-route]').forEach(link => link.addEventListener('click', () => {
      const target = link.dataset.checkRoute;
      if (Object.hasOwn(questions.route.options, target)) {if (answers[0] !== target) answers[2] = null; answers[0] = target; step = 0; showQuestion(true);}
    }));
    showQuestion(false); app.hidden = false;
    const fallback = id('check-fallback');
    if (fallback) fallback.hidden = true;
  }

  // Preparing a contact draft is local-only. A visitor may open the explicitly
  // displayed mailto link and manually send it in their own email application.
  function initContact() {
    const form = id('contact-form'), status = id('contact-status');
    if (!form || !status) return;
    const button = form.querySelector('button[type="submit"]');
    if (!button) return;
    const messages = words.form;
    const production = isProductionHost(window.location.hostname) && window.location.protocol === 'https:';
    button.textContent = messages.send;
    button.disabled = false;
    const setStatus = text => {status.textContent = text;};
    function clearDraft() {
      const actions = id('contact-draft-actions');
      if (actions) actions.remove();
      setStatus('');
    }
    form.addEventListener('input', event => {
      if (['name', 'email', 'phone', 'message'].includes(event.target?.name)) clearDraft();
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      clearDraft();
      if (typeof form.reportValidity === 'function' && !form.reportValidity()) return;
      const entered = new FormData(form);
      const values = Object.fromEntries(['name', 'email', 'phone', 'message'].map(field => [field, String(entered.get(field) || '').trim()]));
      const missing = ['name', 'email', 'message'].find(field => !values[field]);
      if (missing) { setStatus(messages.invalid); const input = form.elements.namedItem(missing); if (input && typeof input.focus === 'function') input.focus(); return; }
      const draft = createContactDraft(values, lang);
      if (!draft) { setStatus(messages.invalid); return; }
      const canOpen = production && event.isTrusted !== false && !!draft.uri;
      setStatus(!production || event.isTrusted === false ? messages.preview : canOpen ? messages.ready : messages.long);
      const actions = make('div', 'contact-draft-actions'); actions.id = 'contact-draft-actions';
      const controls = make('div', 'contact-draft-controls');
      if (canOpen) {
        const link = make('a', 'btn btn-dark', messages.open); link.id = 'contact-draft-link'; link.href = draft.uri;
        controls.append(link);
      }
      const copy = make('button', 'btn btn-quiet', messages.copy); copy.id = 'contact-copy-draft'; copy.type = 'button';
      const label = make('label', 'small-note', messages.label); label.htmlFor = 'contact-draft-text';
      const draftText = make('textarea', 'contact-draft-text'); draftText.id = 'contact-draft-text'; draftText.readOnly = true; draftText.rows = 6; draftText.dir = 'auto';
      draftText.value = `${messages.toLabel}: ${CONTACT_EMAIL}\n${messages.subjectLabel}: ${draft.subject}\n\n${draft.body}`;
      copy.addEventListener('click', async () => {
        try {
          if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
          await navigator.clipboard.writeText(draftText.value); setStatus(messages.copied);
        } catch (_) { draftText.focus(); draftText.select(); setStatus(messages.copyFailed); }
      });
      controls.append(copy); actions.append(controls, label, draftText);
      status.insertAdjacentElement('afterend', actions);
    });
  }

  // Header menus are plain <details> (they work without JS). This only closes an open
  // menu on a click outside it, on Escape, when focus leaves it, or after choosing a link.
  function initNav() {
    const menus = Array.from(document.querySelectorAll('.nav-menu'));
    if (!menus.length) return;
    const close = (menu, refocus) => {
      if (!menu.open) return;
      menu.open = false;
      const summary = menu.querySelector('summary');
      if (refocus && summary) summary.focus();
    };
    menus.forEach(menu => {
      menu.addEventListener('toggle', () => { if (menu.open) menus.forEach(other => { if (other !== menu) close(other, false); }); });
      menu.addEventListener('focusout', event => { if (event.relatedTarget && !menu.contains(event.relatedTarget)) close(menu, false); });
      menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => close(menu, false)));
    });
    document.addEventListener('click', event => menus.forEach(menu => { if (!menu.contains(event.target)) close(menu, false); }));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') menus.forEach(menu => { if (menu.open) close(menu, menu.contains(document.activeElement)); }); });
  }

  setup('navigation', initNav);
  setup('energy illustration', initLens);
  setup('questionnaire', initCheck);
  setup('contact form', initContact);
})();
