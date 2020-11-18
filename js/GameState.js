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
        this.initBall();
        this.debugMethod();
    },
    update: function(){
        this.moveBoard_desktop();
        this.game.physics.arcade.overlap(this.board, this.ball, this.boardTouchBall, null, this);
        if(this.ball && this.board){
            if(this.ball.y > this.board.y + 80){
               //this.ball.kill();
            }
        }
    },
    initConstValues: function(){
        this.BOARD_SPEED = 10;
        this.BALL_SPEED  = 10;
        this.DRAG_BUTTON_X = this.game.width/2;
        this.DRAG_BUTTON_Y = this.game.height -  this.game.height/8;
        this.BALL_X = 50;
        this.BALL_Y = 80;
        this.BOARD_X = this.game.width/2;
        this.BOARD_Y = this.game.height - this.game.height/5;
    },
    initControls_mobile: function(){
        this.dragButton = this.game.add.button(this.DRAG_BUTTON_X, this.DRAG_BUTTON_Y, 'board');
        this.dragButton = this.game.add.button(this.DRAG_BUTTON_X, this.DRAG_BUTTON_Y, 'spritesheet_breakout',null , null, 'board','board','board','board');
        this.dragButton.scale.setTo(0.25);
        this.dragButton.inputEnabled = true;
        this.dragButton.input.enableDrag();
        this.dragButton.events.onDragUpdate.add(this.moveBoard_mobile, this);
    },
    initControls_desktop: function(){
        this.inputCursorKeys = this.game.input.keyboard.createCursorKeys(); 
        this.WASD_Keys = this.game.input.keyboard.addKeys({
            'left': Phaser.KeyCode.A, 
            'right': Phaser.KeyCode.D 
            }); 
    },
    initBoard: function(){
        this.boardGroup = this.game.add.group();
        this.board = new Breakout.Board(this.game, this.BOARD_X, this.BOARD_Y,'spritesheet_breakout' ,'board-fire');
        this.board.scale.setTo(0.25);
        this.boardGroup.add(this.board);
        this.board.body.onCollide = new Phaser.Signal();
        this.board.body.onCollide.add(this.stopBoard, this);
    },
    initBall: function(){
        this.ballGroup = this.game.add.group();
        this.ball = new Breakout.Ball(this.game, this.BALL_X, this.BALL_Y, 'spritesheet_breakout', 'ball');
        this.ball.scale.setTo(0.25);
        this.ballGroup.add(this.ball);
    },
    moveBoard_desktop: function(){
        if((this.inputCursorKeys.left.isDown || this.WASD_Keys['left'].isDown) && this.board.x > 0){
            this.board.x -= this.BOARD_SPEED;
        }
        else if((this.inputCursorKeys.right.isDown || this.WASD_Keys['right'].isDown) && this.board.x < 475 ){
            this.board.x += this.BOARD_SPEED;
            console.log(this.game.width);
        }
        
        /* if(this.board.worldPosition.x < -70){
            this.board.x = -70;//this.game.width - 50;
        }
        else if(this.board.worldPosition.x > this.game.width - 180){
            this.board.x = this.game.width - 180;
        } */
        this.dragButton.x = this.board.x;
    },
    moveBoard_mobile: function(){
        var newBoard_X = arguments[2];
        /* if( newBoard_X < -70){
            this.dragButton.x = -70;
        }
        else if(newBoard_X > this.game.width - 180){
            this.dragButton.x = this.game.width - 180;
        }
        this.dragButton.y = this.DRAG_BUTTON_Y;
        this.board.x = this.dragButton.x; */
        
    },
    boardTouchBall: function(){
        //console.log('touching');
        this.ball.body.velocity.setTo(this.ball.body.velocity.x,-this.ball.body.velocity.y);
       // console.log(this.board.body.checkCollision);//.dispatch(this.stopBoard, this);
    },
    stopBoard: function(){
        //console.log('colliding');
    },
    debugMethod: function(){
    }
};