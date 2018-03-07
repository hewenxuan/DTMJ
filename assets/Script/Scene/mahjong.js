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

    onLoad () {
        this._chupaidrag = this.node.getChildByName("shadow");
    },

    start () {
        var mjhand = this.node.getChildByName("myself").getChildByName("mjhand");
        mjhand.children[2].getComponent(cc.Sprite).spriteFrame = cc.managers.mjManager.setCardPic(true,0,15);

        var mjput = this.node.getChildByName("myself").getChildByName("mjput");
        mjput.getChildByName("put_0").getComponent(cc.Sprite).spriteFrame = cc.managers.mjManager.setCardPic(false,0,16);
        this.init();
        for(let i in mjhand.children){
            this.initTouchEvent(mjhand.children[i]);
        }
    },
    init(){
        this._sides = ["myself","right","up","left"];
        var pl0  = {
            mjhand:[31,31],
            mjput:[1,2,3,4,15,16,17,8,9],
            mjpeng:[{card:4,group:[4,4,4]}],
            mjgang:[{card:8,group:[8,8,8,8],type:1},{card:28,group:[28,28,28,28],type:2},{card:16,group:[16,16,16,16],type:3}]
        }
        var pl1  = {
            mjhand:[31,31],
            mjput:[1,2,3,4,25,26,27,8,9],
            mjpeng:[{card:4,group:[4,4,4]}],
            mjgang:[{card:8,group:[8,8,8,8],type:1},{card:28,group:[28,28,28,28],type:2},{card:16,group:[16,16,16,16],type:3}]
        }
        var pl2  = {
            mjhand:[1,2,3,4,5,6,31,31],
            mjput:[1,2,3,4,5,6,7,8,9],
            mjpeng:[{card:4,group:[4,4,4]}],
            mjgang:[{card:8,group:[8,8,8,8],type:1}]
        }
        var pl3  = {
            mjhand:[31,31],
            mjput:[1,2,3,4,5,6,7,8,9],
            mjpeng:[{card:4,group:[4,4,4]}],
            mjgang:[{card:8,group:[8,8,8,8],type:1},{card:28,group:[28,28,28,28],type:2},{card:16,group:[16,16,16,16],type:3}]
        }
        this._pls = [pl0,pl1,pl2,pl3];
        
        this.hideAllMJ();
        this.initMj();
    },
    //隐藏所有麻将
    hideAllMJ(){
        for(let i = 0;i<4;i++){
            this.setMj(i,"mjhand",function(card){
                // var spFrame = card.getComponent(cc.Sprite).spriteFrame
                card.active = false;
            })
            this.setMj(i,"mjput",function(card){
                // var spFrame = card.getComponent(cc.Sprite).spriteFrame
                card.active = false;
            })
            this.setMj(i,"penggangs",function(card){
                // var spFrame = card.getComponent(cc.Sprite).spriteFrame
                card.active = false;
            })
        }
    },
    //根据牌的类型 设置麻将牌
    setMj(off,name,func){
        let nodeName = this._sides[off];
        let mjhand = this.node.getChildByName(nodeName).getChildByName(name);
        for(let i in mjhand.children){
            let card = mjhand.children[i];
            if(func){
                func(card);
            }
        }
    },
    //触摸事件  拖影相关
    initTouchEvent(node){
        //break if it's not my turn.
        node.on(cc.Node.EventType.TOUCH_START, function (event) {
            // console.log("cc.Node.EventType.TOUCH_START");
            // if (cc.vv.gameNetMgr.turn != cc.vv.gameNetMgr.seatIndex) {
            //     return;
            // }
            node.interactable = node.getComponent(cc.Button).interactable;
            if (!node.interactable) {
                return;
            }
            // node.opacity = 255;
            this._chupaidrag.active = false;
            this._chupaidrag.getComponent(cc.Sprite).spriteFrame = node.getComponent(cc.Sprite).spriteFrame;
            this._chupaidrag.x = event.getLocationX() - cc.director.getVisibleSize().width / 2;
            this._chupaidrag.y = event.getLocationY() - cc.director.getVisibleSize().height / 2;

            this.setMj(0,"mjhand",function(card){
                if(card.name!=node.name){
                    if(card.hasTouch){
                        card.hasTouch = false;
                        card.y-=20;
                    }
                }
            })
        }.bind(this));

        node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            // console.log("cc.Node.EventType.TOUCH_MOVE");
            // if (cc.vv.gameNetMgr.turn != cc.vv.gameNetMgr.seatIndex) {
            //     return;
            // }
            if (!node.interactable) {
                return;
            }
            if (Math.abs(event.getDeltaX()) + Math.abs(event.getDeltaY()) < 0.5) {
                return;
            }
            this._chupaidrag.active = true;
            node.opacity = 150;
            this._chupaidrag.opacity = 255;
            this._chupaidrag.scaleX = 1;
            this._chupaidrag.scaleY = 1;
            this._chupaidrag.x = event.getLocationX() - cc.director.getVisibleSize().width / 2;
            this._chupaidrag.y = event.getLocationY() - cc.director.getVisibleSize().height / 2;
            // node.y = 0;
        }.bind(this));

        node.on(cc.Node.EventType.TOUCH_END, function (event) {
            // if (cc.vv.gameNetMgr.turn != cc.vv.gameNetMgr.seatIndex) {
            //     return;
            // }
            if (!node.interactable) {
                return;
            }
            // console.log("cc.Node.EventType.TOUCH_END");
            this._chupaidrag.active = false;
            node.opacity = 255;
            if (event.getLocationY() >= 200) {
                this.putAwayCard(node.cd);
                if(node.hasTouch){
                    node.y-=20;
                    node.hasTouch = false
                }
            }else{
                if(!node.hasTouch){
                    node.hasTouch = true;
                    node.y+=20;
                }else{
                    node.y-=20;
                    node.hasTouch = false
                    this.putAwayCard(node.cd);
                }
            }
        }.bind(this));

        node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            // if (cc.vv.gameNetMgr.turn != cc.vv.gameNetMgr.seatIndex) {
            //     return;
            // }
            if (!node.interactable) {
                return;
            }
            // console.log("cc.Node.EventType.TOUCH_CANCEL");
            this._chupaidrag.active = false;
            node.opacity = 255;
            if (event.getLocationY() >= 200) {
                this.putAwayCard(node.cd);
                if(node.hasTouch){
                    node.y-=20;
                    node.hasTouch = false
                }
            } else if (event.getLocationY() >= 150) {
                //this._huadongtishi.active = true;
                //this._huadongtishi.getComponent(cc.Animation).play('huadongtishi');
            }
        }.bind(this));
    },

    putAwayCard(card){
        console.log("putAwayCard = ",card);
    },

    //初始化手牌
    initMjhand(off,mjhand){
        const start = 14-mjhand.length;
        for(let i = start;i< 14;i++){
            let cd = mjhand[i-start];
            this.setMj(off,"mjhand",function(card){
                    let name = "hand_"+i;
                    if(card.name == name){
                        card.active = true;
                        card.cd = cd;
                        card.getComponent(cc.Sprite).spriteFrame = cc.managers.mjManager.setCardPic(true,off,cd);
                    }
                    if(off == 2){
                        card.scaleX = 0.7
                        card.scaleY = 0.7
                    }
            })
        }
    },
    //初始化其他人手牌 卡背
    initMjhandWithOutCard(off,pl){
        let start = pl.mjpeng.length*3+pl.mjgang.length*3;
        for(let i = start;i< 14;i++){
            let cd = pl.mjhand[i-start];
            this.setMj(off,"mjhand",function(card){
                    let name = "hand_"+i;
                    if(card.name == name){
                        card.active = true;
                        card.getComponent(cc.Sprite).spriteFrame = cc.managers.mjManager.setEmpty(true,off);
                    }
            })
        }
    },
    //初始化牌池
    initMjPut(off,mjput){
        for(let i in mjput){
            let cd = mjput[i];
            this.setMj(off,"mjput",function(card){
                    let name = "put_"+i;
                    if(card.name == name){
                        card.active = true;
                        card.getComponent(cc.Sprite).spriteFrame = cc.managers.mjManager.setCardPic(false,off,cd);
                    }
            })
        }
    },
    //初始化碰杠
    initMjPengGang(off,mjpenggang,isGang){
        let activeNum = 0;
        this.setMj(off,"penggangs",function(card){
            if(card.active){
                activeNum++;
            }   
        })

        for(let i  = 0;i< mjpenggang.length;i++){
            let cd = mjpenggang[i];
            this.setMj(off,"penggangs",function(card){
                let num = i+activeNum
                let name = "pg_"+num;
                if(card.name == name){
                    card.active = true;
                    if(isGang){
                        card.getComponent("penggang").setGang(cd,off);
                    }else{
                        card.getComponent("penggang").setPeng(cd,off);
                    }
                       
                 }
            })
        }
    },
    //数据初始化
    initMj(){
        //初始化手牌
        for(let i = 0;i<this._pls.length;i++){
            let mjhand = this._pls[i].mjhand;
            if(i!=0){
                this.initMjhandWithOutCard(i,this._pls[i]);
            }else{
                this.initMjhand(i,mjhand);
            }
        }
        //初始化打出去的牌
        for(let i = 0;i<this._pls.length;i++){
            let mjput = this._pls[i].mjput;
            this.initMjPut(i,mjput);
        }
        //初始化杠牌
        for(let i = 0;i<this._pls.length;i++){
            let mjgang = this._pls[i].mjgang;
            this.initMjPengGang(i,mjgang,true);
        } 
        //初始化碰牌
        for(let i = 0;i<this._pls.length;i++){
           let mjpeng = this._pls[i].mjpeng;
           this.initMjPengGang(i,mjpeng,false);
       }
       
    }
    // update (dt) {},
});
