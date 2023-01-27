class BoundingCircle {
    constructor(centerX, centerY, radius) {
        this.radius = radius;
        this.center = { x: centerX, y: centerY };
    };
    
    /**
     * Returns distance from two points
     * @param {Number} p1, p2 Two objects with x and y coordinates
     * @returns Distance between the two points
     */
    distance = (p1, p2) => {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    };
    //Return true or false
    collideCircle(otherCircle) {
        return this.distance(this.center, otherCircle.center) < this.radius + otherCircle.radius;
    };

    //Draw when debugging
    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = "Red";
        ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.closePath();
    };
};