(()=>{var c=e=>document.querySelector(e),d=e=>document.querySelectorAll(e),f=()=>`
    <h3
      class="bmi__form--message-title font-semibold"
      id="bmi__form--message-title"
    >
      Welcome!
    </h3>
    <p class="bmi__form--message-description">
      Enter your height and weight and you\u2019ll see your BMI result here
    </p>
  `,p=(e,s)=>{let t="";e<18.5?t="underweight":e<25?t="a healthy weight":e<30?t="overweight":t="in the obese range";let o=`Your BMI suggests you\u2019re ${t}. Your ideal weight is between <span class="font-semibold">${s}</span>.`;return`
<div class="bmi__form--message-groups flex">
  <div class="bmi__form--message-group flex-column-wrapper">
    <h4 class="bmi__form--message-bmi-is font-semibold">
      Your BMI is...
    </h4>
    <h3
      class="bmi__form--message-bmi font-semibold"
      id="bmi__form--message-title"
    >
      ${e.toFixed(1)}
    </h3>
  </div>
  <div class="bmi__form--message-group">
    <p class="bmi__form--message-detail">${o}</p>
  </div>
</div>`},_=({heightFt:e,heightIn:s,weightSt:t,weightLbs:o})=>{let a=e*12+s,n=(t*14+o)*703/a**2;return n===1/0||Number.isNaN(n)?0:n},b=({heightCm:e,weightKg:s})=>{let t=e/100,o=s/t**2;return o===1/0||Number.isNaN(o)?0:o},I=({heightFt:e,heightIn:s})=>{let t=e*12+s,o=18.5*t**2/703,a=24.9*t**2/703;function r(n){let i=Math.floor(n/14),l=Math.round(n%14);return`${i}st ${l}lbs`}return`${r(o)} - ${r(a)}`},v=e=>{let s=e/100,t=18.5,o=24.9,a=t*s**2,r=o*s**2,n=a.toFixed(1),i=r.toFixed(1);return`${n}kg - ${i}kg`},M=e=>{let s=e/2.54,t=Math.floor(s/12),o=Math.round(s%12);return{feet:t,inches:o}},w=e=>{let s=e*2.20462,t=Math.floor(s/14),o=Math.round(s%14);return{stones:t,pounds:o}},x=(e,s)=>{let o=(e*12+s)*2.54;return Math.round(o).toFixed(0)},y=(e,s)=>{let o=(e*14+s)/2.20462;return Math.round(o*10)/10},h=e=>{let s=new FormData(e);return Array.from(s.entries()).reduce((t,[o,a])=>(t[o]=o==="option"?a:Number(a),t),{})},k=e=>{let s=["Backspace","Tab","ArrowLeft","ArrowRight","Delete","Home","End"],t=parseInt(e.target.getAttribute("data-decimals")||"0",10),o=e.target.value,a=e.ctrlKey||e.metaKey,r=e.target.selectionStart===0&&e.target.selectionEnd===o.length;if(!(s.includes(e.key)||a)&&!(e.key==="."&&t>0&&!o.includes("."))){if(/^\d$/.test(e.key)){if(o==="0"&&e.key==="0"&&!r){e.preventDefault();return}if(o==="0"&&e.key!=="."&&!r){e.preventDefault();return}if(o.includes(".")){let[n,i]=o.split("."),l=e.target.selectionStart,g=o.indexOf(".");if(l>g&&i.length>=t&&e.target.selectionStart===e.target.selectionEnd){e.preventDefault();return}}return}e.preventDefault()}},$=e=>{let s=parseInt(e.target.getAttribute("data-decimals")||"0",10),t=e.target.value;t=t.replace(/[^0-9.]/g,"");let o=t.indexOf(".");if(o!==-1){let a=t.slice(0,o),r=t.slice(o+1).replace(/\./g,"");s>=0&&(r=r.slice(0,s)),t=a+"."+r}t=t.replace(/^0+(?!\.)/,""),e.target.value=t};(async()=>{let e=["#bmi__form--option-metric","#bmi__form--option-imperial"],s=["#bmi__form--imperial-measurement","#bmi__form--metric-measurement"],t=d(".bmi__form--input"),o=c("#bmi__form"),a=c("#bmi__form--message"),r=()=>{let n=h(o),i=0,l="";switch(n.option){case"Metric":i=b({heightCm:n.height_cm,weightKg:n.weight_kg}),l=i===0?"":v(n.height_cm);break;case"Imperial":i=_({heightFt:n.height_ft,heightIn:n.height_in,weightSt:n.weight_st,weightLbs:n.weight_lbs}),l=i===0?"":I({heightFt:n.height_ft,heightIn:n.height_in});break}a.innerHTML=i===0?f():p(i,l)};t.forEach(n=>{n.value="0",n.addEventListener("focus",i=>i.target.select()),n.addEventListener("keydown",k),n.addEventListener("input",$),n.addEventListener("blur",i=>{(i.target.value?.trim()??"0")===""&&(i.target.value="0")}),n.addEventListener("keyup",()=>r())}),e.forEach(n=>{c(n).addEventListener("click",i=>{let l=i.target.value,g=h(o);switch(l){case"Imperial":let{feet:m,inches:W}=M(g.height_cm),{stones:E,pounds:L}=w(g.weight_kg);c('input[name="height_ft"]').value=m,c('input[name="height_in"]').value=W,c('input[name="weight_st"]').value=E,c('input[name="weight_lbs"]').value=L;break;case"Metric":let A=x(g.height_ft,g.height_in),N=y(g.weight_st,g.weight_lbs);c('input[name="height_cm"]').value=A,c('input[name="weight_kg"]').value=N;break}let B=i.target.getAttribute("data-fieldset"),u=c(B);t.forEach(m=>{m.disabled=!0}),s.forEach(m=>{c(m).classList.add("hidden")}),u.classList.remove("hidden"),u.querySelectorAll(".bmi__form--input").forEach(m=>{m.disabled=!1}),console.log(),r()})}),c(e[0]).click()})();})();
