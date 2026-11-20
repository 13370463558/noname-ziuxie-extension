import { lib, game, ui, get, ai, _status } from "../../noname.js";
import { diy } from "./diyfunc.js";
import { ydtool } from "./TOOLS.js";
import { YDDIY, YDDIYfunc } from './YDDIY.js'
import { TUPO,TUPOfunc } from "./TUPO2/tupo.js";
import {JIANGCHI,JIANGCHIfunc}from "./将池/jiangchi.js";
import { prefixManager } from "./namePrefix.js";

export const type = "extension";
export default async function(){
	return {name:"自写功能",editable: false,arenaReady:function(){      
},content:async function(config,pack){
},prepare:function(){
},precontent:function(){



    lib.init.css(`${lib.assetURL}extension/自写功能/1.css`);//引入布局
    ydtool.addImport(`extension/自写功能/choosecharactarOL.js`)
    ydtool.addImport(`extension/自写功能/contentChange.js`);//引入content修改
    
    if(lib.config["extension_自写功能_skillUSABLEADD"]) ydtool.addImport(`extension/自写功能/skillUsable.js`); //修改技能可用次数
    
    prefixManager.set();
    function loadPACK(packs,client){
        if(client){
            var toString=function () {
                const args = Array.from(arguments);
                if (typeof args[0] == "function") {
                    args.unshift("exec");
                }
                for (let i = 1; i < args.length; i++) {
                    args[i] = get.stringifiedResult(args[i]);
                }
                return JSON.stringify(args)
            }
            Object.keys(packs).forEach(pack=>{
                var pack2string=toString(packs[pack].function, packs[pack].content, true);
                client.ws.send(pack2string);
            })
        }
        else{
            Object.keys(packs).forEach(pack=>{
                packs[pack].function(packs[pack].content);
            })
        }

    }
    const myPack={
        /*pack1:{
            content:YDDIY,
            function:YDDIYfunc
        },
        pack2:{
            content:TUPO,
            function:TUPOfunc
        },*/
        pack3:{
            content:JIANGCHI,
            function:JIANGCHIfunc
        }
    }
    loadPACK(myPack);
    
    
    //diy.showSeat();

/*添加技能 杀人 踢人 */

    const originalArena=ui.create.arena;
    ui.create.arena=function(){
        originalArena.call(this);
        var kick=ui.create.system("管理",null,true);
        lib.setPopped(kick, diy.kick, 220);
        ui.handcardNumber=diy.handcardNumber();//手牌数
	    ui.cardRoundTime = diy.cardRoundTime();//牌堆
	    diy.chatBt();//社交菜单
        
        ui.create.system("点将卡",function(){
            //diy.dianjiangka("heightset");
            //22模式的是独立的
            if(get.mode()=="versus"&&game.me.nickname){
                diy.dianjiangka("heightset");
            }
            else{
            
            if(_status.event?.dialog){
            
                
                _status.event.dialog.close();
                _status.event.dialog = ui.create.characterDialog();
                _status.event.dialog.open();
                _status.event.complexSelect=true;
                _status.event.selectButton=[1,2];
                game.uncheck();
                game.check();
            }
            
            
            
            }
            

        },true);

        ui.create.system("测试",function(){
            //game.me.node.handcards1.appendChild(game.createCard("tao"));
            //game.uncheck();
            //game.check();
            //console.log(get.mode());
            
            //ui.dialog.buttons[0].link="clan_xunyu";
            //game.me.chooseButton(1,ui.create.characterDialog("heightset"));
            
            
            

        });




    }
    //让黑名单去听歌
    const _oldServerInit = lib.message.server.init;
    lib.message.server.init=function(version, config, banned_info){
       //this.send(function (prefixManager){prefixManager.set()},prefixManager);
        loadPACK(myPack,this);

        var observeChat=function(player, version, config, banned_info) {
            //如果还在房间界面就return
            if (_status.waitingForPlayer) return
            var observe = true
            if(config.id && lib.playerOL && lib.playerOL[config.id]) observe = false
            player.send((observe) => {
                game.send = function () {
                    if (game.observe && !['reinited', 'chat', 'emotion'].includes(arguments[0])) return;
                    if (game.ws) {
                        const args = Array.from(arguments);
                        if (['chat', 'emotion'].includes(arguments[0])) args.push(lib.config.connect_nickname)
                        if (typeof args[0] == 'function') {
                            args.unshift('exec');
                        }
                        game.ws.send(JSON.stringify(get.stringifiedResult(args)));
                    }
                }
                if (!ui.chatButton && observe) ui.create.chat()
            }, observe)
        }
        observeChat(this, version, config, banned_info);
        return _oldServerInit.call(this, version, config, banned_info);


    }

    //弹幕
    var cdown=function() {
		const createSay = () => {
			const leps = lib.element.player.say
			lib.element.player.say = function (str) {
				const player = this
				let nickname = (this.tempNickname ? `<span style="color:green;">（${this.tempNickname}控制的${this.nickname}）</span>` : '') || this.nickname, prefix = '';
				if (game.Mainobserve) {
					nickname = lib.config.connect_nickname
					prefix = '<span style="color:yellow;">（旁观）</span>'
				}
				game.addVideo('say', player, {
					nickname,
					str
				})
				Promise.resolve().then(() => {
                    const answer=player==game.me?"牌确实出现了问题！":"牌没有任何问题！";
					game.broadcast((danmu, prefix, name, str,answer) => {
						str = str.replace(/##assetURL##/g, lib.assetURL);
						if (!lib.element.player.say.danmu) {
							danmu(prefix, name, str)
                            if(str.startsWith("我要验牌")){
                                danmu(prefix, `<span style="color:red;">发牌员</span>`,answer );
                            }
						}
					}, ui.create.danmu, prefix, nickname, str,answer);
					str = str.replace(/##assetURL##/g, lib.assetURL);
					ui.create.danmu(prefix, nickname, str);
                    if(str.startsWith("我要验牌")){
                        ui.create.danmu(prefix, `<span style="color:red;">发牌员</span>`, answer);
                    }
				})
				return leps.call(this, ...arguments)
			}
			lib.element.player.say.danmu = true
		}
		//不知道为啥要延迟执行。。。沿用岁儿的写法
		setTimeout(createSay, 1000);
	};
    cdown();


    

/* */

},config:{
    replaceHandCards: {
        name: '手气卡次数',
        frequent: true,
        init: "1",
        item: Array.from({ length: 100 }, (_, i) => String(i)),
	},
    chooseCharacternums: {
        name: '将框数量',
        frequent: true,
        init: "10",
        item: Array.from({ length: 100 }, (_, i) => String(i)),
	},
    hideServerExtensions:{
        name:"隐藏指定服务器的扩展列表",
        init:false,
        intro:"开启后隐藏指定联机服务器的扩展列表按钮",
		onclick(bool) {
            game.saveConfig("extension_自写功能_hideServerExtensions", bool);
		},
    },
    xuanchuan:{
        name:"宣传",
        init:true,
        intro: "开启后宣传联机群",
		onclick(bool) {
			game.saveConfig("extension_自写功能_xuanchuan", bool);
		},
    },
    CHANGEcheckMod:{
        name:"修改CHECKMOD",
        init:false,
        intro: "重启生效",
		onclick(bool) {
			game.saveConfig("extension_自写功能_CHANGEcheckMod", bool);
		},
    },
    skillUSABLEADD:{
        name:"修改出牌阶段限一次的次数",
        init:false,
        intro: "重启生效",
		onclick(bool) {
			game.saveConfig("extension_自写功能_skillUSABLEADD", bool);
		},
    },
    autoIpBtn:{
        name:"自动点击联机中的连接按钮",
        init:true,
        onclick(bool){
            game.saveConfig("extension_自写功能_autoIpBtn", bool);
        }
    }
    
},help:{},package:{
    character: {
        character: {
        },
        translate: {
        },
    },
    card: {
        card: {
        },
        translate: {
        },
        list: [],
    },
    skill: {
        skill: {
        },
        translate: {
        },
    },
    intro: "",
    author: "玫瑰金小杀",
    diskURL: "",
    forumURL: "",
    version: "1.0",
},files:{"character":[],"card":[],"skill":[],"audio":[]},connect:false} 
};



