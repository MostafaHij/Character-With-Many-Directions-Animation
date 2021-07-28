/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const images = {};
images.player = new Image();
images.player.src = 'images/cuphead.png';

const characterAction = ['up', 'top right', 'right', 'down right', 'down'];
const numberOfCharacters = 20;
const characterArray = [];


class Character {
    constructor() {
        this.width = 1649 / 16;
        this.height = 905 / 8;
        this.frameX = 3; // start at frame 3 of axis x
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() * 3.5 + 2.5;
        this.action = characterAction[Math.floor(Math.random() * characterAction.length)];

        if (this.action === 'up') {
            this.frameY = 0;
            this.maxFrame = 15;
            this.minFrame = 3;
        } else if (this.action === 'right') {
            this.frameY = 3;
            this.maxFrame = 13;
            this.minFrame = 3;
        } else if (this.action === 'top right') {
            this.frameY = 1;
            this.maxFrame = 14;
            this.minFrame = 4;
        } else if (this.action === 'down') {
            this.frameY = 6;
            this.maxFrame = 11;
            this.minFrame = 0;
        } else if (this.action === 'down right') {
            this.frameY = 4;
            this.maxFrame = 15;
            this.minFrame = 4;
        }

    }

    draw() {

        // for frames
        if (this.frameX < this.maxFrame) {
            this.frameX++;
        } else {
            this.frameX = this.minFrame;
        }
        ctx.drawImage(images.player, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width * 0.7, this.height * 0.7)
    }

    update() {

        switch (this.action) { // check actions

            case 'up':
                if (this.y + this.height > 0) {
                    this.y -= this.speed;
                } else {
                    this.x = Math.random() * canvas.width;
                    this.y = canvas.height;
                }
                break;

            case 'right':
                if (this.x < canvas.width) {
                    this.x += this.speed;
                } else {
                    this.x = 0 - this.width;
                    this.y = Math.random() * canvas.height - this.height;
                }
                break;

            case 'down':
                if (this.y < canvas.height) {
                    this.y += this.speed;
                } else {
                    this.x = Math.random() * canvas.width;
                    this.y = 0 - this.height;
                }
                break;

            case 'down right':
                if (this.y < canvas.height && this.x < canvas.width) {
                    this.y += this.speed;
                    this.x += this.speed;
                } else {
                    this.x = Math.random() * canvas.width;
                    this.y = 0 - this.height;
                }
                break;

            case 'top right':
                if (this.y + this.height > 0 && this.x < canvas.width) {
                    this.y -= this.speed;
                    this.x += this.speed;
                } else {
                    this.x = Math.random() * canvas.width;
                    this.y = canvas.height;
                }
                break;


        }

    }
}


function init() {
    let i = 0;
    while (i < numberOfCharacters) {
        characterArray.push(new Character())
        i++;
    }
}
init();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < characterArray.length; i++) {
        characterArray[i].draw();
        characterArray[i].update();
    }
}

window.onload = setInterval(animate, 50);

window.addEventListener('resize', e => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});