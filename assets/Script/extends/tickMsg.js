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
        ok: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Button, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        back: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Button, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        label: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Label, // optional, default is typeof default
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
        cc.jsInstance.msgLayer = this;
        console.log("msglayer is on load!")
        this.node.active = false;
    },

    start () {
        
    },
    showMsg(msg,funcOK,funcBk){
        this.node.active = true;
        this.label.string = msg;
        if(funcOK){
            this.okcb = funcOK;
        }
        if(funcBk){
            this.bkcb = funcBk;
        }else{
            this.back.node.active = false;
            this.ok.node.x = 0;
        }
    },
    okCallBack(){
        if(this.okcb){
            this.okcb()
        }
        this.node.active = false;
    },
    bKCallBack(){
        if(this.bkcb){
            this.bkcb()
        }
        this.node.active = false;
    },
    


    // update (dt) {},
});
