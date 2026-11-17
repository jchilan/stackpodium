// Copy for the head-to-head pages. Prices in the table come from src/data.html
// via price(). Cells here only restate rankings already on the site, or a
// vendor-doc fact named as such. "Not stated" / "Não informado" / "No consta"
// / "未说明" means it was not confirmed.

const labels = {
  glance: ["At a glance", "Em resumo", "De un vistazo", "一眼看懂"],
  price: ["Price", "Preço", "Precio", "价格"],
  best: ["Best for", "Melhor para", "Mejor para", "最适合"],
  model: ["Pricing model", "Modelo de preço", "Modelo de precio", "计费方式"],
  exit: ["Code export / lock-in", "Exportar código / aprisionamento", "Exportar código / dependencia", "代码导出 / 锁定"],
  curve: ["Learning curve", "Curva de aprendizado", "Curva de aprendizaje", "学习曲线"],
  where: ["Where they rank", "Onde ficam no ranking", "Dónde quedan", "它们的名次"],
  full: ["Full ranking", "Ranking completo", "Ranking completo", "完整排名"],
  questions: ["Questions", "Perguntas", "Preguntas", "常见问题"],
  pick: ["Pick {A} if {B}.", "Escolha {A} se {B}.", "Elige {A} si {B}.", "如果{B}，选 {A}。"],
  compared: ["Compared", "Comparado", "Comparado", "比较项"],
  note: [
    "Entry prices are the ones published on StackPodium. Prices checked Nov 2026. Export notes that go beyond those rankings come from the vendor's own documentation, also checked in November 2026. “Not stated” means we did not confirm it.",
    "Os preços de entrada são os publicados no StackPodium. Preços conferidos em novembro de 2026. As notas de exportação que vão além desses rankings vêm da documentação do próprio fornecedor, também conferida em novembro de 2026. “Não informado” significa que não confirmamos.",
    "Los precios de entrada son los publicados en StackPodium. Precios comprobados en noviembre de 2026. Las notas de exportación que van más allá de esos rankings salen de la documentación del propio proveedor, también comprobada en noviembre de 2026. «No consta» significa que no lo confirmamos.",
    "入门价格是 StackPodium 公布的价格。价格核对于 2026 年 11 月。排名之外的导出说明来自厂商自己的文档，同样核对于 2026 年 11 月。“未说明”表示我们没有核实到。",
  ],
  priceFaq: {
    q: [
      "Are these prices current?",
      "Estes preços estão atualizados?",
      "¿Estos precios están al día?",
      "这些价格还算数吗？",
    ],
    a: [
      "They were checked in November 2026. Prices change often. Always check the official page before you pay.",
      "Foram conferidos em novembro de 2026. Os preços mudam com frequência. Confira sempre a página oficial antes de pagar.",
      "Se comprobaron en noviembre de 2026. Los precios cambian a menudo. Comprueba siempre la página oficial antes de pagar.",
      "核对于 2026 年 11 月。价格经常变动。付款前请务必查看官方页面。",
    ],
  },
};

