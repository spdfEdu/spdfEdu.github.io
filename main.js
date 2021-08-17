 //shareButton
   function share() {
   if (navigator.share) {
       navigator.share({
       text: document.getElementById("Name").textContent+" \n"
             +window.location.href })}
   else {
     window.open('https://wa.me/?text=*'+document.getElementById("Name").textContent+'*%0A'+window.location.href)}};

 //header section
var header = document.createElement("div");
header.innerHTML =
 `  <div id="head-box">
    <div id="head"
    onclick="location.href='http://bit.ly/spdfEdu'"> 
      <span style="color:red">spdf</span><span style="color:blue">Edu</span></div>
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
    Contact Us 
  </div> |
  <div class="foot" onclick="location.href='https://spdfedu.blogspot.com/'">
   Home
  </div> |
  <div class="foot" onclick="location.href='https://spdfedu.blogspot.com/p/dcma.html'">
    DCMA Policy
  </div>
  </div>
  <div id="copySpdfedu">
    Copyright &#169; 2021 spdfEdu
  </div>
  <div class="half-hr"></div>
</div>`;
document.body.append(child);
