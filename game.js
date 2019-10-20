var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
        maxSize: 80
    });


    // Keyboard Controls
    cursors = this.input.keyboard.createCursorKeys();
}

function update () {

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
