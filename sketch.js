//Declaring the variables.
var paper,ground,dustbinLeft,dustbinRight,dustbinBottom;
var dustbinExtra,paperSprite,dustbinBottomSprite,keyPress;
var sprite,lose,win,jump;

//Declaring the constants.
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

//Preloading the dustbin Image to variable DustbinImg in function preload.
function preload() {
	DustbinImg = loadImage("dustbin.png");
}

//Function to Setup.
function setup() {
	//Creating the canvas area.
	createCanvas(800, 700);

	//Setting keyPress's value as 5;
	keyPress = 5;

	//Loading sounds to variables.
	lose = loadSound("error.mp3");
	win = loadSound("win.mp3");
	jump = loadSound("jump.mp3");

	//Setting volume of the sounds.
	win.setVolume(0.04);
	jump.setVolume(0.1);

	//Creating Engine for the variable 'engine'.
	engine = Engine.create();
	//Storing engine's world in the variable 'world'.
	world = engine.world;

	//Creating the Bodies.
	paper = new Paper(100,200);
	ground = new Ground(width/2,650);
	dustbinLeft = new Dustbin(602,581,10,110);
	dustbinRight = new Dustbin(678,581,10,110);
	dustbinBottom = new Dustbin(640,635,60,10);

	//Creating the sprites.
	dustbinExtra = createSprite(640,583,80,100);
	paperSprite = createSprite(100,200,30,30);
	dustbinBottomSprite = createSprite(640,630,60,10);
	sprite = createSprite(400,400,10,10);

	//Adding image to dustbinExtra sprite.
	dustbinExtra.addImage(DustbinImg);
	//Scaling it. 
	dustbinExtra.scale = 0.35;
	//Making paperSprite, sprite and dustbinBottomSprite invisible.
	paperSprite.visible = false;
	sprite.visible = false;
	dustbinBottomSprite.visible = false;
	
	//Running the previously created engine.
	Engine.run(engine);
}

//Draw loop function.
function draw() {
	//Setting rectMode as 'CENTER'.
	rectMode(CENTER);
	//Setting ellipseMode as 'RADIUS'.
	ellipseMode(RADIUS);
	//Setting background as light blue.
	background(rgb(110,197,255));

	//Making paperSprite's positions equal to paper body's positions.
	paperSprite.x = paper.body.position.x;
	paperSprite.y = paper.body.position.y;

	//Displaying info text.
	fill("black");
	textSize(20);
	textFont("cursive");
	textStyle(BOLD);
	textAlign(CENTER);
	text('Welcome to "Clean the City" ! Your task is to throw the crumpled paper into',400,80);
	text("the dustbin and make the city clean. Press Up arrow key to apply an upward",400,105);
	text("force to the trash. Similarly, press down arrow key to apply a downward force.", 400,130);
	text("Press right arrow key to apply a force towards the right of the paper ball and",400,155);
	text("similarly left arrow key to apply a force towards the left of the paper ball. Do",400,180);
	text("not let the paper ball go out of the screen You can press the arrow keys only 5",400,205);
	text("times; play wisely. Good luck !!",400,230);

	//Displaying the bodies.
	paper.display();
	ground.display();
	dustbinLeft.display();
	dustbinRight.display();
	dustbinBottom.display();

	//Decreasing keypress's value by 1 if any arrow key is pressed.
	if(keyWentDown(LEFT_ARROW) || keyWentDown(UP_ARROW) || keyWentDown(DOWN_ARROW) || keyWentDown(RIGHT_ARROW)) {
		if(dustbinRight.body.position.x < 800) {
			keyPress = keyPress - 1;
		}
	}

	//Displaying text when dustbinBottomSprite touches packageSprite.
	if(dustbinBottomSprite.isTouching(paperSprite)) {
		fill(rgb(188,0,0));
		textSize(20);
		textFont("courier new");
		textStyle(BOLD);
		textAlign(CENTER);
		text("Task Completed. Well done!!",400,260);
		text("Press Ctrl+R to restart.",400,285);

		//Setting paper body static.
		Matter.Body.setStatic(paper.body,true);

		//Changing dustbinRight's x position and sprite's x velocity.
		dustbinRight.body.position.x = 820;
		sprite.velocityX = 6;
	}

	//Displaying text when paper body goes out of the screen or keyPress's value is -1.
	if(paper.body.position.x > 810 || paper.body.position.x < -10 || paper.body.position.y < -10 || paper.body.position.y > 710 || keyPress === -1) {
		fill(rgb(188,0,0));
		textSize(20);
		textFont("courier new");
		textStyle(BOLD);
		textAlign(CENTER);
		text("You Failed! Press Ctrl+R to restart",400,260);

		if(keyPress < 0) {
			text("(Keys pressed for more than 5 times)",400,285);
		}
		if(paper.body.position.x > 810 || paper.body.position.x < -10 || paper.body.position.y < -10 || paper.body.position.y > 710) {
			text("(Paper ball went out of the screen)",400,310);
		}

		//Setting paper body static.
		Matter.Body.setStatic(paper.body,true);

		//Changing dustbinRight's x position and sprite's x velocity.
		dustbinRight.body.position.x = 820;
		sprite.velocityX = 6;
	}

	//Assigning functions when sprite's x position is greater than 500.
	if(sprite.x > 500) {
		//Changing sprite's x position to -1000000.
		sprite.x = -1000000;
		
		//Playing lose sound or win sound depending upon the conditions.
		if(keyPress === -1 || paperSprite.x < 0 || paperSprite.x > 800 || paperSprite.y < 0 || paperSprite.y > 700) {	
			lose.play();
		}
		else if(paperSprite.isTouching(dustbinBottomSprite)) {
			win.play();
		}
	}

	//Displaying info text under certain conditions.
	if(keyPress === -1) {
		fill(rgb(188,0,0));
		textSize(20);
		textFont("segoe script");
		textStyle(NORMAL);
		textAlign(CENTER);
		text("Key press left: 0",390,40);	
	}
	else if(keyPress > -1) {
		fill(rgb(188,0,0));
		textSize(20);
		textFont("segoe script");
		textStyle(NORMAL);
		textAlign(CENTER);
		text("Key press left: " + keyPress,390,40);
	}

	//Displaying the sprites.
	drawSprites();
}

//Function for pressing keys.
function keyPressed() {
	//Applying force to paper body when different Arrow keys are pressed and sprite's x position is 400.
	if(keyCode === UP_ARROW && sprite.x === 400) {
		Matter.Body.applyForce(paper.body,paper.body.position,{x:0,y:-50});
		jump.play();
	}
	if(keyCode === DOWN_ARROW && sprite.x === 400) {
		Matter.Body.applyForce(paper.body,paper.body.position,{x:0,y:50});
		jump.play();
	}
	if(keyCode === LEFT_ARROW && sprite.x === 400) {
		Matter.Body.applyForce(paper.body,paper.body.position,{x:-50,y:0});
		jump.play();
	}
	if(keyCode === RIGHT_ARROW && sprite.x === 400) {
		Matter.Body.applyForce(paper.body,paper.body.position,{x:50,y:0});
		jump.play();
	}
}