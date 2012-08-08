var SplashLayer = cc.Layer.extend({
    _background: null,
    init: function () {
        this._background = cc.Sprite.create(s_splash_background);
        this._background.setAnchorPoint(cc.PointZero());
        this.addChild(this.background, -10);
        
        // TODO: animation
        
        gotoStartLayer();
	},
    gotoStartLayer: function () {
        var scene = cc.Scene.create();
        scene.addChild(StartLayer.create());
        cc.Director.sharedDirctor().replaceScene(cc.TransitionFade.create(1.2, scene));
        this.getParent().removeChild(this);
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