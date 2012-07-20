var GameOverLayer = cc.Layer.extend({
    _ship:null,
    _lbScore:0,
    init:function () {
        var bRet = false;
        if (this._super) {
            global.mineContainer = [];
            var sp = cc.Sprite.create(s_background2);
            sp.setAnchorPoint(cc.PointZero());
            this.addChild(sp, 0, 1);

            cc.MenuItemFont.setFontName("Arial");
            cc.MenuItemFont.setFontSize(26);
            var label = cc.LabelTTF.create("Replay", "Arial", 20);
            var back = cc.MenuItemLabel.create(label, this, this.onPlayAgain);
            back.setScale(0.8);

            var menu = cc.Menu.create(back);
            menu.alignItemsInColumns(1);
            this.addChild(menu);

            var cp_back = back.getPosition();
            cp_back.y -= 50.0;
            back.setPosition(cp_back);
            
                        
            // accept touch now!
            this.setIsTouchEnabled(true);

            //accept keypad
            this.setIsKeypadEnabled(true);

            // schedule
            this.schedule(this.update);
            //this.schedule(this.scoreCounter, 1);

            if(global.sound){
                cc.AudioManager.sharedEngine().playBackgroundMusic(s_mainMainMusic)
            }

            bRet = true;
        }
        return bRet;
    },

    onPlayAgain:function (pSender) {
        global.resume();
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
