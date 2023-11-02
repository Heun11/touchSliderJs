let head = document.getElementsByTagName('HEAD')[0];
let link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = './touchslider.css';
head.appendChild(link);

const slider = document.getElementById('slider');
var pressed = false;
var startX = 0;
var trashold = 80;
var sliderC = 0;
var slides = document.querySelectorAll('.slide');

// changable parameters
var slider_milis = 1;
var slider_loop_n = 50;
var slider_type = 'linear'; // linear / nonLinear
var slider_opacity = true;

const sliderChangeMilis = function(milis){
  slider_milis = milis;
}

const sliderChangeLoopN = function(n){
  slider_loop_n = n;
}

const sliderChangeType = function(type){
  slider_type = type;
}

const sliderChangeOpacity = function(bool){
  slider_opacity = bool;
}

slider.addEventListener('touchstart', function (e) {
    pressed = true;
    startX = e.changedTouches[0].pageX;
}); 

slider.addEventListener('touchcancel', function (e) {
    pressed = false;
});

slider.addEventListener('touchend', function (e) {
    pressed = false;
    sliderChange(e.changedTouches[0].pageX-startX);
});

const moveLinear = async function(element, dir, milis, num, op)
{
    var full = parseInt(element.style.right);
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
    var full = parseInt(element.style.right);
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

const move = async function(e, dir, op){
  switch (slider_type) {
    case 'nonLinear':
      moveNonLinear(e, dir, slider_milis, slider_loop_n, op);
      break;
    default:
      moveLinear(e, dir, slider_milis, slider_loop_n, op);
      break;
  }
}


const sliderChange = async function(x)
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
        // moveNonLinear(slides[prev], -1, slider_milis, 50);
        move(slides[prev], -1, -1);
        slides[sliderC].style.right = "100%";
        if(slider_opacity){
            slides[sliderC].style.opacity = "0";
        }
        // moveNonLinear(slides[sliderC], -1, slider_milis, 50);
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
        // moveLinear(slides[prev], 1, slider_milis, 50, 2);
        move(slides[prev], 1, -1);
        slides[sliderC].style.right = "-100%";
        if(slider_opacity){
            slides[sliderC].style.opacity = "0";
        }
        // moveLinear(slides[sliderC], 1, slider_milis, 50, 2);
        move(slides[sliderC], 1, 1);
    }

}

const sliderSetup = function(){
  slides.forEach(s=>{
    s.style.right = "100%";
  });
  slides[0].style.right = "0%";
}

sliderSetup();
