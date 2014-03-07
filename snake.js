(function(root) {
  var SG = root.SG = (root.SG || {});

  var BOARD_SIZE = SG.BOARD_SIZE = 20;

  var Snake = SG.Snake = function () {
    this.dir = "N";
    this.segments = [new SG.Coord(5, 5)];
  };

  Snake.prototype.move = function () {
    var oldCoord = this.segments[0]
    var nextSpace = new SG.Coord(oldCoord.x, oldCoord.y);
    var newCoord = nextSpace.plus(this.dir);
    var hit = this.checkSelfCollision(newCoord);
    this.segments.unshift(newCoord)
    if (this.growth){ this.growth = false}
    else{ this.segments.pop() }
    return hit;
  };

  Snake.prototype.turn = function (dir) {
    this.dir = dir;
  };

  Snake.prototype.grow = function () {
    this.growth = true;
  };

  Snake.prototype.checkSelfCollision = function (newCoord) {
    var hit = false
    this.segments.forEach(function(coord) {
      if (coord.pos + "" === newCoord.pos + "") {
        hit = true;
      }
    })
    return hit;
  };
})(this);
