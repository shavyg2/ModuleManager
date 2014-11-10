function ModuleCompare(){

}
var _ModuleCompare=ModuleCompare.prototype;


_ModuleCompare.compare = function compare(a, b) {
    var data = this.correctFormat(a, b);
    var position = this.compareVersion(data.a, data.b);
    return position;
}

_ModuleCompare.compareVersion = function compareVersion(a, b) {
    var position = this.compareByIndex(a, b, 0);
    if (position === 0) {
        return this.compareMajor(a, b);
    } else {
        return position;
    }
}

_ModuleCompare.compareMajor = function compareMajor(a, b) {
    var position = this.compareByIndex(a, b, 1);
    if (position === 0) {
        return this.compareMinor(a, b);
    } else {
        return position;
    }
}

_ModuleCompare.compareMinor = function compareMinor(a, b) {
    var position = this.compareByIndex(a, b, 2);
    if (position === 0) {
        return this.compareCore(a, b);
    } else {
        return position;
    }
}

_ModuleCompare.compareCore = function compareCore(a, b) {
    var position = this.compareByIndex(a, b, 3);
    return position;
}

_ModuleCompare.compareByIndex = function (a, b, index) {
    var position = 0;
    try {
        if(a[index]==="x" || b[index] === "x"){
            position = 0;
        }else if (a[index] < b[index]) {
            position = -1;
        } else if (a[index] > b[index]) {
            position = 1;
        }
    } catch (e) {
        if (this.warning) {
            console.log("Warning: A Module is supposed to have 4 numbers. Module is missing a number");
        }
    }
    return position;
}

_ModuleCompare.correctFormat = function (a, b) {
    if (typeof a === "string") {
        a = a.split(".");
    }
    if (typeof b === "string") {
        b = b.split(".");
    }
    return {a: a, b: b};
}


module.exports=ModuleCompare;