const tools = {
  lovable: {
    best: [
      "A first web app for someone who has never coded, or a team SaaS MVP with Supabase. One plan covers the team.",
      "Um primeiro app web para quem nunca programou, ou um MVP de SaaS para a equipe com Supabase. Um plano cobre o time todo.",
      "Una primera app web para quien nunca ha programado, o un MVP de SaaS para el equipo con Supabase. Un plan cubre a todo el equipo.",
      "给没写过程序的人做第一个网页应用，或带 Supabase 的团队 SaaS MVP。一个套餐覆盖整个团队。",
    ],
    model: [
      "Pro subscription, billed in credits. Those credits are not comparable to Bolt's tokens.",
      "Assinatura Pro, cobrada em créditos. Esses créditos não se comparam aos tokens do Bolt.",
      "Suscripción Pro, facturada en créditos. Esos créditos no se comparan con los tokens de Bolt.",
      "Pro 订阅，按积分计费。这些积分无法和 Bolt 的 token 直接比较。",
    ],
    exit: [
      "Generates clean React. Lovable's docs: Git sync on every plan; downloading the codebase is on paid plans. The database exports separately and does not include stored files, Edge Function code, or secrets.",
      "Gera React limpo. Na documentação da Lovable: sincronização com Git em qualquer plano; baixar o código é recurso de plano pago. O banco de dados é exportado à parte e não inclui arquivos armazenados, código de Edge Functions nem segredos.",
      "Genera React limpio. En la documentación de Lovable: sincronización con Git en cualquier plan; descargar el código es de los planes de pago. La base de datos se exporta aparte y no incluye archivos guardados, código de Edge Functions ni secretos.",
      "生成干净的 React。Lovable 文档：任何套餐都可 Git 同步；下载代码库是付费套餐功能。数据库单独导出，不含已存文件、Edge Function 代码和密钥。",
    ],
    curve: [
      "Aimed at zero experience: describe the app and get something working.",
      "Feito para quem tem zero experiência: descreva o app e veja algo funcionando.",
      "Pensado para cero experiencia: describes la app y ves algo funcionando.",
      "面向零经验：把应用描述出来，就能看到能运行的东西。",
    ],
  },
  bolt: {
    best: [
      "Trying before you pay, choosing the framework, or a mobile app with Expo.",
      "Testar antes de pagar, escolher o framework ou um app mobile com Expo.",
      "Probar antes de pagar, elegir el framework o una app móvil con Expo.",
      "先试后买、自选框架，或用 Expo 做手机应用。",
    ],
    model: [
      "Pro is $25/mo, billed in tokens. Teams is $30 per member.",
      "O Pro é US$ 25/mês, cobrado em tokens. O Teams é US$ 30 por membro.",
      "Pro es 25 $/mes, facturado en tokens. Teams es 30 $ por miembro.",
      "Pro 为 $25/月，按 token 计费。Teams 为每位成员 $30。",
    ],
    exit: [
      "You choose the framework. Bolt's docs: connect GitHub so the code is backed up outside Bolt, and download the project to publish an Expo app.",
      "Você escolhe o framework. Na documentação do Bolt: conecte o GitHub para o código ficar guardado fora do Bolt, e baixe o projeto para publicar um app Expo.",
      "Eliges el framework. En la documentación de Bolt: conecta GitHub para que el código quede fuera de Bolt, y descarga el proyecto para publicar una app Expo.",
      "可以自选框架。Bolt 文档：连接 GitHub，让代码备份在 Bolt 之外；下载项目后再发布 Expo 应用。",
    ],
    curve: [
      "A generous free plan to try first. You do pick a framework, so it is a step past only describing the idea.",
      "Um plano grátis generoso para testar antes. Você escolhe o framework, então é um passo além de só descrever a ideia.",
      "Un plan gratuito generoso para probar antes. Eliges el framework, así que es un paso más allá de solo describir la idea.",
      "免费额度很慷慨，适合先试。你要自己选框架，所以比只描述想法多一步。",
    ],
  },
  replit: {
    best: [
      "The most complete option when you want the code, plus an internal tool or a backend with its own logic. Lowest entry price of these builders.",
      "A opção mais completa quando você quer ver o código, além de uma ferramenta interna ou um backend com lógica própria. O menor preço de entrada entre estes construtores.",
      "La opción más completa cuando quieres ver el código, y también una herramienta interna o un backend con lógica propia. El precio de entrada más bajo de estos constructores.",
      "想看到代码时最完整的选择，也适合内部工具或有自己逻辑的后端。这些搭建工具里入门价最低。",
    ],
    model: [
      "Core is $20/mo, or $18/mo billed annually, and includes $20 toward more powerful models.",
      "O Core é US$ 20/mês, ou US$ 18/mês no plano anual, e inclui US$ 20 para modelos mais potentes.",
      "Core es 20 $/mes, o 18 $/mes facturado al año, e incluye 20 $ para modelos más potentes.",
      "Core 为 $20/月，按年计费则为 $18/月，并包含 $20 用于更强的模型。",
    ],
    exit: [
      "You see the code from the first minute. Replit's docs: download the project as a zip, or connect GitHub.",
      "Você vê o código desde o primeiro minuto. Na documentação do Replit: baixe o projeto em zip ou conecte o GitHub.",
      "Ves el código desde el primer minuto. En la documentación de Replit: descarga el proyecto en zip o conecta GitHub.",
      "从第一分钟就能看到代码。Replit 文档：把项目下载成 zip，或连接 GitHub。",
    ],
    curve: [
      "Steeper. More power, but the code is in front of you immediately.",
      "Mais íngreme. Mais poder, mas o código está na sua frente desde o início.",
      "Más empinada. Más potencia, pero el código está delante desde el principio.",
      "更陡。功能更强，但代码立刻就在你面前。",
    ],
  },
  v0: {
    best: [
      "A polished interface or landing page. Best interface quality and the cleanest React, built to deploy on Vercel.",
      "Uma interface ou landing page caprichada. A melhor qualidade de interface e o React mais limpo, feito para deploy na Vercel.",
      "Una interfaz o landing cuidada. La mejor calidad de interfaz y el React más limpio, pensado para desplegar en Vercel.",
      "精致的界面或落地页。界面质量最好、React 最干净，为部署到 Vercel 而设计。",
    ],
    model: [
      "Plus is $30 per user per month and includes $30 of monthly credits per user. The $20 Premium plan is no longer offered to new users.",
      "O Plus é US$ 30 por usuário por mês e inclui US$ 30 de créditos mensais por usuário. O Premium de US$ 20 não é mais oferecido a novos usuários.",
      "Plus es 30 $ por usuario al mes e incluye 30 $ de créditos mensuales por usuario. El Premium de 20 $ ya no se ofrece a nuevos usuarios.",
      "Plus 为每位用户每月 $30，并含每位用户每月 $30 额度。$20 的 Premium 不再向新用户提供。",
    ],
    exit: [
      "Clean React, and Git since February 2026. v0's docs: connecting GitHub pushes the code to a repository you own. Still lighter on backend.",
      "React limpo, e Git desde fevereiro de 2026. Na documentação do v0: conectar o GitHub envia o código para um repositório seu. Continua mais leve no backend.",
      "React limpio, y Git desde febrero de 2026. En la documentación de v0: conectar GitHub envía el código a un repositorio tuyo. Sigue siendo más ligero en backend.",
      "干净的 React，2026 年 2 月起有 Git。v0 文档：连接 GitHub 后，代码会推到你自己的仓库。后端仍然偏弱。",
    ],
    curve: [
      "Fast when the job is how the page looks. Not the pick when the backend is the hard part.",
      "Rápido quando o trabalho é a aparência da página. Não é a escolha quando o difícil é o backend.",
      "Rápido cuando el trabajo es el aspecto de la página. No es la elección cuando lo difícil es el backend.",
      "任务是把页面做漂亮时很快。难在后端时，它不是首选。",
    ],
  },
  cursor: {
    best: [
      "Serious coding in the reference AI editor: autocomplete, multi-file edits and agents, built on VS Code.",
      "Programar a sério no editor com IA de referência: autocompletar, edições em vários arquivos e agentes, em cima do VS Code.",
      "Programar en serio en el editor con IA de referencia: autocompletado, ediciones en varios archivos y agentes, sobre VS Code.",
      "用标杆 AI 编辑器认真写代码：自动补全、多文件编辑和代理，基于 VS Code。",
    ],
    model: [
      "Individual plans are Plus $8, Premium $30, Super $100, and Ultra $200 a month. A shared usage pool refreshes weekly. From Premium up, third-party models are billed separately.",
      "Os planos individuais são Plus a US$ 8, Premium a US$ 30, Super a US$ 100 e Ultra a US$ 200 por mês. Uma cota compartilhada renova toda semana. A partir do Premium, modelos de terceiros são cobrados à parte.",
      "Los planes individuales son Plus a 8 $, Premium a 30 $, Super a 100 $ y Ultra a 200 $ al mes. Una bolsa compartida se renueva cada semana. Desde Premium, los modelos de terceros se cobran aparte.",
      "个人套餐为 Plus $8、Premium $30、Super $100 和 Ultra $200 每月。共享用量池每周刷新。从 Premium 起，第三方模型另行计费。",
    ],
    exit: [
      "Not a hosted app. Cursor is an editor built on VS Code, so you work in your own project.",
      "Não é um app hospedado. O Cursor é um editor baseado no VS Code, então você trabalha no seu próprio projeto.",
      "No es una app alojada. Cursor es un editor basado en VS Code, así que trabajas en tu propio proyecto.",
      "不是托管应用。Cursor 是基于 VS Code 的编辑器，你是在自己的项目里工作。",
    ],
    curve: [
      "For someone who already knows some code or has a project. Daily work, not a first app from a prompt.",
      "Para quem já sabe um pouco de código ou tem um projeto. Uso do dia a dia, não um primeiro app a partir de um prompt.",
      "Para quien ya sabe algo de código o tiene un proyecto. Uso diario, no una primera app desde un prompt.",
      "适合已经懂一些代码或已有项目的人。用来日常写代码，不是从一句提示做第一个应用。",
    ],
  },
  copilot: {
    best: [
      "Staying in the editor you already use. The widest IDE support.",
      "Continuar no editor que você já usa. O suporte a IDEs mais amplo.",
      "Seguir en el editor que ya usas. El soporte de IDE más amplio.",
      "留在你已经在用的编辑器里。IDE 支持最广。",
    ],
    model: [
      "Pro is $10 per user per month. Pro+ is $39 and Max is $100, also per user.",
      "O Pro é US$ 10 por usuário por mês. O Pro+ é US$ 39 e o Max é US$ 100, também por usuário.",
      "Pro es 10 $ por usuario al mes. Pro+ es 39 $ y Max es 100 $, también por usuario.",
      "Pro 为每位用户每月 $10。Pro+ 为 $39，Max 为 $100，同样按用户计。",
    ],
    exit: [
      "Not a hosted app. It runs inside the editor you already use, so the code stays in your project.",
      "Não é um app hospedado. Roda dentro do editor que você já usa, então o código fica no seu projeto.",
      "No es una app alojada. Funciona dentro del editor que ya usas, así que el código se queda en tu proyecto.",
      "不是托管应用。它在你现有的编辑器里运行，代码留在你的项目中。",
    ],
    curve: [
      "Lower switch cost if you already have an IDE. You are not learning a new editor.",
      "Menor custo de troca se você já tem uma IDE. Você não aprende um editor novo.",
      "Menos coste de cambio si ya tienes un IDE. No aprendes un editor nuevo.",
      "如果你已经有 IDE，切换成本更低。不用再学一个新编辑器。",
    ],
  },
  devin: {
    best: [
      "The former Windsurf. The same editor approach as Cursor, with Pro listed at $20/mo.",
      "O antigo Windsurf. A mesma proposta de editor do Cursor, com o Pro listado a US$ 20/mês.",
      "El antiguo Windsurf. El mismo planteamiento de editor que Cursor, con Pro listado a 20 $/mes.",
      "即原来的 Windsurf。编辑器思路与 Cursor 相同，列出的 Pro 为 $20/月。",
    ],
    model: [
      "Pro subscription at $20/mo. The Pro plan had risen from $15 to $20 when Cognition retired the Windsurf name in June 2026.",
      "Assinatura Pro a US$ 20/mês. O plano Pro tinha subido de US$ 15 para 20 quando a Cognition aposentou o nome Windsurf, em junho de 2026.",
      "Suscripción Pro a 20 $/mes. El plan Pro había subido de 15 a 20 $ cuando Cognition retiró el nombre Windsurf, en junio de 2026.",
      "Pro 订阅 $20/月。2026 年 6 月 Cognition 停用 Windsurf 名称时，Pro 已从 $15 涨到 $20。",
    ],
    exit: [
      "Not a hosted app. Same approach as Cursor: an editor on your own project. Existing plans and extensions carried over from Windsurf.",
      "Não é um app hospedado. A mesma proposta do Cursor: um editor no seu próprio projeto. Planos e extensões existentes vieram do Windsurf.",
      "No es una app alojada. El mismo planteamiento que Cursor: un editor en tu propio proyecto. Los planes y extensiones existentes pasaron desde Windsurf.",
      "不是托管应用。思路与 Cursor 相同：在你自己的项目上用的编辑器。原有套餐和扩展从 Windsurf 沿用。",
    ],
    curve: [
      "The same kind of tool as Cursor, so the curve is an editor's curve, not a prompt-to-app builder's.",
      "O mesmo tipo de ferramenta que o Cursor, então a curva é a de um editor, não a de um construtor por prompt.",
      "El mismo tipo de herramienta que Cursor, así que la curva es la de un editor, no la de un constructor por prompt.",
      "和 Cursor 是同一类工具，学习曲线是编辑器的曲线，不是“提示词生成应用”的曲线。",
    ],
  },
  windsurf: {
    best: [
      "The IDE formerly sold as Windsurf. On 2 June 2026 Cognition renamed it Devin Desktop: the same editor, plans carried over, and an agent command center in front. StackPodium ranks that product as Devin Desktop.",
      "A IDE antes vendida como Windsurf. Em 2 de junho de 2026 a Cognition renomeou para Devin Desktop: o mesmo editor, planos mantidos e um centro de comando de agentes na frente. O StackPodium ranqueia esse produto como Devin Desktop.",
      "El IDE que se vendía como Windsurf. El 2 de junio de 2026 Cognition lo renombró a Devin Desktop: el mismo editor, planes conservados y un centro de mando de agentes delante. StackPodium clasifica ese producto como Devin Desktop.",
      "以前以 Windsurf 出售的 IDE。2026 年 6 月 2 日 Cognition 把它更名为 Devin Desktop：还是同一个编辑器，套餐沿用，前面加了代理指挥中心。StackPodium 把该产品排为 Devin Desktop。",
    ],
    model: [
      "On the Devin pricing page that replaced Windsurf: Free, Pro $20/mo, Max $200/mo, and Teams at $80/mo plus $40/mo per full seat. Paid plans include a usage allowance that refreshes daily and weekly. Extra usage is billed at API pricing. That page does not print the allowance as a fixed message or token count.",
      "Na página de preços do Devin, que substituiu a do Windsurf: grátis, Pro a US$ 20/mês, Max a US$ 200/mês, e Teams a US$ 80/mês mais US$ 40/mês por assento completo. Os planos pagos incluem uma cota que renova todo dia e toda semana. O uso extra sai a preço de API. Essa página não publica a cota como um número fixo de mensagens ou tokens.",
      "En la página de precios de Devin, que sustituyó a la de Windsurf: gratis, Pro a 20 $/mes, Max a 200 $/mes, y Teams a 80 $/mes más 40 $/mes por asiento completo. Los planes de pago incluyen una bolsa que se renueva cada día y cada semana. El uso extra se cobra a precio de API. Esa página no publica la bolsa como un número fijo de mensajes o tokens.",
      "在取代 Windsurf 的 Devin 价格页上：免费、Pro $20/月、Max $200/月，Teams 为 $80/月再加每个完整席位 $40/月。付费套餐含每日和每周刷新的用量额度。超出部分按 API 价格计费。该页没有把额度写成固定的消息数或 token 数。",
    ],
    exit: [
      "Not a hosted app. Cognition's June 2026 announcement: the editor stays backwards-compatible with Windsurf and VS Code extensions, keybindings and LSPs, so you work in your own project.",
      "Não é um app hospedado. No anúncio da Cognition de junho de 2026: o editor continua compatível com as extensões, atalhos e LSPs do Windsurf e do VS Code, então você trabalha no seu próprio projeto.",
      "No es una app alojada. En el anuncio de Cognition de junio de 2026: el editor sigue siendo compatible con las extensiones, atajos y LSP de Windsurf y de VS Code, así que trabajas en tu propio proyecto.",
      "不是托管应用。Cognition 2026 年 6 月的公告：编辑器仍兼容 Windsurf 和 VS Code 的扩展、快捷键和 LSP，所以你是在自己的项目里工作。",
    ],
    curve: [
      "The same kind of tool as Cursor, so the curve is an editor's curve. The name changed. It did not become a prompt-to-app builder.",
      "O mesmo tipo de ferramenta que o Cursor, então a curva é a de um editor. O nome mudou. Não virou um construtor de app por prompt.",
      "El mismo tipo de herramienta que Cursor, así que la curva es la de un editor. Cambió el nombre. No pasó a ser un constructor de apps por prompt.",
      "和 Cursor 是同一类工具，学习曲线是编辑器的曲线。名字改了，并没有变成用提示词生成应用的工具。",
    ],
  },
  claude: {
    best: [
      "Handing a long task to a terminal agent that works across the whole repository. Leads on complex reasoning.",
      "Passar uma tarefa longa a um agente de terminal que trabalha em todo o repositório. Lidera em raciocínio complexo.",
      "Dar una tarea larga a un agente de terminal que trabaja sobre todo el repositorio. Lidera en razonamiento complejo.",
      "把一项长任务交给能处理整个代码库的终端代理。复杂推理方面领先。",
    ],
    model: [
      "Included in Claude Pro and Max. StackPodium does not list a separate dollar price.",
      "Incluído no Pro e no Max da Claude. O StackPodium não lista um preço em dólares à parte.",
      "Incluido en Pro y Max de Claude. StackPodium no lista un precio en dólares aparte.",
      "包含在 Claude 的 Pro 和 Max 中。StackPodium 没有单独列出美元价格。",
    ],
    exit: [
      "A terminal agent on your repository. The project is already yours; there is no hosted app to export.",
      "Um agente de terminal no seu repositório. O projeto já é seu; não há um app hospedado para exportar.",
      "Un agente de terminal sobre tu repositorio. El proyecto ya es tuyo; no hay una app alojada que exportar.",
      "在你的代码库上运行的终端代理。项目本来就是你的，没有需要导出的托管应用。",
    ],
    curve: [
      "You give it a whole task and review the result. Many people keep an editor for daily work and use this for the big tasks.",
      "Você entrega a tarefa inteira e revisa o resultado. Muita gente fica com um editor no dia a dia e usa isto para as tarefas grandes.",
      "Le das la tarea completa y revisas el resultado. Mucha gente se queda con un editor en el día a día y usa esto para las tareas grandes.",
      "你把整项任务交出去，再审查结果。很多人日常用编辑器，大任务才用它。",
    ],
  },
  codex: {
    best: [
      "OpenAI's equivalent of Claude Code, if you already have ChatGPT or want to use an API key.",
      "O equivalente da OpenAI ao Claude Code, se você já tem o ChatGPT ou quer usar uma chave de API.",
      "El equivalente de OpenAI a Claude Code, si ya tienes ChatGPT o quieres usar una clave de API.",
      "OpenAI 对标 Claude Code 的产品。适合已经有 ChatGPT，或想用 API 密钥的人。",
    ],
    model: [
      "Included in ChatGPT plans, or usable with an API key. No separate entry price is listed.",
      "Incluído nos planos do ChatGPT ou utilizável com chave de API. Não há um preço de entrada separado.",
      "Incluido en los planes de ChatGPT o usable con clave de API. No hay un precio de entrada aparte.",
      "包含在 ChatGPT 套餐中，也可用 API 密钥。没有单独的入门价格。",
    ],
    exit: [
      "Described as OpenAI's equivalent of Claude Code, a terminal agent on a repository you already have. StackPodium does not describe a separate export step.",
      "Descrito como o equivalente da OpenAI ao Claude Code, um agente de terminal num repositório que você já tem. O StackPodium não descreve um passo separado de exportação.",
      "Descrito como el equivalente de OpenAI a Claude Code, un agente de terminal sobre un repositorio que ya tienes. StackPodium no describe un paso de exportación aparte.",
      "被描述为 Claude Code 的 OpenAI 对应产品，也就是在你已有代码库上的终端代理。StackPodium 没有描述单独的导出步骤。",
    ],
    curve: [
      "Same shape of work as Claude Code: hand over a task and review the result.",
      "O mesmo tipo de trabalho do Claude Code: entregue uma tarefa e revise o resultado.",
      "El mismo tipo de trabajo que Claude Code: entrega una tarea y revisa el resultado.",
      "工作方式和 Claude Code 一样：交出任务，再审查结果。",
    ],
  },
  n8n: {
    best: [
      "An agent that has to act inside your tools. Source-available under the fair-code Sustainable Use License, with native AI nodes.",
      "Um agente que precisa agir dentro das suas ferramentas. Código disponível sob a Sustainable Use License, fair-code, com nós de IA nativos.",
      "Un agente que tiene que actuar dentro de tus herramientas. Código disponible bajo la Sustainable Use License, fair-code, con nodos de IA nativos.",
      "需要在你的各种工具里执行操作的代理。源代码可获取，采用 fair-code 的 Sustainable Use License，并带原生 AI 节点。",
    ],
    model: [
      "Free to self-host under the Sustainable Use License. Cloud Starter is €20/mo billed annually. The pricing page also lists Pro at €50/mo and Business at €667/mo, both billed annually, and Enterprise as contact sales. You pay per full workflow run, not per step.",
      "Grátis para auto-hospedar sob a Sustainable Use License. O Starter na nuvem é €20/mês no plano anual. A página de preços também lista o Pro a €50/mês e o Business a €667/mês, os dois no plano anual, e o Enterprise como contato comercial. Você paga por execução completa do fluxo, não por passo.",
      "Gratis para autoalojar bajo la Sustainable Use License. El Starter en la nube es 20 €/mes facturado al año. La página de precios también lista Pro a 50 €/mes y Business a 667 €/mes, ambos facturados al año, y Enterprise como contacto comercial. Pagas por ejecución completa del flujo, no por paso.",
      "可按 Sustainable Use License 免费自托管。云端 Starter 为年付 €20/月。价格页还列出 Pro 年付 €50/月、Business 年付 €667/月，Enterprise 为联系销售。按整次工作流运行计费，不按步骤。",
    ],
    exit: [
      "Source-available (fair-code), not open source, and free to self-host, so the instance can be yours. Cloud hosting is optional.",
      "Código disponível (fair-code), não código aberto, e grátis para auto-hospedar, então a instância pode ser sua. A nuvem é opcional.",
      "Código disponible (fair-code), no código abierto, y gratis para autoalojar, así que la instancia puede ser tuya. La nube es opcional.",
      "源代码可获取（fair-code），不是开源，可免费自托管，实例可以是你自己的。云端托管是可选项。",
    ],
    curve: [
      "More to learn than Make's visual builder. The ranking still puts it first when the agent must act inside your tools.",
      "Exige mais aprendizado do que o construtor visual do Make. O ranking ainda o coloca em primeiro quando o agente precisa agir dentro das suas ferramentas.",
      "Hay más que aprender que con el constructor visual de Make. Aun así, el ranking lo pone primero cuando el agente tiene que actuar dentro de tus herramientas.",
      "比 Make 的可视化搭建要多学一些。但当代理必须在你的工具里操作时，排名仍把它放在第一。",
    ],
  },
  make: {
    best: [
      "The easiest visual builder for a first agent. Make's own comparison page says paid plans include Make AI Agents.",
      "O construtor visual mais fácil para um primeiro agente. A própria página comparativa do Make diz que os planos pagos incluem o Make AI Agents.",
      "El constructor visual más fácil para un primer agente. La propia comparativa de Make dice que los planes de pago incluyen Make AI Agents.",
      "做第一个代理时最容易上手的可视化搭建工具。Make 自己的对比页写明付费套餐包含 Make AI Agents。",
    ],
    model: [
      "Make's comparison page lists Free at $0 for 1,000 credits a month, Core from $9/mo, Pro from $16/mo, and Team from $29/mo, paid plans starting at 10,000 credits. Most actions use 1 credit. Annual billing costs less than monthly. The pricing page's credit slider did not print a separate month-to-month figure we could quote. Enterprise is custom.",
      "A página comparativa do Make lista o grátis a US$ 0 por 1.000 créditos por mês, Core a partir de US$ 9/mês, Pro a partir de US$ 16/mês e Team a partir de US$ 29/mês, planos pagos a partir de 10.000 créditos. A maioria das ações usa 1 crédito. O plano anual custa menos que o mensal. O controle de créditos da página de preços não mostrou um valor mês a mês separado que dê para citar. O Enterprise é sob consulta.",
      "La comparativa de Make lista el gratis a 0 $ por 1.000 créditos al mes, Core desde 9 $/mes, Pro desde 16 $/mes y Team desde 29 $/mes, planes de pago desde 10.000 créditos. La mayoría de las acciones usan 1 crédito. El plan anual cuesta menos que el mensual. El control de créditos de la página de precios no mostró una cifra mes a mes aparte que se pueda citar. Enterprise es a medida.",
      "Make 的对比页列出免费为 $0、每月 1,000 点额度，Core 起价 $9/月，Pro 起价 $16/月，Team 起价 $29/月，付费套餐从 10,000 点额度起。大多数操作消耗 1 点。年付比月付便宜。价格页的额度滑杆没有给出可以引用的另一套按月数字。Enterprise 为定制。",
    ],
    exit: [
      "Not stated as a code export. Make publishes hosted plans (Free, Core, Pro, Team, Enterprise). We did not confirm a self-hosted edition.",
      "Não informado como exportação de código. O Make publica planos hospedados (grátis, Core, Pro, Team, Enterprise). Não confirmamos uma edição para auto-hospedar.",
      "No consta como exportación de código. Make publica planes alojados (gratis, Core, Pro, Team, Enterprise). No confirmamos una edición para autoalojar.",
      "没有核实到代码导出。Make 公布的是托管套餐（免费、Core、Pro、Team、Enterprise）。我们没有核实到自托管版本。",
    ],
    curve: [
      "The easiest of this group for a first agent.",
      "O mais fácil deste grupo para um primeiro agente.",
      "El más fácil de este grupo para un primer agente.",
      "这一组里做第一个代理最容易。",
    ],
  },
  zapier: {
    best: [
      "The broadest catalogue, over 8,000 apps, when coverage matters more than self-hosting.",
      "O catálogo mais amplo, mais de 8.000 apps, quando a cobertura importa mais do que auto-hospedar.",
      "El catálogo más amplio, más de 8.000 apps, cuando la cobertura importa más que autoalojar.",
      "应用目录最广，超过 8,000 个。覆盖面比自托管更重要时选它。",
    ],
    model: [
      "Billed per task, so watch your volume. The entry price is not listed.",
      "Cobrado por tarefa, então fique de olho no volume. O preço de entrada não está listado.",
      "Se factura por tarea, así que vigila el volumen. El precio de entrada no está listado.",
      "按任务计费，注意用量。入门价格未列出。",
    ],
    exit: [
      "Not stated. Zapier is a hosted product; StackPodium does not describe a code export.",
      "Não informado. O Zapier é um produto hospedado; o StackPodium não descreve exportação de código.",
      "No consta. Zapier es un producto alojado; StackPodium no describe una exportación de código.",
      "未说明。Zapier 是托管产品；StackPodium 没有描述代码导出。",
    ],
    curve: [
      "Familiar if you want a wide catalogue. The thing to watch is task volume, not a steep editor.",
      "Familiar se você quer um catálogo amplo. O que exige atenção é o volume de tarefas, não um editor íngreme.",
      "Familiar si quieres un catálogo amplio. Lo que hay que vigilar es el volumen de tareas, no un editor empinado.",
      "想要很广的应用目录时很好上手。要留意的是任务量，不是陡峭的编辑器学习曲线。",
    ],
  },
  langgraph: {
    best: [
      "Complex agent flows that have to be reliable, modeled as stateful graphs.",
      "Fluxos de agentes complexos que precisam ser confiáveis, modelados como grafos com estado.",
      "Flujos de agentes complejos que deben ser fiables, modelados como grafos con estado.",
      "必须可靠的复杂代理流程，建成有状态的图。",
    ],
    model: [
      "Open source. No subscription price is listed.",
      "Código aberto. Não há preço de assinatura listado.",
      "Código abierto. No hay un precio de suscripción listado.",
      "开源。没有列出订阅价格。",
    ],
    exit: [
      "Open source library. The agent code lives in your project.",
      "Biblioteca de código aberto. O código do agente fica no seu projeto.",
      "Biblioteca de código abierto. El código del agente vive en tu proyecto.",
      "开源库。代理代码在你自己的项目里。",
    ],
    curve: [
      "Steeper start than CrewAI. Use it when a visual tool such as n8n is not enough.",
      "Começo mais íngreme que o CrewAI. Use quando uma ferramenta visual como o n8n não bastar.",
      "Arranque más empinado que CrewAI. Úsalo cuando una herramienta visual como n8n no baste.",
      "比 CrewAI 更难上手。可视化工具（比如 n8n）不够用时再用它。",
    ],
  },
  crewai: {
    best: [
      "A team of agents with roles, when you want to start faster than with LangGraph.",
      "Uma equipe de agentes com papéis, quando você quer começar mais rápido do que com o LangGraph.",
      "Un equipo de agentes con roles, cuando quieres empezar más rápido que con LangGraph.",
      "按角色分工的代理团队。想比 LangGraph 更快上手时选它。",
    ],
    model: [
      "Open source. No subscription price is listed.",
      "Código aberto. Não há preço de assinatura listado.",
      "Código abierto. No hay un precio de suscripción listado.",
      "开源。没有列出订阅价格。",
    ],
    exit: [
      "Open source library. The agent code lives in your project.",
      "Biblioteca de código aberto. O código do agente fica no seu projeto.",
      "Biblioteca de código abierto. El código del agente vive en tu proyecto.",
      "开源库。代理代码在你自己的项目里。",
    ],
    curve: [
      "Quicker to start than LangGraph.",
      "Começo mais rápido que o LangGraph.",
      "Arranque más rápido que LangGraph.",
      "比 LangGraph 上手更快。",
    ],
  },
  rosebud: {
    best: [
      "A playable browser game this weekend, from a prompt, with assets, NPCs and multiplayer.",
      "Um jogo jogável no navegador neste fim de semana, a partir de um prompt, com assets, NPCs e multiplayer.",
      "Un juego jugable en el navegador este fin de semana, desde un prompt, con assets, NPC y multijugador.",
      "这个周末用提示词做出能玩的网页游戏，素材、NPC 和多人联机都包含在内。",
    ],
    model: [
      "Free and paid plans. No dollar price is listed.",
      "Planos grátis e pagos. Não há um preço em dólares listado.",
      "Planes gratis y de pago. No hay un precio en dólares listado.",
      "有免费和付费套餐。没有列出美元价格。",
    ],
    exit: [
      "Not stated. StackPodium does not describe a code export for Rosebud AI.",
      "Não informado. O StackPodium não descreve exportação de código para o Rosebud AI.",
      "No consta. StackPodium no describe una exportación de código para Rosebud AI.",
      "未说明。StackPodium 没有描述 Rosebud AI 如何导出代码。",
    ],
    curve: [
      "Prompt-to-game is the easiest way in. You trade that ease for less control than a coding agent.",
      "Prompt para jogo é a entrada mais fácil. Você troca essa facilidade por menos controle do que um agente de código.",
      "De prompt a juego es la entrada más fácil. Cambias esa facilidad por menos control que un agente de código.",
      "从提示词到游戏是最容易的入门方式。容易的代价是控制力不如编程代理。",
    ],
  },
  gdevelop: {
    best: [
      "A no-code engine with an AI assistant, if the game grows past a prompt-to-game tool.",
      "Um motor sem código com assistente de IA, se o jogo crescer além de uma ferramenta de prompt.",
      "Un motor sin código con asistente de IA, si el juego crece más allá de una herramienta de prompt.",
      "游戏规模超过“提示词生成游戏”时，用内置 AI 助手的无代码引擎。",
    ],
    model: [
      "Not listed on StackPodium. See GDevelop's pricing page.",
      "Não consta no StackPodium. Veja a página de preços do GDevelop.",
      "No consta en StackPodium. Consulta la página de precios de GDevelop.",
      "StackPodium 未列出价格。请看 GDevelop 的价格页。",
    ],
    exit: [
      "Not stated. It is a no-code engine; StackPodium does not describe export targets.",
      "Não informado. É um motor sem código; o StackPodium não descreve para onde se exporta.",
      "No consta. Es un motor sin código; StackPodium no describe a dónde se exporta.",
      "未说明。它是无代码引擎；StackPodium 没有描述可以导出到哪里。",
    ],
    curve: [
      "A step up from a weekend prompt if the game grows. Still no-code, with an AI assistant inside.",
      "Um passo acima de um prompt de fim de semana, se o jogo crescer. Continua sem código, com assistente de IA.",
      "Un paso por encima de un prompt de fin de semana, si el juego crece. Sigue siendo sin código, con asistente de IA.",
      "如果游戏会变大，它是比周末提示词再进一步。仍然不用写代码，里面有 AI 助手。",
    ],
  },
};

