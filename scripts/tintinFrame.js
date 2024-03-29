const git = "https://spdfedu.github.io/image/tintin/"
//innerHTMLs & srcs & alts
{
  document.title = `${ttintin[slNo].eTitle} | spdfEdu`
  const innerHTMLs = [
  ['#p1',`<em>${ttintin[slNo].eTitle}</em> (French Title : ${ttintin[slNo].fTitle}) is published in the year of ${ttintin[slNo].year}.`],
  ['#english', `${ttintin[slNo].eTitle}`],
  ['#bangla', `${ttintin[slNo].bTitle}<br>${ttintin[slNo].beTitle}`],
  ['#french', `${ttintin[slNo].fTitle}`],
  ['#arabic', `${ttintin[slNo].aTitle}`],
  ['#efname', `${ttintin[slNo].eTitle} in French Pdf Download`],
  ['#eaname', `${ttintin[slNo].eTitle} in Arabic`],
  ['#esize', `${ttintin[slNo].eSize} MB`],
  ['#elsize', `${ttintin[slNo].elSize} MB`],
  ['#bsize', `${ttintin[slNo].bSize} MB`],
  ['#blsize', `${ttintin[slNo].blSize} MB`],
  ['#fsize', `${ttintin[slNo].fSize} MB`],
  ['#asize', `${ttintin[slNo].aSize} MB`],
             ]
 innerHTMLs.forEach(([target, content]) => {
  document.querySelector(target).innerHTML = content;
  });
  const srcs = [
    ['#tc',`${[git]}english/c/${ttintin[slNo].eTitle.toLowerCase().split(' ').join('-')}.webp`,`${ttintin[slNo].eTitle} Pdf Download`],
    ['#bc',`${[git]}bangla/${ttintin[slNo].beTitle.toLowerCase().split(' ').join('-')}.webp`,`${ttintin[slNo].beTitle} Pdf`],
    ['#fc',`${[git]}french/sm/${ttintin[slNo].fTitle.split(' ').join('-')}.webp`,`${ttintin[slNo].fTitle} Pdf`],
    ['#ac',`${[git]}arabic/sm/${ttintin[slNo].eTitle.toLowerCase().split(' ').join('-')}-arabic.webp`,`${ttintin[slNo].aTitle} Pdf`]
  ]
  srcs.forEach(([target,src,alt]) => {
    document.querySelector(target).src = src
    document.querySelector(target).alt = alt
  });
}
//Texts for Seo
textHtmls = [
  ['#evl',`<h3>${ttintin[slNo].eTitle} Pdf Download</h3> <p>Click on the Download button to Download ${ttintin[slNo].eTitle} Pdf in High Quality</p>`],
  ['#edl2',`<p>${ttintin[slNo].eTitle} Pdf Download in Lower Size</p>`],
  ['#bc',`<p>${ttintin[slNo].beTitle} Bangla Read Online here<br>${ttintin[slNo].bTitle} অনলাইন পড়ুন </p>`],
  ['#bvl',`<h3>${ttintin[slNo].beTitle} in Bengali Pdf Download</h3><p>${ttintin[slNo].beTitle} Bangla Download Pdf here in High Quality<br>${ttintin[slNo].bTitle} ডাউনলোড করুন </p>`],
  ['#bdl2',`<p>${ttintin[slNo].beTitle} Comic Pdf here in Low Size<br>${ttintin[slNo].bTitle} Pdf ডাউনলোড করুন </p>`]
  ]
textHtmls.forEach(([a,b])=> {
  document.querySelector(a).insertAdjacentHTML('afterend',b)
});
 

