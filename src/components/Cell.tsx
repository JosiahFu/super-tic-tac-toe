import { h } from "preact";
import { Mark } from "../Game";
import markStyles from '../style/game/markers.module.css';
import gridStyles from '../style/game/grid.module.css';
import { classList as cl } from "../Util";

const Cell = ({ mark, onClick, allowed }: {
    mark: Mark,
    onClick: () => void,
    allowed: boolean;
}) => {
    return (<div
        class={cl(
            markStyles.mark,
            gridStyles.cell,
            mark === null && allowed && markStyles.allowed,
            mark === 'Player_1' && markStyles.player1,
            mark === 'Player_2' && markStyles.player2
        )}
        onClick={allowed ? onClick : undefined}
    />);
};

export default Cell;
