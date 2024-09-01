'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
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

const Sections = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

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

        setAllProducts(sortedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = (
    key: 'SubSubcategory' | 'Subcategory' | 'Category',
    value: string
  ) => allProducts.filter((product) => product[key] === value);

  return (
    <div className="container mx-auto px-4">
      <ProductSection
        title="Pantalons"
        description="Explorez notre collection variée de pantalons militaires, conçus pour la chasse, la randonnée, la sécurité privée, ou simplement pour le plaisir. Alliant robustesse et confort, chaque modèle est prêt à relever tous les défis."
        image="/pantalons.JPG"
        products={filterProducts('SubSubcategory', 'Pantalons')}
      />

      <ProductSection
        title="Sacs"
        description="Découvrez notre gamme de sacs à dos et de transport, parfaits pour toutes vos aventures. Alliant fonctionnalité et style, ces sacs sont conçus pour répondre à tous vos besoins de déplacement."
        image="/sacs.JPG"
        products={filterProducts('Subcategory', 'Sacs')}
      />

      <ProductSection
        title="Blousons"
        description="Parcourez notre sélection de vestes et blousons, où style et protection se rencontrent. Que ce soit pour un usage quotidien ou pour des conditions extrêmes, trouvez le modèle qui vous convient."
        image="/vestes.JPG"
        products={filterProducts('SubSubcategory', 'Blousons')}
      />

      <ProductSection
        title="Chaussures"
        description="Découvrez notre collection de chaussures, comprenant des rangers authentiques, des chaussures de chasse robustes et des chaussures d'intervention performantes. Conçues pour offrir confort et durabilité, elles sont prêtes à vous accompagner partout."
        image="/chaussures.JPG"
        products={filterProducts('Category', 'Chaussures')}
      />
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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const productsContainerRef = useRef<HTMLDivElement>(null);

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

  return (
    <animated.div ref={sectionRef} style={fadeIn} className="mb-8">
      <div className="bg-primary mb-2 p-6 rounded-lg shadow-lg">
        <h2 className="text-center text-text-light text-3xl font-bold mb-4">
          {title}
        </h2>
        <p className="text-white text-center text-lg">{description}</p>
      </div>
      <div className="flex flex-col md:flex-row items-stretch bg-transparent rounded-lg shadow-lg overflow-hidden border-2 border-primary">
        <div className="w-full md:w-1/3 p-6 bg-primary text-white">
          <Image
            src={image}
            alt={title}
            className="rounded-lg object-cover w-full h-64 md:h-80"
            width={600}
            height={500}
          />
        </div>

        <div
          ref={productsContainerRef}
          className="w-full md:w-2/3 p-6 overflow-x-auto whitespace-nowrap products-container"
        >
          <div className="flex space-x-4">
            {products.map((product) => (
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

export default Sections;
