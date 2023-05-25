import { h } from 'preact';
import { GridIndex, Winner, MarkGridGrid, Player } from '../Game';
import SubGrid from './SubGrid';

const GameGrid = ({ grids, onCellClick, turn, nextGrid, winner }: {
    grids: MarkGridGrid,
    onCellClick: (index: number, subindex: number) => void,
    turn: Player,
    nextGrid: GridIndex,
    winner: Winner
}) => {

    const turnClass = {
        Player_1: 'player-1-turn',
        Player_2: 'player-2-turn'
    }[turn];

    const winnerClass = {
        Player_1: 'player-1-winner',
        Player_2: 'player-2-winner',
        tie: ''
    }[winner] ?? '';

    return (<div class={`game-grid ${turnClass} ${winnerClass} ${(nextGrid === null && winner === null) ? 'allowed' : ''}`}>
        {grids.map((subgrid, i) => (
            <div key={i} class="supercell">
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
