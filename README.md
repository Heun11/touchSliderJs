# TouchSliderJS
Small JS&CSS TouchSlider library for touchscreen devices 📱  

## [live demo here 😃](https://touchsliderjs.netlify.app/) 
### IMPORTANT 🧐
> If you are on pc, open dev options and switch to phone view to see it in action 😉

> If you want to change width or height of slider, you must change both .slide and .slider 😉

> It may be slow on some slower systems 😔

### Why? 🤔
- I didn't find good and simple library
- I wanted a good project
- I wanted to create this with plain JS and CSS

### How to use it?
#### add this to your html head:

    <script src="https://touchsliderjs.netlify.app/touchslider.js"></script>


#### then create this div structure in your html body:
    <div class="slider" id="slider">
        <div class="slide">
            <h1>Slide 1</h1>
        </div>
        <div class="slide">
            <h1>Slide 2</h1>
        </div>
        <div class="slide">
            <h1>Slide 3</h1>
        </div>
        <div class="slide">
            <h1>Slide 4</h1>
        </div>
    </div>

#### then create new JS file and add this:
    var sliderId = sliderCreateNew("slider"); // id of slider div

    sliderChangeParam(sliderId, 'milis', 1); // How many milis will one step sleep (int)
    sliderChangeParam(sliderId, 'loop_n', 80); // How many steps (int)
    sliderChangeParam(sliderId, 'opacity', true); // Slider opacity change (bool)
    sliderChangeParam(sliderId, 'type', 'nonLinear'); // Type of slide (linear, nonLinear) (string)
    sliderChangeParam(sliderId, 'mode', 'auto'); // style of slider (auto, manual) (string)

    sliderSetup();  // Initialize all sliders (put after sliders are created)


##### and then include file in html head after touchslider.js:
    <script src="https://touchsliderjs.netlify.app/touchslider.js"></script>
    <script src='myFile.js' defer></script>

### TODO  🫡
    [x] add parseFloat to auto moving functions
    [x] add opacity to manual mode
    [x] add non-linearity to manual mode
    [x] add support for multiple sliders
    [] add automatic move when dont touched for some time
    [] add circles to show slide count
