// if SpaceHipster exist, use it. If not use new Object
var SpaceHipster = SpaceHipster || {};

//Initiate new game. Set size of window. Auto = use WebGL or CANVAS - system choice
//SpaceHipster.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');
SpaceHipster.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'gameDiv');
//SpaceHipster.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, '');gameDiv
//SpaceHipster.game = new Phaser.Game(800, 600, Phaser.CANVAS, 'SpaceHipster', {
//    preload: preload,
//    create: create,
//    update: update,
//    render: render
//});

//Register the states of the Game
SpaceHipster.game.state.add('Boot', SpaceHipster.Boot);
SpaceHipster.game.state.add('Preload', SpaceHipster.Preload);
SpaceHipster.game.state.add('MainMenu', SpaceHipster.MainMenu);
SpaceHipster.game.state.add('MissionMenu', SpaceHipster.MissionMenu);
SpaceHipster.game.state.add('ShopMenu', SpaceHipster.ShopMenu);
SpaceHipster.game.state.add('Game', SpaceHipster.Game);

//Launch Boot State
SpaceHipster.game.state.start('Boot');