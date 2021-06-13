var Breakout = Breakout || {};

Breakout.WinLoseState = {
    init: function(stateObject) {
        this.stateObject = stateObject;
    },
    create: function() {
        this.initCurrentLevel();
        this.initSetHighScore();
        this.initButtons();
        this.initGameText();
    },
    initCurrentLevel: function(){
        if(!this.stateObject.isLoss){
            this.stateObject.currentLevel += 1;
        }  
    },
    initSetHighScore: function(){
        if(localStorage.getItem('highScore')){
            var highScore = parseInt(localStorage.getItem('highScore'));
            this.newHighScore = false;
            if(this.stateObject.gameScore > highScore){
                localStorage.setItem('highScore', this.stateObject.gameScore);
                this.stateObject.highScore = this.stateObject.gameScore;
                this.newHighScore = true;
            }
        }
    },
    initButtons: function(){
        if(!this.stateObject.isLoss){
            this.button_StartNextGame = this.game.add.button(this.game.width/2, this.game.height/3 + 80, 'spritesheet_breakout', null, null,'light-blue-tile', 'light-blue-tile','light-blue-tile-broken','light-blue-tile-broken');
            this.button_StartNextGame.events.onInputDown.add(this.startNextGame, this);
            this.button_StartNextGame.anchor.setTo(0.5);
        }
        this.button_GoHome = this.game.add.button(this.game.width/2, this.game.height/1.5 + 30, 'spritesheet_breakout', null, null,'light-blue-tile', 'light-blue-tile','light-blue-tile-broken','light-blue-tile-broken');
        this.button_GoHome.events.onInputDown.add(this.goHome, this);
        this.button_GoHome.anchor.setTo(0.5);
    },
    initGameText: function(){
        var winLoseText = (this.stateObject.isLoss) ? 'YOU LOSE...' : 'YOU WIN!';
        var textStyle = { font: "30px Press Start 2P", fontStyle: "bold", fill: "#000", align: "center" };
        var textStyle_Blue = { font: "30px Press Start 2P", fontStyle: "bold", fill: "#33ccff", align: "center" };
        var textStyle_Black = { font: "30px Press Start 2P", fontStyle: "bold", fill: "#000000", align: "center" };
        var textStyle_Red = { font: "30px Press Start 2P", fontStyle: "bold", fill: "#FF0000", align: "center" };
        var textStyle_Yellow = { font: "30px Press Start 2P", fontStyle: "bold", fill: "#FFFF00", align: "center" };
        var textStyle_WinLose = (this.stateObject.isLoss) ? textStyle_Red : textStyle_Yellow;
        this.text_WinLose = this.game.add.text(this.game.width/2, 40, winLoseText, textStyle_WinLose);
        this.text_Score = this.game.add.text(this.game.width/2, 170, 'GAME SCORE:'+ this.stateObject.gameScore, textStyle_Blue);
        this.text_HighScore = this.game.add.text(this.game.width/2, 230, 'HIGH SCORE:'+ this.stateObject.highScore, textStyle_Blue);
        this.text_GoHome = this.game.add.text(this.game.width/2, this.game.height/1.5 + 30, 'HOME', textStyle_Black);
        this.text_WinLose .anchor.setTo(0.5);
        this.text_Score.anchor.setTo(0.5);
        this.text_HighScore.anchor.setTo(0.5);
        this.text_GoHome.anchor.setTo(0.5);
        if(this.newHighScore){
            this.text_NewHighScore = this.game.add.text(this.game.width/2, 110, 'NEW HIGH SCORE!', textStyle_Yellow); 
            this.text_NewHighScore.anchor.setTo(0.5);

        }
        if(!this.stateObject.isLoss){
            var startNextGameText = 'LEVEL ' + this.stateObject.currentLevel;
            this.text_StartNextGame = this.game.add.text(this.game.width/2, this.game.height/3 + 80, startNextGameText, textStyle_Black);
            this.text_StartNextGame.anchor.setTo(0.5);

        }
    },
    startNextGame: function(){
        this.state.start('GameState', true, false, this.stateObject);
    },
    goHome: function(){
        this.state.start('HomeState');
    }
};