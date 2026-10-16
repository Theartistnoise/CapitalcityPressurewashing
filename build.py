"""Builds the Vesper Exteriors multi-page site.
Edit PHONE / EMAIL_ENDPOINT below, then run: python3 build.py
Outputs index.html, cleaning.html, lighting.html, home-services.html at the repo root (Vite multi-page)."""
import re, html

PHONE_DISPLAY = "(573) 418-3221"     # swap to the Google Voice number when it's set up
PHONE_RAW = "5734183221"
FORM_ENDPOINT = "https://formspree.io/f/mbdearkr"
TOWNS = ["Jefferson City","Holts Summit","St. Martins","Wardsville","Taos","Fulton","Ashland","Columbia","California","Eugene"]

CSS = open("base.css").read()
SPRITE = open("sprite.html").read()
BLK = {k: open(f"blk_{k}.html").read() for k in ["services","packages","plans","commercial","faq"]}

EXTRA_CSS = r"""
/* ---- multi-page additions ---- */
nav.links a[aria-current="page"]{color:var(--text)}
nav.links a[aria-current="page"]::after{content:"";display:block;height:2px;margin-top:4px;background:linear-gradient(90deg,var(--emerald),var(--gold))}
.menu-btn{display:inline-flex;align-items:center;gap:10px;height:44px;padding:0 14px;border-radius:12px;border:1px solid var(--line-2);background:rgba(255,255,255,.03);color:var(--text);font:500 14px var(--sans);cursor:pointer;transition:border-color .2s,background .2s}
.menu-btn:hover{border-color:var(--emerald);background:var(--emerald-soft)}
.mb-lines{display:grid;gap:5px;width:18px}.mb-lines i{display:block;height:2px;background:var(--text);border-radius:2px}.mb-lines i:last-child{width:12px;justify-self:end;background:var(--gold)}
@media (max-width:560px){.mb-label{display:none}.menu-btn{padding:0 12px}}
body.nav-open{overflow:hidden}
.xnav{position:fixed;inset:0;z-index:100;background:#040907;overflow-y:auto;-webkit-overflow-scrolling:touch;clip-path:circle(0% at calc(100% - 44px) 36px);transition:clip-path .6s cubic-bezier(.7,0,.2,1)}
.xnav[hidden]{display:block;visibility:hidden}
.xnav.open{clip-path:circle(150% at calc(100% - 44px) 36px);visibility:visible}
.xnav-glow{position:fixed;inset:0;pointer-events:none;background:radial-gradient(600px 400px at 85% 0%,rgba(52,211,153,.16),transparent 60%),radial-gradient(500px 400px at 0% 100%,rgba(212,175,90,.10),transparent 60%)}
.xnav-in{position:relative;max-width:1160px;margin:0 auto;padding:16px max(20px,env(safe-area-inset-right)) calc(32px + env(safe-area-inset-bottom)) max(20px,env(safe-area-inset-left));min-height:100%;display:flex;flex-direction:column;gap:22px}
.xnav-top{display:flex;justify-content:space-between;align-items:center;height:56px}
.xnav-close{width:48px;height:48px;border-radius:50%;border:1px solid var(--line-2);background:rgba(255,255,255,.03);cursor:pointer;position:relative}
.xnav-close span,.xnav-close span::before{position:absolute;left:14px;top:23px;width:20px;height:2px;background:var(--text);transform:rotate(45deg);content:""}
.xnav-close span::before{left:0;top:0;transform:rotate(-90deg)}
.xnav-close:hover{border-color:var(--gold)}
.xnav-kicker{font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:var(--emerald)}
.xtiles{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.xtile{position:relative;display:flex;align-items:flex-end;min-height:300px;border-radius:20px;overflow:hidden;text-decoration:none;color:var(--text);border:1px solid var(--line);isolation:isolate;opacity:0;transform:translateY(28px);transition:opacity .5s ease,transform .6s cubic-bezier(.2,.8,.2,1),border-color .3s}
.xnav.open .xtile{opacity:1;transform:none;transition-delay:calc(.18s + var(--i)*.08s)}
.xtile img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2;transition:transform .8s cubic-bezier(.2,.8,.2,1)}
.xtile::before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(4,9,7,.05) 20%,rgba(4,9,7,.92) 85%)}
.xtile:hover img,.xtile:focus-visible img{transform:scale(1.07)}
.xtile:hover{border-color:rgba(212,175,90,.6)}
.xtile[aria-current="page"]{border-color:var(--emerald)}
.xt-in{display:grid;gap:4px;padding:22px 22px 22px;max-width:85%}
.xt-k{font-size:12px;letter-spacing:.2em;color:var(--gold-2)}
.xt-t{font-size:clamp(24px,3vw,30px);font-weight:300;letter-spacing:-.01em}
.xt-d{font-size:14px;color:#C2D0C8}
.xt-go{position:absolute;right:18px;bottom:20px;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;background:rgba(240,210,138,.12);border:1px solid rgba(240,210,138,.5);color:var(--gold-2);font-size:18px;transition:transform .3s,background .3s}
.xtile:hover .xt-go{transform:translateX(4px);background:var(--gold);color:#1A1405}
.xt-soon{position:absolute;top:16px;left:16px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;padding:6px 10px;border-radius:20px;background:rgba(4,9,7,.8);border:1px solid rgba(212,175,90,.6);color:var(--gold-2)}
.xquick{display:flex;flex-wrap:wrap;gap:8px;opacity:0;transition:opacity .5s .45s}
.xnav.open .xquick,.xnav.open .xcta,.xnav.open .xnav-foot{opacity:1}
.xquick a{color:var(--text);text-decoration:none;font-size:14px;padding:10px 16px;border:1px solid var(--line-2);border-radius:30px}
.xquick a:hover{border-color:var(--emerald);background:var(--emerald-soft)}
.xcta{display:grid;grid-template-columns:2fr 1fr 1fr;gap:10px;opacity:0;transition:opacity .5s .55s}
.xcta .btn{padding:17px 18px;font-size:16px}
.xnav-foot{font-size:13px;color:var(--dim);opacity:0;transition:opacity .5s .6s;margin-top:auto}
@media (max-width:860px){.xt-soon{left:auto;right:16px;top:14px}.xtiles{grid-template-columns:1fr}.xtile{min-height:124px}.xt-d{display:none}.xt-t{font-size:24px}.xcta{grid-template-columns:1fr 1fr}.xcta .xq{grid-column:1/-1}}
@media (prefers-reduced-motion:reduce){.xnav,.xtile,.xquick,.xcta,.xnav-foot{transition:none!important}}
/* hero motion + scroll reveal */
.photo-hero .hero-bg{position:absolute;inset:0;background:center/cover no-repeat;animation:kb 16s cubic-bezier(.2,.8,.2,1) both}
@keyframes kb{from{transform:scale(1.14)}to{transform:scale(1)}}
.photo-hero .wrap>*{animation:rise .9s cubic-bezier(.2,.8,.2,1) both}
.photo-hero .wrap>*:nth-child(2){animation-delay:.12s}.photo-hero .wrap>*:nth-child(3){animation-delay:.24s}.photo-hero .wrap>*:nth-child(4){animation-delay:.36s}.photo-hero .wrap>*:nth-child(5){animation-delay:.48s}
@keyframes rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
.js .rv{opacity:0;transform:translateY(32px);transition:opacity .8s ease,transform .9s cubic-bezier(.2,.8,.2,1)}
.js .rv.in{opacity:1;transform:none}
.scroll-cue{position:absolute;left:50%;bottom:22px;z-index:1;width:26px;height:42px;margin-left:-13px;border:2px solid rgba(231,241,236,.45);border-radius:14px}
.scroll-cue::after{content:"";position:absolute;left:50%;top:8px;width:4px;height:8px;margin-left:-2px;border-radius:2px;background:var(--gold-2);animation:cue 1.8s infinite}
@keyframes cue{0%{opacity:0;transform:translateY(0)}30%{opacity:1}100%{opacity:0;transform:translateY(14px)}}
@media (prefers-reduced-motion:reduce){.photo-hero .hero-bg,.photo-hero .wrap>*,.scroll-cue::after{animation:none}.js .rv{opacity:1;transform:none;transition:none}}
@media (max-width:560px){.top-cta .btn{display:none}}

.photo-hero{min-height:min(88vh,780px);display:flex;align-items:flex-end;padding-block:120px 84px;background:var(--bg);position:relative;overflow:hidden}
.photo-hero::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(6,13,10,.35) 0%,rgba(6,13,10,.55) 45%,rgba(6,13,10,.96) 100%),linear-gradient(90deg,rgba(6,13,10,.75),transparent 70%)}
.photo-hero .wrap{position:relative;z-index:1;width:100%}
.photo-hero h1{font-size:clamp(40px,6.4vw,78px);max-width:820px}
.photo-hero h1 em{font-style:normal;background:linear-gradient(90deg,#6FE9B9,var(--gold-2));-webkit-background-clip:text;background-clip:text;color:transparent}
.photo-hero p.sub{font-size:18px;color:#C9D6CF;max-width:600px;margin-top:20px}
.photo-hero .actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:32px}
.photo-hero .facts{display:flex;flex-wrap:wrap;gap:10px 26px;margin-top:36px;color:#B7C6BE;font-size:13.5px}
.photo-hero .facts span{display:flex;align-items:center;gap:8px}
.photo-hero .facts span::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--emerald);box-shadow:0 0 10px var(--emerald)}

.lines{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.line{position:relative;border-radius:20px;overflow:hidden;min-height:440px;display:flex;align-items:flex-end;text-decoration:none;color:var(--text);border:1px solid var(--line);isolation:isolate}
.line img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2;transition:transform .6s}
.line::before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(6,13,10,.05),rgba(6,13,10,.92) 72%)}
.line:hover img{transform:scale(1.04)}
.line .in{padding:28px;display:grid;gap:8px}
.line .in p{color:#C2D0C8;font-size:14.5px}
.line .go{color:var(--gold-2);font-weight:600;font-size:14.5px}
.line .soon{position:absolute;top:18px;left:18px;background:rgba(6,13,10,.8);border:1px solid rgba(212,175,90,.6);color:var(--gold-2);font-size:11px;letter-spacing:.2em;text-transform:uppercase;padding:6px 10px;border-radius:20px}
@media (max-width:900px){.lines{grid-template-columns:1fr}.line{min-height:340px}}

/* before / after slider */
.ba-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
.ba{margin:0;border:1px solid var(--line);border-radius:18px;overflow:hidden;background:var(--panel)}
.ba .frame{position:relative;aspect-ratio:4/3;--p:50%;user-select:none;touch-action:pan-y}
.ba .frame img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none}
.ba .frame img.before{clip-path:inset(0 calc(100% - var(--p)) 0 0)}
.ba .bar{position:absolute;top:0;bottom:0;left:var(--p);width:2px;margin-left:-1px;background:#fff;box-shadow:0 0 12px rgba(0,0,0,.5);pointer-events:none}
.ba .knob{position:absolute;top:50%;left:var(--p);width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;background:rgba(6,13,10,.85);border:2px solid #fff;display:grid;place-items:center;pointer-events:none;color:#fff;font-size:14px;letter-spacing:-2px}
.ba .tag{position:absolute;top:12px;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;padding:5px 10px;border-radius:20px;background:rgba(6,13,10,.78);pointer-events:none}
.ba .tag.b{left:12px;color:#F2C9C4}.ba .tag.a{right:12px;color:#9FF0CF}
.ba input[type=range]{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:ew-resize;margin:0}
.ba figcaption{padding:14px 18px;display:flex;justify-content:space-between;gap:12px;font-size:14px}
.ba figcaption b{font-weight:600}
.ba figcaption span{color:var(--muted)}
@media (max-width:760px){.ba-grid{grid-template-columns:1fr}}

/* gallery */
.gallery{columns:3 280px;column-gap:16px}
.gallery button{display:block;width:100%;margin:0 0 16px;padding:0;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:var(--panel);cursor:zoom-in;break-inside:avoid}
.gallery img{display:block;width:100%;height:auto;transition:transform .5s}
.gallery button:hover img{transform:scale(1.03)}
dialog.lb{border:0;padding:0;background:transparent;max-width:min(1200px,94vw);max-height:92vh}
dialog.lb::backdrop{background:rgba(3,7,5,.92)}
dialog.lb img{display:block;max-width:100%;max-height:86vh;border-radius:12px}
dialog.lb button{position:fixed;top:16px;right:16px;width:44px;height:44px;border-radius:50%;border:1px solid var(--line-2);background:var(--panel);color:#fff;font-size:22px;cursor:pointer}

.split-2{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.split-2 .ph{border-radius:20px;overflow:hidden;border:1px solid var(--line)}
.split-2 .ph img{display:block;width:100%;height:100%;object-fit:cover}
.duo{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.duo img{aspect-ratio:3/4;object-fit:cover;width:100%;border-radius:16px;border:1px solid var(--line)}
.ticks{list-style:none;display:grid;gap:10px;margin-top:18px}
.ticks li{padding-left:24px;position:relative;color:var(--text)}
.ticks li::before{content:"";position:absolute;left:3px;top:9px;width:10px;height:6px;border-left:2px solid var(--emerald);border-bottom:2px solid var(--emerald);transform:rotate(-45deg)}
@media (max-width:900px){.split-2{grid-template-columns:1fr;gap:28px}}

.offer-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.offer{border:1px solid var(--line);border-radius:20px;overflow:hidden;background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.01));display:flex;flex-direction:column}
.offer img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block}
.offer .in{padding:28px;display:flex;flex-direction:column;gap:14px;flex:1}
.offer .in p{color:var(--muted)}
.offer .btn{margin-top:auto;align-self:flex-start}
@media (max-width:860px){.offer-grid{grid-template-columns:1fr}}

.dn{display:grid;grid-template-columns:1fr 1fr;gap:0;border-radius:20px;overflow:hidden;border:1px solid var(--line)}
.dn figure{margin:0;position:relative}
.dn img{display:block;width:100%;aspect-ratio:16/10;object-fit:cover}
.dn figcaption{position:absolute;left:14px;bottom:14px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;background:rgba(6,13,10,.8);padding:6px 10px;border-radius:20px}
@media (max-width:700px){.dn{grid-template-columns:1fr}}

.soon-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.soon-card{border:1px dashed var(--line-2);border-radius:16px;padding:26px;display:grid;gap:8px;align-content:start;background:rgba(255,255,255,.015)}
.soon-card .when{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold-2)}
.soon-card.now{border-style:solid;border-color:rgba(52,211,153,.5);background:var(--emerald-soft)}
.soon-card.now .when{color:var(--emerald)}
.soon-card p{color:var(--muted);font-size:14.5px}
@media (max-width:900px){.soon-grid{grid-template-columns:1fr 1fr}}
@media (max-width:560px){.soon-grid{grid-template-columns:1fr}}
.center{text-align:center;justify-items:center}
.cta-band{border:1px solid var(--line-2);border-radius:22px;padding:44px;display:flex;flex-wrap:wrap;gap:24px;align-items:center;justify-content:space-between;background:radial-gradient(600px 300px at 100% 0,rgba(212,175,90,.12),transparent 60%),var(--panel)}
.cta-band h2{font-size:clamp(28px,3.4vw,40px)}
.cta-band .actions{display:flex;gap:12px;flex-wrap:wrap}
"""

