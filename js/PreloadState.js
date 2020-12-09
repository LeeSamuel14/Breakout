var Breakout = Breakout|| {};

Breakout.PreloadState = {
    preload: function(){
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        //this.load.image('board', 'assets/images/board.png');
        //this.load.image('ball', 'assets/images/ball2.png');
        this.load.image('slider', 'assets/images/slider.jpg');
        this.load.image('pause', 'assets/images/pause.png');
        //this.load.image('logo', 'assets/images/logo.png');
        this.load.atlasJSONHash('spritesheet_breakout', 'assets/images/spritesheet_breakout.png','assets/images/spritesheet_breakout.json');
        
        this.load.text('breakout_config', 'assets/data/breakout_config.json');
        this.load.text('level_config', 'assets/data/level_config.json');
        this.logo = this.game.add.sprite(this.game.width/2 ,  this.game.height/2 , 'logo');
        this.preloadBar = this.game.add.sprite(this.game.width/2 ,  this.game.height/2 + 60, 'bar');
        this.logo.anchor.setTo(0.5);
        //this.preloadBar.scale.setTo(0.4);
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);
        /* 
        this.load.atlas('ship1Animation', 
                        'ship-wreck/assets/images/player-ship-animations/ship1Animation.png', 
                        'ship-wreck/assets/images/player-ship-animations/ship1Animation.json');
        this.load.image('octupus', 'ship-wreck/assets/images/sea-animals/oct.png');
        this.load.text('level1', 'ship-wreck/assets/data/level1.json');
        this.load.audio('enemy-hit', 'ship-wreck/assets/music/hit1.wav'); */ 
        this.load.audio('brick-hit', 'assets/sounds/brick-hit.mp3');
        this.load.audio('laser', 'assets/sounds/laser.mp3');
        this.load.audio('pick-up-ability', 'assets/sounds/pick-up-ability.mp3');
        this.load.audio('lose-life', 'assets/sounds/lose-life.mp3');
        this.load.audio('lose-game', 'assets/sounds/lose-game.mp3');
        this.load.audio('win', 'assets/sounds/win.mp3');
        this.load.audio('background-music', 'assets/sounds/background-music.mp3');
    },
    create: function(){
            this.state.start('HomeState');
    }
};