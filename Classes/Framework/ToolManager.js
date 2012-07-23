var ToolManager = cc.Class.extend({
    _currentRound:null,
    _storeLayer:null,
    ctor:function(storeLayer){
        if(!storeLayer){
            throw "storeLayer must be non-nil";
        }
        this._currentRound = Game.round;
        this._storeLayer = storeLayer;
    },

    createTools:function(){
        var round = this._currentRound % NUMBER_OF_ROUNDS;
        Game.cleanToolObjects();
        var object = {};
        switch (round) {
            case 0:
            case 5:
                object.type = global.Tag.Rich;
                object.x = 620; object.y = 200;
                object = new ToolObject(object);
                this._storeLayer.addChild(object, global.zOrder.Tool);
            case 4:
                object.type = global.Tag.MoneyTree;
                object.x = 530; object.y = 200;
                object = new ToolObject(object);
                this._storeLayer.addChild(object, global.zOrder.Tool);
            case 3:
            case 2:
            case 1:
                object.type = global.Tag.Clock;
                object.x = 620; object.y = 270;
                object = new ToolObject(object);
                this._storeLayer.addChild(object, global.zOrder.Tool);
                
                object.type = global.Tag.Milk;
                object.x = 530; object.y = 270;
                object = new ToolObject(object);
                this._storeLayer.addChild(object, global.zOrder.Tool);
                break;
        }
    }
});