NAV = [("cleaning.html","Exterior Cleaning"),("lighting.html","Lighting"),("home-services.html","Home Services"),("cleaning.html#plans","Care Plans")]

def header(cur):
    links = "".join(f'<a href="/{h}"{" aria-current=\"page\"" if h==cur else ""}>{t}</a>' for h,t in NAV)
    tiles = [("cleaning.html","Exterior Cleaning","Soft washing, concrete, windows, gutters","ba-siding-roofline",""),
             ("lighting.html","Lighting","Holiday install &amp; permanent lighting","light-ranch-fog",""),
             ("home-services.html","Home Services","Porches, decks, gutters &amp; more","owner-roof","Coming 2027")]
    tile_html = "".join(f'''<a class="xtile" href="/{h}" style="--i:{i}"{' aria-current="page"' if h==cur else ''}>
          <img src="/work/{img}.jpg" alt="" loading="lazy">
          <span class="xt-in"><span class="xt-k">0{i+1}</span><span class="xt-t">{t}</span><span class="xt-d">{d}</span></span>
          {f'<span class="xt-soon">{soon}</span>' if soon else ''}<span class="xt-go" aria-hidden="true">→</span></a>''' for i,(h,t,d,img,soon) in enumerate(tiles))
    quick = "".join(f'<a href="/{h}">{t}</a>' for h,t in [("index.html","Home"),("cleaning.html#work","Our work"),("cleaning.html#plans","Care plans"),("cleaning.html#commercial","Commercial"),("cleaning.html#faq","FAQ")])
    return f'''<header class="top">
  <div class="wrap">
    <a class="brand" href="/" aria-label="Vesper Exteriors home">
      <svg width="34" height="36" aria-hidden="true"><use href="#vmark"/></svg>
      <span><span class="brand-name">VESPER</span><span class="brand-sub">Exteriors</span></span>
    </a>
    <nav class="links" aria-label="Main">{links}</nav>
    <div class="top-cta">
      <a class="top-phone" href="tel:{PHONE_RAW}">{PHONE_DISPLAY}</a>
      <a class="btn btn-primary" href="#quote">Free quote</a>
      <button class="menu-btn" type="button" aria-controls="xnav" aria-expanded="false"><span class="mb-lines" aria-hidden="true"><i></i><i></i></span><span class="mb-label">Menu</span></button>
    </div>
  </div>
</header>
<div class="xnav" id="xnav" role="dialog" aria-modal="true" aria-label="Site menu" hidden>
  <div class="xnav-glow" aria-hidden="true"></div>
  <div class="xnav-in">
    <div class="xnav-top">
      <a class="brand" href="/" aria-label="Vesper Exteriors home"><svg width="34" height="36" aria-hidden="true"><use href="#vmark"/></svg><span><span class="brand-name">VESPER</span><span class="brand-sub">Exteriors</span></span></a>
      <button class="xnav-close" type="button" aria-label="Close menu"><span aria-hidden="true"></span></button>
    </div>
    <p class="xnav-kicker">Where to?</p>
    <div class="xtiles">{tile_html}</div>
    <nav class="xquick" aria-label="More">{quick}</nav>
    <div class="xcta">
      <a class="btn btn-primary xq" href="#quote">Get a free quote</a>
      <a class="btn btn-ghost" href="tel:{PHONE_RAW}">Call</a>
      <a class="btn btn-ghost" href="sms:{PHONE_RAW}">Text</a>
    </div>
    <p class="xnav-foot">Jefferson City &amp; Mid-Missouri · Same-day replies · {PHONE_DISPLAY}</p>
  </div>
</div>'''

