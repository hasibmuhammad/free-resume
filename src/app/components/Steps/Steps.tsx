const Steps = () => {
  const steps = ["Create Resume", "Get Realtime Preview", "Download Resume"];
  return (
    <section className="max-w-6xl mx-auto bg-black rounded-3xl text-white p-10 my-20">
      <div className="flex flex-col md:flex-row md:justify-around gap-10">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-2">
            <h3 className="flex-shrink-0 w-10 h-10 border-2 border-dashed rounded-full flex justify-center items-center font-bold">
              {index + 1}
            </h3>
            <p>{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Steps;
