var StartLayer = cc.Layer.extend({
    _ship:null,
    init:function () {
        var bRet = false;
        if (this._super) {
            winSize = cc.Director.sharedDirector().getWinSize();
            
            this.initLogo();
            this.initBackground();
            this.initMenu();
            this.initSprites();

            if (global.sound) {
                cc.AudioManager.sharedEngine().setBackgroundMusicVolume(0.7);
                cc.AudioManager.sharedEngine().playBackgroundMusic(s_mainMainMusic, true);
            }

            bRet = true;
        }
        return bRet;
    },
    
    initLogo: function () {
        /*
        var logo = cc.Sprite.create(s_logo);
        logo.setAnchorPoint(cc.ccp(0, 0));
        logo.setPosition(cc.ccp(0, 250));
        this.addChild(logo, 10, 1);
        */
    },
    
    initBackground: function () {
        var sp = cc.Sprite.create(s_bg);
        sp.setAnchorPoint(cc.PointZero());
        this.addChild(sp, 0, 1);
    },
    
    initMenu: function () {
		var startButton = cc.Sprite.create(s_array1);
		var aboutButton = cc.Sprite.create(s_array2);
		var recordButton = cc.Sprite.create(s_array3);
		var startButtonDisabled = cc.Sprite.create(s_array1);
		var aboutButtonDisabled = cc.Sprite.create(s_array2);
		var recordButtonDisabled = cc.Sprite.create(s_array3);
		var startButtonSelected = cc.Sprite.create(s_array1_big);
		var aboutButtonSelected = cc.Sprite.create(s_array2_big);
		var recordButtonSelected = cc.Sprite.create(s_array3_big);
		
		var newGame = cc.MenuItemSprite.create(startButton,startButtonSelected,startButtonDisabled,this,function () {
            this.onButtonEffect();
            flareEffect(this, this, this.onNewGame);
        });
		newGame.setPosition(cc.ccp(0,50));
		var record = cc.MenuItemSprite.create(recordButton,recordButtonSelected,recordButtonDisabled,this,this.onRecord);
		record.setPosition(cc.ccp(150,120));
		var about = cc.MenuItemSprite.create(aboutButton,aboutButtonSelected,aboutButtonDisabled,this,this.onAbout);
		about.setPosition(cc.ccp(280,180));
        var menu = cc.Menu.create(record, newGame, about);
        //menu.alignItemsInColumns(2,2);
        this.addChild(menu, 1, 2);
        //menu.setAnchorPoint(cc.ccp(0,0));
        menu.setPosition(cc.ccp(winSize.width / 2, winSize.height / 2));
		//menu.setScale(0.5);
    },
    
    initSprites:function() {	
		//÷Ì
		var texture1 = cc.TextureCache.sharedTextureCache().addImage(s_animals);
		var pigFrame1 = cc.SpriteFrame.create(texture1,cc.RectMake(0,0,90,130));
		var pigSprite = cc.Sprite.createWithSpriteFrame(pigFrame1);
		pigSprite.setPosition(cc.ccp(250,430));
		pigSprite.setScale(0.9);
		this.addChild(pigSprite,10);
		var pigFrame2 = cc.SpriteFrame.create(texture1,cc.RectMake(103,0,90,130));
		var pigFrame3 = cc.SpriteFrame.create(texture1,cc.RectMake(1,136,85,130));
		var pigFrame4 = cc.SpriteFrame.create(texture1,cc.RectMake(103,136,90,130));
		var pigFrames = [];
		pigFrames.push(pigFrame1);
		pigFrames.push(pigFrame2);
		pigFrames.push(pigFrame3);
		pigFrames.push(pigFrame4);
		var pigAnimation = cc.Animation.create(pigFrames,0.5);
		var pigAnimate = cc.Animate.create(pigAnimation,false);
		pigSprite.runAction(cc.RepeatForever.create(pigAnimate));
		//π∑
		var texture2 = cc.TextureCache.sharedTextureCache().addImage(s_dog);
		var dogFrame1 = cc.SpriteFrame.create(texture2,cc.RectMake(0,0,237,159));
		var dogSprite = cc.Sprite.createWithSpriteFrame(dogFrame1);
		dogSprite.setPosition(cc.ccp(400,420));
		dogSprite.setScale(0.5);
		this.addChild(dogSprite,10);
		var dogFrame2 = cc.SpriteFrame.create(texture2,cc.RectMake(0,159,237,159));
		var dogFrames = [];
		dogFrames.push(dogFrame1);
		dogFrames.push(dogFrame2);
		var dogAnimation = cc.Animation.create(dogFrames,0.5);
		var dogAnimate = cc.Animate.create(dogAnimation,false);
		dogSprite.runAction(cc.RepeatForever.create(dogAnimate));
		//ƒÃ≈£
		var texture3 = cc.TextureCache.sharedTextureCache().addImage(s_cow);
		var cowFrame1 = cc.SpriteFrame.create(texture3,cc.RectMake(0,0,324,200));
		var cowSprite = cc.Sprite.createWithSpriteFrame(cowFrame1);
		cowSprite.setPosition(cc.ccp(120,100));
		cowSprite.setScale(0.7);
		this.addChild(cowSprite,10);
		var cowFrame2 = cc.SpriteFrame.create(texture3,cc.RectMake(0,200,324,200));
		var cowFrame3 = cc.SpriteFrame.create(texture3,cc.RectMake(0,400,324,200));
		var cowFrames = [];
		cowFrames.push(cowFrame1);
		cowFrames.push(cowFrame2);
		cowFrames.push(cowFrame3);
		var cowAnimation = cc.Animation.create(cowFrames,0.5);
		var cowAnimate = cc.Animate.create(cowAnimation,false);
		cowSprite.runAction(cc.RepeatForever.create(cowAnimate));
		//√‡—Ú
		var texture1 = cc.TextureCache.sharedTextureCache().addImage(s_sheep);
		var sheepFrame1 = cc.SpriteFrame.create(texture1,cc.RectMake(0,0,104,170));
		var sheepFrame2 = cc.SpriteFrame.create(texture1,cc.RectMake(103,0,106,170));
		var sheepFrame3 = cc.SpriteFrame.create(texture1,cc.RectMake(214,0,105,170));
		var sheepFrame4 = cc.SpriteFrame.create(texture1,cc.RectMake(319,0,114,170));
		var sheepSprite = cc.Sprite.createWithSpriteFrame(sheepFrame4);
		sheepSprite.setPosition(cc.ccp(350,100));
		sheepSprite.setScale(1.0);
		this.addChild(sheepSprite,10);			
		var sheepFrames = [];
		sheepFrames.push(sheepFrame1);
		sheepFrames.push(sheepFrame2);
		sheepFrames.push(sheepFrame3);
		sheepFrames.push(sheepFrame4);
		var sheepAnimation = cc.Animation.create(sheepFrames,0.5);
		var sheepAnimate = cc.Animate.create(sheepAnimation,false);
		//sheepSprite.runAction(cc.RepeatForever.create(sheepAnimate));	
	},
    
    onNewGame:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(MissionLayer.create());
        //scene.addChild(GameControlMenu.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionMoveInB.create(1.2, scene));
    },
    
    onSettings:function (pSender) {
        this.onButtonEffect();
        var scene = cc.Scene.create();
        scene.addChild(SettingsLayer.create());
        scene.addChild(GameControlMenu.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
    
    onRecord:function (pSender) {
        this.onButtonEffect();
        var scene = cc.Scene.create();
        scene.addChild(RecordLayer.create());
        //scene.addChild(GameControlMenu.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
    
    onAbout:function (pSender) {
        this.onButtonEffect();
        var scene = cc.Scene.create();
        scene.addChild(AboutLayer.create());
        //scene.addChild(GameControlMenu.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
    
    onButtonEffect:function(){
        if (global.sound) {
            var s = cc.AudioManager.sharedEngine().playEffect(s_buttonEffect);
        }
    }
});

StartLayer.create = function () {
    var sg = new StartLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

StartLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = StartLayer.create();
    scene.addChild(layer);
    return scene;
};
