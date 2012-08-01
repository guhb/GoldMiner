var StoreLayer = cc.Layer.extend({
    shelfMap: null,
    describeLabel: null,
    isMouseDown: false,
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
                menu.setPosition(cc.ccp(550, 150));
                
                this.describeLabel = cc.LabelTTF.create(" ",
                    cc.SizeMake(300,200),cc.TEXT_ALIGNMENT_LEFT,'Arial',30
                    );
                this.describeLabel.setPosition(cc.ccp(110,170));
                this.describeLabel.setColor(new cc.Color3B(0,0,0));
                this.describeLabel.setAnchorPoint(cc.PointZero());

                this.addChild(this.describeLabel,20);

                this.initShelfMap();
                this.createTools();
                this.scheduleUpdate();

                this.setIsTouchEnabled(true);
                bRet = true;
            }
        return bRet;
    },

    initShelfMap: function () {
        this.shelfMap = [
            // 货架
            {x: 470, y: 290},
            {x: 570, y: 290},
            {x: 670, y: 290},
            {x: 470, y: 350},
            {x: 570, y: 350},
            {x: 670, y: 350},

            // 购物篮
            {x: 130, y: 290},
            {x: 230, y: 290},
            {x: 330, y: 290},
            {x: 130, y: 350},
            {x: 230, y: 350},
            {x: 330, y: 350}
        ];
    },
    
    createTools: function () {
        Game.toolContainer = [];
        var round = (Game.round - 1) % NUMBER_OF_ROUNDS;
        var map = this.shelfMap;
        var types = ["Milk1","Milk2","Longer","Bombshell","BoneToGold","RockToRich"];

        var j = 0;
        round = 6; // 测试用，以生成6个道具
        for (var i = 0; i < round; i++) {
            var type = types[i];
            
            var tool = cc.Sprite.create(ToolType[type].image);
            tool.setScale(0.5);
            tool.type = global.Tag[type];
            tool.value = ToolType[type].value;
            tool.originPosition = cc.ccp(map[j].x, map[j].y);
            tool.setPosition(cc.ccp(map[j].x, map[j].y));
            this.addChild(tool, global.zOrder.Tool);
            j++;
        }
    },

    ccTouchesBegan: function (touches, event) {
        // TODO
    },

    ccTouchesMoved: function (touches, event) {
        // TODO
    },

    ccTouchesEnded: function (touches,event) {
        // Campare the touch point with shelfMap and DstMap to checkout which
        // Object is touched.
        var x = touches[0].locationInView(0).x;
        var y = touches[0].locationInView(0).y;
        var touchPosition = cc.ccp(0, 0);
        for (var i = 0; i < this.shelfMap.length; i++) {
            var distance = Math.sqrt(Math.pow(x - this.shelfMap[i].x, 2)
                                     + Math.pow(y - this.shelfMap[i].y, 2));
            if (distance < 20) {
                touchPosition = cc.ccp(this.shelfMap[i].x, this.shelfMap[i].y);
                break;
            }
        }

        var children = this.getChildren();
        for (var j = 0; j < children.length; j++) {
            if (cc.Point.CCPointEqualToPoint(children[j].getPosition(),
                                             touchPosition)) {
                this.touchedObject = children[j];
                if (i >= 0 && i <= 5) this.onBuy();
                else if (i >= 6 && i <= 11) this.onUnBuy();
                //else console.error("Unable to identify object.");
            }
        }
    },

    onBuy: function () {
        if (this.touchedObject.value <= Game.cur_score) {
            Game.cur_score -= this.touchedObject.value;
            Game.toolContainer.push(this.touchedObject);
            var action = cc.MoveTo.create(0.2, this.shelfMap[5+Game.toolContainer.length]);
            this.touchedObject.runAction(action);
        }
    },

    onUnBuy: function () {
        Game.cur_score += this.touchedObject.value;
        Game.popToolObject(this.touchedObject.type);
        var action = cc.MoveTo.create(0.2, this.touchedObject.originPosition);
        this.touchedObject.runAction(action);
        this.reOrderBuyedTools();
    },

    // 用来重新排列已经购买的工具
    reOrderBuyedTools: function () {
        for (var i = 0; i < Game.toolContainer.length; i++) {
            if (!cc.Point.CCPointEqualToPoint(Game.toolContainer[i].getPosition(),
                cc.ccp(this.shelfMap[6+i].x, this.shelfMap[6+i].y))) {
                var action = cc.MoveTo.create(0.2, cc.ccp(this.shelfMap[6+i].x,
                                              this.shelfMap[6+i].y));
                Game.toolContainer[i].runAction(action);
            }
        }
    },

    showIndication: function () {
        var indications = ["钩子回收速度x2",
                           "钩子回收速度x4",
                           "钩子变长更易瞄准",
                           "炸掉不需要的物品",
                           "所有石头变为金子",
                           "所有石头价格增加"];
        if (this.touchedObject != null) {
            var message = indications[this.touchedObject.type-global.Tag.Milk1];
            if (message) this.describeLabel.setString(message);
        }
           
    },
    
    update: function () {
        this._lbCurScore.setString("Score: " + Game.cur_score);
        this.showIndication();
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
