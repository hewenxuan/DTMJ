// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html


var ZJHCode = {

    //common for all games
    Success: 0,
    Fail: 1,


    verifyPlayerFail: 2,
    emailUsed: 3,
    emailValid: 4,
    invalidMail: 5,
    playerNotFound: 6,
    guestCanNotRecommend: 7,
    canNotLogin: 8,
    alreadyInGame: 9,
    keepInGame: 10,
    //


    sqlError: 30,
    lessMoney: 31,
    lessCoin: 32,

    clientRestart: 33,
    clientUpdate: 34,
    bindError: 35,



    joinRoomOK: 36,
    cfgVersionChange: 37,
    alreadyInRoom: 38,
    roomFull: 39,
    slotNotFound: 40,
    roomNotFound: 41,

    zjhCfgChange: 50,
    zjhDateEnd: 51,
    zjhCfgStop: 52,
    roomInPlay: 53,
    playerNotWaitStart: 54,



    joinActOK: 60,
    canNotJoinActInPlay: 61,
    joinWrongAct: 62,
    alreadyInAct: 63,
    actClosed: 64, //no use
    invalidActPos: 65,
    invalidActRoom: 66,
    actEnd: 67,
    invaliReward: 68,



    //add member to myroom
    canNotAddSelf: 80,
    isMemberAlready: 81,
    memberNotFound: 82,
    addMemberOK: 83,
    removeMemberOK: 84,
    membersNumLimit: 85,
    memberofNumLimit: 86,
    authAddPlayerExist: 87,


    rpcErr: 100,
    loginToMuch: 101,
    errorState: 102,
    serverFull: 103

};


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
        this.initEvents();
    },

    start() {
        //   var sp = cc.find("Canvas/tuowei");
        //   sp.runAction(cc.moveBy(3,2000,0));
    },

    wxLoginCallBack() {
        if (!this.agree.isChecked) {
            cc.jsInstance.msgLayer.showMsg("请同意用户协议", function () {
                console.log("ok!!!!!!!!")
            })
            return;
        }

    },
    guessLoginCallBack() {
        if (!this.agree.isChecked) {
            cc.jsInstance.msgLayer.showMsg("请同意用户协议", function () {
                console.log("ok!!!!!!!!")
            })
            return;
        }
        cc.jsInstance.block.show();
        this.guestLogin()


        // cc.managers.block.show();
        // this.scheduleOnce(function(){
        //     cc.director.loadScene("lobby");
        // },3)
    },
    guestLogin() {
        var userId = cc.jsInstance.globalUtils.getColumn("id")||"";
        var guest = cc.sys.localStorage.getItem('guestData'+userId);
        if (guest) guest = JSON.parse(guest);

        if (!guest) {
            this.getGuest();
        }
        else if (guest.mail && guest.code) {
            console.log("guest == ", guest);
            this.f_login(guest.mail, guest.code, true);//guest login
        }
        else {
            this.getGuest();
        }

        // cc.director.loadScene("lobby");
    },
    getGuest() {
        var self = this;
        cc.jsInstance.gamenet.request("login.handler.reqGuestID", { app: "zjh" }, function (rtn) {
            if (rtn.result == 0) {
                cc.sys.localStorage.setItem("guestData", JSON.stringify(rtn));
                self.f_login(rtn.mail, rtn.code, false);//getGuest
            }
        });
    },
    f_login(mail, code, isLocalGuest) {
        console.log("mail === ", mail);
        console.log("code == ", code);
        console.log("isLocalGuest == ", isLocalGuest);

        var loginData = code ? { mail: mail, code: code } : mail;

        var self = this;
        // loginData.resVersion=jsInstance.resVersion;
        loginData.app = { appid: "com.coolgamebox.majiang", os: cc.sys.os };
        // loginData.remoteIP=jsInstance.remoteIP;

        cc.jsInstance.gamenet.request("pkcon.handler.doLogin", loginData,
            function (rtn) {
                var unblock = true;
                if (rtn.result == ZJHCode.Success) {

                    if (code) {
                        var userId = cc.jsInstance.globalUtils.getColumn("id")||"";
                        console.log("id ========",userId);
                        cc.sys.localStorage.setItem("loginData"+userId, JSON.stringify(loginData));
                    }
                    console.log("rtn === ", rtn);
                    cc.jsInstance.globalUtils.send("loginOK", rtn);
                }
                else if (rtn.result == ZJHCode.playerNotFound) {
                    if (isLocalGuest) {
                        unblock = false;
                        self.getGuest();
                    }
                }
                else if (rtn.result == ZJHCode.serverFull) {
                }
                else if (rtn.result == ZJHCode.clientRestart) {
                }
                else if (rtn.result == ZJHCode.clientUpdate) {
                }

                if (unblock) cc.jsInstance.block.show();

            });
    },
    closeBtnCallback() {
        this.xieyi.node.active = false;
    },
    chooseUserCallBack() {
        this.xieyi.node.active = true;
    },
    initEvents() {
        cc.jsInstance.globalUtils.dataEventHandler = this.node;
        this.node.on("loginOK", function (d) {
            var data = d.detail;
            console.log("data === ", data);
            cc.jsInstance.pinfo = data;
            cc.director.loadScene("lobby");
        })
    }

    // update (dt) {},
});