function EnemyTank(game, x, y) {
    //Barrell Code
    //___________________________
    this.barrell = new Barrell(game, AM.getAsset("./img/tank_red2Barrell.png"));
    this.BB = AM.getAsset("./img/tank_red2Barrell.png");
    
    this.bullet = AM.getAsset("./img/bullet_red_2.png");
    this.explosionA = AM.getAsset("./img/Explosion_A.png")
    this.cursorX;
    this.cursorY;
    
    //_________________________________________________________________________________________________________

    this.moveDownAnimation = new Animation( AM.getAsset("./img/tank_red.png"),  0, 0, 50, 50, 1,1,true,false);
    this.moveRightAnimation = new Animation( AM.getAsset("./img/tank_red.png"), 50,0, 50,50,1,1, true,false);
    this.moveUpAnimation = new Animation(AM.getAsset("./img/tank_red.png"),100,0,50,50,1,1,true,false);
    this.moveLeftAnimation = new Animation( AM.getAsset("./img/tank_red.png"),150,0,50, 50,1,1,true, false);

    this.moveDownRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),0,0,73,60,1, 1,true,false); //quick note{:}
    this.moveUpRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),73,0,73,60,1,1,true,false);
    this.moveRightRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),146,0,73,60,1,1,true,false);
    this.moveLeftRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),219,0,73,60,1,1,true,false);
    //this.bulletShot = AM.getAsset("./img/bullet_onlyred.png");
    this.cooldown = 200;
    this.counter = 0;
    this.random = this.random = Math.floor(Math.random() * 100);
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.lastMove = "none";
    this.hero = false;
    this.speed = 1;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.shooting = false;
    this.cleanShot = false;
    this.boundingbox = new BoundingBox(this.x, this.y, this.moveUpAnimation.frameWidth, this.moveUpAnimation.frameHeight);
    this.triggerbox = new BoundingBox(this.x, this.y, this.moveUpAnimation.frameWidth, this.moveUpAnimation.frameHeight);
    this.distance;
    this.maxHealth = 200;
    this.currentHealth = 200;
    this.collision;
    this.tankIndex;
    this.tempList;
    this.opposite;
    this.closestTank;
    this.temp = 1000;

    
    
    Entity.call(this, game, this.x, this.y);
}

EnemyTank.prototype = new Entity();
EnemyTank.prototype.constructor = EnemyTank;

