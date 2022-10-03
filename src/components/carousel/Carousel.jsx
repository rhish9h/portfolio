import { useState } from "react";
import "./carousel.scss";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Slide from "./slide/Slide";

export default function Carousel ({data}) {
    const [ curSlide, setCurSlide ] = useState(0);
    const dataLen = data.length;

    const nextSlide = () => {
        setCurSlide((prev) => {
            return (prev + 1) % dataLen;
        });
    }

    const prevSlide = () => {
        setCurSlide((prev) => {
            return (prev + dataLen - 1) % dataLen;
        });
    }

    if (!Array.isArray(data) || data.length <= 0) {
        return null;
    }

    return (
        <section className="slider">
            <KeyboardArrowLeftIcon className="arrow left-arrow" onClick={prevSlide} />
            <KeyboardArrowRightIcon className="arrow right-arrow" onClick={nextSlide} />
            
            {data.map((slide, index) => {
                return (
                    <a href={slide.link} target="_blank" rel="noreferrer" key={slide.id}>
                        <Slide className={index === curSlide ? "active-slide" : "inactive-slide"} slide={slide} />
                    </a>
                )
            })}
        </section>
    )
}