// PARAMETERS
const animationLength = 2000;

const doesFreeze = true;
const HOW_LONG_UNTIL_I_COME_FOR_YOU = 10;  // frames before you're killed
const MAGIC_MOA_NUMBER  = 1.5; //force threshold, can they struggle?

const _maxForce = 0.9;
const _maxSpeed = 20;
const _desiredSeparation = 20;
const _separationCohesionRation = 1.1;
const _maxEdgeLen = 5;

let windowWidth = this.innerWidth;

let _diff_line;

function setup() {
  var myCanvas = createCanvas(2000,900);
    myCanvas.parent("herodiv");
 myCanvas.style("left", "50%");
 myCanvas.style("transform", "translateX(-50%)");
 
  noFill();
  stroke(106, 189, 69);
  noSmooth(); // disables antialiasing — meaningful fps gain on canvas 2D
  strokeWeight(2);
  _diff_line = new DifferentialLine(_maxForce, _maxSpeed, _desiredSeparation, _separationCohesionRation, _maxEdgeLen);
  let nodesStart = 6;
  let angInc = TWO_PI / nodesStart;
  let rayStart = 300;
  for (let a = 0; a < TWO_PI; a += angInc) {
    let x = width / 2 + cos(a) * rayStart;
    let y = height / 2 + sin(a) * rayStart;
    _diff_line.addNode(new Node(x, y, _maxForce, _maxSpeed));
  }
}

function draw() {
  if(animationLength < this.frameCount){noLoop();}
  
  clear();
  //background(0);
  
  _diff_line.run();
  _diff_line.renderLine();
}

// Spatial hash grid for O(n) neighbour lookups instead of O(n²)
class SpatialGrid {
  constructor(cellSize) {
    this.cellSize = cellSize;
    this.cells = new Map();
  }

  clear() {
    this.cells.clear();
  }

  _key(x, y) {
    return (Math.floor(x / this.cellSize) << 16) ^ Math.floor(y / this.cellSize);
  }

  insert(node) {
    let k = this._key(node.position.x, node.position.y);
    if (!this.cells.has(k)) this.cells.set(k, []);
    this.cells.get(k).push(node);
  }

  // Returns all nodes in the same cell and the 8 neighbouring cells
  query(x, y) {
    let result = [];
    let cx = Math.floor(x / this.cellSize);
    let cy = Math.floor(y / this.cellSize);
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        let k = ((cx + dx) << 16) ^ (cy + dy);
        let cell = this.cells.get(k);
        if (cell) for (let n of cell) result.push(n);
      }
    }
    return result;
  }
}

class DifferentialLine {
  constructor(mF, mS, dS, sCr, eL) {
    this.nodes = [];
    this.maxForce = mF;
    this.maxSpeed = mS;
    this.desiredSeparation = dS;
    this.sq_desiredSeparation = dS * dS;
    this.separationCohesionRation = sCr;
    this.maxEdgeLen = eL;
    // Cell size = desiredSeparation so each query covers exactly the relevant radius
    this.grid = new SpatialGrid(dS);
  }

  addNode(n) { this.nodes.push(n); }
  addNodeAt(n, i) { this.nodes.splice(i, 0, n); }

  run() {
    this.differentiate();
    this.growth();
  }

//   growth() {
// //     if (this.nodes.length >= _maxNodes) return; // hard cap
//     // Walk backwards so splice indices stay valid, and use i+1 directly
//     // instead of indexOf() which was O(n) per insertion
//     for (let i = this.nodes.length - 2; i >= 0; i--) {
//       let n1 = this.nodes[i];
//       let n2 = this.nodes[i + 1];
//       let dx = n2.position.x - n1.position.x;
//       let dy = n2.position.y - n1.position.y;
//       // Avoid sqrt by comparing squared distance to squared threshold
//       if (dx * dx + dy * dy > this.maxEdgeLen * this.maxEdgeLen) {
//         let mx = (n1.position.x + n2.position.x) * 0.5;
//         let my = (n1.position.y + n2.position.y) * 0.5;
//         this.addNodeAt(new Node(mx, my, this.maxForce, this.maxSpeed), i + 1);
//         if (this.nodes.length >= _maxNodes) break;
//       }
//     }
//   }
  
