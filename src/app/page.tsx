import FileUpload from "@/components/FileUpload";
import Navbar from "@/components/Navbar";

const HomePage = () => {
  console.log(process.env.MONGODB_URI);

  return (
    <section>
      <Navbar />
      <FileUpload />
    </section>
  );
};

export default HomePage;
