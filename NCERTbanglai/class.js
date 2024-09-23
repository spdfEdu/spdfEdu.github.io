const spdfEdu="spdfEdu";

function createBook(ele, i) {
  var subjects = document.createElement("div");
  subjects.className = "box-book";
  if (ele.olk) {
      urlCheck = `href='${ele.olk}'`
    }
    if (!ele.olk) {
      downloadBook(i)
    }
  subjects.innerHTML =`
<div class="box-flex">
    <div class="box-lt">
      <a class="book-link" ${urlCheck}>
        <img class="cover" loading="lazy" src="https://spdfedu.github.io/NCERTbanglai/image/w150/${ele.url}.webp" alt="NCERT ${ele.Subject} Bengali Pdf" onerror="this.src='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjRuCZn4OCLV1YwS4JE0uUeJS9MaSRgiY8OHrt6hV2ijpuBrFv-Jty3O96X7_yObKgwZqtTeScMbfxR_VVn_4yGE1o_Xbvrz8OHFwGA8f7eNswyNEFHKLTiDzaahlm_Al_bt6BZR7uE3iJnEcNwcNTCOIc82c_sCBSIgqrTgUcpSJ8m6m8xK2QUgHU/s1600/book.webp'"/>
       </a>
    </div>
    <div class="box-rt">
      <h2><a class="book-link" ${urlCheck}>NCERT ${ele.Subject} Class XII Pdf</a></h2>
      <p class="name-detail">
       NCERT ${ele.Subject} Bengali
      </p>
      <p class="book-info">
  <span class="info-label"> Class</span>
   <span class="info-data"><a href="/search/label/NCERT%20XII?m=1?&max-results=6">Xii</a></span>
  <span class="info-label"> Version</span>
   <span class="info-data"><a href="/2023/10/ncert-bengali-version-book-for-class-1-to-12.html?m=1">NCERT Bengali</a></span>
      </p>
    </div>
</div>
<p class="book-info">
   <span class="info-label"> File Name</span><span class="info-data"> ${ele.url}.pdf</span></p>
<p class="book-info">
       Download NCERT ${ele.Subject} Class 12 Pdf in Bengali
</p>
`;
  document.getElementById("subjectShelf").append(subjects);
    
var kwlist = document.createElement("li");
  kwlist.innerHTML = `NCERT ${ele.Subject} Bengali Class 12  pdf download direct link`
  document.getElementById("kyw").append(kwlist);
  };
  
function easyForward(send) {
  return CryptoJS.AES.encrypt(send, spdfEdu).toString();
}
function downloadBook(index) {
  a ="href='/p/download-ncert-bengali-book-pdf.html?m=1spdfEdu"
  give = all[index]
  give = JSON.stringify(give)
  give = easyForward(give)
  urlCheck = a+give+"'";
  }

const values = new Map([
  ['i', 1],
  ['v', 5],
  ['x', 10]
  /*....*/
]);
function romanToInt(string) {
  let result = 0,
    current, previous = 0;
  for (const char of string.split("").reverse()) {
    current = values.get(char);
    if (current >= previous) {
      result += current;
    } else {
      result -= current;
    }
    previous = current;
  }
  return result;
}

all.forEach(createBook)
