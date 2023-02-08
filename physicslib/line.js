class BoundingLine {
    constructor(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
        this.intRadius = 3;

        this.points = [];
        this.length = 0;
        this.addEndPoints(x1, y1, x2, y2);
    };

    addEndPoints(x1, y1, x2, y2) {
        this.points = [];
        this.points.push({ x: x1, y: y1 },
            { x: x2, y: y2 },
        );

        this.length = Math.sqrt((this.points[0].x - this.points[1].x) ** 2 + (this.points[0].y - this.points[1].y) ** 2);
    }

    slope() {
        var slope;

        if (this.points[1].x !== this.points[0].x)
            slope = (this.points[1].y - this.points[0].y) / (this.points[1].x - this.points[0].x);
        else
            slope = false;

        return slope;
    };

    yInt() {
        if (this.points[0].x === this.points[1].x) return this.points[0].x === 0 ? 0 : false;
        if (this.points[0].y === this.points[1].y) return this.points[0].y;


        return this.points[0].y - this.slope() * this.points[0].x;
    };

    xInt() {
        if (this.points[0].y === this.points[1].y) return this.points[0].y === 0 ? 0 : false;
        if (this.points[0].x === this.points[1].x) return this.points[0].x;
        return (-1 * this.yInt()) / this.slope();
    };

    onSegmentX(x) {
        return (this.points[0].x <= x && x <= this.points[1].x) ||
            (this.points[0].x >= x && x >= this.points[1].x);
    };

    onSegmentY(y) {
        return (this.points[0].y <= y && y <= this.points[1].y) ||
            (this.points[0].y >= y && y >= this.points[1].y);
    };

    collideLine(otherLine) {
        //if (!otherLine.slope()) return { x: otherLine.points[1].x, y: this.slope() * otherLine.points[1].x + this.yInt() };
        // //Both are vertical
        // if (!this.slope() && !otherLine.slope()){
        //     if (otherLine.onSegmentY(this.y) && otherLine.onSegmentX(this.x)){
        //         return {x: this.x, y: this.y};
        //     }
        // }
        if (this.slope() === otherLine.slope()) return false;

        var intersect = {};
        intersect.x = (otherLine.yInt() - this.yInt()) / (this.slope() - otherLine.slope());
        intersect.y = this.slope() * intersect.x + this.yInt();
        if (this.collidePoint(intersect.x, intersect.y)
            && otherLine.collidePoint(intersect.x, intersect.y))
            return intersect;
        else
            return false;
    };

    /**
     * Collision check for line segment (Limit by two end points) with a point
     * @param {*} x the x coordinate of the point we are checking
     * @param {*} y the y coordinate of the point we are checking
     * @return true if the point intersects the line segment, false otherwise
     */
    collidePoint = (x, y) => {
        //x or y is undefined
        if (!x || !y) {
            return false;
        }
        //
        let lowY = Math.min(this.points[0].y, this.points[1].y);
        let highY = Math.max(this.points[0].y, this.points[1].y);
        let lowX = Math.min(this.points[0].x, this.points[1].x);
        let highX = Math.max(this.points[0].x, this.points[1].x);
        if (y >= lowY && y <= highY && x >= lowX && x <= highX) {
            return true;
        }
        else return false;
    }

    collideCircle(circle) {
        //Vertical line situation (Line with formula as x = -yInt)
        if (this.slope >= 999) {//There might be some calculation error causing a vertical line to have a big number for slope
            let x = circle.center.x;
            if (this.points[1].x >= circle.center.x - circle.radius && this.points[1].x <= circle.center.x + circle.radius) {
                let xRes = this.points[1].x;
                let yRes = Math.sqrt(circle.radius ** 2 - (xRes - x) ** 2) + circle.center.y;//(radius^2 -(x - this.center.x)^2)
                if (this.collidePoint(xRes, yRes))
                    return [{ xRes, yRes }];
                else
                    return [];
            }

        }

        var a = 1 + this.slope() * this.slope();
        var b = 2 * (this.slope() * (this.yInt() - circle.center.y) - circle.center.x);
        var c = circle.center.x * circle.center.x + (this.yInt() - circle.center.y) * (this.yInt() - circle.center.y) - circle.radius * circle.radius;

        var d = b * b - 4 * a * c;
        //console.log("Slope: " + this.slope + " " + this.yInt + " " + a + " " + b + " " + c + " " + d);
        if (d === 0) {
            //Return a point
            let xRes = (-b + Math.sqrt(d)) / (2 * a);
            let yRes = xRes * this.slope() + this.yInt();

            if (this.collidePoint(xRes, yRes))
                return [{ xRes, yRes }];
            else
                return [];

        } else if (d > 0) {
            let res = [];
            let xRes = (-b - Math.sqrt(d)) / (2 * a);
            let yRes = xRes * this.slope() + this.yInt();

            if (this.collidePoint(xRes, yRes))
                res.push({ xRes, yRes });

            xRes = (-b + Math.sqrt(d)) / (2 * a);
            yRes = xRes * this.slope() + this.yInt();

            if (this.collidePoint(xRes, yRes))
                res.push({ xRes, yRes });

            return res;

        }

        return [];
    };


    collide(other) {
        if (other instanceof BoundingLine) {
            return [this.collideLine(other)];
        }
        
        if (other instanceof BoundingCircle) {
            return this.collideCircle(other);
        }

        //Invalid check
        return null;
    }

    drawLine(ctx, xStart, yStart, xEnd, yEnd, fillStyle = "green", strokeStyle = "green") {
        ctx.fillStyle = fillStyle;
        ctx.strokeStyle = strokeStyle;

        ctx.beginPath();
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yEnd);

        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    //Draw for debugging purposes
    draw(ctx) {
        this.drawLine(ctx, this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y);
    }
}