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

const sliderChangeMilis = function(milis){
  slider_milis = milis;
}

const sliderChangeLoopN = function(n){
  slider_loop_n = n;
}

const sliderChangeType = function(type){
  slider_type = type;
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

const moveLinear = async function(element, dir, milis, num)
{
    let step = 100/num;
    for(let i=0;i<num;i++){
        let prev_pos = parseInt(element.style.right);
        element.style.right = (prev_pos+(step*dir))+"%";
        await new Promise(r => setTimeout(r, milis));
    }
}

const moveNonLinear = async function(element, dir, milis, num)
{
    var full = parseInt(element.style.right);
    var n = ((num)*(num+1))/2;
    for(let i=1;i<=num;i++){
        let x = 100/(n);
        full += x*i*dir;
        element.style.right = (full+"%");
        await new Promise(r => setTimeout(r, milis));
    }
}

const move = async function(e, dir){
  switch (slider_type) {
    case 'nonLinear':
      moveNonLinear(e, dir, slider_milis, slider_loop_n);
      break;
    default:
      moveLinear(e, dir, slider_milis, slider_loop_n);
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
        // moveNonLinear(slides[prev], -1, slider_milis, 50);
        move(slides[prev], -1);
        slides[sliderC].style.right = "100%";
        // moveNonLinear(slides[sliderC], -1, slider_milis, 50);
        move(slides[sliderC], -1);
    }
    if(x<0){
        sliderC += 1;
        if(sliderC>slides.length-1){
        sliderC = 0;
        }
        // console.log("pravo");
        slides[prev].style.right = "0%";
        // moveLinear(slides[prev], 1, slider_milis, 50, 2);
        move(slides[prev], 1);
        slides[sliderC].style.right = "-100%";
        // moveLinear(slides[sliderC], 1, slider_milis, 50, 2);
        move(slides[sliderC], 1);
    }

}

const sliderSetup = function(){
  slides.forEach(s=>{
    s.style.right = "100%";
  });
  slides[0].style.right = "0%";
}

sliderSetup();
