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
        <div class="slider-canvas">
            <canvas></canvas>
        </div>
    </div>

#### then create new JS file and add this:
    var sliderId = sliderCreateNew("slider"); // id of slider div

    sliderChangeParam(sliderId, 'milis', 1); // How many milis will one step sleep (int)
    sliderChangeParam(sliderId, 'loop_n', 80); // How many steps (int)
    sliderChangeParam(sliderId, 'opacity', true); // Slider opacity change (bool)
    sliderChangeParam(sliderId, 'type', 'nonLinear'); // Type of slide (linear, nonLinear) (string)
    sliderChangeParam(sliderId, 'mode', 'auto'); // style of slider (auto, manual) (string)
    sliderChangeParam(sliderId, 'moveafter', 8000); // Move to next slide after this milis (int)
    sliderChangeParam(sliderId, 'movedir', -1); // Direction to move after time (-1/1) (int)
    sliderChangeParam(sliderId, 'visual_counter', true); // Show sliderC with circles (bool)
    sliderChangeParam(sliderId, 'visual_counter_color1', '#fafafa'); // Color of current circle (string)
    sliderChangeParam(sliderId, 'visual_counter_color0', '#fafafa'); // Color of other circles (string)
    sliderChangeParam(sliderId, 'visual_counter_outline', true); // Show outline on circles (bool)
    sliderChangeParam(sliderId, 'visual_counter_color_out', '#1f1f1f'); // Color of outline (string)
    sliderChangeParam(sliderId, 'visual_counter_type', 'image'); // type of visual counter ('color', 'image') (string)
    sliderChangeParam(sliderId, 'visual_counter_image1', 'https://touchsliderjs.netlify.app/visual_counter1.png'); // url to image for selected (string)
    sliderChangeParam(sliderId, 'visual_counter_image0', 'https://touchsliderjs.netlify.app/visual_counter0.png'); // url to image for other (string)

    sliderSetup();  // Initialize all sliders (put after sliders are created)


##### and then include file in html head after touchslider.js:
    <script src="https://touchsliderjs.netlify.app/touchslider.js"></script>
    <script src='myFile.js' defer></script>

### Hope you will like it! (if not, give feedback please)  🫡
