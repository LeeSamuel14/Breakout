var Breakout = Breakout || {};
Breakout.game = new Phaser.Game(600, 800, Phaser.AUTO);

this.WebFontConfig = {
    google: {
      families: ['Bungee','Revalia','Berkshire Swash','Press Start 2P', 'Audiowide']
    }
};

Breakout.game.state.add('BootState', Breakout.BootState);
Breakout.game.state.add('PreloadState', Breakout.PreloadState);
Breakout.game.state.add('HomeState', Breakout.HomeState);
Breakout.game.state.add('GameState', Breakout.GameState);
Breakout.game.state.add('WinLoseState', Breakout.WinLoseState);

Breakout.game.state.start('BootState');