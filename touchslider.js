let head = document.getElementsByTagName('HEAD')[0];
let link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://touchsliderjs.netlify.app/touchslider.css';
// link.href = 'touchslider.css';
head.appendChild(link);

const slider = document.getElementById('slider');
var pressed = false;
var startX = 0;
var endX = 0;
var trashold = 80;
var sliderC = 0;
var slides = document.querySelectorAll('.slide');

var sx = 0;
var first = true;
var manual_barier = 18;

// changable parameters
var slider_mode = 'auto' // manual / auto(ma iba milis, loopN, opacity)
var slider_milis = 1;
var slider_loop_n = 50;
var slider_type = 'linear'; // linear / nonLinear
var slider_opacity = true;

const sliderChangeMode = function(mode)
{
  slider_mode = mode;
}

const sliderChangeMilis = function(milis)
{
  slider_milis = milis;
}

const sliderChangeLoopN = function(n)
{
  slider_loop_n = n;
}

const sliderChangeType = function(type)
{
  slider_type = type;
}

const sliderChangeOpacity = function(bool)
{
  slider_opacity = bool;
}

slider.addEventListener('touchstart', function (e) {
  pressed = true;
  startX = e.changedTouches[0].pageX;
});

slider.addEventListener('touchmove', function (e) {  
  sx = e.changedTouches[0].pageX;
  if(slider_mode=='manual'){
    sliderChangeManual(true, startX, sx);
    first = false;
  }
}); 

slider.addEventListener('touchcancel', function (e) {
  pressed = false;
});

slider.addEventListener('touchend', function (e) {
  pressed = false;
  endX = e.changedTouches[0].pageX-startX;
  if(slider_mode=='auto'){
    sliderChangeAuto(endX);
  }
  if(slider_mode=='manual'){
    sliderChangeManual(false, startX, sx);
    first = true;
  }

});

const moveLinear = async function(element, dir, milis, num, op)
{
  var full = parseFloat(element.style.right);
  let step = 100/num;
  let os = step/100; 
  if(!slider_opacity){
    os = 0;
  }
  for(let i=0;i<num;i++){
    full += step*dir;
    element.style.right = (full+"%");
    let prev_op = parseFloat(element.style.opacity);
    element.style.opacity = (prev_op+(os*op));
    await new Promise(r => setTimeout(r, milis));
  }
}

const moveNonLinear = async function(element, dir, milis, num, op)
{
  var full = parseFloat(element.style.right);
  var full_op = parseFloat(element.style.opacity);
  var n = ((num)*(num+1))/2;
  let x = 100/(n);
  let os = x/100;
  if(!slider_opacity){
    os = 0;
  }
  for(let i=1;i<=num;i++){
    full += x*i*dir;
    element.style.right = (full+"%");
    full_op += os*i*op;
    element.style.opacity = (full_op);
    await new Promise(r => setTimeout(r, milis));
  }
}

const move = async function(e, dir, op)
{
  switch (slider_type) {
    case 'nonLinear':
      moveNonLinear(e, dir, slider_milis, slider_loop_n, op);
      break;
    default:
      moveLinear(e, dir, slider_milis, slider_loop_n, op);
      break;
  }
}


const sliderChangeAuto = async function(x)
{
  if(Math.abs(x)<trashold){
    return;
  }

  var prev = sliderC;
  if(x>0){
    sliderC -= 1;
    if(sliderC<0){
    sliderC = slides.length-1;
    }
    // console.log("lavo");
    slides[prev].style.right = "0%";
    if(slider_opacity){
        slides[prev].style.opacity = "1";
    }
    move(slides[prev], -1, -1);
    slides[sliderC].style.right = "100%";
    if(slider_opacity){
        slides[sliderC].style.opacity = "0";
    }
    move(slides[sliderC], -1, 1);
  }
  if(x<0){
    sliderC += 1;
    if(sliderC>slides.length-1){
    sliderC = 0;
    }
    // console.log("pravo");
    slides[prev].style.right = "0%";
    if(slider_opacity){
        slides[prev].style.opacity = "1";
    }
    move(slides[prev], 1, -1);
    slides[sliderC].style.right = "-100%";
    if(slider_opacity){
        slides[sliderC].style.opacity = "0";
    }
    move(slides[sliderC], 1, 1);
  }
}

