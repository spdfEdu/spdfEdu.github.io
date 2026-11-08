const estb = 2003;
const nth = function(d) {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
};
var year = new Date().getFullYear();
const addYear = [all[0].Batch-7];
let x = Number([addYear]);
let y = Number([estb]);
var z = [x-y+1];
var batch = z + nth(z);
var xii =(x+7);

//small helpers shared by the public and private blogs
function nameKey(p) { return p.Name.replace(/ /g,'_'); }
function findByKey(k) { return all.find(function(p){ return nameKey(p) === k; }); }
function mailOf(e) { e = String(e || "").trim(); return e ? (e.indexOf("@") > -1 ? e : e + "@gmail.com") : ""; }
function mailShow(e) { e = String(e || "").trim(); return e.indexOf("@") > -1 ? e : e + "[at]gmail.com"; }
function ph91(n) { n = String(n).trim(); return n.length <= 10 ? "91" + n : n; }

document.title = `${xii} JNV MSD`;
urlChange = '/' +xii +window.location.hash;
window.history.replaceState('','',urlChange);

document.body.classList.add("batch-page");
var upper = document.createElement("section");
upper.className = "batch-card";
upper.innerHTML =
 `<div class="bc-photo"></div>
  <div class="bc-body">
    <div class="bc-head">
      <h1 id="head-main">${xii}</h1>
      <span class="bc-badge">Batch ${batch}</span>
    </div>
    <dl class="bc-stats">
      <div class="bc-stat"><dt>Studied</dt><dd>${x} to ${xii}</dd></div>
      <div class="bc-stat"><dt>Alumni</dt><dd>${all.length}</dd></div>
      ${(typeof date !== "undefined") ? `<div class="bc-stat bc-wide"><dt>Data collected</dt><dd>${date}</dd></div>` : ""}
    </dl>
  </div>`;
var coverBox = document.querySelector(".tc");
if (!coverBox) {
  coverBox = document.createElement("div");
  coverBox.className = "tc";
  coverBox.innerHTML = `<img alt="Batch ${xii}" src="https://spdfedu.github.io/JNV/images/cover/${xii}.jpg">`;
}
upper.querySelector(".bc-photo").append(coverBox);
document.getElementById("upper").append(upper);

document.getElementById("down").innerHTML = "<h2>Other batches</h2><p>Current passout batch: " +year +
"<br>Established: " + [estb] +
"<br>Total batches: " +[year -[estb] -6]+"</p>";

  //creating the profiles
main = document.getElementById("mainContainer")
vesselBox = document.createElement("div")
vesselBox.id = "vessel_box"
main.append(vesselBox)
insertProfiles = document.getElementById("vessel_box");
git = "https://spdfedu.github.io/JNV/"
giti = git+"images/"

all.sort((a, b) => {
  const nameA = a.Name.toUpperCase(); 
  const nameB = b.Name.toUpperCase(); 
  if (nameA < nameB) {return -1}
  if (nameA > nameB) {return 1}
  return 0;
});