def footer():
    return f'''<footer>
  <div class="wrap">
    <div><span class="brand"><svg width="30" height="32" aria-hidden="true"><use href="#vmark"/></svg><span><span class="brand-name">VESPER</span><span class="brand-sub">Exteriors</span></span></span>
      Exterior cleaning · Holiday &amp; permanent lighting · Jefferson City, MO</div>
    <div style="display:grid;gap:6px">
      <a href="/cleaning.html">Exterior Cleaning</a><a href="/lighting.html">Lighting</a><a href="/home-services.html">Home Services</a>
    </div>
    <div style="display:grid;gap:6px"><a href="tel:{PHONE_RAW}">Call {PHONE_DISPLAY}</a><a href="sms:{PHONE_RAW}">Text {PHONE_DISPLAY}</a><span>© <span class="yr">2026</span> Vesper Exteriors</span></div>
  </div>
</footer>
<div class="mbar">
  <a class="btn btn-outline" href="sms:{PHONE_RAW}">Text</a>
  <a class="btn btn-dark" href="#quote">Free quote</a>
</div>'''

def checks(items):
    return "".join(f'<label><input type="checkbox" name="services" value="{html.escape(v)}">{html.escape(v)}</label>' for v in items)

CLEAN_SVCS = ["House soft wash","Roof cleaning","Driveway & concrete","Pavers & sealing","Deck or fence","Gutter cleaning","Gutter guards","Window cleaning","Solar panels","Care plan","Commercial service"]
LIGHT_SVCS = ["Holiday lighting","Permanent lighting","Takedown & storage only","Commercial lighting"]
ALL_SVCS = ["House soft wash","Roof cleaning","Driveway & concrete","Deck or fence","Gutter cleaning","Gutter guards","Window cleaning","Holiday lighting","Permanent lighting","Care plan","Commercial service","Not sure yet"]

