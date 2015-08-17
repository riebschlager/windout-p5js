'use strict';

var colorSets = [];

var s = function(p5) {
  var canvas;
  var particles = [];
  var rotations = 6;

  colorSets.push([p5.color('#FBFCA4'), p5.color('#08AFA7'), p5.color('#DE0EAA'), p5.color('#A307FA'), p5.color('#2E013D')]);
  colorSets.push([p5.color('#ED7B34'), p5.color('#99541C'), p5.color('#6E2323'), p5.color('#661133'), p5.color('#35001E')]);
  colorSets.push([p5.color('#2F210D'), p5.color('#432406'), p5.color('#376E12'), p5.color('#1D4108'), p5.color('#0C1C01')]);
  colorSets.push([p5.color('#C8265D'), p5.color('#91B5B9'), p5.color('#5F979D'), p5.color('#1E666F'), p5.color('#203033')]);
  colorSets.push([p5.color('#1F3D17'), p5.color('#5A8E4C'), p5.color('#F4F2EC'), p5.color('#353722'), p5.color('#DCC249')]);
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
      var particle = particles[i];
      particle.update();
      for (var r = 0; r < p5.TWO_PI; r += p5.TWO_PI / rotations) {
        p5.push();
        p5.translate(p5.width / 2, p5.height / 2);
        p5.rotate(r);
        p5.noStroke();
        p5.fill(particle.color.rgba[0], particle.color.rgba[1], particle.color.rgba[2], particle.alpha);
        p5.ellipse(particle.pos.x - p5.width / 2, particle.pos.y - p5.height / 2, 3, 3);
        p5.pop();
      }
      if (particle.isDead) {
        particles.splice(i, 1);
      }
    }
  };

};

var windout = new p5(s);

function Particle(p5) {
  this.age = 0;
  this.lifetime = p5.random(250, 500);
  this.pos = p5.createVector(p5.mouseX, p5.mouseY);
  this.vel = p5.createVector(0, 0);
  this.noise = p5.createVector(0, 0);
  this.isDead = false;
  this.alpha = 255;
  this.color = colorSets[0][p5.floor(p5.random(colorSets[0].length))];
  this.magnitude = 0.0025;
  this.update = function() {
    var noiseFloat = p5.noise(this.pos.x * this.magnitude, this.pos.y * this.magnitude, p5.frameCount * this.magnitude);
    this.alpha = p5.map(this.age / this.lifetime, 0, 1, 255, 0);
    this.noise.x = Math.cos(noiseFloat * p5.TWO_PI * 2);
    this.noise.y = Math.sin(noiseFloat * p5.TWO_PI * 2);
    this.vel.add(this.noise);
    this.vel.div(2);
    this.pos.add(this.vel);
    this.age++;
    if (this.age > this.lifetime) {
      this.isDead = true;
    }
  }
};
