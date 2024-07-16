function rand(min, max) {
  return Math.random() * (max - min) + min;
}

var color = ['#AAA','#DDD','#AAA','#DDD','#AAA','#DDD','#AAA','#DDD','#AAA','#DDD', '#AAA', '#DDD'];
// var label = ['', 't', 'l', 'u', 'a', 'V', 'r', 'e', 'd', 'n', 'o', 'W'];
// var label = ['W', 'o', 'n', 'd', 'e', 'r', 'V', 'a', 'u', 'l', 't', ''];
var label = ['W', 'O', 'N', 'D', 'E', 'R', 'V', 'A', 'U', 'L', 'T', ''];
var slices = color.length;
var sliceDeg = 360 / slices;
var deg = rand(0, 360);
var speed = 0;
var slowDownRand = 0;
var ctx = canvas.getContext('2d');
var width = canvas.width; // size
var center = width / 2;   // center
var isStopped = false;
var lock = false;

function deg2rad(deg) {
  return deg * Math.PI / 180;
}

function drawSlice(deg, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(center, center);
  ctx.arc(center, center, width / 2, deg2rad(deg), deg2rad(deg + sliceDeg));
  ctx.lineTo(center, center);
  ctx.fill();
}

function drawText(deg, text) {
  ctx.save();
  ctx.translate(center, center);
  ctx.rotate(deg2rad(deg));
  ctx.textAlign = "right";
  ctx.fillStyle = "#000";
  ctx.font = "bold 1.9em Megatech";
  ctx.fillText(text, 130, 10);
  ctx.restore();
}

function drawImg() {
  ctx.clearRect(0, 0, width, width);
  for(var i = 0; i < slices; i++){
    drawSlice(deg, color[i]);
    drawText(deg + sliceDeg / 2, label[i]);
    deg += sliceDeg;
  }
}

var count = 1;

function anim() {
  deg -= speed;
  deg %= 360;
  
  // count += 1;
  // if (count >= sliceDeg) {
  //   count = 0
  // }
  
  // Increment speed
  if(!isStopped && speed < 3){
    speed = speed + 1 * 0.1;
  }
  // Decrement Speed
  if (isStopped){
    if (!lock){
      lock = true;
      slowDownRand = rand(0.994, 0.998);
    } 
    speed = speed > 0.2 ? speed *= slowDownRand : 0;
  }
  // Stopped!
  if (lock && !speed){
    var ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg); // deg 2 Array Index
    ai = (slices+ai) % slices; // Fix negative index
	
	switch(label[ai]) {
		case "W": return alert("Your word is: Wisdom.");
		case "O": return alert("Your word is: Oasis.");
		case "N": return alert("Your word is: Nirvana.");
		case "D": return alert("Your word is: Dream.");
		case "E": return alert("Your word is: Echantement.");
		case "R": return alert("Your word is: Riches.");
		case "V": return alert("Your word is: Value.");
		case "A": return alert("Your word is: Alchemy.");
		case "U": return alert("Your word is: Unique.");
		case "L": return alert("Your word is: Luxury.");
		case "T": return alert("Your word is: Triumph.");
		
		default: return alert("Greetings from WonderVault.");
	}
//    return alert("You got:\n"+ label[ai] ); // Get Array Item from end Degree
  }

  drawImg();
  window.requestAnimationFrame( anim );
};

anim();

document.getElementById("jsWheel").addEventListener("click", function(){
  isStopped = true;
}, false);
document.getElementById("jsProduct").addEventListener("click", function(){
  window.location.replace("/access/robot-watch/");
});