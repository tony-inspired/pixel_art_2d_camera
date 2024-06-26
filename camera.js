export class Camera {
    constructor(map, width, height){
        this.map = map;
        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = 0;
        this.maxX = map.cols * map.displayTileSize - this.width;
        this.maxY = map.rows * map.displayTileSize - this.height;
        this.speed = 500; //pixels per seconds
    }

    move(deltaTime, speedX, speedY){
        this.x += speedX * this.speed * deltaTime;
        this.y += speedY * this.speed * deltaTime;

        this.x = Math.max(0, Math.min(this.x, this.maxX));
        this.y = Math.max(0, Math.min(this.y, this.maxY));
    }
}