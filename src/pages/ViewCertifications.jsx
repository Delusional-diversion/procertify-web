import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { data } from "../certificationsData"
import { useState } from "react"


const ViewCertifications = () => {

  const [search, setSearch] = useState('');

  return (
    <div className="w-full h-full">
      <Navbar/>
      <div className="flex flex-col justify-center items-center mt-16 h-48 space-y-8">
        <h1 className="text-black text-2xl font-semibold">
          Search For Your Favourite Certifications
        </h1>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input className="text-lg focus-visible:ring-0" type="text" placeholder="Search certifications" onChange={(e) => setSearch(e.target.value)} />
          <Button
            className="text-lg bg-rose-600 hover:bg-rose-500 px-6"
            type="submit"
          >
            Search
          </Button>
        </div>
        </div>
        <div className="flex flex-wrap lg:flex-row flex-col items-center justify-center pt-16 pb-24 gap-8 mx-8">
        
        {data
        .filter((item) => {
          return search.toLowerCase() === ''
            ? item
            : item.label.toLowerCase().includes(search);
        })
        .map((item, idx) => (
          <div key={idx} className="flex flex-col mt-6 text-black bg-slate-100 shadow-md bg-clip-border rounded-xl w-96">
          <img
            className="rounded-xl shadow-lg mt-4 mx-3 h-48"
            src={item.imgSrc}
            alt="card-image"
          />

          <div className="p-6">
            <h5 className="block mb-2 text-xl font-semibold leading-snug tracking-normal text-blue-gray-900">
              {item.label}
            </h5>
            <p className="block text-base font-light leading-relaxed text-inherit">
              {item.desc}
            </p>
          </div>
          <div className="p-6 pt-0">
            <Button
              className="align-middle select-none font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button"
            >
              Take Test
            </Button>
          </div>
        </div>
        ))}

      </div>
    </div>
  )
}

export default ViewCertifications