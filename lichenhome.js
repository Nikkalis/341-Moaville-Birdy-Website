// --------------------------------------- Instance initialisation

const herolichen = (sketch) => {
  let doesFreeze = true;
  const HOW_LONG_UNTIL_I_COME_FOR_YOU = 10; // frames before you're killed
  const MAGIC_MOA_NUMBER = 1.5; //force threshold, can they struggle?

  const animationLength = 1500;
  let animationSpeed = 250; // fps
  const _maxForce = 0.9;
  const _maxSpeed = 20;
  const _desiredSeparation = 20;
  const _separationCohesionRation = 1.1;
  const _maxEdgeLen = 5;

  let nodesStart = 6;
  let rayStart = 300;

  let _diff_line;

  sketch.setup = function () {
    let canvasobj = sketch.createCanvas(2000, 2000);

    canvasobj.id("herolichen");

    sketch.noFill();
    sketch.stroke(106, 189, 69);
    sketch.noSmooth();
    sketch.strokeWeight(2);
    _diff_line = new DifferentialLine(_maxForce, _maxSpeed, _desiredSeparation, _separationCohesionRation, _maxEdgeLen);

    let angInc = sketch.TWO_PI / nodesStart;

    for (let a = 0; a < sketch.TWO_PI; a += angInc) {
      let x = sketch.width / 2 + sketch.cos(a) * rayStart;
      let y = sketch.height / 2 + sketch.sin(a) * rayStart;
      _diff_line.addNode(new Node(x, y, _maxForce, _maxSpeed, sketch));
    }
  };

  sketch.draw = function () {
    if (animationLength < sketch.frameCount) {
      sketch.noLoop();
    }

    sketch.clear();
    //background(0);

    _diff_line.run(sketch, doesFreeze, MAGIC_MOA_NUMBER, HOW_LONG_UNTIL_I_COME_FOR_YOU);
    _diff_line.renderLine(sketch);
  };
};
const homelichen = (sketch) => {
  let doesFreeze = true;
  const HOW_LONG_UNTIL_I_COME_FOR_YOU = 10; // frames before you're killed
  const MAGIC_MOA_NUMBER = 0.0005; //force threshold, can they struggle?
  const animationLength = 500;
  let animationSpeed = 250; // fps

  const _maxForce = 0.5;
  const _maxSpeed = 20;
  const _desiredSeparation = 20;
  const _separationCohesionRation = 1.1;
  const _maxEdgeLen = 5;
  let erasing = false;
  let eraseIndex = 0;
  let lastNodes = [];
  
  
  
  let nodesStart = 6;
  let rayStart = 120;

  let _diff_line;

  sketch.setup = function () {
    let canvasobj = sketch.createCanvas(2000, 2000);
    canvasobj.id("contactlichen");
    sketch.lastNodes = lastNodes;
    sketch.noFill();
    sketch.stroke(106, 189, 69);
    sketch.noSmooth(); // disables antialiasing — meaningful fps gain on canvas 2D
    sketch.strokeWeight(2);
    _diff_line = new DifferentialLine(_maxForce, _maxSpeed, _desiredSeparation, _separationCohesionRation, _maxEdgeLen);

    let angInc = sketch.TWO_PI / nodesStart;

    for (let a = 0; a < sketch.TWO_PI; a += angInc) {
      let x = sketch.width / 2 + sketch.cos(a) * rayStart;
      let y = sketch.height / 2 + sketch.sin(a) * rayStart;
      _diff_line.addNode(new Node(x, y, _maxForce, _maxSpeed, sketch));
    }
  };

  sketch.draw = function () {
    if (erasing) {
      sketch.erase();
      sketch.strokeWeight(3);
      // erase a few segments per frame
      for (let i = 0; i < 3; i++) { 
        if (eraseIndex >= sketch.lastNodes.length - 1) {
          erasing = false;
          sketch.noErase();
          sketch.noLoop();
          break;
        }
        let p1 = lastNodes[eraseIndex].position;
        let p2 = lastNodes[eraseIndex + 1].position;
        sketch.line(p1.x, p1.y, p2.x, p2.y);
        eraseIndex++;
      }
      sketch.noErase();
      return; // don't run normal draw while erasing
    }
    
    if (animationLength < sketch.frameCount) {
      sketch.noLoop();
    }

    animationSpeed = animationSpeed - 0.5;
    sketch.frameRate(animationSpeed);

    sketch.clear();
    //background(0);

    _diff_line.run(sketch, doesFreeze, MAGIC_MOA_NUMBER, HOW_LONG_UNTIL_I_COME_FOR_YOU);
    _diff_line.renderLine(sketch, doesFreeze, MAGIC_MOA_NUMBER, HOW_LONG_UNTIL_I_COME_FOR_YOU);
  };
  
  sketch.fuseRemove = function() {
    console.log("erasing:", erasing);
    console.log("lastNodes:", lastNodes.length);
    console.log("sample node:", lastNodes[0]);
    erasing = true;
    eraseIndex = 0;
    sketch.loop(); // restart draw loop if it stopped
    sketch.frameRate(30);
  };
};
const studentslichen = (sketch) => {
  let doesFreeze = true;
  const HOW_LONG_UNTIL_I_COME_FOR_YOU = 10; // frames before you're killed
  const MAGIC_MOA_NUMBER = 0.0005; //force threshold, can they struggle?
  const animationLength = 500;
  let animationSpeed = 250; // fps

  const _maxForce = 0.5;
  const _maxSpeed = 20;
  const _desiredSeparation = 20;
  const _separationCohesionRation = 1.1;
  const _maxEdgeLen = 5;
  let erasing = false;
  let eraseIndex = 0;
  let lastNodes = [];
  
  
  
  let nodesStart = 6;
  let rayStart = 120;

  let _diff_line;

  sketch.setup = function () {
    let canvasobj = sketch.createCanvas(2000, 2000);
    canvasobj.id("contactlichen");
    sketch.lastNodes = lastNodes;
    sketch.noFill();
    sketch.stroke(106, 189, 69);
    sketch.noSmooth(); // disables antialiasing — meaningful fps gain on canvas 2D
    sketch.strokeWeight(2);
    _diff_line = new DifferentialLine(_maxForce, _maxSpeed, _desiredSeparation, _separationCohesionRation, _maxEdgeLen);

    let angInc = sketch.TWO_PI / nodesStart;

    for (let a = 0; a < sketch.TWO_PI; a += angInc) {
      let x = sketch.width / 2 + sketch.cos(a) * rayStart;
      let y = sketch.height / 2 + sketch.sin(a) * rayStart;
      _diff_line.addNode(new Node(x, y, _maxForce, _maxSpeed, sketch));
    }
  };

  sketch.draw = function () {
    if (erasing) {
      sketch.erase();
      sketch.strokeWeight(3);
      // erase a few segments per frame
      for (let i = 0; i < 3; i++) { 
        if (eraseIndex >= sketch.lastNodes.length - 1) {
          erasing = false;
          sketch.noErase();
          sketch.noLoop();
          break;
        }
        let p1 = lastNodes[eraseIndex].position;
        let p2 = lastNodes[eraseIndex + 1].position;
        sketch.line(p1.x, p1.y, p2.x, p2.y);
        eraseIndex++;
      }
      sketch.noErase();
      return; // don't run normal draw while erasing
    }
    
    if (animationLength < sketch.frameCount) {
      sketch.noLoop();
    }

    animationSpeed = animationSpeed - 0.5;
    sketch.frameRate(animationSpeed);

    sketch.clear();
    //background(0);

    _diff_line.run(sketch, doesFreeze, MAGIC_MOA_NUMBER, HOW_LONG_UNTIL_I_COME_FOR_YOU);
    _diff_line.renderLine(sketch, doesFreeze, MAGIC_MOA_NUMBER, HOW_LONG_UNTIL_I_COME_FOR_YOU);
  };
  
  sketch.fuseRemove = function() {
    console.log("erasing:", erasing);
    console.log("lastNodes:", lastNodes.length);
    console.log("sample node:", lastNodes[0]);
    erasing = true;
    eraseIndex = 0;
    sketch.loop(); // restart draw loop if it stopped
    sketch.frameRate(30);
  };
};
const projectslichen = (sketch) => {
  let doesFreeze = true;
  const HOW_LONG_UNTIL_I_COME_FOR_YOU = 10; // frames before you're killed
  const MAGIC_MOA_NUMBER = 0.0005; //force threshold, can they struggle?
  const animationLength = 500;
  let animationSpeed = 250; // fps

  const _maxForce = 0.5;
  const _maxSpeed = 20;
  const _desiredSeparation = 20;
  const _separationCohesionRation = 1.1;
  const _maxEdgeLen = 5;
  let erasing = false;
  let eraseIndex = 0;
  let lastNodes = [];
  
  
  
  let nodesStart = 6;
  let rayStart = 120;

  let _diff_line;

  sketch.setup = function () {
    let canvasobj = sketch.createCanvas(2000, 2000);
    canvasobj.id("contactlichen");
    sketch.lastNodes = lastNodes;
    sketch.noFill();
    sketch.stroke(106, 189, 69);
    sketch.noSmooth(); // disables antialiasing — meaningful fps gain on canvas 2D
    sketch.strokeWeight(2);
    _diff_line = new DifferentialLine(_maxForce, _maxSpeed, _desiredSeparation, _separationCohesionRation, _maxEdgeLen);

    let angInc = sketch.TWO_PI / nodesStart;

    for (let a = 0; a < sketch.TWO_PI; a += angInc) {
      let x = sketch.width / 2 + sketch.cos(a) * rayStart;
      let y = sketch.height / 2 + sketch.sin(a) * rayStart;
      _diff_line.addNode(new Node(x, y, _maxForce, _maxSpeed, sketch));
    }
  };

  sketch.draw = function () {
    if (erasing) {
      sketch.erase();
      sketch.strokeWeight(3);
      // erase a few segments per frame
      for (let i = 0; i < 3; i++) { 
        if (eraseIndex >= sketch.lastNodes.length - 1) {
          erasing = false;
          sketch.noErase();
          sketch.noLoop();
          break;
        }
        let p1 = lastNodes[eraseIndex].position;
        let p2 = lastNodes[eraseIndex + 1].position;
        sketch.line(p1.x, p1.y, p2.x, p2.y);
        eraseIndex++;
      }
      sketch.noErase();
      return; // don't run normal draw while erasing
    }
    
    if (animationLength < sketch.frameCount) {
      sketch.noLoop();
    }

    animationSpeed = animationSpeed - 0.5;
    sketch.frameRate(animationSpeed);

    sketch.clear();
    //background(0);

    _diff_line.run(sketch, doesFreeze, MAGIC_MOA_NUMBER, HOW_LONG_UNTIL_I_COME_FOR_YOU);
    _diff_line.renderLine(sketch, doesFreeze, MAGIC_MOA_NUMBER, HOW_LONG_UNTIL_I_COME_FOR_YOU);
  };
  
  sketch.fuseRemove = function() {
    console.log("erasing:", erasing);
    console.log("lastNodes:", lastNodes.length);
    console.log("sample node:", lastNodes[0]);
    erasing = true;
    eraseIndex = 0;
    sketch.loop(); // restart draw loop if it stopped
    sketch.frameRate(30);
  };
};
const contactlichen = (sketch) => {
  let doesFreeze = true;
  const HOW_LONG_UNTIL_I_COME_FOR_YOU = 10; // frames before you're killed
  const MAGIC_MOA_NUMBER = 0.0005; //force threshold, can they struggle?
  const animationLength = 500;
  let animationSpeed = 250; // fps

  const _maxForce = 0.5;
  const _maxSpeed = 20;
  const _desiredSeparation = 20;
  const _separationCohesionRation = 1.1;
  const _maxEdgeLen = 5;
  let erasing = false;
  let eraseIndex = 0;
  let lastNodes = [];
  
  
  
  let nodesStart = 6;
  let rayStart = 120;

  let _diff_line;

  sketch.setup = function () {
    let canvasobj = sketch.createCanvas(2000, 2000);
    canvasobj.id("contactlichen");
    sketch.lastNodes = lastNodes;
    sketch.noFill();
    sketch.stroke(106, 189, 69);
    sketch.noSmooth(); // disables antialiasing — meaningful fps gain on canvas 2D
    sketch.strokeWeight(2);
    _diff_line = new DifferentialLine(_maxForce, _maxSpeed, _desiredSeparation, _separationCohesionRation, _maxEdgeLen);

    let angInc = sketch.TWO_PI / nodesStart;

    for (let a = 0; a < sketch.TWO_PI; a += angInc) {
      let x = sketch.width / 2 + sketch.cos(a) * rayStart;
      let y = sketch.height / 2 + sketch.sin(a) * rayStart;
      _diff_line.addNode(new Node(x, y, _maxForce, _maxSpeed, sketch));
    }
  };

  sketch.draw = function () {
    if (erasing) {
      sketch.erase();
      sketch.strokeWeight(3);
      // erase a few segments per frame
      for (let i = 0; i < 3; i++) { 
        if (eraseIndex >= sketch.lastNodes.length - 1) {
          erasing = false;
          sketch.noErase();
          sketch.noLoop();
          break;
        }
        let p1 = lastNodes[eraseIndex].position;
        let p2 = lastNodes[eraseIndex + 1].position;
        sketch.line(p1.x, p1.y, p2.x, p2.y);
        eraseIndex++;
      }
      sketch.noErase();
      return; // don't run normal draw while erasing
    }
    
    if (animationLength < sketch.frameCount) {
      sketch.noLoop();
    }

    animationSpeed = animationSpeed - 0.5;
    sketch.frameRate(animationSpeed);

    sketch.clear();
    //background(0);

    _diff_line.run(sketch, doesFreeze, MAGIC_MOA_NUMBER, HOW_LONG_UNTIL_I_COME_FOR_YOU);
    _diff_line.renderLine(sketch, doesFreeze, MAGIC_MOA_NUMBER, HOW_LONG_UNTIL_I_COME_FOR_YOU);
  };
  
  sketch.fuseRemove = function() {
    console.log("erasing:", erasing);
    console.log("lastNodes:", lastNodes.length);
    console.log("sample node:", lastNodes[0]);
    erasing = true;
    eraseIndex = 0;
    sketch.loop(); // restart draw loop if it stopped
    sketch.frameRate(30);
  };
};

