let head = document.getElementsByTagName('HEAD')[0];
let link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://touchsliderjs.netlify.app/touchslider.css';
// link.href = 'touchslider.css';
head.appendChild(link);

var sliders = [];

const sliderCreateNew = function(sliderId)
{
  sliders.push(
    {
      "id":sliderId,
      "slider":document.getElementById(sliderId),
      "slides":document.getElementById(sliderId).querySelectorAll('.slide'),
      "pressed":false,
      "startX":0,
      "endX":0,
      "sliderC":0,
      "threshold":80,
      "timerId":null,
      "moving":false,
      "sx":0,
      "first":true,
      "manual_barier":18,
      "canvasDiv":document.getElementById(sliderId).querySelector('.slider-canvas'),
      "canvas":document.getElementById(sliderId).querySelector('.slider-canvas').querySelector('canvas'),
      "ctx":document.getElementById(sliderId).querySelector('.slider-canvas').querySelector('canvas').getContext('2d'),
      "visual_counter_image0_img":new Image(),
      "visual_counter_image1_img":new Image(),

      "mode":'auto',
      "milis":'milis',
      "loop_n":50,
      "type":'linear',
      "opacity":true,
      "moveafter":5000,
      "movedir":-1,
      "visual_counter":true,
      "visual_counter_color0":'#fafafa',
      "visual_counter_color1":'#bac',
      "visual_counter_outline":true,
      "visual_counter_color_out":'#1a1a1a',
      "visual_counter_type":'color',
      "visual_counter_image0":"./visual_counter0.png",
      "visual_counter_image1":"./visual_counter1.png",
    }
  );
  return sliders.length-1;
}

const updateVisualCounter = function(slider)
{
  if(slider.visual_counter){
    slider.canvas.style.width = '100%';
    slider.canvas.style.height = '100%';

    slider.canvas.width = slider.canvas.offsetWidth;
    slider.canvas.height = slider.canvas.offsetHeight;

    slider.ctx.clearRect(0,0,slider.canvas.width,slider.canvas.height);
    // slider.ctx.fillRect(0,0,slider.canvas.width,slider.canvas.height);

    var r = slider.canvas.height/2-2;
    var d = (slider.canvas.width-r*2*slider.slides.length)/(slider.slides.length-1);

    for(let i=0;i<slider.slides.length;i++){
      if(slider.visual_counter_type=='color'){
        slider.ctx.beginPath();
        slider.ctx.arc(r + (d+r*2)*i+1, r+1, r-2, 0, 2 * Math.PI);
        slider.ctx.fillStyle = slider.visual_counter_color0;
        if(slider.sliderC==i){
          slider.ctx.fillStyle = slider.visual_counter_color1;
        }
        slider.ctx.fill();
        if(slider.visual_counter_outline){
          slider.ctx.strokeStyle = slider.visual_counter_color_out;
          slider.ctx.stroke();
        }
      }
      if(slider.visual_counter_type=='image'){
        if(slider.sliderC==i){
          slider.ctx.drawImage(slider.visual_counter_image1_img, (d+r*2)*i ,2 ,r*2-1 ,r*2-1);
        }
        else{
          slider.ctx.drawImage(slider.visual_counter_image0_img, (d+r*2)*i ,2 ,r*2-1 ,r*2-1);
        }
      }
    }
  }
  else{
    slider.canvas.style.display = 'none';
  }
}

var updatingCount = 1;

const updateVisualCounterASAP = function(slider)
{
  var tick = function()
  {
    updateVisualCounter(slider);
    if(updatingCount<100){
      updatingCount+=1;
      setTimeout(tick, updatingCount);
    }
  }
  setTimeout(tick, updatingCount);
}

const timerStart = function(slider)
{
  var tick = function()
  {
    slider.endX = slider.movedir*(slider.threshold+1)
    sliderChangeAuto(slider, slider.endX);
    slider.timerId = null;
    timerStart(slider);
  }
  if(slider.timerId==null && slider.moveafter>0){
    slider.timerId = setTimeout(tick, slider.moveafter);
  }
}

