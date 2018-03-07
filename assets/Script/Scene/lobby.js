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
        createRoom: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Node, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        joinRoom: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Node, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        backRoom: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Node, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        playInfo:{
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Node, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        buyInfo:{
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Node, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        setting:{
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Node, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        createRoomLayer:{
             // ATTRIBUTES:
             default: null,        // The default value will be used only when the component attaching
             // to a node for the first time
            type: cc.Node, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        joinRoomLayer:{
             // ATTRIBUTES:
             default: null,        // The default value will be used only when the component attaching
             // to a node for the first time
            type: cc.Node, // optional, default is typeof default
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

    },
    createRoomCallBack(){
        cc.log("createRoom!!!");
        this.createRoomLayer.active = true;
    },
    joinRoomCallBack(){
        cc.log("joinRoom!!!");
        // this.backRoom.active = true;
        // this.joinRoom.active = false;
        this.joinRoomLayer.active = true;
    },
    backRoomCallBack(){
        cc.log("BackRoom!!!");
        this.backRoom.active = false;
        this.joinRoom.active = true;
    },
    playInfoCallBack(){
        cc.log("playInfoCallBack!!!");
        this.playInfo.active = true;
    },
    buyBtnCallBack(){
        cc.log("buyBtnCallBack!!!");
        this.buyInfo.active = true;
    },
    friendBtnCallBack(){
        cc.log("friendBtnCallBack!!!");
    },
    messageBtnCallBack(){
        cc.log("messageBtnCallBack!!!");
    },
    helpBtnCallBack(){
        cc.log("helpBtnCallBack!!!");
    },
    zhanjiBtnCallBack(){
        cc.log("zhanjiBtnCallBack!!!");
    },
    settingBtnCallBack(){
        cc.log("settingBtnCallBack!!!");
        this.setting.active = true;
    },
    renzhengBtnCallBack(){
        cc.log("renzhengBtnCallBack!!!");
    },
    moreBtnCallBack(){
        cc.log("moreBtnCallBack!!!");
    },
    fankuiBtnCallBack(){
        cc.log("fankuiBtnCallBack!!!");
    },
    fangzhuBtnCallBack(){
        cc.log("fangzhuBtnCallBack!!!");
    }

    // update (dt) {},
});