// --------------------------------------- General initialisation and spawn hero animations

let homelichenHero;
let homelichen1;
let studentslichen1;
let projectslichen1;
let contactlichen1;

let homeButton = document.getElementById("navhexred");
let studentsButton = document.getElementById("navhexpink");
let projectsButton = document.getElementById("navhexpurple");
let contactButton = document.getElementById("navhexorange");

let studentsSection = document.getElementById("students");
let projectsSection = document.getElementById("projects");
let contactSection = document.getElementById("contact");
let homeSection = document.getElementById("home");

let studentsRect;   let projectsRect;   let contactRect;    let homeRect;
let studTop;        let projTop;        let contTop;        let homeTop;
let studBtm;        let projBtm;        let contBtm;        let homeBtm;
let studTopThresh;  let projTopThresh;  let contTopThresh;  let homeTopThresh;
let studBtmThresh;  let projBtmThresh;  let contBtmThresh;  let homeBtmThresh; 

let heroBtmThresh;

let studActive = false;
let projActive = false;
let contActive = false;
let homeActive = false;

let heroActive = false;
let heroInitial = false;

let herolichen1 = new p5(herolichen, document.getElementById("herodiv"));

const offsetSections = 100;

homeRect = homeSection.getBoundingClientRect();
homeTop = homeRect.top;
homeBtm = homeRect.bottom;
homeTopThresh = homeTop + (homeTop - window.innerHeight / 2);
homeBtmThresh = homeBtm + (homeBtm - window.innerHeight / 2);

