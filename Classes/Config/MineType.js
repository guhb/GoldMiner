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

var getTagName = function (tag) {
    switch (tag) {
        case 900: name = "Rock"; break;
        case 901: name = "Gold"; break;
        case 902: name = "Pig"; break;
        case 903: name = "Diamond"; break;
        case 904: name = "Bone"; break;
        case 905: name = "Bomb"; break;
    }
    return name;
};