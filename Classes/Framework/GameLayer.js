var GameLayer = cc.Layer.extend({
    _time_limit: 30,
    _cur_score: 0,
    _dst_score: 200,
    _hook: null,
    _mineObjects: [],
    _toolObjects: [],
    _levelManager: null,
    explosionAnimation: [],
    _criticalAngle: null,
    _round: 1,
    winSize: null,
    collectAction: null,
    collectedObject: null,
    
    init:function () {
        var bRet = false;
        if (this._super()) {
            //Explosion.sharedExplosion();
            this.winSize = cc.Director.sharedDirector().getWinSize();
            this.setAnchorPoint(cc.ccp(0, 0));
            
            // init
            this.initBackground();
            this.initLabels();
            this.initTimeCounter();
            this.initHook();
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
    
    initBackground: function () {
        // background
        var bg = cc.Sprite.create(s_background);
        bg.setAnchorPoint(cc.ccp(0, 0));
        bg.setPosition(this.winSize.width/2, this.winSize.height - 50);
        this.addChild(bg, -10);
    },
    
    initLabels: function () {
        // dst score
        this._lbDstScore = cc.LabelTTF.create("Goal: 000", cc.TEXT_ALIGNMENT_LEFT, "Arial", 14);
        this._lbDstScore.setColor(cc.RED());
        this.addChild(this._lbDstScore, 30);
        this._lbDstScore.setPosition(cc.ccp(this.winSize.width - 100, this.winSize.height - 30));
        
        // cur score
        this._lbCurScore = cc.LabelTTF.create("Score: 000", cc.TEXT_ALIGNMENT_LEFT, "Arial", 14);
        this._lbCurScore.setColor(cc.RED());
        this.addChild(this._lbCurScore, 30);
        this._lbCurScore.setPosition(cc.ccp(this.winSize.width - 100, this.winSize.height - 60));
        
        // time
        this._lbTime = cc.LabelTTF.create("Time: 00:00", cc.TEXT_ALIGNMENT_LEFT, "Arial", 14);
        this._lbTime.setColor(cc.RED());
        this.addChild(this._lbTime, 30);
        this._lbTime.setPosition(cc.ccp(this.winSize.width - 100, this.winSize.height - 90));

        // round count
        this._lbRound = cc.LabelTTF.create("Round: 0", "Arial", 20);
        this._lbRound.setPosition(cc.ccp(60, this.winSize.height-30));
        this._lbRound.setColor(cc.RED());
        this.addChild(this._lbRound, 10);
    },
    
    initTimeCounter: function () {
        var that = this;
        if(this._time_limit >= 0)
        {
            this.roundInterval = setInterval(
                function(){
                    that._time_limit--;
                    that._lbTime.setString("Time: 00:"+that._time_limit);
                },
                1000
            );
        }
    },
    
    initHook: function () {
        // hook
        this._hook = new Hook();
        this.addChild(this._hook, 30);
        this._hook.setAnchorPoint(new cc.ccp(0.5, 1));
        this._hook.setPosition(new cc.ccp(this.winSize.width/2, this.winSize.height-50));
        this._hook.originPosition = new cc.ccp(this.winSize.width/2, this.winSize.height-50);
        this._hook.scheduleUpdate();
        this._criticalAngle = Math.atan((this.winSize.width/2)/(this.winSize.height-50))/Math.PI*180;
    },
    
    createMap: function () {
        this._levelManager = new LevelManager(this);
        this._levelManager.createMap();
    },
        
    ccTouchesBegan:function (touches, event) {
        if (this._hook.state == "swing") {
            this._hook.launch(this.getDstPoint());
        }
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
        cc.renderContext.lineWidth = 2;
        cc.drawingUtil.drawLine(new cc.ccp(this.winSize.width/2,this.winSize.height-50),
                               this._hook.getPosition());
    },
    
    setCurScore: function (score) {
        if (score != null && typeof(score) == "number") {
            this._cur_score = score
            this._lbCurScore.setString("Score: " + this._cur_score);
        }
    },
    
    setDstScore: function (score) {
        if (score != null && typeof(score) == "number") {
            this._dst_score = score
            this._lbDstScore.setString("Goal: " + this._dst_score);
        }
    },
    
    setTimeLimit: function (limit) {
        if (limit != null && typeof(limit) == "number") {
            this._time_limit = limit
        }
    },
    
    setRound: function (round) {
        if (round != null && typeof(round) == "number") {
            this._round = round
            this._lbRound.setString("Round: " + this._round);
        }
    },
    
    updateScore: function (inc) {
        this._cur_score += inc;
        this._lbCurScore.setString("Score: " + this._cur_score);
        if (this._cur_score >= this._dst_score) {
            global.round++;
            global.cur_score = this._cur_score;
            this.onNextGame();
        }
    },
    
    update:function (dt) {
        this.onTimeLimit();
        this.checkCollision();
        if (this.collectAction && this.collectAction.isDone()) {
            if (this.collectedObject != null) {
                this.collectedObject.setIsVisible(false);
                this.updateScore(this.collectedObject.getValue());
                //console.log(getTagName(this.collectedObject.type));
                this.collectedObject = null;
                this.collectAction = null;
            }
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
    
    checkCollision: function () {
        var distance = null;
        for (var i=0; i<global.mineContainer.length; i++) {
            if (global.mineContainer[i] != null) {
                var xlen = (this._hook.getPositionX() - global.mineContainer[i].getPositionX())
                        * (this._hook.getPositionX() - global.mineContainer[i].getPositionX());
                var ylen = (this._hook.getPositionY() - global.mineContainer[i].getPositionY())
                        * (this._hook.getPositionY() - global.mineContainer[i].getPositionY());
            
                distance = Math.sqrt(xlen + ylen);
                if (distance < 30) {
                    if (global.mineContainer[i].type == global.Tag.Pig)
                        global.mineContainer[i].stopAllActions();
                    
                    this.collectAction = cc.MoveTo.create(this._hook.getRetrieveSpeed(),
                                                          this._hook.getOriginPosition());
                    global.mineContainer[i].runAction(this.collectAction);
                    this.collectedObject = global.mineContainer[i];
                    global.mineContainer[i] = null;
                    //this._hook.stopLaunch();
                    //var tmpAction = cc.MoveTo.create(this._hook.getPosition(), this.collectedObject.getPosition());
                    //this._hook.setPosition(this.collectedObject.getPosition());
                    //this._hook.runAction(tmpAction);
                    this._hook.retrieve();
                }
            }
        }
    },
   
    onTimeLimit: function () {
        if (this._time_limit <= 0) {
            global.round++;
            global.cur_score = this._cur_score;
            this.onNextGame();
        }
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