if (homeTopThresh >= 0 && heroInitial == false) {
    homelichenHero = new p5(homelichen, document.getElementById("lichenred"));
    studentslichen1 = new p5(studentslichen, document.getElementById("lichenpink"));
    projectslichen1 = new p5(projectslichen, document.getElementById("lichenpurple"));
    contactlichen1 = new p5(contactlichen, document.getElementById("lichenorange"));
    heroInitial = true; 
  } 

// --------------------------------------- Event listeners

const links = document.querySelectorAll(".internal-link");

for (const link of links) {
  link.addEventListener("click", function (e) {
    if (this.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth"
        });
      }
    }
  });
}


document.addEventListener("scroll", (event) => {
  
  homeRect = homeSection.getBoundingClientRect();
  homeTop = homeRect.top;
  homeBtm = homeRect.bottom;
  homeTopThresh = homeTop + (homeTop - window.innerHeight / 2);
  homeBtmThresh = homeBtm + (homeBtm - window.innerHeight / 2);
  
  studentsRect = studentsSection.getBoundingClientRect();
  studTop = studentsRect.top;
  studBtm = studentsRect.bottom;
  studTopThresh = studTop + (studTop - window.innerHeight / 2);
  studBtmThresh = studBtm + (studBtm - window.innerHeight / 2);

  projectsRect = projectsSection.getBoundingClientRect();
  projTop = projectsRect.top;
  projBtm = projectsRect.bottom;
  projTopThresh = projTop + (projTop - window.innerHeight / 2);
  projBtmThresh = projBtm + (projBtm - window.innerHeight / 2);

  contactRect = contactSection.getBoundingClientRect();
  contTop = contactRect.top;
  contBtm = contactRect.bottom;
  contBtmThresh = contBtm - window.innerHeight;
  
  console.log(homeActive);
  
  if (homeTopThresh >= 0 && heroActive == false && heroInitial == false) { 
    homelichenHero = new p5(homelichen, document.getElementById("lichenred"));
    studentslichen1 = new p5(studentslichen, document.getElementById("lichenpink"));
    projectslichen1 = new p5(projectslichen, document.getElementById("lichenpurple"));
    contactlichen1 = new p5(contactlichen, document.getElementById("lichenorange"));
    heroActive = true; 
    console.log(homeActive);
  } else if (homeTopThresh <= 0 && (heroActive || heroInitial)) {
    studentslichen1.remove();
    projectslichen1.remove();
    contactlichen1.remove();
    homelichenHero.remove();
    console.log(homeActive+" "+heroActive+" "+ heroInitial);
    heroActive = false;
    heroInitial = false;
  } 

  if (homeTopThresh <= 0 && homeBtmThresh >= 0 && homeActive == false) {
    homelichen1 = new p5(homelichen, document.getElementById("lichenred"));
    homeActive = true;
    console.log(homeActive);
  } else if ((homeTopThresh >= 0 || homeBtmThresh <= 0) && homeActive){
    //homelichen1.fuseRemove(homelichen1.lastNodes);
    homelichen1.remove();
    console.log(homeActive);
    homeActive = false;
  }
  
  if (studTopThresh <= 0 && studBtmThresh >= 0 && studActive == false) {
    studentslichen1 = new p5(studentslichen, document.getElementById("lichenpink"));
    studActive = true;
  } else if ((studTopThresh >= 0 || studBtmThresh <= 0) && studActive){
    studentslichen1.remove();
    studActive = false;
  }

  if (projTopThresh <= 0 && projBtmThresh >= 0 && projActive == false) {
    projectslichen1 = new p5(projectslichen, document.getElementById("lichenpurple"));
    projActive = true;
    console.log(homeActive);
  } else if ((projTopThresh >= 0 || projBtmThresh <= 0) && projActive) {
    projectslichen1.remove();
    projActive = false;
  }

  if (contBtmThresh <= 0 && contActive == false) {
    contactlichen1 = new p5(contactlichen, document.getElementById("lichenorange"));
    contActive = true;
  } else if (contBtmThresh >= 0 && contActive){
    contactlichen1.remove();
    contActive = false;
  }

});


