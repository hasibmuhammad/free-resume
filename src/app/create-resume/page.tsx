import Form from "../components/Form/Form";
import Preview from "../components/Preview/Preview";

const CreateResume = () => {
  return (
    <div className="px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div
          className="h-screen overflow-y-auto 
            [&::-webkit-scrollbar]:w-2 
          [&::-webkit-scrollbar-track]:bg-gray-100 
          [&::-webkit-scrollbar-thumb]:bg-gray-200 
            [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          <Form />
        </div>
        <div className="">
          <Preview />
        </div>
      </div>
    </div>
  );
};

export default CreateResume;
