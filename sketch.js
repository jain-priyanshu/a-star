var cols = 21;
var rows = 13;
var w, h;
var nodeArray = [];
var graph = new Map();
var edgeOk = null;
var edges = [];
var gMap = new Map();
var start, end;
var button;
var openSet = [];
var closedSet = [];
var path = [];
var result, dispPath;

function setup(){
    dispPath = document.getElementById('path');
    result = document.getElementById('result');
    var temp = document.getElementById('start-end');
    temp.style.display = "none";
    createCanvas(900, 557);
    button = createButton('A*');
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
    showNodes(nodeArray, 255);
    showNodes(openSet, [0, 255, 0]);
    showNodes(closedSet, [255, 0, 0]);
    showNodes(path, [0, 0, 255]);

    if(mouseIsPressed){
        if(mouseButton === RIGHT){
            var temp = mouseOnNode();
            if(temp){
                deleteNode(temp);
            }
        }
    }
    button.mousePressed(startEndInput);
}

var statChar = 'A';
var extra = '';
function mouseClicked(){ // mouse release
    ok = false; // line animation stops
    if(edgeOk){ // making a new edge in progress
        var temp = mouseOnNode();
        //if the edge is not duplicate, no self-looping, and mouse is over another edge
        if(temp && temp != edgeOk && !graph.get(temp).includes(edgeOk)){
            addEdge(temp, edgeOk); // adds new edge
            edges.push([edgeOk, temp]);
            gInput(edges[edges.length - 1]);
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
    if(mouseX >= w/2 && mouseX <= width - (w/2) && mouseY >= h/2 && mouseY <= height - (h/2) && !temp && mouseButton === LEFT){
        edgeOk = null;
        // auto adjusting node's x,y towards closest grid intersection
        var coordinates = closestIntersection(mouseX, mouseY);
        if(statChar == '['){
            statChar = 'A';
            if(!extra){
                extra = 'A';
            }
            else{
                extra = String.fromCharCode(extra.charCodeAt(0) + 1);
            }
        }
        createNode(extra+statChar, coordinates[0], coordinates[1]);
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