//help from kolysg and amytthompson on gitHub and kadi_231269 on the discussion forum
var BLOCK_WIDTH = 101;
var BLOCK_HEIGHT = 120;
var edge_x = 450;
var edge_y = 450;
var pos_x = 202;
var pos_y = 505 - BLOCK_HEIGHT;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 100;
    this.speed = Math.random() * 400 + 1;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, player) {
    if (this.x < edge_x) {
        this.x += this.speed * dt;
    } else {
        this.x = 0;
        this.x += this.speed * dt;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //this.collision(player);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = pos_x;
    this.y = pos_y;
    this.height = 78;
    this.width = 67;
    this.moveLeft = function() {
        this.x -= BLOCK_WIDTH;
    };
    this.moveRight = function() {
        this.x += BLOCK_WIDTH;
    };
    this.moveUp = function() {
        this.y -= 82.5;
    };
    this.moveDown = function() {
        this.y += 82.5;
    };
};
Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
    this.checkCollisions();
};

Player.prototype.reset = function() {
    this.x = pos_x;
    this.y = pos_y;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        /*add calculation to determine row*/
        if (this.x >= allEnemies[i].x + 0 &&
            this.x < allEnemies[i].x + 44 &&
            this.y >= allEnemies[i].y + 0 &&
            this.y < allEnemies[i].y + 44) {
            console.log('Splat!');
            this.y += 20;
            this.reset();

        }
    }
};

Player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
        case 'left':
            if (this.x > this.width) {
                this.moveLeft();
            }
            break;

        case 'up':
            if (this.y > BLOCK_HEIGHT) {
                console.log("up!");
                this.moveUp();
            } else if (this.y < BLOCK_HEIGHT * 0.5) {
                this.reset();
            }
            break;

        case 'right':
            if (this.x + BLOCK_WIDTH < ctx.canvas.width - this.width) {
                this.moveRight();
            }
            break;

        case 'down':
            if (this.y < 350) {
                this.moveDown();
            }
            if (this.y === 0) {
                this.reset();
            }
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(-100, 55);
var enemy2 = new Enemy(-100, 137.5);
var enemy3 = new Enemy(-100, 220);
var enemy4 = new Enemy(-100, 137.5);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];


var player = new Player(200, 450);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});