function faq(q, a) {
  return { q, a };
}

const pairs = [
  {
    ids: ["lovable", "bolt"],
    title: [
      "Lovable vs Bolt: first app, team SaaS, or mobile",
      "Lovable vs Bolt: primeiro app, SaaS em equipe ou mobile",
      "Lovable vs Bolt: primera app, SaaS de equipo o móvil",
      "Lovable 与 Bolt：第一个应用、团队 SaaS，还是手机应用",
    ],
    desc: [
      "Lovable (Pro $25/mo, billed in credits) leads for a first web app and a team SaaS with Supabase. Bolt (Pro $25/mo, billed in tokens) has the most generous free plan and is the pick for an Expo mobile app.",
      "O Lovable (Pro US$ 25/mês, em créditos) lidera para um primeiro app web e um SaaS de equipe com Supabase. O Bolt (Pro US$ 25/mês, em tokens) tem o plano grátis mais generoso e é a escolha para um app mobile com Expo.",
      "Lovable (Pro 25 $/mes, en créditos) lidera para una primera app web y un SaaS de equipo con Supabase. Bolt (Pro 25 $/mes, en tokens) tiene el plan gratuito más generoso y es la elección para una app móvil con Expo.",
      "Lovable（Pro $25/月，按积分）在零基础网页应用和带 Supabase 的团队 SaaS 上领先。Bolt（Pro $25/月，按 token）免费额度最慷慨，也是用 Expo 做手机应用的首选。",
    ],
    pick: [
      ["you want a first web app or a team SaaS MVP with Supabase, and one plan for the whole team", "you want the most generous free plan, a choice of framework, or a mobile app built with Expo"],
      ["você quer um primeiro app web ou um MVP de SaaS para a equipe com Supabase, e um plano para o time todo", "você quer o plano grátis mais generoso, escolher o framework ou um app mobile feito com Expo"],
      ["quieres una primera app web o un MVP de SaaS para el equipo con Supabase, y un plan para todo el equipo", "quieres el plan gratuito más generoso, elegir el framework o una app móvil hecha con Expo"],
      ["你想零基础做第一个网页应用，或做一个带 Supabase、一个套餐覆盖全团队的 SaaS MVP", "你想要最慷慨的免费额度、自己选框架，或用 Expo 做手机应用"],
    ],
    faqs: [
      faq(
        ["Which one is cheaper?", "Qual é mais barato?", "¿Cuál sale más barato?", "哪个更便宜？"],
        ["Both list Pro at $25/mo. Lovable bills in credits and Bolt in tokens, so the totals are not comparable. Try the same small feature in both before you subscribe.", "Os dois listam o Pro a US$ 25/mês. O Lovable cobra em créditos e o Bolt em tokens, então os totais não se comparam. Teste a mesma função pequena nos dois antes de assinar.", "Los dos listan Pro a 25 $/mes. Lovable cobra en créditos y Bolt en tokens, así que los totales no se comparan. Prueba la misma función pequeña en los dos antes de suscribirte.", "两边列出的都是 Pro $25/月。Lovable 按积分计费，Bolt 按 token 计费，总价无法直接比较。订阅前，先在两边各做同一个小功能试试。"]
      ),
      faq(
        ["Which should I pick if I cannot code?", "Qual eu escolho se não sei programar?", "¿Cuál elijo si no sé programar?", "我不会写代码，该选哪个？"],
        ["Lovable is #1 for a first web app: it generates React with Supabase already connected. Bolt is #2, with the most generous free plan and a choice of framework.", "O Lovable é o #1 para um primeiro app web: gera React com o Supabase já conectado. O Bolt é o #2, com o plano grátis mais generoso e a escolha do framework.", "Lovable es el nº 1 para una primera app web: genera React con Supabase ya conectado. Bolt es el nº 2, con el plan gratuito más generoso y la elección de framework.", "零基础做第一个网页应用，Lovable 是第 1：生成已接好 Supabase 的 React。Bolt 是第 2，免费额度最慷慨，还可以自选框架。"]
      ),
      faq(
        ["Can either build a mobile app?", "Algum dos dois faz app mobile?", "¿Alguno de los dos hace una app móvil?", "两者都能做手机应用吗？"],
        ["Bolt is #1 for a mobile app and builds with Expo. Lovable has no native mobile support; you get a responsive web app.", "O Bolt é o #1 para app mobile e gera apps com Expo. O Lovable não tem suporte nativo a mobile; você fica com um app web adaptado.", "Bolt es el nº 1 para app móvil y genera apps con Expo. Lovable no tiene soporte móvil nativo; te quedas con una web adaptada.", "做手机应用 Bolt 是第 1，用 Expo 生成。Lovable 不支持原生移动端，你得到的是自适应网页。"]
      ),
    ],
  },
  {
    ids: ["lovable", "replit"],
    title: [
      "Lovable vs Replit: describe the app, or see the code",
      "Lovable vs Replit: descreva o app ou veja o código",
      "Lovable vs Replit: describe la app o ve el código",
      "Lovable 与 Replit：描述应用，还是直接看代码",
    ],
    desc: [
      "Lovable (Pro $25/mo, credits) is the easier start for a non-technical founder and for a team SaaS. Replit (Core $20/mo) is more complete and cheaper to start, but you see the code from the first minute.",
      "O Lovable (Pro US$ 25/mês, créditos) é o começo mais fácil para um fundador não técnico e para um SaaS de equipe. O Replit (Core US$ 20/mês) é mais completo e mais barato para começar, mas você vê o código desde o primeiro minuto.",
      "Lovable (Pro 25 $/mes, créditos) es el arranque más fácil para un fundador no técnico y para un SaaS de equipo. Replit (Core 20 $/mes) es más completo y más barato para empezar, pero ves el código desde el primer minuto.",
      "Lovable（Pro $25/月，积分）对非技术创始人和团队 SaaS 更容易上手。Replit（Core $20/月）更完整、入门更便宜，但从第一分钟就要看代码。",
    ],
    pick: [
      ["you have not coded before and want React with Supabase from a description, or one plan for a whole team", "you want the lower entry price, the code on screen, and an editor, terminal and deployment in one place"],
      ["você nunca programou e quer React com Supabase a partir de uma descrição, ou um plano para a equipe toda", "você quer o menor preço de entrada, o código na tela, e editor, terminal e deploy no mesmo lugar"],
      ["no has programado y quieres React con Supabase a partir de una descripción, o un plan para todo el equipo", "quieres el precio de entrada más bajo, el código en pantalla, y editor, terminal y despliegue en el mismo sitio"],
      ["你没写过程序，想用一段描述得到接好 Supabase 的 React，或一个套餐给整个团队用", "你想要更低的入门价、屏幕上的代码，以及编辑器、终端和部署都在一处"],
    ],
    faqs: [
      faq(
        ["Which is cheaper to start?", "Qual é mais barato para começar?", "¿Cuál es más barato para empezar?", "哪个入门更便宜？"],
        ["Replit Core is $20/mo, or $18/mo billed annually, and includes $20 toward more powerful models. Lovable Pro starts at $25/mo and is billed in credits.", "O Core do Replit é US$ 20/mês, ou US$ 18/mês no plano anual, e inclui US$ 20 para modelos mais potentes. O Pro do Lovable começa em US$ 25/mês e é cobrado em créditos.", "Core de Replit es 20 $/mes, o 18 $/mes facturado al año, e incluye 20 $ para modelos más potentes. Pro de Lovable empieza en 25 $/mes y se factura en créditos.", "Replit Core 为 $20/月，按年计费则为 $18/月，并包含 $20 用于更强的模型。Lovable Pro 从 $25/月起，按积分计费。"]
      ),
      faq(
        ["Which is easier if I have never coded?", "Qual é mais fácil se eu nunca programei?", "¿Cuál es más fácil si nunca he programado?", "我从来没写过代码，哪个更容易？"],
        ["Lovable. It is the most recommended pick for non-technical founders. Replit is more complete, but you see the code from the first minute, so the curve is steeper.", "O Lovable. É a opção mais recomendada para fundadores não técnicos. O Replit é mais completo, mas você vê o código desde o primeiro minuto, então a curva é maior.", "Lovable. Es la opción más recomendada para fundadores no técnicos. Replit es más completo, pero ves el código desde el primer minuto, así que la curva es mayor.", "Lovable。它是最常推荐给非技术创始人的选择。Replit 更完整，但从第一分钟就要看代码，曲线更陡。"]
      ),
      faq(
        ["Which is better for an internal tool?", "Qual é melhor para uma ferramenta interna?", "¿Cuál es mejor para una herramienta interna?", "做内部工具哪个更好？"],
        ["Replit is #1: a hybrid editor and terminal, easier to adapt and to connect to your data. Lovable is #3, when looks matter more than logic.", "O Replit é o #1: editor híbrido e terminal, mais fácil de adaptar e de conectar aos seus dados. O Lovable é o #3, quando a aparência importa mais que a lógica.", "Replit es el nº 1: editor híbrido y terminal, más fácil de adaptar y de conectar a tus datos. Lovable es el nº 3, cuando importa más el aspecto que la lógica.", "Replit 是第 1：混合编辑器加终端，更容易改造，也更容易连接你的数据。Lovable 是第 3，适合外观比逻辑更重要的时候。"]
      ),
    ],
  },
  {
    ids: ["bolt", "replit"],
    title: [
      "Bolt vs Replit: Expo and tokens, or the lower entry price",
      "Bolt vs Replit: Expo e tokens, ou o menor preço de entrada",
      "Bolt vs Replit: Expo y tokens, o el precio de entrada más bajo",
      "Bolt 与 Replit：Expo 和 token，还是更低的入门价",
    ],
    desc: [
      "Bolt (Pro $25/mo, tokens, and per member for a team) is the mobile pick and has the most generous free plan. Replit (Core $20/mo) costs less to start and is the one to pick when you want to control the code.",
      "O Bolt (Pro US$ 25/mês, tokens, e por membro numa equipe) é a escolha para mobile e tem o plano grátis mais generoso. O Replit (Core US$ 20/mês) custa menos para começar e é a escolha quando você quer controlar o código.",
      "Bolt (Pro 25 $/mes, tokens, y por miembro en un equipo) es la elección para móvil y tiene el plan gratuito más generoso. Replit (Core 20 $/mes) cuesta menos para empezar y es la elección cuando quieres controlar el código.",
      "Bolt（Pro $25/月，按 token，团队按成员收费）是手机应用的首选，免费额度也最慷慨。Replit（Core $20/月）入门更便宜，想掌控代码时选它。",
    ],
    pick: [
      ["you want a generous free plan, a choice of framework, or an Expo app for iOS and Android", "you want the lower entry price and would rather see and control the code, including for an internal tool"],
      ["você quer um plano grátis generoso, escolher o framework ou um app Expo para iOS e Android", "você quer o menor preço de entrada e prefere ver e controlar o código, inclusive numa ferramenta interna"],
      ["quieres un plan gratuito generoso, elegir el framework o una app Expo para iOS y Android", "quieres el precio de entrada más bajo y prefieres ver y controlar el código, también en una herramienta interna"],
      ["你想要慷慨的免费额度、自选框架，或做 iOS 和 Android 的 Expo 应用", "你想要更低的入门价，并且更愿意看到并掌控代码，包括做内部工具"],
    ],
    faqs: [
      faq(
        ["Which costs less to start?", "Qual custa menos para começar?", "¿Cuál cuesta menos para empezar?", "哪个起步更便宜？"],
        ["Replit Core is $20/mo. Bolt Pro is $25/mo, billed in tokens, and Bolt charges per member for a team.", "O Core do Replit é US$ 20/mês. O Pro do Bolt é US$ 25/mês, em tokens, e o Bolt cobra por membro numa equipe.", "Core de Replit es 20 $/mes. Pro de Bolt es 25 $/mes, en tokens, y Bolt cobra por miembro en un equipo.", "Replit Core 是 $20/月。Bolt Pro 是 $25/月，按 token 计费，团队还按成员收费。"]
      ),
      faq(
        ["Which is better for a mobile app?", "Qual é melhor para um app mobile?", "¿Cuál es mejor para una app móvil?", "做手机应用哪个更好？"],
        ["Bolt is #1 and builds with Expo, the shortest path from a prompt to iOS and Android. Replit is #3, a solid choice if you prefer to control the code.", "O Bolt é o #1 e gera apps com Expo, o caminho mais curto de um prompt até iOS e Android. O Replit é o #3, uma segunda opção sólida se você prefere controlar o código.", "Bolt es el nº 1 y genera apps con Expo, el camino más corto de un prompt a iOS y Android. Replit es el nº 3, una segunda opción sólida si prefieres controlar el código.", "Bolt 是第 1，用 Expo 生成，是从提示到 iOS 和 Android 的最短路径。Replit 是第 3，如果你更想掌控代码，它是可靠的备选。"]
      ),
      faq(
        ["Which should a team SaaS use?", "Qual um SaaS em equipe deve usar?", "¿Cuál debe usar un SaaS de equipo?", "团队做 SaaS 该用哪个？"],
        ["Replit is #2 for a SaaS MVP: agent, editor, terminal and deployment in one place, better when the backend has its own logic. Bolt is #3 because per-member pricing gets expensive for a team. Lovable, not in this pair, is #1 for that case.", "O Replit é o #2 para um MVP de SaaS: agente, editor, terminal e deploy no mesmo lugar, melhor quando o backend tem lógica própria. O Bolt é o #3 porque o preço por membro fica caro em equipe. O Lovable, que não está neste par, é o #1 nesse caso.", "Replit es el nº 2 para un MVP de SaaS: agente, editor, terminal y despliegue en el mismo sitio, mejor si el backend tiene lógica propia. Bolt es el nº 3 porque el precio por miembro sale caro en equipo. Lovable, que no está en este par, es el nº 1 en ese caso.", "SaaS MVP 上 Replit 是第 2：代理、编辑器、终端和部署都在一处，后端有自己的逻辑时更合适。Bolt 是第 3，因为按成员收费，团队会变贵。不在这一对里的 Lovable 才是该场景的第 1。"]
      ),
    ],
  },
  {
    ids: ["v0", "lovable"],
    title: [
      "v0 vs Lovable: the interface, or the full app",
      "v0 vs Lovable: a interface ou o app completo",
      "v0 vs Lovable: la interfaz o la app completa",
      "v0 与 Lovable：只做界面，还是做成完整应用",
    ],
    desc: [
      "v0 Plus is $30 per user per month and has the best interface quality and the cleanest React, built to deploy on Vercel. Lovable (Pro $25/mo, credits) is close on design and carries on to a full app with Supabase.",
      "O Plus do v0 é US$ 30 por usuário por mês e tem a melhor qualidade de interface e o React mais limpo, feito para deploy na Vercel. O Lovable (Pro US$ 25/mês, créditos) chega perto no design e segue até o app completo com Supabase.",
      "Plus de v0 es 30 $ por usuario al mes y tiene la mejor calidad de interfaz y el React más limpio, pensado para desplegar en Vercel. Lovable (Pro 25 $/mes, créditos) se acerca en diseño y sigue hasta la app completa con Supabase.",
      "v0 Plus 为每位用户每月 $30，界面质量最好、React 最干净，为部署到 Vercel 而设计。Lovable（Pro $25/月，积分）设计也很强，而且能继续做成带 Supabase 的完整应用。",
    ],
    pick: [
      ["you need a polished interface or landing page, the cleanest React, and a deploy on Vercel", "you want very good design and then the rest of the app, including a team SaaS with Supabase"],
      ["você precisa de uma interface ou landing caprichada, o React mais limpo e deploy na Vercel", "você quer um design muito bom e depois o resto do app, inclusive um SaaS de equipe com Supabase"],
      ["necesitas una interfaz o landing cuidada, el React más limpio y un despliegue en Vercel", "quieres un diseño muy bueno y después el resto de la app, incluido un SaaS de equipo con Supabase"],
      ["你需要精致的界面或落地页、最干净的 React，并部署到 Vercel", "你想要很好的设计，然后把应用的其余部分也做完，包括带 Supabase 的团队 SaaS"],
    ],
    faqs: [
      faq(
        ["Which makes the better-looking page?", "Qual deixa a página mais bonita?", "¿Cuál deja la página más cuidada?", "哪个做出来的页面更好看？"],
        ["v0 is #1 for a polished interface: the best interface quality and the cleanest React, built to deploy on Vercel. Lovable is #2, with very good design, and you can continue into the full app.", "O v0 é o #1 para uma interface caprichada: a melhor qualidade de interface e o React mais limpo, feito para deploy na Vercel. O Lovable é o #2, com design muito bom, e você pode seguir até o app completo.", "v0 es el nº 1 para una interfaz cuidada: la mejor calidad de interfaz y el React más limpio, pensado para desplegar en Vercel. Lovable es el nº 2, con un diseño muy bueno, y puedes seguir hasta la app completa.", "做精致界面，v0 是第 1：界面质量最好、React 最干净，为部署到 Vercel 而设计。Lovable 是第 2，设计很好，而且可以继续做成完整应用。"]
      ),
      faq(
        ["What about the backend?", "E o backend?", "¿Y el backend?", "后端呢？"],
        ["v0 started as frontend-only. In February 2026 it added Git, an editor and database connections, but it is still lighter on backend. Lovable is #1 for a SaaS MVP, with Supabase built in.", "O v0 nasceu só para frontend. Em fevereiro de 2026 ganhou Git, editor e conexão com banco de dados, mas continua mais leve no backend. O Lovable é o #1 para um MVP de SaaS, com Supabase integrado.", "v0 nació solo para frontend. En febrero de 2026 añadió Git, editor y conexión a base de datos, pero sigue siendo más ligero en backend. Lovable es el nº 1 para un MVP de SaaS, con Supabase integrado.", "v0 最初只做前端。2026 年 2 月增加了 Git、编辑器和数据库连接，但后端仍然偏弱。Lovable 是 SaaS MVP 的第 1，内置 Supabase。"]
      ),
      faq(
        ["What do they cost?", "Quanto custam?", "¿Cuánto cuestan?", "它们怎么收费？"],
        ["v0 Plus is $30 per user per month and includes $30 of monthly credits per user. The $20 Premium plan is no longer offered to new users. Lovable Pro starts at $25/mo for 100 credits, billed in credits, and is not priced per seat.", "O Plus do v0 é US$ 30 por usuário por mês e inclui US$ 30 de créditos mensais por usuário. O Premium de US$ 20 não é mais oferecido a novos usuários. O Pro do Lovable começa em US$ 25/mês por 100 créditos, em créditos, e não é cobrado por assento.", "Plus de v0 es 30 $ por usuario al mes e incluye 30 $ de créditos mensuales por usuario. El Premium de 20 $ ya no se ofrece a nuevos usuarios. Pro de Lovable empieza en 25 $/mes por 100 créditos, en créditos, y no se cobra por asiento.", "v0 Plus 为每位用户每月 $30，并含每位用户每月 $30 额度。$20 的 Premium 不再向新用户提供。Lovable Pro 从 $25/月、100 积分起，按积分计费，不按席位收费。"]
      ),
    ],
  },
  {
    ids: ["cursor", "copilot"],
    title: [
      "Cursor vs GitHub Copilot: a new editor, or the IDE you have",
      "Cursor vs GitHub Copilot: um editor novo ou a IDE que você tem",
      "Cursor vs GitHub Copilot: un editor nuevo o el IDE que ya tienes",
      "Cursor 与 GitHub Copilot：换一个编辑器，还是留在现有 IDE",
    ],
    desc: [
      "Cursor starts at Plus $8/mo and is the reference AI editor, built on VS Code. GitHub Copilot Pro is $10 per user per month and runs inside the editor you already use.",
      "O Cursor começa no Plus a US$ 8/mês e é o editor com IA de referência, baseado no VS Code. O Pro do GitHub Copilot é US$ 10 por usuário por mês e roda no editor que você já usa.",
      "Cursor empieza en Plus a 8 $/mes y es el editor con IA de referencia, basado en VS Code. Pro de GitHub Copilot es 10 $ por usuario al mes y funciona en el editor que ya usas.",
      "Cursor 从 Plus $8/月起，是基于 VS Code 的标杆 AI 编辑器。GitHub Copilot Pro 为每位用户每月 $10，在你现有的编辑器里运行。",
    ],
    pick: [
      ["you want the reference AI editor on VS Code, with autocomplete, multi-file edits and agents", "you want to stay in the editor you already use, with the widest IDE support"],
      ["você quer o editor com IA de referência em cima do VS Code, com autocompletar, edições em vários arquivos e agentes", "você quer ficar no editor que já usa, com o suporte a IDEs mais amplo"],
      ["quieres el editor con IA de referencia sobre VS Code, con autocompletado, ediciones en varios archivos y agentes", "quieres quedarte en el editor que ya usas, con el soporte de IDE más amplio"],
      ["你想要基于 VS Code 的标杆 AI 编辑器，带自动补全、多文件编辑和代理", "你想留在现有编辑器里，并要最广的 IDE 支持"],
    ],
    faqs: [
      faq(
        ["Which should I pick?", "Qual eu devo escolher?", "¿Cuál debería elegir?", "我该选哪个？"],
        ["Cursor is #1: the reference AI editor, built on VS Code, with autocomplete, multi-file edits and agents. Copilot is #2: it works in the editor you already use and has the widest IDE support.", "O Cursor é o #1: o editor com IA de referência, baseado no VS Code, com autocompletar, edições em vários arquivos e agentes. O Copilot é o #2: funciona no editor que você já usa e tem o suporte a IDEs mais amplo.", "Cursor es el nº 1: el editor con IA de referencia, basado en VS Code, con autocompletado, ediciones en varios archivos y agentes. Copilot es el nº 2: funciona en el editor que ya usas y tiene el soporte de IDE más amplio.", "Cursor 是第 1：基于 VS Code 的标杆 AI 编辑器，有自动补全、多文件编辑和代理。Copilot 是第 2：在你现有的编辑器里使用，IDE 支持最广。"]
      ),
      faq(
        ["What do they cost?", "Quanto custam?", "¿Cuánto cuestan?", "它们怎么收费？"],
        ["Cursor's individual plans are Plus $8, Premium $30, Super $100, and Ultra $200 a month. A shared pool refreshes weekly, and third-party models are billed separately from Premium up. Copilot Pro is $10 per user per month; Pro+ is $39 and Max is $100.", "Os planos individuais do Cursor são Plus a US$ 8, Premium a US$ 30, Super a US$ 100 e Ultra a US$ 200 por mês. Uma cota compartilhada renova toda semana, e modelos de terceiros são cobrados à parte a partir do Premium. O Pro do Copilot é US$ 10 por usuário por mês; o Pro+ é US$ 39 e o Max é US$ 100.", "Los planes individuales de Cursor son Plus a 8 $, Premium a 30 $, Super a 100 $ y Ultra a 200 $ al mes. Una bolsa compartida se renueva cada semana, y los modelos de terceros se cobran aparte desde Premium. Pro de Copilot es 10 $ por usuario al mes; Pro+ es 39 $ y Max es 100 $.", "Cursor 的个人套餐为 Plus $8、Premium $30、Super $100 和 Ultra $200 每月。共享额度池每周刷新，从 Premium 起第三方模型另行计费。Copilot Pro 为每位用户每月 $10；Pro+ 为 $39，Max 为 $100。"]
      ),
      faq(
        ["Do I have to export my code?", "Preciso exportar o meu código?", "¿Tengo que exportar mi código?", "我需要把代码导出吗？"],
        ["No. Both run on a project you already have. Cursor is an editor built on VS Code. Copilot sits inside your IDE.", "Não. Os dois rodam num projeto que você já tem. O Cursor é um editor baseado no VS Code. O Copilot fica dentro da sua IDE.", "No. Los dos funcionan en un proyecto que ya tienes. Cursor es un editor basado en VS Code. Copilot se queda dentro de tu IDE.", "不用。两者都在你已有的项目上运行。Cursor 是基于 VS Code 的编辑器。Copilot 待在你的 IDE 里。"]
      ),
    ],
  },
  {
    ids: ["cursor", "devin"],
    title: [
      "Cursor vs Devin Desktop: the reference editor, or the former Windsurf",
      "Cursor vs Devin Desktop: o editor de referência ou o antigo Windsurf",
      "Cursor vs Devin Desktop: el editor de referencia o el antiguo Windsurf",
      "Cursor 与 Devin Desktop：标杆编辑器，还是原来的 Windsurf",
    ],
    desc: [
      "Cursor's individual plans are Plus $8, Premium $30, Super $100, and Ultra $200 a month. Devin Desktop, the former Windsurf, lists Pro at $20/mo.",
      "Os planos individuais do Cursor são Plus a US$ 8, Premium a US$ 30, Super a US$ 100 e Ultra a US$ 200 por mês. O Devin Desktop, o antigo Windsurf, lista o Pro a US$ 20/mês.",
      "Los planes individuales de Cursor son Plus a 8 $, Premium a 30 $, Super a 100 $ y Ultra a 200 $ al mes. Devin Desktop, el antiguo Windsurf, lista Pro a 20 $/mes.",
      "Cursor 的个人套餐为 Plus $8、Premium $30、Super $100 和 Ultra $200 每月。Devin Desktop 即原来的 Windsurf，列出的 Pro 为 $20/月。",
    ],
    pick: [
      ["you want the reference AI editor and you will watch the usage pool, because third-party models are billed separately from Premium up", "you want the former Windsurf: Devin Desktop Pro is listed at $20/mo"],
      ["você quer o editor com IA de referência e vai olhar a cota de uso, porque modelos de terceiros são cobrados à parte a partir do Premium", "você quer o antigo Windsurf: o Pro do Devin Desktop está listado a US$ 20/mês"],
      ["quieres el editor con IA de referencia y vas a mirar la bolsa de uso, porque los modelos de terceros se cobran aparte desde Premium", "quieres el antiguo Windsurf: Pro de Devin Desktop está listado a 20 $/mes"],
      ["你想要标杆 AI 编辑器，并且会留意用量池，因为从 Premium 起第三方模型另行计费", "你想要原来的 Windsurf：Devin Desktop 的 Pro 列出为 $20/月"],
    ],
    faqs: [
      faq(
        ["How do they differ?", "Como eles diferem?", "¿En qué se diferencian?", "它们有什么不同？"],
        ["Devin Desktop is the former Windsurf and takes the same editor approach as Cursor. Its listed Pro price is $20/mo. Cursor is the reference editor, built on VS Code, and its cheapest paid plan is Plus at $8/mo.", "O Devin Desktop é o antigo Windsurf e tem a mesma proposta de editor do Cursor. O Pro listado é US$ 20/mês. O Cursor é o editor de referência, baseado no VS Code, e o plano pago mais barato é o Plus a US$ 8/mês.", "Devin Desktop es el antiguo Windsurf y tiene el mismo planteamiento de editor que Cursor. El Pro listado es 20 $/mes. Cursor es el editor de referencia, basado en VS Code, y su plan de pago más barato es Plus a 8 $/mes.", "Devin Desktop 就是原来的 Windsurf，编辑器思路与 Cursor 相同。列出的 Pro 为 $20/月。Cursor 是基于 VS Code 的标杆编辑器，最便宜的付费套餐是 Plus $8/月。"]
      ),
      faq(
        ["What do they cost?", "Quanto custam?", "¿Cuánto cuestan?", "它们怎么收费？"],
        ["Cursor's individual plans are Plus $8, Premium $30, Super $100, and Ultra $200 a month. The pricing page does not list a $20 Pro plan. Devin Desktop Pro is $20/mo. Older Windsurf Pro subscriptions at $15 were grandfathered.", "Os planos individuais do Cursor são Plus a US$ 8, Premium a US$ 30, Super a US$ 100 e Ultra a US$ 200 por mês. A página de preços não lista um Pro de US$ 20. O Pro do Devin Desktop é US$ 20/mês. Assinaturas antigas do Pro do Windsurf a US$ 15 foram mantidas.", "Los planes individuales de Cursor son Plus a 8 $, Premium a 30 $, Super a 100 $ y Ultra a 200 $ al mes. La página de precios no lista un Pro de 20 $. Pro de Devin Desktop es 20 $/mes. Las suscripciones antiguas de Pro de Windsurf a 15 $ se mantuvieron.", "Cursor 的个人套餐为 Plus $8、Premium $30、Super $100 和 Ultra $200 每月。价格页没有列出 $20 的 Pro。Devin Desktop Pro 为 $20/月。原来 $15 的 Windsurf Pro 订阅被保留。"]
      ),
      faq(
        ["Which bill is easier to predict?", "Qual conta é mais fácil de prever?", "¿Qué factura es más fácil de prever?", "哪边的账单更好预期？"],
        ["Cursor's lowest paid plan is Plus at $8/mo, and the pricing page says that plan includes Grok models only. Devin Desktop Pro is $20/mo, with frontier models inside the included quota. From Cursor Premium up, third-party models are billed separately, so the extra spend can surprise you. Neither sticker replaces the current price on the official page.", "O plano pago mais barato do Cursor é o Plus a US$ 8/mês, e a página de preços diz que esse plano inclui só modelos Grok. O Pro do Devin Desktop é US$ 20/mês, com modelos de fronteira dentro da cota incluída. A partir do Premium do Cursor, modelos de terceiros são cobrados à parte, então o gasto extra pode surpreender. Nenhum dos dois preços substitui o valor atual na página oficial.", "El plan de pago más barato de Cursor es Plus a 8 $/mes, y la página de precios dice que ese plan incluye solo modelos Grok. Pro de Devin Desktop es 20 $/mes, con modelos de frontera dentro de la bolsa incluida. Desde Premium de Cursor, los modelos de terceros se cobran aparte, así que el gasto extra puede sorprender. Ninguna de las dos cifras sustituye el precio actual en la página oficial.", "Cursor 最便宜的付费套餐是 Plus $8/月，价格页写明该套餐只包含 Grok 模型。Devin Desktop Pro 为 $20/月，额度内包含前沿模型。从 Cursor Premium 起，第三方模型另行计费，超出部分可能出乎意料。这两个标价都不能代替官方页面上的现价。"]
      ),
    ],
  },
  {
    ids: ["cursor", "windsurf"],
    rankAs: { windsurf: "devin" },
    title: [
      "Cursor vs Windsurf: the reference editor, or the IDE now called Devin Desktop",
      "Cursor vs Windsurf: o editor de referência ou a IDE que agora se chama Devin Desktop",
      "Cursor vs Windsurf: el editor de referencia o el IDE que ahora se llama Devin Desktop",
      "Cursor 与 Windsurf：标杆编辑器，还是现已改名 Devin Desktop 的 IDE",
    ],
    desc: [
      "Cursor's individual plans are Plus $8, Premium $30, Super $100, and Ultra $200 a month. Windsurf was renamed Devin Desktop on 2 June 2026; that pricing page lists Pro at $20/mo. Cursor is #1 for serious coding in an AI editor. The renamed product is #3.",
      "Os planos individuais do Cursor são Plus a US$ 8, Premium a US$ 30, Super a US$ 100 e Ultra a US$ 200 por mês. O Windsurf passou a se chamar Devin Desktop em 2 de junho de 2026; essa página de preços lista o Pro a US$ 20/mês. O Cursor é o #1 para programar a sério num editor com IA. O produto renomeado é o #3.",
      "Los planes individuales de Cursor son Plus a 8 $, Premium a 30 $, Super a 100 $ y Ultra a 200 $ al mes. Windsurf pasó a llamarse Devin Desktop el 2 de junio de 2026; esa página de precios lista Pro a 20 $/mes. Cursor es el nº 1 para programar en serio con un editor de IA. El producto renombrado es el nº 3.",
      "Cursor 的个人套餐为 Plus $8、Premium $30、Super $100 和 Ultra $200 每月。Windsurf 于 2026 年 6 月 2 日更名为 Devin Desktop；该价格页列出的 Pro 为 $20/月。用 AI 编辑器认真写代码时，Cursor 是第 1。改名后的产品是第 3。",
    ],
    pick: [
      ["you want the reference AI editor on VS Code, and you will watch the weekly usage pool, because from Premium up third-party models are billed separately and Plus includes Grok models only", "you want the IDE that was Windsurf, now Devin Desktop, with Pro at $20/mo and frontier models inside the included quota"],
      ["você quer o editor com IA de referência em cima do VS Code e vai olhar a cota semanal, porque a partir do Premium modelos de terceiros são cobrados à parte e o Plus inclui só modelos Grok", "você quer a IDE que era o Windsurf, agora Devin Desktop, com o Pro a US$ 20/mês e modelos de fronteira dentro da cota incluída"],
      ["quieres el editor con IA de referencia sobre VS Code y vas a mirar la bolsa semanal, porque desde Premium los modelos de terceros se cobran aparte y Plus incluye solo modelos Grok", "quieres el IDE que era Windsurf, ahora Devin Desktop, con Pro a 20 $/mes y modelos de frontera dentro de la bolsa incluida"],
      ["你想要基于 VS Code 的标杆 AI 编辑器，并且会留意每周用量池，因为从 Premium 起第三方模型另行计费，而且 Plus 只包含 Grok 模型", "你想要原来的 Windsurf，也就是现在的 Devin Desktop，Pro 为 $20/月，额度内包含前沿模型"],
    ],
    faqs: [
      faq(
        ["Is Windsurf still a separate product?", "O Windsurf ainda é um produto separado?", "¿Windsurf sigue siendo un producto aparte?", "Windsurf 还是单独的产品吗？"],
        ["No. On 2 June 2026 Cognition renamed Windsurf to Devin Desktop. The company says it is the same IDE, delivered as an update, and that existing plans, pricing and extensions carried over. windsurf.com now presents Devin Desktop. StackPodium ranks that product as Devin Desktop, #3 for serious coding in an AI editor. Cursor is #1 on that podium. Copilot, not in this pair, is #2.", "Não. Em 2 de junho de 2026 a Cognition renomeou o Windsurf para Devin Desktop. A empresa diz que é a mesma IDE, entregue como atualização, e que planos, preços e extensões existentes foram mantidos. O windsurf.com agora apresenta o Devin Desktop. O StackPodium ranqueia esse produto como Devin Desktop, #3 para programar a sério num editor com IA. O Cursor é o #1 nesse pódio. O Copilot, que não está neste par, é o #2.", "No. El 2 de junio de 2026 Cognition renombró Windsurf a Devin Desktop. La empresa dice que es el mismo IDE, entregado como actualización, y que los planes, precios y extensiones existentes se conservaron. windsurf.com ahora presenta Devin Desktop. StackPodium clasifica ese producto como Devin Desktop, nº 3 para programar en serio con un editor de IA. Cursor es el nº 1 en ese podio. Copilot, que no está en este par, es el nº 2.", "不是。2026 年 6 月 2 日 Cognition 把 Windsurf 更名为 Devin Desktop。公司称这是同一个 IDE，以更新的形式推送，原有套餐、价格和扩展都沿用。windsurf.com 现在展示的是 Devin Desktop。StackPodium 把该产品排为 Devin Desktop，在“用 AI 编辑器认真写代码”里是第 3。Cursor 在该榜是第 1。不在这一对里的 Copilot 是第 2。"]
      ),
      faq(
        ["What do they cost?", "Quanto custam?", "¿Cuánto cuestan?", "它们怎么收费？"],
        ["Checked November 2026. Cursor: Free, Plus $8, Premium $30, Super $100, and Ultra $200 a month. The pricing page says Plus includes Grok models only. From Premium up, third-party models are API list price, paid separately, and a shared usage pool refreshes weekly. Teams starts at $30 per user a month. Windsurf's successor, on devin.ai/pricing: Free, Pro $20, and Max $200 a month, plus Teams at $80/mo plus $40/mo per full seat. Paid Devin plans include a daily and weekly allowance; extra usage is API pricing. That page does not print the allowance as a fixed message or token count.", "Conferido em novembro de 2026. Cursor: grátis, Plus a US$ 8, Premium a US$ 30, Super a US$ 100 e Ultra a US$ 200 por mês. A página de preços diz que o Plus inclui só modelos Grok. A partir do Premium, modelos de terceiros saem a preço de API, pagos à parte, e uma cota compartilhada renova toda semana. O Teams começa em US$ 30 por usuário por mês. O sucessor do Windsurf, em devin.ai/pricing: grátis, Pro a US$ 20 e Max a US$ 200 por mês, mais Teams a US$ 80/mês mais US$ 40/mês por assento completo. Os planos pagos do Devin incluem uma cota diária e semanal; o uso extra sai a preço de API. Essa página não publica a cota como um número fixo de mensagens ou tokens.", "Comprobado en noviembre de 2026. Cursor: gratis, Plus a 8 $, Premium a 30 $, Super a 100 $ y Ultra a 200 $ al mes. La página de precios dice que Plus incluye solo modelos Grok. Desde Premium, los modelos de terceros van a precio de API, pagados aparte, y una bolsa compartida se renueva cada semana. Teams empieza en 30 $ por usuario al mes. El sucesor de Windsurf, en devin.ai/pricing: gratis, Pro a 20 $ y Max a 200 $ al mes, más Teams a 80 $/mes más 40 $/mes por asiento completo. Los planes de pago de Devin incluyen una bolsa diaria y semanal; el uso extra va a precio de API. Esa página no publica la bolsa como un número fijo de mensajes o tokens.", "核对于 2026 年 11 月。Cursor：免费、Plus $8、Premium $30、Super $100、Ultra $200 每月。价格页写明 Plus 只包含 Grok 模型。从 Premium 起，第三方模型按 API 标价另付，共享用量池每周刷新。Teams 从每位用户每月 $30 起。Windsurf 的后继产品，在 devin.ai/pricing：免费、Pro $20、Max $200 每月，另有 Teams 为 $80/月再加每个完整席位 $40/月。Devin 付费套餐含每日和每周额度；超出部分按 API 价格计费。该页没有把额度写成固定的消息数或 token 数。"]
      ),
      faq(
        ["Which one for daily coding in a project I already have?", "Qual para programar todo dia num projeto que eu já tenho?", "¿Cuál para programar cada día en un proyecto que ya tengo?", "在已有项目里每天写代码，选哪个？"],
        ["Cursor. It is #1: the reference AI editor, built on VS Code, with autocomplete, multi-file edits and agents. Its weakness at the low end is real: Plus does not include third-party models, and from Premium up those models are a separate bill. Pick Devin Desktop, the former Windsurf, if you want that IDE and a Pro plan at $20/mo whose quota includes frontier models. The weakness there is the other way around: the pricing page does not say how large that quota is, and the product no longer uses the Windsurf name.", "O Cursor. É o #1: o editor com IA de referência, baseado no VS Code, com autocompletar, edições em vários arquivos e agentes. A fraqueza na faixa barata é real: o Plus não inclui modelos de terceiros, e a partir do Premium esses modelos são uma conta à parte. Escolha o Devin Desktop, o antigo Windsurf, se você quer essa IDE e um Pro a US$ 20/mês cuja cota inclui modelos de fronteira. A fraqueza ali é o inverso: a página de preços não diz o tamanho dessa cota, e o produto não usa mais o nome Windsurf.", "Cursor. Es el nº 1: el editor con IA de referencia, basado en VS Code, con autocompletado, ediciones en varios archivos y agentes. La debilidad en la gama baja es real: Plus no incluye modelos de terceros, y desde Premium esos modelos son una factura aparte. Elige Devin Desktop, el antiguo Windsurf, si quieres ese IDE y un Pro a 20 $/mes cuya bolsa incluye modelos de frontera. La debilidad allí es la inversa: la página de precios no dice el tamaño de esa bolsa, y el producto ya no usa el nombre Windsurf.", "Cursor。它是第 1：基于 VS Code 的标杆 AI 编辑器，有自动补全、多文件编辑和代理。低价位的短板是实在的：Plus 不含第三方模型，从 Premium 起这些模型要另付。如果你想要那款 IDE，以及额度内包含前沿模型的 $20/月 Pro，就选原来的 Windsurf，也就是 Devin Desktop。那边的短板正好相反：价格页没有写出额度有多大，而且产品已经不用 Windsurf 这个名字。"]
      ),
    ],
  },
  {
    ids: ["claude", "codex"],
    title: [
      "Claude Code vs Codex: two terminal agents",
      "Claude Code vs Codex: dois agentes de terminal",
      "Claude Code vs Codex: dos agentes de terminal",
      "Claude Code 与 Codex：两个终端代理",
    ],
    desc: [
      "Claude Code leads for long tasks across a repository and is included in Pro and Max. Codex is OpenAI's equivalent, included in ChatGPT plans or usable with an API key. Neither has a separate dollar price listed.",
      "O Claude Code lidera em tarefas longas num repositório e está incluído no Pro e no Max. O Codex é o equivalente da OpenAI, incluído nos planos do ChatGPT ou utilizável com chave de API. Nenhum dos dois tem um preço em dólares separado.",
      "Claude Code lidera en tareas largas sobre un repositorio y está incluido en Pro y Max. Codex es el equivalente de OpenAI, incluido en los planes de ChatGPT o usable con clave de API. Ninguno de los dos tiene un precio en dólares aparte.",
      "Claude Code 在跨代码库的长任务上领先，包含在 Pro 和 Max 中。Codex 是 OpenAI 的对应产品，包含在 ChatGPT 套餐中，也可用 API 密钥。两者都没有单独的美元价格。",
    ],
    pick: [
      ["you want the terminal agent that leads on complex reasoning across the whole repository", "you already pay for ChatGPT, or you want an API key, and you need OpenAI's equivalent agent"],
      ["você quer o agente de terminal que lidera em raciocínio complexo em todo o repositório", "você já paga o ChatGPT, ou quer uma chave de API, e precisa do agente equivalente da OpenAI"],
      ["quieres el agente de terminal que lidera en razonamiento complejo sobre todo el repositorio", "ya pagas ChatGPT, o quieres una clave de API, y necesitas el agente equivalente de OpenAI"],
      ["你想要在整个代码库上复杂推理领先的那个终端代理", "你已经在付 ChatGPT，或想用 API 密钥，并且需要 OpenAI 的对应代理"],
    ],
    faqs: [
      faq(
        ["Which ranks higher?", "Qual fica na frente?", "¿Cuál queda por delante?", "哪个排得更前？"],
        ["Claude Code is #1 for handing a long task to a terminal agent: it works across the repository and leads on complex reasoning. Codex is #2, OpenAI's equivalent.", "O Claude Code é o #1 para delegar uma tarefa longa a um agente de terminal: trabalha em todo o repositório e lidera em raciocínio complexo. O Codex é o #2, o equivalente da OpenAI.", "Claude Code es el nº 1 para delegar una tarea larga a un agente de terminal: trabaja sobre todo el repositorio y lidera en razonamiento complejo. Codex es el nº 2, el equivalente de OpenAI.", "把长任务交给终端代理时，Claude Code 是第 1：它能处理整个代码库，复杂推理领先。Codex 是第 2，是 OpenAI 的对应产品。"]
      ),
      faq(
        ["How are they priced?", "Como eles são cobrados?", "¿Cómo se cobran?", "它们怎么收费？"],
        ["Claude Code is included in Pro and Max. Codex is included in ChatGPT plans, or usable with an API key. StackPodium does not list a separate dollar price for either.", "O Claude Code está incluído no Pro e no Max. O Codex está incluído nos planos do ChatGPT ou pode ser usado com chave de API. O StackPodium não lista um preço em dólares separado para nenhum dos dois.", "Claude Code está incluido en Pro y Max. Codex está incluido en los planes de ChatGPT o se puede usar con clave de API. StackPodium no lista un precio en dólares aparte para ninguno de los dos.", "Claude Code 包含在 Pro 和 Max 中。Codex 包含在 ChatGPT 套餐中，也可用 API 密钥。StackPodium 没有为两者单独列出美元价格。"]
      ),
      faq(
        ["Do I still need an editor?", "Ainda preciso de um editor?", "¿Sigo necesitando un editor?", "我还需要编辑器吗？"],
        ["Many people do. The site says developers often pair an editor for daily work with a terminal agent for the big tasks.", "Muita gente sim. O site diz que desenvolvedores costumam combinar um editor no dia a dia com um agente de terminal para as tarefas grandes.", "Mucha gente sí. El sitio dice que los desarrolladores suelen combinar un editor para el día a día con un agente de terminal para las tareas grandes.", "很多人需要。本站写过：开发者常常日常用编辑器，大任务再交给终端代理。"]
      ),
    ],
  },
  {
    ids: ["claude", "cursor"],
    title: [
      "Claude Code vs Cursor: a terminal agent, or an AI editor",
      "Claude Code vs Cursor: agente de terminal ou editor com IA",
      "Claude Code vs Cursor: agente de terminal o editor con IA",
      "Claude Code 与 Cursor：终端代理，还是 AI 编辑器",
    ],
    desc: [
      "These are different tools. Cursor starts at Plus $8/mo and is an editor for daily coding. Claude Code is a terminal agent for a whole task, included in Claude Pro and Max.",
      "São ferramentas diferentes. O Cursor começa no Plus a US$ 8/mês e é um editor para programar no dia a dia. O Claude Code é um agente de terminal para uma tarefa inteira, incluído no Pro e no Max da Claude.",
      "Son herramientas distintas. Cursor empieza en Plus a 8 $/mes y es un editor para programar en el día a día. Claude Code es un agente de terminal para una tarea entera, incluido en Pro y Max de Claude.",
      "它们是不同的工具。Cursor 从 Plus $8/月起，是日常写代码的编辑器。Claude Code 是处理整项任务的终端代理，包含在 Claude 的 Pro 和 Max 中。",
    ],
    pick: [
      ["you want to hand over a long task, such as a refactor or a failing test suite, and review the result", "you want an editor for daily work: autocomplete, multi-file edits and agents, on top of VS Code"],
      ["você quer entregar uma tarefa longa, como uma refatoração ou uma suíte de testes quebrada, e revisar o resultado", "você quer um editor para o dia a dia: autocompletar, edições em vários arquivos e agentes, em cima do VS Code"],
      ["quieres entregar una tarea larga, como una refactorización o una suite de tests rota, y revisar el resultado", "quieres un editor para el día a día: autocompletado, ediciones en varios archivos y agentes, sobre VS Code"],
      ["你想把一项长任务交出去，比如重构或修一组失败的测试，然后只审查结果", "你想要一个日常用的编辑器：自动补全、多文件编辑和代理，基于 VS Code"],
    ],
    faqs: [
      faq(
        ["Are they the same kind of tool?", "São o mesmo tipo de ferramenta?", "¿Son el mismo tipo de herramienta?", "它们是同一类工具吗？"],
        ["No. Cursor is an AI editor and is #1 for serious coding in an editor. Claude Code is a terminal agent for a whole task across the repository and is #1 for that case.", "Não. O Cursor é um editor com IA e é o #1 para programar a sério num editor. O Claude Code é um agente de terminal para uma tarefa inteira no repositório e é o #1 nesse caso.", "No. Cursor es un editor con IA y es el nº 1 para programar en serio en un editor. Claude Code es un agente de terminal para una tarea entera en el repositorio y es el nº 1 en ese caso.", "不是。Cursor 是 AI 编辑器，在“用编辑器认真写代码”里排第 1。Claude Code 是处理整个代码库中整项任务的终端代理，在那个场景里排第 1。"]
      ),
      faq(
        ["Can I use both?", "Posso usar os dois?", "¿Puedo usar los dos?", "两个可以一起用吗？"],
        ["Yes. The site says many developers pair an editor for daily work with a terminal agent for the big tasks.", "Sim. O site diz que muitos desenvolvedores combinam um editor no dia a dia com um agente de terminal para as tarefas grandes.", "Sí. El sitio dice que muchos desarrolladores combinan un editor para el día a día con un agente de terminal para las tareas grandes.", "可以。本站写过：很多开发者日常用编辑器，大任务再交给终端代理。"]
      ),
      faq(
        ["What do they cost?", "Quanto custam?", "¿Cuánto cuestan?", "它们怎么收费？"],
        ["Cursor's individual plans are Plus $8, Premium $30, Super $100, and Ultra $200 a month. Usage is a shared pool that refreshes weekly. Claude Code is included in Claude Pro and Max.", "Os planos individuais do Cursor são Plus a US$ 8, Premium a US$ 30, Super a US$ 100 e Ultra a US$ 200 por mês. O uso é uma cota compartilhada que renova toda semana. O Claude Code está incluído no Pro e no Max da Claude.", "Los planes individuales de Cursor son Plus a 8 $, Premium a 30 $, Super a 100 $ y Ultra a 200 $ al mes. El uso es una bolsa compartida que se renueva cada semana. Claude Code está incluido en Pro y Max de Claude.", "Cursor 的个人套餐为 Plus $8、Premium $30、Super $100 和 Ultra $200 每月。用量是每周刷新的共享额度池。Claude Code 包含在 Claude 的 Pro 和 Max 中。"]
      ),
    ],
  },
  {
    ids: ["n8n", "make"],
    title: [
      "n8n vs Make: self-host, or the easiest visual builder",
      "n8n vs Make: auto-hospedar ou o construtor visual mais fácil",
      "n8n vs Make: autoalojar o el constructor visual más fácil",
      "n8n 与 Make：自己托管，还是最容易的可视化工具",
    ],
    desc: [
      "n8n is free to self-host. Cloud Starter is €20/mo billed annually, and it ranks #1 when an agent must act inside your tools. Make lists Free at $0 for 1,000 credits a month and Core from $9/mo. It is #2, the easiest visual builder for a first agent.",
      "O n8n é grátis para auto-hospedar. O Starter na nuvem é €20/mês no plano anual, e ele fica em #1 quando o agente precisa agir dentro das suas ferramentas. O Make lista o grátis a US$ 0 por 1.000 créditos por mês e o Core a partir de US$ 9/mês. É o #2, o construtor visual mais fácil para um primeiro agente.",
      "n8n es gratis para autoalojar. El Starter en la nube es 20 €/mes facturado al año, y queda nº 1 cuando el agente tiene que actuar dentro de tus herramientas. Make lista el gratis a 0 $ por 1.000 créditos al mes y Core desde 9 $/mes. Es el nº 2, el constructor visual más fácil para un primer agente.",
      "n8n 可免费自托管。云端 Starter 为年付 €20/月，当代理必须在你的工具里操作时排第 1。Make 列出免费为 $0、每月 1,000 点额度，Core 起价 $9/月。它是第 2，做第一个代理时最容易的可视化工具。",
    ],
    pick: [
      ["the agent has to act inside your tools and you want a source-available base you can self-host", "you want the easiest visual builder for a first agent and you do not need to self-host"],
      ["o agente precisa agir dentro das suas ferramentas e você quer uma base com código disponível que dá para auto-hospedar", "você quer o construtor visual mais fácil para um primeiro agente e não precisa auto-hospedar"],
      ["el agente tiene que actuar dentro de tus herramientas y quieres una base con código disponible que puedas autoalojar", "quieres el constructor visual más fácil para un primer agente y no necesitas autoalojar"],
      ["代理必须在你的工具里操作，而且你想要一个可以自托管、源代码可获取的基础", "你想要做第一个代理时最容易的可视化工具，并且不需要自托管"],
    ],
    faqs: [
      faq(
        ["Which should I pick?", "Qual eu devo escolher?", "¿Cuál debería elegir?", "我该选哪个？"],
        ["For an agent that has to act inside your tools, n8n is #1: source-available, with native AI nodes, and you can self-host. Make is #2, and it is the easier visual start for a first agent. Zapier, not in this pair, is #3 when you want the widest catalogue. If a visual flow is not enough, the next ranking is a custom agent in code.", "Para um agente que precisa agir dentro das suas ferramentas, o n8n é o #1: código disponível, com nós de IA nativos, e dá para auto-hospedar. O Make é o #2, e é o começo visual mais fácil para um primeiro agente. O Zapier, que não está neste par, é o #3 quando você quer o catálogo mais amplo. Se o fluxo visual não bastar, o ranking seguinte é um agente sob medida, com código.", "Para un agente que tiene que actuar dentro de tus herramientas, n8n es el nº 1: código disponible, con nodos de IA nativos, y puedes autoalojarlo. Make es el nº 2, y es el arranque visual más fácil para un primer agente. Zapier, que no está en este par, es el nº 3 cuando quieres el catálogo más amplio. Si el flujo visual no basta, el ranking siguiente es un agente a medida, con código.", "当代理必须在你的工具里操作时，n8n 是第 1：源代码可获取，带原生 AI 节点，并且可以自托管。Make 是第 2，做第一个代理时更容易的可视化起点。不在这一对里的 Zapier 是第 3，适合你想要最广目录的时候。如果可视化流程不够，下一个排名是用代码做的定制代理。"]
      ),
      faq(
        ["What do the plans cost?", "Quanto custam os planos?", "¿Cuánto cuestan los planes?", "套餐怎么收费？"],
        ["Checked November 2026. n8n's pricing page: self-host the Community edition, or cloud Starter at €20/mo, Pro at €50/mo, and Business at €667/mo, each billed annually. Enterprise is contact sales. The Business card is marked self-hosted. One execution is a full workflow run, not a single step. n8n's help center says Cloud Starter includes 2,500 executions a month, and it names Pro-1 at 10,000 and Pro-2 at 50,000, without tying those names to the €50 price on the pricing card. Make's comparison page: Free is $0 for 1,000 credits a month, then Core from $9/mo, Pro from $16/mo, and Team from $29/mo, starting at 10,000 credits. Most actions use 1 credit. Make says annual billing costs less than monthly. We are not quoting a separate month-to-month slider price, because that figure was not in the page we could read.", "Conferido em novembro de 2026. Página de preços do n8n: auto-hospede a edição Community, ou Starter na nuvem a €20/mês, Pro a €50/mês e Business a €667/mês, cada um no plano anual. O Enterprise é contato comercial. O cartão do Business está marcado como auto-hospedado. Uma execução é uma rodada completa do fluxo, não um passo. O help center do n8n diz que o Cloud Starter inclui 2.500 execuções por mês, e nomeia o Pro-1 com 10.000 e o Pro-2 com 50.000, sem ligar esses nomes ao preço de €50 no cartão. Página comparativa do Make: o grátis é US$ 0 por 1.000 créditos por mês, depois Core a partir de US$ 9/mês, Pro a partir de US$ 16/mês e Team a partir de US$ 29/mês, a partir de 10.000 créditos. A maioria das ações usa 1 crédito. O Make diz que o plano anual custa menos que o mensal. Não citamos um preço mês a mês separado do controle deslizante, porque esse número não estava na página que deu para ler.", "Comprobado en noviembre de 2026. Página de precios de n8n: autoaloja la edición Community, o Starter en la nube a 20 €/mes, Pro a 50 €/mes y Business a 667 €/mes, cada uno facturado al año. Enterprise es contacto comercial. La ficha de Business está marcada como autoalojada. Una ejecución es una pasada completa del flujo, no un paso. El centro de ayuda de n8n dice que Cloud Starter incluye 2.500 ejecuciones al mes, y nombra Pro-1 con 10.000 y Pro-2 con 50.000, sin atar esos nombres al precio de 50 € de la ficha. Comparativa de Make: el gratis es 0 $ por 1.000 créditos al mes, luego Core desde 9 $/mes, Pro desde 16 $/mes y Team desde 29 $/mes, desde 10.000 créditos. La mayoría de las acciones usan 1 crédito. Make dice que el plan anual cuesta menos que el mensual. No citamos un precio mes a mes aparte del control deslizante, porque esa cifra no estaba en la página que se pudo leer.", "核对于 2026 年 11 月。n8n 价格页：可自托管 Community 版，或云端 Starter 年付 €20/月、Pro 年付 €50/月、Business 年付 €667/月。Enterprise 为联系销售。Business 卡片标明为自托管。一次执行是整条工作流跑完，不是一个步骤。n8n 帮助中心写明 Cloud Starter 每月含 2,500 次执行，并列出 Pro-1 为 10,000 次、Pro-2 为 50,000 次，但没有把这些名称对应到价格卡片上的 €50。Make 对比页：免费为 $0、每月 1,000 点额度，然后 Core 起价 $9/月、Pro 起价 $16/月、Team 起价 $29/月，从 10,000 点额度起。大多数操作消耗 1 点。Make 称年付比月付便宜。我们没有另引一套按月滑杆价格，因为能读到的页面里没有这个数字。"]
      ),
      faq(
        ["What are the main limits?", "Quais são os limites principais?", "¿Cuáles son los límites principales?", "主要限制是什么？"],
        ["n8n's help center says a Cloud run that would pass the monthly execution quota fails instead of queueing. The Community edition is under the Sustainable Use License: your own internal, personal, or non-commercial use. n8n does not call that license open source. Make's pricing page says scenarios stop when credits run out, and that routers and error handlers do not use credits. Its pricing FAQ says there are more than 1,000 standard apps. We did not confirm a Make edition you can self-host.", "O help center do n8n diz que uma execução na nuvem que passaria da cota mensal falha, em vez de entrar numa fila. A edição Community está sob a Sustainable Use License: uso interno, pessoal ou não comercial. A n8n não chama essa licença de código aberto. A página de preços do Make diz que os cenários param quando os créditos acabam, e que roteadores e tratadores de erro não usam créditos. O FAQ de preços diz que há mais de 1.000 apps padrão. Não confirmamos uma edição do Make para auto-hospedar.", "El centro de ayuda de n8n dice que una ejecución en la nube que superaría la cuota mensual falla, en lugar de ponerse en cola. La edición Community está bajo la Sustainable Use License: uso interno, personal o no comercial. n8n no llama a esa licencia código abierto. La página de precios de Make dice que los escenarios se detienen cuando se acaban los créditos, y que los routers y los manejadores de error no usan créditos. El FAQ de precios dice que hay más de 1.000 apps estándar. No confirmamos una edición de Make para autoalojar.", "n8n 帮助中心写明，云端一次运行如果会超出当月执行配额，会失败，而不是排队。Community 版采用 Sustainable Use License：限于你自己的内部、个人或非商业用途。n8n 不把该许可证称为开源。Make 的价格页写明额度用完后场景会停止，路由器和错误处理模块不消耗额度。价格 FAQ 写明标准应用超过 1,000 个。我们没有核实到可以自托管的 Make 版本。"]
      ),
    ],
  },
  {
    ids: ["n8n", "zapier"],
    title: [
      "n8n vs Zapier: self-host, or 8,000 apps billed per task",
      "n8n vs Zapier: auto-hospedar ou 8.000 apps cobrados por tarefa",
      "n8n vs Zapier: autoalojar o 8.000 apps facturadas por tarea",
      "n8n 与 Zapier：自己托管，还是 8,000 个应用按任务计费",
    ],
    desc: [
      "n8n is free to self-host, or cloud Starter at €20/mo billed annually. Zapier has the broadest catalogue, over 8,000 apps, and bills per task. Zapier's entry price is not listed.",
      "O n8n é grátis para auto-hospedar, ou Starter na nuvem a €20/mês no plano anual. O Zapier tem o catálogo mais amplo, mais de 8.000 apps, e cobra por tarefa. O preço de entrada do Zapier não está listado.",
      "n8n es gratis para autoalojar, o Starter en la nube a 20 €/mes facturado al año. Zapier tiene el catálogo más amplio, más de 8.000 apps, y cobra por tarea. El precio de entrada de Zapier no está listado.",
      "n8n 可免费自托管，云端 Starter 为年付 €20/月。Zapier 的应用目录最广，超过 8,000 个，按任务计费。Zapier 的入门价格未列出。",
    ],
    pick: [
      ["you want to self-host, or you need native AI nodes inside your own tools", "you want the widest app catalogue and you will watch a per-task bill"],
      ["você quer auto-hospedar ou precisa de nós de IA nativos dentro das suas próprias ferramentas", "você quer o catálogo de apps mais amplo e vai ficar de olho numa conta por tarefa"],
      ["quieres autoalojar o necesitas nodos de IA nativos dentro de tus propias herramientas", "quieres el catálogo de apps más amplio y vas a vigilar una factura por tarea"],
      ["你想自己托管，或需要在自己的工具里用原生 AI 节点", "你想要最广的应用目录，并且会留意按任务出的账单"],
    ],
    faqs: [
      faq(
        ["Which has more apps?", "Qual tem mais apps?", "¿Cuál tiene más apps?", "哪个应用更多？"],
        ["Zapier, with a catalogue of over 8,000 apps. It ranks #3. n8n ranks #1 as the base when the agent has to act inside your tools.", "O Zapier, com um catálogo de mais de 8.000 apps. Ele fica em #3. O n8n fica em #1 como base quando o agente precisa agir dentro das suas ferramentas.", "Zapier, con un catálogo de más de 8.000 apps. Queda nº 3. n8n queda nº 1 como base cuando el agente tiene que actuar dentro de tus herramientas.", "Zapier，目录超过 8,000 个应用。它排第 3。当代理必须在你的工具里操作时，n8n 作为基础排第 1。"]
      ),
      faq(
        ["How does billing differ?", "Como a cobrança difere?", "¿En qué se diferencia el cobro?", "计费有什么不同？"],
        ["n8n is free when you self-host. Cloud Starter is €20/mo, billed annually. Zapier bills per task, so watch your volume. StackPodium does not list Zapier's entry price.", "O n8n é grátis se você auto-hospeda. O Starter na nuvem é €20/mês, no plano anual. O Zapier cobra por tarefa, então fique de olho no volume. O StackPodium não lista o preço de entrada do Zapier.", "n8n es gratis si lo autoalojas. El Starter en la nube es 20 €/mes, facturado al año. Zapier cobra por tarea, así que vigila el volumen. StackPodium no lista el precio de entrada de Zapier.", "n8n 自托管免费。云端 Starter 为年付 €20/月。Zapier 按任务计费，所以要注意用量。StackPodium 没有列出 Zapier 的入门价格。"]
      ),
      faq(
        ["Which can I run myself?", "Qual eu posso rodar eu mesmo?", "¿Cuál puedo ejecutar yo mismo?", "哪个可以自己跑？"],
        ["n8n. It is source-available under the fair-code Sustainable Use License, and the Community edition is free to self-host. n8n does not call that license open source. Zapier is a hosted catalogue.", "O n8n. O código está disponível sob a Sustainable Use License, fair-code, e a edição Community é grátis para auto-hospedar. A n8n não chama essa licença de código aberto. O Zapier é um catálogo hospedado.", "n8n. El código está disponible bajo la Sustainable Use License, fair-code, y la edición Community es gratis para autoalojar. n8n no llama a esa licencia código abierto. Zapier es un catálogo alojado.", "n8n。源代码在 fair-code 的 Sustainable Use License 下可获取，Community 版可免费自托管。n8n 不把该许可证称为开源。Zapier 是托管的应用目录。"]
      ),
    ],
  },
  {
    ids: ["langgraph", "crewai"],
    title: [
      "LangGraph vs CrewAI: reliable graphs, or a faster start",
      "LangGraph vs CrewAI: grafos confiáveis ou um começo mais rápido",
      "LangGraph vs CrewAI: grafos fiables o un arranque más rápido",
      "LangGraph 与 CrewAI：可靠的图，还是更快上手",
    ],
    desc: [
      "Both are open source, with no subscription price listed. LangGraph models agents as stateful graphs for complex flows that have to be reliable. CrewAI is teams of agents with roles, and it is quicker to start.",
      "Os dois são código aberto, sem preço de assinatura listado. O LangGraph modela agentes como grafos com estado, para fluxos complexos que precisam ser confiáveis. O CrewAI são equipes de agentes com papéis, e o começo é mais rápido.",
      "Los dos son código abierto, sin precio de suscripción listado. LangGraph modela agentes como grafos con estado, para flujos complejos que deben ser fiables. CrewAI son equipos de agentes con roles, y el arranque es más rápido.",
      "两者都是开源，没有列出订阅价格。LangGraph 把代理建成有状态的图，适合必须可靠的复杂流程。CrewAI 是按角色分工的代理团队，上手更快。",
    ],
    pick: [
      ["the flow is complex and has to be reliable, and you will model it as a stateful graph", "you want a team of agents with roles and a quicker start than LangGraph"],
      ["o fluxo é complexo e precisa ser confiável, e você vai modelá-lo como um grafo com estado", "você quer uma equipe de agentes com papéis e um começo mais rápido que o LangGraph"],
      ["el flujo es complejo y tiene que ser fiable, y vas a modelarlo como un grafo con estado", "quieres un equipo de agentes con roles y un arranque más rápido que LangGraph"],
      ["流程复杂而且必须可靠，你会把它建成有状态的图", "你想要按角色分工的代理团队，并且比 LangGraph 更快上手"],
    ],
    faqs: [
      faq(
        ["Which should I start with?", "Por qual eu começo?", "¿Por cuál empiezo?", "我该从哪个开始？"],
        ["CrewAI is quicker to start: teams of agents with roles, and it ranks #2. LangGraph ranks #1 for complex flows that have to be reliable, modeled as stateful graphs.", "O CrewAI tem o começo mais rápido: equipes de agentes com papéis, e fica em #2. O LangGraph fica em #1 para fluxos complexos que precisam ser confiáveis, modelados como grafos com estado.", "CrewAI tiene el arranque más rápido: equipos de agentes con roles, y queda nº 2. LangGraph queda nº 1 para flujos complejos que deben ser fiables, modelados como grafos con estado.", "CrewAI 上手更快：按角色分工的代理团队，排第 2。LangGraph 排第 1，适合必须可靠的复杂流程，建成有状态的图。"]
      ),
      faq(
        ["What do they cost?", "Quanto custam?", "¿Cuánto cuestan?", "它们怎么收费？"],
        ["Both are listed as open source. No subscription price is shown for either.", "Os dois estão listados como código aberto. Não há preço de assinatura para nenhum dos dois.", "Los dos están listados como código abierto. No hay precio de suscripción para ninguno de los dos.", "两者都标为开源。都没有列出订阅价格。"]
      ),
      faq(
        ["Should I use n8n instead?", "Devo usar o n8n em vez disso?", "¿Debería usar n8n en su lugar?", "是不是该改用 n8n？"],
        ["If n8n can do the job, start there. Move to code when the visual flow falls short.", "Se o n8n resolver, comece por lá. Passe para código quando o fluxo visual não der conta.", "Si n8n puede hacerlo, empieza allí. Pasa a código cuando el flujo visual se quede corto.", "如果 n8n 能做，就从那里开始。可视化流程不够用时再转向代码。"]
      ),
    ],
  },
  {
    ids: ["rosebud", "gdevelop"],
    title: [
      "Rosebud AI vs GDevelop: a playable game this weekend, or a no-code engine",
      "Rosebud AI vs GDevelop: um jogo jogável neste fim de semana ou um motor sem código",
      "Rosebud AI vs GDevelop: un juego jugable este fin de semana o un motor sin código",
      "Rosebud AI 与 GDevelop：这个周末能玩的游戏，还是无代码引擎",
    ],
    desc: [
      "Rosebud AI goes from a prompt to a playable browser game, with assets, NPCs and multiplayer, on free and paid plans. No dollar price is listed. GDevelop is a no-code engine with an AI assistant if the game grows; its price is not listed either.",
      "O Rosebud AI vai de um prompt a um jogo jogável no navegador, com assets, NPCs e multiplayer, em planos grátis e pagos. Não há preço em dólares. O GDevelop é um motor sem código com assistente de IA se o jogo crescer; o preço também não está listado.",
      "Rosebud AI va de un prompt a un juego jugable en el navegador, con assets, NPC y multijugador, en planes gratis y de pago. No hay precio en dólares. GDevelop es un motor sin código con asistente de IA si el juego crece; su precio tampoco está listado.",
      "Rosebud AI 从提示词做到可玩的网页游戏，素材、NPC 和多人联机都包含，有免费和付费套餐。没有列出美元价格。如果游戏会变大，GDevelop 是带 AI 助手的无代码引擎；它的价格也没有列出。",
    ],
    pick: [
      ["you want a playable browser game from a prompt this weekend, including assets, NPCs and multiplayer", "the game may grow, and you want a no-code engine with an AI assistant rather than another prompt tool"],
      ["você quer um jogo jogável no navegador a partir de um prompt neste fim de semana, com assets, NPCs e multiplayer", "o jogo pode crescer, e você quer um motor sem código com assistente de IA em vez de outra ferramenta de prompt"],
      ["quieres un juego jugable en el navegador desde un prompt este fin de semana, con assets, NPC y multijugador", "el juego puede crecer, y quieres un motor sin código con asistente de IA en lugar de otra herramienta de prompt"],
      ["你想这个周末用提示词做出能玩的网页游戏，并且要素材、NPC 和多人联机", "游戏可能会变大，你想要带 AI 助手的无代码引擎，而不是另一个提示词工具"],
    ],
    faqs: [
      faq(
        ["Which gets a game online this weekend?", "Qual coloca um jogo no ar neste fim de semana?", "¿Cuál publica un juego este fin de semana?", "这个周末哪个能把游戏做出来？"],
        ["Rosebud AI is #1: from a prompt to a playable browser game, with assets, NPCs and multiplayer. GDevelop is #3, a no-code engine with an AI assistant, a good step if the game grows.", "O Rosebud AI é o #1: do prompt ao jogo jogável no navegador, com assets, NPCs e multiplayer. O GDevelop é o #3, um motor sem código com assistente de IA, um bom passo se o jogo crescer.", "Rosebud AI es el nº 1: de prompt a juego jugable en el navegador, con assets, NPC y multijugador. GDevelop es el nº 3, un motor sin código con asistente de IA, un buen paso si el juego crece.", "Rosebud AI 是第 1：从提示词到可玩的网页游戏，素材、NPC 和多人联机都包含。GDevelop 是第 3，内置 AI 助手的无代码引擎，游戏变大时是不错的下一步。"]
      ),
      faq(
        ["What do they cost?", "Quanto custam?", "¿Cuánto cuestan?", "它们怎么收费？"],
        ["Rosebud lists free and paid plans, with no dollar amount. GDevelop's price is not listed (see its pricing page). Do not treat a missing number as free.", "O Rosebud lista planos grátis e pagos, sem um valor em dólares. O preço do GDevelop não está listado (veja a página de preços). Não trate um número ausente como grátis.", "Rosebud lista planes gratis y de pago, sin una cifra en dólares. El precio de GDevelop no está listado (mira su página de precios). No trates una cifra ausente como gratis.", "Rosebud 列出了免费和付费套餐，但没有美元金额。GDevelop 的价格未列出（请看它的价格页）。没有写出数字，不等于免费。"]
      ),
      faq(
        ["What if I want the project to be mine?", "E se eu quiser que o projeto seja meu?", "¿Y si quiero que el proyecto sea mío?", "如果我希望项目归我自己呢？"],
        ["The #2 pick in that ranking is a coding agent plus Three.js: more flexible, and the project is yours. Prompt-to-game tools are the easiest way in. StackPodium does not describe a code export for Rosebud AI or for GDevelop.", "A escolha #2 nesse ranking é um agente de código mais Three.js: mais flexível, e o projeto é seu. As ferramentas de prompt para jogo são a entrada mais fácil. O StackPodium não descreve exportação de código para o Rosebud AI nem para o GDevelop.", "La elección nº 2 en ese ranking es un agente de código más Three.js: más flexible, y el proyecto es tuyo. Las herramientas de prompt a juego son la entrada más fácil. StackPodium no describe una exportación de código para Rosebud AI ni para GDevelop.", "该排名的第 2 是编程代理加 Three.js：更灵活，项目也归你。提示词生成游戏最容易入门。StackPodium 没有描述 Rosebud AI 或 GDevelop 如何导出代码。"]
      ),
    ],
  },
];

module.exports = { labels, tools, pairs };
