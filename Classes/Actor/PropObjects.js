var PropObject = cc.Sprite.extend({
    type: null,
    weight: 150,
    value: 0,
    getCollisionLength: function () {
        var x = this.getContentSize().width;
        var y = this.getContentSize().height;
        return x < y ? x * this.getScale() : y * this.getScale();
    },
    getValue: function () {
        return this.value;
    },
    getWeight: function () {
        return this.weight;
    },
    update: function () {
        if (this.collectAction && this.collectAction.isDone()) {
            this.use();
            this.getParent().removeChild(this);
        }
    }
});

var Clock = PropObject.extend({
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
    }
});

var Thunder = PropObject.extend({
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
    }
});

var Sleep = PropObject.extend({
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
    }
});

var Bump = PropObject.extend({
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
    }
});

var Scan = PropObject.extend({
    ctor: function (object) {
        this.initWithFile(PropType.Sleep.image);
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.scheduleUpdate();
    },
    
    use: function () {
        var draw = this.getParent().draw;
        this.getParent().draw = function () {
            cc.renderContext.lineWidth = 2;
            //cc.renderContext.strokeStyle = "#eedc4a";
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
    }
});

var Smaller = PropObject.extend({
    ctor: function (object) {
        this.initWithFile(PropType.Sleep.image);
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.scheduleUpdate();
    },
    
    use: function () {
        var children = this.getParent().getChildren();
        for (var i = 0; i < children.length; i++) {
            //if (children[i].type != /*Small Type) {
            //    children[i].setScale(0.5);
            //}
            if (children[i].type >= global.Tag.Rock
            && children[i].type <= global.Tag.Bomb) {
                children[i].setScale(0.5);
            }
        }
    }
});

var Bigger = PropObject.extend({
    ctor: function (object) {
        this.initWithFile(PropType.Sleep.image);
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.scheduleUpdate();
    },
    
    use: function () {
        var children = this.getParent().getChildren();
        for (var i = 0; i < children.length; i++) {
            //if (children[i].type != /*Big Type) {
            //    children[i].setScale(2);
            //}
            if (children[i].type >= global.Tag.Rock
            && children[i].type <= global.Tag.Bomb) {
                children[i].setScale(2);
            }
        }
    }
});

var Frozen = PropObject.extend({
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
    }
});

var Reverse = PropObject.extend({
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
    }
});

var Shift = PropObject.extend({
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
    }
});