import { lib, game, ui, get, ai, _status } from '../../../noname.js';
import { ChildNodesWatcher } from '../../noname/library/cache/childNodesWatcher.js';

ui.create.connectPlayers = function (ip) {
	ui.updateConnectPlayerPositions();
	game.connectPlayers = [];
	const configOL = lib.configOL;
	const numberOfPlayers = parseInt(configOL.player_number) || configOL.number;
	for (let position = 0; position < numberOfPlayers; position++) {
		const player = ui.create.player(ui.window);
		player.dataset.position = position;
		player.classList.add("connect");
		game.connectPlayers.push(player);
	}

	var bar = ui.create.div(ui.window);
	bar.style.height = "20px";
	bar.style.width = "80%";
	bar.style.left = "10%";
	bar.style.top = "calc(200% / 7 - 120px + 5px)";
	bar.style.textAlign = "center";
	var ipbar = ui.create.div(".shadowed", ip, bar);
	ipbar.style.padding = "4px";
	ipbar.style.borderRadius = "2px";
	ipbar.style.position = "relative";

	var button = ui.create.div(".menubutton.large.highlight.connectbutton.connectbutton1.pointerdiv", game.online ? "退出联机" : "开始游戏", ui.window, function () {
		if (button.clicked) return;
		if (game.online) {
			if (game.onlinezhu) {
				game.send("startGame");
			} else {
				game.saveConfig("tmp_owner_roomId");
				game.saveConfig("tmp_user_roomId");
				game.saveConfig("reconnect_info");
				game.reload();
			}
		} else {
			game.resume();
		}
		button.delete();
		bar.delete();
		shareButton.delete();
		delete ui.connectStartButton;
		delete ui.connectStartBar;
		delete ui.connectShareButton;
		button.clicked = true;
	});

	var shareButton = ui.create.div(".menubutton.large.highlight.connectbutton.connectbutton2.pointerdiv", "分享房间", ui.window, function () {
        var text = `无名杀-联机-${lib.translate[get.mode()]}-${game.connectPlayers.filter(p => p.avatar).length}/${game.connectPlayers.filter(p => !p.classList.contains("unselectable2")).length}\n${get.connectNickname()}邀请你加入${game.roomId}房间\n联机地址:${game.ip}\n请先通过游戏内菜单-开始-联机中启用“读取邀请链接”选项`;
		window.focus();
		if (navigator.clipboard && lib.node) {
			navigator.clipboard
				.writeText(text)
				.then(() => {
					game.alert(`分享内容复制成功`);
				})
				.catch(e => {
					game.alert(`分享内容复制失败${e || ""}`);
				});
		} else {
			var input = ui.create.node("textarea", ui.window, {
				opacity: "0",
			});
			input.value = text;
			input.focus();
			input.select();
			var result = document.execCommand("copy");
			input.blur();
			ui.window.removeChild(input);
			game.alert(`分享内容复制${result ? "成功" : "失败"}`);
		}
	});

	ui.connectStartButton = button;
	ui.connectStartBar = bar;
	ui.connectShareButton = shareButton;
};

