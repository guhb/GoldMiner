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
    
    // compute the dst score and time limit
    updateGameStatus: function () {
        global.dst_score += global.round * Math.round(Math.random() * 200) + global.cur_score;
        this._gameLayer.setDstScore(global.dst_score);
        this._gameLayer.setCurScore(global.cur_score);
        if (global.time_limit >= 10) {
            this._gameLayer._time_limit = global.time_limit 
                                          - Math.round(global.round * Math.random());
        }
        this._gameLayer.setRound(global.round);
    },

    createMap:function(){
        var round = this._currentRound % NUMBER_OF_ROUNDS;
        for (var i=0; i<Round[round].length; i++) {
             
            var mine;
            if (Round[round][i].type == global.Tag.Pig) {
                mine = new MineObject(Round[round][i], 1);
                var point1 = cc.ccp(Round[round][i].x, Round[round][i].y);
                var point2 = cc.ccp(Round[round][i].x2, Round[round][i].y2);
                if (!cc.Point.CCPointEqualToPoint(point1, point2)) {
                    var tmpMove1 = cc.MoveTo.create(point1, point2);
                    var tmpMove2 = cc.MoveTo.create(point2, point1);
                    var seq = cc.Sequence.create(tmpMove1, cc.DelayTime.create(0.1),
                                                 tmpMove2, cc.DelayTime.create(0.1));
                    //var tmpAction = cc.RepeatForever.create(seq);
                    mine.action = cc.RepeatForever.create(seq);
                    //mine.runAction(mine.action);
                    console.log("createMap->mine.action" + i + ": " + mine.action);
                }
            } else {
                var size = Math.round(Math.random());
                mine = new MineObject(Round[round][i], size);
            }
            if (mine != null) {
                this._gameLayer.addChild(mine, global.zOrder.Mine);
                global.mineContainer.push(mine);
                if (mine.action != null) mine.runAction(mine.action);
                console.log("createMap->add" + i + ": " + getTagName(mine.type));
            } 
        }
        this.updateGameStatus();
    }
});