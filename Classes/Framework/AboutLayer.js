var AboutLayer = cc.Layer.extend({
    init:function () {
        var bRet = false;
        if (this._super()) {
            var bg = cc.Sprite.create(s_about);
            bg.setAnchorPoint(cc.PointZero());
            this.addChild(bg, 0, 1);

            var about = cc.LabelTTF.create("\n A game that play like the Gold Miner.","Arial",24);
            about.setPosition(cc.ccp(winSize.width/2,winSize.height/2 + 80));
            this.addChild(about);
			about.setColor(new cc.Color3B(100,94,94));

            var author = cc.LabelTTF.create("Programmer","Arial",30);
            author.setPosition(cc.ccp(winSize.width/2,270));
            this.addChild(author);
            author.setColor(new cc.Color3B(100,94,94));
			
            author = cc.LabelTTF.create("Koh Ou Ping","Arial",30);
            author.setPosition(cc.ccp(winSize.width/2,210));
            this.addChild(author);
			author.setColor(new cc.Color3B(100,94,94));
			
            author = cc.LabelTTF.create("Xi Ling Ran",cc.SizeMake(winSize.width * 0.85 ,100),cc.TEXT_ALIGNMENT_CENTER,"Arial",30);
            author.setPosition(cc.ccp(winSize.width/2,145));
            this.addChild(author);
			author.setColor(new cc.Color3B(100,94,94));
			
            var backButton = cc.Sprite.create(s_back);
			backButton.setScale(0.5);
			var backButtonSelected = cc.Sprite.create(s_backbig);
			backButtonSelected.setScale(0.5);
			var backButtonDisabled = cc.Sprite.create(s_back);
			backButtonDisabled.setScale(0.5);
			var back = cc.MenuItemSprite.create(backButton,backButtonSelected,backButtonDisabled,this,this.backCallback);
            var menu = cc.Menu.create(back);
            menu.setPosition(cc.ccp(winSize.width-100,150));
            this.addChild(menu);
            bRet = true;
        }

        return bRet;
    },
    backCallback:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(StartLayer.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2,scene));
    }
});

AboutLayer.create = function () {
    var sg = new AboutLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};