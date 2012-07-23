var ToolObject = cc.Layer.extend({
    type: null,
    useAction: null,
    ctor:function (object) {
            var type = getObjectName(object.type);
            this.type = object.type;
        
            var toolNormal = cc.Sprite.create(ToolType[type].image);
            var toolSelected = cc.Sprite.create(ToolType[type].image);
            var toolDisabled = cc.Sprite.create(ToolType[type].image);
            var tool = cc.MenuItemSprite.create(toolNormal, toolSelected,
                                                   toolDisabled, this, this.onUse);
            var menu = cc.Menu.create(tool, null);
            menu.setAnchorPoint(cc.ccp(0.0));
            menu.setPosition(cc.ccp(0, 0));
            this.setPosition(cc.ccp(object.x, object.y));
            this.addChild(menu, global.Tag.Tool, 2); 
            this.useAction = cc.MoveTo.create(0.3,cc.ccp(160,350));
    },
    
    onUse: function () {
        switch (this.type) {
            case global.Tag.Milk:
                Game.Speed.launch += ToolType.Milk.LaunchSpeed;
                Game.Speed.retrieve += ToolType.Milk.RetrieveSpeed;
                break;
            case global.Tag.Clock:
                Game.Speed.rotate += ToolType.Clock.RotateSpeed;
                break;
            case global.Tag.MoneyTree:
                Game.Factor.add = ToolType.MoneyTree.addValue;
                Game.Factor.multiply = ToolType.MoneyTree.Multiply;
                break;
            case global.Tag.Rich:
                Game.Factor.probility = ToolType.Rich.Probility;
                break;
        }
        this.runAction(this.useAction);
    }
});