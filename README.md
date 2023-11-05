# TouchSliderJS
Small JS&CSS TouchSlider library for touchscreen devices 📱  

## [live demo here 😃](https://touchsliderjs.netlify.app/) 
### IMPORTANT 🧐
> If you are on pc, open dev options and switch to phone view to see it in action 😉

> If you want to change width or height of slider, you must change both .slide and #slider 😉

> It may be slow on some old systems 😔

### Why? 🤔
- I didn't find good and simple library
- I wanted a good project
- I wanted to create this with plain JS and CSS

### How to use it?
#### add this to your html head:

    <script src="https://touchsliderjs.netlify.app/touchslider.js" defer></script>


#### then create this div structure in your html body:
    <div id="slider">
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

#### if you want to change type or speed create JS file and add this:
    sliderChangeMilis(1); // How many milis will one step sleep (int)
    sliderChangeLoopN(70); // How many steps (int)
    sliderChangeOpacity(false); // Slider opacity change (bool)
    sliderChangeType('nonLinear'); // Type of slide (linear, nonLinear) (string)
    sliderChangeMode('manual') // style of slider (auto, manual) (string)

##### and then include file in html head after touchslider.js:
    <script src="https://touchsliderjs.netlify.app/touchslider.js" defer></script>
    <script src='myFile.js' defer></script>

### TODO  🫡
    [x] add parseFloat to auto moving functions
    [x] add opacity to manual mode
    [x] add non-linearity to manual mode
    [] add support for multiple sliders
    [] add circles to show slide count
