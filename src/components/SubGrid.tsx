import { h } from 'preact';
import Cell from './Cell';
import { MarkGrid, checkWinner } from './Game';

const SubGrid = ({ grid, onCellClick, allowed }: {
    grid: MarkGrid,
    onCellClick: (index: number) => void,
    allowed: boolean
}) => {
    const winner = checkWinner(grid);

    const winnerClass = {
        null: '',
        Player_1: 'player-1',
        Player_2: 'player-2'
    }[winner];

    return (<div class={`subgrid ${winnerClass} ${allowed ? 'allowed' : ''}`}>
    {grid.map((mark, i) => (
        <Cell key={i} mark={mark} onClick={() => onCellClick(i)} allowed={allowed && winner === null} />
    ))}
    </div>);
}

export default SubGrid;
