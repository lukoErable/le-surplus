'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const currentPath = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const linkStyle = (path: string) =>
    `text-sm cursor-pointer flex justify-center pt-2 border-b-2 ${
      currentPath === path
        ? 'text-black border-black'
        : 'border-transparent hover:border-black'
    }`;

  const contactStyle = `p-2 px-4 border-2 bg-primary-olive text-text-light rounded-full hover:bg-primary-sand hover:text-text-dark hover:border-transparent`;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      if (sidebar && !sidebar.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-md font-blackOps">
      <div className="max-w-6xl mx-auto ">
        <div className="px-6 sm:px-10 md:px-10 lg:px-0 flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <h1 className="font-bold text-3xl text-primary-khaki font-blackOps">
                Le Surplus
              </h1>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className={linkStyle('/')}>
              Magasin
            </Link>
            <Link href="/produits" className={linkStyle('/produits')}>
              Produits
            </Link>
            <Link href="/avions" className={linkStyle('/avions')}>
              Nos avions
            </Link>
            <Link
              href="/contact"
              className={`${linkStyle('/contact')} ${contactStyle}`}
            >
              Contact
            </Link>
          </nav>
          <div className="md:hidden">
            <button
              className="text-text-light p-2"
              onClick={(e) => {
                e.stopPropagation();
                toggleSidebar();
              }}
              aria-label="Toggle Sidebar"
            >
              <FaBars size={24} />
            </button>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        id="sidebar"
        className={`fixed top-0 right-0 h-full w-64 bg-primary z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-text-light"
          onClick={toggleSidebar}
          aria-label="Close Sidebar"
        >
          <FaTimes size={24} />
        </button>
        <nav className="flex flex-col items-center mt-16 space-y-4">
          <Link href="/" className={linkStyle('/')} onClick={toggleSidebar}>
            Magasin
          </Link>
          <Link
            href="/produits"
            className={linkStyle('/produits')}
            onClick={toggleSidebar}
          >
            Produits
          </Link>
          <Link
            href="/marques"
            className={linkStyle('/marques')}
            onClick={toggleSidebar}
          >
            Marques
          </Link>
          <Link
            href="/contact"
            className={`${linkStyle('/contact')} ${contactStyle}`}
            onClick={toggleSidebar}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
