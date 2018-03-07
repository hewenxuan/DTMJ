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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
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
    setPeng(cd ,off){
        let id = 0;
        for(let i in this.node.children){
            let peng = this.node.children[i];
            if(peng.name == "gang"){
                peng.active = false;
                continue
            }
            peng.getComponent(cc.Sprite).spriteFrame = cc.managers.mjManager.setCardPic(false,off,cd.group[id]);
            id++;
        }
    },
    setGang(cd,off){
        let id = 0;
        for(let i in this.node.children){
            let gang = this.node.children[i];
            if(gang.name == "gang"){
                gang.active = true;
                if(cd.type == 3){
                    gang.getComponent(cc.Sprite).spriteFrame = cc.managers.mjManager.setEmpty(false,off);
                    if(off == 2||off == 0){
                        gang.scale = 1.5;
                    }
                }else{
                    gang.getComponent(cc.Sprite).spriteFrame = cc.managers.mjManager.setCardPic(false,off,cd.group[id]);
                }
               
            }else{
                gang.getComponent(cc.Sprite).spriteFrame = cc.managers.mjManager.setCardPic(false,off,cd.group[id]);
            }
            id++;
        }
    }

    // update (dt) {},
});
