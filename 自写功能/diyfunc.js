import { game, ui, _status, ai, lib, get } from "../../../noname.js";

import {NonameAssembly} from "../../noname/library/assembly/index.js";
//game.online  false为主机或单机游玩；
export const diy ={
    paidui(){
		if(game.online) return;
		var uiintro = ui.create.dialog("hidden");
		uiintro.classList.add("fullheight");
		uiintro.listen(function (e) {
			e.stopPropagation();
		});
		uiintro.add(' 牌堆查看器<span style="font-family:' + "xinwei" + '">');
		if (ui.cardPile.childNodes.length) {
			var list = [];
			for (var i = 0; i < ui.cardPile.childNodes.length; i++) {
				list.push(ui.cardPile.childNodes[i]);
			}
			uiintro.addSmall([list, "card"]);
		} else {
			uiintro.add('<div class="text center" style="padding-bottom:3px">无</div>');
		}
		return uiintro;
	},
	test(){
		console.log(this);
	},

	music(){
		if(!_status.gameStarted) return;
		var dialog=ui.create.dialog("hidden");
		dialog.listen(function (e) {
			e.stopPropagation();
		});
		var music={
			jntm:`https://cdn2.ear0.com:3321/preview?soundid=39338&type=mp3`,
			ec:`https://cdn2.ear0.com:3321/preview?soundid=37007&type=mp3`,
			lll:`https://lc-sycdn.kuwo.cn/b77b48c7624da825c7eed1f1e7a3dcbe/68367e48/resource/n3/83/47/2170378567.mp3`,
			};
		var translate={
			jntm:"鸡你太美",
			ec:"恶臭",
			lll:"IllusionarDaytime",
		};

		
		for(var i in music){
			
			var div=ui.create.div(".text.center",translate[i], function () {
				game.broadcastAll(function(url) {
					const audio = new Audio();
					audio.src = url;
				  
					audio.play()
					  .then(() => {
						console.log("播放中...");
						setTimeout(() => {
						  audio.pause();
						  console.log("已停止播放");
						}, 10000);
					  })
					  .catch(e => console.error('播放失败:', e));
				},this.url);
			});
			div.url=music[i];
			dialog.add(div);
		}
		return dialog;

	},
	huanfu(){
		if(!_status.gameStarted) return;


	
		var dialog=ui.create.dialog("hidden");
		dialog.listen(function (e) {
			e.stopPropagation();
		});
		var skin={
			laoda:`https://img14.360buyimg.com/pop/jfs/t1/239974/28/17118/34015/66ca2625F43a96ff0/b2a01ba0edf9999a.jpg`,
			ctrl:`https://s1.aigei.com/src/img/gif/71/71a9123270ee47709c56a3d6988c94fe.gif`,
			dz:`https://wx4.sinaimg.cn/mw690/001PLqzGly1hqb3c34y3ej60hs0nptcx02.jpg`,
			biexiao:`image/emotion/biexiao_emotion/2.gif`,
			xjj:`https://s1.aigei.com/src/img/gif/fd/fd50c5470ae34e69b31dcad9d649a950.gif`,
			kw:`https://s1.aigei.com/src/img/gif/aa/aa9cb1d61445426c92c8570633c7056e.gif`,
			ecy:`https://s1.aigei.com/src/img/gif/61/610a0d9564e44d9a809cfeac37eac60d.gif`,
			yang:`https://s1.aigei.com/src/img/gif/92/921a44ac0ec34de99fcb3a53e8c6c23f.gif`,
			chaiquan:`https://s1.aigei.com/src/img/gif/e5/e576cff1ca5a412da86b9490761a0a81.gif`,
		};
		var translate={
			laoda:"劳大",
			ctrl:"鸡哥",
			dz:"丁真",
			biexiao:"憋笑",
			xjj:"香蕉君",
			kw:"狂舞",
			ecy:"二次元",
			yang:"羊",
			chaiquan:"柴犬",
		};

		
		for(var i in skin){
			
			var div=ui.create.div(".text.center",translate[i], function () {
				game.broadcastAll(function(p,url){
					let img;
					if(url.startsWith(`image/emotion`)) img=lib.assetURL +url;
					else img=url;
					p.node.avatar.setBackgroundImage(img);
				},game.me,this.url);
			});
			div.url=skin[i];
			dialog.add(div);
		}
		return dialog;

	},
	//没用了先留着吧
    kill(){
		
		if(!game.me) return;
		var dialog=ui.create.dialog("hidden");
		dialog.listen(function (e) {
			e.stopPropagation();
		});

		const t = game.connectPlayers || game.players;
		for(var i of t){
			//if(i==game.me) continue;
			if(true){
				var div=ui.create.div(".text.center",'['+get.translation(i.identity)+']'+get.translation(i), function () {
					var t_kill=game.filterPlayer(t=>'['+get.translation(t.identity)+']'+get.translation(t)==this.innerHTML)[0];
					t_kill.die();
				});
				dialog.add(div);

			}


		}
		return dialog;
		
	},
    groupChanger(){
		var p=this.parentNode.parentNode;
		var dialog = ui.create.dialog(); // 创建对话框
		const captionDiv = document.createElement('div'); // 创建标题容器
		captionDiv.className = 'caption';
		
		const popupDiv = document.createElement('div'); // 创建内容容器
		popupDiv.className = 'popup pointerdiv selectable';
		//popupDiv.style.width = '80%';
		popupDiv.style.display = 'flex'; // 使用 Flexbox 实现横向排列
		//popupDiv.style.flexWrap = 'wrap'; // 如果需要换行
		popupDiv.style.gap = '10px'; // 设置子元素之间的间距
		
		// 遍历 lib.group，创建每个子元素
		for (var i = 0; i < lib.group.length; i++) {
		  var shili = document.createElement('div');
		  shili.textContent = get.translation(lib.group[i]); // 设置内容
		  shili.className = lib.group[i];
		  
		  // 为每个子元素添加边框样式
		  shili.style.border = '1px solid black'; // 边框
		  shili.style.padding = '5px'; // 内边距
		  shili.style.display = 'inline-block'; // 确保子元素横向排列
		  //shili.style.minWidth = '50px'; // 设置最小宽度（可选）
		  shili.style.textAlign = 'center'; // 文字居中（可选）
		  
		  shili.addEventListener(lib.config.touchscreen ? "touchend" : "click", function (e) {
			e.stopPropagation();
			p.changeGroup(this.className);
			dialog.close();
		});
		  popupDiv.appendChild(shili); // 将子元素添加到内容容器中

		  //captionDiv.appendChild(popupDiv); // 将内容容器添加到标题容器中
		  
		}
		
		captionDiv.appendChild(popupDiv); // 将内容容器添加到标题容器中
		dialog.add(captionDiv); // 将标题容器添加到对话框中
		return dialog;
	},
    chatBt(){
		ui.cailanzi = ui.create.div(".diycailanzi", ui.window,function(){//互动之鲜花与拖鞋
			//game.showcailanzi();
			//console.log("点击了菜篮");
			diy.cailanzi();
		});
		ui.cailanzi.innerHTML="菜篮";
		ui.biaoqingao = ui.create.div(".diybiaoqing", ui.window,function(){//表情
			var uiintro = ui.create.dialog("hidden");
			uiintro.listen(function (e) {
				e.stopPropagation();
			});
			uiintro.contentContainer.style.overflow = "auto";
			
			uiintro.contentContainer.style.cssText+="z-index:99";
			//uiintro.style.height = "400px";
			var list1 = ui.create.div("");
			if (get.is.phoneLayout()) {
				list1.style.height = "110px";
			} else {
				list1.style.height = "250px";
			}
			var emotionTitle = ui.create.div(".text.center","表情包");
			uiintro.add(emotionTitle);
			lib.setScroll(list1);
			uiintro.add(list1);
			var list2 = ui.create.div("");
			if (get.is.phoneLayout()) {
				list2.style.height = "110px";
			} else {
				list2.style.height = "250px";
			}
			
			for (var i in _status?.emotion_cache) {//lib.emotionList
				var emotionPack = ui.create.div(".card.fullskin", '<img src="' + lib.assetURL + "image/emotion/" + i + '/1.gif" width="50" height="50">', function () {
					emotionTitle.innerHTML = get.translation(this.pack);
					for (var j = 1; j <= _status?.emotion_cache[this.pack].length; j++) {
						var emotionButton = ui.create.div(".card.fullskin", '<img src="' + lib.assetURL + "image/emotion/" + this.pack + "/" + j + '.gif" width="50" height="50">', function () {
							var player = game.me;
							if (!player) {
								if (game.connectPlayers) {
									if (game.online) {
										for (var i = 0; i < game.connectPlayers.length; i++) {
											if (game.connectPlayers[i].playerid == game.onlineID) {
												player = game.connectPlayers[i];
												break;
											}
										}
									} else {
										player = game.connectPlayers[0];
									}
								}
							}
							if (!player) return;
							if (game.online) {
								game.send("emotion", game.onlineID, this.pack, this.emotionID);
							} else {
								player.emotion(this.pack, this.emotionID);
								console.log("emotion", this.pack, this.emotionID);
							}
						});
						emotionButton.emotionID =_status?.emotion_cache[this.pack][j-1];
						emotionButton.pack =this.pack;
						emotionButton.style.height = "50px";
						emotionButton.style.width = "50px";
						list2.appendChild(emotionButton);
					}
					
					list1.remove();
					list3.remove();
					uiintro.add(list2);
				});
				emotionPack.pack=i;
				emotionPack.style.height = "50px";
				emotionPack.style.width = "50px";
				list1.appendChild(emotionPack);
				
			}
			var close = ui.create.div(".text", "×", function() { // 使用×符号更美观
				uiintro.close();
			});
			var retractBtn = ui.create.div(".text", "↩", function() { // 使用↩符号表示撤回
				// 这里添加撤回功能的实现代码
				if(emotionTitle.innerHTML!="表情包"){
					list2.remove();
					uiintro.add(list1);
					uiintro.add(list3);
					emotionTitle.innerHTML="表情包";
					while (list2.childNodes.length) {
						list2.firstChild.remove();
					}
				}
			});

			var list3 = ui.create.div(".caption");
			if (get.is.phoneLayout()) {
				list3.style.height = "110px";
			} else {
				list3.style.height = "150px";
			}
			var quickVoice=lib.quickVoice.slice();
			["我要验牌！","牌没有问题！"].forEach(text=>{
				quickVoice.unshift(text);
			})
			if(game.me){
				const player=game.me;
				const skills = player.getSkills(null, false, false).filter(skill => {
					let info = get.info(skill);
					if (!info|| get.skillInfoTranslation(skill, player).length == 0) return false;
					return true;
				});
				if(skills.length){
					for(var i=0;i<skills.length;i++){
						
						const skillTextMap = game.parseSkillTextMap?.(skills[i],game.me).filter(v => v.text) || [];
						skillTextMap.forEach((v, ii) => {
							var node = ui.create.div(".text.chat", function () {
								var player = game.me;
								var str = this.innerHTML;
								if (!player) {
									if (game.connectPlayers) {
										if (game.online) {
											for (var i = 0; i < game.connectPlayers.length; i++) {
												if (game.connectPlayers[i].playerid == game.onlineID) {
													player = game.connectPlayers[i];
													break;
												}
											}
										} else {
											player = game.connectPlayers[0];
										}
									}
								}
								if (!player) return;
								if (game.online) {
									game.send("chat", game.onlineID, str,this.file);
								} else {
									player.chat(str,this.file);
								}
							});
							node.innerHTML =v.text;
							
							node.file=v.file;
							node.style.color="green"; 
							list3.appendChild(node);
						});
					}
					
				}
			}
			for (var i = 0; i < quickVoice.length; i++) {
				var node = ui.create.div(".text.chat", function () {
					var player = game.me;
					var str = this.innerHTML;
					if (!player) {
						if (game.connectPlayers) {
							if (game.online) {
								for (var i = 0; i < game.connectPlayers.length; i++) {
									if (game.connectPlayers[i].playerid == game.onlineID) {
										player = game.connectPlayers[i];
										break;
									}
								}
							} else {
								player = game.connectPlayers[0];
							}
						}
					}
					if (!player) return;
					if (game.online) {
						game.send("chat", game.onlineID, str);
					} else {
						player.chat(str);
					}
				});
				
				node.innerHTML =quickVoice[i];
				//if(taici_skill.includes(quickVoice[i])) node.style.color="green";
				list3.appendChild(node);
			}
			uiintro.add(list3);
			document.body.appendChild(uiintro);
			

			// 对话框整体样式
Object.assign(uiintro.style, {
	border: "1px solid #bdc3c7",
	borderRadius: "10px",
	overflow: "hidden",
	boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
  });
  
  // 标题栏样式
  Object.assign(emotionTitle.style, {
	background: "#3498db",
	color: "white",
	padding: "10px",
	borderBottom: "1px solid #2980b9"
  });
  
  // 内容区域样式
  Object.assign(list1.style, {
	borderTop: "none",
	borderBottom: "1px solid #ecf0f1"
  });
  
  // 关闭按钮样式
  Object.assign(close.style, {
    position: "absolute",  // 绝对定位
    top: "10px",          // 距离顶部
    right: "10px",        // 距离右侧
    width: "30px",        // 固定宽度
    height: "30px",       // 固定高度
    lineHeight: "30px",   // 垂直居中
    textAlign: "center",  // 水平居中
    cursor: "pointer",    // 手型指针
    borderRadius: "50%",  // 圆形按钮
    backgroundColor: "#e74c3c", // 红色背景
    color: "white",       // 白色文字
    fontSize: "20px",     // 适当放大×符号
    fontWeight: "bold",   // 加粗
    zIndex: "1000",       // 确保在最上层
    border: "none",       // 无边框
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)" // 轻微阴影
});
// 3. 设置撤回按钮样式
Object.assign(retractBtn.style, {
    position: "absolute",
    top: "10px",
    right: "50px", // 放在关闭按钮左边，留出间距
    width: "30px",
    height: "30px",
    lineHeight: "30px",
    textAlign: "center",
    cursor: "pointer",
    borderRadius: "50%",
    backgroundColor: "#3498db", // 蓝色背景
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
    zIndex: "1000",
    border: "none",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    marginRight: "10px" // 与关闭按钮的间距
});
// 4. 撤回按钮的悬停效果
retractBtn.addEventListener('mouseover', function() {
    this.style.backgroundColor = "#2980b9";
});
retractBtn.addEventListener('mouseout', function() {
    this.style.backgroundColor = "#3498db";
});

// 5. 调整关闭按钮的位置（确保在撤回按钮右边）
close.style.right = "10px"; // 保持关闭按钮在最右边

close.addEventListener('mouseover', function() {
    this.style.backgroundColor = "#c0392b";
});
close.addEventListener('mouseout', function() {
    this.style.backgroundColor = "#e74c3c";
});
//uiintro.style.position = "relative";

// 将关闭按钮添加到对话框（而不是list1）
uiintro.appendChild(retractBtn);
uiintro.appendChild(close);

			//return uiintro
			ui.window.appendChild(uiintro);
		});
		ui.biaoqingao.innerHTML="表情";
		////////////////////////聊天框
		ui.specker = ui.create.div(".ydinput",ui.window);
		ui.specker.style.display = "flex";
		ui.specker.style.alignItems = "center";
		ui.specker.style.gap = "8px";
		
		let input = document.createElement("input");
		input.style.textAlign = "center";
		input.style.border = "solid 2px #294510";
		input.style.borderRadius = "6px";
		input.style.fontWeight = "bold";
		input.style.fontSize = "21px";
		input.style.width="182px";
		input.placeholder = "打字发消息";
		input.onkeydown=function(e){
			e.stopPropagation();
			if(e.keyCode == 13 &&input.value){
				if (game.online) {
					game.send("chat", game.onlineID, input.value);
					
				} else {
					game.me.chat(input.value);
				}
				this.value='';
			}
		};
		input.onkeypress=input.onkeydown;
		
	    ui.specker.appendChild(input);	
		
	    ui.sendbtn=ui.create.div(".diysendbtn","发送",ui.window,function(){
	        if(input.value){
				if (game.online) {
					game.send("chat", game.onlineID, input.value);
					
				} else {
					game.me.chat(input.value);
				}
				input.value='';
			}
			
		});
		////////////////////////////////////////////////////////打字聊天框



	},
	//管理面板
    kick(){
		
		if(!game.me) return;
		var dialog=ui.create.dialog("hidden");
		dialog.listen(function (e) {
			e.stopPropagation();
		});

		const t = game.connectPlayers || game.players;
		for(var i of t){
			if(i==game.me) continue;
			if(true){
				var ikun=i.avatar || i.nickname;
				var div=ui.create.div(".text.center",get.translation(i));
				div.style.position = "relative";
				div.playerid=i.playerid;

				/*if(game.online){
					dialog.add(div);
					return dialog;
					//自己不是房主后面就没必要了；
				}*/

				//是真人的话 添加 拉黑
				if(ikun){
					



					var banBlacklist = lib.config.banBlacklist === undefined ? [] : lib.config.banBlacklist;

					var str="拉黑";
					if(i.ws)banBlacklist.includes(i.ws.onlineKey)?"取消拉黑":"拉黑";
					var ban = ui.create.div('.menu', str,function(){
						var id=this.parentNode.playerid;
						var target=t.filter(i=>i.playerid==id)[0];
						var onlinekey=target.ws.onlineKey;
						var banBlacklist = lib.config.banBlacklist === undefined ? [] : lib.config.banBlacklist;
						if(!banBlacklist.includes(onlinekey)){
							banBlacklist.push(onlinekey);
							game.saveConfig("banBlacklist", banBlacklist);
							this.innerHTML="取消拉黑";
						}
						else{
							banBlacklist.remove(onlinekey);
							game.saveConfig("banBlacklist", banBlacklist);
							this.innerHTML="拉黑";
						}

					});
					ban.style.position = "absolute";
					ban.style.left = "2px";
					ban.style.cursor = "pointer";
					div.appendChild(ban);
				}
				
				


				




				dialog.add(div);


				
			}


		}

		



		return dialog;
		
		
	},
    cardRoundTime() {
		var node = ui.create.div(".cardRoundNumber", ui.window);
		lib.setPopped(node, this.paidui);
		node.node = {
			cardPileNumber: ui.create.div(".cardPileNumber", node),
			roundNumber: ui.create.div(".roundNumber", node),
			time: ui.create.div(".time", node),
			//first:ui.create.div(".time2",node),
		};
		
		node.updateRoundCard = function () {
			if (!_status.gameStarted) return;
			if (!game.me) return;

			var cardNumber = game.online?_status.cardPileNum || 0:ui.cardPile.childNodes.length || 0;
			var roundNumber = game.roundNumber || 0;
			this.node.roundNumber.innerHTML = "<span>第" + game.roundNumber + "轮</span>";
			this.setNumberAnimation(cardNumber);
			this.show();
			game.addVideo("updateCardRoundTime", null, {
				cardNumber: cardNumber,
				roundNumber: roundNumber,
			});
		};


		
		node.setNumberAnimation = function (num, step) {
			if (!_status.gameStarted) return;
			if (!game.me) return;
			var item = this.node.cardPileNumber;
			clearTimeout(item.interval);
			if (!item._num) {
				item.innerHTML = "<span>" + num + "</span>";
				item._num = num;
			} else {
				if (item._num !== num) {
					if (!step) step = 500 / Math.abs(item._num - num);
					if (item._num > num) item._num--;
					else item._num++;
					item.innerHTML = "<span>" + item._num + "</span>";
					if (item._num !== num) {
						item.interval = setTimeout(function () {
							node.setNumberAnimation(num, step);
							//this.parentNode.first.innerHTML=ui.cardPile.childNodes[0].name;
						}, step);
					}
				}
			}
		};

		ui.time4 = node.node.time;
		ui.time4.starttime = get.utc();
		ui.time4.interval = setInterval(function () {
			const elementsToToggle = [
				ui.cardRoundTime,
				ui.handcardNumber,
				ui.specker,
				ui.cailanzi,
				ui.biaoqingao,
				ui.sendbtn
			];
			const shouldHide = !_status.gameStarted || !game.me;
			elementsToToggle.forEach(element => {
    			shouldHide ? element.hide() : element.show();
			});
			//if(!shouldHide) return;
			/*隐藏 约战 扩展列表 重新调整 创建房间 和 在线 的位置*/
			if(ui.rooms){
				const hidel=lib.config["extension_自写功能_hideServerExtensions"];
				if(hidel){
					["extensionListButton","connectEventsCount","connectEvents"].forEach(function(i){
						ui[i].hide();

					});

					["createRoomButton","connectClients","connectClientsCount"].forEach(function(i){
						ui[i].style.right = '-55px';
					});

				}
				else{
					["extensionListButton","connectEventsCount","connectEvents"].forEach(function(i){
						ui[i].show();

					});

					["createRoomButton","connectClients","connectClientsCount"].forEach(function(i){
						ui[i].style.right = '55px';
					});
				}
				
				


			}
			
			
			
			
			
			var num = Math.round((get.utc() - ui.time4.starttime) / 1000);
			if (num >= 3600) {
				var num1 = Math.floor(num / 3600);
				var num2 = Math.floor((num - num1 * 3600) / 60);
				var num3 = num - num1 * 3600 - parseInt(num2) * 60;
				if (num1 < 10) {
					num1 = "0" + num1.toString();
				}
				if (num2 < 10) {
					num2 = "0" + num2.toString();
				}
				if (num3 < 10) {
					num3 = "0" + num3.toString();
				}
				ui.time4.innerHTML = "<span>" + num1 + ":" + num2 + ":" + num3 + "</span>";
			} else {
				var num1 = Math.floor(num / 60);
				var num2 = num - num1 * 60;
				if (num1 < 10) {
					num1 = "0" + num1.toString();
				}
				if (num2 < 10) {
					num2 = "0" + num2.toString();
				}
				ui.time4.innerHTML = "<span>" + num1 + ":" + num2 + "</span>";
			}
		}, 1000);
		game.addVideo("createCardRoundTime");
		return node;
	},
	/*pileTop(){
    	var node = ui.create.div('', ui.window);
    	node.style.cssText = "top:0px;left:100px;width:100px;height:150px;display:flex;justify-content:center;align-items:center;background-color: transparent;z-index:1;";
    	return node;
	},*/
	handcardNumber() {
		if (true) {
			
			var node = ui.create.div(".ydhandcardNumber", ui.window,function(){
				if (!game.me) return;
				var hs = game.me.getCards("h");
				if (!hs.length) return;
				game.addVideo("lose", game.me, [get.cardsInfo(hs), [], [], []]);
				for (var i = 0; i < hs.length; i++) {
					hs[i].goto(ui.special);
				}
				var caorens_sunquan=function(b,a){
					
					var suitAindex=lib.suit.indexOf(a.suit);
					var suitBindex=lib.suit.indexOf(b.suit);
					
					if(game.me.hasSkill("dclingxi")||game.me.hasSkill("tongli")){
						
						if(suitAindex!=suitBindex){
							return suitAindex-suitBindex;
						}
						else if(a.name!=b.name) return lib.sort.card(a.name,b.name);
						else return a.number - b.number;
					}
					if(a.type!=b.type) return lib.types.indexOf(a)-lib.types.indexOf(b);
					else if(a.name!=b.name) return lib.sort.card(a.name,b.name);
					else if(suitAindex!=suitBindex) return suitAindex-suitBindex;
					else return a.number - b.number;

				}
				if (game.me.hasSkillTag("sortCardByNum")) {
					var getn = function (card) {
						var num = get.number(card, game.me);
						if (num < 3) return 13 + num;
						return num;
					};
					hs.sort((a, b) => getn(b) - getn(a));
				}
				else{
					/*hs.sort(function (b, a) {
						if (a.name != b.name) return lib.sort.card(a.name, b.name);
						else if (a.suit != b.suit) return lib.suit.indexOf(a) - lib.suit.indexOf(b);
						else return a.number - b.number;
					});*/
					if(game.me.hasSkill("olziruo")){//蒋琬

						var canuse=[],
						cannotuse=[];
						for(var i of hs){
							if(lib.filter.filterCard(i,game.me,_status.event)&&game.me.hasUseTarget(i)) canuse.push(i);
							else cannotuse.push(i);
						}
						canuse.sort((a, b) => get.useful(b, game.me) - get.useful(a, game.me));
						hs=[...canuse,...cannotuse];
                    	if (!game.me.storage.olziruo) hs.reverse();


					}
					else hs.sort(caorens_sunquan);

				}
					
				game.me.directgain(hs, false);
			}).hide();
			node.node = {
				cardPicture: ui.create.div(".cardPicture", node),
				cardNumber: ui.create.div(".cardNumber", node),
			};
			
		}
		//结束
		node.updateCardnumber = function () {
			if (!_status.gameStarted) return;
			if (!game.me) return;
			
			var cardNumber2 = game.me.countCards("h") || 0;
			var cardNumber = game.me.getHandcardLimit() || 0;
			var numbercolor = "white";
			if (cardNumber2 > cardNumber) numbercolor = "red";
			if (cardNumber == Infinity) cardNumber = "∞";
			this.node.cardNumber.innerHTML = "<span>" + "<font color=" + numbercolor + " > " + cardNumber2 + "</font>" + '<sp style="font-size:20px; font-family:yuanli; color:#FFFCF5;">' + " / " + "</sp>" + cardNumber + "</span>"; /*手牌数参数*/
			//      this.setNumberAnimation(cardNumber);
			this.show();
			game.addVideo("updateCardnumber", null, {
				cardNumber: cardNumber,
			});
			var handcards=game.me.getCards('h')||0;
			if(handcards){
				var str='';
				var starsujun=game.me.hasSkill("starsujun")||false;//星曹仁
				var junkquandao=game.me.hasSkill("junkquandao")||false;//神孙权
				var lingxi=game.me.hasSkill("dclingxi")||false;//曹宪
				var tongli=game.me.hasSkill("tongli")||false;//张璇

				var bingji=game.me.hasSkill("dcbingji")||false;//赵俨

				var yuanyu=game.me.hasSkill("yuanyu")||false;//张媱

				var qinzheng=game.me.hasSkill("qinzheng")||false;//罗通

				
				//显示天书
				/*
				if(game.players.filter(i=>i.hasSkill("olhedao")&&i!=game.me).length>0){
					for(var i in game.me.getNext().storage){
						if(i.startsWith("olhedao_")){
							//if(get.info(i)?.nopop) 判断天书是否可见
							let info=lib.translate[i+"_info"];
							if(info!=undefined) str+="【天书】"+info+"<br>";

						}
					}

				}*/
				//屈原 被离骚
				if(_status.event.getParent().name=="dclisao"||String(_status.event?.prompt ?? "").startsWith("请回答《离骚》")){
					if(!_status.event.prompt)return;
					var question=_status.event.prompt.slice(9,-4);
					question.endsWith("兮")?str+=_status.lisao_text.find(i=>i.startsWith(question))?.split("，")[1]:str+=_status.lisao_text.find(i=>i.endsWith(question))?.split("，")[0];

					/*
					if(question.endsWith("兮")){
						
						for(var i of _status.lisao_text){
							if(i.startsWith(question)){
								var answer=i.split("，")[1];
								str+=answer;
							}	
						}
					}
					else{
						for(var i of _status.lisao_text){
							if(i.endsWith(question)){
								var answer=i.split("，")[0];
								str+=answer;
							}
						}
					}*/
					//_status.lisao_text//离骚原文
					
					//prompt.slice(9,-4)  问题
					//问题以  兮 结尾 就是问下一句
					//startsWith
					//endsWith
					
				}

				
				//noname\library\element\content.js   event.visible 可控制选牌是否名牌哦。

				//博弈 他是mes  我是tes  mes==tes他赢  
				//博弈提示
				if(_status.event.getParent().name=="chooseToDuiben"){
					
					if(_status.event.getParent().mes){
						var translationList=_status.event.getParent().translationList||["没有描述","没有描述"];
						var index=_status.event.getParent().mes=="db_def2"?0:1;
						str+="【博弈】选:"+(index==0?" 左 ":"右 ")+translationList[index];
					}
					
				}
				//费药猜类型
				if(_status.event.getParent().name=="zhenfeng"){
					var t=_status.event.getParent().targets[0];//目标
					var card=_status.event.getParent()._trigger.card//他用的牌
					var type = get.type2(card, t);
        			var count = t.countCards("h", card => get.type2(card) == type);
					str+="【镇锋】:"+count;
				}

				//勤政--------------------------------------------
				if(qinzheng){
					var num=game.me.countMark("qinzheng");
					if(num){
						str += "<li>杀/闪：";
						str += num % 3;
						str += "/3<li>桃/酒：";
						str += num % 5;
						str += "/5<li>决斗/无中生有：";
						str += num % 8;
						str += "/8";
					}
				}


				

				if(yuanyu){//张媱------------------------------------------------------------
					var cards = game.me.getExpansions("yuanyu");
					var suits = lib.suit.slice(0);
					for (var i of cards) {
						suits.remove(get.suit(i));
					}
					
					if(suits.length){
						str+="【怨语】无:";
						suits.forEach((i)=>str+=get.translation(i)+" ");
					}
				}
				
				//于吉蛊惑
				var guhuoname=["guhuo_guess","reguhuo_guess,old_guhuo_guess"];
				if(guhuoname.includes(_status.event.getParent().name)){
					str+=_status.event.getParent().fake?"【质疑】":"【不质疑】";
				}
				//【火攻】提示-------------------------------------------------------------
				if(_status.event.getParent().name=="huogong"&&_status.event.getParent().target==game.me){//
					//str+="  【反间】选"+(_status.event.getParent().cardSuit==_status.event.getParent().claimSuit?"选项一":"选项二");
					var me=_status.event.getParent().target,
					he=_status.event.getParent().player;

					const h1=me.getCards("h"),
					h2=he.getCards("h");

					const suits1 = Array.from(
						new Set(h1.map(card => get.suit(card,me)))
  					);

					const suits2 = Array.from(
						new Set(h2.map(card => get.suit(card,he)))
  					);
					const show=suits1.filter(suit=>!suits2.includes(suit));
					if(show.length){
						str+="【火攻】展示:";
						show.forEach((i)=>str+=get.translation(i)+" ");
					}



				}

				//某甘宁奇袭提示
				if(_status.event.getParent().name=="sbqixi"){
					//str+=_status.event.getParent().suits;
					var suits=_status.event.getParent().suits;
					if(suits.length){
						str+="【奇袭】:";
						suits.forEach(i=>str+=get.translation(i)+" ");

					}
					
					
				}

				//_status.event.getParent().cardSuit  //谋周瑜 反间真实花色。----------------------------------------------
				if(_status.event.getParent().name=="sbfanjian_backup"){//谋周瑜反间
					str+="  【反间】选"+(_status.event.getParent().cardSuit==_status.event.getParent().claimSuit?"选项一":"选项二");
				}
				//奇正相生------------------------------------------------------------------
				if(_status.event.getParent().name=="qizhengxiangsheng"){
					str+="  【奇正相生】选"+(_status.event.getParent().qizheng_name=="奇兵"?"杀":"闪");
				}

				//赵俨--------------------------------------------------------------------------------------
				if(bingji){
					var suits=game.me.getStorage("dcbingji_used");
					if(suits.length){
						str+="秉纪 ";
						for(var i of suits){
							str+= get.translation(i)+" ";
						}
					}
				}
				//张璇---------------------------------------------------------------------------------------
				if(tongli){
					var suitnum=0;
					for(var i of lib.suit){
						var len=handcards.filter(card=>get.suit(card)==i).length;
						
						if(len){
							str+=get.translation(i)+":"+len+" ";
							suitnum++;
						}
					}
					var num = game.me.getHistory("useCard").length;
					str+="   用牌"+num+"次   "+suitnum+"花色";
					
					
				}
				//曹宪-------------------------------------------------------------------------------------------
				if(lingxi){
					var cards = game.me.getExpansions("dclingxi")||[];
					if(cards.length){
						for(var i of lib.suit){
							var len=cards.filter(card=>get.suit(card)==i).length;
							if(len) str+=get.translation(i)+":"+len+" ";
						}
					}
				}
				////神孙权 星曹仁--------------------------------------------------------------------------------------
				if(starsujun||junkquandao){
					var basic=0;
					var noBasic=0;
					var shacard=0;
					var trickcard=0;

					for(var i of handcards){
						if(get.type(i)=='basic') basic++;
						else noBasic++;
						if(i.name=='sha') shacard++;
						if(get.type(i, null, false) == "trick") trickcard++;
					}
					if(starsujun) str+="基本:非基= "+basic+":"+noBasic+"  ";
					if(junkquandao) str+= "杀:普锦= "+shacard+":"+trickcard+"  ";
				}
				

				
				//显示牌堆顶的牌

			}
		};
		node.node.cardNumber.interval = setInterval(function () {
			ui.handcardNumber.updateCardnumber();
			ui.cardRoundTime.updateRoundCard();
		}, 1000);
		
		game.addVideo("createhandcardNumber");
		return node;
	},
	//黑名单红能；

	cailanzi() {
		var cailan=this;
		if (window.chatBg != undefined && window.chatBg.show) {
			//控制面板打开，首次调用此函数时打开面板，再次调用时关闭
			window.chatBg.hide();
			//关闭砸表情
			if (window.tuoxie.thrownn) window.tuoxie.thrownn = false;
			if (window.meijiu.thrownn) window.meijiu.thrownn = false;
			window.chatBg.show = false;
			return;
		}
		var dialogChat = {};
		//聊天框整体
		window.chatBg = ui.create.div("hidden");
		window.chatBg.classList.add("popped");
		window.chatBg.classList.add("static");
		window.chatBg.show = true;
		window.chatBg.style.cssText = "display: block;--w: 420px;--h: calc(var(--w) * 430/911);width: var(--w);height: var(--h);position: fixed;right:-200px;bottom:5%;opacity: 1;background-size: 100% 100%;background-color: transparent;z-index:99;";
		window.chatBg.style.transition = "all 1.5s";
		
		ui.window.appendChild(window.chatBg);
	
		var clickFK = function (div) {
			div.style.transition = "opacity 0.5s";
			div.addEventListener(lib.config.touchscreen ? "touchstart" : "mousedown", function () {
				this.style.transform = "scale(0.95)";
			});
			div.addEventListener(lib.config.touchscreen ? "touchend" : "mouseup", function () {
				this.style.transform = "";
			});
			div.onmouseout = function () {
				this.style.transform = "";
			};
		};
		
		
		game.open_meijiu = function () {
			//打开美酒函数
			//这里
			var list = game.players;
			for (let i = 0; i < game.players.length; i++) {
				list[i].onclick = function () {
					//var target = this;
					if (window.meijiu.thrownn == true) {
						
							for (let i = 0; i < 10; i++) {
								setTimeout(() => {
									if (i <= 8) game.online?game.send("throwEmotion",this,'flower'):game.me.throwEmotion(this,"flower");
									else game.online?game.send("throwEmotion",this,'wine'):game.me.throwEmotion(this,"wine");
								}, 100 * i);
							}
						
						cailan.cailanzi();
						
					}
					
				};
			}
	
		};
		window.meijiu = ui.create.div("hidden", "", game.open_meijiu);
		window.meijiu.style.cssText = "display: block;--w: 63px;--h: calc(var(--w) * 50/50);width: var(--w);height: var(--h);left:-155px;bottom:173px;transition:none;background-size:100% 100%";
	
		window.meijiu.setBackgroundImage("extension/自写功能/flower1.png");
		
		//这里
		window.meijiu.onclick = function () {
			window.meijiu.thrownn = true;
		};
		window.chatBg.appendChild(window.meijiu);
		lib.setScroll(window.meijiu);
		clickFK(window.meijiu);
		
		//-----3---拖鞋-------//
		game.open_tuoxie = function () {
			//打开拖鞋函数
			//这里
			var list = game.players;
			var num = 10;
			for (let i = 0; i < game.players.length; i++) {
				list[i].onclick = function () {
					//var target = this;
					if (window.tuoxie.thrownn == true) {
						
							for (let i = 0; i < 11; i++) {
								setTimeout(() => {
									if (i <= 6) game.online?game.send("throwEmotion",this,'shoe'):game.me.throwEmotion(this,"shoe");
									else game.online?game.send("throwEmotion",this,'egg'):game.me.throwEmotion(this,"egg");
								}, 100 * i);
							}
						
						//window.tuoxie.thrownn =false;
						cailan.cailanzi();
					}
				};
			}
		};
		window.tuoxie = ui.create.div("hidden", "", game.open_tuoxie);
		window.tuoxie.style.cssText = "display: block;--w: 63px;--h: calc(var(--w) * 50/50);width: var(--w);height: var(--h);left:-230px;bottom:173px;transition:none;background-size:100% 100%";
	
		window.tuoxie.setBackgroundImage("extension/自写功能/egg1.png");
		//这里
		window.tuoxie.onclick = function () {
			window.tuoxie.thrownn = true;
		};
	
		window.chatBg.appendChild(window.tuoxie);
		lib.setScroll(window.tuoxie);
		clickFK(window.tuoxie);
	},
	getCardsMaxSuit(cards, player) {
		const map = new Map();
		let max = -Infinity;
	
		for (const card of cards) {
			const suit = get.suit(card, player); // 确保 get 已定义
			if (!map.has(suit)) {
				map.set(suit, 0);
			}
			map.set(suit, map.get(suit) + 1);
		}
	
		// 找出最大值
		for (const [_, count] of map.entries()) {
			if (count > max) {
				max = count;
			}
		}
	
		const suits = [];
		for (const [suit, count] of map.entries()) {
			if (count === max) {
				suits.push(suit);
			}
		}
	
		return suits;
	},
	getCardsMaxSuit(cards,player){
		var suits = [],
		map = {},
		max = -Infinity;
		for (var card of cards) {
			var suit = get.suit(card, player);
			if (!map[suit]) map[suit] = 0;
			map[suit]++;
			if (map[suit] > max) max = map[suit];
		}
		for (var i in map) {
			if (map[i] == max) suits.push(i);
		}
		return suits;
	},
	getCardsSuit(cards,player){
		return Array.from(
			new Set(cards.map(card => get.suit(card,player)))
		);
		
	},



