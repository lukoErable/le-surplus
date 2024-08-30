'use client';

import { useState } from 'react';

const Address: React.FC = () => {
  const coordinates = '44.875814047057524, 4.8662805367106605';
  const [showOptions, setShowOptions] = useState(false);

  const handleYAller = () => {
    setShowOptions(true);
  };

  const handleServiceSelection = (service: string) => {
    let url = '';

    switch (service) {
      case 'google':
        url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates}`;
        break;
      case 'waze':
        url = `https://waze.com/ul?q=${coordinates}`;
        break;
      case 'apple':
        url = `http://maps.apple.com/?daddr=${coordinates}`;
        break;
      default:
        return;
    }

    if (url) {
      window.open(url, '_blank');
    }
    setShowOptions(false);
  };

  return (
    <div className="p-6 bg-primary shadow-lg rounded-md flex flex-col items-center mt-4">
      <h3 className="text-lg font-semibold text-center text-text-light">
        Rue Pierre Seghers, 26800 Portes-lès-Valence
      </h3>
      {!showOptions ? (
        <button
          onClick={handleYAller}
          className="mt-2 text-white font-extrabold bg-primary-olive p-2 rounded-lg"
        >
          Y ALLER
        </button>
      ) : (
        <div className="mt-2 flex flex-col gap-2">
          <button
            onClick={() => handleServiceSelection('google')}
            className="text-white font-bold bg-primary-light p-2 rounded-lg"
          >
            Google Maps
          </button>
          <button
            onClick={() => handleServiceSelection('waze')}
            className="text-white font-bold bg-primary-light p-2 rounded-lg"
          >
            Waze
          </button>
          <button
            onClick={() => handleServiceSelection('apple')}
            className="text-white font-bold bg-primary-light p-2 rounded-lg"
          >
            Plan
          </button>
        </div>
      )}
    </div>
  );
};

export default Address;
