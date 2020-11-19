var Breakout = Breakout || {};

Breakout.WinLoseState = {
    init: function(currentLevel) {
        this.currentLevel = currentLevel;
    },
    create: function() {
        this.button_Easy = this.game.add.button(this.game.width/2, this.game.height/4, 'slider');
        this.button_Easy.events.onInputDown.add(function(){
            this.state.start('GameState', true, false, this.currentLevel);
          }, this);
    },
};