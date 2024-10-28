import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const MainPage = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="ml-48 p-8 w-full">{children}</div>
      </div>
    </section>
  );
};

export default MainPage;
