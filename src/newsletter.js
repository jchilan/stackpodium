// Newsletter signup. This file is the only place the destination is defined.
//
// Today there is no beehiiv embed form, so the form sends the visitor to
// the hosted subscribe page for the publication "StackPodium":
//   https://stackpodium.beehiiv.com/subscribe
//
// The email field is named `email`. That is the name of the input on the
// hosted page, and the query parameter beehiiv uses when a link should
// carry an address (for example recommendation links). Checked 17 Nov 2026
// in a browser: opening the subscribe page with ?email=, ?e=,
// ?subscriber_email= or ?email_address= left the box empty. The form still
// sends ?email= so the address is in the URL, and it will show in the box
// if beehiiv starts reading that parameter. utm_source and utm_medium are
// always added.
//
// The form is a real GET form, so it works with JavaScript off. A plain
// link to the same page (without an address) is also in the page for
// browsers that do not run JavaScript.
//
// To switch to a beehiiv embed form later:
//   1. In beehiiv open Subscribers → Subscribe forms, create the form, and
//      copy the HTML snippet.
//   2. Set `method` to "post" and `url` to the snippet's form action.
//   3. Rebuild (`node src/build.js src/data.html /tmp/site stackpodium.com`
//      and copy the result onto the site root).
//   A POST form submits the email field directly and is not redirected.
//   Drop the utm hidden fields here if the embed rejects unknown inputs.
const NEWSLETTER = {
  url: "https://stackpodium.beehiiv.com/subscribe",
  method: "get",
  emailParam: "email",
  utmSource: "stackpodium.com",
  utmMedium: "site",
};

const S = {
  email: ["Email", "E-mail", "Correo", "邮箱"],
  placeholder: ["you@email.com", "you@email.com", "you@email.com", "you@email.com"],
  hint: [
    "Opens beehiiv's subscribe page with your address in the link. This site does not store it.",
    "Abre a página de assinatura da beehiiv com o seu endereço no link. Este site não o guarda.",
    "Abre la página de alta de beehiiv con tu dirección en el enlace. Esta web no la guarda.",
    "会打开 beehiiv 的订阅页，并在链接里带上你的邮箱。本站不保存这个地址。",
  ],
  fallback: [
    "Subscribe on beehiiv",
    "Assinar na beehiiv",
    "Suscribirme en beehiiv",
    "在 beehiiv 上订阅",
  ],
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function fallbackHref() {
  const u = new URL(NEWSLETTER.url);
  u.searchParams.set("utm_source", NEWSLETTER.utmSource);
  u.searchParams.set("utm_medium", NEWSLETTER.utmMedium);
  return u.toString();
}

function newsletterSection(l, variant, text, idSuffix) {
  const compact = variant === "compact";
  const sfx = idSuffix ? "-" + idSuffix : "";
  const headingId = "nl-heading" + sfx;
  const emailId = "nl-email" + sfx;
  const hintId = "nl-hint" + sfx;
  const sectionId = idSuffix ? "" : ' id="newsletter"';
  const action = esc(NEWSLETTER.url);
  return `<section class="newsletter${compact ? " compact" : ""}"${sectionId} aria-labelledby="${headingId}"><div class="wrap"><div><h2 id="${headingId}">${esc(text.heading)}</h2>${compact ? "" : `<p>${esc(text.blurb)}</p>`}</div><form class="signup" method="${esc(NEWSLETTER.method)}" action="${action}"><div class="field"><label for="${emailId}">${esc(S.email[l])}</label><input id="${emailId}" name="${esc(NEWSLETTER.emailParam)}" type="email" autocomplete="email" inputmode="email" required maxlength="254" placeholder="${esc(S.placeholder[l])}" aria-describedby="${hintId}"></div><input type="hidden" name="utm_source" value="${esc(NEWSLETTER.utmSource)}"><input type="hidden" name="utm_medium" value="${esc(NEWSLETTER.utmMedium)}"><button class="cta" type="submit">${esc(text.submit)}</button><p class="signup-hint" id="${hintId}">${esc(S.hint[l])}</p></form><noscript><p class="signup-fallback"><a href="${esc(fallbackHref())}" rel="noopener">${esc(S.fallback[l])}</a></p></noscript></div></section>`;
}

// Only intercepts GET, so a future POST embed submits natively.
const NEWSLETTER_SCRIPT = `(function(){document.querySelectorAll("form.signup").forEach(function(form){if((form.getAttribute("method")||"").toLowerCase()!=="get")return;form.addEventListener("submit",function(event){event.preventDefault();var url=new URL(form.getAttribute("action"),window.location.href);new FormData(form).forEach(function(value,key){url.searchParams.set(key,String(value));});window.location.assign(url.toString());});});})();`;

module.exports = { NEWSLETTER, newsletterSection, NEWSLETTER_SCRIPT };
