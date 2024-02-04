import { Button } from "@/components/ui/button";
import { useCallback, useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { UploadCloud } from "lucide-react";
import { useLocation } from "react-router-dom";
import { urlPrefix } from "@/utils/env";
import axios from "axios";
import { UserContext } from "@/App";
// import axios from "axios";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const AccountCreation = () => {
  const {state} = useLocation()
  
  const navigate = useNavigate();
  // console.log(state);
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  const [showModal, setShowModal] = useState(false);
  const {setUser} = useContext(UserContext)

  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(urlPrefix+"/site/sign-up/create-profile", {
            email:values.email,
            password:values.password,
            pfp:imgSrc.split(",")[1],
            govt_id:state.uid,
        });
        // console.log(res.data);
        if(res.data.success){
          sessionStorage.setItem("jwt", res.data.jwt);
          const whoami = await axios.get(urlPrefix + "/site/user/account/whoami", {headers: { "Authorization": "Bearer " + sessionStorage.getItem("jwt") }});
          setUser(whoami.data.payload)
          // console.log("this is our user:", whoami.data.payload);
          navigate("/")
        }
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full my-10 lg:py-0">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-bold text-gray-900 "
        >
          <img className="w-8 h-8 mr-2" src="/assets/logo.png" alt="logo" />
          ProCertify
        </Link>
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
              Create an account
            </h1>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="space-y-4 md:space-y-6"
            >
              <div className="flex items-center justify-center w-full rounded-full">
                {imgSrc ? (
                  <div className="flex flex-col gap-3">
                    <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-full">
                      <img
                        src={imgSrc}
                        alt="webcam"
                        className="w-full h-full rounded-full"
                      />
                    </label>
                    <Button
                      className="bg-rose-600 hover:bg-rose-500 text-md"
                      onClick={retake}
                    >
                      Retake photo
                    </Button>
                  </div>
                ) : (
                  <>
                    <button type="button" onClick={() => setShowModal(true)}>
                      <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-full">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <UploadCloud />
                          <p className="text-sm ">Upload Picture</p>
                        </div>
                      </label>
                    </button>
                    {showModal ? (
                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="flex flex-col items-center justify-center gap-6 relative w-auto my-6 mx-auto max-w-3xl">
                          <div className="bg-slate-200 rounded-lg">
                            <Webcam
                              height={600}
                              width={600}
                              ref={webcamRef}
                              videoConstraints={videoConstraints}
                              className="px-5 py-5"
                            />
                          </div>
                          <div>
                            
                              <Button
                                className="bg-rose-600 hover:bg-rose-500 text-md"
                                onClick={capture}
                              >
                                Capture photo
                              </Button>
                            
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Aadhar Number
                </label>
                <input
                  type="number"
                  name="aadhar"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Aadhar Number"
                  disabled
                  required
                  value = {state.uid}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Name"
                  required
                  disabled
                  value={state.full_name}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Date of Birth
                </label>
                <input
                  name="dob"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Aadhar Number"
                  disabled
                  required
                  value = {state.dob}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Phone
                </label>
                <input
                  name="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Phone Number"
                  disabled
                  required
                  value = {state.phone}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Email"
                  required
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>

              <Button
                type="submit"
                className="w-full text-white bg-rose-600 hover:bg-rose-500   focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </Button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-rose-600 font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountCreation;
