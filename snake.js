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

  var Snake = SG.Snake = function () {
    this.dir = "N";
    this.segments = [new SG.Coord(5, 5)];
  };

  Snake.prototype.move = function () {
    var oldCoord = this.segments[0]
    var nextSpace = new Coord(oldCoord.x, oldCoord.y);
    var newCoord = nextSpace.plus(this.dir);
    this.checkSelfCollision(newCoord);
    this.segments.unshift(newCoord)
    if (this.growth){ this.growth = false}
    else{ this.segments.pop() }

  };

  Snake.prototype.turn = function (dir) {
    this.dir = dir;
  };

  Snake.prototype.grow = function () {
    this.growth = true;
  };

  Snake.prototype.checkSelfCollision = function (newCoord) {
    this.segments.forEach(function(coord) {
      if (coord.pos + "" === newCoord.pos + "") {
        alert("You hit yourself!");
        return true;
      }
    })
  };

  var Apple = SG.Apple = function () {
    this.pos = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10)
    ]
  }

  var Board = SG.Board = function () {
   this.grid = this.makeGrid();
   this.snake = new Snake();
   this.apple = new Apple();
  };

  Board.prototype.makeGrid = function () {
   var grid = [];

   for (var i = 0; i < 10; i++) {
     grid[i] = []
     for (var j = 0; j < 10; j++) {
       grid[i].push(".")
     }
   }
   return grid;
  };

  Board.prototype.generateApple = function () {
    this.apple = new Apple();
  };

  Board.prototype.appleCollision = function () {
    if (this.snake.segments[0].pos + "" === this.apple.pos + "") {
      this.snake.grow();
      this.generateApple();
    }
  };

  Board.prototype.render = function () {
   this.grid = this.makeGrid();
   var that = this;

   this.snake.segments.forEach(function(coord) {
     var x = coord.x;
     var y = coord.y;

     that.grid[x][y] = "S";
   })

   var appleX = this.apple.pos[0]
   var appleY = this.apple.pos[1]

   this.grid[appleX][appleY] = "A";

   return this.grid;
};


})(this);
