import { h, Fragment } from 'preact';
import LocalGame from './components/LocalGame';
import NetworkGame from './components/NetworkGame';
import { useState } from 'preact/hooks';
import buttonStyles from './style/button.module.css';

type GameType = 'Network' | 'Local';

function App() {
    const [gameType, setGameType] = useState<GameType | null>(null);
    const [promptShown, setPromptShown] = useState(false);
    const [gameId, setGameId] = useState<string>();

    const handleExit = () => {
        setGameType(null);
    }

    return (
        <main>
            {gameType == 'Network' && <NetworkGame gameId={gameId} onExit={handleExit} />}
            {gameType == 'Local' && <LocalGame onExit={handleExit} />}
            {gameType == null && <>
                <button onClick={() => setGameType('Local')}>Start Local Game</button>
                <button onClick={() => setGameType('Network')}>Start Network Game</button>
                <button onClick={() => setPromptShown(true)}>Join Network Game</button>
            </>}
            {promptShown && <CodePrompt onSubmit={code => {
                setPromptShown(false);
                setGameId(code);
                setGameType('Network');
            }} />}
        </main>
    );
}

function CodePrompt({ onSubmit }: { onSubmit: (code: string) => void }) {
    const [code, setCode] = useState('');
    return (<div className={buttonStyles.prompt}>
        <input value={code} onChange={event => setCode((event.target! as HTMLInputElement).value)} />
        <button onClick={() => onSubmit(code)}>Connect</button>
    </div>);
}

export default App;
