import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-center my-20">
      <div>
        <div className="space-y-3">
          <h1 className="text-3xl lg:text-5xl font-bold">
            Create a professional <br /> resume today.
          </h1>
          <p>
            With this lifetime free, and powerful <br /> resume builder
          </p>
        </div>
        <div className="mt-4">
          <Link href={"/create-resume"}>
            <button className="px-5 py-3 rounded-full bg-black text-white font-medium flex items-center gap-2">
              Create Resume <span>→</span>
            </button>
          </Link>
        </div>
      </div>
      <Image
        src={"/images/hero.jpg"}
        alt="Hero Image"
        width={600}
        height={600}
      />
    </div>
  );
};

export default Hero;
