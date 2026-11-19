// Builds the static public site from the data in the single-page artifact.
// usage: node build.js <source index.html> <output dir> <domain>
const fs = require("fs"), path = require("path"), vm = require("vm");
const [src, out, domain] = process.argv.slice(2);
const html = fs.readFileSync(src, "utf8");
const css = fs.readFileSync(path.join(__dirname, "site.css"), "utf8");
const js = html.match(/<script>([\s\S]*?)<\/script>/)[1].split("function esc(")[0];
const ctx = {};
vm.createContext(ctx);
vm.runInContext(js + ";this.D={UI,CRIT,CASES,NEWS,T,price};", ctx);
const { UI, CRIT, CASES, NEWS, T, price } = ctx.D;

const PAGES = require("./pages.js");
const SPONSOR_MAILTO = "mailto:" + PAGES.SPONSOR_EMAIL + "?subject=" + encodeURIComponent(PAGES.SPONSOR_SUBJECT);
const { labels: CL, tools: CT, pairs: PAIRS } = require("./compare.js");
const { newsletterSection, NEWSLETTER_SCRIPT } = require("./newsletter.js");
const BASE = "https://" + domain;
const LANGS = [
  { code: "en", html: "en", dir: "", name: "English" },
  { code: "pt", html: "pt-BR", dir: "pt/", name: "Português" },
  { code: "es", html: "es", dir: "es/", name: "Español" },
  { code: "zh", html: "zh-Hans", dir: "zh/", name: "中文" },
];
const X = {
  tagline: ["AI tool rankings for vibe coders and builders", "Rankings de ferramentas de IA para vibe coders e builders", "Rankings de herramientas de IA para vibe coders y builders", "面向 vibe coder 和开发者的 AI 工具排名"],
  all: ["All use cases", "Todos os casos de uso", "Todos los casos de uso", "全部场景"],
  other: ["Other use cases", "Outros casos de uso", "Otros casos de uso", "其他场景"],
  updated: ["Updated November 2026", "Atualizado em novembro de 2026", "Actualizado en noviembre de 2026", "更新于 2026 年 11 月"],
  nlh: ["The weekly podium, by email", "O pódio da semana, por e-mail", "El podio de la semana, por correo", "每周榜单，邮件送达"],
  nlp: ["One short email every Friday: which tools moved up or down a podium, and the launches that matter.", "Um e-mail curto toda sexta-feira: quais ferramentas subiram ou desceram no pódio e os lançamentos que importam. Em inglês.", "Un correo corto cada viernes: qué herramientas suben o bajan en algún podio y los lanzamientos que importan. En inglés.", "每周五一封简短邮件：哪些工具在榜单上升或下降，以及值得关注的新发布。邮件为英文。"],
  nlb: ["Subscribe", "Assinar", "Suscribirme", "订阅"],
  skip: ["Skip to content", "Ir para o conteúdo", "Saltar al contenido", "跳到正文"],
  navLabel: ["Sections", "Seções", "Secciones", "页面栏目"],
  langLabel: ["Language", "Idioma", "Idioma", "语言"],
  full: ["See the full ranking", "Ver o ranking completo", "Ver el ranking completo", "查看完整排名"],
  navCompare: ["Comparisons", "Comparações", "Comparativas", "对比"],
  menu: ["Menu", "Menu", "Menú", "菜单"],
  more: ["More", "Mais", "Más", "更多"],
  nlShort: ["Newsletter", "Boletim", "Boletín", "周报"],
  medal: [
    ["Gold", "Silver", "Bronze"],
    ["Ouro", "Prata", "Bronze"],
    ["Oro", "Plata", "Bronce"],
    ["金", "银", "铜"],
  ],
};
const MARK = `<svg class="mark" viewBox="0 0 36 28" aria-hidden="true" focusable="false"><rect class="m2" x="0" y="10" width="10" height="18" rx="2"/><rect class="m1" x="13" y="0" width="10" height="28" rx="2"/><rect class="m3" x="26" y="16" width="10" height="12" rx="2"/></svg>`;
const LANG_SHORT = ["EN", "PT", "ES", "ZH"];
const COMPARE = [["lovable","bolt"],["lovable","replit"],["bolt","replit"],["v0","lovable"],["cursor","copilot"],["cursor","devin"],["cursor","windsurf"],["claude","codex"],["claude","cursor"],["n8n","make"],["n8n","zapier"],["langgraph","crewai"],["rosebud","gdevelop"]];
const C = {
  list: ["Head-to-head comparisons", "Comparações diretas", "Comparativas directas", "两两对比"],
  title: ["{A} vs {B}: which one to pick", "{A} vs {B}: qual escolher", "{A} vs {B}: cuál elegir", "{A} 与 {B}：该选哪个"],
  desc: ["Where {A} and {B} rank on StackPodium's podiums, with prices and the reason for each position.", "Onde {A} e {B} ficam nos pódios do StackPodium, com preços e o motivo de cada posição.", "En qué puesto quedan {A} y {B} en los podios de StackPodium, con precios y el motivo de cada puesto.", "{A} 和 {B} 在 StackPodium 各榜单中的名次、价格以及每个名次的理由。"],
  intro: ["We don't name one overall winner: the right pick depends on what you are building. This is how the two compare in each use case where at least one of them is on the podium.", "Não apontamos um vencedor geral: a escolha certa depende do que você está construindo. Veja como os dois se comparam em cada caso de uso em que pelo menos um deles está no pódio.", "No damos un ganador general: la elección correcta depende de lo que estés construyendo. Así se comparan los dos en cada caso de uso en el que al menos uno está en el podio.", "我们不评选总冠军：选哪个取决于你要做什么。下面是两者在各个使用场景中的对比（至少有一方上榜的场景）。"],
  usecase: ["Use case", "Caso de uso", "Caso de uso", "使用场景"],
  off: ["Not on this podium", "Fora deste pódio", "Fuera de este podio", "未上榜"],
  price: ["Entry price", "Preço de entrada", "Precio de entrada", "入门价格"],
  say: ["What we say about {A}", "O que dizemos sobre {A}", "Lo que decimos de {A}", "我们对 {A} 的评价"],
};
const tname = (k, l) => (typeof T[k][0] === "string" ? T[k][0] : T[k][0][l]);
const cslug = (p) => "compare/" + [tname(p[0], 0), tname(p[1], 0)].map((n) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")).join("-vs-");
const fill = (t, a, b) => t.replace(/\{A\}/g, a).replace(/\{B\}/g, b || "");
const rankOf = (c, k) => { const i = c.r.findIndex((r) => r[0] === k); return i < 0 ? 0 : i + 1; };
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const pad = (n) => (n < 10 ? "0" + n : "" + n);
const url = (l, slug) => "/" + LANGS[l].dir + (slug ? slug + "/" : "");

function rankList(c, l) {
  return c.r.map((r, j) => {
    const t = T[r[0]];
    const name = typeof t[0] === "string" ? t[0] : t[0][l];
    const href = t[1].startsWith("#") ? url(l, t[1].slice(1)) : t[1];
    const rel = href.startsWith("http") ? ' rel="noopener"' : "";
    const medal = esc(X.medal[l][j] || "");
    return `<li class="${j === 0 ? "first " : ""}place"><span class="pos"><span class="medal-name">${medal}</span><b>${j + 1}</b></span><div class="place-body"><div class="tool"><a href="${esc(href)}"${rel}>${esc(name)}</a><span class="price">${esc(price(t[2], l))}</span></div><p class="why">${esc(r[1][l])}</p></div></li>`;
  }).join("");
}
function caseArticle(c, i, l, heading, link) {
  const title = link ? `<a href="${url(l, c.id)}">${esc(c.t[l])}</a>` : esc(c.t[l]);
  const more = link ? `<p class="more"><a href="${url(l, c.id)}">${esc(X.full[l])}</a></p>` : "";
  return `<article class="case" id="${c.id}"><header class="case-head"><span class="num">${esc(UI["case"][l])} ${pad(i + 1)}</span><${heading}>${title}</${heading}><p class="who">${esc(c.who[l])}</p></header><ol class="rank">${rankList(c, l)}</ol><p class="extra">${c.x[l]}</p>${more}</article>`;
}
function langSwitch(l, slug) {
  return LANGS.map((L, k) => `<a href="${url(k, slug)}" lang="${L.html}"${k === l ? ' aria-current="true"' : ""}><span class="lfull">${L.name}</span><span class="lshort">${LANG_SHORT[k]}</span></a>`).join("");
}
function navLinks(l, opts) {
  const sponsor = PAGES.find((p) => p.slug === "sponsor");
  return `<a href="${url(l)}#cases">${esc(UI.nav1[l])}</a><a href="${url(l)}#compare">${esc(X.navCompare[l])}</a><a href="${url(l)}#method">${esc(UI.nav2[l])}</a><a href="${url(l)}#changes">${esc(UI.nav3[l])}</a><a href="${url(l, "sponsor")}">${esc(sponsor.label[l])}</a>${opts.extraNav || ""}`;
}
function siteHeader(l, slug, opts) {
  const links = navLinks(l, opts);
  const label = esc(X.navLabel[l]);
  return `<header class="top"><div class="wrap">
<a class="brand" href="${url(l)}">${MARK}Stack<span>Podium</span></a>
<nav class="navdesk" aria-label="${label}">${links}</nav>
<div class="langs" role="group" aria-label="${esc(X.langLabel[l])}">${langSwitch(l, slug)}</div>
<details class="navmob"><summary>${esc(X.menu[l])}</summary><nav aria-label="${label}">${links}</nav></details>
</div></header>`;
}
function siteFooter(l, slug) {
  const sponsor = PAGES.find((p) => p.slug === "sponsor");
  const privacy = PAGES.find((p) => p.slug === "privacy");
  const cases = CASES.map((c) => `<li><a href="${url(l, c.id)}">${esc(c.t[l])}</a></li>`).join("");
  const comps = COMPARE.map((p) => `<li><a href="${url(l, cslug(p))}">${esc(tname(p[0], l))} vs ${esc(tname(p[1], l))}</a></li>`).join("");
  // Every English footer links to /playforge/. Spanish links to the Spanish
  // product page from the home page, the browser-game ranking, and the Rosebud
  // comparison: the three surfaces called out for this launch.
  const playHref = l === 0 ? "/playforge/" : l === 2 && (slug === "" || slug === "browser-game" || slug === "compare/rosebud-ai-vs-gdevelop") ? "/es/playforge/" : "";
  const play = playHref ? `<li><a href="${playHref}">PlayForge</a></li>` : "";
  return `<footer><div class="wrap foot">
<div class="foot-brand"><a class="brand" href="${url(l)}">${MARK}Stack<span>Podium</span></a><p>${esc(UI.foot1[l])}</p><p>${esc(UI.foot2[l])}</p><p class="updated">${esc(X.updated[l])}</p></div>
<nav aria-labelledby="foot-cases"><h2 id="foot-cases">${esc(UI.nav1[l])}</h2><ul>${cases}</ul></nav>
<nav aria-labelledby="foot-compare"><h2 id="foot-compare">${esc(X.navCompare[l])}</h2><ul>${comps}</ul></nav>
<div class="foot-more"><h2 id="foot-more">${esc(X.more[l])}</h2><ul>
<li><a href="#newsletter">${esc(X.nlShort[l])}</a></li>
<li><a href="${url(l, "sponsor")}">${esc(sponsor.label[l])}</a></li>
<li><a href="${esc(SPONSOR_MAILTO)}">${esc(PAGES.SPONSOR_EMAIL)}</a></li>
<li><a href="${url(l, "privacy")}">${esc(privacy.label[l])}</a></li>
${play}<li><a href="https://x.com/stackpodium" rel="noopener">X (@stackpodium)</a></li>
</ul><div class="langs" role="group" aria-label="${esc(X.langLabel[l])}">${langSwitch(l, slug)}</div></div>
</div></footer>`;
}
function orgLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "StackPodium",
    url: BASE + "/",
    sameAs: ["https://x.com/stackpodium"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sponsorships",
      email: PAGES.SPONSOR_EMAIL,
      url: SPONSOR_MAILTO,
    },
  };
}
function page(l, slug, title, desc, body, ld, opts) {
  opts = opts || {};
  const alt = LANGS.map((L, k) => `<link rel="alternate" hreflang="${L.html}" href="${BASE}${url(k, slug)}">`).join("\n") + `\n<link rel="alternate" hreflang="x-default" href="${BASE}${url(0, slug)}">`;
  const blocks = [orgLd()].concat(Array.isArray(ld) ? ld : [ld]);
  const jsonLd = blocks.map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`).join("\n");
  const nl = newsletterSection(l, opts.compact ? "compact" : "full", { heading: X.nlh[l], blurb: X.nlp[l], submit: X.nlb[l] });
  return `<!DOCTYPE html>
<html lang="${LANGS[l].html}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name='impact-site-verification' value='53d8f414-ba12-4a21-8424-015dca09712f'>
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${BASE}${url(l, slug)}">
${alt}
<meta property="og:type" content="website">
<meta property="og:site_name" content="StackPodium">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${BASE}${url(l, slug)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/site.css">
${jsonLd}
</head>
<body>
<a class="skip" href="#content">${esc(X.skip[l])}</a>
${siteHeader(l, slug, opts)}
<main id="content">
${body}
${nl}
</main>
${siteFooter(l, slug)}
<script>${NEWSLETTER_SCRIPT}</script>
</body>
</html>
`;
}
function write(rel, text) {
  const f = path.join(out, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, text);
}

write("site.css", css);

write("sponsor.css", fs.readFileSync(path.join(__dirname, "sponsor.css"), "utf8"));

const urls = [];
LANGS.forEach((L, l) => {
  // home
  const rail = CASES.map((c, i) => `<li><a href="#${c.id}"><span class="idx">${pad(i + 1)}</span>${esc(c.t[l])}</a></li>`).join("");
  const cases = CASES.map((c, i) => caseArticle(c, i, l, "h2", true)).join("\n");
  const crit = CRIT.map((c) => `<li><span class="w">${c[0]}</span><h3>${esc(c[1][l])}</h3><p>${esc(c[2][l])}</p></li>`).join("");
  const newsWhen = { "Nov 2026": "2026-11", "Jun 2026": "2026-06", "Feb 2026": "2026-02" };
  const news = NEWS.map((x) => {
    const dt = newsWhen[x[0][0]];
    return `<li><time${dt ? ` datetime="${dt}"` : ""}>${esc(x[0][l])}</time><div><h3>${esc(x[1][l])}</h3><p>${esc(x[2][l])} <a class="src" href="${esc(x[3])}" rel="noopener">${esc(UI.src[l])}: ${esc(x[4])}</a></p></div></li>`;
  }).join("");
  const studio = l === 0 ? `<p class="studio"><a href="/playforge/">PlayForge</a> is a StackPodium studio. Describe a video game, pay $9, and get a plan pack by email within 24 hours.</p>` : l === 2 ? `<p class="studio"><a href="/es/playforge/">PlayForge</a> es un estudio de StackPodium. Describe un videojuego, paga $9 y recibe un Plan Pack en español por correo en menos de 24 horas.</p>` : "";
  const heroNl = newsletterSection(l, "compact", { heading: X.nlh[l], blurb: X.nlp[l], submit: X.nlb[l] }, "hero");
  const home = `<section class="hero"><div class="wrap hero-grid"><div class="hero-copy"><h1>${esc(UI.h1[l])}</h1><p class="lede">${esc(UI.intro[l])}</p>${studio}<p class="status"><span>${esc(UI.status[l])}</span></p></div><div class="hero-card"><div class="podium-art" aria-hidden="true"><span class="step silver"><b>2</b></span><span class="step gold"><b>1</b></span><span class="step bronze"><b>3</b></span></div>${heroNl}</div></div></section>
<nav class="jump" id="cases" aria-label="${esc(UI.nav1[l])}"><div class="wrap"><h2>${esc(UI.rail[l])}</h2><ol>${rail}</ol></div></nav>
<div class="wrap cases">${cases}</div>
<section class="block" id="compare"><div class="wrap"><h2>${esc(C.list[l])}</h2><ul class="cmplist">${COMPARE.map((p) => `<li><a href="${url(l, cslug(p))}"><span class="vsname">${esc(tname(p[0], l))}</span><span class="vs">vs</span><span class="vsname">${esc(tname(p[1], l))}</span></a></li>`).join("")}</ul></div></section>
<section class="block" id="method"><div class="wrap"><h2>${esc(UI.nav2[l])}</h2><p>${esc(UI.method[l])}</p><ul class="criteria">${crit}</ul></div></section>
<section class="block" id="changes"><div class="wrap"><h2>${esc(UI.newsh[l])}</h2><p>${esc(UI.newsp[l])}</p><ul class="news">${news}</ul></div></section>`;
  const homeLd = { "@context": "https://schema.org", "@type": "WebSite", name: "StackPodium", url: BASE + url(l), inLanguage: L.html, description: UI.intro[l] };
  const homeOpts = l === 0 ? { extraNav: `<a href="/playforge/">PlayForge</a>` } : l === 2 ? { extraNav: `<a href="/es/playforge/">PlayForge</a>` } : {};
  write(L.dir + "index.html", page(l, "", "StackPodium | " + X.tagline[l], UI.intro[l], home, homeLd, homeOpts));
  urls.push(url(l));
  // one page per use case
  CASES.forEach((c, i) => {
    const others = CASES.filter((o) => o.id !== c.id).map((o) => `<li><a href="${url(l, o.id)}">${esc(o.t[l])}</a></li>`).join("");
    const body = `<div class="single"><p class="crumb"><a href="${url(l)}">${esc(X.all[l])}</a></p>${caseArticle(c, i, l, "h1", false)}<p class="note">${esc(UI.status[l])} ${esc(UI.foot2[l])}</p></div>
<div class="others"><h2>${esc(X.other[l])}</h2><ul>${others}</ul></div>`;
    const ld = {
      "@context": "https://schema.org", "@type": "ItemList", name: c.t[l], description: c.who[l], inLanguage: L.html, url: BASE + url(l, c.id),
      itemListElement: c.r.map((r, j) => {
        const t = T[r[0]];
        const item = { "@type": "ListItem", position: j + 1, name: typeof t[0] === "string" ? t[0] : t[0][l], description: r[1][l] };
        if (t[1].startsWith("http")) item.url = t[1];
        return item;
      }),
    };
    write(L.dir + c.id + "/index.html", page(l, c.id, c.t[l] + " | StackPodium", c.who[l], body, ld));
    urls.push(url(l, c.id));
  });
});

const OG_LOCALE = { en: "en_US", pt: "pt_BR", es: "es_ES", zh: "zh_CN" };
function sponsorHead(title, desc, locale) {
  return [
    `<link rel="stylesheet" href="/sponsor.css">`,
    `<meta property="og:locale" content="${esc(locale)}">`,
    `<meta name="twitter:card" content="summary">`,
    `<meta name="twitter:site" content="@stackpodium">`,
    `<meta name="twitter:title" content="${esc(title)}">`,
    `<meta name="twitter:description" content="${esc(desc)}">`,
  ].join("\n");
}
LANGS.forEach((L, l) => {
  PAGES.forEach((P) => {
    const klass = P.slug === "sponsor" ? "single prose sponsor-page" : "single prose";
    const body = `<div class="${klass}"><p class="crumb"><a href="${url(l)}">${esc(X.all[l])}</a></p><h1>${esc(P.title[l])}</h1>${P.body[l]}</div>`;
    const ld = { "@context": "https://schema.org", "@type": "WebPage", name: P.title[l], description: P.desc[l], inLanguage: L.html, url: BASE + url(l, P.slug) };
    const fullTitle = P.title[l] + " | StackPodium";
    let html = page(l, P.slug, fullTitle, P.desc[l], body, ld);
    if (P.slug === "sponsor") {
      html = html.replace(
        '<link rel="stylesheet" href="/site.css">',
        `<link rel="stylesheet" href="/site.css">\n${sponsorHead(fullTitle, P.desc[l], OG_LOCALE[L.code])}`
      );
    }
    write(L.dir + P.slug + "/index.html", html);
    urls.push(url(l, P.slug));
  });
});

LANGS.forEach((L, l) => {
  COMPARE.forEach((p) => {
    const [a, b] = p, A = tname(a, l), B = tname(b, l), slug = cslug(p);
    const copy = PAIRS.find((x) => x.ids[0] === a && x.ids[1] === b);
    if (!copy || !CT[a] || !CT[b]) throw new Error("Missing comparison copy for " + a + " vs " + b);
    const linkTool = (k) => {
      const href = T[k][1];
      const rel = String(href).startsWith("http") ? ' rel="noopener"' : "";
      return `<a href="${esc(href)}"${rel}>${esc(tname(k, l))}</a>`;
    };
    const fact = (key, label, mono) => `<tr><th scope="row">${esc(label)}</th><td data-col="${esc(A)}"${mono ? ' class="mono"' : ""}>${key === "price" ? esc(price(T[a][2], l)) : esc(CT[a][key][l])}</td><td data-col="${esc(B)}"${mono ? ' class="mono"' : ""}>${key === "price" ? esc(price(T[b][2], l)) : esc(CT[b][key][l])}</td></tr>`;
    const facts = `<div class="tablewrap"><table class="cmp facts"><caption class="sr">${esc(A)} vs ${esc(B)}</caption><thead><tr><th scope="col"><span class="sr">${esc(CL.compared[l])}</span></th><th scope="col">${linkTool(a)}</th><th scope="col">${linkTool(b)}</th></tr></thead><tbody>${fact("price", CL.price[l], true)}${fact("best", CL.best[l])}${fact("model", CL.model[l])}${fact("exit", CL.exit[l])}${fact("curve", CL.curve[l])}</tbody></table></div>`;
    // A renamed product can show the podium slot of its current name. This does not add a place on the ranking pages.
    const rankKey = (k) => (copy.rankAs && copy.rankAs[k]) || k;
    const rows = CASES.map((c) => ({ c, ra: rankOf(c, rankKey(a)), rb: rankOf(c, rankKey(b)) })).filter((x) => x.ra || x.rb);
    const cell = (n) => {
      if (!n) return `<span class="offp">${esc(C.off[l])}</span>`;
      const medal = n === 1 ? "gold" : n === 2 ? "silver" : "bronze";
      return `<b class="rk ${medal}${n === 1 ? " top" : ""}">#${n}</b>`;
    };
    const ranks = `<div class="tablewrap"><table class="cmp"><thead><tr><th scope="col">${esc(C.usecase[l])}</th><th scope="col">${esc(A)}</th><th scope="col">${esc(B)}</th></tr></thead><tbody>${rows.map((x) => `<tr><td><a href="${url(l)}#${x.c.id}">${esc(x.c.t[l])}</a> <a class="sub" href="${url(l, x.c.id)}">${esc(CL.full[l])}</a></td><td>${cell(x.ra)}</td><td>${cell(x.rb)}</td></tr>`).join("")}</tbody></table></div>`;
    const says = (k, N) => {
      const key = rankKey(k);
      const items = CASES.filter((c) => rankOf(c, key));
      if (!items.length) return "";
      return `<h2>${esc(fill(C.say[l], N))}</h2><ul>${items.map((c) => `<li><b>${esc(c.t[l])}</b> (#${rankOf(c, key)}): ${esc(c.r[rankOf(c, key) - 1][1][l])}</li>`).join("")}</ul>`;
    };
    const faqs = copy.faqs.concat([CL.priceFaq]);
    const faqHtml = faqs.map((item) => `<div class="qa"><h3>${esc(item.q[l])}</h3><p>${esc(item.a[l])}</p></div>`).join("");
    const others = COMPARE.filter((q) => q !== p).map((q) => `<li><a href="${url(l, cslug(q))}">${esc(tname(q[0], l))} vs ${esc(tname(q[1], l))}</a></li>`).join("");
    const title = copy.title[l], desc = copy.desc[l];
    const verdict = `<p class="verdict">${esc(fill(CL.pick[l], A, copy.pick[l][0]))} ${esc(fill(CL.pick[l], B, copy.pick[l][1]))}</p>`;
    const body = `<div class="single prose"><p class="crumb"><a href="${url(l)}">${esc(X.all[l])}</a></p><h1>${esc(title)}</h1>${verdict}<h2>${esc(CL.glance[l])}</h2>${facts}<p class="note">${esc(CL.note[l])}</p><h2>${esc(CL.where[l])}</h2>${ranks}${says(a, A)}${says(b, B)}<h2>${esc(CL.questions[l])}</h2><div class="faq">${faqHtml}</div><p class="note">${esc(UI.status[l])} ${esc(UI.foot2[l])}</p></div>
<div class="others"><h2>${esc(C.list[l])}</h2><ul>${others}</ul></div>`;
    const ld = {
      "@context": "https://schema.org", "@type": "FAQPage", name: title, description: desc, inLanguage: L.html, url: BASE + url(l, slug),
      mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.q[l], acceptedAnswer: { "@type": "Answer", text: item.a[l] } })),
    };
    write(L.dir + slug + "/index.html", page(l, slug, title + " | StackPodium", desc, body, ld, { compact: true }));
    urls.push(url(l, slug));
  });
});

