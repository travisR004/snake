(function(root) {
  var SG = root.SG = (root.SG || {});

  var Apple = SG.Apple = function () {
    console.log(SG.BOARD_SIZE)
    this.pos = [
      Math.floor(Math.random() * SG.BOARD_SIZE),
      Math.floor(Math.random() * SG.BOARD_SIZE)
    ]
  }
})(this);