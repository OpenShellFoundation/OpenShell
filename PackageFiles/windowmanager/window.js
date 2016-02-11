"use strict";

function Window(data) {
  assertion(typeof data === "object","Argument 1, data, expects object, but got " + typeof data);
  assertion(typeof data.url === "string","Property 'url' of object Window expects string, but got " + typeof data.url);
  this.sizeX = data.sizeX || 700;
  this.sizeY = data.sizeY || 400;
  this.posX = data.posX || ($("html").width() / 2) - (this.sizeX / 2);
  this.posY = data.posY || ($("html").height() / 2) - (this.sizeY / 2);

  this.opened = data.opened || true;
  this.title = data.title || "Window";

  this.windowObjectTitle = make("div")
  .addClass("windowTitle")
  .html(this.title);

  this.windowObjectControlClose = make("div")
  .addClass("windowControl windowControlClose");

  this.windowObjectControlMaximize = make("div")
  .addClass("windowControl windowControlMaximize");

  this.windowObjectControlMinimize = make("div")
  .addClass("windowControl windowControlMinimize");

  this.windowObjectControlContainer = make("div")
  .addClass("windowControlContainer")
  .append(windowObjectControlClose)
  .append(windowObjectControlMaximize)
  .append(windowObjectControlMinimize)
  .append(windowObjectTitle);

  this.windowObjectContent = make("webview")
  .addClass("windowContent");

  this.windowObjectContentRaw = this.windowObjectContent[0];

  this.windowObjectContainer = make("div")
  .addClass("windowContainer")
  .append(windowObjectControlContainer)
  .append(windowObjectContent);

  this.setSizeX = function(num) {
    assertion(typeof num !== "number","setSizeX expects number, got " + typeof num);
    this.sizeX = num;
  }

  this.setSizeY = function(num) {
    assertion(typeof num !== "number","setSizeY expects number, got " + typeof num);
    this.sizeY = num;
  }

  this.setPosX = function(num) {
    assertion(typeof num !== "number","setPosX expects number, got " + typeof num);
    this.posX = num;
  }

  this.setPosY = function(num) {
    assertion(typeof num !== "number","setPosY expects number, got " + typeof num);
    this.posY = num;
  }

  this.setTitle = function(name) {
      assertion(typeof name === "undefined","setTitle expects string or object, got undefined");
      this.windowTitle.html(name);
  }

  this.close = function() {
      this.windowObjectContainer.addClass("windowContainerClosed");

      setTimeout(function(){
          this.windowObjetContainer.remove();
      },3000)
  }

  this.terminateProcess = function() {
      this.close();
      return this.windowObjectContentRaw.terminate();
  }

  this.stopLoading = function() {
    return this.windowObjectContentRaw.stop();
  }

  this.stopFinding = function() {
    return this.windowObjectContentRaw.stopFinding();
  }

  this.goBack = function() {
    return this.windowObjectContentRaw.back();
  }

  this.goForward = function() {
    return this.windowObjectContentRaw.forward();
  }

  this.insertCSS = function(a,b) {
    return this.windowObjectContentRaw.insertCSS(a,b);
  }

  this.setZoom = function(a,b) {
    return this.windowObjectContentRaw.setZoom(a,b);
  }

  this.setZoomMode = function(a,b) {
    return this.windowObjectContentRaw.setZoomMode(a,b);
  }

  this.printContentPage = function() {
    return this.windowObjectContentRaw.print();
  }

  this.goToRelativeHistoryPoint = function(a,b) {
    return this.windowObjectContentRaw.go(a,b);
  }

  this.removeContentScripts = function() {
    return this.windowObjectContentRaw.removeContentScripts();
  }

  this.reloadContent = function() {
    return this.windowObjectContentRaw.reload();
  }

  this.findInContent = function(a,b,c) {
    return this.windowObjectContentRaw.find();
  }

  this.clearUserData = function(a,b,c) {
    return this.windowObjectContentRaw.clearData(a,b,c);
  }

  this.executeScript = function(a,b) {
    return this.windowObjectContentRaw.executeScript(a,b);
  }

  this.addContentScripts = function(a) {
    return this.windowObjectContentRaw.addContentScripts(a);
  }

  this.canGoBack = function() {
    return this.windowObjectContentRaw.canGoBack();
  }

  this.canGoForward = function() {
    return this.windowObjectContentRaw.canGoForward();
  }

  this.getContentWindow = function() {
    return this.windowObjectContentRaw.contentWindow;
  }

  this.getContextMenus = function() {
    return this.windowObjectContentRaw.contextMenus;
  }

  this.getRequestEventInterface = function() {
    return this.windowObjectContentRaw.request;
  }


}
