import { h } from 'preact';
import LocalGame from './components/LocalGame';
import NetworkGame from './components/NetworkGame';

function App() {
    return (
        <main>
            <NetworkGame />
        </main>
    );
}

export default App;
