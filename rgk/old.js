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
     href=''><i class="svg svgCall"></i></div>
    <div class="wp" onclick="location.href='https://wa.me/91${ele.Phone}'"
     href=''><i class="svg svgWp"></i></div>
    <div class="share" onclick="share('${ele.Name}','${ele.Phone}')" >
     <i class="svg svgShare"></i></div>
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
     window.open('https://wa.me/?text=*Batch'+yr+'*%0A'+a+'%0A'+b+'%0A'+c+'%0A--%3E%20bit.ly/maniktala')
   }
 }
