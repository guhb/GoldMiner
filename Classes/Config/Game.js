var Game = {
    round: 1,
    mission: 1,
    unlock: 3,
    cur_score: 5000,
    dst_score: 500,
    time_limit: 5,
    toolContainer: [],
    Speed: {
        rotate: 1,
        launch: 1,
        retrieve: 1
    },
    resume: function () {
        Game.round = 1;
        Game.mission = 1;
        Game.cur_score = 5000;
        Game.dst_score = 500;
        Game.time_limit = 60;
        this.cleanToolObjects();
    },
    cleanToolObjects: function () {
        Game.Speed.rotate = 1;
        Game.Speed.launch = 1;
        Game.Speed.retrieve = 1;
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
})();