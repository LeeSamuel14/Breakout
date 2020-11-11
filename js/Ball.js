var Breakout = Breakout || {};

Breakout.Ball = function(game, x, y, key, frame){
    Phaser.Sprite.call(this, game, x, y, key, frame);
    this.game.physics.enable(this);
};

Breakout.Ball.prototype = Object.create(Phaser.Sprite.prototype);
Breakout.Ball.prototype.constructor = Breakout.Ball;

Breakout.Ball.prototype.method1 = function(){

};