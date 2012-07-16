var Game = cc.Layer.extend({
    _ship:null,
    init:function () {
	    // Schedule the game init and splashing
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
