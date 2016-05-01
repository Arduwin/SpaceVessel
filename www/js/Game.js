// if SpaceHipster exist, use it. If not use new Object
var SpaceHipster = SpaceHipster || {};

// ==================================== GAME function =============================
SpaceHipster.Game = function () {};


SpaceHipster.Game.prototype = {
    // Define init Method
    init: function (playerStats, shipStats) {
        this.playerStats = playerStats;
        this.shipStats = shipStats;
        this.playerStatsGame = this.playerStats; // set temporary Stats only for current Game
        this.shipStatsGame = this.shipStats; // set temporary Stats only for current Game
    },
    // Define create Method
    create: function () {
        //set world dimensions = Game Window Size
        this.game.world.setBounds(0, 0, 800, 800);
        //background = Game Window Background = Space
        this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
        //=================================== PLAYER =================================
        this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'playership');
        this.player.scale.setTo(0.4);
        this.playerScore = 0;
        this.playerLevelUp = true;
        this.game.physics.arcade.enable(this.player);
        this.player.anchor.setTo(0.5, 0.5);
        this.player.body.fixedRotation = true;
        this.player.body.setSize(50, 30, 0, 0); // needs to be set aufter game physics arcade mode
        this.player.body.collideWorldBounds = true;
        this.game.camera.follow(this.player);
        //===================================== ELEMENTS/OBJECTS ==================================
        this.generateCollectables();
        this.generateAsteriods();
        //===================================== SOUND ==================================
        this.explosionSound = this.game.add.audio('explosion');
        this.collectSound = this.game.add.audio('collect');
        //===================================== HUD ==================================
        // enter code for HUD
        //
    },
    // Define update Method
    update: function () {
        // check if player tabbed on screen
        if (this.game.input.activePointer.justPressed()) {
            //move on the direction of the input!!!
            this.player.rotation = this.game.physics.arcade.angleToPointer(this.player) + (Math.PI / 2);
            // rotate player to direction
            this.game.physics.arcade.moveToPointer(this.player, this.shipStatsGame.engineSpeed);
        }
        //check collision between player and asteroids = (player, collide sprite, function to call)
        this.game.physics.arcade.collide(this.player, this.asteroids, this.hitAsteroid, null, this);
        //self collide asteroids
        this.game.physics.arcade.collide(this.asteroids);
        //check overlapping between player and collectables = (player, overlap sprite, function to call)
        this.game.physics.arcade.overlap(this.player, this.collectables, this.collect, null, this);
    },
    // Define render Method
    render: function () {
        this.game.debug.text("Level: " + this.playerStats.level, 16, 16);
        this.game.debug.text("XP: " + this.playerStats.xp, 16, 32);
        this.game.debug.text("Armor: " + this.shipStatsGame.armor, 16, 48);
        this.game.debug.text("Credits: " + this.playerStats.credits, 16, 64);
        this.game.debug.text("Collected: " + this.playerScore + "/" + this.maxCollectables, 16, 80);
    },
    // Define generateCollectables Method
    generateCollectables: function () {
        this.collectables = this.game.add.group();
        //enable physics in them
        this.collectables.enableBody = true;
        this.collectables.physicsBodyType = Phaser.Physics.ARCADE;
        this.maxCollectables = 4;
        //this.maxscoreLabel.text = this.maxplayerScore;
        var collectable;
        //for (var i = 0; i < numCollectables; i++) {
        for (var i = 0; i < this.maxCollectables; i++) {
            //add sprite
            collectable = this.collectables.create(this.game.world.randomX, this.game.world.randomY, 'power');
            collectable.scale.setTo(0.5);
            this.game.physics.enable(collectable, Phaser.Physics.ARCADE);
            collectable.body.setSize(50, 30, 0, 0);
        }

    },
    // Define collect Method
    collect: function (player, collectable) {
        this.collectSound.play();
        this.playerScore++;
        this.playerStats.credits++;
        collectable.destroy();
        if (this.playerScore == this.maxCollectables) {
            this.playerStats.xp = this.playerStats.xp + 100;
        }
    },
    // Define generateAsteroids Method
    generateAsteriods: function () {
        this.asteroids = this.game.add.group();
        this.asteroids.enableBody = true;
        //var numAsteroids = this.game.rnd.integerInRange(10, 20);
        var numAsteroids = 15;
        var asteriod;
        for (var i = 0; i < numAsteroids; i++) {
            asteriod = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'rock');
            asteriod.scale.setTo(this.game.rnd.integerInRange(6, 10) / 10); // set size of asteroid((10,40)/10)
            asteriod.body.velocity.x = this.game.rnd.integerInRange(-25, 25);
            asteriod.body.velocity.y = this.game.rnd.integerInRange(-25, 25);
            asteriod.body.immovable = false; // direction is not changed when collide with player
            asteriod.body.collideWorldBounds = true; // asteroids cant move out of Game Window
            asteriod.anchor.setTo(0.5, 0.5);
            asteriod.body.angularVelocity = this.game.rnd.integerInRange(-40, 40); //add rotation effect
        }
        this.asteroids.setAll('body.collideWorldBounds', true);
        this.asteroids.setAll('body.bounce.x', 1.0);
        this.asteroids.setAll('body.bounce.y', 1.0);
    },
    // Define hitAsteroids Method
    hitAsteroid: function (player, asteroid) {
        // if player is not in GOD Mode
        if (!player.invincible) {
            //We only damage the player if not invincible      
            this.shipStatsGame.armor--;
            //we toggle invincibility
            // Player is in GOD Mode now
            this.toggleInvincible();
            //and then we add a timer to restore the player to a vulnerable state
            // Leave GOD Mode after 1000ms
            this.game.time.events.add(1000, this.toggleInvincible, this);

            // GAME OVER
            if (this.shipStatsGame.armor <= 0) {
                this.shipStatsGame.armor = 0;
                this.explosionSound.play();
                //make the player explode = add particle effect
                var emitter = this.game.add.emitter(this.player.x, this.player.y, 100);
                emitter.makeParticles('playerParticle');
                emitter.minParticleSpeed.setTo(-200, -200);
                emitter.maxParticleSpeed.setTo(200, 200);
                emitter.gravity = 0;
                emitter.start(true, 1500, null, 20); // true= single explosion, duration, repeating emission = null, particles 
                this.player.kill();
                this.game.time.events.add(1500, this.gameOver, this);
                this.saveGameData(); // save player Stats to local storage
            }
        }
    },
    // Define toggleInvincible Method
    toggleInvincible: function () {
        this.player.invincible = !this.player.invincible;

    },
    // Define gameOver Method
    gameOver: function () {
        //pass it the score as a parameter = start(call State, clearWorld, clearCache, parameters past to init function)
        this.game.state.start('MissionMenu', true, false, this.playerStats, this.shipStats);
    },
    // Define saveGameData Method
    saveGameData: function () {
        //Save Data
        localStorage.setItem("playerStatsObj", JSON.stringify(this.playerStats));
        localStorage.setItem("shipStatsObj", JSON.stringify(this.shipStats));
    }

};