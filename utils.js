function showGrid(){
    for(var i = 1; i < cols; i++){
        line(i * w, 0, i * w, height);
    }
    for(var i = 1; i < rows; i++){
        line(0, i * h, width, i * h);
    }
}

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
function showNodes(){
    for(var i = 0; i < nodeArray.length; i++){
        nodeArray[i].show(255);
    }
}

function createNode(nodeName, x, y){
    var newNode = new Node(nodeName, x, y);
    nodeArray.push(newNode);
    addVertex(newNode);
}

function deleteNode(node){
    removeFromArray(nodeArray, node);
    for(var i = 0; i < edges.length; i++){
        //checking if the node have edges or not
        if(edges[i].includes(node)){
            removeFromArray(edges, edges[i]);
            break;
        }
    }
    if(i != edges.length){
        deleteNode(node); // deleting element changes arr size, calling recursively to adjust
    }
    else{
        var neighbors = graph.get(node); // neighbors of delete(node)
        for(var i = 0; i < neighbors.length; i++){
            var temp = graph.get(neighbors[i]); //deleting node from each neighbors[] of neighbors
            removeFromArray(temp, node);
        }
        graph.delete(node);
    }
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
    if(abs(x - node.x) <= 27 && abs(y - node.y) <=27){
        return true;
    }
    else{
        return false;
    }
}

function showLines(){
    line(intX, intY, mouseX, mouseY);
}

function showEdges(){
    for(var i = 0; i < edges.length; i++){
        var temp = edges[i]
        stroke(255, 0, 0);
        line(temp[0].x, temp[0].y, temp[1].x, temp[1].y);
        stroke(0);
    }
}

function closestIntersection(x, y){
    var xw = round(x / w) * w; // closest x value on grid from mouseX
    var yh = round(y / h) * h; // closest y value on grid from mouseY
    return [xw, yh];
}