  growth() {
  let toInsert = [];
  for (let i = 0; i < this.nodes.length - 1; i++) {
    let n1 = this.nodes[i], n2 = this.nodes[i + 1];
    let dx = n2.position.x - n1.position.x;
    let dy = n2.position.y - n1.position.y;
    if (dx * dx + dy * dy > this.maxEdgeLen * this.maxEdgeLen) {
      toInsert.push({
        index: i + 1 + toInsert.length,
        node: new Node((n1.position.x + n2.position.x) * 0.5,
                       (n1.position.y + n2.position.y) * 0.5,
                       this.maxForce, this.maxSpeed)
      });
     
      
    }
  }
  for (let { index, node } of toInsert) this.nodes.splice(index, 0, node);
}
  // differentiate() {
  //   // Rebuild grid each frame — fast because it's just a Map clear + n inserts
  //   this.grid.clear();
  //   for (let n of this.nodes) this.grid.insert(n);
  differentiate() {
  this.grid.clear();
  for (let i = 0; i < this.nodes.length; i++) {
    this.nodes[i]._index = i;
    this.grid.insert(this.nodes[i]);
  }
  let sf = this.getSeparationForces();
  let cf = this.getEdgeCohesionForces();
  for (let i = 0; i < this.nodes.length; i++) {
    
    if (doesFreeze) {if (this.nodes[i].sleeping) continue;} // ← skip sleeping nodes
    
    sf[i].mult(this.separationCohesionRation);
    this.nodes[i].applyForce(sf[i]);
    this.nodes[i].applyForce(cf[i]);
    this.nodes[i].update();
  }
}

//   getSeparationForces() {
//     let n = this.nodes.length;
//     let sf = Array.from({ length: n }, () => createVector(0, 0));
//     let near = new Array(n).fill(0);

//     for (let i = 0; i < n; i++) {
//       let nodei = this.nodes[i];
//       // Only query neighbours in nearby grid cells instead of all n nodes
//       let neighbours = this.grid.query(nodei.position.x, nodei.position.y);
//       for (let nodej of neighbours) {
//         if (nodej === nodei) continue;
//         let dx = nodei.position.x - nodej.position.x;
//         let dy = nodei.position.y - nodej.position.y;
//         let sq_d = dx * dx + dy * dy;
//         if (sq_d > 0 && sq_d < this.sq_desiredSeparation) {
//           let dist = sqrt(sq_d);
//           // Reuse dx/dy directly instead of creating a new PVector
//           sf[i].x += (dx / dist) / dist;
//           sf[i].y += (dy / dist) / dist;
//           near[i]++;
//         }
//       }
//       if (near[i] > 0) sf[i].div(near[i]);
//       if (sf[i].mag() > 0) {
//         sf[i].setMag(this.maxSpeed);
//         sf[i].sub(this.nodes[i].velocity);
//         sf[i].limit(this.maxForce);
//       }
//     }
//     return sf;
//   }
  
  getSeparationForces() {
  let n = this.nodes.length;
  let sf = Array.from({ length: n }, () => createVector(0, 0));
  let near = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    let nodei = this.nodes[i];
    let neighbours = this.grid.query(nodei.position.x, nodei.position.y);
    for (let nodej of neighbours) {
      let j = nodej._index; // see below
      if (j <= i) continue; // only process each pair once
      let dx = nodei.position.x - nodej.position.x;
      let dy = nodei.position.y - nodej.position.y;
      let sq_d = dx * dx + dy * dy;
      if (sq_d > 0 && sq_d < this.sq_desiredSeparation) {
        let dist = sqrt(sq_d);
        let fx = (dx / dist) / dist;
        let fy = (dy / dist) / dist;
        sf[i].x += fx; sf[i].y += fy;
        sf[j].x -= fx; sf[j].y -= fy; // equal and opposite
        near[i]++;
        near[j]++;
      }
    }
  }
  // normalise after all pairs are processed
  for (let i = 0; i < n; i++) {
    if (near[i] > 0) sf[i].div(near[i]);
    if (sf[i].mag() > 0) {
      sf[i].setMag(this.maxSpeed);
      sf[i].sub(this.nodes[i].velocity);
      sf[i].limit(this.maxForce);
    }
  }
  return sf;
}

  getEdgeCohesionForces() {
    let n = this.nodes.length;
    return this.nodes.map((nd, i) => {
      let prev = i === 0 ? this.nodes[n - 1] : this.nodes[i - 1];
      let next = i === n - 1 ? this.nodes[0] : this.nodes[i + 1];
      // Reuse a single createVector instead of .add() chaining with temporaries
      let sum = createVector(
        (prev.position.x + next.position.x) * 0.5,
        (prev.position.y + next.position.y) * 0.5
      );
      return nd.seek(sum);
    });
  }

  renderLine() {
    for (let i = 0; i < this.nodes.length - 1; i++) {
      let p1 = this.nodes[i].position;
      let p2 = this.nodes[i + 1].position;
      //if (doesFreeze) {if (this.nodes[i].sleeping) {stroke(106, 189, 69);}
      //else {stroke(106, 189, 69);}}
      line(p1.x, p1.y, p2.x, p2.y);
    }
    // Close the loop
    let last = this.nodes[this.nodes.length - 1].position;
    let first = this.nodes[0].position;
    line(last.x, last.y, first.x, first.y);
  }

  renderShape() {
    beginShape();
    for (let node of this.nodes) vertex(node.position.x, node.position.y);
    endShape(CLOSE);
  }
}

// class Node {
//   constructor(x, y, mF, mS) {
//     this.acceleration = createVector(0, 0);
//     this.velocity = p5.Vector.random2D();
//     this.position = createVector(x, y);
//     this.maxSpeed = mF;
//     this.maxForce = mS;
//   }

//   applyForce(force) { this.acceleration.add(force); }

//   update() {
//     this.velocity.add(this.acceleration);
//     this.velocity.limit(this.maxSpeed);
//     this.position.add(this.velocity);
//     this.acceleration.mult(0);
//   }

class Node {
  constructor(x, y, mF, mS) {
    this.acceleration = createVector(0, 0);
    this.velocity = p5.Vector.random2D();
    this.position = createVector(x, y);
    this.maxSpeed = mF;
    this.maxForce = mS;
    // Sleep system
    this.sleeping = false;
    this.sleepTimer = 0;
  }

  applyForce(force) { this.acceleration.add(force); }
  

  wake() {
    this.sleeping = false;
    this.sleepTimer = 0;
  }

  update() {
  if (this.sleeping) return;

  this.velocity.add(this.acceleration);
  this.velocity.limit(this.maxSpeed);
  this.position.add(this.velocity);

  // Measure net force BEFORE clearing acceleration
  let effort = this.acceleration.magSq();
  this.acceleration.mult(0);

  if (doesFreeze) {if (effort < MAGIC_MOA_NUMBER) {
    if (++this.sleepTimer >= HOW_LONG_UNTIL_I_COME_FOR_YOU) this.sleeping = true;
  } else {
    this.sleepTimer = 0;
  }}
}
  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }
}