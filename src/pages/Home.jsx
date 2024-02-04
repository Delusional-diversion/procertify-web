import Collab from "@/components/Collab";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ViewCertifications from "@/components/Featured";


const Home = () => {
  return (
    <div className="bg-white w-full">
      <Navbar/>
      <Hero/>
      <Collab/>
      <ViewCertifications/>
    </div>
  );
};

export default Home;
