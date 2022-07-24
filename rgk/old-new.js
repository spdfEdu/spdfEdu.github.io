document.title = `2k${[yr]} Maniktala`
var upper = document.createElement("div");
upper.innerHTML =
 `<h1 id="head-main">BATCH 20${[yr]}</h1>
  <p id="candidate">Total No of Students is ${all.length}</p>`
document.getElementById("upper").append(upper);

  //creating the structure
var main = document.getElementById("mainContainer");
  all.forEach(ele => {
var child = document.createElement("div");
  child.className = "container";
  child.innerHTML =
 `<div class="item">
    <div class="naming">${ele.Name}</div>
    <div class="call"
     onclick="location.href='tel:+91${ele.Phone}'"
     href='' style="visibility: ${(!ele.Phone)? 'hidden' : 'visible'}"><i class="svgCall"></i></div>
    <div class="wp" onclick="location.href='whatsapp://send?phone=91${ele.Phone}'"
     href='' style="visibility: ${(!ele.Phone)? 'hidden' : 'visible'}"><i class="svgWp"></i></div>
  </div>


  <div class="content">
  <div class="details">
    <div class="contact">
  <div class="gap"></div>
  <div class="fb" style="visibility: ${(!ele.fb)? 'hidden' : 'visible'}" onclick="window.open('https://facebook.com/${ele.fb}','_blank')" href=''><i class="svg svgFb"></i>
  </div>
  <div class="insta" style="visibility: ${(!ele.insta)? 'hidden' : 'visible'}" onclick="window.open('https://instagram.com/${ele.insta}','_blank')" href=''><i class="svg svgInsta"></i>
  </div>
  <div class="share" onclick="share('${ele.Name}','${ele.Phone}','${ele.Phone2}')"><i class="svg svgShare"></i>
  </div></div>
<div class="contact phn" style="display: ${(!ele.Phone)? 'none' : 'flex'}"><div class="phnHead">Phone No. : </div>
 <div class="phnNo">${ele.Phone}</div>
 <div class="ccall" onclick = "location.href='tel:+91${ele.Phone}'" href=''> 
  <i class="svg svgCall"></i></div>
  <div class="cwp" onclick="location.href='https://wa.me/91${ele.Phone}'" href=''><i class="svg svgWp"></i></div></div>
<div class="contact phn" style="display: ${(!ele.Phone2)? 'none' : 'flex'}">
    <div class="phnHead"></div>
    <div class="phnNo2">${ele.Phone2}</div>
    <div class="ccall" onclick = "location.href='tel:+91${ele.Phone2}'" href=''><i class="svg svgCall"></i></div>
    <div class="cwp" onclick="location.href='https://wa.me/91${ele.Phone2}'" href=''><i class="svg svgWp"></i></div></div>
<div class="contact" style="display: ${(!ele.EmailId)? 'none' : 'flex'}">
   <div class="mailHead">Mail : </div>
  <div class="emailid">${ele.EmailId}</div>
  <div class="mail" onclick="location.href='mailto:${ele.EmailId}'" href=''><i class="svg svgMail"></i></div>
   </div><br>
<div class="info" style="display: ${(!ele.DOB)?'none':'block'}">
<div class="qes">D. O. B. : </div>
<div class="ans">${ele.DOB}</div></div>
<div class="info" style="display: ${(!ele.Address)?'none':'block'}">
<div class="qes">Address : </div>
<div class="ans">${ele.Address}</div></div>
<div class="info" style="display: ${(!ele.Hobby)?'none':'block'}">
<div class="qes">Hobby : </div>
<div class="ans">${ele.Hobby}</div></div>
<div class="info" style="display: ${(!ele.HS)?'none':'block'}">
<div class="qes">HS Institution : </div>
<div class="ans">${ele.HS}</div>
    </div></div>
  </div>`
  main.append(child);
});

//share function
 function share(a,b) {
 if (navigator.share) {
       navigator.share({
       title: 'MANIKTALA',
       text: '*Batch 2k'+yr+'*\n'+a+'\n'+b+'\n--> bit.ly/maniktala',
       })}
   else {
     window.open('whatsapp://send?text=*Batch 2k'+yr+'*%0A'+a+'%0A'+b+'%0A--%3E%20bit.ly/maniktala')
   }
 }
var coll = document.getElementsByClassName("naming");
var i;
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.parentNode.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
