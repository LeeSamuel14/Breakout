var Breakout = Breakout || {};

Breakout.GameState = {
    init: function(currentLevel){
        this.game.physics.startSystem(Phaser.Physics.Arcade);
        this.gameTimer = this.game.time.create(false);
        this.gameTimer.start();
        this.currentLevel = currentLevel; 
    },
    create: function(){
        this.initConstValues();
        this.initControls_mobile();
        this.initControls_desktop();
        //!Phaser.Device.desktop ? this.initControls_mobile() : this.initControls_desktop();
        this.initBoard();
        this.debugMethod();
    },
    update: function(){
        this.moveBoard();
    },
    initConstValues: function(){
        this.BOARD_SPEED = 10;
        this.DRAG_BUTTON_X = this.game.width/2;
        this.DRAG_BUTTON_Y = this.game.height -  this.game.height/8;
        this.BOARD_X = this.game.width/2;
        this.BOARD_Y = this.game.height - this.game.height/5;
    },
    initControls_mobile: function(){
        this.dragButton = this.game.add.button(this.DRAG_BUTTON_X, this.DRAG_BUTTON_Y, 'board');
        this.dragButton.inputEnabled = true;
        this.dragButton.input.enableDrag();
        this.dragButton.events.onDragUpdate.add(this.onDragUpdate, this);
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
        this.boardGroup = this.game.add.group();
        this.board = new Breakout.Board(this.game, this.BOARD_X, this.BOARD_Y, 'board', 0);

        //this.board.anchor.setTo(0.5);
        this.boardGroup.add(this.board);
    },
    moveBoard: function(){
        /* console.log(this.board.width);
        console.log(this.game.width); */
        if((this.inputCursorKeys.left.isDown || this.WASD_Keys['left'].isDown) && this.board.worldPosition.x > -70){
            this.board.x -= this.BOARD_SPEED;
            console.log(this.board.worldPosition.x);
        }
        else if((this.inputCursorKeys.right.isDown || this.WASD_Keys['right'].isDown) && this.board.worldPosition.x < this.game.width - 180){
            this.board.x += this.BOARD_SPEED;
            console.log(this.board.worldPosition.x);
        }
        
        if(this.board.worldPosition.x < -70){
            this.board.x = -70;//this.game.width - 50;
        }
        else if(this.board.worldPosition.x > this.game.width - 180){
            this.board.x = this.game.width - 180;
        }
        this.dragButton.x = this.board.x;
    },
    debugMethod: function(){
        //console.log(this.game.input.keyboard.onDownCallback);//.onDownCallback(this.moveBoard, this);
    },
    onDragUpdate: function(){
        if(this.dragButton.worldPosition.x < -70){
            this.dragButton.x = -70;//this.game.width - 50;
        }
        else if(this.dragButton.worldPosition.x > this.game.width - 180){
            this.dragButton.x = this.game.width - 180;
        }
        this.dragButton.y = this.DRAG_BUTTON_Y;
        this.board.x = this.dragButton.x;
        
    }
};