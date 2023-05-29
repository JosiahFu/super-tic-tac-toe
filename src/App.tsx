import { h } from "preact";
import { useMemo, useRef, useState } from "preact/hooks";
import { GridIndex, Mark, Grid, Player, checkWinner } from "./Game";
import GameGrid from "./components/GameGrid";
import buttonStyles from './style/game/button.module.css';
import { classList as cl } from './Util';

function App() {
    const [grids, setGrids] = useState(Array(9).fill(Array(9).fill(null) as Grid<Mark>) as Grid<Grid<Mark>>);
    const [turn, setTurn] = useState<Player>('Player_1');
    const [nextGrid, setNextGrid] = useState<null | GridIndex>(null);
    const history = useRef<{ grids: typeof grids, turn: typeof turn, nextGrid: typeof nextGrid }[]>([]);

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
            console.log(newGrids);
            setNextGrid(checkWinner(newGrids[subindex]) === null ? subindex : null);
            history.current.push({ grids, turn, nextGrid });
            toggleTurn();
        }
    }

    return (
        <main>
            <GameGrid grids={grids} onCellClick={handleCellClick} turn={turn} nextGrid={nextGrid} winner={winner} />
            <div>
                <button onClick={undo} className={cl(history.current.length === 0 && buttonStyles.hidden)}>&#8630;</button>
                <button onClick={reset} className={cl(winner === null && buttonStyles.hidden)} >&#8635;</button>
            </div>
        </main>
    );
}

export default App;
