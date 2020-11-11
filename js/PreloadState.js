var Breakout = Breakout|| {};

Breakout.PreloadState = {
    preload: function(){
       /*  this.preloadBar = this.game.add.sprite(this.game.world.centerX,  this.game.world.centerY+128, 'preload');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);

        this.load.atlas('ship1Animation', 
                        'ship-wreck/assets/images/player-ship-animations/ship1Animation.png', 
                        'ship-wreck/assets/images/player-ship-animations/ship1Animation.json');
        this.load.image('octupus', 'ship-wreck/assets/images/sea-animals/oct.png');
        this.load.text('level1', 'ship-wreck/assets/data/level1.json');
        this.load.audio('enemy-hit', 'ship-wreck/assets/music/hit1.wav'); */ 
    },
    create: function(){
            this.state.start('HomeState');
    }
};