var GameControlMenu = cc.Layer.extend({
    init:function () {
        var bRet = false;
        if (this._super()) {
            var winSize = cc.Director.sharedDirector().getWinSize();
            var sysMenuNormal = cc.Sprite.create(global.theme.menu,cc.RectMake(750, 0, 250, 210));
            var sysMenuSelected = cc.Sprite.create(global.theme.menu, cc.RectMake(750, 210, 250, 210));
            var sysMenuDisabled = cc.Sprite.create(global.theme.menu, cc.RectMake(750, 420, 250, 210));
            var sysMenu = cc.MenuItemSprite.create(sysMenuNormal, sysMenuSelected,
                                                   sysMenuDisabled, this, this.onReturn);
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
        var scene = cc.Scene.create();
        scene.addChild(StartLayer.create());
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