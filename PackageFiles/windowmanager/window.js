"use strict";

make("")

function Window(data) {
  assertion(typeof data === "object","Argument 1, data, expects object, but got " + typeof data);
  assertion(typeof data.url === "string","Data of object Window expects string, but got " + typeof data.url);
  this.sizeX = data.sizeX || 700;
  this.sizeY = data.sizeY || 400;
  this.posX = data.posX || ($("html").width() / 2) - (this.sizeX / 2);
  this.posY = data.posY || ($("html").height() / 2) - (this.sizeY / 2);

  this.setSizeX = function(num) {
    this.sizeX = num;
  }

  this.setSizeY = function(num) {
    this.sizeY = num;
  }

  this.setPosX = function(num) {
    this.posX = num;
  }

  this.setPosY = function(num) {
    this.posY = num;
  }


}
