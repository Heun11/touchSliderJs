var sliderId1 = sliderCreateNew("slider"); // id of slider div
sliderChangeParam(sliderId1, 'milis', 1);
sliderChangeParam(sliderId1, 'loop_n', 80);
sliderChangeParam(sliderId1, 'opacity', true);
sliderChangeParam(sliderId1, 'type', 'nonLinear');
sliderChangeParam(sliderId1, 'mode', 'manual');

var sliderId2 = sliderCreateNew("sliderNew"); // id of slider div
sliderChangeParam(sliderId2, 'milis', 1);
sliderChangeParam(sliderId2, 'loop_n', 80);
sliderChangeParam(sliderId2, 'opacity', true);
sliderChangeParam(sliderId2, 'type', 'nonLinear');
sliderChangeParam(sliderId2, 'mode', 'auto');

sliderSetup();