all.forEach(createProfile);
function createProfile(ele,i) {
 child = document.createElement("div")
 nameDash = ele.Name.replace(/ /g,'_')
 img = xii+'/'+nameDash+'.jpg'
  child.className = "vessels collapsed";
  child.innerHTML =
 `<a class="nameBox" href="#${nameDash}" onclick="doh()">
    <div class="pp">
      <img class="svgP svgPP">
      <img class="coverPP" loading="lazy" decoding="async" width="60" height="60" src="${giti+img}" onerror="this.className='svgP svgPP'" alt="${ele.Name}" />
    </div>
    <h2 class="naming">${ele.Name}</h2>
  </a>
  
  <div hidden="until-found" class="contentBox" id="${nameDash}">
  <div class="bscrool">
  <div class="nameBox2 flex" onclick="doh2(this)">
    <h2 class="naming2">${ele.Name}</h2>
    <div class="back"><i class="svgBack"></i></div>
  </div>
  <div class="head-cover separator">
  <img class="svgP">
  <a href="https://lh3.googleusercontent.com/d/${ele.ppl}" target="_blank"><img class="coverP" loading="lazy" src="${giti+img}" onerror="this.parentNode.parentNode.style.display='none'"></a></div>
  
  <div class="details">
  <div class="fst">
  <p>This is ${ele.Name} of Batch ${batch} (${x} to ${xii}) of JNV Murshidabad.</p>
  </div>
  
  ${ripDiv(ele.rip)}
  
<div class="card" ${styDisplay(ele.Phone, ele.Phone2, ele.EmailId)}>
    <h3>Contact Details</h3>
    ${phnDiv(ele.Phone)}
    ${phnDiv(ele.Phone2)}
 <div class="w100" ${styDisplay(ele.EmailId)}>
    <p class="emailid"><span class="mail-head qes">Mail&nbsp;:</span><span class="ans">${mailShow(ele.EmailId)}</span></p>
    <div class="w100"><div class="mail" onclick="location.href='mailto:${mailOf(ele.EmailId)}'"><i class="svg svgMail"></i></div></div>
  </div>
  ${saveDiv(ele)}
</div>
   
<div class="card" ${styDisplay(ele.House)}>
     <h3>House</h3>
     <img loading="lazy" class="hsimg" width="100%" src="${giti}tshirt/webp/${ele.House}.webp" alt="${ele.House} House Tshirt" />
     <p style="text-align:center">${ele.House}</p>
   </div>
   
<div class="card bgcard" ${styDisplay(ele.BloodGroup)}>
    <img loading="lazy" width="25%" class="blood-drop" src="${giti}icons/blood_drop.webp"/>
    <h3>Blood Group</h3>
    <p>${ele.BloodGroup}</p>
  </div>
  
<div class="card" ${styDisplay(ele.Address, ele.PinCode, ele.District)}>
    <h3>Address</h3>
    <p>${addrHtml(ele)}</p>
  </div>
  
<div class="card" ${styDisplay(ele.CurrentStatus, ele.HQD, ele.Institute)}>
    <h3>Current Status</h3>
<p class="info" ${styDisplay(ele.CurrentStatus)}>
<span class="qes">Current Status :</span><span class="ans">${ele.CurrentStatus}</span></p>

 <p class="info" ${styDisplay(ele.HQD)}><span class="qes">Highest Qualification Degree :</span><br><span class="ans">${ele.HQD}</span></p>

<p class="info" ${styDisplay(ele.Institute)}><span class="qes">Institution :</span><span class="ans">${ele.Institute}</span></p>
</div>

  <div class="card" ${styDisplay(ele.fb,ele.insta)}>
    <h3>Social Media</h3>
  <div class="w100 flex">
  <div class="w50" ${styDisplay(ele.fb)} onclick="window.open('https://facebook.com/${ele.fb}','_blank')"><i class="svg svgFb"></i>Facebook</div>
  <div class="w50" ${styDisplay(ele.insta)} onclick="window.open('https://instagram.com/${ele.insta}','_blank')"><i class="svg svgInsta"></i>Instagram</div>
  </div>
  </div>
  
<div class="card">
    <h3>Share</h3>
    <div class="w100">
     <div class="w50" style="display:block" data-key="${nameDash}" onclick="share(this.dataset.key)"><i class="svg svgShare"></i>Share with others</div>
  </div>
</div>
<p class="visits" id="pv_${nameDash}" hidden>Total visits: <b></b></p>
    </div>
    </div>
  </div>`;
  insertProfiles.append(child);
}

function phnDiv(a) {
 if(a) return `<div class="w100">
   <p><span class="qes">Phone No. :</span><span class="ans">${a}</span></p>
   <div class="w100 flex">
    <div class="w50" onclick="location.href='tel:${a}'"><i class="svg svgCall"></i></div>
    <div class="w50" onclick="location.href='whatsapp://send?phone=${(Number(a).toString().length<=10)? '91':''}${a}'"><i class="svg svgWp"></i></div>
  </div></div>`
else return "";
}

function ripDiv(a) {
  if(a) return `<div class="card">
      <h3>Remembering...</h3>
      <img width="100%" src="${giti}icons/grave_stone.webp">
   </div>`
   return "";
}

