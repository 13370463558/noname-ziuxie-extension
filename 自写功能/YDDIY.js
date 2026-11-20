import { game, ui, _status, ai, lib, get } from "../../noname.js"
import { delay } from "../../../noname/util/index.js";
export const YDDIY ={
    yddiy:{
        name:"dxdiy",
        connect:true,
        character:{
            /*diyGuanyu:{
                sex:"male",
                group:"qun",
                hp:4,
                maxHp:4,
                skills:["diyZhanjiang","sbwusheng_wusheng"],
                trashBin: ['character:guanyu']
            },*/
            diyGuohuai:{
                sex:"male",
                group:"wei",
                hp:4,
                maxHp:4,
                skills:[`diyJingce`],
                trashBin: ['character:guohuai']
            },
            diyYuanshu2:{
                sex:"male",
                group:"qun",
                hp:4,
                maxHp:4,
                skills:["diyYongsi2"],
                trashBin: ['character:yuanshu']
            },
            diyZhouyu:{
                sex:"male",
                group:"wu",
                hp:3,
                maxHp:3,
                skills:["diyYingzi"],
                trashBin: ['character:zhouyu']
            },
            diySunquan2:{
                sex:"male",
                group:"wu",
                hp:4,
                maxHp:4,
                skills:["diyzhiheng2"],
                //img: "https://free4.yunpng.top/2025/04/29/6810d5a6ea833.png",
                trashBin: ['character:jd_sb_sunquan']
            },
            diyDuanjiong:{
                sex:"male",
                group:"qun",
                hp:4,
                maxHp:4,
                skills:["diyQuman"],
                //img: "https://free4.yunpng.top/2025/04/29/6810d5a6ea833.png",
                trashBin: ['character:duanjiong']
            },
            diyZhugejin:{
                sex:"male",
                group:"wu",
                hp:3,
                maxHp:3,
                skills:["diyMingzhe","huanshi","olhongyuan"],
                img:`https://patchwiki.biligame.com/images/sgsol/b/b3/fmisneabv5m4kwthlfdaqy8tyue4d4o.png`,
                //trashBin: ['character:sb_zhugejin']

            },
            diyLvbu:{
                sex:"male",
                group:"qun",
                hp:5,
                maxHp:5,
                skills:["diyWushuang","new_liyu"],
                trashBin: ['character:sb_lvbu']

            },
            diyLusu:{
                sex:"male",
                group:"shu",
                hp:3,
                maxHp:3,
                skills:["diyHaoshi"],
                trashBin: ['character:ol_lusu']

            },
            diyJianshengLiubei:{
                sex:"male",
                group:"qun",
                hp:4,
                maxHp:4,
                skills:["diyJiansheng","diyZhangming"],
                trashBin: ['character:jsrg_liubei']
            },
            diyJiangwei:{
                sex:"male",
                group:"shu",
                hp:4,
                maxHp:9,
                skills:["diyBeifa"],
                trashBin: ['character:ol_sb_jiangwei']
            },
            diyZhonghui:{
                sex:"male",
                group:"wei",
                hp:3,
                maxHp:3,
                skills:["diyQuanji","diyPaiyi","diyRuchuan"],
                trashBin: ['character:yj_zhonghui']
            },
            diyYanjun:{
                sex:"male",
                group:"wu",
                hp:3,
                maxHp:3,
                skills:["diyGuanchao"],
                trashBin: ['character:yanjun']
            },
            diyWuban:{
                sex:"male",
                group:"shu",
                hp:4,
                maxHp:4,
                skills:["diyJintao"],
                trashBin: ['character:wuban']
            },
            diyCaopi:{
                sex:"male",
                group:"wei",
                hp:3,
                maxHp:3,
                skills:["diyZhengSi"],
                trashBin: ['character:caopi']
            },
            diySundeng:{
                sex:"male",
                group:"wu",
                hp:4,
                maxHp:4,
                skills:["diyKuangbi"],
                trashBin: ['character:re_sundeng']
            },
            diySunce:{
                sex:"male",
                group:"wu",
                hp:4,
                maxHp:4,
                skills:["diyZhiba","jiang"],
                trashBin: ['character:sb_sunce']
            },
            diyShamoke:{
                sex:"male",
                group:"shu",
                hp:4,
                maxHp:4,
                skills:["diyJili"],
                trashBin: ['character:gz_shamoke']
            },
            diyChengyu:{
                sex:"male",
                group:"wei",
                hp:3,
                maxHp:3,
                skills:["diyShefu","benyu"],
                trashBin: ['character:chengyu']
            },
            diyCaorui:{
                sex:"male",
                group:"wei",
                hp:3,
                maxHp:3,
                skills:["diyMingjian","yyhuituo"],
                trashBin: ['character:yy_caorui']
            },
            diyJiling:{
                sex:"male",
                group:"qun",
                hp:4,
                maxHp:4,
                skills:["diyShuangren","diyQiaoshe"],
                trashBin: ['character:dc_jiling']
            },
            diyLiubei:{
                sex:"male",
                group:"shu",
                hp:4,
                maxHp:4,
                skills:["diyRende","beizhan"],
                trashBin: ['character:re_liubei']
            },
            diyShenlvmeng:{
                sex:"male",
                group:"shen",
                hp:4,
                maxHp:4,
                skills:["diyShelie","diyGongxin"],
                trashBin: ['character:tw_shen_lvmeng']
            },
            diyXiahouyuan:{
                sex:"male",
                group:"wei",
                hp:4,
                maxHp:4,
                skills:["diyShensu","diyShebian"],
                trashBin: ['character:gz_xiahouyuan'],
            },
            diySunyihuanggai:{
                sex:"male",
                group:"wu",
                hp:5,
                maxHp:5,
                skills:["syjiqiao","syxiongyi","zhaxiang","init_sunyihuanggai"],

            },
            diyZhangliaosunquan:{
                sex:"male",
                group:"wei",
                groupBorder:"wu",
                hp:4,
                maxHp:4,
                skills:["diytuxi","rezhiheng"],

            },
            diyXunyouzhongyao:{//荀攸钟繇
                sex:"male",
                group:"wei",
                hp:3,
                maxHp:3,
                skills:["clanbaichu","clandaojie","clanchengqi","clanjieli","init_diyXunyouzhongyao"],
            },
            diyDufurencaoang:{//双头  秦朗
                sex:"male",
                group:"wei",
                hp:4,
                maxHp:4,
                skills:["olxianying","dchaochong","dcjinjin","init_diyDufurencaoang"],
            },
            diyMenghuofunv:{//双头 孟获父女
                sex:"male",
                group:"shu",
                hp:4,
                maxHp:4,
                skills:["spmanwang","manyi","mansi","souying","zhanyuan","init_diyMenghuofunv"],
            },
            diyLingcao:{
                sex:"male",
                group:"wu",
                hp:4,
                maxHp:4,
                skills:["diyDujin"],
                trashBin: ['character:lingcao']
            },
            diySunru:{           
                sex:"female",
                group:"wu",
                hp:3,
                maxHp:3,
                skills: ["diyYingjian","diyShixin"],
                trashBin: ['character:sunru']
            },
            diyCaocao:{
                sex:"male",
                group:"wei",
                hp:4,
                maxHp:4,
                skills: ["diyJianxiong"],
                trashBin: ['character:sb_caocao']
            },
            diyHuaxiong:{
                sex:"male",
                group:"qun",
                hp:6,
                maxHp:6,
                skills: ["diyShizhan","reyaowu"],
                trashBin: ['character:re_huaxiong']
            },
            diyCaoren:{
                sex:"male",
                group:"wei",
                hp:4,
                maxHp:4,
                skills: ["xinjushou","diyJiewei"],
                trashBin: ['character:caoren']
            },
            diyTaishici:{
                sex:"male",
                group:"wu",
                hp:4,
                maxHp:4,
                skills: ["diyDulie","olsbdouchan"],
                trashBin: ['character:ol_sb_taishici']
            },
            diyLitong:{
                sex:"male",
                group:"wei",
                hp:4,
                maxHp:4,
                skills: ["diyTuifeng"],
                trashBin: ['character:litong']
            },
            diyWangxiang:{
                sex:"male",
                group:"jin",
                hp:3,
                maxHp:3,
                skills: ["diyBingxin"],
                trashBin: ['character:wangxiang']
            },
            diyChunge:{           
                sex:"female",
                group:"wei",
                hp:4,
                maxHp:4,
                skills: ["jueqing","shangshi","changeHp"],
                trashBin: ['character:ol_zhangchunhua']
            },
            diyFubendashen:{           //为副本添加技能必须创建人物载体
                sex:"male",
                group:"qun",
                hp:4,
                maxHp:4,
                skills: ["mengzi_fuben","fuyu_fuben","diyJianyi","diyFUji","diyDangxian","diyLongdan"],
                trashBin: ['character:caocao']
            },
            diyXuyou:{
                sex: "male",
                group: 'qun',
                hp: 4,
                maxHp: 4,
                skills: ['aowu',"nzry_shicai","nzry_chenglve"],
                trashBin: ['character:jsrg_xuyou']

            },
            diyYuanshu:{
                sex: "male",
                group: 'qun',
                hp: 4,
                maxHp: 4,
                skills: ['diyYongsi'],
                trashBin: ['character:yuanshu']

            },
            diyWangji:{
                sex: "male",
                group: 'wei',
                hp: 3,
                maxHp: 3,
                skills: ['diyQizhi','diyJinqu'],
                trashBin: ['character:wangji']

            },
            diyPaiwang:{
                sex: "male",
                group: 'qun',
                hp: 4,
                maxHp: 4,
                skills: ['diyzhouxuan','paiwang_put'],
                trashBin: ['character:sp_ol_zhanghe']

            },
            diyLiling:{
                sex: "male",
                group: 'qun',
                hp: 4,
                maxHp: 4,
                skills: ['diyLangxi'],
                trashBin: ['character:lijue']

            },
            diyHuanggai:{
                sex: "male",
                group: 'wu',
                hp: 4,
                maxHp: 4,
                skills: ['sweetheart'],
                trashBin: ['character:huanggai']

            },
            diyMaliang:{
                sex: "male",
                group: 'shu',
                hp: 3,
                maxHp: 3,
                skills: ['diyZishu','yingyuan'],
                trashBin: ['character:maliang']
            },
            diysunquan:{
                sex: "male",
                group: 'wu',
                hp: 4,
                maxHp: 4,
                skills: ['ydzhiheng', 'diyDawu'],
                trashBin: ['character:sunquan']
            },
            //我自己的diy
                

        },
        skill:{
            diyJingce:{
                trigger:{
                    global:"useCard",
                },
                //audio:"jingce",
                forced:true,
                filter(event,player){
                    if(!player.storage.diyJingce) player.storage.diyJingce=[];
                    return player.storage.diyJingce.length<3;
                },
                init:function(player){
                    player.storage.diyJingce=[];
                },
                /*intro: {
                    content: "已使用类型：$",
                },*/
                async content(event,trigger,player){
                    const type=(get.type(trigger.card,trigger.player)=='delay')?'trick':get.type(trigger.card,trigger.player);
                    await player.addTempSkill('diyJingce_remove');
                    if(!player.storage.diyJingce.includes(type)){
                        player.storage.diyJingce.push(type);
                        //player.markSkill('diyJingce');
                        var str='';
                        for(var i=0;i<player.storage.diyJingce.length;i++){
                            str+=get.translation(player.storage.diyJingce[i])+' ';
                        }
                        await player.addTip('diyJingce_remove',`${str}`);
                    }
                    if(trigger.player==player){
                        const type=['basic','trick','equip'];
                        var gaintype=[];
                        for(var i of type){
                            if(!player.storage.diyJingce.includes(i)) gaintype.push(i);
                        }
                        if(gaintype.length>0){
                            var gain=[];
                            for(var i of gaintype){
                                var card=get.cardPile(function(card){
                                    return get.type(card)==i;
                                });
                                if(card) gain.push(card);
                            }
                            if(gain.length) await player.gain(gain,'gain2');
                        }
                        
                    }
                },
                subSkill:{
                    remove:{
                        trigger:{
                            global:["phaseEnd"],
                        },
                        charlotte:true,
                        silent:true,
                        async content(event,trigger,player){
                            player.storage.diyJingce=[];
                            //player.unmarkSkill("diyjingce");
                            await player.removeTip("diyJingce_remove");
                        },
                    }
                }

            },
            diyYongsi2:{
                trigger:{
                    global:["gainEnd","discardEnd"],
                },
                filter(event,player){
                    return event.player!=player;
                },
                forced:true,
                audio:"yongsi",
                async content(event,trigger,player){
                    
                    if(trigger.name=="discard"){
                        await player.chooseToDiscard('he',2,true);
                    }
                    else await player.draw(1);
                },
            },
            diyYingzi:{
                trigger:{
                    player:"phaseZhunbeiBegin",
                },
                audio:"dcpinglu",
                filter(event,player){
                    return !event.numFixed;
                },
                init:function(player){
                    player.storage.diyYingzi=0;
                },
                getNum(player){
                    var num=0;
                    for(var i of ['h','e','j']){
                        num+=Array.from(
                            new Set(player.getCards(i).map(card => get.suit(card,player)))
                        ).length;
                    }
                    return num;
                },
                prompt2:function(event,player){
                    var num=lib.skill.diyYingzi.getNum(player);
                    return `是否摸${num}张牌,令额外手牌上限为${num}`;
                },
                async content(event,trigger,player){
                    var num=lib.skill.diyYingzi.getNum(player);
                    await player.draw(num);
                    player.storage.diyYingzi=num;
                },
                mod:{
                    maxHandcard:function(player,num){
                        return num+player.storage.diyYingzi;
                    },
                }


            },
            diyzhiheng2:{
                inherit:"zhiheng",
                audio:"zhiheng",
                prompt: "弃置任意张牌并弃置牌数+弃牌牌类型数张牌",
                async content(event, trigger, player) {
                    var types=[];
                    for(var i of event.cards){
                        if(!types.includes(get.type(i,player))) types.add(get.type(i,player));
                    }
                    await player.draw(event.cards.length+types.length);
                },
                mod:{
                    maxHandcard:function(player,num){
                        return num+(Array.from(new Set(player.getCards('h').map(card => get.type(card,player)))).length||0);
                    },
                }

            },
            diyHubao:{
                enable:"phaseUse",
                audio:"shanjia",
                filter:function(event, player){
                    return player.countCards('he')>0;
                },
                init(player){
                    player.storage.diyHubao_name=[];
                },
                filterCard:function(card, player){
                    return !player.storage.diyHubao_name.includes(get.name(card,player));
                },
                selectCard:1,
                position: "he",
                async content(event,trigger,player){
                    player.storage.diyHubao_name.push(get.name(event.cards[0],player));
                    await player.draw();
                    if(lib.filter.filterCard(event.cards[0],player,event)){
                        await player.chooseUseTarget(event.cards[0],false);
                    }
                },
                group:"diyHubao_clear",
                subSkill:{
                    clear:{
                        trigger:{
                            player:"phaseEnd",
                        },
                        forced:true,
                        silent:true,
                        content:function(){
                            //game.log("clear");
                            player.storage.diyHubao_name=[];
                        }
                    }
    
                },
            },

            diyShanjia:{
                inherit:"olshanjia",
                ai: {
                    order(item, player) {
                        let marknum=player.countMark("olshanjia");
                        if(!marknum) return 4;
                        var num=player.getCards("h",function(card){
                            return lib.filter.filterCard(card,player,_status.event);
                        }).length;
                        if(num) return 2;
                        return 4;
                    },
                    result: {
                        player: 1,
                    },
                },
            },
            diyZhanjiang:{
                trigger: {
                    global: "roundStart",
                },
                filter(event,player){
                    return player.getExpansions("diyZhanjiang").length<6;
                },
                intro: {
                    content: "expansion",
                    markcount: "expansion",
                },
                onremove(player, skill) {
                    const cards = player.getExpansions(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                async content(event,trigger,player){
                    var cards=get.cards(6-player.getExpansions("diyZhanjiang").length);
                    await player.addToExpansion(cards, "gain2").gaintag.add("diyZhanjiang");
                },
                group: "diyZhanjiang_lose",
                subSkill:{
                    lose:{
                        trigger: {
                            player: "useCardAfter",
                        },
                        filter(event, player) {
                            //if(!event.card.isCard) return false;
                            if(!player.getExpansions("diyZhanjiang"))  return false;
                            var suit=get.suit(event.card);
                            var cards=player.getExpansions("diyZhanjiang");
                            for(var i of cards){
                                if(get.suit(i)==suit) return true;
                            }
                            return false;
                        },
                        async content(event,trigger,player){
                            var suit=get.suit(trigger.card);
                            var cards=player.getExpansions("diyZhanjiang").filter(i => get.suit(i)==suit);
                            //dialog.push(cards);
                            var r1=await player.chooseButton("斩将：选择获得一张牌",[cards],true).forResult();
                            if(r1.bool){
                                player.gain(r1.links[0],'gain2');
                                await player.chooseUseTarget({name:'sha'}, false);
                            }
                            
                        }
                    }
                }

            },
            diyQuman:{
                enable:"phaseUse",
                audio:"olsaogu",
                filter(event,player){
                    return player.countCards('he')>0;
                },
                async content(event,trigger,player){
                    await player.draw(2);
                    var num = player.getHistory("useSkill", evt => evt.skill == "diyQuman").length;
                    if(num){
                        await player.chooseToDiscard('he',num,true);
                    }
                    var r1=await player.chooseToUse(function (card, player, event) {
                        return lib.filter.cardEnabled.apply(this, arguments);
                    },`你可以使用一张牌(不计入次数)`)
                    .set("addCount", false).forResult();
                    player.addTempSkill("diyQuman_record");
                    var str='【驱蛮】'+num;
                    player.addTip("diyQuman_record",str);
                    if(r1.bool){
                        game.log(r1.cards);
                        if(player.getHistory("sourceDamage",function(evt){
                            return evt.card.cardid==r1.cards[0].cardid;
                        }).length) await player.draw();
                    }

                },
                subSkill:{
                    record:{
                        charlotte: true,
                        onremove(player, skill) {
                            player.removeTip(skill);
                        },
                        sub: true,
                        sourceSkill: "diyQuman",
                        "_priority": 0,
                    }
                }

            },
            diyMingzhe:{
                inherit:"olmingzhe",
                audio:"mingzhe",
                filter(event, player) {
                    if (player.isPhaseUsing()) return false;
                    var evt = event.getl(player);
                    return evt.cards2.length;
                },
                content() {
                    player.draw(trigger.getl(player).cards2.length).gaintag=["diyMingzhe"];

                },
                mod:{
                    cardUsable: function (card, player, num) {
                       if (!card.cards || card.cards.length !== 1) return;
                       if (get.itemtype(card.cards[0]) === "card" && card.cards[0].hasGaintag("diyMingzhe")) return Infinity;
                    },
                },

            },
            diyWushuang:{
                trigger: {
                    player: "useCardToTargeted",
                },
                audio:"dcxiaowu",
                filter(event, player) {
                    return !["equip","delay"].includes(get.type(event.card,player))&&event.isFirstTarget;
                },
                content() {
                    trigger.getParent().effectCount++;
                },

            },
            diyText:{
                enable:["phaseUse"],
                async content(event,trigger,player){
                    await player.draw(10);
                    await player.recast(player.getCards("h", lib.filter.cardRecastable));

                },

            },
            diyHaoshi:{
                trigger:{
                    global:"phaseUseBegin",
                },
                auido:"twyangming",
                check(event, player) {
                    return get.attitude(player, event.player)>5;
                },
                logTarget: "player",
                async content(event,trigger,player){
                    //await player.logSkill("diyHaoshi");
                    var player=trigger.player;
                    await player.draw();
                    var r1=await player.chooseToDiscard('he',[1,Infinity],false,"弃置任意张牌并摸等量张牌,若弃置完你没有手牌，额外摸一张牌")
                    .set("ai",function(card){
                        return 6-get.value(card);
                    })
                    .forResult();
                    if(r1.bool){
                        if(!player.countCards('h')) await player.draw(r1.cards.length+1);
                        else await player.draw(r1.cards.length);
                    }


                }
            },
            diyZhangming:{
                trigger: {
                    player: "damageEnd",
                },
                direct: true,
                clearTime: true,
                priority: 12,
                filter(event, player) {
                    if (!player.countCards("he")) return false;
                    return event.source.isIn()&&event.source!=player;
                },
                content() {
                    "step 0";
                    player.chooseCardTarget({
                        prompt: get.prompt("diyZhangming"),
                        prompt2:"将一张牌当作【杀】对伤害来源使用?",
                        filterCard:true,
                        filterTarget(card, player, target) {
                            return target==trigger.source;
                        },
                        position: "he",
                        viewAs:{
                            name:"sha",
                        },
                        ai1(card) {
                            return 8 - get.value(card);
                        },
                        ai2(target) {
                            return get.effect(target, { name: "sha" }, player, player);
                        },
                    });
                    "step 1";
                    if (result.bool) {
                        player.useCard({ name: "sha" }, result.cards, result.targets, false);
                    }

                },

            },
            diyJiansheng:{
                trigger:{
                    player: "useCardToPlayered",
                },
                audio:"twxinghan",
                forced: true,
                filter(event,player){
                    return event.targets.length==1&&!player.getHistory("custom",function(evt){
                        return evt.diyJiansheng==get.suit(event.card);
                    }).length;
                },
                async content(event,trigger,player){
                    var suit=get.suit(trigger.card);
                    var r1=await trigger.target.chooseToDiscard("弃置一张"+get.translation(suit)+"牌，否则"+get.translation(event.player)+"获得其余花色牌各一张",'he',false,(card,player)=>{
                        return get.suit(card,player)==_status.event.s;
                    }).set("s",suit).set("ai",function(card){
                        const hs = trigger.target.countCards("h"),
                            att = get.attitude(trigger.target, trigger.player);
                        if (!hs || att > 0) return false;//自己人就摸吧

                        if (trigger.target.hasSkillTag("noh")) return 8;

                        if (get.effect(trigger.target, trigger.card, player, trigger.target) >= 0) return 6;
                        return -att - Math.max(0, 4 - trigger.target.hp) * 2;

                    }).forResult();
                    if(!r1.bool){
                        var suit_gain=lib.suit.slice(0).remove(suit),
                        gain=[];
                        for(var i of suit_gain){

                            var temp=get.cardPile(function(card){
                                return get.suit(card)==i;
                            });
                            if(!temp){
                                temp=get.discardPile(function(card){
                                    return get.suit(card)==i;
                                });
                            }
                            gain.push(temp);
                        }
                        if(gain){
                            player.gain(gain,"gain2","log");
                        }
                    }
                    var his=player.getHistory("custom");
                    his.push({diyJiansheng:suit});
                    var str='';
                    for(var i of his){
                        if(i.diyJiansheng) str+=get.translation(i.diyJiansheng);
                    }
                    /*player.getHistory("custom",function(evt){
                        if(evt.diyJiansheng) str+=get.translation(evt.diyJiansheng);
                    });*/
                    player.addTempSkill("diyJiansheng_record");
                    player.addTip("diyJiansheng_record",str);

                },
                subSkill:{
                    record: {
                        charlotte: true,
                        onremove(player, skill) {
                            //delete player.storage[skill];
                            player.removeTip(skill);
                        },
                        /*intro: {
                            content: "【剑圣】已使用花色：$",
                        },*/
                        sub: true,
                        sourceSkill: "diyJiansheng",
                        "_priority": 0,
                    },

                },


            },
            diyBeifa:{
                enable:"phaseUse",
                usable:1,
                audio:"olsbzhuri",
                async content(event,trigger,player){
                    if(!player.storage.diyBeifa_add) player.storage.diyBeifa_add=0;
                    await player.loseMaxHp();
                    var showCards = get.cards(4+player.storage.diyBeifa_add);
                    player.storage.diyBeifa_add=0;
                    await game.cardsGotoOrdering(showCards);
                    await player.showCards(showCards);
                    var gain=[];
                    if (player.isIn()&& showCards.length) {
                        for (var i of showCards) {
                            if (i.name == "sha"&&player.hasUseTarget(i,false,false)) {
                                //await player.useCard(i, event.target,false);
                                await player.chooseUseTarget(i, true, false, "nodistance");
                            }
                            else gain.push(i);
                        }
                    }
                    else gain=showCards;
                    

                    if(
                        !player.getHistory("sourceDamage",function(evt){
                            return evt.getParent(4).name==event.name;
                        }).length
                    ){
                        player.storage.diyBeifa_add++;
                        player.gain(gain,"gain2","log");
                        return;
                    }

                    if(gain){
                        await game.cardsDiscard(gain);
                        //player.gain(gain,"gain2","log");
                    }

                   
                    

                    //game.me.

                }

            },
            diyQuanji:{
                inherit:"zyquanji",
                trigger: {
                    player: ["damageEnd","phaseUseBegin"],
                    //source: "damageSource",
                },
                filter(event, player, name) {
                    if(name=="phaseUseBegin") return true;
                    if (name == "damageEnd") return true;
                    const evt = event.getParent();
                    if (evt.player != player) return false;
                    return evt.card && evt.type == "card" && evt.targets.length == 1;
                },
                marktext: "权",
                intro: {
                    name: "权计",
                    markcount(storage, player) {
                        return player.countCards("s", function (card) {
                            return card.hasGaintag("diyQuanji");
                        });
                    },
                    onunmark(storage, player) {
                        var cards = player.getCards("s", function (card) {
                            return card.hasGaintag("diyQuanji");
                        });
                        if (cards.length) {
                            player.loseToDiscardpile(cards);
                        }
                    },
                },
                mod: {
                    maxHandcard(player, num) {
                        return num + (player.countCards("s", function (card) {
                            return card.hasGaintag("diyQuanji");
                        })||0);
                    },
                },
                async content(event, trigger, player) {
                    if(event.triggername!="phaseUseBegin")await player.draw();
                    const hs = player.getCards("he");
                    if (!hs.length) return;
                    const result = hs.length == 1 ? { bool: true, cards: hs } : await player.chooseCard("he", true, "选择一张牌作为“权”").forResult();
                    if (result?.bool && result?.cards?.length) {
                        await player.loseToSpecial(result.cards, "diyQuanji");
                        player.markSkill("diyQuanji");
                    }
                },
                group: "diyQuanji_advent",
                subSkill: {
                    advent: {
                        trigger: {
                            player: ["enterGame"],
                            global: "phaseBefore",
                        },
                        direct: true,
                        filter(event,player){
                            return (event.name != "phase" || game.phaseNumber == 0);
                        },
                        audio:"clanyuzhi",
                        forced: true,
                        async content(event, trigger, player) {
                            player.logSkill("diyQuanji_advent");
                            await player.loseToSpecial(player.getCards('h'), "diyQuanji");
                            player.markSkill("diyQuanji");
                        },
                        sub: true,
                        sourceSkill: "diyQuanji",
                        "_priority": 0,
                    },
                },
                /*
                             */


            },
            diyPaiyi:{
                trigger: {
                    global: ["loseAfter","equipAfter","addJudgeAfter","gainAfter","loseAsyncAfter","addToExpansionAfter"],
                },
                filter(event, player) {
                    return game.hasPlayer(function (current) {
                        const evt = event.getl(current);
                        return evt && (evt.xs.length > 0 || evt.ss.length > 0);
                    });
                },
                usable:1,
                audio:"xinpaiyi",
                async cost(event, trigger, player){
                    event.result = await player
                    .chooseTarget("令一名角色将手牌摸至手牌上限",1,false).set("ai", target => {
                        let player = _status.event.player,
                            att = get.attitude(player, target);
                            //if(player==target) return target.countCards("h")<target.getHandcardLimit();
                            return att>0&&target.countCards("h")<target.getHandcardLimit();

                    }).forResult();
                },
                async content(event, trigger, player){
                    if (!player.storage.diyPaiyi) player.storage.diyPaiyi = 0;
                    player.storage.diyPaiyi++;
                    const target = event.targets[0];
                    var num=target.getHandcardLimit()-target.countCards('h');
                    //target.drawTo(target.getHandcardLimit());
                    await target.draw(num);
                    if((num<=0||target!=player)&&target.countCards('he'>0)){
                        var result=await player.chooseCard("he", true, "选择一张牌作为“权”").forResult();
                        if(result.bool){
                            await player.loseToSpecial(result.cards, "diyQuanji");
                            player.markSkill("diyQuanji");
                        }
                    }
                    
                    //await player.loseToSpecial(get.cards(), "diyQuanji");
                    /*
                    if(player.countCards('he')){
                        var result=
                        if(result.bool){
                            await player.loseToSpecial(result.cards, "diyQuanji");
                            player.markSkill("diyQuanji");
                        }
                    }*/
                    
                }
            },
            diyRuchuan:{
                skillAnimation: true,
                animationColor: "thunder",
                audio: "xinzili",
                unique: true,
                juexingji: true,
                trigger: {
                    player: "phaseZhunbeiBegin",
                },
                forced: true,
                derivation: "diyRende",
                filter(event, player) {
                    return player.storage.diyPaiyi >=3;
                },
                content() {
                    player.awakenSkill("diyRuchuan");
                    player.gainMaxHp();
                    player.recover();
                    player.addSkills("diyRende");
                },
            },
            diyGuanchao:{
                trigger:{
                    player:"useCard",
                },
                mark:true,
                marktext: "☯",
                zhuanhuanji: true,
                intro: {
                    content(storage) {
                        if (storage) return "你使用牌时若此牌比你上一张使用的牌点数小，你摸一张牌";
                        return "你使用牌时若此牌比你上一张使用的牌点数大，你摸一张牌";
                    },
                },
                frequent:true,
                audio:"xinfu_guanchao",
                init:function(player){
                    player.storage.diyGuanchao_num=0;
                },
                filter(event,player){
                    var num2 = get.number(event.card);
                    if(!player.storage.diyGuanchao) return num2 && num2 != "none"&&num2>player.storage.diyGuanchao_num;
                    else return num2 && num2 != "none"&&num2<player.storage.diyGuanchao_num;

                },
                async content(event,trigger,player){
                    var current_num=get.number(trigger.card);
                    if(!player.storage.diyGuanchao&&current_num>player.storage.diyGuanchao_num){
                        await player.draw();
                        
                    }
                    else if(player.storage.diyGuanchao&&current_num<player.storage.diyGuanchao_num){
                        await player.draw();
                    }

                    player.changeZhuanhuanji("diyGuanchao");
                    player.storage.diyGuanchao_num=current_num;
                    player.addTip("观潮",(!player.storage.diyGuanchao?"大于":"小于")+current_num);
                    
                },
                group:"diyGuanchao_1",
                subSkill:{
                    1:{
                        enable:"phaseUse",
                        usable:1,
                        content(){
                            player.draw();
                            player.changeZhuanhuanji("diyGuanchao");
                            player.addTip("观潮",(!player.storage.diyGuanchao?"大于":"小于")+player.storage.diyGuanchao_num);

                        }
                    }
                }

            },
            diyJintao: {
                trigger: {
                    player: ["phaseEnd"],
                },
                init: function(player){
                    player.storage.diyJintao_sha=0;
                },
                audio: "jintao",
                intro: {
                    content: "讨+#",
                },
                mod: {
                    cardUsable(card, player, num) {
                        if (card.name == "sha"){
                            var time=num+player.storage.diyJintao_sha
                            return time;
                        }
                    },
                },
                filter(event,player){
                    return player.getHistory("useCard").length;
                },
                async content(event,trigger,player){
                    var num=player.getHistory("useCard").length;
                    await player.draw(Math.min(5,num));
                    if(num>player.getCardUsable("sha")){
                        player.storage.diyJintao_sha++;
                        player.addMark("diyJintao");
                        player.markSkill("diyJintao");
                    }
                },
                "_priority": 0,
            },
            diyZhengSi: {
                audio: "chuyuan",
                enable: "phaseUse",
                filter(e, p) {
                    return !p.hasSkill("daoshu_used");
                },
                filterTarget(c, p, t) {
                    return t != p && t.countGainableCards(p, "he") > 0;
                },
                marktext: "嗣",
                intro: {
                    content(storage, player){
                        //var str="嗣+#"
                        //str+="<br>";
                        var str="额外摸牌数量"+player.storage.diyZhengSi_draw+"<br>";
                        str+="额外攻击距离"+player.storage.diyZhengSi_attack+"<br>";
                        str+="额外出杀次数"+player.storage.diyZhengSi_sha+"<br>";
                        str+="额外手牌上限"+player.storage.diyZhengSi_handlimit+"<br>";
                        str+="额外体力上限"+player.storage.diyZhengSi_maxhp+"<br>";
                        return str;


                        
                    },
                },
                init: function(player){
                    player.storage.diyZhengSi_draw=0;
                    player.storage.diyZhengSi_attack=0;
                    player.storage.diyZhengSi_handlimit=0;
                    player.storage.diyZhengSi_maxhp=0;
                    player.storage.diyZhengSi_sha=0;


                },
                content() {
                    "step 0";
                    player
                        .chooseControl(lib.suit)
                        .set("prompt", "请选择一个花色")
                        .set("ai", () => get.event().chosen)
                        .set(
                            "chosen",
                            (function () {
                                let suits = {},
                                    msuit,
                                    mcount = 0;
                                target.getKnownCards(player).forEach(i => {
                                    let suit = get.suit(i);
                                    if (suits[suit]) suits[suit]++;
                                    else suits[suit] = 1;
                                });
                                for (let i in suits) {
                                    if (suits[i] > mcount && lib.suit.includes(i)) {
                                        msuit = i;
                                        mcount = suits[i];
                                    }
                                }
                                if (msuit) return msuit;
                                return lib.suit.randomGet();
                            })()
                        );
                    "step 1";
                    event.suit = result.control;
                    player.popup(event.suit + 2);
                    game.log(player, "选择了", event.suit + 2);
                    target.chooseCard("交给其一张牌，若为"+event.suit + 2+"其获得标记",'he',1).set("ai",function(card){
                        var val=get.attitude(target,player);
                        if(val>0){
                            return (get.suit(card)==_status.event.suit1)?10:5;
                        }
                        //else return get.suit(card)!=_status.event.suit1;

                        return (get.suit(card)==_status.event.suit1)?5:10;

                    }).set("suit1",event.suit);
                    "step 2";
                    if (result.bool) {
                        var suit2 = get.suit(result.cards[0]);
                        if (suit2 != event.suit) {
                            player.addTempSkill("daoshu_used", "phaseUseEnd");   
                        }
                    }
                    "step 3";
                    target.give(result.cards,player,true);
                    player.addMark("diyZhengSi");
                    player.markSkill("diyZhengSi");
                },
                mod: {
                    attackRange(player, num) {
                        return num + player.storage.diyZhengSi_attack;
                    },
                    maxHandcard(player, num) {
                        return num + player.storage.diyZhengSi_handlimit;
                    },
                    cardUsable(card, player, num) {
                        if (card.name == "sha") return num + player.storage.diyZhengSi_sha;
                    },
                },
                group: "diyZhengSi_adder",
                subSkill: {
                    adder: {
                        trigger: {
                            player: ["phaseDrawBegin","phaseUseBegin","phaseDiscardBegin"],
                        },
                        filter(event,player){
                            //var mark=player.countMark("diyZhengSi");
                            //var range=player.getAttackRange();
                            //var handlimite=player.getHandcardLimit();
                            //var maxHp=player.maxHp;
                            //var sha=player.getCardUsable({name:"sha"});
                            //if(event.triggername=="phaseDrawBegin")
                            return player.countMark("diyZhengSi")||player.storage.diyZhengSi_draw;
                        },
                        forced: true,
                        async content(event,trigger,player){
                            var mark=player.countMark("diyZhengSi");
                            if(event.triggername=='phaseDrawBegin'){
                                //摸牌阶段 额外摸牌
                                if(player.storage.diyZhengSi_draw<mark){
                                    var r=await player.chooseBool("是否消耗一个”嗣“让摸牌阶段额外摸牌数+1，当前为"+player.storage.diyZhengSi_draw,false).forResult()
                                    if(r.bool){
                                        player.storage.diyZhengSi_draw++;
                                        player.removeMark("diyZhengSi");
                                        player.markSkill("diyZhengSi");
                                    }
                                }

                                trigger.num+=player.storage.diyZhengSi_draw;
                            }
                            else if(event.triggername=='phaseUseBegin'){
                                if(player.storage.diyZhengSi_attack<mark){
                                    var r=await player.chooseBool("是否消耗一个”嗣“让额外攻击范围+1，当前为"+player.storage.diyZhengSi_attack,false).forResult()
                                    if(r.bool){
                                        player.storage.diyZhengSi_attack++;
                                        player.removeMark("diyZhengSi");
                                        player.markSkill("diyZhengSi");
                                    }
                                }
                                if(player.storage.diyZhengSi_sha<mark){
                                    var r=await player.chooseBool("是否消耗一个”嗣“让额外出杀次数+1，当前为"+player.storage.diyZhengSi_sha,false).forResult()
                                    if(r.bool){
                                        player.storage.diyZhengSi_sha++;
                                        player.removeMark("diyZhengSi");
                                        player.markSkill("diyZhengSi");
                                    }

                                }
                                if(player.storage.diyZhengSi_maxhp<mark){
                                    var r=await player.chooseBool("是否消耗一个”嗣“让额外体力上限+1，当前为"+player.storage.diyZhengSi_maxhp,false).forResult()
                                    if(r.bool){
                                        player.storage.diyZhengSi_maxhp++;
                                        await player.gainMaxHp();
                                        player.removeMark("diyZhengSi");
                                        player.markSkill("diyZhengSi");
                                    }


                                }
                            }else{
                                if(player.storage.diyZhengSi_handlimit<mark){
                                    var r=await player.chooseBool("是否消耗一个”嗣“让额外手牌上限+1，当前为"+player.storage.diyZhengSi_handlimit,false).forResult()
                                    if(r.bool){
                                        player.storage.diyZhengSi_handlimit++;
                                        player.removeMark("diyZhengSi");
                                        player.markSkill("diyZhengSi");
                                    }

                                }
                                
                            }
                            
                        },
                        sub: true,
                        sourceSkill: "diyZhengSi",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
            diyKuangbi:{
                inherit:"xinkuangbi",
                audio:"kuangbi",
                content() {
                    "step 0";
                    var num=Math.max(Math.abs(target.countCards("h") - player.countCards('h')), 1);
                   
                    target.chooseCard("he", num, "匡弼：交给" + get.translation(player) +num+ "张牌", true).set("ai", function (card) {
                        if (get.attitude(_status.event.player, _status.event.getParent().player) > 0) {
                            return 7 - get.value(card);
                        }
                        return -get.value(card);
                    });
                    "step 1";
                    if (result.bool) {
                        target.give(result.cards, player, "giveAuto").gaintag.add("xinkuangbi_keep");
                        player.addTempSkill("xinkuangbi_keep");
                        target.addSkill("xinkuangbi_draw");
                        target.addMark("xinkuangbi_draw", result.cards.length, false);
                    }
                },
                

            },
            diyJili:{
                trigger: {
                    player: ["useCard","respond"],
                },
                audio:"gzjili",
                forced:true,
                filter(event, player) {
                    return !player.getHistory("custom",function(evt){
                        return evt.diyJili==get.cardNameLength(event.card);
                    }).length;
                },
                content(){
                    var length=get.cardNameLength(trigger.card);
                    player.draw(length);
                    player.getHistory("custom").push({diyJili:length});
                }

            },
            diyShefu:{
                inherit:"shefu",
                trigger:{
                    player:"phaseDiscardBegin",
                },
                onremove(player, skill) {
                    var cards = player.getExpansions("shefu");
                    if (cards.length) player.loseToDiscardpile(cards);
                },
                content() {
                    "step 0";
                    var list1 = [],
                        list2 = [],
                        list3 = [];
                    for (var i = 0; i < lib.inpile.length; i++) {
                        var type = get.type(lib.inpile[i]);
                        if (type == "basic") {
                            list1.push(["基本", "", lib.inpile[i]]);
                        } else if (type == "trick") {
                            list2.push(["锦囊", "", lib.inpile[i]]);
                        } else if (type == "delay") {
                            list3.push(["锦囊", "", lib.inpile[i]]);
                        }
                    }
                    player
                        .chooseButton([get.prompt("shefu"), [list1.concat(list2).concat(list3), "vcard"]])
                        .set("filterButton", function (button) {
                            var player = _status.event.player;
                            if (player.storage.shefu2 && player.storage.shefu2.includes(button.link[2])) return false;
                            return true;
                        })
                        .set("ai", function (button) {
                            var rand = _status.event.rand;
                            switch (button.link[2]) {
                                case "sha":
                                    return 5 + rand[1];
                                case "tao":
                                    return 4 + rand[2];
                                case "lebu":
                                    return 3 + rand[3];
                                case "shan":
                                    return 4.5 + rand[4];
                                case "wuzhong":
                                    return 4 + rand[5];
                                case "shunshou":
                                    return 3 + rand[6];
                                case "nanman":
                                    return 2 + rand[7];
                                case "wanjian":
                                    return 2 + rand[8];
                                default:
                                    return rand[0];
                            }
                        })
                        .set("rand", [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]);
                    "step 1";
                    if (result.bool) {
                        event.cardname = result.links[0][2];
                        player.logSkill("shefu");
                        player.chooseCard("he", "选择一张牌作为“伏兵”", true);
                    } else {
                        event.finish();
                    }
                    "step 2";
                    if (result.bool) {
                        var card = result.cards[0];
                        event.card = card;
                        player.addToExpansion(card, player, "give").gaintag.add("shefu");
                    }
                    "step 3";
                    if (player.getExpansions("shefu").includes(event.card)) {
                        player.storage.shefu.push(card);
                        player.storage.shefu2.push(event.cardname);
                        if (player.isOnline2()) {
                            player.send(function (storage) {
                                game.me.storage.shefu2 = storage;
                            }, player.storage.shefu2);
                        }
                        player.syncStorage("shefu");
                        player.markSkill("shefu");
                    }
                    "step 4";
                    if(player.countCards('h')>player.getHandcardLimit()) event.goto(0);
                    else event.finish();
                },
                group:["diyShefu_effect"],
                subSkill:{
                    effect:{
                        inherit:"shefu2",
                        content() {
                            "step 0";
                            var effect = 0;
                            if (trigger.card.name == "wuxie" || trigger.card.name == "shan") {
                                if (get.attitude(player, trigger.player) < -1) {
                                    effect = -1;
                                }
                            } else if (trigger.targets && trigger.targets.length) {
                                for (var i = 0; i < trigger.targets.length; i++) {
                                    effect += get.effect(trigger.targets[i], trigger.card, trigger.player, player);
                                }
                            }
                            var str = "设伏：是否令" + get.translation(trigger.player);
                            if (trigger.targets && trigger.targets.length) {
                                str += "对" + get.translation(trigger.targets);
                            }
                            str += "使用的" + get.translation(trigger.card) + "失效？";
                            var next = player.chooseBool(str, function () {
                                var player = _status.event.player;
                                var trigger = _status.event.getTrigger();
                                if (_status.event.effect < 0) {
                                    if (trigger.card.name == "sha") {
                                        var target = trigger.targets[0];
                                        if (target == player) {
                                            return !player.countCards("h", "shan");
                                        } else {
                                            return target.hp == 1 || (target.countCards("h") <= 2 && target.hp <= 2);
                                        }
                                    } else {
                                        return true;
                                    }
                                }
                                return false;
                            });
                            next.set("effect", effect);
                            "step 1";
                            if (result.bool) {
                                player.logSkill("shefu", trigger.player);
                                var index = player.storage.shefu2.indexOf(trigger.card.name);
                                if (index != -1) {
                                    var card = player.storage.shefu[index];
                                    player.loseToDiscardpile(card);
                                    player.storage.shefu.splice(index, 1);
                                    player.storage.shefu2.splice(index, 1);
                                    if (player.storage.shefu.length == 0) {
                                        player.unmarkSkill("shefu");
                                    } else {
                                        player.syncStorage("shefu");
                                        player.markSkill("shefu");
                                        if (player.isOnline2()) {
                                            player.send(function (storage) {
                                                game.me.storage.shefu2 = storage;
                                            }, player.storage.shefu2);
                                        }
                                    }
                                }
                                trigger.targets.length = 0;
                                trigger.all_excluded = true;
                                if (trigger.player == _status.currentPhase) trigger.player.addTempSkill("baiban");
                                player.draw(2);
                            }
                        },
                    }
                }

            },
            //聪明的英姿 摸牌阶段开始你可获得一张基本牌和锦囊牌；
            diyAnguo:{
                audio: "anguo",
                enable: "phaseUse",
                usable: 1,
                filterTarget: function (card, player, target) {
                    return player != target;
                },
                content(){
                    "step 0";
                    var t=(player.countCards('h')>=target.countCards('h')?target:player);
                    t.draw();
                    

                    "step 1";
                    var t=(player.hp>=target.hp?target:player);
                    if (t.isDamaged()) {
                        t.recover();
                    }
                    else if(player.isDamaged()) playr.recover();
                    
                    "step 2";
                    var t=(player.countCards('e')>=target.countCards('e')?target:player);
                    var equip = get.cardPile(function (card) {
                        return get.type(card) == "equip" && t.hasUseTarget(card);
                    });
                    
                    if (equip) {
                        t.chooseUseTarget(equip, "nothrow", "nopopup", true);
                        
                    }
                    
                    "step 3";
                    game.updateRoundNumber();
                },
                ai: {
                    threaten: 1.6,
                    order: 9,
                    result: {
                        player(player, target) {
                            if (get.attitude(player, target) <= 0) {
                                if (target.isMinHandcard() || target.isMinEquip() || target.isMinHp()) return -1;
                            }
                            var num = 0;
                            if (player.isMinHandcard() || target.isMinHandcard()) num++;
                            if (player.isMinEquip() || target.isMinEquip()) num++;
                            if ((player.isMinHp() && player.isDamaged()) || (target.isMinHp() && target.isDamaged())) num += 2.1;
                            return num;
                        },
                    },
                },

            },
            diyQiaoshe:{
                trigger: {
                    player: ["chooseToCompareAfter","compareMultipleAfter"],
                    target: ["chooseToCompareAfter","compareMultipleAfter"],
                },
                filter(event, player) {
                    if (event.preserve) return false;
                    return [event.card1, event.card2].filterInD("od").length > 0;
                },
                prompt2(event, player) {
                    return "获得" + get.translation([event.card1, event.card2].filterInD("od"));
                },
                content() {
                    player.gain([trigger.card1, trigger.card2].filterInD("od"), "gain2", "log");
                },

            },
            diyCongzi:{
                audio:"reyingzi",
                trigger: {
                    player: "phaseDrawBegin2",
                },
                forced: true,
                preHidden: true,
                filter(event, player) {
                    return true;
                },
                content() {
                    var gain=[];
                    for(var i of ["basic","trick"]){
                        var card=get.cardPile2(function (card) {
                            return get.type2(card) == i;
                        });
                        if(card) gain.push(card);
                    }
                    if (gain) player.gain(gain, "draw2", "log");
                },
                ai: {
                    threaten: 1.5,
                },
                mod: {
                    maxHandcardBase(player, num) {
                        return player.maxHp;
                    },
                },
                "_priority": 0,

            },
            diyHunzi:{
                inherit:"hunzi",
                trigger:{
                    player:'dying',
                },
                async content(event, trigger, player) {
                    player.awakenSkill(event.name);
                    await player.recoverTo(1);
                    await player.addSkills(["reyingzi", "gzyinghun"]);
                },

            },
            diyZhiba: {
                trigger: {
                    player: "gainAfter",
                },
                filter(event,player){
                    return !player.hasSkill("diyZhiba_used");
                },
                async content(event,trigger,player){
                    var r=await player.chooseCard('he',false).forResult();
                    if(r.bool){
                        player.chooseUseTarget(true,{name:"juedou"},r.cards);
                        player.addTempSkill("diyZhiba_used", ["phaseZhunbeiAfter", "phaseJudgeAfter", "phaseDrawAfter", "phaseUseAfter", "phaseDiscardAfter", "phaseJieshuAfter"]);
                    }
                },
                subSkill: {
                    used: {
                        charlotte: true,
                        sub: true,
                        sourceSkill: "diyZhiba",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
            diyMingjian:{
                inherit:"mingjian",
                audio:"mingjian",
                content() {
                    "step 0";
                    player.give(cards, target);
                    target.addTempSkill("mingjian2", { player: "phaseAfter" });
                    target.storage.mingjian2++;
                    target.updateMarks("mingjian2");
                    "step 1";
                    player.draw(cards.length);
                    
                },

            },
            diyShuangren: {
                audio: "shuangren",
                enable: "phaseUse",
                usable: 1,
                filterTarget(card, player, target) {
                    return player.canCompare(target);
                },
                filter(event, player) {
                    return player.countCards("h") > 0;
                },
                async content(event, trigger, player) {
                    const result = await player.chooseToCompare(event.target).forResult();
                    if (result.bool) {
                        event.target.addTempSkill("yachai_block");
                        const card = { name: "sha", isCard: true };
                        //const cards = [result.player, result.target].filterInD("d");
                        //await player.recast(result.player);
                        //player.gain(cards, "gain2");
                        await player.useCard(card,event.target,false);
                        
                    } else {
                        await player.gainPlayerCard('he',event.target);
                    }
                },
                "_priority": 0,
            },
            diyRende:{
                enable: "phaseUse",
                audio:"sbrende",
                filter(event, player) {
                    return player.countCards("h") && game.hasPlayer(current =>current!=player);
                },
                filterTarget(card, player, target) {
                    return player != target;
                },
                filterCard: true,
                position:"hes",
                selectCard: [1,Infinity],
                discard: false,
                lose: false,
                delay: false,
                check(card) {
                    if (ui.selected.cards.length && ui.selected.cards[0].name == "du") return 0;
                    if (!ui.selected.cards.length && card.name == "du") return 20;
                    var player = get.owner(card);
                    if (ui.selected.cards.length >= Math.max(2, player.countCards("h") - player.hp)) return 0;
                    if (player.hp == player.maxHp|| player.countCards("h") <= 1) {
                        var players = game.filterPlayer();
                        for (var i = 0; i < players.length; i++) {
                            if (players[i].hasSkill("haoshi") && !players[i].isTurnedOver() && !players[i].hasJudge("lebu") && get.attitude(player, players[i]) >= 3 && get.attitude(players[i], player) >= 3) {
                                return 11 - get.value(card);
                            }
                        }
                        if (player.countCards("h") > player.hp) return 10 - get.value(card);
                        if (player.countCards("h") > 2) return 6 - get.value(card);
                        return -1;
                    }
                    return 10 - get.value(card);
                },
                async content(event, trigger, player) {
                    const { target, cards, name } = event;
                    let num = 0;

                    event.addCount = false;
                    player.getHistory("lose", evt => {
                        if (evt.getParent(2).name == name) num += evt.cards.length;
                    });
                    await player.give(cards, target);
                    const list = get.inpileVCardList(info => {
                        return get.type(info[2]) == "basic" && player.hasUseTarget(new lib.element.VCard({ name: info[2], nature: info[3] }), null, false);
                    });
                    if (num < 2 && num + cards.length > 1 && list.length) {
                        const links = await player
                            .chooseButton(["是否视为使用一张基本牌？", [list, "vcard"]])
                            .set("ai", button => {
                                return get.player().getUseValue({ name: button.link[2], nature: button.link[3], isCard: true });
                            })
                            .forResultLinks();
                        if (!links?.length) return;
                        await player.chooseUseTarget(get.autoViewAs({ name: links[0][2], nature: links[0][3], isCard: true }), false);
                    }
                },


            },
            diyShebian: {
                trigger: {
                    player: "useCard",
                },
                check: function (event, player) {
                    return player.canMoveCard(true, true);
                },
                filter(event, player) {
                    if (!event.cards.length) return true;
                    return player.canMoveCard(null, true)&&!game.hasPlayer2(current => {
                        return current.hasHistory("lose", evt => {
                            return evt.getParent() == event && evt.hs.length > 0;
                        });
                    });
                },
                content: function () {
                    player.moveCard();
                },
                "_priority": 0,
            },
            diyShensu:{
                audio:"shensu",
                trigger:{
                    player:['phaseZhunbeiBegin'],
                },
                content() {
                    "step 0";
                    event.cards = get.cards(1);
                    player.showCards(get.translation(player)+"发动了【神速】", event.cards);
                    "step 1";
                    var card = cards[0];
                    var bool1 = game.hasPlayer(function (current) {
                        return player.canUse(card, current, false);
                    });
                    var bool2 = game.hasPlayer(function (current) {
                        return player.canUse({ name: "sha" }, current);
                    });
                    
                    event.choiceList=[];
                    if(bool1) event.choiceList.push("无视距离的使用");
                    if(bool2) event.choiceList.push("当做【杀】使用");
                    var prompt="如何使用"+get.translation(card);
                    if (event.choiceList.length) {
                        player
                            .chooseControl(event.choiceList)
                            .set("ai", function () {
                                return _status.event.choice;
                            })
                            .set("prompt",prompt)
                            .set("choice", player.getUseValue(card, false) > player.getUseValue({ name: "sha", cards: cards }) ? 0 : 1);
                    }
                    else {
                        ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
                        event.finish();
                    }
                    "step 2";
                    var card = cards[0];
                    if (result.control=="当做【杀】使用") {
                        player.chooseUseTarget({ name: "sha"}, cards, true, false).viewAs = false;
                    } else {
                        player.chooseUseTarget(card, true, false, "nodistance");
                    }
                    "step 3";
                    if(!player.getStat("damage")){
                        event.goto(0);
                    }
                    else event.finish();
                },
                ai: {
                    order: 7,
                    result: {
                        target: 1,
                    },
                },

            },
            diyGongxin: {
                audio: "gongxin",
                enable:"phaseUse",
                usable:1,
                filter(event,player){
                    return game.hasPlayer(function(p){
                        return p!=player&&player.countCards('h')>0;
                    });
                },
                async content(event,trigger,player){
                    var r=await player.chooseTarget("观看并弃置一名其他角色手牌",function(card,player,target){
                        return player!=target&&target.countCards('h')>0;
                    }).set('ai',function(target){
                        return 1-get.attitude(player,target);
                    }).forResult();
                    if(r.bool){
                        
                        var result=await player.discardPlayerCard(r.targets[0],'h','visible').forResult();
                        if(result.bool){
                            if(get.suit(result.cards[0])=="heart"||get.name(result.cards[0])=="sha") return;

                            r.targets[0].useCard({name:"sha"},player);
                        }


                    }
                },
                ai: {
                    order: 8,
                },
                "_priority": 0,
            },
            //摸牌阶段改为获得每种花色牌各一张。
            diyShelie:{
                trigger:{
                    player:"phaseDrawBegin1",
                },
                filter(event, player) {
                    return !event.numFixed;
                },
                audio:"qinxue",
                async content(e,t,p){
                    t.changeToZero();
                    var list=[];
                    for(var i of lib.suit){
                        var temp=get.cardPile(function(card){
                            return get.suit(card)==i;
                        });

                        if(!temp){
                            temp=get.discardPile(function(card){
                                return get.suit(card)==i;
                            });
                        }
                        list.push(temp);

                    }
                    await p.gain(list,"gain2");
                }

            },
            diytuxi:{
                inherit:"new_retuxi",
                audio: "retuxi",
                trigger: {
                    player: ["drawBegin"],
                },
                init:function(player){
                    player.storage.diytuxi=false;
                },
                content() {
                    "step 0";
                    if(!player.storage.diytuxi){
                        lib.skill.initWujiangpai.initL(player,"sb_zhangliao","re_sunquan");
                        player.storage.diytuxi=true;
                    }
                    var num = get.copy(trigger.num);
                    player
                        .chooseTarget(
                            get.prompt("new_retuxi"),
                            "获得至多" + get.translation(num) + "名角色的各一张手牌，然后少摸等量的牌",
                            [1, num],
                            function (card, player, target) {
                                return target.countCards("h") > 0 && player != target;
                            },
                            function (target) {
                                var att = get.attitude(_status.event.player, target);
                                if (target.hasSkill("tuntian")) return att / 10;
                                return 1 - att;
                            }
                        )
                        .setHiddenSkill("new_retuxi");
                    "step 1";
                    if (result.bool) {
                        result.targets.sortBySeat();
                        player.logSkill("new_retuxi", result.targets);
                        player.gainMultiple(result.targets);
                        trigger.num -= result.targets.length;
                    } else {
                        event.finish();
                    }
                    "step 2";
                    if (trigger.num <= 0) game.delay();
                },
                

                

            },
            init_sunyihuanggai:{
                trigger: {
                    global: "phaseBefore",
                    player: "enterGame",
                },
                forced: true,
                filter(event, player) {
                    return (event.name != "phase"||game.phaseNumber == 0);
                },
                content(){
                    lib.skill.initWujiangpai.initL(player,"re_sunyi","re_huanggai");
                }

            },
            init_diyXunyouzhongyao:{
                trigger: {
                    global: "phaseBefore",
                    player: "enterGame",
                },
                forced: true,
                filter(event, player) {
                    return (event.name != "phase"||game.phaseNumber == 0);
                },
                content(){
                    lib.skill.initWujiangpai.initL(player,"clan_xunyou","clan_zhongyao");
                }

            },
            init_diyMenghuofunv:{
                trigger: {
                    global: "phaseBefore",
                    player: "enterGame",
                },
                forced: true,
                filter(event, player) {
                    return (event.name != "phase"||game.phaseNumber == 0);
                },
                content(){
                    lib.skill.initWujiangpai.initL(player,"sp_menghuo","huaman");
                }
            },
            initWujiangpai:{//把武将牌皮肤变成双头
                enable:"phaseUse",
                initL(player,first,chosen){
                    game.broadcastAll(
                        function (player, first, chosen) {
                            player.name1 = first;
                            player.node.avatar.setBackground(first, "character");
                            //player.node.name.innerHTML = get.slimName(first);
                            player.name2 = chosen;
                            player.skin.name = first;
                            player.skin.name2 = chosen;
                            player.classList.add("fullskin2");
                            player.node.avatar2.classList.remove("hidden");
                            player.node.avatar2.setBackground(chosen, "character");
                            //player.node.name2.innerHTML = get.slimName(chosen);
                            if (player == game.me && ui.fakeme) {
                                ui.fakeme.style.backgroundImage = player.node.avatar.style.backgroundImage;
                            }
                        },
                        player,
                        first,
                        chosen
                    );

                },
                async content(event,trigger,player){
                    //lib.skill.initWujiangpai.initL(player,"zhouyu","sunce"); 
                }
            },
            init_diyDufurencaoang:{
                trigger: {
                    global: "phaseBefore",
                    player: "enterGame",
                },
                forced: true,
                filter(event, player) {
                    return (event.name != "phase"||game.phaseNumber == 0);
                },
                content(){
                    lib.skill.initWujiangpai.initL(player,"ol_qinlang","qinlang");
                }

            },
            diyDujin:{
                audio: "dujin",
                trigger: {
                    player: "phaseDrawBegin2",
                },
                frequent: true,
                preHidden: true,
                filter(event, player) {
                    return !event.numFixed;
                },
                content() {
                    let num = [1, 2, 3, 4, 5].map(i => player.countEmptySlot(i)).reduce((p, c) => p + c, 0);
                    trigger.num =1+num; //Math.ceil(player.countCards("e") / 2);
                },
                mod: {
                    cardUsable(card, player, num) {
                        if (card.name == "sha") return num+(player.countCards("e")||0);
                    },
                },
                group:"diyDujin_sha",
                subSkill:{
                    sha:{
                        enable: ["chooseToRespond","chooseToUse"],
                        filter(event, player) {
                            return player.countCards("he", { type: "equip" }) > 0 && lib.filter.cardEnabled({ name: "sha" }, player);
                        },
                        filterCard: {
                            type: "equip",
                        },
                        check(card) {
                            var player = _status.currentPhase;
                            if (player.countCards("he", { subtype: get.subtype(card) }) > 1) {
                                return 11 - get.equipValue(card);
                            }
                            return 6 - get.equipValue(card);
                        },
                        position: "hes",
                        viewAs: {
                            name: "sha",
                        },
                        viewAsFilter(player) {
                            return player.countCards("he", { type: "equip" });
                        },
                        prompt: "将一装备牌牌当杀使用或打出",
                    }
                }

            },
            diyYingjian:{
                trigger: {
                    player: "phaseZhunbeiBegin",
                },
                direct: true,
                audio: "qingyi",
                
                content() {
                    player.chooseUseTarget("###是否发动【影箭】？###视为使用一张没有距离限制的火【杀】", { name: "sha" ,nature:"fire"}, false, "nodistance").logSkill = "diyYingjian";
                },
                ai: {
                    threaten(player, target) {
                        return 1.6;
                    },
                },

            },
            diyShixin:{
                audio: "shixin",
                trigger: {
                    player: "damageBegin4",
                },
                filter(event) {
                    return event.hasNature("fire");
                },
                forced: true,
                content() {
                    trigger.cancel();
                },
                ai: {
                    nofire: true,
                    effect: {
                        target(card, player, target, current) {
                            if (get.tag(card, "fireDamage")) return "zeroplayertarget";
                        },
                    },
                },
                group:["diyShixin_effect"],
                subSkill:{
                    effect:{
                        trigger:{
                            global:"damageBegin4",
                        },
                        filter(event) {
                            return event.hasNature();
                        },
                        check(event, player) {
                            if(event.hasNature("fire")&&event.player==player) return true;
                            var att = get.attitude(player, event.player);
                            if (att < 0) {
                                if (event.source.group != "wu" || !event.cards.filterInD().length) return true;
                                return get.attitude(player, event.source) > 0;
                            }
                            return false;
                        },
                        prompt2(event, player) {
                            var str = "是否令" + get.translation(event.player) + "即将受到的";
                            str += "" + event.num + "点";
                            if (event.hasNature("linked")) {
                                str += get.translation(event.nature) + "属性";
                            }
                            str += "伤害+1";
                            return str;
                        },
                        content(){
                            player.draw();
                            trigger.num++;
                        }

                    }
                }

            },
            diyJianxiong:{
                audio:"jianxiong",
                trigger: {
                    target: ["useCardToTargeted"],
                },
                forced:true,
                filter(event,player){
                    return true;
                },
                async content(event,trigger,player){  
                    await player.draw(); 
                },
                group:"new_rejianxiong",
            },
            diyShizhan:{
                inherit:"shizhan",
                audio:"shizhan",
                marktext: "☯",
                zhuanhuanji: true,
                mark: true,
                intro: {
                    content(storage) {
                        if (storage) return "你可选择一名其他角色并摸一张牌，你视为对其使用使用一张决斗";
                        return "你可选择一名其他角色并摸一张牌，其视为对你使用使用一张决斗";
                    },
                },
                filterTarget(card, player, target) {
                    return target != player && player.storage["diyShizhan"]?target.canUse("juedou", player):player.canUse("juedou", target);
                },
                async content(event, trigger, player) {
                    const {
                        targets: [target],
                    } = event;
                    await player.draw();
                    if (player.storage[event.name]) {
                        await player.useCard(new lib.element.VCard({ name: "juedou" }), target);
                    } else {
                        await target.useCard(new lib.element.VCard({ name: "juedou" }), player, "noai");
                    }
                    player.changeZhuanhuanji(event.name);
                },

                ai: {
                    order: 10,
                    result: {
                        player(player, target) {
                            if (!player.storage["diyShizhan"]) return get.effect(target, get.autoViewAs({ name: "juedou" ,isCard:true}), player, player);
                            return get.effect(player, new lib.element.VCard({ name: "juedou" ,isCard:true}), target, player);
                        },
                    },
                },

            },
            diyJiewei:{
                inherit:"xinjiewei",
                audio:"xinjiewei",
                position: "he",
                viewAs: {
                    name: "wuxie",
                },
                filter(event, player) {
                    return player.countCards("e") > 0;
                },
                viewAsFilter(player) {
                    return player.countCards("e") > 0;
                },
                prompt: "将一张装备区内的牌当无懈可击使用",
                check(card) {
                    return 8 - get.equipValue(card);
                },
                group: "diyJiewei_move",
                subSkill: {
                    move: {
                        trigger: {
                            player: "turnOverEnd",
                        },
                        audio: "jiewei",
                        filter(event, player) {
                            return true;
                        },
        
                        async content(event, trigger, player) {
                            if(!player.isTurnedOver()){
                                var r1=await player.chooseToDiscard("he", get.prompt("diyJiewei"), "弃置一张牌并移动场上的一张牌", lib.filter.cardDiscardable)
                                .set("ai", function (card) {
                                    if (!_status.event.check) return 0;
                                    return 7 - get.value(card);
                                })
                                .set("check", player.canMoveCard(true))
                                .forResult();
                                if(!r1.bool) return;
                            }
                            if(player.canMoveCard()) await player.moveCard(false);
                            const sha = new lib.element.VCard({ name: "sha" });
                            if (player.hasUseTarget(sha, false)) {
                                await player.chooseUseTarget(sha, true, false, "nodistance");
                            }

                        },
                        sub: true,
                        sourceSkill: "xinjiewei",
                        "_priority": 0,
                    },
                },
            
                

            },
            diyDulie:{
                inherit:"olsbdulie",
                trigger:{
                    target:"useCardToTarget",
                    player:"useCardToTarget",
                },
                filter(event,player){
                    if(event.player==event.target)return false;
                    if (player.getAttackRange() <= 0) return;
                    return ["basic", "trick"].includes(get.type(event.card));
                }

            },
            diyTuifeng:{
                inherit:"tuifeng",
                audio:"tuifeng",
                trigger:{
                    player:['damageEnd','phaseDiscardBegin',"enterGame"],
                    global: "phaseBefore",
                },
                direct: true,
                filter(event,player){
                    return (event.name != "phase" || game.phaseNumber == 0);
                },
                content(){
                    "step 0";
                    player.draw(trigger.num);
                    "step 1";
                    player.chooseCard(get.prompt2("diyTuifeng"), "he", [1, trigger.num]).set("ai", function (card) {
                        if (card.name == "du") return 20;
                        return 7 - get.useful(card);
                    });
                    "step 2";
                    if (result.bool) {
                        player.logSkill("diyTuifeng");
                        player.addToExpansion(result.cards, player, "give").gaintag.add("tuifeng");
                    }
                },
                onremove(player, skill) {
                    var cards = player.getExpansions(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },



            },
            diyBingxin:{
                inherit:"bingxin",
                filter(event,player){
                    if (event.type == "wuxie") return false;
                    //var hs = player.getCards("h");
                    //if (hs.length != Math.max(0, player.hp)) return false;
                    /*
                    if (hs.length > 1) {
                        var color = get.color(hs[0], player);
                        for (var i = 1; i < hs.length; i++) {
                            if (get.color(hs[i], player) != color) return false;
                        }
                    }*/
                    var storage = player.storage.bingxin_count;
                    for (var i of lib.inpile) {
                        if (get.type(i) != "basic") continue;
                        if (storage && storage.includes(i)) continue;
                        var card = { name: i, isCard: true };
                        if (event.filterCard(card, player, event)) return true;
                        if (i == "sha") {
                            for (var j of lib.inpile_nature) {
                                card.nature = j;
                                if (event.filterCard(card, player, event)) return true;
                            }
                        }
                    }
                    return false;

                },
                chooseButton: {
                    dialog(event, player) {
                        var list = [];
                        var storage = player.storage.bingxin_count;
                        for (var i of lib.inpile) {
                            if (get.type(i) != "basic") continue;
                            if (storage && storage.includes(i)) continue;
                            var card = { name: i, isCard: true };
                            if (event.filterCard(card, player, event)) list.push(["基本", "", i]);
                            if (i == "sha") {
                                for (var j of lib.inpile_nature) {
                                    card.nature = j;
                                    if (event.filterCard(card, player, event)) list.push(["基本", "", i, j]);
                                }
                            }
                        }
                        return ui.create.dialog("冰心", [list, "vcard"], "hidden");
                    },
                    check(button) {
                        if (button.link[2] == "shan") return 3;
                        var player = _status.event.player;
                        if (button.link[2] == "jiu") {
                            if (player.getUseValue({ name: "jiu" }) <= 0) return 0;
                            if (player.countCards("h", "sha")) return player.getUseValue({ name: "jiu" });
                            return 0;
                        }
                        return player.getUseValue({ name: button.link[2], nature: button.link[3] }) / 4;
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
                                player.logSkill("bingxin");
                                const delt = player.countCards("h") - player.maxHp;
                                if(delt>0){
                                    player.chooseToDiscard(delt,'h',true);
                                }
                                else player.drawTo(player.maxHp);
                                var name = event.result.card.name;
                                player.addTempSkill("bingxin_count");
                                player.markAuto("bingxin_count", [name]);
                            },
                        };
                    },
                    prompt(links, player) {
                        var name = links[0][2];
                        var nature = links[0][3];
                        return "将手牌调整至体力上限并视为使用" + (get.translation(nature) || "") + get.translation(name);
                    },
                },
                ai:{
                    order: 10,
                    respondShan: true,
                    respondSha: true,
                    
                    skillTagFilter(player, tag, arg) {
                        if (arg == "respond") return false;
                        var hs = player.getCards("h");
                        if (hs.length != Math.max(0, hs.length)) return false;
                        /*
                        if (hs.length > 1) {
                            var color = get.color(hs[0], player);
                            for (var i = 1; i < hs.length; i++) {
                                if (get.color(hs[i], player) != color) return false;
                            }
                        }*/
                        var storage = player.storage.bingxin_count;
                        if (storage && storage.includes("s" + tag.slice(8))) return false;
                    },
                    result: {
                        player(player) {
                            if (_status.event.dying) return get.attitude(player, _status.event.dying);
                            return 1;
                        },
                    },
                }

            },
            diyLongdan:{
                audio:"chongzhen",
                trigger: {
                    player: ["useCard","respond"],
                },
                filter(event, player) {
                    if (event.card.name != "sha" && event.card.name != "shan") return false;
                    var target = lib.skill.diyLongdan.logTarget(event, player);
                    return target && target.countGainableCards(player, "he") > 0;
                },
                logTarget(event, player) {
                    if (event.name == "respond") return event.source;
                    if (event.card.name == "sha") return event.targets[0];
                    return event.respondTo[0];
                },
                prompt2(event, player) {
                    var target = lib.skill.diyLongdan.logTarget(event, player);
                    return "获得" + get.translation(target) + "的一张手牌";
                },
                content() {
                    var target = lib.skill.diyLongdan.logTarget(trigger, player);
                    player.gainPlayerCard(target, "he", true);
                },
                ai: {
                    combo: "ollongdan",
                    mingzhi: false,
                    effect: {
                        target(card, player, target, current) {
                            if (get.tag(card, "respondShan") || get.tag(card, "respondSha")) {
                                if (get.attitude(target, player) <= 0) {
                                    if (current > 0) return;
                                    if (target.countCards("h") == 0) return 1.6;
                                    if (target.countCards("h") == 1) return 1.2;
                                    if (target.countCards("h") == 2) return [0.8, 0.2, 0, -0.2];
                                    return [0.4, 0.7, 0, -0.7];
                                }
                            }
                        },
                    },
                },


            },
            diyDangxian:{
                trigger: {
                    global: "phaseBefore",
                },
                filter(event, player) {
                    return event.player != player &&event.player.identity=="zhu";
                },
                check(event, player) {
                    return get.attitude(player, event.player) < 0 && ((player.countCards("h") > player.hp && player.countCards("h", "lebu") == 0) || get.distance(player, event.player) > 1);
                },
                logTarget: "player",
                content() {
                    "step 0";
                    player.draw();
                    player.$draw();
                    "step 1";
                    player.phase("shanxian");
                },

            },
            diyFUji:{
                enable: "phaseUse",
                usable:1,
                async content(event,trigger,player) {
                    let skillMap = game.getSWSkillsList(player).randomGets(3);
                    const lt = [];
                    for (const skill of skillMap) lt.push([ '【' + get.translation(skill) + "】" + lib.translate[skill + "_info"]]);

                    var control= await player.chooseControl().set("choiceList",lt).forResult();
                    
                    if(control){
                        player.addSkill(skillMap[control.index]);
                        game.log(player,"获得了",get.translation(skillMap[control.index]))
                    }
                },
                ai: {
                    order: 1,
                    result: {
                        player(player, target) {
                            if (player.countCards("h") > player.hp) return 1;
                            return 0;
                        },
                    },
                },



            },
            diyJianyi:{
                trigger: {
                    player: "damageBegin4",
                },
                forced: true,
                audio: "baiyin_skill",
                filter(event, player) {
                    if (!player.hasEmptySlot(2)) return false;
                    if (event.num <= 1) return false;
                    if (player.hasSkillTag("unequip2")) return false;
                    if (
                        event.source &&
                        event.source.hasSkillTag("unequip", false, {
                            name: event.card ? event.card.name : null,
                            target: player,
                            card: event.card,
                        })
                    )
                        return false;
                    return true;
                },
                content() {
                    trigger.num = 1;
                },
                ai: {
                    filterDamage: true,
                    skillTagFilter(player, tag, arg) {
                        if (player.hasSkillTag("unequip2")) return false;
                        if (arg && arg.player) {
                            if (
                                arg.player.hasSkillTag("unequip", false, {
                                    name: arg.card ? arg.card.name : null,
                                    target: player,
                                    card: arg.card,
                                })
                            )
                                return false;
                            if (
                                arg.player.hasSkillTag("unequip_ai", false, {
                                    name: arg.card ? arg.card.name : null,
                                    target: player,
                                    card: arg.card,
                                })
                            )
                                return false;
                            if (arg.player.hasSkillTag("jueqing", false, player)) return false;
                        }
                    },
                },

            },
            diyzhouxuan:{
                inherit:"spolzhouxuan",
                audio:"spolzhouxuan",
                trigger: {
                    player: ["phaseDiscardBegin","useCard"],
                    
                },
                filter(event, player) {
                    if (event.name == "phaseDiscard") return player.countCards("h") && player.getExpansions('diyzhouxuan').length < 5;
                    return player.countExpansions("diyzhouxuan");
                },

            },
            changeHp: {
                enable:"phaseUse",
                usable:1,
                /*
                trigger: {
                    player: "phaseBegin",
                },*/
                frequent: true,
                usable: 1,
                filter(event,player){
                    return player.hp>1&&player.hasCard(function (card) {
                        return lib.filter.cardDiscardable(card, player, "changeHp");
                    }, "h");
                },
                init: function(player){
                    player.storage.changeHp_number=0;
                },
                async content(event,trigger,player){
                    var r1=await player.chooseToDiscard("h",[1,Infinity]).set("complexCard", true).set("ai", function (card) {
                        if (!player.hasValueTarget(card)) return 5;
                        return 5 - get.value(card);
                    }).forResult();
                    if(!r1.bool) return;
                    var num=player.hp-1;
                    await player.loseHp(num);
                    player.storage.changeHp_number=num;
                    player.addTempSkill("changeHp_1");

                    /*
                    const { result } = await player.chooseNumbers(get.prompt2("changeHp"), [{ prompt: "请选择你失去的血量", min: 1, max:player.hp-1}])
                    .set("processAI", () => {
                        return [get.event().maxNum];
                    })
                    .set("maxNum",player.hp-1);

                    if (result.bool) {
                        const number = result.numbers[0];
                        await player.loseHp(number);
                        player.storage.changeHp_number=number
                        player.addTempSkill("changeHp_1");
                        
                    }*/
                },
                subSkill: {
                    "1": {
                        trigger: {
                            player: "phaseEnd",
                        },
                        forced: true,
                        content(){
                            player.recover(player.storage.changeHp_number);
                        },
                        sub: true,
                        sourceSkill: "changeHp",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
            diyDawu:{
                audio: "jiuyuan",
                trigger: {
                    global: "phaseBefore",
                    player: "enterGame",
                },
                forced: true,
                filter(event, player) {
                    return (event.name != "phase" || game.phaseNumber == 0) && !lib.inpile.includes("吴王");
                },
                content() {
                    var cards = [];
                    for (var i = 2; i <10; i++) {
                        cards.push(game.createCard2("吴王", "club", i,"thunder"));
                    }
                    game.broadcastAll(function () {
                        lib.inpile.add("吴王");
                    });
                    game.cardsGotoPile(cards, () => {
                        return ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length - 1)];
                    });

                    lib.skill.initWujiangpai.initL(player,"re_sunquan","sunquan");
                },
            },
            ///////////////自己技能添加出
            fuyu_fuben:{
                trigger:{
                    player:"turnOver",
                },
                frequent:true,
                content(){
                    player.draw(2);
                }
            },
            mengzi_fuben:{
                trigger:{
                    player:"phaseBegin"
                },
                limited: true,
                skillAnimation: true,
                animationColor: "water",
                filter(event, player) {
                    return true;
                },
                content() {
                    player.awakenSkill("mengzi_fuben");
                    game.addGlobalSkill("mengzi_fuben_func");
                    game.broadcastAll(() => {
                        if (!_status.mengzi) _status.mengzi = 0;
                        _status.mengzi++;
                    });
                },
                subSkill:{
                    func:{
                        trigger:{
                            player:"phaseZhunbeiBegin",
                        },
                        forced:true,
                        async content(event,trigger,player){
                            var t=game.filterPlayer(p=>p.identity=="fan");
                            game.asyncDraw(t,_status.mengzi||1);
                        },
                        mod: {
                            cardUsable(card, player, num) {
                                if (player.identity=='fan'&&card.name == "sha") return num + _status.mengzi||1;
                            },
                        },

                    }

                },
                ai: {
                    order: 1,
                    result: {
                        target: 1,
                    },
                },
            },
            aowu: {
                audio: "nzry_cunmu",
                trigger: {
                    player: "drawBegin",
                },
                forced: true,
                async content(event, trigger, player) {
                    var r=await player.chooseBool("是否从牌堆底摸",true).forResult();
                    trigger.bottom=r.bool;
                    if(r.bool&&!player.getHistory("custom",function(evt){return evt.aowu==true}).length){
                        var card1=get.cards(1);
                        player.gain(card1,'gain2','log');
                        player.getHistory("custom").push({aowu:true});
                    }
                    else if(!r.bool&&!player.getHistory("custom",function(evt){return evt.aowu==false}).length){
                        var card2=get.bottomCards(1);
                        player.gain(card2,'gain2','log');
                        player.getHistory("custom").push({aowu:false});

                    }
                },
                ai: {
                    abnormalDraw: true,
                    skillTagFilter(player, tag, arg) {
                        if (tag === "abnormalDraw") return !arg || arg === "bottom";
                    },
                },
                "_priority": 0,
            },
            diyYongsi:{
                trigger: {
                    global: ["phaseBegin"]
                },
                audio:"yongsi",
                filter(event,player){
                    return player.countMark("diyYongsi_used") < game.countGroup();
                },
                intro: {
                    markcount: (_, player) => game.countGroup()-player.countMark("diyYongsi_used"),
                    content: (_, player) => "当前剩余发动次数：" + (game.countGroup()-player.countMark("diyYongsi_used")),
                },
                content: function(){
                    player.draw(game.countGroup());
                    player.addTempSkill("diyYongsi_dis");
                    player.addTempSkill("diyYongsi_removedis");
                    player.addTempSkill("diyYongsi_used", "roundStart");
                    player.addMark("diyYongsi_used", 1, false);
                    player.markSkill("diyYongsi");
                },
                subSkill:{
                    used: {
                        onremove: true,
                        charlotte: true,
                        sub: true,
                        sourceSkill: "diyYongsi_used",
                        "_priority": 0,
                    },
                    dis: {
                        trigger: {
                            global: "phaseDiscardBegin",
                        },
                        frequent: true,
                        content(){
                            player.chooseToDiscard(game.countGroup(), "h", true);
                        },
                        sub: true,
                        sourceSkill: "diyYongsi",
                        "_priority": 0,
                    },
                    removedis:{
                        trigger:{
                            player:"damageEnd",
                            source: "damageSource",
                        },
                        filter(event,player){
                            return player.hasSkill("diyYongsi_dis");
                        },
                        forced:true,
                        content(){
                            player.removeSkill("diyYongsi_dis");
                        }
                    }
                }
            },
            diyQizhi:{
                inherit:"qizhi",
                audio:"qizhi",
                filter(event, player) {
                    if (!event.targets || !event.isFirstTarget) return false;
                    if (_status.currentPhase != player) return false;
                    //var type = get.type(event.card, "trick");
                    //if (type != "basic" && type != "trick") return false;
                    if (event.noai) return false;
                    return game.hasPlayer(function (target) {
                        return !event.targets.includes(target) && target.countCards("he") > 0;
                    });
                },
                async content(event, trigger, player) {
                    const target = event.targets[0];
                    player.getHistory("custom").push({ [event.name]: true });
                    await player.discardPlayerCard(target, true, "he");
                    await player.draw();
                },

            },
            diyJinqu:{
                audio: "jinqu",
                trigger: {
                    player: "phaseJieshuBegin",
                },
                /*
                check(event, player) {
                    return (
                        player.getHistory("custom", function (evt) {
                            return evt.diyQizhi == true;
                        }).length >= player.countCards("h")
                    );
                },*/
                prompt(event, player) {
                    var num = player.getHistory("custom", function (evt) {
                        return evt.diyQizhi == true;
                    }).length;

                    return "进趋：是摸" + get.cnNumber(Math.min(5,num)) + "张牌？";
                },
                filter(event,player){
                    return player.getHistory("custom", function (evt) {
                        return evt.diyQizhi == true;
                    }).length;// >= player.countCards("h");
                },
                content() {
                    var num=player.getHistory("custom", function (evt) {
                        return evt.diyQizhi == true;
                    }).length;

                    player.draw(Math.min(num,5));
                },
                ai: {
                    combo: "diyQizhi",
                },
                "_priority": 0,

            },
            paiwang_put: {
                trigger: {
                    player: "useCardAfter",
                },
                forced: true,
                filter: function(event,player){
                    if(!event.card.isCard) return false;
                    return event.cards.length&& player.getExpansions("diyzhouxuan").length <5&&get.position(event.cards[0])=='d';
                },
                content(){

                    player.addToExpansion(trigger.cards, player, "give").gaintag.add("diyzhouxuan");
                },
                "_priority": 0,
            },
            diyLangxi:{
                inherit:"xinfu_langxi",
                audio:"xinfu_langxi",
                trigger:{
                    player:['phaseZhunbeiBegin',"phaseJieshuBegin"],
                },
                filter(event, player, name) {
                    if (name == "phaseJieshuBegin") {
                        return player.hasSkill("diyLangxi_again");
                    }
                    return true;
                },
                async cost(event, trigger, player) {
                    event.result = await player
                        .chooseTarget(get.prompt(event.name.slice(0, -5)), "对一名其他角色造成0-2点随机伤害", (card, player, target) => {
                            return target !== player;
                        })
                        .set("ai", target => {
                            const player = get.event().player,
                                att = get.attitude(player, target);
                            if (att > 0) return 0;
                            return get.damageEffect(target, player, player);
                        })
                        .forResult();
                },
                async content(event, trigger, player) {
                    const target = event.targets[0];
                    if (get.mode() !== "identity" || player.identity !== "nei") player.addExpose(0.3);
                    event.num = get.rand(1, 6);
                    const num = Math.ceil(event.num / 2 - 1);
                    player.popup(num ? get.cnNumber(num) + "点" : "🐏袭");
                    await target.damage(Math.ceil(event.num / 2 - 1));
                    if(!num) player.addTempSkill("diyLangxi_again");
                },
                subSkill:{
                    again:{
                        charlotte: true,
                        sub: true,
                        sourceSkill: "diyLangxi",
                        "_priority": 0,
                    }
                }

            },
            sweetheart: {
                audio: "kurou",
                enable: "phaseUse",
                filter(event,player){
                    return player.getDamagedHp()&&game.filterPlayer(function(e){return e!=player});
                },
                filterCard: true,
                position: "he",
                selectCard: 1,
                check(card) {
                    return 8 - get.value(card);
                },
                filterTarget(card,player,target){
                    return player!=target;
                },
                async content(event,trigger,player){
                    await player.recover();
                    await event.target.draw(2);
                },
                ai: {
                    order() {
                        return 9;
                    },
                    result: {
                        player(player, target) {
                            if (!ui.selected.cards.length) return 0;
                            let card = ui.selected.cards[0],
                            val = -get.value(card, player) / 6;
                            val += get.attitude(player, target);
                            return val;
                        },
                    },
                },
                "_priority": 0,
            },
            diyZishu: {
                audio: "zishu",
                trigger: {
                    player: "gainEnd",
                },
                filter(event,player){
                    return player.countCards('hes');
                },
                async content(event,trigger,player){

                    var list=get.inpile('trick',function(card){
                        return player.hasUseTarget(card)&&!player.getHistory('custom',function(e){
                            return e.diyZishu==card;
                        }).length;
                    });
                    if(list.length){
                        for(var i=0;i<list.length;i++){
                            list[i]=["锦囊","",list[i]];
                        }
                        
                        var result=await player.chooseButton(['选择一张自书锦囊牌',[list,'vcard']],1).forResult();
                        if(result.bool){
                            //game.log(result.links[0][2]);
                            var r2=await player.chooseCard('选择一张牌将其当作'+get.translation(result.links[0][2])+'使用','hes').forResult();
                            if(r2.bool){
                                player.getHistory('custom').push({diyZishu:result.links[0][2]});
                                await player.chooseUseTarget(true, { name: result.links[0][2] }, r2.cards);
                                
                            }
    
    
                        }

                    }



                },
                "_priority": 0,
            },
            ydzhiheng: {
                audio: "rezhiheng",
                enable: "phaseUse",
                position: "hes",
                filterCard: function(card,player,event){
                    event=event||_status.event;
                    if(typeof event!='string') event=event.getParent().name;
                    var mod=game.checkMod(card,player,event,'unchanged','cardDiscardable',player);
                    if(mod!='unchanged') return mod;
                    return true;
                },
                //usable: 1,
                filter(event,player){
                    //if(player.countCards('h',"大吴")) return true;
                    return player.countCards('h')&&!player.hasSkill('rezhiheng_delay');
                },
                discard: false,
                lose: false,
                delay: false,
                selectCard: [1,Infinity],
                init: function(player){
                    player.storage.ydzhiheng_times=0;
                },
                check: function(card){
                    var player=_status.event.player;
                    if(get.position(card)=='h'&&!player.countCards('h','du')&&(player.hp>2||!player.countCards('h',function(card){
                        return get.value(card)>=8;
                    }))){
                        return 1;
                    }
                    return 6-get.value(card)
                },
                async content(event,trigger,player){

                    
                    //await player.addTempSkill("rezhiheng_delay");
                    await player.discard(event.cards);
                    if(!event.cards.filter(function(card){
                        return get.name(card)=='吴王';
                    }).length) await player.addTempSkill("rezhiheng_delay");
                    var ctrl=[];
                    ctrl.push('基本');
                    ctrl.push('锦囊');
                    ctrl.push('武具');
                    ctrl.push('防具');
                    ctrl.push('防马');
                    ctrl.push('攻马');
                        //ctrl.push('取消');
                    //event.control=ctrl;
                    var r1=await player.chooseControl(ctrl).forResult();
                    if(r1.control){
                        var type='basic';
                        var subtype='none';
                        switch(r1.control){
                            case '锦囊':type='trick';break;
                            case '防马':type='equip';subtype='equip3';break; 
                            case '攻马':type='equip';subtype='equip4';break;     
                            case '武具':type='equip';subtype='equip1';break; 
                            case '防具':type='equip';subtype='equip2';break; 
                            case '基本':type='basic';break;
                        }
                        game.log("你选择的是:"+type);
                        await player.draw(event.cards.length);

                        var find=get.cardPile(function(card){
                            if(subtype!='none') return get.subtype(card)==subtype;
                            return get.type(card)==type;
                        });
                        if(!find){
                            find=get.discardPile(function(card){
                                if(subtype!='none') return get.subtype(card)==subtype;
                                return get.type(card)==type;
                            });
                        }

                        if(find){
                            await player.gain(find,'gain2');
                        }


                    }
                },
                group:"ydzhiheng_1",
                subSkill:{
                    1:{
                        trigger:{
                            player:"gainAfter",
                        },
                        forced:true,
                        filter(event,player){
                            return player.hasSkill("rezhiheng_delay")&&event.cards.filter(function(card){
                                return get.name(card)=="吴王";
                            }).length;
                        },
                        content(){
                            player.removeSkill("rezhiheng_delay");
                        }
                    }
                },
                ai: {
                    order: function(item, player) {
                           if (player.countCards('h') == 1) {
                                if (player.countCards('h', 'tao') == 0 && player.countCards('h', 'wuzhong') == 0) return 10;
                                return 10;
                           }
                           if (player.countCards('h', 'tao') > 0) {
                                return get.order({
                                     name: 'tao'
                                }) - 1;
                           }
                           if (player.hp < player.maxHp) {
                                return get.order({
                                     name: 'tao'
                                }) - 1;
                           }
                           return 1;
                      },
                    result: {
                        player: 1,
                    },
                    threaten: 1.55,
                },
                "_priority": 0,
            },
            

        },
        characterSort: {
        },
        translate:{
            diyGuohuai:"郭淮",
            diyJingce:"精策",
            diyJingce_info:"锁定技，每回合你使用牌时，你获得本回合未被使用过的类型牌各一张",
            diyYuanshu2:"袁术",
            diyYongsi2:"庸嗣",
            diyYongsi2_info:"锁定技,其他角色摸牌/弃置牌后你摸/弃置等两张牌",
            //diyGuanyu:"关羽",
            //diyZhanjiang:"斩将",
            //diyZhanjiang_info:"每轮开始时，你可将武将牌上的”斩“补充至6张，当你失去一张牌后，你可获得一张同花色的”斩“并视为使用一张【杀】",
            diyZhouyu:"周瑜",
            diyYingzi:"英姿",
            diyYingzi_info:"准备阶段，你可摸X张牌，然后额外手牌上限改为X(X为你各区域内牌的花色数之和)",
            diySunquan2:"孙权",
            diyzhiheng2:"制衡",
            diyzhiheng2_info:"出牌阶段限一次，你可弃置任意张牌并摸弃置牌数+弃牌牌类型数张牌,你的手牌上限+X(X为你手牌类型数)",
            diyHubao:"虎豹",
            diyHubao_info:"出牌阶段，你可弃置一张本回合为未此法弃置过的牌名的牌，然后摸一张牌，然后你可使用此弃置牌",
            diyCaochun:"智曹纯",
            diyDuanjiong:"段颎",
            diyQuman:"驱蛮",
            diyQuman_info:"出牌阶段若你有牌可弃置，你可以摸两张牌，然后弃置X张牌（X为本回合此技能发动次数），然后可使用一张牌（不计入次数），若以此法造成伤害你摸一张牌",
            diyZhugejin:"诸葛瑾",
            diyMingzhe:"明哲",
            diyMingzhe_info:"锁定技，你于出牌阶段外失去牌后，你后摸等量张牌且这些牌不计入使用次数",
            diyLvbu:"吕布",
            diyWushuang:"无双",
            diyWushuang_info:"你的基本牌与普通锦囊牌牌指定目标后，你可令此牌额外结算一次",
            diyText:"测试",
            diyLusu:"鲁肃",
            diyHaoshi:"好施",
            diyHaoshi_info:"一名角色的出牌阶段开始时，你可令其摸一张牌,然后弃置任意张牌并摸等量张牌，若弃置完你没有手牌，额外摸一张牌",
            diyJianshengLiubei:"刘备",
            diyJiansheng:"剑圣",
            diyZhangming:"彰名",
            diyZhangming_info:"当你受到伤害后，可将一张牌当【杀】对伤害来源使用",
            diyJiansheng_info:"锁定技，你每回合首次使用某种花色牌指定唯一目标后，你令其弃置一张此花色的牌，否则你获得其余花色牌各一张",
            diyJiangwei:"姜维",
            diyBeifa:"北伐",
            diyBeifa_info:"出牌阶段阶段限一次，你可失去一体力上限，然后你亮出牌堆顶4张牌，使用其中的【杀】（无视距离的与次数），若未以此法成伤害，下次额外展示一张牌，然后你获得剩余牌",
            diyZhonghui:"钟会",
            diyQuanji:"权计",
            diyPaiyi:"排异",
            diyRuchuan:"入川",
            diyRuchuan_info:"觉醒技，准备阶段，若你已发动过至少3次【排异】，你增加一点体力上限，恢复一点体力并获得技能【仁德】",
            diyPaiyi_info:"每回合限一次，当有牌进入游戏后，你可另一名角色将手牌摸至手牌上限,若你未因此摸牌你将一张牌置入“权”",
            diyQuanji_info:"游戏开始时，你将所有手牌置于武将牌上为“权“；你可以如手牌般使用/打出“权”；出牌阶段开始时/当你受到后，你摸一张牌（仅受到伤害后）然后将一张牌置入“权”，你的手牌上限+X(X为权的数量);",
            diyYanjun:"严畯",
            diyGuanchao:"观潮",
            diyGuanchao_info:"转换技,你使用牌时若此牌比你上一张使用的牌点数阳：大；阴：小，你摸一张牌，出牌阶段限一次，你可摸一张牌并转变此技能状态",
            diyWuban:"吴班",
            diyJintao: "进讨",
            "diyJintao_info": "回合结束时，你可摸X张牌，若X大于你此时可使用杀的次数，你出牌阶段使用杀次数+1（X为你本回合使用牌的次数",
            diyCaopi:"曹丕",
            diyZhengSi:"争嗣",
            diyZhengSi_info: "出牌阶段你可声明一种花色，然后令一名其他角色交给你一张牌并获得一点“嗣”标记，若此牌花色不为声明花色此技能本阶段失效。摸牌阶段开始时若你的额外摸牌数小于“嗣”，你可以消耗一点“嗣”令此数值+1，出牌阶段开始时，若你的额外攻击范围/额外出杀次数/额外体力上限小于“嗣”,你可消耗一点“嗣”令对应数值+1，弃牌阶段开始时，若你额外手牌上限小于“嗣”,你可消耗一点“嗣”令此数值+1",
            diySundeng:"孙登",
            diyKuangbi:"匡弼",
            diyKuangbi_info:"出牌阶段限一次，你可令一名其他角色交给你X张牌，这些牌本回合不计入手牌上限,其于其回合开始时摸等量张（X为你与其手牌数的差值且至少为1）",
            diyShamoke:"沙摩柯",
            diyJili:"蒺藜",
            diyJili_info:"锁定技，每回合你首次使用/打出某牌名字数的牌时，你摸该牌名字数张牌",
            diyChengyu:"程昱",
            diyShefu:"设伏",
            diyShefu_info:"弃牌阶段开始时，你可将一张牌移出游戏，成为【伏兵】，并未其记录一个基本牌或锦囊牌的名称（需与其他【伏兵】记录的名称均不同）,若你的手牌数大于手牌上限可重复此流程。你的回合外，当有其他角色使用与你记录的【伏兵】牌名相同的手牌时，你可取消此牌的所有目标。移去该【伏兵】，若此时处于使用者的回合内，则你令使用者当前所有非锁定技失效至回合结束，然后你摸两张牌",
            diyAnguo:"安国",
            diyQiaoshe_info:"出牌阶段限一次，你可选择一名其他角色，你与其血少的回复一点体力，手牌少的摸一张牌，装备少的使用一张装备牌",
            diyQiaoshe:"巧舌",
            diyQiaoshe_info:"你拼点后，可获得这两张拼点牌",
            diyCongzi:"聪姿",
            diyCongzi_info:"摸牌阶段开始时，你可获得基本牌和锦囊牌各一张。你的手牌上限为体力上限",
            diySunce:"孙策",
            diyHunzi:"魂姿",
            diyHunzi_info:"觉醒技，当你濒死时，你将体力恢复至1点，获得【英姿】和【英魂】",
            diyZhiba:"制霸",
            diyZhiba_info:"每阶段限一次，当你获得牌后，你可将一张当作【决斗】使用",
            diyCaorui:"曹叡",
            diyMingjian:"明鉴",
            diyMingjian_info:"出牌阶段限一次，你可将所有手牌交给一名其他角色，其下个回合手牌上限+1，出杀次数+1，然后你摸等量牌",
            diyJiling:"纪灵",
            diyShuangren:"双刃",
            diyShuangren_info:"出牌阶段限一次，你可以与一名其他角色拼点，若你赢你获得拼点牌并视为对其使用一张【杀】且其本回合不能使用手牌，否则你获得其一张牌",
            diyLiubei:"刘备",
            diyRende:"仁德",
            diyRende_info:"出牌阶段，你可以将至少一张手牌交给其他角色,若你于此阶段内给出的牌首次达到两张，你可以视为使用一张基本牌(不计次数)",
            diyXiahouyuan:"夏侯渊",
            diyShebian:"设变",
            diyShebian_info:"你使用非手牌时可移动场上一张牌",
            diyShensu:"神速",
            diyShensu_info:"准备阶段，你可展示牌堆顶一张牌，并选择一项：1,使用此牌(没有距离限制)；2，将此牌当作普通【杀】使用,若你未造成过伤害重复此流程",
            diyShenlvmeng:"神吕蒙",
            diyGongxin:"攻心",
            diyGongxin_info:"出牌阶段限一次，你可以观看一名其他角色的手牌，并弃置其中一张牌，若此牌不满足任意条件1:牌名为【杀；2:花色为♥，其视为对你使用一张【杀】",
            diyShelie:"涉猎",
            diyShelie_info:"摸牌阶段你可改为获得各花色牌各一张",
            diySunyihuanggai:"诈降翻江龙",
            diyZhangliaosunquan:"张辽孙权",
            diytuxi:"突袭",
            diytuxi_info:"摸牌时，你可少摸任意张牌获得等量明角色手牌各一张",
            diyXunyouzhongyao:"荀攸&钟繇",
            diyMenghuofunv:"孟获&花蔓",
            diyDufurencaoang:"秦朗",
            diyLingcao:"凌操",
            diyDujin:"独进",
            diyDujin_info:"摸牌阶段，你可改为摸X张牌（X为你装备区空置装备栏数+1）;你可以将一张装备牌当【杀】使用/打出；你的出杀次数+X（X为你装备区牌的数量）",
            diySunru:"孙茹",
            diyYingjian:"影箭",
            diyYingjian_info:"准备阶段，你可视为使用一张无视距离的火【杀】",
            diyShixin:"释衅",
            diyShixin_info:"当一名角色受到属性伤害时，你可摸一张牌并令此伤害数字+1；锁定技，你不会受到火属性伤害",
            diyCaocao:"曹操",
            diyJianxiong:"奸雄",
            diyJianxiong_info:"锁定技，当你成为牌的目标后,你摸一张牌；当你受到伤害后，你可获得对你造成伤害的牌并摸一张牌",
            diyHuaxiong:"华雄",
            diyShizhan:"势斩",
            diyShizhan_info:"转换技,出牌阶段限两次，你可选择一名其他角色，阳:其视为对你；阴:你视为对其 使用使用一张决斗",
            diyCaoren:"曹仁",
            diyJiewei:"解围",
            diyJiewei_info:"若你的装备区有牌，你可以将一张牌当作【无懈可击】使用。你翻面后可移动场上一张牌并视为使用一张无视距离的的【杀】,若你正面朝上需要弃置一张牌",
            diyTaishici:"谋太史慈吖",
            diyDulie:"笃烈",
            diyDulie_info:"每回合限一次，当你/其他角色成为其他角色/你使用基本牌/锦囊牌的唯一目标时，你可令此牌额外结算一次，此牌结算后，你摸X张牌（X为你的攻击范围至多为5）",
            diyLitong:"李通",
            diyTuifeng:"推锋",
            diyTuifeng_info:"1.游戏开始时/当你受到伤害后/弃牌阶段开始时，你可摸X张牌并将至多X张牌置于你的武将牌上为“锋”（X为伤害值最小为1）；2.准备阶段开始时，你移去所有“锋”,摸2X张牌此阶段出杀次数+X（X为”锋“的数量）",
            diyWangxiang:"王祥",
            diyBingxin:"冰心",
            diyBingxin_info:"每回合每种牌名限一次，当你需要使用基本牌时，你可将手牌调整至体力上限，并视为使用之.",
            diyLongdan:"龙胆",
            diyLongdan_info:"你使用/打出【杀】/【闪】时，可获得对方一张牌",
            diyDangxian:"当先",
            diyDangxian_info:"主公的回合开始时，你可执行一个额外回合",
            diyFUji:"复技",
            diyFUji_info:"出牌阶段你可以弃置一张锦囊牌获得其他角色一个技能",
            diyJianyi:"坚毅",
            diyJianyi_info:"锁定技，若你的防具栏没有牌，你视为装备着【白银狮子】",

            diyChunge:"春哥",
            changeHp:"变体",
            "changeHp_info": "出牌阶段限一次，若你的体力值大于1，你可弃置任意张牌然后失去体力至1点，回合结束时回复之",
            dxdiy: 'yd自定义',
            diyFubendashen:"副本技能载体",
            mengzi_fuben:"盟姿",
            mengzi_fuben_info:"限定技，回合开始时，你可增加如下全局效果：每个准备阶段所有【盟军】摸一张牌，盟军出牌阶段出【杀】次数+1",

            fuyu_fuben:"覆雨",
            fuyu_fuben_info:"你翻面时可摸三张牌",

            diyXuyou:"许攸",
            aowu: "傲物",
            aowu_info: "摸牌时你可选择是否从牌堆底摸牌;每回合你首次从牌堆一端摸牌时你获得另一端一张牌",

            diyYuanshu:"骨袁术",
            diyYongsi:"庸肆",
            diyYongsi_info:"每轮限X次，一名角色的回合开始时，你可以摸X张牌，本回合弃牌阶段开始时你弃置X张手牌,若你本回合受到/造成过伤害则不弃置（X为全场势力数）.",


            diyWangji:"哈基王",
            diyQizhi:"奇制",
            diyQizhi_info:"你于回合内使用牌指定目标后，你可弃置一名非此牌目标一张牌，然后你摸一张牌。",
            diyJinqu:"进趋",
            diyJinqu_info:"结束阶段开始时，你可以摸X张牌(X为你此回合【奇制】发动次数且至多为5)",

            diyPaiwang:"牌王",
            paiwang_put:"入漩",
            paiwang_put_info:"锁定技，你使用的实体非转化牌结算后，若其在弃牌堆，你将其置入“漩”",
            diyzhouxuan_info:"普通周旋但是，出牌阶段结束时不会弃置旋",

            diyLiling:"羊李零",
            diyLangxi:"狼袭",
            diyLangxi_info:"准备阶段，你可对一名其他角色造成0~2点伤害，若为0，结束阶段你可再次发动此技能",

            diyMaliang:"印马良",
            diyZishu: "自书",
            "diyZishu_info": "你获得牌后，可以将一张牌当本回合未以此法使用过的锦囊牌使用",

            diyHuanggai:"甜黄盖",
            sweetheart: "甜蜜",
            "sweetheart_info": "出牌阶段若你已受伤你可以弃置一张牌并选择一名其他角色，你回复1点体力，其摸两张牌",


            
            diysunquan:"选孙权",
            diyDawu:"吴王",
            diyDawu_info:"锁定技，游戏开始时，你将8无法使用的【吴王】加入牌堆;",
            ydzhiheng: "制衡",
            ydzhiheng_info: "出牌阶段限一次,你可以弃置任意张牌然后声明一种类型/副类型，然后你摸等量张牌并获得声明类型的牌，若你弃置了【吴王】/获得了【吴王】你视为未发动此技能",

        },
        dynamicTranslate:{
            diyShizhan(player) {
                var storage = player.storage.diyShizhan;
                var str = '转换技，每回合限两次，你可以选择其他一名角色，并摸一张牌,';
                if (storage) str += '<span class="bluetext">';
                str += '阴，你视为对其使用一张【决斗】';
                if (storage) str += '</span>';
                if (!storage) str += '<span class="bluetext">';
                str += '阳，其视为对你使用一张【决斗】';
                if (!storage) str += '</span>';
                return str;
            },
            diyBeifa(player) {
                var count = player.storage.diyBeifa_add;
                if (typeof count !== 'number') count = 0;
                return `出牌阶段限一次，你失去一体力上限，然后你亮出牌堆顶${4 + count}张牌，使用其中的【杀】（无视距离的与次数），若未以此法成伤害，下次额外展示一张牌，然后你获得剩余牌`;
            }
            
            
        },

    },

}

export function YDDIYfunc(yddiypack, loadAfter){
    if (window.ydswTool && window.ydswTool.ydafter) return
    if (!window.ydswTool) {
        window.ydswTool = {}
    }
    window.ydswTool.ydafter=true
    
    const prefixContent = pack => { }
    const packs = window.ydswTool && window.ydswTool.moreCharacters ? ydswTool.moreCharacters.characters.YDDIY : yddiypack
    if (loadAfter) {
        
        for (const p in packs) {
            const pack = packs[p]
            prefixContent(pack)
            for (const key in pack) {
                if (key in lib) {
                    lib[key] = Object.assign(lib[key], pack[key])
                }
            }
        }
        return
    }
    for (const p in packs) {
        
        game.import('character', (lib, game, ui, get, ai, _status) => {
            prefixContent(packs[p])
            const pack = packs[p]
            /*
            for (const c in pack.character) {
                pack.character[c].trashBin.push(((lib.device || lib.node) ? 'ext:' : 'ext:') + 'Q群YDDIY武将/image/' + c + '.jpg');
            }*/
            return packs[p]
        })
    }
                

}