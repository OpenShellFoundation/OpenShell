/*
window.js

OpenShell Package which defines the Window object for the creation of windows on screen

(c) 2016 The OpenShell Foundation
(c) 2016 Ryan Dolan (dangeredwolf)

Released under the GNU Public License (GPL) Version 2

*/

"use strict";

function Window(data) {

    var windowx = make("div").addClass("windowContainer");

    assertion(typeof data === "object","Argument 1, data, expects object, but got " + typeof data);
    assertion(typeof data.url === "string","Property 'url' of object Window expects string, but got " + typeof data.url);
    windowx.sizeX = data.sizeX || 700;
    windowx.sizeY = data.sizeY || 400;
    windowx.posX = data.posX || ($("html").width() / 2) - (windowx.sizeX / 2);
    windowx.posY = data.posY || ($("html").height() / 2) - (windowx.sizeY / 2);

    windowx.windowID = Math.floor(Math.random() * 1234567890)

    windowx.opened = data.opened || true;
    windowx.title = data.title || "Window";

    windowx.windowObjectTitle = make("div")
    .addClass("windowTitle")
    .html(windowx.title);

    windowx.windowObjectControlClose = make("div")
    .addClass("windowControl windowControlClose");

    windowx.windowObjectControlMaximize = make("div")
    .addClass("windowControl windowControlMaximize");

    windowx.windowObjectControlMinimize = make("div")
    .addClass("windowControl windowControlMinimize");

    windowx.windowObjectControlContainer = make("div")
    .addClass("windowControlContainer")
    .append(windowx.windowObjectControlClose)
    .append(windowx.windowObjectControlMaximize)
    .append(windowx.windowObjectControlMinimize)
    .append(windowx.windowObjectTitle);

    windowx.windowObjectContent = make("webview")
    .addClass("windowContent");

    windowx.windowObjectContentRaw = windowx.windowObjectContent[0];

    windowx
    .append(windowx.windowObjectControlContainer)
    .append(windowx.windowObjectContent);

    windowx.setSizeX = function(num) {
        assertion(typeof num !== "number","setSizeX expects number, got " + typeof num);
        windowx.sizeX = num;
        return windowx;
    }

    windowx.setSizeY = function(num) {
        assertion(typeof num !== "number","setSizeY expects number, got " + typeof num);
        windowx.sizeY = num;
        return windowx;
    }

    windowx.setPosX = function(num) {
        assertion(typeof num !== "number","setPosX expects number, got " + typeof num);
        windowx.posX = num;
        return windowx;
    }

    windowx.setPosY = function(num) {
        assertion(typeof num !== "number","setPosY expects number, got " + typeof num);
        windowx.posY = num;
        return windowx;
    }

    windowx.setTitle = function(name) {
        assertion(typeof name === "undefined","setTitle expects string or object, got undefined");
        windowx.windowTitle.html(name);
        return windowx;
    }

    windowx.close = function() {
        windowx.addClass("windowContainerClosed");

        setTimeout(function(){
            windowx.remove();
        },3000);

        return windowx;
    }

    windowx.minimize = function() {
        windowx.addClass("minimized");
        return windowx;
    }

    windowx.terminateProcess = function() {
        windowx.close();
        return windowx.windowObjectContentRaw.terminate();
    }

    windowx.stopLoading = function() {
        windowx.windowObjectContentRaw.stop();
        return windowx;
    }

    windowx.stopFinding = function() {
        windowx.windowObjectContentRaw.stopFinding();
        return windowx;
    }

    windowx.goBack = function() {
        windowx.windowObjectContentRaw.back();
        return windowx;
    }

    windowx.goForward = function() {
        windowx.windowObjectContentRaw.forward();
        return windowx;
    }

    windowx.insertCSS = function(a,b) {
        windowx.windowObjectContentRaw.insertCSS(a,b);
        return windowx;
    }

    windowx.setZoom = function(a,b) {
        windowx.windowObjectContentRaw.setZoom(a,b);
        return windowx;
    }

    windowx.setZoomMode = function(a,b) {
        windowx.windowObjectContentRaw.setZoomMode(a,b);
        return windowx;
    }

    windowx.getZoom = function(a) {
        return windowx.windowObjectContentRaw.getZoom(a);
    }

    windowx.getZoomMode = function(a) {
        return windowx.windowObjectContentRaw.getZoomMode(a);
    }

    windowx.printContentPage = function() {
        windowx.windowObjectContentRaw.print();
        return windowx;
    }

    windowx.goToRelativeHistoryPoint = function(a,b) {
        windowx.windowObjectContentRaw.go(a,b);
        return windowx;
    }

    windowx.removeContentScripts = function(a,b) {
        windowx.windowObjectContentRaw.removeContentScripts(a,b);
        return windowx;
    }

    windowx.reloadContent = function() {
        windowx.windowObjectContentRaw.reload();
        return windowx;
    }

    windowx.findInContent = function(a,b,c) {
        windowx.windowObjectContentRaw.find(a,b,c);
        return windowx;
    }

    windowx.clearUserData = function(a,b,c) {
        windowx.windowObjectContentRaw.clearData(a,b,c);
        return windowx;
    }

    windowx.executeScript = function(a,b) {
        windowx.windowObjectContentRaw.executeScript(a,b);
        return windowx;
    }

    windowx.addContentScripts = function(a) {
        windowx.windowObjectContentRaw.addContentScripts(a);
        return windowx;
    }

    windowx.canGoBack = function() {
        return windowx.windowObjectContentRaw.canGoBack();
    }

    windowx.canGoForward = function() {
        return windowx.windowObjectContentRaw.canGoForward();
    }

    windowx.getContentWindow = function() {
        return windowx.windowObjectContentRaw.contentWindow;
    }

    windowx.getContextMenus = function() {
        return windowx.windowObjectContentRaw.contextMenus;
    }

    windowx.getRequestEventInterface = function() {
        return windowx.windowObjectContentRaw.request;
    }

    windowx.open = function() {
        body.append(windowx);
        return windowx;
    }

    return windowx;


}
