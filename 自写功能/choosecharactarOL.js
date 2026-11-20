import {lib, game, ui, get, ai, _status } from '../../noname.js';

import {doudizhu} from "./mode/doudizhu.js";
import {identity} from "./mode/identity.js";
const modeSwitch = {
	doudizhu,
	identity,
};
function loadModeConfig(mode) {
	if (typeof modeSwitch[mode] === 'function') {
		modeSwitch[mode]();
	}
}

export let chooseCharacterOL = function () {
	const mode = get.mode();
	const handler = modeSwitch[mode];

	if (handler?.chooseMode) {
		handler.modeConfig?.();
		handler.chooseMode.call(this, arguments);
	}
};

Object.defineProperty(game, 'chooseCharacterOL', {
    configurable: false,
    get: () => chooseCharacterOL,
    set: (v) => {
        const mode = get.mode() || lib.config.mode;
        loadModeConfig(mode);//如果有对应的模式配置，那么优先加载一次，好像目前写的都触发不了这个
        if (mode && !['doudizhu',"identity"].includes(mode)) { //当且仅当我没有修改过的模式的chooseCharacterOL才允许被修改
            chooseCharacterOL = v;
        }
    }
});