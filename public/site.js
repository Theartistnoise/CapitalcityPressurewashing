/* Vesper Exteriors shared site script */
const ENDPOINT = "https://formspree.io/f/mbdearkr";
document.querySelectorAll(".yr").forEach(e => e.textContent = new Date().getFullYear());

document.documentElement.classList.add("js");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Full-screen menu */
const xnav = document.getElementById("xnav");
const menuBtn = document.querySelector(".menu-btn");
if (xnav && menuBtn) {
  const closeBtn = xnav.querySelector(".xnav-close");
  let lastFocus = null;
  const open = () => {
    lastFocus = document.activeElement;
    xnav.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => xnav.classList.add("open")));
    document.body.classList.add("nav-open");
    menuBtn.setAttribute("aria-expanded", "true");
    setTimeout(() => closeBtn.focus(), 50);
  };
  const close = () => {
    xnav.classList.remove("open");
    document.body.classList.remove("nav-open");
    menuBtn.setAttribute("aria-expanded", "false");
    setTimeout(() => { if (!xnav.classList.contains("open")) xnav.hidden = true; }, reduce ? 0 : 600);
    if (lastFocus) lastFocus.focus();
  };
  menuBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  xnav.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
  document.addEventListener("keydown", e => {
    if (!xnav.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "Tab") {
      const f = [...xnav.querySelectorAll("a, button")];
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
}

/* Scroll reveal */
const rvSel = ".section-head, .svc, .pkg, .plan, .line, .ba, .gallery button, .offer, .step, .panel, .soon-card, .com-card, .cta-band, .split-2 > *, .dn, .strip .wrap > div, .faq details";
const rvEls = [...document.querySelectorAll(rvSel)].filter(el => !el.closest(".xnav"));
if ("IntersectionObserver" in window && !reduce) {
  rvEls.forEach(el => {
    el.classList.add("rv");
    const sibs = [...el.parentElement.children].filter(c => c.matches(rvSel));
    el.style.transitionDelay = Math.min(sibs.indexOf(el), 5) * 70 + "ms";
  });
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  rvEls.forEach(el => io.observe(el));
}

/* Before / after sliders */
document.querySelectorAll(".ba .frame input[type=range]").forEach(r => {
  const f = r.closest(".frame");
  const set = () => f.style.setProperty("--p", r.value + "%");
  r.addEventListener("input", set); set();
});

/* Gallery lightbox */
const lb = document.getElementById("lb");
if (lb) {
  const img = lb.querySelector("img");
  document.querySelectorAll(".gallery button").forEach(b => b.addEventListener("click", () => {
    img.src = b.dataset.full; img.alt = b.querySelector("img").alt; lb.showModal();
  }));
  lb.addEventListener("click", e => { if (e.target === lb || e.target.tagName === "BUTTON") lb.close(); });
}

/* Care plan pricing (yearly by home size; two-story adds 25%) */
const PLANS = { s:{ess:580, plus:1040, prem:1465}, m:{ess:770, plus:1390, prem:1950}, l:{ess:1040, plus:1875, prem:2635} };
const DISC = { ess:"10% off", plus:"12% off", prem:"15% off" };
const fmt = n => "$" + Math.round(n).toLocaleString("en-US");
const two = document.getElementById("twoStory");
if (two) {
  let size = "m";
  const render = () => {
    for (const k of ["ess","plus","prem"]) {
      const yr = Math.round(PLANS[size][k] * (two.checked ? 1.25 : 1) / 5) * 5;
      document.querySelector(`[data-plan="${k}"]`).textContent = fmt(yr / 12);
      document.querySelector(`[data-yr="${k}"]`).textContent = `${fmt(yr)} per year · ${DISC[k]}`;
    }
  };
  document.querySelectorAll("[data-size]").forEach(b => b.addEventListener("click", () => {
    size = b.dataset.size;
    document.querySelectorAll("[data-size]").forEach(x => x.setAttribute("aria-pressed", x === b ? "true" : "false"));
    render();
  }));
  two.addEventListener("change", render); render();
}

/* "Quote this" buttons prefill the form */
function pick(value) {
  const boxes = [...document.querySelectorAll("#svcChecks input")];
  const match = boxes.find(b => b.value === value);
  if (match) match.checked = true;
  else {
    const notes = document.getElementById("fNotes");
    if (notes && !notes.value.includes(value)) notes.value = (notes.value ? notes.value + "\n" : "") + value;
    const plan = boxes.find(b => b.value === "Care plan");
    if (value.startsWith("Care plan") && plan) plan.checked = true;
    if (value === "Commercial service") document.getElementById("fType").value = "Business";
  }
  document.getElementById("quote").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => document.getElementById("fName").focus({ preventScroll: true }), 500);
}
document.querySelectorAll("[data-pick]").forEach(b => b.addEventListener("click", () => pick(b.dataset.pick)));

/* Form submit to Formspree (lands in your email) */
const clean = s => s.replace(/[<>&]/g, "");
const form = document.getElementById("fullForm");
if (form) form.addEventListener("submit", async e => {
  e.preventDefault();
  const f = e.target, msg = document.getElementById("fullMsg"), btn = f.querySelector('button[type="submit"]');
  const name = f.name.value.trim(), phone = f.phone.value.trim();
  if (!name || !phone) { msg.className = "msg err"; msg.textContent = "Please add your name and phone number."; return; }
  const services = [...f.querySelectorAll('input[name="services"]:checked')].map(b => b.value).join(", ");
  const page = f.dataset.page;
  btn.disabled = true; const label = btn.textContent; btn.textContent = "Sending…"; msg.textContent = ""; msg.className = "msg";
  try {
    const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ _subject: `New Vesper lead (${page}): ${name}`, page, name, phone,
        email: f.email.value.trim(), _replyto: f.email.value.trim() || undefined, contactPref: f.contactPref.value,
        propertyType: f.propertyType.value, address: f.address.value.trim(), services, source: f.source.value, notes: f.notes.value.trim() }) });
    if (!res.ok) throw new Error("bad status");
    const tel = document.querySelector(".top-phone");
    document.getElementById("formCard").innerHTML = `<div class="thanks"><h3>Request received.</h3><p style="color:var(--muted)">Thanks, ${clean(name.split(" ")[0])}. We'll reach you at ${clean(phone)} today.</p><p><a href="${tel.href}">Can't wait? Call ${tel.textContent}</a></p></div>`;
  } catch (err) {
    msg.className = "msg err";
    msg.textContent = "That didn't go through. Please call or text " + document.querySelector(".top-phone").textContent + ".";
    btn.disabled = false; btn.textContent = label;
  }
});
