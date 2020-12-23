function removeFromArray(arr, elt){
    for(i = arr.length - 1; i >= 0; i--){
        if(arr[i] == elt){
            arr.splice(i, 1);
        }
    }
}

var cols = 25;
var rows = 25;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];

var start, end;

var w, h;
var path = [];

function Node(i, j){
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.previous = undefined;

    this.show = function(col){
        fill(col);
        noStroke();
        rect(this.i * w, this.j * h, w - 1, h - 1);
    }

    this.addNeighbors = function(grid){
        if(this.i > 0){
            this.neighbors.push(grid[this.i - 1][this.j]);
        }
        if(this.i < cols - 1){
            this.neighbors.push(grid[this.i + 1][this.j]);
        }
        if(this.j > 0){
            this.neighbors.push(grid[this.i][this.j - 1]);
        }
        if(this.j < rows - 1){
            this.neighbors.push(grid[this.i][this.j + 1]);
        }
    }
}

function setup(){
    createCanvas(400, 400);
    w = width / cols;
    h = height / rows;
    for(var i = 0; i < cols; i++){
        grid[i] = new Array(rows);
    }
    console.table(grid);
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            grid[i][j] = new Node(i, j);
        }
    }

    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            grid[i][j].addNeighbors(grid);
        }
    }
    start = grid[0][0];
    end = grid[cols - 1][3];
    openSet.push(start);

}

function draw(){
    if(openSet.length > 0){
        var winner = 0;
        for(var i = 0; i < openSet.length; i++){
            if(openSet[i].f < openSet[winner].f){
                winner = i;
            }
        }
        var current = openSet[winner];
        if(current === end){
            noLoop();
            console.log("end");
        }
        removeFromArray(openSet, current);
        closedSet.push(current);
        var neighbors = current.neighbors;
        for(var i = 0; i < neighbors.length; i++){
            var neighbor = neighbors[i];
            if(!closedSet.includes(neighbor)){
                var tempG = current.g + 1;
                if(openSet.includes(neighbor)){
                    if(tempG < neighbor.g){
                        neighbor.g = tempG;
                    }
                }
                else{
                    neighbor.g = tempG;
                    openSet.push(neighbor);
                }
                neighbor.h = heuristic(neighbor, end);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.previous = current;
            }

        }

    }
    else{

    }
    background(0);
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            grid[i][j].show(color(255));
        }
    }

    for(var i = 0; i < closedSet.length; i++){
        closedSet[i].show(color(255, 0, 0));
    }

    for(var i = 0; i < openSet.length; i++){
        openSet[i].show(color(0, 255, 0));
    }

    path = [];
    var temp = current;
    path.push(temp);
    while(temp.previous){
        
        path.push(temp.previous);
        temp = temp.previous;
    }

    for(var i = 0; i < path.length; i++){
        path[i].show(color(0, 0, 255));
    }
}

function heuristic(start, end){
    var h = dist(start.i, start.j, end.i, end.j);
    return h;
}