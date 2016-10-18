console.log("+~+~ p5.vr ~+~+");

p5.prototype._duplicateCanvas
p5.prototype._originalCanvas

p5.prototype.createStereoCanvas = function(renderer, eyeBuffer){
  var eyeBuffer = (typeof eyeBuffer !== 'undefined') ?  eyeBuffer : 0;

  createCanvas((windowWidth/2)-eyeBuffer, windowHeight, renderer);

  _originalCanvas = document.getElementById('defaultCanvas0');

  _duplicateCanvas = document.createElement('canvas');
  _duplicateCanvas.id = "duplicateCanvas";
  document.body.appendChild(_duplicateCanvas);

  var dc = document.querySelector("#duplicateCanvas");
  dc.width = _originalCanvas.width;
  dc.height = _originalCanvas.height;
  dc.style.position = 'absolute';
  dc.style.top = 0;
  dc.style.left = (_originalCanvas.width/2) + eyeBuffer*2;
  dc.style.width = _originalCanvas.width/2;
  dc.style.height = _originalCanvas.height/2;

  _duplicateCanvas.getContext('2d').drawImage(_originalCanvas, 0, 0);

}

p5.prototype.updateStereo = function(){
  _duplicateCanvas.getContext('2d').drawImage(_originalCanvas, 0, 0);
}

p5.prototype.vrY = function(){
  var rotation = radians(rotationY) + HALF_PI; // +half+pi so it's 'infront of you'
  var x = map(rotation, 0,PI, -PI, PI);
  return x;
}

p5.prototype._compassdir = false;
  window.addEventListener('deviceorientation', function(e) {
      _compassdir = e.webkitCompassHeading;
  })

p5.prototype.vrX = function(){
  if(_compassdir == undefined){
    return false
  }
  return radians(_compassdir);
}

p5.prototype.VRorbitControl = function(){

  // rotateZ(radians(rotationZ));
  this.rotateX( vrY() );
  this.rotateY( vrX() );

  return this;
};


p5.prototype.orientationLock = function(){
//... coming soon?
}


