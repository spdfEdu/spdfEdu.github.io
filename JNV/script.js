const estb = [2003];
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

document.title = `${[x+7]} JNV MSD`;
window.history.replaceState('','',`/${x+7}`);
var upper = document.createElement("div");
upper.innerHTML =
 `<h1 id="head-main">BATCH ${batch}</h1>
  <p class="summary">
  Year of Xii Passout : ${xii} <br><br>
  Total No of Students is ${all.length}
  <br><br>
  Data Collected on ${[date]}</p>`;
document.getElementById("upper").append(upper);

  //creating the structure
var main = document.getElementById("mainContainer");
  all.forEach(ele => {
var child = document.createElement("div");
  child.className = "vessel";
  child.innerHTML =
 `<a class="nameBox">
    <div class="pp">
      <img class="svgP svgPP">
      <img class="coverPP" src="https://spdfedu.github.io/JNV/images/${[x+7]}/${ele.Name.replace(/ /gi,'_')}.jpg" onerror="this.className='svgP svgPP'" alt="" />
    </div>
    <div class="naming">${ele.Name}</div>
  </a>

  <div class="contentBox ${ele.House}">
  <a class="nameBox2">
    <div class="naming2">${ele.Name}</div>
    <div class="back">&#8249;</div>
  </a>
  <div class="head-cover">
  <img class="svgP">
  <a href="https://lh3.googleusercontent.com/d/${ele.ppl}" target="_blank"><img class="coverP" loading="lazy" src="https://spdfedu.github.io/JNV/images/${[x+7]}/${ele.Name.replace(/ /gi,'_')}.jpg" onerror="this.parentNode.parentNode.style.display='none'"></a></div>
  
  <div class="details">
    <div class="contact">
  <div class="gap"></div>
  <div class="fb" style="visibility: ${(!ele.fb)? 'hidden' : 'visible'}" onclick="window.open('https://facebook.com/${ele.fb}','_blank')" href=''><i class="svg svgFb"></i>
  </div>
  <div class="insta" style="visibility: ${(!ele.insta)? 'hidden' : 'visible'}" onclick="window.open('https://instagram.com/${ele.insta}','_blank')" href=''><i class="svg svgInsta"></i>
  </div>
  <div class="share" onclick="share('${ele.Name}','${ele.Phone}')"><i class="svg svgShare"></i>
  </div></div>
  
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
  </div>`;
  main.append(child);
});

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

var coll = document.getElementsByClassName("nameBox");
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
   this.nextElementSibling.classList.add("active");
   document.body.style.overflow = "hidden";
   window.history.pushState('', this.children[1].textContent, window.location.href+"/user/"+this.children[1].textContent.replace(/ /gi,'_'));
  });
}
var coll2 = document.getElementsByClassName("nameBox2");
for (i = 0; i < coll2.length; i++) {
  coll2[i].addEventListener("click", function() {
   this.parentNode.classList.remove("active");
   document.body.style.overflow = "scroll";
   window.history.back();
   });
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
      <img class="coverb" src="https://spdfedu.github.io/JNV/images/cover/${i}.jpg" alt="Batch ${i}">
      <div class="form-link">Batch 
      ${i-y-6}${nth(i-y-6)} (${i-7} - ${i}) 
      </div>
    </a>`;
document.getElementById("other").append(batches);
}

document.getElementById("down").innerHTML = "<h2>Check Out Other Batches: </h2><p>Current Passout Batch : " +year +
"<br> Established Year : " + [estb] +
"<br> Total Batches : " +[year -[estb] -6]+"</p>";