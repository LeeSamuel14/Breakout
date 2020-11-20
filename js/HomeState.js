var Breakout = Breakout || {};

Breakout.HomeState = {
    init: function(){
    },
    create: function(){
        this.initStateObject();
        this.initButtons();
        this.initGameText();
    },
    initStateObject: function(){
        this.stateObject = {};
        this.stateObject.currentLevel = 1;
        this.stateObject.gameScore = 0;
        this.stateObject.highScore = 0;
        this.stateObject.isLoss = false;
        if(localStorage.getItem('highScore')){
            this.stateObject.highScore = parseInt(localStorage.getItem('highScore'));
        }
        else{
            localStorage.setItem('highScore', this.stateObject.highScore);
        }
    }, 
    initButtons: function(){
        this.button_Easy = this.game.add.button(this.game.width/2, this.game.height/4, 'slider');
        this.button_Easy.events.onInputDown.add(function(){
            this.state.start('GameState', true, false, this.stateObject);
          }, this);
    },
    initGameText: function(){
        var textStyle = { font: "32px Sans Serif", fill: "#FFFFFF", align: "center" };
        this.text_Home = this.game.add.text(10, 10, 'HOME', textStyle);
    }
};