import { useState } from "react";
import EyeOpen from "../Icons/EyeOpen";
import EyeClose from "../Icons/EyeClose";

const BasicInfo = () => {
  const [show, setShow] = useState(true);
  const handleToggle = () => {
    setShow(!show);
  };
  return (
    <section className="border p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Basic Info</h1>
        <div>
          <button onClick={handleToggle}>
            {show ? <EyeOpen /> : <EyeClose />}
          </button>
        </div>
      </div>
      <hr />
      <form className="my-5 space-y-4 border p-4 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="outline-none border rounded-lg px-3 py-2"
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="name">Designation</label>
            <input
              type="text"
              placeholder="Enter your designation"
              className="outline-none border rounded-lg px-3 py-2"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="name">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="outline-none border rounded-lg px-3 py-2"
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="name">Phone</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Enter your phone number"
              className="outline-none border rounded-lg px-3 py-2 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onKeyDown={(e) => {
                if (
                  !/^[0-9]$/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Delete"
                ) {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="name">Summary</label>
            <textarea
              placeholder="Enter summary"
              className="outline-none border rounded-lg px-3 py-2 [&::-webkit-scrollbar]:w-2 
          [&::-webkit-scrollbar-track]:bg-gray-100 
          [&::-webkit-scrollbar-thumb]:bg-gray-200 
            [&::-webkit-scrollbar-thumb]:rounded-full"
              rows={5}
            ></textarea>
          </div>
        </div>
      </form>
    </section>
  );
};

export default BasicInfo;
