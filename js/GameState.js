var Breakout = Breakout || {};

Breakout.GameState = {
    init: function(currentLevel){
        this.game.physics.startSystem(Phaser.Physics.Arcade);
        this.gameTimer = this.game.time.create(false);
        this.gameTimer.start();
        this.currentLevel = currentLevel; 
    },
    create: function(){
        this.initPositions();
        !Phaser.Device.desktop ? this.initControls_mobile() : this.initControls_desktop();
        this.initBoard();
        this.debugMethod();
    },
    update: function(){
    },
    initPositions: function(){
        this.DRAG_BUTTON_X = this.game.width/2;
        this.DRAG_BUTTON_Y = this.game.height -  this.game.height/8;
        this.BOARD_X = this.game.width/2;
        this.BOARD_Y = this.game.height - this.game.height/6;
    },
    initControls_mobile: function(){
        this.dragButton = this.game.add.button(this.DRAG_BUTTON_X, this.DRAG_BUTTON_Y, 'board');
        this.dragButton.inputEnabled = true;
        this.dragButton.input.enableDrag();
        this.dragButton.events.onDragUpdate.add(this.onDragUpdate, this);
        //this.dragButton.scale.setTo(0.2, 0.2);
    },
    initControls_desktop: function(){
        this.inputCursorKeys = this.game.input.keyboard.createCursorKeys(); 
        console.log(this.inputCursorKeys);
        this.WASD_Keys = this.game.input.keyboard.addKeys({
            'left': Phaser.KeyCode.A, 
            'right': Phaser.KeyCode.D 
            }); 
    },
    initBoard: function(){
        this.board = this.game.add.sprite(this.BOARD_X, this.BOARD_Y, 'board');
        //this.board = new Breakout.Board(this.game, this.BOARD_X, this.BOARD_Y, 'board', 0);
        //console.log(this.board );
        //this.game.add(this.board);
    },
    moveBoard: function(){
        if(this.inputCursorKeys.left.isDown || this.WASD_Keys['left'].isDown){

        }
        else if(this.inputCursorKeys.right.isLeft || this.WASD_Keys['right'].isDown){

        }
    },
    debugMethod: function(){
        console.log(this.game.input.keyboard.onDownCallback);//.onDownCallback(this.moveBoard, this);
    },
    onDragUpdate: function(){
        this.dragButton.y = this.DRAG_BUTTON_Y;
    }
};