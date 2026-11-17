// Static text pages. Every array is ordered: English, Português, Español, 中文.
const EMAIL = "sponsors@stackpodium.com";
const mail = `<a href="mailto:${EMAIL}">${EMAIL}</a>`;

// SPONSOR_EMAIL is the only sponsorship address. Privacy mail stays on EMAIL.
// To use a stackpodium.com inbox later (for example sponsors@stackpodium.com),
// change this constant and rebuild. Do not paste the address into the HTML.
// The sponsor page keeps the static markup free of a mailto that already
// contains the address: the browser joins the local part and the host,
// and a plain-text fallback stays visible if that script does not run.
// SPONSOR_PRICES are launch rates in USD, valid until May 2027.
// bundle is one month of site placement plus one Friday newsletter slot.
// The separate total is derived so the saving stays equal to placement + newsletter − bundle.
const SPONSOR_EMAIL = "sponsors@stackpodium.com";
const SPONSOR_SUBJECT = "Sponsoring StackPodium";
const SPONSOR_PRICES = { newsletter: 49, placement: 99, launch: 19, bundle: 129 };
const BUNDLE_SEPARATE = SPONSOR_PRICES.placement + SPONSOR_PRICES.newsletter;
const BUNDLE_SAVE = BUNDLE_SEPARATE - SPONSOR_PRICES.bundle;

if (!/^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(SPONSOR_EMAIL)) {
  throw new Error("SPONSOR_EMAIL must be one plain address, set only in this constant");
}

const he = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const usd = (n) => "$" + n;

function offer(title, amount, period, text, note) {
  const klass = note ? "offer bundle" : "offer";
  const save = note ? `<p class="save">${he(note)}</p>` : "";
  return `<article class="${klass}"><h3>${he(title)}</h3><p class="amt">${usd(amount)}<span>${he(period)}</span></p>${save}<p>${he(text)}</p></article>`;
}

// Button starts as a subject-only mailto. The script fills in SPONSOR_EMAIL.
function sponsorMail(emailLabel, dmLabel, fallbackBefore, fallbackAfter) {
  const at = SPONSOR_EMAIL.indexOf("@");
  const user = SPONSOR_EMAIL.slice(0, at);
  const host = SPONSOR_EMAIL.slice(at + 1);
  const subjectParam = encodeURIComponent(SPONSOR_SUBJECT);
  return `<p class="sponsor-actions"><a class="cta" id="sponsor-mail" href="mailto:?subject=${subjectParam}">${he(emailLabel)}</a><a class="cta secondary" href="https://x.com/stackpodium" rel="noopener">${he(dmLabel)}</a></p>
<p id="sponsor-contact">${he(fallbackBefore)} <span id="sponsor-plain">${he(user)} [at] ${he(host)}</span>${he(fallbackAfter)} ${he(SPONSOR_SUBJECT)}.</p>
<script>
(function () {
  var addr = ${JSON.stringify(user)} + "@" + ${JSON.stringify(host)};
  var href = "mailto:" + addr + "?subject=" + encodeURIComponent(${JSON.stringify(SPONSOR_SUBJECT)});
  var button = document.getElementById("sponsor-mail");
  if (button) button.href = href;
  var plain = document.getElementById("sponsor-plain");
  if (!plain) return;
  var link = document.createElement("a");
  link.href = href;
  link.textContent = addr;
  plain.textContent = "";
  plain.appendChild(link);
})();
</script>`;
}