lib.element.content.replaceHandcardsOL = function () {
	'step 0'
    if(lib.config["extension_自写功能_xuanchuan"]){
        game.broadcastAll(function(){
            var div=ui.create.div();
            div.innerHTML=`联机群 707937360`;
            div.style.cssText=`
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: white;
                font-size: 25px;
                opacity: 0.8;
            `;
            ui.background.appendChild(div);
        });
    }
    
	event.players = event.players.filter(p => {
		return p === game.me || (p.ws && p.isOnline2())//人机就不给刷牌了
	})
	event.players.forEach(p => {
		if (!p.replaceHandcardsnum) {
			p.replaceHandcardsnum = 0
			p.send(() => { game.me.replaceHandcardsnum = 0 })
		}
	})
    event.replaceHandcardsnum=1;
	'step 1'
	var sendback = function (result, player) {
		if ((result && result.bool === false && event)) {
			event.players.remove(player)
		}
		if (result && result.bool) {
			player.send(() => { game.me.replaceHandcardsnum++ })
			player.replaceHandcardsnum++
			/*otherPile主要是针对那些用专属牌堆，不从一般牌堆摸牌的角色（如陈寿），该属性目前只有两个键值对，且都为函数
			 *getCards函数与获得牌相关，只传入要获得的牌数num作为参数
			 *discard与手气卡换牌后弃置牌相关，只传入要弃置的牌card作为参数
			 */
			const hs = player.getCards("h"),
				cards = [],
				otherGetCards = event.otherPile?.[player.playerid]?.getCards,
				otherDiscacrd = event.otherPile?.[player.playerid]?.discard;
			//先弃牌
			game.broadcastAll(
				function (player, hs, otherDiscacrd) {
					game.addVideo("lose", player, [get.cardsInfo(hs), [], [], []]);
					for (var i = 0; i < hs.length; i++) {
						hs[i].removeGaintag(true);
						if (otherDiscacrd) otherDiscacrd(hs[i]);
						else hs[i].discard(false);
					}
				},
				player,
				hs,
				otherDiscacrd
			);
			//再摸牌，先看有没有专属牌堆
			if (otherGetCards) cards.addArray(otherGetCards(hs.length));
			else {
               cards.addArray(get.cards(hs.length));
            }
			//添加标记相关
			//event.gaintag支持函数、字符串、数组。数组就是添加一连串的标记；函数的返回格式为[[cards1,gaintag1],[cards2,gaintag2]...]
			if (event.gaintag?.[player.playerid]) {
				const gaintag = event.gaintag[player.playerid];
				const list = typeof gaintag == "function" ? gaintag(hs.length, cards) : [[cards, gaintag]];
				game.broadcastAll(
					(player, list) => {
						for (let i = list.length - 1; i >= 0; i--) {
							player.directgain(list[i][0], null, list[i][1]);
						}
					},
					player,
					list
				);
			} else{
                /*const neiding=['clan_wangyun'];
                if(neiding.includes(game.me.name)&&game.me==player){
                    for(var i = 0; i < 4; i++){
                        var card = get.cardPile2(function (card) {
                            return get.type(card) == "equip";
                        });
                        if(!card) card=get.cards();
                        cards.push(card);
                    }
                }*/
                
                
                player.directgain(cards);
            }
			player._start_cards = cards;
		}
	};
	for (var i = 0; i < event.players.length; i++) {
		if (event.players[i].isOnline()) {
			event.withol = true;
			event.players[i].send(allnum => {
					const num = allnum - game.me.replaceHandcardsnum
					game.me.chooseBool(`是否置换手牌？（还剩${num}次）`).set('ai', () => false)
					game.resume()
				},
				lib.config.extension_自写功能_replaceHandCards
			);
			event.players[i].wait(sendback);
		} else if (event.players[i] == game.me) {
			event.withme = true;
			const num = lib.config.extension_自写功能_replaceHandCards - game.me.replaceHandcardsnum
			game.me.chooseBool(`是否置换手牌？（还剩${num}次）`);
			game.me.wait(sendback);
		}
	}
	'step 2'
	if (event.withme) {
		game.me.unwait(result);
	}
	'step 3'
	if (event.withol && !event.resultOL) {
		game.pause();
	}
	'step 4'
	event.players = event.players.filter(p => p === game.me || (p.ws && p.isOnline2()))
	if (event.players.length > 0 &&  event.replaceHandcardsnum< lib.config.extension_自写功能_replaceHandCards) {
		event.goto(1)
		event.replaceHandcardsnum++
		delete event.resultOL
	}
};

