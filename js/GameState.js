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
        this.brickHitScore = this.stateObject.brickHitScore;
        this.brickDieScore = this.stateObject.brickDieScore;
        this.gameStarted = false;
        this.buttonPressed = false;
    },
    create: function(){
        this.initDifficultySpeed();
        this.initConstValues();
        this.initGameBoarder();
        this.initGameLogo();
        this.initControlsGraphics();
        this.initPauseButton();
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
        this.initGameSounds();
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
                    this.difficultySpeed = 750;
                    break;
                case 'Medium':
                    this.difficultySpeed = 1100;
                    break;
                case 'Hard':
                    this.difficultySpeed = 1350;
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
        this.DRAG_BUTTON_X = this.game.width/2 - 200;
        this.DRAG_BUTTON_Y = this.game.height -  this.game.height/9;
        this.BALL_X = this.BOARD_X;
        this.BALL_Y = this.BOARD_Y - 50;
        this.BALL_VELOCITY = this.difficultySpeed;
        this.BALL_VELOCITY_FACTOR = 1.75;
        this.BALL_VELOCITY_SLOW = this.difficultySpeed / this.BALL_VELOCITY_FACTOR;
        this.BALL_VELOCITY_FAST = this.difficultySpeed * this.BALL_VELOCITY_FACTOR;
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
        this.dragButton.scale.setTo(2, 1.0);
        this.dragButton.anchor.setTo(0.25, 0);
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
    //#lee move ui elements around
    initGameLogo: function(){
        var logoSprite = this.game.add.sprite(this.game.width/2, 30, 'logo');
        logoSprite.anchor.setTo(0.5);
        logoSprite.scale.setTo(0.6);
    },
    initControlsGraphics: function(){
        this.controlsLine = this.game.add.graphics();
        this.controlsLine.beginFill(0x33CCFF);
        this.controlsLine.drawRoundedRect(20, this.game.height - 70, this.game.width - 40, 10, 7);
        this.controlsLine.endFill();
    },
    initPauseButton: function(){
        this.game.input.onDown.add(this.resumeGame, this);
        this.button_Pause = this.game.add.button(this.game.width - 80, 80, 'pause');//, this.pauseGame, this);
        this.button_Pause.events.onInputUp.add(this.pauseGame, this);
        this.button_Pause.anchor.setTo(0.5);
        this.button_Pause.scale.setTo(0.05);
    },
    initBoard: function(){
        this.boardGroup = this.game.add.group();
        this.board = new Breakout.Board(this.game, this.BOARD_X, this.BOARD_Y, this.SPRITESHEET ,'board');
        this.board.scale.setTo(0.25, 0.2);
        this.boardGroup.add(this.board);
    },
    initBall: function(){
        this.ballGroup = this.game.add.group();
        this.ball = new Breakout.Ball(this.game, this.BALL_X, this.BALL_Y, this.SPRITESHEET, 'ball', 0);
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
        var brick_height = 128;
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
        var textStyle_FontLarge = { font: "40px Microsoft JhengHei UI", fontStyle: "bold", fill: "#33ccff", align: "center" };
        this.text_Score = this.game.add.text(10, 10, 'SCORE '+ this.score, textStyle);
        this.text_Level = this.game.add.text(this.game.width - 170, 10, 'LEVEL '+ this.currentLevel, textStyle);
        this.text_PlayerLives = this.game.add.text(40, 70, ' ', textStyle);
        this.text_Ability = this.game.add.text(this.game.width/2, 90, 'Power s', textStyle);
        this.text_Paused = this.game.add.text(this.game.width/2, this.game.height/2, 'GAME PAUSED', textStyle_FontLarge);
        this.text_Paused.anchor.setTo(0.5);
        this.text_Paused.visible = false;
        this.text_Ability.anchor.setTo(0.5);
        this.text_Ability.visible = false;
    },
    initLives: function(){
        this.playerLives = this.PLAYER_LIVES;
        this.ballLivesSprite = this.game.add.sprite(10, 80, this.SPRITESHEET, 'heart');
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
    initGameSounds: function(){
        this.sound_BrickHit = this.game.add.audio('brick-hit', 5);
        this.sound_Laser = this.game.add.audio('laser', 3);
        this.sound_PickUpAbility = this.game.add.audio('pick-up-ability', 3);
        this.sound_LoseLife = this.game.add.audio('lose-life', 3);
        this.sound_LoseGame = this.game.add.audio('lose-game', 1);
        this.sound_Win = this.game.add.audio('win', 1);
    },
    moveBoard_desktop: function(){
        if((this.inputCursorKeys.left.isDown || this.WASD_Keys['left'].isDown) && this.board.x > 0){
            this.board.x -= this.BOARD_SPEED;
            this.buttonPressed = true;
        }
        else if((this.inputCursorKeys.right.isDown || this.WASD_Keys['right'].isDown) && this.board.x < (this.game.width - this.board.width) ){
            this.board.x += this.BOARD_SPEED;
            this.buttonPressed = true;
        }
        this.dragButton.x = this.board.x;
        if(!this.gameStarted && this.buttonPressed){
            this.ballGroup.iterate('name', 'ball', 0, function(ball){
                ball.body.velocity.setTo(this.BALL_VELOCITY , -this.BALL_VELOCITY);
            }, this);
            this.gameStarted = true;
        }
        

    },
    moveBoard_mobile: function(){
        if(!this.gameStarted){
            this.ballGroup.iterate('name', 'ball', 0, function(ball){
                ball.body.velocity.setTo(this.BALL_VELOCITY , -this.BALL_VELOCITY);
            }, this);
            this.gameStarted = true;
        }
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
        console.log('overlapping');
    },
    ballTouchBrick: function(brick, ball){
        if(brick.alpha === 1){
            brick.loadTexture(this.SPRITESHEET, brick.brickData.broken);
        }
        brick.alpha -= 1/brick.brickData.difficulty;
        if(brick.alpha <= 0.3){
            this.bricksDestroyed++;
            brick.kill();
            this.score += this.brickDieScore;
        }
        else{
            this.score += this.brickHitScore;
        } 
        if(ball.name === 'laser'){
            ball.kill();
        } 
        this.text_Score.text = 'SCORE: '+ this.score;
        this.sound_BrickHit.play();
    },
    checkWinOrLose: function(ball){
        if(ball && this.board){
            if(ball.y > this.board.y + 80){
               //put message box to let person know they failed\
               if(this.playerLives <= 0){
                ball.kill();
                this.setStateObjectValues(true);
                this.sound_LoseGame.play();
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
                    this.sound_LoseLife.play();
                   }
                    this.text_PlayerLives.text = this.playerLives;
               }
                
            }
        }
        if(this.bricksDestroyed >= (this.currentLevel * this.BRICKS_PER_LINE) ){
            ++this.currentLevel;
            this.setStateObjectValues(false);
            this.sound_Win.play();
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
        if(abilitySpriteName === 'heart'){
            ability.scale.setTo(0.3); 
        }
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
                this.abilityActive = false;
                this.text_Ability.visible = false;
                break;
            case "board-slow":
                this.ballGroup.iterate('name', 'ball', 0, function(ball){
                    ball.body.velocity.setTo(ball.body.velocity.x / this.BALL_VELOCITY_FACTOR, ball.body.velocity.y / this.BALL_VELOCITY_FACTOR);
                }, this);
                break;
            case "board-fast":
                this.ballGroup.iterate('name', 'ball', 0, function(ball){
                    ball.body.velocity.setTo(ball.body.velocity.x * this.BALL_VELOCITY_FACTOR, ball.body.velocity.y * this.BALL_VELOCITY_FACTOR);
                }, this);
                break;
            case "board-laser":
                this.canShootLaser = true;
                this.laserTimer.start();
                this.laserTimer.add(10, this.shootLasers, this, null);
                break;
            case "board-50":
            case "board-100":
            case "board-250":  
            case "board-500":
                this.score += 500;
                this.abilityActive = false;
                this.text_Ability.visible = false;
                break;
            case "heart":
                this.playerLives ++;
                this.text_PlayerLives.text = this.playerLives;
                this.abilityActive = false;
                this.text_Ability.visible = false;
                break;
        }
        this.text_Score.text = 'SCORE: '+ this.score;
        this.abilityTimer.start();
        this.abilityTimer.add(this.ABILITY_LIFESPAN, this.resetToBaseGame, this, null);
        ability.kill();
        this.sound_PickUpAbility.play();
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
                        if( Math.abs(ball.body.velocity.x) === this.BALL_VELOCITY_SLOW){
                            var directionX = (ball.body.velocity.x * this.BALL_VELOCITY_FACTOR ) / this.BALL_VELOCITY;
                            var directionY = (ball.body.velocity.y * this.BALL_VELOCITY_FACTOR ) / this.BALL_VELOCITY;
                            ball.body.velocity.setTo(this.BALL_VELOCITY * directionX, this.BALL_VELOCITY * directionY);
                        }
                    }, this);
                    break;
                case "board-fast":
                    this.ballGroup.iterate('name', 'ball', 0, function(ball){
                        if( Math.abs(ball.body.velocity.x) === this.BALL_VELOCITY_FAST){
                            var directionX = (ball.body.velocity.x / this.BALL_VELOCITY_FACTOR ) / this.BALL_VELOCITY;
                            var directionY = (ball.body.velocity.y / this.BALL_VELOCITY_FACTOR ) / this.BALL_VELOCITY;
                            ball.body.velocity.setTo(this.BALL_VELOCITY * directionX, this.BALL_VELOCITY * directionY);
                            console.log(ball.body.velocity.x);
                        }
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
        ball.reset(this.BALL_X, this.BALL_Y );
        this.text_Ability.visible = false;
        this.game.time.events.add(2000, function(){ 
            ball.body.velocity.setTo(this.BALL_VELOCITY, -this.BALL_VELOCITY);
            this.resetToBaseGame();
        }, this);
        
    },
    shootLasers: function(){
        if(this.canShootLaser){
            var laserX = this.board.x;
            for(var i = 0; i < 2; i++){
                var laser = new Breakout.Laser(this.game, laserX , this.board.y - 20 , this.SPRITESHEET ,'laser');
                laser.scale.setTo(0.5);
                laser.body.velocity.setTo(0, -600);
                this.laserGroup.add(laser);
                laserX += this.board.width - 20;
            }
            this.laserTimer.add(500, this.shootLasers, this, null);
            this.sound_Laser.play();
        }
    },
    pauseGame: function(){
        this.text_Paused.visible =true;
        this.game.paused = true;
    },
    resumeGame: function(){
        this.game.paused = false;
        this.text_Paused.visible = this.game.paused;
    }
};