var MineType = {
    Rock: {
        big: {
            value: 10,
            weight: 100,
            image: s_big_rock
        },
        small: {
            value: 5,
            weight: 50,
            image: s_small_rock
        }
    },
    
    Gold: {
        big: {
            value: 100,
            weight: 100,
            image: s_big_gold
        },
        small: {
            value: 50,
            weight: 50,
            image: s_small_gold
        }
    },
    
    Pig: {
        value: 100,
        weight: 50,
        image: s_pig
    },
    
    Diamond: {
        big: {
            value: 1000,
            weight: 100,
            image: s_big_diamond
        },
        small: {
            value: 500,
            weight: 50,
            image: s_small_diamond
        }
    },
    
    Bone: {
        value: 10,
        weight: 40,
        image: s_bone
    },
    
    Bomb: {
        value: 0,
        weight: 0,
        image: s_bomb
    }
};

var ToolType = {
    Milk: {
        LaunchSpeed: -0.1,
        RetrieveSpeed: -0.1,
        image: s_milk
    },
    
    Clock: {
        RotateSpeed: -0.1,
        image: s_clock
    },
    
    MoneyTree: {
        addValue: 50,
        Multiply: 2,
        image: s_money_tree
    },
    
    Rich: {
        Probility: 0.2,
        image: s_rich
    }
};


var getObjectName = function (tag) {
    var name = ["Rock","Gold","Pig","Diamond","Bone","Bomb",
                "Milk","Clock","MoneyTree","Rich"];
    return name[tag-global.Tag.Rock];
};