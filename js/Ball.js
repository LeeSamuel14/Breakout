var Breakout = Breakout || {};

Breakout.Ball = function(game, x, y, key, frame){
    Phaser.Sprite.call(this, game, x, y, key, frame);
    this.game.physics.enable(this);
    this.body.velocity.setTo(1000,1000);
    this.body.collideWorldBounds = true;
    this.body.bounce.setTo(1,1);
    this.body.immovable = false;
    //this.body.setSize(this.width -700, this.height - 800);
    //this.body.gravity.setTo(0.5);
};

Breakout.Ball.prototype = Object.create(Phaser.Sprite.prototype);
Breakout.Ball.prototype.constructor = Breakout.Ball;

Breakout.Ball.prototype.method1 = function(){

};