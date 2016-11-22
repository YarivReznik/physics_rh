particle_rh = function (id,pos, vl, ac, drag) {
  if(id === undefined){
    return
  }
  var particle = {};
  particle.id = id ;
  particle.d = {
    pos: pos || [0, 0],
    vl: vl || [0, 0],
    ac: ac || [0, 0],
    drag: drag || 0.1
  };
  particle.active = false;
  particle.addV = function (x, y) {
    particle.pos[0] += x || 0;
    particle.pos[0] += y || 0;
  };

  return particle;
};
var NUM_OF_PARTICELS = 10;
var center_x = window.innerWidth/2;
var center_y = window.innerHeight/2;

var dum_arr = new Array(NUM_OF_PARTICELS);
var particles = {};
_.each(dum_arr,function(val,key){
  particles[key] = particle_rh(key,[_.random(-100,100)+center_x, _.random(-100,100)+center_y])
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
    })

    requestAnimationFrame(update);
  }
};