import { lib, game, ui, get, ai, _status } from "../../noname.js";
class Prefix {
    prefix={
        po:{
            color: "#22D4ECFF",
            nature: "LightSlateBlue",
            showName: "破",
        },
        haji:{
            color: "#E4EE19FF",
            nature: "LightSlateBlue",
            showName: "哈基",
        },
        lei:{
            color: "#103EE3FF",
            nature: "LightSlateBlue",
            showName: "雷",
        },
        de:{
            color: "#13D647FF",
            nature: "LightSlateBlue",
            showName: "德",
        }
    }
    show(){
        console.log(this.prefix);
    }
    set(){
       Object.keys(this.prefix).forEach(i=>{
        lib.namePrefix.set(this.prefix[i].showName, {
            color: this.prefix[i].color,
            nature: this.prefix[i].nature,
            showName: this.prefix[i].showName,
        });
       });
    }
    
}

let prefixManager = new Prefix();
export {prefixManager};





