import { lib, game, ui, get, ai, _status } from '../../../noname.js';
import standard from '../../character/standard/skill.js';
import shenhua from '../../character/shenhua/skill.js';
import sp from '../../character/sp/skill.js';
import sp2 from '../../character/sp2/skill.js';
import yijiang from '../../character/yijiang/skill.js';
import newjiang from '../../character/newjiang/skill.js';
import sixiang from '../../character/sixiang/skill.js';
import refresh from '../../character/refresh/skill.js';
import mobile from '../../character/mobile/skill.js';
import extra from '../../character/extra/skill.js';
import yingbian from '../../character/yingbian/skill.js';
import sb from '../../character/sb/skill.js';
import tw from '../../character/tw/skill.js';
import offline from '../../character/offline/skill.js';
import clan from '../../character/clan/skill.js';
import collab from '../../character/collab/skill.js';
import xianding from '../../character/xianding/skill.js';
import huicui from '../../character/huicui/skill.js';
import shiji from '../../character/shiji/skill.js';
import onlyOL from '../../character/onlyOL/skill.js';
import jsrg from '../../character/jsrg/skill.js';
import sxrm from '../../character/sxrm/skill.js';
import old from '../../character/old/skill.js';
import diy from '../../character/diy/skill.js';
import ddd from '../../character/ddd/skill.js';
import key from '../../character/key/skill.js';

var characterPack={
    standard:standard,
    shenhua:shenhua,
    sp:sp,
    sp2:sp2,
    yijiang:yijiang,
    newjiang:newjiang,
    sixiang:sixiang,
    refresh:refresh,
    mobile:mobile,
    extra:extra,
    yingbian:yingbian,
    sb:sb,
    tw:tw,
    offline:offline,
    clan:clan,
    collab:collab,
    xianding:xianding,
    huicui:huicui,
    shiji:shiji,
    onlyOL:onlyOL,
    jsrg:jsrg,
    sxrm:sxrm,
    old:old,
    diy:diy,
    ddd:ddd,
    key:key
}

if(lib.config["extension_自写功能_skillUSABLEADD"]){
    for (const i in characterPack) {
        for (const j in characterPack[i]) {
            const obj = characterPack[i][j];
            try {
                if (obj.usable) obj.usable++;
            } catch (e) {
            }
        }
    }

}

