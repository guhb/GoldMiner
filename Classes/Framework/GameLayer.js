var GameLayer = cc.Layer.extend({
    _time_limit: 30,
    _cur_score: 0,
    _dst_score: 200,
    _roundInterval: null,
    _hook: null,
    _hook2:null,
    mineContainer: [],
    _propContainer: [],
    _criticalAngle: null,
    _round: 1,
    winSize: null,
    collectAction: null,
    collectedObject: null,
    shelfMap: null,
    
    init:function () {
        var bRet = false;
        if (this._super()) {
            this.winSize = cc.Director.sharedDirector().getWinSize();
            this.setAnchorPoint(cc.ccp(0, 0));
            
            // init
            this.initBackground();
            this.initLabels();
            this.initTimeCounter();
            this.initHook();
            // create map
            this.initShelfMap();
            
            this.createMap();
            this.createTools();

            this.setIsTouchEnabled(true);
            //this.setIsKeypadEnabled(true);
            this.schedule(this.update);

            if (global.sound) {
                cc.AudioManager.sharedEngine().playBackgroundMusic(s_bgMusic, true);
            }

            bRet = true;
        }
        return bRet;
    },
    
    initBackground: function () {
        var bg = cc.Sprite.create(s_bgdouble);
        bg.setAnchorPoint(cc.ccp(0, 0));
        this.addChild(bg, global.zOrder.Background);
		//小男孩1
		var textureForBoy = cc.TextureCache.sharedTextureCache().addImage(s_boy);
		var boyFrame1 = cc.SpriteFrame.create(textureForBoy,cc.RectMake(0,0,109,140));
		var boyFrame2 = cc.SpriteFrame.create(textureForBoy,cc.RectMake(109,0,109,140));
		var boySprite = cc.Sprite.createWithSpriteFrame(boyFrame1);
		boySprite.setPosition(new cc.ccp(this.winSize.width / 2 +125, this.winSize.height - 64));
		boySprite.setScale(0.3);
		this.addChild(boySprite,10);
		var boyFrames = [];
		boyFrames.push(boyFrame2);
		boyFrames.push(boyFrame1);
		var boyAnimation = cc.Animation.create(boyFrames,0.3);
		var boyAnim = cc.Animate.create(boyAnimation,false);
		boySprite.runAction(cc.RepeatForever.create(cc.Sequence.create(boyAnim,cc.DelayTime.create(3))));
        //小男孩2
        var textureForBoy2 = cc.TextureCache.sharedTextureCache().addImage(s_boy);
        var boyFrame12 = cc.SpriteFrame.create(textureForBoy,cc.RectMake(0,0,109,140));
        var boyFrame22 = cc.SpriteFrame.create(textureForBoy,cc.RectMake(109,0,109,140));
        var boySprite2 = cc.Sprite.createWithSpriteFrame(boyFrame1);
        boySprite2.setPosition(new cc.ccp(this.winSize.width / 2 -130, this.winSize.height - 64));
        boySprite2.setScale(0.3);
        this.addChild(boySprite2,10);
        var boyFrames2 = [];
        boyFrames2.push(boyFrame2);
        boyFrames2.push(boyFrame1);
        var boyAnimation2 = cc.Animation.create(boyFrames2,0.3);
        var boyAnim2 = cc.Animate.create(boyAnimation2,false);
        boySprite2.runAction(cc.RepeatForever.create(cc.Sequence.create(boyAnim2,cc.DelayTime.create(3))));
		//放道具的木板
		var board = cc.Sprite.create(s_board);	
		board.setPosition(new cc.ccp(60, this.winSize.height - 70));
		this.addChild(board,30);
		board.setScale(0.7);
    },
    
    initLabels: function () {
        // dst score
        this._lbDstScore = cc.LabelBMFont.create("Goal: 000", s_futura_fnt);
        this._lbDstScore.setScale(0.5);
        //this._lbDstScore.setColor(cc.RED());
        this.addChild(this._lbDstScore, global.zOrder.Label);
        this._lbDstScore.setPosition(cc.ccp(this.winSize.width - 100, this.winSize.height - 30));
        
        // cur score
        this._lbCurScore = cc.LabelBMFont.create("Score: 000", s_futura_fnt);
        //this._lbCurScore.setColor(cc.RED());
        this._lbCurScore.setScale(0.5);
        this.addChild(this._lbCurScore, global.zOrder.Label);
        this._lbCurScore.setPosition(cc.ccp(this.winSize.width - 100, this.winSize.height - 60));
        
        // time
        this._lbTime = cc.LabelBMFont.create("Time: 00:00", s_futura_fnt);
        //this._lbTime.setColor(cc.RED());
        this._lbTime.setScale(0.5);
        this.addChild(this._lbTime, global.zOrder.Label);
        this._lbTime.setPosition(cc.ccp(this.winSize.width - 100, this.winSize.height - 90));

        // round count
        this._lbRound = cc.LabelBMFont.create("Round: 0", s_futura_fnt);
        this._lbRound.setScale(0.5);
        this._lbRound.setPosition(cc.ccp(60, this.winSize.height-100));
        //this._lbRound.setColor(cc.RED());
        this.addChild(this._lbRound, global.zOrder.Label);
    },
    initTimeCounter: function () {
        var that = this;
        if(this._time_limit >= 0)
        {
            this._roundInterval = setInterval(
                function(){
                    that._time_limit--;
                    that._lbTime.setString("Time: 00:"+that._time_limit);
                },
                1000
            );
        }
    },
    
    initHook: function () {
        //hook1初始化
        this._hook = new Hook();
        this.addChild(this._hook, global.zOrder.Hook);
        this._hook.setAnchorPoint(new cc.ccp(0.5, 1));
        this._hook.setPosition(cc.ccp(413, 460));
        this._hook.originPosition = cc.ccp(413, 460);
        this._hook.scheduleUpdate();
        this._criticalAngle = Math.atan((this.winSize.width/2)/(this.winSize.height-50))/Math.PI*180;
        //半对角线路径长度
        this._hook_path = Math.sqrt(Math.pow(this._hook.getPosition().x, 2) + Math.pow(this._hook.getPosition().y, 2));
        //hook2初始化
        this._hook2 = new Hook();
        this.addChild(this._hook2, global.zOrder.Hook);
        this._hook2.setAnchorPoint(new cc.ccp(0.5, 1));
        this._hook2.setPosition(cc.ccp(380, 457));
        this._hook2.originPosition = cc.ccp(380, 457);
        this._hook2.scheduleUpdate();
    },
    
    createMap: function () {
        var levelManager = new LevelManager(this);
        levelManager.createMap();
    },

    createTools: function () {
        var map = this.shelfMap;
        for (var i = 0; i < Game.toolContainer.length; i++) {
            if (Game.toolContainer[i] != null) {
                var object = {};
                object.type = Game.toolContainer[i].type;
                object.x = map[i].x;
                object.y = map[i].y;
                var type = getObjectName(object.type);
                var tool = new ToolType[type].create(object);
                Game.toolContainer[i] = tool;
                tool.setScale(0.2);
                this.addChild(tool, global.zOrder.Tool);

                if (tool.type != global.Tag.Bombshell) tool.onUse();
                if (tool.type == global.Tag.Scan) tool.onUse();
            }
        }
    },
    
    initShelfMap: function () {
        this.shelfMap = [
            {x: 40, y: 460},
            {x: 40, y: 435},
            {x: 40, y: 410},
            {x: 85, y: 460},
            {x: 85, y: 435},
            {x: 85, y: 410}
        ];
    },
    
    reOrderToolContainer: function () {
        var toolManager = new ToolManager(this);
        toolManager.cleanToolContainer();
        for (var i = 0; i < Game.toolContainer.length; i++) {
            if (!cc.Point.CCPointEqualToPoint(Game.toolContainer[i].getPosition(), cc.ccp(this.shelfMap[i].x, this.shelfMap[i].y))) {
                var action = cc.MoveTo.create(0.1, cc.ccp(this.shelfMap[i].x, this.shelfMap[i].y));
                Game.toolContainer[i].runAction(action);
            }
        }
    },
        
    ccTouchesBegan:function (touches, event) {
        var touchPos = touches[0].locationInView(0);
        if(touchPos.x > this.winSize.width / 2)
        {
            if (this._hook.state == "swing") {
                this._hook.launch(this.getDstPoint(1));
            }
            if(this._hook.state == "retrieve"){
                var con = Game.toolContainer;
                for (var i = con.length - 1; i >= 0; i--) {
                    if(con[i].type == global.Tag.Bombshell){

                        con[i].onUse(1);
                    }
                };
            }
        }
        else if(touchPos.x < this.winSize.width / 2){
            if (this._hook2.state == "swing") {
                this._hook2.launch(this.getDstPoint(2));
            }   
            if(this._hook2.state == "retrieve"){
                var con = Game.toolContainer;
                for (var i = con.length - 1; i >= 0; i--) {
                    if(con[i].type == global.Tag.Bombshell){
                        con[i].onUse(2);
                    }
                };
            }
        }

    },

    draw: function () {
        this._super();
        //cc.renderContext.lineWidth = 2;
        cc.renderContext.strokeStyle = "#3f3e3e";
        cc.drawingUtil.drawLine(this._hook.getOriginPosition(), this._hook.getPosition());
        cc.drawingUtil.drawLine(this._hook2.getOriginPosition(), this._hook2.getPosition());
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

        if (this.mineContainer.length == 0) {
            Game.round++;
            Game.cur_score = this._cur_score;
            this.onNextGame()
        }
    },
    
    update:function (dt) {
        this.onTimeLimit();
        this.checkCollision();
        this.checkCollision2();
        if (this.collectAction && this.collectAction.isDone()) {
            if (this.collectedObject != null) {
                //this.collectedObject.setIsVisible(false);
                this.updateScore(this.collectedObject.getValue());
                this.showMineValue(this.collectedObject);
                //this.removeChild(this.collectedObject);
                this.collectedObject = null;
                this.collectAction = null;
            }
        }
        if (this.collectAction2 && this.collectAction2.isDone()) {
            if (this.collectedObject2 != null) {
                //this.collectedObject.setIsVisible(false);
                this.updateScore(this.collectedObject2.getValue());
                this.showMineValue(this.collectedObject2);
                //this.removeChild(this.collectedObject);
                this.collectedObject2 = null;
                this.collectAction2 = null;
                
            }
        }
    },
        
    getDstPoint: function (hookNum) {
        var hook;
        if (hookNum == 1) 
            hook = this._hook;
        else if(hookNum ==2)
            hook = this._hook2;
        var size = cc.Director.sharedDirector().getWinSize();
        //var mx = size.width / 2;
        //var my = size.height - 50;
        var mx = hook.getPosition().x;
        var my = hook.getPosition().y;
        var desX = null;
        var desY = null;
        var border = 10;

        if (hook.state == "swing") {
            hook.stopSwing();
            var angle = hook.getRotation();
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
        if (this._hook.getState() == "launch") {
            var distance = null;
            for (var i=0; i<this.mineContainer.length; i++) {
                if (this.mineContainer[i] != null) {
                    var xlen = Math.pow(this._hook.getPositionX() - this.mineContainer[i].getPositionX(), 2);
                    var ylen = Math.pow(this._hook.getPositionY() - this.mineContainer[i].getPositionY(), 2);
                
                    distance = Math.sqrt(xlen + ylen);
                    if (distance < this.mineContainer[i].getCollisionLength()/2) {
                        if (this.mineContainer[i].type == global.Tag.Pig)
                            this.mineContainer[i].stopAllActions();

                        // 计算速度，path为物体位置到回收点的距离，this._hook_path为钩子的绳子最长长度
                        var path = Math.sqrt(Math.pow(this.mineContainer[i].getPositionX() - this._hook.getCollectPosition().x, 2)
                            + Math.pow(this.mineContainer[i].getPositionY() - this._hook.getCollectPosition().y, 2))
                        var speed = (this.mineContainer[i].weight/100) * (path/this._hook_path) * Game.Speed.retrieve * 2;

                        this.mineContainer[i].setPosition(cc.ccp(this._hook.getPositionX(), this._hook.getPositionY()));
                        
                        // 创建物体的返回动作
                        this.mineContainer[i].collectAction = cc.MoveTo.create(speed, this._hook.getCollectPosition());
                        this.collectAction = this.mineContainer[i].collectAction;
                        this.mineContainer[i].runAction(this.mineContainer[i].collectAction);
                        this.collectedObject = this.mineContainer[i];
                        
                        this.popMineObject(i);
                        this._hook.retrieve(speed);
                    }
                }
            }
        }
    },

    checkCollision2: function () {
        if (this._hook2.getState() == "launch") {
            var distance = null;
            for (var i=0; i<this.mineContainer.length; i++) {
                if (this.mineContainer[i] != null) {
                    var xlen = Math.pow(this._hook2.getPositionX() - this.mineContainer[i].getPositionX(), 2);
                    var ylen = Math.pow(this._hook2.getPositionY() - this.mineContainer[i].getPositionY(), 2);
                
                    distance = Math.sqrt(xlen + ylen);
                    if (distance < this.mineContainer[i].getCollisionLength()/2) {
                        if (this.mineContainer[i].type == global.Tag.Pig)
                            this.mineContainer[i].stopAllActions();

                        // 计算速度，path为物体位置到回收点的距离，this._hook_path为钩子的绳子最长长度
                        var path = Math.sqrt(Math.pow(this.mineContainer[i].getPositionX() - this._hook2.getCollectPosition().x, 2)
                            + Math.pow(this.mineContainer[i].getPositionY() - this._hook2.getCollectPosition().y, 2))
                        var speed = (this.mineContainer[i].weight/100) * (path/this._hook_path) * Game.Speed.retrieve * 2;

                        this.mineContainer[i].setPosition(cc.ccp(this._hook2.getPositionX(), this._hook2.getPositionY()));
                        
                        // 创建物体的返回动作
                        this.mineContainer[i].collectAction = cc.MoveTo.create(speed, this._hook2.getCollectPosition());
                        this.collectAction2 = this.mineContainer[i].collectAction;
                        this.mineContainer[i].runAction(this.mineContainer[i].collectAction);
                        this.collectedObject2 = this.mineContainer[i];
                        
                        this.popMineObject(i);
                        this._hook2.retrieve(speed);
                    }
                }
            }
        }
    },

    showMineValue: function (obj) {
        var stringToShow;
        if(obj.type >= 900 && obj.type <=905){
            stringToShow = "+"+obj.getValue().toString();
        }
        else if(obj.type >= 912 && obj.type <= 916 ){
            console.log(obj.type);
            switch(obj.type){
                case 912:
                    stringToShow = "+10 seconds!";
                    break;
                /*case 913:
                case 914:
                    stringToShow = "Nothing there...";
                    break;*/
                case 915:
                    stringToShow = "Hook error!";
                    break;
                case 916:
                    stringToShow = "Scanning";
                    break;
            }
        }
        var showBoard = cc.LabelBMFont.create(stringToShow, s_futura_fnt);
        showBoard.setPosition(cc.ccp(winSize.width/2 , winSize.height-100));
        this.addChild(showBoard,50);
        setTimeout(function(){showBoard.setIsVisible(false);},1000); 
    },
    
    popMineObject: function (index) {
        var container = [];
        var j = 0;
        for (var i = 0; i < this.mineContainer.length; i++) {
            if (i == index) continue;
            container[j++] = this.mineContainer[i]
        }
        this.mineContainer = container;
    },
   
    onTimeLimit: function () {
        if (this._time_limit <= 0 && this._cur_score < this._dst_score) {
            this.onGameOver();
        } else if (this._time_limit <= 0 && this._cur_score >= this._dst_score) {
            Game.round++;
            Game.cur_score = this._cur_score;
            this.onNextGame();
        }
    },
    
    onGameOver:function () {
        saveRecord(this._cur_score);
		Game.resume();
        var scene = cc.Scene.create();
        scene.addChild(GameOverLayer.create());
        scene.addChild(GameControlMenu.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2, scene));
        this.getParent().removeChild(this);
    },
    
    onNextGame: function () {
        Game.cleanToolObjects();
		//saveRecord(this._cur_score);
        /*if (Game.round == 6) {
            if (Game.unlock + 1 <= NUMBER_OF_MISSIONS) {
                Game.unlock++;
                if(typeof(Storage)!=="undefined") {
                    if (Game.unlock > Number(localStorage.unlock)) localStorage.unlock = Game.unlock;
                } else {
                    console.error("Sorry! No web storage support..");
                }
            }
        }
    
        if (Game.round != NUMBER_OF_ROUNDS) {*/
            var scene = cc.Scene.create();
            scene.addChild(StoreLayer.create());
            scene.addChild(GameControlMenu.create());
            cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2, scene));
            this.getParent().removeChild(this);/*
        } else {
            var scene = cc.Scene.create();
            scene.addChild(MissionLayer.create());
            scene.addChild(GameControlMenu.create());
            //MissionLayer.moveToMission(Game.mission);
            cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2, scene));
            this.getParent().removeChild(this);
        }*/
        
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
