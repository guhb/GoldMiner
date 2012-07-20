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

            if (global.sound) {
                cc.AudioManager.sharedEngine().playBackgroundMusic(s_bgMusic, true);
            }

            bRet = true;
        }

        return bRet;
    },

    ccTouchesBegan:function (touches, event) {
        if (this._hook.state == "swing") {
            this._hook.launch(this.getDstPoint());
        }
    },
    
    ccTouchesEnded:function () {
        //this.isMouseDown = false;
    },
    
    keyDown:function (e) {
        keys[e] = true;
    },
    
    keyUp:function (e) {
        keys[e] = false;
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