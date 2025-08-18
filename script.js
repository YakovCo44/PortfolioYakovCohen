// ===== reveal panels on scroll =====
document.addEventListener('scroll', () => {
    const panels = document.querySelectorAll('.panel')
    const triggerBottom = window.innerHeight * 0.8
    panels.forEach(p => { if (p.getBoundingClientRect().top < triggerBottom) p.classList.add('visible') })
  })
  
  /* ================== HACKER GATE ================== */
  const intro = document.getElementById('intro-screen')
  const typeout = document.getElementById('typeout')
  const gateInput = document.getElementById('intent-input')
  const accessOverlay = document.getElementById('access-overlay')
  const accessText = document.getElementById('access-text')
  
  const lines = [
    'BOOTING YK-PORTAL...\n',
    'Link integrity: OK\nAuth channel: open\n',
    'Identify your mission, operator:',
    '\n - recruit   • you need a developer\n - projects  • you want to browse builds\n - game      • you seek entertainment\n - contact   • you wish to send a signal\n'
  ]
  async function typeLines(){ for (const l of lines){ await typeText(l,10); await wait(150) } gateInput.focus() }
  function typeText(text, speed=12){ return new Promise(res=>{ let i=0; (function tick(){ typeout.textContent += text.charAt(i); i++; i<text.length? setTimeout(tick,speed):res() })() }) }
  function wait(ms){ return new Promise(r=>setTimeout(r,ms)) }
  async function showAccessGranted(){ if(!accessOverlay) return; accessOverlay.classList.remove('hidden','poweroff'); accessText.classList.remove('fadein'); accessOverlay.style.display='grid'; await wait(20); accessText.classList.add('fadein'); await wait(2000) }
  function playOverlayPowerOff(){ return new Promise(res=>{ accessOverlay.classList.add('poweroff'); accessOverlay.addEventListener('animationend', function h(){ accessOverlay.removeEventListener('animationend',h); res() }) }) }
  async function grantAndReveal(anchorId){ await showAccessGranted(); intro.classList.add('hidden'); await playOverlayPowerOff(); accessOverlay.style.display='none'; if(anchorId){ document.getElementById(anchorId)?.scrollIntoView({behavior:'smooth',block:'start'}) } }
  document.querySelectorAll('.choices button').forEach(btn=>btn.addEventListener('click',()=>routeIntent(btn.getAttribute('data-intent'))))
  gateInput.addEventListener('keydown',e=>{ if(e.key==='Enter'){ routeIntent((gateInput.value||'').trim().toLowerCase()) } else if(e.key==='Escape'){ intro.classList.add('hidden') }})
  function routeIntent(intent){ switch(intent){ case'recruit':grantAndReveal('about');break; case'projects':grantAndReveal('projects');break; case'game':grantAndReveal('game');break; case'contact':grantAndReveal('about');break; default:typeout.textContent+='\n[WARN] Unknown intent. Valid: recruit | projects | game | contact\n'; gateInput.value=''; gateInput.focus() } }
  document.addEventListener('keydown', e=>{ if(e.key==='Escape'){ accessOverlay.style.display='none'; intro.classList.add('hidden') } })
  window.addEventListener('load', typeLines)
  
  /* ===== live status fun ===== */
  const cpuEl=document.getElementById('cpu-val'), ramEl=document.getElementById('ram-val'), upEl=document.getElementById('uptime-val')
  let upSec=0; const pad=n=>n.toString().padStart(2,'0')
  function tickStatus(){ const cpu=Math.min(100,Math.max(40,(parseInt(cpuEl?.textContent)||80)+(Math.random()*6-3))); const ram=Math.min(100,Math.max(30,(parseInt(ramEl?.textContent)||70)+(Math.random()*6-3)))
    if(cpuEl) cpuEl.textContent=Math.round(cpu)+'%'; if(ramEl) ramEl.textContent=Math.round(ram)+'%'; upSec++; const h=Math.floor(upSec/3600), m=Math.floor((upSec%3600)/60), s=upSec%60; if(upEl) upEl.textContent=`${h.toString().padStart(4,'0')}:${pad(m)}:${pad(s)}` }
  setInterval(tickStatus,1200)
  document.querySelectorAll('.btn-terminal1[data-copy]').forEach(btn=>btn.addEventListener('click',()=>navigator.clipboard?.writeText(btn.getAttribute('data-copy'))))
  
  /* ===== matrix rain ===== */
  ;(function(){ const c=document.getElementById('matrix-rain'); if(!c) return; const ctx=c.getContext('2d'), chars='アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let w,h,cols,drops; function resize(){ w=c.width=innerWidth; h=c.height=innerHeight; cols=Math.floor(w/14); drops=new Array(cols).fill(0) }
    function tick(){ ctx.fillStyle='rgba(0,0,0,0.08)'; ctx.fillRect(0,0,w,h); ctx.fillStyle='#00ff66'; ctx.shadowColor='#00ff66'; ctx.shadowBlur=6
      for(let i=0;i<drops.length;i++){ const x=i*14,y=drops[i]*14,ch=chars[Math.floor(Math.random()*chars.length)]; ctx.fillText(ch,x,y); if(y>h&&Math.random()>0.975) drops[i]=0; else drops[i]++ }
      ctx.shadowBlur=0; requestAnimationFrame(tick) }
    ctx.font='14px ui-monospace, monospace'; addEventListener('resize',resize); resize(); tick()
  })()
  
  /* ===== hotkeys ===== */
  document.addEventListener('keydown', e=>{ if(['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return; const k=e.key.toLowerCase(); if(k==='r')routeIntent('recruit'); if(k==='p')routeIntent('projects'); if(k==='g')routeIntent('game'); if(k==='c')routeIntent('contact') })
  
  /* ===== theme switch ===== */
  ;(function(){ const saved=localStorage.getItem('yk_theme'); if(saved) document.documentElement.className=`theme-${saved}`
    document.querySelectorAll('.theme-switch [data-theme]').forEach(btn=>btn.addEventListener('click',()=>{ const t=btn.dataset.theme; document.documentElement.className=`theme-${t}`; localStorage.setItem('yk_theme',t) }))
  })()
  
  /* ================= ORBITAL CODE STRIKE ================= */
  ;(() => {
    const words = [
      'function','variable','object','array','promise','closure','recursion',
      'compile','deploy','refactor','iterate','callback','module','package',
      'router','schema','database','endpoint','socket','token','encrypt',
      'debug','lint','commit','merge','branch','pull','push','hook','render',
      'static','async','await','thread','process','binary','buffer','cache',
      'server','client','hex'
    ]
    const planetNames = [
      'Semicolon-9','Nullptr','Regex-V','Spaghetti-Prime','Bug-42',
      'NaN-Delta','Legacy-IX','YAML-Nebula','Lint-Minor','Merge-Conflict',
      'Stack-Overflow','Cache-Miss','Race-Condition','Deadlock-Belt',
      'Null-Island','Off-By-One','Heisenbug','Segfault-Z','Infinite-Loop',
      'Quantum-Merge','Hotfix-Gamma','Dark-Mode','Ship-It-VII'
    ]
    const satelliteNames = [
      'BUG-ZAPPER','LINT-LANCER','REFRACTOR-ONE','YK-01 “Refael”',
      'STACK-SPEAR','PARSER-HAWK','SIGTERM-12','ORB-CUSTODIAN',
      'WAF-ANGEL','SEMICOLON-CANNON'
    ]
  
    // elements
    const input = document.getElementById('gameInput')
    const targetEl = document.getElementById('targetWord')
    const typedEl = targetEl?.querySelector('.typed')
    const remainEl = targetEl?.querySelector('.remaining')
    const bar = document.getElementById('barFill')
    const msg = document.getElementById('msg')
    const beam = document.getElementById('beam')
    const planet = document.getElementById('planet')
    const planetGroup = document.getElementById('planetGroup')
    const planetIndexEl = document.getElementById('planetIndex')
    const beamIndexEl = document.getElementById('beamIndex')
    const arenaWrap = document.getElementById('arena-wrap')
    const hiredOverlay = document.getElementById('hiredOverlay')
    const playAgain = document.getElementById('playAgain')
    const emitter = document.getElementById('emitter')
    const planetText = document.getElementById('planetText')
    const satText = document.getElementById('satText')
    const svg        = document.getElementById('arena')
    const satelliteG = document.getElementById('satellite')
    const planetG    = document.getElementById('planetGroup')

    const layout = {
        satellite: { x: 0.16, y: 0.50 },  // 16% across, 50% down
        planet:    { x: 0.78, y: 0.58 }   // 78% across, 58% down
      }
  
    if (!input || !targetEl || !svg || !emitter) return
  
    // state
    const MAX_BEAMS = 5
    const MAX_PLANETS = 2
    let current = ''
    let beams = 0
    let planets = 0
    let shotLock = false

    function placeEntities(){
        const vb = svg.viewBox.baseVal
        const vw = vb.width, vh = vb.height
      
        const sx = vw * layout.satellite.x
        const sy = vh * layout.satellite.y
        satelliteG.setAttribute('transform', `translate(${sx},${sy})`)
      
        const px = vw * layout.planet.x
        const py = vh * layout.planet.y
        planetG.setAttribute('transform', `translate(${px},${py})`)
      
        // after moving, re-link beam endpoints so it stays accurate
        if (typeof relinkBeam === 'function') relinkBeam()
      }
      window.addEventListener('resize', placeEntities)
      placeEntities()
  
    // helpers
    const pick = arr => arr[Math.floor(Math.random() * arr.length)]
    function svgPoint(el,x,y){ const pt=svg.createSVGPoint(); pt.x=x; pt.y=y; return pt.matrixTransform(el.getCTM()) }
    function getEmitterPos(){ return svgPoint(emitter, emitter.cx.baseVal.value, emitter.cy.baseVal.value) }
    function toLocal(el, screenPt){
        const pt = svg.createSVGPoint()
        pt.x = screenPt.x; pt.y = screenPt.y
        return pt.matrixTransform(el.getCTM().inverse())
      }
      function toScreen(el, localPt){
        const pt = svg.createSVGPoint()
        pt.x = localPt.x; pt.y = localPt.y
        return pt.matrixTransform(el.getCTM())
      }
      
      // NEW: where the beam should hit — the planet *surface* along approach vector
      function getPlanetSurfacePos(){
        const muzzleScreen = getEmitterPos()
      
        // emitter in planet's local space (planet center is 0,0 in its local coords)
        const muzzleLocal = toLocal(planet, muzzleScreen)
      
        const r = planet.r.baseVal.value
        // vector from emitter to planet center (0,0) in planet-local coords
        const dx = -muzzleLocal.x
        const dy = -muzzleLocal.y
        const len = Math.hypot(dx, dy) || 1
        const unitX = dx / len
        const unitY = dy / len
      
        // point on the circle surface in that direction
        const surfaceLocal = { x: unitX * r, y: unitY * r }
      
        // back to screen coords for the beam endpoint
        return toScreen(planet, surfaceLocal)
      }
      
      // REPLACE your old relinkBeam() with this
      function relinkBeam(){
        const a = getEmitterPos()         // start at muzzle center
        const b = getPlanetSurfacePos()   // end at planet surface
        beam.setAttribute('x1', a.x); beam.setAttribute('y1', a.y)
        beam.setAttribute('x2', b.x); beam.setAttribute('y2', b.y)
      }
    window.addEventListener('resize', relinkBeam)
  
    function setWord(w){
      current = w || pick(words)
      input.value = ''
      typedEl.textContent = ''
      remainEl.textContent = current
      bar.style.width = '0%'
      msg.textContent = 'Type the word to charge the laser.'
      input.focus()
    }
  
    function spawnPlanet(){
      beams = 0
      beamIndexEl.textContent = '0'
      planetIndexEl.textContent = (planets+1).toString()
      const pName = pick(planetNames)
      planetText.textContent = `TARGET: ${pName}`
      planet.classList.remove('explode')
      planetGroup.style.opacity = '1'
      if(!satText.dataset.set){ satText.textContent = `SAT: ${pick(satelliteNames)}`; satText.dataset.set='1' }
      relinkBeam()
      setWord()
    }
  
    function fireBeam(){
      // ensure the beam starts EXACTLY from the muzzle center:
      relinkBeam()
      const x1=parseFloat(beam.getAttribute('x1')), y1=parseFloat(beam.getAttribute('y1'))
      const x2=parseFloat(beam.getAttribute('x2')), y2=parseFloat(beam.getAttribute('y2'))
      const len=Math.hypot(x2-x1,y2-y1)
  
      beam.style.transition='none'
      beam.style.strokeDasharray=`${len}`
      beam.style.strokeDashoffset=`${len}`
      beam.style.opacity='1'
  
      requestAnimationFrame(()=>{
        beam.style.transition='stroke-dashoffset 220ms ease-out'
        beam.style.strokeDashoffset='0'
      })
  
      planet.classList.remove('flash'); void planet.offsetWidth; planet.classList.add('flash')
      setTimeout(()=>{ beam.style.opacity='0' }, 1000)
    }
  
    function onCompleteWord(){
      shotLock = true
      msg.textContent = 'Target locked. Firing…'
      fireBeam()
      beams++; beamIndexEl.textContent = beams.toString()
      setTimeout(()=>{ if(beams>=MAX_BEAMS){ explodePlanet() } else { setWord() } shotLock=false }, 1100)
    }
  
    function explodePlanet(){
      planet.classList.add('explode')
      setTimeout(()=>{ planets++; if(planets>=MAX_PLANETS){ hiredOverlay.hidden=false } else { spawnPlanet() } }, 650)
    }
  
    input.addEventListener('input', ()=>{
      if(shotLock) return
      const val=input.value
      if(!current) return
      if(current.startsWith(val)){
        input.classList.remove('err')
        const pct=Math.min(100,Math.round((val.length/current.length)*100))
        bar.style.width=pct+'%'
        typedEl.textContent=val
        remainEl.textContent=current.slice(val.length)
        if(val===current) onCompleteWord()
      } else {
        input.classList.add('err')
        msg.textContent='Mismatch — keep it precise, operator.'
      }
    })
  
    arenaWrap.addEventListener('click', ()=> input.focus())
    document.getElementById('codegame')?.addEventListener('click', ()=> input.focus())
    playAgain?.addEventListener('click', ()=>{ planets=0; hiredOverlay.hidden=true; spawnPlanet() })
  
    spawnPlanet()
  })()
  
  
  
  

  
  
  
  