// --------------------------------------- Functions and classes and shit lalalalalalalaaaa

//function fuseRemove(lastNodes) {
//  sketch.erase();
//  sketch.strokeWeight(3);
//  for (let i = 0; i < this.lastNodes.length - 1; i++) {
//    let p1 = this.lastNodes[i].position;
//    let p2 = this.lastNodes[i + 1].position;
//    sketch.line(p1.x, p1.y, p2.x, p2.y);
//  }
//
//  // Close the loop
//  let last = this.nodes[this.nodes.length - 1].position;
//  let first = this.nodes[0].position;
//  sketch.line(last.x, last.y, first.x, first.y);
//
//  sketch.noErase();
//}

// Spatial grid to provide location info to nodes
class SpatialGrid {
  // make the grid based on specified size - size is based on the _desiredSeperation constant
  constructor(cellSize) {
    this.cellSize = cellSize;
    this.cells = new Map();
  }

  clear() {
    this.cells.clear();
  }

  // take X and Y coordinates, convert into cell indices (index) into one 32bit integer and return
  _key(x, y) {
    return (Math.floor(x / this.cellSize) << 16) ^ Math.floor(y / this.cellSize);
  }

  // take node, what cell is it in? tell everyone the node is in that cell
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

// Actually makes the line
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

  addNode(n) {
    this.nodes.push(n);
  }
  addNodeAt(n, i) {
    this.nodes.splice(i, 0, n);
  }