EnemyTank.prototype.update = function() {
    this.tempList = this.game.badTanks;
    for(j = 0; j < this.game.badTanks.length; j++){
        if(this.tempList[j].x === this.x){
            this.tankIndex = j;
            //this.tempList.splice(this.tankIndex, 1);
        }
    }


    var bool = true;
    //Barrell Code
    
    console.log(this.tankIndex + "tank index");
    var min = 10000;
    

        for(j = 0; j < this.game.goodTanks.length; j++){
            
            this.temp = Math.sqrt(Math.pow((this.game.badTanks[this.tankIndex].triggerbox.midpointx - this.game.goodTanks[j].triggerbox.midpointx), 2) +
                             Math.pow((this.game.badTanks[this.tankIndex].triggerbox.midpointy - this.game.goodTanks[j].triggerbox.midpointy), 2));

                
                            if(this.temp < min){
                
                                min = this.temp;
                                this.closestTank = j;

                                this.distance = Math.sqrt(Math.pow((this.triggerbox.midpointx - this.game.goodTanks[this.closestTank].triggerbox.midpointx), 2) +
                                                Math.pow((this.triggerbox.midpointy - this.game.goodTanks[this.closestTank].triggerbox.midpointy), 2));
                            }
        }
            
    

    
    

    if (this.distance < 500 && this.distance > 50) {
        console.log("fhdfhfdh " + this.game.goodTanks.length);
        var dy = this.y - this.game.goodTanks[this.closestTank].y;
        var dx = this.x - this.game.goodTanks[this.closestTank].x;
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        //theta *= 180 / Math.PI;
        //this.cursorX = this.game.mouse.x;
        //this.cursorY = this.game.mouse.y;
        this.bullet = this.rotateAndCache(AM.getAsset("./img/bullet_red_2.png"), theta);
        this.BB = this.rotateAndCache(
            AM.getAsset("./img/tank_red2Barrell.png"),
            theta
        );
        this.shooting = true;
        //console.log(this.spritesheet);
     } else {
         //console.log("fhdfhfdh");
         var dy = this.y;
         var dx = this.x;
         var theta = Math.atan2(dy, dx); // range (-PI, PI]
         //theta *= 180 / Math.PI;
         //this.cursorX = this.game.mouse.x;
         //this.cursorY = this.game.mouse.y;
         this.BB = this.rotateAndCache(
             AM.getAsset("./img/tank_red2Barrell.png"),
             theta
         );
         this.shooting = false;
     }
    //_____________________________________________________________________________________________________

    // if (this.game.click) {
    //     this.shooting = true;
    // }
    if (this.shooting && this.cooldown === 200 ) {
        bulletShot = new BulletFire(this.game, this.bullet, true, this.x - 16, this.y - 16, this.cursorX, this.cursorY, theta, "bad", this.tankIndex);
        this.game.addEntity(bulletShot);
        this.shooting = false;
        //this.bullet.fire = true;
    }

    this.cooldown--;

    if(this.cooldown === 0){
        this.cooldown = 200;
    }


    if (this.cleanShot) {
        cleanshot = new Explosion(this.game, this.explosionA, true, this.x, this.y);
        this.game.addEntity(cleanshot);
        this.game.entities[this.game.entities.length - 1].removeFromWorld = true;
        this.cleanShot = false;
        this.currentHealth -= 100;
        //this.bullet.fire = true;
    }

    if(this.currentHealth === 0 || this.currentHealth < 0){

        for(i = 0; i < this.game.entities.length; i++){
            if(this.game.badTanks[this.tankIndex] === this.game.entities[i]){
                console.log("YAYAYAYAYAUYYYAYYAYAYAYAYAYAYAYAYAYAYYAYAYAYAYYAYAYAYAYAYYA");
                this.game.entities[i].removeFromWorld = true;
                this.game.badTanks[this.tankIndex].removeFromWorld = true; //ask question about how to fully remove from world
            }
        }
    

        var tempRandom = Math.floor(Math.random() * 750);
        var anotherTank = new FreindlyTank(this.game, tempRandom, tempRandom);
        //var enemytank1 = new EnemyTank(gameEngine, 700, 700);
        this.game.addEntity(anotherTank);
        this.game.goodTanks.push(anotherTank);
        // 
        return Entity.prototype.update.call(this);;
    }

    // if(this.x >= 750){
    //     //this.lastMove = "left";
    //     this.random = 76;
        
    // }
    // if(this.x <= 50){
    //     //this.lastMove = "right";
    //     this.random = 26;
    // }
    // if(this.y <= 50){
    //     //this.lastMove = "down";
    //     this.random = 51;
    // }
    // if(this.y >= 750){
    //     //this.lastMove = "up";
    //     this.random = 1;
    // }

    

    this.collision = false;

    

    for(i = 0; i < (this.game.badTanks.length + this.game.goodTanks.length)  ; i++){

        var tempArray = this.game.badTanks.concat(this.game.goodTanks);

        if(this.boundingbox.collide(tempArray[i].boundingbox) && this.tankIndex != i){
            this.collision = true;
        } 
        
    }

    if(this.collision === false){
        //do nothing
    } else {
        //this.speed *= -1;
        this.opposite = true;
    }


    if (this.random <= 25) {
        //moving up
        this.up = true;
        this.down = false;
        this.right = false;
        this.left = false;
        
    }
    else if (this.random <= 50 && this.random > 25) {
        //moving right

        this.up = false;
        this.down = false;
        this.right = true;
        this.left = false;
    }
    else if (this.random <= 75 && this.random > 50) {
        //moving down
        
        this.up = false;
        this.down = true;
        this.right = false;
        this.left = false;
    }
    else if (this.random <= 100 && this.random > 75) {
        //moving left
        this.up = false;
        this.down = false;
        this.right = false;
        this.left = true;
    }

    if (this.up === true && this.y > 0) {
        
        if(this.opposite){
            this.y += this.speed;
            this.boundingbox.y += this.speed;
            this.triggerbox.y += this.speed;
        } else {
            this.y -= this.speed;
            this.boundingbox.y -= this.speed;
            this.triggerbox.y -= this.speed;
        }
        
        this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
        this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
    }
    
    if (this.right === true && this.x < 750) {
        if(this.opposite){
            this.x -= this.speed;
            this.boundingbox.x -= this.speed;
            this.triggerbox.x -= this.speed;
        } else {
            this.x += this.speed;
            this.boundingbox.x += this.speed;
            this.triggerbox.x += this.speed;
        }
        
        
        this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
        this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
    }
    
    if (this.down === true && this.y < 750) {
        if(this.opposite){
            this.y -= this.speed;
            this.boundingbox.y -= this.speed;
            this.triggerbox.y -= this.speed;
        } else {
            this.y += this.speed;
            this.boundingbox.y += this.speed;
            this.triggerbox.y += this.speed;
        }
        
        
        this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
        this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
    }
    
    if (this.left === true && this.x > 0) {
        if(this.opposite){
            this.x += this.speed;
            this.boundingbox.x += this.speed;
            this.triggerbox.x += this.speed;
        } else {
            this.x -= this.speed;
            this.boundingbox.x -= this.speed;
            this.triggerbox.x -= this.speed;
        }

        
        
        this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
        this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
    }

    this.opposite = false;
    this.speed = 1;

    //this.distance = new findClosestTank(this.game.tanks).closestTank;
    //console.log("CLOSEST TANK IS AT INDEX:   " + closestTank);
    Entity.prototype.update.call(this);
};

