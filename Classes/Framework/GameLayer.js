var GameLayer = cc.Layer.extend({
    _time_limit: 100,
    _cur_score: null,
    _dst_score: null,
    _hook: null,
    _mineObjects: [],
    _toolObjects: [],
    _levelManager: null,
    //screenRect: null,
    explosionAnimation: [],
    _criticalAngle: null,
    roundNum: 1,
    winSize: null,
    init:function (roundNum) {
        var bRet = false;
        if (this._super()) {
            //Explosion.sharedExplosion();
            this.winSize = cc.Director.sharedDirector().getWinSize();
            this.setAnchorPoint(cc.ccp(0, 0));
            //this._levelManager = new LevelManager(this);
            //this.initBackground();
            //this.screenRect = new cc.Rect(0, 0, winSize.width, winSize.height + 10);
            
            console.log("size: " + this.winSize.width);

            // background
            var bg = cc.Sprite.create(s_background);
            bg.setAnchorPoint(cc.ccp(0, 0));
            bg.setPosition(this.winSize.width/2, this.winSize.height - 50);
            this.addChild(bg, -10);
            
            // dst score
            this.lbDstScore = cc.LabelTTF.create("Goal: 0", cc.TEXT_ALIGNMENT_RIGHT, "Arial", 14);
            this.lbDstScore.setColor(cc.RED());
            this.addChild(this.lbDstScore, 30);
            this.lbDstScore.setPosition(cc.ccp(this.winSize.width - 200, this.winSize.height - 30));
            
            // cur score
            this.lbCurScore = cc.LabelTTF.create("Score: 0", cc.TEXT_ALIGNMENT_RIGHT, "Arial", 14);
            this.lbCurScore.setColor(cc.RED());
            this.addChild(this.lbCurScore, 30);
            this.lbCurScore.setPosition(cc.ccp(this.winSize.width - 200, this.winSize.height - 60));
            
            // time
            this.lbTime = cc.LabelTTF.create("Time: 0", cc.TEXT_ALIGNMENT_RIGHT, "Arial", 14);
            this.lbTime.setColor(cc.RED());
            this.addChild(this.lbTime, 30);
            this.lbTime.setPosition(cc.ccp(this.winSize.width - 100, this.winSize.height - 30));

            // ship Life count
            this._lbLife = cc.LabelTTF.create("Round: 0", "Arial", 20);
            this._lbLife.setPosition(cc.ccp(60, this.winSize.height-30));
            this._lbLife.setColor(cc.RED());
            this.addChild(this._lbLife, 10);
            
            var that = this;
            if(this._time_limit>=0)
            {
                this.roundInterval = setInterval(
                    function(){
                        that._time_limit--;
                        that.lbTime.setString("00:"+that._time_limit);
                    },
                    1000
                );
            }
            
            // hook
            this._hook = new Hook();
            this.addChild(this._hook, 30);
            this._hook.setAnchorPoint(new cc.ccp(0.5, 1));
            this._hook.setPosition(new cc.ccp(this.winSize.width/2, this.winSize.height-50));
            this._hook.originPosition = new cc.ccp(this.winSize.width/2, this.winSize.height-50);
            this._hook.scheduleUpdate();
            this._criticalAngle = Math.atan((this.winSize.width/2)/(this.winSize.height-50))/Math.PI*180;
            
            // create map
            this.createMap();

            // accept touch now!
            this.setIsTouchEnabled(true);

            //accept keypad
            this.setIsKeypadEnabled(true);

            // schedule
            this.schedule(this.update);
            //this.schedule(this.scoreCounter, 1);

            if (global.sound) {
                cc.AudioManager.sharedEngine().playBackgroundMusic(s_bgMusic, true);
            }

            bRet = true;
        }
        return bRet;
    },
    
    createMap: function () {
        var levelManager = new LevelManager(this);
        levelManager.createMap();
    },
    ccTouchesBegan:function (touches, event) {		
        if (this._hook.state == "swing") {
            this._hook.launch(this.getDstPoint());
        }
    },
    getDstPoint: function () {
        var size = cc.Director.sharedDirector().getWinSize();
        var mx = size.width / 2;
        var my = size.height - 50;
		var desX = null;
		var desY = null;
        var border = 10;

		if (this._hook.state == "swing") {
            this._hook.stopSwing();
            var angle = this._hook.getRotation();
            if (angle > this._criticalAngle) {
				desX = 0 + border;
                desY = my - Math.tan(((90-angle)*Math.PI)/180) * mx;
			} else if (angle < this._criticalAngle && angle >0) {
                desX = mx - Math.tan((angle*Math.PI)/180) * my;
				desY = 0 + border;
			} else if (angle > (-this._criticalAngle) && angle < 0) {
                desX = mx + Math.tan((-angle*Math.PI)/180) * my
				desY = 0 + border;
			} else if (angle < -this._criticalAngle) {
				desX = size.width - border;
                desY = my - Math.tan(((90+angle)*Math.PI)/180) * mx;
			}
			return cc.ccp(desX, desY);
        }
        console.error("Could not get dstPosition");
    },
    ccTouchesEnded:function () {
        //this.isMouseDown = false;
    },
    keyDown:function (e) {
        keys[e] = true;
    },
    keyUp:function (e) {
        keys[e] = false;
    },
    draw: function () {
        this._super();
        //var size = cc.Director.sharedDirector().getWinSize();
        cc.renderContext.lineWidth = 2;
        //cc.drawingUtil.drawLine(new cc.ccp(this.winSize.width/2,this.winSize.height-50), this._hook.getPosition());
        cc.drawingUtil.drawLine(new cc.ccp(480,590), this._hook.getPosition());
        //cc.drawingUtil.drawLine(new cc.ccp(480,590), new cc.ccp(0,0));
        //console.log("size:" + size.width/2 + " " + size.heigt-50);
        //console.log("pos:" + this._hook.getPositionX() + " " + this._hook.getPositionY());
    },
    updateTime: function () {
	    // TO DO
	},
    updateScore: function () {
    
    },
    update:function (dt) {
        this.updateTime();
        if (this.checkCollision()) this._hook.retrieve();
    },
    checkCollision: function () {
	    // TO DO
        /*
        for (var i=0; i<global.mineContainer.length; i++) {
            if (cc.Rect.CCRectIntersectsRect(this._hook.getTextureRect(),
                global.mineContainer[i].getTextureRect())) {
            
                //this.removeChild(global.mineContainer[i]);
                //this._hook.addChild(global.mineContainer[i]);
                
                console.log(this._hook.getTextureRect().CCRectGetMaxY());
                
                this._score += global.mineContainer[i].getValue();
                this._hook.retriveSpeed = global.mineContainer[i].getWeight()/50 * this._hook.retrieveSpeed;
                return true;
            }
        }*/
        var distance = null;
		for (var i=0; i<global.mineContainer.length; i++) {
			var xlen = (this._hook.getPositionX() - global.mineContainer[i].getPositionX())
                        * (this._hook.getPositionX() - global.mineContainer[i].getPositionX());
			var ylen = (this._hook.getPositionY() - global.mineContainer[i].getPositionY())
                        * (this._hook.getPositionY() - global.mineContainer[i].getPositionY());
			distance = Math.sqrt(xlen + ylen);
			if(distance < 30)			
			{	
			    //this._hook.stopThrow();
				
				//this.objs[i].setIsVisible(false);
				this.removeChild(global.mineContainer[i]);
				this._hook.addChild(global.mineContainer[i],10);
				//this._handerSprite.addChild(this.objs[i]);
				this._hook.retrieve();
			}
		}
        
	},
    onRoundEnd: function () {
         var scene = cc.Scene.create();
         scene.addChild(GameLayer.create(++this.roundNum));
         cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2, scene));
         this.getParent().removeChild(this);
    },
    onGameOver:function () {
        var scene = cc.Scene.create();
        scene.addChild(GameOver.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2, scene));
        this.getParent().removeChild(this);
    },
    onNextGame: function () {
        var scene = cc.Scene.create();
        scene.addChild(StoreLayer.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2, scene));
        this.getParent().removeChild(this);
    },
    onReturn: function () {
        var scene = cc.Scene.create();
        scene.addChild(StartLayer.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2, scene));
        this.getParent().removeChild(this);
    }
});

GameLayer.create = function (roundNum) {
    var sg = new GameLayer();
    if (sg && sg.init(roundNum)) {
        return sg;
    }
    return null;
};

GameLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = GameLayer.create(1);
    scene.addChild(layer, 1);
    return scene;
};
