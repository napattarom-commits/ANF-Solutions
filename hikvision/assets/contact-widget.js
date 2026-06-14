/*
 * ANF Solutions — Floating Contact Widget
 * Injects a bottom-right floating button cluster: Facebook · Phone · Email
 * Self-contained: no dependencies, no framework. Vanilla JS + injected CSS.
 *
 * To use: <script src="assets/contact-widget.js" defer></script> at the bottom of <body>
 * Config can be overridden via window.ANF_CONTACT_WIDGET = { ... } BEFORE this script loads.
 */
(function () {
  'use strict';

  // Default config (can be overridden by window.ANF_CONTACT_WIDGET BEFORE script loads)
  var cfg = Object.assign(
    {
      facebookUrl: 'https://www.facebook.com/profile.php?id=61587088540066',
      phone: '0804959965',
      phoneDisplay: '080-495-9965',
      email: 'ANFSOLUTIONS.TH@GMAIL.COM',
      brand: 'ANF Solutions',
      labelOpen: 'ติดต่อเรา',
      // Hide on print and very small screens? defaults: show on screens, hide on print
      position: 'right' // 'right' | 'left'
    },
    window.ANF_CONTACT_WIDGET || {}
  );

  // Inject CSS
  var css = ''
    + '.anf-cw{position:fixed;bottom:18px;' + cfg.position + ':18px;z-index:9990;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif}'
    + '.anf-cw *{box-sizing:border-box}'
    + '.anf-cw-toggle{width:58px;height:58px;border-radius:50%;background:linear-gradient(135deg,#0B2545,#13315C);color:#fff;border:none;cursor:pointer;box-shadow:0 8px 24px rgba(11,37,69,.35);display:flex;align-items:center;justify-content:center;transition:transform .25s ease,box-shadow .25s ease;outline:none}'
    + '.anf-cw-toggle:hover{transform:translateY(-2px) scale(1.05);box-shadow:0 12px 28px rgba(11,37,69,.45)}'
    + '.anf-cw-toggle:focus-visible{outline:3px solid #FFD700;outline-offset:2px}'
    + '.anf-cw-toggle svg{width:26px;height:26px;fill:currentColor}'
    + '.anf-cw-toggle.is-open{background:linear-gradient(135deg,#7F1D1D,#991B1B)}'
    + '.anf-cw-list{position:absolute;bottom:72px;' + cfg.position + ':4px;display:flex;flex-direction:column;gap:10px;align-items:flex-end;opacity:0;pointer-events:none;transform:translateY(8px);transition:opacity .25s ease,transform .25s ease}'
    + '.anf-cw.is-open .anf-cw-list{opacity:1;pointer-events:auto;transform:translateY(0)}'
    + '.anf-cw-item{display:flex;align-items:center;gap:10px;text-decoration:none;background:#fff;color:#0B2545;padding:9px 14px 9px 12px;border-radius:30px;box-shadow:0 6px 18px rgba(0,0,0,.18);font-size:14px;font-weight:600;line-height:1;transition:transform .2s ease,box-shadow .2s ease;border:1px solid rgba(11,37,69,.08);white-space:nowrap}'
    + '.anf-cw-item:hover{transform:translateX(-4px);box-shadow:0 10px 22px rgba(0,0,0,.22)}'
    + '.anf-cw-item:focus-visible{outline:3px solid #FFD700;outline-offset:2px}'
    + '.anf-cw-ico{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;flex-shrink:0}'
    + '.anf-cw-ico svg{width:18px;height:18px;fill:currentColor}'
    + '.anf-cw-ico.fb{background:#1877F2}'
    + '.anf-cw-ico.tel{background:#16A34A}'
    + '.anf-cw-ico.mail{background:#0EA5E9}'
    + '.anf-cw-label{display:inline-block}'
    + '.anf-cw-pulse{position:absolute;top:-2px;' + (cfg.position === 'right' ? 'right:-2px' : 'left:-2px') + ';width:14px;height:14px;background:#FFD700;border-radius:50%;border:2px solid #fff}'
    + '.anf-cw-pulse::before{content:"";position:absolute;inset:-4px;border-radius:50%;background:#FFD700;opacity:.5;animation:anf-cw-pulse 1.8s ease-out infinite}'
    + '@keyframes anf-cw-pulse{0%{transform:scale(1);opacity:.6}80%{transform:scale(1.7);opacity:0}100%{transform:scale(1.7);opacity:0}}'
    + '@media (max-width: 480px){.anf-cw-item .anf-cw-label{display:none}.anf-cw-item{padding:8px}.anf-cw-ico{width:30px;height:30px}}'
    + '@media print{.anf-cw{display:none !important}}';
  var style = document.createElement('style');
  style.id = 'anf-contact-widget-css';
  style.textContent = css;
  document.head.appendChild(style);

  // Build DOM
  var container = document.createElement('div');
  container.className = 'anf-cw';
  container.setAttribute('aria-label', 'ติดต่อ ' + cfg.brand);

  var toggle = document.createElement('button');
  toggle.className = 'anf-cw-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'anf-cw-list');
  toggle.setAttribute('aria-label', cfg.labelOpen);
  toggle.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-7 11h-2v-2h2v2zm0-4h-2V6h2v3z"/></svg>'
    + '<span class="anf-cw-pulse" aria-hidden="true"></span>';

  var list = document.createElement('div');
  list.className = 'anf-cw-list';
  list.id = 'anf-cw-list';

  // Facebook Messenger
  var fb = document.createElement('a');
  fb.className = 'anf-cw-item';
  fb.href = cfg.facebookUrl;
  fb.target = '_blank';
  fb.rel = 'noopener noreferrer';
  fb.setAttribute('aria-label', 'Facebook Messenger');
  fb.innerHTML =
    '<span class="anf-cw-ico fb"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06c0 4.84 3.44 8.87 8 9.8v-6.93H7.78v-2.87H10V9.84c0-2.2 1.32-3.42 3.32-3.42.96 0 1.96.17 1.96.17v2.18h-1.1c-1.1 0-1.44.68-1.44 1.39v1.7h2.45l-.39 2.87h-2.06V21.86c4.56-.93 8-4.96 8-9.8 0-5.53-4.5-10.02-10-10.02z"/></svg></span>'
    + '<span class="anf-cw-label">Facebook</span>';

  // Phone
  var tel = document.createElement('a');
  tel.className = 'anf-cw-item';
  tel.href = 'tel:' + cfg.phone;
  tel.setAttribute('aria-label', 'โทร ' + cfg.phoneDisplay);
  tel.innerHTML =
    '<span class="anf-cw-ico tel"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.05l-2.21 2.17z"/></svg></span>'
    + '<span class="anf-cw-label">' + cfg.phoneDisplay + '</span>';

  // Email
  var mail = document.createElement('a');
  mail.className = 'anf-cw-item';
  mail.href = 'mailto:' + cfg.email;
  mail.setAttribute('aria-label', 'อีเมล ' + cfg.email);
  mail.innerHTML =
    '<span class="anf-cw-ico mail"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></span>'
    + '<span class="anf-cw-label">Email</span>';

  list.appendChild(fb);
  list.appendChild(tel);
  list.appendChild(mail);
  container.appendChild(toggle);
  container.appendChild(list);
  document.body.appendChild(container);

  // Behavior
  var open = false;
  function setOpen(v) {
    open = v;
    container.classList.toggle('is-open', v);
    toggle.classList.toggle('is-open', v);
    toggle.setAttribute('aria-expanded', v ? 'true' : 'false');
    if (v) {
      toggle.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7a1 1 0 1 0-1.41 1.41L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.9a1 1 0 0 0 1.41-1.42L13.41 12l4.9-4.88a1 1 0 0 0-.01-1.41z"/></svg>';
    } else {
      toggle.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-7 11h-2v-2h2v2zm0-4h-2V6h2v3z"/></svg>'
        + '<span class="anf-cw-pulse" aria-hidden="true"></span>';
    }
  }
  toggle.addEventListener('click', function () { setOpen(!open); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && open) { setOpen(false); toggle.focus(); }
  });
  document.addEventListener('click', function (e) {
    if (!container.contains(e.target) && open) setOpen(false);
  });
})();
