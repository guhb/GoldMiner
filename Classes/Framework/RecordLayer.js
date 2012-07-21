var RecordLayer = cc.Layer.extend({
    
    init:function () {
        var bRet = false;
        if (this._super()) {
            var sp = cc.Sprite.create(s_background2);
            sp.setAnchorPoint(cc.PointZero());
            this.addChild(sp, 0, 1);

            cc.MenuItemFont.setFontName("Arial");
            cc.MenuItemFont.setFontSize(26);
            var label = cc.LabelTTF.create("Go back", "Arial", 20);
            var back = cc.MenuItemLabel.create(label, this, this.onReturn);

            var menu = cc.Menu.create(back);
            this.addChild(menu);

            bRet = true;
        }

        return bRet;
    },
    
    onAccept: function () {
        var scene = cc.Scene.create();
        scene.addChild(GameLayer.create());
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

RecordLayer.create = function () {
    var sg = new RecordLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

RecordLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = RecordLayer.create();
    scene.addChild(layer, 1);
    return scene;
};