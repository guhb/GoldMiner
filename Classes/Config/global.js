var winSize = null;
var keys = [];
var global = {
    sound: true,
    Tag:{
        Rock: 900,
        Gold: 901,
        Pig: 902,
        Diamond: 903,
        Bone: 904,
        Bomb: 905,
        Milk: 906,
        Clock: 907,
        MoneyTree: 908,
        Rich: 909
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
        Tool: 47,
        Menu: 60
    },
    debug: false,
};

var Game = {
    round: 1,
    cur_score: 0,
    dst_score: 500,
    time_limit: 60,
    MineType: null,
    theme: Theme[0],
    Speed: {
        rotate: 1,
        launch: 1,
        retrieve: 1
    },
    Factor: {
        add: 0,
        multiply: 1,
        probility: 0
    }
};

    
// Lines below intruduce a bug that
// makes the frame rate fall below 40
var resume = function () {
    Game.cur_score = 0;
    Game.dst_score = 500;
    Game.time_limit = 60;
    Game.MineType = getMineType();
    Game.mineContainer = [];
    cleanToolObjects();
};
var cleanToolObjects = function () {
    Game.Speed.rotate = 1;
    Game.Speed.launch = 1;
    Game.Speed.retrieve = 1;
    Game.Factor.add = 0;
    Game.Factor.multiply = 1;
    Game.Factor.probility = 0;
}