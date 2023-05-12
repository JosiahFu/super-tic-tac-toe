import { h } from "preact";
import { Mark } from "src/App";

const Cell = ({mark, onClick}:{
    mark: Mark,
    onClick?: () => void
}) => {
    const playerClass = {
        null: 'none',
        Player_1: 'player-1',
        Player_2: 'player-2'
    }[mark];

    return (<div class={`cell ${playerClass}`} onClick={() => onClick ? onClick(/*Potential future arguments*/) : void (0)}>{
    }</div>);
};

export default Cell;
