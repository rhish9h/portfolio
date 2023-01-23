import "./projects.scss";
import EngineeringIcon from '@mui/icons-material/Engineering';
import Carousel from "../carousel/Carousel";

export default function Projects() {
    const projects = [
        {
            id: 1,
            title: "Real Time IDS",
            img: "assets/car_ids_ss.png",
            link: "https://github.com/s3r-be/be-project"
        },
        {
            id: 2,
            title: "Apace Inventory Management System",
            img: "assets/apace_inv_ss.png",
            link: "https://github.com/rhish9h/apaceInventory"
        },
        {
            id: 3,
            title: "YouTube Data Analysis and Like Count Prediction",
            img: "assets/youtube_data_ss.png",
            link: "https://github.com/rhish9h/Youtube-data-analysis-and-like-count-prediction"
        }
    ]

    return (
        <div className='projects' id='projects'>
            <h2><EngineeringIcon/> Projects</h2>
            
            <div className="container">
                <Carousel data={projects}/>
            </div>
        </div>
    )
}
