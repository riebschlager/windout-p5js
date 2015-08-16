'use strict';

var colorSets = [];

var s = function(p5) {
  var canvas;
  var particles = [];
  var rotations = 16;

  colorSets.push([p5.color('#50BBF7'), p5.color('#B8E4FF'), p5.color('#D7CC2C'), p5.color('#18A2F1'), p5.color('#A38E19')]);

  p5.setup = function() {
    p5.devicePixelScaling(false);
    canvas = p5.createCanvas(1140, 800);
    canvas.parent('windout');
    p5.background(255);
  };

  p5.draw = function() {
    if (p5.mouseIsPressed && particles.length < 500 && p5.mouseX > 0 && p5.mouseY > 0 && p5.mouseX < p5.width && p5.mouseY < p5.height) {
      particles.push(new Particle(p5));
    }
    for (var i = 0; i < particles.length; i++) {
      for (var r = 0; r < p5.TWO_PI; r += p5.TWO_PI / rotations) {
        var particle = particles[i];
        p5.push();
        p5.translate(p5.width / 2, p5.height / 2);
        p5.rotate(r);
        p5.noStroke();
        p5.fill(particle.color.rgba[0], particle.color.rgba[1], particle.color.rgba[2], particle.alpha);
        p5.ellipse(particle.pos.x - p5.width / 2, particle.pos.y - p5.height / 2, 2, 2);
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
  this.age = 0;
  this.lifetime = p5.random(500);
  this.pos = p5.createVector(p5.mouseX, p5.mouseY);
  this.vel = p5.createVector(0, 0);
  this.noise = p5.createVector(0, 0);
  this.isDead = false;
  this.alpha = 255;
  this.color = colorSets[0][p5.floor(p5.random(colorSets[0].length))];
  this.magnitude = 0.01;
  this.update = function() {
    var noiseFloat = p5.noise(this.pos.x * this.magnitude, this.pos.y * this.magnitude, p5.frameCount * this.magnitude);
    this.alpha = p5.map(this.age / this.lifetime, 0, 1, 255, 0);
    this.noise.x = Math.cos(noiseFloat * p5.TWO_PI);
    this.noise.y = Math.sin(noiseFloat * p5.TWO_PI);
    this.vel.add(this.noise);
    this.vel.div(2);
    this.pos.add(this.vel);
    this.age++;
    if (this.age > this.lifetime) {
      this.isDead = true;
    }
  }
};
