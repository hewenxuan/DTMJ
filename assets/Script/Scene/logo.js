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
        video: cc.VideoPlayer
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._playOver = false;
    },

    start() {
        this.video.play();
    
    },
    
    videoOverCallBack(VideoPlayer,eventType,customEventData){
       
        if(eventType == cc.VideoPlayer.EventType.COMPLETED){
            console.log("zwz____playVideo!!!");
            cc.director.loadScene("update")
        }
        // cc.director.loadScene("update")
    },

    update (dt) {
        // if(!this.video.isPlaying()&&!this._playOver ){
        //     this._playOver = true;
        //     cc.director.loadScene("update")
        // }
    },
});