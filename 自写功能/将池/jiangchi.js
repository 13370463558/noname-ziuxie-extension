import { game, ui, _status, ai, lib, get } from "../../../noname.js";
import { delay } from "../../../noname/util/index.js";

import {characters} from "./characters.js";
import {skills} from "./skills.js";
import {cards} from "./cards.js";
export const JIANGCHI={
    JIANGCHI:{
        name:"JIANGCHI",
        connect:true,
        character:characters,
        skill:skills,
        translate:{
            JIANGCHI:"永恒将池",
            rezhihengResume:"吴王",
            rezhihengResume_info:"锁定技，当你造成伤害后视为未发动过【制衡】",
            yijue_enhance:"义绝",
            yijue_enhance_info:`出牌阶段限一次，你可以令至多<span style='color:red'>两名有手牌的角色展示并交给你一张手牌</span>。若此牌为黑色，则该角色不能使用或打出手牌，非锁定技失效且受到来自你的红桃【杀】的伤害+1直到回合结束。若此牌为红色，你可以令其回复1点体力。`,
            tianbian_enhance:"天辩",
            tianbian_enhance_info:"锁定技，你拼点时，<span style='color:red'>摸一张牌</span>；当你拼点的牌亮出后，若此牌花色为红桃，则此牌的点数视为K。",
            maixue_enhance:"加强",
            maixue_enhance_info:"准备阶段，你可另一名角色视为对你造成一点伤害",
            tuxi_enhance:"突袭",
            tuxi_enhance_info:"<span style='color:red'>摸牌时，你可改为获得至多两名其他角色的各一张手牌</span>",
            rekurou_enhance:"苦肉",
            rekurou_enhance_info:"出牌阶段限一次，你可以弃置一张牌并失去一点体力，<span style='color:red'>若此牌不为基本牌你回复一点体力</span>",
            kaikang_enhance:"慷忾",
            kaikang_enhance_info:"当一名角色成为【杀】的目标后，若你至该角色的距离为1，你可以摸两张牌。若如此做，你交给其一张牌并展示之。若为装备牌，该角色可以使用此牌。然后你弃置一张手牌，若为装备牌，你可使用之",
            poQianxi:"潜袭",
            poQianxi_info:"准备阶段，你可以摸一张牌然后将一张牌当作【杀】使用(无视距离)且目标本回合不能使用或打出与此牌颜色相同的牌，若此牌为【杀】伤害值+1",
            //准备阶段，
            baima:"白马",
            baima_info:"每轮开始时。你可选择至多两项：1.本轮获得【伏骑】 2.本轮获得【骄姿】 3.摸两张牌",
            pochenglue:"成略",
            pochenglue_info:"出牌阶段限一次，你可以<span style='color:red'>摸两张牌然后弃置任意张牌</span>，本回合你使用于弃置牌花色相同的牌无视距离与次数",
            lvbu_enhance:"加强",
            lvbu_enhance_info:"出牌阶段限一次，你可以将任意张当作【杀】使用（无视距离不计入次数）",
            newzhengbing:"整兵",
            newzhengbing_info:"出牌阶段限3次，你可以重铸一张牌，若此牌为【杀】你手牌上限+1，为【闪】你摸一张牌，为【桃】或【酒】，此回合结束时你执行一个额外的出牌阶段",
            sheji:"射戟",
            sheji_info:"转换技，准备阶段，你可视为使用一张 阳:【决斗】;阴:【杀】(无视距离)",
            clanyichi_enhanche_info:`<span style='color:red'>弃牌阶段开始时</span>，你可以拼点。若你赢，没赢的角色依次执行〖间难〗的前X个选项（X为你本回合发动〖间难〗的次数）。`,
            liyu_enhance_info:"当你使用<span style='color:red'>【杀】或【决斗】(仅“射戟”)</span>对一名其他角色造成伤害后，你可以获得其区域内的一张牌。若此牌不为装备牌，则其摸一张牌。若此牌为装备牌，则视为你对其选择的另一名角色使用一张【决斗】。",
            anjian:"暗箭",
            anjian_info:"摸牌阶段开始时，你可以少摸一张牌然后视为使用一张无视距离的【杀】",
            kuangxiang_enhance_info:`准备阶段<span style='color:red'>和结束阶段</span>，你可令一名角色将手牌数调整至四张。其以此法获得的黑色牌造成的伤害+1；其每以此法获得一张红色牌，下个摸牌阶段少摸一张牌。`,
            olqingyi_enhance_info:`①出牌阶段限一次，你可以选择至多两名有牌的其他角色。你和这些角色同时弃置一张牌，然后若这些牌类型均相同，则你重复此流程。②结束阶段开始时，若你本回合内发动〖清议①〗弃置的牌<span style='color:red'>包含花色不同的牌，则你可获得每花色的牌各一张。</span>`,
            gzyinghun_enhance_info:`准备阶段开始时，若你已受伤，你可令<span style='color:red'>一名角色执行一项：摸X张牌；或弃置X张牌（X为你已损失的体力值）。</span>`,
            gongxin_enhance_info:`出牌阶段限一次，你可以观看一名其他角色的手牌，并可以<span style='color:red'>展示其中一张牌，然后将其弃置或置于牌堆顶。</span>`,
            olzhiyan_enhance_info:`<span style='color:red'>你或你的上家与下家的结束阶段</span>，你可以令一名角色正面朝上摸一张牌，然后若此牌：为装备牌，则其使用此牌并回复1点体力<span style='color:red'>并摸一张牌</span>；不为装备牌且其体力值不等于你，则其失去1点体力。`,
            olzongxuan_enhance_info:`当你弃置而失去牌后，或<span style='color:red'>你或你的上家与下家</span>每回合因弃置首次失去牌后，你可以将位于弃牌堆的这些牌中的任意牌以任意顺序置于牌堆顶。`,
            gongxin_enhance2_info:`出牌阶段限一次，你可以观看一名其他角色的手牌，并可以展示其中一张♥牌，然后将其弃置或置于牌堆顶，<span style='color:red'>然后你摸一张牌</span>`,
            chongxin_enhance:"崇信",
            chongxin_enhance_info:`出牌阶段限一次，你可以与一名有手牌的其他角色弃置一张牌然后各摸一张牌`,
            ranji_enhance_info:`限定技，结束阶段。若你本回合使用过牌的阶段数大于等于/小于等于体力值，你可以获得技能<noname-poptip poptip = kunfenx></noname-poptip>/<noname-poptip poptip = zhaxiang></noname-poptip>（同时满足则都获得，以此法获得的〖困奋〗直接修改为非锁定技）。若如此做，你将手牌数调整至手牌上限或将体力值回复至体力上限.`,
            luoshen_enhance_info:`每轮限两次，首轮开始时或你失去牌后若手牌中没有以此法获得的牌，你可以判定并获得判定牌（本轮不计入手牌上限），且可重复此流程直到结果的颜色不同。`,
            luoshen_enhance:"洛神",
            zhouxuan_enhance_info:`①弃牌阶段开始时，你可将任意张手牌置于武将牌上，称为“旋”（你至多拥有五张“旋”）。②当你使用牌时，你随机将一张“旋”置入弃牌堆，然后<span style='color:red'>摸X张牌（X为“旋”数+1）</span>。③出牌阶段结束时，你将所有“旋”置入弃牌堆。`,
            aocai_enhance_info:"当你于回合外需要使用或打出一张基本牌时，你可以观看牌堆顶的<span style='color:red'>四张牌</span>。若你观看的牌中有此牌，你可以使用打出之。",
            anguo_enhance:"安国",
            anguo_enhance_info:`出牌阶段限一次，你可令一名角色随机使用一张装备牌,回复一点体力，摸一张牌`,
            olliangyin_enhance_info:`当有牌发生移动后，若此移动事件是有牌移出游戏/移入游戏的事件，则你可以选择一名其他角色。你与其各摸一张牌/弃置一张牌，然后你可以选择你或其中的一名手牌数为X的角色，该角色回复1点体力（X为你的“箜”数）。`,
            zhoufei_enhance:"箜篌",
            zhoufei_enhance_info:`每名角色出牌阶段限一次，其可以将一张牌置入"箜"`,
            liuyan_enhance:"飞舞",
            liuyan_enhance_info:`限定技，出牌阶段你可以将所有手牌当作【桃园结义】使用`,
            xuanhui_enhance_info:`准备阶段，若你有〖丰积〗效果，你可以与所有拥有〖丰积〗效果的其他角色与你交换对应的〖丰积〗效果`,
            xiaoji_enhance:"枭姬",
            xiaoji_enhance_info:`一名角色失去其装备区一张牌后，其可与你各摸一张牌`,
            rejieyin_enhance_info:`出牌阶段限一次，你可以交给一名其他角色一张手牌或将一张装备牌置入其装备区(替换原装备)，然后你与其体力较高的角色摸一张牌，体力值较低的角色回复1点体力（若你与其体力值相等则均执行）`,
            olbuyi_enhance_info:`一名角色进入濒死状态时，你可展示其一张牌。若此牌不为基本牌，则其弃置此牌并回复1点体力,<span style='color:red'>否则其摸一张牌</span>`,
            jianying_enhance:"渐营",
            jianying_enhance_info:`①当你使用与你使用的上一张牌点数或花色相同的牌时，你可以选择一项:1.摸一张牌；2.令此牌不计入次数。②出牌阶段限一次，你可以将一张牌当做你指定花色和点数的任意基本牌使用。`,
            guanwei_enhance:"观微",
            guanwei_enhance_info:`每回合限一次，一名角色的出牌阶段结束时，你可以弃置一张牌令其执行一个额外的出牌阶段`,
            olniluan_enhance:"逆乱",
            olniluan_enhance_info:"一名角色的结束阶段，若其本回合使用过【杀】，你可以选择一项：1.视为对其使用一张【杀】；2.令其摸两张牌",
            olpingduan_enhance_info:`出牌阶段限一次，你可以令一名角色依次执行：1.使用一张基本牌；2.<span style='color:red'>重铸一张牌</span>；3.交给你其装备区内一张牌。其每以此法执行一项便摸一张牌。`,
            dujin_enhance_info:`摸牌阶段，你可以多摸1+x张牌；你的手牌上限加1+x(x为你装备区的装备数)`,
            liji_enhance:"力激",
            liji_enhance_info:"锁定技，你于回合内获得的牌于此回合不计入手牌上限。",
            lianhuoRE:"链祸",
            lianhuoRE_info:"锁定技，当你受到伤害时，若你未横置则你横置且此伤害-1，否则此伤害+1且改为火属性伤害。",
            jisheRE:"极奢",
            jisheRE_info:"每回合每名角色限一次，你使用牌指定唯一目标后，你可以摸一张牌然后其切换横置状态",
            yaomingRE:"邀名",
            yaomingRE_info:"准备阶段或当你造成或受到伤害后，你可以选择一项：1.令一名角色摸一张牌；2.弃置一名角色一张牌",
            AddShoujie:"守节",
            AddShoujie_info:"当你弃置牌后，你可使用其中一张牌",
            reluoyingENHANCE:"落英",
            reluoyingENHANCE_info:"当你成为未以此法记录花色的牌的目标时，你记录此花色。其他角色的以此法记录过花色的牌因弃置或判定进入弃牌堆时，你可获得之然后清除对应花色的记录",
            rezhenjunENHANCE_info:"准备阶段，你可以弃置一名角色的X张牌（X为其手牌数和体力值之差且至少为1），然后选择一项：1.你弃置X张牌；2.其摸X张牌。（X为其弃置的牌中非装备牌的数量）,<span style='color:red'>若目标为你，你可于本回合结束阶段再次发动此技能</span>",
            xianzhenDIY:"陷阵",
            xianzhenDIY_info:"出牌阶段你可以与一名其他角色拼点，赢的角色视为对输的角色使用一张【杀】.当你于回合内受到伤害或造成伤害后，你可以将手牌摸至体力上限然后本技能失效至回合结束",
            shanduanRE:"善断",
            shanduanRE_info:`锁定技。①摸牌/出牌/弃牌阶段开始时，你为本回合摸牌阶段摸牌数/攻击范围和使用【杀】的限制次数/手牌上限的默认值从数组<span style='color:red'>R=[2, 3, 4, 5]</span>中分配数值。②当你于回合外受到伤害后，你令下回合〖善断①〗以此法分配的数值集合R中的最小值+1。`,
            pingkouENHANCE_info:`回合结束时，你可以对至多X名其他角色各造成1点伤害（X为你本回合跳过的阶段数）`,
            niuma:"牛马",
            niuma_info:"你跳过摸牌/出牌/弃牌阶段后，可令一名角色令一名角色随机使用一张装备牌(空置装备栏优先）,若没有对应的牌改为摸一张牌",
            ranshangENHANCE_info:`锁定技，当你受到1点火焰伤害后，你获得1枚“燃”标记；结束阶段开始时，你失去X点体力。若X大于2，则你减2点体力上限并摸两张牌（X为“燃”标记的数量）。每回合限一次，一名其他角色受到伤害时，你可以获得一枚"燃"标记令此伤害+1或-1`,
            
            touxi:"偷袭",
            touxi_info:"出牌阶段限一次，你可视为对一名其他角色使用一张【兵临城下】",

            clanmuyinENHANCE_info:`宗族技。回合开始时，你可以选择一名陈留吴氏角色。该角色的手牌上限+1。`,

            weizhongSUNCEVERSON_info:"锁定技，你的体力上限变化后，你摸一张牌",

            jiejian:"借箭",
            jiejian_info:`其他角色对你使用牌后，若未对你造成伤害，你可以获得此牌对应的所有实体牌`,

            
            oljiemingENHANCE_info:"当你受到1点伤害后或死亡时，你可选择一名角色（若为你首次受到渠道为牌或非牌的伤害，你可令其增加一点体力上限并回复一点体力，手牌上限+1），然后摸X张牌，然后若其手牌数大于X，则其将手牌弃置至X张，（X为其体力上限且至多为5）。",
            quhuENHANCE_info:"出牌阶段限一次，你可以与一名角色拼点，若你赢，则该角色对其攻击范围内另一名由你指定的角色造成1点伤害。若你没赢，该角色对你造成1点伤害。。",
            
            rejianxiongENHANCE:"奸雄",
            rejianxiongENHANCE_info:"一名角色受到伤害后，你可以获得造成伤害的牌并摸一张牌，若其不为你，此技能本回合失效",
            
            muji:"烧鸡",
            muji_info:"出牌阶段，你可以将一张手牌当作任意装备牌置入你任意装备栏",
            muji_backup:"烧鸡",

            cabian:"擦边",
            cabian_info:"锁定技，你每轮首次发动某个装备技能时，你摸一张牌",
            
            muji2:"母鸡",
            muji2_info:"锁定技，你的的装备区内的牌无数量限制",

            lianyingDIY:"连营",
            lianyingDIY_info:"每回合限15次，当你使用牌结算后，你可以重铸一张牌。当你失去最后手牌后，你可以摸一张牌。",

            qiceENHANCE:"奇策",
            qiceENHANCE_info:"每回合限一次，你可以将一种花色的所有手牌当作任意基本牌或普通锦囊牌使用",
            qiceENHANCE_backup:"奇策",

            zhiyuENHANCE:"智愚",
            zhiyuENHANCE_info:"当你受到伤害后，你可以摸一张牌并展示手牌，若存在伤害来源，则其弃置一张手牌",

            shuyouDIY:"叔佑",
            shuyouDIY_info:"每回合限一次，当你发动【傲才】前可以观看牌堆顶4张牌并将之以任意顺序置于牌堆顶或牌堆底",

            bizhengENHANCE:"弼政",
            bizhengENHANCE_info:"每阶段限一次，当你摸/弃牌后你可令一名角色摸/弃等量张牌",
            yidianENHANCE_info:"当你使用牌选择目标时，若你的手牌中没有与此牌名称相同的牌，则你可以为此牌增加一个目标（无距离限制）。",
            zhengbingsp:"整兵",
            zhengbingsp_info:"出牌阶段限一次，你可以与一名角色各重铸至多两张牌，每以此法重铸一张:<br/>【杀】，你手牌上限＋1；<br/>【闪】，你再摸一张牌；<br/>【桃】或【酒】，本回合弃牌阶段改为出牌阶段",
            sbmingrenENHANCE_info:`①游戏开始时，你摸三张牌，然后将一张手牌置于你的武将牌上，称为“任”,然后你可自选【贞良】的状态。②结束阶段，你可以用一张手牌替换“任”。`,
            requanjiENHANCE:"蹲逼",
            requanjiENHANCE_info:"当你的体力值变化后/出牌阶段开始时，你摸变化值张/两张牌。你可以弃置一张牌跳过弃牌阶段",
            shentou:"神偷",
            shentou_info:  `当你摸牌后，你可以弃置至多场上其他角色数张牌，并获得至多等量名其他角色各一张手牌。<br/>你视为拥有${get.poptip("yingzi")}  `,
            mubingEN_info:"出牌阶段开始时，你亮出牌堆顶4张牌，你可以弃置任意张牌然后获得展示牌中任意张点数之和不大于你弃置牌的点数之和的牌，然后你可将任意张得到的牌交给一名其他角色",
            mubingEN:"募兵",
            poxiEN_info:"出牌阶段限一次，你可以观看你与一名其他角色的手牌，并弃置其中3张花色不同的牌，根据你弃置牌的数量执行一下效果:<br/>零张，你减少一点体力上限；<br/>两张，你摸一张牌回复一点体力；<br/>三张，你摸三张牌",
            
            yuxuEN_info:"锁定技，转换技，当你使用牌结算后，阳:你摸一张牌；阴:你弃置一张牌。",
            yuxuEN:"玉虚",
            xjshijianEN_info:"一名角色于其出牌阶段使用第二张牌后，你可以弃置一张牌令其获得【玉虚】至其回合结束。<br/>每轮前X次转换技发动后你摸一张牌（X为你的体力上限)",
            
            fenyinDIY:"奋音",
            fenyinDIY_info:"当你使用牌时，若此牌与本回合上一张被使用的牌颜色不同，你可以摸一张牌",
            
            qixingEN:"七星",
            qixingEN_info:"锁定技，游戏开始时，你将牌堆顶七张牌置于你的武将牌上为“星“，你可如手牌般使用或打出“星“",
            olcuipoEN_info:"锁定技，你使用牌时，若此牌是你本回合使用的第X张牌(X为此牌名的字数），你摸一张牌，此牌不计入次数，若此牌为伤害牌，此牌的伤害基数+1",
            
            /*
            wuzixu:"伍子胥",
            chouye:"仇业",
            chouye_info:"转换技，出牌阶段，你可以阳：回复一点体力;阴:视为使用一张【决斗】，当你于回合内受到伤害后，此技能本回合失效",*/
        },
        //<span style='color:red'></span>
        dynamicTranslate:{
            sheji(player) {
                if (!player.storage.sheji) {
                    return  `转换技，准备阶段，你可视为使用一张<span class="bluetext"> 阳:【决斗】;</span>阴:【杀】(无视距离)`;
                }
                return  `转换技，准备阶段，你可视为使用一张 阳:【决斗】;<span class="bluetext">阴:【杀】(无视距离)</span>`;
            },
            
        },
        characterSort: {
        },
        //card:cards,
    }

}

export function JIANGCHIfunc(jiangchipack, loadAfter){
    if (window.jiangchiswTool && window.jiangchiswTool.ydafter) return
    if (!window.jiangchiswTool) {
        window.jiangchiswTool = {}
    }
    window.jiangchiswTool.ydafter=true
    
    const prefixContent = pack => { }
    const packs = window.jiangchiswTool && window.jiangchiswTool.moreCharacters ? jiangchiswTool.moreCharacters.characters.TUPO : jiangchipack
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
            return packs[p]
        })
    }

}
