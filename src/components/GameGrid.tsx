import { h } from 'preact';
import { Grid, Mark, GridIndex, Winner, Player } from '../Data';
import SubGrid from './SubGrid';
import markerStyles from '../style/game/markers.module.css';
import gridStyles from '../style/game/grid.module.css';
import { classList as cl } from '../Util';

const GameGrid = ({ grids, onCellClick, turn, nextGrid, winner }: {
    grids: Grid<Grid<Mark>>,
    onCellClick: (index: number, subindex: number) => void,
    turn: Player,
    nextGrid: GridIndex,
    winner: Winner
}) => {

    // const winnerClass = {
    //     Player_1: 'player-1-winner',
    //     Player_2: 'player-2-winner',
    //     tie: ''
    // }[winner] ?? '';

    // return (<div class={`${gridStyles.game} ${turnClass} ${(nextGrid === null && winner === null) ? markerStyles.allowed : ''}`}>
    return (<div class={cl(
        gridStyles.grid,
        gridStyles.game,
        turn === 'Player_1' && markerStyles.player1Turn,
        turn === 'Player_2' && markerStyles.player2Turn,
        markerStyles.allowable,
        nextGrid === null && winner === null && markerStyles.allowed
    )}>
        {grids.map((subgrid, i) => (
            <div key={i} class={gridStyles.cell}>
                <SubGrid
                    grid={subgrid}
                    onCellClick={(subindex) => onCellClick(i, subindex)}
                    allowed={(nextGrid === i || nextGrid === null) && winner === null}
                />
            </div>
        ))}
    </div>);
};

export default GameGrid;
