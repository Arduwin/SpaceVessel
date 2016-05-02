// if SpaceHipster exist, use it. If not use new Object
var SpaceHipster = SpaceHipster || {};

// ==================================== MAIN MENU function =============================
SpaceHipster.ShopMenu = function () {};

//var reg = {};

// show scrolling background and score
SpaceHipster.ShopMenu.prototype = {


    init: function () {

        //Load the plugin
        this.game.kineticScrolling = this.game.plugins.add(Phaser.Plugin.KineticScrolling);

        this.game.kineticScrolling.configure({
            kineticMovement: true,
            timeConstantScroll: 50, //really mimic iOS
            horizontalScroll: true,
            verticalScroll: false,
            horizontalWheel: true,
            verticalWheel: false,
            deltaWheel: 40
        });
    },
    create: function () {

        //Starts the plugin
        this.game.kineticScrolling.start();

        this.rectangles = [];

        var initX = 50;

        for (var i = 0; i < 10; i++) {
            //this.rectangles.push(this.createRectangle(initX, this.game.world.centerY - 100, 250, 200));
            var itemWidth = 100;
            var itemHeight = 100;
            var itemGap = 20;
            this.rectangles.push(this.createRectangle(initX, (this.game.height - (this.game.height * 0.5)), itemWidth, itemHeight));
            //this.rectangles.anchor.setTo(0.5, 0.5);

            //this.index = this.game.add.text(initX + 125, (this.game.height - (this.game.height * 0.5)), i + 1, {
            this.index = this.game.add.text(initX + (itemWidth / 2), (this.game.height - (this.game.height * 0.5)) + (itemHeight / 2), i + 1, {
                font: 'bold 20px Arial',
                fill: '#FF0000'
            });
            this.index.anchor.setTo(0.5, 0.5);
            //this.index.x = this.rectangles.x + (itemWidth / 2);
            //this.index.y = this.rectangles.y + (itemHeight / 2);
            if (i == 0) {
                initx = 0;
            }
            initX = initX + itemWidth + itemGap;
        }

        //Changing the world width
        this.game.world.setBounds(0, 0, 320 * this.rectangles.length, this.game.height);
    },
    createRectangle: function (x, y, w, h) {
        var sprite = this.game.add.graphics(x, y);
        sprite.beginFill(Phaser.Color.getRandomColor(100, 255), 1);
        sprite.bounds = new PIXI.Rectangle(0, 0, w, h);
        sprite.drawRect(0, 0, w, h);
        return sprite;
    }
};