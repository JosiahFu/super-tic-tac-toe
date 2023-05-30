import { h } from 'preact';
import Cell from './Cell';
import { Grid, Mark, checkWinner } from '../Data';
import markerStyles from '../style/game/markers.module.css';
import gridStyles from '../style/game/grid.module.css';
import { classList as cl } from '../Util';

const SubGrid = ({ grid, onCellClick, allowed }: {
    grid: Grid<Mark>,
    onCellClick: (index: number) => void,
    allowed: boolean
}) => {
    const winner = checkWinner(grid);

    return (<div class={cl(
        gridStyles.grid,
        markerStyles.subgrid,
        winner === 'Player_1' && markerStyles.player1Win,
        winner === 'Player_2' && markerStyles.player2Win,
        winner === 'tie' && markerStyles.tie,
        markerStyles.allowable,
        allowed && markerStyles.allowed
    )}>
        {grid.map((mark, i) => (
            <Cell
                key={i}
                mark={mark}
                onClick={() => onCellClick(i)}
                allowed={allowed && winner === null} />
        ))}
        <div class={markerStyles.player1} />
        <div class={markerStyles.player2} />
    </div>);
}

export default SubGrid;
