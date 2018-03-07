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
        version: "1.0.0",
        game: "mahjong",
        publisher: "develop",
        channel: "element",
        resource: "1.0.0",
        switchServer: "http://127.0.0.1:9114",
        gateServer: "http://127.0.0.1:3721"
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log("game started!");
        if (!cc.gameManager) {
            cc.gameManager = new gameManager({
                game: this.game,
                version: this.version,
                publisher: this.publisher,
                channel: this.channel,
                resource: this.resource
            });
        }
        if (!cc.networkManager) {
            cc.networkManager = new networkManager({
                switchServer: this.switchServer,
                gateServer: this.gateServer
            });
        }
    },

    start() {
        cc.director.loadScene("login");
    },

    // update (dt) {},
});