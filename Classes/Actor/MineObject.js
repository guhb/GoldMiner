MineObject = cc.Sprite.extend({
    type: null,
	weight: 0,
    size: 0,
    value: 0,
    
	create: function (object, size) {
        this.type = object.type;
        if (size = 1) {
            this.value = MineType[type].big.value;
            this.weight = MineType[type].big.weight;
            this.initWithFile(MineType[type].big.image);
        } else {
            this.value = MineType[type].small.value;
            this.weight = MineType[type].small.weight;
            this.initWithFile(MineType[type].small.image);
        }
        this.setPositon(object.pos);
	},
	getValue: function () {
	    return this.value;
	},
    getWeight: function () {
        return this.weight;
    }
});
