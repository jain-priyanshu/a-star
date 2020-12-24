var cols = 13;
var rows = 11;
var w, h;
var nodeArray = [];
var graph = new Map();
var edge = null;
var edgeLines = [];

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
    for(var i = 1; i < cols; i++){
        line(i * w, 0, i * w, height);
    }
    for(var i = 1; i < rows; i++){
        line(0, i * h, width, i * h);
    }
    showEdges();
    showNodes();
    if(nodeArray[0]){
        nodeArray[0].show([255, 0, 0]);
    }
}

var statChar = 'A'
function mouseClicked(){
    ok = false;
    if(edge){
        var temp = mouseOnNode();
        if(temp && temp != edge && !graph.get(temp).includes(edge)){
            addEdge(temp, edge);
            edgeLines.push([temp.x, temp.y, edge.x, edge.y]);
            console.log(graph);
            console.log("EDGE!");
            edge = null;
        }
        else{
            edge = null;
            console.log("False Alarm");
        }
    }
    else{
        edge = null;
    }
}

var intX, intY;
function mousePressed(){
    var temp = mouseOnNode();
    if(mouseX >=0 && mouseX <= width && mouseY >= 0 && mouseY <= height && !temp){
        edge = null;
        createNode(statChar, mouseX, mouseY);
        statChar = String.fromCharCode(statChar.charCodeAt(0) + 1);
    }
    else{
        if(temp){
            intX = mouseX;
            intY = mouseY;
            edge = temp;
        }
        else{
            edge = null;
        }
    }
    var temp = mouseOnNode();
}

var ok = false;
function mouseDragged(){
    if(edge){
        ok = true;
    }
    else{
        ok = false;
    }
}