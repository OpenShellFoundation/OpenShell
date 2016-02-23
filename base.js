"use strict";

var packageClass = document.createElement("script");
packageClass.src = "PackageFiles/Package/package.js";
document.head.appendChild(packageClass);

function startPackageLoader() {
  if (typeof Package === "undefined") {
    setTimeout(startPackageLoader,0);
    return;
  }

  var packageData = document.createElement("script");
  packageData.src = "packages.js";
  document.head.appendChild(packageData);
}

startPackageLoader();
