(function(root) {
  var SG = root.SG = (root.SG || {});

  var Board = SG.Board = function () {
   this.grid = this.makeGrid();
   this.snake = new SG.Snake();
   this.apple = new SG.Apple();
  };

  Board.prototype.checkSnakeOB = function () {
    var that = this;
    this.snake.segments.forEach(function(segment){
      if(segment.x === SG.BOARD_SIZE){
        segment.x = 0
      } else if (segment.x < 0){
        segment.x = SG.BOARD_SIZE - 1
      } else if (segment.y === SG.BOARD_SIZE){
        segment.y = 0
      } else if (segment.y < 0){
        segment.y = SG.BOARD_SIZE - 1
      }
    })
  };

  Board.prototype.makeGrid = function () {
   var grid = [];

   for (var i = 0; i < SG.BOARD_SIZE; i++) {
     grid[i] = []
     for (var j = 0; j < SG.BOARD_SIZE; j++) {
       grid[i].push(".")
     }
   }
   return grid;
  };

  Board.prototype.generateApple = function () {
    this.apple = new SG.Apple();
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
     that.grid[coord.x][coord.y] = "S";
   })
   var appleX = this.apple.pos[0]
   var appleY = this.apple.pos[1]
   this.grid[appleX][appleY] = "A";
   return this.grid;
};

})(this);