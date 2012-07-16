Hook = cc.Sprite.extend({
    speed: null,
    zOrder: null,
    appearPosition: null,
    _state: {
        swing: 0,
        moving: 1       
    },
    ctor: function () {                            nimation, etc.
        hookTexture = cc.TextureCache.sharedTextureCache().addImage(s_hook);
        this.initWithTexture(hookTexture, cc.RectMake(0,0,20,20));
        this.setTag(this.zOrder);
        this.setPosition(this.appearPosition);
        
        // add animation
        
        
    },
    rotate: function () {
        
    },
    launch: function () {
        
    },
    retrive: function () {
        
    },
    destroy: function () {
        
    }       
});