import RetroHitCounter from 'react-retro-hit-counter';
import React, { useState, useEffect } from 'react';
import "../global.scss";

const backendURL = 'https://rhishabh-portfolio-backend.herokuapp.com/'

function HitCounter({ slug }) {

  // const hits = 10;

  const [hits, setHits] = useState(undefined);
  
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
  backgroundColor="rgb(236, 246, 247)" />;
}

export default HitCounter;