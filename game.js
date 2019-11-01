const canvasWidth = 800;
const canvasHeight = 600;

const config = {
    type: Phaser.AUTO,
    width: canvasWidth,
    height: canvasHeight,
    backgroundColor: 0x333333,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

// Game Variables
var player;
var playerSpeed = 500;
var lasers;
var laserSpeed = 900;
var lastFired = false;
var junkGroup;
var junkDisplay;
var junkSpeed = 300;
var paused = false;
var debugText = '';



function preload () {
    this.load.image('star', '/tutorial-assets/star.png');
}




function create () {

    player = this.physics.add.image(150, 300, 'star');
    player.setCollideWorldBounds();


    // Group to hold lasers
    lasers = this.physics.add.group({
        defaultKey: 'star'
    });

    // Group for the space junk
    junkGroup = this.physics.add.group({
        maxSize: 4
    });

    if (junkGroup.countActive() < 5) {
      var junkDisplay = setInterval(junkShow, 1500);
      function junkShow() {
        var randomY = Phaser.Math.Between(0, canvasHeight);
        junkGroup.create(canvasWidth, randomY, 'star').setVelocity(-junkSpeed, 0);
      }
    }

    // Colliders
    this.physics.add.collider(lasers, junkGroup, junkDestroy, null, this);
    this.physics.add.collider(player, junkGroup, playerKill, null, this);

    // Keyboard Controls
    cursors = this.input.keyboard.createCursorKeys();

    // Debug text
    debugText = this.add.text(20, 20, "DEBUG TEXT")
}



function update () {

    // Checks to remove junk out of BOUNDS
    junkGroup.children.each(junk => {
      if (junk.x < 0) {
        junk.destroy();
      }
    })

    // Check if a laser is out of bounds to re-use it
    lasers.children.each(laser => {
        if (laser) {
            if (laser.x > canvasWidth) {
                laser.destroy();
            }
        }
    });

    if (cursors.shift.isDown && !paused) {
        this.physics.pause();
        paused = true;
    } else if (cursors.shift.isDown && paused) {
        this.physics.resume();
        paused = false;
    }

    // Single fire on right arrow
    if (cursors.space.isDown && !lastFired) {
        lastFired = true;
        lasers.create(player.x, player.y, 'star').setVelocityX(laserSpeed)
        // shoot();
    } else if (cursors.space.isUp && lastFired) {
        lastFired = false;
    }


    // Movement Controls
    if (cursors.up.isDown) {
        player.setVelocityY(-playerSpeed);
    }
    else if (cursors.down.isDown) {
        player.setVelocityY(playerSpeed);
    }
    else {
        player.setVelocityY(0);
    }

    // D-EBUG TEXT
    debugText.setText([
      'Lasers: ' + lasers.countActive(),
      'Junk: ' + junkGroup.countActive(),
      'Paused: ' + `${paused}`
    ])
}


function playerKill(player, junk) {
    this.physics.pause();
    player.setTint(0xff0000);
}

function junkDestroy(laser, junk) {
    laser.destroy();
    junk.destroy();
}
