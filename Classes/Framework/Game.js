var Game = cc.Layer.extend({
    init:function () {
        // TODO Schedule the game init and splashing
        // may be deprecated, and use SplashLayer to directly 
        // transit to StartLayer instead
    
    
    }
});

Game.create = function () {
    var sg = new Game();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

Game.scene = function () {
    var scene = cc.Scene.create();
    var layer = Game.create();
    scene.addChild(layer);
    return scene;
};
