var Clock = cc.Sprite.extend({
    type: null,
    weight: 25,
    value: 0,
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
                if(that._time_limit >= 0)
                {
                    that._roundInterval = setInterval(
                        function(){
                            that._time_limit--;
                            that._lbTime.setString("Time: 00:" + that._time_limit);
                        },
                        1000
                    );
                }
            },
            10 * 1000
        );
    },
    
    getValue: function () {
        return this.value;
    },
    getWeight: function () {
        return this.weight;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition(), this.getParent()._hook.getOriginPosition())) {
            this.use();
            this.getParent().removeChild(this);
        }
    }
});

var Bone = cc.Sprite.extend({
    type: null,
    weight: 25,
    value: 0,
    zOrder: 0,
    
    ctor: function (object) {
        this.initWithFile(PropType.Bone.image);
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.scheduleUpdate();
    },
    
    use: function () {
        //var dog = this.getParent().getChildByTag(global.Tag.Pig);
        var children = this.getParent().getChildren();
        for (var i = 0; i < children.length; i++) {
            if (children[i].type == global.Tag.Pig) {
                dog = children[i];
                break;
            }
        }
        console.log("Dog");
        dog.stopAllActions();
        // add eat aniamtion
        Explosion.sharedExplosion();
        var a = new Explosion();
        a.setPosition(dog.getPosition());
        this.getParent().addChild(a);
    },
    
    getValue: function () {
        return this.value;
    },
    getWeight: function () {
        return this.weight;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition(), this.getParent()._hook.getOriginPosition())) {
            this.use();
            this.getParent().removeChild(this);
        }
    }
});

var Silent = cc.Sprite.extend({
    type: null,
    weight: 25,
    value: 0,
    zOrder: 0,
    
    ctor: function (object) {
        this.initWithFile(PropType.Silent.image);
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.scheduleUpdate();
    },
    
    use: function () {
        //var dog = this.getParent().getChildByTag(global.Tag.Dog);
        //dog pause and add sleep animation;
        var children = this.getParent().getChildren();
        for (var i = 0; i < children.length; i++) {
            if (children[i].type == global.Tag.Pig) {
                dog = children[i];
                break;
            }
        }
        console.log("Dog");
        dog.pauseSchedulerAndActions();
        // add slient aniamtion
        Explosion.sharedExplosion();
        var a = new Explosion();
        a.setPosition(dog.getPosition());
        this.getParent().addChild(a);
        setTimeout(function () {
            dog.resumeSchedulerAndActions();
        }, 1 * 1000);
    },
    
    getValue: function () {
        return this.value;
    },
    getWeight: function () {
        return this.weight;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition(), this.getParent()._hook.getOriginPosition())) {
            this.use();
            this.getParent().removeChild(this);
        }
    }
});

var Alarm = cc.Sprite.extend({
    type: null,
    weight: 25,
    value: 0,
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
        // add slient aniamtion
        Explosion.sharedExplosion();
        var a = new Explosion();
        a.setPosition(cc.ccp(winSize.width / 2, winSize.height / 2));
        this.getParent().addChild(a);
        
        var parent = this.getParent();
        setTimeout(function () {
            parent.onGameOver();
        }, 1 * 1000);
    },
    
    getValue: function () {
        return this.value;
    },
    getWeight: function () {
        return this.weight;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition(), this.getParent()._hook.getOriginPosition())) {
            this.use();
            this.getParent().removeChild(this);
        }
    }
});

var Thunder = cc.Sprite.extend({
    type: null,
    weight: 25,
    value: 0,
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
        var children = this.getParent().getChildren();
        for (var i = 0; i < children.length; i++) {
           if (children[i].type != global.Tag.Pig && children[i].type >= global.Tag.Rock && children[i].type <= global.Tag.Bomb) {
               var point1 = children[i].getPosition();
               var point2;
               var direction = Math.random() > 0.5 ? -1 : 1;
               
               if (point1.x > winSize.width - 10) {
                   point2 = cc.ccp(point1.x - 20, point1.y);
               } else if (point1.x <= 10) {
                   point2 = cc.ccp(point1.x + 20, point1.y);
               } else point2 = cc.ccp(point1.x + direction * 20, point1.y);
               
               var move1 = cc.MoveTo.create(1, point2);
               var move2 = cc.MoveTo.create(1, point1);
               var seq = cc.Sequence.create(move1, cc.DelayTime.create(0.2),
                    cc.FlipX.create(true), move2, cc.DelayTime.create(0.2), cc.FlipX.create(false));
               children[i].action = cc.RepeatForever.create(seq, null);
               children[i].runAction(children[i].action);
           }
        }
    },
    
    getValue: function () {
        return this.value;
    },
    getWeight: function () {
        return this.weight;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition(), this.getParent()._hook.getOriginPosition())) {
            this.use();
            this.getParent().removeChild(this);
        }
    }
});

var Sleep = cc.Sprite.extend({
    type: null,
    weight: 25,
    value: 0,
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
            //if (children[i] != this.getParent()._hook)
             //  children[i].stopAllActions();
            if (children[i].type >= global.Tag.Rock
            && children[i].type <= global.Tag.Bomb) {
                children[i].stopAllActions();
            }
        }
    },
    
    getValue: function () {
        return this.value;
    },
    getWeight: function () {
        return this.weight;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition(), this.getParent()._hook.getOriginPosition())) {
            this.use();
            this.getParent().removeChild(this);
        }
    }
});

