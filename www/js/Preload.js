// if SpaceHipster exist, use it. If not use new Object
var SpaceHipster = SpaceHipster || {};

// ==================================== PRELOAD function =============================
SpaceHipster.Preload = function () {};

//loading the game assets for next state (=Game State)
SpaceHipster.Preload.prototype = {
    // show loading screen and load assets for Game State
    preload: function () {
        //show loading screen
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.splash.anchor.setTo(0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        //load game assets
        this.load.image('space', 'asset/images/new/darkPurple.png');
        this.load.image('rock', 'asset/images/new/meteorGrey_big1.png');
        //this.load.spritesheet('playership', 'asset/images/new/playerShip3_orange.png');
        //this.load.spritesheet('power', 'asset/images/new/star_bronze.png');
        //this.load.spritesheet('power5', 'asset/images/new/star_silver.png');
        //this.load.spritesheet('power10', 'asset/images/new/star_gold.png');
        this.load.image('playership', 'asset/images/new/playerShip3_orange.png');
        this.load.image('power', 'asset/images/new/star_bronze.png');
        this.load.image('power5', 'asset/images/new/star_silver.png');
        this.load.image('power10', 'asset/images/new/star_gold.png');
        this.load.image('playerParticle', 'asset/images/player-particle.png');
        this.load.image('button', 'asset/images/button.png');
        this.load.audio('collect', 'asset/audio/collect.ogg');
        this.load.audio('explosion', 'asset/audio/explosion.ogg');
    },
    create: function () {
        this.state.start('MainMenu');
    }
};