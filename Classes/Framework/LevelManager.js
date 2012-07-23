var LevelManager = cc.Class.extend({
    _currentRound:null,
    _gameLayer:null,
    ctor:function(gameLayer){
        if(!gameLayer){
            throw "gameLayer must be non-nil";
        }
        this._currentRound = Game.round;
        this._gameLayer = gameLayer;
    },

    _minuteToSecond:function(minuteStr){
        if(!minuteStr)
            return 0;
        if(typeof(minuteStr) !=  "number"){
            var mins = minuteStr.split(':');
            if(mins.length == 1){
                return parseInt(mins[0]);
            }else {
                return parseInt(mins[0] )* 60 + parseInt(mins[1]);
            }
        }
        return minuteStr;
    },
    
    updateMineType: function () {
        var types = ["Rock", "Gold", "Pig", "Diamond", "Bone", "Bomb"];
        var MineType = Game.MineType;
        for (var i = 0; i < types.length; i++) {
            switch (types[i]) {
                case "Rock":
                    MineType[types[i]].small.value += 1;
                    MineType[types[i]].big.value += 2;
                    break;
                case "Gold":
                    MineType[types[i]].small.value += 5;
                    MineType[types[i]].big.value += 10;
                    break;
                case "Diamond":
                    MineType[types[i]].small.value += 10;
                    MineType[types[i]].big.value += 20;
                    break;
                case "Pig":
                    MineType[types[i]].value += 3;
                    break;
                case "Bone":
                    MineType[types[i]].value += 1;
                    break;
            }
        }
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
             
            var mine;
            if (Round[round][i].type == global.Tag.Pig) {
                mine = new MineObject(Round[round][i], 1);
                var point1 = cc.ccp(Round[round][i].x, Round[round][i].y);
                var point2 = cc.ccp(this._gameLayer.winSize.width - Round[round][i].x,
                                    Round[round][i].y2);
                if (!cc.Point.CCPointEqualToPoint(point1, point2)) {
                    var duration = Math.abs((point2.x -point1.x))/winSize.width * 10;
                    var tmpMove1 = cc.MoveTo.create(duration, point2);
                    var tmpMove2 = cc.MoveTo.create(duration, point1);
                    var seq = cc.Sequence.create(tmpMove1, cc.DelayTime.create(0.2),
                    cc.FlipX.create(true), tmpMove2, cc.DelayTime.create(0.2), cc.FlipX.create(false));
                    mine.action = cc.RepeatForever.create(seq, null);
                    mine.runAction(mine.action);
                }
            } else {
                var size = Math.round(Math.random()+Game.Factor.probility);
                mine = new MineObject(Round[round][i], size);
            }
            if (mine != null) {
                this._gameLayer.addChild(mine, mine.zOrder);
                this._gameLayer.mineContainer.push(mine);
            } 
        }
    }
});