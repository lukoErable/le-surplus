'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import 'react-loading-skeleton/dist/skeleton.css';

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

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const response = await fetch(`/api/products`);
        const allProducts: Product[] = await response.json();

        // Find the most specific category
        const mostSpecificCategory = categories.find(
          (cat) => cat.SubSubcategory
        ) ||
          categories.find((cat) => cat.Subcategory) ||
          categories.find((cat) => cat.Category) || {
            Category: '',
            Subcategory: '',
            SubSubcategory: '',
          };

        console.log('Most specific category:', mostSpecificCategory);

        // Filter products based on the most specific category
        const filteredProducts = allProducts.filter((product) => {
          if (mostSpecificCategory.SubSubcategory) {
            return (
              product.SubSubcategory === mostSpecificCategory.SubSubcategory
            );
          }
          if (mostSpecificCategory.Subcategory) {
            return product.Subcategory === mostSpecificCategory.Subcategory;
          }
          return product.Category === mostSpecificCategory.Category;
        });

        console.log('Filtered products:', filteredProducts);

        // Remove duplicates and the main product
        const seenTitles = new Set<string>();
        const uniqueProducts = filteredProducts.filter((product) => {
          const isDuplicate = seenTitles.has(product.Title);
          seenTitles.add(product.Title);
          return product.ID !== mainProductId && !isDuplicate;
        });

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

  if (loading) {
    return <div className="text-center text-red-500">loading ..</div>; // replace this by skeleton
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-center text-white">
        Produits similaires
      </h2>
      <ScrollMenu>
        {similarProducts.map((product) => (
          <Link
            key={product.ID}
            href={`/produits/${encodeURIComponent(product.ID)}`}
          >
            <div className="relative w-72 h-80 bg-white shadow-lg rounded-lg overflow-hidden group transition-transform transform hover:scale-105 m-4 cursor-pointer border-primary border-2">
              <div className="relative w-full h-full">
                <Image
                  src={product.Image}
                  alt={product.Title}
                  className="object-contain w-full h-full"
                  width={150}
                  height={150}
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-4">
                  <p className="text-white text-base font-medium text-center">
                    {product.Description.length > 100
                      ? product.Description.substring(0, 100) + '...'
                      : product.Description}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-primary bg-opacity-50 p-4 text-center border-t border-primary">
                <h2 className="text-lg font-semibold text-white whitespace-nowrap overflow-hidden text-ellipsis">
                  {product.Title}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </ScrollMenu>
    </div>
  );
};

export default SimilarProducts;
