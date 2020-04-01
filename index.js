const diameter = 20;

let p1;
let p2;
let p3;

let v1;
let v2;
let v3;

let entitySelectedIndex = -1;
let provers;
let verifiers;



let myp5 = new p5(sketch => {
    sketch.setup = () => {

        let canv = sketch.createCanvas(500, 500);
        canv.position(10, 200);
        resetSketch();
        let reset = sketch.createButton("reset");
        reset.position(10,150);
        reset.mousePressed(resetSketch);
    };

    let checkIfTouching = () => {
        for (let i = 0; i < verifiers.length; ++i) {
            if (verifiers[i].rings.length == 0) continue;
            let ring = verifiers[i].rings[0];
            for (var j = 0; j < verifiers.length; ++j) {
                if (i == j) continue;
                let d = sketch.dist(verifiers[i].x, verifiers[i].y, verifiers[j].x, verifiers[j].y) - verifiers[j].diameter / 2
                if (ring.diameter / 2 >= d) {
                    sketch.noLoop();
                    return;
                }
            }
        }
    };

    let resetSketch = () => {
        p1 = new Prover(sketch.width /2, sketch.height/6);
        p2 = new Prover(sketch.width / 10, sketch.height -100 );
        p3 = new Prover(sketch.width - 100, sketch.height - 100);

        v1 = new Verifier(sketch.width / 2, sketch.height/6+50);
        v2 = new Verifier(sketch.width /10 + 50, sketch.height - 100);
        v3 = new Verifier(sketch.width-150 , sketch.height - 100);

        provers = [p1, p2, p3];
        verifiers = [v1, v2, v3];
    }

    sketch.draw = () => {
        sketch.background(220);

        provers.forEach((e) => {
            e.update(sketch)
        });
        provers.forEach((e) => {
            e.render(sketch)
        });
        Verifier.updateAll(sketch, verifiers, entitySelectedIndex);

        verifiers.forEach((e) => {
            e.render(sketch)
        });

        checkIfTouching()
    }

    sketch.mousePressed = () => {
        verifiers.forEach((e, i) => {
            if (sketch.dist(sketch.mouseX, sketch.mouseY, e.x, e.y) < e.diameter) {
                entitySelectedIndex = i;
            }
        });
    }

    sketch.mouseReleased = () => {
        entitySelectedIndex = -1;
    }
}, "entity-canvas");

let myp5User = new p5(sketch1 => {
    sketch1.setup = () => {
        let canvUser = sketch1.createCanvas(500, 100);
        canvUser.position(10,20)
        let rand1 = sketch1.createButton('1')
        rand1.position(20,70);

        let rand2 = sketch1.createButton('2')
        rand2.position(40,70);

        // let input = sketch1.createInput();
        // input.position(20, 70);

        let commit = sketch1.createButton('commit');
        commit.position(rand2.x + rand2.width, rand2.y);
        commit.mousePressed(myp5.resetSketch);

        // commit.mousePressed();

        let instruction = sketch1.createElement('h3', "Please choose one of the two following randomness.")
        instruction.position(rand1.x, 10);

        // sketch1.textAlign(CENTER);
        sketch1.textSize(100);
    }

    sketch1.draw = () => {
        sketch1.background(255);

    }

}, "user-canvas");



let myp5Graph = new p5(sketch2 => {
    let n0 = [250, 50];
    let n1 = [350, 150];
    let n2 = [250, 250];
    let n3 = [350, 350];
    let n4 = [250, 450];
    let n5 = [150, 350];

    let AdjMatrix = [];
    let V = [n0, n1, n2, n3, n4, n5];
    let E = [[0,1], [0,2], [1,2], [1,3], [2,3],[2,4], [2,5], [3,4], [4,5]];

    for (let j=0; j< V.length; j++) {
        let neighbours = [];
        let ind = 0; // initialise an index at 0
        for (let i = 0; i < E.length; i++){
            // if node index in the array
            if(E[i].includes(V.indexOf(V[j])))
            {
                ind = E[i].indexOf(V.indexOf(V[j]));
                ind = 1-ind;
                neighbours.push(E[i][ind]);
            }
        }
        AdjMatrix.push(neighbours);
    }
    let x1, x2, y1, y2 = 0;
    console.log(AdjMatrix);



    sketch2.setup = () => {
        let c = sketch2.createCanvas(500, 500);
        c.position(600,200);
        sketch2.background(220);

        // Set text characteristics
        sketch2.textSize(16);
        // sketch2.textAlign(CENTER, CENTER);

        sketch2.stroke(0);
        sketch2.strokeWeight(1);
        for (let i=0; i<E.length; i++) {
            x1 = V[ E[i][0] ][0];
            y1 = V[ E[i][0] ][1];
            x2 = V[ E[i][1] ][0];
            y2 = V[ E[i][1] ][1];
            sketch2.line(x1, y1, x2, y2);
        }
        sketch2.plotNodes();
    };
    sketch2.plotNodes = () => {

        sketch2.stroke(0);
        for (let i = 0; i < V.length; i++) {
            sketch2.fill(0);

            sketch2.circle(V[i][0], V[i][1], 50);
            sketch2.fill(0);
            sketch2.text("v" + sketch2.str(i), V[i][0] - 25, V[i][1] - 30);
        }
    }



    sketch2.draw = () => {

    }

}, "graph-canvas");
