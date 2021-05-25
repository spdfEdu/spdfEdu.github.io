shareButton.addEventListener("click", () => share())
   function share() {
   if (navigator.share) {
       navigator.share({
       text: document.getElementById("Name").textContent+"  "
             +window.location.href })}}
function addCommentBox() {
var i = document.getElementById('comments');
var d = document.getElementById('displace-comments');
d.appendChild(i);
}
