import logo from './logo.svg';
import './App.css';
import HitCounter from './components/HitCounter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p><HitCounter slug="home-page"/></p>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hi! You've reached Rhishabh Hattarki's newest experiment. He'll be migrating his wordpress portfolio here soon.
        </p>

        <p>
          You can check out the old website here
        </p>
        <a
          className="App-link"
          href="https://rhishhatt.wordpress.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Old portfolio
        </a>
      </header>
    </div>
  );
}

export default App;
