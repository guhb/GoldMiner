var SplashLayer = cc.Layer.extend({
    
    init: function () {
        var bRet = false;
        if (this._super) {
            //this._background = cc.Sprite.create(s_splash_background);
            //this._background.setAnchorPoint(cc.PointZero());
            //this.addChild(this.background, -10);
            
            // TODO: animation
            
            //this.gotoStartLayer();
            var p = this;
            setTimeout(function () {
                p.gotoStartLayer(),
                2 * 1000
            });
            bRet = true;
        }
        return bRet;
	},
    gotoStartLayer: function () {
        var scene = cc.Scene.create();
        scene.addChild(StartLayer.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2, scene));
        //this.getParent().removeChild(this);
    }
});

SplashLayer.create = function () {
    var sg = new SplashLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

SplashLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = SplashLayer.create();
    scene.addChild(layer, 1);
    return scene;
};