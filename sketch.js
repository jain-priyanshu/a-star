var cols = 13;
var rows = 11;
var w, h;
var nodeArray = [];
var graph = new Map();
var edgeOk = null;
var edges = [];

function setup(){
    createCanvas(700, 550);
}

function draw(){
    w = width / cols;
    h = height / rows;
    background(255);
    if(ok){
        showLines();
    }
    showGrid();
    showEdges();
    showNodes();
    if(nodeArray[0]){
        nodeArray[0].show([255, 0, 0]);
    }

    if(mouseIsPressed){
        if(mouseButton === RIGHT){
            var temp = mouseOnNode();
            if(temp){
                deleteNode(temp);
            }
        }
    }
}

var statChar = 'A'
function mouseClicked(){ // mouse release
    ok = false; // line animation stops
    if(edgeOk){ // making a new edge in progress
        var temp = mouseOnNode();
        //if the edge is not duplicate, no self-looping, and mouse is over another edge
        if(temp && temp != edgeOk && !graph.get(temp).includes(edgeOk)){
            addEdge(temp, edgeOk); // adds new edge
            edges.push([edgeOk, temp]);
            console.log(graph);
            console.log("EDGE!");
            edgeOk = null;
        }
        else{
            edgeOk = null;
            console.log("False Alarm");
        }
    }
    else{
        edgeOk = null;
    }
}

var intX, intY;
function mousePressed(){ // mouse clicked
    if(mouseButton === LEFT){ // create node only for left click
        var temp = mouseOnNode();
    }
    //creating node inside canvas, when used left click and no nodes are overlapping
    if(mouseX >=0 && mouseX <= width && mouseY >= 0 && mouseY <= height && !temp && mouseButton === LEFT){
        edgeOk = null;
        // auto adjusting node's x,y towards closest grid intersection
        var coordinates = closestIntersection(mouseX, mouseY);
        createNode(statChar, coordinates[0], coordinates[1]);
        statChar = String.fromCharCode(statChar.charCodeAt(0) + 1);
    }
    else{
        if(temp){ // Mouse is over a node, allowing to create an edge
            intX = mouseX;
            intY = mouseY;
            edgeOk = temp;
        }
        else{
            edgeOk = null;
        }
    }
    var temp = mouseOnNode();
}

var ok = false;
function mouseDragged(){
    if(edgeOk){
        ok = true; // line animation started
    }
    else{
        ok = false;
    }
}