def quote(page, svcs, title="Tell us about your property.", lede="We reply the same day with a written quote. Pick as many services as you like; bundles save more."):
    return f'''<section id="quote" class="quote">
  <div class="wrap">
    <div>
      <p class="eyebrow">Free quote</p>
      <h2 style="margin-top:12px">{title}</h2>
      <p class="lede" style="margin-top:14px">{lede}</p>
      <div class="contact-list">
        <div><b>Call</b><a href="tel:{PHONE_RAW}">{PHONE_DISPLAY}</a></div>
        <div><b>Text</b><a href="sms:{PHONE_RAW}">Send us a text</a></div>
        <div><b>Hours</b><span>Mon to Sat, 8am to 6pm</span></div>
        <div><b>Area</b><span>Jefferson City &amp; Mid-Missouri</span></div>
      </div>
    </div>
    <div class="form-card" id="formCard">
      <form id="fullForm" data-page="{page}" novalidate>
        <div class="row2">
          <div class="field"><label for="fName">Name *</label><input id="fName" name="name" autocomplete="name" required></div>
          <div class="field"><label for="fPhone">Phone *</label><input id="fPhone" name="phone" type="tel" autocomplete="tel" required></div>
        </div>
        <div class="row2">
          <div class="field"><label for="fEmail">Email</label><input id="fEmail" name="email" type="email" autocomplete="email"></div>
          <div class="field"><label for="fType">Property type</label>
            <select id="fType" name="propertyType"><option>Home</option><option>Business</option><option>Property manager / HOA</option></select></div>
        </div>
        <div class="field"><label for="fAddress">Property address</label><input id="fAddress" name="address" autocomplete="street-address"></div>
        <fieldset><legend>Services</legend><div class="checks" id="svcChecks">{checks(svcs)}</div></fieldset>
        <div class="field"><label for="fContact">Best way to reach you</label>
          <select id="fContact" name="contactPref"><option>Text</option><option>Call</option><option>Email</option></select></div>
        <div class="field"><label for="fSource">How did you hear about us?</label>
          <select id="fSource" name="source"><option value="">Choose one</option><option>Google</option><option>Facebook</option><option>Nextdoor</option><option>Yelp</option><option>Friend or neighbor</option><option>Saw our work nearby</option><option>Past customer</option><option>Other</option></select></div>
        <div class="field"><label for="fNotes">Anything else?</label><textarea id="fNotes" name="notes" rows="3" placeholder="Package, plan, timing or questions"></textarea></div>
        <button class="btn btn-dark" type="submit" style="width:100%">Send my request</button>
        <p class="msg" id="fullMsg" role="status"></p>
        <p class="fine">No spam. We only use your info to reach you about your quote.</p>
      </form>
    </div>
  </div>
</section>'''

