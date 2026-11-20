import { game, ui, _status, ai, lib, get } from "../../../noname.js" 
export const skills = {
    /*tupoJiang:{
        inherit:"jiang",
        audio:"jiang",
        filter(event, player) {
            //if (!(event.card.name == "juedou" || (event.card.name == "sha" && get.color(event.card) == "red"))) return false;
            if(player.hasSkill("tupoJiang_used")) return false;
            return player == event.target || event.getParent().triggeredTargets3.length == 1;
        },
        frequent: false,
        async content(event, trigger, player) {
            await player.draw();
            if (!(trigger.card.name == "juedou" || (trigger.card.name == "sha" && get.color(trigger.card) == "red"))) player.addTempSkill( "tupoJiang_used");
        },
        group:"tupoJiang_buff",
        subSkill:{
            used: {
                charlotte: true,
                sub: true,
                sourceSkill: "tupoJiang",
            },
            buff:{
                trigger:{
                    player:"phaseDrawBegin",
                },
                audio:"jiang",
                forced:true,
                async content(event,trigger,player){
                    var card=get.cardPile(function(card){
                        return card.name=='juedou';
                    });
                    await player.gain( card, "bySelf");
                },
                sub: true,
                sourceSkill: "tupoJiang",
            }
        }
    },*/
    QD_zhiheng: {
        enable: 'phaseUse',
        audio:"zhiheng",
        filterTarget(card, player, target) {
            return target.countCards('he');
        },
        selectTarget: 1,
        usable: 1,
        async content(event, trigger, player) {
            const hs = event.target.getCards('h');
            const es = event.target.getCards('e');
            const { result } = await player.discardPlayerCard(event.target, 'he', [1, hs.concat(es).length]).set('ai', (button) => 1);
            let num = result?.cards?.length;
            if (num) {
                if (es.length && !event.target.countCards('e')) {
                    num++;
                }
                if (hs.length && !event.target.countCards('h')) {
                    num++;
                }
                player.draw(num);
            }
        },
        subSkill: {
            1: {},
        },
        ai: {
            order: 10,
            result: {
                target(player, target, card) {
                    return -target.countCards('he');
                },
                player(player, target, card) {
                    return 2 + target.countCards('he');
                },
            },
        },
    },
    moer:{
        trigger: {
            player: ["useCard","respond"],
        },
        audio:"yingzi",
        forced: true,
        filter(event, player) {
            var num = player.getAllHistory("useCard").length + player.getAllHistory("respond").length;
            return num % 2 == 0;
        },
        content(){
            player.draw().gaintag = ["moer"];
        },
        mod:{
            cardUsable(card) {
                if (get.number(card) === "unsure" || card.cards?.every(card => card.hasGaintag("moer"))) return Infinity;
            },

        }
        
    },
    cvolxuanfeng:{
        inherit:"olxuanfeng",
        audio:"xuanfeng",
        mod: {
            attackRangeBase(player) {
                var num = lib.card?.zhangba?.distance?.attackFrom;
                return Math.max(player.getEquipRange(player.getCards("e")), 1 - num);
            },
        },
        group:"zhangba_skill",
    },
    pomingce:{
        inherit:"remingce",
        audio:"remingce",
        filterCard:true,
        filter(event, player) {
            return player.countCards("he") > 0;
        },

    },
    poxianzhen:{
        inherit:"xianzhen",
        audio: "rexianzhen",
        
        enable: "phaseUse",
        usable: 1,
        filterTarget(card, player, target) {
            return player.canCompare(target);
        },
        filter(event, player) {
            return true;
        },
        async content(event, trigger, player) {
            await player.draw(2);
            const target = event.target;
            const {
                result: { bool },
            } = await player.chooseToCompare(target);
            if (bool) {
                player.markAuto("olxianzhen_effect", [target]);
                player.addTempSkill("olxianzhen_effect");
            } else {
                player.markAuto("olxianzhen_buff", [target]);
                player.addTempSkill("olxianzhen_buff");
            }
        },
        ai: {
            order(name, player) {
                var cards = player.getCards("h");
                if (player.countCards("h", "sha") == 0) {
                    return 1;
                }
                for (var i = 0; i < cards.length; i++) {
                    if (cards[i].name != "sha" && get.number(cards[i]) > 11 && get.value(cards[i]) < 7) {
                        return 9;
                    }
                }
                return get.order({ name: "sha" }) - 1;
            },
            result: {
                player(player) {
                    if (player.countCards("h", "sha") > 0) return 0;
                    var num = player.countCards("h");
                    if (num > player.hp) return 0;
                    if (num == 1) return -2;
                    if (num == 2) return -1;
                    return -0.7;
                },
                target(player, target) {
                    var num = target.countCards("h");
                    if (num == 1) return -1;
                    if (num == 2) return -0.7;
                    return -0.5;
                },
            },
            threaten: 1.3,
        },
    },
    po_yongsi:{
        trigger:{
            player:"useCard",
        },
        audio:"yongsi",
        filter(event, trigger) {
            return true; 
        },
        init:function(player) {
            player.storage.po_yongsi =0;
        },
        async content(event, trigger, player) {
            player.storage.po_yongsi++;
            await player.draw(3);
            await player.chooseToDiscard("he",player.storage.po_yongsi,true);
        },
        group:["po_yongsi_clear"],
        subSkill:{
            clear:{
                forced:true,
                trigger:{
                    global:"roundStart"
                },
                content:function() {
                    player.storage.po_yongsi =0;
                }
            }
        }
    },
    poclanqiajue:{
        inherit:"clanqiajue",
        audio:"clanqiajue",
        filter(event, player) {
            return player.countCards("he") > 0;
        },
        async content(event, trigger, player) {
            const {
                result: { bool },
            } = await player
                .chooseToDiscard((card, player) => {
                    return lib.filter.cardDiscardable(card, player);
                }, "he")
                .set("prompt", "当前手牌点数和为" + player.getCards("h").reduce((sum, card) => sum + get.number(card), 0) + "，" + get.prompt("poclanqiajue"))
                .set("prompt2", lib.translate.poclanqiajue_info.slice(lib.translate.poclanqiajue_info.indexOf("弃置")).slice(0, -1))
                .set("ai", card => {
                    const player = get.event("player"),
                        goon = get.position(card) == "h";
                    let num = player.getCards("h").reduce((sum, card) => sum + get.number(card), 0);
                    if (num - (goon ? get.number(card) : 0) > 30) {
                        return 0;
                    }
                    return goon ? get.number(card) : 1 / (get.value(card) || 0.5);
                })
                .set("logSkill", "poclanqiajue");
            if (bool) {
                player
                    .when({
                        player: ["phaseDrawEnd", "phaseDrawCancelled", "phaseUseSkipped"],
                    })
                    .filter(evt => evt == trigger)
                    .then(() => {
                        const cards = player.getCards("h"),
                            num = cards.reduce((sum, card) => sum + get.number(card), 0);
                        if (cards.length) {
                            player.showCards(cards, get.translation(player) + "【跒倔】展示");
                        }
                        if (num > 30) {
                            player.popup("杯具");
                            lib.skill.chenliuwushi.change(player, -1);
                        } else {
                            player.popup("洗具");
                            const evt = trigger.getParent("phase", true, true);
                            if (evt?.phaseList) {
                                evt.phaseList.splice(evt.num + 1, 0, "phaseDraw|clanqiajue");
                            }
                        }
                    });
            }
        },
    },
    poclanyunshen:{
        inherit:"clanyunshen",
        audio:"clanyunshen",
        filterTarget(card, player, target) {
            return true;
        },
        content() {
            "step 0";
            target.recover();
            "step 1";
            var name = get.translation(target);
            player
                .chooseControl()
                .set("choiceList", [name + "视为对你使用一张冰【杀】", "你视为对" + name + "使用一张冰【杀】"])
                .set("prompt", "熨身：请选择一项")
                .set("ai", () => _status.event.choice)
                .set(
                    "choice",
                    (function () {
                        var card = {
                            name: "sha",
                            nature: "ice",
                            isCard: true,
                        };
                        var eff = get.effect(player, card, target, player),
                            eff2 = get.effect(target, card, player, player);
                        if (eff > eff2) {
                            return "选项一";
                        } else {
                            return "选项二";
                        }
                    })()
                );
            "step 2";
            var players = [target, player];
            if (result.control == "选项二") {
                players.reverse();
            }
            var card = { name: "sha", nature: "ice", isCard: true };
            players[0].useCard(card, players[1], false, "noai");
            /*
            if (players[0].canUse(card, players[1], false)) {
                players[0].useCard(card, players[1], false, "noai");
            }*/
        },
    },
    poclanshangshen:{
        inherit:"clanshangshen",
        audio:"clanshengshen",
        async content(event,trigger,player) {
            await player.executeDelayCardEffect("shandian");
            var r1=await trigger.player.chooseBool("是否将手牌摸至4张牌，否则摸两张牌").set("ai",function(){
                return _status.event.player.countCards('h')>=4?false:true;
            }).forResult();
            if(r1.bool){
                await trigger.player.drawTo(4);
            }else await trigger.player.draw(2);
        },

    },
    poclanzhanding:{
        inherit:"clanzhanding",
        audio:"clanzhanding",
        onuse(links, player) {
            lib.skill.chenliuwushi.change(player, -1);
            player.addTempSkill("poclanzhanding_effect");
        },
        subSkill:{
            effect:{
                trigger: {
                    player: "useCardAfter",
                },
                forced: true,
                popup: false,
                filter(event, player) {
                    return event.skill == "poclanzhanding";
                },
                content() {
                    if (
                        player.hasHistory("sourceDamage", function (evt) {
                            return evt.card == trigger.card;
                        })
                    ) { 
                        lib.skill.chenliuwushi.change(player, 1);
                        var num1 = player.countCards("h"),
                        num2 = player.getHandcardLimit();
                        if (num1 < num2) {
                            player.draw(num2 - num1);
                        }
                        
                    } else if (trigger.addCount !== false) {
                        trigger.addCount = false;
                        player.getStat().card.sha--;
                        player.recast(trigger.cards);
                    }
                },
                sub: true,
                sourceSkill: "clanzhanding",
                "_priority": 0,
            },
        }
    },
    potairan:{
        inherit:"tairan",
        audio:"tairan",
        content() {
            "step 0";
            player.addSkill("tairan2");
            if (!player.storage.tairan2) {
                player.storage.tairan2 = 0;
            }
            var num = player.maxHp - player.hp;
            if (num > 0) {
                player.storage.tairan2 = num;
                player.recover(num);
            }
            "step 1";
            if (player.countCards("h") < player.maxHp) {
                player.drawTo(player.maxHp);
            }
        },
    },
    pojiba:{
        enable:"phaseUse",
        usable:1,
        audio:"sbhunzi",
        async content(event,trigger,player){
            var num1=player.countCards("h"),
            num2=player.maxHp;
            if(num1<num2){
                await player.drawTo(num2);
                await player.chooseUseTarget({name:"sha"}, true, false);
            }
            else{
                if(num1>num2){
                    await player.chooseToDiscard('h',num1-num2,true);
                }
                await player.gainMaxHp();
            }
        }
    },
    popiaoping:{
        inherit:"piaoping",
        audio:"piaoping",
        init(player) {
            player.storage.popiaoping_num=1;
        },
        content() {
            player.changeZhuanhuanji("popiaoping");
            
            var num = Math.min(
                player.hp,
                player.storage.popiaoping_num
            );
            if(player.storage.popiaoping_num<player.maxHp)player.storage.popiaoping_num++; 
            if (num <= 0) {
                return;
            }
            if (player.storage.popiaoping == true) {
                player.draw(num);
            } else if (
                player.hasCard(function (card) {
                    return lib.filter.cardDiscardable(card, player, "popiaoping");
                }, "he")
            ) {
                game.delayx();
                player.chooseToDiscard(true, "he", num);
            }
        },
        group:['popiaoping_clear'],
        subSkill:{
            clear:{
                trigger:{
                    global:"roundStart",
                },
                forced:true,
                popup:false,
                content(){
                    player.storage.popiaoping_num=1;
                },

            }
        }
    },
    pozhuili:{
        inherit:'zhuili',
        audio:"zhuili",
        filter(event, player) {
            if (player == event.player || get.color(event.card) != "black") {
                return false;
            }
            if (!player.hasSkill("popiaoping", null, null, false)) {
                return false;
            }
            return true;
        },
        content() {
            if (player.storage.popiaoping == true) {
                player.changeZhuanhuanji("popiaoping");
            }
            player.addMark("potuoxian", 1, false);
            game.delayx();
        },
        ai: {
            combo: "popiaoping",
        },

    },
    potuoxian:{
        inherit: "tuoxian",
        filter(event, player) {
            return event.type == "discard" && event.getParent(3).name == "popiaoping" && player.countMark("potuoxian") > player.countMark("potuoxian_used") && event.cards.filterInD("d").length > 0;
        },
        async content(event, trigger, player) {
            const target = event.targets[0],
                cards = event.cards;
            player.addSkill(event.name + "_used");
            player.addMark(event.name + "_used", 1, false);
            await target.gain(cards, "gain2");
            const result = await target
                .chooseControl()
                .set("choiceList", ["弃置区域内的" + get.cnNumber(cards.length) + "张牌", "令" + get.translation(player) + "的〖漂萍〗于本回合内失效"])
                .set("ai", function () {
                    const player = _status.event.player,
                        target = _status.event.getParent().player;
                    if (
                        player.hasCard(function (card) {
                            return get.effect(player, { name: card.viewAs || card.name }, player, player) < 0;
                        }, "j") ||
                        player.hasCard(function (card) {
                            return get.value(card, player) <= 0;
                        })
                    ) {
                        return 0;
                    }
                    if (get.attitude(player, target) <= 0 || !target.isPhaseUsing()) {
                        return 1;
                    }
                    if (
                        !target.needsToDiscard() &&
                        !target.hasCard(function (card) {
                            return !target.hasValueTarget(card, null, true);
                        }, "hs")
                    ) {
                        return 1;
                    }
                    return 0;
                })
                .forResult();
            if (result.index == 0) {
                const num = Math.min(target.countCards("hej"), cards.length);
                if (target.countCards("j") > 0) {
                    await target.discardPlayerCard(target, num, true, "hej");
                } else {
                    await target.chooseToDiscard("he", true, num);
                }
            } else {
                player.tempBanSkill("popiaoping");
            }
        },
        init(player) {
            player.addMark("potuoxian", 1, false);
        },
        intro: {
            "name2": "栗",
            markcount(storage, player) {
                return player.countMark("potuoxian") - player.countMark("potuoxian_used");
            },
            content(storage, player) {
                return `剩余可用${player.countMark("potuoxian") - player.countMark("potuoxian_used")}次`;
            },
        },
        subSkill: {
            used: {
                charlotte: true,
                onremove: true,
                sub: true,
                sourceSkill: "potuoxian",
                "_priority": 0,
            },
        },
    },
    porepojun:{
        audio: 'repojun',
        trigger: {
            player: "useCardToPlayered",
        },
        filter(event, player) {
            return event.card.name == "sha" && event.target.hp > 0 && event.target.countCards("he") > 0;
        },
        async content(event,trigger,player){
            await player.discardPlayerCard(trigger.target,false,[1,Math.min(trigger.target.hp,trigger.target.countCards("he"))]);
        },
        group:"repojun3",

    },
    poyuheng:{
        inherit:"junkyuheng",
        content() {
            "step 0";
            player.draw();
            "step 1";
            
            player
                .chooseToDiscard("he", true, [1, Infinity], function (card, player) {
                    if (!ui.selected.cards.length) {
                        return true;
                    }
                    return true;
                })
                .set("complexCard", true)
                .set("ai", function (card) {
                    if (!player.hasValueTarget(card)) {
                        return 5;
                    }
                    return 5 - get.value(card);
                });
            "step 2";
            if (result.bool) {
                var skills = lib.skill.junkyuheng.derivation.randomGets(result.cards.length);
                player.addAdditionalSkills("junkyuheng", skills, true);
            }
        },
    },
    pochenglue:{
        enable: "phaseUse",
        usable: 1,
        audio: "nzry_chenglve",
        filter: function (event, player) {
            return true;
        },
        async content(event, trigger, player) {
            await player.draw(2);
            var r1=await player.chooseToDiscard('h',[1,Infinity],"弃置任意张牌").forResult();
            if (r1.bool) {
                const effect = "nzry_chenglve_effect";
                player.addTempSkill(effect);
                player.markAuto(effect, r1.cards.map(card => get.suit(card, player)).unique());
                player.storage[effect].sort((a, b) => lib.suits.indexOf(b) - lib.suits.indexOf(a));
                player.addTip(effect, get.translation(effect) + player.getStorage(effect).reduce((str, suit) => str + get.translation(suit), ""));
            }
        }
    },
    zishuzhiheng:{
        enable:"phaseUse",
        audio:"zhiheng",
        usable:1,
        filter(event,player){
            return player.countCards('he')>0;
        },
        filterCard:true,
        selectCard:[1,Infinity],
        position:"he",
        async content(event,trigger,player){
            var L=0;
            for(var i of event.cards){
                L+=get.cardNameLength(i,player);
            }
            await player.draw(L);
        }
    },

    pocanshi:{
        trigger:{
            player:"phaseDrawBegin1",
        },
        forced:true,
        audio:"canshi",
        filter(event, player) {
            return (
                !event.numFixed
            );
        },
        content(){
            trigger.num+=10;
            player.addTempSkill("pocanshi_effect");
            
        },
        subSkill:{
            effect:{
                trigger: {
                    player: "useCard",
                },
                forced: true,
                sourceSkill: "pocanshi",
                filter(event, player) {
                    return true;
                },
                autodelay: true,
                content() {
                    player.chooseToDiscard(true, "he");
                },

            }
        }
    },
    poyaowu:{
        inherit:"shizhan",
        usable:Infinity,
        audio:"olsbbojue",
        content() {
            'step 0';
            target.useCard({ name: "juedou", isCard: true }, player, "noai");
            'step 1';
            player.draw();
        },
    },
    polanjiang:{
        inherit:"lanjiang",
        audio: "lanjiang",
        trigger: {
            player: ["phaseJieshuBegin","phaseZhunbeiBegin"]
        },
        /*filter(event, player) {
            return !player.hasSkill("polanjiang_used")
        },*/
        logTarget(event, player) {
            return game.filterPlayer(current => current.countCards("h") >= player.countCards("h")).sortBySeat();
        },
        logTarget(event, player) {
            return game.filterPlayer().sortBySeat();
        },
        async content(event, trigger, player) {
            /*await player.addTempSkill("polanjiang_used");*/
            for (const target of event.targets) {
                if (!target.isIn()) {
                    continue;
                }
                const bool = await target
                    .chooseBool(`是否令${player == target ? "自己" : get.translation(player)}摸一张牌？`)
                    .set("choice", get.attitude(target, player) > 0)
                    .forResultBool();
                if (bool) {
                    target.line(player);
                    if (player !== target && (get.mode() !== "identity" || target.identity !== "nei")) {
                        target.addExpose(0.15);
                    }
                    await player.draw();
                }
            }
            const {
                result: { bool, targets },
            } = await player
                .chooseTarget("是否对一名手牌数等于自己的目标角色造成1点伤害？", (card, player, target) => {
                    return get.event().getParent().targets.includes(target) && target.countCards("h") == player.countCards("h");
                })
                .set("ai", target => {
                    const player = get.player();
                    return get.damageEffect(target, player, player);
                });
            if (!bool) {
                return;
            }
            const [target] = targets;
            player.line(target, "green");
            if (get.mode() !== "identity" || player.identity !== "nei") {
                player.addExpose(0.15);
            }
            await target.damage();
            if (event.targets.some(target => target.isIn() && target.countCards("h") < player.countCards("h"))) {
                const {
                    result: { bool, targets },
                } = await player
                    .chooseTarget(
                        "请选择一名手牌数小于自己的目标角色，令其摸一张牌",
                        (card, player, target) => {
                            return get.event().getParent().targets.includes(target) && target.countCards("h") < player.countCards("h");
                        },
                        true
                    )
                    .set("ai", target => {
                        const player = get.player();
                        return get.effect(target, { name: "draw" }, player, player);
                    });
                if (!bool) {
                    return;
                }
                const [target] = targets;
                player.line(target);
                if (player !== target && (get.mode() !== "identity" || player.identity !== "nei")) {
                    player.addExpose(0.1);
                }
                await target.draw(2);
            }
        },
        subSkill: {
            used: {
                charlotte: true,
                onremove: true,
                sub: true,
                sourceSkill: "polanjiang",
                "_priority": 0,
            },
        },


    },
    pojianhe:{
        inherit:"oljianhe",
        audio:"oljianhe",
        filterCard(card, player) {
            if (ui.selected.cards.length) {
                var cardx = ui.selected.cards[0];
                if (get.type(cardx) == "equip") {
                    return get.type(card) == "equip";
                }
                return get.type(card) == get.type(cardx);
            }
            var cards = player.getCards("he");
            for (var cardx of cards) {
                if (card != cardx) {
                    if (get.type(cardx) == "equip" && get.type(card) == "equip") {
                        return true;
                    }
                    if (get.type(card) == get.type(cardx)) {
                        return true;
                    }
                }
            }
            return false;
        },
    },
    poshenxing:{
        trigger:{
            player:["phaseDrawEnd","phaseJieshuBegin"],
        },
        audio:"shenxing",
        filter(event, player) {
            return player.countCards("he") > 1;
        },
        async content(event, trigger, player) {
           const r=await player.chooseToDiscard("he", "弃置任意张牌并摸等两张牌",[1,Infinity],false).forResult();
           if(r.bool) await player.draw(r.cards.length);
        },
        group:"shenxing",
    },
    spguixiang:{
        audio: "clanguixiang",
        trigger: {
            player: "phaseChange",
        },
        forced: true,
        filter(event, player) {
            if (event.phaseList[event.num].startsWith("phaseUse")) {
                return false;
            }
            return true;
        },
        content() {
            trigger.phaseList[trigger.num] = `phaseUse|${event.name}`;
            game.delayx();
        },
    },
    spyirong:{
        audio:"clanyirong",
        enable:"phaseUse",
        usable:1,
        content(){
            player.draw(2);
            player.skip("phaseUse");
        }
    },
    hajiqizhi:{
        inherit:"qizhi",
        audio:"qizhi",
        async cost(event, trigger, player) {
            event.result = await player
                .chooseTarget(get.prompt(event.skill), "弃置一名角色的一张牌，然后你摸一张牌", function (card, player, target) {
                    return !_status.event.targets.includes(target) && target.countCards("he") > 0;
                })
                .set("ai", function (target) {
                    var player = _status.event.player;
                    if (target == player) {
                        return 2;
                    }
                    if (get.attitude(player, target) <= 0) {
                        return 1;
                    }
                    return 0.5;
                })
                .set("targets", trigger.targets)
                .forResult();
        },
        async content(event, trigger, player) {
            const target = event.targets[0];
            player.getHistory("custom").push({ [event.name]: true });
            await player.discardPlayerCard(target, true, "he");
            await player.draw();
        },

    },

    diyTuxi: {
        audio: "tuxi",
        trigger: {
            player: "phaseDrawBegin",
        },
        filter(event, player) {
            return !event.numFixed;
        },
        async cost(event, trigger, player) {
            let num = game.countPlayer(current => current != player && current.countCards("h") > 0 && get.attitude(player, current) <= 0);
            let check = num >= 2;
            const { result } = await player
                .chooseTarget(
                    get.prompt("tuxi"),
                    "获得其他一至两名角色的各一张手牌",
                    [1, 2],
                    (card, player, target) => {
                        return target.countCards("h") > 0 && player != target;
                    },
                    target => {
                        if (!_status.event.aicheck) return 0;
                        const att = get.attitude(_status.event.player, target);
                        if (target.hasSkill("tuntian")) return att / 10;
                        return 1 - att;
                    }
                )
                .set("aicheck", check);
            event.result = result;
        },
        async content(event, trigger, player){
            
            var mycards=player.countCards('h');
            for(var i of event.targets){
                if(i.countCards('h')>=mycards) i.damage("nocard");
            }
            player.gainMultiple(event.targets);
            game.asyncDelay();
            //console.log(event.targets);
            
        },
        ai: {
            threaten: 2,
            expose: 0.3,
        },
        "_priority": 0,
    },

    myHaoqing: {
        trigger: {
            player: "phaseUseBegin",
        },
        forced: true,
        filter(event,player){
            return player.getDamagedHp();
        },
        async content(event,trigger,player){
            var n=player.getDamagedHp();
            await player.draw(n);
            var r=await player.chooseToDiscard('he',n,true).forResult('cards');
            if(r.length){
                await player.draw(r.length)
            }
        },
        mod: {
            maxHandcard: function(player,num){
                return Math.max(num,player.getDamagedHp());
            },
        },
        "_priority": 0,
    },
    




    podangxian:{
        //inherit:"oldangxian",
        //audio:"dangxian",
        //group:'oldangxian',
        trigger: {
            player: "phaseBegin",
        },
        forced: true,
        audio: "dangxian",
        async content(event, trigger, player) {
            player.drawTo(player.maxHp);
            const card = get.discardPile(card => card.name == "sha");
            if (card) {
                await player.gain(card, "gain2");
            }
            game.updateRoundNumber();
            trigger.phaseList.splice(trigger.num, 0, `phaseUse|${event.name}`);
        },


    },


    poLuoyi:{
        trigger:{
            player:"phaseDrawBegin",
        },
        audio:"luoyi",
        filter(event,player){
            return player.hasUseTarget({name:"sha"},false,false);
        },
        async content(event,trigger,player){
            var card={name:"sha"};
            await player.chooseUseTarget(card, true, false, "nodistance");

            await player.chooseUseTarget(card, true, false, "nodistance");
            trigger.cancel();
            console.log(event);
            console.log(trigger);

        },
    },
   

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


    poLizhan:{
        trigger:{
            player:["phaseJieshuBegin","phaseZhunbeiBegin"]
        },
        audio:"paoxiao",
        frequent:true,
        filter(event,player){
            if(event.name=="phaseZhunbei") return true;
            return typeof player.getStat("damage") == "number";
        },
        async content(e,t,p){
            
            if(t.name=="phaseZhunbei"){
                var card=get.cardPile("sha");
                if(card) p.gain(card,"gain2");
            }
            else{
                if(typeof p.getStat("damage") == "number") await p.draw(Math.min(5,p.getStat("damage")));
            }
           

        }
    },

    poLangcai:{
        trigger:{
            player:"phaseUseEnd",
        },
        frequent:true,
        async content(event,trigger,player){
            var result=await player.chooseControl(["将手牌摸至手牌上限","手牌上限+1"]).forResult();
            //console.log(result);
            if(result.control){
                if(result.control=="将手牌摸至手牌上限"){
                    await player.drawTo(player.getHandcardLimit())
                }
                else lib.skill.chenliuwushi.change(player,1);
            }
        }
    },

    poJushou:{
        trigger:{
            player:"changeHp"
        },
        filter(event,player){
            return event.num<0;
        },
        forced: true,
        audio: "xinjushou",
        async content(event,trigger,player){
            //console.log(event,trigger,player);
            await player.changeHujia(1);
        }
    },

    poJiewei:{
        inherit:"dcjiusi",
        audio:"xinjiewei",
        filter(event, player) {
            if (event.type === "wuxie") {
                return false;
            }
            return get
                .inpileVCardList(info => get.type(info[2]) == "basic")
                .some(card => {
                    return event.filterCard({ name: card[2], nature: card[3] }, player, event);
                });
        },
        chooseButton: {
            dialog(event, player) {
                const list = get
                    .inpileVCardList(info => get.type(info[2]) == "basic")
                    .filter(card => {
                        return event.filterCard({ name: card[2], nature: card[3] }, player, event);
                    });
                return ui.create.dialog("解围", [list, "vcard"], "hidden");
            },
            check(button) {
                const event = get.event().getParent();
                if (event.type !== "phase") {
                    return 1;
                }
                return get.player().getUseValue({ name: button.link[2], nature: button.link[3] });
            },
            prompt(links) {
                return "受到一点伤害摸一张牌，视为使用" + (get.translation(links[0][3]) || "") + get.translation(links[0][2]);
            },
            backup(links, player) {
                return {
                    selectCard: -1,
                    filterCard: () => false,
                    viewAs: {
                        name: links[0][2],
                        nature: links[0][3],
                        isCard: true,
                    },
                    log: false,
                    precontent() {
                        player.logSkill("poJiewei");
                        player.damage();
                        player.draw();
                    },
                };
            },
        },
        hiddenCard(player, name) {
            if (player.getStat("skill").poJiewei) {
                return false;
            }
            return get.type(name) == "basic" && lib.inpile.includes(name);
        },

    },

    poYiji:{
        //inherit:"new_reyiji",
        audio:"xianmou",
        trigger: {
            player: ["phaseZhunbeiBegin","damageEnd"]
        },
        frequent: true,
        filter(event,player) {
            //if (event.name=="phase") return true;
            //return event.num > 0;
            return true;
        },
        getIndex(event, player, triggername) {
            
            return event.num||1;
        },
        content() {
            "step 0";
            
            player.chooseToGuanxing(2);
            player.draw(2);
            if (_status.connectMode) {
                game.broadcastAll(function () {
                    _status.noclearcountdown = true;
                });
            }
            event.given_map = {};
            event.num = 2;
            "step 1";
            player.chooseCardTarget({
                filterCard(card) {
                    return get.itemtype(card) == "card" && !card.hasGaintag("reyiji_tag");
                },
                filterTarget: lib.filter.notMe,
                selectCard: [1, event.num],
                prompt: "请选择要分配的卡牌和目标",
                ai1(card) {
                    if (!ui.selected.cards.length) {
                        return 1;
                    }
                    return 0;
                },
                ai2(target) {
                    var player = _status.event.player,
                        card = ui.selected.cards[0];
                    var val = target.getUseValue(card);
                    if (val > 0) {
                        return val * get.attitude(player, target) * 2;
                    }
                    return get.value(card, target) * get.attitude(player, target);
                },
            });
            "step 2";
            if (result.bool) {
                var res = result.cards,
                    target = result.targets[0].playerid;
                player.addGaintag(res, "reyiji_tag");
                event.num -= res.length;
                if (!event.given_map[target]) {
                    event.given_map[target] = [];
                }
                event.given_map[target].addArray(res);
                if (event.num > 0) {
                    event.goto(1);
                }
            } else if (event.num == 2) {
                if (_status.connectMode) {
                    game.broadcastAll(function () {
                        delete _status.noclearcountdown;
                        game.stopCountChoose();
                    });
                }
                event.finish();
            }
            "step 3";
            if (_status.connectMode) {
                game.broadcastAll(function () {
                    delete _status.noclearcountdown;
                    game.stopCountChoose();
                });
            }
            var map = [],
                cards = [];
            for (var i in event.given_map) {
                var source = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
                player.line(source, "green");
                if (player !== source && (get.mode() !== "identity" || player.identity !== "nei")) {
                    player.addExpose(0.18);
                }
                map.push([source, event.given_map[i]]);
                cards.addArray(event.given_map[i]);
            }
            game.loseAsync({
                gain_list: map,
                player: player,
                cards: cards,
                giver: player,
                animate: "giveAuto",
            }).setContent("gaincardMultiple");
        },
        ai: {
            maixie: true,
            "maixie_hp": true,
            effect: {
                target(card, player, target) {
                    if (get.tag(card, "damage")) {
                        if (player.hasSkillTag("jueqing", false, target)) {
                            return [1, -2];
                        }
                        if (!target.hasFriend()) {
                            return;
                        }
                        let num = 1;
                        if (get.attitude(player, target) > 0) {
                            if (player.needsToDiscard()) {
                                num = 0.7;
                            } else {
                                num = 0.5;
                            }
                        }
                        if (target.hp >= 4) {
                            return [1, num * 2];
                        }
                        if (target.hp == 3) {
                            return [1, num * 1.5];
                        }
                        if (target.hp == 2) {
                            return [1, num * 0.5];
                        }
                    }
                },
            },
            threaten: 0.6,
        }
        
    },

    juejing_po:{
        trigger:{
            player:"changeHp",
        },
        audio:"xinjuejing",
        forced:true,
        async content(event,trigger,player){
            await player.draw();
        }
    },

    lianying_po:{
        enable:"phaseUse",
        usable:1,
        audio:"lianying",
        async content(event,trigger,player){
            //判定写法
            /*event.cards=[];
            event.brekk=0;
            while(true){
                var r=await player.judge(card=>{
                    return get.tag(card,"damage")>0.5?-1:1;
                }).set("callback",event=>{
                    var evt = event.getParent(2);
                    evt.cards.push(event.judgeResult.card);
                    if(get.tag(event.judgeResult.card,"damage")>0.5) evt.brekk=1;
                });
                if(event.brekk){
                    await player.gain(event.cards,"gain2");
                    break;
                }
            }
            */

            //摸牌写法
            while(true){
                const { result } = await player.draw("visible");
                if (result) {
                    const card = result[0];
                    if(get.tag(card,"damage")>0.5) break;
                }
            }
            



        },
    },

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
    fangu:{
        trigger:{
            global:"discardAfter",
        },
        audio: "kuanggu",
        forced:true,
        async content(event,trigger,player){
            await player.draw();
        },
    }

    
    
}