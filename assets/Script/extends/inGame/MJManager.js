// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        left: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.SpriteAtlas, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        right: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.SpriteAtlas, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        bottom: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.SpriteAtlas, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        my: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.SpriteAtlas, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        empty:{
             // ATTRIBUTES:
             default: null,        // The default value will be used only when the component attaching
             // to a node for the first time
            type: cc.SpriteAtlas, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        holdEmpty:{
            // ATTRIBUTES:
            default: [],        // The default value will be used only when the component attaching
            // to a node for the first time
           type:[cc.SpriteFrame], // optional, default is typeof default
           serializable: true,   // optional, default is true
        }
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._sides = ["myself","right","up","left"];
        this._hand = ["M","R","B","L"];
        this._put = ["B","R","B","L"];
        this._spName = ["_bamboo_", "_character_", "_dot_", "_wind_east", "_wind_west", "_wind_south", "_wind_north", "_red", "_green", "_white"];

        if(cc.managers){
            cc.managers.mjManager = this;
        }else{
            cc.managers = {};
            cc.managers.mjManager = this;
        }
        console.log("zwz_____mjmanager.init!!!!")

    },
    /**
     * 图片SpriteFrame
     * @param {bool} ishand 
     * @param {int} off  0/1/2/3
     * @param {int} cd   1-9 11-19 21-29 31 41 51 61 71 81 91
     */
    getSpName(ishand,off,cd){
        let side = ishand?this._hand:this._put;
        let cardType = this._spName[Math.floor(cd / 10)];
        let cardNum = cd<30?Math.floor(cd%10):"";
        let spName = side[off]+cardType+cardNum;
        return spName;
    },

    setCardPic(ishand,off,cd){
        const spName = this.getSpName(ishand,off,cd);
        // console.log("spName = ",spName);
        let myPicframe = ishand?this.my:this.bottom;
        switch(off){
            case 0:
                return myPicframe.getSpriteFrame(spName);
            case 1:
                return this.right.getSpriteFrame(spName);
            case 2:
                return this.bottom.getSpriteFrame(spName);
            case 3:
                return this.left.getSpriteFrame(spName);
        }
    },

    setEmpty(ishand,off){
        let spName = null;
        switch(off){
            case 0:
                spName =  ishand?null:"e_mj_b_bottom";
                break;
            case 1:
                spName = ishand?"e_mj_right":"e_mj_b_right";
                break;
            case 2:
                spName = ishand?"e_mj_up":"e_mj_b_up";
                break;
            case 3:
                spName = ishand?"e_mj_left":"e_mj_b_left";
                break;
            default:
                spName = null;
                break
        }
        console.log("spName = ",spName);
        return spName?this.empty.getSpriteFrame(spName):null;
    },
    

    start () {

    },

    // update (dt) {},
});
