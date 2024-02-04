import { urlPrefix } from "@/utils/env";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const [aadhar, setAadhar] = useState('');
  const [otp, setOtp] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(urlPrefix+"/site/sign-up/aadhaar/verify-otp", {
      data: {
        otp: otp,
        govt_uid: aadhar ,
      }
    })
    console.log(res.data);
    if(res.data.success){
      navigate("/account-creation",{
        state: (res).data.payload
      });

    }
    else
      alert("OTP Not Recognized");
}

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-bold text-gray-900 "
        >
          <img className="w-8 h-8 mr-2" src="/assets/logo.png" alt="logo" />
          ProCertify
        </Link>
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-xl text-center">
              Select Country
            </h1>
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-4 md:space-y-6 flex justify-center flex-col">
              <select
                className="h-10 px-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                required
              >
                <option value="australia">Australia</option>
                <option value="india">India</option>
                <option value="nepal">Nepal</option>
                <option value="srilanka">Sri Lanka</option>
              </select>
              {selectedCountry === "india" && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Aadhar Number
                  </label>
                  <div className="flex gap-4">
                    <input
                      name="aadhar"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Aadhar Number"
                      required
                      onChange={(e) =>
                    setAadhar(e.target.value)
                  }
                    />
                    <button
                      className="bg-rose-600 hover:bg-rose-500 w-24 h-10 rounded-md text-white text-md font-semibold"
                      onClick={async(e) => {
                        e.preventDefault();
                        const res = await axios.post(urlPrefix+"/site/sign-up/aadhaar/request-otp", {
                          data: {
                            country: selectedCountry,
                            govt_uid: aadhar ,
                          }
                        })
                        if (res.data.success) setClicked(true);
                        else alert("Aadhaar couldn't be verfied.");
                      }}
                    >
                      Verify
                    </button>
                  </div>
                </div>
              )}
              {clicked && (
                <div className="flex flex-col gap-3">
                  <input
                    type="number"
                    name="otp"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter OTP"
                    required
                    value={otp}
                    onChange={(e) =>
                    setOtp(e.target.value)}
                  />
                  <button
                      className="bg-rose-600 hover:bg-rose-500 w-24 h-10 rounded-md text-white text-md font-semibold"
                      type="submit"
                      onClick={() => {
                        
                      }}
                      
                    >
                      Proceed
                    </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
