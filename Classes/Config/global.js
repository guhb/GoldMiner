var winSize = null;
var keys = [];
var global = {
    round:1,
    cur_score:0,
    dst_score:500,
    time_limit: 60,
    sound:true,
    Tag:{
        Rock: 900,
        Gold: 901,
        Pig: 902,
        Diamond: 903,
        Bone: 904,
        Bomb: 905
    },
    zOrder: {
        Mine: 40
    },
    mineContainer: [],
    debug: false
};