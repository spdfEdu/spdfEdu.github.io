function createBook(ele, i) {
  var subjects = document.createElement("div");
  subjects.className = "box-book";
  if (ele.olk) {
      urlCheck = `href='${ele.olk}'`
    }
    if (!ele.olk) {
      urlCheck = downloadBook(i)
    }
  subjects.innerHTML =`
<div class="box-flex">
    <div class="box-lt">
      <a class="book-link" ${urlCheck}>
        <img class="cover" loading="lazy" src="https://spdfedu.github.io/NCERTbanglai/image/w150/${ele.book}.webp" alt="NCERT ${ele.subject} Bengali Pdf" onerror="this.src='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjRuCZn4OCLV1YwS4JE0uUeJS9MaSRgiY8OHrt6hV2ijpuBrFv-Jty3O96X7_yObKgwZqtTeScMbfxR_VVn_4yGE1o_Xbvrz8OHFwGA8f7eNswyNEFHKLTiDzaahlm_Al_bt6BZR7uE3iJnEcNwcNTCOIc82c_sCBSIgqrTgUcpSJ8m6m8xK2QUgHU/s1600/book.webp'"/>
       </a>
    </div>
    <div class="box-rt">
      <h2><a class="book-link" ${urlCheck}>NCERT ${ele.subject} Class ${romanToInt(ele.class)} Pdf</a></h2>
      <p class="name-detail">
       NCERT ${ele.subject} Bengali
      </p>
      <p class="book-info">
  <span class="info-label"> Class</span>
   <span class="info-data"><a href="/search/label/NCERT%20${ele.class.toUpperCase()}?m=1?&max-results=6">${ele.class.toUpperCase()}</a></span>
  <span class="info-label"> Version</span>
   <span class="info-data"><a href="/2023/10/ncert-bengali-version-book-for-class-1-to-12.html?m=1">NCERT Bengali</a></span>
      </p>
    </div>
</div>
<p class="book-info">
   <span class="info-label"> File Name</span><span class="info-data"> ${ele.book}.pdf</span></p>
<p class="book-info">
       Download NCERT ${ele.subject} Class  ${romanToInt(ele.class)} Pdf in Bengali
</p>
`;
  document.getElementById("subjectShelf").append(subjects);
    
var kwlist = document.createElement("li");
  kwlist.innerHTML = `Class ${romanToInt(ele.class)} NCERT ${ele.subject} Bengali pdf download direct link`
  document.getElementById("kyw").append(kwlist);
  };
  
function downloadBook(index) {
  a ="href='/p/download-ncert-bengali-book-pdf-1.html?m=1"
  b = all[index]
  c = new URLSearchParams(b);
  d = c.toString();
  return a +"&" +d +"'";
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
