// Static text pages. Every array is ordered: English, Português, Español, 中文.
const EMAIL = "joanpau.ch22@gmail.com";
const mail = `<a href="mailto:${EMAIL}">${EMAIL}</a>`;

module.exports = [
  {
    slug: "sponsor",
    label: ["Sponsor", "Patrocinar", "Patrocinar", "赞助"],
    title: ["Sponsor StackPodium", "Patrocine o StackPodium", "Patrocina StackPodium", "赞助 StackPodium"],
    desc: [
      "Reach vibe coders and builders at the moment they choose their tools. Labelled placements that never change a ranking.",
      "Alcance vibe coders e builders no momento em que escolhem suas ferramentas. Espaços identificados que nunca mudam um ranking.",
      "Llega a vibe coders y builders en el momento en que eligen sus herramientas. Espacios marcados que nunca cambian un ranking.",
      "在 vibe coder 和开发者挑选工具的那一刻触达他们。赞助位明确标注，绝不影响排名。",
    ],
    body: [
      `<p>StackPodium is read by people who are about to pick a tool: each page answers one question, “what should I build this with?”. A sponsor reaches them at that moment.</p>
<h2>What you can sponsor</h2>
<ul><li><b>The weekly email.</b> One sponsor per issue, at the top, marked as sponsored.</li><li><b>A use-case page.</b> One sponsored card next to the podium, marked as sponsored and visually separate from the ranking.</li><li><b>A launch note.</b> Your release in “What changed”, marked as sponsored.</li></ul>
<h2>Our rules</h2>
<ul><li>Sponsorship never moves a tool up or down a podium. Rankings follow the published scoring method.</li><li>Every paid placement is labelled.</li><li>We only accept tools that fit builders, and we may decline.</li><li>You get a report with the real numbers: sends, opens and clicks. We do not estimate or inflate.</li></ul>
<h2>Where we are</h2>
<p>StackPodium launched in November 2026. We share current traffic and subscriber figures on request, and first sponsors get launch pricing.</p>
<h2>Contact</h2>
<p>Write to ${mail} with your tool and what you would like to sponsor.</p>`,
      `<p>O StackPodium é lido por quem está prestes a escolher uma ferramenta: cada página responde a uma pergunta, “com o que eu construo isso?”. Um patrocinador alcança essas pessoas nesse momento.</p>
<h2>O que você pode patrocinar</h2>
<ul><li><b>O e-mail semanal.</b> Um patrocinador por edição, no topo, identificado como patrocinado.</li><li><b>Uma página de caso de uso.</b> Um cartão patrocinado ao lado do pódio, identificado e visualmente separado do ranking.</li><li><b>Uma nota de lançamento.</b> Seu lançamento em “O que mudou”, identificado como patrocinado.</li></ul>
<h2>Nossas regras</h2>
<ul><li>Patrocínio nunca faz uma ferramenta subir ou descer no pódio. Os rankings seguem o método de avaliação publicado.</li><li>Todo espaço pago é identificado.</li><li>Só aceitamos ferramentas que façam sentido para builders, e podemos recusar.</li><li>Você recebe um relatório com os números reais: envios, aberturas e cliques. Não estimamos nem inflamos.</li></ul>
<h2>Onde estamos</h2>
<p>O StackPodium foi lançado em novembro de 2026. Compartilhamos os números atuais de tráfego e assinantes sob pedido, e os primeiros patrocinadores têm preço de lançamento.</p>
<h2>Contato</h2>
<p>Escreva para ${mail} com a sua ferramenta e o que gostaria de patrocinar.</p>`,
      `<p>StackPodium lo lee gente que está a punto de elegir una herramienta: cada página responde a una pregunta, «¿con qué construyo esto?». Un patrocinador llega a esas personas en ese momento.</p>
<h2>Qué puedes patrocinar</h2>
<ul><li><b>El correo semanal.</b> Un patrocinador por número, arriba, marcado como patrocinado.</li><li><b>Una página de caso de uso.</b> Una tarjeta patrocinada junto al podio, marcada y separada visualmente del ranking.</li><li><b>Una nota de lanzamiento.</b> Tu lanzamiento en «Novedades», marcado como patrocinado.</li></ul>
<h2>Nuestras reglas</h2>
<ul><li>El patrocinio nunca sube ni baja una herramienta en un podio. Los rankings siguen el método de puntuación publicado.</li><li>Todo espacio de pago va marcado.</li><li>Solo aceptamos herramientas que encajen con builders, y podemos decir que no.</li><li>Recibes un informe con las cifras reales: envíos, aperturas y clics. No estimamos ni inflamos.</li></ul>
<h2>Dónde estamos</h2>
<p>StackPodium se lanzó en noviembre de 2026. Compartimos las cifras actuales de tráfico y suscriptores a quien las pida, y los primeros patrocinadores tienen precio de lanzamiento.</p>
<h2>Contacto</h2>
<p>Escribe a ${mail} con tu herramienta y lo que te gustaría patrocinar.</p>`,
      `<p>StackPodium 的读者正准备挑选工具：每个页面只回答一个问题——“这个东西我该用什么来做？”。赞助商正是在这一刻触达他们。</p>
<h2>可赞助的位置</h2>
<ul><li><b>每周邮件。</b>每期只有一个赞助商，位于顶部，并标注为赞助。</li><li><b>使用场景页面。</b>榜单旁的一张赞助卡片，标注为赞助，并在视觉上与排名分开。</li><li><b>发布消息。</b>你的新发布出现在“最近变化”中，并标注为赞助。</li></ul>
<h2>我们的规则</h2>
<ul><li>赞助绝不会让某个工具在榜单上升或下降。排名只依据公开的评分方法。</li><li>所有付费位置都会标注。</li><li>我们只接受适合开发者的工具，并保留拒绝的权利。</li><li>你会收到一份包含真实数据的报告：发送量、打开数和点击数。我们不估算，也不夸大。</li></ul>
<h2>目前的情况</h2>
<p>StackPodium 于 2026 年 11 月上线。如有需要，我们会提供当前的流量和订阅数据；首批赞助商享受上线优惠价。</p>
<h2>联系方式</h2>
<p>请发邮件至 ${mail}，告诉我们你的工具以及想赞助的位置。</p>`,
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
<ul><li>There are no accounts and no forms on this site, and we set no cookies of our own.</li><li>We do not run analytics or advertising trackers.</li><li>The site is hosted on GitHub Pages. Like any host, GitHub receives your IP address and may keep it in server logs for security and operation.</li><li>Fonts are loaded from Google Fonts, so your browser connects to Google's servers when a page loads.</li></ul>
<h2>The newsletter</h2>
<ul><li>You subscribe on a page run by beehiiv, our email provider, based in the United States. beehiiv stores your email address and records opens and clicks.</li><li>We use your address only to send the newsletter. We do not sell it or share it with sponsors.</li><li>Every email has an unsubscribe link. You can also ask us to delete your data.</li></ul>
<h2>Links to other sites</h2>
<p>We link to the tools we rank. Those sites have their own privacy policies. If we add affiliate links, they will be labelled.</p>
<h2>Your rights</h2>
<p>Under the GDPR you can ask to access, correct or delete your data, or object to its use, by writing to the address above. You can also complain to the Spanish data protection authority (AEPD).</p>`,
      `<p>O StackPodium é gerido a partir da Espanha. Para qualquer dúvida ou pedido sobre privacidade, escreva para ${mail}.</p>
<h2>Este site</h2>
<ul><li>Não há contas nem formulários neste site, e não definimos cookies próprios.</li><li>Não usamos analytics nem rastreadores de publicidade.</li><li>O site é hospedado no GitHub Pages. Como qualquer hospedagem, o GitHub recebe o seu endereço IP e pode guardá-lo em registros do servidor por segurança e operação.</li><li>As fontes são carregadas do Google Fonts, então o seu navegador se conecta aos servidores do Google ao abrir uma página.</li></ul>
<h2>O boletim</h2>
<ul><li>A assinatura é feita em uma página da beehiiv, nosso provedor de e-mail, com sede nos Estados Unidos. A beehiiv guarda o seu e-mail e registra aberturas e cliques.</li><li>Usamos o seu endereço apenas para enviar o boletim. Não o vendemos nem o compartilhamos com patrocinadores.</li><li>Todo e-mail tem um link para cancelar a assinatura. Você também pode pedir que apaguemos os seus dados.</li></ul>
<h2>Links para outros sites</h2>
<p>Linkamos para as ferramentas que avaliamos. Esses sites têm suas próprias políticas de privacidade. Se adicionarmos links de afiliado, eles serão identificados.</p>
<h2>Seus direitos</h2>
<p>Pelo RGPD, você pode pedir acesso, correção ou exclusão dos seus dados, ou se opor ao uso deles, escrevendo para o endereço acima. Também pode reclamar à autoridade espanhola de proteção de dados (AEPD).</p>`,
      `<p>StackPodium se gestiona desde España. Para cualquier duda o solicitud sobre privacidad, escribe a ${mail}.</p>
<h2>Esta web</h2>
<ul><li>No hay cuentas ni formularios en esta web, y no instalamos cookies propias.</li><li>No usamos analítica ni rastreadores publicitarios.</li><li>La web está alojada en GitHub Pages. Como cualquier alojamiento, GitHub recibe tu dirección IP y puede guardarla en registros del servidor por seguridad y funcionamiento.</li><li>Las fuentes se cargan desde Google Fonts, así que tu navegador se conecta a los servidores de Google al abrir una página.</li></ul>
<h2>El boletín</h2>
<ul><li>El alta se hace en una página de beehiiv, nuestro proveedor de correo, con sede en Estados Unidos. beehiiv guarda tu correo y registra aperturas y clics.</li><li>Usamos tu dirección solo para enviar el boletín. No la vendemos ni la compartimos con patrocinadores.</li><li>Cada correo incluye un enlace para darte de baja. También puedes pedirnos que borremos tus datos.</li></ul>
<h2>Enlaces a otras webs</h2>
<p>Enlazamos a las herramientas que valoramos. Esas webs tienen sus propias políticas de privacidad. Si añadimos enlaces de afiliado, estarán marcados.</p>
<h2>Tus derechos</h2>
<p>Según el RGPD, puedes pedir el acceso, la rectificación o la supresión de tus datos, u oponerte a su uso, escribiendo a la dirección de arriba. También puedes reclamar ante la Agencia Española de Protección de Datos (AEPD).</p>`,
      `<p>StackPodium 在西班牙运营。如有任何隐私方面的问题或请求，请发邮件至 ${mail}。</p>
<h2>本网站</h2>
<ul><li>本站没有账户，也没有表单，我们不设置任何自有 Cookie。</li><li>我们不使用统计分析或广告追踪工具。</li><li>本站托管在 GitHub Pages。与任何托管服务一样，GitHub 会收到你的 IP 地址，并可能出于安全和运行需要将其保存在服务器日志中。</li><li>字体从 Google Fonts 加载，因此打开页面时你的浏览器会连接 Google 的服务器。</li></ul>
<h2>邮件订阅</h2>
<ul><li>订阅在我们的邮件服务商 beehiiv（总部位于美国）的页面上完成。beehiiv 会保存你的邮箱地址，并记录打开和点击情况。</li><li>我们只用你的地址发送邮件，不会出售，也不会提供给赞助商。</li><li>每封邮件都有退订链接。你也可以要求我们删除你的数据。</li></ul>
<h2>外部链接</h2>
<p>我们会链接到所排名的工具。这些网站有各自的隐私政策。如果将来加入联盟链接，会明确标注。</p>
<h2>你的权利</h2>
<p>根据 GDPR，你可以写信到上述地址，要求查阅、更正或删除你的数据，或反对其使用。你也可以向西班牙数据保护机构（AEPD）投诉。</p>`,
    ],
  },
];
