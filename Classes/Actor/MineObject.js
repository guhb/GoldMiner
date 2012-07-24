MineObject = cc.Sprite.extend({
    type: null,
    weight: 0,
    size: 0,
    value: 0,
    action: null,
    zOrder: 0,
    
    ctor: function (object, size) {
        var type = getObjectName(object.type);
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
                this.initWithFile(MineType[type].image);
                this.value = MineType[type].value;
                this.weight = MineType[type].weight;
                this.setPosition(cc.ccp(object.x, object.y));
                this.type = object.type;
                break;
            case "Pig":
                this.initWithFile(MineType[type].image);
                this.value = MineType[type].value;
                this.weight = MineType[type].weight;
                this.setPosition(cc.ccp(object.x, object.y));
                this.type = object.type;
                var point1 = cc.ccp(object.x, object.y);
                var point2 = cc.ccp(winSize.width - object.x, object.y2);
                if (!cc.Point.CCPointEqualToPoint(point1, point2)) {
                    var duration = Math.abs((point2.x -point1.x))/winSize.width * 10;
                    var tmpMove1 = cc.MoveTo.create(duration, point2);
                    var tmpMove2 = cc.MoveTo.create(duration, point1);
                    var seq = cc.Sequence.create(tmpMove1, cc.DelayTime.create(0.2),
                    cc.FlipX.create(true), tmpMove2, cc.DelayTime.create(0.2), cc.FlipX.create(false));
                    this.action = cc.RepeatForever.create(seq, null);
                    this.runAction(this.action);
                }
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