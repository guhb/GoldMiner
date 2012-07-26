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

var PropType = {
    Milk: {
        create: Milk,
        image: s_milk
    }, // Make the hook quicker
    Quick: {
        create: Quick,
        image: s_milk
    }, // Make the hook quicker
    Clock: {
        create: Clock,
        image: s_clock
    }, // Make the time longer
    Bone: {
        create: Bone,
        image: s_bone
    }, // Make the dog sleep
    Silent: {
        create: Silent,
        image: s_milk
    }, // Make the dog silent
    Thunder: {
        create: Thunder,
        image: s_milk
    }, // Wake out the animals
    Alarm: {
        create: Alarm,
        image: s_milk
    }, // Wake out the farmer
    Sleep: {
        create: Sleep,
        image: s_bone
    }, // Make the animals sleep
    Lighter: {
        create: Lighter,
        image: s_milk
    }, // Make the animals ligher
    Bump: {
        create: Bump,
        image: s_milk
    }, // make the hook bumping
    Smaller: {
        create: Smaller,
        image: s_milk
    }, // Make the hook smaller
    Bigger: {
        create: Bigger,
        image: s_milk
    }, // Make the hook bigger
    Sort: {
        create: Sort,
        image: s_milk
    }, // Sort out the animals
    Longer: {
        create: Longer,
        image: s_hook_long
    }, // Make the hook longer
    Frozen: {
        create: Frozen,
        image: s_milk
    }, // Frozen the hook for a given time
    Reverse: {
        create: Reverse,
        image: s_milk
    }, // Reverse the origin launch direction of the hook
    Scan: {
        create: Scan,
        image: s_milk
    },  // Show a scan line
    Shift: {
        create: Shift,
        image: s_milk
    } // Shift the position of the hook
};

var getObjectName = function (tag) {
    var name = [
            // MineObjects
            "Rock","Gold","Pig","Diamond","Bone","Bomb",
            // ToolObjects
            "Milk","Clock","MoneyTree","Rich",
            // PropObjects
            "Quik","Clock","Silent","Thunder","Alarm",
            "Sleep","Lighter","Bump","Smaller","Bigger",
            "Sort","Longer","Frozen","Reverse","Scan",
            "Shift"];
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