//Book info Box
{
var crtDtlBox = document.createElement('div')
crtDtlBox.innerHTML =`
<table class="book-detail" border="1"><tr class="info-row"><th class="info-label">Book Title</th><td class="info-data">${ttintin[slNo].eTitle}</td></tr><tr class="info-row"><td colspan="2"><img id="dimg" loading="lazy" class="d-cover" src="${[git]}english/sm/${ttintin[slNo].eTitle.toLowerCase().split(' ').join('-')}.webp" alt="${ttintin[slNo].eTitle} Pdf"></td></tr><tr class="info-row"><th class="info-label">Creator</th><td class="info-data">Hergé</td></tr><tr class="info-row"><th class="info-label">Publish Year</th><td class="info-data">${ttintin[slNo].year}</td></tr><tr class="info-row"><th class="info-label">Volume</th><td class="info-data">${[slNo+1]}</td></tr><tr class="info-row"><th class="info-label">Languages Available</th><td class="info-data"><ul class="info-data-ul"><a href="#english"><li>English</li></a><a href="#bangla"><li>Bengali</li></a><a href="#french"><li>French</li></a><a href="#arabic"><li>Arabic</li></a></ul></td></tr><tr class="info-row"><th class="info-label">Genre</th><td class="info-data" colspan="2">Adventure / Action</td></tr><tr class="info-row"><th class="info-label">Category</th><td class="info-data" colspan="2"><em>Comics</em></td></tr><tr class="info-row"><th class="info-label">Series</th><td class="info-data" colspan="2"><em>The Adventures of Tintin</em></td></tr><tr class="info-row"><th class="info-label">Website Link</th><td class="info-data" colspan="2"><em><a class="link" href="https://bit.ly/tintinComics">bit.ly/tintinComics</a></em></td></tr><tr class="info-row"><td class="info-data" colspan="3"><h4>Title in</h4><table cellspacing="0"><tr><th class="t-info-label">English</th><td class="t-info-data">${ttintin[slNo].eTitle}</td></tr><tr><th class="t-info-label">French</th><td class="t-info-data">${ttintin[slNo].fTitle}</td></tr><tr><th class="t-info-label">Bengali</th><td class="t-info-data">${ttintin[slNo].bTitle}</td></tr><tr><th class="t-info-label">Hindi</th><td class="t-info-data">${ttintin[slNo].hTitle}</td></tr><tr><th class="t-info-label">Arabic</th><td class="t-info-data">${ttintin[slNo].aTitle}</td></tr>
</table></td></tr><tr class="info-row"><th class="info-label">Preceded by</th><td colspan="2" class="info-data" ><a class="link" href="/2022/02/${ttintin[slNo -1].eTitle.toLowerCase().split(" ").join("-").replace("'","")}.html">${ttintin[slNo -1].eTitle}</a> (${ttintin[slNo -1].year})</td></tr><tr class="info-row"><th class="info-label" >Followed by</th><td colspan="2" class="info-data" ><a class="link" href="/2022/02/${ttintin[slNo +1].eTitle.toLowerCase().split(" ").join("-").replace("'","")}.html">${ttintin[slNo +1].eTitle}</a> (${ttintin[slNo +1].year})</td></tr></table>`;
document.getElementById("insertBookDetail").append(crtDtlBox)}
//Inserting Image Swiper & Titles
{
ttintin.forEach(ele => {
  var crtImgSld = document.createElement("div")
  crtImgSld.className = "swiper-slide"
  crtImgSld.innerHTML =`
<a href="/2022/02/${ele.eTitle.toLowerCase().split(" ").join("-").replace("'","")}.html"><img loading="lazy" src="${[git]}/english/sm/${ele.eTitle.toLowerCase().split(' ').join('-')}.webp" alt="${ele.eTitle}"></a>`
  var insertSlide = document.getElementById("insertImgSlide")
  insertSlide.append(crtImgSld);
  
    var crtBImgSld = document.createElement("div")
  crtBImgSld.className = "swiper-slide"
  crtBImgSld.innerHTML =`
<a href="/2022/02/${ele.eTitle.toLowerCase().split(" ").join("-").replace("'","")}.html#bangla"><img loading="lazy" src="${[git]}/bangla/sm/${ele.beTitle.toLowerCase().split(' ').join('-')}.webp" alt="${ele.beTitle}"></a>`
  var insertSlide = document.getElementById("insertBImgSlide")
  insertSlide.append(crtBImgSld);
  
  var bottomPortion = document.createElement("tr")
bottomPortion.innerHTML =`
<td>${ele.sl}</td>
<td>${ele.year}</td>
<td onclick="location.href='/2022/02/${ele.eTitle.toLowerCase().split(" ").join("-").replace("'","")}.html'">${ele.eTitle}<br>${ele.bTitle}</td>`
var insertTitl = document.getElementById("insertTitles")
insertTitl.append(bottomPortion)
})
}
document.querySelector('#insertTitles').insertAdjacentHTML('beforeBegin','<h2>Tintin Series Published Year Wise:</h2>');
