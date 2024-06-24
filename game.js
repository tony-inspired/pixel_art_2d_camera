import { Map } from "./map.js";
import { Camera } from "./camera.js"

const GAME_WIDTH = 512;
const GAME_HEIGHT = 512;

class Game {
    constructor(){
        this.map = new Map();
        this.camera = new Camera(this.map, GAME_WIDTH, GAME_HEIGHT);

        this.keys = [];

        window.addEventListener('keydown', e => {

            console.log('keydown');

            if (this.keys.indexOf(e.key) == -1){
                this.keys.unshift(e.key);
            }
            console.log(e.key);
            console.log(this.keys);
        });

        window.addEventListener('keyup', e => {
            
            const index = this.keys.indexOf(e.key);

            if (index > -1){
                this.keys.splice(index, 1);
            }

            console.log('keyup');

            console.log(e.key);
            console.log(this.keys);
        });
    }

    update(deltaTime){
        let speedX = 0;
        let speedY = 0;

        if (this.keys[0] === 'ArrowLeft') speedX = -1;
        else if (this.keys[0] === 'ArrowRight') speedX = 1;
        else if (this.keys[0] === 'ArrowUp') speedY = -1;
        else if (this.keys[0] === 'ArrowDown') speedY = 1;

        this.camera.move(deltaTime, speedX, speedY);
    }

    render(ctx){

        for (let row = 0; row <= this.map.rows; row++){
            for (let col = 0; col <= this.map.rows; col++){

                const tile = 18;

                ctx.drawImage(
                    this.map.image,
                    2 * this.map.image_tile,
                    2 * this.map.image_tile,
                    this.map.image_tile,
                    this.map.image_tile,
                    col * this.map.tileSize,
                    row * this.map.tileSize,
                    this.map.tileSize,
                    this.map.tileSize
                );

/*
                ctx.drawImage(
                    this.map.image,
                    (tile - 1) * this.map.image_tile % this.map.image.width, //sx, sy, sw, sh (first 4) - an area we want to crop ou from that image
                    Math.floor((tile - 1) / this.map.image_cols) * this.map.image_tile,
                    this.map.image_tile,
                    this.map.image_tile,
                    col * this.map.tileSize,
                    row * this.map.tileSize,
                    this.map.tileSize,
                    this.map.tileSize
                );
*/
                ctx.strokeRect(
                    col * this.map.tileSize,
                    row * this.map.tileSize,
                    this.map.tileSize,
                    this.map.tileSize
                )
            }
        }
    }
}

window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    const game = new Game();
    
    let lastTime = 0;

    function animate(timeStamp){

        //video 23:20
        const deltaTime = (timeStamp - lastTime) / 1000;
        console.log(deltaTime);
        lastTime = timeStamp;

        console.log(deltaTime);
        game.update(deltaTime);
        game.render(ctx);
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
})