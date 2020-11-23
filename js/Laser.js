var Breakout = Breakout || {};

Breakout.Laser = function(game, x, y, key, frame){
    Phaser.Sprite.call(this, game, x, y, key, frame);
    this.game.physics.enable(this);
    this.body.immovable = false;
    this.name = frame;
};

Breakout.Laser.prototype = Object.create(Phaser.Sprite.prototype);
Breakout.Laser.prototype.constructor = Breakout.Laser;

Breakout.Laser.prototype.method1 = function(){

};