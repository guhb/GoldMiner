MineObject = cc.Sprite.extend({
    type: null,
    weight: 0,
    size: 0,
    value: 0,
    action: null,
    zOrder: 0,
    //move: false,
    
    ctor: function (object, size) {
        var type = getTagName(object.type);
        var MineType = global.MineType;
        switch (type) {
            case "Rock":
            case "Gold":
            case "Diamond":
                if (size = 1) {
                    this.initWithFile(MineType[type].big.image);
                    this.value = MineType[type].big.value;
                    this.weight = MineType[type].big.weight;
                } else {
                    this.initWithFile(MineType[type].small.image);
                    this.value = MineType[type].small.value;
                    this.weight = MineType[type].small.weight;
                }
                this.setPosition(cc.ccp(object.x, object.y));
                this.type = object.type;
                break;
            case "Bone":
            case "Bomb":
            case "Pig":
                this.initWithFile(MineType[type].image);
                this.value = MineType[type].value;
                this.weight = MineType[type].weight;
                this.setPosition(cc.ccp(object.x, object.y));
                this.type = object.type;
                break;
        }
        this.zOrder = global.zOrder[type];
        console.log(this.zOrder);
        //this.scheduleUpdate();
    },
    /*
    update: function () {
        if (this.move && this.action != null) {
            this.runAction(this.action);
            this.move = false;
        }
    },*/
    
    getValue: function () {
        return this.value;
    },
    
    getWeight: function () {
        return this.weight;
    }
});