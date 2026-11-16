// Builds the static public site from the data in the single-page artifact.
// usage: node build.js <source index.html> <output dir> <domain>
const fs = require("fs"), path = require("path"), vm = require("vm");
const [src, out, domain] = process.argv.slice(2);
const html = fs.readFileSync(src, "utf8");
const css = html.match(/<style>([\s\S]*?)<\/style>/)[1];
const js = html.match(/<script>([\s\S]*?)<\/script>/)[1].split("function esc(")[0];
const ctx = {};
vm.createContext(ctx);
vm.runInContext(js + ";this.D={UI,CRIT,CASES,NEWS,T,price};", ctx);
const { UI, CRIT, CASES, NEWS, T, price } = ctx.D;

const PAGES = require("./pages.js");
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
  full: ["See the full ranking", "Ver o ranking completo", "Ver el ranking completo", "查看完整排名"],
};
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const pad = (n) => (n < 10 ? "0" + n : "" + n);
const url = (l, slug) => "/" + LANGS[l].dir + (slug ? slug + "/" : "");

function rankList(c, l) {
  return c.r.map((r, j) => {
    const t = T[r[0]];
    const name = typeof t[0] === "string" ? t[0] : t[0][l];
    const href = t[1].startsWith("#") ? url(l, t[1].slice(1)) : t[1];
    const rel = href.startsWith("http") ? ' rel="noopener"' : "";
    return `<li${j === 0 ? ' class="first"' : ""}><span class="pos">${j + 1}</span><div><div class="tool"><a href="${esc(href)}"${rel}>${esc(name)}</a><span class="price">${esc(price(t[2], l))}</span></div><p class="why">${esc(r[1][l])}</p></div></li>`;
  }).join("");
}
function caseArticle(c, i, l, heading, link) {
  const title = link ? `<a href="${url(l, c.id)}">${esc(c.t[l])}</a>` : esc(c.t[l]);
  return `<article class="case" id="${c.id}"><span class="num">${esc(UI["case"][l])} ${pad(i + 1)}</span><${heading}>${title}</${heading}><p class="who">${esc(c.who[l])}</p><ol class="rank">${rankList(c, l)}</ol><p class="extra">${c.x[l]}</p></article>`;
}
function page(l, slug, title, desc, body, ld) {
  const alt = LANGS.map((L, k) => `<link rel="alternate" hreflang="${L.html}" href="${BASE}${url(k, slug)}">`).join("\n") + `\n<link rel="alternate" hreflang="x-default" href="${BASE}${url(0, slug)}">`;
  const sw = LANGS.map((L, k) => `<a href="${url(k, slug)}" lang="${L.html}"${k === l ? ' aria-current="true"' : ""}>${L.name}</a>`).join("");
  return `<!DOCTYPE html>
<html lang="${LANGS[l].html}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
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
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=IBM+Plex+Mono:wght@500&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/site.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<header class="top"><div class="wrap">
<a class="brand" href="${url(l)}">Stack<span>Podium</span></a>
<nav><a href="${url(l)}#cases">${esc(UI.nav1[l])}</a><a href="${url(l)}#method">${esc(UI.nav2[l])}</a><a href="${url(l)}#changes">${esc(UI.nav3[l])}</a></nav>
<div class="langs">${sw}</div>
</div></header>
<main>
${body}
<section class="newsletter"><div class="wrap"><div><h2>${esc(X.nlh[l])}</h2><p>${esc(X.nlp[l])}</p></div><a class="cta" href="https://stackpodium.beehiiv.com/subscribe" rel="noopener">${esc(X.nlb[l])}</a></div></section>
</main>
<footer><div class="wrap"><p class="flinks">${PAGES.map((P) => `<a href="${url(l, P.slug)}">${esc(P.label[l])}</a>`).join("")}</p><p>${esc(UI.foot1[l])}</p><p>${esc(UI.foot2[l])}</p><p>${esc(X.updated[l])}</p></div></footer>
</body>
</html>
`;
}
function write(rel, text) {
  const f = path.join(out, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, text);
}

