var GameControlMenu = cc.Layer.extend({
    init:function () {
        var bRet = false;
        if (this._super()) {
            cc.MenuItemFont.setFontSize(18);
            cc.MenuItemFont.setFontName("Arial");
            var systemMenu = cc.MenuItemFont.create("End", this, this.startLayer);
            var menu = cc.Menu.create(systemMenu, null);
            menu.setPosition(cc.ccp(0, 0));
            systemMenu.setAnchorPoint(cc.ccp(0, 0));
            systemMenu.setPosition(cc.ccp(winSize.width-95, 5));
            this.addChild(menu, 1, 2);
            bRet = true;
        }

        return bRet;
    },
    startLayer:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(StartLayer.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2,scene));
    }
});

GameControlMenu.create = function () {
    var sg = new GameControlMenu();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};