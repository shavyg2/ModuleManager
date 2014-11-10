var non_numerical = /[^0-9.]/g;
var numerical = /[0-9.]/g;

var ModuleCompare = require("./ModuleCompare");

function ModuleSelector(version) {
    this._version = version || "*";
}

ModuleSelector.prototype = Object.create(ModuleCompare.prototype);
ModuleSelector.constructor = ModuleSelector;

var _ModuleSelector = ModuleSelector.prototype;

_ModuleSelector.rawVersion=function(){
    return this._version;
}

_ModuleSelector.rawFullVersion=function(){
    return this.rawVersion().replace(/^[^x0-9]+/,"");
}

_ModuleSelector.fullVersion = function () {
    if (this._version === "*") {
        return this._version;
    } else {
        return this._version.replace(non_numerical, "");
    }
}

_ModuleSelector.convertedFullVersion = function () {
    var version = this._version;
    version = version.replace(/x/g,"0");
    if (version === "*") {
        return "0.0.0.0";
    } else {
        return version.replace(non_numerical, "");
    }
}

_ModuleSelector.versionArray = function () {
    var v = this.fullVersion();
    v = v.split(".");
    return v;
}

_ModuleSelector.version = function () {
    return this.versionArray()[0];
}

_ModuleSelector.major = function () {
    return this.versionArray()[1];
}

_ModuleSelector.minor = function () {
    return this.versionArray()[2];
}

_ModuleSelector.core = function () {
    return this.versionArray()[3];
}

_ModuleSelector.type = function () {
    var type = this.rawVersion();

    if (this.fullVersion() === "*") {
        type = this.fullVersion();
    } else {
        type = this._version.replace(numerical, "");
    }
    type=type.replace(/[Xx]/g,"");
    return type;

}


function allowedResultCalculator(type, result) {
    if ((type === ">=" || type === ">") && result === -1) {
        return true;
    } else if( (type === ""||type==="*" || type===">=" || type==="<=") && result ===0){
        return true;
    }else if ((type === "<=" || type === "<") && result === 1) {
        return true;
    }else if(type==="" && result===0){
        return true;
    }
    else
    {
        return false;
    }
}

_ModuleSelector.allowed = function (version) {
    var my_version = this.rawFullVersion();
    var type = this.type();
    var result = this.compare(my_version, version);
    //console.log(type,result)
    return allowedResultCalculator(type, result);
}


module.exports = ModuleSelector;