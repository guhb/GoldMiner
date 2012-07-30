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
        middle:{
			value: 100,
			weight:100,
			image:global.theme.middle_gold
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
    Milk1: {
        create: Milk1,
        value: 100,
        image: s_milk
    }, // Make the hook retrieve quicker
    Milk2: {
        create: Milk2,
        value: 200,
        image: s_milk
    },
    Longer: {
        create: Longer,
        value: 100,
        image: s_hook_long
    }, // Make the hook longer
    Bombshell: {
        create: Bombshell,
        value: 100,
        image: s_milk
    },
    BoneToGold: {
        create: BoneToGold,
        value: 100,
        image: s_milk
    },
    RockToRich: {
        create: RockToRich,
        value: 100,
        image: s_milk
    }
};

var PropType = {
    Clock: {
        create: Clock,
        image: s_clock
    }, // Make the time longer
    Thunder: {
        create: Thunder,
        image: s_milk
    }, // Wake out the animals
    Sleep: {
        create: Sleep,
        image: s_milk
    }, // Make the animals sleep
    Bump: {
        create: Bump,
        image: s_milk
    }, // make the hook bumping
    Scan: {
        create: Scan,
        image: s_milk
    }  // Show a scan line
};

var getObjectName = function (tag) {
    var name = [
            // MineObjects
            "Rock","Gold","Pig","Diamond","Bone","Bomb",
            // ToolObjects
            "Milk1","Milk2","Longer","Bombshell","BoneToGold","RockToRich",
            // PropObjects
            "Clock","Thunder","Sleep","Bump","Scan"
            ];
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