var visitBusy = {};
function ppVisit(a) {
  var box = document.getElementById("pv_" + a), cfg = window.JNV_COUNTER;
  if (!box || !cfg || !cfg.workspace || !cfg.key || visitBusy[a]) return;
  var name = (xii + "_" + a).toLowerCase().replace(/[^a-z0-9_-]/g, "_");
  var flag = "jnv-seen-" + name, counted = false;
  try { counted = sessionStorage.getItem(flag) === "1"; } catch(e) {}
  visitBusy[a] = true;
  fetch("https://api.counterapi.dev/v2/" + cfg.workspace + "/" + name + (counted ? "" : "/up"), {
    headers: { Authorization: "Bearer " + cfg.key }
  })
  .then(function(r) { if (!r.ok) throw new Error(r.status); return r.json(); })
  .then(function(j) {
    var d = j && j.data;
    if (!d) return;
    box.querySelector("b").textContent = ((d.up_count || 0) - (d.down_count || 0)).toLocaleString();
    box.hidden = false;
    try { sessionStorage.setItem(flag, "1"); } catch(e) {}
  })
  .catch(function() {})
  .then(function() { visitBusy[a] = false; });
}

function addrHtml(ele) {
  var out = [];
  if (ele.Address) out.push(ele.Address);
  if (ele.PinCode) out.push('<span class="qes">Pin Code :</span>' + ele.PinCode);
  if (ele.District) out.push('<span class="qes">District :</span>' + ele.District);
  return out.join("<br>");
}

function saveDiv(ele) {
  if (!ele.Phone && !ele.Phone2) return "";
  return `<div class="w100 flex"><div class="w50" style="display:block" data-key="${nameKey(ele)}" onclick="downVcardi(this.dataset.key)"><i class="svg svgContact"></i>Save as Contact</div></div>`;
}

function styDisplay(a,b,c) {
  return `style = "display: ${(!a && !b && !c)? 'none' : 'block'}"`;
}

//creating the Filter
sorting = {
  BloodGroup : ['O +ve', 'A +ve','B +ve','AB +ve','O -ve','A -ve','B -ve','AB -ve'],
  House : ['Aravali','Nilgiri','Shivalik','Udaigiri'],
  CurrentStatus : ['Studying','Employee']
}

bgInsert = document.createElement("div")
bgplText = `<strong>${all.length}</strong> registered alumni`
bgInsert.className = "bgpc"
bgInsert.innerHTML =`
<div class="tb-top">
  <p id="bgpl">${bgplText}</p>
  <button type="button" class="view-toggle" id="viewToggle" aria-label="Switch to grid view" aria-pressed="false" title="Grid or list view">
    <svg class="i-grid" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/></svg>
    <svg class="i-list" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><rect x="3" y="4" width="18" height="4" rx="2"/><rect x="3" y="10" width="18" height="4" rx="2"/><rect x="3" y="16" width="18" height="4" rx="2"/></svg>
  </button>
</div>
<div class="tb-filters">
  <select onchange="find(event)" id="to-find" aria-label="Filter alumni">
     <option disabled selected value="a">Filter</option>
     <option value="BloodGroup">Blood Group</option>
     <option value="House">House</option>
     <option value="CurrentStatus">Current Status</option>
  </select>
  <button type="button" onclick="erase()">Clear</button>
  <select onchange="ckFind(event)" id="getFind" aria-label="Filter value"></select>
</div>
 `;
main.insertBefore(bgInsert, main.firstChild);

//list or grid view, remembered per device
(function(){
  var btn = document.getElementById("viewToggle");
  function setView(grid) {
    main.classList.toggle("grid-view", grid);
    btn.setAttribute("aria-pressed", grid ? "true" : "false");
    btn.setAttribute("aria-label", grid ? "Switch to list view" : "Switch to grid view");
  }
  var saved = null;
  try { saved = localStorage.getItem("jnv-view"); } catch(e) {}
  setView(saved === "grid");
  btn.addEventListener("click", function() {
    var grid = !main.classList.contains("grid-view");
    setView(grid);
    try { localStorage.setItem("jnv-view", grid ? "grid" : "list"); } catch(e) {}
  });
})();

getFind= document.querySelector('#getFind')
bgpl= document.getElementById('bgpl')

function find(e) {
  var findvalue = e.target.value
  getFind.style.display = 'block'
  getFind.innerHTML = `<option selected disabled value="${findvalue}">-- Select ${findvalue} --</option>`
  findSort = sorting[findvalue]
  for (let k in findSort) {
      var sel = document.createElement('option')
       sel.innerHTML = findSort[k]
       sel.value = findSort[k]
       getFind.appendChild(sel)
    }
  insertProfiles.innerHTML=''
  all.forEach(createProfile);
}

