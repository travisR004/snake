(function(root) {

  var SG = root.SG = (root.SG || {});

  var View = SG.View = function($el){
    this.$el = $el
    this.start();
  };

  View.prototype.handleKeyEvent = function(event){
    var that = this;
    var keycode = event.keyCode
    switch (keycode) {
      case 38:
        that.board.snake.turn("N");
        break;
      case 40:
        that.board.snake.turn("S");
        break;
      case 37:
        that.board.snake.turn("W");
        break;
      case 39:
        that.board.snake.turn("E");
        break;
    }
  };

  View.prototype.makeNewDivs = function (grid) {
    var that = this;
    grid.forEach(function(row, rInd){
      row.forEach(function(el, cInd){
        if(grid[rInd][cInd] === "S"){
          $newDiv =  $("<div class='snake'></div>");
        } else if (grid[rInd][cInd] === "A") {
          $newDiv = $("<div class='apple'></div>");
        } else {
        $newDiv = $("<div class='blank'></div>");
      }
      that.$el.append($newDiv);
      })
    })
  };

  View.prototype.start = function(){
    var that = this;
    this.board = new SG.Board();
    $(document).keydown(function(event){
      that.handleKeyEvent(event);
    })
    var timer = window.setInterval(function(){ that.step(timer)}, 100);
  };

  View.prototype.step = function(timer){
    var grid = this.board.render();
    this.board.appleCollision();
    this.$el.html("")
    if(this.board.snake.move()){
      alert("You tried to eat yourself!")
      window.clearInterval(timer);
    }
    this.board.checkSnakeOB();
    this.makeNewDivs(grid);
  };
})(this);

$(document).ready(function() {
  var $el = $('div.board');
  var gameUi = new SG.View($el);
});