def ba(before, after, title, note):
    return f'''<figure class="ba">
  <div class="frame">
    <img src="/work/{after}.jpg" alt="{html.escape(title)} after cleaning" loading="lazy">
    <img class="before" src="/work/{before}.jpg" alt="{html.escape(title)} before cleaning" loading="lazy">
    <span class="bar"></span><span class="knob">‹ ›</span><span class="tag b">Before</span><span class="tag a">After</span>
    <input type="range" min="0" max="100" value="50" aria-label="Compare before and after: {html.escape(title)}">
  </div>
  <figcaption><b>{html.escape(title)}</b><span>{html.escape(note)}</span></figcaption>
</figure>'''

def gallery(items):
    return '<div class="gallery">' + "".join(
        f'<button type="button" data-full="/work/{f}.jpg"><img src="/work/{f}.jpg" alt="{html.escape(a)}" loading="lazy"></button>' for f,a in items) + '</div>\n<dialog class="lb" id="lb"><button type="button" aria-label="Close">×</button><img alt=""></dialog>'

TOWN_HTML = "".join(f"<span>{t}</span>" for t in TOWNS)

def page(fname, cur, title, desc, body, og_img):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{html.escape(desc)}">
<meta property="og:title" content="{html.escape(title)}">
<meta property="og:description" content="{html.escape(desc)}">
<meta property="og:type" content="website">
<meta property="og:image" content="/work/{og_img}.jpg">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="alternate icon" href="/favicon.png">
<meta name="theme-color" content="#060D0A">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">
<script type="application/ld+json">
{{"@context":"https://schema.org","@type":"HomeAndConstructionBusiness","name":"Vesper Exteriors","description":"Exterior cleaning, window cleaning, gutter service and holiday and permanent lighting in Mid-Missouri.","telephone":"+1-{PHONE_RAW[:3]}-{PHONE_RAW[3:6]}-{PHONE_RAW[6:]}","areaServed":{[t+" MO" for t in TOWNS]!r},"address":{{"@type":"PostalAddress","addressLocality":"Jefferson City","addressRegion":"MO","addressCountry":"US"}},"priceRange":"$$"}}
</script>
<style>{CSS}{EXTRA_CSS}</style>
</head>
<body>
{SPRITE}
{header(cur)}
<main id="top">
{body}
</main>
{footer()}
<script src="/site.js" defer></script>
</body>
</html>
'''.replace("'", "'")

# ---------------- HOME ----------------
home = f'''
<section class="photo-hero"><div class="hero-bg" style="background-image:url(/work/light-twostory-dusk.jpg)"></div><span class="scroll-cue" aria-hidden="true"></span>
  <div class="wrap">
    <p class="eyebrow">Jefferson City &amp; Mid-Missouri</p>
    <h1 style="margin-top:14px">Your exterior, <em>looking new again.</em></h1>
    <p class="sub">Exterior cleaning and custom lighting for homes and businesses across Mid-Missouri. Owner-operated, done carefully, and backed by a 7-day guarantee.</p>
    <div class="actions">
      <a class="btn btn-primary" href="#quote">Get a free quote</a>
      <a class="btn btn-ghost" href="sms:{PHONE_RAW}">Text us</a>
    </div>
    <div class="facts"><span>Locally owned since 2023</span><span>Free written quotes</span><span>Residential &amp; commercial</span></div>
  </div>
</section>

<div class="strip">
  <div class="wrap">
    <div><strong>Soft-wash safe</strong>Low pressure on siding and roofs</div>
    <div><strong>7-day guarantee</strong>Not right? We come back free</div>
    <div><strong>Same-day replies</strong>Call, text or quote online</div>
    <div><strong>On a schedule</strong>Care plans for homes and businesses</div>
  </div>
</div>

<section>
  <div class="wrap">
    <div class="section-head"><p class="eyebrow">What we do</p><h2>Three ways we make a home stand out.</h2></div>
    <div class="lines">
      <a class="line" href="/cleaning.html"><img src="/work/ba-siding-roofline.jpg" alt="Siding before and after soft washing"><div class="in"><p class="eyebrow">Exterior cleaning</p><h3 style="font-size:24px;font-weight:500">Soft washing, concrete, windows &amp; gutters</h3><p>Mold, algae and grime gone, without the damage high pressure causes.</p><span class="go">See cleaning services →</span></div></a>
      <a class="line" href="/lighting.html"><img src="/work/light-ranch-fog.jpg" alt="Ranch home outlined in warm white holiday lights"><div class="in"><p class="eyebrow">Lighting</p><h3 style="font-size:24px;font-weight:500">Holiday &amp; permanent lighting</h3><p>Custom-fit, installed, taken down and stored. Or lit year-round from your phone.</p><span class="go">See lighting →</span></div></a>
      <a class="line" href="/home-services.html"><span class="soon">Coming 2027</span><img src="/work/install-2.jpg" alt="Working on a roofline"><div class="in"><p class="eyebrow">Home services</p><h3 style="font-size:24px;font-weight:500">Porches, decks, gutters &amp; more</h3><p>We're expanding. Tell us what you need and get early-bird pricing.</p><span class="go">Join the early list →</span></div></a>
    </div>
  </div>
</section>

