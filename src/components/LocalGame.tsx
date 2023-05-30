import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Grid, GridIndex, Mark, Player } from '../Data';
import Game from './Game';

function LocalGame() {
    const [grids, setGrids] = useState(Array(9).fill(Array(9).fill(null) as Grid<Mark>) as Grid<Grid<Mark>>);
    const [turn, setTurn] = useState<Player>('Player_1');
    const [nextGrid, setNextGrid] = useState<null | GridIndex>(null);

    return <Game {...{
        grids, setGrids,
        turn, setTurn,
        nextGrid, setNextGrid
    }} />
}

export default LocalGame;
