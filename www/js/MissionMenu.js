// if SpaceHipster exist, use it. If not use new Object
var SpaceHipster = SpaceHipster || {};

// ==================================== MAIN MENU function =============================
SpaceHipster.MissionMenu = function () {};

// show scrolling background and score
SpaceHipster.MissionMenu.prototype = {

    // Init function
    init: function (playerStats, shipStats) {
        this.playerStats = playerStats;
        this.shipStats = shipStats;
        this.playerStatsGame = this.playerStats; // set temporary Stats only for current Game
        this.shipStatsGame = this.shipStats; // set temporary Stats only for current Game
    },
    // Create function
    create: function () {
        //show the space tile, repeated all over == tileSrpite !!!
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');

        this.btnMission = this.game.add.button(this.game.width / 2, (this.game.height - (this.game.height * 0.75)), 'button', this.missionOnClick, this, 2, 1, 0);
        this.btnMission.anchor.set(0.5);

        this.btnShop = this.game.add.button(this.game.width / 2, (this.game.height - (this.game.height * 0.6)), 'button', this.shopOnClick, this, 2, 1, 0);
        this.btnShop.anchor.set(0.5);
        //this.btnExit = this.game.add.button(this.game.world.centerX - 95, 220, 'button', this.shopOnClick, this, 2, 1, 0);

        var stlButton = {
            font: "32px Arial",
            fill: "#ff0044",
            wordWrap: true,
            wordWrapWidth: this.btnMission.width,
            align: "center",
            //backgroundColor: "#ffff00"
        };
        // Start Button Text
        this.txtMission = this.game.add.text(0, 0, "Mission", stlButton);
        this.txtMission.anchor.set(0.5);
        this.txtMission.x = this.btnMission.x; //+ this.btnStart.width / 2;
        this.txtMission.y = this.btnMission.y; //+ this.btnStart.height / 2;
        // Credit Button Text
        this.txtShop = this.game.add.text(0, 0, "Shop", stlButton);
        this.txtShop.anchor.set(0.5);
        this.txtShop.x = this.btnShop.x; //+ this.btnShop.width / 2;
        this.txtShop.y = this.btnShop.y; //+ this.btnShop.height / 2;

        this.background.autoScroll(-20, 0);

        var stlMenuStats = {
            font: "20px Arial",
            fill: "#fff",
            align: "center"
        };

    },
    // this is checked 60 times per second!!! = update function
    update: function () {
        // event handler, waiting for screen tap to start GAME state
        //if (this.game.input.activePointer.justPressed()) {
        //    this.game.state.start('Game');
        //}
    },
    missionOnClick: function () {
        // Enter Game and give Stats to Game State
        this.game.state.start('Game', true, false, this.playerStats, this.shipStats);
    },
    shopOnClick: function () {
        this.game.state.start('ShopMenu', true, false);
    },


};