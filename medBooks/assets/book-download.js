function download(id) {
  var dlink = downlink[id],
      ida = '#'+id+'>a';
  
  window.location.href = '#'+id
  document.getElementById(id).insertAdjacentHTML("afterend",
`<h4 id="downText">Please wait while your file is getting ready to download...</h4>
 <div class="wrap"><div class="spinner"><span id="cdt${id}">10</span></div></div>
 <h4 id="timerShow">Please wait a few seconds while we are processing your request... </h4>`)
 
  document.querySelector(ida).innerHTML = "PLEASE WAIT ...";
 
  var timeleft = 10 ;
  var downloadTimer = setInterval(function(){
        timeleft--;
    document.getElementById("cdt"+id).textContent = timeleft;
      if(timeleft <= 0)
      clearInterval(downloadTimer);
      },1000);
      
  setInterval(function(){
     document.querySelector(ida).innerHTML = "Link Generated -- Click here"
     document.querySelector(ida).style.background = "#38c808"
     document.querySelector(ida).style.color = "#fff"
     document.querySelector(ida).href = dlink;
      },10000);
      
  document.querySelector('#'+id).removeAttribute("onclick");
      }
