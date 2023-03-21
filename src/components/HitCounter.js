import RetroHitCounter from 'react-retro-hit-counter';
import React, { useState, useEffect } from 'react';
import "../global.scss";
import { backendURL } from "../Constants";

function HitCounter({ slug }) {

  const [hits, setHits] = useState(0);
  
  useEffect(() => {
    // Don't count hits on localhost
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    // Invoke the function by making a request.
    // Update the URL to match the format of your platform.
    fetch(`${backendURL}/registerHit?slug=${slug}`)
      .then((res) => res.json())
      .then((json) => {
        if (typeof json.hits === 'number') {
          setHits(json.hits);
        }
      });
  }, [slug]);

  if (typeof hits === 'undefined') {
    return null;
  }

  return <RetroHitCounter 
    hits={hits}
    withBorder={false}
    segmentActiveColor="#000000"
    segmentInactiveColor="#FFFFFF"
    backgroundColor="rgb(219, 234, 239)" />;
}

export default HitCounter;