  run(sketch, doesFreeze, MAGIC_MOA_NUMBER, HOW_LONG_UNTIL_I_COME_FOR_YOU) {
    this.differentiate(sketch, doesFreeze, MAGIC_MOA_NUMBER, HOW_LONG_UNTIL_I_COME_FOR_YOU);
    this.growth(sketch);
  }

  growth(sketch) {
    let toInsert = [];
    for (let i = 0; i < this.nodes.length - 1; i++) {
      let n1 = this.nodes[i],
        n2 = this.nodes[i + 1];
      let dx = n2.position.x - n1.position.x;
      let dy = n2.position.y - n1.position.y;
      if (dx * dx + dy * dy > this.maxEdgeLen * this.maxEdgeLen) {
        toInsert.push({
          index: i + 1 + toInsert.length,
          node: new Node(
            (n1.position.x + n2.position.x) * 0.5,
            (n1.position.y + n2.position.y) * 0.5,
            this.maxForce,
            this.maxSpeed,
            sketch
          )
        });
      }
    }
    for (let { index, node } of toInsert) this.nodes.splice(index, 0, node);
  }

  differentiate(sketch, doesFreeze, MAGIC_MOA_NUMBER, HOW_LONG_UNTIL_I_COME_FOR_YOU) {
    this.grid.clear();
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i]._index = i;
      this.grid.insert(this.nodes[i]);
    }
    let sf = this.getSeparationForces(sketch);
    let cf = this.getEdgeCohesionForces(sketch);
    for (let i = 0; i < this.nodes.length; i++) {
      if (doesFreeze) {
        if (this.nodes[i].sleeping) continue;
      } // ← skip sleeping nodes

      sf[i].mult(this.separationCohesionRation);
      this.nodes[i].applyForce(sf[i]);
      this.nodes[i].applyForce(cf[i]);
      this.nodes[i].update(doesFreeze, MAGIC_MOA_NUMBER, HOW_LONG_UNTIL_I_COME_FOR_YOU);
    }
  }

  getSeparationForces(sketch) {
    let n = this.nodes.length;
    let sf = Array.from({ length: n }, () => sketch.createVector(0, 0));
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
          let dist = sketch.sqrt(sq_d);
          let fx = dx / dist / dist;
          let fy = dy / dist / dist;
          sf[i].x += fx;
          sf[i].y += fy;
          sf[j].x -= fx;
          sf[j].y -= fy; // equal and opposite
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

  getEdgeCohesionForces(sketch) {
    let n = this.nodes.length;
    return this.nodes.map((nd, i) => {
      let prev = i === 0 ? this.nodes[n - 1] : this.nodes[i - 1];
      let next = i === n - 1 ? this.nodes[0] : this.nodes[i + 1];
      // Reuse a single sketch.createVector instead of .add() chaining with temporaries
      let sum = sketch.createVector(
        (prev.position.x + next.position.x) * 0.5,
        (prev.position.y + next.position.y) * 0.5
      );
      return nd.seek(sum);
    });
  }

  renderLine(sketch, doesFreeze, MAGIC_MOA_NUMBER, HOW_LONG_UNTIL_I_COME_FOR_YOU) {
    for (let i = 0; i < this.nodes.length - 1; i++) {
      let p1 = this.nodes[i].position;
      let p2 = this.nodes[i + 1].position;
      //if (doesFreeze) {if (this.nodes[i].sleeping) {stroke(106, 189, 69);}
      //else {stroke(106, 189, 69);}}
      sketch.line(p1.x, p1.y, p2.x, p2.y);
    }

    // Close the loop
    let last = this.nodes[this.nodes.length - 1].position;
    let first = this.nodes[0].position;
    sketch.line(last.x, last.y, first.x, first.y);
    
    // ------ pleaseee give me my nodes
    //for (let i = 0; i < this.nodes.length - 1; i++) {
    //  let p1 = this.nodes[i].position;
    //  sketch.lastNodes.push(p1);
    //}
    
  }
  
  
}

// Individual node behaviour rules
class Node {
  constructor(x, y, mF, mS, sketch) {
    this.acceleration = sketch.createVector(0, 0);
    this.velocity = p5.Vector.random2D();
    this.position = sketch.createVector(x, y);
    this.maxSpeed = mF;
    this.maxForce = mS;
    // Sleep system
    this.sleeping = false;
    this.sleepTimer = 0;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  wake() {
    this.sleeping = false;
    this.sleepTimer = 0;
  }

  update(doesFreeze, MAGIC_MOA_NUMBER, HOW_LONG_UNTIL_I_COME_FOR_YOU) {
    if (this.sleeping) return;

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);

    // Measure net force BEFORE clearing acceleration
    let effort = this.acceleration.magSq();
    this.acceleration.mult(0);

    if (doesFreeze) {
      if (effort < MAGIC_MOA_NUMBER) {
        if (++this.sleepTimer >= HOW_LONG_UNTIL_I_COME_FOR_YOU) this.sleeping = true;
      } else {
        this.sleepTimer = 0;
      }
    }
  }
  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }
}

