import { h, Fragment } from "preact";
import { useMemo, useRef } from "preact/hooks";
import { GridIndex, Mark, Grid, Player, checkWinner, GameState } from "../Data";
import GameGrid from "./GameGrid";
import buttonStyles from '../style/button.module.css';
import { classList as cl } from '../Util';

function Game({ grids, setGrids, turn, setTurn, nextGrid, setNextGrid }: {
    grids: Grid<Grid<Mark>>,
    setGrids: (grids: Grid<Grid<Mark>>) => void,
    turn: Player,
    setTurn: (turn: Player) => void,
    nextGrid: GridIndex,
    setNextGrid: (nextGrid: GridIndex) => void
}) {
    const history = useRef<GameState[]>([]);

    const undo = () => {
        const historyItem = history.current.pop();
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

    const getGridsWithSetCell = (index: number, subindex: number, mark: Mark) => {
        return grids.map(
            (subgrid, i) => i == index ?
                subgrid.map((cell, i) => i == subindex ? mark : cell)
                : subgrid) as Grid<Grid<Mark>>;
    }

    const toggleTurn = () => {
        setTurn(turn == 'Player_1' ? 'Player_2' : 'Player_1');
    }

    const handleCellClick = (index: GridIndex, subindex: GridIndex) => {
        if (grids[index][subindex] === null) {
            const newGrids = getGridsWithSetCell(index, subindex, turn);
            setGrids(newGrids);
            setNextGrid(checkWinner(newGrids[subindex]) === null ? subindex : null);
            history.current.push({ grids, turn, nextGrid });
            toggleTurn();
        }
    }

    return (<>
        <GameGrid grids={grids} onCellClick={handleCellClick} turn={turn} nextGrid={nextGrid} winner={winner} />
        <div class={buttonStyles.buttonPanel}>
            <button onClick={history.current.length > 0 ? undo : undefined} className={cl(history.current.length === 0 && buttonStyles.hidden)}>&#8630;</button>
            <button onClick={winner !== null ? reset : undefined} className={cl(buttonStyles.delayed, winner === null && buttonStyles.hidden)} >&#8635;</button>
        </div>
    </>);
}

export default Game;
