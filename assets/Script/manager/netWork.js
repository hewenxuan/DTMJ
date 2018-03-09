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

    },
    getMsges() {
        //消息头cmd   有消息就往这里加一个字符串
        var netMsgName = ["MJPut"]

        var jsNetMsg = {}
        for (var i = 0; i < netMsgName.length; i++) {
            jsNetMsg[netMsgName[i]] = this.callback;
        }

        console.log("jsNetMsg === ", jsNetMsg);
        return jsNetMsg;
    },
    callback(evt, data) {
        cc.jsInstance.globalUtils.send(evt, d);
    }


});
