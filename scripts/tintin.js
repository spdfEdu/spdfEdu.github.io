//header section
var header = document.createElement("div");
header.innerHTML =
 `<div id="head-box">
  <div id="head" onclick="location.href='http://bit.ly/spdfEdu'"><span style="color:red">spdf</span><span style="color:blue">Edu</span></div>
  </div><br><br>`
document.body.insertBefore(header, document.body.firstChild);
 
//footer section
var child = document.createElement("div");
child.innerHTML =
 `<div id="boxFooter">
<div id="copyright"><hr>
<p id="copyrightHead">
    <b> DMCA Disclaimer </b></p> We are not hosting any copyrighted contents on our servers, it’s a catalog of links that already found on the internet. Check out our 
<div id="DMCA" onclick="location.href='https://spdfedu.blogspot.com/p/dcma.html'">DMCA Policy</div>.<b>If you feel that we have violated your copyrights, then please 
<div id="contact" onclick="location.href='mailto:eduspdf@gmail.com?subject=spdfEdu%20Website%20Queries&body=Name%20%3A%20%0D%0AWebsite%20%3A%20%0D%0AEmail%20Id%20%3A%20%0D%0AContact%20No.%20%3A%20%0D%0A%0D%0AMessage%20%3A%20'">contact us</div>
immediately, concerned content will be taken down within 24 hours.</b><br><br></div>
  <div id="boxFoot">
  <div class="foot" onclick="location.href='mailto:eduspdf@gmail.com?subject=spdfEdu%20Website%20Queries&body=Name%20%3A%20%0D%0AWebsite%20%3A%20%0D%0AEmail%20Id%20%3A%20%0D%0AContact%20No.%20%3A%20%0D%0A%0D%0AMessage%20%3A%20'">
    Contact Us </div> |
  <div class="foot" onclick="location.href='https://spdfedu.blogspot.com/'">
   Home </div> |
  <div class="foot" onclick="location.href='https://spdfedu.blogspot.com/p/dcma.html'"> DCMA Policy
  </div></div>
  <div id="copySpdfedu">
    Copyright &#169; 2021 spdfEdu
  </div><div class="half-hr"></div>
</div>`;
document.body.append(child);