showSeat() {
	lib.hooks.gameStart = new NonameAssembly('gameStart')
	function updatePlayerSeat(player) {
		if (!player) return;
		const seat = player.getSeatNum();
		if (seat === 0) return;
		player.seat = seat;
		game.broadcastAll(function (player, seat) {
			if (!player.node.swSeat) {
				player.node.swSeat = ui.create.div('.swSeat', player);
			}
			player.node.swSeat.innerHTML = get.cnNumber(seat, true);
		}, player, seat);
	}
	lib.hooks.checkUpdate.push("showSeat", function(player) {
		const seat = player.getSeatNum();
		if (seat === 0) return;
		player.seat = seat;
		if (!player.node.swSeat) {
			player.node.swSeat = ui.create.div('.swSeat', player);
		}
		player.node.swSeat.innerHTML = get.cnNumber(seat, true);
	});
	lib.hooks.gameStart.push(function () {
		game.players.forEach(updatePlayerSeat);
	});
	const _oldgameSwapSeat = game.swapSeat
	game.swapSeat = function(player1, player2, prompt, behind, noanimate) {
		_oldgameSwapSeat.apply(this, arguments);
		game.broadcastAll((player1, player2) => {
			player1.seat = player1.getSeatNum();
			if (player1.node.seat) player1.node.seat.innerHTML = get.cnNumber(player1.seat, true);
			player2.seat = player2.getSeatNum();
			if (player2.node.seat) player2.node.seat.innerHTML = get.cnNumber(player2.seat, true);
		}, player1, player2)
	}
	const _oldgameSetSeatNum = game.setSeatNum
	game.setSeatNum = function() {
		_oldgameSetSeatNum.apply(this, arguments);
		updatePlayerSeat(this);
	}
},


