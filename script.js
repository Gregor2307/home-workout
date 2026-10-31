const exercises={
 push:{icon:'💪',steps:['Поставь ладони чуть шире плеч на устойчивую, нескользящую опору.','Отойди ногами назад; держи корпус прямым.','Сгибай локти под углом примерно 30–45° к корпусу и опускай грудь к опоре.','Оттолкнись и вернись в исходное положение.'],warning:'Не прогибай поясницу и не используй стол, который может сдвинуться или опрокинуться.',q:'incline push up proper form'},
 row:{icon:'🏋️',steps:['Упрись свободной рукой в устойчивую опору, слегка согни колени.','Наклони корпус с ровной спиной; гантель держи под плечом.','Тяни локоть назад к тазу, не разворачивая корпус.','Плавно опусти гантель. Повтори другой рукой.'],warning:'Не дёргай вес и не скручивай туловище.',q:'one arm dumbbell row proper form'},
 squat:{icon:'🦵',steps:['Поставь стопы примерно на ширине плеч, носки слегка наружу.','Отводи таз назад и сгибай колени в комфортной амплитуде.','Держи всю стопу на полу, колени направляй по линии носков.','Поднимись, выпрямляя ноги.'],warning:'Начни без веса. Не приседай через боль в коленях.',q:'bodyweight squat proper form'},
 press:{icon:'🙌',steps:['Встань устойчиво, держи гантели у плеч.','Напряги мышцы живота, не прогибай поясницу.','Выжми гантели вверх в комфортной траектории.','Контролируемо опусти к плечам.'],warning:'Не отклоняй корпус назад ради подъёма веса.',q:'standing dumbbell shoulder press form'},
 bridge:{icon:'🌉',steps:['Ляг на спину, согни колени, стопы на полу.','Напряги ягодицы и подними таз до прямой линии плечи–таз–колени.','Задержись на секунду.','Плавно опусти таз.'],warning:'Не переразгибай поясницу в верхней точке.',q:'glute bridge proper form'},
 deadbug:{icon:'🐞',steps:['Ляг на спину, подними руки вверх, согни ноги под 90°.','Сохраняя поясницу в комфортном стабильном положении, медленно вытяни противоположные руку и ногу.','Вернись и поменяй стороны.'],warning:'Уменьши амплитуду, если поясница начинает заметно прогибаться.',q:'dead bug core exercise proper form'},
 rdl:{icon:'🏋️',steps:['Встань ровно, гантели перед бёдрами, колени слегка согнуты.','Отводи таз назад, наклоняй корпус с нейтральной спиной.','Веди гантели близко к ногам до комфортного натяжения задней поверхности бедра.','Выпрямись за счёт движения таза вперёд.'],warning:'Не округляй спину и не опускай вес ниже доступной амплитуды.',q:'dumbbell romanian deadlift proper form'},
 floor:{icon:'🛏️',steps:['Ляг на пол, согни колени; держи гантели возле груди.','Предплечья направь вертикально, локти немного ниже линии плеч.','Выжми гантели вверх без удара друг о друга.','Плавно опусти плечи и локти до лёгкого касания пола.'],warning:'Выбирай вес, с которым безопасно занять исходное положение и закончить подход.',q:'dumbbell floor press form'},
 band:{icon:'↔️',steps:['Закрепи эспандер на надёжной опоре или используй подходящую безопасную схему сидя.','Держи корпус устойчиво, плечи опущены.','Тяни локти назад вдоль корпуса, сводя лопатки без чрезмерного прогиба.','Медленно выпрями руки.'],warning:'Проверь резину на повреждения и надёжность крепления; не направляй её в лицо.',q:'resistance band seated row proper form'},
 calf:{icon:'🦶',steps:['Встань прямо, при необходимости держись за опору.','Медленно поднимись на носки.','Ненадолго задержись наверху.','Опустись под контролем.'],warning:'Не раскачивайся и не выполняй рывками.',q:'standing calf raise proper form'},
 curl:{icon:'💪',steps:['Встань ровно, руки с гантелями вдоль корпуса.','Прижми локти к туловищу.','Согни руки в локтях, не раскачивая плечами.','Медленно опусти гантели.'],warning:'Не помогай себе корпусом.',q:'standing dumbbell biceps curl proper form'},
 side:{icon:'🧱',steps:['Ляг на бок, поставь локоть под плечо.','Подними таз и выстрой тело в прямую линию.','Дыши спокойно, не заваливай плечо.','Повтори на другую сторону. Можно начать с опорой на колени.'],warning:'Если болит плечо, прекрати и выбери облегчённый вариант.',q:'side plank proper form'}
};
// Keep technique descriptions and video searches separate from the program data.
// Only these two exercises changed equipment, so adapt their existing instructions.
exercises.rdl.steps[0]='Встань ровно, штанга перед бёдрами, колени слегка согнуты.';
exercises.rdl.steps[2]='Веди штангу близко к ногам до комфортного натяжения задней поверхности бедра.';
exercises.rdl.q='barbell romanian deadlift proper form';
exercises.curl.steps[0]='Встань ровно, держи штангу перед бёдрами хватом снизу.';
exercises.curl.steps[3]='Медленно опусти штангу.';
exercises.curl.q='standing barbell biceps curl proper form';