module.exports = [
  {
    slug: "sponsor",
    label: ["Sponsor", "Patrocinar", "Patrocinar", "赞助"],
    title: ["Sponsor StackPodium", "Patrocine o StackPodium", "Patrocina StackPodium", "赞助 StackPodium"],
    desc: [
      `Launch rates, valid until May 2027: newsletter slot ${usd(SPONSOR_PRICES.newsletter)}, site placement ${usd(SPONSOR_PRICES.placement)} a month, both for ${usd(SPONSOR_PRICES.bundle)}, launch mention ${usd(SPONSOR_PRICES.launch)}. Sponsorship never changes a ranking.`,
      `Tarifas de lançamento, válidas até maio de 2027: vaga no boletim ${usd(SPONSOR_PRICES.newsletter)}, espaço no site ${usd(SPONSOR_PRICES.placement)} por mês, os dois por ${usd(SPONSOR_PRICES.bundle)}, menção de lançamento ${usd(SPONSOR_PRICES.launch)}. Patrocínio nunca muda um ranking.`,
      `Tarifas de lanzamiento, válidas hasta mayo de 2027: hueco en el boletín ${usd(SPONSOR_PRICES.newsletter)}, espacio en la web ${usd(SPONSOR_PRICES.placement)} al mes, ambos por ${usd(SPONSOR_PRICES.bundle)}, mención de lanzamiento ${usd(SPONSOR_PRICES.launch)}. El patrocinio nunca cambia un ranking.`,
      `上线价格，有效期至 2027 年 5 月：邮件位 ${usd(SPONSOR_PRICES.newsletter)}，站内展示位每月 ${usd(SPONSOR_PRICES.placement)}，两项合购 ${usd(SPONSOR_PRICES.bundle)}，发布提及 ${usd(SPONSOR_PRICES.launch)}。赞助绝不改变排名。`,
    ],
    body: [
      `<p>StackPodium is for builders and vibe coders who are choosing an AI tool. Each page answers one question: what should I build this with? A sponsor reaches them at that decision.</p>
<h2>Who you reach</h2>
<p>People who already have a job to do. Ten use cases, three ranked tools on each, with the reason for the rank and an entry price: a first web app, a SaaS MVP, an interface, a mobile app, an AI editor, a coding agent, an automation, a custom agent, a browser game, an internal tool.</p>
<p>The same audience can follow the <a href="https://stackpodium.beehiiv.com/" rel="noopener">Friday newsletter</a> and <a href="https://x.com/stackpodium" rel="noopener">@stackpodium</a> on X.</p>
<h2>What you can buy</h2>
<p class="rate-label">Launch rates, valid until May 2027.</p>
<p>The prices are in US dollars and rise as the audience grows.</p>
<div class="offers">
${offer("Newsletter sponsor slot", SPONSOR_PRICES.newsletter, "per Friday issue", "One sponsor per issue. Your note runs in that email, labelled Sponsored, and it is not shared with a second sponsor. After the send, we pass on the send, open, and click counts beehiiv reports for that issue. We do not estimate numbers we do not have.")}
${offer("Sponsored placement on the site", SPONSOR_PRICES.placement, "per month", "A placement labelled Sponsored, kept separate from the editorial rankings. It never moves a tool up or down a podium. Paying does not buy a rank.")}
${offer("Site placement and Friday newsletter", SPONSOR_PRICES.bundle, "one month and one Friday issue", "One month of labelled Sponsored placement on the site, plus one Friday newsletter slot. The placement never moves a tool on a podium. The email note is labelled Sponsored and is not shared with a second sponsor. After the send, we pass on the send, open, and click counts beehiiv reports for that issue. We do not estimate numbers we do not have. Paying does not buy a rank.", `Normally ${usd(BUNDLE_SEPARATE)} if bought separately. You save ${usd(BUNDLE_SAVE)}.`)}
${offer("Featured launch mention", SPONSOR_PRICES.launch, "one time", "One labelled mention of a launch or release, next to the site's change notes. It is not a ranking change. The exclusive line in a Friday email is the newsletter slot, not this mention.")}
</div>
<p>Launch rates, valid until May 2027. StackPodium launched on 16 November 2026 and is a new publication. We share traffic, subscriber, and open-rate figures on request. We do not publish them on this page.</p>
<h2>Editorial independence</h2>
<ul class="policy">
<li>Sponsorship never affects rankings. Order follows the published scoring method, not who pays.</li>
<li>Sponsored items are always labelled Sponsored, and they stay visually separate from the podium.</li>
<li>Affiliate links, if any are added later, are disclosed on the page. They do not change the order.</li>
<li>We can decline a sponsor. The tool has to be something a builder or vibe coder would actually consider.</li>
</ul>
<p class="label-sample"><span class="sponsored-tag">Sponsored</span> Paid placements wear this label. They sit outside the ranking.</p>
<h2>Contact</h2>
<p>Say which tool and which offer. We reply with the audience metrics we actually have.</p>
${sponsorMail("Email us about sponsoring", "DM @stackpodium on X", "If the button does not open a draft, write to", " with the subject")}`,
      `<p>O StackPodium é para builders e vibe coders que estão escolhendo uma ferramenta de IA. Cada página responde a uma pergunta: com o que eu construo isso? Um patrocinador chega nessa decisão.</p>
<h2>Quem você alcança</h2>
<p>Gente que já tem um trabalho para fazer. Dez casos de uso, três ferramentas ranqueadas em cada um, com o motivo da posição e um preço de entrada: um primeiro app, um MVP de SaaS, uma interface, um app móvel, um editor de IA, um agente de código, uma automação, um agente sob medida, um jogo de navegador, uma ferramenta interna.</p>
<p>A mesma audiência pode acompanhar o <a href="https://stackpodium.beehiiv.com/" rel="noopener">boletim de sexta</a> e <a href="https://x.com/stackpodium" rel="noopener">@stackpodium</a> no X.</p>
<h2>O que você pode comprar</h2>
<p class="rate-label">Tarifas de lançamento, válidas até maio de 2027.</p>
<p>Os preços estão em dólares e sobem conforme a audiência cresce.</p>
<div class="offers">
${offer("Vaga de patrocínio no boletim", SPONSOR_PRICES.newsletter, "por edição de sexta", "Um patrocinador por edição. A sua nota entra nesse e-mail, identificada como Patrocinado, e não é dividida com um segundo patrocinador. Depois do envio, repassamos os números de envio, abertura e clique que a beehiiv informar daquela edição. Não estimamos números que não temos.")}
${offer("Espaço patrocinado no site", SPONSOR_PRICES.placement, "por mês", "Um espaço identificado como Patrocinado, separado dos rankings editoriais. Nunca faz uma ferramenta subir ou descer no pódio. Pagar não compra uma posição.")}
${offer("Espaço no site e boletim de sexta", SPONSOR_PRICES.bundle, "um mês e uma edição de sexta", "Um mês de espaço identificado como Patrocinado no site, mais uma vaga no boletim de sexta. O espaço nunca faz uma ferramenta subir ou descer no pódio. A nota do e-mail entra identificada como Patrocinado e não é dividida com um segundo patrocinador. Depois do envio, repassamos os números de envio, abertura e clique que a beehiiv informar daquela edição. Não estimamos números que não temos. Pagar não compra uma posição.", `Separados, seriam ${usd(BUNDLE_SEPARATE)}. Você economiza ${usd(BUNDLE_SAVE)}.`)}
${offer("Menção de lançamento", SPONSOR_PRICES.launch, "uma vez", "Uma menção identificada de um lançamento, ao lado das notas de mudança do site. Não é uma mudança de ranking. A linha exclusiva no e-mail de sexta é a vaga do boletim, não esta menção.")}
</div>
<p>Tarifas de lançamento, válidas até maio de 2027. O StackPodium foi lançado em 16 de novembro de 2026 e é uma publicação nova. Compartilhamos tráfego, assinantes e taxa de abertura sob pedido. Não publicamos esses números nesta página.</p>
<h2>Independência editorial</h2>
<ul class="policy">
<li>Patrocínio nunca afeta os rankings. A ordem segue o método de avaliação publicado, não quem paga.</li>
<li>Todo item patrocinado leva o rótulo Patrocinado e fica visualmente separado do pódio.</li>
<li>Links de afiliado, se forem adicionados depois, são divulgados na página. Não mudam a ordem.</li>
<li>Podemos recusar um patrocinador. A ferramenta precisa ser algo que um builder ou vibe coder realmente consideraria.</li>
</ul>
<p class="label-sample"><span class="sponsored-tag">Patrocinado</span> Espaços pagos usam este rótulo. Ficam fora do ranking.</p>
<h2>Contato</h2>
<p>Diga qual é a ferramenta e qual oferta você quer. Respondemos com as métricas de audiência que de fato temos.</p>
${sponsorMail("Escrever sobre um patrocínio", "Mandar DM para @stackpodium no X", "Se o botão não abrir um rascunho, escreva para", " com o assunto")}`,
      `<p>StackPodium es para builders y vibe coders que están eligiendo una herramienta de IA. Cada página responde a una pregunta: ¿con qué construyo esto? Un patrocinador llega en esa decisión.</p>
<h2>A quién llegas</h2>
<p>Gente que ya tiene un trabajo que hacer. Diez casos de uso, tres herramientas en cada podio, con el motivo del puesto y un precio de entrada: una primera app, un MVP de SaaS, una interfaz, una app móvil, un editor de IA, un agente de código, una automatización, un agente a medida, un juego de navegador, una herramienta interna.</p>
<p>La misma audiencia puede seguir el <a href="https://stackpodium.beehiiv.com/" rel="noopener">boletín del viernes</a> y <a href="https://x.com/stackpodium" rel="noopener">@stackpodium</a> en X.</p>
<h2>Qué puedes comprar</h2>
<p class="rate-label">Tarifas de lanzamiento, válidas hasta mayo de 2027.</p>
<p>Los precios están en dólares y suben a medida que crece la audiencia.</p>
<div class="offers">
${offer("Hueco de patrocinio en el boletín", SPONSOR_PRICES.newsletter, "por número del viernes", "Un patrocinador por número. Tu nota va en ese correo, marcada como Patrocinado, y no se comparte con un segundo patrocinador. Después del envío te pasamos los envíos, las aperturas y los clics que beehiiv informe de ese número. No estimamos cifras que no tenemos.")}
${offer("Espacio patrocinado en la web", SPONSOR_PRICES.placement, "al mes", "Un espacio marcado como Patrocinado, separado de los rankings editoriales. Nunca sube ni baja una herramienta en un podio. Pagar no compra un puesto.")}
${offer("Espacio en la web y boletín del viernes", SPONSOR_PRICES.bundle, "un mes y un número del viernes", "Un mes de espacio marcado como Patrocinado en la web, más un hueco en el boletín del viernes. El espacio nunca sube ni baja una herramienta en un podio. La nota del correo va marcada como Patrocinado y no se comparte con un segundo patrocinador. Después del envío te pasamos los envíos, las aperturas y los clics que beehiiv informe de ese número. No estimamos cifras que no tenemos. Pagar no compra un puesto.", `Por separado serían ${usd(BUNDLE_SEPARATE)}. Ahorras ${usd(BUNDLE_SAVE)}.`)}
${offer("Mención de lanzamiento", SPONSOR_PRICES.launch, "una vez", "Una mención marcada de un lanzamiento, junto a las notas de cambios del sitio. No es un cambio de ranking. La línea exclusiva del correo del viernes es el hueco del boletín, no esta mención.")}
</div>
<p>Tarifas de lanzamiento, válidas hasta mayo de 2027. StackPodium se lanzó el 16 de noviembre de 2026 y es una publicación nueva. Compartimos tráfico, suscriptores y tasa de apertura a quien los pida. No publicamos esas cifras en esta página.</p>
<h2>Independencia editorial</h2>
<ul class="policy">
<li>El patrocinio nunca afecta a los rankings. El orden sigue el método de puntuación publicado, no quién paga.</li>
<li>Todo lo patrocinado lleva la etiqueta Patrocinado y queda separado visualmente del podio.</li>
<li>Los enlaces de afiliado, si se añaden más adelante, se indican en la página. No cambian el orden.</li>
<li>Podemos decir que no. La herramienta tiene que ser algo que un builder o un vibe coder se plantearía de verdad.</li>
</ul>
<p class="label-sample"><span class="sponsored-tag">Patrocinado</span> Los espacios de pago llevan esta etiqueta. Quedan fuera del ranking.</p>
<h2>Contacto</h2>
<p>Dinos la herramienta y la oferta. Respondemos con las métricas de audiencia que de verdad tenemos.</p>
${sponsorMail("Escríbenos sobre un patrocinio", "DM a @stackpodium en X", "Si el botón no abre un borrador, escribe a", " con el asunto")}`,
      `<p>StackPodium 面向正在挑选 AI 工具的开发者和 vibe coder。每个页面只回答一个问题：这个东西我该用什么来做？赞助商在这个决定发生时触达他们。</p>
<h2>你会触达谁</h2>
<p>来的人已经有一件事要做。十个使用场景，每个场景三款上榜工具，并写明名次理由和入门价格：第一个网页应用、SaaS MVP、界面、移动应用、AI 编辑器、编程代理、自动化、定制代理、浏览器游戏、内部工具。</p>
<p>同一批读者也可以订阅<a href="https://stackpodium.beehiiv.com/" rel="noopener">周五邮件</a>，并在 X 上关注 <a href="https://x.com/stackpodium" rel="noopener">@stackpodium</a>。</p>
<h2>可以购买的位置</h2>
<p class="rate-label">上线价格，有效期至 2027 年 5 月。</p>
<p>价格为美元，会随受众增长而上调。</p>
<div class="offers">
${offer("邮件赞助位", SPONSOR_PRICES.newsletter, "每期周五邮件", "每期只有一个赞助商。你的说明出现在该期邮件中，并标明“赞助”，不会与第二家赞助商分享。发出后，我们转交 beehiiv 报告的该期发送量、打开数和点击数。我们不编造没有的数字。")}
${offer("站内赞助展示位", SPONSOR_PRICES.placement, "每月", "一个标明“赞助”的展示位，与编辑排名分开。绝不会让某个工具在榜单上升或下降。付费不能买到名次。")}
${offer("站内展示位加周五邮件", SPONSOR_PRICES.bundle, "一个月加一期周五邮件", "一个月标明“赞助”的站内展示位，外加一期周五邮件赞助位。展示位绝不会让某个工具在榜单上升或下降。邮件说明会标明“赞助”，且不会与第二家赞助商分享。发出后，我们转交 beehiiv 报告的该期发送量、打开数和点击数。我们不编造没有的数字。付费不能买到名次。", `分开购买为 ${usd(BUNDLE_SEPARATE)}。可省 ${usd(BUNDLE_SAVE)}。`)}
${offer("发布提及", SPONSOR_PRICES.launch, "一次", "对一次发布做标明“赞助”的提及，放在网站的变化说明旁。这不是排名变动。周五邮件里的独家位置是邮件赞助位，不是这项提及。")}
</div>
<p>上线价格，有效期至 2027 年 5 月。StackPodium 于 2026 年 11 月 16 日上线，是一份新刊物。流量、订阅数和打开率只在来信索取时提供。本页不公布这些数字。</p>
<h2>编辑独立</h2>
<ul class="policy">
<li>赞助绝不影响排名。名次只依据公开的评分方法，不看谁付费。</li>
<li>所有赞助内容都会标明“赞助”，并在视觉上与榜单分开。</li>
<li>如果以后加入联盟链接，会在页面上披露。联盟链接不改变名次。</li>
<li>我们可以拒绝赞助。工具必须是开发者或 vibe coder 真正会考虑的东西。</li>
</ul>
<p class="label-sample"><span class="sponsored-tag">赞助</span> 付费位置都使用这个标签，并且位于排名之外。</p>
<h2>联系</h2>
<p>请说明工具和想买的项目。我们会回复实际掌握的受众数据。</p>
${sponsorMail("发邮件咨询赞助", "在 X 上私信 @stackpodium", "如果按钮没有打开邮件草稿，请写给", "，主题为")}`,
    ],
  },
  {
    slug: "privacy",
    label: ["Privacy", "Privacidade", "Privacidad", "隐私"],
    title: ["Privacy", "Privacidade", "Privacidad", "隐私说明"],
    desc: [
      "What data StackPodium handles: no accounts, no cookies of our own, no analytics, and a newsletter run through beehiiv.",
      "Quais dados o StackPodium trata: sem contas, sem cookies próprios, sem analytics e um boletim enviado pela beehiiv.",
      "Qué datos trata StackPodium: sin cuentas, sin cookies propias, sin analítica y un boletín gestionado con beehiiv.",
      "StackPodium 处理哪些数据：无账户、无自有 Cookie、无统计分析，邮件订阅通过 beehiiv 进行。",
    ],
    body: [
      `<p>StackPodium is run from Spain. For any privacy question or request, write to ${mail}.</p>
<h2>This website</h2>
<ul><li>There are no accounts, and we set no cookies of our own.</li><li>The newsletter form does not save what you type. Submitting it opens beehiiv's subscribe page and includes the email address in that link.</li><li>We do not run analytics or advertising trackers.</li><li>The site is hosted on GitHub Pages. Like any host, GitHub receives your IP address and may keep it in server logs for security and operation.</li><li>Fonts are loaded from Google Fonts, so your browser connects to Google's servers when a page loads.</li></ul>
<h2>The newsletter</h2>
<ul><li>You finish subscribing on a page run by beehiiv, our email provider, based in the United States (<a href="https://stackpodium.beehiiv.com/subscribe">stackpodium.beehiiv.com</a>). The form on this site only sends you there. beehiiv stores your email address and records opens and clicks.</li><li>We use your address only to send the newsletter. We do not sell it or share it with sponsors.</li><li>Every email has an unsubscribe link. You can also ask us to delete your data.</li></ul>
<h2>Links to other sites</h2>
<p>We link to the tools we rank. Those sites have their own privacy policies. If we add affiliate links, they will be labelled.</p>
<h2>Your rights</h2>
<p>Under the GDPR you can ask to access, correct or delete your data, or object to its use, by writing to the address above. You can also complain to the Spanish data protection authority (AEPD).</p>`,
      `<p>O StackPodium é gerido a partir da Espanha. Para qualquer dúvida ou pedido sobre privacidade, escreva para ${mail}.</p>
<h2>Este site</h2>
<ul><li>Não há contas, e não definimos cookies próprios.</li><li>O formulário do boletim não guarda o que você digita. Ao enviar, ele abre a página de assinatura da beehiiv e inclui o e-mail nesse link.</li><li>Não usamos analytics nem rastreadores de publicidade.</li><li>O site é hospedado no GitHub Pages. Como qualquer hospedagem, o GitHub recebe o seu endereço IP e pode guardá-lo em registros do servidor por segurança e operação.</li><li>As fontes são carregadas do Google Fonts, então o seu navegador se conecta aos servidores do Google ao abrir uma página.</li></ul>
<h2>O boletim</h2>
<ul><li>A assinatura é concluída em uma página da beehiiv, nosso provedor de e-mail, com sede nos Estados Unidos (<a href="https://stackpodium.beehiiv.com/subscribe">stackpodium.beehiiv.com</a>). O formulário deste site só leva você até lá. A beehiiv guarda o seu e-mail e registra aberturas e cliques.</li><li>Usamos o seu endereço apenas para enviar o boletim. Não o vendemos nem o compartilhamos com patrocinadores.</li><li>Todo e-mail tem um link para cancelar a assinatura. Você também pode pedir que apaguemos os seus dados.</li></ul>
<h2>Links para outros sites</h2>
<p>Linkamos para as ferramentas que avaliamos. Esses sites têm suas próprias políticas de privacidade. Se adicionarmos links de afiliado, eles serão identificados.</p>
<h2>Seus direitos</h2>
<p>Pelo RGPD, você pode pedir acesso, correção ou exclusão dos seus dados, ou se opor ao uso deles, escrevendo para o endereço acima. Também pode reclamar à autoridade espanhola de proteção de dados (AEPD).</p>`,
      `<p>StackPodium se gestiona desde España. Para cualquier duda o solicitud sobre privacidad, escribe a ${mail}.</p>
<h2>Esta web</h2>
<ul><li>No hay cuentas, y no instalamos cookies propias.</li><li>El formulario del boletín no guarda lo que escribes. Al enviarlo se abre la página de alta de beehiiv e incluye el correo en ese enlace.</li><li>No usamos analítica ni rastreadores publicitarios.</li><li>La web está alojada en GitHub Pages. Como cualquier alojamiento, GitHub recibe tu dirección IP y puede guardarla en registros del servidor por seguridad y funcionamiento.</li><li>Las fuentes se cargan desde Google Fonts, así que tu navegador se conecta a los servidores de Google al abrir una página.</li></ul>
<h2>El boletín</h2>
<ul><li>El alta se completa en una página de beehiiv, nuestro proveedor de correo, con sede en Estados Unidos (<a href="https://stackpodium.beehiiv.com/subscribe">stackpodium.beehiiv.com</a>). El formulario de esta web solo te lleva allí. beehiiv guarda tu correo y registra aperturas y clics.</li><li>Usamos tu dirección solo para enviar el boletín. No la vendemos ni la compartimos con patrocinadores.</li><li>Cada correo incluye un enlace para darte de baja. También puedes pedirnos que borremos tus datos.</li></ul>
<h2>Enlaces a otras webs</h2>
<p>Enlazamos a las herramientas que valoramos. Esas webs tienen sus propias políticas de privacidad. Si añadimos enlaces de afiliado, estarán marcados.</p>
<h2>Tus derechos</h2>
<p>Según el RGPD, puedes pedir el acceso, la rectificación o la supresión de tus datos, u oponerte a su uso, escribiendo a la dirección de arriba. También puedes reclamar ante la Agencia Española de Protección de Datos (AEPD).</p>`,
      `<p>StackPodium 在西班牙运营。如有任何隐私方面的问题或请求，请发邮件至 ${mail}。</p>
<h2>本网站</h2>
<ul><li>本站没有账户，我们也不设置任何自有 Cookie。</li><li>邮件订阅表单不会保存你输入的内容。提交后会打开 beehiiv 的订阅页，并在链接中带上邮箱地址。</li><li>我们不使用统计分析或广告追踪工具。</li><li>本站托管在 GitHub Pages。与任何托管服务一样，GitHub 会收到你的 IP 地址，并可能出于安全和运行需要将其保存在服务器日志中。</li><li>字体从 Google Fonts 加载，因此打开页面时你的浏览器会连接 Google 的服务器。</li></ul>
<h2>邮件订阅</h2>
<ul><li>订阅在我们的邮件服务商 beehiiv（总部位于美国，<a href="https://stackpodium.beehiiv.com/subscribe">stackpodium.beehiiv.com</a>）的页面上完成。本站的表单只是把你带到那里。beehiiv 会保存你的邮箱地址，并记录打开和点击情况。</li><li>我们只用你的地址发送邮件，不会出售，也不会提供给赞助商。</li><li>每封邮件都有退订链接。你也可以要求我们删除你的数据。</li></ul>
<h2>外部链接</h2>
<p>我们会链接到所排名的工具。这些网站有各自的隐私政策。如果将来加入联盟链接，会明确标注。</p>
<h2>你的权利</h2>
<p>根据 GDPR，你可以写信到上述地址，要求查阅、更正或删除你的数据，或反对其使用。你也可以向西班牙数据保护机构（AEPD）投诉。</p>`,
    ],
  },
];

// Prices travel with the page list so llms.txt can quote them without a second copy.
module.exports.SPONSOR_PRICES = SPONSOR_PRICES;