game.getPlayer=function(id) {
    let player;
    if (lib.playerOL[id]) {
        player = lib.playerOL[id];
    }
    else if (game.connectPlayers) {
        player = game.connectPlayers.find(p => p.playerid === id)
    }
    return player
};
ui.create.danmu = function (prefix = '', name = lib.config.connect_nickname, str = '') {
	if (!ui.danmuList) ui.danmuList = []
	if (!ui.bulletScreen) {
		ui.bulletScreen = ui.create.div('.bulletScreen', document.body)
		ui.bulletScreen.css({ width: "100%", height: "100%", left: "0", top: "0", pointerEvents: "none", zIndex: "100" })
	}
	let top = document.body.clientHeight / 3
	const danmu = ui.create.div('.danmumode', `${prefix}${name}：${str}`, ui.bulletScreen)
	danmu.css({
		left: '100%',
		transition: 'left 20s cubic-bezier(0.45, 0.44, 0.55, 0.52) 0s',
		fontSize: "18px",
		textShadow: "1px 1px black",
		whiteSpace: "nowrap",
		fontFamily: "宋体",
		zIndex: "1000",
		pointerEvents: "none"
	})
	const { height } = danmu.getBoundingClientRect()
	while (ui.danmuList.includes(top)) {
		if (top === ui.danmuList.lastIndex) {
			ui.danmuList = []
		}
		top += height
		if (top > document.body.clientHeight) {
			top = 149 - height
			ui.danmuList = []
		}
	}
	ui.danmuList.add(top)
	danmu.style.top = top + "px"
	ui.refresh(danmu)
	danmu.style.left = "-10%"
	danmu.topBound = top
	const removeNode = function () {
		this.remove()
		ui.danmuList.remove(this.topBound)
	}
	danmu.addEventListener('transitionend', removeNode)
	danmu.addEventListener('webkittransitionend', removeNode)
};
lib.message.server.chat=function(id, str) {
    const player = game.getPlayer(id);
    if (player) {
        if (player === game.me && this.mainHost !== 'mainHost') {
            lib.element.player.chat.call(player, str)
        } else {
            player.chat(str)
        }
    } else if (lib.node.observing.includes(this)) {
        const name = this.nickname || arguments[arguments.length - 1]
        if (true) {
            const prefix = lib.node.observing.includes(this) ? '<span style="color: rgb(42, 187, 223);">（旁观）</span>' : '<span style="color:red;">（被控制）</span>'
            game.addVideo('danmu', null, { prefix: '<span style="color: rgb(42, 187, 223);">（旁观）</span>', name, str: str.replace(/##assetURL##/g, lib.assetURL) })
            game.broadcastAll((func, prefix, name, str) => {
                str = str.replace(/##assetURL##/g, lib.assetURL);
                func(prefix, name, str)
                const info = [prefix + name, str];
                lib.chatHistory.push(info);
            }, ui.create.danmu, prefix, name, str)
        }
    }
};

lib.message.server.emotion=function(id, pack, emotion, name) {
    const player = game.getPlayer(id);
    if (player) {
        player.emotion(pack, emotion)
    } else if (lib.node.observing.includes(this)) {
        const str = '<img src="##assetURL##image/emotion/' + pack + '/' + emotion + '.gif" width="50" height="50">';
        lib.message.server.chat.call(this, this.id, str, name)
    }
};


//修改checkMOD

if(lib.config["extension_自写功能_CHANGEcheckMod"]){
    game.checkMod=function() {
        const argumentArray = Array.from(arguments),
        name = argumentArray[argumentArray.length - 2];
        let skills = argumentArray[argumentArray.length - 1];
        if (typeof skills.getModableSkills == "function") {
            skills = skills.getModableSkills();
        } else if (typeof skills.getSkills == "function") {
            skills = skills.getSkills().concat(lib.skill.global);
            game.expandSkills(skills);
            skills = skills.filter(function (skill) {
                var info = get.info(skill);
                return info && info.mod;
            });
            skills.sort((a, b) => get.priority(a) - get.priority(b));
        }
        const arg = argumentArray.slice(0, -2);
        skills.push("dcjiaoxia");
        skills.forEach(value => {
            var mod = get.info(value).mod[name];
            if (!mod) {
                return;
            }
            const result = mod.call(this, ...arg);
            if (result != undefined && typeof arg[arg.length - 1] != "object") {
                arg[arg.length - 1] = result;
            }
        });
        return arg[arg.length - 1];
    };

}

//点将卡，在别人的房间也能选自己预定的武将
/*lib.element.player.chooseButton=function(){
    var next = game.createEvent("chooseButton");
    for (var i = 0; i < arguments.length; i++) {
        //console.log(arguments[0]);
        if (typeof arguments[i] == "boolean") {
            if (!next.forced) {
                next.forced = arguments[i];
            } else {
                next.complexSelect = arguments[i];
            }
        } else if (get.itemtype(arguments[i]) == "dialog") {
            next.dialog = arguments[i];
            next.closeDialog = true;
        } else if (get.itemtype(arguments[i]) == "select") {
            next.selectButton = arguments[i];
        } else if (typeof arguments[i] == "number") {
            next.selectButton = [arguments[i], arguments[i]];
        } else if (typeof arguments[i] == "function") {
            if (next.ai) {
                next.filterButton = arguments[i];
            } else {
                next.ai = arguments[i];
            }
        } else if (arguments[i] == "complexSelect") {
            // 为直接添加complexSelect提供支持喵
            next.complexSelect = true;
        } else if (arguments[i] == "allowChooseAll") {
            next.allowChooseAll = true;
        } else if (Array.isArray(arguments[i])) {
            next.createDialog = arguments[i];
        }

    }
    next.player = this;
    if (typeof next.forced != "boolean") {
        next.forced = false;
    }
    if (next.isMine() == false && next.dialog) {
        next.dialog.style.display = "none";
    }
    if (next.filterButton == undefined) {
        next.filterButton = lib.filter.filterButton;
    }
    if (next.selectButton == undefined) {
        next.selectButton = [1, 1];
    }
    if (next.ai == undefined) {
        next.ai = function () {
            return 1;
        };
    }
    if (next.complexSelect !== false) {
        if (next.complexSelect === undefined && next.allowChooseAll === true) {
            // 如果complexSelect没有被显式的定义但是全选被显式要求了，那么我们默认认为调用者需要全选而不是complexSelect喵
            next.complexSelect = false;
        } else {
            next.complexSelect = true;
        }
    }

    //if(arguments)
    

    next.setContent("chooseButton");
    next._args = Array.from(arguments);
    
    //我添加的点将卡哦  身份和斗地主
    //const arg0 = next._args[0];
    const arg1=next._args[0]?.[1];
    if(Array.isArray(arg1)&&arg1.length>1){
        const arg2=arg1[1];
        if (['characterx','character'].includes(arg2)) {
            var neiding=["wu_zhugeliang","wu_luxun","panghong","boss_zhaoyun","ol_pengyang","luoxian","guansuo","yuantanyuanshang","clan_xunchen","clan_yangbiao","xurong","baoxin","ol_caozhi","ol_sb_wenchou"];
            //next._args[0][1][0].addArray("wu_zhugeliang");

            for(var i of neiding){
                next._args[0][1][0].push(i);
            }
            //next.selectButton = [1, 2];
        }

    }
    
    
    //22点将
    if(game._characterChoice){
        var dialog=get.idDialog(game._characterDialogID);
        if(dialog){
            var neiding=["wu_zhugeliang","wu_luxun","panghong","boss_zhaoyun","ol_pengyang","luoxian","guansuo","yuantanyuanshang","clan_xunchen","clan_yangbiao","xurong","baoxin","ol_caozhi","ol_sb_wenchou"];
            var buttons = ui.create.div(".buttons", dialog.content);
            for (var i in game._characterChoice){
                var current = lib.playerOL[i];
                if (current == game.me){
                    for(var i of game._characterChoice[i]){
                        neiding.push(i);
                    }
                }
            }
            dialog.players=ui.create.buttons(neiding, "characterx",buttons);

        }

        //next.selectButton = [1, 2];
        
    }


    next.forceDie = true;
    return next;
}*/


//触发技能随便选人
ui.click.skill=function(skill){
    
    var info = get.info(skill);
    var event = _status.event;
    
    event.backup(skill);
    




    if (info.filterCard && info.discard != false && info.lose != false && !info.viewAs) {
        var cards = event.player.getCards(event.position);
        for (var i = 0; i < cards.length; i++) {
            if (!lib.filter.cardDiscardable(cards[i], event.player)) {
                cards[i].uncheck("useSkill");
            }
        }
    }
    if (typeof event.skillDialog == "object") {
        event.skillDialog.close();
    }
    if (event.isMine()) {
        event.skillDialog = true;
    }
    game.uncheck();
    game.check();
    if (event.skillDialog === true) {
        var str = get.translation(skill);
        if (info.prompt) {
            var str2;
            if (typeof info.prompt == "function") {
                str2 = info.prompt(event);
            } else {
                str2 = info.prompt;
            }
            event.skillDialog = ui.create.dialog(str, '<div><div style="width:100%;text-align:center">' + str2 + "</div></div>");
            if (info.longprompt) {
                event.skillDialog.forcebutton = true;
                ui.update();
            }
        } else if (info.promptfunc) {
            event.skillDialog = ui.create.dialog(str, '<div><div style="width:100%">' + info.promptfunc(event, event.player) + "</div></div>");
        } else if (lib.dynamicTranslate[skill]) {
            event.skillDialog = ui.create.dialog(str, '<div><div style="width:100%">' + lib.dynamicTranslate[skill](event.player, skill) + "</div></div>");
        } else if (lib.translate[skill + "_info"]) {
            event.skillDialog = ui.create.dialog(str, '<div><div style="width:100%">' + lib.translate[skill + "_info"] + "</div></div>");
        }
    }
    //console.log(event);
}






/*lib.element.player.$update   更新玩家数据的*/


/*lib.element.content.waitForPlayer=function(){
    "step 0";
    ui.auto.hide();
    ui.pause.hide();

    game.createServer();
    if (!lib.translate.zhu) {
        lib.translate.zhu = "主";
    }
    if (event.func) {
        event.func();
    }
    if (!lib.configOL.number) {
        lib.configOL.number = parseInt(lib.configOL.player_number);
    }
    if (game.onlineroom) {
        game.send("server", "config", lib.configOL);
    }

    ui.create.connectPlayers(game.ip);
    if (!window.isNonameServer) {
        var me = game.connectPlayers[0];
        me.setIdentity("zhu");
        me.initOL(get.connectNickname(), lib.config.connect_avatar);
        me.playerid = "1";
        game.onlinezhu = "1";
    }
    _status.waitingForPlayer = true;
    if (window.isNonameServer) {
        document.querySelector("#server_status").innerHTML = "等待中";
    }
    game.pause();
    "step 1";
    _status.waitingForPlayer = false;
    lib.configOL.gameStarted = true;
    if (window.isNonameServer) {
        document.querySelector("#server_status").innerHTML = "游戏中";
    }
    if (game.onlineroom) {
        game.send("server", "config", lib.configOL);
    }
    for (var i = 0; i < game.connectPlayers.length; i++) {
        game.connectPlayers[i].delete();
    }
    delete game.connectPlayers;
    if (ui.roomInfo) {
        ui.roomInfo.remove();
        delete ui.roomInfo;
    }
    if (ui.exitroom) {
        ui.exitroom.remove();
        delete ui.exitroom;
    }
    game.broadcast(function (){
        lib.namePrefix.set("德", {
            color: "#8470FF",
            nature: "LightSlateBlue",
            showName: "德",
        });
    });
    game.broadcast("gameStart");
    game.delay(2);
    ui.auto.show();
    ui.pause.show();
    if (lib.config.show_cardpile) {
        ui.cardPileButton.style.display = "";
    }
}*/



//让装备牌不占位
lib.element.player.removeVirtualEquip=function(VCard){
    const player2 = this;
    game.addVideo("removeVirtualEquip", player2, get.vcardInfo(VCard));
    game.broadcast(
      (VCard2, player3) => {
        const cards2 = player3.vcardsMap?.equips;
        if (cards2 && cards2.includes(VCard2)) {
          cards2.remove(VCard2);
        }
      },
      VCard,
      player2
    );
    const cards = player2.vcardsMap?.equips;
    if (cards && cards.includes(VCard)) {
      player2.removeEquipTrigger(VCard, true);
      cards.remove(VCard);
    }
    

}

//关闭装备牌占位  点击手牌数按钮强制选择其所有牌
lib.element.player.buildNode=function(){
    let player = this;
    /** @type { SMap<HTMLDivElement> } */
    const node = (player.node = {
        avatar: ui.create.div(".avatar", player, ui.click.avatar).hide(),
        avatar2: ui.create.div(".avatar2", player, ui.click.avatar2).hide(),
        turnedover: ui.create.div(".turned", "<div>翻面<div>", player),
        framebg: ui.create.div(".framebg", player),
        intro: ui.create.div(".intro", player),
        identity: ui.create.div(".identity", player),
        hp: ui.create.div(".hp", player),
        name: ui.create.div(".name", player),
        name2: ui.create.div(".name.name2", player),
        nameol: ui.create.div(".nameol", player),
        count: ui.create.div(".count", player,function(){
            if(player===game.me) return;
            //ui.selected.cards=player.getCards('hes');
            //console.log(this);
        }).hide(),
        equips: ui.create.div(".equips", player).hide(),
        judges: ui.create.div(".judges", player),
        marks: ui.create.div(".marks", player),
        chain: ui.create.div(".chain", "<div></div>", player),
        handcards1: ui.create.div(".handcards"),
        handcards2: ui.create.div(".handcards"),
        expansions: ui.create.div(".expansions"),
    });
    player.node.handcards1._childNodesWatcher = new ChildNodesWatcher(player.node.handcards1);
    player.node.handcards2._childNodesWatcher = new ChildNodesWatcher(player.node.handcards2);
    
    node.expansions.style.display = "none";
    const chainLength = game.layout == "default" ? 64 : 40;
    for (let repetition = 0; repetition < chainLength; repetition++) {
        ui.create.div(node.chain.firstChild, ".cardbg").style.transform = `translateX(${repetition * 5 - 5}px)`;
    }
    node.action = ui.create.div(".action", node.avatar);
}

//隐藏自己的信息
lib.message.client.opened = function () {
    game.send(
        "init",
        lib.versionOL,
        {
            id: "", //|| game.onlineID,
            onlineKey: "",//game.onlineKey,
            avatar: lib.config.connect_avatar,
            nickname: get.connectNickname(),
            versionLocal: '1.11.2',//lib.version,
            extension: false,//告诉你我没有开拓展
        },
        lib.config.banned_info
    );
    if (ui.connecting && !ui.connecting.splashtimeout) {
        ui.connecting.firstChild.innerHTML = "重连成功";
    }
}



    //修改创建房间的模式名字等  整活
    const send=game.send;
    game.send=function(){
        if (arguments[1] == 'config' ){
            console.log(arguments);
            const modifiedArgs = Array.prototype.slice.call(arguments) //我就偷偷地替换你一下，应该没人发现吧
            const configCopy = JSON.parse(JSON.stringify(arguments[2]))
            if (arguments[0] == 'server') {
                configCopy.mode = `吸烟`;
                configCopy.cardPack=["瑞克","芙蓉","王 ","利群"];
            }
            modifiedArgs[2] = configCopy;
            send.call(this,...modifiedArgs);
            
        }
        else send.call(this,...arguments);
    }

    //自动点击联机界面的连接按钮
    const onfree=lib.init.onfree;
    lib.init.onfree=function(){
        onfree.call(this);
        if(lib.config["extension_自写功能_autoIpBtn"]){
            if(ui.ipbutton) ui.ipbutton.click();
        }
    }

    //装备区的牌显示颜色。//配合css
    var oldcardinit=lib.element.card.$init;
    lib.element.card.$init = function (card) {
        this.setAttribute("data-suit", this.suit);
        return oldcardinit.call(this, card);
    };


    //黑名单
    ui.click.connectClients=function(){
		if (this.info) {
			var button = this;
			var layer = ui.create.div(".poplayer", ui.window);
			var uiintro = ui.create.dialog("hidden", "notouchscroll");
			this.classList.add("active");
			if (lib.config.touchscreen) {
				lib.setScroll(uiintro.contentContainer);
			}
			layer.listen(function () {
				if (this.clicked) {
					this.clicked = false;
					return;
				}
				button.classList.remove("active");
				uiintro.delete();
				this.delete();
			});
			uiintro.listen(function () {
				_status.clicked = true;
			});
			uiintro.style.zIndex = "21";
			uiintro.classList.add("popped");
			uiintro.classList.add("static");
			uiintro.classList.add("onlineclient");
			uiintro.style.width = "180px";
			uiintro.style.height = "300px";
			uiintro.style.left = "auto";
			uiintro.style.right = "20px";
			uiintro.style.top = "auto";
			uiintro.style.bottom = "75px";

			uiintro.refresh = function () {
				if (button.focused) return;
				uiintro.content.innerHTML = "";
				uiintro.addText("发状态");
				button.textnode = uiintro.content.lastChild.lastChild;
				uiintro.add('<input type="text" style="width:calc(100% - 10px);resize: none;border: none;border-radius: 2px;box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 0px 1px;margin-top: -2px;margin-bottom: 2px;">');
				uiintro.content.lastChild.style.paddingTop = 0;
				button.input = uiintro.content.lastChild.lastChild;
				button.input.onfocus = function () {
					button.focused = true;
				};
				button.input.onblur = function () {
					delete button.focused;
				};
				if (button.interval) {
					button.input.disabled = true;
					button.input.style.opacity = 0.6;
					if (button.intervaltext) {
						button.textnode.innerHTML = button.intervaltext;
					}
				}
				button.input.onkeydown = function (e) {
					if (e.keyCode == 13 && !this.disabled) {
						game.send("server", "status", this.value);
						this.blur();
						this.disabled = true;
						this.style.opacity = 0.6;
						button.textnode.innerHTML = "发状态(10)";
						button.intervaltext = button.textnode.innerHTML;
						var num = 10;
						var that = this;
						button.input.disabled = true;
						button.input.style.opacity = 0.6;
						this.value = "";
						button.interval = setInterval(function () {
							num--;
							if (num > 0) {
								button.textnode.innerHTML = "发状态(" + num + ")";
								button.intervaltext = button.textnode.innerHTML;
							} else {
								button.textnode.innerHTML = "发状态";
								button.input.disabled = false;
								button.input.style.opacity = "";
								clearInterval(button.interval);
								delete button.interval;
								delete button.intervaltext;
							}
						}, 1000);
					}
				};
				var p;
				//console.log(button);
				//console.log(button.info);
				for (var i = 0; i < button.info.length; i++) {
					//   0名字        1头像      2是否为本机      3未知全是null   4  websocket            5onlinekey 唯一id
					var node = ui.create.div(".menubutton.videonode.pointerdiv", uiintro.content);
					ui.create.div(".menubutton.videoavatar", node).setBackground(button.info[i][1] || "caocao", "character");
					if (button.info[i][4] == game.wsid) {
						p=ui.create.div(".name", '<span class="thundertext thunderauto">' + (button.info[i][0] || "无名玩家"), node);
						node.isme = true;
					} else if (button.info[i][2]) {
						//名字
						p=ui.create.div(".name", button.info[i][0] || "无名玩家", node);
					} else {
						p=ui.create.div(".name", '<span style="opacity:0.6">' + (button.info[i][0] || "无名玩家"), node);
					}
					p.id=button.info[i][5];

					p.onclick=function(){
						var banBlacklist = lib.config.banBlacklist === undefined ? [] : lib.config.banBlacklist;
						if(banBlacklist.includes(this.id)){
							banBlacklist.remove(this.id);
							this.style.color="white";
						}
						else{
							banBlacklist.push(this.id);
							this.style.color="red";
						}
						game.saveConfig("banBlacklist", banBlacklist);

					}
					var banBlacklist = lib.config.banBlacklist === undefined ? [] : lib.config.banBlacklist;
					if(banBlacklist.includes(button.info[i][5])) p.style.color = "red";
					//show ID
					/*const id=ui.create.div('.videostatus',node,button.info[i][5],function(){
						var banBlacklist = lib.config.banBlacklist === undefined ? [] : lib.config.banBlacklist;
						if(banBlacklist.includes(this.textContent)){
							banBlacklist.remove(this.textContent);
							this.style.color="white";
						}
						else{
							banBlacklist.push(this.textContent);
							this.style.color="red";
						}
						game.saveConfig("banBlacklist", banBlacklist);
					});
					var banBlacklist = lib.config.banBlacklist === undefined ? [] : lib.config.banBlacklist;
					if(banBlacklist.includes(button.info[i][5])) id.style.color = "red";*/
					//node.classList.add('videonodestatus');
					if (button.info[i][3]) {
						ui.create.div(".videostatus", node, get.plainText(button.info[i][3].slice(0, 80)));
						node.classList.add("videonodestatus");
					}
				}
			};
			uiintro.refresh();
			ui.window.appendChild(uiintro);
			_status.connectClientsCallback = function () {
				if (uiintro.parentNode == ui.window) {
					uiintro.refresh();
				}
			};
		}
	};


    //显示座位  但是选将的时候看不到
    lib.element.player.setSeatNum=function(num) {
        _status.seatNumSettled = true;
        const seat=[`0`,`①`,`②`,`③`,`④`,`⑤`,`⑥`,`⑦`,`⑧`,`⑨`,`⑩`];
        game.broadcastAll(
          function(player2, num2,seat2) {
            player2.seatNum = num2;
            player2.node.nameol.innerHTML = seat2[num2]+(player2.nickname || "").slice(0, 12);
          },
          this,
          num,
          seat

        );
    };



