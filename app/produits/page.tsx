'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Sections from '../components/ProductSection';
import categoryStructure from '../Utils/categoryStructure';
import { Product, categorizeProduct } from '../Utils/categoryUtils';

const MAX_DESCRIPTION_LENGTH = 230;

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('');
  const [activeSubSubcategory, setActiveSubSubcategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Product[] = await response.json();

        const categorizedProducts = data.map((product) => ({
          ...product,
          Categories: categorizeProduct(product.Title),
        }));

        setProducts(categorizedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      searchQuery
        ? product.Title.toLowerCase().includes(searchQuery.toLowerCase())
        : product.Categories.some(
            (cat) =>
              (activeCategory === '' || cat.Category === activeCategory) &&
              (activeSubcategory === '' ||
                cat.Subcategory === activeSubcategory) &&
              (activeSubSubcategory === '' ||
                cat.SubSubcategory === activeSubSubcategory)
          )
    );

    // Remove duplicates based on title
    const uniqueProducts = Array.from(
      new Map(filtered.map((item) => [item.Title, item])).values()
    );

    setFilteredProducts(uniqueProducts);
  }, [
    activeCategory,
    activeSubcategory,
    activeSubSubcategory,
    searchQuery,
    products,
  ]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setActiveSubcategory('');
    setActiveSubSubcategory('');
  };

  const handleSubcategoryClick = (category: string, subcategory: string) => {
    setActiveCategory(category);
    setActiveSubcategory(subcategory);
    setActiveSubSubcategory('');
  };

  const handleSubSubcategoryClick = (
    category: string,
    subcategory: string,
    subSubcategory: string
  ) => {
    setActiveCategory(category);
    setActiveSubcategory(subcategory);
    setActiveSubSubcategory(subSubcategory);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6 bg-primary-olive">
      {activeCategory !== '' && (
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="z-10 w-full sm:w-2/5 p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-orange text-black mx-auto"
        />
      )}
      <ul className="flex flex-wrap justify-center mb-6 relative z-10 gap-4">
        {categoryStructure.map((category) => (
          <li key={category.name} className="relative group">
            <button
              className={`px-4 py-2 shadow-md transition-all duration-300 ${
                activeCategory === category.name
                  ? 'bg-primary-olive text-text-light'
                  : 'bg-neutral-light text-neutral-dark hover:bg-accent-orange hover:text-text-light'
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </button>
            {category.subcategories.length > 0 && (
              <ul className="absolute left-0 hidden group-hover:block bg-white shadow-lg rounded-lg z-20">
                {category.subcategories.map((subcategory) => (
                  <li
                    key={subcategory.name}
                    className="relative group/subcategory"
                  >
                    <button
                      className={`block px-4 py-2 text-left w-full ${
                        activeSubcategory === subcategory.name
                          ? 'bg-primary-olive text-text-light'
                          : 'bg-neutral-light text-neutral-dark hover:bg-accent-orange hover:text-text-light'
                      }`}
                      onClick={() =>
                        handleSubcategoryClick(category.name, subcategory.name)
                      }
                    >
                      {subcategory.name}
                    </button>
                    {subcategory.subSubcategories.length > 0 && (
                      <ul className="absolute left-full top-0 hidden group-hover/subcategory:block bg-white shadow-lg rounded-lg z-30">
                        {subcategory.subSubcategories.map((subSubcategory) => (
                          <li key={subSubcategory}>
                            <button
                              className={`block px-4 py-2 text-left w-full ${
                                activeSubSubcategory === subSubcategory
                                  ? 'bg-primary-olive text-text-light'
                                  : 'bg-neutral-light text-neutral-dark hover:bg-accent-orange hover:text-text-light'
                              }`}
                              onClick={() =>
                                handleSubSubcategoryClick(
                                  category.name,
                                  subcategory.name,
                                  subSubcategory
                                )
                              }
                            >
                              {subSubcategory}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {activeCategory === '' && <Sections />}

      {activeCategory && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const shortDescription =
                product.Description.length > MAX_DESCRIPTION_LENGTH
                  ? `${product.Description.substring(
                      0,
                      MAX_DESCRIPTION_LENGTH
                    )}...`
                  : product.Description;

              return (
                <div
                  key={product.ID}
                  className="relative w-full bg-white shadow-lg rounded-lg overflow-hidden group transition-transform transform hover:scale-105 border-2 border-primary"
                >
                  <Link href={`/produits/${encodeURIComponent(product.ID)}`}>
                    <div className="relative w-full h-96 p-4">
                      <Image
                        src={product.Image}
                        alt={product.Title}
                        className="object-contain w-full h-full"
                        width={288}
                        height={256}
                      />
                      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                        <div className="flex flex-col justify-start">
                          <p className="text-text-light text-base font-medium text-center">
                            {shortDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-primary-olive bg-opacity-50 p-4 text-center border-t border-primary">
                      <h2 className="text-lg font-semibold text-text-dark whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {product.Title}
                      </h2>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
