# TouchSliderJS
small library for mobile touchslider

## [live demo here](https://touchsliderjs.netlify.app/) (if you are on pc, open dev options and switch to phone view to see it in action) ;) 

### Why?
- I didn't find good and simple library
- I wanted a good project
- I wanted to create this with plain JS and CSS

### How to use it?
#### add this to your html head:

    <script src="touchslider.js" defer></script>


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
    sliderChangeMilis(1); // How many milis will one step sleep
    sliderChangeLoopN(70); // How many steps
    sliderChangeType('nonLinear'); // Type of slide (linear, nonLinear)

##### and then include file in html head after touchslider.js:
    <script src="touchslider.js" defer></script>
    <script src='myFile.js' defer></script>