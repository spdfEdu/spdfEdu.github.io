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
  ['#efname', `${ttintin[slNo].eTitle} in French`],
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
    ['#tc',`${[git]}english/c/${ttintin[slNo].eTitle.toLowerCase().split(' ').join('-')}.webp`,`${ttintin[slNo].eTitle}`],
    ['#bc',`${[git]}bangla/${ttintin[slNo].beTitle.toLowerCase().split(' ').join('-')}.webp`,`${ttintin[slNo].beTitle}`],
    ['#fc',`${[git]}french/sm/${ttintin[slNo].fTitle.split(' ').join('-')}.webp`,`${ttintin[slNo].fTitle}`],
    ['#ac',`${[git]}arabic/sm/${ttintin[slNo].eTitle.toLowerCase().split(' ').join('-')}-arabic.webp`,`${ttintin[slNo].aTitle}`]
  ]
  srcs.forEach(([target,src]) => {
    document.querySelector(target).src = src ;});
  srcs.forEach(([target,src,alt]) => {
    document.querySelector(target).alt = alt ;});
}
//Book info Box
{
var crtDtlBox = document.createElement('div')
crtDtlBox.innerHTML =`
<table class="book-detail" border="1"><tr class="info-row"><th class="info-label center" colspan="3">${ttintin[slNo].eTitle}</th></tr><tr class="info-row"><td rowspan="5"><img id="dimg" loading="lazy" class="d-cover" src="${[git]}english/sm/${ttintin[slNo].eTitle.toLowerCase().split(' ').join('-')}.webp" alt="${ttintin[slNo].eTitle}"></td></tr><tr class="info-row"><th class="info-label">Creator</th><td class="info-data">Hergé</td></tr><tr class="info-row"><th class="info-label">Publish Year</th><td class="info-data">${ttintin[slNo].year}</td></tr><tr class="info-row"><th class="info-label">Languages Available</th><td class="info-data"><ul class="info-data-ul"><a href="#english"><li>English</li></a><a href="#bangla"><li>Bengali</li></a><a href="#french"><li>French</li></a><a href="#arabic"><li>Arabic</li></a></ul></td></tr><tr class="info-row"><th class="info-label">Category</th><td class="info-data"><em>The Adventures of Tintin</em></td></tr><tr class="info-row"><td class="info-data" colspan="3"><ul class="info-data-ul"><li><span class="info-label">English Title</span><span class="info-data">${ttintin[slNo].eTitle}</span></li><li><span class="info-label">Bengali Title</span><span class="info-data">${ttintin[slNo].bTitle}</span></li><li><span class="info-label">Hindi Title</span><span class="info-data">${ttintin[slNo].hTitle}</span></li><li><span class="info-label">French Title</span><span class="info-data">${ttintin[slNo].fTitle}</span></li><li><span class="info-label">Arabic Title</span><span class="info-data">${ttintin[slNo].aTitle}</span></li></ul></td></tr><tr class="info-row"><th class="info-label">Preceded by</th><td colspan="2" class="info-data" ><a class="link" href="/2022/02/${ttintin[slNo -1].eTitle.toLowerCase().split(" ").join("-").replace("'","")}.html">${ttintin[slNo -1].eTitle}</a> (${ttintin[slNo -1].year})</td></tr><tr class="info-row"><th class="info-label" >Followed by</th><td colspan="2" class="info-data" ><a class="link" href="/2022/02/${ttintin[slNo +1].eTitle.toLowerCase().split(" ").join("-").replace("'","")}.html">${ttintin[slNo +1].eTitle}</a> (${ttintin[slNo +1].year})</td></tr></table>`;
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