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

    ctor: function () {
        this._super();
        this.initWithFile(global.theme.hook);
        
        this.rotateSpeed = Game.Speed.rotate;
        this.launchSpeed = Game.Speed.launch;
        this.retrieveSpeed = Game.Speed.retrieve;
        
        this.swing();
    },
    
    swing: function () {
        if (this.state == "retrieve" && this.retrieveAction
            && this.retrieveAction.isDone() || this.state == "init") {
            this.state = "swing";
            this.setRotation(0);
            //this.retrieveSpeed = Game.Speed.retrieve; // resume
            this.rotateSpeed = Game.Speed.rotate;
            var rotoLeft = cc.RotateTo.create(this.rotateSpeed, this.rotateLimit);
            var rotoRight = cc.RotateTo.create(this.rotateSpeed, -this.rotateLimit);
            var seq = cc.Sequence.create(rotoLeft, cc.DelayTime.create(0.1), rotoRight, cc.DelayTime.create(0.1));
            this.swingAction = cc.RepeatForever.create(seq);
            this.runAction(this.swingAction);
        } else {
            console.error("Swing could only started from after either a retrieve or init state.");
        }
    },
    
    stopSwing: function () {
        if (this.state == "swing") {
            this.stopAction(this.swingAction);
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
    
    update:function(){
        if (this.launchAction && this.launchAction.isDone()
            && this.state == "launch") {
            this.retrieve();
        } else if (this.retrieveAction && this.retrieveAction.isDone()
                    && this.state == "retrieve") {
            this.swing();
        }
    }    
});
