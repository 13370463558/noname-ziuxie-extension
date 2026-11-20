export const cards={
    ruike:{
        type: "trick",
        enable: true,
        fullskin: true,
        filterTarget(card, player, target) {
            return true;
        },
        content(){
            target.loseHp();
            target.draw(2);
        }
    }

}