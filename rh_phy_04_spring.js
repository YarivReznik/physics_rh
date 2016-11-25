particle_rh = function (id,pos, v, a) {
  if(id === undefined){
    return
  }

  var center = [window.innerWidth/2,window.innerHeight/2];
  var drag = 0.1;
  var k = drag/1000;
  var particle = {};
  particle.id = id ;
  particle.d = {
    pos: pos || [0, 0],
    v: v || [0, 0],
    a: a || [0, 0],
  };
  particle.setDrag = function(num){
    if(num < 0 || num >1){
      return
    }
    drag = num;
  };

  particle.active = true;
  particle.addV = function (vec) {
    particle.d.pos[0] += vec[0] || 0;
    particle.d.pos[1] += vec[1] || 0;
  };
  particle.applyDrag = function(){
    particle.d.v[0] =1;
  }
  particle.update = function(){
    //apply drag
    particle.d.v[0] = particle.d.v[0] - particle.d.v[0]*drag;
    particle.d.v[1] = particle.d.v[1] - particle.d.v[1]*drag;
    particle.addV(particle.d.v);
    //apply spring from center
    var vect_from_center = [particle.d.pos[0]-center[0],particle.d.pos[1]-center[1]];
    var abs_vect_from_center = [Math.abs(particle.d.pos[0]-center[0]),Math.abs(particle.d.pos[1]-center[1])];
    var a = [abs_vect_from_center[0]*k,abs_vect_from_center[1]*k];
    particle.d.v[0] = particle.d.v[0] - vect_from_center[0]*a[0];
    particle.d.v[1] = particle.d.v[1] - vect_from_center[1]*a[1];
    particle.addV(particle.d.v);


  };
  return particle;
};
var NUM_OF_PARTICELS = 3365;
var center_x = window.innerWidth/2;
var center_y = window.innerHeight/2;

var dum_arr = new Array(NUM_OF_PARTICELS);
var particles = {};
var spread = 550.1;
_.each(dum_arr,function(val,key){
  particles[key] = particle_rh(key,[_.random(-spread,spread)+center_x, _.random(-spread,spread)+center_y]);
  particles[key].d.v = [_.random(-22.1,22.1),_.random(-22.1,22.1)];

});

console.log(particles);
window.onload = function() {
  var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

  update();

  var max =20000;
  function update() {
    if(max <0){
      eeee
    }
    max = max -1;
    ctx.clearRect(0, 0, width, height);

    // animation goes here
    _.each(particles,function(particle,key){
      ctx.beginPath();
      ctx.arc(particle.d.pos[0],particle.d.pos[1],5,0,2*Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(width/2,height/2);
      ctx.lineTo(particle.d.pos[0],particle.d.pos[1]);
      ctx.stroke();
      particle.update();
    })

    requestAnimationFrame(update);
  }
};