#Module Manager

This plugins aims to bring some sorting capabilities to plugins as well as various functions to help make it easier to manage different versions of a software.

The reason for this is to have an application upgrade based on certain *parameters*.

Look at the following situation. You want and application to have a certain version of the application to load at start time without having to always configure on the server which version to load.

The most important methods are:

    ModuleManager.prototype.setModules(Array modules);

>This settings the list of available modules that will be used. This is the array of modules that are available to be used. This can normally be all the modules that are available on the server unless there is a specific set of modules that should be excluded.

    ModulesManager.constructor(string module_settings);

>This can be used to set the condition for the module that you want to use.

eg

    var moduleManager = new ModuleManager(">=2.3.5.6");
This will only load modules that are greater than 2.3.5.6

**Options are**

|Greater than or equal |Less than or equal|Greater than|Less than|Empty|
|:--------------------:|:----------------:|:----------:|:-------:|:---:|
|>=                    |<=                |      >     |    <    |     |

You can also specify x in a module if you don't care which version is loaded.

    new ModuleManager("2.3.x.x");

>This will load all modules that will fit into this statement. Versions such as 2.3.0.0 to 2.3.100.100 will work. Even numbers that are greater than 100 will still work.

    ModuleManager.prototype.sort([Array module_list])
>This methods takes and optional array. If no modules are set it will be the modules that were set using set modules. If the function receives an empty parameter set and there was not modules set using ModuleMananger.prototype.setModules the sort function will use an empty array and return the empty array.

    ModuleManager.prototype.getAllowedModules([string module_settings],[Array modules_list])
>This will get the modules that are allowed based on the module_settings. If the module_settings are undefined and the module_list is also undefined the module_settings used when creating the ModuleMananger will be used as well as the list use in ModuleMananger.prototype.setModules will be used

###Examples
Look inside the test folder test/index.js to see the various methods that are available.
This can be run using node test