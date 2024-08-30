import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="p-6 bg-primary-olive min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row animate-pulse">
          <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-gray-300">
            <Skeleton height="100%" />
          </div>
          <div className="p-6 flex flex-col justify-between w-full md:w-1/2">
            <div>
              <h1 className="text-2xl font-bold text-text-dark mb-4">
                <Skeleton width="80%" />
              </h1>
              <p className="text-text-dark mb-4">
                <Skeleton count={3} />
              </p>

              <div className="mb-4">
                <h2 className="text-lg font-semibold text-text-dark">
                  <Skeleton width="60%" />
                </h2>
                <div className="flex flex-wrap gap-4 mt-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      circle
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h2 className="text-lg font-semibold text-text-dark">
                  <Skeleton width="60%" />
                </h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      width={40}
                      height={20}
                      className="px-2 py-1"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