// shareBox
var xurl = 'https://bit.ly/tintinComics';
var url ='Main Website --> bit.ly/spdfEdu';
var hfs = document.createElement("div");
hfs.innerHTML = 
`<br><br>
<div id="share-box">
    <div id="head-share">
      Do Share with your friends
    </div><div id="box">
       <div class="item">
<div class="button wp" onclick="location.href='whatsapp://send?text=*'+document.title+'*%0A_'+xurl+'_%0A%0A'+url;" href=''>
<svg class="shareButtonsSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
  </div></div>
       <div class="item">
  <div class="button sms" onclick="location.href='sms://?body='+document.title+'%0A'+xurl+'%0A%0A'+url" href=''>
<svg class="shareButtonsSvg" xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 48 48">
<g transform="translate(0,48) scale(0.05,-0.05)" fill="#000" stroke="none">
<path d="M100 860 c-19 -19 -20 -33 -20 -402 l0 -383 83 83 82 82 298 0 c284
0 298 1 317 20 19 19 20 33 20 298 0 278 0 279 -23 300 -23 22 -28 22 -380 22
-344 0 -358 -1 -377 -20z m700 -300 l0 -240 -302 0 c-266 0 -304 -2 -320 -17
-17 -16 -18 -7 -18 240 l0 257 320 0 320 0 0 -240z"/></g></svg>
  </div></div>
       <div class="item">
<div class="button cpy" id="copyButton">
<svg class="shareButtonsSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" > 
<path d="M0 0h24v24H0z" fill="none"/>
<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"/></svg>
  </div></div>
       <div class="item">
<div class="button mail" onclick="location.href='mailto:?subject='+document.title+'&body=Content%20Url:%20'+xurl+'%0A%0A'+url;" href=''>
<svg class="shareButtonsSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 44 12 C 44 9.800781 42.199219 8 40 8 L 8 8 C 5.800781 8 4 9.800781 4 12 L 4 36 C 4 38.199219 5.800781 40 8 40 L 40 40 C 42.199219 40 44 38.199219 44 36 Z M 40 12 L 24 21.980469 L 8 12 Z M 40 36 L 8 36 L 8 16 L 24 26 L 40 16 Z M 40 36"/>
</svg>
  </div></div>
       <div class="item">
 <div class="button shr" onclick="share()">
 <svg class="shareButtonsSvg" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24">
<path d="M0 0h24v24H0z" fill="none"/>
<path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
</div></div></div>
  <style>
#share-box {
  width: 96%;
  height: auto;
  border: 1px dotted #a7e0da;
  background-color: #f5f7f1;
  border-radius: 5px;
  display: block;
  margin: auto;
}
#head-share {
  position: relative;
  top: 10px;
  text-align: center;
  font-family: sans-serif;
  color: #000;
  text-shadow: none;
  font-weight: normal;
  font-size: 18px;
}
#share-box #box {
  display: flex;
  padding: 30px 0;
}
#box .item {
  flex: 1;
  text-align: center;
  padding: 5px;
}
#share-box #box .item .button {
  border: 1px solid #e4e4e4;
  border-radius: 10px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  box-shadow: 2px 2px 7px 1px #c5c5c5;
}
#share-box #box .item .button:hover {
  box-shadow: none;
}
.shareButtonsSvg {
  width: 42px;
  height: 42px;
}
.wp {background-color: #a6e09f}
.sms {background-color: #9fdee0}
.cpy {background-color: #e0cd9f}
.mail {background-color: #e44d4d}
.shr {background-color: #b19fe0}
#copyTry {
  opacity: 0;
  position: absolute;
  z-index: -5;
}
.yLink{
     font-family: 'Roboto', sans-serif;
     text-decoration-line: none;
     color: #426af4 !important;
     text-decoration-color: #426af4;
}
.yLink:hover{
     text-decoration-line: underline;
     color: #000 !important;
     -webkit-tap-highlight-color: transparent;
}
.yLink {
  display: block;
  font-size: 18px;
  height: 30px;
  margin-left: 10px;
}
#teleBox {
  display: block;
  margin: auto;
  width: 80%;
  border-radius: 40px;
  border: 2px solid #0088cc;
  background-color: rgb(201,254,255);
  animation: myborder 1s linear infinite alternate;
}
@keyframes myborder {
  0%   {box-shadow: 3px 3px 7px 1px
    rgb(255,225,0) }
  12.5%  {box-shadow: 3px 3px 7px 1px
    rgb(255,200,0) }
  25%  {box-shadow: 3px 3px 7px 1px
    rgb(255,150,0) }
  37.5% {box-shadow: 3px 3px 7px 1px
    rgb(255,125,0) }
  50% {box-shadow: 3px 3px 7px 1px
    rgb(255,100,0) }
  62.5% {box-shadow: 3px 3px 7px 1px
    rgb(255,75,0) }
  75% {box-shadow: 3px 3px 7px 1px
    rgb(255,50,0) }
  87.5% {box-shadow: 3px 3px 7px 1px
    rgb(255,25,0) }
  100%   {box-shadow: 3px 3px 7px 1px
    rgb(255,0,0) }
}
#tele {
  font-weight: bold;
  color: #0088cc;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#teleBox:hover {
  background-color: rgb(201,252,255);
  animation: none;
  border: 2px solid rgb(0,101,151);
  box-shadow: 3px 3px 7px 1px
    rgb(195,201,202);
}
.teleSvg {height: 35px;
content:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' style='fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;' viewBox='0 0 24 24'%3E%3Cpath fill='%230088cc' d='M12,0c-6.626,0 -12,5.372 -12,12c0,6.627 5.374,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.628 -5.373,-12 -12,-12Zm3.224,17.871c0.188,0.133 0.43,0.166 0.646,0.085c0.215,-0.082 0.374,-0.267 0.422,-0.491c0.507,-2.382 1.737,-8.412 2.198,-10.578c0.035,-0.164 -0.023,-0.334 -0.151,-0.443c-0.129,-0.109 -0.307,-0.14 -0.465,-0.082c-2.446,0.906 -9.979,3.732 -13.058,4.871c-0.195,0.073 -0.322,0.26 -0.316,0.467c0.007,0.206 0.146,0.385 0.346,0.445c1.381,0.413 3.193,0.988 3.193,0.988c0,0 0.847,2.558 1.288,3.858c0.056,0.164 0.184,0.292 0.352,0.336c0.169,0.044 0.348,-0.002 0.474,-0.121c0.709,-0.669 1.805,-1.704 1.805,-1.704c0,0 2.084,1.527 3.266,2.369Zm-6.423,-5.062l0.98,3.231l0.218,-2.046c0,0 3.783,-3.413 5.941,-5.358c0.063,-0.057 0.071,-0.153 0.019,-0.22c-0.052,-0.067 -0.148,-0.083 -0.219,-0.037c-2.5,1.596 -6.939,4.43 -6.939,4.43Z'%3E%3C/path%3E%3C/svg%3E");
}
 #head-Books {
      text-align: left;
      font-weight: bold;
      font-size: 20px;
      font-family: 'Noto Sans JP';
  }
  .box-Books {
      border: 1px solid #c5c5c5;
      display: flex;
      padding: 5px;
      margin: 15px 0;
      font-size: 18px;
      border-top-left-radius: 20px;
      user-select: none;
      font-family: Sans-Serif;
      background-color: rgb(254,255,250);
}
.box-Books:hover {
      box-shadow: 1px 1px 7px 1px #55555588;
}
.cover-Books {
      flex: 1;
      width: 100px;
      height: auto;
      border: 0px;
}
.details-Books {
      flex: 2;
      margin-left: 15px;
      font-size: 16px;
}
.head-box-Books {
      font-size: 18px;
      font-weight: bold;
      line-height: 1.5;
}
 </style>
  </div><br><br>
  
    <div id="teleBox">
  <div id="tele" onclick="location.href='https://t.me/tintinPDFs'">
   Connect with us on Telegram&nbsp;&nbsp;
  <i class="teleSvg"></i></div></div>
  <br><br>

<div id="moreBooks">
    <h3 id="head-Books">
      You may also view:
    </h3><br>
   <div class="box-Books" onclick="location.href='https://bit.ly/ncert-bengali'">
      <img class="cover-Books" src="https://spdfedu.github.io/image/ncert-bengali.jpg" alt="NCERT Books in Bengali | spdfEdu" />
      <div class="details-Books">
        <div class="head-box-Books">
       NCERT in Bengali
      </div>
        All NCERT Books PDF in Bengali are available here. <br />
     From Class I to XII.
      </div>
    </div>
    <div class="box-Books" onclick="location.href='https://bit.ly/medBooks'">
      <img class="cover-Books" src="https://spdfedu.github.io/image/medBooks-sm.png" alt="medBooks [spdfEdu]" />
      <div class="details-Books">
        <div class="head-box-Books">
        All MBBS Books
      </div>
        All MBBS Books PDF are available here.<br />
     You can Download it for free.
      </div>
    </div><br>
  </div>

    <h3>Tintin Comics Series</h3>
    <h4>Serialwise according to publish year</h4>
    
  <p><a  href="https://bit.ly/tintinComics">bit.ly/tintinComics</a></p>
  <p onclick="location.href='https://bit.ly/tintinComics'">
  1.  In the Land of the Soviets
(Soviet Deshe Tintin / সোভিয়েত দেশে টিনটিন)<br>
2. Tintin in the Congo
(Congoy tintin / কঙ্গোয় টিনটিন)<br>
3. Tintin in America
(Americay tintin / আমেরিকার টিনটিন)<br>
4. Cigars of the Pharaoh
(Pharaoh Er Churut / ফারাওয়ের চুরুট) <br>
5. The Blue Lotus
(Nilkamal / নীলকমল) <br>
6. The Broken Ear
(Kanbhanga Murti / কানভাঙা মূর্তি)<br>
7. The Black Island
(Krishna Dwiper Rahasya / কৃষ্ণদ্বীপের রহস্য)<br>
8. King Ottokar's Sceptre
(Otokarer Rajdanda / ওটোকারের রাজদণ্ড)<br>
9. The Crab with the Golden Claws
(Kankra Rahasya / কাঁকরা রহস্য)<br>
10. The Shooting Star
(Ascharya ulka / আশ্চর্য উল্কা)<br>
11. The Secret of the Unicorn
(Bombete jahaj / বোম্বেটে জাহাজ)<br>
12. Red Rackham's Treasure
(Lal Bombeter Guptadhon / লাল বোম্বেটের গুপ্তধন)<br>
13. The Seven Crystal Balls
(Momir Abhishap / মমির অভিশাপ)<br>
14. Prisoners of the Sun
(Surjadeber Bondi / সুর্যদেবের বন্দি)<br>
15. Land of Black Gold
(Kalo Sonar Deshe / কালো সোনার দেশে)<br>
16. Destination Moon
(Chandraloke aviyan / চন্দ্রালোকে অভিযান)<br>
17. Explorers on the Moon
(Chande tintin / চাঁদে টিনটিন)<br>
18. The Calculus Affair
(Calculuser kando / ক্যালকুলাসের কাণ্ড)<br>
19. The Red Sea Sharks
(Lohit Sagarer Hangar / লোহিত সাগরের হাঙর)<br>
20. Tintin in Tibet
(Tibbate Tintin / তিব্বতে টিনটিন)<br>
21. The Castafiore Emerald
(Panna Kothai / পান্না কোথায়)<br>
22. Flight 714 to Sydney
(Flight 714 / ফ্লাইট 714)<br>
23. Tintin and the Picaros
(Biplabider dangale / বিপ্লবীদের দঙ্গলে)
<br>
24. Tintin and Alph-Art
(Barnashilpo rahasya / বর্ণ শিল্প রহস্য)<br>
25. Bhingroher Agantuk
(ভিনগ্রহের আগন্তুক)<br>
26. Hangor Hroder Bibhishika
(হাঙর হ্রদের বিভীষিকা)<br>
  </p>
  <p style="text-align:left">All tintin comics available <br>
  Download any Tintin Comics PDF free 
 <br>Download Tintin Comics in English
<br>Download Tintin Comics in Bangla <br>
English Version Tintin Books <br>
Bangla (Bengali) Version Tintin Books <br>
বাংলায় টিনটিন <br>
All tintin comics available
  <br>High Quality Pdf free download</p>
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