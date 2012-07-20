var winSize = null;
var keys = [];
var global = {
    round: 1,
    cur_score: 0,
    dst_score: 500,
    time_limit: 20,
    sound: true,
    Tag:{
        Rock: 900,
        Gold: 901,
        Pig: 902,
        Diamond: 903,
        Bone: 904,
        Bomb: 905
    },
    zOrder: {
        Background: -10,
        Label: 20,
        Miner: 25,
        Hook: 30,
        Rock: 41,
        Gold: 42,
        Pig: 43,
        Diamond: 44,
        Bone: 45,
        Bomb: 46,
        Menu: 60
    },
    mineContainer: [],
    MineType: null,
    debug: false,
    resume: function () {
        this.cur_score = 0;
        this.dst_score = 500;
        this.time_limit = 60;
        this.MineType = MineType;
    }
};