//Version 4.2
// 4.0 - Search + Auto Download Page 
// 4.1 - Add Book Submit Form Link
// 4.2 - Download Page for Non GDrive link

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
    at = encodeURIComponent(obj.at).toLowerCase()
    ;
    if (h2.includes(input) || bn.includes(input) || at.includes(input)) {
      createBook(obj, i)
    }
  }
}

yrChild  =`
<h2>You may also See :</h2><div class="yB"><a class="yLink" href="https://spdfedu.blogspot.com/2021/10/1st-Year.html">1st Year MBBS Study Materials</a></div><div class="yB"><a class="yLink" href="https://spdfedu.blogspot.com/2021/10/2nd-Year.html">2nd Year MBBS Study Materials</a></div><div class="yB"><a class="yLink" href="https://spdfedu.blogspot.com/2021/10/3rd-Year.html">3rd Year MBBS Study Materials</a></div><div class="yB"><a class="yLink" href="https://spdfedu.blogspot.com/2021/10/Final-Year.html">Final Year MBBS Study Materials</a></div>`;
document.getElementById('moreBooks').insertAdjacentHTML('afterend',yrChild)

var xurl =window.location.href.split("?m=1")[0]
var url ='Main Website --> bit.ly/spdfEdu'
document.getElementById('box').insertAdjacentHTML('afterend',
`<br><div id="share-box"><div id="head-share">Do Share with your friends</div><div id="box"><div class="item"><div class="button wp" onclick="location.href='whatsapp://send?text=*'+document.title+'*%0A_'+xurl+'_%0A%0A'+url;" href=''><i class="wpsvg ssvg"></i></div></div><div class="item"><div class="button sms" onclick="location.href='sms:?body='+document.title+'%0A'+xurl+'%0A%0A'+url" href=''><i class="smssvg ssvg"></i></div></div><div class="item"><div class="button cpy" id="copyButton"><i class="copysvg ssvg"></i></div></div><div class="item"><div class="button mail" onclick="location.href='mailto:?subject='+document.title+'&body=Content%20Url:%20'+xurl+'%0A%0A'+url;" href=''><i class="mailsvg ssvg"></i></div></div><div class="item"><div class="button shr" onclick="share()"><i class="shrsvg ssvg"></i></div></div></div></div>`);

function share() {
   if (navigator.share) {
       navigator.share({
       text: document.title+"\n"
             +xurl+"\n\n"+url})}
   else {
     window.open('whatsapp://send?text=*'+document.title+'*%0A_'+xurl+'_%0A%0A'+url)}
}
        
  var Text = document.createElement('div');
  Text.id = 'copyTry';
  Text.innerHTML = document.title +'<br>' +xurl+'<br><br>'+url;
  document.getElementById('share-box').append(Text);
  var copyBtn = document.getElementById('copyButton');
copyBtn.addEventListener('click', function(event) {  
  var text = document.getElementById('copyTry');
  var range = document.createRange();  
  range.selectNode(text);  
  window.getSelection().addRange(range);
  try {  
    var successful = document.execCommand('copy');}
    catch(err){console.log('Oops, unable to copy')}  
  window.getSelection().removeAllRanges();
})
