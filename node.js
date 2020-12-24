function Node(nodeName, x, y){
    this.nodeName = nodeName;
    this.x = x;
    this.y = y;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.previous = undefined;

    this.show = function(col){
        fill(col);
        ellipse(this.x , this.y, 50, 50);
        textAlign(CENTER, CENTER);
        fill(0);
        text(this.nodeName, this.x, this.y);
    }

    this.showEdges = function(end){
        
    }

}