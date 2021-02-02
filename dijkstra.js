var dijkstra = function(event){
    openSet = [];
    closedSet = [];
    path = [];
    nodeArray.forEach(element => {
        openSet.push(element);
        element.g = Infinity;
        element.previous = undefined;

    });
    nodeArray[0].g = 0;
    let current = openSet[0];
    openSet.splice(0, 1);
    closedSet.push(current);
    const interval = setInterval(() => {
        if(openSet.length >  0){
            let neighbors = graph.get(current);
            neighbors.forEach(element => {
                if(!closedSet.includes(element)){
                    for(let j = 0; j < edges.length; j++){
                        if(edges[j].includes(current) && edges[j].includes(element)){
                            var tempG = current.g + gMap.get(edges[j]);
                        }
                    }
                    if(tempG < element.g){
                        element.g = tempG;
                        element.previous = current;
                    }
                }
            });
            let pos = minArray(openSet);
            current = openSet[pos];
            closedSet.push(current);
            openSet.splice(pos, 1);
        }
        else{
            clearInterval(interval);
        }
        path = [];
        var temp = current;
        path.push(temp);
        while (temp.previous) {
            console.log("Hey");
            path.push(temp.previous);
            temp = temp.previous;
        }
        showNodes(openSet, [0, 255, 0]);
        showNodes(closedSet, [255, 0, 0]);
        showNodes(path, [0, 0, 255]);

    }, 1000);
}