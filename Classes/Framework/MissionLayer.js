var MissionLayer = cc.Layer.extend({
    _missionView: null,
    _curPos: 500,
    _beginPos: null,
    _missionWidth: 150,
    _isMouseDown: false,
    
    init:function () {
        var bRet = false;
        if (this._super) {
            winSize = cc.Director.sharedDirector().getWinSize();
            var bg = cc.Sprite.create(global.theme.info_bg);
            bg.setAnchorPoint(cc.PointZero());
            this.addChild(bg, 0, 1);
            
            this.initMissionView();

            bRet = true;
            this.setIsTouchEnabled(true);
        }
        return bRet;
    },
    
    initMissionView: function () {
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

        var newGame = cc.MenuItemSprite.create(newGameNormal, newGameSelected,newGameDisabled, this, this.onMissionSelected);

        var gameSettings = cc.MenuItemSprite.create(gameSettingsNormal, gameSettingsSelected, gameSettingsDisabled, this, this.onMissionSelected);
        var record = cc.MenuItemSprite.create(recordNormal, recordSelected, recordDisabled, this, this.onMissionSelected);
        var about = cc.MenuItemSprite.create(aboutNormal, aboutSelected, aboutDisabled, this, this.onMissionSelected);

        this._missionView = cc.Menu.create(record, newGame,  about, gameSettings);
        this._missionView.alignItemsHorizontallyWithPadding(10);
        this.addChild(this._missionView, 1, 2);
        this._missionView.setAnchorPoint(cc.ccp(0,0));
        this._missionView.setPosition(cc.ccp(this._curPos, winSize.height / 2));
        this._missionView.setScale(0.5);
    },
    
    ccTouchesBegan: function (touches, event) {
        if (!this.isMouseDown) {
            this._beginPos = touches[0].locationInView(0).x;
        }
        //var X = touches[0].locationInView(0).x;
        console.log(X);
    },
    
    ccTouchesMoved: function (touches, event) {
        var x1 = touches[0].locationInView(0).x;
        var x2 = touches[0].previousLocationInView(0).x;
        //this._missionView.setPosition(cc.ccp());
    },
    
    ccTouchesEnded: function (touches, event) {
        var X = touches[0].locationInView(0).x;
        if (X - this._beginPos > 0) {
            this._curPos += this._missionWidth;
            var move = cc.MoveTo.create(0.1, cc.ccp(this._curPos, winSize.height/2));
            this._missionView.runAction(move);
        } else {
            this._curPos -= this._missionWidth;
            var move = cc.MoveTo.create(0.1, cc.ccp(this._curPos, winSize.height/2));
            this._missionView.runAction(move);
        }
    },
    
    onMissionSelected: function (pSender) {
        var mission = (this._curPos - 500) / this._missionWidth;
        console.log(mission);
    },

    onPlayAgain:function (pSender) {
        resume();
        var scene = cc.Scene.create();
        scene.addChild(GameLayer.create());
        scene.addChild(GameControlMenu.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2,scene));
    }
});

MissionLayer.create = function () {
    var sg = new MissionLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

MissionLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = MissionLayer.create();
    scene.addChild(layer);
    return scene;
};
