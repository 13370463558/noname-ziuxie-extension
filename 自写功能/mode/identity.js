import { game, ui, _status, ai, lib, get } from "../../../noname.js";
//import { initBegin, initPlayers, chooseSkill, chooseAvatar, chooseGroup, addCharacterUse } from "./chooseSkill.js"

export const identity = {
    chooseMode() {//初始化游戏完成，分配选将逻辑
        const mode = _status.mode.slice(0, 1).toUpperCase() + _status.mode.slice(1);//首字母大写
        if (typeof game['chooseCharacter' + mode + 'OL'] === 'function') {//存在对应的选择角色逻辑就跳转
            game['chooseCharacter' + mode + 'OL']()
            return;
		}
		//反之用默认的
        const next = game.createEvent('chooseCharacter');
        next.set('mode', mode)
		next.setContent(function () {
			"step 0"
			game.broadcastAll(() => { ui.arena.classList.add('choose-character') })
			var i;
			var identityList;
			if (_status.mode == 'zhong') {
				event.zhongmode = true;
				identityList = ['zhu', 'zhong', 'mingzhong', 'nei', 'fan', 'fan', 'fan', 'fan'];
			} else {
				identityList = get.identityList(game.players.length);
				if (lib.configOL.double_nei) {
					switch (lib.configOL.number) {
						case 8:
							identityList.remove('fan');
							identityList.push('nei');
							break;
						case 7:
							identityList.remove('zhong');
							identityList.push('nei');
							break;
						case 6:
							identityList.remove('fan');
							identityList.push('nei');
							break;
						case 5:
							identityList.remove('fan');
							identityList.push('nei');
							break;
						case 4:
							identityList.remove('zhong');
							identityList.push('nei');
							break;
						case 3:
							identityList.remove('fan');
							identityList.push('nei');
							break;
					}
				}
			}
			identityList.randomSort();

			for (i = 0; i < game.players.length; i++) {
				game.players[i].identity = identityList[i];
				game.players[i].setIdentity('cai');
				game.players[i].node.identity.classList.add('guessing');
				if (event.zhongmode) {
					if (identityList[i] == 'mingzhong') {
						game.zhu = game.players[i];
					} else if (identityList[i] == 'zhu') {
						game.zhu2 = game.players[i];
					}
				} else {
					if (identityList[i] == 'zhu') {
						game.zhu = game.players[i];
					}
				}
				game.players[i].identityShown = false;
			}
			if (lib.configOL.special_identity && !event.zhongmode && game.players.length == 8) {
				var map = {};
				var zhongs = game.filterPlayer(function (current) {
					return current.identity == 'zhong';
				});
				var fans = game.filterPlayer(function (current) {
					return current.identity == 'fan';
				});
				if (fans.length >= 1) {
					map.identity_zeishou = fans.randomRemove();
				}
				if (zhongs.length > 1) {
					map.identity_dajiang = zhongs.randomRemove();
					map.identity_junshi = zhongs.randomRemove();
				}
				else if (zhongs.length == 1) {
					if (Math.random() < 0.5) {
						map.identity_dajiang = zhongs.randomRemove();
					}
					else {
						map.identity_junshi = zhongs.randomRemove();
					}
				}
				game.broadcastAll(function (zhu, map) {
					for (var i in map) {
						map[i].special_identity = i;
					}
				}, game.zhu, map);
				event.special_identity = map;
			}

			game.zhu.setIdentity();
			game.zhu.identityShown = true;
			game.zhu.isZhu = (game.zhu.identity == 'zhu');
			game.zhu.node.identity.classList.remove('guessing');
			game.me.setIdentity();
			game.me.node.identity.classList.remove('guessing');
			if (game.me.special_identity) {
				game.me.node.identity.firstChild.innerHTML = get.translation(game.me.special_identity + '_bg');
			}

			for (var i = 0; i < game.players.length; i++) {
				game.players[i].send(function (zhu, zhuid, me, identity) {
					for (var i in lib.playerOL) {
						lib.playerOL[i].setIdentity('cai');
						lib.playerOL[i].node.identity.classList.add('guessing');
					}
					zhu.identityShown = true;
					zhu.identity = zhuid;
					if (zhuid == 'zhu') zhu.isZhu = true;
					zhu.setIdentity();
					zhu.node.identity.classList.remove('guessing');
					me.setIdentity(identity);
					me.node.identity.classList.remove('guessing');
					if (me.special_identity) {
						me.node.identity.firstChild.innerHTML = get.translation(me.special_identity + '_bg');
					}
					ui.arena.classList.add('choose-character');
				}, game.zhu, game.zhu.identity, game.players[i], game.players[i].identity);
			}

			var list;
			var list2 = [];
			var list3 = [];
			var list4 = [];
			event.list = [];
			event.list2 = [];

			var libCharacter = {};
			for (var i = 0; i < lib.configOL.characterPack.length; i++) {
				var pack = lib.characterPack[lib.configOL.characterPack[i]];
				for (var j in pack) {
					//if (j == 'zuoci') continue;
					if (lib.character[j]) libCharacter[j] = pack[j];
				}
			}
			for (i in lib.characterReplace) {
				var ix = lib.characterReplace[i];
				for (var j = 0; j < ix.length; j++) {
					if (!libCharacter[ix[j]] || lib.filter.characterDisabled(ix[j])) ix.splice(j--, 1);
				}
				if (ix.length) {
					event.list.push(i);
					event.list2.push(i);
					list4.addArray(ix);
					var bool = false;
					for (var j of ix) {
						if (libCharacter[j][4] && libCharacter[j][4].includes('zhu')) {
							bool = true; break;
						}
					}
					(bool ? list2 : list3).push(i);
				}
			}
			game.broadcast(function (list) {
				for (var i in lib.characterReplace) {
					var ix = lib.characterReplace[i];
					for (var j = 0; j < ix.length; j++) {
						if (!list.includes(ix[j])) ix.splice(j--, 1);
					}
				}
				_status.characterlist = list
			}, list4);
			for (i in libCharacter) {
				if (list4.includes(i)) continue;
				if (lib.filter.characterDisabled(i, libCharacter)) continue;
				event.list.push(i);
				event.list2.push(i);
				list4.push(i);
				if (libCharacter[i][4] && libCharacter[i][4].includes('zhu')) {
					list2.push(i);
				}
				else {
					list3.push(i);
				}
			}
			_status.characterlist = list4.slice(0);

			event.useTime = lib.configOL.choose_timeout
			event.chooseTime = lib.configOL.chooseCharacter_moreTime
			game.broadcastAll((num) => {
				lib.configOL.choose_timeout = Number(num)
			}, event.chooseTime)
			
			//自由点将开始1
			if (lib.configOL.identity_listNum == 'dianjiang') {
				game.broadcastAll(function (list, id, zhu) {
					_status.characterlist = list;
					if (game.me == zhu) {
						var dialog = ui.create.characterDialog('heightset').open()
						dialog.id = id
					}
				}, _status.characterlist, event.videoId, game.zhu);

				game.zhu.chooseButton(true)
					.set('selectButton', (lib.configOL.double_character ? 2 : 1)).set('dialog', event.videoId)
			}
			//自由点将结束1
			else {
				if (lib.configOL.identity_listNum == 'normal') {
					let finalNum = lib.configOL.choice_zhu;
					if (lib.configOL.unbalanced_mode) finalNum = 12;
					var getZhuList = function (list2) {
						var limit_zhu = lib.configOL.limit_zhu;
						if (!limit_zhu || limit_zhu == 'off') return list2.slice(0).sort(lib.sort.character);
						if (limit_zhu != 'group') {
							var num = (parseInt(limit_zhu) || 6);
							return list2.randomGets(num).sort(lib.sort.character);
						}
						var getGroup = function (name) {
							if (lib.characterReplace[name]) return lib.character[lib.characterReplace[name][0]][1];
							return lib.character[name][1];
						}
						var list2x = list2.slice(0);
						list2x.randomSort();
						for (var i = 0; i < list2x.length; i++) {
							for (var j = i + 1; j < list2x.length; j++) {
								if (getGroup(list2x[i]) == getGroup(list2x[j])) {
									list2x.splice(j--, 1);
								}
							}
						}
						list2x.sort(lib.sort.character);
						return list2x;
					}
					list = getZhuList(list2).concat(list3.randomGets(finalNum));
				}
				else {
					let finalNum = parseInt(lib.config.extension_自写功能_chooseCharacternums) || 6
					if (lib.configOL.unbalanced_mode) finalNum = 12;
					var getZhuList = function (list2) {
						var limit_zhu = lib.configOL.limit_zhu;
						if (!limit_zhu || limit_zhu == 'off') return list2.slice(0).sort(lib.sort.character);
						if (limit_zhu != 'group') {
							var num = (parseInt(limit_zhu) || 6);
							return list2.randomGets(num).sort(lib.sort.character);
						}
						var getGroup = function (name) {
							if (lib.characterReplace[name]) return lib.character[lib.characterReplace[name][0]][1];
							return lib.character[name][1];
						}
						var list2x = list2.slice(0);
						list2x.randomSort();
						for (var i = 0; i < list2x.length; i++) {
							for (var j = i + 1; j < list2x.length; j++) {
								if (getGroup(list2x[i]) == getGroup(list2x[j])) {
									list2x.splice(j--, 1);
								}
							}
						}
						list2x.sort(lib.sort.character);
						return list2x;
					}
					list = getZhuList(list2).concat(list3.randomGets(finalNum));
				}
				if (event.zhongmode) {
					list = event.list.randomGets(8);
				}
				var next = game.zhu.chooseButton(true);
				next.set('selectButton', (lib.configOL.double_character ? 2 : 1));
				next.set('createDialog', ['选择角色', [list, 'characterx']]);
				next.set('ai', function (button) {
					return Math.random();
				});
			}
			
			"step 1"
			//自由点将开始2
			if (!result.links || result.links?.length == 0) {
				result.links = _status.characterlist.randomGets(lib.configOL.double_character ? 2 : 1)
			}
			if (lib.configOL.identity_listNum == 'dianjiang') {
				if (game.zhu.isOnline()) {
					game.zhu.send("closeDialog", event.id)
				}
				else if (game.zhu == game.me) {
					var dialog = get.idDialog(event.id);
					if (dialog) {
						dialog.close();
					}
				}
			}
			//自由点将结束2
			if (!game.zhu.name) {
				game.zhu.init(result.links[0], result.links[1])
			}
			event.list.remove(get.sourceCharacter(game.zhu.name1));
			event.list.remove(get.sourceCharacter(game.zhu.name2));
			event.list2.remove(get.sourceCharacter(game.zhu.name1));
			event.list2.remove(get.sourceCharacter(game.zhu.name2));

			if (game.players.length > 4) {
				if (!game.zhu.isInitFilter('noZhuHp')) {
					game.zhu.maxHp++;
					game.zhu.hp++;
					game.zhu.update();
				}
			}
			game.broadcast(function (zhu, name, name2, addMaxHp) {
				if (!zhu.name) {
					zhu.init(name, name2);
				}
				if (addMaxHp && !zhu.isInitFilter("noZhuHp")) {
					zhu.maxHp++;
					zhu.hp++;
					zhu.update();
				}
			}, game.zhu, result.links[0], result.links[1], game.players.length > 4);

			if (game.zhu.group == 'shen' || game.zhu.group == "western" && !game.zhu.isUnseen(0)) {
				game.zhu._groupChosen = "kami";
				var list = ['wei', 'shu', 'wu', 'qun', 'jin', 'key', 'shen'];
				for (var i = 0; i < list.length; i++) {
					if (!lib.group.includes(list[i])) list.splice(i--, 1);
					else list[i] = ['', '', 'group_' + list[i]];
				}
				game.zhu.chooseButton(['请选择你的势力', [list, 'vcard']], true).set('ai', function () {
					return Math.random();
				});
			}
			else if (get.is.double(game.zhu.name1)) {
				game.zhu._groupChosen = true;
				var list = get.is.double(game.zhu.name1, true);
				for (var i = 0; i < list.length; i++) {
					if (!lib.group.includes(list[i])) list.splice(i--, 1);
					else list[i] = ['', '', 'group_' + list[i]];
				}
				game.zhu.chooseButton(['请选择你的势力', [list, 'vcard']], true).set('ai', function () {
					return Math.random();
				});
			}
			else event.goto(3);
			"step 2"
			var name = result.links[0][2].slice(6);
			game.zhu.changeGroup(name);
			"step 3"
			var list = [];
			var selectButton = (lib.configOL.double_character ? 2 : 1);
			var num = Math.floor(event.list.length / (game.players.length - 1));
			//自由点将开始3
			if (lib.configOL.identity_listNum == 'dianjiang') {
				game.broadcastAll(function (id, zhu) {
					if (game.me != zhu) {
						var dialog = ui.create.characterDialog('heightset').open()
						dialog.id = id
					}
				}, event.videoId, game.zhu);
			}
			//自由点将结束3
			for (let i = 0; i < game.players.length; i++) {
				//swTool.onlineSelectNum = swTool.getSelect()
				event.onlineSelectNum=parseInt(lib.config.extension_自写功能_chooseCharacternums);
				if (game.players[i] != game.zhu) {
					//自由点将开始4
					if (lib.configOL.identity_listNum == 'dianjiang') {
						list.push([game.players[i],
							event.videoId, selectButton, true
						]);
					}//自由点将结束4
					else {
						const identity = game.players[i].identity;
						let num2;
						if (event.zhongmode) {
							if (identity == "nei" || identity == "zhu") num2 = 8;
							else num2 = 6;
						} else {
							num2 = lib.configOL["choice_" + identity];
						}
						let str = "选择角色";
						if (game.players[i].special_identity) {
							str += "（" + get.translation(game.players[i].special_identity) + "）";
						}
						if (lib.configOL.identity_listNum != 'normal' && event.onlineSelectNum) {
							list.push([game.players[i],
							[str, [event.list.randomRemove(event.onlineSelectNum), 'characterx']], selectButton, true
							]);
						} else {
							//TODO:此处要因身份而异
							list.push([game.players[i],
							[str, [event.list.randomRemove(num2), 'characterx']], selectButton, true
							]);
						}
					}
				}
			}
			game.me.chooseButtonOL(list, function (player, result) {
				if (game.online || player == game.me) player.init(result.links[0], result.links[1]);
			}).set("switchToAuto", function () {
				_status.event.result = "ai";
			})
			.set("processAI", function () {
				return "ai";
			});


			"step 4"
			game.broadcastAll((num) => {
				lib.configOL.choose_timeout = Number(num)
			}, event.useTime)
			//自由点将开始5
			if (lib.configOL.identity_listNum == 'dianjiang') game.broadcastAll("closeDialog", event.id)
			//自由点将结束5
			var shen = [];
			for (var i in result) {
				if (result[i] && result[i].links) {
					for (var j = 0; j < result[i].links.length; j++) {
						event.list2.remove(get.sourceCharacter(result[i].links[j]));
					}
				}
			}
			
			for (var i in result) {
				if (result[i] == 'ai') {
					result[i] = event.list2.randomRemove(lib.configOL.double_character ? 2 : 1);
					for (var j = 0; j < result[i].length; j++) {
						var listx = lib.characterReplace[result[i][j]];
						if (listx && listx.length) result[i][j] = listx.randomGet();
					}
				}
				else {
					result[i] = result[i].links;
				}
				if (get.is.double(result[i][0]) || (lib.character[result[i][0]] && (lib.character[result[i][0]].group == "shen" || lib.character[result[i][0]].group == "western") && !lib.character[result[i][0]].hasHiddenSkill)) shen.push(lib.playerOL[i]);
			}
			event.result2 = result;
			if (shen.length) {
				var list = ['wei', 'shu', 'wu', 'qun', 'jin', 'key'];
				for (var i = 0; i < list.length; i++) {
					if (!lib.group.includes(list[i])) list.splice(i--, 1);
					else list[i] = ['', '', 'group_' + list[i]];
				}
				for (var i = 0; i < shen.length; i++) {
					if (get.is.double(result[shen[i].playerid][0])) {
						shen[i]._groupChosen = "double";
						shen[i] = [
							shen[i],
							[
								"请选择你的势力",
								[
									get.is.double(result[shen[i].playerid][0], true).map(function (i) {
										return ["", "", "group_" + i];
									}),
									"vcard",
								],
							],
							1,
							true,
						];
					} else {
						shen[i]._groupChosen = "kami";
						shen[i] = [shen[i], ["请选择你的势力", [list, "vcard"]], 1, true];
					}
				}
				game.me.chooseButtonOL(shen, function (player, result) {
					if (player == game.me) player.changeGroup(result.links[0][2].slice(6), false, false);
				}).set('switchToAuto', function () {
					_status.event.result = 'ai';
				}).set('processAI', function () {
					return {
						bool: true,
						links: [_status.event.dialog.buttons.randomGet().link],
					}
				});
			}
			else event._result = {};
			"step 5"
			if (!result) result = {};
			for (var i in result) {
				if (result[i] && result[i].links) result[i] = result[i].links[0][2].slice(6);
				else if (result[i] == 'ai') result[i] = function () {
					var player = lib.playerOL[i];
					var list = ['wei', 'shu', 'wu', 'qun', 'jin', 'key'];
					for (var ix = 0; ix < list.length; ix++) {
						if (!lib.group.includes(list[ix])) list.splice(ix--, 1);
					}
					if (_status.mode != 'zhong' && game.zhu && game.zhu.group) {
						if (['re_zhangjiao', 'liubei', 're_liubei', 'caocao', 're_caocao', 'sunquan', 're_sunquan', 'zhangjiao', 'sp_zhangjiao', 'caopi', 're_caopi', 'liuchen', 'caorui', 'sunliang', 'sunxiu', 'sunce', 're_sunben', 'ol_liushan', 're_liushan', 'key_akane', 'dongzhuo', 're_dongzhuo', 'ol_dongzhuo', 'jin_simashi', 'caomao'].includes(game.zhu.name)) return game.zhu.group;
						if (game.zhu.name == 'yl_yuanshu') {
							if (player.identity == 'zhong') list.remove('qun');
							else return 'qun';
						}
						if (['sunhao', 'xin_yuanshao', 're_yuanshao', 're_sunce', 'ol_yuanshao', 'yuanshu', 'jin_simazhao', 'liubian'].includes(game.zhu.name)) {
							if (player.identity != 'zhong') list.remove(game.zhu.group);
							else return game.zhu.group;
						}
					}
					return list.randomGet();
				}();
			}
			var result2 = event.result2;
			game.broadcast(function (result, result2) {
				for (var i in result) {
					if (!lib.playerOL[i].name) {
						lib.playerOL[i].init(result[i][0], result[i][1]);
					}
					if (result2[i] && result2[i].length) lib.playerOL[i].changeGroup(result2[i], false, false);
				}
				setTimeout(function () {
					ui.arena.classList.remove('choose-character');
				}, 500);
			}, result2, result);

			for (var i in result2) {
				if (!lib.playerOL[i].name) {
					lib.playerOL[i].init(result2[i][0], result2[i][1]);
				}
				if (result[i] && result[i].length) lib.playerOL[i].changeGroup(result[i], false, false);
			}

			if (event.special_identity) {
				for (var i in event.special_identity) {
					game.zhu.addSkill(i);
				}
			}
			for (var i = 0; i < game.players.length; i++) {
				_status.characterlist.remove(game.players[i].name);
				_status.characterlist.remove(game.players[i].name1);
				_status.characterlist.remove(game.players[i].name2);
			}
			setTimeout(function () {
				ui.arena.classList.remove('choose-character');
			}, 500);
		});
        return next
    },
}
