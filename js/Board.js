var Breakout = Breakout || {};

Breakout.Board = function(game, x, y, key, frame){
    Phaser.Sprite.call(this, game, x, y, key, frame);
    this.game = game;
    this.game.physics.enable(this);
};

Breakout.Board.prototype = Object.create(Phaser.Sprite.prototype);
Breakout.Board.prototype.constructor = Breakout.Board;

Breakout.Board.prototype.update = function(){
    
};
