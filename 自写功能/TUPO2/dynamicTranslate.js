export const dynamicTranslate={
    po_yongsi(player){
        var count = player.storage.po_yongsi;
        if (typeof count !== 'number') count = 0;
        return `你使用牌时,可摸3张牌然后弃置${count+1}张牌`;    
    },
    popiaoping(player) {
		const bool = player.storage.popiaoping;
		let yang = `你摸${player.storage.popiaoping_num}张牌`,
			yin = `你弃置${player.storage.popiaoping_num}张牌`;
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "转换技，锁定技。当你使用一张牌时，",
			end = "（X为你本阶段内发动过〖漂萍〗的次数且至多等于你的体力值）。";
		return `${start}阳：${yang}；阴：${yin}${end}`;
	},
}