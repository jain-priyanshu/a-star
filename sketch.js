var cols = 13;
var rows = 11;
var w, h;
var nodeArray = [];
var graph = new Map();
var edge = false;

function setup(){
    createCanvas(700, 550);
}

function draw(){
    w = width / cols;
    h = height / rows;
    background(255);
    for(var i = 1; i < cols; i++){
        line(i * w, 0, i * w, height);
    }
    for(var i = 1; i < rows; i++){
        line(0, i * h, width, i * h);
    }
    showNodes(nodeArray);
    if(nodeArray[0]){
        nodeArray[0].show([255, 0, 0]);

    }
}

var statChar = 'A'
function mouseClicked(){
    if(!edge){
        createNode(statChar, mouseX, mouseY);
        statChar = String.fromCharCode(statChar.charCodeAt(0) + 1);
    }
    else{
        var temp = mouseOnNode();
        if(temp){
            console.log("EDGE!");
        }
        else{
            console.log("False Alarm");
        }
    }
}

function mousePressed(){
    var temp = mouseOnNode();
    if(temp){
        edge = true;
    }
    else{
        edge = false;
    }
}

function mouseDragged(){
    if(edge){

    }
}