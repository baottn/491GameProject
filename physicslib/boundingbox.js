class BoundingBox {
    constructor(x, y, width, height) {
        Object.assign(this, { x, y, width, height });
        this.left = x;
        this.top = y;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;

        //List of points by the order Top Left, Top Right, Bottom Right, Bottom Left
        let topLeft = {x: x, y: y};
        let topRight = {x: x + width, y: y};
        let bottomRight = {x: x + width, y: y + height};
        let bottomLeft = {x: x, y: y +  height};
        let top = new BoundingLine(topLeft.x, topLeft. y, topRight.x, topRight.y);
        let right = new BoundingLine(topRight.x, topRight. y, bottomRight.x, bottomRight.y);
        let bottom = new BoundingLine(bottomLeft.x, bottomLeft. y, bottomRight.x, bottomRight.y);
        let left = new BoundingLine(topLeft.x, topLeft. y, bottomLeft.x, bottomLeft.y);

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
            let tmp = this.lines[i].collideLine(line);
            if (tmp.length > 0){
                
                res.push(i);
            }
        }
        return res;
    }

    draw(ctx){
        this.lines.forEach(line => {
            line.draw(ctx);
        });
    }
};