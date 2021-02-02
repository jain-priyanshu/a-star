var aStar = function(event){
    result.innerHTML  = '';
    dispPath.innerHTML = '';
    event.preventDefault();
    showNodes(nodeArray, 255);
    resetValues();
    var stringPath = '';
    var temp = document.getElementById('start-end');
    temp.style.display = "none";
    var tempStart = document.getElementById('start');
    var tempEnd = document.getElementById('end');
    openSet = [];
    closedSet = [];
    path = [];
    start = null;
    end = null;
    for(var i = 0; i < nodeArray.length; i++){
        if(nodeArray[i].nodeName == tempStart.value.toUpperCase()){
            start = nodeArray[i];
        }
        if(nodeArray[i].nodeName == tempEnd.value.toUpperCase()){
            end = nodeArray[i];
        }
    }
    if(!start || !end){
        startEndInput();
        return;
    }
    var done = false;
    openSet.push(start);
    const interval = setInterval(() => {
        if (openSet.length > 0) {
            var winner = minArray(openSet);
            var current = openSet[winner];
            if (current === end) {
                done = true;
                for(var i = path.length - 1; i >= 0; i--){
                    stringPath += path[i].nodeName + ' ';
                }
                stringPath += end.nodeName;
                dispPath.innerHTML = stringPath;
                result.innerHTML = 'Done';
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
                        neighbor.h = manhattan(neighbor, end);
                        neighbor.f = neighbor.h + neighbor.g;
                        neighbor.previous = current;
                    }
                }
            }
        } else {
            done = true;
            console.log("No Solution");
            result.innerHTML = 'No Solution';
            clearInterval(interval);
            return;
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