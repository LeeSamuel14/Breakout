var Breakout = Breakout || {};

Breakout.Brick = function(game, x, y, key, frame){
    Phaser.Sprite.call(this, game, x, y, key, frame);
    this.game.physics.enable(this);
    this.body.immovable = true;
};

Breakout.Brick.prototype = Object.create(Phaser.Sprite.prototype);
Breakout.Brick.prototype.constructor = Breakout.Brick;

Breakout.Brick.prototype.method1 = function(){

};