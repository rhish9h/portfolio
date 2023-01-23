import "./slide.scss";

export default function Slide({className, slide}) {
    return (
        <div className={`slide ${className}`}>
            <div className="image">
                <img src={slide.img} alt={slide.title}/>
            </div>
            <div className="title">
                <h3>
                    {slide.title}
                </h3>
            </div>
            <div className="technologies">
            </div>
        </div>
    )
}