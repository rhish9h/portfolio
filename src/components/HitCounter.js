import RetroHitCounter from 'react-retro-hit-counter';
import React, { useState, useEffect } from 'react';

const backendURL = 'https://young-peak-35101.herokuapp.com'

function HitCounter({ slug }) {
  const [hits, setHits] = useState(undefined);
    // const hits = 10;

  
  useEffect(() => {
    // Don't count hits on localhost
    // if (process.env.NODE_ENV !== 'production') {
    //   return;
    // }

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
  segmentActiveColor="#FFFFFF"
  segmentInactiveColor="#454545"
  backgroundColor="#282C34" />;
}

export default HitCounter;