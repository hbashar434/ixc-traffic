import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import FileUpload from "@/components/FileUpload";

const HomePage = () => {
  return (
    <section>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="ml-48 p-4 w-full">
          <FileUpload />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
