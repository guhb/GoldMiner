var StartLayer = cc.Layer.extend({
    _ship:null,
    init:function () {
        var bRet = false;
        if (this._super) {
            winSize = cc.Director.sharedDirector().getWinSize();
            
            this.initLogo();
            this.initBackground();
            this.initMenu();

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
        var sp = cc.Sprite.create(s_background1);
        sp.setAnchorPoint(cc.PointZero());
        this.addChild(sp, 0, 1);
    },
    
    initMenu: function () {
        var newGameNormal = cc.Sprite.create(s_start_menu, cc.RectMake(0, 0, 250, 210));
        var newGameSelected = cc.Sprite.create(s_start_menu, cc.RectMake(0, 210, 250, 210));
        var newGameDisabled = cc.Sprite.create(s_start_menu, cc.RectMake(0, 420, 250, 210));
        
        var gameSettingsNormal = cc.Sprite.create(s_start_menu, cc.RectMake(250, 0, 250, 210));
        var gameSettingsSelected = cc.Sprite.create(s_start_menu, cc.RectMake(250, 210, 250, 210));
        var gameSettingsDisabled = cc.Sprite.create(s_start_menu, cc.RectMake(250, 420 * 2, 250, 210));
        
        var recordNormal = cc.Sprite.create(s_start_menu, cc.RectMake(500, 0, 250, 210));
        var recordSelected = cc.Sprite.create(s_start_menu,cc.RectMake(500, 210, 250, 210));
        var recordDisabled = cc.Sprite.create(s_start_menu, cc.RectMake(500, 420, 250, 210));

        var aboutNormal = cc.Sprite.create(s_start_menu,cc.RectMake(750, 0, 250, 210));
        var aboutSelected = cc.Sprite.create(s_start_menu, cc.RectMake(750, 210, 250, 210));
        var aboutDisabled = cc.Sprite.create(s_start_menu, cc.RectMake(750, 420, 250, 210));

        var newGame = cc.MenuItemSprite.create(newGameNormal, newGameSelected, newGameDisabled, this, function () {
            this.onButtonEffect();
            flareEffect(this, this, this.onNewGame);
        });

        var gameSettings = cc.MenuItemSprite.create(gameSettingsNormal, gameSettingsSelected, gameSettingsDisabled, this, this.onSettings);
        var record = cc.MenuItemSprite.create(recordNormal, recordSelected, recordDisabled, this, this.onRecord);
        var about = cc.MenuItemSprite.create(aboutNormal, aboutSelected, aboutDisabled, this, this.onAbout);

        var menu = cc.Menu.create(record, newGame,  about, gameSettings);
        menu.alignItemsInColumns(2,2);
        this.addChild(menu, 1, 2);
        menu.setAnchorPoint(cc.ccp(0,0));
        menu.setPosition(cc.ccp(winSize.width / 2, winSize.height / 2));
        menu.setScale(0.5);
    },
    
    onNewGame:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(GameLayer.create());
        scene.addChild(GameControlMenu.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2, scene));
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
        scene.addChild(GameControlMenu.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
    
    onAbout:function (pSender) {
        this.onButtonEffect();
        var scene = cc.Scene.create();
        scene.addChild(AboutLayer.create());
        scene.addChild(GameControlMenu.create());
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
