var Breakout = Breakout || {};

Breakout.HomeState = {
    init: function(){
    },
    create: function(){
        this.startGame();
    },
    startGame: function(){
        this.state.start('GameState', true, false, 1);
        /* if( localStorage.getItem('playerLevel') ){
            this.state.start('GameState', true, false, localStorage.getItem('playerLevel'));
        }
        else{
            this.state.start('GameState', true, false, 1);
        } */
    }
};