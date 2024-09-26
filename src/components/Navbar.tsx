"use client";

import { useState } from "react";
import Link from "next/link";

interface Route {
  name: string;
  path: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // List of navigation routes
  const routes: Route[] = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/" },
    { name: "Reports", path: "/" },
    { name: "Settings", path: "/" },
  ];

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Traffic Monitor</div>

        <div className="hidden md:flex space-x-6 text-white">
          {routes.map((route) => (
            <Link
              key={route.name}
              href={route.path}
              className="hover:text-gray-200"
            >
              {route.name}
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 text-white">
          {routes.map((route) => (
            <Link
              key={route.name}
              href={route.path}
              className="block hover:text-gray-200"
            >
              {route.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
