function min(arr) {
    return Math.min(...arr)
}

function max(arr) {
    return Math.max(...arr)
}

function sum(arr) {
    return arr.reduce(function(a,b){
        return a + b
    }, 0);
}

function mean(arr) {
    return sum(arr) / arr.length
}

function stdDev(arr) {
    var m = mean(arr)
    return Math.sqrt(arr.reduce(function (a,b) {
        return a + Math.pow(b - m, 2)
    }, 0) / (arr.length - 1))
}

var monteCarlo = function() {

    // We do this “forever” until we find a qualifying random value.
    while (true) {
        // Pick a random value.
        var r1 = random(1);
        // Assign a probability.
        var probability = r1;
        // Pick a second random value.
        var r2 = random(1);
        // Does it qualify? If so, we’re done!
        if (r2 < probability) {
            return r1;
        }
    }
};

