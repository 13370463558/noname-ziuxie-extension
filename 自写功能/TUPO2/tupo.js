import { game, ui, _status, ai, lib, get } from "../../../noname.js";
import { delay } from "../../../noname/util/index.js";
import {skills} from "./skills.js";
import  {characters} from "./characters.js"
import  {translates} from "./translates.js"
import  {dynamicTranslate} from "./dynamicTranslate.js"
export const TUPO={
    ydtupo:{
        name:"ydtupo",
        connect:true,
        character:characters,
        skill:skills,
        translate:translates,
        dynamicTranslate:dynamicTranslate,
        characterSort: {
        },

    }

}

export function TUPOfunc(tupopack, loadAfter){
    if (window.tuopuswTool && window.tuopuswTool.ydafter) return
    if (!window.tuopuswTool) {
        window.tuopuswTool = {}
    }
    window.tuopuswTool.ydafter=true
    
    const prefixContent = pack => { }
    const packs = window.tuopuswTool && window.tuopuswTool.moreCharacters ? tuopuswTool.moreCharacters.characters.TUPO : tupopack
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
