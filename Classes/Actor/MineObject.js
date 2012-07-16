var DIAMONDOBJ = "diamond";
var GOLDOBJ = "gold";
var ROCKOBJ = "rock";
var GIFTOBJ = "gift";

MineObject = cc.Sprite.extend({
    type: null;
	weight: 0;
	size: [height: 0, width: 0];
	ctor: function () {
	},
	ctor: function () {
	    //
	},
	create: function () {
	    // TO DO
		// return ~
	},
	update: function () {
	    // update position
		//this.setPosition(cc.ccp(newX, newY));
	},
	collect: function () {
	    // how to add score?
		//this.getParent().addChild('effect');
		this.getParent().removeChild(this);
		if (global.sound) {
		    //cc.AudioManager.sharedEngine().playEffect('sound');
		}
	},
	hookRect: function () {
	    var a = this.getContentSize();
		var r = new cc.RectMake(this.getPositonX() - a.width/2,
		                        this,getPositionY() - a.height/2,
								a.width,
								a.height);
		return r;
	}
});