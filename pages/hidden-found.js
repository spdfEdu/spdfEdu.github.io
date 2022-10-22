document.querySelectorAll(".coll-sec").forEach((hs) =>{
  var collIcon = document.createElement("i");
  collIcon.className = "icon-svg";
  heading = hs.querySelector("h3") || 
            hs.querySelector("h2")
  heading.setAttribute("class","coll-head");
  hs.querySelector(".coll-head").prepend(collIcon)
  hs.querySelector("section").setAttribute("hidden","until-found");
  hs.querySelector("section").setAttribute("class","details");
  hs.classList.add("collapsed");
  hs.onbeforematch = () =>{
    hs.classList.remove("collapsed");
  };
  hs.querySelector(".coll-head").onclick = () =>{
    hs.classList.toggle("collapsed");
    const details = hs.querySelector(".details");
    if (hs.classList.contains("collapsed")){
      details.hidden = "until-found";
    } else{
      details.removeAttribute("hidden");
    }
  };
});

var css = `.coll-head{display:flex;width:100%;margin:15px 0 10px 0;padding:10px 0;align-items:center;border-bottom:.5px solid #bbbbbb}.coll-head:hover{cursor:pointer;transition:all 1s ease;background-color:#e8e8e8}
.icon-svg{margin-right:10px;height:24px;transition:all .5s ease}
.icon-svg{content:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z'%3E%3C/path%3E%3C/svg%3E")}
.collapsed .icon-svg{transform:rotate(180deg);-webkit-transform:rotate(180deg)}
`,
    style = document.createElement("style")
    head = document.head || document.getElementsByTagName('head')[0],
    head.appendChild(style);
    style.appendChild(document.createTextNode(css));