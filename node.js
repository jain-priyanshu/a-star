function Node(xi, yj){
    this.i = xi;
    this.j = yj;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.previous = undefined;
    this.wall = false;

    if(random(1) < 0.3){
        this.wall = true;
    }

    this.show = function(col){
        fill(col);
        if(this.wall){
            fill(0);
        }
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
        if(this.i > 0 && this.j > 0){
            this.neighbors.push(grid[this.i - 1][this.j - 1]);
        }
        if(this.i > 0 && this.j < rows - 1){
            this.neighbors.push(grid[this.i - 1][this.j + 1]);
        }
        if(this.i < cols - 1 && this.j > 0){
            this.neighbors.push(grid[this.i + 1][this.j - 1]);
        }
        if(this.i < cols - 1 && this.j < rows - 1){
            this.neighbors.push(grid[this.i + 1][this.j + 1]);
        }
    }
}