<section class="alt">
  <div class="wrap">
    <div class="section-head"><p class="eyebrow">Real results</p><h2>Drag to see the difference.</h2><p class="lede">Every photo here is our own work around Mid-Missouri.</p></div>
    <div class="ba-grid">
      {ba("pool2-before","pool2-after","Pool deck","Years of buildup removed")}
      {ba("drive3-before","drive3-after","House wash","Vinyl siding, full soft wash")}
    </div>
    <div style="margin-top:28px"><a class="btn btn-ghost" href="/cleaning.html#work">See more before &amp; afters</a></div>
  </div>
</section>

<section>
  <div class="wrap split-2">
    <div>
      <p class="eyebrow">Lighting season</p>
      <h2 style="margin-top:12px">Book your holiday lights before the rush.</h2>
      <p class="lede" style="margin-top:14px">We design, supply, install, take down and store your lights. You don't touch a ladder. Want them up year-round? Permanent lighting changes color from an app.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:26px"><a class="btn btn-primary" href="/lighting.html#quote">Get a lighting quote</a><a class="btn btn-ghost" href="/lighting.html#work">See our installs</a></div>
    </div>
    <div class="ph"><img src="/work/light-rgb-close.jpg" alt="Home with color-changing permanent lighting" loading="lazy"></div>
  </div>
</section>

<section class="alt">
  <div class="wrap split-2">
    <div class="duo"><img src="/work/owner-roof.jpg" alt="LaRon on a roof during a lighting install" loading="lazy"><img src="/work/owner-lights.jpg" alt="LaRon with a spool of holiday lights" loading="lazy"></div>
    <div>
      <p class="eyebrow">Owner-operated</p>
      <h2 style="margin-top:12px">You deal with the owner, start to finish.</h2>
      <p class="lede" style="margin-top:14px">Vesper is run by LaRon Wallace, who has spent years in roofing, restoration and exterior work around Mid-Missouri. The person who quotes your job is the person who shows up to do it.</p>
      <ul class="ticks"><li>Written quotes, usually the same day</li><li>Confirmed 48 hours ahead, photos when we finish</li><li>7-day guarantee: if it isn't right, we come back</li></ul>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="cta-band">
      <div><p class="eyebrow">Annual home care</p><h2 style="margin-top:10px">Clean all year. Never think about it.</h2><p class="lede" style="margin-top:10px">Spring and fall visits on a schedule, one monthly price.</p></div>
      <div class="actions"><a class="btn btn-primary" href="/cleaning.html#plans">See care plans</a></div>
    </div>
  </div>
</section>

<section class="alt" style="padding-block:80px">
  <div class="wrap split">
    <div class="panel"><p class="eyebrow">Our guarantee</p><h3>Right the first time, or we come back.</h3><p>If any part of the work isn't right, tell us within 7 days and we'll return and fix it at no charge.</p></div>
    <div class="panel"><p class="eyebrow">Service area</p><h3>Based in Jefferson City.</h3><div class="towns">{TOWN_HTML}</div><p style="font-size:14.5px">Farther out? Ask. A small travel fee applies past 20 miles.</p></div>
  </div>
</section>

{quote("Home", ALL_SVCS)}
'''

# ---------------- CLEANING ----------------
COM_GRID = '''<div class="ba-grid">
    <figure class="ba"><div class="frame" style="aspect-ratio:1"><img src="/work/ba-dock-doors.jpg" alt="Loading dock doors before and after cleaning" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></div><figcaption><b>Loading dock doors</b><span>Rust streaks removed</span></figcaption></figure>
    <figure class="ba"><div class="frame" style="aspect-ratio:1"><img src="/work/storefront.jpg" alt="Cleaning storefront glass downtown" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 30%"></div><figcaption><b>Storefront glass</b><span>Downtown Jefferson City</span></figcaption></figure>
  </div>'''
_c = BLK['commercial']; _k = _c.rindex('</div>')
COM = _c[:_k] + '<div style="margin-top:40px">' + COM_GRID + '</div>' + _c[_k:]

svc = BLK["services"]
i = svc.index('<article class="svc" id="svc-lighting">'); j = svc.index('</article>', i) + 10
svc = svc[:i] + '''<article class="svc" id="svc-guards">
        <span class="tag">New</span>
        <h3>Gutter Guards</h3>
        <p>Guards installed after a full clean-out, so leaves stay out and water keeps moving.</p>
        <ul><li>Clean-out included before install</li><li>Low-profile guards that stay out of sight</li><li>Fewer clogs and overflow</li></ul>
        <p class="best"><b>Best for:</b> homes under trees, tired of fall clean-outs</p>
        <button class="link" type="button" data-pick="Gutter guards">Quote this service →</button>
      </article>''' + svc[j:]
svc = svc.replace('data-pick="Gutters"', 'data-pick="Gutter cleaning"').replace('<h2>Everything outside, handled.</h2>', '<h2>Everything outside, cleaned right.</h2>')

cleaning = f'''
<section class="photo-hero"><div class="hero-bg" style="background-image:url(/work/pool2-after.jpg)"></div><span class="scroll-cue" aria-hidden="true"></span>
  <div class="wrap">
    <p class="eyebrow">Exterior cleaning</p>
    <h1 style="margin-top:14px">Every surface, <em>cleaned right.</em></h1>
    <p class="sub">House and roof soft washing, concrete, decks, gutters, windows and solar panels. The right method for every surface.</p>
    <div class="actions"><a class="btn btn-primary" href="#quote">Get a free quote</a><a class="btn btn-ghost" href="#work">See our work</a></div>
    <div class="facts"><span>Soft-wash safe</span><span>Bundles save up to 10%</span><span>7-day guarantee</span></div>
  </div>
</section>

{svc}

