"use strict";

console.log("Hello world!");

var interval;

function shellInit() {
	var wallpaper = new Window();
	wallpaper.open().setSpecial("wallpaper");
	wallpaper.windowObjectContentRaw.remove();

	var win = new Window();
	win.setPartition("openshell").setURL("PackageFiles/testapp/testapp.html").open();
}

function waitForjQueryExtensions() {
	if (typeof make === "function" && typeof $(document.body).draggable) {
		clearInterval(interval);
		shellInit();
	}
}


interval = setInterval(waitForjQueryExtensions,50);