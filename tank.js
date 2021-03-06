function FreindlyTank(game, x, y) {
    //Barrell Code

    this.barrell = new Barrell(game, AM.getAsset("./img/tank_green2Barrell.png"));
    this.BB = AM.getAsset("./img/tank_green2Barrell.png");
    
    this.bullet = AM.getAsset("./img/bullet_green_2.png");
    this.explosionA = AM.getAsset("./img/Explosion_A.png")
    this.cursorX;
    this.cursorY;
    
    //_________________________________________________________________________________________________________

    this.moveDownAnimation = new Animation( AM.getAsset("./img/tank_green.png"),  0, 0, 50, 50, 1,1,true,false);
    this.moveRightAnimation = new Animation( AM.getAsset("./img/tank_green.png"), 50,0, 50,50,1,1, true,false);
    this.moveUpAnimation = new Animation(AM.getAsset("./img/tank_green.png"),100,0,50,50,1,1,true,false);
    this.moveLeftAnimation = new Animation( AM.getAsset("./img/tank_green.png"),150,0,50, 50,1,1,true, false);

    this.moveDownRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),0,0,73,60,1, 1,true,false); //quick note{:}
    this.moveUpRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),73,0,73,60,1,1,true,false);
    this.moveRightRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),146,0,73,60,1,1,true,false);
    this.moveLeftRobotAnimation = new Animation(AM.getAsset("./img/robot.png"),219,0,73,60,1,1,true,false);
    //this.bulletShot = AM.getAsset("./img/bullet_onlyred.png");
    this.cooldown = 400;
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
    this.counter = 0;
    this.random = this.random = Math.floor(Math.random() * 100);
    this.shooting = false;
    this.cleanShot = false;
    this.boundingbox = new BoundingBox(this.x, this.y, this.moveUpAnimation.frameWidth, this.moveUpAnimation.frameHeight);
    this.triggerbox = new BoundingBox(this.x, this.y, this.moveUpAnimation.frameWidth, this.moveUpAnimation.frameHeight);
    this.distance;
    this.maxHealth = 200;
    this.currentHealth = 200;
    this.collision;
    this.tankIndex;
    this.opposite;
    this.closestTank;
    this.temp = 1000;
    this.type = 'good';
    
    
    Entity.call(this, game, this.x, this.y);
}

FreindlyTank.prototype = new Entity();
FreindlyTank.prototype.constructor = FreindlyTank;

