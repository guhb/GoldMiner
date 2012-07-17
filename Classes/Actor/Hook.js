Hook = cc.Sprite.extend({
    state: null,
    rotateSpeed: 1,
    throwSpeed: 5,
    retrieveSpeed: 5,
    argX: 0,
    argY: 0,
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
        
        this.originPosition = this.getPosition();
        this.swing();
    },
    swing: function () {
        this.state = "swing";
        this.runAction(this.swingAction);
    },
    stopSwing: function () {
        this.stopAction(this.swingAction);
    },
    throw: function (DstPoint) {
        this.state = "throw";
         // Throw Action
        this.throwAction = cc.MoveTo.create(this.throwSpeed,new cc.ccp(this.argX, this.argY));
        //this.throwAction = cc.MoveTo.create(this.throwSpeed, dstPosition);
        this.runAction(this.throwAction);
    },
    stopThrow: function () {
        this.stopAction(this.throwAction);
    },
    retrieve: function () {
        this.state = "retrieve";
        //this.stopThrow();
        this.retrieveAction = cc.MoveTo.create(this.RetrieveSpeed, new cc.ccp(0,0));
        //this.retrieveAction = cc.MoveTo.create(this.RetrieveSpeed, this.originPosition);
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
        //if (this.isRotate) {
            //this.setRotation(this._currentRotation);
        /*} else {
        var len = cc.ccpDistance(new cc.Point(this.argX, this.argY), new cc.Point(0,0));
        if (this.len <= len) {
            this.len += this.speed;
            var scale = this.len/len;
            if (scale > 0.1) {
            console.log("HanderSprite->scaling");
            this.setScaleY(scale);
            }
        }
        }*/
        /*
        if (!this.isRotate) {
            this.stopAction(this.swingAction);
        console.log("isRotate:" + this.isRotate);
        }*/
    },
    destroy: function () {
        
    }       
});