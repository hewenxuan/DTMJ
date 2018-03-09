// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var pomelo = require("pomelo-client");
var pomelo_ioError = "io-error";
var pomelo_onKick = "onKick";
var pomelo_error = "error";
var pomelo_close = "close";
var pomelo_disconnect = "disconnect";
var pomelo_reconnect = "reconnect";
var pomelo_heartbeatTimeout = "heartbeat timeout";


var reqPingPong = [];
var reqStart = Date.now();
var lastTableCmd = null;
function ComputePingPong() {
	reqPingPong.push(Date.now() - reqStart); if (reqPingPong.length > 5) reqPingPong.splice(0, 1);
	var pingpong = 0;
	for (var i = 0; i < reqPingPong.length; i++) pingpong += reqPingPong[i];
	cc.jsInstance.reqPingPong = pingpong / reqPingPong.length;
}

var sendEvent = function (name, data) {
	console.log("sendEvent ", name, data);
}
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

	init() {
		this.SetCallBack(pomelo_ioError, function (data) { });
		this.SetCallBack(pomelo_onKick, function (data) {
			//lew kick out data中reason{} code:1 被同一玩家提  option{...} 2:操作太频繁
			cc.log("pomelo_onKick信息:" + JSON.stringify(data));
			if (data.reason) {
				try {
					var reasonMsg = JSON.parse(data.reason);
					if (reasonMsg.code == 1) {
						cc.jsInstance.globalUtils.send("disconnect", 6666);
					}
				} catch (e) {
				}

			}

		});
		this.SetCallBack(pomelo_error, function (data) { });
		this.SetCallBack(pomelo_close, function (data) {
		});
		this.SetCallBack(pomelo_disconnect, function (data) { });
		this.SetCallBack(pomelo_reconnect, function (data) { });
		this.SetCallBack(pomelo_heartbeatTimeout, function () { });
	},

	hello() {
		console.log("hello!!!!!");
	},
	QueueNetMsgCallback(evt) {
		this.SetCallBack(evt, function (d) {
			cc.jsInstance.globalUtils.send("QueueNetMsg", [evt, d]);
		});
	},
	connect(host, port, f_ok, f_fail) {
		var gameNet = this;
		reqPingPong = [];
		pomelo.disconnect();
		gameNet.isConnect = false;
		this.SetCallBack(pomelo_disconnect, function () {
			gameNet.isConnect = false;
			f_fail();
		});
		pomelo.init({
			host: host,
			port: port,
			log: false
		}, function () {
			gameNet.isConnect = true;
			f_ok();
		});
	},
	disconnect() {
		var gameNet = this;
		this.SetCallBack(pomelo_disconnect);
		pomelo.disconnect();
		gameNet.isConnect = false;
	},
	request(type, msg, cb) {
		try {
			reqStart = Date.now();
			if (arguments.length == 2) {
				pomelo.notify(type, msg);
				lastTableCmd = null;
				if (type == "pkroom.handler.tableMsg") {
					lastTableCmd = msg.cmd;
				}
			}
			else {
				pomelo.request(type, msg, function (rtn) {
					ComputePingPong();
					cb(rtn);
				});
			}
		} catch (e) { cc.jsInstance.globalUtils.send("disconnect", 2); }
	},
	SetCallBack(evt, cb) {
		pomelo.off(evt);
		if (cb)
			pomelo.on(evt, function (data) {
				if (lastTableCmd == evt) { lastTableCmd = null; ComputePingPong(); }
				if (cc.sys.OS_WINDOWS == cc.sys.os) cc.log(evt + "@" + JSON.stringify(data));
				cb(data);
			});
	}


	// update (dt) {},
});
