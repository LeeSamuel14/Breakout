var Breakout = Breakout || {};

Breakout.BootState = {
    init: function() {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL ;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
    },
    preload: function() {
        /* this.load.image('preload','assets/images/preloader/bar.png'); */
    },
    create: function() {
        this.state.start('PreloadState');   
    }
};