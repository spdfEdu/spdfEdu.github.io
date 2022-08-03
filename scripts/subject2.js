all.forEach(ele => {
var child = document.createElement("div");
  child.className = "book-shelf";
  child.innerHTML =`
  <div class="box-book">
   <a class="book-link">
    <div class="box-flex">
      <div class="box-lt"><img class="cover" loading="lazy" src="https://spdfedu.github.io/medBooks/${sub}/sm/${ele.ilk}" alt="${ele.bn} ${(ele.h2) || (ele.at)} Pdf" onerror="this.className='book-cover'"/></div>
      <div class="box-rt">
      <h2>${(ele.h2) || (ele.at)}</h2>
    <p class="name-detail">${ele.bn}</p>
    <p class="title-author book-info" style="display: ${(!ele.at)? 'none' : 'inline-block'}">Author : ${(ele.at)}</p>
    <p style="display: ${(!ele.ds)? 'none' : 'block'}" class="desc">${ele.ds}<br><br></p>
    <p class="book-info">
   <span class="ed-label"> Edition</span>
   <span class="edition-data">${ele.ed}</span>
   <span class="sz-label"> Size</span>
   <span class="size-data">${ele.sz}MB</span>
  </p></div></div></a></div>`
  document.getElementById("bs").append(child);
  
 var tblbody = document.createElement("tr")
 tblbody.innerHTML = `<td>${ele.bn}</td><td>${(ele.at)||(ele.h2)}</td><td>${ele.ed}</td>`
  document.getElementById("bookTable").append(tblbody);
  
  var list = document.createElement("li")
  list.innerHTML = `${(ele.at)||(ele.h2)} ${ele.bn} ${ele.ed} edition  pdf download direct link`
  document.getElementById("helpBrowser").append(list);
});
for (i=0;i<all.length;i++) {
 var alink = document.getElementsByClassName("book-link")[i];
  if (all[i].glk) {
  alink.href = "https://drive.google.com/open?id=" + all[i].glk};
  if (all[i].blk) {
  alink.href = "/" + all[i].blk};
  if (all[i].olk) {
  alink.href =   all[i].olk};
}

var  prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("head-box").style.top = "0";
  } else {
    if (currentScrollPos > 120) {
    document.getElementById("head-box").style.top = "-50px";
    }}prevScrollpos = currentScrollPos}
//footer section

var child = document.createElement("div");
child.innerHTML =`
<div id="boxFooter"><div id="copyright"><hr><p id="copyrightHead"><b> DMCA Disclaimer </b></p> We are not hosting any copyrighted contents on our servers, it’s a catalog of links that already found on the internet. Check out our <div id="DMCA" onclick="location.href='/p/dcma.html'">DMCA Policy</div>.<b> If you feel that we have violated your copyrights, then please <div id="contact" onclick="location.href='mailto:eduspdf@gmail.com?subject=spdfEdu%20Website%20Queries&body=Name%20%3A%20%0D%0AWebsite%20%3A%20%0D%0AEmail%20Id%20%3A%20%0D%0AContact%20No.%20%3A%20%0D%0A%0D%0AMessage%20%3A%20'">contact us</div> immediately, concerned content will be taken down within 24 hours.</b><br><br></div><div id="boxFoot"><div class="foot" onclick="location.href='mailto:eduspdf@gmail.com?subject=spdfEdu%20Website%20Queries&body=Name%20%3A%20%0D%0AWebsite%20%3A%20%0D%0AEmail%20Id%20%3A%20%0D%0AContact%20No.%20%3A%20%0D%0A%0D%0AMessage%20%3A%20'"> Contact Us </div> | <div class="foot" onclick="location.href='https://spdfedu.blogspot.com/'"> Home </div> | <div class="foot" onclick="location.href='https://spdfedu.blogspot.com/p/dcma.html'"> DCMA Policy </div></div><div id="copySpdfedu"> Copyright &#169; 2021 spdfEdu</div><div class="half-hr"></div></div>`;
document.body.append(child);

//year section
var yrChild = document.createElement("div")
yrChild.innerHTML =`
<h2 id="moreBooksHeader">You may also See :</h2><div class="yB"><a class="yLink" href="https://spdfedu.blogspot.com/2021/10/1st-Year.html">&#9673; 1st Year MBBS Study Materials</a></div><div class="yB"><a class="yLink" href="https://spdfedu.blogspot.com/2021/10/2nd-Year.html">&#9673; 2nd Year MBBS Study Materials</a></div><div class="yB"><a class="yLink" href="https://spdfedu.blogspot.com/2021/10/3rd-Year.html">&#9673; 3rd Year MBBS Study Materials</a></div><div class="yB"><a class="yLink" href="https://spdfedu.blogspot.com/2021/10/Final-Year.html">&#9673; Final Year MBBS Study Materials</a></div>`;
document.getElementById("moreBooks").append(yrChild);

// shareBox
var xurl =window.location.href.split("?m=1")[0]
var url ='Main Website --> bit.ly/spdfEdu'
document.getElementById('box').insertAdjacentHTML('afterend',
`<br><div id="share-box"><div id="head-share">Do Share with your friends</div><div id="box"><div class="item"><div class="button wp" onclick="location.href='whatsapp://send?text=*'+document.title+'*%0A_'+xurl+'_%0A%0A'+url;" href=''><i class="wpsvg ssvg"></i></div></div><div class="item"><div class="button sms" onclick="location.href='sms://?body='+document.title+'%0A'+xurl+'%0A%0A'+url" href=''><i class="smssvg ssvg"></i></div></div><div class="item"><div class="button cpy" id="copyButton"><i class="copysvg ssvg"></i></div></div><div class="item"><div class="button mail" onclick="location.href='mailto:?subject='+document.title+'&body=Content%20Url:%20'+xurl+'%0A%0A'+url;" href=''><i class="mailsvg ssvg"></i></div></div><div class="item"><div class="button shr" onclick="share()"><i class="shrsvg ssvg"></i></div></div></div></div>`);

//share function
   function share() {
   if (navigator.share) {
       navigator.share({
       text: document.title+"\n"
             +xurl+"\n\n"+url})}
   else {
     window.open('whatsapp://send?text=*'+document.title+'*%0A_'+xurl+'_%0A%0A'+url)}}
        
//copy Button function  
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
