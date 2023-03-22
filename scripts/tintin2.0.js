// shareBox
var xurl = window.location.href.split("?m=1")[0]
var url ='Main Website --> bit.ly/spdfEdu'
var hfs = document.createElement("div");
hfs.innerHTML =`
<br><br><div id="share-box"><div id="head-share">Do Share with your friends</div><div id="box"><div class="item"><div class="button wp" onclick="location.href='whatsapp://send?text=*'+document.title+'*%0A_'+xurl+'_%0A%0A'+url;" href=''><i class="wpsvg ssvg"></i></div></div><div class="item"><div class="button sms" onclick="location.href='sms:?body='+document.title+'%0A'+xurl+'%0A%0A'+url" href=''><i class="smssvg ssvg"></i></div></div><div class="item"><div class="button cpy" id="copyButton"><i class="copysvg ssvg"></i></div></div><div class="item"><div class="button mail" onclick="location.href='mailto:?subject='+document.title+'&body=Content%20Url:%20'+xurl+'%0A%0A'+url;" href=''><i class="mailsvg ssvg"></i></div></div><div class="item"><div class="button shr" onclick="share()"><i class="shrsvg ssvg"></i></div></div></div></div><br><br>
  
<div id="teleBox"><div id="tele" onclick="location.href='https://t.me/tintinPDFs'">Connect with us on Telegram&nbsp;&nbsp;<i class="teleSvg"></i></div></div><br><br>
`
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