<section id="work" class="alt">
  <div class="wrap">
    <div class="section-head"><p class="eyebrow">Before &amp; after</p><h2>Drag the slider. That's our work.</h2></div>
    <div class="ba-grid">
      {ba("pool1-before","pool1-after","Pool deck","Concrete surface clean")}
      {ba("patio2-before","patio2-after","Acid-stained patio","Deposits and staining cleared")}
      {ba("drive1-before","drive1-after","Driveway &amp; pad".replace("&amp;","&"),"Algae and grime removed")}
      {ba("drive2-before","drive2-after","Rural driveway","Heavy algae and calcium removed")}
      {ba("patio1-before","patio1-after","Concrete patio","Mold and buildup eliminated")}
      {ba("barn4-before","barn4-after","Metal shed","Full soft wash")}
    </div>
    <h3 style="margin:56px 0 18px;font-weight:500;font-size:22px">More jobs</h3>
    {gallery([("ba-siding-gable","House wash, before and after"),("ba-fence","Vinyl fence, before and after"),("ba-siding-roofline","Siding along a roofline, before and after"),("ba-pad","Concrete pad, before and after"),("ba-porch-wall","Covered porch siding, before and after"),("ba-driveway-wall","Exposed-aggregate driveway, before and after"),("ba-siding-corner","Siding corner, before and after"),("ba-patio","Back patio concrete, before and after"),("barn1-after","Metal barn roof after soft wash")])}
  </div>
</section>

{BLK["packages"].replace('class="alt"','')}
{BLK["plans"].replace('<section id="plans">','<section id="plans" class="alt">')}

{COM}

<section>
  <div class="wrap">
    <div class="section-head"><p class="eyebrow">FAQ</p><h2>Questions we hear a lot.</h2></div>
    {BLK["faq"][BLK["faq"].index('<div class="faq">'):BLK["faq"].rindex('</div>',0,BLK["faq"].rindex('</div>'))]}
  </div>
</section>

{quote("Exterior Cleaning", CLEAN_SVCS)}
'''

# ---------------- LIGHTING ----------------
lighting = f'''
<section class="photo-hero"><div class="hero-bg" style="background-image:url(/work/light-ranch-fog-2.jpg)"></div><span class="scroll-cue" aria-hidden="true"></span>
  <div class="wrap">
    <p class="eyebrow">Holiday &amp; permanent lighting</p>
    <h1 style="margin-top:14px">The best-lit house <em>on the street.</em></h1>
    <p class="sub">Custom-fit lights, professionally installed, taken down and stored for you. Or permanent lighting you control from your phone, every holiday of the year.</p>
    <div class="actions"><a class="btn btn-primary" href="#quote">Get a lighting quote</a><a class="btn btn-ghost" href="#work">See our installs</a></div>
    <div class="facts"><span>Lights included</span><span>Install, takedown &amp; storage</span><span>Homes &amp; businesses</span></div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="section-head"><p class="eyebrow">Two ways to light it</p><h2>Seasonal or always ready.</h2></div>
    <div class="offer-grid">
      <article class="offer"><img src="/work/light-twostory-front.jpg" alt="Two-story home with warm white roofline lights" loading="lazy"><div class="in">
        <p class="eyebrow">Holiday lighting</p><h3 style="font-size:24px;font-weight:500">Done for you, every season</h3>
        <p>We measure your home, cut lights to fit, and install clean, straight lines along rooflines, peaks and walkways.</p>
        <ul class="ticks"><li>Commercial-grade lights included</li><li>Install, mid-season fixes and takedown</li><li>We store everything until next year</li><li>Warm white, classic color or custom patterns</li></ul>
        <button class="btn btn-primary" type="button" data-pick="Holiday lighting">Quote holiday lighting</button></div></article>
      <article class="offer"><img src="/work/light-rgb-sky.jpg" alt="Home with color-changing permanent lighting at night" loading="lazy"><div class="in">
        <p class="eyebrow">Permanent lighting</p><h3 style="font-size:24px;font-weight:500">Up once, lit all year</h3>
        <p>Color-changing lights mounted along the roofline, nearly invisible by day. Change colors and schedules from an app.</p>
        <ul class="ticks"><li>Every holiday and game day, one tap</li><li>Warm white everyday accent lighting</li><li>No more ladders, ever</li><li>Clean, low-profile mounting</li></ul>
        <button class="btn btn-ghost" type="button" data-pick="Permanent lighting">Quote permanent lighting</button></div></article>
    </div>
  </div>
</section>

<section class="alt">
  <div class="wrap">
    <div class="section-head"><p class="eyebrow">Day and night</p><h2>Same home. After dark.</h2><p class="lede">Same home, same week. Our clip system keeps lines straight and out of the way.</p></div>
    <div class="dn"><figure><img src="/work/light-day.jpg" alt="Craftsman home in daylight" loading="lazy"><figcaption>Day</figcaption></figure><figure><img src="/work/light-night.jpg" alt="Same craftsman home lit at night" loading="lazy"><figcaption>Night</figcaption></figure></div>
  </div>
</section>

<section id="work">
  <div class="wrap">
    <div class="section-head"><p class="eyebrow">Our installs</p><h2>Homes we've lit up.</h2></div>
    {gallery([("light-twostory-dusk","Two-story home with warm white lights at dusk"),("light-rgb-close","Color-changing permanent lighting"),("light-ranch-fog","Stone ranch home outlined in warm white"),("light-colonial","Brick colonial with warm white roofline"),("light-cottage","Cottage with warm white porch and gable lights"),("light-candycane","Red and white candy-cane roofline"),("light-threecar","Ranch home with three-car garage lit"),("light-rgb-field","Permanent lighting across a wide lawn"),("light-twostory-2","Two-story home with full roofline"),("light-blue-hour","Home lit at blue hour"),("light-candycane-2","Red and white roofline lights"),("light-cottage-wide","Cottage lit at night")])}
  </div>
</section>

