class BoundingBox {
    constructor(x, y, width, height) {
        Object.assign(this, { x, y, width, height });
        this.left = x;
        this.top = y;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;

        //List of points by the order Top Left, Top Right, Bottom Right, Bottom Left
        this.topLeft = {x: x, y: y};
        this.topRight = {x: x + width, y: y};
        this.bottomRight = {x: x + width, y: y + height};
        this.bottomLeft = {x: x, y: y +  height};
        let top = new BoundingLine(this.topLeft.x, this.topLeft. y, this.topRight.x, this.topRight.y);
        let right = new BoundingLine(this.topRight.x, this.topRight. y, this.bottomRight.x, this.bottomRight.y);
        let bottom = new BoundingLine(this.bottomLeft.x, this.bottomLeft. y, this.bottomRight.x, this.bottomRight.y);
        let left = new BoundingLine(this.topLeft.x, this.topLeft. y, this.bottomLeft.x, this.bottomLeft.y);

        this.lines = [top, right, bottom, left];
        
    };

    collideBox(oth) {
        if (this.right >= oth.left && this.left <= oth.right && this.top <= oth.bottom && this.bottom >= oth.top){
            return true;
        }
        return false;
    };

    collideCircle(circle){
        let res = [];
        for (let i = 0 ; i < this.lines.length;i++){
            let tmp = this.lines[i].collideCircle(circle);
            
            if (tmp.length > 0){
                res.push(i);
            }
        }
        return res;
    }

    /**
     * Check to see whether the box collide with a line
     * @param {*} line The line we are checking
     * @return Return a list to see which edges the line collide with; 
     *          It's empty if the line does not collide with the box, 0 for top, 1 for right, 2 for bottom, 3 for left
     */
    collideLine(line){
        let res = [];
        for (let i = 0 ; i < this.lines.length;i++){
            let tmp = line.collideLine(this.lines[i]);
            
            if (tmp){    
                res.push(i);
            }
        }
        return res;
    }
    /**
     * Checking whether a point is within the box
     * @param {*} x x coordinate of the point
     * @param {*} y y coordinate of the point
     */
    isWithin(x ,y){
        return (this.left <= x && this.right >= x)
            && (this.top <= y && this.bottom >= y);
    }

    draw(ctx, game){
        this.lines.forEach(line => {
            line.draw(ctx, game);
        });

        ctx.closePath();
    }
};