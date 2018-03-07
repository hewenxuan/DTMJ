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
        loadingBar: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.ProgressBar, // optional, default is typeof default
            serializable: true,   // optional, default is true
        }
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._time = 0
    },

    start () {

    },

    update (dt) {
        this._time+=dt;
        if(this._time >= 0.2){
            console.log("zwz____progress = ",this.loadingBar.progress);
            this._time = 0;
            this.loadingBar.progress +=0.05;
            if(this.loadingBar.progress>=1){
                cc.director.loadScene("login");
            }
        }
    },
});
