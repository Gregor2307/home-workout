// Run with: node --test tests/logic.test.cjs
// Uses an in-memory DOM/storage substitute; never launches a browser.
const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../script.js'),'utf8');

function app(seed={}){
 const storage=new Map(Object.entries(seed));
 const nodes=new Map();
 function node(id){
  if(!nodes.has(id))nodes.set(id,{textContent:'',innerHTML:'',hidden:false,style:{},dataset:{},children:[],handlers:{},classList:{toggle(){}},setAttribute(){},focus(){},addEventListener(type,fn){this.handlers[type]=fn},replaceChildren(){this.children=[];this.textContent=''},append(child){this.children.push(child)}});
  return nodes.get(id);
 }
 const tabs=['A','B'].map(day=>Object.assign(node('tab-'+day),{dataset:{day}}));
 const context=vm.createContext({
  document:{getElementById:node,querySelectorAll:()=>tabs,querySelector:node,createElement:()=>({textContent:''})},
  localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},
  navigator:{},confirm:()=>false,setInterval:()=>1,clearInterval(){},
 });
 vm.runInContext(source,context);
 const run=code=>vm.runInContext(code,context);
 return {run,node,storage,select:day=>{tabs.find(t=>t.dataset.day===day).handlers.click()},check:(id,n,checked=true)=>node('sets').handlers.change({target:{matches:()=>true,dataset:{id,n:String(n)},checked}}),start:()=>node('start').onclick(),finish:()=>node('finish').onclick(),json:k=>JSON.parse(storage.get(k)||'null')};
}

test('program matches required order, sets, repetitions, equipment and loads',()=>{
 const a=app();
 const specs={
  A:[['push',3,'10 повторений','bodyweight'],['row',3,'10–12 на каждую руку','dumbbell',10.5],['squat',3,'10–15 повторений','bodyweight'],['press',3,'8–12 повторений','dumbbell',4.5],['bridge',3,'10–15 повторений','bodyweight'],['deadbug',3,'8–10 на сторону','bodyweight']],
  B:[['rdl',3,'10–12 повторений','barbell',20.5],['floor',3,'8–12 повторений','dumbbell',7.5],['band',3,'10–15 повторений','band'],['calf',3,'12–20 повторений','bodyweight'],['curl',3,'10–12 повторений','barbell',8.5],['side',3,'20–30 секунд на сторону','bodyweight']],
 };
 for(const day of ['A','B']){
  a.select(day);
  const actual=JSON.parse(a.run('JSON.stringify(entries().map(e=>[e.id,e.sets,e.reps,e.equipment,...(e.weight?[e.weight]:[])]))'));
  assert.deepEqual(actual,specs[day]);assert.equal(a.run('totalSets()'),18);
  assert.deepEqual(JSON.parse(a.run('JSON.stringify(program().groups.map(g=>g.length))')),[2,2,2]);
  assert.equal((a.node('sets').innerHTML.match(/type="checkbox"/g)||[]).length,18);
 }
 a.select('A');assert.match(a.node('prep-equipment').innerHTML,/10,5 кг/);assert.match(a.node('prep-equipment').innerHTML,/2 × 4,5 кг/);assert.match(a.node('prep-equipment').innerHTML,/НЕ НУЖЕН/);
 a.select('B');for(const value of ['20,5 кг','2 × 7,5 кг','8,5 кг','5–15 кг','Original FitTools FT-EX-208-13','гриф: НУЖЕН'])assert.ok(a.node('prep-equipment').innerHTML.includes(value));
 assert.match(a.run("loadLabel(entries()[0])"),/всего \(гриф и блины\)/);
 assert.equal(a.run("exercises.rdl.q"),'barbell romanian deadlift proper form');assert.equal(a.run("exercises.curl.q"),'standing barbell biceps curl proper form');
});

test('preparation and return to selection do not create or discard progress',()=>{
 const a=app();assert.equal(a.node('selection').hidden,false);a.select('A');assert.equal(a.node('preparation').hidden,false);assert.equal(a.storage.size,0);
 a.node('back').onclick();assert.equal(a.node('selection').hidden,false);a.select('B');a.start();assert.equal(a.node('workout').hidden,false);assert.ok(a.json('homeworkout-session-B'));
 const restored=app(Object.fromEntries(a.storage));assert.equal(restored.node('preparation').hidden,false);assert.match(restored.node('start').textContent,/Продолжить тренировку Б/);
});

