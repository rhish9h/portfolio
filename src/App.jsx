// import HitCounter from './components/HitCounter';
import Topbar from './components/topbar/Topbar';
import Intro from './components/intro/Intro';
import Projects from './components/projects/Projects';
import Contact from './components/contact/Contact';
import Menu from "./components/menu/Menu";
import Hits from "./components/hits/Hits";
import './app.scss'
import { useState } from "react";

function App() {

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="App">
      <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>

      <div className="sections">
        <Intro/>
        <Projects/>
        <Contact/>
        <Hits/>
      </div>


      {/* <header className="App-header">

        

        <HitCounter slug="home-page"/>
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
      </header> */}
    </div>
  );
}

export default App;
