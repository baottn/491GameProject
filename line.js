class Line {
    // constructor(game) {
    //     this.game = game;
    //     this.intRadius = 3;

    //     this.points = [];
    //     this.length = 0;
    // };

    constructor(game, x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
        this.game = game;
        this.intRadius = 3;

        this.points = [];
        this.length = 0;
        this.addEndPoints(x1, y1, x2, y2);
    };

    addEndPoints(x1, y1, x2, y2){
        this.points = [];
        this.points.push({x: x1, y: y1},
            {x: x2, y: y2},
        );

        this.length = Math.sqrt((this.points[0].x - this.points[1].x) ** 2 + (this.points[0].y - this.points[1].y) ** 2);
    }

    slope() {
        var slope;

        if (this.points[1].x !== this.points[0].x )
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
        return (-1 * this.yInt())/ this.slope();
    };

    onSegmentX(x) {
        return (this.points[0].x <= x && x <= this.points[1].x) ||
            (this.points[0].x >= x && x >= this.points[1].x);
    };

    onSegmentY(y) {
        return (this.points[0].y <= y && y <= this.points[1].y)||
        (this.points[0].y >= y && y >= this.points[1].y);
    };

    collide(other) {
        if (this.slope() === other.slope()) return false;
        if(!other.slope()) return {x: other.points[1].x, y: this.slope() * other.points[1].x + this.yInt()};

        var intersect = {};
        intersect.x = (other.yInt() - this.yInt()) / (this.slope() - other.slope());
        intersect.y = this.slope() * intersect.x + this.yInt();
       
        return intersect;
    };
}