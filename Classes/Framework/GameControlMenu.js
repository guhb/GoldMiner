var GameControlMenu = cc.Layer.extend({
    init:function () {
        var bRet = false;
        if (this._super()) {
            var winSize = cc.Director.sharedDirector().getWinSize();
            var sysMenuNormal = cc.Sprite.create(s_exit);
            var sysMenuSelected = cc.Sprite.create(s_exitbig);
            var sysMenuDisabled = cc.Sprite.create(s_exit);
            var sysMenu = cc.MenuItemSprite.create(sysMenuNormal, sysMenuSelected,sysMenuDisabled, this, this.onReturn);
			sysMenu.setScale(2.2);
            var menu = cc.Menu.create(sysMenu, null);
            menu.setScale(0.2);
            menu.setAnchorPoint(cc.ccp(0.0));
            menu.setPosition(cc.ccp(winSize.width - 38, 28));
            this.addChild(menu, global.Tag.Menu, 2);
            
            bRet = true;
        }

        return bRet;
    },
    
    onReturn:function (pSender) {
        saveRecord(Game.cur_score);
        resume();
        var scene = cc.Scene.create();
        scene.addChild(MissionLayer.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionMoveInB.create(1.2,scene));
    }
});

GameControlMenu.create = function () {
    var sg = new GameControlMenu();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};