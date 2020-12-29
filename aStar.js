function aStar(){
    openSet = [];
    closedSet = [];
    path = [];
    start = nodeArray[0];
    end = nodeArray[nodeArray.length - 1];
    var done = false;
    openSet.push(start);
    const interval = setInterval(() => {
        if (openSet.length > 0) {
            var winner = 0;
            for (var i = 0; i < openSet.length; i++) {
                if (openSet[i].f < openSet[winner].f) {
                    winner = i;
                }
            }
            var current = openSet[winner];
            if (current === end) {
                done = true;
                clearInterval(interval);
            }
            removeFromArray(openSet, current);
            closedSet.push(current);

            var neighbors = graph.get(current);
            for (var i = 0; i < neighbors.length; i++) {
                var neighbor = neighbors[i];
                if (!closedSet.includes(neighbor)) {
                    var newPath = false;
                    for(var j = 0; j < edges.length; j++){
                        if(edges[j].includes(current) && edges[j].includes(neighbor)){
                            var tempG = current.g + gMap.get(edges[j]);
                        }
                    }

                    if (openSet.includes(neighbor)) {
                        if (tempG < neighbor.g) {
                            newPath = true;
                            neighbor.g = tempG;
                        }
                    }
                    else{
                        newPath = true;
                        neighbor.g = tempG;
                        openSet.push(neighbor);
                    }
                    if (newPath) {
                        neighbor.h = 0;
                        neighbor.f = neighbor.h + neighbor.g;
                        neighbor.previous = current;
                    }
                }
            }
        } else {
            done = true;
            console.log("No Solution");
            clearInterval(interval);
            return;
        }
        path = [];
        var temp = current;
        path.push(temp);
        while (temp.previous) {
            path.push(temp.previous);
            temp = temp.previous;
        }
        showNodes(openSet, [0, 255, 0]);
        showNodes(closedSet, [255, 0, 0]);
        showNodes(path, [0, 0, 255]);
    }, 1000);
}