<section class="alt">
  <div class="wrap">
    <div class="section-head"><p class="eyebrow">How it works</p><h2>From quote to lit in four steps.</h2></div>
    <div class="steps">
      <div class="step"><span class="n">1</span><h3>Free quote</h3><p>Send a photo of your home or we'll measure on site. Written price, usually same day.</p></div>
      <div class="step"><span class="n">2</span><h3>Pick your look</h3><p>Warm white, classic multicolor, a custom pattern, or permanent RGB.</p></div>
      <div class="step"><span class="n">3</span><h3>We install</h3><p>Clean lines, hidden cords, timers set. If a bulb goes out, we fix it.</p></div>
      <div class="step"><span class="n">4</span><h3>We take it down</h3><p>After the holidays we remove, label and store everything for next year.</p></div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="section-head"><p class="eyebrow">FAQ</p><h2>Lighting questions.</h2></div>
    <div class="faq">
      <details><summary>Do I need to buy the lights?</summary><p>No. Holiday lighting includes commercial-grade lights sized to your home. You can also have us install lights you already own.</p></details>
      <details><summary>When should I book?</summary><p>As early as you can. Install dates fill up fast from mid-November through early December.</p></details>
      <details><summary>What if a bulb goes out?</summary><p>Text us. Repairs during the season are included.</p></details>
      <details><summary>Will clips damage my gutters or shingles?</summary><p>No nails or staples. We use clips made for gutters and shingles that come off clean.</p></details>
      <details><summary>How is permanent lighting different?</summary><p>It's mounted once and stays up all year. It's low-profile in daylight and controlled from an app, so you can set colors for any holiday or event.</p></details>
    </div>
  </div>
</section>

{quote("Lighting", LIGHT_SVCS, "Let's light up your home.", "Send your address and a photo if you have one. We'll reply the same day with a written price.")}
'''

# ---------------- HOME SERVICES (coming soon) ----------------
soon = [("now","Available now","Gutter guards","Guards installed after a full clean-out. Fewer clogs, less overflow."),
        ("","Coming 2027","Porch screening","Turn an open porch into a bug-free outdoor room."),
        ("","Coming 2027","Simple decks","Ground-level and small decks, built clean and square."),
        ("","Coming 2027","Light framing","Small framing projects, repairs and add-ons."),
        ("","Coming 2027","Gutters","New seamless gutters and downspouts."),
        ("","Coming 2027","Siding &amp; roofing","Repairs and replacements, done by people who know exteriors.")]
soon_html = "".join(f'<div class="soon-card {c}"><span class="when">{w}</span><h3>{t}</h3><p>{p}</p></div>' for c,w,t,p in soon)
home_services = f'''
<section class="photo-hero"><div class="hero-bg" style="background-image:url(/work/install-1.jpg)"></div><span class="scroll-cue" aria-hidden="true"></span>
  <div class="wrap">
    <p class="eyebrow">Vesper Home Services · Coming 2027</p>
    <h1 style="margin-top:14px">More of your home, <em>done right.</em></h1>
    <p class="sub">We're gearing up to take on more of the projects around your home. Join the early list and you'll be first in line, with early-bird pricing.</p>
    <div class="actions"><a class="btn btn-primary" href="#quote">Join the early list</a><a class="btn btn-ghost" href="/cleaning.html#svc-guards">Gutter guards (available now)</a></div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="section-head"><p class="eyebrow">What's coming</p><h2>The projects we're building toward.</h2><p class="lede">Tell us which ones you need. Your answers decide what we launch first.</p></div>
    <div class="soon-grid">{soon_html}</div>
  </div>
</section>

<section class="alt">
  <div class="wrap split-2">
    <div class="ph"><img src="/work/owner-roof.jpg" alt="LaRon on a roof" loading="lazy" style="aspect-ratio:4/3"></div>
    <div>
      <p class="eyebrow">Why wait for us</p>
      <h2 style="margin-top:12px">Same owner. Same standard.</h2>
      <p class="lede" style="margin-top:14px">Our background is roofing, restoration and exterior work. We're adding services the right way: licensed, insured and ready before we take your project.</p>
      <ul class="ticks"><li>Early-list members get first scheduling</li><li>Early-bird pricing on your first project</li><li>No obligation. We'll reach out when it launches.</li></ul>
    </div>
  </div>
</section>

{quote("Home Services early list", ["Gutter guards","Porch screening","Deck building","Light framing","New gutters","Siding","Roofing","Something else"], "Get on the early list.", "Pick what you're interested in. Gutter guards are available now; for everything else, we'll reach out first when it launches.")}
'''

pages = [
  ("index.html","", "Vesper Exteriors | Exterior Cleaning & Lighting in Jefferson City, MO",
   "Vesper Exteriors: house soft washing, concrete, windows, gutters, and holiday and permanent lighting in Jefferson City and Mid-Missouri. Free quotes, same-day replies.", home, "light-twostory-dusk"),
  ("cleaning.html","cleaning.html","Exterior Cleaning in Jefferson City, MO | Vesper Exteriors",
   "House and roof soft washing, driveway and concrete cleaning, decks, gutters, gutter guards and window cleaning in Mid-Missouri. Packages, care plans and commercial service.", cleaning, "pool2-after"),
  ("lighting.html","lighting.html","Holiday & Permanent Lighting in Jefferson City, MO | Vesper Exteriors",
   "Custom holiday light installation with takedown and storage, plus app-controlled permanent lighting, for homes and businesses in Mid-Missouri.", lighting, "light-ranch-fog"),
  ("home-services.html","home-services.html","Home Services Coming 2027 | Vesper Exteriors",
   "Gutter guards available now. Porch screening, decks, light framing, gutters, siding and roofing coming to Mid-Missouri in 2027. Join the early list.", home_services, "owner-roof"),
]
for fname, cur, title, desc, body, og in pages:
    out = fname if fname == "index.html" else "public/" + fname   # sub-pages ship as static files
    open(out, "w").write(page(fname, cur, title, desc, body, og))
print("built", [p[0] for p in pages])
