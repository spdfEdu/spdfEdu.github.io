// Version 5.0
// 5.0 - Removed Extra Items
//     - Book Available List Fixed

const spdfEdu= "spdfEdu";
var addBook = {h2:"Add Books of ",bn:`You can now add any ${Sub} book pdf easily here <br>Submit the book details and download link here`, olk:"/p/medbooks-collection-form.html", ds:"You may also provide updated or latest edition link"};
all.unshift(addBook);
all.forEach(createBook);

function createBook(ele, i) {
  ele.sub = sub;
  ele.Sub = Sub;
  var
    hName = ele.h2 || ele.at,
    ed = ele.ed,
    sz = ele.sz + "MB",
   isrc = `https://spdfedu.github.io/medBooks/${sub}/sm/${ele.ilk}`,
   // isrc = "/assets/default-cover.webp",
    atstyle = `style = "display: ${(!ele.at)? 'none' : 'block'}"`,
    edstyle = `style = "display: ${(!ed)? 'none' : 'inline-block'}"`,
    szstyle = `style = "display: ${(!ele.sz)? 'none' : 'inline-block'}"`,
    child = document.createElement("div"),
    list = document.createElement("li"),
    dstxt2 = `${hName} ${Sub} Book Pdf Download<br><br>`,
    dstxt = ele.ds + "<br>" + dstxt2
    ;
    if (ele.olk) {
      a = ele.olk
      b = "spdfedu.blogspot.com"
      urlCheck = `href='${a}'`
      if(a.includes("https://")) {
        downloadBook(i)}
   }
    if (!ele.olk) {
      downloadBook(i)
    }
  
  if (!ele.ds) {
    dstxt = dstxt2
  }
  if (ele.ilk =="____" || !ele.ilk ) {
  isrc = "https://lh3.googleusercontent.com/d/" + ele.glk +"=s220?authuser=2"
 }
  
  child.id = "book"+i
  child.className = "box-book";
  child.innerHTML =`
<div class="box-flex">
  <div class="box-lt">
    <a class="book-link" ${urlCheck}><img class="cover" loading="lazy" src="${isrc}" alt="${ele.bn} ${hName} ${sub} Pdf" onerror="this.src='https://spdfedu.github.io/medBooks/default-cover.webp'"/>
    </a>
  </div>
  <div class="box-rt">
    <h2><a class="book-link" ${urlCheck}>${hName} ${Sub} Pdf</a></h2>
    <p class="name-detail">${ele.bn}</p>
    <p class="title-author book-info" ${atstyle}>Book by ${(ele.at)}</p>
    <p class="book-info">
   <span class="info-label ed-label" ${edstyle}> Edition</span>
   <span class="info-data edition-data" ${edstyle}>${ed}</span>
   <span class="info-label sz-label" ${szstyle}> Size</span> <span class="info-data size-data" ${szstyle}>${sz}</span>
    </p>
 </div>
</div>
<p class="desc">${dstxt}</p>
`
document.getElementById("bs").append(child);

if (!ed) {ed = "latest"}
  list.innerHTML = `${hName} ${ele.bn} ${ed} edition  pdf download direct link`
  document.getElementById("helpBrowser").append(list);
}

function downloadBook(index) {
  give = all[index]
  give = JSON.stringify(give)
  urlCheck = "href='/p/book-download-server.html?m=1" +spdfEdu+easyForward(give)+"'";
  }

function easyForward(send) {
  return CryptoJS.AES.encrypt(send, spdfEdu).toString();
}

bs = document.querySelector('#bs')
bs.insertAdjacentHTML("beforeBegin", `<input id="searchbar" onkeyup="searchBook()" type="text" name="search" placeholder="Search ${Sub} Books">`);

function searchBook() {
  let input = document.getElementById('searchbar').value
  input = encodeURIComponent(input).toLowerCase();
  bs.innerHTML = ""
  for (i = 0; i < all.length; i++) {
    let obj = all[i],
    h2 = encodeURIComponent(obj.h2).toLowerCase(),
    bn = encodeURIComponent(obj.bn).toLowerCase(),
    at = encodeURIComponent(obj.at).toLowerCase();
    list = document.getElementById("helpBrowser")
    listLength= list.childElementCount
    if (h2.includes(input) || bn.includes(input) || at.includes(input)) {
      createBook(obj, i)
    }
    while (list.children.length > listLength) {
    list.removeChild(list.lastChild);
    }
  }
}
