var StoreLayer = cc.Layer.extend({

    init:function () {
    },
    onAccept:function () {
        var scene = cc.Scene.create();
        scene.addChild(GameLayer.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2, scene));
        this.getParent().removeChild(this);
    }
});

StoreLayer.create = function () {
    var sg = new StoreLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

StoreLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = StoreLayer.create();
    scene.addChild(layer, 1);
    return scene;
};
