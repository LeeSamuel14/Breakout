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
        this.initSliderGraphics();
        this.initGameText();
        this.debugMethod();
    },
    update: function(){
        this.moveBoard_desktop();
        this.game.physics.arcade.collide(this.board, this.ball, this.ballTouchBoard, null, this);
        this.game.physics.arcade.collide(this.bricksGroup, this.ball, this.ballTouchBrick, null, this);
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
        this.DRAG_BUTTON_Y = this.game.height -  this.game.height/9;
        this.BALL_X = 300;
        this.BALL_Y = 300;
        this.BOARD_X = this.game.width/2;
        this.BOARD_Y = this.game.height - this.game.height/5;
        this.SPRITESHEET = 'spritesheet_breakout';
        this.SPRITESHEET_SCALE = 0.25;
    },
    initControls_mobile: function(){
        this.dragButton = this.game.add.button(this.DRAG_BUTTON_X, this.DRAG_BUTTON_Y, 'slider');
        //this.dragButton = this.game.add.button(this.DRAG_BUTTON_X, this.DRAG_BUTTON_Y, this.SPRITESHEET,null , null, 'board','board','board','board');
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
        this.board = new Breakout.Board(this.game, this.BOARD_X, this.BOARD_Y,this.SPRITESHEET ,'board-fire');
        this.board.scale.setTo(this.SPRITESHEET_SCALE);
        this.boardGroup.add(this.board);
        this.board.body.onCollide = new Phaser.Signal();
        this.board.body.onCollide.add(this.stopBoard, this);
    },
    initBall: function(){
        this.ballGroup = this.game.add.group();
        this.ball = new Breakout.Ball(this.game, this.BALL_X, this.BALL_Y, this.SPRITESHEET, 'ball');
        this.ball.scale.setTo(this.SPRITESHEET_SCALE);
        this.ballGroup.add(this.ball);
    },
    initBrickValues: function(){
        this.bricksData = JSON.parse(this.game.cache.getText('bricks'));
        console.log(this.bricksData.bricks.length);
        /* this.brickValues = {};
        this.brickValues.colours = ['blue-tile'];
        this.brickValues.diff */
    },
    initBricks: function(){
        var brick_width = 12.5;
        var brick_height = 64;

        this.bricksGroup = this.game.add.group();
        for(var i = 0; i < 1 * 10; i++){
            var randomNumber = Math.floor(Math.random()*(this.bricksData.bricks.length));
            var brickData = this.bricksData.bricks[randomNumber];
            var brick = new Breakout.Brick(this.game, brick_width, brick_height, this.SPRITESHEET, brickData.name);
            brick.brickData = brickData;
            brick.scale.setTo(this.SPRITESHEET_SCALE);
            this.bricksGroup.add(brick);
            brick_width += 96;
            if(brick_width + 96 > this.game.width){
                brick_width = 12.5;
                brick_height += 32;
            }
        }
        /* this.testBrick = new Breakout.Brick(this.game, 100, 200, this.SPRITESHEET, 'blue-tile');
        this.testBrick.scale.setTo(this.SPRITESHEET_SCALE);
        console.log(this.testBrick.width);
        console.log(this.testBrick.height);
        this.bricksGroup.add(this.testBrick); */
    },
    initSliderGraphics: function(){
        /* this.sliderGraphic = this.game.add.graphics();
        this.sliderGraphic.beginFill(0xFFFFFF);
        this.sliderGraphic.drawRect(0, this.game.height -  this.game.height/6 + 60, this.game.width, 10);
        this.sliderGraphic.endFill(); */
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
        if( newBoard_X < 0){
            this.dragButton.x = 0;
        }
        else if(newBoard_X > this.game.width - this.board.width){
            this.dragButton.x = this.game.width - this.board.width;
        } 
        this.dragButton.y = this.DRAG_BUTTON_Y;
        this.board.x = this.dragButton.x;
        
    },
    ballTouchBoard: function(){
        //console.log('touching');
        //this.ball.body.velocity.setTo(this.ball.body.velocity.x,-this.ball.body.velocity.y);
       // console.log(this.board.body.checkCollision);//.dispatch(this.stopBoard, this);
    },
    ballTouchBrick: function(ball, brick){
        if(brick.alpha === 1){
            brick.loadTexture(this.SPRITESHEET, brick.brickData.broken);
            console.log("X");
        }
        brick.alpha -= 1/brick.brickData.difficulty;
        
        if(brick.alpha <= 0.3){
            brick.kill();
            this.score += 100;
            console.log(this.bricksGroup);
        }
        this.score += 10;
        this.text_Score.text = 'SCORE: '+ this.score;
    },
    stopBoard: function(){
        //console.log('colliding');
    },
    debugMethod: function(){
    }
};