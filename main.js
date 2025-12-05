// Simple Space Dodger - single file JS
const scoreEl = document.getElementById('score');


function reset(){asteroids=[];frames=0;score=0;player.x = width/2 - player.w/2; running=true}


function spawnAsteroid(){
const w = 18 + Math.random()*36;
const x = Math.random() * (width - w);
const speed = 1.6 + Math.random()*2.2 + Math.min(3, score/50);
asteroids.push({x,w,y:-20,speed});
}


function update(){
if(!running) return;
frames++;
if(frames % 45 === 0) spawnAsteroid();
if(frames % 6 === 0) score++;
asteroids.forEach(a=> a.y += a.speed);
asteroids = asteroids.filter(a=> a.y < height + 40);
// collisions
for(let a of asteroids){
if(a.x < player.x + player.w && a.x + a.w > player.x && a.y < player.y + player.h && a.y + a.w > player.y){
running = false; break;
}
}
}


function draw(){
ctx.clearRect(0,0,width,height);
// stars bg
for(let i=0;i<60;i++){ctx.fillStyle = 'rgba(255,255,255,0.03)';ctx.fillRect((i*37)%width,(i*29)%height,1,1)}
// player
ctx.fillStyle = '#6ee7b7';
ctx.fillRect(player.x, player.y, player.w, player.h);
ctx.fillStyle = '#32a89a';
ctx.fillRect(player.x + 6, player.y - 6, player.w-12, 4);
// asteroids
ctx.fillStyle = '#d6d6d6';
for(let a of asteroids){ctx.beginPath();ctx.ellipse(a.x + a.w/2, a.y + a.w/2, a.w/2, a.w/3, 0, 0, Math.PI*2);ctx.fill()}


if(!running){
ctx.fillStyle = 'rgba(0,0,0,0.6)';ctx.fillRect(0,0,width,height);
ctx.fillStyle='#fff';ctx.font='26px sans-serif';ctx.textAlign='center';ctx.fillText('Game Over',width/2,height/2 - 10);
ctx.font='16px sans-serif';ctx.fillText('Press Restart to play again',width/2,height/2 + 20);
}
}


function loop(){ update(); draw(); scoreEl.textContent = score; requestAnimationFrame(loop); }


// input
const keys = {};
window.addEventListener('keydown', e=>{ keys[e.key.toLowerCase()] = true; movePlayer() });
window.addEventListener('keyup', e=>{ keys[e.key.toLowerCase()] = false });


function movePlayer(){ if(keys['arrowleft'] || keys['a']) player.x -= player.speed; if(keys['arrowright'] || keys['d']) player.x += player.speed; if(player.x < 0) player.x = 0; if(player.x + player.w > width) player.x = width - player.w; }


// update continuously movement
setInterval(()=>{ if(running) movePlayer() }, 16);


// restart
document.getElementById('restartBtn').addEventListener('click', ()=>{ reset(); running = true; });


// resize handling (keeps canvas fixed but adapts coords if needed)
window.addEventListener('resize', ()=>{/* no-op for fixed fixed size canvas */});


reset(); loop();
