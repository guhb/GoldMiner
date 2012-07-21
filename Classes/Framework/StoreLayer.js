var StoreLayer = cc.Layer.extend({

    init:function () {
        var bRet = false;
            if (this._super()) {
            // background
            winSize = cc.Director.sharedDirector().getWinSize();
            var bg = cc.Sprite.create(s_background);
            //bg.setAnchorPoint(cc.ccp(0, 0));
            bg.setPosition(winSize.width/2, winSize.height - 50);
            this.addChild(bg, -10);
            
            var acceptNormal = cc.Sprite.create(s_start_menu, cc.RectMake(0, 0, 250, 210));
            var acceptSelected = cc.Sprite.create(s_start_menu, cc.RectMake(0, 210, 250, 210));
            var acceptDisabled = cc.Sprite.create(s_start_menu, cc.RectMake(0, 420, 250, 210));
            
            var accept = cc.MenuItemSprite.create(acceptNormal, acceptSelected, acceptDisabled, this, this.onAccept);
            var menu = cc.Menu.create(accept);
            menu.setScale(0.4);
            this.addChild(menu, 1, 2);
            menu.setAnchorPoint(cc.ccp(0,0));
            menu.setPosition(cc.ccp(winSize.width / 2, winSize.height / 2 - 80));
            
            this.createTools();
            
            this.setIsTouchEnabled(true);
            this.setIsKeypadEnabled(true);

            if (global.sound) {
                cc.AudioManager.sharedEngine().playBackgroundMusic(s_bgMusic, true);
            }
            bRet = true;
        }
        return bRet;
    },
    
    createTools: function () {
        var toolManager = new ToolManager(this);
        toolManager.createTools();
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
