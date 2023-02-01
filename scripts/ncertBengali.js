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
