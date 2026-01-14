<!doctype html>
<html lang="pt-br">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>FARMA LIMA</title>

  <style>
    :root{
      --PRIMARY:#00E5D8;
      --SECONDARY:#FF3B3B;
      --DARK:#0B0F14;
      --CARD:#121821;
      --MUTED:#9CA3AF;
      --WHITE:#FFFFFF;
      --RADIUS:18px;
      --BORDER: rgba(255,255,255,.08);
      --SHADOW: 0 20px 60px rgba(0,0,0,.45);
    }

    *{ box-sizing:border-box; }
    body{
      margin:0;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      background: radial-gradient(1100px 700px at 15% 10%, rgba(0,229,216,.18), transparent 55%),
                  radial-gradient(1100px 700px at 85% 30%, rgba(255,59,59,.14), transparent 55%),
                  var(--DARK);
      color: var(--WHITE);
      text-transform: uppercase;
      letter-spacing: .6px;
    }
    a{ color:inherit; text-decoration:none; }

    .wrap{
      max-width: 1120px;
      margin: 0 auto;
      padding: 22px 16px 80px;
    }

    /* Topbar */
    .topbar{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:16px;
      padding: 14px 16px;
      border: 1px solid var(--BORDER);
      background: rgba(18,24,33,.65);
      backdrop-filter: blur(10px);
      border-radius: var(--RADIUS);
      box-shadow: var(--SHADOW);
    }
    .brand{
      display:flex;
      align-items:center;
      gap:12px;
      min-width: 240px;
    }
    .brand img{
      width: 42px;
      height: 42px;
      object-fit: contain;
      filter: drop-shadow(0 8px 14px rgba(0,0,0,.35));
    }
    .brand .title{
      display:flex;
      flex-direction:column;
      line-height:1.05;
    }
    .brand .title strong{
      font-weight: 900;
      letter-spacing: 1.2px;
      font-size: 15px;
    }
    .brand .title span{
      color: var(--MUTED);
      font-size: 11px;
      letter-spacing: 1px;
    }

    .actions{
      display:flex;
      align-items:center;
      gap:10px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .btn{
      border:1px solid var(--BORDER);
      background: rgba(255,255,255,.04);
      color: var(--WHITE);
      padding: 10px 14px;
      border-radius: 999px;
      font-weight: 900;
      letter-spacing: 1.2px;
      cursor:pointer;
      transition: .18s ease;
      display:inline-flex;
      align-items:center;
      gap:10px;
      user-select:none;
    }
    .btn:hover{ transform: translateY(-1px); border-color: rgba(255,255,255,.16); }
    .btn.primary{
      background: linear-gradient(180deg, rgba(0,229,216,1), rgba(0,180,170,1));
      color:#00110f;
      border: none;
    }
    .btn.danger{
      background: linear-gradient(180deg, rgba(255,59,59,1), rgba(200,30,30,1));
      border:none;
    }
    .pill{
      font-size: 11px;
      padding: 6px 10px;
      border-radius: 999px;
      border: 1px solid rgba(0,229,216,.35);
      background: rgba(0,229,216,.10);
      color: var(--PRIMARY);
      font-weight: 900;
      letter-spacing: 1.1px;
      display:inline-flex;
      align-items:center;
      gap:8px;
    }

    /* Hero */
    .hero{
      margin-top: 16px;
      border-radius: var(--RADIUS);
      border: 1px solid var(--BORDER);
      background: rgba(18,24,33,.55);
      backdrop-filter: blur(10px);
      box-shadow: var(--SHADOW);
      overflow:hidden;
      position:relative;
    }
    .hero .wave{
      position:absolute;
      inset: -140px -140px auto -140px;
      height: 320px;
      pointer-events:none;
      opacity:.9;
    }
    .hero .wave svg{ width:100%; height:100%; display:block; }
    .heroInner{
      display:grid;
      grid-template-columns: 1.3fr .9fr;
      gap: 18px;
      padding: 26px;
      align-items: center;
      position:relative;
      z-index: 2;
    }
    .hero h1{
      margin: 0 0 10px;
      font-size: clamp(22px, 3.6vw, 38px);
      font-weight: 1000;
      letter-spacing: 2px;
    }
    .hero p{
      margin:0;
      color: var(--MUTED);
      line-height: 1.4;
      font-size: 13px;
      letter-spacing: 1px;
      text-transform: none; /* leitura melhor */
    }
    .heroCard{
      border: 1px solid rgba(255,255,255,.10);
      background: linear-gradient(135deg, rgba(0,229,216,.10), rgba(255,59,59,.08));
      border-radius: var(--RADIUS);
      padding: 16px;
      display:flex;
      gap: 14px;
      align-items:center;
      justify-content: space-between;
      min-height: 130px;
    }
    .heroCard .mini{
      display:flex;
      flex-direction:column;
      gap:6px;
    }
    .heroCard .mini strong{
      font-size: 13px;
      font-weight: 1000;
      letter-spacing: 1.4px;
    }
    .heroCard .mini span{
      color: var(--MUTED);
      font-size: 11px;
      letter-spacing: 1px;
      text-transform:none;
    }
    .heroCard img{
      width: 120px;
      height: 70px;
      object-fit: contain;
      opacity: .95;
      filter: drop-shadow(0 14px 24px rgba(0,0,0,.35));
    }

    /* Units */
    .sectionHead{
      display:flex;
      align-items:end;
      justify-content:space-between;
      gap:16px;
      margin: 18px 2px 10px;
    }
    .sectionHead h2{
      margin:0;
      font-size: 16px;
      letter-spacing: 2px;
      font-weight: 1000;
    }
    .sectionHead small{
      color: var(--MUTED);
      letter-spacing: 1px;
      text-transform:none;
    }

    .grid{
      display:grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }

    .unit{
      background: rgba(18,24,33,.62);
      border:1px solid var(--BORDER);
      border-radius: var(--RADIUS);
      padding: 16px;
      box-shadow: 0 14px 40px rgba(0,0,0,.35);
      transition:.18s ease;
      position:relative;
      overflow:hidden;
    }
    .unit:before{
      content:"";
      position:absolute;
      inset:-60px -60px auto auto;
      width: 220px;
      height: 220px;
      background: radial-gradient(circle at 30% 30%, rgba(0,229,216,.18), transparent 60%);
      transform: rotate(18deg);
    }
    .unit:hover{
      transform: translateY(-3px);
      border-color: rgba(0,229,216,.35);
    }

    .unitHead{
      display:flex;
      align-items:flex-start;
      justify-content:space-between;
      gap:10px;
      position:relative;
      z-index:2;
    }
    .unitHead strong{
      font-weight: 1000;
      letter-spacing: 1.6px;
      font-size: 14px;
    }
    .tag{
      font-size: 10px;
      padding: 6px 10px;
      border-radius: 999px;
      border: 1px solid rgba(255,59,59,.35);
      background: rgba(255,59,59,.10);
      color: var(--SECONDARY);
      font-weight: 1000;
      letter-spacing: 1.2px;
      white-space:nowrap;
    }
    .unit p{
      margin: 10px 0 12px;
      color: var(--MUTED);
      font-size: 11px;
      letter-spacing: 1px;
      line-height: 1.4;
      text-transform:none;
      position:relative;
      z-index:2;
    }

    .box{
      border:1px solid rgba(255,255,255,.10);
      background: rgba(255,255,255,.03);
      border-radius: 14px;
      padding: 12px;
      margin-bottom: 10px;
      position:relative;
      z-index:2;
    }
    .box small{
      display:block;
      color: var(--MUTED);
      letter-spacing: 1px;
      font-size: 10px;
      margin-bottom: 6px;
    }
    .box strong{
      font-size: 12px;
      letter-spacing: 1.3px;
      font-weight: 1000;
    }

    .rowBtns{
      display:flex;
      gap:10px;
      flex-wrap: wrap;
      position:relative;
      z-index:2;
    }
    .rowBtns .btn{
      padding: 10px 12px;
      flex: 1;
      justify-content:center;
      min-width: 160px;
    }

    /* WhatsApp floating */
    .float{
      position: fixed;
      right: 16px;
      bottom: 16px;
      z-index: 999;
      display:flex;
      gap:10px;
      align-items:center;
    }
    .float a{
      display:inline-flex;
      align-items:center;
      gap:10px;
      border-radius: 999px;
      padding: 12px 14px;
      font-weight: 1000;
      letter-spacing: 1.2px;
      box-shadow: 0 18px 50px rgba(0,0,0,.45);
      border:1px solid rgba(255,255,255,.10);
      background: linear-gradient(180deg, rgba(0,229,216,1), rgba(0,180,170,1));
      color: #00110f;
    }

    footer{
      margin-top: 18px;
      text-align:center;
      color: rgba(255,255,255,.55);
      font-size: 11px;
      letter-spacing: 1px;
      text-transform:none;
    }

    /* Responsive */
    @media (max-width: 980px){
      .heroInner{ grid-template-columns: 1fr; }
      .grid{ grid-template-columns: 1fr; }
      .brand{ min-width: unset; }
    }
  </style>
</head>

<body>
  <div class="wrap">

    <div class="topbar">
      <div class="brand">
        <img id="topLogo" src="/assets/logo-farmalima.png" alt="LOGO" />
        <div class="title">
          <strong id="brandName">FARMA LIMA</strong>
          <span id="brandSub">ENDEREÇOS • CONTATOS • WHATSAPP</span>
        </div>
      </div>

      <div class="actions">
        <span class="pill" id="pill">DISK MEDICAÇÃO</span>
        <a class="btn primary" id="ctaWhatsapp" href="#" target="_blank" rel="noopener">FALAR NO WHATSAPP</a>
        <a class="btn" href="#unidades">VER UNIDADES</a>
      </div>
    </div>

    <section class="hero">
      <div class="wave" aria-hidden="true">
        <svg viewBox="0 0 1200 300" preserveAspectRatio="none">
          <path d="M0,180 C140,230 260,90 420,140 C580,190 620,280 800,210 C980,140 1020,40 1200,110 L1200,0 L0,0 Z"
                fill="rgba(0,229,216,.22)"></path>
          <path d="M0,220 C160,280 260,120 420,180 C580,240 640,300 820,230 C1000,160 1040,90 1200,140 L1200,0 L0,0 Z"
                fill="rgba(255,59,59,.14)"></path>
        </svg>
      </div>

      <div class="heroInner">
        <div>
          <h1 id="heroTitle">BEM VINDO À FARMA LIMA</h1>
          <p id="heroDesc">
            ATENDIMENTO RÁPIDO, PRESENÇA LOCAL E CONFIANÇA. CLIQUE NO WHATSAPP PARA FALAR AGORA OU VEJA AS UNIDADES ABAIXO.
          </p>
        </div>

        <div class="heroCard">
          <div class="mini">
            <strong id="heroCardTitle">ENTREGA RÁPIDA</strong>
            <span id="heroCardSub">CHAME NO WHATSAPP E RECEBA COM AGILIDADE</span>
          </div>
          <img id="heroLogo" src="/assets/logo-farmalima.png" alt="LOGO" />
        </div>
      </div>
    </section>

    <div class="sectionHead" id="unidades">
      <h2>UNIDADES</h2>
      <small>CLIQUE PARA ABRIR WHATSAPP OU MAPS</small>
    </div>

    <div class="grid" id="unitsGrid"></div>

    <footer id="footer">© 2026 FARMA LIMA</footer>
  </div>

  <div class="float" id="floatWrap" style="display:none;">
    <a id="floatWhatsapp" href="#" target="_blank" rel="noopener">WHATSAPP • ATENDIMENTO</a>
  </div>

  <script>
    const DEFAULT_DATA = {
      brandName: "FARMA LIMA",
      brandSub: "ENDEREÇOS • CONTATOS • WHATSAPP",
      pillText: "DISK MEDICAÇÃO",
      heroTitle: "BEM VINDO À FARMA LIMA",
      heroDesc: "ATENDIMENTO RÁPIDO, PRESENÇA LOCAL E CONFIANÇA. CLIQUE NO WHATSAPP PARA FALAR AGORA OU VEJA AS UNIDADES ABAIXO.",
      heroCardTitle: "ENTREGA RÁPIDA",
      heroCardSub: "CHAME NO WHATSAPP E RECEBA COM AGILIDADE",
      globalWhatsapp: "5592999999999",
      footerText: "© 2026 FARMA LIMA",
      units: [
        {
          name: "CENTRO",
          note: "ATENDIMENTO RÁPIDO",
          address: "AV LEONARDO MALCHER, N 783",
          whatsapp: "5592999999999",
          maps: ""
        }
      ]
    };

    function waLink(phone, text){
      const p = (phone || "").replace(/\D/g, "");
      const t = encodeURIComponent(text || "OLÁ! QUERO ATENDIMENTO.");
      return `https://wa.me/${p}?text=${t}`;
    }

    function mapsLink(address){
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    }

    function setText(id, value){
      const el = document.getElementById(id);
      if(el) el.textContent = value || "";
    }

    function render(data){
      setText("brandName", data.brandName);
      setText("brandSub", data.brandSub);
      setText("pill", data.pillText);
      setText("heroTitle", data.heroTitle);
      setText("heroDesc", data.heroDesc);
      setText("heroCardTitle", data.heroCardTitle);
      setText("heroCardSub", data.heroCardSub);
      setText("footer", data.footerText);

      const mainWa = waLink(data.globalWhatsapp, "OLÁ! QUERO ATENDIMENTO NA FARMA LIMA.");
      const cta = document.getElementById("ctaWhatsapp");
      cta.href = mainWa;

      const floatWrap = document.getElementById("floatWrap");
      const floatA = document.getElementById("floatWhatsapp");
      floatA.href = mainWa;
      floatWrap.style.display = data.globalWhatsapp ? "flex" : "none";

      const grid = document.getElementById("unitsGrid");
      grid.innerHTML = "";

      (data.units || []).forEach((u) => {
        const card = document.createElement("div");
        card.className = "unit";

        const header = document.createElement("div");
        header.className = "unitHead";

        const title = document.createElement("strong");
        title.textContent = (u.name || "UNIDADE");

        const tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = "UNIDADE";

        header.appendChild(title);
        header.appendChild(tag);

        const p = document.createElement("p");
        p.textContent = (u.note || "");

        const boxAddr = document.createElement("div");
        boxAddr.className = "box";
        boxAddr.innerHTML = `<small>ENDEREÇO</small><strong>${(u.address || "").toUpperCase()}</strong>`;

        const boxWa = document.createElement("div");
        boxWa.className = "box";
        boxWa.innerHTML = `<small>WHATSAPP</small><strong>CLIQUE PARA CONVERSAR</strong>`;

        const btns = document.createElement("div");
        btns.className = "rowBtns";

        const btnWa = document.createElement("a");
        btnWa.className = "btn primary";
        btnWa.textContent = "WHATSAPP";
        btnWa.href = waLink(u.whatsapp || data.globalWhatsapp, `OLÁ! QUERO ATENDIMENTO NA UNIDADE ${u.name || ""}.`);
        btnWa.target = "_blank";
        btnWa.rel = "noopener";

        const btnMap = document.createElement("a");
        btnMap.className = "btn";
        btnMap.textContent = "MAPS";
        btnMap.href = u.maps ? u.maps : mapsLink(u.address || "");
        btnMap.target = "_blank";
        btnMap.rel = "noopener";

        btns.appendChild(btnWa);
        btns.appendChild(btnMap);

        card.appendChild(header);
        if(u.note) card.appendChild(p);
        card.appendChild(boxAddr);
        card.appendChild(boxWa);
        card.appendChild(btns);

        grid.appendChild(card);
      });
    }

    async function load(){
      try{
        const r = await fetch("/api/content", { cache: "no-store" });
        if(!r.ok) throw new Error("API FAIL");
        const data = await r.json();
        render(Object.keys(data||{}).length ? data : DEFAULT_DATA);
      }catch(e){
        render(DEFAULT_DATA);
      }
    }

    load();
  </script>
</body>
</html>