EnemyTank.prototype.draw = function() {
    drawHealthBar(this.ctx, this.x+5, this.y-5, 40, 4, this.currentHealth, this.maxHealth);
    //this.moveRightAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    if (this.up) {
        this.moveUpAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x,
            this.y
        );
        this.counter ++;
        if(this.counter === 100){
            this.up = false;
            this.counter = 0;
            this.random = Math.floor(Math.random() * 100);
        }
        this.up = false;
        this.lastMove = "up";
    }
    if (this.down) {
        this.moveDownAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x,
            this.y
        );
        this.counter ++;
        if(this.counter === 100){
            this.up = false;
            this.counter = 0;
            this.random = Math.floor(Math.random() * 100);
        }
        this.down = false;
        this.lastMove = "down";
    }
    if (this.right) {
        this.moveRightAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x,
            this.y
        );
        this.counter ++;
        if(this.counter === 100){
            this.up = false;
            this.counter = 0;
            this.random = Math.floor(Math.random() * 100);
        }
        this.right = false;
        this.lastMove = "right";
    }
    if (this.left) {
        this.moveLeftAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
            this.x,
            this.y
        );
        this.counter ++;
        if(this.counter === 100){
            this.up = false;
            this.counter = 0;
            this.random = Math.floor(Math.random() * 100);
        }
        this.left = false;
        this.lastMove = "left";
    }
    if (!this.left && !this.right && !this.up && !this.down) {
        //if tank isnt moving then stay at most recent direction.
        if (this.lastMove === "left")
            this.moveLeftAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x,
                this.y
            );
        if (this.lastMove === "right")
            this.moveRightAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x,
                this.y
            );
        if (this.lastMove === "down")
            this.moveDownAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x,
                this.y
            );
        if (this.lastMove === "up")
            this.moveUpAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x,
                this.y
            );
        if (this.lastMove === "none")
            this.moveUpAnimation.drawFrame(
                this.game.clockTick,
                this.ctx,
                this.x,
                this.y
            );
    }




    //Barrell Code
    this.ctx.drawImage(this.BB, this.x, this.y);


    this.ctx.beginPath();
    this.ctx.lineWidth = "2";
    this.ctx.strokeStyle = "red";
    this.ctx.rect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.lineWidth = "2";
    //if(this == this.game.tanks[this.distance])
    this.ctx.strokeStyle = "blue";
    this.ctx.rect(this.triggerbox.x - 50, this.triggerbox.y - 50 , this.triggerbox.width + 100, this.triggerbox.height + 100);
    this.ctx.stroke();

    
    // if(this.game.tanks.length > 3){
    //     this.ctx.beginPath();
    //     this.ctx.lineWidth = "2";
    //     this.ctx.strokeStyle = "yellow";
    //     this.ctx.rect(this.game.tanks[this.distance].triggerbox.x - 55, this.game.tanks[this.distance].triggerbox.y - 55 , this.game.tanks[this.distance].triggerbox.width + 110, this.game.tanks[this.distance].triggerbox.height + 110);
    //     this.ctx.stroke();
    // }
    
    

    Entity.prototype.draw.call(this);
};