const extraCss = `
.langs a{font-size:.85rem;padding:4px 10px;border-radius:5px;color:var(--muted);text-decoration:none}
.langs a:hover{color:var(--ink)}
.langs a[aria-current="true"]{background:var(--accent);color:var(--accent-ink);font-weight:600}
.case h2 a,.case h1 a{color:inherit;text-decoration:none}
.case h2 a:hover{text-decoration:underline}
.case h1{font-family:var(--display);font-weight:800;font-size:clamp(1.7rem,4vw,2.4rem);line-height:1.12;margin:2px 0 8px;letter-spacing:-.02em;text-wrap:balance}
.single{max-width:820px;margin:0 auto;padding:32px 20px 8px}
.crumb{font-size:.9rem;margin:0 0 14px}
.others{max-width:820px;margin:0 auto;padding:8px 20px 48px}
.others h2{font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);font-weight:600}
.others ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:8px}
.others a{display:block;padding:7px 12px;border:1px solid var(--line);border-radius:6px;background:var(--surface);color:var(--ink);text-decoration:none;font-size:.93rem}
.others a:hover{background:var(--tint)}
.newsletter{border-top:1px solid var(--line);background:var(--tint);padding:32px 0}
.newsletter .wrap{display:flex;flex-wrap:wrap;gap:16px 32px;align-items:center;justify-content:space-between}
.newsletter h2{font-family:var(--display);font-weight:800;font-size:1.5rem;letter-spacing:-.02em;margin:0 0 4px}
.newsletter p{margin:0;max-width:60ch;color:var(--muted)}
.cta{display:inline-block;padding:11px 22px;border-radius:8px;background:var(--accent);color:var(--accent-ink);font-weight:600;text-decoration:none}
.cta:hover{filter:brightness(1.1)}
.flinks{display:flex;flex-wrap:wrap;gap:6px 20px;margin:0 0 14px}
.flinks a{font-weight:600}
.prose{padding-bottom:40px}
.prose h1{font-family:var(--display);font-weight:800;font-size:clamp(1.8rem,4.5vw,2.6rem);line-height:1.1;letter-spacing:-.02em;margin:0 0 16px;text-wrap:balance}
.prose h2{font-family:var(--display);font-weight:600;font-size:1.25rem;margin:28px 0 8px}
.prose p,.prose li{max-width:66ch}
.prose ul{padding-left:1.2em;display:flex;flex-direction:column;gap:6px}
.note{color:var(--muted);font-size:.92rem;max-width:65ch;margin:18px 0 0}
`;
write("site.css", css + extraCss);

const urls = [];
LANGS.forEach((L, l) => {
  // home
  const rail = CASES.map((c, i) => `<li><a href="#${c.id}"><i>${pad(i + 1)}</i>${esc(c.t[l])}</a></li>`).join("");
  const cases = CASES.map((c, i) => caseArticle(c, i, l, "h2", true)).join("\n");
  const crit = CRIT.map((c) => `<li><span class="w">${c[0]}</span><h3>${esc(c[1][l])}</h3><p>${esc(c[2][l])}</p></li>`).join("");
  const news = NEWS.map((x) => `<li><time>${esc(x[0][l])}</time><div><h3>${esc(x[1][l])}</h3><p>${esc(x[2][l])} <a class="src" href="${esc(x[3])}" rel="noopener">${esc(UI.src[l])}: ${esc(x[4])}</a></p></div></li>`).join("");
  const home = `<div class="wrap intro"><h1>${esc(UI.h1[l])}</h1><p>${esc(UI.intro[l])}</p><div class="status"><span>${esc(UI.status[l])}</span></div></div>
<div class="wrap layout" id="cases"><aside class="rail"><h2>${esc(UI.rail[l])}</h2><ol>${rail}</ol></aside><div class="cases">${cases}</div></div>
<section class="block" id="method"><div class="wrap"><h2>${esc(UI.nav2[l])}</h2><p>${esc(UI.method[l])}</p><ul class="criteria">${crit}</ul></div></section>
<section class="block" id="changes"><div class="wrap"><h2>${esc(UI.newsh[l])}</h2><p>${esc(UI.newsp[l])}</p><ul class="news">${news}</ul></div></section>`;
  const homeLd = { "@context": "https://schema.org", "@type": "WebSite", name: "StackPodium", url: BASE + url(l), inLanguage: L.html, description: UI.intro[l] };
  write(L.dir + "index.html", page(l, "", "StackPodium | " + X.tagline[l], UI.intro[l], home, homeLd));
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

LANGS.forEach((L, l) => {
  PAGES.forEach((P) => {
    const body = `<div class="single prose"><p class="crumb"><a href="${url(l)}">${esc(X.all[l])}</a></p><h1>${esc(P.title[l])}</h1>${P.body[l]}</div>`;
    const ld = { "@context": "https://schema.org", "@type": "WebPage", name: P.title[l], description: P.desc[l], inLanguage: L.html, url: BASE + url(l, P.slug) };
    write(L.dir + P.slug + "/index.html", page(l, P.slug, P.title[l] + " | StackPodium", P.desc[l], body, ld));
    urls.push(url(l, P.slug));
  });
});

write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `<url><loc>${BASE}${u}</loc></url>`).join("\n")}\n</urlset>\n`);
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${BASE}/sitemap.xml\n`);
write("CNAME", domain + "\n");
write("llms.txt", `# StackPodium\n\n> ${X.tagline[0]}. Each use case has three ranked tools, the reason for each position and an entry price. Rankings are editorial, based on public documentation; prices were checked in October and November 2026.\n\n## Use cases\n\n${CASES.map((c) => `- [${c.t[0]}](${BASE}${url(0, c.id)}): ${c.r.map((r, j) => `${j + 1}. ${typeof T[r[0]][0] === "string" ? T[r[0]][0] : T[r[0]][0][0]}`).join(", ")}`).join("\n")}\n\n## Languages\n\n${LANGS.map((L, l) => `- [${L.name}](${BASE}${url(l)})`).join("\n")}\n`);
console.log("pages:", urls.length);
