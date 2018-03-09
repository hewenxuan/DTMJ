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
        groupName:"null",
        sameTimeCheck: {
            // ATTRIBUTES:
            default: [],        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Toggle, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        sameTimeUnCheck: {
            // ATTRIBUTES:
            default: [],        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Toggle, // optional, default is typeof default
            serializable: true,   // optional, default is true
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

    onLoad () {
       
    },

    start () {
        this.checkEventCallBack();
    },

    checkEventCallBack(target,evt){
        var ischeck = this.node.getComponent(cc.Toggle).isChecked;
        for(var i = 0;i<this.sameTimeCheck.length;i++){
            var checkBtn = this.sameTimeCheck[i];
            if(ischeck){
                checkBtn.check();
            }
        }
        for(var i = 0;i<this.sameTimeUnCheck.length;i++){
            var checkBtn = this.sameTimeUnCheck[i];
            if(ischeck){
                if(this.groupName!="null"){
                    checkBtn.node.groupName = {};
                    console.log("checkBtn1111 = ",checkBtn.node.groupName)
                    checkBtn.node.groupName[this.groupName] = this.node.name;
                    console.log("checkBtn = ",checkBtn.node.groupName)
                    this.node.groupName = {};
                    this.node.groupName[this.groupName] = this.node.name;
                }
                checkBtn.isChecked = false;
                checkBtn.interactable = true;
                this.node.getComponent(cc.Toggle).interactable = false;
            }
        }
    }
    // update (dt) {},
});
