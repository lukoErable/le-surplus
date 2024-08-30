'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const currentPath = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const linkStyle = (path: string) =>
    `text-sm cursor-pointer flex justify-center pt-2 border-b-2 hover:text-primary hover:border-text-primary transition-colors duration-200 ${
      currentPath === path
        ? 'text-primary border-primary'
        : 'text-text-light border-transparent hover:border-text-primary'
    }`;

  const contactStyle = `p-2 px-4 border-2 bg-text-light text-primary rounded-full hover:bg-accent-red hover:text-text-dark hover:border-accent-red transition-colors duration-200`;

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
    <header className="sticky top-0 z-50 bg-primary-DEFAULT shadow-military font-blackOps">
      <div className="max-w-6xl mx-auto">
        <div className="px-6 sm:px-10 md:px-10 lg:px-0 flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <h1 className="font-bold text-3xl text-text-light font-blackOps">
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
              Avions
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
          className="fixed inset-0 bg-primary-DEFAULT bg-opacity-80 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        id="sidebar"
        className={`fixed top-0 right-0 h-full w-64 bg-primary-olive z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-text-dark"
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
            className={linkStyle('/avions')}
            onClick={toggleSidebar}
          >
            Avions
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
