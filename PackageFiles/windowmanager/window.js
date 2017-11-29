/*
window.js

OpenShell Package which defines the Window object for the creation of windows on screen

(c) 2017 The OpenShell Foundation
(c) 2017 Ryan Dolan (dangeredwolf)

Released under the GNU Public License (GPL) Version 2

*/

"use strict";

const useWebViews = typeof chrome.app.window !== "undefined"; // Determines if chrome app or not: chrome apps use webview tags

function releaseAllWindowFocus() { // Clicking outside of a window will release your focus on it
    $(".windowContainer.focused").removeClass("focused"); // Removes ALL windows from focus
}

function Window(data) {

    var windowx = make("div").addClass("windowContainer"); // This is the returned object, the one APIs interact with.

    windowx.grabFocus = function() { // function which releases other windows from focus and gives focus to this one
        releaseAllWindowFocus();
        if (this.special !== "wallpaper") { // The wallpaper cannot take focus over a window
            this.addClass("focused"); 
        }
    }

    windowx.mousedown(function(){windowx.grabFocus()}); //If the window is clicked, grab focus
    
    var data = data || {}; // This lets us create an empty window even if no parameters are specified initially

    windowx.sizeX = data.sizeX || 700; // Set to specified width OR 700px (default) 
    windowx.sizeY = data.sizeY || 400; // Set to specified height OR 400px (default)
    windowx.posX = data.posX || ($("html").width() / 2) - (windowx.sizeX / 2); // Set to specified X position OR default: calculate its centre position 
    windowx.posY = data.posY || ($("html").height() / 2) - (windowx.sizeY / 2); // Set to specified Y position OR default: calculate its centre position

    while (typeof $("#window"+window.windowID)[0] !== "undefined") { // Loop ensures it does not generate a duplicate Window ID
        window.windowID = Math.floor(Math.random() * 100000000);
        // There's a hard limit of 100 million windows at once, but this is changable and shouldn't be a problem
    }

    windowx.attr("id","window"+windowx.windowID); // set the ID attribute to windowXXXXXX where XXXXXX is the ID number

    windowx.opened = typeof data.opened === "boolean" && data.opened || false; 
    windowx.title = data.title || "Window"; // default title: Window
    windowx.special = data.special || "none"; // windows that don't behave like windows (i.e. the wallpaper) are "special"

    windowx.windowObjectTitle = make("div")
    .addClass("windowTitle")
    .html(windowx.title);

    windowx.close = function() {
        this.addClass("windowContainerClosed"); // This attribute plays the close animation
        return this;
    }

    windowx.minimize = function() {
        this.addClass("minimized"); // This tags the window as minimized
        return this;
    }

    windowx.toggleMinimize = function() {
        this.toggleClass("minimized"); // Toggles minimized or not
        return this;
    }

    windowx.minimise = windowx.minimize; // Other spelling conventions are fine
    windowx.toggleMinimise = windowx.toggleMinimize; // Other spelling conventions are fine

    windowx.maximize = function() {
        this.addClass("maximized"); // This tags the window as maximized
        return this;
    }
    windowx.toggleMaximize = function() {
        this.toggleClass("maximized"); // Toggles maximized or not
        return this;
    }

    windowx.maximise = windowx.maximize; // Other spelling conventions are fine
    windowx.toggleMaximise = windowx.toggleMaximize; // Other spelling conventions are fine

    windowx.windowObjectControlClose = make("button")
    .addClass("windowControl windowControlClose")
    .html("&#xE5CD") // unicode character for material icon for close
    .click(function(){windowx.close()});

    windowx.windowObjectControlMaximize = make("button")
    .addClass("windowControl windowControlMaximize")
    .html("&#xE3C6") // unicode character for material icon for maximize
    .click(function(){windowx.toggleMaximize()});

    windowx.windowObjectControlMinimize = make("button")
    .addClass("windowControl windowControlMinimize")
    .html("&#xE15B") // unicode character for material icon for minimize
    .click(function(){windowx.toggleMinimize()});

    windowx.windowObjectControlContainer = make("div")
    .addClass("windowControlContainer")
    .append(windowx.windowObjectControlClose) // Append all the control buttons and title bar to its container
    .append(windowx.windowObjectControlMaximize)
    .append(windowx.windowObjectControlMinimize)
    .append(windowx.windowObjectTitle);

    windowx.draggable({handle:windowx.windowObjectControlContainer})  // Tell jQuery UI to make the title bar drag the window
    .resizable(); // Tell jQuery UI to make the window resizable

    if (useWebViews) {
        windowx.windowObjectContent = make("webview").attr("url",data.url); // webview for chrome app, url attribute
    } else {
        windowx.windowObjectContent = make("iframe").attr("src",data.url); // iframe for general web, src attribute
    }

    windowx.windowObjectContent.addClass("windowContent"); 

    windowx.windowObjectWebViewWrapper = make("div")
    .addClass("windowWebViewWrapper")
    .append(windowx.windowObjectContent) //append iframe/webview

    windowx.windowObjectContentRaw = windowx.windowObjectContent[0];
    // non-jQuery variable which makes it easier to call various webview functions

    windowx
    .append(windowx.windowObjectControlContainer)
    .append(windowx.windowObjectWebViewWrapper);

    windowx.convertToSpecial = function() {
        if (this.special === "wallpaper") {
            this.updateSizeInternal(); // make sure wallpaper takes up full screen
            this.windowObjectControlContainer.remove(); // remove unnecessary view for wallpaper
            this.addClass("wallpaper"); // this tells css and scripts that this is wallpaper
            this.draggable("destroy").resizable("destroy"); // make wallpaper not resizable or draggable
            this.attr("style","background-image:url(PackageFiles/org.openshell.theme.default/Wallpaper/wallpaper.jpg)!important;background-size:100%!important")
            //TODO: not make wallpaper hardcoded
        }
    }

    if (windowx.special !== "none") { // If it's special...
        windowx.convertToSpecial();   // Let it know
    }

    windowx.updateSizeInternal = function() {
        if (this.special !== "wallpaper") { // Windows take up their size and are located in their position
            this.attr("style","width:"+this.sizeX+"px;height:"+this.sizeY+"px;left:"+this.posX+"px;top:"+this.posY+"px;");
        }
    }

    windowx.setSizeX = function(num) {
        assertion(typeof num === "number","setSizeX expects number, got " + typeof num);
        this.sizeX = num;
        this.updateSizeInternal(); // Size number updated, update window to reflect that
        return this;
    }

    windowx.setSizeY = function(num) {
        assertion(typeof num === "number","setSizeY expects number, got " + typeof num);
        this.sizeY = num;
        this.updateSizeInternal(); // Size number updated, update window to reflect that
        return this;
    }

    windowx.setPosX = function(num) {
        assertion(typeof num === "number","setPosX expects number, got " + typeof num);
        this.posX = num;
        this.updateSizeInternal(); // Position updated, update window to reflect that
        return this;
    }

    windowx.setPosY = function(num) {
        assertion(typeof num === "number","setPosY expects number, got " + typeof num);
        this.posY = num;
        this.updateSizeInternal(); // Position updated, update window to reflect that
        return this;
    }

    windowx.setSpecial = function(str) {
        assertion(typeof str === "string","setSpecial expects string, got " + typeof num);
        this.special = str;
        if (str !== "none") {
            this.convertToSpecial(); // Special updated, update window to reflect that
        }
        return this;
    }


    windowx.setTitle = function(title) {
        assertion(typeof title === "string" || typeof title === "object","setTitle expects string or object, got " + typeof url);
        this.windowObjectTitle.html(title); // set internal text to specified title
        return this;
    }

    windowx.setURL = function(url) {
        assertion(typeof url === "string","setURL expects string, got " + typeof url);
        if (useWebViews) {
            this.windowObjectContent.attr("url",url);
            this.reloadContent();
        }
        else {
            this.windowObjectContent.attr("src",url);
        }
        return this;
    }

    windowx.terminateProcess = function() {
        if (useWebViews) {
            this.close();
            return this.windowObjectContentRaw.terminate();
        }
    }

    windowx.stopLoading = function() {
        if (useWebViews)
            this.windowObjectContentRaw.stop();
        else
            this.windowObjectContentRaw.contentWindow.stop();
        return this;
    }

    windowx.stopFinding = function() {
        if (useWebViews)
            this.windowObjectContentRaw.stopFinding();
        return this;
    }

    windowx.goBack = function() {
        if (useWebViews)
            this.windowObjectContentRaw.back();
        else
            this.windowObjectContentRaw.contentWindow.stop();
        return this;
    }

    windowx.goForward = function() {
        if (useWebViews)
            this.windowObjectContentRaw.forward();
        else
            this.windowObjectContentRaw.contentWindow.History.forward();
        return this;
    }

    windowx.insertCSS = function(a,b) {
        if (useWebViews)
            this.windowObjectContentRaw.insertCSS(a,b);
        else
            $(this.windowObjectContentRaw.contentWindow.document.head).append($("<style type=\"text/css\"> "+a+" </style>"));
        return this;
    }

    windowx.setZoom = function(a,b) {
        if (useWebViews)
            this.windowObjectContentRaw.setZoom(a,b);
        return this;
    }

    windowx.setZoomMode = function(a,b) {
        if (useWebViews)
            this.windowObjectContentRaw.setZoomMode(a,b);
        return this;
    }

    windowx.getZoom = function(a) {
        if (useWebViews)
            return this.windowObjectContentRaw.getZoom(a);
        return 0;
    }

    windowx.getZoomMode = function(a) {
        if (useWebViews)
            return this.windowObjectContentRaw.getZoomMode(a);
        return 0;
    }

    windowx.printContentPage = function() {
        if (useWebViews)
            this.windowObjectContentRaw.print();
        else
            this.windowObjectContentRaw.contentWindow.print();
        return this;
    }

    windowx.goToRelativeHistoryPoint = function(a,b) {
        if (useWebViews)
            this.windowObjectContentRaw.go(a,b);
        else
            this.windowObjectContentRaw.contentWindow.History.go(a,b);
        return this;
    }

    windowx.removeContentScripts = function(a,b) {
        if (useWebViews)
            this.windowObjectContentRaw.removeContentScripts(a,b);
        return this;
    }

    windowx.reloadContent = function() {
        if (useWebViews)
            this.windowObjectContentRaw.reload();
        else
            this.windowObjectContentRaw.contentWindow.reload();
        return this;
    }

    windowx.findInContent = function(a,b,c) {
        if (useWebViews)
            this.windowObjectContentRaw.find(a,b,c);
        return this;
    }

    windowx.clearUserData = function(a,b,c) {
        if (useWebViews)
            this.windowObjectContentRaw.clearData(a,b,c);
        return this;
    }

    windowx.executeScript = function(a,b) {
        if (useWebViews)
            this.windowObjectContentRaw.executeScript(a,b);
        else
            $(this.windowObjectContentRaw.contentWindow.document.head).append($("<script>"+a+"</script>"))
        return this;
    }

    windowx.addContentScripts = function(a) {
        if (useWebViews)
            this.windowObjectContentRaw.addContentScripts(a);
        return this;
    }

    windowx.canGoBack = function() {
        if (useWebViews)
            return this.windowObjectContentRaw.canGoBack();
        return true;
    }

    windowx.canGoForward = function() {
        if (useWebViews)
            return this.windowObjectContentRaw.canGoForward();
        return true;
    }

    windowx.getContentWindow = function() {
        return this.windowObjectContentRaw.contentWindow;
    }

    windowx.getContextMenus = function() {
        return this.windowObjectContentRaw.contextMenus;
    }

    windowx.getRequestEventInterface = function() {
        return this.windowObjectContentRaw.request;
    }

    windowx.open = function() {
        body.append(this);
        this.removeClass("windowContainerClosed");
        this.focused = true;
        this.grabFocus();
        return this;
    }

    windowx.setPartition = function(a) {
        windowx.windowObjectContent.attr("partition","persist:" + a);
        return this;
    }

    windowx.updateSizeInternal();

    return windowx;
    
}
