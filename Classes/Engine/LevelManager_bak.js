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
        var i = 0;
        for (i=0; i<Round[round].rocks.length; i++) {
             var rock = new MineObject(Round[round].rocks[i]);
             this._gameLayer.addChild(addEnemy, global.zOrder.Mine, global.Tag.Rock);
             global.mineContainer.push(rock);
        }
        
        // add gold to game layer
        for (i=0; i<Round[round].golds.length; i++) {
             var gold = new MineObject(Round[round].golds[i]);
             this._gameLayer.addChild(addEnemy, global.zOrder.Mine, global.Tag.Gold);
             global.mineContainer.push(gold);
        }
        
        // add diamond to game layer
        for (i=0; i<Round[round].diamonds.length; i++) {
             var diamond = new MineObject(Round[round].diamonds[i]);
             this._gameLayer.addChild(addEnemy, global.zOrder.Mine, global.Tag.Diamond);
             global.mineContainer.push(diamond);
        }
        
        // add bones to game layer
        for (i=0; i<Round[round].bones.length; i++) {
             var diamond = new MineObject(Round[round].bones[i]);
             this._gameLayer.addChild(addEnemy, global.zOrder.Mine, global.Tag.Bone);
             global.mineContainer.push(bone);
        }
        
        // add bomb to game layer
        for (i=0; i<Round[round].bombs.length; i++) {
             var diamond = new MineObject(Round[round].bombs[i]);
             this._gameLayer.addChild(addEnemy, global.zOrder.Mine, global.Tag.Bomb);
             global.mineContainer.push(bomb);
        }
        
        // add pigs to game layer
        for (i=0; i<Round[round].pigs.length; i++) {
             var diamond = new MineObject(Round[round].pigs[i]);
             this._gameLayer.addChild(addEnemy, global.zOrder.Mine, global.Tag.Pig);
             global.mineContainer.push(pig);
        }
    }
});