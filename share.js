shareButton.addEventListener("click", () => share())
   function share() {
   if (navigator.share) {
       navigator.share({
       text: document.getElementById("Name").textContent+"  "
             +window.location.href })}}
