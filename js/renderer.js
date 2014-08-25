var width    = 1000;
var height   = 500;

// The Physics.js code that takes our abstract objects and draws them
// on a canvas.
function renderer() {
  return Physics.renderer('our-canvas', {
    el     : 'viewport',
    width  : width,
    height : height,
    meta   : false,
    styles : {
      'circle' : {
        strokeStyle : 'hsla(60, 37%, 57%, 1)',
        lineWidth : 1,
        fillStyle : 'hsla(60, 37%, 57%, 0.8)',
        angleIndicator: 'hsla(60, 37%, 17%, 0.4)'
      }
    }
  });
}
