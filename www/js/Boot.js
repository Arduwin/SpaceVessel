// if SpaceHipster exist, use it. If not use new Object
var SpaceHipster = SpaceHipster || {};

// ==================================== BOOT function =============================
SpaceHipster.Boot = function () {};

//loading the assets for the loading screen and set game configuration 
SpaceHipster.Boot.prototype = {
    // Load assets for loading screen (assets need to be loaded in the state before using)
    preload: function () {
        //assets we'll use in the loading screen
        this.load.image('logo', 'asset/images/logo.png'); // logo
        this.load.image('preloadbar', 'asset/images/preloader-bar.png'); //preload bar
    },
    // 
    create: function () {
        //loading screen will have a white background
        this.game.stage.backgroundColor = '#000000'; //black

        //scaling options
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.scale.minWidth = 240;
        this.scale.minHeight = 170;
        this.scale.maxWidth = 2880;
        this.scale.maxHeight = 1920;

        //have the game centered horizontally
        this.scale.pageAlignHorizontally = true;

        //screen size will be set automatically
        // DEPRECATED this.scale.setScreenSize(true);

        //physics system for movement
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //Launch Preload State
        this.state.start('Preload');
    }
};