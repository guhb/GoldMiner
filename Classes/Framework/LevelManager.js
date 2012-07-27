var LevelManager = cc.Class.extend({
    _currentRound: null,
    _currentMission: null,
    _gameLayer: null,
    ctor: function (gameLayer) {
        if (!gameLayer) {
            throw "gameLayer must be non-nil";
        }
        this._currentRound = Game.round;
        this._currentMission = Game.mission;
        this._gameLayer = gameLayer;
    },

    _minuteToSecond: function (minuteStr) {
        if (!minuteStr)
            return 0;
        if (typeof(minuteStr) !=  "number") {
            var mins = minuteStr.split(':');
            if (mins.length == 1){
                return parseInt(mins[0]);
            } else {
                return parseInt(mins[0] )* 60 + parseInt(mins[1]);
            }
        }
        return minuteStr;
    },

    updateGameStatus: function () {
        if (Game.dst_round != 1) {
            Game.dst_score += ((Game.round-1) % NUMBER_OF_ROUNDS) * Math.round(Math.random() * 700);
        }
        this._gameLayer.setDstScore(Game.dst_score);
        this._gameLayer.setCurScore(Game.cur_score);
        if (Game.time_limit >= 10) {
            this._gameLayer._time_limit = Game.time_limit 
                                          - Math.round(Game.round * Math.random());
        }
        this._gameLayer.setRound(Game.round);
    },

    createMap:function(){
        this._gameLayer.mineContainer = [];
        var round = (this._currentRound - 1) % NUMBER_OF_ROUNDS;
        this.updateGameStatus();
        if (this._currentRound != 1 && round == 0) this.updateMineType();
        for (var i=0; i<Round[round].length; i++) {
            var size = Math.round(Math.random());
            var mine = new MineObject(Round[round][i], size);
            if (mine != null) {
                this._gameLayer.addChild(mine, mine.zOrder, mine.type);
                this._gameLayer.mineContainer.push(mine);
            } 
        }
        
        var mission = this._currentMission;
        this._gameLayer.propContainer = [];
        var object = {};
        object.x = Math.random() * winSize.width;
        if (object.x <= 0) ojbect.x = 20;
        else if (object.x >= winSize.width) object.x = winSize.width - 20;
        object.y = Math.random() * winSize.height - 70;
        if (object.y <= 0) object.y = 40;
        else if (object.y >= winSize.height - 70) ojbect.y = 40;
        var type = Mission[mission-1].props[round];
        object.type = global.Tag[type]; 
        var prop = new PropType[type].create(object);
        this._gameLayer.addChild(prop, global.zOrder.Prop);
        this._gameLayer.mineContainer.push(prop);
    }
});