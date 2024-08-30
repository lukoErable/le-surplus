'use client';

import colorMap from '@/app/Utils/colorMap';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SimilarProducts from '../../components/SimilarProducts';
import { categorizeProduct, Product } from '../../Utils/categoryUtils';
import ProductDetailSkeleton from '../../Utils/ProductDetailSkeleton';

const truncateDescription = (description: string, maxWords: number) => {
  const sentences = description.split('. ');

  let wordCount = 0;
  let truncated = '';

  for (const sentence of sentences) {
    const words = sentence.split(' ');
    if (wordCount + words.length <= maxWords) {
      truncated += (truncated ? '. ' : '') + sentence;
      wordCount += words.length;
    } else {
      break;
    }
  }

  if (wordCount > 0 && wordCount < description.split(' ').length) {
    truncated += '.';
  }

  return truncated;
};

const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL', '4XL'];

const ProductDetail: React.FC = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [categories, setCategories] = useState<
    {
      Category: string;
      Subcategory: string;
      SubSubcategory: string;
    }[]
  >([]);

  useEffect(() => {
    if (!productId) return;

    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`/api/detail_products?id=${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data: Product = await response.json();
        setProduct(data);

        const sizesColorsArray = data.SizesColors
          ? data.SizesColors.split(', ')
          : [];
        const firstColor =
          sizesColorsArray.length > 0
            ? sizesColorsArray[0].split('/')[1]
            : null;
        setSelectedColor(firstColor);

        const categoriesResult = categorizeProduct(data.Title);
        setCategories(categoriesResult);
      } catch (error) {
        setError('Failed to load product details.');
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center">Product not found</div>;
  }

  const sizesColorsArray = product.SizesColors
    ? product.SizesColors.split(', ')
    : [];

  const colorsArray = sizesColorsArray.map((item) => item.split('/')[1]);
  const colorsSet = new Set(colorsArray);
  const colors = Array.from(colorsSet);

  const filteredSizes = selectedColor
    ? sizesColorsArray
        .filter((item) => item.includes(`/${selectedColor}`))
        .map((item) => item.split('/')[0])
        .sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b))
    : [];

  return (
    <div className="p-6 bg-primary-olive min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-1/2 h-64 md:h-auto">
            <Image
              src={product.Image}
              alt={product.Title}
              className="object-contain w-full h-full"
              layout="fill"
            />
          </div>
          <div className="p-6 flex flex-col justify-between w-full md:w-1/2">
            <div>
              <h1 className="text-2xl font-bold text-text-dark mb-4">
                {product.Title}
              </h1>
              <p className="text-text-dark mb-4">
                {truncateDescription(product.Description, 100)}
              </p>

              {colors.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-text-dark">
                    Couleurs disponibles
                  </h2>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {colors.map((color) => (
                      <div
                        key={color}
                        className={`relative group w-8 h-8 flex items-center justify-center transform transition-transform duration-300 hover:scale-125 ${
                          selectedColor === color
                            ? 'ring-2 ring-black rounded-full'
                            : ''
                        }`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color === 'CAMO' ? (
                          <Image
                            src={colorMap[color]}
                            alt="Camo"
                            className="w-8 h-8 rounded-full"
                            width={32}
                            height={32}
                          />
                        ) : (
                          <span
                            className="w-8 h-8 rounded-full"
                            style={{
                              backgroundColor: colorMap[color] || '#000000',
                            }}
                          ></span>
                        )}
                        <div className="absolute bottom-full mb-1 text-center bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {color}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedColor && filteredSizes.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-text-dark">
                    Tailles disponibles en {selectedColor}
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {filteredSizes.map((size) => (
                      <span
                        key={size}
                        className="px-2 py-1 bg-primary-olive text-white rounded"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <SimilarProducts mainProductId={product.ID} categories={categories} />
    </div>
  );
};

export default ProductDetail;
