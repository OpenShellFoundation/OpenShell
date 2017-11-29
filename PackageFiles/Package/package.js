/*
OpenShell Modular Class System

Provides an abstract way to modularise OpenShell

(c) 2017 The OpenShell Foundation
(c) 2017 Ryan Dolan (dangeredwolf)

Released under the GNU Public License (GPL) Version 2

*/

"use strict";

var loadedPackages = [];
var loadedPackageNames = [];
var ignoreDependencyErrors = false;
var ignoreInvalidMetadata = false;
var loadedPackageMetadata = [];
var autorunScripts = [];

function assertion(statement,message) {
    if (!statement) {
        throw message
    }
}

function Package(data){
    if (!ignoreInvalidMetadata) {
        assertion(typeof data === "object","Package needs argument of type object, got " + typeof data);
        assertion(typeof data.humanname === "string","Required package value 'humanname' should be string, got " + typeof data.humanname);
        assertion(typeof data.name === "string","Required package value 'name' should be string, got " + typeof data.name);
        assertion(typeof data.id === "string","Required package value 'id' should be string, got " + typeof data.id);
        assertion(typeof data.class === "string","Required package value 'class' should be string, got " + typeof data.class);
        assertion(typeof data.author === "string","Required package value 'author' should be string, got " + typeof data.author);
        assertion(typeof data.version === "string","Required package value 'version' should be string, got " + typeof data.version);
        assertion(typeof data.versionMajor === "number","Required package value 'versionMajor' should be number, got " + typeof data.versionMajor + ". If you aren't using this value, set it to 0");
        assertion(typeof data.versionMinor === "number","Required package value 'versionMinor' should be number, got " + typeof data.versionMinor + ". If you aren't using this value, set it to 0");
        assertion(typeof data.versionPatch === "number","Required package value 'versionPatch' should be number, got " + typeof data.versionPatch + ". If you aren't using this value, set it to 0");
    }

    switch (data.class) {
        case "library": {
            assertion(typeof data.scripts === "function" || typeof data.scripts === "object" || typeof data.scripts === "string" || typeof data.styles === "string" || typeof data.styles === "object","Package value 'scripts' requires function OR string for type 'library', and/or 'styles' requires string, got " + typeof data.scripts);

            if (typeof data.scripts === "string") {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = data.scripts;
                document.head.appendChild(script); // Once started, it should add itself to libraries object
                if (data.doubleStart) {
                    setTimeout(function(){
                        var script2 = document.createElement("script");
                        script2.type = "text/javascript";
                        script2.src = data.scripts;
                        document.head.appendChild(script2);
                    },50);
                }
                console.log("Loaded library " + data.name + " (" + data.humanname + ") script");
            } else if (typeof data.scripts === "function") {
                libraries[data.name] = data.scripts; // Add via package metadata parser
                console.log("Loaded library " + data.name + " (" + data.humanname + ") script");
            } else if ((typeof data.styles === "string" || typeof data.styles === "object") && typeof data.scripts === "undefined") {
            } else {
                for (var k = 0; k < data.scripts.length; k++) {
                    var script = document.createElement("script");
                    script.type = "text/javascript";
                    script.src = data.scripts[k];
                    document.head.appendChild(script);
                    console.log("Loaded library " + data.name + " (" + data.humanname + ") script #" + (k + 1));
                }
            }

            if (typeof data.styles === "string") {
                var style = document.createElement("link");
                style.rel = "stylesheet";
                style.href = data.styles;
                document.head.appendChild(style);
                console.log("Loaded library " + data.name + " (" + data.humanname + ") style");
            } else if (typeof data.styles === "object") {
                for (var k = 0; k < data.styles.length; k++) {
                    var style = document.createElement("link");
                    style.rel = "stylesheet";
                    style.href = data.styles[k];
                    document.head.appendChild(style);
                    console.log("Loaded library " + data.name + " (" + data.humanname + ") style #" + (k + 1));
                }
            }

            break;
        }
        case "autorun": {
            assertion(typeof data.scripts === "function" || typeof data.scripts === "object" || typeof data.scripts === "string","Package value function, object OR string 'func' required for type 'autorun', got " + typeof data.scripts);

            autorunScripts[autorunScripts.length] = data.scripts;
            break;
        }
        case "app": {
            throw "Hey, this feature isn't ready yet!";
            break;
        }

    }

    console.log("Loaded package " + data.name + " (" + data.id + ")");

    loadedPackages.push(data.id);
    loadedPackages.push(data.name);
    loadedPackageNames.push(data.name);
    loadedPackageMetadata.push(data);

}

function verifyDependencies() {

    if (ignoreDependencyErrors) {
        console.log("Skipping dependency check...");
        return;
    }

    console.log("Performing dependency check...");

    for (var a = 0; a < loadedPackageMetadata.length; a++) {
        var hasUnmetDependencies = false;

        if (typeof loadedPackageMetadata[a] === "object" && typeof loadedPackageMetadata[a].depends === "object") {
            for (var i = 0; i < loadedPackageMetadata[a].depends.length; i++) {
                var available = false;
                for (var j = 0; j < loadedPackages.length; j++) {
                    if (loadedPackages[j] === loadedPackageMetadata[a].depends[i]) {
                        available = true;
                        console.log("Required Dependency " + loadedPackages[j] + " is OK");
                        break;
                    }
                }
                if (!available) {
                    console.warn("Unmet dependency!!!: " + loadedPackageMetadata[a].depends[i]);
                    hasUnmetDependencies = true;
                }
            }

            if (hasUnmetDependencies) {
                throw "Package " + (loadedPackageMetadata[a].name || "missingno") + " has unmet dependencies. Make sure libraries are initialized first.  If you're still having trouble, enable ignoreDependencyErrors";
            }
        } else if (loadedPackageMetadata[a] === "object" && typeof loadedPackageMetadata[a].depends === "string") {

          var available = false;

          for (var j = 0; j < loadedPackages.length; j++) {
              if (loadedPackages[j] === loadedPackageMetadata[a].depends) {
                  available = true;
                  console.log("Required Dependency " + loadedPackageMetadata[a].depends + " is OK");
                  break;
              }
          }

          if (!available) {
            console.warn("Unmet dependency!!!: " + loadedPackageMetadata[a].depends[i]);
          }

        }
    }
}

function beginInit() {
    verifyDependencies();

    console.log("Starting autorunScripts");

    assertion(autorunScripts.length > -1,"CRITICAL ISSUE: There is no initialization candidate declared by the packages.js file. OpenShell cannot continue to launch properly!!");

    for (var j = 0; j < autorunScripts.length; j++) {
        if (typeof autorunScripts[j] === "function") {
            setTimeout(autorunScripts[j],0);
            console.log("autorunScripts " + j + " started as function");
        } else if (typeof autorunScripts[j] === "string") {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = autorunScripts[j];
            document.head.appendChild(script);

            console.log("autorunScripts " + j + " started as script");
        } else if (typeof autorunScripts[j] === "object") {
            for (var k = 0; k < autorunScripts[j].length; k++) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = autorunScripts[j][k];
                document.head.appendChild(script);

                console.log("autorunScripts " + j + "." + k + " started as script");
            }
        } else {
            assertion(typeof autorunScripts[j] === "function","autorunScripts " + j + " is not a function nor string!!");
        }
    }
}
