let width = $('#game').width();
let height = $('#game').height();

const phaserMethods = { preload: preload, create: create, update: update };
const game = new Phaser.Game(width, height, Phaser.AUTO, 'game', phaserMethods);


function preload() { // assets
  game.load.image('sky', 'img/sprites/sky.png');
  game.load.image('ground', 'img/sprites/platform.png');
  game.load.image('star', 'img/sprites/star.png');
  game.load.spritesheet('dude', 'img/sprites/dude.png', 32, 48);
}

// instance vars
let sky, platforms, ground, ledge, player, cursors;

function create() { // create game structure
  game.physics.startSystem(Phaser.Physics.ARCADE); // set physics

  sky = game.add.tileSprite(0, 0, width, height, 'sky'); // background
  platforms = game.add.group(); // can walk on
  platforms.enableBody = true;
  ground = platforms.create(0, game.world.height - 64, 'ground'); // ground
  ground.scale.setTo(4, 4);
  ground.body.immovable = true;

  ledge = platforms.create(400, 400, 'ground'); // ledges
  ledge.body.immovable = true;
  ledge = platforms.create(-150, 250, 'ground');
  ledge.body.immovable = true;

  player = game.add.sprite(380, game.world.height - 120, 'dude'); // character

  game.physics.arcade.enable(player);
  game.camera.follow(player);

  player.body.bounce.y = 0.1;
  player.body.gravity.y = 350;
  player.body.collideWorldBounds = true;

  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);

  cursors = game.input.keyboard.createCursorKeys(); // key listeners
}

function update() {
  // collide player w/ ground
  let hitPlatform = game.physics.arcade.collide(player, platforms);

  // reset player velocity
  player.body.velocity.x = 0;

  // KEY LISTENERS
  if (!window.paneFocus) {
    if (cursors.left.isDown) { // left
      player.body.velocity.x = -150;
      player.animations.play('left');
    } else if (cursors.right.isDown) { // right
      player.body.velocity.x = 150;
      player.animations.play('right');
    } else { // still
      player.animations.stop();
      player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down && hitPlatform) { // can jump if on ground
      player.body.velocity.y = -350;
    }
  }

}