FreindlyTank.prototype.update = function() {
    var bool = true;
    //Barrell Code

    this.tempList = this.game.goodTanks;
    for(j = 0; j < this.game.goodTanks.length; j++){
        if(this.tempList[j].x === this.x){
            this.tankIndex = j;
            //this.tempList.splice(this.tankIndex, 1);
        }
    }

    var min = 10000;
    

        for(j = 0; j < this.game.badTanks.length; j++){
            
            this.temp = Math.sqrt(Math.pow((this.game.goodTanks[this.tankIndex].triggerbox.midpointx - this.game.badTanks[j].triggerbox.midpointx), 2) +
                             Math.pow((this.game.goodTanks[this.tankIndex].triggerbox.midpointy - this.game.badTanks[j].triggerbox.midpointy), 2));
                     
                
                            if(this.temp < min){
                                
                                min = this.temp;
                                this.closestTank = j;
                                
                             //Math.pow((this.triggerbox.midpointy - this.game.badTanks[this.closestTank].triggerbox.midpointy), 2);
                             this.distance = Math.sqrt(Math.pow((this.triggerbox.midpointx - this.game.badTanks[this.closestTank].triggerbox.midpointx), 2) +
                            Math.pow((this.triggerbox.midpointy - this.game.badTanks[this.closestTank].triggerbox.midpointy), 2));
                            }
        }

        
        //console.log(this.game.badTanks.length);
        if (this.distance < 500 && this.distance > 50) {
         //   console.log("fhdfhfdh   " + this.tankIndex);
         //   console.log("fhdfhfdh " + this.game.badTanks.length);
            var dy = this.y - this.game.badTanks[this.closestTank].y;
            var dx = this.x - this.game.badTanks[this.closestTank].x;
            var theta = Math.atan2(dy, dx); // range (-PI, PI]
            //theta *= 180 / Math.PI;
            //this.cursorX = this.game.mouse.x;
            //this.cursorY = this.game.mouse.y;
            this.bullet = this.rotateAndCache(AM.getAsset("./img/bullet_red_2.png"), theta);
            this.BB = this.rotateAndCache(
                AM.getAsset("./img/tank_green2Barrell.png"),
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
                 AM.getAsset("./img/tank_green2Barrell.png"),
                 theta
             );
             this.shooting = false;
         }
    //____________________________________________________________________________________________________
    // if (this.game.mouse) {
    //     console.log("fhdfhfdh");
    //     var dy = this.y - this.cursorY;
    //     var dx = this.x - this.cursorX;
    //     var theta = Math.atan2(dy, dx); // range (-PI, PI]
    //     //theta *= 180 / Math.PI;
    //     this.cursorX = this.game.mouse.x;
    //     this.cursorY = this.game.mouse.y;
    //     this.bullet = this.rotateAndCache(AM.getAsset("./img/bullet_red_2.png"), theta);
    //     this.BB = this.rotateAndCache(
    //         AM.getAsset("./img/tank_green2Barrell.png"),
    //         theta
    //     );
    //     //console.log(this.spritesheet);
    // } else {
    //     console.log("fhdfhfdh");
    //     var dy = this.y - this.cursorY;
    //     var dx = this.x - this.cursorX;
    //     var theta = Math.atan2(dy, dx); // range (-PI, PI]
    //     //theta *= 180 / Math.PI;
    //     //this.cursorX = this.game.mouse.x;
    //     //this.cursorY = this.game.mouse.y;
    //     this.BB = this.rotateAndCache(
    //         AM.getAsset("./img/tank_green2Barrell.png"),
    //         theta
    //     );
    // }
    //_____________________________________________________________________________________________________


    if (this.shooting && this.cooldown === 400) {
        bulletShot = new BulletFire(this.game, this.bullet, true, this.x - 16, this.y - 16, this.cursorX, this.cursorY, theta, "good", this.closestTank);
        this.game.addEntity(bulletShot);
        this.shooting = false;
        //this.bullet.fire = true;
    }

    this.cooldown--;

    if(this.cooldown === 0){
        this.cooldown = 400;
    }
    
    //if(this.boundingbox.collide())

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
            if(this.game.goodTanks[this.tankIndex] === this.game.entities[i]){
             //   console.log("YAYAYAYAYAUYYYAYYAYAYAYAYAYAYAYAYAYAYYAYAYAYAYYAYAYAYAYAYYA");
                this.game.entities[i].removeFromWorld = true;
                this.game.goodTanks[this.tankIndex].removeFromWorld = true;
            }
        }
        

        

        var tempRandom = Math.floor(Math.random() * 2000);
        var anotherTank = new EnemyTank(this.game, tempRandom, tempRandom);
        //var enemytank1 = new EnemyTank(gameEngine, 700, 700);
        this.game.addEntity(anotherTank);
        this.game.badTanks.push(anotherTank);

        return Entity.prototype.update.call(this);;

        // Entity.prototype.update.call(this);
        
        // return;

    }

    // if(this.x >= 700){
    //     //this.lastMove = "left";
    //     this.random = 76;
    // }

    // if(this.x <= 10){
    //     //this.lastMove = "right";
    //     this.random = 26;
    // }

    // if(this.y <= 10){
    //     //this.lastMove = "down";
    //     this.random = 51;
    // }

    // if(this.y >= 700){
    //     //this.lastMove = "up";
    //     this.random = 1;
    // }


    this.collision = false;

    for(i = 0; i < (this.game.badTanks.length + this.game.goodTanks.length) ; i++){

        var tempArray = this.game.goodTanks.concat(this.game.badTanks);

        if(this.boundingbox.collide(tempArray[i].boundingbox) && this.tankIndex != i){
         //   console.log("WAS A COLLIIIISISISISIISISIS");
            this.collision = true;
        } 

    }

    if(this.collision === false){
        //do nothing
    } else {
        this.opposite = true;
        //this.speed *= -1;
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
            this.x +=this.speed;
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
    // if (this.game.keyboard === 38 || this.game.keyboard === 87) {
    //     //moving up
    //     this.up = true;
    //     this.down = false;
    //     this.right = false;
    //     this.left = false;
    // }
    // if (this.up === true) {
    //     this.y -= this.speed;
    //     this.boundingbox.y -= this.speed;
    //     this.triggerbox.y -= this.speed;
    //     this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
    //     this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
    // }
    // if (this.game.keyboard === 39 || this.game.keyboard === 68) {
    //     //moving right

    //     this.up = false;
    //     this.down = false;
    //     this.right = true;
    //     this.left = false;
    // }
    // if (this.right === true) {
    //     this.x += this.speed;
    //     this.boundingbox.x += this.speed;
    //     this.triggerbox.x += this.speed;
    //     this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
    //     this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
    // }
    // if (this.game.keyboard === 40 || this.game.keyboard === 83) {
    //     //moving down
    //     this.up = false;
    //     this.down = true;
    //     this.right = false;
    //     this.left = false;
    // }
    // if (this.down === true) {
    //     this.y += this.speed;
    //     this.boundingbox.y += this.speed;
    //     this.triggerbox.y += this.speed;
    //     this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
    //     this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
    // }
    // if (this.game.keyboard === 37 || this.game.keyboard === 65) {
    //     //moving left
    //     this.up = false;
    //     this.down = false;
    //     this.right = false;
    //     this.left = true;
    // }
    // if (this.left === true) {
    //     this.x -= this.speed;
    //     this.boundingbox.x -= this.speed;
    //     this.triggerbox.x -= this.speed;
    //     this.triggerbox.midpointx = (this.triggerbox.x + (this.triggerbox.x + this.triggerbox.width))/2;
    //     this.triggerbox.midpointy = (this.triggerbox.y + (this.triggerbox.y + this.triggerbox.height))/2;
    // }

    // var closestTank = null;
    // var temp = 0;
    // var min = 0;
    
    // for(i = 1; i < this.game.tanks.length; i++){

    //     //for(j = 1; j < this.list.size; j++){
            
    //         temp = Math.sqrt(Math.pow((this.game.tanks[i].triggerbox.midpointx - this.game.tanks[0].triggerbox.midpointx), 2) +
    //                          Math.pow((this.game.tanks[i].triggerbox.midpointy - this.game.tanks[0].triggerbox.midpointy), 2));
    //     //}
    //         if(i === 1){
    //             //console.log("HHEHEHEHEHEHEHEHEHEHEH    " + vehicle.length);
    //             min = temp;
    //             closestTank = 1;
    //         }

    //         if(temp < min){

    //             min = temp;
    //             closestTank = i;
    //         }
        
    // }
    this.opposite = false;
    this.speed = 1;

    this.game.allTanks = [];
    for(i = 0; i < this.game.goodTanks.length; i++){
        this.game.allTanks.push(this.game.goodTanks[i]);

        // goodTankStore[i] = {x: gameEngine.goodTanks[i].x, y: gameEngine.goodTanks[i].y, type: gameEngine.goodTanks[i].type}
    }
    
    for(i = 0; i < this.game.badTanks.length; i++){
        this.game.allTanks.push(this.game.badTanks[i]);
        // badTankStore[i] = {x: gameEngine.badTanks[i].x, y: gameEngine.badTanks[i].y, type: gameEngine.badTanks[i].type}
    }

    this.game.list = [];
    for(i = 0; i < this.game.goodTanks.length + this.game.badTanks.length - 1; i++){

        this.game.list.push({x: this.game.allTanks[i].x, y: this.game.allTanks[i].y, type: this.game.allTanks[i].type});

   }

    Entity.prototype.update.call(this);
};

FreindlyTank.prototype.draw = function() {
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
    this.ctx.strokeStyle = "pink";
    this.ctx.rect(this.triggerbox.x - 50, this.triggerbox.y - 50 , this.triggerbox.width + 100, this.triggerbox.height + 100);
    this.ctx.stroke();


    Entity.prototype.draw.call(this);
};