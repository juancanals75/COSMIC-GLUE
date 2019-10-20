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
var junkGroup;
var junkDisplay;
var junkSpeed = 300;



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

    // Group for the space junk
    junkGroup = this.physics.add.group();

    var junkDisplay = setInterval(junkShow, 1500);
    function junkShow() {
        var randomY = Phaser.Math.Between(0, canvasHeight);
        var junk = junkGroup.create(canvasWidth, randomY, 'star')
        junk.body.velocity.x = -junkSpeed;
    }


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
    if (cursors.space.isDown && !lastFired) {
        lastFired = true;
        shoot(player);
    } else if (cursors.space.isUp && lastFired) {
        lastFired = false;
    }

    function shoot(origin) {
        var laser = this.lasers.get(origin.x, origin.y);
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
