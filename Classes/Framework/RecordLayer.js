var RecordLayer = cc.Layer.extend({
    ctor: function () {
	}
});

RecordLayer.create = function () {
    var sg = new RecordLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

RecordLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = RecordLayer.create();
    scene.addChild(layer, 1);
    return scene;
};