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
window.history.replaceState('','',`/${xii}`);
var upper = document.createElement("div");
upper.innerHTML =
 `<h1 id="head-main">&#60;/Batch-${batch}&#62;</h1>
  <p class="summary">
  Year of Xii Passout : ${xii} <br><br>
  Total No of Students is ${all.length}
  <br><br>
  </p>`;
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
function createProfile(ele) {
 child = document.createElement("div")
 img = `${xii}/${ele.Name.replace(/ /gi,'_')}.jpg`
 
  child.className = "vessel";
  child.innerHTML =
 `<a class="nameBox" onclick="doh(this)">
    <div class="pp">
      <img class="svgP svgPP">
      <img class="coverPP" src="https://spdfedu.github.io/JNV/images/${[xii]}/${ele.Name.replace(/ /gi,'_')}.jpg" onerror="this.className='svgP svgPP'" alt="" />
    </div>
    <div class="naming">${ele.Name}</div>
  </a>

  <div class="contentBox ${ele.House}">
  <a class="nameBox2" onclick="doh2(this)">
    <div class="naming2">${ele.Name}</div>
    <div class="back"><i class="svgBack"></i></div>
  </a>
  <div class="head-cover">
  <img class="svgP">
  <a href="https://lh3.googleusercontent.com/d/${ele.ppl}" target="_blank"><img class="coverP" loading="lazy" src="https://spdfedu.github.io/JNV/images/${[xii]}/${ele.Name.replace(/ /gi,'_')}.jpg" onerror="this.parentNode.parentNode.style.display='none'"></a></div>
  
  <div class="details">
    <div class="contact">
  <div class="gap"></div>
  <div class="share"></div>
  <div class="insta" style="visibility: ${(!ele.insta)? 'hidden' : 'visible'}" onclick="window.open('https://instagram.com/${ele.insta}','_blank')" href=''><i class="svg svgInsta"></i>
  </div>
  <div class="fb" style="visibility: ${(!ele.fb)? 'hidden' : 'visible'}" onclick="window.open('https://facebook.com/${ele.fb}','_blank')" href=''><i class="svg svgFb"></i>
  </div>
 </div>
  
<p class="info fst" style="display: ${(!ele.Batch)?'none':'block'}">
<span class="qes">Batch : </span>
<span class="ans">${batch} (${ele.Batch-7} - ${ele.Batch})</span></p>

<div class="contact" style="display: ${(!ele.EmailId)? 'none' : 'flex'}">
   <div class="mailHead">Mail&nbsp;:</div>
  <div class="emailid">${ele.EmailId}[at]gmail.com</div>
  <div class="mail" onclick="location.href='mailto:${ele.EmailId}@gmail.com'" href=''><i class="svg svgMail"></i></div>
   </div>

<p class="info" style="display: ${(!ele.House)?'none':'block'}">
<span class="qes">House : </span>
<span class="ans">${ele.House}</span></p>

<p class="info" style="display: ${(!ele.District)?'none':'block'}">
<span class="qes">District : </span><span class="ans">${ele.District}</span>
</p>
<p class="info" style="display: ${(!ele.BloodGroup)?'none':'block'}">
<span class="qes">Blood Group : </span>
<span class="ans">${ele.BloodGroup}</span></p><br>

<p class="info" style="display: ${(!ele.CurrentStatus)?'none':'block'}">
<span class="qes">Current Status :</span><span class="ans">${ele.CurrentStatus}</span></p>

<p class="info" style="display: ${(!ele.HQD)?'none':'block'}">
<span class="qes">Highest Qualification Degree :</span><br><span class="ans">${ele.HQD}</span></p>

<p class="info" style="display: ${(!ele.Institute)?'none':'block'}">
<span class="qes">Institution :</span><span class="ans">${ele.Institute}</span></p>
    
    </div>
  </div>`;
  insertProfiles.append(child);
}

// Creating the Filter
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
   <option value="BloodGroup">BloodGroup</option>
   <option value="House">House</option>
   <option value="CurrentStatus">CurrentStatus</option>
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
  bgpl.innerHTML= bgplText
  insertProfiles.innerHTML=''
  all.forEach(createProfile);
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

//share function
 function share(a,b) {
 if (navigator.share) {
       navigator.share({
       title: 'JNV MSD',
       text: '*Batch '+batch+'*\n'+a+'\n'+b+'\n\n--> bit.ly/jnvmsd',
       })}
   else {
     window.open('whatsapp://send?text=*Batch '+batch+'*%0A'+a+'%0A'+b+'%0A%0A--%3E%20bit.ly/jnvmsd');
   }
 }
 
 function doh(e) {
   e.nextElementSibling.classList.add("active")
   document.body.style.overflow = "hidden"
   window.history.pushState('', e.children[1].textContent, window.location.href+"/user/"+e.children[1].textContent.replace(/ /gi,'_'));
  }
  
 function doh2(e) {
   e.parentNode.classList.remove("active")
   document.body.style.overflow = "scroll"
   window.history.back();
}

window.addEventListener('popstate', function (event) {
  if (! document.getElementsByClassName("active")[0]) { }
  else {
  document.getElementsByClassName("active")[0].classList.remove("active");
   document.body.style.overflow = "scroll";}
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