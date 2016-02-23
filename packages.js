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

new Package({

    name:"jquery",
    humanname:"jQuery",
    id:"org.jquery",
    author:"jQuery Foundation",

    critical:true,

    versionMajor:2,
    versionMinor:1,
    versionPatch:4,
    version:"2.2.1",

    scripts:"Libraries/jQuery/jquery-2.2.1.min.js",

    class:"library"
});

new Package({

    name:"jqueryx",
    humanname:"jQuery Extensions",
    id:"com.dangeredwolf.openshell.jqueryx.consts",
    author:"The OpenShell Foundation",

    versionMajor:1,
    versionMinor:0,
    versionPatch:0,
    version:"1.0",

    depends:"jquery",

    scripts:"PackageFiles/jqueryAdditions/jqueryAdditions.js",

    class:"autorun"
});

new Package({

    name:"jqueryui",
    humanname:"jQuery UI",
    id:"org.jquery.ui",
    author:"jQuery Foundation",

    versionMajor:1,
    versionMinor:11,
    versionPatch:4,
    version:"1.11.4",

    depends:"jquery",

    scripts:"Libraries/jQuery/jquery-ui.min.js",

    styles:[
        "Libraries/jQuery/jquery-ui.min.css",
        "Libraries/jQuery/jquery-ui.structure.min.css"
    ],

    class:"library"
});

new Package({

    name:"window",
    humanname:"Window Objects",
    id:"com.dangeredwolf.openshell.window",
    author:"The OpenShell Foundation",

    versionMajor:1,
    versionMinor:0,
    versionPatch:0,
    version:"1.0",

    scripts:"PackageFiles/windowmanager/window.js",

    styles:"PackageFiles/windowmanager/window.css",

    depends:[
        "jquery",
        "jqueryx",
        "init"
    ],

    class:"library"
});

new Package({
    name:"init",
    humanname:"OpenShell Init Script",
    id:"com.dangeredwolf.openshell.init",
    author:"The OpenShell Foundation",

    versionMajor:1,
    versionMinor:0,
    versionPatch:0,
    version:"1.0",

    depends:[
        "jquery",
        "jqueryx"
    ],

    scripts:"PackageFiles/init/osinit.js",

    class:"autorun"
});

beginInit();
