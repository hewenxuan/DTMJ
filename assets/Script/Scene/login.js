// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
const async = require('async');
cc.Class({
    extends: cc.Component,

    properties: {
        wxLogin: {
            // ATTRIBUTES:
            default: null, // The default value will be used only when the component attaching
            // to a node for the first time
            type: cc.Button, // optional, default is typeof default
            serializable: true, // optional, default is true
        },
        guessLogin: {
            // ATTRIBUTES:
            default: null, // The default value will be used only when the component attaching
            // to a node for the first time
            type: cc.Button, // optional, default is typeof default
            serializable: true, // optional, default is true
        },
        xieyi: {
            // ATTRIBUTES:
            default: null, // The default value will be used only when the component attaching
            // to a node for the first time
            type: cc.Sprite, // optional, default is typeof default
            serializable: true, // optional, default is true
        },
        agree: {
            // ATTRIBUTES:
            default: null, // The default value will be used only when the component attaching
            // to a node for the first time
            type: cc.Toggle, // optional, default is typeof default
            serializable: true, // optional, default is true
        },
        aaa: {
            // ATTRIBUTES:
            default: null, // The default value will be used only when the component attaching
            // to a node for the first time
            type: cc.Button, // optional, default is typeof default
            serializable: true, // optional, default is true
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // this.guessLogin.interactable = false;
        // this.guessLogin.node.active = false;
        this.xieyi.node.active = false;
    },

    start() {
        //   var sp = cc.find("Canvas/tuowei");
        //   sp.runAction(cc.moveBy(3,2000,0));
    },

    wxLoginCallBack() {
        if (!this.agree.isChecked) {
            console.log("please agree user xieyi!!!!!");
            return;
        }
        cc.managers.block.show();

        async.waterfall([
            (cb) => {
                /// SDK call
                cb(null, {
                    openid: cc.gameManager.unique_device(),
                    nickname: 'xxxxx',
                    headimgurl: "xxxxx"
                });
            },
            (user, cb) => {
                cc.gameManager.user = user;
                cc.networkManager.login({
                    from: "wechat",
                    openid: user.openid,
                    nickname: user.nickname,
                    headimgurl: user.headimgurl
                }, (err, response) => {
                    cb(err, response);
                });
            },
            (player, cb) => {
                ///register event hansler
                console.log("login ok!!!!", player);
                cb();
            }
        ], (err) => {
            /// show tips
            if (err) {
                console.log("认证出错了!,显示tips!", err);
                return;
            }
        });
        cc.director.loadScene("lobby");
        // this.scheduleOnce(function () {
        //     cc.director.loadScene("lobby");
        // }, 3);
    },
    guessLoginCallBack() {
        if (!this.agree.isChecked) {
            console.log("please agree user xieyi!!!!!");
            return;
        }

        cc.managers.msgLayer.showMsg("hello!!!hello!!!hello!!!hello!!!hello!!!hello!!!hello!!!hello!!!hello!!!hello!!!hello!!!hello!!!hello!!!hello!!!", function () {
            console.log("ok!!!!!!!!")
        })
        // cc.managers.block.show();
        // this.scheduleOnce(function(){
        //     cc.director.loadScene("lobby");
        // },3)
    },
    closeBtnCallback() {
        this.xieyi.node.active = false;
    },
    chooseUserCallBack() {
        this.xieyi.node.active = true;
    }

    // update (dt) {},
});