const timerClear = function(slider)
{
  if(slider.timerId!=null){
    clearTimeout(slider.timerId);
    slider.timerId = null;
  }
}

const sliderSetup = function()
{
  sliders.forEach(slider=>{
    slider.slides.forEach(s=>{
      s.style.right = "100%";
    });
    slider.slides[0].style.right = "0%";

    slider.visual_counter_image0_img.src = slider.visual_counter_image0;
    slider.visual_counter_image1_img.src = slider.visual_counter_image1;
    updateVisualCounterASAP(slider);

    timerStart(slider);

    slider.slider.addEventListener('touchstart', function (e) {
      slider.pressed = true;
      slider.startX = e.changedTouches[0].pageX;

      timerClear(slider);
    });
  
    slider.slider.addEventListener('touchmove', function (e) {  
      slider.sx = e.changedTouches[0].pageX;
      if(slider.mode=='manual' && !slider.moving){
        sliderChangeManual(slider, true, slider.startX, slider.sx);
        slider.first = false;
      }
    }); 
  
    slider.slider.addEventListener('touchcancel', function (e) {
      slider.pressed = false;

      timerStart(slider);
    });
  
    slider.slider.addEventListener('touchend', function (e) {
      slider.pressed = false;
      slider.endX = e.changedTouches[0].pageX-slider.startX;
      if(slider.mode=='auto'){
        sliderChangeAuto(slider, slider.endX);
      }
      if(slider.mode=='manual' && !slider.moving){
        sliderChangeManual(slider, false, slider.startX, slider.sx);
        slider.first = true;
      }

      timerStart(slider);
    });
  });
}

const sliderChangeParam = function(sliderId, parameter, value)
{
  sliders[sliderId][parameter] = value;
}

