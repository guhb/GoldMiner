var RecordLayer = cc.Layer.extend({
    
    init:function () {
        var bRet = false;
        if (this._super()) {
            var bg = cc.Sprite.create(s_background2);
            bg.setAnchorPoint(cc.PointZero());
            this.addChild(bg, 0, 1);
            
            this.initRecord();

            cc.MenuItemFont.setFontName("Arial");
            cc.MenuItemFont.setFontSize(26);
            var label = cc.LabelTTF.create("Go back", "Arial", 20);
            var back = cc.MenuItemLabel.create(label, this, this.onReturn);

            var menu = cc.Menu.create(back);
            menu.setPosition(cc.ccp(winSize.width/2,50));
            this.addChild(menu);

            bRet = true;
        }

        return bRet;
    },
    
    initRecord: function () {
        var records = getRecords();
        var record;
        var height = 300;
        var titles = ["First", "Second", "Third", "Yours"];
        if (records != null && records.length != 0) {
            for (var i = 0; i < records.length; i++) {
                record = cc.LabelTTF.create(titles[i] + " : " + records[i],cc.SizeMake(winSize.width * 0.85 ,100),
                                            cc.TEXT_ALIGNMENT_CENTER,"Arial",14)
                record.setPosition(cc.ccp(winSize.width/2,height));
                height -= 40;
                this.addChild(record);
            }
        }
    },
    
    onAccept: function () {
        var scene = cc.Scene.create();
        scene.addChild(GameLayer.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2, scene));
        this.getParent().removeChild(this);
    },
    
    onReturn: function () {
        var scene = cc.Scene.create();
        scene.addChild(StartLayer.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2, scene));
        this.getParent().removeChild(this);
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

var saveRecord = function (record) {
    if(typeof(Storage)!=="undefined") {
        if (record > Number(localStorage.firstScore))
            localStorage.firstScore = record;
        else if (record > Number(localStorage.secondScore))
            localStorage.secondScore = record;
        else if (record > Number(localStorage.thirdScore))
            localStorage.thirdScore = record;
        else console.log("Score not in top three.");
        localStorage.yourScore = record;
    } else {
        console.error("Sorry! No web storage support..");
    }
};

var getRecords = function () {
    var records = [];
    if(typeof(Storage)!=="undefined") {
        records.push(localStorage.firstScore);
        records.push(localStorage.secondScore);
        records.push(localStorage.thirdScore);
        records.push(localStorage.yourScore);
        return records;
    } else {
        console.error("Sorry! No web storage support..");
    }
}