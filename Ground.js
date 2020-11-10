class Ground {
    constructor(x, y) {
      this.body = Bodies.rectangle(x, y, 800,20, {isStatic:true});
      World.add(world, this.body);

      this.width = 800;
      this.height = 20;
    }

    display() {
      rectMode(CENTER);
      stroke("black")
      fill("black");
      rect(this.body.position.x,this.body.position.y, this.width, this.height);
    }
};