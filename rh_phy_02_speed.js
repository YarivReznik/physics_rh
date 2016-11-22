particle_rh = function (id,pos, v, a) {
  if(id === undefined){
    return
  }
  var particle = {};
  particle.id = id ;
  particle.d = {
    pos: pos || [0, 0],
    v: v || [0, 0],
    a: a || [0, 0]
  };
  particle.active = true;
  particle.addV = function (vec) {
    particle.d.pos[0] += vec[0] || 0;
    particle.d.pos[1] += vec[1] || 0;
  };
  particle.update = function(){
    particle.addV(particle.d.v);
  }
  return particle;
};
var NUM_OF_PARTICELS = 100;
var center_x = window.innerWidth/2;
var center_y = window.innerHeight/2;

var dum_arr = new Array(NUM_OF_PARTICELS);
var particles = {};
var spread = 0;
_.each(dum_arr,function(val,key){
  particles[key] = particle_rh(key,[_.random(-spread,spread)+center_x, _.random(-spread,spread)+center_y]);
  particles[key].d.v = [_.random(-1.1,1.1),_.random(-1.1,1.1)];
});

console.log(particles);
window.onload = function() {
  var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

  update();


  function update() {
    ctx.clearRect(0, 0, width, height);

    // animation goes here
    _.each(particles,function(particle,key){
      ctx.beginPath();
      ctx.arc(particle.d.pos[0],particle.d.pos[1],5,0,2*Math.PI);
      ctx.stroke();
      particle.update();
    })

    requestAnimationFrame(update);
  }
};