var ModuleSelector = require("./ModuleSelector");
//var ModuleCompare = require("./ModuleCompare");

function ModuleManager(version,allow) {
    this.warning = !!allow;
    ModuleSelector.call(this,version);
}

ModuleManager.prototype = Object.create(ModuleSelector.prototype);

ModuleManager.constructor=ModuleManager;

var _ModuleManager = ModuleManager.prototype;


_ModuleManager.getAllowedModules=function getAllowedModules(param,modules){
    if(typeof param ==="undefined" && typeof modules ==="undefined"){
        return this.getAllowedModules(this._version);
    }

    if(typeof modules==="undefined"){
        return this.getAllowedModules(param,this.getModules());
    }

    var that=this;

    param = param.toLowerCase();
    var allowed = modules.filter(function(element,index,array){
        if(that.allowed(element)){
            return element;
        }
    });
    return allowed;
}


_ModuleManager.getBestModule=function getBestModule(param,modules){
    var allowed = this.getAllowedModules(param,modules);
    allowed = this.sort(allowed);
    if(allowed.length>0){
        return allowed[allowed.length-1];
    }else{
        return null;
    }
}

/**
 * returns the -1 if a is bigger and 1 if b is bigger, or it will return a 0 if they are the same
 */

/*
_ModuleManager.compare = function compare(a, b) {
    return this.constructor.ModuleCompare.compare()
}

_ModuleManager.compareVersion = function compareVersion(a, b) {
    var position = this.compareByIndex(a, b, 0);
    if (position === 0) {
        return this.compareMajor(a, b);
    } else {
        return position;
    }
}

_ModuleManager.compareMajor = function compareMajor(a, b) {
    var position = this.compareByIndex(a, b, 1);
    if (position === 0) {
        return this.compareMinor(a, b);
    } else {
        return position;
    }
}

_ModuleManager.compareMinor = function compareMinor(a, b) {
    var position = this.compareByIndex(a, b, 2);
    if (position === 0) {
        return this.compareCore(a, b);
    } else {
        return position;
    }
}

_ModuleManager.compareCore = function compareCore(a, b) {
    var position = this.compareByIndex(a, b, 3);
    return position;
}

_ModuleManager.compareByIndex = function (a, b, index) {
    var position = 0;
    try {
        if (a[index] < b[index]) {
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

*/

_ModuleManager.toArray = function (a) {
    return a.split(".");
}

_ModuleManager.setModules = function(arr){
    this.__repository=arr;
}

_ModuleManager.getModules = function(){
    return this.__repository||[];
}

_ModuleManager.sort = function (arr) {
    if(typeof arr ==="undefined"){
        return this.sort(this.getModules());
    }

    var that = this;
    arr.sort(function (a, b) {
        var value = that.compare(a, b);
        if (0 < value) {
            return 1;
        } else {
            return -1;
        }
    })
    return arr;
}

_ModuleManager.setVersion=function(number){
    this.setNumber(number,0);
}

_ModuleManager.setMajor=function(number){
    this.setNumber(number,1);
}

_ModuleManager.setMinor=function(number){
    this.setNumber(number,2);
}

_ModuleManager.setCore=function(number){
    this.setNumber(number,3);
}

_ModuleManager.setNumber=function(number,index){
    var type=this.type();
    var version= this.versionArray();
    version[index]=parseInt(number);
    this._version = type+version.join(".");
}


_ModuleManager.roundCore=function(){
    var core = this.core();
    core = Math.ceil(core/10)*10;
    this.setCore(core);
}

_ModuleManager.roundMinor=function(){
    var number = this.minor();
    number++;
    this.setMinor(number);
    this.setCore(0);
}

_ModuleManager.roundMajor=function(){
    var number = this.major();
    number++;
    this.setMajor(number);
    this.setMinor(0);
    this.setCore(0);
}

_ModuleManager.roundVersion=function(){
    var number = this.version();
    number++;
    this.setVersion(number);
    this.setMajor(0);
    this.setMinor(0);
    this.setCore(0);
}


module.exports = ModuleManager;