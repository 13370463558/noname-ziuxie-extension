import { lib, game, ui, get, ai, _status } from "../../noname.js";
export const ydtool={
    addImport(url, end = () => { }) {
        const script = document.createElement('script')
        script.type = 'module'
        script.src = lib.assetURL + url
        document.head.appendChild(script)
        script.onload = () => {
            end()
            script.remove()
        }
        return script
    },
    getSelect() {
		let num = lib.config.extension_自写功能_chooseCharacternums||5;
		num = !parseInt(num) ? 5 : parseInt(num)
		return num
	},
}

