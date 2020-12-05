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
        this.button_StartNextGame = this.game.add.button(this.game.width/2, this.game.height/3 + 50, 'spritesheet_breakout', null, null,'light-blue-tile', 'light-blue-tile','light-blue-tile-broken','light-blue-tile-broken');
        this.button_GoHome = this.game.add.button(this.game.width/2, this.game.height/1.5, 'spritesheet_breakout', null, null,'light-blue-tile', 'light-blue-tile','light-blue-tile-broken','light-blue-tile-broken');
        this.button_StartNextGame.events.onInputDown.add(this.startNextGame, this);
        this.button_GoHome.events.onInputDown.add(this.goHome, this);
        this.button_StartNextGame.anchor.setTo(0.5);
        this.button_GoHome.anchor.setTo(0.5);
    },
    
    initGameText: function(){
        var startNextGameText = (this.stateObject.isLoss) ? 'NEW GAME' : 'LEVEL ' + this.stateObject.currentLevel;
        var winLoseText = (this.stateObject.isLoss) ? 'YOU LOSE...' : 'YOU WIN!';
        var textStyle_Blue = { font: "32px Microsoft JhengHei UI", fontStyle: "bold", fill: "#33ccff", align: "center" };
        var textStyle_Black = { font: "32px Microsoft JhengHei UI", fontStyle: "bold", fill: "#000000", align: "center" };
        var textStyle_Red = { font: "32px Microsoft JhengHei UI", fontStyle: "bold", fill: "#FF0000", align: "center" };
        this.text_WinLose = this.game.add.text(this.game.width/2, 40, winLoseText, textStyle_Blue);
        this.text_Score = this.game.add.text(this.game.width/2, 110, 'TOTAL GAME SCORE: '+ this.stateObject.gameScore, textStyle_Blue);
        this.text_HighScore = this.game.add.text(this.game.width/2, 170, 'HIGH SCORE: '+ this.stateObject.highScore, textStyle_Blue);
        this.text_StartNextGame = this.game.add.text(this.game.width/2, this.game.height/3 + 50, startNextGameText, textStyle_Black);
        this.text_GoHome = this.game.add.text(this.game.width/2, this.game.height/1.5, 'HOME', textStyle_Black);
        this.text_WinLose .anchor.setTo(0.5);
        this.text_Score.anchor.setTo(0.5);
        this.text_HighScore.anchor.setTo(0.5);
        this.text_StartNextGame.anchor.setTo(0.5);
        this.text_GoHome.anchor.setTo(0.5);
    },
    startNextGame: function(){
        if(this.stateObject.isLoss){
            this.stateObject.currentLevel = 1;
            this.stateObject.gameScore = 0;
            this.stateObject.isLoss = false;
        }
        this.state.start('GameState', true, false, this.stateObject);
    },
    goHome: function(){
        this.state.start('HomeState');
    }
};