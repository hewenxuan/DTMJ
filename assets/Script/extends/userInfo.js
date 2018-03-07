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
        userName: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Label, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        ID: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Label, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        IP: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Label, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        money: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Label, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        headImg: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Sprite, // optional, default is typeof default
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

    // onLoad () {},

    start () {
        this.userName.string = "我是一个粉刷匠";
        this.IP.string = "IP:111.111.111.111";
        this.ID.string = "ID:1111111111";
        this.money.string = 18888;
        //动态加在精灵；
        this.headImg.spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/dt_login_weixin_btn0.png'));
        // this.headImg.spriteFrame = new cc.SpriteFrame(cc.url.raw('res/common/dt_create_queing_btn_1.png'));
    },
    close(){
        this.node.active = false;
    }

    // update (dt) {},
});
