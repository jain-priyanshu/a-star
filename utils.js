function removeFromArray(arr, elt){
    for(i = arr.length - 1; i >= 0; i--){
        if(arr[i] == elt){
            arr.splice(i, 1);
        }
    }
}

function heuristic(start, end){
    var h = dist(start.i, start.j, end.i, end.j);
    return h;
}

function showNodes(arr, col, type){
    if(type === 2){
        for(var i = 0; i < cols; i++){
            for(var j = 0; j < rows; j++){
                arr[i][j].show(color(col));
            }
        }
    }
    else{
        for(var i = 0; i < arr.length; i++){
            arr[i].show(color(col));
        }
    }

}