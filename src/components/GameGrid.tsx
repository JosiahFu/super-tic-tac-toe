import { h } from 'preact';
import { MarkGrid, MarkGridGrid, Player, checkWinner } from '../Game';
import SubGrid from './SubGrid';
import { useMemo } from 'preact/hooks';

const GameGrid = ({ grids, onCellClick, turn }: {
    grids: MarkGridGrid,
    onCellClick: (index: number, subindex: number) => void,
    turn: Player
}) => {
    const winner = useMemo(() => (
        checkWinner(grids.map(checkWinner) as MarkGrid)
    ), [grids]);

    const turnClass = {
        Player_1: 'player-1-turn',
        Player_2: 'player-2-turn'
    }[turn];

    const winnerClass = {
        Player_1: 'player-1-winner',
        Player_2: 'player-2-winner'
    }[winner];

    return (<div class={`game-grid ${turnClass} ${winnerClass}`}>
        {grids.map((subgrid, i) => (
            <SubGrid key={i} grid={subgrid} onCellClick={(subindex) => onCellClick(i, subindex)} />
        ))}
    </div>);
};

export default GameGrid;
