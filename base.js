var packageClass = document.createElement("script");
packageClass.src = "moduleclass.js";
document.head.appendChild(packageClass);

setTimeout(function(){
  var packageJS = document.createElement("script");
  packageJS.src = "packages.js";
  document.head.appendChild(packageJS);
},0);
