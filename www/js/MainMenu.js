// if SpaceHipster exist, use it. If not use new Object
var SpaceHipster = SpaceHipster || {};

// ==================================== MAIN MENU function =============================
SpaceHipster.MainMenu = function () {};

// show scrolling background and score
SpaceHipster.MainMenu.prototype = {

    // Init function
    init: function () {
        this.loadGameData();
    },
    // Create function
    create: function () {
        //show the space tile, repeated all over == tileSrpite !!!
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
        this.btnStart = this.game.add.button(this.game.width / 2, (this.game.height - (this.game.height * 0.75)), 'button', this.gameOnClick, this, 2, 1, 0);
        this.btnStart.anchor.set(0.5);
        //this.btnShop = this.game.add.button(this.game.width / 2, (this.game.height - (this.game.height * 0.6)), 'button', this.shopOnClick, this, 2, 1, 0);
        //this.btnShop.anchor.set(0.5);
        //this.btnExit = this.game.add.button(this.game.world.centerX - 95, 220, 'button', this.shopOnClick, this, 2, 1, 0);

        var stlButton = {
            font: "32px Arial",
            fill: "#ff0044",
            wordWrap: true,
            wordWrapWidth: this.btnStart.width,
            align: "center",
            //backgroundColor: "#ffff00"
        };
        // Start Button Text
        this.txtStart = this.game.add.text(0, 0, "Play", stlButton);
        this.txtStart.anchor.set(0.5);
        this.txtStart.x = this.btnStart.x; //+ this.btnStart.width / 2;
        this.txtStart.y = this.btnStart.y; //+ this.btnStart.height / 2;
        // Credit Button Text
        //this.txtShop = this.game.add.text(0, 0, "Shop", stlButton);
        //this.txtShop.anchor.set(0.5);
        //this.txtShop.x = this.btnShop.x; //+ this.btnShop.width / 2;
        //this.txtShop.y = this.btnShop.y; //+ this.btnShop.height / 2;

        this.background.autoScroll(-20, 0);

        var stlMenuStats = {
            font: "20px Arial",
            fill: "#fff",
            align: "center"
        };
        //show player level
        this.strLevel = "Level: " + this.playerStats.level;
        var txtLevel = this.game.add.text(this.game.width / 2, (this.game.height - (this.game.height * 0.4)), this.strLevel, stlMenuStats);
        txtLevel.anchor.set(0.5);

        //show credits
        this.strCredits = "Credits: " + this.playerStats.credits + " $";
        var txtCredits = this.game.add.text(this.game.width / 2, (this.game.height - (this.game.height * 0.3)), this.strCredits, stlMenuStats);
        txtCredits.anchor.set(0.5);
    },
    // this is checked 60 times per second!!! = update function
    update: function () {
        // event handler, waiting for screen tap to start GAME state
        //if (this.game.input.activePointer.justPressed()) {
        //    this.game.state.start('Game');
        //}
    },
    gameOnClick: function () {
        // Enter Game and give Stats to Game State
        //this.game.state.start('Game', true, false, this.playerStats, this.shipStats);
        this.game.state.start('MissionMenu', true, false, this.playerStats, this.shipStats);
    },
    loadGameData: function () {
        // Clear Database
        //localStorage.clear();

        if (localStorage.getItem("playerStatsObj") === null) {
            //New Game Values
            this.playerStats = {
                level: 1,
                xp: 0,
                credits: 0
            };
        } else {
            this.playerStats = JSON.parse(localStorage.getItem('playerStatsObj'));
        }

        if (localStorage.getItem("shipStatsObj") === null) {
            //New Game Values
            this.shipStats = {
                armor: 1,
                shield: 0,
                engineSpeed: 100,
                gunPower1: 0,
                gunPower2: 0
            };
        } else {
            this.shipStats = JSON.parse(localStorage.getItem('shipStatsObj'));
        }
    }

};