/*
 * A speed-improved perlin and simplex noise algorithms for 2D.
 *
 * Based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 * Converted to Javascript by Joseph Gentle.
 *
 * Version 2012-03-09
 *
 * This code was placed in the public domain by its original author,
 * Stefan Gustavson. You may use it as you see fit, but
 * attribution is appreciated.
 *
 */

(function(global){

    // Passing in seed will seed this Noise instance
    function Noise(seed) {
      function Grad(x, y, z) {
        this.x = x; this.y = y; this.z = z;
      }
  
      Grad.prototype.dot2 = function(x, y) {
        return this.x*x + this.y*y;
      };
  
      Grad.prototype.dot3 = function(x, y, z) {
        return this.x*x + this.y*y + this.z*z;
      };
  
      this.grad3 = [new Grad(1,1,0),new Grad(-1,1,0),new Grad(1,-1,0),new Grad(-1,-1,0),
                   new Grad(1,0,1),new Grad(-1,0,1),new Grad(1,0,-1),new Grad(-1,0,-1),
                   new Grad(0,1,1),new Grad(0,-1,1),new Grad(0,1,-1),new Grad(0,-1,-1)];
  
      this.p = [151,160,137,91,90,15,
      131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
      190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
      88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
      77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
      102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
      135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
      5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
      223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
      129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
      251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
      49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
      138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];

      this.perm = new Array(512);
      this.gradP = new Array(512);
  
      this.seed(seed || 0);
    }

    function Noise() {
      this.p = new Uint8Array(512);
      this.perm = new Uint8Array(512);
      this.gradP = new Array(512);
      this.grad3 = [
        { x: 1, y: 1, z: 0 }, { x: -1, y: 1, z: 0 }, { x: 1, y: -1, z: 0 }, { x: -1, y: -1, z: 0 },
        { x: 1, y: 0, z: 1 }, { x: -1, y: 0, z: 1 }, { x: 1, y: 0, z: -1 }, { x: -1, y: 0, z: -1 },
        { x: 0, y: 1, z: 1 }, { x: 0, y: -1, z: 1 }, { x: 0, y: 1, z: -1 }, { x: 0, y: -1, z: -1 }
      ];
      this.seed(0);
    }
  
    Noise.prototype.seed = function(seed) {
      seed = (seed * 65536) | 0;
      for (let i = 0; i < 256; i++) {
        this.p[i] = i;
      }
      for (let i = 255; i > 0; i--) {
        let r = (seed = (seed * 1664525 + 1013904223) | 0) >>> 16;
        let j = r % (i + 1);
        [this.p[i], this.p[j]] = [this.p[j], this.p[i]];
      }
      for (let i = 0; i < 512; i++) {
        let v = this.p[i & 255];
        this.perm[i] = v;
        this.gradP[i] = this.grad3[v % 12];
      }
    };
  
    function fade(t) {
      return t * t * t * (t * (t * 6 - 15) + 10);
    }
  
    function lerp(a, b, t) {
      return a + t * (b - a);
    }
  
    function dot3(g, x, y, z) {
      return g.x * x + g.y * y + g.z * z;
    }
  
    Noise.prototype.perlin3 = function(x, y, z) {
      let X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
      x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
      
      let u = fade(x), v = fade(y), w = fade(z);
      let A = this.perm[X] + Y, B = this.perm[X + 1] + Y;
      let AA = this.perm[A] + Z, AB = this.perm[A + 1] + Z;
      let BA = this.perm[B] + Z, BB = this.perm[B + 1] + Z;
      
      return lerp(
        lerp(
          lerp(dot3(this.gradP[AA], x, y, z), dot3(this.gradP[BA], x - 1, y, z), u),
          lerp(dot3(this.gradP[AB], x, y - 1, z), dot3(this.gradP[BB], x - 1, y - 1, z), u),
          v
        ),
        lerp(
          lerp(dot3(this.gradP[AA + 1], x, y, z - 1), dot3(this.gradP[BA + 1], x - 1, y, z - 1), u),
          lerp(dot3(this.gradP[AB + 1], x, y - 1, z - 1), dot3(this.gradP[BB + 1], x - 1, y - 1, z - 1), u),
          v
        ),
        w
      );
    };
  
    global.Noise = Noise;
  })(typeof module === "undefined" ? this : module.exports);
  