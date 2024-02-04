import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="bg-[url(/assets/hero.png)] bg-cover bg-center bg-no-repeat">
      <div className="inset-0  bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

      <div className="mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Unlock Your
            <strong className="block font-extrabold text-rose-600">
              {" "}
              Potential.{" "}
            </strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl/relaxed font-semibold">
          Welcome to ProCertify, where expertise meets efficiency. Say goodbye to long, tedious courses and hello to instant skill validation!
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center justify-center">
          <Link to="/register">
            <Button
              className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-500 focus:outline-none focus:ring sm:w-auto"
            >
              Get Started
            </Button>
            </Link>
            <Link>
            <Button
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 hover:bg-white focus:outline-none focus:ring  sm:w-auto"
            >
              Learn More
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
