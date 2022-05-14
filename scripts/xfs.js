var  prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("head-box").style.top = "0";
  } else {
    if (currentScrollPos > 150) {
    document.getElementById("head-box").style.top = "-50px";}}
 prevScrollpos = currentScrollPos;}

var child = document.createElement("div");
child.innerHTML =`
<div id="boxFooter"><div id="copyright"><hr><p id="copyrightHead"><b> DMCA Disclaimer </b></p> We are not hosting any copyrighted contents on our servers, it’s a catalog of links that already found on the internet. Check out our <div id="DMCA" onclick="location.href='https://spdfedu.blogspot.com/p/dcma.html'">DMCA Policy</div>.<b> If you feel that we have violated your copyrights, then please <div id="contact" onclick="location.href='mailto:eduspdf@gmail.com?subject=spdfEdu%20Website%20Queries&body=Name%20%3A%20%0D%0AWebsite%20%3A%20%0D%0AEmail%20Id%20%3A%20%0D%0AContact%20No.%20%3A%20%0D%0A%0D%0AMessage%20%3A%20'">contact us</div> immediately, concerned content will be taken down within 24 hours.</b><br><br></div><div id="boxFoot"><div class="foot" onclick="location.href='mailto:eduspdf@gmail.com?subject=spdfEdu%20Website%20Queries&body=Name%20%3A%20%0D%0AWebsite%20%3A%20%0D%0AEmail%20Id%20%3A%20%0D%0AContact%20No.%20%3A%20%0D%0A%0D%0AMessage%20%3A%20'"> Contact Us </div> | <div class="foot" onclick="location.href='https://spdfedu.blogspot.com/'"> Home </div> | <div class="foot" onclick="location.href='https://spdfedu.blogspot.com/p/dcma.html'"> DCMA Policy </div></div><div id="copySpdfedu"> Copyright &#169; 2021 spdfEdu</div><div class="half-hr"></div></div>`;
document.body.append(child);

var xurl = 'https://bit.ly/ncert-bengali'
var url = 'Main Website --> bit.ly/spdfEdu';

// shareBox
var url ='Main Website --> bit.ly/spdfEdu'
var hfs = document.createElement("div");
hfs.innerHTML =`
<br><br>
<div id="share-box"><div id="head-share">Do Share with your friends</div><div id="box"><div class="item"><div class="button wp" onclick="location.href='whatsapp://send?text=*'+document.title+'*%0A_'+xurl+'_%0A%0A'+url;" href=''><i class="wpsvg ssvg"></i></div></div><div class="item"><div class="button sms" onclick="location.href='sms://?body='+document.title+'%0A'+xurl+'%0A%0A'+url" href=''><i class="smssvg ssvg"></i></div></div><div class="item"><div class="button cpy" id="copyButton"><i class="copysvg ssvg"></i></div></div><div class="item"><div class="button mail" onclick="location.href='mailto:?subject='+document.title+'&body=Content%20Url:%20'+xurl+'%0A%0A'+url;" href=''><i class="mailsvg ssvg"></i></div></div><div class="item"><div class="button shr" onclick="share()"><i class="shrsvg ssvg"></i></div></div></div>
  </div>
  
  <div id="teleBox"><div id="tele" onclick="location.href='https://t.me/ncert_bengali'">Connect with us on Telegram&nbsp;&nbsp;<i class="teleSvg"></i></div></div>
  
<div id="moreBooks">
<h3 id="head-Books">You may also view:</h3>
<div class="box-Books" onclick="location.href='https://bit.ly/tintinComics'"><img class="cover-Books" loading="lazy" src="https://spdfedu.github.io/image/tintin/sm-tintin.webp" alt="Tintin | spdfEdu"><div class="details-Books"><h3>Tintin Comics Series</h3><p>Get complete Tintin Comics series in both English and Bengali version.</p></div></div>
<div class="box-Books" onclick="location.href='https://bit.ly/ncert-bengali'"><img class="cover-Books" src="https://spdfedu.github.io/image/cover/ncert-bengali-sm.webp" alt="NCERT Books in Bengali | spdfEdu"><div class="details-Books"><div class="head-box-Books">NCERT in Bengali</div>All NCERT Books PDF in Bengali are available here. <br>From Class I to XII.</div></div>
<div class="box-Books" onclick="location.href='https://bit.ly/medBooks'"><img class="cover-Books" src="https://spdfedu.github.io/image/medBooks-sm.png" alt="medBooks | spdfEdu"><div class="details-Books"><div class="head-box-Books">All MBBS Books</div>All MBBS Books PDF are available here.<br>You can Download it for free.</div></div>
  </div>`
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
