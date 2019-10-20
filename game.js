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



var game = new Phaser.Game(config);

var player;
var lasers;

function preload () {
    this.load.image('star', '/tutorial-assets/star.png')
}

function create () {

    // Placeholder for player
    player = this.physics.add.image(150, 300, 'star');

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

// SHOOT on right arrow
    if (cursors.right.isDown) {
        shoot(player);
    }

    function shoot(origin) {
        var laser = this.lasers.get(player.x, player.y);
        if (laser) {
            laser.setActive(true);
            laser.setVisible(true);
            laser.body.velocity.x = 600;
        }
    }


// Movement Controls
    if (cursors.up.isDown) {
        player.setVelocityY(-300);
    }
    else if (cursors.down.isDown) {
        player.setVelocityY(300);
    }
    else {
        player.setVelocityY(0);
    }
}
