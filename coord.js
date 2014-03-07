(function(root) {
  var SG = root.SG = (root.SG || {});
  var Coord = SG.Coord = function (x, y) {
    this.x = x;
    this.y = y;
    this.pos = [x,y]
    this.growth = false;
  };

  Coord.prototype.plus = function(dir) {
   switch (dir) {
     case "N":
       this.x -= 1;
       break;
     case "S":
       this.x += 1;
       break;
     case "W":
       this.y -= 1;
       break;
     case "E":
       this.y += 1;
       break;
   }
   this.pos = [this.x, this.y]
   return this;
  };
})(this);