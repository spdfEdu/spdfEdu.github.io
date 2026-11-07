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
    <p class="emailid"><span class="mail-head qes">Mail&nbsp;:</span><span class="ans">${ele.EmailId}[at]gmail.com</span></p>
    <div class="w100"><div class="mail" onclick="location.href='mailto:${ele.EmailId}'"><i class="svg svgMail"></i></div></div>
  </div>
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
  
<div class="card" ${styDisplay(ele.District)}>
    <h3>Address</h3>
    <p><span class="qes">District :</span> ${ele.District}</p>
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
     <div class="w50" style="display:block" onclick="share('${ele.Name}','${ele.EmailId}')"><i class="svg svgShare"></i>Share with others</div>
  </div>
</div>
<p class="w100 flex" id="pv_${nameDash}">Total Visits: &nbsp; <img /></p>
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

function ppVisit(a) {
 id= document.querySelector(`#pv_${a}>img`)
 img= "https://profile-counter.glitch.me/JNV_"+a+"_"+xii+"/count.svg"
 id.src= img;
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

function share(a,b) {
   var mail = '';
   if (b !=='undefined'){mail='\n   '+b};
   textToSend = '*JNV Msd Batch '+batch+'*\n'+a+mail+'\n\n'+window.location.href+'\n--> jnvmsdalumni.blogspot.com';
 if (navigator.share) {
       navigator.share({
       title: 'JNV MSD Batch '+batch,
       text: textToSend,
       })}
   else {
     window.open('whatsapp://send?text='+textToSend)
   }
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
