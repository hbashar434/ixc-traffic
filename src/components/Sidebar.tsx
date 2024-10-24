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
  FaExclamationCircle,
  FaArrowDown,
} from "react-icons/fa";

const Sidebar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-52 bg-blue-600 text-white flex flex-col justify-between">
      <div>
        <div className="p-4 text-xl font-bold text-center">IXC Traffic</div>
        <nav className="mt-10">
          {/* Iterate over route groups and render them */}
          {routeGroups.map((group, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-sm pl-2 font-light mb-2 text-gray-200">
                {group.title}
              </h3>
              <ul>
                {group.routes.map((route, routeIndex) => (
                  <li key={routeIndex}>
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

      {/* Static Settings Route */}
      <div className="p-4">
        <Link href="/settings">
          <div className="flex items-center p-2 hover:bg-indigo-600 rounded cursor-pointer">
            <FaCog className="mr-3" />
            Settings
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

// Define the groups and routes dynamically with new icons
const routeGroups = [
  {
    title: "Analytics",
    routes: [
      { name: "Unknown", path: "/", icon: <FaTachometerAlt /> },
      {
        name: "Zero ACD/ASR",
        path: "/analytics",
        icon: <FaExclamationCircle />,
      },
      { name: "Low ACD", path: "/analytics/low-acd", icon: <FaArrowDown /> },
      { name: "Low ASR", path: "/analytics/low-asr", icon: <FaChartLine /> },
      {
        name: "High PDD",
        path: "/analytics/high-pdd",
        icon: <FaExclamationCircle />,
      },
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
];
