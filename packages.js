/*
packages.js

Provides packages so OpenShell knows how to initialise itself

(c) 2016 The OpenShell Foundation
(c) 2016 Ryan Dolan (dangeredwolf)

Released under the GNU Public License (GPL) Version 2

*/

var jQueryPackage = new Module({
  humanname:"jQuery",
  name:"jquery",
  id:"org.jquery",
  author:"jQuery Foundation",
  versionMajor:2,
  versionMinor:1,
  versionPatch:4,
  version:"2.1.4",
  func:"PackageFiles/init/osinit.js"
});

var initScript = new Module({
  humanname:"OpenShell Init Script",
  name:"init",
  versionMajor:1,
  versionMinor:0,
  versionPatch:0,
  version:"1.0",
  author:"dangeredwolf/OpenShell Foundation",
  id:"com.dangeredwolf.openshell.init",
  func:"PackageFiles/init/osinit.js"
});
