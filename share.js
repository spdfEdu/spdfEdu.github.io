shareButton.addEventListener("click", () => share())
   function share() {
   if (navigator.share) {
       navigator.share({
       text: document.getElementById("bookName").textContent+"  "
             +window.location.href })}}