//点将卡
  dianjiangka() {
    var filter, str, noclick, thisiscard, seperate, expandall, onlypack, heightset, characterx;
    for (var i = 0; i < arguments.length; i++) {
      if (arguments[i] === "thisiscard") {
        thisiscard = true;
      } else if (arguments[i] === "expandall") {
        expandall = true;
      } else if (arguments[i] === "heightset") {
        heightset = true;
      } else if (arguments[i] == "characterx") {
        characterx = true;
      } else if (typeof arguments[i] == "string" && arguments[i].startsWith("onlypack:")) {
        onlypack = arguments[i].slice(9);
      } else if (typeof arguments[i] == "object" && typeof arguments[i].seperate == "function") {
        seperate = arguments[i].seperate;
      } else if (typeof arguments[i] === "string") {
        str = arguments[i];
      } else if (typeof arguments[i] === "function") {
        filter = arguments[i];
      } else if (typeof arguments[i] == "boolean") {
        noclick = arguments[i];
      }
    }
    var list = [];
    const groups = [];
    
    var dialog;
    var node = ui.create.div(".caption.pointerspan");
    if (get.is.phoneLayout()) {
      node.style.fontSize = "30px";
    }
    var namecapt = [];
    var getCapt = function(str2) {
      var capt;
      if (str2.indexOf("_") == -1) {
        capt = str2[0];
      } else {
        capt = str2[str2.lastIndexOf("_") + 1];
      }
      capt = capt.toLowerCase();
      if (!/[a-z]/i.test(capt)) {
        capt = "自定义";
      }
      return capt;
    };
    if (thisiscard) {
      for (var i in lib.card) {
        if (!lib.translate[i + "_info"]) {
          continue;
        }
        if (filter && filter(i)) {
          continue;
        }
        list.push(["", get.translation(lib.card[i].type), i]);
        if (namecapt.indexOf(getCapt(i)) == -1) {
          namecapt.push(getCapt(i));
        }
      }
    } else {
      for (var i in lib.character) {
        if (lib.character[i][4]) {
          if (lib.character[i].isMinskin) {
            continue;
          }
          if (lib.character[i].isBoss || lib.character[i].isHiddenBoss) {
            if (lib.config.mode == "boss") {
              continue;
            }
            if (!lib.character[i].isBossAllowed) {
              continue;
            }
          }
          if (lib.character[i].isHiddenInStoneMode) {
            continue;
          }
          if (lib.character[i].isUnseen) {
            continue;
          }
        }
        if (lib.config.banned.includes(i)) {
          continue;
        }
        if (lib.characterFilter[i] && !lib.characterFilter[i](get.mode())) {
          continue;
        }
        if (filter && filter(i)) {
          continue;
        }
        list.push(i);
        if (get.is.double(i)) {
          groups.add("double");
        } else {
          groups.add(lib.character[i][1]);
        }
        if (namecapt.indexOf(getCapt(i)) == -1) {
          namecapt.push(getCapt(i));
        }
      }
    }
    namecapt.sort(function(a, b) {
      return a > b ? 1 : -1;
    });
    groups.sort(lib.sort.group);
    if (!thisiscard) {
      namecapt.remove("自定义");
      namecapt.push("newline");
      for (var i in lib.characterDialogGroup) {
        namecapt.push(i);
      }
    }
    var newlined = false;
    var newlined2;
    var packsource;
    var clickCapt = function(e) {
      
      if (_status.dragged) {
        return;
      }
      
      if (dialog.currentcapt2 == "最近" && dialog.currentcaptnode2 != this && !dialog.currentcaptnode2.inited) {
        dialog.currentcapt2 = null;
        dialog.currentcaptnode2.classList.remove("thundertext");
        dialog.currentcaptnode2.inited = true;
        dialog.currentcaptnode2 = null;
      }
      if (this.alphabet) {
        if (this.classList.contains("thundertext")) {
          dialog.currentcapt = null;
          dialog.currentcaptnode = null;
          this.classList.remove("thundertext");
          if (this.touchlink) {
            this.touchlink.classList.remove("active");
          }
          for (var i2 = 0; i2 < dialog.buttons.length; i2++) {
            restoreState(dialog.buttons[i2]);
            if (dialog.currentgroup && dialog.buttons[i2].group != dialog.currentgroup) {
              dialog.buttons[i2].classList.add("nodisplay");
            } else if (dialog.currentcapt2 && dialog.buttons[i2].capt != dialog.getCurrentCapt(dialog.buttons[i2].link, dialog.buttons[i2].capt, true)) {
              dialog.buttons[i2].classList.add("nodisplay");
            } else {
              dialog.buttons[i2].classList.remove("nodisplay");
            }
          }
        } else {
          if (dialog.currentcaptnode) {
            dialog.currentcaptnode.classList.remove("thundertext");
            if (dialog.currentcaptnode.touchlink) {
              dialog.currentcaptnode.touchlink.classList.remove("active");
            }
          }
          dialog.currentcapt = this.link;
          dialog.currentcaptnode = this;
          this.classList.add("thundertext");
          if (this.touchlink) {
            this.touchlink.classList.add("active");
          }
          for (var i2 = 0; i2 < dialog.buttons.length; i2++) {
            restoreState(dialog.buttons[i2]);
            if (dialog.buttons[i2].capt != dialog.getCurrentCapt(dialog.buttons[i2].link, dialog.buttons[i2].capt)) {
              dialog.buttons[i2].classList.add("nodisplay");
            } else if (dialog.currentcapt2 && dialog.buttons[i2].capt != dialog.getCurrentCapt(dialog.buttons[i2].link, dialog.buttons[i2].capt, true)) {
              dialog.buttons[i2].classList.add("nodisplay");
            } else if (dialog.currentgroup && dialog.buttons[i2].group != dialog.currentgroup) {
              dialog.buttons[i2].classList.add("nodisplay");
            } else {
              dialog.buttons[i2].classList.remove("nodisplay");
            }
          }
        }
      } else {
        if (newlined2) {
          newlined2.style.display = "none";
          if (!packsource.onlypack) {
            packsource.classList.remove("thundertext");
            if (!get.is.phoneLayout() || !lib.config.filternode_button) {
              packsource.innerHTML = "武将包";
            }
          }
        }
        if (this.classList.contains("thundertext")) {
          dialog.currentcapt2 = null;
          dialog.currentcaptnode2 = null;
          this.classList.remove("thundertext");
          if (this.touchlink) {
            this.touchlink.classList.remove("active");
          }
          for (var i2 = 0; i2 < dialog.buttons.length; i2++) {
            restoreState(dialog.buttons[i2]);
            if (dialog.currentgroup && dialog.buttons[i2].group != dialog.currentgroup) {
              dialog.buttons[i2].classList.add("nodisplay");
            } else if (dialog.currentcapt && dialog.buttons[i2].capt != dialog.getCurrentCapt(dialog.buttons[i2].link, dialog.buttons[i2].capt)) {
              dialog.buttons[i2].classList.add("nodisplay");
            } else {
              dialog.buttons[i2].classList.remove("nodisplay");
            }
          }
        } else {
          if (dialog.currentcaptnode2) {
            dialog.currentcaptnode2.classList.remove("thundertext");
            if (dialog.currentcaptnode2.touchlink) {
              dialog.currentcaptnode2.touchlink.classList.remove("active");
            }
          }
          dialog.currentcapt2 = this.link;
          dialog.currentcaptnode2 = this;
          this.classList.add("thundertext");
          if (this.touchlink) {
            this.touchlink.classList.add("active");
          } else if (this.parentNode == newlined2) {
            packsource.innerHTML = this.innerHTML;
            packsource.classList.add("thundertext");
          }
          for (var i2 = 0; i2 < dialog.buttons.length; i2++) {
            restoreState(dialog.buttons[i2]);
            if (dialog.currentcapt && dialog.buttons[i2].capt != dialog.getCurrentCapt(dialog.buttons[i2].link, dialog.buttons[i2].capt)) {
              dialog.buttons[i2].classList.add("nodisplay");
            } else if (dialog.buttons[i2].capt != dialog.getCurrentCapt(dialog.buttons[i2].link, dialog.buttons[i2].capt, true)) {
              dialog.buttons[i2].classList.add("nodisplay");
            } else if (dialog.currentgroup && dialog.buttons[i2].group != dialog.currentgroup) {
              dialog.buttons[i2].classList.add("nodisplay");
            } else {
              if (dialog.buttons[i2].activate) {
                dialog.buttons[i2].activate();
              }
              dialog.buttons[i2].classList.remove("nodisplay");
            }
          }
        }
      }
      if (dialog.seperate) {
        for (var i2 = 0; i2 < dialog.seperate.length; i2++) {
          if (!dialog.seperate[i2].nextSibling.querySelector(".button:not(.nodisplay)")) {
            dialog.seperate[i2].style.display = "none";
            dialog.seperate[i2].nextSibling.style.display = "none";
          } else {
            dialog.seperate[i2].style.display = "";
            dialog.seperate[i2].nextSibling.style.display = "";
          }
        }
      }
      if (filternode) {
        if (filternode.querySelector(".active")) {
          packsource.classList.add("thundertext");
        } else {
          packsource.classList.remove("thundertext");
        }
      }
      updatePagination();
      if (e) {
        e.stopPropagation();
      }
    };
    
    
    
    for (i = 0; i < namecapt.length; i++) {
      if (namecapt[i] == "newline") {
        newlined = document.createElement("div");
        newlined.style.marginTop = "5px";
        newlined.style.display = "block";
        if (get.is.phoneLayout()) {
          newlined.style.fontSize = "32px";
        } else {
          newlined.style.fontSize = "22px";
        }
        newlined.style.textAlign = "center";
        node.appendChild(newlined);
      } else if (newlined) {
        var span = ui.create.div(".tdnode.pointerdiv.shadowed.reduce_radius");
        span.style.margin = "3px";
        span.style.width = "auto";
        span.innerHTML = " " + namecapt[i].toUpperCase() + " ";
        span.link = namecapt[i];
        span.addEventListener(lib.config.touchscreen ? "touchend" : "click", clickCapt);
        newlined.appendChild(span);
        node[namecapt[i]] = span;
        if (namecapt[i] == "收藏") {
          span._nature = "fire";
        } else {
          span._nature = "wood";
        }
      } else {
        var span = document.createElement("span");
        span.innerHTML = " " + namecapt[i].toUpperCase() + " ";
        span.link = namecapt[i];
        span.alphabet = true;
        span.addEventListener(lib.config.touchscreen ? "touchend" : "click", clickCapt);
        node.appendChild(span);
      }
    }
    if (!thisiscard) {
      var natures = ["water", "soil", "wood", "metal"];
      var span = document.createElement("span");
      newlined.appendChild(span);
      span.style.margin = "8px";
      var clickGroup = function() {
        if (_status.dragged) {
          return;
        }
        if (dialog.currentcapt2 == "最近" && dialog.currentcaptnode2 != this && !dialog.currentcaptnode2.inited) {
          dialog.currentcapt2 = null;
          dialog.currentcaptnode2.classList.remove("thundertext");
          dialog.currentcaptnode2.inited = true;
          dialog.currentcaptnode2 = null;
        }
        var node2 = this, link2 = this.link;
        if (node2.classList.contains("thundertext")) {
          dialog.currentgroup = null;
          dialog.currentgroupnode = null;
          node2.classList.remove("thundertext");
          for (var i2 = 0; i2 < dialog.buttons.length; i2++) {
            restoreState(dialog.buttons[i2]);
            if (dialog.currentcapt && dialog.buttons[i2].capt != dialog.getCurrentCapt(dialog.buttons[i2].link, dialog.buttons[i2].capt)) {
              dialog.buttons[i2].classList.add("nodisplay");
            } else if (dialog.currentcapt2 && dialog.buttons[i2].capt != dialog.getCurrentCapt(dialog.buttons[i2].link, dialog.buttons[i2].capt, true)) {
              dialog.buttons[i2].classList.add("nodisplay");
            } else {
              dialog.buttons[i2].classList.remove("nodisplay");
            }
          }
        } else {
          if (dialog.currentgroupnode) {
            dialog.currentgroupnode.classList.remove("thundertext");
          }
          dialog.currentgroup = link2;
          dialog.currentgroupnode = node2;
          node2.classList.add("thundertext");
          for (var i2 = 0; i2 < dialog.buttons.length; i2++) {
            restoreState(dialog.buttons[i2]);
            if (dialog.currentcapt && dialog.buttons[i2].capt != dialog.getCurrentCapt(dialog.buttons[i2].link, dialog.buttons[i2].capt)) {
              dialog.buttons[i2].classList.add("nodisplay");
            } else if (dialog.currentcapt2 && dialog.buttons[i2].capt != dialog.getCurrentCapt(dialog.buttons[i2].link, dialog.buttons[i2].capt, true)) {
              dialog.buttons[i2].classList.add("nodisplay");
            } else if (dialog.currentgroup == "double") {
              if (dialog.buttons[i2]._changeGroup) {
                dialog.buttons[i2].classList.remove("nodisplay");
              } else {
                dialog.buttons[i2].classList.add("nodisplay");
              }
            } else if (dialog.currentgroup == "ye") {
              if (dialog.buttons[i2].group == "ye") {
                dialog.buttons[i2].classList.remove("nodisplay");
              } else {
                dialog.buttons[i2].classList.add("nodisplay");
              }
            } else {
              if (dialog.buttons[i2]._changeGroup || dialog.buttons[i2].group != dialog.currentgroup) {
                dialog.buttons[i2].classList.add("nodisplay");
              } else {
                dialog.buttons[i2].classList.remove("nodisplay");
              }
            }
          }
        }
        updatePagination();
      };
      for (var i = 0; i < groups.length; i++) {
        var span = ui.create.div(".tdnode.pointerdiv.shadowed.reduce_radius.reduce_margin");
        span.style.margin = "3px";
        newlined.appendChild(span);
        span.innerHTML = get.translation(groups[i]);
        span.link = groups[i];
        span._nature = natures[i];
        span.addEventListener(lib.config.touchscreen ? "touchend" : "click", clickGroup);
      }
      var span = document.createElement("span");
      newlined.appendChild(span);
      span.style.margin = "8px";
      packsource = ui.create.div(".tdnode.pointerdiv.shadowed.reduce_radius.reduce_margin");
      packsource.style.margin = "3px";
      newlined.appendChild(packsource);
      var filternode = null;
      var clickCaptNode = function(e) {
        delete _status.filterCharacter;
        ui.window.classList.remove("shortcutpaused");
        filternode.delete();
        filternode.classList.remove("shown");
        clickCapt.call(this.link, e);
      };
      if (get.is.phoneLayout() && lib.config.filternode_button) {
        newlined.style.marginTop = "";
        packsource.innerHTML = "筛选";
        filternode = ui.create.div(".popup-container.filter-character.modenopause");
        ui.create.div(filternode);
        filternode.listen(function(e) {
          if (this.classList.contains("removing")) {
            return;
          }
          delete _status.filterCharacter;
          ui.window.classList.remove("shortcutpaused");
          this.delete();
          this.classList.remove("shown");
          e.stopPropagation();
        });
        for (var i = 0; i < node.childElementCount; i++) {
          if (node.childNodes[i].tagName.toLowerCase() == "span") {
            node.childNodes[i].style.display = "none";
            node.childNodes[i].touchlink = ui.create.div(filternode.firstChild, clickCaptNode, ".menubutton.large.capt", node.childNodes[i].innerHTML);
            node.childNodes[i].touchlink.link = node.childNodes[i];
          }
        }
        ui.create.node("br", filternode.firstChild);
      } else {
        if (onlypack) {
          packsource.onlypack = true;
          packsource.innerHTML = get.translation(onlypack + "_character_config");
          packsource.style.display = "none";
          packsource.previousSibling.style.display = "none";
        } else {
          packsource.innerHTML = "武将包";
        }
      }
      newlined2 = document.createElement("div");
      newlined2.style.marginTop = "5px";
      newlined2.style.display = "none";
      newlined2.style.fontFamily = "xinwei";
      newlined2.classList.add("pointernode");
      if (get.is.phoneLayout()) {
        newlined2.style.fontSize = "32px";
      } else {
        newlined2.style.fontSize = "22px";
      }
      newlined2.style.textAlign = "center";
      node.appendChild(newlined2);
      packsource.addEventListener(lib.config.touchscreen ? "touchend" : "click", function() {
        if (packsource.onlypack) {
          return;
        }
        if (_status.dragged) {
          return;
        }
        if (get.is.phoneLayout() && lib.config.filternode_button && filternode) {
          _status.filterCharacter = true;
          ui.window.classList.add("shortcutpaused");
          ui.window.appendChild(filternode);
          ui.refresh(filternode);
          filternode.classList.add("shown");
          var dh = filternode.offsetHeight - filternode.firstChild.offsetHeight;
          if (dh > 0) {
            filternode.firstChild.style.top = dh / 2 + "px";
          } else {
            filternode.firstChild.style.top = "";
          }
        } else {
          if (newlined2.style.display == "none") {
            newlined2.style.display = "block";
          } else {
            newlined2.style.display = "none";
          }
        }
      });
      var packlist = [];
      for (var i = 0; i < lib.config.all.characters.length; i++) {
        if (!lib.config.characters.includes(lib.config.all.characters[i])) {
          continue;
        }
        packlist.add(lib.config.all.characters[i]);
      }
      for (var i = 0; i < lib.config.characters.length; i++) {
        if (lib.config.all.characters.includes(lib.config.characters[i])) {
          continue;
        }
        if (!lib.characterPack[lib.config.characters[i]]) {
          continue;
        }
        if (!lib.translate[lib.config.characters[i] + "_character_config"]) {
          continue;
        }
        packlist.add(lib.config.characters[i]);
      }
      Object.keys(lib.characterPack).filter((key) => {
        if (key.indexOf("mode_extension") != 0) {
          return false;
        }
        const extName = key.slice(15);
        return lib.config[`extension_${extName}_characters_enable`] === true;
      }).forEach((key) => packlist.add(key));
      for (var i = 0; i < packlist.length; i++) {
        var span = document.createElement("div");
        span.style.display = "inline-block";
        span.style.width = "auto";
        span.style.margin = "5px";
        if (get.is.phoneLayout()) {
          span.style.fontSize = "32px";
        } else {
          span.style.fontSize = "22px";
        }
        span.innerHTML = lib.translate[packlist[i] + "_character_config"];
        span.link = packlist[i];
        span.addEventListener(lib.config.touchscreen ? "touchend" : "click", clickCapt);
        newlined2.appendChild(span);
        if (filternode && !onlypack) {
          span.touchlink = ui.create.div(filternode.firstChild, clickCaptNode, ".menubutton.large", span.innerHTML);
          span.touchlink.link = span;
        }
      }
    }
    var groupSort;
    if (thisiscard) {
      groupSort = function(name) {
        var type = lib.card[name[2]].type;
        if (lib.cardType[type]) {
          return lib.cardType[type];
        }
        switch (type) {
          case "basic":
            return 0;
          case "chess":
            return 1.5;
          case "trick":
            return 2;
          case "delay":
            return 3;
          case "equip":
            return 4;
          case "zhenfa":
            return 5;
          default:
            return 6;
        }
      };
      list.sort(function(a, b) {
        var del = groupSort(a) - groupSort(b);
        if (del != 0) {
          return del;
        }
        var aa = a, bb = b;
        if (a.includes("_")) {
          a = a.slice(a.lastIndexOf("_") + 1);
        }
        if (b.includes("_")) {
          b = b.slice(b.lastIndexOf("_") + 1);
        }
        if (a != b) {
          return a > b ? 1 : -1;
        }
        return aa > bb ? 1 : -1;
      });
    } else {
      list.sort(lib.sort.character);
    }
    dialog = ui.create.dialog("hidden");
    dialog.classList.add("noupdate");
    dialog.classList.add("scroll1");
    dialog.classList.add("scroll2");
    dialog.classList.add("scroll3");
    dialog.supportsPagination = Boolean(parseInt(lib.config.showMax_character_number));
    dialog.paginationMaxCount.set("character", parseInt(lib.config.showMax_character_number));
    dialog.addEventListener(lib.config.touchscreen ? "touchend" : "mouseup", function() {
      _status.clicked2 = true;
    });
    if (heightset) {
      dialog.style.height = (game.layout == "long2" || game.layout == "nova" ? 380 : 350) + 50 + "px";
      dialog._scrollset = true;
    }
    dialog.getCurrentCapt = function(link2, capt, noalph) {
      var currentcapt = noalph ? this.currentcapt2 : this.currentcapt;
      if (this.seperatelist && noalph) {
        if (this.seperatelist[currentcapt].includes(link2)) {
          return capt;
        }
        return null;
      }
      if (lib.characterDialogGroup[currentcapt]) {
        return lib.characterDialogGroup[currentcapt](link2, capt);
      }
      if (lib.characterPack[currentcapt]) {
        if (lib.characterPack[currentcapt][link2]) {
          return capt;
        }
        return null;
      }
      return this.currentcapt;
    };
    const container = dialog.querySelector(".content-container>.content");
    const Searcher = ui.create.div(".searcher.caption");
    const input = document.createElement("input").css({
      textAlign: "center",
      border: "solid 2px #294510",
      borderRadius: "6px",
      fontWeight: "bold",
      fontSize: "21px"
    });
    const div = ui.create.div(".searcher.find");
    input.placeholder = "支持正则搜索";
    let find = ui.create.button(["find", "搜索"], "tdnodes");
    find.style.display = "inline";
    const updatePagination = () => {
      if (dialog.paginationMaxCount.get("character")) {
        const buttons = dialog.content.querySelector(".buttons");
        const array = dialog.buttons.filter((item) => !item.classList.contains("nodisplay") && item.style.display !== "none");
        const p = dialog.paginationMap.get(buttons);
        if (p) {
          p.state.data = array;
          p.setTotalPageCount(Math.ceil(array.length / dialog.paginationMaxCount.get("character")));
        }
      }
    };
    const restoreState = (btn) => {
      if (btn.style.display == "none") {
        btn.style.display = "";
      }
    };
    const updateFind = () => {
      const { value } = input;
      const reg = new RegExp(value);
      for (let btn of dialog.buttons) {
        if (reg.test(get.translation(btn.link)) || reg.test(get.translation(btn.link + "_ab"))) {
          btn.classList.remove("nodisplay");
        } else {
          btn.classList.add("nodisplay");
        }
      }
      updatePagination();
    };
    find.addEventListener("click", updateFind);
    input.onkeydown = function(e) {
      e.stopPropagation();
      if (e.key == "Enter") {
        updateFind();
      }
    };
    input.onmousedown = function(e) {
      e.stopPropagation();
    };
    Searcher.append(input, find);
    container.prepend(Searcher);
    if (str) {
      dialog.add(str);
    }
    dialog.add(node);
    if (thisiscard) {
      if (seperate) {
        seperate = seperate(list);
        dialog.seperate = [];
        dialog.seperatelist = seperate.list;
        if (dialog.seperatelist) {
          newlined = document.createElement("div");
          newlined.style.marginTop = "5px";
          newlined.style.display = "block";
          newlined.style.fontFamily = "xinwei";
          if (get.is.phoneLayout()) {
            newlined.style.fontSize = "32px";
          } else {
            newlined.style.fontSize = "22px";
          }
          newlined.style.textAlign = "center";
          node.appendChild(newlined);
          for (var i in dialog.seperatelist) {
            var span = document.createElement("span");
            span.style.margin = "3px";
            span.innerHTML = i;
            span.link = i;
            span.seperate = true;
            span.addEventListener(lib.config.touchscreen ? "touchend" : "click", clickCapt);
            newlined.appendChild(span);
          }
        }
        for (var i in seperate) {
          if (i == "list") {
            continue;
          }
          var link = "";
          var linkcontent = seperate[i];
          if (i.includes("_link:")) {
            link = i.slice(i.indexOf("_link:") + 6);
            i = i.slice(0, i.indexOf("_link:"));
          }
          var nodesep = dialog.add(i);
          nodesep.link = link;
          dialog.seperate.push(nodesep);
          dialog.add([linkcontent, "vcard"], noclick);
        }
      } else {
        dialog.add([list, "vcard"], noclick);
      }
    } else {
      if (characterx) {
        
        dialog.add([list, "characterx"], noclick);
      } else {
        dialog.add([list, "character"], noclick);
      }
    }
    dialog.add(ui.create.div(".placeholder"));
    for (i = 0; i < dialog.buttons.length; i++) {
      if (thisiscard) {
        dialog.buttons[i].capt = getCapt(dialog.buttons[i].link[2]);
      } else {
        dialog.buttons[i].group = lib.character[dialog.buttons[i].link][1];
        dialog.buttons[i].capt = getCapt(dialog.buttons[i].link);
      }
    }
    if (!expandall) {
      if (!thisiscard && (lib.characterDialogGroup[lib.config.character_dialog_tool] || lib.config.character_dialog_tool == "自创")) {
        clickCapt.call(node[lib.config.character_dialog_tool]);
      }
    }
    if (dialog.paginationMaxCount.get("character")) {
      const buttons = dialog.content.querySelector(".buttons");
      const array = dialog.buttons.filter((item) => !item.classList.contains("nodisplay") && item.style.display !== "none");
      dialog.addPagination({
        // 数据
        data: array,
        // 总页数(向上取整)
        totalPageCount: Math.ceil(array.length / dialog.paginationMaxCount.get("character")),
        // 父元素
        container: dialog.content,
        // 添加到容器的哪个子元素后面
        insertAfter: buttons,
        // 回调修改数据
        onPageChange: (state) => {
          const { pageNumber, data } = state;
          data.forEach((item, index) => {
            const maxCount = dialog.paginationMaxCount.get("character");
            if (index >= (pageNumber - 1) * maxCount && index < pageNumber * maxCount) {
              item.classList.remove("nodisplay");
            } else {
              item.classList.add("nodisplay");
            }
          });
        },
        // 触发什么事件来更改当前页数，默认为click
        changePageEvent: "click"
      });
    }
    //console.log(dialog);
    for (var i of dialog.buttons){
        i.onclick=function (){
            //ui.dialog.buttons[0].link=this.link;
            //dialog.close();
            var characters=ui.dialog.players.map(i=>i.link);
            characters.push(this.link);
            
            var buttons = ui.create.div(".buttons");
			var node = _status.event.dialog.buttons[0].parentNode;
			_status.event.dialog.players = ui.create.buttons(characters, "characterx", buttons);
			_status.event.dialog.content.insertBefore(buttons, node);
			buttons.addTempClass("start");
			node.remove();
			game.uncheck();
			game.check();
			
			dialog.close();
            
        
        }
    
    }
    
    ui.window.appendChild(dialog);
    //document.body.appendChild(dialog);
    //return dialog;
  }

}


