const cfg = window.INVITE_CONFIG;
const $ = (id) => document.getElementById(id);
const cover = $('cover'), scroller = $('invitationScroll'), music = $('bgMusic');
let opened = false;
scroller.inert=true;
$('content').setAttribute('tabindex','-1');
function openInvitation(){
  if(opened) return;
  opened = true;
  cover.classList.add('opening');
  $('openInvite').disabled=true;
  scroller.inert=false;
  window.setTimeout(()=>{cover.classList.add('gone');scroller.scrollTop=0;observeReveals();$('content').focus({preventScroll:true});},950);
  if(music) music.play().then(()=>updateMusic(true)).catch(()=>updateMusic(false));
}
$('openInvite').addEventListener('click',openInvitation);
function observeReveals(){
  const items=document.querySelectorAll('.reveal');
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{root:scroller,threshold:.12});
  items.forEach(el=>observer.observe(el));
}
$('directions').href='https://maps.app.goo.gl/bdDtx1pxBYx48z289';
$('wishes').href='https://wa.me/919284541470?text='+encodeURIComponent('Warmest congratulations to Maitri & Dinesh! Wishing you a beautiful engagement and a lifetime of happiness. ✨');
$('contacts').innerHTML=cfg.phones.map(n=>`<a href="tel:+91${n}" aria-label="Call ${n}">☎ &nbsp; ${n}</a>`).join('');
const deadline = new Date(cfg.eventDate).getTime();
function countdown(){const delta=deadline-Date.now();const target=$('countdown');if(delta<=0){target.innerHTML='<p class="countdown-finished">The celebration has begun ✦</p>';return}const d=Math.floor(delta/86400000),h=Math.floor(delta/3600000)%24,m=Math.floor(delta/60000)%60,s=Math.floor(delta/1000)%60;target.innerHTML=[[d,'DAYS'],[h,'HOURS'],[m,'MINS'],[s,'SECS']].map(([v,k])=>`<div><strong>${String(v).padStart(2,'0')}</strong><small>${k}</small></div>`).join('')}
countdown();setInterval(countdown,1000);
function updateMusic(on){$('musicToggle').querySelector('span').textContent=on?'ON':'OFF';$('musicToggle').classList.toggle('playing',on)}
$('musicToggle').addEventListener('click',async()=>{if(!opened){openInvitation();return}if(music.paused){try{await music.play();updateMusic(true)}catch{alert('Optional music: add your licensed audio file as assets/music.mp3.')}}else{music.pause();updateMusic(false)}});
