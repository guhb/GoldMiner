Hook = cc.Sprite.extend({
    state: "init",
    rotateLimit: 80,
    rotateSpeed: 1,
    launchSpeed: 1,
    retrieveSpeed: 1,
    swingAction: null,
    launchAction: null,
    retrieveAction: null,
    originPosition: null,
    delegate: null,

    ctor: function () {
        this._super();
        this.initWithFile(global.theme.hook);
        
        this.initDelegate();
        this.setScale(0.6);
        this.rotateSpeed = Game.Speed.rotate;
        this.launchSpeed = Game.Speed.launch;
        this.retrieveSpeed = Game.Speed.retrieve;
        this.swing();
    },
    
    initDelegate: function () {
        this.delegate = new cc.Sprite.create(global.theme.hook);
        this.delegate.setScale(0.6);
        this.delegate.setIsVisible(false);
        this.delegate.setAnchorPoint(cc.ccp(0.5, 1));
    },
    
    swing: function () {
        if (this.state == "init") {
            this.state = "swing";
            this.setRotation(0);
            this.rotateSpeed = Game.Speed.rotate;
            var rotoLeft = cc.RotateTo.create(this.rotateSpeed, this.rotateLimit);
            var rotoRight = cc.RotateTo.create(this.rotateSpeed, -this.rotateLimit);
            var seq = cc.Sequence.create(rotoLeft, cc.DelayTime.create(0.1), rotoRight, cc.DelayTime.create(0.1));
            this.swingAction = cc.RepeatForever.create(seq);
            this.setIsVisible(false);
            this.delegate.setIsVisible(true);
            this.delegate.runAction(this.swingAction);
        } else if (this.state == "retrieve" && this.retrieveAction && this.retrieveAction.isDone()) {
            this.state = "swing";
            this.setIsVisible(false);
            this.delegate.setIsVisible(true);
            this.delegate.resumeSchedulerAndActions();
        } else {
            console.error("Swing could only started from after either a retrieve or init state.");
        }
    },
    
    stopSwing: function () {
        if (this.state == "swing") {
            this.delegate.pauseSchedulerAndActions();
            this.setRotation(this.delegate.getRotation());
            this.delegate.setIsVisible(false);
            this.setIsVisible(true);
        } else {
            console.error("Could not stop swing other than in a swing state.");
        }
    },
    
    launch: function (dstPoint) {
        if (this.state == "swing") {
            this.state = "launch";
            this.launchSpeed = Game.Speed.launch;
            this.launchAction = cc.MoveTo.create(this.launchSpeed, dstPoint);
            this.runAction(this.launchAction);
        } else {
            console.error("Launch could only be started from a swing state.");
        }
    },
    
    stopLaunch: function () {
        if (this.state == "launch") {
            this.stopAction(this.launchAction);
        } else {
            console.error("Could not stop a launch state other than in a launch state.");
        }
    },
    
    retrieve: function () {
        if (this.lauchAction && this.launchAction.isDone() || this.state == "launch") {
            this.state = "retrieve";
            this.stopAction(this.launchAction);
            this.retrieveSpeed = Game.Speed.retrieve;
            this.retrieveAction = cc.MoveTo.create(this.retrieveSpeed, this.originPosition);
            this.runAction(this.retrieveAction);
        } else {
            console.error("Retrieve could only be started from a launch state, or when the launch is finished");
        }
    },
    
    getState: function () {
        return this.state;
    },
    
    setRetrieveSpeed: function (sp) {
        if (sp && (sp > 0)) this.retrieveSpeed = sp;
    },
    
    getRetrieveSpeed: function () {
        return this.retrieveSpeed;
    },
    
    getOriginPosition: function () {
        return this.originPosition;
    },
    
    getPositionX: function () {
        return this.getPosition().x - Math.sin(this.delegate.getRotation()*Math.PI/180) * this.getContentSize().height * this.getScale();
    },
    
    getPositionY: function () {
        return this.getPosition().y - Math.cos(this.delegate.getRotation()*Math.PI/180) * this.getContentSize().height * this.getScale();
    },
    
    getCollectPosition: function () {
        var x = this.getOriginPosition().x - Math.sin(this.delegate.getRotation()*Math.PI/180) * this.getContentSize().height * this.getScale();
        var y = this.getOriginPosition().y - Math.cos(this.delegate.getRotation()*Math.PI/180) * this.getContentSize().height * this.getScale();
        return cc.ccp(x, y);
    },
    
    update:function(){
        if (this.launchAction && this.launchAction.isDone()
            && this.state == "launch") {
            Game.Speed.retrieve = 1;
            this.retrieve();
        } else if (this.retrieveAction && this.retrieveAction.isDone()
                    && this.state == "retrieve") {
            this.swing();
        }
        if (this.delegate.getParent() == null) {
            this.getParent().addChild(this.delegate, this.getZOrder() + 1);
        }
        if (!cc.Point.CCPointEqualToPoint(this.getPosition(), this.delegate.getPosition))
            this.delegate.setPosition(this.getPosition());
    }    
});
