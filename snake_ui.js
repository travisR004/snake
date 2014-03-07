(function(root) {

  var SG = root.SG = (root.SG || {});

  var View = SG.View = function($el){
    this.$el = $el
    this.start();
  };

  View.prototype.start = function(){
    var that = this;
    this.board = new SG.Board();
    $(document).keydown(function(event){
      that.handleKeyEvent(event);
    })
    window.setInterval(function(){ that.step()}, 150);
    // that.step();
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

  View.prototype.step = function(){
    var that = this;
    var segments = [];
    var $newDiv = ""
    var grid = this.board.render();
    this.board.appleCollision();
    this.$el.html("")
    this.board.snake.move();
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

})(this);

$(document).ready(function() {
  var $el = $('div.board');
  var gameUi = new SG.View($el);
});