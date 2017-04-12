let width = $('#game').width();
let height = $('#game').height();

const phaserMethods = { preload: preload, create: create, update: update };
const game = new Phaser.Game(width, height, Phaser.AUTO, 'game', phaserMethods);

function preload() {
  game.load.image('sky', 'img/sprites/sky.png');
  game.load.image('ground', 'img/sprites/platform.png');
  game.load.image('star', 'img/sprites/star.png');
  game.load.spritesheet('dude', 'img/sprites/dude.png', 32, 48);
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE); // set physics

  let sky = game.add.tileSprite(0, 0, width, height, 'sky'); // background
  let platforms = game.add.group(); // platforms
  let ground = platforms.create(0, game.world.height - 64, 'ground');
  let player = game.add.sprite(380, game.world.height - 110, 'dude'); // character

  platforms.enableBody = true;
  ground.scale.setTo(2, 2);
  ground.body.immovable = true;
  game.physics.arcade.enable(player);
  game.camera.follow(player);
}

function update() {}