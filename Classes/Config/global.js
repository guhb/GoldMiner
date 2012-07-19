var winSize = null;
var keys = [];
var global = {
    round:0,
    score:0,
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
    mineContainer: []
};
//var levelManager = new LevelManager();