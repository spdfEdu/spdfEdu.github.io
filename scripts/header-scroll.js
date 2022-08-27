var  prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header-wrap").style.top = "0";
  } else {
    if (currentScrollPos > 120) {
    document.getElementById("header-wrap").style.top = "-50px";
    }}prevScrollpos = currentScrollPos}
