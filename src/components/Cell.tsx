import { h } from "preact";
import { Mark } from "./Game";

const Cell = ({ mark, onClick, allowed }: {
    mark: Mark,
    onClick: () => void,
    allowed: boolean;
}) => {
    const playerClass = {
        null: allowed ? 'none' : '',
        Player_1: 'player-1',
        Player_2: 'player-2'
    }[mark];

    return (<div class={`cell ${playerClass}`} onClick={allowed ? onClick : undefined} />);
};

export default Cell;
