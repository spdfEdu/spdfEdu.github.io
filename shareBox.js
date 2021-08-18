//finding box, Name, comments
{var insert;
if (!document.getElementById('box')) {
insert = document.getElementById('Name')
 if (!document.getElementById('Name') && !document.getElementById('box')) {
insert = document.getElementById('comments')
}}
else {
 insert = document.getElementById('box')
}}

//creating the share Box
var sp = 'Main Website --> bit.ly/spdfEdu';
var shareBox = document.createElement("div");
insert.insertAdjacentHTML('afterend',
`<br><div id="share-box">
    <div id="head-share">
      Do Share with your friends
    </div>
     <div id="box">
       <div class="item">
         <div class="button wp" onclick="location.href='whatsapp://send?text=*'+document.title+'*%0A_'+window.location.href+'_%0A%0A'+sp;" href=''>
<svg class="shareButtonsSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
  </div></div>
       <div class="item">
         <div class="button sms" onclick="location.href='sms://?body='+document.title+'%0A'+window.location.href+'%0A%0A'+sp" href=''>
<svg class="shareButtonsSvg" xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 48 48">
<g transform="translate(0,48) scale(0.05,-0.05)"
fill="#000" stroke="none">
<path d="M100 860 c-19 -19 -20 -33 -20 -402 l0 -383 83 83 82 82 298 0 c284
0 298 1 317 20 19 19 20 33 20 298 0 278 0 279 -23 300 -23 22 -28 22 -380 22
-344 0 -358 -1 -377 -20z m700 -300 l0 -240 -302 0 c-266 0 -304 -2 -320 -17
-17 -16 -18 -7 -18 240 l0 257 320 0 320 0 0 -240z"/>
</g>
</svg>
  </div></div>
       <div class="item">
      <div class="button cpy" 
           id="copyButton">
        <svg class="shareButtonsSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" > 
<path d="M0 0h24v24H0z" fill="none"/>
<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"/></svg>
  </div></div>
       <div class="item">
       <div class="button mail" onclick="location.href='mailto:?subject='+document.title+'&body=Content Url: '+window.location.href+ '%0A%0AMain%20Website%20-->%20bit.ly/spdfEdu'" href=''>
       <svg class="shareButtonsSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
<path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 44 12 C 44 9.800781 42.199219 8 40 8 L 8 8 C 5.800781 8 4 9.800781 4 12 L 4 36 C 4 38.199219 5.800781 40 8 40 L 40 40 C 42.199219 40 44 38.199219 44 36 Z M 40 12 L 24 21.980469 L 8 12 Z M 40 36 L 8 36 L 8 16 L 24 26 L 40 16 Z M 40 36 "/>
</svg>
  </div></div>
       <div class="item">
       <div class="button shr" onclick="share()">
      <svg class="shareButtonsSvg" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24">
<path d="M0 0h24v24H0z" fill="none"/>
<path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
  </div></div>
  </div>
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
.wp {
  background-color: #a6e09f;
}
.sms {
  background-color: #9fdee0;
}
.cpy {
  background-color: #e0cd9f;
}
.mail {
  background-color: #e44d4d;
}
.shr {
  background-color: #b19fe0;
}
#copyTry {
  opacity: 0;
  position: absolute;
}
 </style>
  </div>`);

//share function
   function share() {
   if (navigator.share) {
       navigator.share({
       text: document.title+"\n"
             +window.location.href+"\n\n"+sp})}
   else {
     window.open('whatsapp://send?text=*'+document.title+'*%0A_'+window.location.href+'_%0A%0A'+sp)}}
        
//copy Button function  
  var Text = document.createElement('div');
  Text.id = 'copyTry';
  Text.innerHTML = document.title +'<br>' +window.location.href+'<br><br>'+sp;
  document.getElementById('share-box').append(Text);
  var copyBtn = document.getElementById('copyButton');
copyBtn.addEventListener('click', function(event) {  
  var text = document.getElementById('copyTry');
  var range = document.createRange();  
  range.selectNode(text);  
  window.getSelection().addRange(range);
  try {  
    var successful = document.execCommand('copy');
  } catch(err) {  
    console.log('Oops, unable to copy') 
  }  
  window.getSelection().removeAllRanges();  
});
