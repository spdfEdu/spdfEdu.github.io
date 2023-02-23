//<![CDATA[
  
var ckToc = document.getElementById("post-toc")
if (ckToc){
  var toc = document.createElement("div")
  toc.className = "mbtTOC"
  toc.innerHTML ="<button onclick='mbtToggle()' id='mbtbtn'>Table of Contents</button><ol id='mbtTOC'></ol>"
  ckToc.append(toc)
  var mbtTOC=i=h2=gethead=0;
  
  selh2 = document.getElementById("Blog1") || document.body
  h2 = selh2.getElementsByTagName("h2")
  for (i=0;i<h2.length;i++){
  var tocLi = h2[i].textContent;
  h2[i].setAttribute("id", tocLi);
  mbtTOC = `<li><a href="#${tocLi}"> ${tocLi}</a></li>`;
  document.getElementById("mbtTOC").innerHTML += mbtTOC;}
  function mbtToggle() {
    var mbt = document.getElementById('mbtTOC');
    if (mbt.style.display ==='none'){
      mbt.style.display='block'}
    else {mbt.style.display='none'}
  }
}

if (document.querySelector(".coll-sec")){
  document.querySelectorAll(".coll-sec").forEach((hs) =>{
  var collIcon = document.createElement("i");
  collIcon.className = "icon-svg";     
(hs.querySelector("h3")||hs.querySelector("h2")).setAttribute("class","coll-head");
  hs.querySelector(".coll-head").prepend(collIcon)
  hs.querySelector("section").setAttribute("hidden","until-found");
  hs.querySelector("section").setAttribute("class","details");
  hs.classList.add("collapsed");
  hs.onbeforematch = () =>{
    hs.classList.remove("collapsed");
  };
  hs.querySelector(".coll-head").onclick = () =>{
    hs.classList.toggle("collapsed");
    const details = hs.querySelector(".details");
    if (hs.classList.contains("collapsed")){
      details.hidden = "until-found";
    } else{
      details.removeAttribute("hidden");
    }
  };
});
}
  
//]]>
