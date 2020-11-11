var Breakout = Breakout || {};

Breakout.GameState = {
    init: function(currentLevel){
        this.game.physics.startSystem(Phaser.Physics.Arcade);
        this.gameTimer = this.game.time.create(false);
        this.gameTimer.start();
        this.currentLevel = currentLevel; 
    },
    create: function(){
        this.state.start('WinLoseState');
    },
    initControls: function(){
    }
};