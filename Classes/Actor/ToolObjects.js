var ToolObject = cc.Layer.extend({
    type: null,
    value: null,
    buyAction: null,
    ctor:function (object) {
        var type = getObjectName(object.type);
        this.type = object.type;
        this.value = ToolType[type].value;
    
        var toolNormal = cc.Sprite.create(ToolType[type].image);
        var toolSelected = cc.Sprite.create(ToolType[type].image);
        var toolDisabled = cc.Sprite.create(ToolType[type].image);
        var tool = cc.MenuItemSprite.create(toolNormal, toolSelected,
                                               toolDisabled, this, this.onBuy);
        var menu = cc.Menu.create(tool, null);
        menu.setAnchorPoint(cc.ccp(0.0));
        menu.setPosition(cc.ccp(0, 0));
        this.setPosition(cc.ccp(object.x, object.y));
        this.addChild(menu, global.Tag.Tool, 2); 
        this.buyAction = cc.MoveTo.create(0.3,cc.ccp(160,350));
    },
    
    onBuy: function () {
        if (this.value <= Game.money) {
            Game.money -= this.value;
            var object = {};
            object.type = this.type;
            //var type = getObjectName(this.type);
            Game.toolContainer.push(object);
            this.runAction(this.buyAction);
        } else {
            this.showIndication();
        }
    },
    
    showIndication: function () {
        // show a indication that the player does not have enough money.
        console.log("Money not enough");
    },
});

var Milk = cc.Layer.extend({
    type: null,
    value: 0,
    
    ctor: function (object) {
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
        Game.Speed.retrieve = 0.3;
        
        this._parent_layer = this.getParent();
        this.destroy();
        console.log("Milk used.");
    },
    destroy: function () {
        Game.toolContainer["Milk"] = null;
        //this.runAction(this.useAction);
        for (var i = 0; i < Game.toolContainer.length; i++) {
            if (Game.toolContainer[i].type == this.type)
                Game.toolContainer[i] = null;
        }
        this.getParent().reOrderToolContainer();
        this.getParent().removeChild(this);
    }
});

var Quick = cc.Layer.extend({
    type: null,
    value: 0,
    
    ctor: function (object) {
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
        Game.Speed.rotate = 0.4;
        
        this.destroy();
    },
    destroy: function () {
        //this.runAction(this.useAction);
        for (var i = 0; i < Game.toolContainer.length; i++) {
            if (Game.toolContainer[i].type == this.type)
                Game.toolContainer[i] = null;
        }
        this.getParent().reOrderToolContainer();
        this.getParent().removeChild(this);
    }
});

var Lighter = cc.Layer.extend({
    type: null,
    value: 0,
    
    ctor: function (object) {
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
        var children = this.getParent().getChildren();
        for (var i = 0; i < children.length; i++) {
            children[i].weight /= 2;
        }
        
        this.destroy();
    },
    destroy: function () {
        //this.runAction(this.useAction);
        for (var i = 0; i < Game.toolContainer.length; i++) {
            if (Game.toolContainer[i].type == this.type)
                Game.toolContainer[i] = null;
        }
        this.getParent().reOrderToolContainer();
        this.getParent().removeChild(this);
    }
});

var Sort = cc.Layer.extend({
    type: null,
    value: 0,
    
    ctor: function (object) {
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
        var y = 100;
        var x = 100;
        var children = this.getParent().getChildren();
        for (var i = 0; i < children.length; i++) {
            if (children[i].type >= global.Tag.Rock
            && children[i].type <= global.Tag.Bomb) {
                children[i].stopAllActions();
                children[i].setPosition(cc.ccp(x, y));
                x += 100;
                if (x >= winSize.width) {
                    x = 100;
                    y += 100;
                }
            }
        }
        
        this.destroy();
    },
    destroy: function () {
        //this.runAction(this.useAction);
        for (var i = 0; i < Game.toolContainer.length; i++) {
            if (Game.toolContainer[i].type == this.type)
                Game.toolContainer[i] = null;
        }
        this.getParent().reOrderToolContainer();
        this.getParent().removeChild(this);
    }
});

var Longer = cc.Layer.extend({
    type: null,
    value: 0,
    
    ctor: function (object) {
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
        this.getParent()._hook.initWithFile(s_hook_long);
        this.getParent()._hook.delegate.initWithFile(s_hook_long);
        this.getParent()._hook.setAnchorPoint(cc.ccp(0.5, 1));
        this.getParent()._hook.delegate.setAnchorPoint(cc.ccp(0.5, 1));
        
        this.destroy();
    },
    destroy: function () {
        //this.runAction(this.useAction);
        for (var i = 0; i < Game.toolContainer.length; i++) {
            if (Game.toolContainer[i].type == this.type)
                Game.toolContainer[i] = null;
        }
        this.getParent().reOrderToolContainer();
        this.getParent().removeChild(this);
    }
});

var Scan = cc.Layer.extend({
    type: null,
    value: 0,
    
    ctor: function (object) {
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
        var draw = this.getParent().draw;
        this.getParent().draw = function () {
            cc.renderContext.lineWidth = 2;
            cc.renderContext.strokeStyle = "#eedc4a";
            var angle = this._hook.delegate.getRotation();
            var border = 10;
            var mx = winSize.width / 2;
            var my = winSize.height - 50;
            var desX, desY;
            if (angle > this._criticalAngle) {
                desX = 0 + border;
                desY = my - Math.tan(((90-angle)*Math.PI)/180) * mx;
            } else if (angle < this._criticalAngle && angle >0) {
                desX = mx - Math.tan((angle*Math.PI)/180) * my;
                desY = 0 + border;
            } else if (angle > (-this._criticalAngle) && angle < 0) {
                desX = mx + Math.tan((-angle*Math.PI)/180) * my
                desY = 0 + border;
            } else if (angle < -this._criticalAngle) {
                desX = winSize.width - border;
                desY = my - Math.tan(((90+angle)*Math.PI)/180) * mx;
            }
            
            cc.drawingUtil.drawLine(this._hook.getOriginPosition(), cc.ccp(desX, desY));
        };

        var parent = this.getParent();
        setTimeout(function () {
            parent.draw = draw;
        }, 10 * 1000);
        
        this.destroy();
    },   
    destroy: function () {
        //this.runAction(this.useAction);
        for (var i = 0; i < Game.toolContainer.length; i++) {
            if (Game.toolContainer[i].type == this.type)
                Game.toolContainer[i] = null;
        }
        this.getParent().reOrderToolContainer();
        this.getParent().removeChild(this);
    }
});