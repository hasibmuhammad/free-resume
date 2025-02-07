import Form from "../components/Form/Form";
import Preview from "../components/Preview/Preview";

const CreateResume = () => {
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <Form />
        <Preview />
      </div>
    </div>
  );
};

export default CreateResume;
