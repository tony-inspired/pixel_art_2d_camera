export class Camera {
    constructor(map, width, height){
        this.map = map;
        this.width = width;
        this.height = height;
        this.x = 128;
        this.y = 128;
        this.maxX = map.cols * map.tileSize - this.width;
        this.maxY = map.rows * map.tileSize - this.height;
        this.speed = 500; //pixels per seconds
    }

    move(deltaTime, speedX, speedY){
        this.x += speedX * this.speed * deltaTime;
        this.y += speedY * this.speed * deltaTime;

        this.x = Math.max(0, Math.min(this.x, this.maxX));
        this.y = Math.max(0, Math.min(this.y, this.maxY));
    }
}