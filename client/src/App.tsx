import { h, Fragment } from 'preact';
import LocalGame from './components/LocalGame';
import NetworkGame from './components/NetworkGame';
import { useMemo, useState } from 'preact/hooks';
import buttonStyles from './style/button.module.css';

type GameType = 'Network' | 'Local';

function App() {
    const params = useMemo(() => typeof document !== 'undefined' ? new URLSearchParams(document.location.search) : undefined, [])

    const [gameType, setGameType] = useState<GameType | null>(params?.has('join') ? 'Network' : null);
    const [promptShown, setPromptShown] = useState(false);
    const [gameId, setGameId] = useState<string | undefined>(params?.get('join') ?? undefined);
    const [errorMessage, setErrorMessage] = useState<string>();

    const handleExit = () => {
        setGameType(null);
    }

    const handleError = (message: string) => {
        setErrorMessage(message);
        setTimeout(() => setErrorMessage(undefined), 1000); // Maybe fix later?
    }

    return (
        <main>
            {gameType == 'Network' && <NetworkGame gameId={gameId} onExit={handleExit} onError={handleError} />}
            {gameType == 'Local' && <LocalGame onExit={handleExit} />}
            <div class={buttonStyles.menu}>
                {gameType == null && <>
                    <button onClick={() => setGameType('Local')}>Start Local Game</button>
                    <button onClick={() => setGameType('Network')}>Start Network Game</button>
                    <button onClick={() => setPromptShown(true)}>Join Network Game</button>
                </>}
            </div>
            {promptShown && <CodePrompt onSubmit={code => {
                setPromptShown(false);
                setGameId(code);
                setGameType('Network');
            }} />}
            {errorMessage && <span>{errorMessage}</span>}
        </main>
    );
}

function CodePrompt({ onSubmit }: { onSubmit: (code: string) => void }) {
    const [code, setCode] = useState('');
    return (<div class={buttonStyles.prompt}>
        <input value={code} onChange={event => setCode((event.target! as HTMLInputElement).value)} placeholder="Game Code" />
        <button onClick={() => onSubmit(code)}>Connect</button>
    </div>);
}

export default App;
