var GameLayer = cc.Layer.extend({
    _time_limit: null,
    _cur_score: null,
    _dst_score: null,
    _hook: null,
    _mineObjects: null,
    _toolObjects: null,
    _levelManager: null,
    screenRect: null,
    explosionAnimation: [],
    isMouseDown: false,
    _beginPos: cc.PointZero(),
    init:function () {
        var bRet = false;
        if (this._super()) {
            Explosion.sharedExplosion();
            winSize = cc.Director.sharedDirector().getWinSize();
            this._levelManager = new LevelManager(this);
            this.initBackground();
            this.screenRect = new cc.Rect(0, 0, winSize.width, winSize.height + 10);

            // score
            this.lbScore = cc.LabelTTF.create("Score: 0", cc.SizeMake(winSize.width / 2, 50), cc.TEXT_ALIGNMENT_RIGHT, "Arial", 14);
            this.addChild(this.lbScore, 1000);
            this.lbScore.setPosition(cc.ccp(winSize.width - 100, winSize.height - 15));

            // ship life
            var shipTexture = cc.TextureCache.sharedTextureCache().addImage(s_ship01);
            var life = cc.Sprite.createWithTexture(shipTexture, cc.RectMake(0, 0, 60, 38));
            life.setScale(0.6);
            life.setPosition(cc.ccp(30, 460));
            this.addChild(life, 1, 5);

            // ship Life count
            this._lbLife = cc.LabelTTF.create("0", "Arial", 20);
            this._lbLife.setPosition(cc.ccp(60, 463));
            this._lbLife.setColor(cc.RED());
            this.addChild(this._lbLife, 1000);

            // ship
            this._ship = new Ship();
            this.addChild(this._ship, this._ship.zOrder, global.Tag.Ship);

            // accept touch now!
            this.setIsTouchEnabled(true);

            //accept keypad
            this.setIsKeypadEnabled(true);

            // schedule
            this.schedule(this.update);
            this.schedule(this.scoreCounter, 1);

            if (global.sound) {
                cc.AudioManager.sharedEngine().playBackgroundMusic(s_bgMusic, true);
            }

            bRet = true;
        }
        return bRet;
    },
    ccTouchesBegan:function (touches, event) {		
        if (this.hook.state == "swing") {
            this.hook.throw(this.getDstPoint());
        }
    },
    getDstPoint: function () {
        var size = cc.Director.sharedDirector().getWinSize();
        var mx = size.width / 2;
        var my = size.height - 50;
		var desX = null;
		var desY = null;

		if (this._handerSprite.state == "swing") {
		    this._handerSprite.state = "throw";
            this._handerSprite.isRotate = false;
            this._handerSprite.stopSwing();
		
			var border = 10;
            var angle = this._handerSprite.getRotation();
            if (angle > this.criticalAngle) {
				desX = 0 + border;
                desY = my - Math.tan(((90-angle)*Math.PI)/180) * mx;
			} else if (angle < this.criticalAngle && angle >0) {
                desX = mx - Math.tan((angle*Math.PI)/180) * my;
				desY = 0 + border;
			} else if (angle > (-this.criticalAngle) && angle < 0) {
                desX = mx + Math.tan((-angle*Math.PI)/180) * my
				desY = 0 + border;	
			} else if (angle < -this.criticalAngle) {
				desX = size.width - border;
                desY = my - Math.tan(((90+angle)*Math.PI)/180) * mx;
			}
			return cc.ccp(desX, desY);
    },
    ccTouchesEnded:function () {
        this.isMouseDown = false;
    },
    keyDown:function (e) {
        keys[e] = true;
    },
    keyUp:function (e) {
        keys[e] = false;
    },
	updateTime: function () {
	    // TO DO
	},
    draw: function () {
        this._super();
        var size = cc.Director.sharedDirector().getWinSize();
        var lineWidth = cc.renderContext.lineWidth;
        cc.renderContext.lineWidth = 2;
        cc.drawingUtil.drawLine(new cc.ccp(size.width/2,size.height-50), this.hook.getPosition());
    }
    update:function (dt) {
        this.updateTime();
        if (this.checkCollide()) this._hook.retrieve();
    },
    checkCollide: function () {
	    // TO DO
		var hook = this._hook;
        var objs = this._mineObjects;
        for (var i=0; i<objs.length; i++) {
            if (cc.Rect.CCRectIntersectsRect(
                hook.getTextureRect(),objs[i].getTextureRect())) {
            
                hook.addChild(objs[i]);
                this._score += objs[i].score;
                hook.speed = objs[i].speed;
                return true;
            }
        }
	},
    updateInfo: function () {
	// Update Time, Score, Tool, Oject info, etc.
    },
    initBackground:function () {
	    // TO DO
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
    onExit: function () {
        /*
        var scene = cc.Scene.create();
        scene.addChild(StartLayer.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2, scene));
        this.getParent().removeChild(this);*/
        history.go(-1);
    },
    onReturn: function () {
        var scene = cc.Scene.create();
        scene.addChild(StartLayer.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2, scene));
        this.getParent().removeChild(this);
    }
});

GameLayer.create = function () {
    var sg = new GameLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

GameLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = GameLayer.create();
    scene.addChild(layer, 1);
    return scene;
};
