'use strict';

var s = function(p5) {
  var canvas;
  var particles = [];
  var rotations = 16;

  p5.setup = function() {
    p5.devicePixelScaling(false);
    canvas = p5.createCanvas(960, 960);
    canvas.parent('windout');
    p5.background(255);
  };

  p5.draw = function() {
    p5.fill(0, 50);
    if (p5.mouseIsPressed && p5.mouseX > 0 && p5.mouseY > 0 && p5.mouseX < p5.width && p5.mouseY < p5.height) {
      particles.push(new Particle(p5));
    }
    for (var i = 0; i < particles.length; i++) {
      for (var r = 0; r < p5.TWO_PI; r += p5.TWO_PI / rotations) {
        var particle = particles[i];
        p5.push();
        p5.translate(p5.width / 2, p5.height / 2);
        p5.rotate(r);
        p5.noStroke();
        p5.rect(particle.pos.x - p5.width / 2, particle.pos.y - p5.height / 2, 1, 1);
        p5.pop();
      }
      particle.update();
      if (particle.isDead) {
        particles.splice(particles.indexOf(particle), 1);
      }
    }
  };

};

var windout = new p5(s);

function Particle(p5) {
  this.pos = p5.createVector(p5.mouseX, p5.mouseY);
  this.vel = p5.createVector(0, 0);
  this.noise = p5.createVector(0, 0);
  this.isDead = false;
  this.update = function() {
    var magnitude = 0.01;
    var noiseFloat = p5.noise(this.pos.x * magnitude, this.pos.y * magnitude, p5.frameCount * magnitude);
    this.noise.x = Math.cos(noiseFloat * p5.TWO_PI);
    this.noise.y = Math.sin(noiseFloat * p5.TWO_PI);
    this.vel.add(this.noise);
    this.vel.div(2);
    this.pos.add(this.vel);
    if (this.pos.x < 0 || this.pos.x > p5.width || this.pos.y < 0 || this.pos.y > p5.height) {
      this.isDead = true;
    }
  }
};
