import { useState } from "react";
import { postCar } from "../helper/carsdata";
import { ChromePicker } from "react-color";

import "./createcar.css";

interface CreateCarProps {
  onCarAdded: () => void;
}

const Createcar: React.FC<CreateCarProps> = ({ onCarAdded }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#00FF00");
  const handlePostCar = async () => {
    try {
      const car = await postCar({
        name: name,
        color: color,
      });
      console.log("New car created:", car);
      onCarAdded();
    } catch (error) {
      console.error("Error creating car:", error);
    }
  };
  return (
    <>
      <input
        type="text"
        placeholder="enter model name here ..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="colorpallete">
        <ChromePicker
          color={color}
          onChange={(newColor) => setColor(newColor.hex)}
        />
      </div>

      <button onClick={handlePostCar}> Create Car</button>
    </>
  );
};

export default Createcar;
