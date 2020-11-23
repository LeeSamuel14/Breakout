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
        this.button_Easy = this.game.add.button(this.game.width/2, this.game.height/4, 'spritesheet_breakout', null, null,'green-tile', 'green-tile','green-tile','green-tile');
        this.button_Easy.anchor.setTo(0.5);
        this.button_Easy.events.onInputDown.add(function(){
            this.state.start('GameState', true, false, this.stateObject);
          }, this);

        this.button_Medium = this.game.add.button(this.game.width/2, this.game.height/2, 'spritesheet_breakout', null, null,'orange-tile', 'orange-tile','orange-tile','orange-tile');
        this.button_Medium.anchor.setTo(0.5);
        this.button_Medium.events.onInputDown.add(function(){
            this.state.start('GameState', true, false, this.stateObject);
          }, this);

        this.button_Hard= this.game.add.button(this.game.width/2, this.game.height - this.game.height/4, 'spritesheet_breakout', null, null,'red-tile', 'red-tile','red-tile','red-tile');
        this.button_Hard.anchor.setTo(0.5);
        this.button_Hard.events.onInputDown.add(function(){
            this.state.start('GameState', true, false, this.stateObject);
          }, this);
    },
    initGameText: function(){
        var textStyle = { font: "36px Raavi", fontStyle: "bold", fill: "#000000", align: "center" };
        //this.text_Home = this.game.add.text(10, 10, 'HOME', textStyle);
        this.text_Easy = this.game.add.text(this.game.width/2, this.game.height/4, 'EASY', textStyle);
        this.text_Medium = this.game.add.text(this.game.width/2, this.game.height/2, 'MEDIUM', textStyle);
        this.text_Hard = this.game.add.text(this.game.width/2, this.game.height - this.game.height/4, 'HARD', textStyle);
        this.text_Easy.anchor.setTo(0.5);
        this.text_Medium.anchor.setTo(0.5);
        this.text_Hard.anchor.setTo(0.5);
    }
};