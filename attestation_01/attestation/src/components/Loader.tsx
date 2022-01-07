import React, { useEffect } from 'react';
import './Loader.scss';

const Loader = function () {
  useEffect(() => {

  }, []);
  return (
    <div className="loader loader__big">
      <div className="loader__circle1" />
      <div className="loader__circle2" />
      <div className="loader__circle3" />
      <div className="loader__circle4" />
      <div className="loader__circle5" />
      <div className="loader__circle6" />
      <div className="loader__circle7" />
      <div className="loader__circle8" />
    </div>
  );
};

export default Loader;
