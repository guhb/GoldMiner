ToolObject = cc.Sprite.extend({
    type: null,
    zOrder: 0,
    
    ctor: function (object) {
        var type = getObjectName(object.type);
        this.type = type;
        console.log(type);
        this.initWithFile(ToolType[type].image);
        this.zOrder = global.zOrder[type];
        this.setAnchorPoint(cc.ccp(0,0));
        this.setPosition(cc.ccp(object.x, object.y));
    },
    
    use: function () {
        console.log("use tool");
        switch (this.type) {
            case "Milk":
                global.Speed.launch += ToolType.Milk.LaunchSpeed;
                global.Speed.retrieve += ToolType.Milk.RetrieveSpeed;
                break;
            case "Clock":
                global.Speed.rotate += ToolType.Clock.RotateSpeed;
                break;
            case "MoneyTree":
                global.Factor.add = ToolType.MoneyTree.addValue;
                global.Factor.multiply = ToolType.MoneyTree.Multiply;
                break;
            case "Rich":
                global.Factor.probility = ToolType.Rich.Probility;
                break;
        }
    }
});
