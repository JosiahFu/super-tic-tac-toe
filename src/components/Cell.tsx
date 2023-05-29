import { h } from "preact";
import { Mark } from "../Game";
import markerStyles from '../style/game/markers.module.css';
import gridStyles from '../style/game/grid.module.css';
import { classList as cl } from "../Util";

const Cell = ({ mark, onClick, allowed }: {
    mark: Mark,
    onClick: () => void,
    allowed: boolean;
}) => {
    return (<div
        class={cl(
            markerStyles.cell,
            gridStyles.cell,
            mark === null && allowed && markerStyles.allowed,
            mark === 'Player_1' && markerStyles.player1Win,
            mark === 'Player_2' && markerStyles.player2Win
        )}
        onClick={allowed ? onClick : undefined}
    >
        <div class={markerStyles.player1} />
        <div class={markerStyles.player2} />
    </div>);
};

export default Cell;
