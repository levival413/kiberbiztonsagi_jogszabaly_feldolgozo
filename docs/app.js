const $ = id => document.getElementById(id);
const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('hu');
let current=0, page=0, filters={}, rows=[], headers=[], target=0;
const size=40;
function addCell(parent,c,tag='td'){
 const el=document.createElement(tag);
 if(c.href && /^(https?:\/\/|#)/.test(c.href)) {const a=document.createElement('a');a.href=c.href;a.textContent=c.v;if(!c.href.startsWith('#')){a.target='_blank';a.rel='noopener noreferrer';}el.append(a);} else el.textContent=c.v;
 parent.append(el);
}
function matching(){const q=norm($('search').value.trim());return rows.filter(r=>(!q||norm(r.cells.map(c=>c.v).join(' ')).includes(q))&&Object.entries(filters).every(([i,v])=>!v||r.cells[i].v===v));}
function draw(){
 const found=matching();page=Math.max(0,Math.min(page,Math.ceil(found.length/size)-1));$('body').replaceChildren();
 for(const r of found.slice(page*size,(page+1)*size)){const tr=document.createElement('tr');tr.id='row-'+r.n;if(r.n===target)tr.className='target';for(const c of r.cells)addCell(tr,c);$('body').append(tr);}
 $('count').textContent=`${found.length} / ${rows.length} sor`;$('page').textContent=`${page+1} / ${Math.max(1,Math.ceil(found.length/size))}`;$('prev').disabled=page===0;$('next').disabled=(page+1)*size>=found.length;
 if(!found.length){const tr=document.createElement('tr'),td=document.createElement('td');td.colSpan=headers.length||6;td.textContent='Nincs találat. Módosítsd a keresést vagy töröld a szűrőket.';tr.append(td);$('body').append(tr);}
}
function navigate(){
 const m=location.hash.match(/^#(\d+):(\d+)$/);current=m?Number(m[1]):0;if(!WORKBOOK[current])current=0;target=m?Number(m[2]):0;
 const s=WORKBOOK[current];$('title').textContent=s.rows.find(r=>r.n===2)?.cells[0].v||s.name;$('description').textContent=s.rows.find(r=>r.n===3)?.cells[0].v||'';
 rows=s.rows.filter(r=>r.n>=(current===0?5:6));headers=current===0?[]:(s.rows.find(r=>r.n===5)?.cells||[]);$('head').replaceChildren();if(headers.length){const tr=document.createElement('tr');headers.forEach(c=>addCell(tr,c,'th'));$('head').append(tr);}
 $('search').value='';filters={};$('filters').replaceChildren();
 headers.forEach((h,i)=>{if(!['Érintett','Téma','Jogszabály','Feldolgozottság','Terület'].includes(h.v))return;const label=document.createElement('label');label.textContent=h.v;const select=document.createElement('select');select.add(new Option('Mind',''));[...new Set(rows.map(r=>r.cells[i].v).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'hu')).forEach(v=>select.add(new Option(v,v)));select.onchange=()=>{filters[i]=select.value;page=0;target=0;draw();};label.append(select);$('filters').append(label);});
 document.querySelectorAll('nav a').forEach((a,i)=>{if(i===current)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 const idx=rows.findIndex(r=>r.n===target);page=idx<0?0:Math.floor(idx/size);draw();if(idx>=0)requestAnimationFrame(()=>$('row-'+target)?.scrollIntoView({block:'center'}));
}
WORKBOOK.forEach((s,i)=>{const a=document.createElement('a');a.href=`#${i}:1`;a.textContent=s.name;$('nav').append(a);});
$('search').oninput=()=>{page=0;target=0;draw();};$('reset').onclick=()=>{filters={};$('search').value='';document.querySelectorAll('#filters select').forEach(s=>s.value='');page=0;target=0;draw();};$('prev').onclick=()=>{page--;draw();};$('next').onclick=()=>{page++;draw();};window.addEventListener('hashchange',navigate);navigate();
