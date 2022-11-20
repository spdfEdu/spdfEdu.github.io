all.forEach(ele => {
var link = ele.olk || "https://drive.google.com/open?id="+ele.glk,
    hName = ele.h2 || ele.at,
    child = document.createElement("div"),
    isrc = "";
  if (ele.ilk =="____" || !ele.ilk ) {
   isrc = "https://lh3.googleusercontent.com/d/" + ele.glk +"=s220?authuser=2";
  }
  else {
    isrc = `https://spdfedu.github.io/medBooks/${sub}/sm/${ele.ilk}`;
  }
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
    <p class="title-author book-info" style="display: ${(!ele.at)? 'none' : 'inline-block'}">Author : ${(ele.at)}</p>
    <p style="display: ${(!ele.ds)? 'none' : 'block'}" class="desc">${ele.ds}<br><br></p>
    <p class="book-info">
   <span class="info-label ed-label"> Edition</span>
   <span class="info-data edition-data">${ele.ed}</span>
   <span class="info-label sz-label"> Size</span>
   <span class="info-data size-data">${ele.sz}MB</span>
    </p>
 </div>
</div>`
  document.getElementById("bs").append(child);
  
  var list = document.createElement("li")
  list.innerHTML = `${hName} ${ele.bn} ${ele.ed} edition  pdf download direct link`
  document.getElementById("helpBrowser").append(list);
});
