'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { animated, useSpring } from 'react-spring';

interface Product {
  ID: string;
  Title: string;
  DATE_CREATION: string;
  Description: string;
  Image: string;
  SubSubcategory: string;
  Subcategory: string;
  Category: string;
}

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Product[] = await response.json();

        const sortedProducts = data.sort((a, b) => {
          const dateA = new Date(
            a.DATE_CREATION.split('/').reverse().join('-')
          );
          const dateB = new Date(
            b.DATE_CREATION.split('/').reverse().join('-')
          );
          return dateB.getTime() - dateA.getTime();
        });

        setNewArrivals(sortedProducts.slice(0, 50));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="">
      <ProductSection
        title="Nouveautés"
        description="Plongez dans notre sélection exclusive des dernières tendances. Découvrez des pièces innovantes et incontournables qui redéfinissent le style moderne."
        image="/avion.jpg"
        products={newArrivals}
      />{' '}
      <Link href="/produits" className=" text-white hover:text-white">
        <div className="w-full text-white hover:bg-primary-sand hover:cursor-pointer text-center p-2 border-2 border-primary-sand rounded-lg font-bold bg-primary-olive">
          {' '}
          Afficher tous les produits
        </div>
      </Link>
    </div>
  );
};

const ProductSection = ({
  title,
  description,
  image,
  products,
}: {
  title: string;
  description: string;
  image: string;
  products: Product[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const fadeIn = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
  });

  const nextProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const productsToDisplay = (startIndex: number) => {
    const [count, setCount] = useState(3);

    useEffect(() => {
      const handleResize = () => {
        setCount(
          window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3
        );
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const endIndex = startIndex + count;
    if (endIndex <= products.length) {
      return products.slice(startIndex, endIndex);
    } else {
      return [
        ...products.slice(startIndex, products.length),
        ...products.slice(0, endIndex % products.length),
      ];
    }
  };
  return (
    <animated.div ref={sectionRef} style={fadeIn} className="mb-12">
      <div className="bg-primary mb-2 p-2 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl p-2 text-text-light">{title}</h2>
        <p className="text-text-dark text-center">{description}</p>
      </div>
      <div className="flex flex-col md:flex-row items-center bg-primary-olive rounded-lg shadow-lg overflow-hidden">
        <div className="w-full md:w-1/3 p-6 bg-primary text-white">
          <Image
            src={image}
            alt={title}
            className="rounded-lg object-cover w-full h-64 md:h-80"
            width={600}
            height={400}
          />
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={prevProduct}
              className="text-primary-sand hover:text-primary-olive p-2 rounded-full bg-primary shadow-md"
            >
              <FaChevronLeft size={25} />
            </button>
            <button
              onClick={nextProduct}
              className="text-primary-sand hover:text-primary-olive p-2 rounded-full bg-primary shadow-md"
            >
              <FaChevronRight size={25} />
            </button>
          </div>
        </div>

        <div className="w-full md:w-2/3 flex flex-wrap justify-center items-center p-4 ">
          {productsToDisplay(currentIndex).map((product, index) => (
            <ProductCard key={product.ID} product={product} index={index} />
          ))}
        </div>
      </div>
    </animated.div>
  );
};

const ProductCard = ({
  product,
  index,
}: {
  product: Product;
  index: number;
}) => {
  const shortDescription =
    product.Description.length > 200
      ? product.Description.substring(0, 200) + '...'
      : product.Description;

  const fadeIn = useSpring({
    opacity: 1 - index * 0.1,
    transform: `scale(${1 - index * 0.1}) translateY(${index * 10}px)`,
  });

  const isNotFirst = index !== 0;

  return (
    <animated.div
      style={fadeIn}
      className={`relative w-full sm:w-2/3 md:w-1/2 lg:w-1/3 h-96 bg-white rounded-lg overflow-hidden m-4 cursor-pointer border-2 border-primary shadow-lg ${
        isNotFirst ? 'blurred-product' : ''
      }`}
    >
      <Link
        key={product.ID}
        href={`/produits/${encodeURIComponent(product.ID)}`}
      >
        <div className="relative w-full h-full">
          <Image
            src={product.Image}
            alt={product.Title}
            className="object-contain w-full h-3/4"
            width={300}
            height={300}
            priority
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-4">
            <p className="text-white text-base font-medium text-center">
              {shortDescription}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-primary bg-opacity-50 p-4 text-center border-t border-primary">
          <h2 className="text-lg font-semibold text-white whitespace-nowrap overflow-hidden text-ellipsis">
            {product.Title}
          </h2>
        </div>
      </Link>
    </animated.div>
  );
};

export default NewArrivals;
