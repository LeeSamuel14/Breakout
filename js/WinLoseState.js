var Breakout = Breakout || {};

Breakout.WinLoseState = {
    init: function(stateObject) {
        this.stateObject = stateObject;
    },
    create: function() {
        this.initSetHighScore();
        this.initButtons();
        this.initGameText();
    },
    initSetHighScore: function(){
        if(localStorage.getItem('highScore')){
            if(this.stateObject.gameScore > parseInt(localStorage.getItem('highScore'))){
                localStorage.setItem('highScore', this.stateObject.gameScore);
                this.stateObject.highScore = this.stateObject.gameScore;
            }
        }
    },
    initButtons: function(){
        this.button_Easy = this.game.add.button(this.game.width/2, this.game.height/4, 'slider');
        this.button_Easy.events.onInputDown.add(this.startNextGame, this);
    },
    
    initGameText: function(){
        
        var textStyle = { font: "32px Microsoft JhengHei UI", fontStyle: "bold", fill: "#33ccff", align: "center" };
        this.text_Score = this.game.add.text(10, 10, 'TOTAL GAME SCORE: '+ this.stateObject.gameScore, textStyle);
        this.text_Level = this.game.add.text(this.game.width - 170, 10, 'LEVEL: '+ this.stateObject.currentLevel, textStyle);
        this.text_HighScore = this.game.add.text(0, 400, 'HIGH SCORE: '+ this.stateObject.highScore, textStyle);
    },
    startNextGame: function(){
        if(this.stateObject.isLoss){
            this.stateObject.currentLevel = 1;
            this.stateObject.gameScore = 0;
            this.stateObject.isLoss = false;
        }
        this.state.start('GameState', true, false, this.stateObject);
    }
};