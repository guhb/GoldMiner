Hook = cc.Sprite.extend({
    state: "swing",
    rotateSpeed: 1,
    throwSpeed: 2,
    retrieveSpeed: 1,
    swingAction: null,
    throwAction: null,
    retrieveAction: null,
    originPosition: null,
    dstPosition: null,

    ctor: function () {
        // TODO animation, etc.
        /*
        hookTexture = cc.TextureCache.sharedTextureCache().addImage(s_hook);
        this.initWithTexture(hookTexture, cc.RectMake(0,0,20,20));
        this.setTag(this.zOrder);
        this.setPosition(this.appearPosition);
        
        // add animation
        
        */
        this._super();
        this.initWithFile(s_hook);
        
        // Swing Action
        var rotoLeft = cc.RotateTo.create(rotateSpeed, 90);
        var rotoRight = cc.RotateTo.create(rotateSpeed, -90);
        var seq = cc.Sequence.create(rotoLeft, cc.DelayTime.create(0.1), rotoLeft, cc.DelayTime.create(0.1));
        this.swingAction = cc.RepeatForever.create(seq, null);
        
        //this.originPosition = this.getPosition();
        this.swing();
    },
    swing: function () {
        this.state = "swing";
        this.runAction(this.swingAction);
    },
    stopSwing: function () {
        this.stopAction(this.swingAction);
    },
    throw: function (dstPoint) {
        this.state = "throw";
        this.dstPosition = dstPoint;
        this.throwAction = cc.MoveTo.create(this.throwSpeed, dstPoint);
        this.runAction(this.throwAction);
    },
    stopThrow: function () {
        this.stopAction(this.throwAction);
    },
    retrieve: function () {
        this.state = "retrieve";
        this.stopAction(this.throwAction);
        this.retrieveAction = cc.MoveTo.create(this.retrieveSpeed, this.originPosition);
        this.runAction(this.retrieveAction);
    },
    /*
    draw: function () {
       this._super();
       var size = cc.Director.sharedDirector().getWinSize();
       var lineWidth = cc.renderContext.lineWidth;
       cc.renderContext.lineWidth = 10;
       cc.drawingUtil.drawLine(this.getPosition(),new cc.ccp(10,10));
           //console.log("Point1" + size.width/2 + size.height-50 +
           //"Point2" + this.getPosition.x + this.getPosition.y);
       cc.renderContext.lineWidth = lineWidth;
    },*/
    update:function(){
        if (this.throwAction && this.throwAction.isDone()
            && this.state == "throw") {
            //console.log(this.throwAction);
            this.retrieveHander();
        } else if (this.retrieveAction && this.retrieveAction.isDone()
                    && this.state == "retrieve") {
            this.state = "swing";
            this.swing();
        }
    }    
});
