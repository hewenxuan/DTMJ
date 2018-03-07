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
        music: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Node, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        effect: {
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
        this.musicEventCallBack();
        this.effectEventCallBack();
        this.initButton(false);
    },
    musicEventCallBack(){
        this.setSliderPercent(this.music)
    },
    effectEventCallBack(){
        this.setSliderPercent(this.effect)
    },
    setSliderPercent(node){
        var progressSp = node.getChildByName("percent");
        progressSp.width = node.width*node.getComponent(cc.Slider).progress;
    },
    close(){
        this.node.active = false;
    },
    initButton(isInRoom){
        var exit = this.node.getChildByName("exit");
        var jiesan = this.node.getChildByName("jiesan")
        if(isInRoom){
            exit.active = false;
            jiesan.active = true;
        }else{
            exit.active = true;
            jiesan.active = false;
        }
        
    },
    jiesanBtnCallBack(){
        console.log("jiesan!!!!");
    },
    exitBtnCallback(){
        console.log("exit!!!!");
        cc.director.loadScene("login")
    }

    // update (dt) {},
});
