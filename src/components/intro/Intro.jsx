import "./intro.scss"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { init } from 'ityped';
import { useEffect, useRef, useState } from 'react';

export default function Intro() {

    const textRef = useRef();
    const [downloaded, setDownloaded] = useState(false);

    const downloadClicked = () => {
        setDownloaded(true);
    }

    useEffect(() => {
        init(textRef.current, {
            showCursor: true,
            backDelay: 1500,
            strings: ["Developer", "Engineer", "Development Engineer"]
        });
    }, [])

    return (
        <div className='intro' id='intro'>
            <div className="left">
                <div className="imgContainer">
                    <img src="assets/profile_no_bg.png" alt="Profile" />
                </div>
            </div>
            <div className="right">
                <div className="wrapper">
                    <h2>Hi, I'm</h2>
                    <h1>Rhishabh Hattarki</h1>
                    <h3>Software <span ref={textRef}></span></h3>
                </div>
                <div className="resume">
                    <a href="assets/Rhishabh_Hattarki.pdf" download="Rhishabh_Hattarki_Resume.pdf">
                        <button onClick={downloadClicked}>
                            {downloaded ? <FileDownloadDoneIcon/> : <FileDownloadIcon/>}
                            &nbsp;
                            RESUME
                        </button>
                    </a>
                </div>
                <a href="#projects">
                    <ExpandMoreIcon className='downarrow'/>
                </a>
            </div>
        </div>
    )
}