// /playforge/ and /es/playforge/ are hand-authored HTML, not emitted above,
// so a rebuild does not regenerate the product pages. thanks.html is noindex.
// /playforge/generator/ is hand-authored too and is a public free page.
// /playforge/examples/top-down-heist/ is a hand-authored sample landing page.
urls.push("/playforge/");
urls.push("/playforge/generator/");
urls.push("/playforge/examples/top-down-heist/");
urls.push("/es/playforge/");
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `<url><loc>${BASE}${u}</loc></url>`).join("\n")}\n</urlset>\n`);
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${BASE}/sitemap.xml\n`);
write("CNAME", domain + "\n");
write("llms.txt", `# StackPodium\n\n> ${X.tagline[0]}. Each use case has three ranked tools, the reason for each position and an entry price. Rankings are editorial, based on public documentation; prices were checked in October and November 2026.\n\n## Use cases\n\n${CASES.map((c) => `- [${c.t[0]}](${BASE}${url(0, c.id)}): ${c.r.map((r, j) => `${j + 1}. ${typeof T[r[0]][0] === "string" ? T[r[0]][0] : T[r[0]][0][0]}`).join(", ")}`).join("\n")}\n\n## Comparisons\n\n${COMPARE.map((p) => `- [${tname(p[0], 0)} vs ${tname(p[1], 0)}](${BASE}${url(0, cslug(p))})`).join("\n")}\n\n## Sponsorship\n\n- [Sponsor StackPodium](${BASE}/sponsor/): launch rates, valid until May 2027, for one newsletter slot per Friday issue ($${PAGES.SPONSOR_PRICES.newsletter}), a labelled Sponsored placement on the site ($${PAGES.SPONSOR_PRICES.placement} per month), both together ($${PAGES.SPONSOR_PRICES.bundle}, normally $${PAGES.SPONSOR_PRICES.newsletter + PAGES.SPONSOR_PRICES.placement} if bought separately), and a featured launch mention ($${PAGES.SPONSOR_PRICES.launch}). Sponsorship never changes rankings. Audience metrics are shared on request. Contact: [${PAGES.SPONSOR_EMAIL}](${SPONSOR_MAILTO}).\n\n## PlayForge\n\n- [PlayForge](${BASE}/playforge/): a StackPodium studio. Describe a video game idea, pay $9, and receive a Plan Pack by email within 24 hours (a design one-pager, a prototype build plan, and prompts for Cursor or a similar AI coding tool). Two levels: Beginner and Vibe coder. A $29 Premium that builds the browser prototype is not on sale yet. Sponsor PlayForge: [${PAGES.SPONSOR_EMAIL}](${SPONSOR_MAILTO}).\n- [Game Idea Spark](${BASE}/playforge/generator/): a free in-browser mini generator. Type a one-line game idea, pick Beginner or Vibe coder, and get a core loop, a weekend prototype scope, a recommended stack, and a first Cursor prompt. Nothing is uploaded.\n- [How to make a small top-down heist game with AI this weekend](${BASE}/playforge/examples/top-down-heist/): a house sample, not a customer order. Vibe coder Plan Pack excerpt for the idea "A top-down heist game where you have 60 seconds to rob a bank before the cops arrive": a design one-pager, a weekend build plan with a done-when line on each step, and the first two Cursor prompts (Phaser 3, Vite, and TypeScript). Independent of GTA VI. PlayForge is not affiliated with Rockstar Games.\n- [PlayForge en español](${BASE}/es/playforge/): the Spanish page for the same $9 Plan Pack. Describe a video game idea, pay $9, and receive a Plan Pack written in Spanish by email within 24 hours (a design one-pager, a prototype build plan, and prompts for Cursor or a similar AI coding tool). Levels: Principiante (nunca ha programado) and Vibe coder. A $29 Premium that builds the browser prototype is coming soon and is not for sale yet.\n\n## Languages\n\n${LANGS.map((L, l) => `- [${L.name}](${BASE}${url(l)})`).join("\n")}\n`);
// Hand-authored product pages live in /playforge and are copied through so a
// clean build output still contains them, including subfolders such as the
// generator and examples. Edit the files in /playforge, not a copy.
function copyPlayforge(dir, rel) {
  if (!dir) dir = path.join(__dirname, "..", "playforge");
  if (!rel) rel = "playforge";
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    if (name === ".DS_Store") continue;
    const from = path.join(dir, name);
    const dest = rel + "/" + name;
    if (fs.statSync(from).isDirectory()) copyPlayforge(from, dest);
    else write(dest, fs.readFileSync(from));
  }
}
copyPlayforge();
// Spanish product page. Source of truth is es/playforge/index.html in the repo,
// copied into the build output so a clean folder still contains it.
const esPlayforge = path.join(__dirname, "..", "es", "playforge", "index.html");
if (!fs.existsSync(esPlayforge)) throw new Error("Missing es/playforge/index.html");
write("es/playforge/index.html", fs.readFileSync(esPlayforge));
console.log("pages:", urls.length);
