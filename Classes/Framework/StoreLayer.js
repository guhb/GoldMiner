var StoreLayer = cc.Layer.extend({

    init:function () {
        var bRet = false;
            if (this._super()) {
            // background
            var bg = cc.Sprite.create(s_background);
            bg.setAnchorPoint(cc.PointZero());
            this.addChild(bg, 0, 1);
            
            var acceptNormal = cc.Sprite.create(s_accept, cc.RectMake(0, 0, 200, 140));
            var acceptSelected = cc.Sprite.create(s_accept, cc.RectMake(200, 0, 200, 140));
            var acceptDisabled = cc.Sprite.create(s_accept, cc.RectMake(400, 0, 200, 140));
            
            var accept = cc.MenuItemSprite.create(acceptNormal, acceptSelected, acceptDisabled, this, this.onAccept);
            var menu = cc.Menu.create(accept);
            this.addChild(menu, 1, 2);
            menu.setPosition(cc.ccp(304, 142));
            
            this.createTools();

            bRet = true;
        }
        return bRet;
    },
    
    createTools: function () {
        var toolManager = new ToolManager(this);
        toolManager.createTools();
    },
    
    onAccept: function () {
        var scene = cc.Scene.create();
        scene.addChild(GameControlMenu.create());
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
