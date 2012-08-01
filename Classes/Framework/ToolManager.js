var ToolManager = cc.Class.extend({
    _currentRound:null,
    _layer:null,
    ctor: function(storeLayer) {
        if (!storeLayer) {
            throw "storeLayer must be non-nil";
        }
        this._currentRound = Game.round;
        this._layer = storeLayer;
    },

    // 在StoreLayer里面调用，生成商店里面的商品
    createTools: function() {
        //this.cleanToolContainer();
        Game.toolContainer = [];
        var round = (this._currentRound - 1) % NUMBER_OF_ROUNDS;
        var map = this._layer.shelfMap;
        var tools = ["Milk1","Milk2","Longer","Bombshell","BoneToGold","RockToRich"];
        

        var j = 0;
        round = 6; // 测试用，以生成6个道具
        for (var i = 0; i < round; i++) {
            //if (Game.toolContainer[i] != null) continue;
            var object = {};
            var tool = tools[i];
            object.type = global.Tag[tool];
            object.x = map[j].x;
            object.y = map[j].y;
            object = new ToolObject(object);
            object.setScale(0.5);
            this._layer.addChild(object, global.zOrder.Tool);
            j++;
        }
    },
    
    // 在GameLayer里面调用，获取已购买的商品，除炸弹之外，获取后立即使用
    getTools: function () {
        var map = this._layer.shelfMap;
        //console.log("getTools");
        //console.log("lenght: " + Game.toolContainer.length);
        this.cleanToolContainer();
        for (var i = 0; i < Game.toolContainer.length; i++) {
            if (Game.toolContainer[i] != null) {
                var object = {};
                object.type = Game.toolContainer[i].type;
                object.x = map[i].x;
                object.y = map[i].y;
                var type = getObjectName(object.type);
                //console.log("ToolCreate: "+ i + type); 
                var tool = new ToolType[type].create(object);
                //Game.toolContainer[i] = null;
                Game.toolContainer[i] = tool;
                tool.setScale(0.2);
                this._layer.addChild(tool, global.zOrder.Tool);

                if (tool.type != global.Tag.Bombshell) tool.onUse();
            }
        }
    },

    // 清理已使用的物品
    cleanToolContainer: function () {
        var container = [];
        var j = 0;
        for (var i = 0; i < Game.toolContainer.length; i++) {
            if (Game.toolContainer[i] != null)
                container[j++] = Game.toolContainer[i];
        }
        Game.toolContainer = container;
    }
});