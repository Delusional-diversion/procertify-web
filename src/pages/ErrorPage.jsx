import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"


const ErrorPage = () => {
  return (
    <div className="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
            <div className="w-full lg:w-1/2">
                <img className="hidden lg:block" src="/assets/error.png" alt="error" />
                
            </div>
            <div className="w-full lg:w-1/2">
                <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800">Looks like you have found the doorway to the great nothing</h1>
                <p className="py-4 text-base text-gray-800">The content you are looking for does not exist. Either it was removed, or you mistyped the link.</p>
                <p className="py-2 text-base text-gray-800">Sorry about that! Please visit our hompage to get where you need to go.</p>
                <Link to='/'>
                <Button className="w-full text-lg lg:w-auto my-4 border rounded-md px-1 sm:px-16 py-5 bg-rose-600 text-white hover:bg-rose-500 focus:outline-none">Go back to Homepage</Button>
                </Link>
            </div>
        </div>
  )
}

export default ErrorPage