/*
packages.js

Provides packages so OpenShell knows how to initialise itself

(c) 2016 The OpenShell Foundation
(c) 2016 Ryan Dolan (dangeredwolf)

Released under the GNU Public License (GPL) Version 2

*/

"use strict";

console.log("Starting OpenShell BootStrap 1.0\n\
(c) 2016 Ryan Dolan (dangeredwolf)\n\
(c) 2016 The OpenShell Foundation\n\
\n\
Released under the GNU Public License (GPL) Version 2");

var jQueryPackage = new Package({

    humanname:"jQuery",
    name:"jquery",
    id:"org.jquery",
    author:"jQuery Foundation",

    versionMajor:2,
    versionMinor:1,
    versionPatch:4,
    version:"2.2.1",

    scripts:"Libraries/jQuery/jquery-2.2.1.min.js",

    class:"library"
});

var windowClass = new Package({

    name:"jqueryx",
    humanname:"jQuery Extensions",
    id:"com.dangeredwolf.openshell.jqueryx.consts",
    author:"The OpenShell Foundation",

    versionMajor:1,
    versionMinor:0,
    versionPatch:0,
    version:"1.0",

    depends:[
    "jquery"
    ],

    scripts:[
        "PackageFiles/jqueryAdditions/jqueryAdditions.js",
        "PackageFiles/jqueryAdditions/jqueryAdditions2.js",
        "PackageFiles/jqueryAdditions/jqueryAdditions3.js",
        "PackageFiles/jqueryAdditions/jqueryAdditions4.js"
    ],

    class:"library"
});

var jQueryUIPackage = new Package({

    humanname:"jQuery UI",
    id:"org.jquery.ui",
    author:"jQuery Foundation",

    versionMajor:1,
    versionMinor:11,
    versionPatch:4,
    version:"1.11.4",

    depends:[
        "jquery"
    ],

    scripts:"Libraries/jQuery/jquery-ui.min.js",

    styles:[
        "Libraries/jQuery/jquery-ui.min.css",
        "Libraries/jQuery/jquery-ui.structure.min.css"
    ],

    class:"library"
});

var windowClass = new Package({
    humanname:"Window Objects",
    name:"window",
    id:"com.dangeredwolf.openshell.window",
    author:"The OpenShell Foundation",

    versionMajor:1,
    versionMinor:0,
    versionPatch:0,
    version:"1.0",

    scripts:"PackageFiles/windowmanager/window.js",

    depends:[
        "jquery",
        "jqueryx",
        "init"
    ],

    class:"library"
});

var initScript = new Package({
    name:"init",
    humanname:"OpenShell Init Script",
    id:"com.dangeredwolf.openshell.init",
    author:"The OpenShell Foundation",

    versionMajor:1,
    versionMinor:0,
    versionPatch:0,
    version:"1.0",

    scripts:"PackageFiles/init/osinit.js",

    class:"autorun"
});

beginInit();
