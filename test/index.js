var ModuleManager = require("../src");

var assert = require("assert");

var mm = new ModuleManager(">2.3.5.12");

var m1 = "1.4.7.30";
var m2 = "2.5.7.30";
var m3 = "2.4.2.30";
var m4 = "2.5.7.30";
var m5 = "2.7.4.34";
var m6 = "2.4.7.30";
var m7 = "3.8.5.45";
var m8 = "2.4.3.30";
var m9 = "2.4.7.24";
var m10 = "2.4.7.10";

var module_list = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10]

mm.setModules(module_list);

/*
the sort function will sort the modules that are set if the parameters are empty
otherwise it will sort the array of modules that are provide to them.
 */

var array = mm.sort();



assert.equal(array.join(", ").toString(),"1.4.7.30, 2.4.2.30, 2.4.3.30, 2.4.7.10, 2.4.7.24, 2.4.7.30, 2.5.7.30, 2.5.7.30, 2.7.4.34, 3.8.5.45","Sort function is incorrect");


//Comparing two modules number. m1 < m2 so the value returned should be -1
assert.equal(mm.compare(m1,m2),-1,"The Compare function is incorrect");


//Comparing two modules number. m1 == m1 so the value returned should be 0
assert.equal(mm.compare(m1,m1),0,"The Compare function is incorrect. Modules are the same but labelled as different");


/*
This will used the modules that were set. This will grab a list of modules that fit the citerior.
This list can be narrowed to a specific modules using
getBestModules
 */
//mm.getAllowedModules("3.x.x.x");


//testing getting the version of the module set in the ModuleManager
assert.equal(mm.fullVersion(),"2.3.5.12","ModuleSelector fullversion is incorrect");


// getting the version number alone
assert.equal(mm.version(),"2","ModuleSelector version is incorrect");

//getting the major version alone
assert.equal(mm.major(),"3","ModuleSelector major is incorrect");

//getting the minor version alone
assert.equal(mm.minor(),"5","ModuleSelector minor is incorrect");

//getting the core version alone
assert.equal(mm.core(),"12","ModuleSelector core is incorrect");

assert.equal(mm.type(),">","ModuleSelector type is incorrect");

//">2.3.5.12" testing
assert.equal(mm.allowed("2.3.5.12"),false);
assert.equal(mm.allowed("2.3.5.40"),true);

assert.equal(mm.allowed("1.3.5.40"),false);


mm = new ModuleManager(">=2.3.5.12");

assert.equal(mm.allowed("2.3.5.12"),true);
assert.equal(mm.allowed("2.3.5.40"),true);
assert.equal(mm.allowed("1.3.5.40"),false);


mm = new ModuleManager("<=2.3.5.12");

assert.equal(mm.allowed("2.3.5.12"),true);
assert.equal(mm.allowed("2.3.5.40"),false);
assert.equal(mm.allowed("1.3.5.40"),true);


mm = new ModuleManager("<2.3.5.12");

assert.equal(mm.allowed("2.3.5.12"),false);
assert.equal(mm.allowed("2.3.5.40"),false);
assert.equal(mm.allowed("1.3.5.40"),true);


mm = new ModuleManager(">=2.4.7.34");
mm.setModules(module_list);
var allowed=mm.getAllowedModules();

console.log(allowed);
assert.equal(mm.rawVersion(),">=2.4.7.34");
mm.setVersion(3);

assert.equal(mm.rawVersion(),">=3.4.7.34");

mm.roundCore();
assert.equal(mm.rawVersion(),">=3.4.7.40");

mm.roundMinor();
assert.equal(mm.rawVersion(),">=3.4.8.0");

mm.roundMajor();
assert.equal(mm.rawVersion(),">=3.5.0.0");

mm.roundVersion();
assert.equal(mm.rawVersion(),">=4.0.0.0");


mm = new ModuleManager("4.3.x.x");
mm.setModules(module_list);
assert.equal(mm.allowed("4.3.10.30"),true);

console.log(mm.sort().join(", "));
console.log('Test ran successfully with no errors');
