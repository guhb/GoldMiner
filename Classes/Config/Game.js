var Game = {
    round: 1,
    mission: 1,
    unlock: 3,
    cur_score: 5000,
    dst_score: 500,
    time_limit: 20,
    toolContainer: [],
    describe: null,
    gameMode: null,//单人：1，多人：2
    difficulty: 1,//游戏难度1,2,3
    Speed: {
        rotate: 2,
        launch: 1,
        retrieve: 1
    },
    resume: function () {
        this.round = 1;
        this.mission = 1;
        this.cur_score = 5000;
        this.dst_score = 500;
        this.time_limit = 60;
        this.cleanToolObjects();
    },
    cleanToolObjects: function () {
        this.toolContainer = [];
        this.Speed.rotate = 2;
        this.Speed.launch = 1;
        this.Speed.retrieve = 1;
    },
    popToolObject: function (type) {
        var container = [];
        var j = 0;
        for (var i = 0; i < this.toolContainer.length; i++) {
            if (this.toolContainer[i].type == type) continue;
            container[j++] = this.toolContainer[i];
        }
        this.toolContainer = container;
    },
};

(function(){
    if(typeof(Storage)!=="undefined") {
        if (localStorage.unlockMission == null) localStorage.unlockMission = 1;
        if (localStorage.firstScore == null) localStorage.firstScore = 0;
        if (localStorage.secondScore == null) localStorage.secondScore = 0;
        if (localStorage.thirdScore == null) localStorage.thirdScore = 0;
        if (localStorage.yourScore == null) localStorage.yourScore = 0;
        
        //Game.unlock = Number(localStorage.unlockMission);
    } else {
        console.error("Sorry! No web storage support..");
    }
}());