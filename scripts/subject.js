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
<div id="boxFooter"><div id="copyright"><hr><p id="copyrightHead"><b> DMCA Disclaimer </b></p> We are not hosting any copyrighted contents on our servers, it’s a catalog of links that already found on the internet. Check out our <div id="DMCA" onclick="location.href='/p/dcma.html'">DMCA Policy</div>.<b> If you feel that we have violated your copyrights, then please <div id="contact" onclick="location.href='/p/contact-us.html'">contact us</div> immediately, concerned content will be taken down within 24 hours.</b><br><br></div><div id="boxFoot"><div class="foot" onclick="location.href='/p/contact-us.html'"> Contact Us </div> | <div class="foot" onclick="location.href='/'"> Home </div> | <div class="foot" onclick="location.href='/p/dcma.html'"> DCMA Policy </div></div><div id="copySpdfedu"> Copyright &#169; 2021 spdfEdu</div><div class="half-hr"></div></div>`;
document.body.append(child);

//year section
yrSection = document.getElementById("moreBooks")
var yrChild = document.createElement("div")
yrChild.innerHTML =`
<h2 id="moreBooksHeader">You may also See :</h2><div class="yB"><a class="yLink" href="/2021/10/1st-Year.html">&#9673; 1st Year MBBS Study Materials</a></div><div class="yB"><a class="yLink" href="/2021/10/2nd-Year.html">&#9673; 2nd Year MBBS Study Materials</a></div><div class="yB"><a class="yLink" href="/2021/10/3rd-Year.html">&#9673; 3rd Year MBBS Study Materials</a></div><div class="yB"><a class="yLink" href="/2021/10/Final-Year.html">&#9673; Final Year MBBS Study Materials</a></div>`;
yrSection.append(yrChild);

// shareBox
var insert =document.getElementById('box')
var xurl =window.location.href.split("?m=1")[0]
var url ='Main Website --> bit.ly/spdfEdu'
insert.insertAdjacentHTML('afterend',
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
let tatext = ""
let tbltext = ""
var cta = document.getElementsByClassName("title-author");
for (i=0;i<cta.length;i++) {
  tatext += "<li>"+cta[i].textContent+ document.getElementsByClassName("name-detail")[i].textContent+ document.getElementsByClassName("edition-data")[i].textContent +" edition  pdf download direct link</li>";
  tbltext += "<tr><td>"+ document.getElementsByClassName("name-detail")[i].textContent+"</td><td>"+cta[i].textContent +"</td><td>"+ document.getElementsByClassName("edition-data")[i].textContent +"</td></tr>";
}
document.getElementById("helpBrowser"). innerHTML = tatext;
document.getElementById("bookTable"). innerHTML = tbltext;
//replacing error image
for( i=0; i<22; i++){
 document.getElementsByClassName("cover")[i].setAttribute("onerror","this.className ='book-cover'");}
