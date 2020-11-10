class Paper {
    constructor(x, y) {
      var options = {
        isStatic:false,
        restitution:0.3,
        friction:0.5,
        density:1.2
      }
      this.body = Bodies.circle(x, y, 20, options);
      this.width = 45;
      this.height = 45;
      this.image = loadImage("paper.png");

      World.add(world, this.body);
    }

    display() {
      var angle = this.body.angle;
      push();
      translate(this.body.position.x, this.body.position.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.image, 0, 0, this.width, this.height);
      pop();
    }
};