
//prepLadder Offer
{var prepInsert;
if (!document.getElementById('PrepLadder')) {
prepInsert = document.getElementById('box')}
else {
 prepInsert = document.getElementById('PrepLadder')}}
prepInsert.insertAdjacentHTML('afterend',`
<br><div id="prepBox">
  <div id="prep" onclick="location.href='whatsapp://send?phone=919883553053&text=%E2%9C%A8%20%E2%84%99%E2%84%9D%F0%9D%94%BC%E2%84%99%F0%9D%95%83%F0%9D%94%B8%F0%9D%94%BB%F0%9D%94%BB%F0%9D%94%BC%E2%84%9D%20%F0%9D%95%86%F0%9D%94%BD%F0%9D%94%BD%F0%9D%94%BC%E2%84%9D%20%E2%9C%A8%0A%0A*1st%20Year%20Offer*%0A(Anatomy,%20Physiology,%20Biochemistry)%0A%0A%F0%9D%9F%8F%F0%9D%90%AC%F0%9D%90%AD%20%F0%9D%90%8F%F0%9D%90%AB%F0%9D%90%A8%F0%9D%90%9F%20-%20*%E2%82%B95600*%20/%206%20month%0A*%E2%82%B96000*%20/%209%20month%0A*%E2%82%B96300*%20/%201year%20(%20MRP%20~%E2%82%B99000~%20)%0A%0A*2nd%20Year%20Offer*%0A(Pathology,%20Pharmacology,%20Microbiology)%0A%0A%F0%9D%9F%90%F0%9D%90%A7%F0%9D%90%9D%20%F0%9D%90%8F%F0%9D%90%AB%F0%9D%90%A8%F0%9D%90%9F%20-%20*%E2%82%B96900*%20/%206%20month%20%0A*%E2%82%B97300*%20/%209%20month%20%0A*%E2%82%B97800*/%201%20year%20(%20MRP%20~%E2%82%B910800~%20)%0A%0A*Complete%20PrepLadder%E2%80%99s%20Pack*%0AIncludes%20Clinical%20Essentials,%20Updated%20Video%20Lectures,%20Integrated%20QBank,%20Treasures,%20NEXT%20/%20FMGE%20orientation%20and%20much%20more.%20Have%20you%20enrolled%20yet?%20Enroll%20now%20to%20get%0A%E2%9C%85%20%E2%82%B916,500%20Off%0A%E2%9C%85%201%20Month%20Extra%20Validity%20on%20subscriptions%20of%2012%20months%20and%20above%F0%9F%95%BA%0A%0A*4months:%20%E2%82%B916,999*%0A*6%20Months:%2023,499*%0A*9%20Months:%2026,499*%0A*12%20%2b%201%20Month:%2031,399*%0A*18%20%2b%201%20Month:%2037,399*%0A*24%20%2b%201%20Month:%2042,399*%0A*36%20%2b%201%20Month:%2047,399*%0A*48%20%2b%201%20Month:%2052,399*%0A*60%20%2b%201%20month:%2057,399*%0A*72%20%2b%201%20Month:%2062,399*%0A%0A*CREDIT%20CARD%20EMI%20FACILITIES%20AVAILABLE*%0APayment%20will%20be%20done%20in%20app.&app_absent=0'">
    <div id="prepImgBox">
      <img id="prepImg" src="https://spdfedu.github.io/image/prepladder.jpg" alt="PrepLadder"/>
    </div>
      <div id="prepHead">
        𝔹𝔼𝕊𝕋 ℙℝ𝔼ℙ𝕃𝔸𝔻𝔻𝔼ℝ 𝕆𝔽𝔽𝔼ℝ𝕊
      </div>
      <div id="offerDetails">
<div class="proff">
  <div class="profH">
    1st Proff
  </div>
  <div class="cost">
₹6300 / 1 year (<strike>₹9000</strike>)
  </div>
</div>
<div class="proff">
  <div class="profH">
    2nd Proff
  </div>
  <div class="cost">
    ₹7800 / 1 year (<strike>₹10800</strike>)
  </div>
</div>
<div class="proff">
  <div class="profH">
    Complete Pack
  </div>
  <div class="cost">
   ₹42,399 for (24 + 1 Month)
  </div>
  <div class="cost">
   ₹31,399 for (12 + 1 Month)
  </div>
</div>
<div class="costMore">
  <b>6 months &amp; 9 months Packs also available
  <div id="costLink">
  To Avail / Know More
<div class="knowMore">
   Click Here
</div></div></b></div></div></div>
  <style>
#prepBox {
  z-index: 2;
  display: block;
  margin: auto;
  width: 90%;
  font-family: Sans-Serif;
  background-color: #a7dcfb;
  border-radius: 10px;
  box-shadow: 3px 3px 8px 3px #e2e2e2;
  opacity:.9;
}
#prep {
  padding: 2px 0 7px 0;
}
#prepBox:hover {
  background-color: #93d3fa;
}
#prepImgBox {
  position: relative;
}
#prepImg {
  z-index: -1;
  position: absolute;
  top: 40px;
  right: 8px;
  width:  80px;
  height: auto;
  border-radius: 5px;
}
#prepHead {
  text-align: center;
  font-weight: bold;
  font-size: 22px;
  color: #fff;
  padding: 5px 0;
}
.proff {
  margin: 10px 30px;
}
.profH {
  font-size: 19px;
  font-weight: bold;
}
.cost {
  margin: 0px 30px;
}
.costMore {
  text-align: center;
}
#costLink {
  color: red;
}
.knowMore {
  display: inline;
  text-decoration: underline;
  text-decoration-color: blue;
}
.knowMore:hover {
  text-decoration: none;
  color: #941ca9;
}
  </style>
</div><br>`);