import { type FC } from "react";
import { LuDollarSign, LuTrendingUp, LuShield } from "react-icons/lu";
import Navbar from "../components/Navbar.tsx";

const LandingPage: FC = () => (
  <div className="min-h-screen p-6 bg-primary-seventh">
    <Navbar />
    <main className="max-w-7xl mx-auto py-12 pt-9 sm:pt-12 md:pt-32 text-primary-first">
      <div className="mb-16 tracking-wide">
        <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold mb-6 leading-[1.3]">
          Solving problems.
          <br />
          Thousands at a time.
        </h1>
        <p className="text-lg max-w-5xl">
          It is a long{" "}
          <span className="font-semibold"> established fact that a reader</span>{" "}
          will be distracted by the readable content of a page when looking at
          its layout. The point of using Lorem Ipsum is that it has a
          more-or-less normal{" "}
          <span className="font-semibold"> distribution of letters </span>, as
          opposed to using 'Content here, content here', making it look like
          readable English.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-8 mt-16">
        <div className="flex space-x-4">
          <LuDollarSign className="size-6 flex-shrink-0" />
          <div>
            <h3 className="font-semibold">Reduce costs by 40%.</h3>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <LuTrendingUp className="size-6 flex-shrink-0" />
          <div>
            <h3 className="font-semibold">
              Increase customer satisfaction by 30%.
            </h3>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <LuShield className="size-6 flex-shrink-0" />
          <div>
            <h3 className="font-semibold">Trusted by those you know.</h3>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default LandingPage;
