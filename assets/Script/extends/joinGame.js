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
        roomLabel: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Label, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        labelDefault: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Node, // optional, default is typeof default
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

    // onLoad () {},

    start () {
      
    },
    onEnable(){
        this.roomLabel.string = "";
        this.labelDefault.active = this.roomLabel.string==""
    },
    close(){
        this.node.active = false;
    },
    numBtnCallBack(target,evtData){
        console.log("evtData");
        this.changeLabel(evtData);
    },
    changeLabel(target){
        if(target == "clear"){
            this.roomLabel.string = "";
        }
        else if(target == "back"){
            var str =  this.roomLabel.string;
            console.log("str = ",str);
            str = str.slice(0,str.length-1);
            console.log("str = ",str);
            this.roomLabel.string = str;
        }else{
            this.roomLabel.string = this.roomLabel.string+target;
        }
        if(this.roomLabel.string.length>=6){
            this.joinGame();
        }
        this.labelDefault.active = this.roomLabel.string==""
    },
    joinGame(){
        console.log("joinRoom!!!!!");
    }

    // update (dt) {},
});
