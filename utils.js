function removeFromArray(arr, elt){
    for(var i = arr.length - 1; i >= 0; i--){
        if(arr[i] == elt){
            arr.splice(i, 1);
        }
    }
}

// Heuristics
function euclidian(start, end){
    var h = dist(start.i, start.j, end.i, end.j);
    return h;
}

function manhattan(){

}

// Node Functions
function showNodes(nodeArray){
    for(var i = 0; i < nodeArray.length; i++){
        nodeArray[i].show(255);
    }
}

function createNode(nodeName, x, y){
    var newNode = new Node(nodeName, x, y);
    nodeArray.push(newNode);
    addVertex(newNode);
}

//Adj List Functions
function addVertex(node){
    graph.set(node, []);
}

function addEdge(start, end){
    graph.get(start).push(end);
    graph.get(end).push(start);
}

function mouseOnNode(){
    for(var i = 0; i < nodeArray.length; i++){
        if(interact(mouseX, mouseY, nodeArray[i])){
            return nodeArray[i];
        }
    }
    return 0;
}

function interact(x, y, node){
    if(abs(x - node.x) <= 25 && abs(y - node.y) <=25){
        return true;
    }
    else{
        return false;
    }
}