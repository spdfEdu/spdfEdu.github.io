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
urlChange = xii + window.location.hash
window.history.replaceState('','',urlChange);

var upper = document.createElement("div");
upper.innerHTML =
 `<h1 id="head-main">&#60;/Batch-${batch}&#62;</h1>
  <p class="summary">
  Year of Xii Passout : ${xii} <br><br>
  Total No of Students is ${all.length}
  <br><br>
  Data Collected on ${date}</p>`;
document.getElementById("upper").append(upper);

  //creating the profiles
main = document.getElementById("mainContainer")
vesselBox = document.createElement("div")
vesselBox.id = "vessel-box"
main.append(vesselBox)
insertProfiles = document.getElementById("vessel-box");

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
 img = `${xii}/${ele.Name.replace(/ /gi,'_')}.jpg`
  child.className = "vessel collapsed";
  child.innerHTML =
 `<a class="nameBox">
    <div class="pp">
      <img class="svgP svgPP">
      <img class="coverPP" src="https://spdfedu.github.io/JNV/images/${img}" onerror="this.className='svgP svgPP'" alt="${ele.Name}" />
    </div>
    <div class="naming">${ele.Name}</div>
  </a>
  
  <div hidden="until-found" class="contentBox ${ele.House}" id="${ele.Name.replace(/ /g,"_")}">
  <div class="bscrool">
  <a class="nameBox2" onclick="doh2(this)">
    <div class="naming2">${ele.Name}</div>
    <div class="back"><i class=" svgBack"></i></div>
  </a>
  <div class="head-cover">
  <img class="svgP">
  <a href="https://lh3.googleusercontent.com/d/${ele.ppl}" target="_blank"><img class="coverP" loading="lazy" src="https://spdfedu.github.io/JNV/images/${img}" onerror="this.parentNode.parentNode.style.display='none'"></a></div>
  
  <div class="details">
    <div class="contact">
  <div class="gap"></div>
  <div class="fb" style="visibility: ${(!ele.fb)? 'hidden' : 'visible'}" onclick="window.open('https://facebook.com/${ele.fb}','_blank')" href=''><i class="svg svgFb"></i>
  </div>
  <div class="insta" style="visibility: ${(!ele.insta)? 'hidden' : 'visible'}" onclick="window.open('https://instagram.com/${ele.insta}','_blank')" href=''><i class="svg svgInsta"></i>
  </div>
  <div class="share" onclick="share('${ele.Name}','${ele.Phone}','${ele.Phone2}')"><i class="svg svgShare"></i>
  </div>
  <div class="share" onclick="downVcardi(${i})"><i class="svg svgContact"></i>
  </div>
  </div>
  
<div class="contact phn fst" style="visibility: ${(!ele.Phone)? 'hidden' : 'visible'}"><div class="phnHead">Phone No. : </div>
 <div class="phnNo">${ele.Phone}</div>
 <div class="ccall" onclick = "location.href='tel:${ele.Phone}'" href=''> 
  <i class="svg svgCall"></i></div>
  <div class="cwp" onclick="location.href='whatsapp://send?phone=${(Number(ele.Phone).toString().length<=10)? '91':''}${ele.Phone}'" href=''><i class="svg svgWp"></i></div></div>
  
<div class="contact phn" style="display: ${(!ele.Phone2)? 'none' : 'flex'}">
    <div class="phnHead"></div>
    <div class="phnNo2">${ele.Phone2}</div>
    <div class="ccall" onclick = "location.href='tel:${ele.Phone2}'" href=''><i class="svg svgCall"></i></div>
    <div class="cwp" onclick="location.href='whatsapp://send?phone=${(Number(ele.Phone2).toString().length<=10)? '91':''}${ele.Phone2}'" href=''><i class="svg svgWp"></i></div></div>
    
<div class="contact" style="display: ${(!ele.EmailId)? 'none' : 'flex'}">
   <div class="mailHead">Mail&nbsp;:</div>
  <div class="emailid">${ele.EmailId}</div>
  <div class="mail" onclick="location.href='mailto:${ele.EmailId}'" href=''><i class="svg svgMail"></i></div>
   </div><br>

<p class="info" style="display: ${(!ele.House)?'none':'block'}">
<span class="qes">House : </span>
<span class="ans">${ele.House}</span></p>

<p class="info" style="display: ${(!ele.BloodGroup)?'none':'block'}">
<span class="qes">Blood Group : </span>
<span class="ans">${ele.BloodGroup}</span></p>

<p class="info" style="display: ${(!ele.Address)?'none':'block'}">
<span class="qes">Address : </span><br>
<span class="ans">${ele.Address}<br>
Pin Code - ${ele.PinCode} <br>District - ${ele.District}</span>
</p><br>

<p class="info" style="display: ${(!ele.CurrentStatus)?'none':'block'}">
<span class="qes">Current Status :</span><span class="ans">${ele.CurrentStatus}</span></p>

<p class="info" style="display: ${(!ele.HQD)?'none':'block'}">
<span class="qes">Highest Qualification Degree :</span><br><span class="ans">${ele.HQD}</span></p>

<p class="info" style="display: ${(!ele.Institute)?'none':'block'}">
<span class="qes">Institution :</span><span class="ans">${ele.Institute}</span></p>
    
    </div>
    </div>
  </div>`;
  insertProfiles.append(child);
}

