var RecordLayer = cc.Layer.extend({
    
    init:function () {
        var bRet = false;
        if (this._super()) {
            var bg = cc.Sprite.create(s_background2);
            bg.setAnchorPoint(cc.PointZero());
            this.addChild(bg, 0, 1);
            
            this.initRecord();

            var backButton = cc.Sprite.create(s_back);
			backButton.setScale(0.5);
			var backButtonSelected = cc.Sprite.create(s_backbig);
			backButtonSelected.setScale(0.5);
			var backButtonDisabled = cc.Sprite.create(s_back);
			backButtonDisabled.setScale(0.5);
			var back = cc.MenuItemSprite.create(backButton,backButtonSelected,backButtonDisabled,this,this.onReturn);
            var menu = cc.Menu.create(back);
            menu.setPosition(cc.ccp(winSize.width-100,150));
            this.addChild(menu);
            bRet = true;
        }

        return bRet;
    },
    
    initRecord: function () {
        var records = getRecords();
        //var record;
        var height = 325;
        var titles = ["First", "Second", "Third", "Yours"];
        if (records != null && records.length != 0) {
            for (var i = 0; i < records.length; i++) {
                var record = cc.LabelBMFont.create(titles[i] + " : " + records[i],"Resources/fonts/bitmapFontTest3.fnt")
				//record = cc.LabelBMFont.create("configuration", "Resources/fonts/bitmapFontTest3.fnt");
                record.setPosition(cc.ccp(winSize.width/2,height));
                height -= 60;
				//record.setColor(new cc.Color3B(100,94,94));
                this.addChild(record);
            }
        }
    },
    
    onAccept: function () {
        var scene = cc.Scene.create();
        scene.addChild(GameLayer.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionSlideInT.create(1.2, scene));
        this.getParent().removeChild(this);
    },
    
    onReturn: function () {
        var scene = cc.Scene.create();
        scene.addChild(StartLayer.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionSlideInT.create(1.2, scene));
        //this.getParent().removeChild(this);
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
        /*if (record > Number(localStorage.firstScore))
            localStorage.firstScore = record;
        else if (record > Number(localStorage.secondScore))
            localStorage.secondScore = record;
        else if (record > Number(localStorage.thirdScore))
            localStorage.thirdScore = record;
        else console.log("Score not in top three.");*/
        
		var r = localStorage.record;
		r = r.split(",");
		r.push("" + record);
		localStorage.yourScore = record;
		r.sort();
		r.reverse();
		localStorage.record = r;
		
    } else {
        console.error("Sorry! No web storage support..");
    }
};

var getRecords = function () {
    var records = [];
    if(typeof(Storage)!=="undefined") {
        /*records.push(localStorage.firstScore);
        records.push(localStorage.secondScore);
        records.push(localStorage.thirdScore);*/
        
		records = localStorage.record.split(",").slice(0, 3);
		records.push(localStorage.yourScore);
		
        return records;
    } else {
        console.error("Sorry! No web storage support..");
    }
}