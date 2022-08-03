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
<div id="boxFooter"><div id="copyright"><hr><p id="copyrightHead"><b> DMCA Disclaimer </b></p> We are not hosting any copyrighted contents on our servers, it’s a catalog of links that already found on the internet. Check out our <div id="DMCA" onclick="location.href='/p/dcma.html'">DMCA Policy</div>.<b> If you feel that we have violated your copyrights, then please <div id="contact" onclick="location.href='/p/contact-us.html'">contact us</div> immediately, concerned content will be taken down within 24 hours.</b><br><br></div><div id="boxFoot"><div class="foot" onclick="location.href='/p/contact-us.html'"> Contact Us </div> | <div class="foot" onclick="location.href='/'"> Home </div> | <div class="foot" onclick="location.href='/p/dcma.html'"> DCMA Policy </div></div><div id="copySpdfedu"> Copyright &#169; 2021 spdfEdu</div><div class="half-hr"></div></div>`;
document.body.append(child);

var link = 'https://bit.ly/ncert-bengali'
var url = 'Main Website --> bit.ly/spdfEdu';

   function share() {
   if (navigator.share) {
       navigator.share({
       text: document.title+"\n"
             +link+"\n\n"+url})}
   else {
     window.open('whatsapp://send?text=*'+document.title+'*%0A_'+link+'_%0A%0A'+url)}}
        
  var Text = document.createElement('div');
  Text.id = 'copyTry';
  Text.innerHTML = document.title +'<br>' +link+'<br><br>'+url;
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