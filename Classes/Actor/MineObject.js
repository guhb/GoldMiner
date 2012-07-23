MineObject = cc.Sprite.extend({
    type: null,
    weight: 0,
    size: 0,
    value: 0,
    action: null,
    zOrder: 0,
    
    ctor: function (object, size) {
        var type = getObjectName(object.type);
        var MineType = Game.MineType;
        switch (type) {
            case "Rock":
            case "Gold":
            case "Diamond":
                if (size == 1) {
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
        this.scheduleUpdate();
    },
    
    getValue: function () {
        return this.value;
    },
    
    getWeight: function () {
        return this.weight;
    },
    
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition()
            ,cc.ccp(400, 430))
            && this.getIsVisible())
            this.setIsVisible(false);
    }
});