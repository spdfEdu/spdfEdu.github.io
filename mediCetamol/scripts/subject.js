all.forEach(ele => {
var link = ele.olk || "https://drive.google.com/open?id="+ele.glk,
    hName = ele.h2 || ele.at,
    ed = ele.ed,
    sz = ele.sz + "MB",
    isrc = ele.ilk,
    atstyle = `style = "display: ${(!ele.at)? 'none' : 'block'}"`,
    dsstyle = `style = "display: ${(!ele.ds)? 'none' : 'block'}"`,
    edstyle = `style = "display: ${(!ed)? 'none' : 'inline-block'}"`,
    szstyle = `style = "display: ${(!ele.sz)? 'none' : 'inline-block'}"`,
    child = document.createElement("div"),
    list = document.createElement("li");
  
  if (isrc =="____" || !isrc ) {
    isrc = "https://lh3.googleusercontent.com/d/" + ele.glk +"=s220?authuser=2"}
  else {
    isrc = `https://spdfedu.github.io/medBooks/${sub}/sm/${isrc}`}
  
  child.className = "box-book";
  child.innerHTML =`
<div class="box-flex">
  <div class="box-lt">
    <a class="book-link" href="${link}"><img class="cover" loading="lazy" src="${isrc}" alt="${ele.bn} ${hName} ${sub} Pdf" onerror="this.src='https://spdfedu.github.io/mediCetamol/images/default-cover.webp'"/>
    </a>
  </div>
  <div class="box-rt">
     <h2><a class="book-link" href="${link}">${hName} ${Sub} Pdf</a></h2>
    <p class="name-detail">${ele.bn}</p>
    <p class="title-author book-info" ${atstyle}>Author : ${(ele.at)}</p>
    <p ${dsstyle} class="desc">${ele.ds}<br><br></p>
    <p class="book-info">
   <span class="info-label ed-label" ${edstyle}> Edition</span>
   <span class="info-data edition-data" ${edstyle}>${ed}</span>
   <span class="info-label sz-label" ${szstyle}> Size</span><span class="info-data size-data" ${szstyle}> ${sz}</span>
    </p>
 </div>
</div>`
  document.getElementById("bs").append(child);
  
  if (!ed) {ed = "latest"}
  list.innerHTML = `${hName} ${ele.bn} ${ed} edition  pdf download direct link`
  document.getElementById("helpBrowser").append(list);
});
