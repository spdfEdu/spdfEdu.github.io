all.forEach(ele => {
  var subjects = document.createElement("div");
  subjects.className = "box-book";
  subjects.innerHTML =`
<div class="box-flex">
    <div class="box-lt">
      <a class="book-link" href="/${ele.url}/${(ele.urls || ele.Subject).toLowerCase()}.html">
        <img class="cover" loading="lazy" src="https://spdfedu.github.io/medBooks/${ele.iurl}" alt="MBBS ${ele.Subject} Books Pdf"/>
       </a>
    </div>
    <div class="box-rt">
      <h2>
        <a class="book-link" href="/${ele.url}/${(ele.urls || ele.Subject).toLowerCase()}.html">
            ${ele.Subject} Books
        </a>
      </h2>
      <p class="name-detail">
        ${ele.Subject} is a subject of ${ele.Year} Year MBBS.<br>
        Download ${ele.Subject} Books Pdf
      </p>
      <p class="book-info">
  <span class="info-label"> Year</span>
   <span class="info-data"><a href="/2021/10/${ele.Year}-Year.html">${ele.Year}</a></span>
  <span class="info-label"> Category</span>
   <span class="info-data"><a href="/p/medical.html">medBooks</a></span>
      </p>
    </div>
</div>`;
  document.getElementById("subjectShelf").append(subjects);
  });

var link = "https://bit.ly/medBooks"
var url ='Main Website --> bit.ly/spdfEdu';
//footer section
var child = document.createElement("div");
child.innerHTML =
 `<div id="boxFooter">
<div id="copyright"><hr>
<p id="copyrightHead"><b> DMCA Disclaimer </b></p> We are not hosting any copyrighted contents on our servers, it’s a catalog of links that already found on the internet. Check out our <div id="DMCA" onclick="location.href='/p/dcma.html'">DMCA Policy</div>.<b>If you feel that we have violated your copyrights, then please <div id="contact" onclick="location.href='/p/contact-us.html'">contact us</div> immediately, concerned content will be taken down within 24 hours.</b><br><br></div>
  <div id="boxFoot"><div class="foot" onclick="location.href='/p/contact-us.html'"> Contact Us </div> | <div class="foot" onclick="location.href='/'"> Home </div> | <div class="foot" onclick="location.href='/p/dcma.html'"> DCMA Policy </div></div>
  <div id="copySpdfedu"> Copyright &#169; 2021 spdfEdu </div></div>`;
document.body.append(child);

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