//creating the Filter
sorting = {
  BloodGroup : ['O +ve', 'A +ve','B +ve','AB +ve','O -ve','A -ve','B -ve','AB -ve'],
  House : ['Aravali','Nilgiri','Shivalik','Udaigiri'],
  CurrentStatus : ['Studying','Employee']
}

bgInsert = document.createElement("div")
bgplText = `  &nbsp; &nbsp;There are total ${all.length} Registered Alumnis`
bgInsert.className = "bgpc"
bgInsert.innerHTML =`
<select onchange="find(event)" id="to-find">
   <option disabled selected value="a">Filter</option>
   <option value="BloodGroup">Blood Group</option>
   <option value="House">House</option>
   <option value="CurrentStatus">Current Status</option>
</select>
<button onclick="erase()">Clear</button>
<select onchange="ckFind(event)" id="getFind">
</select>

 <p id="bgpl">${bgplText}</p>
 <br><br>`;
main.insertBefore(bgInsert, main.firstChild);

getFind = document.querySelector('#getFind')
bgpl = document.getElementById("bgpl")

function find(e) {
  var findvalue = e.target.value
  getFind.style.display = "block"
  getFind.innerHTML = `<option selected disabled value="${findvalue}">-- Select ${findvalue} --</option>`
  findSort = sorting[findvalue]
  for (x in findSort) {
      var sel = document.createElement('option')
       sel.innerHTML = findSort[x]
       sel.value = findSort[x]
       getFind.appendChild(sel)
    }
  insertProfiles.innerHTML=''
  all.forEach(createProfile);
  bgpl.innerHTML= bgplText
}

function ckFind(ev) {
 var toFind = ev.target[0].value;
  filter = all.filter(person => person[toFind] === ev.target.value)
  bgpl.innerHTML ="  &nbsp; &nbsp;" +filter.length +" '"+ ev.target.value + "' "+ev.target[0].value+" out of " + all.length + " Alumnis"
  insertProfiles.innerHTML=''
  filter.forEach(createProfile);
  }

function erase() {
  bgpl.innerHTML= bgplText
  getFind.style.display= 'none'
  document.querySelector('.bgpc>select').value = "a"
  insertProfiles.innerHTML=''
  all.forEach(createProfile);
}

function share(a,b,c) {
   var ph2 = '';
   if (c !=='undefined'){ph2='\n   '+c};
   textToSend = '*JNV Msd Batch '+batch+'*\n'+a+'\n   '+b+ph2+'\n\n'+window.location.href+'\n--> bit.ly/jnvmsd';
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
   window.history.back();
}

window.addEventListener('popstate', function (event) {
  var act = document.getElementsByClassName("active")[0];
  if (act) {
   act.hidden = "until-found";
   act.classList.remove("active");
   document.body.style.overflow = "scroll";
  }
});

for (i=y+7;i<=year;i++) {
var batches = document.createElement("div");
batches.className="boxBatch";
batches.innerHTML = `
<a class="batch" href="/${i}">
      <img class="coverb" src="https://spdfedu.github.io/JNV/images/cover/${i}.jpg" alt="Batch ${i}" onerror="this.src='https://spdfedu.github.io/JNV/images/cover/Jnv_Murshidabad.jpg'">
      <div class="form-link">Batch 
      ${i-y-6}${nth(i-y-6)} (${i-7} - ${i})
      </div>
    </a>`;
document.getElementById("other").append(batches);
}

document.getElementById("down").innerHTML = "<h2>Check Out Other Batches: </h2><p>Current Passout Batch : " +year +
"<br> Established Year : " + [estb] +
"<br> Total Batches : " +[year -[estb] -6]+"</p>";

function downVcardi(index) {
  h = all[index];
  g = {};
  g.version = "2.1";
  g.fn = h.Name +" " +h.Batch.toString().slice(2) + " Jnv";
  if (h.Phone) {if (h.Phone.toString().length <=10) {h.Phone = "91"+h.Phone}
    g.tel = [{value : h.Phone,type : "Phone"}]}
  if (h.Phone2) {if (h.Phone2.toString().length<=10) {h.Phone2 = "91"+h.Phone2};
    j = {value : h.Phone2,type : "Phone"};g.tel.push(j)}
  if (h.EmailId) {g.email = [{value : h.EmailId,type : "Personal"}]}
  vCard.export(g, g.fn, true)
}

  head = document.head || document.getElementsByTagName('head')[0]
  script = document.createElement('script')
  script.src = 'https://spdfedu.github.io/JNV/vcard.js'
  head.appendChild(script);
  
  document.querySelectorAll(".vessel").forEach((vessel) => {
  var details = vessel.querySelector(".contentBox");
  vessel.onbeforematch = () => {
    vessel.classList.remove("collapsed");
    location.href = "#"+details.id
    details.classList.add("active")
    document.body.style.overflow = "hidden"
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
