(()=>{"use strict";var t={};function e(t=0,e=2){return t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t+1)+t)}t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var s=t.g.document;if(!e&&s&&(s.currentScript&&(e=s.currentScript.src),!e)){var i=s.getElementsByTagName("script");if(i.length)for(var n=i.length-1;n>-1&&!e;)e=i[n--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})();const s=t.p+"assets/sounds/sweep.wav",i=t.p+"assets/sounds/win.wav",n=t.p+"assets/sounds/lose.wav";let l=new Audio(s),o=new Audio(i),a=new Audio(n);class d{constructor(t=10,e=10,s=10){this.x=t,this.y=e,this.bombs=s,this.matrix=function(t=10,e=10,s=10){let i=[];for(let s=0;s<e;s++)i[s]=new Array(t);let n=1;for(let s=0;s<e;s++)for(let e=0;e<t;e++)i[s][e]=n,n++;return i}(t,e),this.gameBegin=!1,this.field=document.createElement("div"),this.field.className="field",this.field.classList.add(`field_${t}`),this.matrix.forEach(((t,e)=>{this.row=document.createElement("div"),this.row.className="field__row",this.row.setAttribute("data-row",e),this.field.append(this.row),t.forEach(((t,e)=>{this.cell=document.createElement("div"),this.cell.className="field__cell",this.cell.setAttribute("value",t),this.cell.setAttribute("data-col",e),this.cell.addEventListener("click",this.startGame.bind(this)),this.cell.addEventListener("click",this.openCell.bind(this)),this.cell.addEventListener("click",this.gameOver.bind(this)),this.cell.addEventListener("contextmenu",this.rightClick.bind(this)),this.row.append(this.cell)}))})),this.info=document.createElement("div"),this.info.className="info",this.seconds=document.createElement("div"),this.seconds.className="info__seconds",this.seconds.textContent="0",this.info.append(this.seconds),this.countMovies=document.createElement("div"),this.countMovies.className="info__movies",this.countMovies.textContent="1",this.info.append(this.countMovies),this.countFlags=document.createElement("div"),this.countFlags.className="info__flags",this.countFlags.textContent="0",this.info.append(this.countFlags),this.countMines=document.createElement("div"),this.countMines.className="info__mines",this.countMines.textContent=`0/${this.bombs}`,this.info.append(this.countMines),this.muteBtn=document.createElement("button"),this.muteBtn.className="muteBtn",this.muteBtn.textContent="mute sounds",this.muteBtn.addEventListener("click",this.mute.bind(this)),this.notMuted=!0,this.field.append(this.muteBtn),this.field.append(this.info),this.resultList=document.createElement("ul"),this.resultList.textContent="Last 10 results:",this.resultList.className="field__results";for(let t=0;t<10;t++)if(this.resultListItem=document.createElement("li"),null!==localStorage.getItem("lastResults")){let e=localStorage.getItem("lastResults").split(",");e[t]?(this.resultListItem.textContent=e[t],this.resultList.append(this.resultListItem)):(this.resultListItem.textContent="-",this.resultList.append(this.resultListItem))}else this.resultListItem.textContent="-",this.resultList.append(this.resultListItem);this.field.append(this.resultList)}mute(){this.notMuted=!this.notMuted,this.notMuted?this.muteBtn.textContent="mute sounds":this.muteBtn.textContent="unmute sounds"}timer(){let t=new Date;return Math.round((t-this.startTime)/1e3)+""}addField(){document.body.append(this.field)}openCell(t){if(this.notMuted&&l.play(),!t.target.classList.contains("field__cell_flag")&&(t.target.textContent=t.target.getAttribute("value"),t.target.classList.add("field__cell_open"),t.target.classList.add(`field__cell_${t.target.getAttribute("value")}`),"⚙"===t.target.getAttribute("value")&&t.target.classList.add("field__cell_bomb"),"0"===t.target.textContent)){t.target.classList.add("field__cell_null");const e=parseInt(t.target.parentNode.getAttribute("data-row")),s=parseInt(t.target.getAttribute("data-col"));this.openNeighbors(e,s)}}openNeighbors(t,e){for(let s=t-1;s<=t+1;s++)for(let t=e-1;t<=e+1;t++){const e=document.querySelector(`[data-row="${s}"] [data-col="${t}"]`);e&&"0"===e.getAttribute("value")&&""===e.textContent?(e.textContent=e.getAttribute("value"),e.classList.add("field__cell_open"),e.classList.add(`field__cell_${e.getAttribute("value")}`),this.openNeighbors(s,t)):e&&"0"!==e.getAttribute("value")&&""===e.textContent&&(e.textContent=e.getAttribute("value"),e.classList.add("field__cell_open"),e.classList.add(`field__cell_${e.getAttribute("value")}`))}}startGame(t){this.gameBegin||(this.matrix=function(t=1,s=10,i=10,n=10){let l=[];for(let o=0;l.length<n;o++){let n=e(1,s*i);l.includes(n)||n===t||l.push(n)}let o=[];for(let t=0;t<i;t++)o[t]=new Array(s);let a=1;for(let t=0;t<i;t++)for(let e=0;e<s;e++)l.includes(a)?o[t][e]="⚙":o[t][e]=0,a++;for(let t=0;t<i;t++)for(let e=0;e<s;e++){let n=[t>0&&e>0?o[t-1][e-1]:void 0,t>0?o[t-1][e]:void 0,t>0&&e<s-1?o[t-1][e+1]:void 0,e<s-1?o[t][e+1]:void 0,t<i-1&&e<s-1?o[t+1][e+1]:void 0,t<i-1?o[t+1][e]:void 0,t<i-1&&e>0?o[t+1][e-1]:void 0,e>0?o[t][e-1]:void 0];o[t][e]="⚙"===o[t][e]?"⚙":n.reduce(((t,e)=>"⚙"===e?t+1:t),0)}return o}(1*t.target.getAttribute("value"),this.x,this.y,this.bombs),document.querySelectorAll(".field__cell").forEach(((t,e)=>{t.setAttribute("value",`${this.matrix.flat()[e]}`)})),this.startTime=new Date,this.secCount=setInterval((()=>{this.seconds.textContent=this.timer()}),1e3),this.moves=0,this.flagsCount=0,this.gameBegin=!0)}rightClick(t){t.preventDefault(),""!==t.target.innerText||t.target.classList.contains("field__cell_flag")?t.target.classList.contains("field__cell_flag")&&(t.target.classList.remove("field__cell_flag"),0===this.flagsCount?this.flagsCount:this.flagsCount-=1):(t.target.classList.add("field__cell_flag"),this.flagsCount+=1),this.countFlags.textContent=this.flagsCount,this.countMines.textContent=`${this.flagsCount<=this.bombs?this.flagsCount:this.bombs}/${this.bombs}`}showMines(){"lose"===this.result&&document.querySelectorAll('[value="⚙"]').forEach((t=>{t.textContent=t.getAttribute("value"),t.classList.remove("field__cell_flag"),t.classList.add("field__cell_bomb")}))}gameOver(t){let e=new Date;this.endTime=e-this.startTime,!0===t.isTrusted&&(this.moves+=1,this.countMovies.textContent=`${this.moves}`);let s=document.createElement("div");s.className="field__block",s.style.height=`${this.field.offsetHeight}px`,s.style.width=`${this.field.offsetWidth}px`;let i=document.createElement("p");i.className="field__text",document.body.classList.contains("dark")&&i.classList.add("field__text_dark");let n=0;if(document.querySelectorAll(".field__cell").forEach((t=>{""!==t.textContent&&"⚑"!==t.textContent||(n+=1),"⚙"===t.textContent&&(this.result="lose",this.field.append(s),s.append(i),i.textContent="Game over. Try again",clearInterval(this.secCount),this.notMuted&&a.play())})),this.showMines(),n===1*this.bombs)if(this.field.append(s),s.append(i),i.textContent=`Hooray! You found all mines in ${Math.round(this.endTime/1e3)} seconds and ${this.moves} moves!`,clearInterval(this.secCount),this.seconds.textContent=Math.round(this.endTime/1e3),this.notMuted&&o.play(),null!==localStorage.getItem("lastResults")){let t=`${Math.round(this.endTime/1e3)} seconds and ${this.moves} moves!`;localStorage.setItem("lastResults",`${t},${localStorage.getItem("lastResults")}`)}else{let t=`${Math.round(this.endTime/1e3)} seconds and ${this.moves} moves!`;localStorage.setItem("lastResults",t)}}}!function(){let t=new d(10,10,10);t.addField();let e=document.createElement("button");e.className="settings__new-game",e.textContent="NEW GAME";let s=document.createElement("select");s.className="settings__level",s.id="level-select";let i=document.createElement("label");i.textContent="field:",i.setAttribute("for","level-select");let n=document.createElement("option");n.textContent="10x10",s.appendChild(n);let l=document.createElement("option");l.textContent="15x15",s.appendChild(l);let o=document.createElement("option");o.textContent="25x25",s.appendChild(o);let a=document.createElement("input");a.className="settings__bombs",a.type="number",a.id="bombs-input";let r=document.createElement("label");r.textContent="bombs\n(10 - 99):",r.setAttribute("for","bombs-input"),a.min=10,a.max=99,a.value=10,e.addEventListener("click",(()=>{document.querySelector(".field").remove();let e=s.options.selectedIndex,i=10;0===e?i=10:1===e?i=15:2===e&&(i=25),a.value<10?a.value=10:a.value>99&&(a.value=99);let n=a.value;t=new d(i,i,n),t.addField()}));let c=document.createElement("button");c.className="settings__btn",c.textContent="dark theme";let u=document.createElement("div");u.className="settings",u.append(e,i,s,r,a,c),document.body.prepend(u)}();let r=document.querySelector(".settings__btn");r.addEventListener("click",(function(){document.body.classList.toggle("dark"),document.body.classList.contains("dark")?r.textContent="light theme":r.textContent="dark theme"}))})();