const moveManualLinear = async function(element, dir, milis, num, op)
{
  var full = parseFloat(element.style.right);
  let prev_op = parseFloat(element.style.opacity);
  let step;
  if(dir>0){
    step = (100-Math.abs(full))/num;
    if(full<0){
      step = Math.abs(full)/num;
    }
  }
  else{
    step = (Math.abs(full))/num;
    if(full<0){
      step = (100-Math.abs(full))/num;
    }
  }
  let os = step/100; 
  if(!slider_opacity){
    os = 0;
  }
  for(let i=0;i<num;i++){
    full += step*dir;
    prev_op += os*op;
    element.style.right = (full+"%");
    if(slider_opacity){
      element.style.opacity = (prev_op);
    }
    await new Promise(r => setTimeout(r, milis));
  }
}

const moveManualNonLinear = async function(element, dir, milis, num, op)
{
  var full = parseFloat(element.style.right);
  var full_op = parseFloat(element.style.opacity);
  var n = ((num)*(num+1))/2;
  // let x = 100/(n);
  let x;
  if(dir>0){
    x = (100-Math.abs(full))/n;
    if(full<0){
      x = Math.abs(full)/n;
    }
  }
  else{
    x = (Math.abs(full))/n;
    if(full<0){
      x = (100-Math.abs(full))/n;
    }
  }

  let os = x/100;
  if(!slider_opacity){
    os = 0;
  }
  for(let i=1;i<=num;i++){
    full += x*i*dir;
    element.style.right = (full+"%");
    full_op += os*i*op;
    element.style.opacity = (full_op);
    await new Promise(r => setTimeout(r, milis));
  }
}

const moveManual = async function(e, dir, op)
{
  switch (slider_type) {
    case 'nonLinear':
      moveManualNonLinear(e, dir, slider_milis, slider_loop_n, op);
      break;
    default:
      moveManualLinear(e, dir, slider_milis, slider_loop_n, op);
      break;
  }

}

const sliderChangeManual = async function(press, sx, ax)
{
  let x = sx-ax;

  if(press){
    if(first){
      left = (sliderC<1)?slides.length-1:sliderC-1;
      right = (sliderC>slides.length-2)?0:sliderC+1;
      
      slides[left].style.right = "100%";
      slides[sliderC].style.right = "0%";
      slides[right].style.right = "-100%";

      if(slider_opacity){
        slides[left].style.opacity = "0";
        slides[sliderC].style.opacity = "1";
        slides[right].style.opacity = "0";
      }
    }
    let step = x/8;
    
    slides[left].style.right = 100+step+"%";
    slides[sliderC].style.right = 0+step+"%";
    slides[right].style.right = -100+step+"%";
    if(slider_opacity){
      slides[left].style.opacity = (Math.abs(step)/100);
      slides[right].style.opacity = (Math.abs(step)/100);
    }
  }
  else{
    if(parseFloat(slides[sliderC].style.right)>manual_barier){
      moveManual(slides[sliderC], 1, -1);
      moveManual(slides[right], 1, 1);

      sliderC += 1;
      if(sliderC>slides.length-1){
        sliderC = 0;
      }
    }
    else if(parseFloat(slides[sliderC].style.right)<-manual_barier){
      moveManual(slides[sliderC], -1, -1);
      moveManual(slides[left], -1, 1);

      sliderC -= 1;
      if(sliderC<0){
        sliderC = slides.length-1;
      }
    }
    else{
      if(parseFloat(slides[sliderC].style.right)>0){
        moveManual(slides[left], 1,-1);
        moveManual(slides[sliderC], -1, 1);
        moveManual(slides[right], -1, -1);
      }
      if(parseFloat(slides[sliderC].style.right)<0){
        moveManual(slides[left], 1, -1);
        moveManual(slides[sliderC], 1, 1);
        moveManual(slides[right], -1, -1);
      }
    }
  }
}

const sliderSetup = function()
{
  slides.forEach(s=>{
    s.style.right = "100%";
  });
  slides[0].style.right = "0%";
}

sliderSetup();
