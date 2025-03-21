import { updateBasicInfo } from "@/redux/features/basicInfoSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

interface IBasicInfo {
  fullName: string;
  designation: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  github: string;
  linkedin: string;
}

const BasicInfo = () => {
  const dispatch = useDispatch();
  const basicInfo = useSelector((state: RootState) => state.basicInfo);

  const handleChange = (field: string, value: string) => {
    dispatch(updateBasicInfo({ field: field as keyof IBasicInfo, value }));
  };

  return (
    <section className="border p-4 rounded-lg">
      <form className="my-5 space-y-4 border p-4 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="name">Full Name</label>
            <input
              value={basicInfo.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              type="text"
              placeholder="Enter your name"
              className="outline-none border rounded-lg px-3 py-2"
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="name">Designation</label>
            <input
              value={basicInfo.designation}
              onChange={(e) => handleChange("designation", e.target.value)}
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
              value={basicInfo.email}
              onChange={(e) => handleChange("email", e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="outline-none border rounded-lg px-3 py-2"
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="name">Phone</label>
            <input
              value={basicInfo.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
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
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="github">GitHub</label>
            <input
              value={basicInfo.github}
              onChange={(e) => handleChange("github", e.target.value)}
              type="url"
              placeholder="Enter your GitHub URL"
              className="outline-none border rounded-lg px-3 py-2"
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="linkedin">LinkedIn</label>
            <input
              value={basicInfo.linkedin}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              type="url"
              placeholder="Enter your LinkedIn URL"
              className="outline-none border rounded-lg px-3 py-2"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="name">Summary</label>
            <textarea
              value={basicInfo.summary}
              onChange={(e) => handleChange("summary", e.target.value)}
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
