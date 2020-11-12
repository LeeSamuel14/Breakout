var Breakout = Breakout || {};

Breakout.Board = function(game, x, y, key, frame){
    Phaser.Sprite.call(this, game, x, y, key, frame);
    this.game = game;
    this.game.physics.arcade.enable(this);
    console.log(this.anchor);
    //this.anchor.setTo(0.5);
    //this.game.physics.arcade.setBoundsToWorld();
    //console.log(this.body);
};

Breakout.Board.prototype = Object.create(Phaser.Sprite.prototype);
Breakout.Board.prototype.constructor = Breakout.Board;

Breakout.Board.prototype.update = function(){
    
};
Breakout.Board.prototype.create = function(){
    
};
