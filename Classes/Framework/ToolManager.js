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

    createTools: function() {
        var round = (this._currentRound - 1) % NUMBER_OF_ROUNDS;
        var map = this._layer.shelfMap;
        var tools = ["Milk1","Milk2","Longer","Bombshell","BoneToGold","RockToRich"];
        
        var object = {};
        var tool;
        var j = 0;
        for (var i = 0; i < round; i++) {
            if (Game.toolContainer[i] != null) continue;
            tool = tools[i];
            object.type = global.Tag[tool];
            object.x = map[j++].x;
            object.y = map[j++].y;
            console.log("ToolType: " + tool);
            object = new ToolObject(object);
            this._layer.addChild(object, global.zOrder.Tool);
        }
    },
    
    getTools: function () {
        var map = this._layer.shelfMap;
        console.log("getTools");
        console.log("lenght: " + Game.toolContainer.length);
        this.cleanToolContainer();
        for (var i = 0; i < Game.toolContainer.length; i++) {
            if (Game.toolContainer[i] != null) {
                var object = {};
                object.type = Game.toolContainer[i].type;
                object.x = map[i].x;
                object.y = map[i].y;
                var type = getObjectName(object.type);
                console.log("ToolCreate: "+ i + type); 
                var tool = new ToolType[type].create(object);
                Game.toolContainer[i] = null;
                Game.toolContainer[i] = tool;
                //Game.toolContainer[i].setPosition(cc.ccp(map[i].x, map[i].y));
                //Game.toolContainer[i]._parent_layer = this._layer;
                this._layer.addChild(tool, global.zOrder.Tool);
            }
        }
    },
    
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