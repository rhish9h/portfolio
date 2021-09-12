import "./hits.scss";
import HitCounter from "../HitCounter";

export default function Hits() {
    return(
        <div className="hits" id="hits">
            <h1>HITS: </h1>
            <HitCounter slug="home-page"/>
        </div>
    )
}