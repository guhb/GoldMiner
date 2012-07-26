var Game = {
    round: 1,
    mission: 1,
    unlock: 3,
    cur_score: 0,
    dst_score: 500,
    time_limit: 60,
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

var resume = function () {
    Game.round = 1;
    Game.mission = 1;
    Game.cur_score = 0;
    Game.dst_score = 500;
    Game.time_limit = 60;
    cleanToolObjects();
};

var cleanToolObjects = function () {
    Game.Speed.rotate = 1;
    Game.Speed.launch = 1;
    Game.Speed.retrieve = 1;
    Game.Factor.add = 0;
    Game.Factor.multiply = 1;
    Game.Factor.probility = 0;
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