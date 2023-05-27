import { h } from 'preact';
import Cell from './Cell';
import { Grid, Mark, checkWinner } from '../Game';

const SubGrid = ({ grid, onCellClick, allowed }: {
    grid: Grid<Mark>,
    onCellClick: (index: number) => void,
    allowed: boolean
}) => {
    const winner = checkWinner(grid);

    const winnerClass = {
        Player_1: 'player-1',
        Player_2: 'player-2',
        tie: 'tie'
    }[winner] ?? '';

    return (<div class={`subgrid ${winnerClass} ${allowed ? 'allowed' : ''}`}>
    {grid.map((mark, i) => (
        <Cell key={i} mark={mark} onClick={() => onCellClick(i)} allowed={allowed && winner === null} />
    ))}
    </div>);
}

export default SubGrid;
