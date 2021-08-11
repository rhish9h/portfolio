import "./topbar.scss"
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import CodeIcon from '@material-ui/icons/Code';
import InstagramIcon from '@material-ui/icons/Instagram';

export default function Topbar({ menuOpen, setMenuOpen }) {
    return (
        <div className={"topbar " + (menuOpen && "active")} id='topbar'>
            <div className='wrapper'>
                <div className='left'>
                    <a href="#intro" className='logo'>rhish.in</a>
                    <div className='itemContainer'>
                        <a href="https://www.linkedin.com/in/rhishabh-hattarki/" target='_blank' rel='noreferrer'>
                            <LinkedInIcon className='icon'/>    
                        </a>
                        <a href="https://github.com/rhish9h" target='_blank' rel='noreferrer'>
                            <GitHubIcon className='icon' />
                        </a>
                        <a href="https://leetcode.com/rhish9h/" target='_blank' rel='noreferrer'>
                            <CodeIcon className='icon' />
                        </a>
                        <a href="https://www.instagram.com/__rhish__/" target='_blank' rel='noreferrer'>
                            <InstagramIcon className='icon'/>
                        </a>
                    </div>
                </div>
                <div className='right'>
                    <div className='hamburger' id='hamburger' onClick={()=>setMenuOpen(!menuOpen)}>
                        <span className='line1'></span>
                        <span className='line2'></span>
                        <span className='line3'></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
