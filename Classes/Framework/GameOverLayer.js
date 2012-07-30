var GameOverLayer = cc.Layer.extend({
    
    init:function () {
        var bRet = false;
        if (this._super) {
            var bg = cc.Sprite.create(global.theme.info_bg);
            bg.setAnchorPoint(cc.PointZero());
            this.addChild(bg, 0, 1);

            var winSize = cc.Director.sharedDirector().getWinSize();
			
			var replay = cc.Sprite.create(s_replay);
			var replaySelected = cc.Sprite.create(s_replaybig);
			var replayDisabled = cc.Sprite.create(s_replay);
			var replayItem = cc.MenuItemSprite.create(replay,replaySelected,replayDisabled,this,this.onPlayAgain);
            var menu = cc.Menu.create(replayItem);
            this.addChild(menu);

            bRet = true;
        }
        return bRet;
    },

    onPlayAgain:function (pSender) {
        resume();
        var scene = cc.Scene.create();
        scene.addChild(MissionLayer.create());
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
