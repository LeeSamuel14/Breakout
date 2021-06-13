var Breakout = Breakout || {};

Breakout.Board = function(game, x, y, key, frame){
    Phaser.Sprite.call(this, game, x, y, key, frame);
    this.game = game;
    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    //this.body.bounce.setTo(1,1);
    this.body.immovable = true;
    //this.body.stopVelocityOnCollide = true;
    //this.body.setSize(this.width - 800, this.height);
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
