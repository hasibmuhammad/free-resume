import { useEffect, useState } from "react";
import EyeOpen from "../Icons/EyeOpen";
import ArrowDown from "../Icons/ArrowDown";
import EyeClose from "../Icons/EyeClose";
import Close from "../Icons/Close";

const Skill = () => {
  const [show, setShow] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [removedSkills, setRemovedSkills] = useState<string[]>([]); // To store removed skills for undo

  const handleToggle = () => {
    setShow(!show);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      setSkills((prev) => [...prev, inputValue.trim()]);
      setInputValue(""); // Clear input after adding skill
    } else if (
      e.key === "Backspace" &&
      inputValue === "" &&
      skills.length > 0
    ) {
      removeSkill(skills.length - 1);
    }
  };

  const removeSkill = (index: number) => {
    const skillToRemove = skills[index];
    setSkills((prev) => prev.filter((_, i) => i !== index));
    setRemovedSkills((prev) => [skillToRemove, ...prev]);
  };

  useEffect(() => {
    const handleUndo = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "z") {
        console.log(e.ctrlKey, e.key);
        e.preventDefault();
        // do the undo here
        console.log(removedSkills);
        if (removedSkills.length > 0) {
          const skillToUndo = removedSkills[0];
          setSkills((prev) => [...prev, skillToUndo]);
          setRemovedSkills((prev) => prev.slice(1));
        }
      }
    };

    window.addEventListener("keydown", handleUndo);

    return () => {
      window.removeEventListener("keydown", handleUndo);
    };
  }, [removedSkills]);

  return (
    <section className="border p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Skill</h1>
        <div className="flex items-center gap-2">
          <button>
            <ArrowDown />
          </button>
          <button onClick={handleToggle}>
            {show ? <EyeOpen /> : <EyeClose />}
          </button>
        </div>
      </div>
      <hr />

      <div className="my-5 space-y-4">
        <div className="w-full flex flex-col gap-1">
          <label>Add Skill</label>
          <div className="flex flex-wrap items-center gap-1 border rounded-lg px-3 py-2">
            {/* Display skills inside the input */}
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center bg-black text-white px-3 py-1 rounded-full"
              >
                <span>{skill}</span>

                <button
                  onClick={() => removeSkill(index)}
                  className="ml-2 text-white"
                >
                  <Close />
                </button>
              </div>
            ))}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type and press Enter..."
              className="outline-none flex-1"
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skill;