test('both workouts finish at 18, with three rounds per superset and saved snapshots',()=>{
 for(const day of ['A','B']){
  const a=app();a.select(day);a.start();let n=0;
  const groups=JSON.parse(a.run('JSON.stringify(program().groups.map(g=>g.map(e=>e.id)))'));
  for(const [g,ids] of groups.entries()){
   for(let s=1;s<=3;s++)for(const id of ids){a.check(id,s);n++;assert.equal(a.node('progress').textContent,`${n}/18`)}
   assert.equal(a.node(`[data-group-status="${g}"]`).textContent,'✓ Суперсет завершён');
   for(const id of ids)assert.equal(a.node(`[data-exercise-status="${id}"]`).textContent,'✓ Упражнение завершено');
   if(n===12){a.finish();assert.equal(a.json('homeworkout-history'),null)}
  }
  assert.equal(a.node('bar').style.width,'100%');assert.match(a.node('status').textContent,/Все подходы выполнены/);a.finish();
  const h=a.json('homeworkout-history');assert.equal(h[0].done,18);assert.equal(h[0].total,18);assert.equal(h[0].sets,3);assert.equal(Object.keys(h[0].progress).length,18);assert.equal(a.json(`homeworkout-progress-${day}`),null);
 }
});

test('legacy history stays at 12; old progress restores with third sets unchecked',()=>{
 const history=Array.from({length:35},()=>({day:'A',date:'2026-09-01T12:00:00Z',done:12}));
 const progress={'push-1':true,'row-1':true,'row-2':true,'unknown-9':true};
 const a=app({'homeworkout-history':JSON.stringify(history),'homeworkout-progress-A':JSON.stringify(progress)});
 assert.match(a.node('history').children[0].textContent,/12\/12 подходов \(2 на упражнение\)/);assert.match(a.node('resume-note').textContent,/Старые отметки сохранены/);a.start();assert.equal(a.node('progress').textContent,'3/18');
 assert.equal(a.run('entries().some(e=>progress()[e.id+"-3"])'),false);a.check('push',3);
 const restored=app(Object.fromEntries(a.storage));restored.start();assert.equal(restored.node('progress').textContent,'4/18');restored.run('confirm=()=>true');restored.finish();
 const saved=restored.json('homeworkout-history');assert.equal(saved.length,36);assert.deepEqual(saved.slice(1),history);assert.equal(saved[0].done,4);assert.equal(saved[0].total,18);
});

test('switching days and resetting one workout preserves the other and history',()=>{
 const a=app();a.select('A');a.start();a.check('push',1);a.select('B');a.start();a.check('rdl',1);a.check('floor',1);a.select('A');a.start();assert.equal(a.node('progress').textContent,'1/18');
 a.run('confirm=()=>true');a.node('reset').onclick();assert.equal(a.node('progress').textContent,'0/18');a.select('B');a.start();assert.equal(a.node('progress').textContent,'2/18');
 const restored=app(Object.fromEntries(a.storage));assert.match(restored.node('start').textContent,/Продолжить тренировку Б/);restored.start();assert.equal(restored.node('progress').textContent,'2/18');
});

test('damaged history is not overwritten and saved progress survives failed completion',()=>{
 for(const history of ['broken-json','{}','null']){
  const a=app({'homeworkout-history':history});a.select('A');a.start();a.check('push',1);a.run('confirm=()=>true');a.finish();assert.match(a.node('status').textContent,/Не удалось прочитать историю/);assert.equal(a.storage.get('homeworkout-history'),history);assert.equal(a.json('homeworkout-progress-A')['push-1'],true);
 }
 for(const progress of ['broken-json','null','[]']){const a=app({'homeworkout-progress-A':progress});a.select('A');a.start();assert.equal(a.node('progress').textContent,'0/18')}
});

test('timer controls retain the 90-second start, pause, restart and dismissal',()=>{
 const a=app();a.run('startTimer()');assert.equal(a.node('time').textContent,'01:30');assert.equal(a.node('timer').hidden,false);a.node('pause').onclick();assert.equal(a.run('running'),false);a.node('pause').onclick();assert.equal(a.run('running'),true);a.run('seconds=20;startTimer()');assert.equal(a.node('time').textContent,'01:30');a.node('dismiss').onclick();assert.equal(a.node('timer').hidden,true);
});