function ckFind(ev) {
 var toFind = ev.target[0].value;
  filter = all.filter(person => person[toFind] === ev.target.value)
  bgpl.innerHTML = "<strong>" + filter.length + "</strong> of " + all.length + " alumni (" + ev.target[0].value + ": " + ev.target.value + ")"
  insertProfiles.innerHTML=''
  filter.forEach(createProfile);
  }

function erase() {
  bgpl.innerHTML= bgplText
  getFind.style.display= 'none'
  document.getElementById('to-find').value = "a"
  insertProfiles.innerHTML=''
  all.forEach(createProfile);
}

function share(key) {
  var h = findByKey(key);
  if (!h) return;
  var lines = ["*JNV Msd Batch " + batch + "*", h.Name];
  var phones = [h.Phone, h.Phone2].filter(Boolean);
  if (phones.length) { phones.forEach(function(p) { lines.push("   " + p); }); }
  else if (h.EmailId) { lines.push("   " + mailOf(h.EmailId)); }
  var text = lines.join("\n") + "\n\n" + location.origin + "/" + xii + "#" + key;
  if (navigator.share) {
    navigator.share({ title: "JNV MSD Batch " + batch, text: text }).catch(function() {});
  } else {
    window.open("whatsapp://send?text=" + encodeURIComponent(text));
  }
}

//save as contact (.vcf), vcard.js is loaded from the repo only when needed
function withVcard(cb) {
  if (window.vCard) return cb();
  var sc = document.createElement("script");
  sc.src = git + "vcard.js";
  sc.onload = cb;
  sc.onerror = function() { alert("Could not load the contact helper. Please try again."); };
  document.head.appendChild(sc);
}

function downVcardi(key) {
  var h = findByKey(key);
  if (!h) return;
  var g = { version: "2.1", fn: h.Name + " " + String(h.Batch || xii).slice(2) + " Jnv" };
  var tel = [];
  [h.Phone, h.Phone2].forEach(function(p) { if (p) tel.push({ value: ph91(p), type: "Phone" }); });
  if (tel.length) g.tel = tel;
  if (h.EmailId) g.email = [{ value: mailOf(h.EmailId), type: "Personal" }];
  withVcard(function() { vCard.export(g, g.fn, true); });
}

function doh2(e) {
   e.parentNode.classList.remove("active")
   document.body.style.overflow = "scroll"
   if (window.history.length>=1) {
     location.href = window.location.pathname
   }
   if (window.history.length>2) {
     window.history.back()
   }
}

window.addEventListener('popstate', function (event) {
  var act = document.getElementsByClassName("active")[0]
  if (act) {
   act.hidden = "until-found";
   act.classList.remove("active");
   document.body.style.overflow = "scroll";
  }
});
  
function doh(){
  document.querySelectorAll(".vessels").forEach((vessel) => {
  var details = vessel.querySelector(".contentBox");
  vessel.onbeforematch = () => {
    vessel.classList.remove("collapsed");
    location.href = "#"+details.id
    details.classList.add("active")
    document.body.style.overflow = "hidden"
    ppVisit(details.id)
  };
  vessel.querySelector(".nameBox").onclick = () => {
    vessel.classList.toggle("collapsed");
    details.classList.add("active")
    if (vessel.classList.contains("collapsed")) {
      details.hidden = "until-found";
      details.classList.remove("active")
      document.body.style.overflow = "scroll";
    } else {
      details.removeAttribute("hidden");
      details.classList.add("active")
      document.body.style.overflow = "hidden"
      location.href = "#"+details.id
    }
  };
});
}
doh();
  
  for (i=y+7;i<=year;i++) {
var batches = document.createElement("div");
batches.className="boxBatch";
batches.innerHTML = `
<a class="batch" href="/${i}">
      <img class="coverb" src="${giti}cover/${i}.jpg" alt="Batch ${i}" onerror="this.src='${giti}cover/Jnv_Murshidabad.jpg'">
      <div class="form-link">Batch 
      ${i-y-6}${nth(i-y-6)} (${i-7} - ${i})
      </div>
    </a>`;
document.getElementById("other").append(batches);
}
