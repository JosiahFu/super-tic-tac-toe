import { h, Fragment } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import { GameState, Grid, GridIndex, Mark, Player, checkWinner } from '../Data';
import Game from './Game';
import buttonStyles from '../style/button.module.css';
import { classList as cl } from '../Util';

function LocalGame({ onExit }: {
    onExit: () => void;
}) {
    const [grids, setGrids] = useState(Array(9).fill(Array(9).fill(null) as Grid<Mark>) as Grid<Grid<Mark>>);
    const [turn, setTurn] = useState<Player>('Player_1');
    const [nextGrid, setNextGrid] = useState<null | GridIndex>(null);

    const history = useRef<GameState[]>([]);

    const undo = () => {
        if (history.current.length === 0) return;
        const historyItem = history.current.pop()!;
        setGrids(historyItem.grids);
        setTurn(historyItem.turn);
        setNextGrid(historyItem.nextGrid);
    }

    const reset = () => {
        setGrids(history.current[0].grids);
        setTurn(history.current[0].turn);
        setNextGrid(history.current[0].nextGrid);
        history.current = [];
    }

    const winner = useMemo(() => (
        checkWinner(grids.map(checkWinner) as Grid<Mark>)
    ), [grids]);

    const handleCellClick = () => {
        history.current.push({ grids, turn, nextGrid });
    }

    return (<>
        <Game {...{
            grids, setGrids,
            turn, setTurn,
            nextGrid, setNextGrid
        }} onCellClick={handleCellClick} />
        <div class={buttonStyles.buttonPanel}>
            <button onClick={onExit} className={cl(buttonStyles.iconButton)} >&#8592;</button>
            <button onClick={history.current.length > 0 ? undo : undefined} className={cl(buttonStyles.iconButton, history.current.length === 0 && buttonStyles.hidden)}>&#8630;</button>
            <button onClick={winner !== null ? reset : undefined} className={cl(buttonStyles.iconButton, buttonStyles.delayed, winner === null && buttonStyles.hidden)} >&#8635;</button>
        </div>
    </>);
}

export default LocalGame;
