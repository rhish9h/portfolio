// Renders the portfolio identity, navigation placeholders, and reset action.
type HeaderProps = {
  onReset: () => void
}

export function Header({ onReset }: HeaderProps) {
  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={onReset} aria-label="Return to introduction">
        <span className="brand-name">RHISHABH</span>
        <span className="brand-role">SOFTWARE ENGINEER</span>
      </button>
      <nav className="site-nav" aria-label="Portfolio links">
        <span>Resume</span>
        <span>GitHub</span>
        <span>LinkedIn</span>
      </nav>
    </header>
  )
}
