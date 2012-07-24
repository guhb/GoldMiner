var MineType = {
    Rock: {
        big: {
            value: 10,
            weight: 100,
            image: global.theme.big_rock
        },
        small: {
            value: 5,
            weight: 50,
            image: global.theme.small_rock
        }
    },
    
    Gold: {
        big: {
            value: 100,
            weight: 100,
            image: global.theme.big_gold
        },
        small: {
            value: 50,
            weight: 50,
            image: global.theme.small_gold
        }
    },
    
    Pig: {
        value: 100,
        weight: 50,
        image: global.theme.pig
    },
    
    Diamond: {
        big: {
            value: 1000,
            weight: 100,
            image: global.theme.big_diamond
        },
        small: {
            value: 500,
            weight: 50,
            image: global.theme.small_diamond
        }
    },
    
    Bone: {
        value: 10,
        weight: 40,
        image: global.theme.bone
    },
    
    Bomb: {
        value: 0,
        weight: 0,
        image: global.theme.bomb
    }
};

var ToolType = {
    Milk: {
        LaunchSpeed: -0.1,
        RetrieveSpeed: -0.1,
        image: global.theme.milk
    },
    
    Clock: {
        RotateSpeed: -0.1,
        image: global.theme.clock
    },
    
    MoneyTree: {
        addValue: 50,
        Multiply: 2,
        image: global.theme.money_tree
    },
    
    Rich: {
        Probility: 0.2,
        image: global.theme.rich
    }
};


var getObjectName = function (tag) {
    var name = ["Rock","Gold","Pig","Diamond","Bone","Bomb",
                "Milk","Clock","MoneyTree","Rich"];
    return name[tag-global.Tag.Rock];
};

var getMineType = function () {
    function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        if (obj instanceof Array) {
            var copy = [];
            for (var i = 0, len = obj.length; i < len; ++i) {
                copy[i] = clone(obj[i]);
            }
            return copy;
        }
        if (obj instanceof Object) {
            var copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
            }
            return copy;
        }
        throw new Error("Unable to copy obj! Its type isn't supported.");
    }
    return clone(MineType);
};