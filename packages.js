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

var jQueryPackage = new Module({
  humanname:"jQuery",
  name:"jquery",
  id:"org.jquery",
  author:"jQuery Foundation",
  versionMajor:2,
  versionMinor:1,
  versionPatch:4,
  version:"2.1.4",
  func:"Libraries/jQuery/jquery.min.js",
  class:"library"
});

var windowClass = new Module({
  humanname:"jQuery Extensions",
  name:"jqueryx",
  id:"com.dangeredwolf.openshell.jqueryx",
  author:"The OpenShell Foundation",
  versionMajor:1,
  versionMinor:0,
  versionPatch:0,
  version:"1.0",
  depends:["jquery"],
  doubleStart:true,
  func:"PackageFiles/jqueryAdditions/jqueryAdditions.js",
  class:"library"
});

var windowClass = new Module({
  humanname:"Window Objects",
  name:"window",
  id:"com.dangeredwolf.openshell.window",
  author:"The OpenShell Foundation",
  versionMajor:1,
  versionMinor:0,
  versionPatch:0,
  version:"1.0",
  func:"PackageFiles/windowmanager/window.js",
  depends:["jquery","jqueryx","init"],
  class:"library"
});

var initScript = new Module({
  humanname:"OpenShell Init Script",
  name:"init",
  versionMajor:1,
  versionMinor:0,
  versionPatch:0,
  version:"1.0",
  author:"The OpenShell Foundation",
  id:"com.dangeredwolf.openshell.init",
  func:"PackageFiles/init/osinit.js",
  class:"autorun"
});

beginInit();
