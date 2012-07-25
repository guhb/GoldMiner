var Milk = cc.Sprite.extend({
    type: null,
    weight: 0,
    action: null,
    zOrder: 0,
    
    ctor: function (object) {
        this.initWithFile(PropType.Milk.image);
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.scheduleUpdate();
    },
    
    use: function () {
        var hook = this.getParent()._hook;
        this.getParent()._propContainer.push("Milk");
        Game.Speed.retrieve = 0.1;
        hook.setRetrieveSpeed(0.1);
        //hook.setLaunchSpeed(0.5);
    },
    
    getValue: function () {
        return 0;
    },
    
    getWeight: function () {
        return 10;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition()
            ,cc.ccp(400, 430))
            && this.getIsVisible())
            this.setIsVisible(false);
            
        if (!this.getIsVisible()) this.use();
    }
});

var Quick = cc.Sprite.extend({
    type: null,
    weight: 0,
    action: null,
    zOrder: 0,
    
    ctor: function (object) {
        this.initWithFile(PropType.Milk.image);
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.scheduleUpdate();
    },
    
    use: function () {
        var hook = this.getParent()._hook;
        this.getParent()._propContainer.push("Clock");
        Game.Speed.rotate = 0.5;
    },
    
    getValue: function () {
        return 0;
    },
    
    getWeight: function () {
        return 10;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition()
            ,cc.ccp(400, 430))
            && this.getIsVisible())
            this.setIsVisible(false);
            
        if (!this.getIsVisible()) this.use();
    }
});

var Clock = cc.Sprite.extend({
    type: null,
    weight: 0,
    action: null,
    zOrder: 0,
    
    ctor: function (object) {
        this.initWithFile(PropType.Clock.image);
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.scheduleUpdate();
    },
    
    use: function () {
        // pause the time counter interval and 
        // resume it after a amount of time
        var that = this.getParent();
        clearInterval(that._roundInterval);
        
        setTimeout(
            function () {
                //that = that.getParent();
                if(that._time_limit >= 0)
                {
                    that._roundInterval = setInterval(
                        function(){
                            that._time_limit--;
                            that._lbTime.setString("Time: 00:"+that._time_limit);
                        },
                        1000
                    );
                }
            },
            10 * 1000
        );
    },
    
    getValue: function () {
        return 0;
    },
    
    getWeight: function () {
        return 10;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition()
            ,cc.ccp(400, 430))
            && this.getIsVisible())
            this.setIsVisible(false);
            
        if (!this.getIsVisible()) this.use();
    }
});

var Bone = cc.Sprite.extend({
    type: null,
    weight: 0,
    action: null,
    zOrder: 0,
    
    ctor: function (object) {
        this.initWithFile(PropType.Bone.image);
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.scheduleUpdate();
    },
    
    use: function () {
        //var dog = this.getParent().getChildByTag(global.Tag.Dog);
        //dog.eatBone();
    },
    
    getValue: function () {
        return 0;
    },
    
    getWeight: function () {
        return 10;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition()
            ,cc.ccp(400, 430))
            && this.getIsVisible())
            this.setIsVisible(false);
            
        if (!this.getIsVisible()) this.use();
    }
});

var Silent = cc.Sprite.extend({
    type: null,
    weight: 0,
    action: null,
    zOrder: 0,
    
    ctor: function (object) {
        this.initWithFile(PropType.Silent.image);
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.scheduleUpdate();
    },
    
    use: function () {
        //var dog = this.getParent().getChildByTag(global.Tag.Dog);
        //dog.silent();
    },
    
    getValue: function () {
        return 0;
    },
    
    getWeight: function () {
        return 10;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition()
            ,cc.ccp(400, 430))
            && this.getIsVisible())
            this.setIsVisible(false);
            
        if (!this.getIsVisible()) this.use();
    }
});

var Alarm = cc.Sprite.extend({
    type: null,
    weight: 0,
    action: null,
    zOrder: 0,
    
    ctor: function (object) {
        this.initWithFile(PropType.Thunder.image);
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.scheduleUpdate();
    },
    
    use: function () {
        // display the alarm animation and end the game
        // as the farmer is waked up.
    },
    
    getValue: function () {
        return 0;
    },
    
    getWeight: function () {
        return 10;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition()
            ,cc.ccp(400, 430))
            && this.getIsVisible())
            this.setIsVisible(false);
            
        if (!this.getIsVisible()) this.use();
    }
});

var Thunder = cc.Sprite.extend({
    type: null,
    weight: 0,
    action: null,
    zOrder: 0,
    
    ctor: function (object) {
        this.initWithFile(PropType.Thunder.image);
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.scheduleUpdate();
    },
    
    use: function () {
        // display a thunder and wake up all the
        // animals, make them wounder around
    },
    
    getValue: function () {
        return 0;
    },
    
    getWeight: function () {
        return 10;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition()
            ,cc.ccp(400, 430))
            && this.getIsVisible())
            this.setIsVisible(false);
            
        if (!this.getIsVisible()) this.use();
    }
});

