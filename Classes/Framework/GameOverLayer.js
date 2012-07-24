var GameOverLayer = cc.Layer.extend({
    
    init:function () {
        var bRet = false;
        if (this._super) {
            var bg = cc.Sprite.create(global.theme.info_bg);
            bg.setAnchorPoint(cc.PointZero());
            this.addChild(bg, 0, 1);

            cc.MenuItemFont.setFontName("Arial");
            cc.MenuItemFont.setFontSize(26);
            var label = cc.LabelTTF.create("Replay", "Arial", 20);
            var back = cc.MenuItemLabel.create(label, this, this.onPlayAgain);
            var menu = cc.Menu.create(back);
            this.addChild(menu);

            bRet = true;
        }
        return bRet;
    },

    onPlayAgain:function (pSender) {
        resume();
        var scene = cc.Scene.create();
        scene.addChild(GameLayer.create());
        scene.addChild(GameControlMenu.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2,scene));
    }
});

GameOverLayer.create = function () {
    var sg = new GameOverLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

GameOverLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = GameOverLayer.create();
    scene.addChild(layer);
    return scene;
};
