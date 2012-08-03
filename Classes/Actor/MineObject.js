var MineObject = cc.Sprite.extend({
    type: null,
    weight: 0,
    size: 0,
    value: 0,
    action: null,
    zOrder: 0,

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
       if (this.collectAction && this.collectAction.isDone())
            this.getParent().removeChild(this);
    }
});

var Gold = MineObject.extend({
    ctor: function (object, size) {
        var type = getObjectName(object.type);
        size = Math.floor(Math.random()*3);

        if(size == 1) {  
            var texture3 = cc.TextureCache.sharedTextureCache().addImage(s_cow);
            var cowFrame1 = cc.SpriteFrame.create(texture3,cc.RectMake(0,0,324,200));
            this.initWithSpriteFrame(cowFrame1);
            this.value = MineType[type].big.value;
            this.weight = MineType[type].big.weight;
            this.setScale(0.7);
            var cowFrame2 = cc.SpriteFrame.create(texture3,cc.RectMake(0,200,324,200));
            var cowFrame3 = cc.SpriteFrame.create(texture3,cc.RectMake(0,400,324,200));
            var cowFrames = [];
            cowFrames.push(cowFrame1);
            cowFrames.push(cowFrame2);
            cowFrames.push(cowFrame3);
            var cowAnimation = cc.Animation.create(cowFrames,0.5);
            var cowAnimate = cc.Animate.create(cowAnimation,false);
            this.runAction(cc.RepeatForever.create(cowAnimate));
        } else if(size == 2) {
            this.initWithFile(MineType[type].middle.image);
            this.value = MineType[type].middle.value;
            this.weight = MineType[type].middle.weight;
        } else {
            this.initWithFile(MineType[type].small.image);
            this.value = MineType[type].small.value;
            this.weight = MineType[type].small.weight;
        }

        this.setScale(0.4);
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.zOrder = global.zOrder[type];
        this.scheduleUpdate();
    }
});

var Rock = MineObject.extend({
    ctor: function (object, size) {
        var type = getObjectName(object.type);

        if (size == 1) {
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
        this.setScale(0.5)
        this.zOrder = global.zOrder[type];
        this.scheduleUpdate();
    }
});


var Diamond = MineObject.extend({
    ctor: function (object, size) {
        var type = getObjectName(object.type);
            
        if (size == 1) {
            var texture1 = cc.TextureCache.sharedTextureCache().addImage(s_animals);
            var pigFrame1 = cc.SpriteFrame.create(texture1,cc.RectMake(0,0,90,130));
            this.initWithSpriteFrame(pigFrame1);
            this.value = MineType[type].big.value;
            this.weight = MineType[type].big.weight;
            this.setScale(0.9);
            var pigFrame2 = cc.SpriteFrame.create(texture1,cc.RectMake(103,0,90,130));
            var pigFrame3 = cc.SpriteFrame.create(texture1,cc.RectMake(1,136,85,130));
            var pigFrame4 = cc.SpriteFrame.create(texture1,cc.RectMake(103,136,90,130));
            var pigFrames = [];
            pigFrames.push(pigFrame1);
            pigFrames.push(pigFrame2);
            pigFrames.push(pigFrame3);
            pigFrames.push(pigFrame4);
            var pigAnimation = cc.Animation.create(pigFrames,0.5);
            var pigAnimate = cc.Animate.create(pigAnimation,false);
            this.runAction(cc.RepeatForever.create(pigAnimate));
        } else {
            this.initWithFile(MineType[type].small.image);
            this.value = MineType[type].small.value;
            this.weight = MineType[type].small.weight;
        }
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.setScale(0.6);
        this.zOrder = global.zOrder[type];
        this.scheduleUpdate();
    }
});

var Bone = MineObject.extend({
    ctor: function (object, size) {
        var type = getObjectName(object.type);

        this.initWithFile(MineType[type].image);
        this.value = MineType[type].value;
        this.weight = MineType[type].weight;
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.setScale(0.3);
        this.zOrder = global.zOrder[type];
        this.scheduleUpdate();
    }
});

var Pig = MineObject.extend({
    ctor: function (object, size) {
        var type = getObjectName(object.type);

        var texture2 = cc.TextureCache.sharedTextureCache().addImage(s_dog);
        var dogFrame1 = cc.SpriteFrame.create(texture2,cc.RectMake(0,0,237,159));
        this.initWithFile(dogFrame1);
        this.value = MineType[type].value;
        this.weight = MineType[type].weight;
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.setScale(0.3);
        var dogFrame2 = cc.SpriteFrame.create(texture2,cc.RectMake(0,159,237,159));
        var dogFrames = [];
        dogFrames.push(dogFrame1);
        dogFrames.push(dogFrame2);
        var dogAnimation = cc.Animation.create(dogFrames,0.5);
        var dogAnimate = cc.Animate.create(dogAnimation,false);
        this.runAction(cc.RepeatForever.create(dogAnimate));
        var point1 = cc.ccp(object.x, object.y);
        var point2 = cc.ccp(winSize.width - object.x, object.y2);

        if (!cc.Point.CCPointEqualToPoint(point1, point2)) {
            var duration = Math.abs((point2.x -point1.x)) / winSize.width * 10,
                tmpMove1 = cc.MoveTo.create(duration, point2),
                tmpMove2 = cc.MoveTo.create(duration, point1),
                seq;

            if (point1.x > point2.x) {
                seq = cc.Sequence.create(tmpMove1, cc.DelayTime.create(0.2), cc.FlipX.create(true),
                    tmpMove2, cc.DelayTime.create(0.2), cc.FlipX.create(false));
            } else {
                seq = cc.Sequence.create(cc.FlipX.create(true), tmpMove1, cc.DelayTime.create(0.2),
                    cc.FlipX.create(false), tmpMove2, cc.DelayTime.create(0.2));
            }
            
            var action = cc.RepeatForever.create(seq, null);
            this.runAction(action);
        }
        this.zOrder = global.zOrder[type];
        this.scheduleUpdate();
    }
});

var Bat = MineObject.extend({
    ctor: function (object, size) {
        var type = getObjectName(object.type);

        var batTexture = cc.TextureCache.sharedTextureCache().addImage(s_bat);
        var batFrame1 = cc.SpriteFrame.create(batTexture,cc.RectMake(0,0,212,109));
        var batFrame2 = cc.SpriteFrame.create(batTexture,cc.RectMake(0,109,212,109));
        this.initWithFile(batFrame1);
        this.value = MineType[type].value;
        this.weight = MineType[type].weight;
        this.setPosition(cc.ccp(object.x, object.y));
        this.type = object.type;
        this.setScale(0.3);
        var batFrames = [];
        batFrames.push(batFrame1);
        batFrames.push(batFrame2);
        var batAnimation = cc.Animation.create(batFrames,0.5);
        var batAnimate = cc.Animate.create(batAnimation,false);
        this.runAction(cc.RepeatForever.create(batAnimate));
        var point1 = cc.ccp(object.x,object.y);
        var point2 = cc.ccp(object.x2,object.y2);
        if(!cc.Point.CCPointEqualToPoint(point1,point2)){
            //var duration = Math.abs((point2.y-point1.y))/winSize.width*10;
            var tmpMove1 = cc.MoveTo.create(4,point2);
            var tmpMove2 = cc.MoveTo.create(4,point1);
            var seq = cc.Sequence.create(tmpMove1,cc.DelayTime.create(0.3),tmpMove2,cc.DelayTime.create(0.3));
            this.runAction(cc.RepeatForever.create(seq));
        }
        
        this.zOrder = global.zOrder[type];
        this.scheduleUpdate();
    }
});