var Sleep = cc.Sprite.extend({
    type: null,
    weight: 0,
    action: null,
    zOrder: 0,
    
    ctor: function (object) {
        this.initWithFile(PropType.Sleep.image);
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.scheduleUpdate();
    },
    
    use: function () {
        var hook = this.getParent()._hook;
        this.getParent()._propContainer.push("Sleep");
        var children = this.getParent().getChildren();
        for (var i = 0; i < children.length; i++) {
            if (children[i] != this.getParent()._hook)
               children[i].stopAllActions();
        }
    },
    
    getValue: function () {
        return 0;
    },
    
    getWeight: function () {
        return 10;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition()
            ,cc.ccp(400, 430))
            && this.getIsVisible())
            this.setIsVisible(false);
            
        if (!this.getIsVisible()) this.use();
    }
});

var Lighter = cc.Sprite.extend({
    type: null,
    weight: 0,
    action: null,
    zOrder: 0,
    
    ctor: function (object) {
        this.initWithFile(PropType.Sleep.image);
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.scheduleUpdate();
    },
    
    use: function () {
        var children = this.getParent().getChildren();
        for (var i = 0; i < children.length; i++) {
            children[i].weight /= 2;
        }
    },
    
    getValue: function () {
        return 0;
    },
    
    getWeight: function () {
        return 10;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition()
            ,cc.ccp(400, 430))
            && this.getIsVisible())
            this.setIsVisible(false);
            
        if (!this.getIsVisible()) this.use();
    }
});

var Bump = cc.Sprite.extend({
    type: null,
    weight: 0,
    action: null,
    zOrder: 0,
    
    ctor: function (object) {
        this.initWithFile(PropType.Sleep.image);
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.scheduleUpdate();
    },
    
    use: function () {
        var that = this.getParent();
        var bump = function () {
            if (that._hook.getState() == "launch") {
                var distance = null;
                for (var i=0; i<that.mineContainer.length; i++) {
                    if (that.mineContainer[i] != null) {
                        var xlen = Math.pow(that._hook.getPositionX() - that.mineContainer[i].getPositionX(), 2);
                        var ylen = Math.pow(that._hook.getPositionY() - that.mineContainer[i].getPositionY(), 2);
                    
                        distance = Math.sqrt(xlen + ylen);
                        if (distance < 32) {
                            that._hook.retrieve();
                        }
                    }
                }
            }
        };
        that.schedule(bump);
        setTimeout(function () {
            that.unshedule(bump);
        },
        10 * 1000);
    },
    
    getValue: function () {
        return 0;
    },
    
    getWeight: function () {
        return 10;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition()
            ,cc.ccp(400, 430))
            && this.getIsVisible())
            this.setIsVisible(false);
            
        if (!this.getIsVisible()) this.use();
    }
});

var Smaller = cc.Sprite.extend({
    type: null,
    weight: 0,
    action: null,
    zOrder: 0,
    
    ctor: function (object) {
        this.initWithFile(PropType.Sleep.image);
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.scheduleUpdate();
    },
    
    use: function () {
        var children = this.getParent().getChildren();
        for (var i = 0; i < children.length; i++) {
            //if (children[i].type != /*Small Type*/) {
            //    children[i].setScale(0.5);
            //}
        }
    },
    
    getValue: function () {
        return 0;
    },
    
    getWeight: function () {
        return 10;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition()
            ,cc.ccp(400, 430))
            && this.getIsVisible())
            this.setIsVisible(false);
            
        if (!this.getIsVisible()) this.use();
    }
});

var Bigger = cc.Sprite.extend({
    type: null,
    weight: 0,
    action: null,
    zOrder: 0,
    
    ctor: function (object) {
        this.initWithFile(PropType.Sleep.image);
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.scheduleUpdate();
    },
    
    use: function () {
        var children = this.getParent().getChildren();
        for (var i = 0; i < children.length; i++) {
            //if (children[i].type != /*Big Type*/) {
            //    children[i].setScale(2);
            //}
        }
    },
    
    getValue: function () {
        return 0;
    },
    
    getWeight: function () {
        return 10;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition()
            ,cc.ccp(400, 430))
            && this.getIsVisible())
            this.setIsVisible(false);
            
        if (!this.getIsVisible()) this.use();
    }
});

var Sort = cc.Sprite.extend({
    type: null,
    weight: 0,
    action: null,
    zOrder: 0,
    
    ctor: function (object) {
        this.initWithFile(PropType.Sleep.image);
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.scheduleUpdate();
    },
    
    use: function () {
        var y = 100;
        var x = 100;
        var children = this.getParent().getChildren();
        for (var i = 0; i < children.length; i++) {
            children[i].stopAllActions();
            children[i].setPosition(cc.ccp(x, y));
            x += 100;
            if (x >= winSize.width) {
                x = 100;
                y += 100;
            }
        }
    },
    
    getValue: function () {
        return 0;
    },
    
    getWeight: function () {
        return 10;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition()
            ,cc.ccp(400, 430))
            && this.getIsVisible())
            this.setIsVisible(false);
            
        if (!this.getIsVisible()) this.use();
    }
});