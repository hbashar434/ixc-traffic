import React from "react";
import Link from "next/link";
import {
  FaTachometerAlt,
  FaChartLine,
  FaBookOpen,
  FaFire,
  FaClipboardCheck,
  FaPalette,
  FaCog,
} from "react-icons/fa";

const Sidebar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-blue-600 text-white">
      <div className="p-4 text-2xl font-bold">Traffic</div>
      <nav className="mt-10">
        {/* Iterate over route groups and render them */}
        {routeGroups.map((group, index) => (
          <div key={index} className="mb-10">
            <h3 className="text-sm pl-2 font-light mb-2 text-gray-200">
              {group.title}
            </h3>
            <ul>
              {group.routes.map((route, routeIndex) => (
                <li key={routeIndex} className="mb-1">
                  <Link href={route.path}>
                    <div className="flex items-center p-2 hover:bg-indigo-600 rounded cursor-pointer">
                      <div className="mr-3">{route.icon}</div>
                      {route.name}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

// Define the groups and routes dynamically
const routeGroups = [
  {
    title: "Main",
    routes: [
      { name: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
      { name: "Analytics", path: "/analytics", icon: <FaChartLine /> },
    ],
  },
  {
    title: "Reports",
    routes: [
      { name: "Reports", path: "/reports", icon: <FaBookOpen /> },
      { name: "Trending", path: "/trending", icon: <FaFire /> },
    ],
  },
  {
    title: "Tasks",
    routes: [
      { name: "Tasks", path: "/tasks", icon: <FaClipboardCheck /> },
      { name: "Design", path: "/design", icon: <FaPalette /> },
    ],
  },
  {
    title: "Settings",
    routes: [{ name: "Settings", path: "/settings", icon: <FaCog /> }],
  },
];