var Bump = cc.Sprite.extend({
    type: null,
    weight: 25,
    value: 0,
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
                        if (distance < 40) {
                            that._hook.retrieve();
                        }
                    }
                }
            }
        };
        that.schedule(bump);
        setTimeout(function () {
            that.unschedule(bump);
        },
        10 * 1000);
    },
    
    getValue: function () {
        return this.value;
    },
    getWeight: function () {
        return this.weight;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition(), this.getParent()._hook.getOriginPosition())) {
            this.use();
            this.getParent().removeChild(this);
        }
    }
});

var Smaller = cc.Sprite.extend({
    type: null,
    weight: 25,
    value: 0,
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
            if (children[i].type >= global.Tag.Rock
            && children[i].type <= global.Tag.Bomb) {
                children[i].setScale(0.5);
            }
        }
    },
    
    getValue: function () {
        return this.value;
    },
    getWeight: function () {
        return this.weight;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition(), this.getParent()._hook.getOriginPosition())) {
            this.use();
            this.getParent().removeChild(this);
        }
    }
});

var Bigger = cc.Sprite.extend({
    type: null,
    weight: 25,
    value: 0,
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
            if (children[i].type >= global.Tag.Rock
            && children[i].type <= global.Tag.Bomb) {
                children[i].setScale(2);
            }
        }
    },
    
    getValue: function () {
        return this.value;
    },
    getWeight: function () {
        return this.weight;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition(), this.getParent()._hook.getOriginPosition())) {
            this.use();
            this.getParent().removeChild(this);
        }
    }
});

var Frozen = cc.Sprite.extend({
    type: null,
    weight: 25,
    value: 0,
    zOrder: 0,
    
    ctor: function (object) {
        this.initWithFile(PropType.Sleep.image);
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.scheduleUpdate();
    },
    
    use: function () {
        var parent = this.getParent();
        
        setTimeout(function () {
            parent._hook.pauseSchedulerAndActions();
        }, 2 * 1000);
        
        setTimeout(function () {
            parent._hook.resumeSchedulerAndActions();
        }, 10 * 1000);
    },
    
    getValue: function () {
        return this.value;
    },
    getWeight: function () {
        return this.weight;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition(), this.getParent()._hook.getOriginPosition())) {
            this.use();
            this.getParent().removeChild(this);
        }
    }
});

var Reverse = cc.Sprite.extend({
    type: null,
    weight: 25,
    value: 0,
    zOrder: 0,
    
    ctor: function (object) {
        this.initWithFile(PropType.Sleep.image);
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.scheduleUpdate();
    },
    
    use: function () {
        var getDstPoint = this.getParent().getDstPoint;
        this.getParent().getDstPoint = function () {
            var size = cc.Director.sharedDirector().getWinSize();
            var mx = size.width / 2;
            var my = size.height - 50;
            var desX = null;
            var desY = null;
            var border = 10;

            if (this._hook.state == "swing") {
                this._hook.stopSwing();
                var angle = -this._hook.getRotation();
                this._hook.setRotation(angle);
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
                    desX = size.width - border;
                    desY = my - Math.tan(((90+angle)*Math.PI)/180) * mx;
                }
                return cc.ccp(desX, desY);
            }
            console.error("Could not get dstPosition");
        };

        var parent = this.getParent();
        setTimeout(function () {
            parent.getDstPoint = getDstPoint;
        }, 10 * 1000);
    },
    
    getValue: function () {
        return this.value;
    },
    getWeight: function () {
        return this.weight;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition(), this.getParent()._hook.getOriginPosition())) {
            this.use();
            this.getParent().removeChild(this);
        }
    }
});

var Shift = cc.Sprite.extend({
    type: null,
    weight: 25,
    value: 0,
    zOrder: 0,
    
    ctor: function (object) {
        this.initWithFile(PropType.Sleep.image);
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.scheduleUpdate();
    },
    
    use: function () {
        var parent = this.getParent();
        var originPosition = parent._hook.getOriginPosition();
        var newPosition = cc.ccp(originPosition.x/2, originPosition.y);
        parent._hook.setPosition(newPosition);
        parent._hook.originPosition = newPosition;
        
        setTimeout(function () {
            if (parent._hook.getState() != "swing") {
                 parent._hook.stopAllActions();
                 parent._hook.swing();
            }
            parent._hook.setPosition(originPosition);
            parent._hook.originPosition = originPosition;
        }, 10 * 1000);
    },
    
    getValue: function () {
        return this.value;
    },
    getWeight: function () {
        return this.weight;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition(), this.getParent()._hook.getOriginPosition())) {
            this.use();
            this.getParent().removeChild(this);
        }
    }
});

var Rich = cc.Sprite.extend({
    type: null,
    weight: 25,
    value: 0,
    zOrder: 0,
    
    ctor: function (object) {
        this.initWithFile(PropType.Sleep.image);
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.scheduleUpdate();
    },
    
    use: function () {
        Game.money *= 2;
    },
    
    getValue: function () {
        return this.value;
    },
    getWeight: function () {
        return this.weight;
    },
    update: function () {
        if (cc.Point.CCPointEqualToPoint(this.getPosition(), this.getParent()._hook.getOriginPosition())) {
            this.use();
            this.getParent().removeChild(this);
        }
    }
});