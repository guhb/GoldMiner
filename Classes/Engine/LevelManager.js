var LevelManager = cc.Class.extend({
    _currentRound:null,
    _gameLayer:null,
    ctor:function(gameLayer){
        if(!gameLayer){
            throw "gameLayer must be non-nil";
        }
        this._currentRound = global.round;
        this._gameLayer = gameLayer;
        this.setRound(this._currentRound);
    },

    setRound:function(round){
        // compute the dst score and time limit
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

    createMap:function(){
        var round = this._currentRound % NUMBER_OF_ROUNDS;
        
        // add rock to game layer
        for (var i=0; i<Round[round].length; i++) {
             
             var mine;
             switch (Round[round][i].type) {
                 case global.Tag.Pig:
                     break;
                 case global.Tag.Bomb:
                     // bomb specific implementation
                 case global.Tag.Bone:
                     // bone specific implementation
                 default:
                     // general implementation
                     var size = Math.round(Math.random());
                     mine = new Mine.create(Round[round][i], size);
             }
             
             this._gameLayer.addChild(mine, global.zOrder.Mine);
             global.mineContainer.push(mine);
        }
        
    }
});