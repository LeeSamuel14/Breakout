var Breakout = Breakout || {};

Breakout.GameState = {
    init: function(stateObject){
        this.game.stage.backgroundColor = '#000000';
        this.game.physics.startSystem(Phaser.Physics.Arcade);
        this.gameTimer = this.game.time.create(false);
        this.gameTimer.start();
        this.stateObject = stateObject;
        this.currentLevel = this.stateObject.currentLevel; 
        this.score = this.stateObject.gameScore;
    },
    create: function(){
        this.initDifficultySpeed();
        this.initConstValues();
        this.initGameBoarder();
        this.initControls_mobile();
        this.initControls_desktop();
        //!Phaser.Device.desktop ? this.initControls_mobile() : this.initControls_desktop();
        this.initBoard();
        this.initBall();
        this.initBrickValues();
        this.initBricks();
        this.initGameText();
        this.initLives();
        this.initAbilities();
        this.initLaser();
    },
    update: function(){
        this.moveBoard_desktop();
        this.game.physics.arcade.collide(this.board, this.ballGroup, this.ballTouchBoard, null, this);
        this.game.physics.arcade.overlap(this.board, this.ballGroup, this.ballOverlapBoard, null, this);
        this.game.physics.arcade.collide(this.bricksGroup, this.ballGroup, this.ballTouchBrick, null, this);
        this.game.physics.arcade.collide(this.bricksGroup, this.laserGroup, this.ballTouchBrick, null, this);
        this.game.physics.arcade.overlap(this.board, this.abilitiesGroup, this.pickUpAbility, null, this);
        this.ballGroup.iterate('name', 'ball',0, this.checkWinOrLose, this);
        if(this.abilityActive){
            this.text_Ability.text = Math.floor(this.abilityTimer.duration/1000) + 's';
        }
    },
    initDifficultySpeed: function(){
        this.difficultySpeed = 0;
        if(this.stateObject.difficulty){
            switch(this.stateObject.difficulty){
                case 'Easy':
                    this.difficultySpeed = 500;
                    break;
                case 'Medium':
                    this.difficultySpeed = 750;
                    break;
                case 'Hard':
                    this.difficultySpeed = 1000;
                    break; 
                default:
                    this.difficultySpeed = 500;
                    break;
            }
        }
    },
    initConstValues: function(){
        this.BOARD_X = this.game.width/2;
        this.BOARD_Y = this.game.height - this.game.height/5;
        this.BOARD_SPEED = 10;
        this.DRAG_BUTTON_X = this.game.width/2;
        this.DRAG_BUTTON_Y = this.game.height -  this.game.height/9;
        this.BALL_X = this.BOARD_X;
        this.BALL_Y = this.BOARD_Y - 50;
        this.BALL_VELOCITY = this.difficultySpeed;
        this.SPRITESHEET = 'spritesheet_breakout';
        this.SPRITESHEET_SCALE = 0.15;
        this.SPRITESHEET_SCALE_UP_BOARD = 1.25;
        this.BRICKS_PER_LINE = 8;
        this.PLAYER_LIVES = 3;
        this.GENERATE_ABILITY_TIME = 12000;
        this.ABILITY_LIFESPAN = 10000;

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
    initGameBoarder: function(){
        this.line_TOP = this.game.add.graphics();
        this.line_TOP.beginFill(0x33CCFF);
        this.line_TOP.drawRect(0, 0, this.game.width, 5);
        this.line_TOP.endFill();

        this.line_RIGHT = this.game.add.graphics();
        this.line_RIGHT.beginFill(0x33CCFF);
        this.line_RIGHT.drawRect(this.game.width - 5, 0, 5, this.game.height);
        this.line_RIGHT.endFill();

        this.line_BOTTOM = this.game.add.graphics();
        this.line_BOTTOM.beginFill(0x33CCFF);
        this.line_BOTTOM.drawRect(0, this.game.height - 5, this.game.width, 5);
        this.line_BOTTOM.endFill();

        this.line_LEFT = this.game.add.graphics();
        this.line_LEFT.beginFill(0x33CCFF);
        this.line_LEFT.drawRect(0, 0, 5, this.game.height);
        this.line_LEFT.endFill();
    },
    initBoard: function(){
        this.boardGroup = this.game.add.group();
        this.board = new Breakout.Board(this.game, this.BOARD_X, this.BOARD_Y, this.SPRITESHEET ,'board');
        this.board.scale.setTo(0.25, 0.2);
        this.boardGroup.add(this.board);
    },
    initBall: function(){
        this.ballGroup = this.game.add.group();
        this.ball = new Breakout.Ball(this.game, this.BALL_X, this.BALL_Y, this.SPRITESHEET, 'ball', this.BALL_VELOCITY);
        this.ball.scale.setTo(this.SPRITESHEET_SCALE);
        this.ballGroup.add(this.ball);
        //#lee ball srating off as you play look at phaser pause and pop ups in Phaser
    },
    initBrickValues: function(){
        this.breakoutConfig = JSON.parse(this.game.cache.getText('breakout_config'));
        this.bricksDestroyed = 0;
    },
    initBricks: function(){
        var brick_width = 12.5;
        var brick_height = 64;
        /* var brick_width = 12.5;
        var brick_height = 64; */

        this.bricksGroup = this.game.add.group();
        for(var i = 0; i < this.currentLevel * this.BRICKS_PER_LINE; i++){ //this.currentLevel * 6 //bricks per level
            var randomNumber = Math.floor(Math.random()*(this.breakoutConfig.bricks.length));
            var brickData = this.breakoutConfig.bricks[randomNumber];
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
        var textStyle = { font: "32px Microsoft JhengHei UI", fontStyle: "bold", fill: "#33ccff", align: "center" };
        this.text_Score = this.game.add.text(10, 10, 'SCORE '+ this.score, textStyle);
        this.text_Level = this.game.add.text(this.game.width - 170, 10, 'LEVEL '+ this.currentLevel, textStyle);
        this.text_PlayerLives = this.game.add.text(40, this.game.height - 60, ' ', textStyle);
        this.text_Ability = this.game.add.text(this.game.width/2, 30, 'Power s', textStyle);
        this.text_Ability.anchor.setTo(0.5);
        this.text_Ability.visible = false;
    },
    initLives: function(){
        this.playerLives = this.PLAYER_LIVES;
        this.ballLivesSprite = this.game.add.sprite(10, this.game.height -50, this.SPRITESHEET, 'heart');
        this.ballLivesSprite.scale.setTo(this.SPRITESHEET_SCALE);
        this.text_PlayerLives.text = this.playerLives;
    },
    initAbilities: function(){
        this.abilityTimer = this.game.time.create(false);
        this.abilityActive = false;
        this.abilitiesGroup = this.game.add.group();
        this.game.time.events.loop(this.GENERATE_ABILITY_TIME, this.generateAbility ,this);
        this.abilities = this.breakoutConfig.abilities;
        this.randomSprite = '';
    },
    initLaser: function(){
        this.laserTimer = this.game.time.create(false);
        this.laserGroup = this.game.add.group();
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
    ballOverlapBoard: function(board, ball){
        ball.body.velocity.setTo(this.BALL_VELOCITY, -this.BALL_VELOCITY);
    },
    ballTouchBrick: function(brick, ball){
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
        if(ball.name === 'laser'){
            ball.kill();
        } 
        this.text_Score.text = 'SCORE: '+ this.score;
    },
    checkWinOrLose: function(ball){
        if(ball && this.board){
            if(ball.y > this.board.y + 80){
               //put message box to let person know they failed\
               if(this.playerLives <= 0){
                ball.kill();
                this.setStateObjectValues(true);
                this.state.start('WinLoseState', true, false, this.stateObject);
               }
               else{
                   if(this.ballGroup.length > 1){
                    ball.kill(); 
                    this.ballGroup.remove(ball);
                   }
                   else{
                    this.resetBall(ball); 
                    this.playerLives--; 
                   }
                    this.text_PlayerLives.text = this.playerLives;
               }
                
            }
        }
        if(this.bricksDestroyed >= (this.currentLevel * this.BRICKS_PER_LINE) ){
            ++this.currentLevel;
            this.setStateObjectValues(false)
            this.state.start('WinLoseState', true, false, this.stateObject);
        }
    },
    setStateObjectValues: function(isLoss){
        this.stateObject.currentLevel = this.currentLevel;
        this.stateObject.gameScore = this.score;
        //set high score in winlose state
        this.stateObject.isLoss = isLoss;
    },
    generateAbility: function(){
        var abilitySpriteName = this.generateRandomAbility();
        var randomNumber = Math.floor(Math.random()*(this.game.width - 100));
        var ability = new Breakout.Ability(this.game, randomNumber, 0, this.SPRITESHEET, abilitySpriteName);
        //console.log(abilitySpriteName);
        //console.log(ability.frame);
        ability.scale.setTo(0.2);
        this.abilitiesGroup.add(ability);
        this.previousAbility = abilitySpriteName;
        //delete when out of view please #lee
    },
    generateRandomAbility: function(){
        var randomPosition = Math.floor(Math.random()*(this.abilities.length)); //#uncomment
        var abilitySpriteName = this.abilities[randomPosition].name;
        //console.log(abilitySpriteName);
        if(this.previousAbility){
            if(this.previousAbility === abilitySpriteName){
                this.generateRandomAbility();
                return this.randomSprite;
            }
            else{
                this.randomSprite = abilitySpriteName;
                return abilitySpriteName;
            }
        }
        else {
            this.randomSprite = abilitySpriteName;
            return abilitySpriteName;
        }
    },
    pickUpAbility: function(board, ability){
        this.abilityName = ability.name;
        //console.log(this.abilityName);
        this.abilityActive = true;
        this.text_Ability.visible = true;
        switch(ability.name){
            case "board-shrink":
                this.board.scale.setTo(0.17, 0.2);
                break;
            case "board-grow":
                this.board.scale.setTo(0.4, 0.2);
                break;
            case "board-many-balls":
                for(var i = 1; i < 3; i++){
                    this.newBall = new Breakout.Ball(this.game, i*100, i*200, this.SPRITESHEET, 'ball', this.BALL_VELOCITY);
                    this.newBall.scale.setTo(this.SPRITESHEET_SCALE);
                    this.ballGroup.add(this.newBall);
                }
                break;
            case "board-slow":
                this.ballGroup.iterate('name', 'ball', 0, function(ball){
                    ball.body.velocity.setTo(ball.body.velocity.x / 1.75, ball.body.velocity.y / 1.75);
                }, this);
                break;
            case "board-fast":
                this.ballGroup.iterate('name', 'ball', 0, function(ball){
                    ball.body.velocity.setTo(ball.body.velocity.x * 1.75, ball.body.velocity.y * 1.75);
                }, this);
                break;
            case "board-laser":
                this.canShootLaser = true;
                this.laserTimer.start();
                this.laserTimer.add(10, this.shootLasers, this, null);
                break;
            case "board-50":
                this.score += 50;
                this.abilityActive = false;
                this.text_Ability.visible = false;
                break;
            case "board-100":
                this.score += 100;
                this.abilityActive = false;
                this.text_Ability.visible = false;
                break;
            case "board-250":
                this.score += 250;
                this.abilityActive = false;
                this.text_Ability.visible = false;
                break;  
            case "board-500":
                this.score += 500;
                this.abilityActive = false;
                this.text_Ability.visible = false;
                break;
        }
        this.text_Score.text = 'SCORE: '+ this.score;
        this.abilityTimer.start();
        this.abilityTimer.add(this.ABILITY_LIFESPAN, this.resetToBaseGame, this, null);
        ability.kill();
    },
    resetToBaseGame: function(){
        if(this.abilityName){
            switch(this.abilityName){
                case "board-shrink":
                case "board-grow":
                    this.board.scale.setTo(0.25, 0.2);
                    break;
                case "board-many-balls":
                    break;
                case "board-slow":
                    this.ballGroup.iterate('name', 'ball', 0, function(ball){
                        ball.body.velocity.setTo(ball.body.velocity.x * 1.75, ball.body.velocity.y * 1.75);
                    }, this);
                    break;
                case "board-fast":
                    this.ballGroup.iterate('name', 'ball', 0, function(ball){
                        ball.body.velocity.setTo(ball.body.velocity.x / 1.75, ball.body.velocity.y / 1.75);
                    }, this);
                    break;
                case "board-laser":
                    this.canShootLaser = false;
                    this.laserTimer.stop();
                    this.game.time.events.add(2000, function(){ 
                        this.laserGroup.removeAll(true);
                        }, this);
                    break;
                case "board-50":
                    break;
                case "board-100":
                    break;
                case "board-250":
                    break;  
                case "board-500":
                    break;
            }
        }
        this.abilityActive = false;
        this.text_Ability.visible = false;
        this.abilityTimer.stop();
    },
    resetBall: function(ball){
        ball.reset(this.game.width/2, this.game.height/4);
        this.game.time.events.add(2000, function(){ 
        ball.body.velocity.setTo(this.BALL_VELOCITY, this.BALL_VELOCITY);
        }, this);
    },
    shootLasers: function(){
        if(this.canShootLaser){
            var laserX = this.board.x;
            for(var i = 0; i < 2; i++){
                var laser = new Breakout.Laser(this.game, laserX , this.board.y - 20 , this.SPRITESHEET ,'laser');
                laser.scale.setTo(0.5);
                laser.body.velocity.setTo(0, -300);
                this.laserGroup.add(laser);
                laserX += this.board.width - 20;
            }
            this.laserTimer.add(500, this.shootLasers, this, null);
        }
    }
};