const moveLinear = async function(slider, element, dir, milis, num, op)
{
  var full = parseFloat(element.style.right);
  let step = 100/num;
  let os = step/100; 
  if(!slider.opacity){
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

const moveNonLinear = async function(slider, element, dir, milis, num, op)
{
  var full = parseFloat(element.style.right);
  var full_op = parseFloat(element.style.opacity);
  var n = ((num)*(num+1))/2;
  let x = 100/(n);
  let os = x/100;
  if(!slider.opacity){
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

const move = async function(slider, e, dir, op)
{
  switch (slider.type) {
    case 'nonLinear':
      moveNonLinear(slider, e, dir, slider.milis, slider.loop_n, op);
      break;
    default:
      moveLinear(slider, e, dir, slider.milis, slider.loop_n, op);
      break;
  }
}


const sliderChangeAuto = async function(slider, x)
{
  if(Math.abs(x)<slider.threshold){
    return;
  }

  var prev = slider.sliderC;
  if(x>0){
    slider.sliderC -= 1;
    if(slider.sliderC<0){
      slider.sliderC = slider.slides.length-1;
    }
    // console.log("lavo");
    slider.slides[prev].style.right = "0%";
    if(slider.opacity){
      slider.slides[prev].style.opacity = "1";
    }
    move(slider, slider.slides[prev], -1, -1);
    slider.slides[slider.sliderC].style.right = "100%";
    if(slider.opacity){
      slider.slides[slider.sliderC].style.opacity = "0";
    }
    move(slider, slider.slides[slider.sliderC], -1, 1);
  }
  if(x<0){
    slider.sliderC += 1;
    if(slider.sliderC>slider.slides.length-1){
      slider.sliderC = 0;
    }
    // console.log("pravo");
    slider.slides[prev].style.right = "0%";
    if(slider.opacity){
      slider.slides[prev].style.opacity = "1";
    }
    move(slider, slider.slides[prev], 1, -1);
    slider.slides[slider.sliderC].style.right = "-100%";
    if(slider.opacity){
      slider.slides[slider.sliderC].style.opacity = "0";
    }
    move(slider, slider.slides[slider.sliderC], 1, 1);
  }
  
  updateVisualCounter(slider);
}

const moveManualLinear = async function(slider, element, dir, milis, num, op)
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
  if(!slider.opacity){
    os = 0;
  }
  for(let i=0;i<num;i++){
    full += step*dir;
    prev_op += os*op;
    element.style.right = (full+"%");
    if(slider.opacity){
      element.style.opacity = (prev_op);
    }
    await new Promise(r => setTimeout(r, milis));
  }
  slider.moving = false;
}

const moveManualNonLinear = async function(slider, element, dir, milis, num, op)
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
  if(!slider.opacity){
    os = 0;
  }
  for(let i=1;i<=num;i++){
    full += x*i*dir;
    element.style.right = (full+"%");
    full_op += os*i*op;
    element.style.opacity = (full_op);
    await new Promise(r => setTimeout(r, milis));
  }
  slider.moving = false;
}

const moveManual = async function(slider, e, dir, op)
{
  switch (slider.type) {
    case 'nonLinear':
      moveManualNonLinear(slider, e, dir, slider.milis, slider.loop_n, op);
      break;
    default:
      moveManualLinear(slider, e, dir, slider.milis, slider.loop_n, op);
      break;
  }
}

const sliderChangeManual = async function(slider, press, sx, ax)
{
  let x = sx-ax;


  if(press){
    if(slider.first){
      left = (slider.sliderC<1)?slider.slides.length-1:slider.sliderC-1;
      right = (slider.sliderC>slider.slides.length-2)?0:slider.sliderC+1;
      
      slider.slides[left].style.right = "100%";
      slider.slides[slider.sliderC].style.right = "0%";
      slider.slides[right].style.right = "-100%";

      if(slider.opacity){
        slider.slides[left].style.opacity = "0";
        slider.slides[slider.sliderC].style.opacity = "1";
        slider.slides[right].style.opacity = "0";
      }
    }
    let step = x/8;
    
    slider.slides[left].style.right = 100+step+"%";
    slider.slides[slider.sliderC].style.right = 0+step+"%";
    slider.slides[right].style.right = -100+step+"%";
    if(slider.opacity){
      slider.slides[left].style.opacity = (Math.abs(step)/100);
      slider.slides[right].style.opacity = (Math.abs(step)/100);
    }
  }
  else{
    slider.moving = true;
    
    left = (slider.sliderC<1)?slider.slides.length-1:slider.sliderC-1;
    right = (slider.sliderC>slider.slides.length-2)?0:slider.sliderC+1;

    if(parseFloat(slider.slides[slider.sliderC].style.right)>slider.manual_barier){
      moveManual(slider, slider.slides[slider.sliderC], 1, -1);
      moveManual(slider, slider.slides[right], 1, 1);

      slider.sliderC += 1;
      if(slider.sliderC>slider.slides.length-1){
        slider.sliderC = 0;
      }
    }
    else if(parseFloat(slider.slides[slider.sliderC].style.right)<-slider.manual_barier){
      moveManual(slider, slider.slides[slider.sliderC], -1, -1);
      moveManual(slider, slider.slides[left], -1, 1);

      slider.sliderC -= 1;
      if(slider.sliderC<0){
        slider.sliderC = slider.slides.length-1;
      }
    }
    else{
      if(parseFloat(slider.slides[slider.sliderC].style.right)>0){
        moveManual(slider, slider.slides[left], 1,-1);
        moveManual(slider, slider.slides[slider.sliderC], -1, 1);
        moveManual(slider, slider.slides[right], -1, -1);
      }
      if(parseFloat(slider.slides[slider.sliderC].style.right)<0){
        moveManual(slider, slider.slides[left], 1, -1);
        moveManual(slider, slider.slides[slider.sliderC], 1, 1);
        moveManual(slider, slider.slides[right], -1, -1);
      }
    }
  }
  
  updateVisualCounter(slider);
}
