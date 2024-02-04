import { UserContext } from "@/App";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { bufferToBase64 } from "@/utils";
const Navbar = () => {
  const {user} = useContext(UserContext)
  console.log(user);
  return (
    <nav className="p-4 bg-transparent flex items-center justify-between sticky top-0 backdrop-filter backdrop-blur-xl">
      <Link to="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-2">
          <img alt="" src="/assets/logo.png"/>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-black">ProCertify</h1>
      </Link>
      <div className="lg:flex gap-x-4 items-center hidden">
        <Link to="/"><p className="text-xl font-semibold px-3 text-black cursor-pointer">Home</p></Link>
        <Link to="/view-certifications"><p className="text-xl font-semibold px-3 text-black cursor-pointer">View Certifications</p></Link>
        <Link to="/view-organisations"><p className="text-xl font-semibold px-3 text-black cursor-pointer">View Organisations</p></Link>
        <Link to="/"><p className="text-xl font-semibold px-3 text-black cursor-pointer">My Certificates</p></Link>
      </div>
      {!user && <div className="flex items-center gap-x-2">
      
      <Link to="/login">
        <Button className="md:text-lg text-sm  bg-rose-600 hover:bg-rose-500">Login</Button>
      </Link>
      <Link to="/register">
        <Button className="md:text-lg text-sm bg-rose-600 hover:bg-rose-500">Register</Button>
      </Link>
    </div>}
    {user && 
    <div className="flex flex-row gap-1 items-center">
    <label className="flex flex-col items-center justify-center w-10 h-10 border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-full">
    <img src={`data:image/jpeg;base64,${bufferToBase64(user.pfp.data)}`} className="w-full h-full rounded-full"/>
    </label>
    <span>{user.govt_id.full_name}</span>
    </div>
    }
    </nav>
  );
};

export default Navbar;
