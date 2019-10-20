const canvasWidth = 800;
const canvasHeight = 600;

var config = {
    type: Phaser.AUTO,
    width: canvasWidth,
    height: canvasHeight,
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

let game = new Phaser.Game(config);

// Game Variables
var player;
var playerSpeed = 500;
var lasers;
var laserSpeed = 900;
var lastFired = false;



function preload () {
    this.load.image('star', '/tutorial-assets/star.png');
}




function create () {

    // Placeholder for player
    player = this.physics.add.image(150, 300, 'star');
    player.setCollideWorldBounds();

    // Group to hold lasers
    lasers = this.physics.add.group({
        defaultKey: 'star',
        maxSize: 10
    });


    // Keyboard Controls
    cursors = this.input.keyboard.createCursorKeys();
}



function update () {

// Check if a laser is out of bounds to re-use it
    lasers.children.each(function(l) {
        if (l.active) {
            if (l.x > canvasWidth) {
                l.setActive(false);
            }
        }
    });

// Single fire on right arrow
    if (cursors.right.isDown && !lastFired) {
        lastFired = true;
        shoot(player);
    } else if (cursors.right.isUp && lastFired) {
        lastFired = false;
    }

    function shoot(origin) {
        var laser = this.lasers.get(player.x, player.y);
        if (laser) {
            laser.setActive(true);
            laser.setVisible(true);
            laser.body.velocity.x = laserSpeed;
        }
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
}



function render() {
    game.debug.text('Cosmic Glue - PROTOTYPE', 10, 30);
}
