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

    },
    
    use: function () {
        // pause the time counter interval and 
        // resume it after a amount of time
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