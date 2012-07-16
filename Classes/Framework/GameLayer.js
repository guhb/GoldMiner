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
            global.bulletNum = 0;
            global.enemyNum = 0;
            Explosion.sharedExplosion();
            Enemy.sharedEnemy();
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
        if (!this.isMouseDown) {
            var touch = touches[0];
            this._beginPos = touch.locationInView(0);
        }
        this.isMouseDown = true;
    },
    ccTouchesMoved:function (touches, event) {
        if (this.isMouseDown) {
            var curPos = this._ship.getPosition();
            if(cc.Rect.CCRectIntersectsRect(this._ship.boundingBox(),this.screenRect)){
                var touch = touches[0];
                var location = touch.locationInView(touch.view());

                var move = cc.ccpSub(location,this._beginPos);
                var nextPos = cc.ccpAdd(curPos,move);
                this._ship.setPosition(nextPos);
                this._beginPos = location;
                curPos = nextPos;
            }
        }
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
	doSwingUpdate() {
	    // TO DO
	},
	doThrowUpdate() {
	    // TO DO
	},
	doRestrieveUpdate() {
	    // TO DO
	},
	updateTime () {
	    // TO DO
	},
    update:function (dt) {
        this.checkIsCollide();
        this.removeInactiveUnit(dt);
        this.checkIsReborn();
        this.updateUI();
        cc.$("#cou").innerHTML = "Ship:" + 1 + ", Enemy: " + global.enemyContainer.length
            + ", Bullet:" + global.ebulletContainer.length + "," + global.sbulletContainer.length + " all:" + this.getChildren().length;
    },
	checkHook() {
	    // TO DO
		var hook, object;
		for (var i = 0; i < global)
	},
    updateUI:function () {
        switch (hookStatus) {
		    case swingstate:
			    doSwingUpdate();
				break;
			case throwState:
			    doThrowUpdate();
				break;
			case retrieveState:
			    doRetrieveUpdate();
				break;
		}
		updateInfo();
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