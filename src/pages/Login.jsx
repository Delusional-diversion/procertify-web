import { UserContext } from "@/App";
import { Button } from "@/components/ui/button"
import { urlPrefix } from "@/utils/env";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
// import axios from "axios";




const Login = () => {
    const [ values, setValues] = useState({
        email: "hosiyar@gmail.com",
        password: "123",
    }); 
    const {setUser} = useContext(UserContext)

    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(urlPrefix + "/site/sign-in",{
                email:values.email,
                password:values.password,
        })
        // console.log(res.data);
        if(res.data.success){
            sessionStorage.setItem("jwt", res.data.jwt);
            const whoami = await axios.get(urlPrefix + "/site/user/account/whoami", {headers: { "Authorization": "Bearer " + sessionStorage.getItem("jwt") }});
            setUser(res.data.user)
            console.log("this is our user:", whoami.data);
            navigate("/")
          }
    }

  return (
    <section className="bg-gray-50 ">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Link to="/" className="flex items-center mb-6 text-2xl font-bold text-gray-900 ">
          <img className="w-8 h-8 mr-2" src="/assets/logo.png" alt="logo"/>
          ProCertify    
      </Link>
      <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                    Login to your account
              </h1>
              <form
              onSubmit={(e)=>handleSubmit(e)} 
              className="space-y-4 md:space-y-6">
              
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Email" required=""
                        onChange={(e)=>
                        setValues({...values, [e.target.name]: e.target.value})
                        }
                        value={values.email}
                      />
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input  type="password" name="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""
                        onChange={(e)=>
                        setValues({...values, [e.target.name]: e.target.value})
                        }
                        value={values.password}
                      />
                  </div>
                  
                  
                  <Button type="submit" className="w-full text-white bg-rose-600 hover:bg-rose-500   focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</Button>
                  <p className="text-sm font-light text-gray-500">
                      Do not have an account? <Link to="/register" className="text-rose-600 font-medium text-primary-600 hover:underline dark:text-primary-500">Register here</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  )
}

export default Login