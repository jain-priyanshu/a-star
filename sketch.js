var cols = 50;
var rows = 50;
var grid = new Array(cols);
var openSet = [];
var closedSet = [];

var start, end;

var w, h;
var path = [];

function setup(){
    createCanvas(500, 500);
    w = width / cols;
    h = height / rows;
    for(var i = 0; i < cols; i++){
        grid[i] = new Array(rows);
    }
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
    end = grid[cols - 1][rows - 1];
    end.wall = false;
    start.wall = false;
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
            if(!closedSet.includes(neighbor) && !neighbor.wall){
                var newPath = false;
                var tempG = current.g + 1;
                if(openSet.includes(neighbor)){
                    if(tempG < neighbor.g){
                        neighbor.g = tempG;
                        newPath = true;
                    }
                }
                else{
                    newPath = true;
                    neighbor.g = tempG;
                    openSet.push(neighbor);
                }
                if(newPath){
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            }

        }

    }
    else{
        console.log("No Solution");
        noLoop();
        return;
    }
    background(0);
    showNodes(grid, 255, 2);
    showNodes(closedSet, [255, 0, 0], 1);
    showNodes(openSet, [0, 255, 0], 1);

    path = [];
    var temp = current;
    path.push(temp);
    while(temp.previous){
        
        path.push(temp.previous);
        temp = temp.previous;
    }
    showNodes(path, [0, 0, 255], 1);
}