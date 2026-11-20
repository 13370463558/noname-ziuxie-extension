mofaLDW: {
    skillTrigger(triggerName, player, skill) {
    var next = game.createEvent(triggerName, false);
    next.player = player;
    next.skill = skill;
    next.setContent(async (event, trigger, player) => {
        event.trigger(event.name);
    });
},
init(player, skill) {
    lib.skill[skill].skillTrigger("player_init", player, skill);
},
onremove(player, skill) {
    lib.skill[skill].skillTrigger("player_removeSkill", player, skill);
},
                        persevereSkill: true,
                        charlotte: true,
                        locked: true,
                        onremove: true,
                        nique: true,
                        superCharlotte:true,
                        fixed:true,
                        forceunique:true,
                          forced:true,
                        dutySkill:true,			
    trigger: {
        player: "changeHp",
    },
    filter(event, player) {
        return player.countMark("mofaLDW_used") < Infinity && (player.hp == 1 || player.hp == player.maxHp);
    },
    mark: true,
    round:2,								
    intro: {
        content(storage, player) {
            return `剩余可发动次数为${Infinity - player.countMark("mofaLDW_used")}`;
        },
    },
    onremove: true,
    subSkill: {
        used: {
            charlotte: true,
            onremove: true,
        },
        gainCount: {
            charlotte: true,
            onremove: true,
        },
    },
    GetAllSkills(player) {
        var list = {};
        var ownSkills = get.translation(player.getSkills(true, false, false));
        for (var key in lib.character) {
            if (!lib.character[key][3]) continue;
            var skills = lib.character[key][3];
            for (var i of skills) {
                // if (ownSkills.includes(i)) continue;
                if (!lib.translate[i]) continue;
                if (ownSkills.includes(lib.translate[i])) continue;
                list[i] = lib.translate[i];
            }
        };
        return list;
    },
    async content(event, trigger, player) {
        player.addSkill(event.name + "_used");
        player.addMark(event.name + "_used", 1, false);
        // 一些函数

        // 随机获取任意个键值
        function getRandomKeys(obj, num) {
            var keys = Object.keys(obj);
            var selectedKeys = [];
            var i;
            for (i = 0; i < num; i++) {
                var randomIndex = Math.floor(Math.random() * keys.length);
                selectedKeys.push(keys[randomIndex]);
                keys.splice(randomIndex, 1);
            }
            return selectedKeys;
        }
        // 获取不重复的中文字符
        function extractChineseCharacters(arr) {
            var chineseRegex = /[\u4e00-\u9fa5]/g;
            var chineseSet = new Set();

            arr.forEach(function (str) {
                var chineseChars = str.match(chineseRegex);
                if (chineseChars) {
                    chineseChars.forEach(function (char) {
                        chineseSet.add(char);
                    });
                }
            });
            return Array.from(chineseSet);
        }

        // 随机从数组中获取元素
        function getRandomElements(arr, num) {
            var result = [];
            var len = arr.length;
            var indices = [];

            for (var i = 0; i < len; i++) {
                indices.push(i);
            }

            for (var j = 0; j < num; j++) {
                var randomIndex = Math.floor(Math.random() * indices.length);
                var index = indices[randomIndex];
                result.push(arr[index]);
                indices.splice(randomIndex, 1);
            }
            return result;
        }

        // 检查存在的技能
        function findWordCombinations(arrA, arrB) {
            var combinations = [];

            for (var i = 0; i < arrB.length - 1; i++) {
                for (var j = i + 1; j < arrB.length; j++) {
                    var word1 = arrB[i] + arrB[j];
                    var word2 = arrB[j] + arrB[i];
                    // console.log(word1, word2);
                    if (arrA.includes(word1)) {
                        combinations.push(word1);
                    }
                    if (arrA.includes(word2)) {
                        combinations.push(word2);
                    }
                }
            }
            return combinations;
        }

        // 通过值找键
        function findKeysByValue(obj, value) {
            var keys = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key) && obj[key] === value) {
                    keys.push(key);
                }
            }
            if (keys.length == 0) return null;
            return keys;
        }

        // ai自动选择
        function autoChoose(list, findWord) {
            var index = [];
            var list = list.map(i => i[1]);
            var findWord = findWord.randomGet();
            for (var i of findWord) {
                for (var j = 0; j < list.length; j++) {
                    if (i != list[j]) continue;
                    index.push(j);
                }
            }
            // console.log(index, list[index[0]] + list[index[1]]);
            return index;
        };

        // 获取完全没法组成技能的汉字
        function getCannotCharacters(arr, skills) {
            var index = [];
            var list = arr.map(i => i[1]);
            for (var name of skills) {
                for (var j of name) {
                    for (var k = 0; k < list.length; k++) {
                        if (j != list[k]) continue;
                        index.push(k);
                    }
                }
            }
            return index;
        };

        //技能部分
        var allCNSkills = [], ENSkills = lib.skill.mofaLDW.GetAllSkills(player);
        for (var key in ENSkills) {
            allCNSkills.push(ENSkills[key]);
        }
        // 性能挑战（划掉）
        while (true) {
            var skillsList = getRandomKeys(lib.skill.mofaLDW.GetAllSkills(player), 100);
            var CNSkills = [];
            for (var i of skillsList) {
                CNSkills.add(get.translation(i));
            }
            var CNCharacters = extractChineseCharacters(CNSkills);
            var randomCN = getRandomElements(CNCharacters, Math.min(CNCharacters.length, 50));
            var findWord = findWordCombinations(allCNSkills, randomCN);
            // 保底技能数 默认15
            if (findWord.length > 15) break;
        }
        var list = [];
        for (var i = 0; i < randomCN.length; i++) {
            list[i] = [i, randomCN[i]];
        }
        if (list.length == 0) {
            player.popup('纳尼？没有技能了？！');
            return;
        };
        var fun1 = (list) => {
            var per = 0;
            if (per == 0) return [];
            var filterEnd = getRandomElements(list, Math.floor(list.length * per));
            return filterEnd;
        };
        //game.broadcastAll(function (player) {
        //	player.forceCountChoose = { chooseButton: 30 };
        //}, player);
        event.time = 180;
        await game.broadcastAll(() => {
            lib.configOL.choose_timeout = 180;
        });
        var buttonList = [`魔法:请选择至少两个汉字（推荐选两个汉字）`];
        var count = 0;
        for (var i = 0; i < Math.ceil(list.length / 10); i++) {
            buttonList.push([list.slice(count, (count + 10 >= list.length ? list.length : (count + 10))), 'tdnodes']);
            count += 10;
        }


        buttonList.push(`存在有${findWord.length}个技能`);
        var div=ui.create.div(".text.center","描述显示处");
        div.className="infodiv";
        buttonList.push(div);

        const captionDiv = document.createElement('div');
        captionDiv.className = 'caption';
        Object.assign(captionDiv.style, {
            display: 'flex',
            gap: '4px',
            flexWrap: 'wrap',
            //background: '#f0f0f0',
            padding: '2px',
        });
        
        for(var i of findWord){
            /*var findkey = findKeysByValue(ENSkills, i);
                            
            for (var a of findkey) {
                var div=ui.create.div(".text.center",i,function(){
                    
                    if(!this.showINfo){
                        this.innerHTML=lib.translate[this.className+ '_info'];
                        this.showINfo=true;
                        return;
                    }
                    this.innerHTML=lib.translate[this.className];
                    this.showINfo=false;
                    //this.innerHTML=get.skillInfoTranslation(a);
                });
                div.className=a;
                Object.assign(div.style, {
                    //background: '#ccc',
                    //padding: '10px',
                    flex: '1 0 80px', // 关键：每个最多 120px，允许换行
                });
                
                
                captionDiv.appendChild(div);					
                
            }*/
            var div=ui.create.div(".text.center",i);/*,function(){
                var findKeysByValue=function(obj, value) {
                    var keys = [];
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key) && obj[key] === value) {
                            keys.push(key);
                        }
                    }
                    if (keys.length == 0) return null;
                    return keys;
                };

                
                
                

    

                var ENSkills = _status.event.answer;//lib.skill.mofaLDW.GetAllSkills(player);
                

                var findkey = findKeysByValue(ENSkills, this.innerHTML);//技能的拼音。
                var info=[];
                var div=document.querySelector("#arena > div.dialog.scroll1.scroll2 > div > div > div.infodiv");
                for(var a of findkey){
                    info.push(lib.translate[a+ '_info']+"<br/>");
                }
                div.innerHTML=info;

                var skillname=[...this.innerHTML];
                

                
                const elements = document.querySelectorAll('.shadowed.reduce_radius.pointerdiv.tdnode.tdnodes.selectable');

                for(var i of elements){

                    if(skillname.includes(i.textContent)){
                        i.classList.add('selected');
                        //ui.click.touchStart.call(this,i);
                    }

                }



            });*/
            div.addEventListener(lib.config.touchscreen ? "touchend" : "click", function () {
                var findKeysByValue=function(obj, value) {
                    var keys = [];
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key) && obj[key] === value) {
                            keys.push(key);
                        }
                    }
                    if (keys.length == 0) return null;
                    return keys;
                };

                
                
                

    

                var ENSkills = _status.event.answer;//lib.skill.mofaLDW.GetAllSkills(player);
                

                var findkey = findKeysByValue(ENSkills, this.innerHTML);//技能的拼音。
                var info=[];
                var div=document.querySelector("#arena > div.dialog.scroll1.scroll2 > div > div > div.infodiv");
                for(var a of findkey){
                    info.push(lib.translate[a+ '_info']+"<br/>");
                }
                

                var skillname=[...this.innerHTML];
                

                
                const elements = document.querySelectorAll('.shadowed.reduce_radius.pointerdiv.tdnode.tdnodes.selectable');


                for(var i of elements){
                    if(i.style.color) i.style.color='';
                    if(skillname.includes(i.textContent)){
                        i.style.setProperty('color', 'red', 'important');
                    }
                    
                }

                div.innerHTML=info;
                
            });
            Object.assign(div.style, {
                //padding: '10px',
                border:'2px solid black',
                flex: '1 0 80px', // 关键：每个最多 120px，允许换行
            });
            
            captionDiv.appendChild(div);		


        }
        buttonList.push(captionDiv);
        //buttonList.push(`可组成的技能有:${findWord}`);

        
        //game.log(`提示:可组成的技能有:${findWord}`);
        //player.chat(`可组成的技能有:${findWord}`);
        event.videoId = lib.status.videoId++;
        game.broadcastAll(
            function (list, len, player, id) {
                if (game.me != player) {
                    const buttonList = ui.create.dialog(`魔法:请选择至少两个汉字（推荐选两个汉字）`);
                    var count = 0;
                    for (var i = 0; i < Math.ceil(list.length / 10); i++) {
                        buttonList.add([list.slice(count, (count + 10 >= list.length ? list.length : (count + 10))), 'tdnodes']);
                        count += 10;
                    }
                    buttonList.add(`存在有${len}个技能`);
                    buttonList.push(captionDiv);
                    buttonList.videoId = id;
                }
            },
            list,
            findWord.length,
            player,
            event.videoId
        );
        const links = await player.chooseButton(buttonList)
            .set('forced', true)
            .set('selectButton', 2)
            .set('filterButton', function (button) {    //button.link是数字
                
                var answer = _status.event.answer;
                var div=document.querySelector("#arena > div.dialog.scroll1.scroll2 > div > div > div.infodiv");
                var ls=_status.event.ls;
                var CsSkill = '';
                if(ui.selected.buttons.length==2){
                    
                    var a=ui.selected.buttons[0].link;
                    var b=ui.selected.buttons[1].link;
                    var skill=ls[a][1]+ls[b][1];

                    var skill2 = skill.split('').reverse().join('');

                    
                    var findkey = findKeysByValue(answer, skill);
                    var findkey2 = findKeysByValue(answer, skill2);
                    var bool_find=findkey?findkey:findkey2;

                    if(bool_find!=null){
                        var introSkills = [];
                        for (var i of bool_find) {
                            introSkills.push(get.skillInfoTranslation(i)+"<br/>");
                        }
                        div.innerHTML=introSkills;
                        return true;
                    }
                    else{
                        return false;
                    }
                }
                for (var i = 0; i < ui.selected.buttons.length; i++) {
                    var i=ui.selected.buttons[i].link,
                    curren_index=button.link;
                    CsSkill +=ls[i][1];
                    CsSkill+=ls[curren_index][1];

                    var CsSkill2 = CsSkill.split('').reverse().join('');

                    var findkey = findKeysByValue(answer, CsSkill);
                    var findkey2 = findKeysByValue(answer, CsSkill2);
                    var bool_find=findkey?findkey:findkey2;

                    return bool_find!=null;
                    
                }
                return true;
            })
            .set('ai', () => {
                _status.tmp_mofaLDW_endTime = true;
            })
            .set('answer', ENSkills)
            .set("ls",list)
            .forResult('links');
        //game.broadcastAll(function (player) {
        //	delete player.forceCountChoose;
        //	// delete _status.tmp_mofaLDW_endTime;
        //}, player);
        await game.broadcastAll((time, id) => {
            var dialog = get.idDialog(id);
            if (dialog) {
                dialog.close();
            }
            lib.configOL.choose_timeout = time;
        }, event.time, event.videoId);

        var fun2 = (player, end = false) => {
            if (!end) player.popup(`没有${CsSkill}`);
            else player.popup(`时间耗尽`);
            // player.chat(`可组成的技能有:${findWord}`);
            game.log(player, "魔力耗尽...创造失败...");
            game.log(`提示:可组成的技能有:${findWord}`);
        };
        if (!links || _status.tmp_mofaLDW_endTime) {
            fun2(player, true);
            delete _status.tmp_mofaLDW_endTime;
            return;
        }
        var CsSkill = '';
        for (var i of links) {
            CsSkill = CsSkill + list[i][1];
        }

        var CsSkill2 = CsSkill.split('').reverse().join('');


        var findkey = findKeysByValue(ENSkills, CsSkill);
        var findkey2 = findKeysByValue(ENSkills, CsSkill2);
        var bool_find=findkey?findkey:findkey2;

        if (bool_find != null) {
            var introSkills = [];
            for (var i of bool_find) {
                introSkills.push(get.skillInfoTranslation(i));
            }
            const index = bool_find.length == 1 ? 0 :
                await player.chooseControl()
                    .set('choiceList', introSkills)
                    .set('prompt', `请选择一个版本的【${get.translation(bool_find[0])}】`)
                    .set('ai', () => get.rand(0, bool_find.length - 1))
                    .forResult('index');
            if (!index && index != 0) return;
            player.addSkill(bool_find[index]);
            game.log(player, "使用魔法创造了技能", "#g【" + get.translation(bool_find[index]) + "】");
            player.popup(get.translation(bool_find[index]));
            player.addMark("mofaLDW_gainCount", 1, false);
            if (player.countMark("mofaLDW_gainCount") > 1) {
                //player.removeMark("sw_getSkillMaxcnt", 1, false);
                    game.broadcastAll((player) => { player.chooseToDiscard(3, "he", true); }, player);
                game.log(player, "弃三张牌");
            }
        } else {
            fun2(player);
        }
    },
},