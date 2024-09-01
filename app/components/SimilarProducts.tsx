'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { animated, useSpring } from 'react-spring';

interface Product {
  ID: string;
  Title: string;
  Image: string;
  Description: string;
  SubSubcategory: string;
  Subcategory: string;
  Category: string;
}

interface SimilarProductsProps {
  mainProductId: string;
  categories: {
    Category: string;
    Subcategory: string;
    SubSubcategory: string;
  }[];
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({
  mainProductId,
  categories,
}) => {
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const productsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const response = await fetch(`/api/products`);
        const allProducts: Product[] = await response.json();

        const calculateSimilarityScore = (product: Product) => {
          let score = 0;
          categories.forEach((category) => {
            if (product.Category === category.Category) score += 1;
            if (product.Subcategory === category.Subcategory) score += 2;
            if (product.SubSubcategory === category.SubSubcategory) score += 3;
          });
          return score;
        };

        const filteredAndSortedProducts = allProducts
          .filter((product) => product.ID !== mainProductId)
          .map((product) => ({
            ...product,
            similarityScore: calculateSimilarityScore(product),
          }))
          .sort((a, b) => b.similarityScore - a.similarityScore)
          .filter((product) => product.similarityScore > 0)
          .slice(0, 10);

        const uniqueProducts = filteredAndSortedProducts.filter(
          (product, index, self) =>
            index === self.findIndex((t) => t.Title === product.Title)
        );

        setSimilarProducts(uniqueProducts);
      } catch (error) {
        setError('Failed to load similar products.');
        console.error('Error fetching similar products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (categories.length > 0) {
      fetchSimilarProducts();
    }
  }, [categories, mainProductId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (productsContainerRef.current) {
        productsContainerRef.current.scrollLeft += event.deltaY;
        event.preventDefault(); // Prevents the default vertical scroll
      }
    };

    const container = productsContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  const fadeIn = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
  });

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <animated.div ref={sectionRef} style={fadeIn} className="mt-8 mb-8">
      <div className="bg-neutral-dark mb-2 p-2 px-4 rounded-lg shadow-lg w-fit m-auto border-2 border-black">
        <h2 className="text-center text-text-light text-3xl font-bold">
          Produits similaires
        </h2>
      </div>
      <div className="flex flex-col md:flex-row items-stretch bg-transparent rounded-lg shadow-lg overflow-hidden border-2 border-primary">
        <div
          ref={productsContainerRef}
          className="w-full p-6 overflow-x-auto whitespace-nowrap products-container"
        >
          <div className="flex space-x-4">
            {loading
              ? Array(5)
                  .fill(0)
                  .map((_, index) => <ProductSkeleton key={index} />)
              : similarProducts.map((product) => (
                  <ProductCard key={product.ID} product={product} />
                ))}
          </div>
        </div>
      </div>
    </animated.div>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const shortDescription =
    product.Description.length > 200
      ? product.Description.substring(0, 200) + '...'
      : product.Description;

  return (
    <div className="flex-shrink-0 w-64 h-96 bg-white rounded-lg overflow-hidden cursor-pointer border-2 border-primary shadow-lg transition-transform duration-300 hover:scale-105 relative">
      <Link href={`/produits/${encodeURIComponent(product.ID)}`}>
        <div className="relative w-full h-full">
          <Image
            src={product.Image}
            alt={product.Title}
            className="object-contain w-full h-3/4"
            width={300}
            height={300}
            priority
          />

          {/* Titre toujours visible */}
          <div className="absolute bottom-0 left-0 right-0 bg-primary bg-opacity-80 p-4 text-center">
            <h2 className="text-xl font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis">
              {product.Title}
            </h2>
          </div>

          {/* Description affichée au hover */}
          <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-6">
            <p className="text-white text-sm">{shortDescription}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

const ProductSkeleton = () => (
  <div className="flex-shrink-0 w-64 h-96 bg-neutral-dark rounded-lg overflow-hidden border-2 border-primary shadow-lg">
    <Skeleton height={288} />
    <div className="h-24 bg-primary bg-opacity-80 p-4">
      <Skeleton height={24} />
    </div>
  </div>
);

export default SimilarProducts;
