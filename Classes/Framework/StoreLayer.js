var StoreLayer = cc.Layer.extend({
    shelfMap: null,
    
    init:function () {
        var bRet = false;
            if (this._super()) {
                // background
                var bg = cc.Sprite.create(s_shopbg);
                bg.setAnchorPoint(cc.PointZero());
                this.addChild(bg, 0, 1);

                // cur score
                this._lbCurScore = cc.LabelTTF.create("Score: " + Game.cur_score, cc.TEXT_ALIGNMENT_LEFT, "Arial", 14);
                this._lbCurScore.setColor(cc.RED());
                this.addChild(this._lbCurScore, global.zOrder.Label);
                this._lbCurScore.setPosition(cc.ccp(winSize.width - 100, winSize.height - 60));
                
                var acceptNormal = cc.Sprite.create(s_nextgame);
                var acceptSelected = cc.Sprite.create(s_nextgamebig);
                var acceptDisabled = cc.Sprite.create(s_nextgame);
                
                var accept = cc.MenuItemSprite.create(acceptNormal, acceptSelected, acceptDisabled, this, this.onAccept);
                var menu = cc.Menu.create(accept);
                this.addChild(menu, 1, 2);
                menu.setPosition(cc.ccp(154, 200));
                
                this.initShelfMap();
                this.createTools();
                this.scheduleUpdate();

                bRet = true;
            }
        return bRet;
    },

    update: function () {
        this._lbCurScore.setString("Score: " + Game.cur_score);
    },
    
    initShelfMap: function () {
        this.shelfMap = [
            {x: 470, y: 310},
            {x: 570, y: 310},
            {x: 670, y: 310},
            {x: 470, y: 370},
            {x: 570, y: 370},
            {x: 670, y: 370}
        ];
    },
    
    createTools: function () {
        var toolManager = new ToolManager(this);
        toolManager.createTools();
    },
    
    onAccept: function () {
        var scene = cc.Scene.create();
        scene.addChild(GameLayer.create());
        scene.addChild(GameControlMenu.create());
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
