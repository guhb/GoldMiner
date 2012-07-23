var LevelManager = cc.Class.extend({
    _currentRound:null,
    _gameLayer:null,
    ctor:function(gameLayer){
        if(!gameLayer){
            throw "gameLayer must be non-nil";
        }
        this._currentRound = global.round;
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
        var MineType = global.MineType;
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
        if (global.dst_round != 1) {
            global.dst_score += global.round * Math.round(Math.random() * 300);
        }
        this._gameLayer.setDstScore(global.dst_score);
        this._gameLayer.setCurScore(global.cur_score);
        if (global.time_limit >= 10) {
            this._gameLayer._time_limit = global.time_limit 
                                          - Math.round(global.round * Math.random());
        }
        this._gameLayer.setRound(global.round);
    },

    createMap:function(){
        this._gameLayer.mineContainer = [];
        // The logic is wrong here as round 1 never start from Round[0]
        var round = this._currentRound % NUMBER_OF_ROUNDS;
        this.updateGameStatus();
        if (this._currentRound != 1) this.updateMineType();
        for (var i=0; i<Round[round].length; i++) {
             
            var mine;
            if (Round[round][i].type == global.Tag.Pig) {
                mine = new MineObject(Round[round][i], 1);
                var point1 = cc.ccp(Round[round][i].x, Round[round][i].y);
                var point2 = cc.ccp(this._gameLayer.winSize.width - Round[round][i].x2,
                                    Round[round][i].y2);
                if (!cc.Point.CCPointEqualToPoint(point1, point2)) {
                    var tmpMove1 = cc.MoveTo.create(point1, point2);
                    var tmpMove2 = cc.MoveTo.create(point2, point1);
                    var seq = cc.Sequence.create(tmpMove1, cc.DelayTime.create(0.1),
                                                 tmpMove2, cc.DelayTime.create(0.1));
                    mine.action = cc.RepeatForever.create(seq, null);
                    //mine.runAction(mine.action);
                    //console.log("createMap->mine.action" + i + ": " + mine.action);
                }
            } else {
                var size = Math.round(Math.random()+global.Factor.probility);
                mine = new MineObject(Round[round][i], size);
            }
            if (mine != null) {
                try {
                    this._gameLayer.addChild(mine, mine.zOrder);
                    this._gameLayer.mineContainer.push(mine);
                } catch (err) {
                    console.error("Failed to add MineOject. Type: " + getTagName(mine.type));
                }
                //if (mine.action != null) mine.runAction(mine.action);
                //console.log("createMap->add " + i + " : " + getTagName(mine.type));
            } 
        }
    }
});