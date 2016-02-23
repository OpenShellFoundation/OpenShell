"use strict";

var packageClass = document.createElement("script");
packageClass.src = "PackageFiles/Package/package.js";
document.head.appendChild(packageClass);

setTimeout(function(){
  var packageData = document.createElement("script");
  packageData.src = "packages.js";
  document.head.appendChild(packageData);
},0);
