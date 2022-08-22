var  prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("head-box").style.top = "0";
  } else {
    if (currentScrollPos > 120) {
    document.getElementById("head-box").style.top = "-50px";}}
 prevScrollpos = currentScrollPos;}
{//footer section
var child = document.createElement("div");
child.innerHTML =
 `<div id="boxFooter"><div id="copyright"><hr><p id="copyrightHead"><b> DMCA Disclaimer </b></p> We are not hosting any copyrighted contents on our servers, it’s a catalog of links that already found on the internet. Check out our <div id="DMCA" onclick="location.href='/p/dcma.html'">DMCA Policy</div>.<b>If you feel that we have violated your copyrights, then please <div id="contact" onclick="location.href='/p/contact-us.html'">contact us</div> immediately, concerned content will be taken down within 24 hours.</b><br><br></div><div id="boxFoot"><div class="foot" onclick="location.href='/p/contact-us.html'"> Contact Us </div> | <div class="foot" onclick="location.href='/'"> Home </div> | <div class="foot" onclick="location.href='/p/dcma.html'"> DCMA Policy </div></div><div id="copySpdfedu"> Copyright &#169; 2021 spdfEdu</div><div class="half-hr"></div></div>`;
document.body.append(child);
}
// shareBox
var xurl = window.location.href.split("?m=1")[0]
var url ='Main Website --> bit.ly/spdfEdu'
var hfs = document.createElement("div");
hfs.innerHTML =`
<br><br><div id="share-box"><div id="head-share">Do Share with your friends</div><div id="box"><div class="item"><div class="button wp" onclick="location.href='whatsapp://send?text=*'+document.title+'*%0A_'+xurl+'_%0A%0A'+url;" href=''><i class="wpsvg ssvg"></i></div></div><div class="item"><div class="button sms" onclick="location.href='sms://?body='+document.title+'%0A'+xurl+'%0A%0A'+url" href=''><i class="smssvg ssvg"></i></div></div><div class="item"><div class="button cpy" id="copyButton"><i class="copysvg ssvg"></i></div></div><div class="item"><div class="button mail" onclick="location.href='mailto:?subject='+document.title+'&body=Content%20Url:%20'+xurl+'%0A%0A'+url;" href=''><i class="mailsvg ssvg"></i></div></div><div class="item"><div class="button shr" onclick="share()"><i class="shrsvg ssvg"></i></div></div></div></div><br><br>
  
<div id="teleBox"><div id="tele" onclick="location.href='https://t.me/tintinPDFs'">Connect with us on Telegram&nbsp;&nbsp;<i class="teleSvg"></i></div></div><br><br>

<div id="moreBooks"><h3 id="head-Books">You may also view:</h3>
 <div class="box-Books" onclick="location.href='/2021/06/ncert-in-bengali.html'"><img class="cover-Books" loading="lazy" src="https://spdfedu.github.io/image/cover/ncert-bengali-sm.webp" alt="NCERT Books in Bengali | spdfEdu"><div class="details-Books"><div class="head-box-Books">NCERT in Bengali</div>All NCERT Books PDF in Bengali are available here.<br />From Class I to XII.</div></div>
<div class="box-Books" onclick="location.href='https://bit.ly/medBooks'"><img class="cover-Books" loading="lazy" src="https://spdfedu.github.io/image/medBooks-sm.png" alt="medBooks | spdfEdu"><div class="details-Books"><div class="head-box-Books">All MBBS Books</div>All MBBS Books PDF are available here.<br />You can Download it for free.</div></div></div>`
var insert = document.getElementById("insert")
insert.insertBefore(hfs, insert.firstChild);
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
});
var x;
if (window.innerWidth > 500){x=6}
else {x=4}
var swiper = new Swiper('.mySwiper', {
      slidesPerView:x,
      spaceBetween:10,
      loop:true,
      autoplay:{
        delay:1000,
        disableOnInteraction:false,
      },
      pagination:{
        el:'.swiper-pagination',
        dynamicBullets:true,
      },
      centeredSlides:true,
    });