import { game, ui, _status, ai, lib, get } from "../../../noname.js" 
import skill from "../../../noname/library/skill.js";
import { isClass } from "../../../noname/util/index.js";
export const skills={
    //孙权
    rezhihengResume:{
        trigger:{
            source:"damageSource",
        },
        audio:"jiuyuan",
        forced:true,
        filter(event,player){
            return player.getStat("skill").rezhiheng;
        },
        async content(event,trigger,player){
            player.getStat("skill").rezhiheng--;
        }
    },
    //关羽
    yijue_enhance:{
        inherit:"new_yijue",
        filterCard:false,
        selectTarget:[1,2],
        filterTarget(card, player, target) {
            return target.countCards("h");
        },
        async content(event, trigger, player) {
            const { target } = event;
            if (!target.countCards("h")) {
                return;
            }
            const  result  = await target
                .chooseCard(true, "h")
                .set("ai", card => {
                    const player = get.player();
                    if (get.color(card) == "black") {
                        return 18 - get.event().black - get.value(card);
                    }
                    return 18 - get.value(card);
                })
                .set(
                    "black",
                    (() => {
                        if (get.attitude(target, player) > 0) {
                            return 18;
                        }
                        if (
                            target.hasCard(card => {
                                const name = get.name(card, target);
                                return name === "shan" || name === "tao" || (name === "jiu" && target.hp < 3);
                            })
                        ) {
                            return 18 / target.hp;
                        }
                        if (target.hp < 3) {
                            return 12 / target.hp;
                        }
                        return 0;
                    })()
                ).forResult();
            if (result?.bool && result?.cards?.length) {
                const { cards } = result;
                await target.showCards(cards);
                const [card] = cards;
                await player.gain(card, target, "give", "bySelf");
                if (get.color(card) == "black"&&target!=player) {
                    if (!target.hasSkill("fengyin")) {
                        target.addTempSkill("fengyin");
                    }
                    const skill = "new_yijue_" + player.playerid;
                    game.broadcastAll(lib.skill.new_yijue.initSkill, skill);
                    target.addTempSkill(skill);
                    target.storage[skill] ??= [0, player];
                    target.storage[skill][0]++;
                    target.markSkill(skill);
                    player.addTempSkill("new_yijue_effect");
                } else if (get.color(card) == "red") {
                    if (target.isDamaged()) {
                        const  result  = await player.chooseBool(`是否让${get.translation(target)}回复1点体力？`).set("choice", get.recoverEffect(target, player, player) > 0).forResult();
                        if (result?.bool) {
                            await target.recover();
                        }
                    }
                }
            }
        },
        ai: {
            result: {
                target(player, target) {
                    if (target.countCards("h")&& get.recoverEffect(target) > 0) {
                        return 1;
                    }
                    if (player.canUse("sha", target) && (player.countCards("h", "sha") || player.countCards("he", { color: "red" }))) {
                        return -2;
                    }
                    return -0.5;
                },
            },
            order: 9,
            "directHit_ai": true,
            skillTagFilter(player, tag, arg) {
                if (!arg?.target?.hasSkill("new_yijue_" + player.playerid)) {
                    return false;
                }
            },
        },
        
    },
    //秦宓
    tianbian_enhance:{
        trigger: {
            global: "chooseToCompareBegin",
        },
        audio:"tianbian",
        filter(event, player) {
            if (player == event.player) {
                return true;
            }
            if (event.targets) {
                return event.targets.includes(player);
            }
            return player == event.target;
        },
        forced:true,
        content(){
            player.draw();
        },
        group: "tianbian_number",
        
    },
    //郭嘉
    maixue_enhance:{
        trigger:{
            player:"phaseZhunbeiBegin",
        },
        async cost(event, trigger, player){
            
            const  result  = await player
                .chooseTarget(
                    1,
                    (card, player, target) => {
                        return true;
                    },
                    target => {
                        const att = get.attitude(_status.event.player, target);
                        return att-1;
                    }
                ).forResult();
            event.result = result;
        },
        async content(event,trigger,player){
            await player.damage(event.target,"unreal");
        }
    },
    //张辽
    tuxi_enhance:{
        inherit:"tuxi",
        trigger:{
            player:"drawBegin",
        },
        audio:"tuxi",
        filter(event,player){
            return game.hasPlayer(current => current.countCards("h") > 0&&current!=player);
        },
        async content(event, trigger, player) {
            trigger.changeToZero();
            await player.gainMultiple(event.targets);
        },

    },
    //黄盖
    rekurou_enhance:{
        inherit:"rekurou",
        audio:"rekurou",
        check(card) {
            const type = get.type(card);
            /*
            if(type=="dely") return get.name(card)=="shandian"?100:0;
            if(type=="equip"){
                return ["equip3","equip2"].includes(get.subtype(card))?0:6;
            }
            if(type=="trick") return 8-get.value(card);*/
            return type=="basic"?5:8-get.value(card);
        },
        content() {
            'step 0';
            player.loseHp();
            'step 1';
            if(get.type(event.cards[0])!="basic"){
                player.recover();
            }
        },
        ai: {
            order: 8,
            result: {
                player(player) {
                    if (player.needsToDiscard(3) && !player.hasValueTarget({ name: "sha" }, false)) {
                        return -1;
                    }
                    if(player.getHp()>1) return 5;
                    return get.effect(player, { name: "losehp" }, player, player);
                },
            },
            //neg: true,
        },
    },
    //曹昂
    kaikang_enhance:{
        inherit:"kaikang",
        audio:"kaikang",
        content(){
            "step 0";
            player.draw(2);
            if (trigger.target != player) {
                player.chooseCard(true, "he", "交给" + get.translation(trigger.target) + "一张牌").set("ai", function (card) {
                    if (get.position(card) == "e") {
                        return -1;
                    }
                    if (card.name == "shan") {
                        return 1;
                    }
                    if (get.type(card) == "equip") {
                        return 0.5;
                    }
                    return 0;
                });
            } else {
                event.goto(3);
            }
            "step 1";
            player.give(result.cards, trigger.target, "give");
            game.delay();
            event.card = result.cards[0];
            "step 2";
            if (trigger.target.getCards("h").includes(card) && get.type(card) == "equip") {
                trigger.target.chooseUseTarget(card);
            }
            "step 3";
            player.chooseToDiscard("h",true,"请弃置一张手牌，若为装备牌，你可使用之");
            "step 4";
            if(result.cards){
                if(get.type(result.cards[0])=="equip"){
                    player.chooseUseTarget(result.cards[0]);
                    
                
                }
            
            }
        },
    },
    //马岱
    poQianxi:{
        audio:"qianxi",
        trigger:{
            player:"phaseZhunbeiBegin",
        },
        frequent: true,
        async content(event,trigger,player){
            await player.draw();
            var result=await player.chooseCardTarget({
                prompt: "将一张牌当作【杀】使用，目标本回合不能使用或打出此颜色的牌",
                filterCard:true,
                position:"he",
                filterTarget:function(card,player,target){
                    return target!=player&&player.canUse("sha",target,false);
                },
                forced:true,
            }).forResult();
            if(result.bool){

                result.targets[0].storage.poQianxi_effect = get.color(result.cards[0],player);
                player.line(result.targets, "green");
                result.targets[0].addTempSkill("poQianxi_effect");
                result.targets[0].markSkill("poQianxi_effect");
                result.targets[0].addTip("poQianxi_effect", "不能使用或打出" + get.translation(result.targets[0].storage.poQianxi_effect) + "的手牌");
            

                var next= player.useCard({ name: "sha" }, result.cards, result.targets, false);
                if(result.cards[0].name=="sha"){
                    //console.log("加伤");
                    if (typeof next.baseDamage != "number") {
                        next.baseDamage = 1;
                    }
                    next.baseDamage++;
                }
                await next;
            }
        },
        subSkill:{
            effect:{
                forced: true,
                mark: true,
                audio: false,
                sourceSkill: "poQianxi",
                onremove(player, skill) {
                    delete player.storage[skill];
                    player.removeTip(skill);
                },
                mod: {
                    cardEnabled2(card, player) {
                        if (get.itemtype(card) == "card" && get.color(card) == player.getStorage("poQianxi_effect")) {
                            return false;
                        }
                    },
                },
                intro: {
                    content(color) {
                        return "不能使用或打出" + get.translation(color) + "的手牌";
                    },
                },
            }
        }

    },
    //白马
    baima:{
        trigger: {
            global: "roundStart",
        },
        audio:"jiaozi",
        async content(event,trigger,player){
            const result = await player
            .chooseButton([
                `白马：你可以选择至多两项`,
                [
                    [
                        [0, `本轮回合获得【伏骑】`],
                        [1, `本轮回合获得【骄姿】`],
                        [2, `摸两张牌`],
                    ],
                    "tdnodes",
                ],
            ])
            .set("selectButton", [1, 2])
            .set("ai", button => {
                if(_status.event.player.seatNum!=1){
                    if(button.link==1) return 0;
                    else return 1;
                }
                else{
                    if(button.link==2) return 0;
                    else return 1;
                }
            })
            .forResult();
        if (result?.links?.length) {
            const links = result.links;
            await player.addTempSkill("baima_tips","roundStart");
            var skills=[];
            if (links.includes(0)) {
                await player.addTempSkill("fuqi","roundStart");
                skills.push("伏骑");
            }
            if (links.includes(1)) {
                await player.addTempSkill("jiaozi","roundStart");
                skills.push("骄姿");
            }
            if (links.includes(2)) {
                await player.draw(2);
            }
            if(skills.length){
                
                await player.addTip("baima_tips", `白马:${skills.join(" ")}`);
                //await player.markSkill("baima_tips");
            }

            
        }
        },
        subSkill:{
            tips:{
                charlotte: true,
                onremove(player, skill) {
                    //delete player.storage[skill];
                    player.removeTip(skill);
                },
            }
        }
    },
    //许攸
    pochenglue:{
        enable: "phaseUse",
        usable: 1,
        audio: "nzry_chenglve",
        filter: function (event, player) {
            return true;
        },
        async content(event, trigger, player) {
            await player.draw(2);
            const num=player.countCards("h")>4?2:player.countCards("h")<4?0:1;
            var r1=await player.chooseToDiscard('h',[1,player.nickname?Infinity:num],"弃置任意张牌").set("ai", card => {
                const player = get.player(),
                    effect = player.getStorage("nzry_chenglve_effect");
                const cards = player.getCards("h").filter(i => get.tag(i, "damage") > 0.5 && player.hasValueTarget(i, true, false)),
                    map = {};
                for (const cardx of cards) {
                    const suit = get.suit(cardx, player);
                    if (typeof map[suit] != "number") {
                        map[suit] = 0;
                    }
                    map[suit]++;
                }
                const list = [];
                for (let i in map) {
                    if (map[i] > 0) {
                        list.push([i, map[i]]);
                    }
                }
                list.sort((a, b) => b[1] - a[1]);
                if (effect.includes(get.suit(card, player))) {
                    return 0;
                }
                if (list.some(i => i[0] == get.suit(card, player)) && !player.hasUseTarget(card, false)) {
                    return 10;
                }
                if (ui.selected.cards.length && !ui.selected.cards.some(i => get.suit(i) == get.suit(card, player))) {
                    return 2;
                }
                return 6 - get.value(card);
            }).forResult();
            if (r1.bool) {
                const effect = "nzry_chenglve_effect";
                player.addTempSkill(effect);
                player.markAuto(effect, r1.cards.map(card => get.suit(card, player)).unique());
                player.storage[effect].sort((a, b) => lib.suits.indexOf(b) - lib.suits.indexOf(a));
                player.addTip(effect, get.translation(effect) + player.getStorage(effect).reduce((str, suit) => str + get.translation(suit), ""));
            }
        },
        ai: {
            order(item, player) {
                if (player.countCards("h", card => get.tag(card, "damage") > 0.5 && player.hasValueTarget(card, true, false)) > 2) {
                    return get.order({ name: "sha" }) + 0.14;
                }
                return 2.7;
            },
            result: {
                player(player) {
                    return 5;
                },
            },
        },
    },
    //谋鲁肃
    mengshi_enhance:{
        inherit:"olsbmengshi",
        async content(event, trigger, player) {
            player.awakenSkill(event.name);
            const [target1, target2] = event.targets.sortBySeat();
            player.addTempSkill("olsbmengshi_effect", { player: "dieAfter" });
            player.markAuto("olsbmengshi_effect", event.targets);
            if (target1.getHp() === target2.getHp()) {
                return;
            }
            if ([target1, target2].some(target => !target.isIn())) {
                player.chat("怎么肘了");
                return;
            }
            const num = Math.abs(target1.getHp() - target2.getHp());
            await player.loseHp(num);
            const list = target2.getHp() > target1.getHp() ? [num, -num] : [-num, num];
            await target1[list[0] > 0 ? "recover" : "loseHp"](Math.abs(list[0]));
            await target2[list[1] > 0 ? "recover" : "loseHp"](Math.abs(list[1]));
        },
    },
    //族吴苋
    clanguixiang_tips:{
        inherit:"clanguixiang",
        audio:"clanguixiang",
        content() {
            player.addTempSkill("clanguixiang_tips_tips",`phaseUseEnd`);
            player.addTip("clanguixiang_tips_tips",`${get.translation(trigger.phaseList[trigger.num]).slice(0,2)}->出牌`);
            trigger.phaseList[trigger.num] = `phaseUse|${event.name}`;
            //player.draw();
            game.delayx();
        },
        subSkill:{
            tips:{
                charlotte: true,
                onremove(player, skill) {
                    player.removeTip("clanguixiang_tips_tips");
                },
            },
        }
    },
    //闪张辽
    newzhengbing:{
        enable:"phaseUse",
        usable:3,
        audio:2,
        filter(event,player){
            return player.countCards("he")>0;
        },
        filterCard:1,
        selectCard:1,
        discard:false,
        lose: false,
        delay:false,
        position:"he",
        intro: {
            "name2": "整",
            markcount(storage, player) {
                return player.countMark("newzhengbing");
            },
            content(storage, player) {
                return `手牌上限+${player.countMark("newzhengbing")},`;//当前已经重铸了${storage}
            },
        },

        async content(event,trigger,player){
            //if(!player.storage.newzhengbing) player.storage.newzhengbing=[];
            const name=get.name(event.cards[0],player);

            await player.recast(event.cards[0]);

            if(name=="sha"){
                await player.addMark("newzhengbing",1);
                await player.markSkill("newzhengbing");
                //if(!player.storage.newzhengbing.includes(name)) player.storage.newzhengbing.push(name);
            }
            else if(name=="shan"){
                await player.draw();
                //if(!player.storage.newzhengbing.includes(name)) player.storage.newzhengbing.push(name);
            }
            else if(["tao","jiu"].includes(name)){
                await player.addTempSkill("newzhengbing_effect");
                //if(!player.storage.newzhengbing.includes(name)) player.storage.newzhengbing.push(name);
            }
            

           
        },
        mod:{
            maxHandcard: function(player,num){
                return num+(player.countMark("newzhengbing")||0);
            },
        },
        subSkill:{
            effect:{
                trigger:{
                    player:"phaseEnd",
                },
                forced: true,
                async content(event, trigger, player) {
                    await player.phaseUse();
                },
            }
        }

    },
    //吕布
    sheji:{
        zhuanhuanji:true,
        trigger:{
            player:"phaseZhunbeiBegin",
        },
        marktext: "☯",
        mark: true,
        intro: {
            content(storage, player, skill) {
                const name = storage ? "sha": "juedou";
                const dis=name=="sha"? "(无视距离)":"";
                return `准备阶段，你可以视为使用一张【${get.translation(name)}】`+dis;
            },
        },
        frequent:true,
        async content(event, trigger, player) {
            await player.changeZhuanhuanji(event.name);
            const name = !player.storage[event.name] ? "sha": "juedou";
            const dis=name=="sha"? "(无视距离)":"";
            await player.chooseUseTarget(new lib.element.VCard({ name: name, isCard: true,sheji:true}), false, "nodistance", `射戟：是否视为使用一张【${get.translation(name)}】`+dis);           
        },

    },
    //族杨氏宗族技
    clanyichi_enhanche:{
        inherit:"clanyichi",
        audio:"clanyichi",
        trigger: {
            player: "phaseDiscardBegin",
        },
    },
    //吕布
    liyu_enhance:{
        inherit:"new_liyu",
        audio:"liyu",
        filter(event, player) {
            if (event._notrigger.includes(event.player)) {
                return false;
            }
            if(event.card.name=="juedou"&&!event.card.sheji) return false;
            return event.card && ["sha","juedou"].includes(event.card.name) && event.player != player && event.player.isIn() && event.player.countGainableCards(player, "hej") > 0;
        },

    },
    //马超
    anjian:{
        trigger:{
            player:"phaseDrawBegin",

        },
        check(event, player) {
            return true;
        },
        filter(event, player) {
            return !event.numFixed && event.num > 0;
        },
        async content(event, trigger, player) {
            const r=await player.chooseUseTarget("###是否发动【暗箭】？###视为使用一张没有距离限制的【杀】", { name: "sha" }, false, "nodistance").forResult();
            if(r.bool) trigger.num--;
        },

    },
    //成公英
    kuangxiang_enhance:{
        inherit:"olkuangxiang",
        audio:"olkuangxiang",
        trigger: {
            player: ["phaseZhunbeiBegin","phaseJieshuBegin"]
        },
        async cost(event, trigger, player) {
            event.result = await player
                .chooseTarget(
                    "请选择【匡襄】的目标",
                    lib.translate.olkuangxiang_info,
                    (card, player, target) => {
                        return target.countCards("h") !== 4;
                    },
                    false
                )
                .set("ai", target => {
                    const att = get.attitude(get.player(), target);
                    const num = target.countCards("h");
                    if (num > 4) {
                        return -att * (num - 4);
                    }
                    return att * Math.max(0, 4 - target.countCards("h"));
                })
                .forResult();
        },
    },
    //曹纯
    olshanjia_smart:{
        inherit:"olshanjia",
        ai: {
            order:function(item,player){
                if(!player.countMark("olshanjia")) return 10;
                else{
                    if(!player.hasCard(card => {
                        return player.hasUseTarget(card, true, true);
                    })){
                        return 10;
                    }
                    else return 0.1;
                }
            },
            result: {
                player: 1,
            },
        },
    },
    //夏侯玄
    olqingyi_enhance:{
        inherit:"olqingyi",
        audio:"olqingyi",
        group:"olqingyi_enhance_gain",
        subSkill: {
            gain: {
                audio: "olqingyi",
                trigger: {
                    player: "phaseJieshuBegin",
                },
                direct: true,
                filter(event, player) {
                    var history = player.getHistory("useSkill", evt => evt.skill == "olqingyi_enhance");
                    if (!history.length) {
                        return false;
                    }
                    var suit = false;
                    for (var evt of history) {
                        var list = [player];
                        list.addArray(evt.targets);
                        for (var target of list) {
                            target.getHistory("lose", function (evtx) {
                                if (suit === true || evtx.getParent(2).name != "olqingyi_enhance") {
                                    return false;
                                }
                                for (var card of evtx.cards) {
                                    if (suit === true || get.position(card, true) != "d") {
                                        continue;
                                    }
                                    var suit2 = get.suit(card, false);
                                    if (!suit) {
                                        suit = suit2;
                                    } else if (suit != suit2) {
                                        suit = true;
                                    }
                                }
                            });
                            if (suit === true) {
                                return true;
                            }
                        }
                    }
                    return false;
                },
                content() {
                    "step 0";
                    var history = player.getHistory("useSkill", evt => evt.skill == "olqingyi_enhance"),
                        cards = [];
                    for (var evt of history) {
                        var list = [player];
                        list.addArray(evt.targets);
                        for (var target of list) {
                            target.getHistory("lose", function (evtx) {
                                if (evtx.getParent(2).name != "olqingyi_enhance") {
                                    return false;
                                }
                                for (var card of evtx.cards) {
                                    if (get.position(card, true) == "d") {
                                        cards.add(card);
                                    }
                                }
                            });
                        }
                    }
                    player
                        .chooseButton(["清议：选择任意张花色不同的牌", cards], [1,4])
                        .set("filterButton", function (button) {
                            if (!ui.selected.buttons.length) {
                                return true;
                            }
                            //return get.suit(button.link, false) != get.suit(ui.selected.buttons[0].link, false);
                            for (var i = 0; i < ui.selected.buttons.length; i++) {
                                if (get.suit(button.link) == get.suit(ui.selected.buttons[i].link)) {
                                    return false;
                                }
                            }
                            return true;
                        })
                        .set("ai", function (button) {
                            return get.value(button.link, _status.event.player);
                        });
                    "step 1";
                    if (result.bool) {
                        player.logSkill("olqingyi_enhance_gain");
                        player.gain(result.links, "gain2");
                    }
                },
                "skill_id": "olqingyi_enhance_gain",
                sub: true,
                sourceSkill: "olqingyi_enhance",
                "_priority": 0,
            }
        }

    },
    //孙坚
    gzyinghun_enhance:{
        inherit:"gzyinghun",
        audio: "yinghun",
        audioname: ["re_sunjian","sunce","re_sunben","re_sunce","ol_sunjian","sb_sunce"],
        "audioname2": {
            "re_sunyi": "gzyinghun_re_sunyi",
        },
        async cost(event, trigger, player) {
            event.result = await player
                .chooseTarget(get.prompt2(event.skill), function (card, player, target) {
                    return true;
                })
                .set("ai", function (target) {
                    const player = _status.event.player;
                    if (player.getDamagedHp() == 1 && target.countCards("he") == 0) {
                        return 0;
                    }
                    if (get.attitude(_status.event.player, target) > 0) {
                        return 10 + get.attitude(_status.event.player, target);
                    }
                    if (player.getDamagedHp() == 1) {
                        return -1;
                    }
                    return 1;
                })
                .setHiddenSkill(event.name.slice(0, -5))
                .forResult();
        },
        async content(event, trigger, player) {
            const num = player.getDamagedHp();
            const [target] = event.targets;
            const str1 = "摸" + get.cnNumber(num, true);
            const str2 = "弃" + get.cnNumber(num, true),
            directcontrol =str1 ==
                    (await player
                        .chooseControl(str1, str2, function (event, player) {
                            return _status.event.choice;
                        })
                        .set("choice", get.attitude(player, target) > 0 ? str1 : str2)
                        .forResult()).control;
            if (directcontrol) {
                await target.draw(num);
            } else {
                await target.chooseToDiscard(num, true, "he");
            }
        },

    },
    //吕蒙  未使用
    gongxin_enhance:{
        inherit:"gongxin",
        content() {
            "step 0";
            var cards = target.getCards("h");
            var next = player.chooseToMove_new("攻心");
            next.set("list", [
                [get.translation(target) + "的手牌", cards],
                [["弃置"], ["置于牌堆顶"]],
            ]);
            next.set("filterOk", moved => {
                return (
                    moved[1]
                        .slice()
                        .concat(moved[2])
                        .length == 1
                );
            });
            next.set("filterMove", (from, to, moved) => {
                if (moved[0].includes(from.link) && moved[1].length + moved[2].length >= 1 && [1, 2].includes(to)) {
                    return false;
                }
                return true;
            });
            next.set("processAI", list => {
                let card = list[0][1]
                    .slice()
                    .filter(card => {
                        return get.suit(card) == "heart";
                    })
                    .sort((a, b) => {
                        return get.value(b) - get.value(a);
                    })[0];
                if (!card) {
                    return false;
                }
                return [list[0][1].slice().remove(card), [card], []];
            });
            "step 1";
            if (result.bool) {
                if (result.moved[1].length) {
                    target.discard(result.moved[1]);
                } else {
                    player.showCards(result.moved[2], get.translation(player) + "对" + get.translation(target) + "发动了【攻心】");
                    target.lose(result.moved[2], ui.cardPile, "visible", "insert");
                }
            }
        },
    },
    //余翻
    olzongxuan_enhance:{
        inherit:"olzongxuan",
        audio: "olzongxuan",
        getCards(event, player) {
            let cards = [];
            for (const target of [player, player.getPrevious(),player.getNext()]) {
                const evt = event.getl(target);
                if (evt && evt.cards2 && evt.cards2.some(i => get.position(i) == "d")) {
                    if (
                        target == player ||
                        target
                            .getHistory("lose", evt => {
                                return evt.type == "discard" && evt.getlx !== false;
                            })
                            .indexOf(event) == 0
                    ) {
                        cards.addArray(evt.cards2.filter(i => get.position(i) == "d"));
                    }
                }
            }
            return cards;
        },
        filter(event, player) {
            if (event.type != "discard" || event.getlx === false) {
                return false;
            }
            return get.info("olzongxuan_enhance").getCards(event, player).length;
        },
        check(event, player) {
            if (event.getParent(3).name != "phaseDiscard") {
                return false;
            }
            const cards = get.info("olzongxuan_enhance").getCards(event, player);
            return game.hasPlayer(target => {
                if (cards.some(i => get.type(i, null, target) == "equip") && (get.attitude(player, target) > 0 || get.recoverEffect(target, player, player) > 0)) {
                    return true;
                }
                if (cards.some(i => get.type(i, null, target) != "equip") && target.getHp() >= player.getHp() && get.effect(target, { name: "losehp" }, player, player) > 0) {
                    return true;
                }
                return false;
            });
        },
        async content(event, trigger, player) {
            const 
               { bool, moved }
             = await player
                .chooseToMove("纵玄：将任意张牌置于牌堆顶", false)
                .set("list", [["本次弃置的牌", get.info("olzongxuan_enhance").getCards(trigger, player)], ["牌堆顶"]])
                .set("filterOk", moved => moved[1].length)
                .set("processAI", list => {
                    const player = get.event().player;
                    const cards = list[0][1].slice(),
                        cards2 = cards.filter(card => {
                            return game.hasPlayer(target => {
                                if (get.type(card, null, target) == "equip" && (get.attitude(player, target) > 0 || get.recoverEffect(target, player, player) > 0)) {
                                    return true;
                                }
                                if (get.type(card, null, target) != "equip" && target.getHp() >= player.getHp() && get.effect(target, { name: "losehp" }, player, player) > 0) {
                                    return true;
                                }
                                return false;
                            });
                        }),
                        cards3 = cards2.length ? cards2.randomGet() : cards.randomGet();
                    return [[], [cards3]];
                }).forResult();
            if (bool) {
                let cards = moved[1].slice();
                game.log(player, "将", cards, "置于了牌堆顶");
                while (cards.length) {
                    ui.cardPile.insertBefore(cards.pop().fix(), ui.cardPile.firstChild);
                }
            }
        },

    },
    olzhiyan_enhance:{
        inherit:"olzhiyan",
        audio: "olzhiyan",
        filter(event, player) {
            return event.player == player || [player.getPrevious(),player.getNext()].includes(event.player);
        },
        async content(event, trigger, player) {
            const 
                { bool, targets }
             = await player
                .chooseTarget(get.prompt2("olzhiyan_enhance"))
                .set("ai", target => {
                    const player = get.event().player,
                        cards = get.event().cards;
                    if (!cards.length) {
                        return 0;
                    }
                    const card = cards[0],
                        att = get.attitude(player, target);
                    if (get.type(card, null, target) == "equip" && (get.attitude(player, target) > 0 || get.recoverEffect(target, player, player) > 0)) {
                        return get.recoverEffect(target, player, player) * 20 + att / 114514;
                    }
                    if (get.type(card, null, target) != "equip") {
                        if (target.getHp() !== player.getHp()) {
                            return get.effect(target, { name: "losehp" }, player, player) * 20 - att / 114514;
                        }
                        return get.effect(target, { name: "draw" }, player, player);
                    }
                    return 0;
                })
                .set("cards", Array.from(ui.cardPile.childNodes || []) || [])
                .forResult();
            if (bool) {
                const target = targets[0];
                player.logSkill("olzhiyan_enhance", target);
                const result = (await target.draw("visible").forResult()).cards;
                if (result) {
                    const card = result[0];
                    if (get.type(card, null, target) == "equip") {
                        if (target.getCards("h").includes(card) && target.hasUseTarget(card)) {
                            const 
                               { bool }
                             = await target.chooseUseTarget(card, true, "nopopup").forResult();
                            if (bool) {
                                await target.recover();
                                await target.draw();
                            }
                        }
                    } else if (target.getHp() !== player.getHp()) {
                        await target.loseHp();
                    }
                }
            }
        },
    },
    //吕蒙
    gongxin_enhance2:{
        inherit:"gongxin",
        audio: "gongxin",
        content() {
            "step 0";
            var cards = target.getCards("h");
            var next = player.chooseToMove_new("攻心");
            next.set("list", [
                [get.translation(target) + "的手牌", cards],
                [["弃置"], ["置于牌堆顶"]],
            ]);
            next.set("filterOk", moved => {
                return (
                    moved[1]
                        .slice()
                        .concat(moved[2])
                        .filter(card => get.suit(card) == "heart").length == 1
                );
            });
            next.set("filterMove", (from, to, moved) => {
                if (moved[0].includes(from.link) && moved[1].length + moved[2].length >= 1 && [1, 2].includes(to)) {
                    return false;
                }
                return get.suit(from) == "heart";
            });
            next.set("processAI", list => {
                let card = list[0][1]
                    .slice()
                    .filter(card => {
                        return get.suit(card) == "heart";
                    })
                    .sort((a, b) => {
                        return get.value(b) - get.value(a);
                    })[0];
                if (!card) {
                    return false;
                }
                return [list[0][1].slice().remove(card), [card], []];
            });
            "step 1";
            if (result.bool) {
                if (result.moved[1].length) {
                    target.discard(result.moved[1]);
                } else {
                    player.showCards(result.moved[2], get.translation(player) + "对" + get.translation(target) + "发动了【攻心】");
                    target.lose(result.moved[2], ui.cardPile, "visible", "insert");
                }
            }
            "step 2";
            player.draw();
        },
    },
    //羊湖
    chongxin_enhance:{
        inherit:"chongxin",
        filterCard: function(card, player, event) {
            event = event || _status.event;
            if (typeof event != "string") {
              event = event.getParent().name;
            }
            var mod = game.checkMod(card, player, event, "unchanged", "cardDiscardable", player);
            if (mod != "unchanged") {
              return mod;
            }
            return true;
        },
        async content(event, trigger, player){
            const { cards, target } = event;
            await player.discard(cards);
            await player.draw();
            
            if (!target.getDiscardableCards(player, "he", () => true)) {
                return;
            }
            const  result  = await target.chooseToDiscard(1,"he", true,"请弃置一张牌，然后摸一张牌").set("ai", card => {
                return 8 - get.value(card);
            }).forResult();
            if (result?.bool && result?.cards?.length) {
                await target.draw();
            }
        },
        ai: {
            order: 6,
            result: {
                player: 1,
                target(player, target) {
                    return 0.5 * Math.sqrt(Math.min(3, target.countCards("h")));
                },
            },
        },

    },
    //谋姜维
    ranji_enhance:{
        inherit:"olsbranji",
        audio: "olsbranji",
        prompt2(event, player) {
            var str = "获得技能";
            var num = lib.skill.olsbranji.getNum(player);
            if (num >= player.getHp()) {
                str += "【困奋】";
            }
            if (num == player.getHp()) {
                str += "和";
            }
            if (num <= player.getHp()) {
                str += "【诈降】";
            }
            str += "，然后";
            var num1 = player.countCards("h") - player.getHandcardLimit();
            if (num1 || player.isDamaged()) {
                if (num1) {
                    str += num1 < 0 ? "摸" + get.cnNumber(-num1) + "张牌" : "弃置" + get.cnNumber(num1) + "张牌";
                }
                if (num1 && player.isDamaged()) {
                    str += "或";
                }
                if (player.isDamaged()) {
                    str += "回复" + player.getDamagedHp() + "点体力";
                }
            }
            return str;
        },
        async content(event, trigger, player) {
            player.awakenSkill(event.name);
            var num = lib.skill.olsbranji.getNum(player);
            const skills = [];
            if (num >= player.getHp()) {
                skills.push("kunfen");
                player.storage.kunfen = true;
            }
            if (num <= player.getHp()) {
                skills.push("zhaxiang");
            }
            player.addSkills(skills);
            if (player.countCards("h") != player.getHandcardLimit() || player.isDamaged()) {
                var result,
                    num1 = player.countCards("h") - player.getHandcardLimit();
                if (!num1) {
                    result = { index: 1 };
                } else if (player.isHealthy()) {
                    result = { index: 0 };
                } else {
                    result = await player
                        .chooseControl("手牌数", "体力值")
                        .set("choiceList", [num1 < 0 ? "摸" + get.cnNumber(-num1) + "张牌" : "弃置" + get.cnNumber(num1) + "张牌", "回复" + player.getDamagedHp() + "点体力"])
                        .set("ai", () => {
                            var player = _status.event.player;
                            var list = _status.event.list;
                            var num1 = get.effect(player, { name: "draw" }, player, player);
                            var num2 = get.recoverEffect(player, player, player);
                            return num1 * list[0] > num2 * list[1] ? 0 : 1;
                        })
                        .set("list", [-num1, player.getDamagedHp()])
                        .forResult();
                }
                if (result.index == 0) {
                    if (num1 < 0) {
                        await player.drawTo(player.getHandcardLimit());
                    } else {
                        await player.chooseToDiscard(num1, "h", true, "allowChooseAll");
                    }
                } else {
                    await player.recover(player.maxHp - player.hp);
                }
            }
        },
    },
    //甄姬
    luoshen_enhance:{
        trigger: {
            player: ["loseAfter"],
            global:"roundStart",
            //global: ["equipAfter","addJudgeAfter","gainAfter","loseAsyncAfter","addToExpansionAfter","roundStart"],
        },
        audio:"luoshen",
        frequent: true,
        filter(event, player,name) {
            if (player.countMark("luoshen_enhance_used") >= 2) {
                return false;
            }
            if(name == "roundStart") {
                return game.roundNumber === 1&&!player.hasCard(function (card) {
                    return card.hasGaintag("luoshen_enhance");
                }, "h");
                
            }
            return !player.hasCard(function (card) {
                return card.hasGaintag("luoshen_enhance");
            }, "h");
        },
        
        content() {
            "step 0";
            player.addTempSkill("luoshen_enhance_used","roundStart");
            player.addMark("luoshen_enhance_used", 1, false);
            event.cards = [];
            "step 1";
            var next = player.judge(function (card) {
                var color = get.color(card);
                var evt = _status.event.getParent("luoshen_enhance");
                if (evt) {
                    if (!evt.color) {
                        evt.color = color;
                    } else if (evt.color != color) {
                        return -1;
                    }
                }
                return 1;
            });
            next.judge2 = function (result) {
                return result.bool;
            };
            if (get.mode() != "guozhan" && !player.hasSkillTag("rejudge")) {
                next.set("callback", function () {
                    if (get.position(card, true) == "o") {
                        player.gain(card, "gain2").gaintag.add("luoshen_enhance");;
                    }
                });
            } else {
                next.set("callback", function () {
                    event.getParent().orderingCards.remove(card);
                });
            }
            "step 2";
            if (result.judge > 0) {
                event.cards.push(result.card);
                player.chooseBool("是否再次发动【洛神】？").set("frequentSkill", "luoshen_enhance");
            } else {
                for (var i = 0; i < event.cards.length; i++) {
                    if (get.position(event.cards[i], true) != "o") {
                        event.cards.splice(i, 1);
                        i--;
                    }
                }
                if (event.cards.length) {
                    player.gain(event.cards, "gain2").gaintag.add("luoshen_enhance");;
                }
                event.finish();
            }
            "step 3";
            if (result.bool) {
                event.goto(1);
            } else {
                if (event.cards.length) {
                    player.gain(event.cards, "gain2").gaintag.add("luoshen_enhance");;
                }
            }
        },
        subSkill:{
            used:{
                mod: {
                    ignoredHandcard(card, player) {
                        if (card.hasGaintag("luoshen_enhance")) {
                            return true;
                        }
                    },
                    cardDiscardable(card, player, name) {
                        if (name == "phaseDiscard" && card.hasGaintag("luoshen_enhance")) {
                            return false;
                        }
                    },
                },
                onremove(player) {
                    player.removeGaintag("luoshen_enhance");
                    delete player.storage.luoshen_enhance_used;
                },
                charlotte: true,
                sub: true,
                sourceSkill: "luoshen_enhance",
                "_priority": 0,
            }

        },

    },
    //sp张郃
    zhouxuan_enhance:{
        inherit:"spolzhouxuan",
        audio:"spolzhouxuan",
        filter(event, player) {
            if ([`phaseDraw`,`phaseDiscard`].includes(event.name)) {
                return player.countCards("h") && player.getExpansions("zhouxuan_enhance").length < 5;
            }
            return player.countExpansions("zhouxuan_enhance");
        },
        async cost(event, trigger, player) {
            if (![`phaseDraw`,`phaseDiscard`].includes(trigger.name)) {
                event.result = { bool: true };
            } else {
                event.result = await player
                    .chooseCard("h", get.prompt(event.skill), [1, 5 - player.countExpansions(event.skill)], `将至多${get.cnNumber(5 - player.countExpansions(event.skill))}张手牌置于武将牌上`)
                    .set("allowChooseAll", true)
                    .set("ai", card => {
                        const player = get.player();
                        if (ui.selected.cards.length >= player.needsToDiscard()) {
                            return 6 - get.value(card);
                        }
                        return 100 - get.useful(card);
                    })
                    .forResult();
            }
        },
        async content(event, trigger, player) {
            if ([`phaseDraw`,`phaseDiscard`].includes(trigger.name)) {
                const next = player.addToExpansion(event.cards, player, "give");
                next.gaintag.add("zhouxuan_enhance");
                await next;
            } else if (trigger.name == "useCard") {
                await player.loseToDiscardpile(player.getExpansions("zhouxuan_enhance").randomGet());
                let num = player.countExpansions("zhouxuan_enhance")+1;
               
                await player.draw(num);
            } else {
                await player.loseToDiscardpile(player.getExpansions("zhouxuan_enhance"));
            }
        },

    },
    //诸葛恪
    aocai_enhance:{
        inherit:"aocai",
        audio: "aocai",
        audioname: ["gz_zhugeke"],
        async content(event, trigger, player) {
            const evt = event.getParent(2);
            const cards = get.cards(4, true);
            const cardsx = cards.slice().map(card => {
                const cardx = ui.create.card();
                cardx.init(get.cardInfo(card));
                cardx._cardid = card.cardid;
                return cardx;
            });
            evt.set("aocai", true);
            player.directgains(cardsx, null, "aocai_hs");
            const result = await player
                .chooseCard(
                    "傲才：选择要" + (evt.name == "chooseToUse" ? "使用" : "打出") + "的牌",
                    (card, player) => {
                        return get.event().cards.includes(card);
                    },
                    "s"
                )
                .set(
                    "cards",
                    cardsx.filter(card => {
                        if (player.hasSkill("aozhan") && card.name == "tao") {
                            return (
                                evt.filterCard(
                                    {
                                        name: "sha",
                                        isCard: true,
                                        cards: [card],
                                    },
                                    evt.player,
                                    evt
                                ) ||
                                evt.filterCard(
                                    {
                                        name: "shan",
                                        isCard: true,
                                        cards: [card],
                                    },
                                    evt.player,
                                    evt
                                )
                            );
                        }
                        return evt.filterCard(card, evt.player, evt);
                    })
                )
                .set("ai", card => {
                    if (get.type(card) == "equip") {
                        return 0;
                    }
                    const evt = get.event().getParent(3),
                        player = get.event().player;
                    if (evt.type == "phase" && !player.hasValueTarget(card, null, true)) {
                        return 0;
                    }
                    if (evt && evt.ai) {
                        const tmp = _status.event;
                        _status.event = evt;
                        const result = (evt.ai || event.ai1)(card, player, evt);
                        _status.event = tmp;
                        return result;
                    }
                    return 1;
                })
                .forResult();
            let card;
            if (result.bool) {
                card = cards.find(card => card.cardid === result.cards[0]._cardid);
            }
            const cards2 = player.getCards("s", card => card.hasGaintag("aocai_hs"));
            if (player.isOnline2()) {
                player.send(
                    (cards, player) => {
                        cards.forEach(i => i.delete());
                        if (player == game.me) {
                            ui.updatehl();
                        }
                    },
                    cards2,
                    player
                );
            }
            cards2.forEach(i => i.delete());
            if (player == game.me) {
                ui.updatehl();
            }
            if (card) {
                let name = card.name,
                    aozhan = player.hasSkill("aozhan") && name == "tao";
                if (aozhan) {
                    name = evt.filterCard(
                        {
                            name: "sha",
                            isCard: true,
                            cards: [card],
                        },
                        evt.player,
                        evt
                    )
                        ? "sha"
                        : "shan";
                }
                if (evt.name == "chooseToUse") {
                    game.broadcastAll(
                        (result, name) => {
                            lib.skill.aocai_backup.viewAs = { name: name, cards: [result], isCard: true };
                        },
                        card,
                        name
                    );
                    evt.set("_backupevent", "aocai_backup");
                    evt.set("openskilldialog", "请选择" + get.translation(card) + "的目标");
                    evt.backup("aocai_backup");
                } else {
                    delete evt.result.used;
                    delete evt.result.skill;
                    evt.result.card = get.autoViewAs(card);
                    if (aozhan) {
                        evt.result.card.name = name;
                    }
                    evt.result.cards = [card];
                    evt.redo();
                    return;
                }
            }
            evt.goto(0);
        },
    },
    shuyouDIY:{
        trigger:{player:"aocai_enhanceBegin"},
        usable:1,
        async content(event,trigger,player){
            await player.chooseToGuanxing(4).set("prompt", "叔佑：点击或拖动将牌移动到牌堆顶或牌堆底");
           
        }
    },
    //朱治
    anguo_enhance:{
        enable:"phaseUse",
        audio:"anguo",
        usable:1,
        filterTarget:true,
        selectTarget:1,
        async content(event, trigger, player){
            var target=event.target;
            var equip = get.cardPile(
                function (card) {
                    return get.type(card) == "equip" && target.hasUseTarget(card);
                },
                false,
                "random"
            );
            if (equip) {
                await target.chooseUseTarget(equip, true);
            }
            await target.recover();
            await target.draw();
            

        },
        ai:{
            order:10,
            result:{
                player(player, target) {
                    return get.attitude(player, target);
                },
            }
        }
    },

    //周妃
    olliangyin_enhance:{
        inherit:"olliangyin",
        audio:"liangyin",
        usable: Infinity,
    },
    zhoufei_enhance:{
        global:"zhoufei_enhance_effect",
        audio:"dclingkong",
        subSkill:{
            effect:{
                enable:"phaseUse",
                usable:1,
                audio:"dclingkong",
                filter(event, player) {
                    return (
                        player.countCards("he") &&
                        game.hasPlayer(function (current) {
                            return current.hasSkill("olliangyin_enhance");
                        })
                    );
                },
                delay: false,
                filterCard: true,
                selectCard: 1,
                discard: false,
                lose: false,
                position: "he",
                prompt() {
                    return `出牌阶段限一次，你可以将一张牌置入"箜"`;
                },
                check(card) {
                    if (card.name == "sha") {
                        return 5;
                    }
                    return 8 - get.value(card);
                },
                async content(event, trigger, player){
                    var target = game.findPlayer(function (current) {
                        return current.hasSkill("olliangyin_enhance");
                    });
                    if(target){
                        const next = target.addToExpansion(event.cards, player, "give");
                        next.gaintag.add("olkongsheng");
                        await next;
                    }
                },
                ai:{
                    order: 10,
                    result: {
                        player(player, target) {
                            var target = game.findPlayer(function (current) {
                                return current.hasSkill("zhoufei_enhance");
                            });
                            if (target) {
                                return get.attitude(player, target);
                            }
                        },
                    },

                }
                
            }
        }
    },
    //刘焉
    liuyan_enhance:{
        enable: "phaseUse",
        limited: true,
        filter(event, player){
            return player.countCards("h") > 0&&player.canUse({name:"taoyuan"},player);
        },
        async content(event, trigger, player){
            await player.awakenSkill("liuyan_enhance");
            await player.chooseUseTarget(true, { name: "taoyuan" },player.getCards("h"));
        }
    },
    //陈登
    xuanhui_enhance:{
        inherit:"olxuanhui",
        async content(event, trigger, player) {
            for (const target of event.targets) {
                const list = ["draw", "sha"];
                for (const effect of list) {
                    const skill = `olfengji_${effect}`;
                    if (typeof player.storage[skill] != "number") {
                        continue;
                    }
                    if (typeof target.storage[skill] != "number") {
                        continue;
                    }
                    const num = player.storage[skill];
                    player.storage[skill] = target.storage[skill];
                    target.storage[skill] = num;
                    target.markSkill(skill);
                    player.markSkill(skill);
                    game.log(player, "与", target, "交换了", `#g【丰积·${effect == "draw" ? "摸牌" : "出杀"}】`, "的数值");
                }
            }
        },
    },
    //孙尚香
    xiaoji_enhance:{
        global:"xiaoji_enhance_effect",
        audio:"xiaoji",
        audioname: ["sp_sunshangxiang","re_sunshangxiang"],
        subSkill:{
            effect:{
                trigger: {
                    global: ["loseAfter","equipAfter","addJudgeAfter","gainAfter","loseAsyncAfter","addToExpansionAfter"],
                },
                audio:"xiaoji",
                audioname: ["sp_sunshangxiang","re_sunshangxiang"],
                popup: false,
                
                getIndex(event, player) {
                    const me=game.findPlayer(current=>current.hasSkill("xiaoji_enhance"));
                    if(!me) return false;
                    const evt = event.getl(player);
                    if (evt && evt.player === player && evt.es) {
                        return evt.es.length;
                    }
                    return false;
                },
                prompt2(event,player){
                    const me=game.findPlayer(current=>current.hasSkill("xiaoji_enhance"));
                    return `你可以与${get.translation(me)}各摸一张牌`;
                },
                check(event, player) {
                    var target = game.findPlayer(function (current) {
                        return current.hasSkill("xiaoji_enhance");
                    });
                    const att=get.attitude(player, target);
                    return att;
                },
                async content(event, trigger, player) {
                    
                    const me=game.findPlayer(current=>current.hasSkill("xiaoji_enhance"));
                    if(me){
                        me.logSkill(`xiaoji`,player);
                        await player.line(me);
                        game.asyncDraw([player,me]);

                    }
                    
                    
                },

            }
        }

    },
    rejieyin_enhance:{
        inherit:"rejieyin",
        audio:"rejieyin",
        filterTarget(card, player, target) {
            var card = ui.selected.cards[0];
            if (!card) {
                return false;
            }
            if (get.position(card) == "e" && !target.canEquip(card,true)) {
                return false;
            }
            return target!=player;
        },
        content() {
            "step 0";
            if (get.position(cards[0]) == "e") {
                event._result = { index: 0 };
            } else if (get.type(cards[0]) != "equip" || !target.canEquip(cards[0])) {
                event._result = { index: 1 };
            } else {
                player.chooseControl().set("choiceList", ["将" + get.translation(cards[0]) + "置入" + get.translation(target) + "的装备区", "交给其" + get.translation(cards[0])]).ai = function () {
                    return 1;
                };
            }
            "step 1";
            if (result.index == 0) {
                player.$give(cards, target, false);
                target.equip(cards[0]);
            } else {
                player.give(cards,target);
            }
            "step 2";
            if(player.hp==target.hp){
                if(target.isDamaged()) target.recover();
                if(player.isDamaged()) player.recover();
                player.draw();
                target.draw();
                event.finish();
            }
            "step 3";
            if (player.hp > target.hp) {
                player.draw();
                if (target.isDamaged()) {
                    target.recover();
                }
            } else if (player.hp < target.hp) {
                target.draw();
                if (player.isDamaged()) {
                    player.recover();
                }
            }
        },
    },
    //吴国太
    olbuyi_enhance:{
        inherit:"olbuyi",
        audio:"olbuyi",
        async content(event, trigger, player) {
            const target = trigger.player;
            await player.showCards(event.cards, get.translation(player) + "对" + (player == target ? "自己" : get.translation(target)) + "发动了【补益】");
            if (get.type(event.cards[0]) != "basic") {
                await target.discard(event.cards[0]);
                await target.recover();
            }
            else {
                await target.draw();
            }
        },
    },
    //巨兽大人   md费老劲了

    jianying_enhance:{
        audio: "xinjianying",
        init(player) {
            player.addSkill("jianying_enhance_mark");
        },
        onremove(player) {
            player.removeSkill("jianying_enhance_mark");
        },
        trigger: {
            player: "useCard",
        },
        filter(event, player) {
            const history = player.getAllHistory("useCard"),
                index = history.indexOf(event);
            return index >= 1;
        },
        locked: false,
        async cost(event, trigger, player) {
            const history = player.getAllHistory("useCard"),
                index = history.indexOf(trigger);
            if (index < 1) {
                return;
            }
            const number = get.number(trigger.card) === get.number(history[index - 1].card);
            const suit = get.suit(trigger.card,player) === get.suit(history[index - 1].card,player);
            if (number||suit) {
                const result = await player
                    .chooseButton([
                        get.prompt2(event.skill),
                        [
                            [
                                ["draw", `摸一张牌`],
                                ["noCount", `令${get.translation(trigger.card)}不计入次数`],
                            ],
                            "textbutton",
                        ],
                    ])
                    .set("ai", button => {
                        if (button.link == "draw") {
                            return 2;
                        }
                        if (button.link == "noCount") {
                            const usable = get.player().getCardUsable(get.event().getTrigger().card);
                            if (usable > 0) {
                                return 1.5;
                            }
                            return 2.5;
                        }
                    })
                    .forResult();
                if (result?.links?.length) {
                    event.result = {
                        bool: true,
                        cost_data: result.links[0],
                    };
                }
            }
        },
        async content(event, trigger, player) {
            const link = event.cost_data;
            if (link == "draw") {
                await player.draw(1);
            }
            if (link == "noCount") {
                if (trigger.addCount !== false) {
                    trigger.addCount = false;
                    const stat = player.getStat().card,
                        name = trigger.card.name;
                    if (typeof stat[name] === "number") {
                        stat[name]--;
                    }
                }
            }
        },
        group:"jianying_enhance_yinpai",
        subSkill:{
            mark:{
                init(player, skill) {
                    const history = player.getAllHistory("useCard"),
                        length = history.length;
                    if (!length) {
                        return;
                    }
                    const card = history[length - 1].card;
                    player.storage[skill] = card;
                    player.markSkill(skill);
                    game.broadcastAll(
                        function (player, suit) {
                            if (player.marks.jianying_enhance_mark) {
                                player.marks.jianying_enhance_mark.firstChild.innerHTML = get.translation(suit);
                            }
                        },
                        player,
                        get.suit(card,player)
                    );
                    player.addTip(skill, "渐营 " + get.translation(get.suit(card, player)) + get.translation(get.strNumber(get.number(card, player))),false);
                },
                onremove(player, skill) {
                    delete player.storage[skill];
                    player.removeTip(skill);
                },
                intro: {
                    markcount(storage, player) {
                        return get.number(storage);
                    },
                    content(storage, player) {
                        let str = "";
                        str += `<li>花色：${get.translation(get.suit(storage,player))}`;
                        str += `<br><li>点数：${get.number(storage)}`;
                        return str;
                    },
                },
                silent: true,
                trigger: {
                    player: "useCard1",
                },
                content() {
                    lib.skill[event.name].init(player, event.name);
                },
                mod: {
                    aiOrder(player, card, num) {
                        if (typeof card == "object") {
                            var evt = player.storage[`jianying_enhance_mark`]
                            if (!evt || !evt.card) {
                                return num;
                            }
                            if ((get.suit(evt.card) && get.suit(evt.card) == get.suit(card)) || (evt.card.number && evt.card.number == get.number(card))) {
                                return num + 10;
                            }
                        }
                    },
                },
            },
            yinpai:{
                enable: "phaseUse",
                audio:"xinjianying",
                filter(event, player) {
                    if(player.hasSkill(`jianying_enhance_used`)) return false;
                    if (!player.countCards("he")) {
                        return false;
                    }
                    for (var i of lib.inpile) {
                        if (i != "du" && get.type(i, null, false) == "basic") {
                            if (event.filterCard({ name: i }, player, event)) {
                                return true;
                            }
                            if (i == "sha") {
                                for (var j of lib.inpile_nature) {
                                    if (event.filterCard({ name: i, nature: j }, player, event)) {
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                    return false;
                },
                direct: true,
                async content(event,trigger,player) {
                    var list = [];
                    const numbers = Array.from({ length: 13 }).map((_, i) => get.strNumber(i + 1));
                    for (var i of lib.inpile) {
                        if (i != "du" && get.type(i, null, false) == "basic") {
                            if (event.getParent(2).filterCard({ name: i }, player, event.getParent(2))) {
                                list.push(["基本", "",i]);
                            }
                            if (i == "sha") {
                                for (var j of lib.inpile_nature) {
                                    if (event.getParent(2).filterCard({ name: i, nature: j }, player, event.getParent(2))) {
                                        list.push(["基本",``,i, j]);
                                    }
                                }
                            }
                        }
                    }
                    if(!list.length) return;
                    const result=await player.chooseButton(
                        [
                            '<div class="text center">'+"得胜已是定局" +"</div>",
                            [list, "vcard"]
                            ,
                            [
                                lib.suit
                                    .slice()
                                    .reverse()
                                    .map(i => [i, get.translation(i)]),
                                "tdnodes",
                            ],
                            [numbers, "tdnodes"],
                    
                    
                        ],
                        3
                    )
                    .set("filterButton", button => {
                        return !ui.selected.buttons.some(but => {
                            return [get.event().cardL, lib.suit, get.event().numbers].some(list => list.includes(but.link) && list.includes(button.link));
                        });
                    })
                    .set("numbers",numbers)
                    .set("cardL",list)
                    .forResult();
                    if (result.bool) {
                       
                        
                        const detial = result.links.sort((a, b) => {
                            return lib.suit.includes(a) + (numbers.includes(a) ? 2 : 0) - (lib.suit.includes(b) + (numbers.includes(b) ? 2 : 0));
                        });// 牌  花色 点数
                        console.log(detial);
                        var card={name:detial[0][2],nature:detial[0][3]||"",suit:detial[1],number:get.numString(detial[2])};
                        game.broadcastAll(function(card){
                            
                            lib.skill.spolzhubei_backup.viewAs = {
                                name: card.name,
                                nature: card.nature,
                                suit: card.suit,
                                number: card.number,
                            };
                            lib.skill.spolzhubei_backup.selectCard =1;
                        },card);

                        var next=player.chooseToUse();
                        next.set("openskilldialog", `渐营：将一张牌当作${get.translation(card.name)}使用`);
                        next.set("_backupevent",`spolzhubei_backup`);
                        next.backup("spolzhubei_backup");
                        var r2=await next.forResult();
                        if(r2.bool){
                            //await player.logSkill("xinjianying");
                            await player.addTempSkill("jianying_enhance_used");

                        }




                        /*
                        var r2=await player.chooseCard("he", `将一张牌当作${get.translation(detial[1])+get.translation(detial[2])+(get.translation(detial[0][3]||"")+get.translation(detial[0][2]))}`,false).forResult();
                        if(r2.bool){
                            var card={name:detial[0][2],nature:detial[0][3]||"",suit:detial[1],number:get.numString(detial[2])};
                            
                            await player.addTempSkill("jianying_enhance_used");
                            await player.chooseUseTarget(true,card,r2.cards);
                            await player.logSkill("xinjianying");
                        }*/

                    }
                     
                },
            },
            used:{
                charlotte: true,
                "_priority": 0,
            }
        },
        
    },

    //潘俊
    guanwei_enhance:{
        trigger: {
            global: "phaseUseEnd",
        },
        usable: 1,
        audio:"xinfu_guanwei",
        filter(event, player) {
            return player.countCards("he") > 0;
        },
        check(event, player) {
            return get.attitude(player, event.player);
        },
        async cost(event, trigger, player) {
            const { player: target } = trigger;
            event.result = await player
                .chooseToDiscard("he", get.prompt(event.name.slice(0, -5), target), "弃置一张牌，令其摸两张牌并进行一个额外的出牌阶段。")
                .set("ai", card => {
                    const { player, targetx } = get.event();
                    if (get.attitude(player, targetx) < 1) {
                        return 0;
                    }
                    return 9 - get.value(card);
                })
                .set("targetx", target)
                .forResult();
        },
        logTarget: "player",
        async content(event, trigger, player) {
            const { player: target } = trigger;
            player.line(target, "green");
            await target.draw(2);
            const evt = trigger.getParent("phase", true);
            if (evt) {
                evt.phaseList.splice(evt.num + 1, 0, `phaseUse|${event.name}`);
            }
        },
        ai: {
            expose: 0.5,
        },
    },
    //韩遂
    olniluan_enhance:{
        trigger:{
            global: "phaseJieshuBegin",
        },
        audio:"niluan",
        filter(event, player) {
            return event.player.getHistory("useCard", card => card.card.name == "sha").length;
        },
        
        async cost(event, trigger, player){
            //event.result=await player.chooseControl("视为对其使用一张【杀】", "令其摸两张牌").forResultControl();
            var choice=["令其摸两张牌","cancel2"];
            if(trigger.player!=player) choice.unshift("视为对其使用一张【杀】");
            const control = (await player
            .chooseControl(choice)
            .set("ai",function(){
                const controls=get.event().controls;
                if (controls.includes("视为对其使用一张【杀】")) {
                    if(!get.attitude(player,trigger.player)) return "视为对其使用一张【杀】";
                }
                const att=get.attitude(player,trigger.player);
                return att>0?"令其摸两张牌":"视为对其使用一张【杀】";
            })
            .forResult()).control;
            if (control === "cancel2") {
                event.result = { bool: false };
            } else {
                event.result = {
                    bool: true,
                    cost_data: control,
                };
            }
        },
        async content(event, trigger, player){
            if(event.cost_data=="令其摸两张牌"){
                await trigger.player.draw(2);
            }
            else{
                await player.useCard({ name: "sha" }, trigger.player);
            }
        }

    },
    //柯比能
    olpingduan_enhance:{
        inherit: "olpingduan",
        audio:"olpingduan",
        async content(event, trigger, player) {
            const target = event.targets[0],
                str = player != target ? `###${get.translation(player)}对你发动了【平端】###` : `###平端###`;
            const use = (await target
                .chooseToUse(function (card, player, event) {
                    return get.type(card) == "basic" && lib.filter.cardEnabled.apply(this, arguments);
                }, str + `你可以使用一张基本牌，然后摸一张牌`)
                .set("addCount", false)
                .forResult()).bool;
            if (!use) {
                return;
            }
            await target.draw();
            if (!target.countCards("he", card =>player.canRecast(card, player))) {
                return;
            }
            const cards = (await target
                .chooseCard(
                    "he",
                    (card, player) => {
                        return player.canRecast(card, player);
                    },
                    str + `你可以重铸一张牌，然后摸一张牌`
                )
                .set("ai", card => 11 - get.value(card))
                .forResult()).cards;
            if (!cards || !cards.length) {
                return;
            }
            await target.recast(cards);
            await target.draw();
            if (!target.countGainableCards(player, "e")) {
                return;
            }
            const result = await target
                .chooseToGive(str + `你可以交给${get.translation(player)}你装备区的一张牌，然后摸一张牌`, player, "e")
                .set("ai", card => {
                    if (get.attitude(get.player(), get.event().target) > 0) {
                        return get.value(card);
                    }
                    return 0;
                })
                .set("target", player)
                .forResult();
            if (!result.bool) {
                return;
            }
            await target.draw();
        },
        

    },
    //凌操
    dujin_enhance:{
        inherit: "dujin",
        audio:"dujin",
        content:function(){
            trigger.num+=1+player.countCards('e');
        },
        mod:{
            maxHandcardBase:function(player,num){
                return num+1+player.countCards('e');
            },
        },
    },
    //刘赞
    liji_enhance:{
        trigger:{
            player: "gainBegin",
        },
        forced:true,
        silent:true,
        filter:function (event, player) {
            return _status.currentPhase == player;
        },
        async content(event, trigger,player){
            await trigger.gaintag.add('liji_enhance');
            player
                .when({ player: "phaseEnd" })
                .step(async (event, trigger, player) => {
                    await player.removeGaintag("liji_enhance");
                });
        },
        mod: {
            ignoredHandcard(card, player) {
                if (card.hasGaintag("liji_enhance")) {
                    return true;
                }
            },
            cardDiscardable(card, player, name) {
                if (name == "phaseDiscard" && card.hasGaintag("liji_enhance")) {
                    return false;
                }
            },
        },
        
       

        

    },

    //岑昏
    lianhuoRE:{
        trigger:{
            player:"damageBegin1",
        },
        audio:"lianhuo",
        forced:true,
        async content(event, trigger, player){
            if(!player.isLinked()){
                trigger.num-=1;
                await player.link();
            }else{
                trigger.num+=1;
                game.setNature(trigger, "fire");
            }
        }
    },
    jisheRE:{
        trigger:{
            player:"useCardToPlayered",
        },
        audio:"jishe",
        filter(event,player){
            return event.targets.length==1&&!player.getStorage("jisheRE_mark").includes(event.target);
        },
        async content(event, trigger, player){
            await player.draw();
            await trigger.target.link();
            await player.addTempSkill("jisheRE_mark");
            await player.markAuto("jisheRE_mark", [trigger.target]);
        },
        subSkill:{
            mark:{
                charlotte:true,
                onremove: true,
                /*
                onremove:function(player,skill){
                    delete player.storage.skill;
                },*/
            }
        }
    },

    //全琮
    yaomingRE:{
        trigger: {
            player: ["damageEnd","phaseZhunbeiBegin"],
            source: "damageSource",
        },
        audio:"sbyaoming",
        async cost(event, trigger, player){
            const choiceList=["令一名角色摸一张牌","弃置一名角色一张牌"];
            const result = await player
            .chooseControl("cancel2")
            .set("prompt", "邀名：请选择一项")
            .set("choiceList", choiceList)
            .set("ai",function(){
                return 0;
            })
            .forResult();
            
            if (result.index === 2) {
                event.result = { bool: false };
            } else {
                event.result = {
                    bool: true,
                    cost_data: result.index,
                };
            }
        },
        async content(event, trigger, player){
            const result = await player.chooseTarget(function (card, player, target) {
                return true;
            }, event.cost_data===0?"令一名角色摸一张牌":"弃置一名角色一张牌")
            .set("ai", function (target) {
                var att=get.attitude(player, target);
                if(target.hasSkillTag("nogain")) att/=10;
                return get.event().index===0?att:-att;
            })
            .set("index",event.cost_data)
            .forResult();
            if(result.bool){
                if(event.cost_data==0){
                    await result.targets[0].draw();
                }
                else{
                    await player.discardPlayerCard(result.targets[0],"he",1);
                }
            }

        },
    },

    //于禁
    //添加的技能
    AddShoujie:{
        trigger:{
            global: ["loseAfter","loseAsyncAfter"],
        },
        audio:"jieming",
        filter(event, player) {
            if (event.type != "discard" || event.getlx === false) {
                return false;
            }
            return game.hasPlayer(current => {
                const evt = event.getl(current);
                if (!evt?.cards2?.some(i => get.position(i, true) == "d" && player.hasUseTarget(i))) {
                    return false;
                }
                return event.discarder==player;
            });
        },
        async cost(event, trigger, player) {
            const cards = game
                .filterPlayer(current => {
                    const evt = trigger.getl(current);
                    if (!evt?.cards2?.some(i => get.position(i, true) == "d" && player.hasUseTarget(i))) {
                        return false;
                    }
                    return player == trigger.discarder;
                })
                .reduce((list, current) => list.addArray(trigger.getl(current).cards2.filter(i => get.position(i, true) == "d" && player.hasUseTarget(i))), []);
            const { bool, links }
             = await player.chooseButton(["守节：是否使用其中的一张牌？", cards]).set("ai", button => {
                return get.player().getUseValue(button.link);
            }).forResult();
            event.result = {
                bool: bool,
                cost_data: links,
            };
        },
        async content(event, trigger, player) {
            const {
                cost_data: [card],
            } = event;
            player.$gain2(card, false);
            await game.delayx();
            await player.chooseUseTarget(true, card, false);
        },
    },
    //镇军添加额外时机
    rezhenjunENHANCE:{
        inherit: "rezhenjun",
        audio: ["jieyue",2],
        trigger: {
            player: ["phaseZhunbeiBegin","phaseJieshuBegin"]
        },
        filter(event, player,name) {
            if(name=="phaseJieshuBegin"&&!player.hasSkill("rezhenjunENHANCE_twice")) return false;
            return game.hasPlayer(function (current) {
                return current.countCards("he") > 0;
            });
        },
        content() {
            "step 0";
            player.chooseTarget(get.prompt2("rezhenjunENHANCE"), (card, player, target) => {
                return target.countCards("he");
            }).ai = function (target) {
                return -get.attitude(_status.event.player, target) * (target.countCards("e") + 1);
            };
            "step 1";
            if (result.bool) {
                var target = result.targets[0];
                event.target = target;
                var num = Math.max(target.countCards("h") - target.hp, 1);
                player.logSkill("rezhenjun", target);
                player.discardPlayerCard(num, target, true, "allowChooseAll");
                if(target===player) player.addTempSkill("rezhenjunENHANCE_twice");
            }
            "step 2";
            if (result.cards && result.cards.length&&event.target.isIn()) {
                event.num = 0;
                for (var i = 0; i < result.cards.length; i++) {
                    if (get.type(result.cards[i]) != "equip") {
                        event.num++;
                    }
                }
                if (event.num > 0) {
                    var prompt = "弃置" + get.cnNumber(event.num) + "张牌，或令" + get.translation(event.target) + "摸" + get.cnNumber(event.num) + "张牌";
                    player.chooseToDiscard(event.num, prompt, "he", "allowChooseAll").ai = function (card) {
                        return 5 - get.value(card);
                    };
                } else {
                    event.finish();
                }
            } else {
                event.finish();
            }
            "step 3";
            if (!result.bool) {
                event.target.draw(event.num);
            }
        },
        subSkill:{
            twice:{
                charlotte: true,
                "_priority": 0,
            }
        }
    },

    //曹植
    //落英加强
    reluoyingENHANCE:{
        intro: {
            content: "已记录花色：$",
            onunmark: true,
        },
        onremove(player, skill) {
            delete player.storage[skill];
            player.removeTip(skill);
        },
        audio: "reluoying",
        audioname: ["dc_caozhi","ol_caozhi"],
        group: ["reluoyingENHANCE_discard","reluoyingENHANCE_judge","reluoyingENHANCE_count"],
        subfrequent: ["judge"],
        subSkill:{
            count: {
                trigger: {
                    target: "useCardToTargeted",
                },
                audio: "reluoying",
                audioname: ["dc_caozhi","ol_caozhi"],
                forced: true,
                locked: false,
                popup: false,
                filter(event, player, name) {
                    const suit = get.suit(event.card);
                    if (!lib.suit.includes(suit)) {
                        return false;
                    }
                    if (player.storage.reluoyingENHANCE?.includes(suit)) {
                        return false;
                    }
                    return true;
                },
                async content(event,trigger,player) {
                    player.markAuto("reluoyingENHANCE", [get.suit(trigger.card)]);
                    player.storage.reluoyingENHANCE.sort((a, b) => lib.suit.indexOf(b) - lib.suit.indexOf(a));
                    player.addTip("reluoyingENHANCE", get.translation("reluoyingENHANCE") + player.getStorage("reluoyingENHANCE").reduce((str, suit) => str + get.translation(suit), ""));
                
                },
                "_priority": 0,
            },
            discard: {
                audio: "reluoying",
                audioname: ["dc_caozhi","ol_caozhi"],
                trigger: {
                    global: ["loseAfter","loseAsyncAfter"],
                },
                filter(event, player) {
                    if (event.type != "discard" || event.getlx === false) {
                        return false;
                    }
                    var cards = event.cards.slice(0);
                    var evt = event.getl(player);
                    if (evt && evt.cards) {
                        cards.removeArray(evt.cards);
                    }
                    for (var i = 0; i < cards.length; i++) {
                        if (cards[i].original != "j" && (player.storage.reluoyingENHANCE?.includes(get.suit(cards[i], event.player)) )&& get.position(cards[i], true) == "d") {
                            return true;
                        }
                    }
                    return false;
                },
                direct: true,
                content() {
                    "step 0";
                    if (trigger.delay == false) {
                        game.delay();
                    }
                    "step 1";
                    var cards = [],
                        cards2 = trigger.cards.slice(0),
                        evt = trigger.getl(player);
                    if (evt && evt.cards) {
                        cards2.removeArray(evt.cards);
                    }
                    for (var i = 0; i < cards2.length; i++) {
                        if (cards2[i].original != "j" && (player.storage.reluoyingENHANCE?.includes(get.suit(cards2[i], trigger.player))) && get.position(cards2[i], true) == "d") {
                            cards.push(cards2[i]);
                        }
                    }
                    if (cards.length) {
                        player.chooseButton(["落英：选择要获得的牌", cards], [1, cards.length]).set("ai", function (button) {
                            return get.value(button.link, _status.event.player, "raw");
                        });
                    }
                    "step 2";
                    if (result.bool) {
                        player.logSkill(event.name);
                        player.gain(result.links, "gain2", "log");
                    }
                    "step 3";
                    if(result.bool){
                        var suit_remove=Array.from(
                            new Set(result.links.map(card => get.suit(card,player)))
                        );
                        player.unmarkAuto("reluoyingENHANCE", suit_remove);
                        if(player.storage?.reluoyingENHANCE?.length){
                            player?.storage?.reluoyingENHANCE?.sort((a, b) => lib.suit.indexOf(b) - lib.suit.indexOf(a));
                            player.addTip("reluoyingENHANCE", get.translation("reluoyingENHANCE") + player.getStorage("reluoyingENHANCE").reduce((str, suit) => str + get.translation(suit), ""));
                        }
                        else player.removeTip("reluoyingENHANCE");
                    }

                },
                "skill_id": "reluoying_discard",
                sub: true,
                sourceSkill: "reluoying",
                "_priority": 0,
            },
            judge: {
                audio: "reluoying",
                audioname: ["dc_caozhi","ol_caozhi"],
                trigger: {
                    global: "cardsDiscardAfter",
                },
                direct: true,
                filter(event, player) {
                    var evt = event.getParent().relatedEvent;
                    if (!evt || evt.name != "judge") {
                        return;
                    }
                    if (evt.player == player) {
                        return false;
                    }
                    if (get.position(event.cards[0], true) != "d") {
                        return false;
                    }
                    return player.storage.reluoyingENHANCE?.includes(get.suit(event.cards[0]));
                },
                content() {
                    
                    "step 0";
                    player.chooseButton(["落英：选择要获得的牌", trigger.cards], [1, trigger.cards.length]).set("ai", function (button) {
                        return get.value(button.link, _status.event.player, "raw");
                    });
                    "step 1";
                    if (result.bool) {
                        player.logSkill(event.name);
                        player.gain(result.links, "gain2", "log");
                    }
                    "step 2"
                    if(result.bool){
                        var suit_remove=Array.from(
                            new Set(result.links.map(card => get.suit(card,player)))
                        );
                        player.unmarkAuto("reluoyingENHANCE", suit_remove);
                        if(player.storage?.reluoyingENHANCE?.length){
                            player?.storage?.reluoyingENHANCE?.sort((a, b) => lib.suit.indexOf(b) - lib.suit.indexOf(a));
                            player.addTip("reluoyingENHANCE", get.translation("reluoyingENHANCE") + player.getStorage("reluoyingENHANCE").reduce((str, suit) => str + get.translation(suit), ""));
                        }
                        else player.removeTip("reluoyingENHANCE");

                    }
                    
                    

                },
            }
        }
    },
    //修复酒诗
    oljiushiRE:{
        inherit:"oljiushi",
        audio:"oljiushi",
        init(player) {
            player.addSkill("oljiushiRE_gain");
        },
        onremove(player) {
            player.removeSkill("oljiushiRE_gain");
        },
        subSkill:{
            gain: {
                audio: "oljiushi",
                trigger: {
                    player: ["gainAfter"],
                },
                onremove: true,
                filter(event, player) {
                    if (event.name == "phase") {
                        return true;
                    }
                    return event.getParent().name.indexOf("reluoyingENHANCE") != -1;
                },
                intro: {
                    markcount(storage, player) {
                        
                        return player.countMark("oljiushiRE_gain");
                    },
                    content(storage, player) {
                        var marknum=player.countMark("oljiushiRE_gain");
                        var maxhp=player.maxHp;
                        var color=maxhp>marknum?"red":"green";
                        return `${marknum}/<span style='color:${color}'>${maxhp}</span>`;
                    },
                },
        
                charlotte: true,
                async cost(event, trigger, player) {
                    event.result = { bool: false };
                    player.addGaintag(trigger.cards, "reluoying");
                    let bool = player != _status.currentPhase && player.hasSkill("oljiushiRE", null, false);
                    if(bool)await player.addMark("oljiushiRE_gain",trigger.cards.length)//player.markAuto("oljiushiRE_gain", trigger.cards);
                    if (player.isTurnedOver()&&bool && player.countMark("oljiushiRE_gain") >= player.maxHp) {
                        const result = await player.chooseBool("是否发动【酒诗】，将武将牌翻面？").forResult();
                        event.result = result;
                    }
                    
                },
                async content(event, trigger, player) {
                    await player.turnOver();
                    await player.clearMark("oljiushiRE_gain");
                },
                sub: true,
                "_priority": 0,
            },
        }

    },

    //高顺 DIY
    xianzhenDIY:{
        audio: "rexianzhen",
        enable: "phaseUse",
        filterTarget(card, player, target) {
            return player.canCompare(target);
        },
        filter(event, player) {
            return player.countCards("h") > 0;
        },
        async content(event, trigger, player) {
            const result=await player.chooseToCompare(event.target).forResult();
            if (!result.tie) {
                var loser = result.bool ? event.target :player ;
                const sha = get.autoViewAs({ name: "sha", isCard: true });
                if(result.winner&&result.winner.canUse(sha, loser, false, false)){
                    await result.winner.useCard(sha, loser, false);
                }

            }
        },
        group:"xianzhenDIY_ban",
        subSkill:{
            ban:{
                trigger: {
                    player: "damageEnd",
                    source: "damageSource",
                },
                audio:"xianzhen",
                prompt:"将手牌摸至体力上限然后此技能本回合失效?",
                filter(event, player){
                    return player == _status.currentPhase&&player.countCards("h")<player.maxHp;
                },
                async content(event, trigger, player) {
                    await player.drawTo(player.maxHp);
                    await player.tempBanSkill("xianzhenDIY");
                },
            }
        }
        
    },

    //周处
    //数值改为【2345】
    shanduanRE:{
        audio: "shanduan",
        trigger: {
            player: "damageEnd",
        },
        filter: (event, player) => player != _status.currentPhase,
        forced: true,
        content() {
            if (!player.storage.shanduan) {
                player.storage.shanduan = [2, 3, 4, 5];
            }
            var list = player.storage.shanduan;
            for (var i = 0; i < list.length; i++) {
                var num = list[i],
                    add = true;
                for (var j = 0; j < list.length; j++) {
                    if (list[j] < num) {
                        add = false;
                        break;
                    }
                }
                if (add) {
                    list[i]++;
                    break;
                }
            }
            player.addTip("shanduan", get.translation("shanduanRE") + " " + player.storage["shanduan"].slice().join(" "));
            game.delayx();
        },
        group: ["shanduanRE_draw","shanduanRE_use","shanduanRE_discard"],
        ai: {
            notemp: true,
            threaten: 3.6,
        },
        init(player, skill) {
            player.storage.shanduan = [2, 3, 4, 5];
            player.addTip("shanduan", get.translation(skill) + " " + player.storage.shanduan.slice().join(" "));
        },
        onremove: (player, skill) => player.removeTip(skill),
        subSkill: {
            draw: {
                audio: "shanduan",
                trigger: {
                    player: "phaseDrawBegin",
                },
                filter(event, player) {
                    var list = event.getParent()._shanduan;
                    return !list || list.length > 0;
                },
                forced: true,
                content() {
                    "step 0";
                    var list = trigger.getParent()._shanduan;
                    if (!list) {
                        trigger.getParent()._shanduan = (player.storage.shanduan || [2, 3, 4, 5]).slice(0);
                        player.storage.shanduan = [2, 3, 4, 5];
                        player.addTip("shanduan", get.translation("shanduan") + " " + trigger.getParent()._shanduan.slice().join(" "));
                    }
                    "step 1";
                    var list = trigger.getParent()._shanduan;
                    if (list.length == 1) {
                        event._result = { index: 0 };
                    } else {
                        player
                            .chooseControl(list)
                            .set("prompt", "善断：为摸牌阶段的摸牌数分配一个数值")
                            .set("choice", list.indexOf(Math.max.apply(Math, list)))
                            .set("ai", () => _status.event.choice);
                    }
                    "step 2";
                    var list = trigger.getParent()._shanduan;
                    var num = list[result.index];
                    trigger.num = num;
                    list.remove(num);
                    game.log(player, "给", "#g摸牌阶段的摸牌数", "分配的数值是", "#y" + num);
                    if (list.length) {
                        player.addTip("shanduan", get.translation("shanduan") + " " + list.slice().join(" "));
                    } else {
                        player.addTip("shanduan", get.translation("shanduan") + " " + player.storage.shanduan.slice().join(" "));
                    }
                },
                sub: true,
                "_priority": 0,
            },
            use: {
                audio: "shanduan",
                trigger: {
                    player: "phaseUseBegin",
                },
                filter(event, player) {
                    var list = event.getParent()._shanduan;
                    return !list || list.length > 0;
                },
                forced: true,
                content() {
                    "step 0";
                    var list = trigger.getParent()._shanduan;
                    if (!list) {
                        trigger.getParent()._shanduan = (player.storage.shanduan || [2, 3, 4, 5]).slice(0);
                        player.storage.shanduan = [2, 3, 4, 5];
                        player.addTip("shanduan", get.translation("shanduan") + " " + trigger.getParent()._shanduan.slice().join(" "));
                    }
                    "step 1";
                    var list = trigger.getParent()._shanduan;
                    if (list.length == 1) {
                        event._result = { index: 0 };
                    } else {
                        player
                            .chooseControl(list)
                            .set("prompt", "善断：为攻击范围基数分配一个数值")
                            .set("list", list)
                            .set("ai", function () {
                                var player = _status.event.player,
                                    list = _status.event.list,
                                    card = { name: "sha" };
                                if (player.hasSha() && player.hasValueTarget(card, false, true) && !player.hasValueTarget(card, null, true)) {
                                    var range = 1;
                                    var equips = player.getCards("e");
                                    for (var i = 0; i < equips.length; i++) {
                                        var info = get.info(equips[i], false).distance;
                                        if (!info) {
                                            continue;
                                        }
                                        if (info.attackFrom) {
                                            range -= info.attackFrom;
                                        }
                                    }
                                    var listx = list.slice(0).sort();
                                    for (var i of listx) {
                                        if (i <= range) {
                                            continue;
                                        }
                                        if (
                                            game.hasPlayer(function (current) {
                                                var distance = get.distance(player, current, "attack");
                                                if (distance > 1 && distance <= i - range) {
                                                    return true;
                                                }
                                                return false;
                                            })
                                        ) {
                                            return list.indexOf(i);
                                        }
                                    }
                                }
                                return list.indexOf(Math.min.apply(Math, list));
                            });
                    }
                    "step 2";
                    var list = trigger.getParent()._shanduan;
                    var num = list[result.index];
                    if (!player.storage.shanduan_effect) {
                        player.storage.shanduan_effect = {};
                    }
                    player.storage.shanduan_effect.range = num;
                    player.addTempSkill("shanduan_effect");
                    list.remove(num);
                    game.log(player, "给", "#g攻击范围的基数", "分配的数值是", "#y" + num);
                    if (list.length) {
                        player.addTip("shanduan", get.translation("shanduan") + " " + list.slice().join(" "));
                    } else {
                        player.addTip("shanduan", get.translation("shanduan") + " " + player.storage.shanduan.slice().join(" "));
                    }
                    if (list.length == 0) {
                        event.finish();
                    } else if (list.length == 1) {
                        event._result = { index: 0 };
                    } else {
                        player
                            .chooseControl(list)
                            .set("prompt", "为使用【杀】的次数上限分配一个数值")
                            .set("list", list)
                            .set("ai", function () {
                                var player = _status.event.player,
                                    list = _status.event.list;
                                var sha = player.countCards("hs", function (card) {
                                    return get.name(card) == "sha" && player.hasValueTarget(card, null, true);
                                });
                                var max = player.getCardUsable("sha");
                                if (sha <= max) {
                                    var listx = list.slice(0).sort();
                                    for (var i of listx) {
                                        if (max + i >= sha) {
                                            return list.indexOf(i);
                                        }
                                    }
                                    return list.indexOf(Math.max.apply(Math, list));
                                }
                                return list.indexOf(Math.min.apply(Math, list));
                            });
                    }
                    "step 3";
                    var list = trigger.getParent()._shanduan;
                    var num = list[result.index];
                    if (!player.storage.shanduan_effect) {
                        player.storage.shanduan_effect = {};
                    }
                    player.storage.shanduan_effect.sha = num;
                    list.remove(num);
                    game.log(player, "给", "#g使用【杀】的次数上限", "分配的数值是", "#y" + num);
                    if (list.length) {
                        player.addTip("shanduan", get.translation("shanduan") + " " + list.slice().join(" "));
                    } else {
                        player.addTip("shanduan", get.translation("shanduan") + " " + player.storage.shanduan.slice().join(" "));
                    }
                },
                
                sub: true,
                
                "_priority": 0,
            },
            discard: {
                audio: "shanduan",
                trigger: {
                    player: "phaseDiscardBegin",
                },
                filter(event, player) {
                    var list = event.getParent()._shanduan;
                    return !list || list.length > 0;
                },
                forced: true,
                content() {
                    "step 0";
                    var list = trigger.getParent()._shanduan;
                    if (!list) {
                        trigger.getParent()._shanduan = (player.storage.shanduan || [2, 3, 4, 5]).slice(0);
                        player.storage.shanduan = [2, 3, 4, 5];
                        player.addTip("shanduan", get.translation("shanduan") + " " + trigger.getParent()._shanduan.slice().join(" "));
                    }
                    "step 1";
                    var list = trigger.getParent()._shanduan;
                    if (list.length == 1) {
                        event._result = { index: 0 };
                    } else {
                        player
                            .chooseControl(list)
                            .set("prompt", "善断：为手牌上限基数分配一个数值")
                            .set("choice", list.indexOf(Math.max.apply(Math, list)))
                            .set("ai", () => _status.event.choice);
                    }
                    "step 2";
                    var list = trigger.getParent()._shanduan;
                    var num = list[result.index];
                    if (!player.storage.shanduan_effect) {
                        player.storage.shanduan_effect = {};
                    }
                    player.storage.shanduan_effect.limit = num;
                    player.addTempSkill("shanduan_effect");
                    list.remove(num);
                    game.log(player, "给", "#g手牌上限的基数", "分配的数值是", "#y" + num);
                    if (list.length) {
                        player.addTip("shanduan", get.translation("shanduan") + " " + list.slice().join(" "));
                    } else {
                        player.addTip("shanduan", get.translation("shanduan") + " " + player.storage.shanduan.slice().join(" "));
                    }
                },
                
                sub: true,
                
                "_priority": 0,
            },
        },


    },


    //朱桓 增强平寇
    pingkouENHANCE:{
        inherit:"pingkou",
        audio:"pinngkou",
        content() {
            "step 0";
            player
                .chooseTarget([1, player.getHistory("skipped").length], get.prompt2("pingkouENHANCE"), function (card, player, target) {
                    return target != player;
                })
                .set("ai", function (target) {
                    var player = _status.event.player;
                    return get.damageEffect(target, player, player);
                });
            "step 1";
            if (result.bool) {
                player.logSkill("pingkou", result.targets);
                event.targets = result.targets.slice(0).sortBySeat();
            } else {
                event.finish();
            }
            "step 2";
            if (event.targets && event.targets.length) {
                event.targets.shift().damage();
                event.redo();
            }



        },


    },
    niuma:{
        trigger:{
            player:["phaseDrawSkipped","phaseDrawCancelled","phaseUseSkipped","phaseUseCancelled","phaseDiscardSkipped","phaseDiscardCancelled"],
        },
        async cost(event,trigger,player){
            event.result = await player.chooseTarget(function (card, player, target) {
                return true;
                /*
                const substpes=['equip1','equip2','equip3','equip4','equip5'];
                for(var i of substpes){
                    if(target.hasEmptySlot(i)) return true;
                }*/
            },"令一名角色随机使用一张装备(空置装备栏优先）")
            .set("ai", function (target) {
                return get.attitude(player, target);
            })
            .forResult();
        },
        async content(event,trigger,player){
            var equip = get.cardPile(
                function (card) {
                    const subtype=get.subtype(card);
                    return get.type(card) == "equip" &&event.targets[0].hasEmptySlot(subtype)&& event.targets[0].hasUseTarget(card);
                },
                false,
                "random"
            );
            if (equip) {
                await event.targets[0].chooseUseTarget(equip, true);
            }
            else{
                var equip2 = get.cardPile(
                    function (card) {
                        const subtype=get.subtype(card);
                        return get.type(card) == "equip" &&event.targets[0].hasUseTarget(card);
                    },
                    false,
                    "random"
                );
            if (equip2) {
                await event.targets[0].chooseUseTarget(equip2, true);
            }
            else await event.targets[0].draw();
            
            
            
            }
            


        },

    },
    




    //兀突骨  获得燃标记 令人受到的伤害+1 或-1
    ranshangENHANCE:{
        inherit:"ranshang",
        audio:"ranshang",
        group:["ranshangENHANCE_add","ranshang2"],
        subSkill:{
            add:{
                trigger: {
                    global: "damageBegin3",
                },
                usable:1,
                audio:"ranshang",
                filter(event,player){
                    return event.player!=player;
                },
                async cost(event,trigger,player){
                    const list=["+1","-1","cancel2"];
                    const result = await player
                        .chooseControl(list)
                        .set("prompt", `令${get.translation(trigger.player)}受到的伤害+1或-1？`)
                        .set("ai",function(){
                            const player = get.player();
                            const target = get.event().target;
                            
                            const att=get.attitude(player, target);
                            
                            if(att>0) return "-1";
                            if(att<0) return "+1";
                            
                            
                        })
                        .set("target",trigger.player)
                        .forResult();

                    
                    if (result.control !== "cancel2") {
                        event.result = {
                            bool: true,
                            cost_data: result.control
                        };
                    }
                    
                },
                async content(event,trigger,player){
                    await player.addMark("ranshang",1);
                    await player.line(trigger.player);
                    trigger.num += parseInt(event.cost_data);
                }
            },
        }

    },

    //伍子胥
    chouye:{
        zhuanhuanji:true,
        marktext: "☯",
        mark: true,
        intro: {
            content(storage, player, skill) {
                const str = !storage ? "回复一点体力": "视为使用一张【决斗】";
                return str;
            },
        },
        filter(event,player){
            return !player.storage?.chouye?player.getDamagedHp():player.hasUseTarget({name:"juedou",isCard:true});
        },
        enable:["phaseUse"],
        async content(event,trigger,player){
            if(!player.storage?.chouye){
                await player.recover();
            }
            else await player.chooseUseTarget({name:"juedou",isCard:true},true);
            await player.changeZhuanhuanji("chouye");

        },
        group:"chouye_ban",
        subSkill:{
            ban:{
                trigger: {
                    player: "damageEnd",
                },
                forced:true,
                filter(event, player){
                    return player == _status.currentPhase
                },
                async content(event, trigger, player) {
                    await player.tempBanSkill("chouye");
                },
            }
        }

    },

    
    //偷袭 邓艾
    touxi:{
        enable:"phaseUse",
        filterTarget(card, player, target) {
            return target != player&&player.canUse({name:"binglinchengxiax",isCard:true},target);
        },
        selectTarget:1,
        usable:1,
        async content(event,trigger,player){
            await player.useCard({name:"binglinchengxiax",isCard:true},event.targets[0]);
        },
    },

    //族吴苋 宗族技无视条件
    clanmuyinENHANCE:{
        inherit:"clanmuyin",
        audio:"clanmuyin",
        audioname: ["clan_wuxian","clan_wuban","clan_wukuang","clan_wuqiao"],
        filter(event, player) {
            return game.hasPlayer(function (current) {
                return (current == player || current.hasClan("陈留吴氏"));
            });
        },
        content() {
            "step 0";
            player
                .chooseTarget(get.prompt("clanmuyin"), "令一名陈留吴氏角色的手牌上限+1", function (card, player, current) {
                    return (current == player || current.hasClan("陈留吴氏"));
                })
                .set("ai", function (target) {
                    return get.attitude(_status.event.player, target);
                });
            "step 1";
            if (result.bool) {
                var target = result.targets[0];
                player.logSkill("clanmuyin", target);
                lib.skill.chenliuwushi.change(target, 1);
                game.delayx();
            }
        },

    },

    //神孙策 危重 只摸一
    weizhongSUNCEVERSON:{
        inherit: "weizhong",
        content() {
            player.draw();
        },
        trigger: {
            player: ["gainMaxHpEnd","loseMaxHpEnd"],
        },
        forced: true,
    },




    //荀彧
    oljiemingENHANCE:{
        inherit:"oljieming",
        audio:"oljieming",
        async content(event, trigger, player) {
            const {
                targets: [target],
            } = event;
            console.log(event,trigger);
            player.storage.oljiemingENHANCE =player.storage.oljiemingENHANCE||[];
            const type=trigger?.card?"card":"nocsrd";
            if(!player.storage.oljiemingENHANCE.includes(type)){
                player.storage.oljiemingENHANCE.push(type);
                var result=await player.chooseBool("是否令其增加一点体力上限并回复一点体力").set("ai",function(){
                    return get.attitude(player, get.event().t) > 0;
                }).set("t",target).forResult();
                if(result.bool){
                    await target.gainMaxHp();
                    await player.recover();
                    target.addSkill("oljiemingENHANCE_add");
                    target.addMark("oljiemingENHANCE_add", 1, false);
                }
                
            }
            await target.draw(Math.min(5, target.maxHp));
            let num =target.countCards("h") - target.maxHp;

            if (num > 0) {
                await target.chooseToDiscard("h", true, num, "allowChooseAll");
            }
            
        },
        subSkill: {
            add: {
                charlotte: true,
                onremove: true,
                mark: true,
                markimage: "image/card/handcard.png",
                intro: {
                    content: "手牌上限+#",
                },
                mod: {
                    maxHandcard: (player, num) => num + player.countMark("oljiemingENHANCE_add"),
                },
                sub: true,
               
            },
        },
    },
    quhuENHANCE:{
        inherit:"quhu",
        filter(event, player) {
            if (player.countCards("h") == 0) {
                return false;
            }
            return game.hasPlayer(function (current) {
                return player.canCompare(current);
            });
        },
        filterTarget(card, player, target) {
            return player.canCompare(target);
        },
    },
/*
    //曹操 
    rejianxiongENHANCE:{
        audio:"rejianxiong",
        trigger:{
            global:"damageEnd",
        },
        filter(event, player) {
            if(player.hasSkill("jianying_enhance_used")) return false;
            return get.itemtype(event.cards) == "cards" && get.position(event.cards[0], true) == "o";
        },
        content() {
            "step 0";
            player.gain(trigger.cards);
            player.$gain2(trigger.cards);
            player.draw();
            "step 1";
            if(trigger.player!=player){
                player.addTempSkill("jianying_enhance_used");
                game.log("【奸雄】已经失效");
            }
        },
        ai: {
            maixie: true,
            "maixie_hp": true,
            effect: {
                target(card, player, target) {
                    if (player.hasSkillTag("jueqing", false, target)) {
                        return [1, -1];
                    }
                    if (get.tag(card, "damage")) {
                        return [1, 0.55];
                    }
                },
            },
        },
    },
        //诸葛亮 草船借箭  psguanxing
        jiejian:{
            trigger: {
                global: "useCardAfter",
            },
            filter(event, player) {
                return (
                    event.player != player &&
                    event.targets.includes(player) &&
                    event.cards.filterInD().length > 0 &&
                    !game.hasPlayer2(function (current) {
                        return (
                            current.getHistory("damage", function (evt) {
                                return evt.card == event.card;
                            }).length > 0
                        );
                    })
                );
            },
            check(event, player) {
                return get.value(event.cards.filterInD(), player, "raw") > 0;
            },
            prompt2(event, player) {
                return "获得" + get.translation(event.cards.filterInD()) + "。";
            },
            content() {
                player.gain(trigger.cards.filterInD(), "log", "gain2");
            },
        },
    */

    //标孙尚香
    muji:{
        enable:"phaseUse",
        filter(event, player) {
            for (var i = 1; i < 6; i++) {
                if (player.hasEnabledSlot(i)) {
                    return player.countCards("h") > 0;
                }
            }
            return false;
        },
        chooseButton: {
            dialog(event, player) {
                var list=[];
                const addtion=["shufazijinguan","sanjian","taigongyinfu","sanlve","zhaogujing","xuwangzhimian"];
                for(var i of [...lib.inpile,...addtion]){
                    if(get.type(i)=="equip"){
                        list.push(["装备",,i]);
                    }
                }
                const choices = [];
                for (let i = 1; i <= 5; i++) {
                    var temp=get.translation(`equip${i}`)
                    if(!player.hasEmptySlot(`equip${i}`)){
                        const name=get.translation(player.getCards("e",{subtypes:`equip${i}`})[0]?.name||player.getCards("e",{subtype:`equip${i}`})[0]?.name).slice(0,2);
                        temp+=`:<span style='color:red'>${name}</span>`;
                    }
                    if(!player.hasDisabledSlot(i)) choices.push(temp); //没有废除这个栏位才会显示
                }
                event.set("list",list);
                event.set("choice",choices);
                return ui.create.dialog("选择一张装备",[list,"vcard"],[
                    choices,
                    "tdnodes",
                ]);
            },
            select:2,
            filter(button,player){
                var event=get.event().getParent();
                return !ui.selected.buttons.some(but => {
                    return [event.list, event.choice].some(list => list.includes(but.link) && list.includes(button.link));
                });
            },
            backup(result, player) {
                return {
                    audio: "xiaoji",
                    filterCard: true,
                    selectCard:1,
                    position: "h",
                    discard: false,
                    lose: false,
                    delay: false,
                    prepare: "throw",
                    lkr:result,
                    
                    async content(event, trigger, player) {
                        
                        const r=lib.skill.muji_backup.lkr;
                        const card=Array.isArray(r[0])?r[0]:r[1];
                        var subtype=get.plainText(Array.isArray(r[0])?r[1]:r[0]);
                        for(var i=1;i<=5;i++){
                            if(subtype.startsWith(get.translation(`equip${i}`))){
                                subtype=`equip${i}`;
                                break;
                            }
                        }
                        const equip=get.autoViewAs({name:card[2]},event.cards);
                        equip.subtypes=[subtype];
                        
                        await player.equip(equip);
                    },
                    
                };
                
            },
            prompt(result, player) {
                const card=Array.isArray(result[0])?result[0]:result[1];
                return `选择一张手牌当作${get.translation(card[2])}`;
            },
        },

    },
    
    //改变装备的subtypes达到装备区牌数量无限制
    muji2:{
        trigger:{
            player:"equipBegin",
        },
        popup:false,
        unique:true,
        forced:true,
        lastDo:true,
        content(){
            trigger.card.subtypes=["鸡你太美"];
        }
    },
    //发动装备技能摸牌
    cabian:{
        trigger:{
            player:["useSkill","logSkillBegin"],
        },
        forced:true,
        audio:"xiaoji",
        filter(event, player) {
            let skill = get.sourceSkillFor(event);
            
            let info = get.info(skill);
            return info?.equipSkill&&!player.getStorage("cabian_used").includes(skill);
        },
        async content(event, trigger, player){
            if (!player.storage.cabian_used) {
                player
                    .when({ global: "roundStart" })
                    .assign({
                        firstDo: true,
                    })
                    .then(() => delete player.storage.cabian_used);
            }
            let skill = get.sourceSkillFor(trigger);
            player.markAuto("cabian_used", skill);
            await player.draw();
        }

    },

    //陆逊  使用牌后可以重铸一张牌
    lianyingDIY:{
        trigger:{
            player:"useCardAfter",
        },
        usable:15,
        audio:"lianying",
        async cost(event, trigger, player) {
            const { select } = get.info(event.skill);
            event.result = await player.chooseCard(get.prompt2(event.skill), select, (card, player2) => player2.canRecast(card), "he").set("ai", (card) => 6 - get.value(card)).forResult();
          },
        async content(event, trigger, player) {
            const { cards } = event;
            await player.recast(cards);
        },
        group:["lianying"],
    },

    //荀攸   奇策
    qiceENHANCE:{
        audio: "qice",
        enable: ["chooseToUse","chooseToRespond"],
        filter(event, player) {
            if (!player.countCards("h") || player.hasSkill("qiceENHANCE_used")) {
                return false;
            }
            for (var i of lib.inpile) {
                var type = get.type2(i);
                if ((type == "basic" || type == "trick") && event.filterCard(get.autoViewAs({ name: i }, "unsure"), player, event)) {
                    return true;
                }
            }
            return false;
        },
        chooseButton: {
            dialog(event, player) {
                var list = [];
                for (var i = 0; i < lib.inpile.length; i++) {
                    var name = lib.inpile[i];
                    if (name == "sha") {
                        if (event.filterCard(get.autoViewAs({ name }, "unsure"), player, event)) {
                            list.push(["基本", "", "sha"]);
                        }
                        for (var nature of lib.inpile_nature) {
                            if (event.filterCard(get.autoViewAs({ name, nature }, "unsure"), player, event)) {
                                list.push(["基本", "", "sha", nature]);
                            }
                        }
                    } else if (get.type(name) == "trick" && event.filterCard(get.autoViewAs({ name }, "unsure"), player, event)) {
                        list.push(["锦囊", "", name]);
                    } else if (get.type(name) == "basic" && event.filterCard(get.autoViewAs({ name }, "unsure"), player, event)) {
                        list.push(["基本", "", name]);
                    }
                }
                return ui.create.dialog("奇策", [list, "vcard"]);
            },
            check(button) {
                if (_status.event.getParent().type != "phase") {
                    return 1;
                }
                var player = _status.event.player;
                if (["wugu", "zhulu_card", "yiyi", "lulitongxin", "lianjunshengyan", "diaohulishan"].includes(button.link[2])) {
                    return 0;
                }
                return player.getUseValue({
                    name: button.link[2],
                    nature: button.link[3],
                });
            },

            backup(links, player) {
                return {
                    /*
                    filterCard:true,
                    selectCard() {
                        return [Math.ceil(get.player().countCards("h") / 2), Infinity];
                    },*/
                    filterCard(card) {
                        if (ui.selected.cards.length) {
                            return get.suit(card) === get.suit(ui.selected.cards[0]);
                        }
                        return true;
                    },
                    selectCard() {
                        const player = get.player();
                        if (ui.selected.cards.length) {
                            const suit = get.suit(ui.selected.cards[0]);
                            return player.countCards("h", { suit:suit});
                        }
                        return 1;
                    },
                    audio: "qice",
                    popname: true,
                    position: "h",
                    viewAs: { name: links[0][2], nature: links[0][3] },
                    precontent(){
                       player.addTempSkill("qiceENHANCE_used");
                    },
                };
            },
            prompt(links, player) {
                return "将一种花色手牌当做" + (get.translation(links[0][3]) || "") + get.translation(links[0][2]) + "使用";
            },
        },
        hiddenCard(player, name) {
            if (!lib.inpile.includes(name)) {
                return false;
            }
            var type = get.type2(name);
            return (type == "basic" || type == "trick") && player.countCards("she") > 0 && !player.hasSkill("qiceENHANCE_used");
        },
        ai: {
            fireAttack: true,
            respondSha: true,
            respondShan: true,
            skillTagFilter(player) {
                if (!player.countCards("h") || player.hasSkill("qiceENHANCE_used")) {
                    return false;
                }
            },
            order: 1,
            result: {
                player(player) {
                    if (_status.event.dying) {
                        return get.attitude(player, _status.event.dying);
                    }
                    return 1;
                },
            },
        },
        subSkill:{
            used:{
                charlotte: true,
                "_priority": 0,
            }
        }
    },
    zhiyuENHANCE:{
        trigger:{
            player:"damageEnd",
            //global:"useCard",
        },
        audio:"rezhiyu",
        filter(event, player) {
            if(event.name=="useCard"){
                return get.is.convertedCard(event.card);
            }
            return true;
        },
        async content(event, trigger, player){
            await player.draw();
            if (!player.countCards("h")) {
                return;
            } else {
                await player.showHandcards();
            }
            if (trigger.source?.isIn()) {
                await trigger.source.chooseToDiscard("智愚：请弃置一张手牌", true).forResult();
            }

        }

    },


    //孙邵
    bizhengENHANCE:{
        trigger:{
            player:["drawAfter","discardAfter"]
        },
        filter(event,player) {
            if(event.name=="discard"&&event.discarder!=player) return false;
            return !player.hasSkill("bizhengENHANCE_used");
        },
        audio:"bizheng",
        async cost(event, trigger, player){
            event.result=await player.chooseTarget(`令一名角色${(trigger.name=="draw"?"摸":"弃")+(trigger?.num||trigger?.cards?.length)}张牌`,function(card,player,target){
                if(trigger.name=="draw") return true;
                return target.countCards("he")>0;
            })
            .set("ai",function(target){
                const player=get.player();
                const action=get.event().action;
                return action=="draw"?get.attitude(player,target):-get.attitude(player,target);
            }).set("action",trigger.name)
            .forResult();
        },
        async content(event, trigger, player){
            player.addTempSkill("bizhengENHANCE_used","phaseAnyAfter");
            if(trigger.name=="draw") await event.targets[0].draw(trigger.num);
            else await event.targets[0].chooseToDiscard("he",trigger.cards.length,true);
        },
        subSkill:{used:{charlotte:true}}

    },
    yidianENHANCE:{
        inherit:"yidian",
        audio:"yidian",
        filter(event, player) {
            var info = get.info(event.card);
            if (info.allowMultiple == false) {
                return false;
            }
            const cards=player.getCards("h");
            if (event.targets && !info.multitarget) {
                const samecard=player.countCards("h",function(card){return card.name==event.card.name});
                if(samecard) return false;
                if (
                    game.hasPlayer(function (current) {
                        return lib.filter.targetEnabled2(event.card, player, current) && !event.targets.includes(current);
                    })
                ) {
                    return true;
                }
            }
            return false;
        },
    },

    //手刹 谋卢植
    sbmingrenENHANCE:{
        inherit:"sbmingren",
        drawNum: 3,
        audio: "nzry_mingren_1",
        audioname: ["sb_yl_luzhi"],
        trigger: {
            global: "phaseBefore",
            player: "enterGame",
        },
        forced: true,
        locked: false,
        filter(event, player) {
            return (event.name != "phase" || game.phaseNumber == 0) && !player.getExpansions("nzry_mingren").length;
        },
        group: ["nzry_mingren_1"],
        async content(event, trigger, player) {
            await player.draw(get.info(event.name).drawNum || 2);
            if (!player.countCards("h")) {
                return;
            }
            const result = await player.chooseCard("h", "将一张手牌置于武将牌上，称为“任”", true).set("ai", function (card) {
                return 6 - get.value(card)+(get.type(card)=="basic"?2:0);
            }).forResult();
            if (result.bool) {
                const next = player.addToExpansion(result.cards[0], player, "give", "log");
                next.gaintag.add("nzry_mingren");
                await next;
            }
            const r2= await player.chooseBool("切换【贞良】状态为:"+(player.storage.sbzhenliang?"阳":"阴")).set("ai",function(){
                return get.player()?.seatNum!=1;
            }).forResult();
            if(r2.bool){
                player.changeZhuanhuanji("sbzhenliang");
            }
        },
    },
    //sp张辽 变异钟会
    zhengbingsp:{
        enable:"phaseUse",
        usable:1,
        audio:"jsrgzhengbing",
        filterTarget:true,
        filter(event,player){
            return player.countCards("hes");
        },
        async content(event,trigger,player){
            const t=[player,event.targets[0]];
            for(var i of t){
                var result=await i.chooseCard([1,2],"hes","重铸至多两张牌",true)
                .set("ai",lib.skill.olzhengbing.check)
                .forResult();
                if(result.bool){
                    await i.recast(result.cards);
                    const sha=result.cards.filter(i=>i.name=="sha")?.length;
                    const shan=result.cards.filter(i=>i.name=="shan")?.length;
                    const taojiu=result.cards.find(i=>["tao","jiu"].includes(i.name));
                    if(sha){
                      player.addSkill("olzhengbing_sha");
                      player.addMark("olzhengbing_sha", sha, false);
                    
                    }
                    if(shan) await player.draw(shan);
                    if(taojiu){
                        player.addTempSkill("zhengbingsp_effect");
                    }
                
                }
            }
        
        },
            ai: {
        order: 8,
        threaten: 1.8,
        result: {
            target(player, target) {
                var att = get.attitude(player, target);

                return att;
            },
        },
    },
        subSkill:{
            effect:{
    trigger: {
        player: "phaseChange",
    },
    forced: true,
    filter(event, player) {
        return event.phaseList[event.num].startsWith("phaseDiscard");
            
        
      
    },
    async content(event, trigger, player) {
        trigger.phaseList[trigger.num] = `phaseUse|${event.name}`;
        await game.delayx();
    },
            }
        },
    },
    //手杀界钟会突破
    requanjiENHANCE:{
        //inherit:"requanji",
        trigger:{
            player:["changeHp","phaseUseBegin"]
        },
        audio:"requanji",
        frequent:true,
        filter(event, player) {
        
        return true;
    },
        async content(event, trigger, player) {
            
            const num=trigger.name=="phaseUse"?2:trigger.num;
            await player.draw(Math.abs(num));
        },
        ai:{maixue:true},
        group:"requanjiENHANCE_dunbi",
        subSkill:{
            dunbi:{
                trigger:{player:"phaseDiscardBegin"},
                async cost(event,trigger,player){
                    event.result=await player.chooseToDiscard("he","弃置一张牌然后跳过弃牌阶段？",1,false)
                    .set("ai",function(card){
                        if(!player.needsToDiscard()) return -1;
                        return 7-get.value(card);
                    })
                    .forResult();
                    
                },
               
                async content(_e,trigger,_p){trigger.cancel()},
            }
        },
    },
    //神偷张辽
    shentou:{
        trigger:{player:"drawAfter"},
        filter(event,player){
            return player.countCards("hes")&&game.hasPlayer(function(current){return current!=player&&current.countCards("h")});
        },
        init(player){
            player.addAdditionalSkill("skill","yingzi");
        },
        audio:"retuxi",
        async cost(event,trigger,player){
            const num=game.filterPlayer(current=>current!=player).length
            event.result=await player.chooseToDiscard("hes",false,[1,num],`弃置至多${num}张牌，然后获得等量名其他角色手牌各一张`)
            .set("ai",function (card){
                const player = get.player();
                const targets = game.filterPlayer(current => player != current && current.countGainableCards(player, "h") && get.effect(current, { name: "shunshou_copy2" }, player, player) > 0);
                if (ui.selected.cards.length > targets.length) {
                    return 0;
                }
                return 6.5 - get.value(card);
            })
            .forResult();
        },
        //group:"yingzi",
        /*
        intro: {
            markcount(storage, player) {
                return `${player.storage.shentou_shan||0}/${player.storage.shentou_sha||0}`;
            },
            content(storage, player) {
                let str = "";
                str += `<li>额外摸牌：${player.storage.shentou_shan||0}`;
                str += `<br><li>额外出杀：${player.storage.shentou_sha||0}`;
                return str;
            },
        },*/
        

        
        async content(event,trigger,player){
            const num=event.cards.length;
            const result=await player.chooseTarget("你要偷谁的牌呢？",[1,num],function(card,player,target){
                return player!=target&&target.countCards("h");
            }).set("ai",function(target){
                const player=get.event().player;
                return -get.attitude(player,target);
            }).forResult();
            if(result?.bool){
                await player.gainMultiple(result.targets.sortBySeat());
            /*
                var shabool=false,
                shanbool=false;
                for(var i of result.targets.sortBySeat()){
                    const r2 = await player.gainPlayerCard(1,i,"h",true).forResult();
                    if(r2){
                        const sha=r2.cards.find(i=>i.name=="sha");
                        const shan=r2.cards.find(i=>i.name=="shan");
                        if(sha) shabool=true;
                        if(shan) shanbool=true;
                    }
                }
                if(shabool){
                    if(!player.storage.shentou_sha) player.storage.shentou_sha=0;
                    player.storage.shentou_sha++;
                    
                }
                if(shanbool){
                    if(!player.storage.shentou_shan) player.storage.shentou_shan=0;
                    player.storage.shentou_shan++;
                }
                
                if(shanbool || shabool) player.markSkill(event.name);*/
               
                

                
                
            }
        }
    },
    //廖化
    mubingEN:{
        inherit:"mubing",
        audio:"dangxian",
        init (player){
            player.storage.mubing2=true;
        }
        
    
    },
    //神甘宁 破吸
    poxiEN:{
        inherit:"drlt_poxi",
        audio:"drlt_poxi",
        content() {
        "step 0";
        event.list1 = [];
        event.list2 = [];
        if (player.countCards("h") > 0) {
            var chooseButton = player.chooseButton(3, ["你的手牌", player.getCards("h"), get.translation(target.name) + "的手牌", target.getCards("h")]);
        } else {
            var chooseButton = player.chooseButton(3, [get.translation(target.name) + "的手牌", target.getCards("h")]);
        }
        chooseButton.set("target", target);
        chooseButton.set("ai", function (button) {
            var player = _status.event.player;
            var target = _status.event.target;
            var ps = [];
            var ts = [];
            for (var i = 0; i < ui.selected.buttons.length; i++) {
                var card = ui.selected.buttons[i].link;
                if (target.getCards("h").includes(card)) {
                    ts.push(card);
                } else {
                    ps.push(card);
                }
            }
            var card = button.link;
            var owner = get.owner(card);
            var val = get.value(card) || 1;
            if (owner == target) {
                if (ts.length > 1) {
                    return 0;
                }
                if (ts.length == 0 || player.hp > 3) {
                    return val;
                }
                return 2 * val;
            }
            return 7 - val;
        });
        chooseButton.set("filterButton", function (button) {
            if (get.owner(button.link) && !lib.filter.canBeDiscarded(button.link, get.owner(button.link), get.player())) {
                return false;
            }
            for (var i = 0; i < ui.selected.buttons.length; i++) {
                if (get.suit(button.link) == get.suit(ui.selected.buttons[i].link)) {
                    return false;
                }
            }
            return true;
        });
        "step 1";
        if (result.bool) {
            var list = result.links;
            for (var i = 0; i < list.length; i++) {
                if (get.owner(list[i]) == player) {
                    event.list1.push(list[i]);
                } else {
                    event.list2.push(list[i]);
                }
            }
            if (event.list1.length && event.list2.length) {
                game.loseAsync({
                    lose_list: [
                        [player, event.list1],
                        [target, event.list2],
                    ],
                    discarder: player,
                }).setContent("discardMultiple");
            } else if (event.list2.length) {
                target.discard(event.list2);
            } else {
                player.discard(event.list1);
            }
        }
        "step 2";
        if (event.list1.length + event.list2.length == 3) {
            if (event.list1.length == 0) {
                player.loseMaxHp();
            }
            if (event.list1.length == 2) {
                player.draw();
                player.recover();
            }
            if (event.list1.length == 3) {
                player.draw(3);
            }
            
        }
    },
    },
    //1神诸葛
    qixingEN:{
        trigger:{
            player:"enterGame",
            global:"phaseBefore"
        },
        audio:"qixing"
        
        ,
        forced:true,
        filter(event,player){
            return event.name!="phase"||game.phaseNumber==0;
        },
        async content(event,trigger,player){
            await player.draw(7);
            const result=await player.chooseCard(7,"将七张牌置入武将牌上为“星“",true).forResult();
            if(result?.bool){
            
                await player.loseToSpecial(result.cards,event.name);
                player.markSkill(event.name);
                
            }
        },
        marktext:"星",
        intro:{
            
            markcount(_,player){
                return player.countCards("s",function(card){
                    return card.hasGaintag("qixingEN");
                });
            }
        },
        
    
    },
    kuangfengEN:{
        inherit:"kuangfeng",
        audio:"kuangfeng",
        filter(event, player) {
            return player.countCards("s",function(card){
                    return card.hasGaintag("qixingEN");
                });
        },
        
    
    async cost(event, trigger, player) {
        const {
            bool,
            targets,
            links: cost_data,
        } = await player
            .chooseButtonTarget({
                createDialog: [get.prompt2(event.skill),player.getCards("s",function(card){
                    return card.hasGaintag("qixingEN");
                })],
                selectButton: 1,
                filterTarget: true,
                ai1(button) {
                    if (
                        game.hasPlayer(target => {
                            return get.attitude(get.player(), target) < 0;
                        })
                    ) {
                        return 1;
                    }
                    return 0;
                },
                ai2(target) {
                    return -get.attitude(get.player(), target);
                },
            })
            .forResult();
        event.result = {
            bool: bool,
            targets: targets?.sortBySeat(),
            cost_data: cost_data,
        };
    },
    
    
    },
    dawuEN:{
        inherit:"dawu",
        
    filter(event, player) {
        return player.countCards("s",function(card){
                    return card.hasGaintag("qixingEN");
                })
    },
    audio:"dawu",
    async cost(event, trigger, player) {
        const {
            bool,
            targets,
            links: cost_data,
        } = await player
            .chooseButtonTarget({
                createDialog: [get.prompt2(event.skill), player.getCards("s",function(card){
                    return card.hasGaintag("qixingEN");
                })],
                selectButton: [1, game.countPlayer()],
                filterTarget: true,
                selectTarget() {
                    return ui.selected.buttons.length;
                },
                complexSelect: true,
                ai1(button) {
                    const { player, allUse } = get.event();
                    const targets = game.filterPlayer(target => {
                        if (target.isMin() || target.hasSkill("biantian2") || target.hasSkill("dawu2")) {
                            return false;
                        }
                        let att = get.attitude(player, target);
                        if (att >= 4) {
                            if (target.hp > 2 && (target.isHealthy() || target.hasSkillTag("maixie"))) {
                                return false;
                            }
                            if (allUse || target.hp == 1) {
                                return true;
                            }
                            if (target.hp == 2 && target.countCards("he") <= 2) {
                                return true;
                            }
                        }
                        return false;
                    });
                    if (ui.selected.buttons.length < targets.length) {
                        return 1;
                    }
                    return 0;
                },
                ai2(target) {
                    const { player, allUse } = get.event();
                    if (target.isMin() || target.hasSkill("biantian2") || target.hasSkill("dawu2")) {
                        return 0;
                    }
                    let att = get.attitude(player, target);
                    if (att >= 4) {
                        if (target.hp > 2 && (target.isHealthy() || target.hasSkillTag("maixie"))) {
                            return 0;
                        }
                        if (allUse || target.hp == 1) {
                            return att;
                        }
                        if (target.hp == 2 && target.countCards("he") <= 2) {
                            return att * 0.7;
                        }
                        return 0;
                    }
                    return -1;
                },
            })
            .set("allUse", player.getExpansions("qixing").length >= game.countPlayer(current => get.attitude(player, current) > 4) * 2)
            .forResult();
        event.result = {
            bool: bool,
            targets: targets?.sortBySeat(),
            cost_data: cost_data,
        };
    },
   
    },
    
    olcuipoEN:{
        inherit:"olcuipo",
        audio:"olcuipo",
        content() {
        var card = trigger.card;
        if (trigger.addCount !== false) {
                    trigger.addCount = false;
                    const stat = player.getStat().card,
                        name = trigger.card.name;
                    if (typeof stat[name] === "number") {
                        stat[name]--;
                    }
        }
        if (card.name == "sha" || (get.type(card) == "trick" && get.tag(card, "damage") > 0)) {
            trigger.baseDamage++;
        }
            player.draw();
        
    },
    
    
    
    
    
    
    
    
    },
    
    yuxuEN:{
        trigger:{
            player:"useCardAfter",
        },
        zhuanhuanji:true,
        audio:"yuxu",
        marktext: "☯",
        mark: true,
        forced:true,
        intro: {
            content(storage, player, skill) {
                const str = storage ? "弃置一张牌": "摸一张牌";
                return `你使用牌结算后${str}`;
            },
        },
        onremove(player, skill) {
            delete player.storage[skill];
            player.removeTip(skill);
        },
        async content(event,trigger,player){
            await player.changeZhuanhuanji(event.name);
            if(player.storage[event.name]){
                await player.draw();
            }
            else{
                await player.chooseToDiscard("hes",true);
            }
            
            player.addTip(event.name,`玉虚:${player.storage[event.name]?"弃":"摸"}`,false);
        },    
        
    
       
    },
    xjshijianEN:{
        audio:"xjshijian",
        inherit:"xjshijian",
        group:"xjshijianEN_draw",
        subSkill:{
            draw: {
            audio: "xjshijian",
            forced: true,
            locked: false,
            trigger: {
                global: "changeZhuanhuanji",
            },
            filter(event, player) {
                const index = game.getRoundHistory("everything", evt => evt.name == "changeZhuanhuanji").indexOf(event);
                return index >= 0 && index < player.maxHp;
            },
            async content(event, trigger, player) {
                await player.draw();
            },
           
            "_priority": 0,
        },
        },content() {
        "step 0";
        var next = player.chooseToDiscard("he", get.prompt("xjshijianEN", trigger.player), "弃置一张牌并令其获得技能〖玉虚〗至回合结束");
        next.set("logSkill", ["xjshijianEN", trigger.player]);
        next.set("check", get.attitude(player, trigger.player) > 0 && trigger.player.countCards("h") > 2);
        next.ai = function (card) {
            if (_status.event.check) {
                return 5 - get.value(card);
            }
            return -1;
        };
        "step 1";
        if (result.bool) {
            trigger.player.addTempSkills("yuxuEN");
        }
    },
    },
   
	fenyinDIY:{
	    trigger: {
            player: "useCard",
        },
        audio:"fenyin",
        frequent:true,
    filter(event, player) {
        if (
            !player.hasHistory("lose", function (evt) {
                const evtx = evt.relatedEvent || evt.getParent();
                return evt.hs.length > 0 && evtx == event;
            }) ||
            !event.cards.filterInD("oe").length
        ) {
            return false;
        }
        var history = game.getGlobalHistory("useCard");
        var index = history.indexOf(event);
        if (index < 1) {
            return false;
        }
        return get.color(event.card) != get.color(history[index - 1].card);
    },
    content(){
        player.draw();
    }
    
    
    
    
    
	},
    	
	

    
    




   


    
    


}