const workouts={
 A:{id:'A',label:'А',connector:false,note:'10,5 кг и 4,5 кг — разные конфигурации тех же гантелей. Сначала нужна одна гантель для тяги, затем две для жима. Три гантели одновременно не нужны.',groups:[
  [{id:'push',name:'Отжимания от низкого стола',sets:3,reps:'10 повторений',equipment:'bodyweight',gear:'Устойчивый низкий стол'},
   {id:'row',name:'Тяга гантели к поясу',sets:3,reps:'10–12 на каждую руку',equipment:'dumbbell',weight:10.5,count:1,gear:'Гантель №1'}],
  [{id:'squat',name:'Приседания',sets:3,reps:'10–15 повторений',equipment:'bodyweight'},
   {id:'press',name:'Жим гантелей над головой',sets:3,reps:'8–12 повторений',equipment:'dumbbell',weight:4.5,count:2,gear:'Гантели №1 и №2'}],
  [{id:'bridge',name:'Ягодичный мостик',sets:3,reps:'10–15 повторений',equipment:'bodyweight'},
   {id:'deadbug',name:'Мёртвый жук',sets:3,reps:'8–10 на сторону',equipment:'bodyweight'}]
 ]},
 B:{id:'B',label:'Б',connector:true,note:'Для румынской тяги и бицепса используется один и тот же соединительный гриф. Перед бицепсом измени вес штанги. Вес штанги указан целиком, включая гриф и блины.',groups:[
  [{id:'rdl',name:'Румынская тяга со штангой',sets:3,reps:'10–12 повторений',equipment:'barbell',weight:20.5,gear:'Штанга с соединительным грифом и блинами'},
   {id:'floor',name:'Жим гантелей лёжа на полу',sets:3,reps:'8–12 повторений',equipment:'dumbbell',weight:7.5,count:2,gear:'Две гантели'}],
  [{id:'band',name:'Тяга эспандера к поясу',sets:3,reps:'10–15 повторений',equipment:'band',resistance:'5–15',gear:'Эспандер-петля Original FitTools FT-EX-208-13'},
   {id:'calf',name:'Подъёмы на носки',sets:3,reps:'12–20 повторений',equipment:'bodyweight'}],
  [{id:'curl',name:'Сгибания рук со штангой на бицепс',sets:3,reps:'10–12 повторений',equipment:'barbell',weight:8.5,gear:'Штанга с соединительным грифом и блинами'},
   {id:'side',name:'Боковая планка',sets:3,reps:'20–30 секунд на сторону',equipment:'bodyweight',timed:true}]
 ]}
};
let day='A',view='selection',timerId=null,seconds=90,running=false;
const $=id=>document.getElementById(id);
function key(){return 'homeworkout-progress-'+day}
function readJSON(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
function historyRecords(){return localStorage.getItem('homeworkout-history')===null?[]:readJSON('homeworkout-history',null)}
function progress(){const p=readJSON(key(),{});return p&&typeof p==='object'&&!Array.isArray(p)?p:{}}
function save(p){localStorage.setItem(key(),JSON.stringify(p))}
function sessionKey(){return 'homeworkout-session-'+day}
function program(){return workouts[day]}
function entries(){return program().groups.flat()}
function setNumbers(e){return Array.from({length:e.sets},(_,i)=>i+1)}
function totalSets(){return entries().reduce((n,e)=>n+e.sets,0)}
function doneSets(p=progress(),list=entries()){return list.reduce((n,e)=>n+setNumbers(e).filter(s=>Boolean(p[e.id+'-'+s])).length,0)}
function hasSession(){return Boolean(readJSON(sessionKey(),null))||doneSets()>0}
function kg(n){return n.toLocaleString('ru-RU')+' кг'}
function loadLabel(e){
 if(e.equipment==='barbell')return 'Вес штанги: '+kg(e.weight)+' всего (гриф и блины)';
 if(e.equipment==='dumbbell')return e.count===2?'2 × '+kg(e.weight)+' — вес каждой гантели':kg(e.weight)+' — одна гантель, отдельно каждой рукой';
 if(e.equipment==='band')return 'Эспандер '+e.resistance+' кг · номинальное сопротивление';
 return 'Собственный вес';
}
function equipmentHTML(){return `<ul class="equipment-list">${entries().filter(e=>e.gear).sort((a,b)=>Number(a.equipment==='bodyweight')-Number(b.equipment==='bodyweight')).map(e=>`<li><strong>${e.gear}</strong><span class="load">${e.equipment==='bodyweight'?'Без дополнительного веса':loadLabel(e)}</span><span class="sub">${e.name}</span></li>`).join('')}</ul><p class="connector"><strong>Соединительный гриф: ${program().connector?'НУЖЕН':'НЕ НУЖЕН'}</strong></p><p>${program().note}</p>`}
function render(){
 const w=program(),p=progress();
 document.querySelectorAll('[data-day]').forEach(b=>{const active=view!=='selection'&&b.dataset.day===day;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
 $('selection').hidden=view!=='selection';$('preparation').hidden=view!=='preparation';$('workout').hidden=view!=='workout';$('reset').hidden=view==='selection';
 $('prep-title').textContent='Тренировка '+w.label+' — подготовка';
 $('prep-equipment').innerHTML=equipmentHTML();
 $('prep-stats').textContent=`${entries().length} упражнений · ${w.groups.length} суперсета · ${entries()[0].sets} подхода на упражнение · ${totalSets()} рабочих подходов`;
 $('start').textContent=(hasSession()?'Продолжить тренировку ':'Начать тренировку ')+w.label;
 $('resume-note').textContent=hasSession()?`Есть незавершённая тренировка: ${doneSets(p)}/${totalSets()} подходов. `+(!readJSON(sessionKey(),null)?'Старые отметки сохранены; третий подход ещё не выполнен.':'Отметки сохранены.'):'';
 $('day-title').textContent='Тренировка '+w.label;
 $('workout-summary').textContent=entries()[0].sets+' подхода · без отказа';
 $('workout-equipment').innerHTML=equipmentHTML();
 $('sets').innerHTML=w.groups.map((group,g)=>`<section class="group"><div class="grouphead"><h3>Суперсет ${g+1}</h3><span>${Math.max(...group.map(e=>e.sets))} круга · отдых 90 с</span></div><p class="sub">Чередуй упражнения в каждом круге, затем отдыхай.</p><p class="sub" data-group-status="${g}"></p>${group.map(e=>{const info=exercises[e.id];return `<article class="card" data-exercise="${e.id}"><div class="cardhead"><div class="icon">${info.icon}</div><div><h4>${e.name}</h4><div class="sub">${e.sets} подхода · ${e.timed?'Время: ':''}${e.reps}</div><p class="load">${loadLabel(e)}</p></div></div><details class="details"><summary>Как выполнять · техника и ошибки</summary><ol>${info.steps.map(s=>`<li>${s}</li>`).join('')}</ol><p class="caution">⚠️ ${info.warning}</p></details><a class="video" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/results?search_query=${encodeURIComponent(info.q)}">▶ Найти видеодемонстрацию ↗</a><div class="checks">${setNumbers(e).map(n=>`<label class="check"><input type="checkbox" aria-label="${e.name}: подход ${n}" data-id="${e.id}" data-n="${n}" ${p[e.id+'-'+n]?'checked':''}><span>Подход ${n}</span></label>`).join('')}</div><p class="sub completion" data-exercise-status="${e.id}"></p></article>`}).join('')}<button class="rest" data-rest="90">⏱ Запустить отдых · 90 секунд</button></section>`).join('');
 $('status').textContent='';updateProgress();renderHistory();
}
function updateProgress(){
 const p=progress(),n=doneSets(p),total=totalSets();
 $('progress').textContent=n+'/'+total;$('bar').style.width=(n/total*100)+'%';
 program().groups.forEach((group,g)=>{const done=doneSets(p,group),count=group.reduce((n,e)=>n+e.sets,0);document.querySelector(`[data-group-status="${g}"]`).textContent=done===count?'✓ Суперсет завершён':`Выполнено ${done}/${count} подходов`});
 entries().forEach(e=>{const done=doneSets(p,[e]);document.querySelector(`[data-exercise-status="${e.id}"]`).textContent=done===e.sets?'✓ Упражнение завершено':`Выполнено ${done}/${e.sets}`});
 if(view==='workout')$('status').textContent=n===total?'Все подходы выполнены! Сохрани результат кнопкой «Завершить тренировку».':'';
}
$('sets').addEventListener('change',e=>{if(!e.target.matches('input[type=checkbox]'))return;const p=progress();p[e.target.dataset.id+'-'+e.target.dataset.n]=e.target.checked;save(p);updateProgress()});
$('sets').addEventListener('click',e=>{if(e.target.matches('[data-rest]'))startTimer()});
document.querySelectorAll('[data-day]').forEach(b=>b.addEventListener('click',()=>{day=b.dataset.day;view='preparation';render();$('prep-title').focus()}));
$('back').onclick=()=>{view='selection';render();document.querySelector(`[data-day="${day}"]`).focus()};
$('start').onclick=()=>{localStorage.setItem(sessionKey(),JSON.stringify({version:2,sets:entries()[0].sets}));localStorage.setItem('homeworkout-last-day',day);view='workout';render();$('day-title').focus()};
$('reset').onclick=()=>{if(confirm('Сбросить отметки тренировки '+program().label+'?')){localStorage.removeItem(key());localStorage.removeItem(sessionKey());render()}};
$('finish').onclick=()=>{
 const n=doneSets(),total=totalSets();
 if(n<total&&!confirm(`Отмечено ${n} из ${total} подходов. Всё равно завершить тренировку?`))return;
 const history=historyRecords();
 if(!Array.isArray(history)){$('status').textContent='Не удалось прочитать историю. Существующие записи и отметки сохранены; новая запись не добавлена.';return}
 const record={day,date:new Date().toISOString(),done:n,total,sets:entries()[0].sets,version:2,progress:progress()};
 localStorage.setItem('homeworkout-history',JSON.stringify([record,...history]));
 localStorage.removeItem(key());localStorage.removeItem(sessionKey());view='preparation';render();$('status').textContent='Тренировка сохранена! Отличная работа.';
};
function renderHistory(){
 const h=historyRecords();$('history').replaceChildren();
 if(!Array.isArray(h)||!h.length){$('history').textContent=Array.isArray(h)?'Пока нет завершённых тренировок.':'Не удалось прочитать историю. Сохранённые данные не изменены.';return}
 h.slice(0,6).forEach(x=>{const row=document.createElement('div');if(!x||typeof x!=='object'){row.textContent='Не удалось отобразить запись. Сохранённые данные не изменены.'}else{const label=workouts[x.day]?.label||x.day;const total=x.total??(x.sets?x.sets*6:12);row.textContent=`✓ ${new Date(x.date).toLocaleDateString('ru-RU')} · Тренировка ${label} · ${x.done}/${total} подходов (${x.sets??2} на упражнение)`}$('history').append(row)});
}
function drawTime(){const m=String(Math.floor(seconds/60)).padStart(2,'0'),s=String(seconds%60).padStart(2,'0');$('time').textContent=m+':'+s}
function startTimer(){clearInterval(timerId);seconds=90;running=true;$('timer').hidden=false;$('pause').textContent='Пауза';drawTime();timerId=setInterval(()=>{if(running&&seconds>0){seconds--;drawTime()}if(seconds===0){clearInterval(timerId);running=false;$('pause').textContent='Готово';if(navigator.vibrate)navigator.vibrate([180,100,180])}},1000)}
$('pause').onclick=()=>{running=!running;$('pause').textContent=running?'Пауза':'Продолжить'};
$('dismiss').onclick=()=>{clearInterval(timerId);$('timer').hidden=true};
// Legacy progress maps remain intact. The additional third set starts unchecked.
const lastDay=localStorage.getItem('homeworkout-last-day');
if(workouts[lastDay])day=lastDay;
if(!hasSession()){const other=day==='A'?'B':'A';day=other;if(!hasSession())day=workouts[lastDay]?lastDay:'A'}
if(hasSession())view='preparation';
render();
