var Breakout = Breakout || {};

Breakout.Ball = function(game, x, y, key, frame, velocity){
    Phaser.Sprite.call(this, game, x, y, key, frame);
    this.game.physics.enable(this);
    //change starting velocity over here #lee
    this.body.velocity.setTo(velocity, -velocity);
    this.body.collideWorldBounds = true;
    this.body.bounce.setTo(1,1);
    this.body.immovable = false;
    this.name = 'ball';
    //this.body.setSize(this.width -700, this.height - 800);
    //this.body.gravity.setTo(0.5);
};

Breakout.Ball.prototype = Object.create(Phaser.Sprite.prototype);
Breakout.Ball.prototype.constructor = Breakout.Ball;

Breakout.Ball.prototype.method1 = function(){

};