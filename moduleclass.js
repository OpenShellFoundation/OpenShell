/*
OpenShell Modular Class System

Provides an abstract way to modularise OpenShell

(c) 2016 The OpenShell Foundation
(c) 2016 Ryan Dolan (dangeredwolf)

Released under the GNU Public License (GPL) Version 2

*/

"use strict";

var loadedModules = [];
var loadedModuleNames = [];
var library = {};
var ignoreDependencyErrors = false;
var ignoreInvalidMetadata = false;
var loadedModuleMetadata = {};
var autorunFuncs = [];

function assertion(statement,message) {
    if (!statement) {
        throw message
    }
}

function Module(data){
    if (!ignoreInvalidMetadata) {
        assertion(typeof data === "object","Module needs argument of type object, got " + typeof data);
        assertion(typeof data.humanname === "string","Required module value 'humanname' should be string, got " + typeof data.humanname);
        assertion(typeof data.name === "string","Required module value 'name' should be string, got " + typeof data.name);
        assertion(typeof data.id === "string","Required module value 'id' should be string, got " + typeof data.id);
        assertion(typeof data.class === "string","Required module value 'class' should be string, got " + typeof data.class);
        assertion(typeof data.author === "string","Required module value 'author' should be string, got " + typeof data.author);
        assertion(typeof data.version === "string","Required module value 'version' should be string, got " + typeof data.version);
        assertion(typeof data.versionMajor === "number","Required module value 'versionMajor' should be number, got " + typeof data.versionMajor + ". If you aren't using this value, set it to 0");
        assertion(typeof data.versionMinor === "number","Required module value 'versionMinor' should be number, got " + typeof data.versionMinor + ". If you aren't using this value, set it to 0");
        assertion(typeof data.versionPatch === "number","Required module value 'versionPatch' should be number, got " + typeof data.versionPatch + ". If you aren't using this value, set it to 0");
    }

    switch (data.class) {
        case "library": {
            assertion(typeof data.func === "function" || typeof data.func === "string","Module value function OR string 'func' required for type 'library', got " + typeof data.func);

            if (typeof data.func === "string") {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = data.func;
                document.head.appendChild(script); // Once started, it should add itself to libraries object
                if (data.doubleStart) {
                    setTimeout(function(){
                        var script2 = document.createElement("script");
                        script2.type = "text/javascript";
                        script2.src = data.func;
                        document.head.appendChild(script2);
                    },50);
                }
            } else {
                libraries[data.name] = data.func; // Add via module metadata parser
            }

            break;
        }
        case "autorun": {
            assertion(typeof data.func === "function" || typeof data.func === "string","Module value function OR string 'func' required for type 'autorun', got " + typeof data.func);

            autorunFuncs[autorunFuncs.length] = data.func;
            break;
        }
        case "app": {
            throw "Hey, this feature isn't ready yet!";
            break;
        }

    }

    console.log("Loaded module " + data.name + " (" + data.id + ")");

    loadedModules[loadedModules.length] = data.id;
    loadedModules[loadedModules.length] = data.name;
    loadedModuleNames[loadedModuleNames.length] = data.name;
    loadedModuleMetadata[loadedModuleMetadata.length] = data;

}

function verifyDependencies() {

    if (ignoreDependencyErrors) {
        console.log("Skipping dependency check...");
        return;
    }

    console.log("Performing dependency check...");

    for (var a = 0; a < loadedModuleMetadata.length; a++) {
        var hasUnmetDependencies = false;

        if (typeof loadedModuleMetadata[a] === "object" && typeof loadedModuleMetadata[a].depends === "object") {
            for (var i = 0; i < loadedModuleMetadata[a].depends.length; i++) {
                var available = false;
                for (var j = 0; j < loadedModules.length; j++) {
                    if (loadedModules[j] === loadedModuleMetadata[a].depends[i]) {
                        available = true;
                        console.error("Required Dependency " + loadedModules[j] + " is OK");
                        break;
                    }
                }
                if (!available) {
                    console.error("Unmet dependency!!!: " + loadedModuleMetadata[a].depends[i]);
                }
            }

            if (hasUnmetDependencies) {
                throw "Package " + loadedModuleMetadata[a].name || "missingno" + " has unmet dependencies. Make sure libraries are initialised first.  If you're still having trouble, enable ignoreDependencyErrors";
            }
        }
    }
}

function beginInit() {
    verifyDependencies();

    console.log("Starting autorunFuncs");

    assertion(autorunFuncs.length > -1,"CRITICAL ISSUE: There is no initialization candidate declared by the packages.js file. OpenShell cannot continue to launch!!");

    for (var j = 0; j < autorunFuncs.length; j++) {
        if (typeof autorunFuncs[j] === "function") {
            setTimeout(autorunFuncs[j],0);
            console.log("autorunFuncs " + j + " started as function");
        } else if (typeof autorunFuncs[j] === "string") {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = autorunFuncs[j];
            document.head.appendChild(script);

            console.log("autorunFuncs " + j + " started as script");
        } else {
            assertion(typeof autorunFuncs[j] === "function","autorunFuncs " + j + " is not a function nor string!!");
        }
    }
}
