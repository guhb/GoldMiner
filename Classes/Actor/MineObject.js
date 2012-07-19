MineObject = cc.Sprite.extend({
    type: null,
    weight: 0,
    size: 0,
    value: 0,
    action: null,
    
    ctor: function (object, size) {
        var type = getTagName(object.type);
        switch (type) {
            case "Rock":
            case "Gold":
            case "Diamond":
                if (size = 1) {
                    //console.log("type:" + type);
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
                //console.log("type:" + type);
                this.initWithFile(MineType[type].image);
                this.value = MineType[type].value;
                this.weight = MineType[type].weight;
                break;
        }
    },
    
    getValue: function () {
        return this.value;
    },
    
    getWeight: function () {
        return this.weight;
    }
});