"use client";

import useCommon from "@/hooks/useCommon";

const Navbar: React.FC = () => {
  const { reload } = useCommon();

  // Function to delete data (clear local storage)
  const handleDeleteData = () => {
    localStorage.clear();
    alert("Data removed from local storage!");
    reload();
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Traffic Monitor</div>

        <div className="hidden md:flex items-center space-x-6 text-white">
          <button
            onClick={handleDeleteData}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
