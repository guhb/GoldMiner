var MineType = {
    Rock: {
        create: Rock,
        big: {
            value: 40,
            weight: 800,
            image: global.theme.big_rock
        },
        small: {
            value: 20,
            weight: 400,
            image: global.theme.small_rock
        }
    },
    
    Gold: {
        create: Gold,
        big: {
            value: 500,
            weight: 800,
            image: global.theme.big_gold
        },
        middle:{
			value: 250,
			weight: 400,
			image:global.theme.middle_gold
		},
        small: {
            value: 150,
            weight: 200,
            image: global.theme.small_gold
        }
    },
    
    Pig: {
        create: Pig,
        value: 100,
        weight: 200,
        image: global.theme.pig
    },
    
    Diamond: {
        create: Diamond,
        big: {
            value: 800,
            weight: 150,
            image: global.theme.big_diamond
        },
        small: {
            value: 700,
            weight: 50,
            image: global.theme.small_diamond
        }
    },
    
    Bone: {
        create: Bone,
        value: 80,
        weight: 200,
        image: global.theme.bone
    },
    
    Bat: {
        create: Bat,
        value: 50,
        weight: 200,
        image: global.theme.bat
    }
};

var ToolType = {
    Milk1: {
        create: Milk1,
        value: 500,
        image: s_milk1
    }, // Make the hook retrieve quicker
    Milk2: {
        create: Milk2,
        value: 2000,
        image: s_milk2
    },
    Longer: {
        create: Longer,
        value: 500,
        image: s_aim
    }, // Make the hook longer
    Bombshell: {
        create: Bombshell,
        value: 800,
        image: s_bomb
    }, // Bomb all the rocks
    BoneToGold: {
        create: BoneToGold,
        value: 800,
        image: s_bonebook
    }, // Turn Bones into Golds
    RockToRich: {
        create: RockToRich,
        value: 200,
        image: s_stonebook
    } // Multiplay the value of rocks
};

var PropType = {
    Clock: {
        create: Clock,
        image: s_clock
    }, // Make the time Longer
    /*
    Thunder: {
        create: Thunder,
        image: s_milk
    }, // Wake out the animals
    Sleep: {
        create: Sleep,
        image: s_milk
    }, // Make the animals sleep
    */
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
            "Rock","Gold","Pig","Diamond","Bone","Bat",
            // ToolObjects
            "Milk1","Milk2","Longer","Bombshell","BoneToGold","RockToRich",
            // PropObjects
            "Clock","Thunder","Sleep","Bump","Scan"
            ];
    return name[tag - global.Tag.Rock];
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