var Milk1 = cc.Layer.extend({
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
        Game.Speed.retrieve = Game.Speed.retrieve / 2;
        //Game.Speed.launch = Game.Speed.launch / 2;
        
        this._parent_layer = this.getParent();
        //this.destroy();
        console.log("Milk used.");
    },
    destroy: function () {
        //Game.toolContainer["Milk"] = null;
        //this.runAction(this.useAction);
        Game.popToolObject(this.type);
        //this.getParent().reOrderToolContainer();
        //this.getParent().removeChild(this);
    }
});

var Milk2 = cc.Layer.extend({
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
        Game.Speed.retrieve = Game.Speed.retrieve / 4;
        //Game.Speed.launch = Game.Speed.launch / 4;
        
        this._parent_layer = this.getParent();
        //this.destroy();
        console.log("Milk used.");
    },
    destroy: function () {
        //Game.toolContainer["Milk"] = null;
        //this.runAction(this.useAction);
        Game.popToolObject(this.type);
        //this.getParent().reOrderToolContainer();
        //this.getParent().removeChild(this);
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
        
        //this.destroy();
    },
    destroy: function () {
        //this.runAction(this.useAction);
        Game.popToolObject(this.type);
        //this.getParent().reOrderToolContainer();
        //this.getParent().removeChild(this);
    }
});


var Bombshell = cc.Layer.extend({
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
        var hook = this.getParent()._hook;
        var object = this.getParent().collectedObject;
        if (object != null && hook.state == "retrieve") {
            hook.stopAllActions();
            object.stopAllActions();
            hook.setPosition(hook.getOriginPosition());

            var objectBombAction = cc.RotateBy.create(0.6,1080);
            var conSprite = new cc.Sprite.create(s_burst);
            conSprite.setScale(0.4);
            //conSprite.runAction(objectBombAction);
            conSprite.setPosition(object.getPosition());
            //var conSpriteAction = cc.MoveTo.create(1,cc.ccp(size.width/2,0));
            this.getParent().addChild(conSprite,20);
            var that = this;
            setTimeout(
                function(){
                    that.getParent().removeChild(conSprite);                        
                },
                500
            );  
            
            //object.setPosition(hook.getCollectPosition());
            console.log("Bombshell used");
            hook.retrieveAction = {};
            hook.retrieveAction.isDone = function () {return true};
            object.collectAction = {};
            object.collectAction.isDone = function () {return true};
            hook.swing();
        }
        
        //this.destroy();
    },   
    destroy: function () {
        //this.runAction(this.useAction);
        Game.popToolObject(this.type);
        //this.getParent().reOrderToolContainer();
        //this.getParent().removeChild(this);
    }
});


var BoneToGold = cc.Layer.extend({
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
            if (children[i].type == global.Tag.Bone) {
                // add bomb effect
                children[i].removeFromParentAndCleanup();
                var object = {};
                object.x = children[i].getPositionX();
                object.y = children[i].getPositionY();
                object.type = global.Tag.Gold;
                object = new MineObject(object, 1);
                this.getParent().addChild(object, global.zOrder.Gold);
                this.getParent().mineContainer.push(object);
            }
        }
        //this.destroy();
    },   
    destroy: function () {
        //this.runAction(this.useAction);
        Game.popToolObject(this.type);
        //this.getParent().reOrderToolContainer();
        //this.getParent().removeChild(this);
    }
});


var RockToRich = cc.Layer.extend({
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
            if (children[i].type == global.Tag.Rock) {
                // add bomb effect
                children[i].value *= 2;
            }
        }
        //this.destroy();
    },   
    destroy: function () {
        //this.runAction(this.useAction);
        Game.popToolObject(this.type);
        //this.getParent().reOrderToolContainer();
        //this.getParent().removeChild(this);
    }
});

/*
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
});*/