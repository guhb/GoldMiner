var winSize = null;
var keys = [];
var global = {
    round: 1,
    cur_score: 0,
    dst_score: 500,
    time_limit: 60,
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
    Speed: {
        rotate: 1,
        launch: 1,
        retrieve: 1
    },
    Factor: {
        add: 0,
        multiply: 1,
        probility: 0
    },
    mineContainer: [],
    MineType: null,
    debug: false,
    resume: function () {
        this.cur_score = 0;
        this.dst_score = 500;
        this.time_limit = 60;
        this.MineType = MineType;
        this.mineContainer = [];
    },
    cleanMineContainer: function () {
        this.mineContainer = [];
    },
    cleanToolObjects: function () {
        this.Speed.rotate = 1;
        this.Speed.launch = 1;
        this.Speed.retrieve = 1;
        this.Factor.add = 0;
        this.Factor.multiply = 1;
        this.Factor.probility = 0;
    }
};

(function(){
    if(typeof(Storage)!=="undefined") {
        if (localStorage.firstScore == null) localStorage.firstScore = 0;
        if (localStorage.secondScore == null) localStorage.secondScore = 0;
        if (localStorage.thirdScore == null) localStorage.thirdScore = 0;
        if (localStorage.yourScore == null) localStorage.yourScore = 0;
    } else {
        console.error("Sorry! No web storage support..");
    }
})();