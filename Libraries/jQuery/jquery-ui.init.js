"use strict";

var script = make("script").attr("type","text/javascript").attr("src","Libraries/jQuery/jquery-ui.min.js");
var style = make("link").attr("rel","stylesheet").attr("href","Libraries/jQuery/jquery-ui.min.css");
var styleStructure = make("link").attr("rel","stylesheet").attr("href","Libraries/jQuery/jquery-ui.structure.min.css");

$(document.head).append(script).append(style).append(styleStructure);
