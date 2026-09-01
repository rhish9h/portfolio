// Renders the portfolio identity, public profile links, and reset action.
import { portfolioData } from '../data/portfolio'

type HeaderProps = {
  onReset: () => void
}

export function Header({ onReset }: HeaderProps) {
  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={onReset} aria-label="Return to introduction">
        <span className="brand-name">RHISHABH HATTARKI</span>
        <span className="brand-role">SOFTWARE ENGINEER</span>
      </button>
      <nav className="site-nav" aria-label="Portfolio links">
        <a href={portfolioData.links.resume} target="_blank" rel="noreferrer">Resume</a>
        <a href={portfolioData.links.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={portfolioData.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      </nav>
    </header>
  )
}
