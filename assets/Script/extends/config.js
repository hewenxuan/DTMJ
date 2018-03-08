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
       
      
    },

    getConfig(){
        return {
            "servers": "60.205.127.157:15010",
            "wxShareUrl": "http://a.app.qq.com/o/simple.jsp?pkgname=com.cfgame.dtmj",
            "voiceUrl": "http://voice.datangyouxi.com/dtmj/",
            "guestLogin": true,
            "coinRoom": false,
            "canEatHu": false,
            "hideMoney": false,
            "weixinBuy": "测试测试测试！！！！！！！！！！?",
            "helpUrl": "http://dtmjapp.dtgames.cn/help.html",
            "legalUrl": "http://dtmjapp.dtgames.cn/legal.html",
            "infoUrl": "http://dtmjapp.dtgames.cn/info.html",
            "homeScroll": "aaaaaaaaaaaaa本游戏仅供娱乐,禁止赌博. 一经发现不当行为,立即封号,并向公安机关举报.                                           大唐麻将内置反外挂系统,绝无任何外挂.如玩家发现有任何实际效果的外挂/作弊器,请联系我们.一经核实,奖励人民币50万元！",
            "newsUrl":"http://c.datangyouxi.com/dtmj/news.json",
            "hideFZBtn":false,
            "ClosePlayType":"{'lf':false,'dt':false,'rain':false}",
            "lockBtns":"{'btnInvitation':false}",
            "hideShop":false,
            "hideSameIp":false,
            "feedbackURL":"https://datang.jinshuju.com/api/v1/forms/ZbTX1M",
            "dtddz_http_download": "http://a.app.qq.com/o/simple.jsp?pkgname=com.cfgame.dtddz",
            "dthenan_http_download": "http://hnmjweb.dtgames.cn/dthnmj/download.html",
            "dthebei_http_download": "http://hbmjapp.dtgames.cn/dthbmj/download.html",
            "dtneimenggu_http_download": "http://nmmj.datangyouxi.com/dtnmmj/download.html",
            "awardChange":"请联系微信客服:DTCZKF888，领取您的现金大奖，领奖时请将此界面截图发给客服人员。",
            "shareImgUrl":"http://sxmj.datangyouxi.com/dtmj/shareImg.jpg"

        }
    },

    start () {

  
    },

    // update (dt) {},
});
