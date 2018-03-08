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
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log("game started!");
        
        cc.jsInstance = {};
        var global = require("globalUtils");
        cc.jsInstance.globalUtils = new global();

        //初始化网络连接器
        var gamenet = require("gamenet");
        cc.jsInstance.gamenet = new gamenet();
        //获取配置
        var config = require("config");
        var cfg = new config();
        cc.jsInstance.remoteCfg = cfg.getConfig();

        this.initEvents()

        this.connectToPomelo()
       

    },

    start() {
        
    },
    connectToPomelo(){
        var servers = cc.jsInstance.remoteCfg.servers.split(',');
        var server = servers[Math.floor(Math.random() * servers.length)];
        var parts = server.split(':');
        var host = parts[0];
        var port = parseInt(parts[1 + Math.floor(Math.random() * (parts.length - 1))]);
        cc.jsInstance.gamenet.disconnect();
        cc.jsInstance.gamenet.connect(host, port, function() {
            cc.jsInstance.globalUtils.send("connect");
        }, function() { 
             cc.jsInstance.globalUtils.send("disconnect", 1);
        });
    },
    
    initEvents(){
        cc.jsInstance.globalUtils.dataEventHandler = this.node;
        this.node.on("connect",function(data){
            console.log('startor is connect!!!!!');
            cc.director.loadScene("login");
        })
        
    },

    // update (dt) {},
});