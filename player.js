var player;
var playerSpeed = 500;


function playerCreate() {
    player = this.physics.add.image(150, 300, 'star');
    player.setCollideWorldBounds();
}
