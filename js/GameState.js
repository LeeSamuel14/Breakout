var Breakout = Breakout || {};

Breakout.GameState = {
    init: function(currentLevel){
        this.game.stage.backgroundColor = '#000000';
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
        this.initBrickValues();
        this.initBricks();
        this.initGameText();
        this.debugMethod();
    },
    update: function(){
        this.moveBoard_desktop();
        this.game.physics.arcade.collide(this.board, this.ball, this.ballTouchBoard, null, this);
        this.game.physics.arcade.collide(this.bricksGroup, this.ball, this.ballTouchBrick, null, this);
        this.checkWinOrLose();
    },
    initConstValues: function(){
        this.BOARD_SPEED = 10;
        this.BALL_SPEED  = 10;
        this.DRAG_BUTTON_X = this.game.width/2;
        this.DRAG_BUTTON_Y = this.game.height -  this.game.height/9;
        this.BALL_X = 300;
        this.BALL_Y = 300;
        this.BOARD_X = this.game.width/2;
        this.BOARD_Y = this.game.height - this.game.height/5;
        this.SPRITESHEET = 'spritesheet_breakout';
        this.SPRITESHEET_SCALE = 0.15;
        this.SPRITESHEET_SCALE_UP_BOARD = 1.25;
        this.BRICKS_PER_LINE = 8;
    },
    initControls_mobile: function(){
        this.dragButton = this.game.add.button(this.DRAG_BUTTON_X, this.DRAG_BUTTON_Y, 'slider');
        this.dragButton.scale.setTo(0.25, 0.6);
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
        this.board = new Breakout.Board(this.game, this.BOARD_X, this.BOARD_Y,this.SPRITESHEET ,'board');
        this.board.scale.setTo(this.SPRITESHEET_SCALE * this.SPRITESHEET_SCALE_UP_BOARD);
        this.boardGroup.add(this.board);
    },
    initBall: function(){
        this.ballGroup = this.game.add.group();
        this.ball = new Breakout.Ball(this.game, this.BALL_X, this.BALL_Y, this.SPRITESHEET, 'ball');
        this.ball.scale.setTo(this.SPRITESHEET_SCALE);
        this.ballGroup.add(this.ball);
    },
    initBrickValues: function(){
        this.bricksData = JSON.parse(this.game.cache.getText('bricks'));
        this.bricksDestroyed = 0;
    },
    initBricks: function(){
        var brick_width = 12.5;
        var brick_height = 64;

        this.bricksGroup = this.game.add.group();
        for(var i = 0; i < this.currentLevel * this.BRICKS_PER_LINE; i++){ //this.currentLevel * 6 //bricks per level
            var randomNumber = Math.floor(Math.random()*(this.bricksData.bricks.length));
            var brickData = this.bricksData.bricks[randomNumber];
            var brick = new Breakout.Brick(this.game, brick_width, brick_height, this.SPRITESHEET, brickData.name);
            brick.brickData = brickData;
            brick.scale.setTo(this.SPRITESHEET_SCALE);
            this.bricksGroup.add(brick);
            brick_width += 70;
            if(brick_width + 70 > this.game.width){
                brick_width = 12.5;
                brick_height += 28;
            }
        }
    },
    initGameText: function(){
        this.score = 0;
        var textStyle = { font: "32px Sans Serif", fill: "#FFFFFF", align: "center" };
        this.text_Score = this.game.add.text(this.game.width/2, 35, 'SCORE: '+ this.score, textStyle);
        this.text_Score.anchor.setTo(0.5);
    },
    moveBoard_desktop: function(){
        if((this.inputCursorKeys.left.isDown || this.WASD_Keys['left'].isDown) && this.board.x > 0){
            this.board.x -= this.BOARD_SPEED;
        }
        else if((this.inputCursorKeys.right.isDown || this.WASD_Keys['right'].isDown) && this.board.x < (this.game.width - this.board.width) ){
            this.board.x += this.BOARD_SPEED;
        }
        this.dragButton.x = this.board.x;
    },
    moveBoard_mobile: function(){
        var newBoard_X = arguments[2];
        if( newBoard_X < 0){
            this.dragButton.x = 0;
        }
        else if(newBoard_X > this.game.width - this.board.width){
            this.dragButton.x = this.game.width - this.board.width;
        } 
        this.dragButton.y = this.DRAG_BUTTON_Y;
        this.board.x = this.dragButton.x;
        
    },
    ballTouchBoard: function(){},
    ballTouchBrick: function(ball, brick){
        if(brick.alpha === 1){
            brick.loadTexture(this.SPRITESHEET, brick.brickData.broken);
        }
        brick.alpha -= 1/brick.brickData.difficulty;
        
        if(brick.alpha <= 0.3){
            this.bricksDestroyed++;
            brick.kill();
            this.score += 100;
        }
        else{
            this.score += 10;
        }
        this.text_Score.text = 'SCORE: '+ this.score;
    },
    checkWinOrLose: function(){
        if(this.ball && this.board){
            if(this.ball.y > this.board.y + 80){
               //this.ball.kill();
               //this.state.start('WinLoseState', true, false, 1);
            }
        }
        if(this.bricksDestroyed >= (this.currentLevel * this.BRICKS_PER_LINE) ){
            this.state.start('WinLoseState', true, false, ++this.currentLevel);
        }
    },
    debugMethod: function(){
    }
};