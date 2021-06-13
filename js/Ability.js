var Breakout = Breakout || {};

Breakout.Ability = function(game, x, y, key, frame){
    Phaser.Sprite.call(this, game, x, y, key, frame);
    this.game.physics.enable(this);
    this.body.velocity.setTo(0,250);
    this.body.immovable = false;
    this.name = frame;
    //this.body.setSize(this.width -700, this.height - 800);
    //this.body.gravity.setTo(0.5);
};

Breakout.Ability.prototype = Object.create(Phaser.Sprite.prototype);
Breakout.Ability.prototype.constructor = Breakout.Ability;

Breakout.Ability.prototype.method1 = function(){

};