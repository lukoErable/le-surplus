'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const planes = [
  {
    name: 'FOUGA ZEPHYR CM 175 n°18',
    description: 'Aéronavale',
    image: '/fouga.jpg',
  },
  {
    name: 'MIRAGE V BR 07',
    description: 'Armée Belge',
    image: '/mirage.jpeg',
  },
];

export default function PlanesPresentation() {
  const [currentPlane, setCurrentPlane] = useState(0);

  const nextPlane = () => {
    setCurrentPlane((prev) => (prev + 1) % planes.length);
  };

  const prevPlane = () => {
    setCurrentPlane((prev) => (prev - 1 + planes.length) % planes.length);
  };

  return (
    <div className="min-h-screen bg-primary-olive flex flex-col items-center justify-center p-8">
      <motion.h1
        className="text-4xl font-bold mb-8 text-gray-300"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Présentation des Avions
      </motion.h1>

      <div className="relative w-full max-w-4xl aspect-video rounded-lg overflow-hidden shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPlane}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
          >
            <Image
              src={planes[currentPlane].image}
              alt={planes[currentPlane].name}
              fill
              style={{ objectFit: 'cover' }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-8">
              <motion.h2
                className="text-3xl font-bold text-white mb-2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {planes[currentPlane].name}
              </motion.h2>
              <motion.p
                className="text-xl text-white"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {planes[currentPlane].description}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-300"
          onClick={prevPlane}
        >
          <MdChevronLeft size={24} />
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-300"
          onClick={nextPlane}
        >
          <MdChevronRight size={24} />
        </button>
      </div>

      <div className="mt-8 flex space-x-4">
        {planes.map((_, index) => (
          <motion.button
            key={index}
            className={`w-4 h-4 rounded-full ${
              index === currentPlane ? 'bg-primary' : 'bg-gray-300'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentPlane(index)}
          />
        ))}
      </div>
    </div>
  );
}
