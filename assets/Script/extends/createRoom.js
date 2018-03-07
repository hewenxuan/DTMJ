// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html


var jsBind = {
    btn_tdh: "tuidaohu",
    btn_kd: "koudian",
}
cc.Class({
    extends: cc.Component,

    properties: {
        playTypes: {
            // ATTRIBUTES:
            default: null, // The default value will be used only when the component attaching
            // to a node for the first time
            type: cc.Node, // optional, default is typeof default
            serializable: true, // optional, default is true
        },
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

    onLoad() {
        this._playTypeBtn = "btn_tdh";
    },

    start() {
        this.playTypeCallBack(null, this._playTypeBtn);

        console.log("cc.gameManager.game = ", cc.gameManager);
    },
    playTypeCallBack(target, evtData) {
        for (var i = 0; i < this.playTypes.children.length; i++) {
            var typeNode = this.playTypes.children[i];
            //未选中
            typeNode.getChildByName("img").active = false;
            this.node.getChildByName(jsBind[typeNode.name]).active = false;
            //选中
            if (typeNode.name == evtData) {
                typeNode.getChildByName("img").active = true;
                this._playTypeBtn = typeNode.name;
                this.node.getChildByName(jsBind[this._playTypeBtn]).active = true;
            }
        }
    },
    createRoomBtnCallback() {
        var gameType = this.node.getChildByName(jsBind[this._playTypeBtn]);
        /// 这里的 game configure 后面修改成 从 开关服务器获取配置
        /// 使用http访问 根据客户端参数获取不同的配置

        var options = {};
        options.gameType = jsBind[this._playTypeBtn];
        
        for(var i  = 0;i< gameType.children.length;i++){

            var key = gameType.children[i].name;
            var toggle = gameType.children[i].getComponent(cc.Toggle);
            if (!toggle) {
                continue;
            }
            var isTrue = gameType.children[i].getComponent(cc.Toggle).isChecked;
            //分组的 有组名的 就根据组名走
            if (gameType.children[i].groupName) {
                var names = gameType.children[i].groupName
                for (let j in names) {
                    options[j] = names[j];
                }
            } else {
                options[key] = isTrue;
            }
        }
        console.log("gameConfig == ", options);
        cc.networkManager.createTable(gameType, options, () => {
            console.log("create table response");
        });
    },
    close() {
        this.node.active = false;
    },
    createRoom(configure) {
        cc.director.loadScene("mahjong");
    }


    // update (dt) {},
});