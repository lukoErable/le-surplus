'use client';

import React from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaRegClock,
} from 'react-icons/fa';

const StoreStatus: React.FC = () => {
  const currentDay = new Date().getDay();
  const currentTime = new Date().getHours() + new Date().getMinutes() / 60; // Current time in hours

  const hours: {
    [key: number]:
      | { morning: [number, number]; afternoon: [number, number] }
      | 'Fermé';
  } = {
    0: 'Fermé', // Dimanche
    1: 'Fermé', // Lundi
    2: { morning: [9, 12], afternoon: [14, 19] }, // Mardi
    3: { morning: [9, 12], afternoon: [14, 19] }, // Mercredi
    4: { morning: [9, 12], afternoon: [14, 19] }, // Jeudi
    5: { morning: [9, 12], afternoon: [14, 19] }, // Vendredi
    6: { morning: [9, 12], afternoon: [14, 19] }, // Samedi
  };

  const getNextOpeningTime = () => {
    for (let i = 0; i < 7; i++) {
      const dayIndex = (currentDay + i) % 7;
      const dayHours = hours[dayIndex];
      if (dayHours !== 'Fermé') {
        const { morning, afternoon } = dayHours;
        if (i === 0) {
          if (currentTime < morning[0]) return `Aujourd'hui à ${morning[0]}h00`;
          if (currentTime < afternoon[0])
            return `Aujourd'hui à ${afternoon[0]}h00`;
        } else {
          return `${
            [
              'Dimanche',
              'Lundi',
              'Mardi',
              'Mercredi',
              'Jeudi',
              'Vendredi',
              'Samedi',
            ][dayIndex]
          } à ${morning[0]}h00`;
        }
      }
    }
    return 'Inconnu';
  };

  const isOpen =
    hours[currentDay] !== 'Fermé' &&
    ((currentTime >= hours[currentDay].morning[0] &&
      currentTime < hours[currentDay].morning[1]) ||
      (currentTime >= hours[currentDay].afternoon[0] &&
        currentTime < hours[currentDay].afternoon[1]));

  const statusMessage = isOpen
    ? 'Ouvert'
    : `Fermé - Ouvre ${getNextOpeningTime()}`;

  return (
    <div className="p-6 bg-primary shadow-lg rounded-lg flex flex-col items-center">
      <h2 className="text-xl font-heading mb-4 text-center text-text-light flex items-center justify-center">
        <span className={isOpen ? 'text-green-400' : 'text-accent-red'}>
          {statusMessage}
        </span>
      </h2>
      <div className="text-md mb-4 text-center text-text-dark flex flex-col">
        <div>
          <FaRegClock className="inline mr-2" />
          <span>Aujourd&apos;hui : </span>
        </div>
        <span className="font-semibold">
          {hours[currentDay] === 'Fermé'
            ? 'Fermé'
            : `${hours[currentDay].morning[0]}h00 - ${hours[currentDay].morning[1]}h00 / ${hours[currentDay].afternoon[0]}h00 - ${hours[currentDay].afternoon[1]}h00`}
        </span>
      </div>
      <p className="text-md text-text-light text-center">
        <FaPhoneAlt className="inline mr-2" />
        Tél :{' '}
        <a
          href="tel:0475572010"
          className="font-semibold text-accent-orange hover:underline"
        >
          04 75 57 20 10
        </a>
      </p>
      <ul className="flex space-x-4 justify-center mt-4">
        <li>
          <a
            href="https://www.facebook.com/lesurplus.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <FaFacebook size={24} />
          </a>
        </li>

        <li>
          <a
            href="https://www.instagram.com/le_surplus_valence/?hl=fr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <FaInstagram size={24} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default StoreStatus;
