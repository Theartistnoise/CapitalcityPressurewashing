
const ENDPOINT = "https://formspree.io/f/mbdearkr";
document.getElementById("yr").textContent = new Date().getFullYear();

/* Care plan pricing by home size (yearly); two-story adds 25% */
const PLANS = {
  s:{ess:580, plus:1040, prem:1465},
  m:{ess:770, plus:1390, prem:1950},
  l:{ess:1040, plus:1875, prem:2635}
};
const DISC = {ess:"10% off", plus:"12% off", prem:"15% off"};
let size = "m";
const fmt = n => "$" + Math.round(n).toLocaleString("en-US");
function renderPlans(){
  const two = document.getElementById("twoStory").checked;
  for (const k of ["ess","plus","prem"]) {
    let yr = PLANS[size][k] * (two ? 1.25 : 1);
    yr = Math.round(yr / 5) * 5;
    document.querySelector(`[data-plan="${k}"]`).textContent = fmt(yr / 12);
    document.querySelector(`[data-yr="${k}"]`).textContent = `${fmt(yr)} per year · ${DISC[k]}`;
  }
}
document.querySelectorAll(".seg button").forEach(b => b.addEventListener("click", () => {
  size = b.dataset.size;
  document.querySelectorAll(".seg button").forEach(x => x.setAttribute("aria-pressed", x === b ? "true" : "false"));
  renderPlans();
}));
document.getElementById("twoStory").addEventListener("change", renderPlans);

/* "Quote this" buttons prefill the full form */
function pick(value){
  const boxes = [...document.querySelectorAll('#svcChecks input')];
  const match = boxes.find(b => b.value === value);
  if (match) match.checked = true;
  else {
    const notes = document.getElementById("fNotes");
    if (!notes.value.includes(value)) notes.value = (notes.value ? notes.value + "\n" : "") + value;
    if (value.startsWith("Care plan")) boxes.find(b => b.value === "Care plan").checked = true;
    if (value === "Commercial service") document.getElementById("fType").value = "Business";
  }
  document.getElementById("quote").scrollIntoView({behavior:"smooth"});
  setTimeout(() => document.getElementById("fName").focus({preventScroll:true}), 500);
}
document.querySelectorAll("[data-pick]").forEach(b => b.addEventListener("click", () => pick(b.dataset.pick)));

async function send(payload, msgEl, btn){
  btn.disabled = true; const label = btn.textContent; btn.textContent = "Sending…";
  msgEl.textContent = ""; msgEl.className = "msg";
  try {
    const res = await fetch(ENDPOINT, {method:"POST", headers:{"Content-Type":"application/json","Accept":"application/json"}, body: JSON.stringify(payload)});
    if (!res.ok) throw new Error("bad status");
    return true;
  } catch(e) {
    msgEl.className = "msg err";
    msgEl.textContent = "That didn't go through. Please call or text (573) 418-3221.";
    btn.disabled = false; btn.textContent = label;
    return false;
  }
}

document.getElementById("quickForm").addEventListener("submit", async e => {
  e.preventDefault();
  const f = e.target, msg = document.getElementById("quickMsg");
  const name = f.name.value.trim(), phone = f.phone.value.trim();
  if (!name || !phone) { msg.className="msg err"; msg.textContent = "Please add your name and phone number."; return; }
  const ok = await send({_subject:`New Vesper lead: ${name}`, form:"Hero quick quote", name, phone, service:f.service.value}, msg, f.querySelector("button"));
  if (ok) f.innerHTML = `<div class="thanks"><h3>Thanks, ${name.split(" ")[0].replace(/[<>&]/g,"")}.</h3><p style="color:var(--muted)">We'll reach you at ${phone.replace(/[<>&]/g,"")} today.</p></div>`;
});

document.getElementById("fullForm").addEventListener("submit", async e => {
  e.preventDefault();
  const f = e.target, msg = document.getElementById("fullMsg");
  const name = f.name.value.trim(), phone = f.phone.value.trim();
  if (!name || !phone) { msg.className="msg err"; msg.textContent = "Please add your name and phone number."; return; }
  const services = [...f.querySelectorAll('input[name="services"]:checked')].map(b => b.value).join(", ");
  const ok = await send({
    _subject:`New Vesper lead: ${name}`, form:"Full quote form", name, phone,
    email:f.email.value.trim(), _replyto:f.email.value.trim() || undefined,
    propertyType:f.propertyType.value, address:f.address.value.trim(),
    services, source:f.source.value, notes:f.notes.value.trim()
  }, msg, f.querySelector('button[type="submit"]'));
  if (ok) document.getElementById("formCard").innerHTML = `<div class="thanks"><h3>Request received.</h3><p style="color:var(--muted)">Thanks, ${name.split(" ")[0].replace(/[<>&]/g,"")}. We'll call or text ${phone.replace(/[<>&]/g,"")} today with your quote.</p><p><a href="tel:5734183221">Can't wait? Call (573) 418-3221</a></p></div>`;
});
