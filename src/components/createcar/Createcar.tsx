import { useState, useRef, useEffect } from "react";
import { postCar } from "../helper/carsdata";
import { ChromePicker } from "react-color";

import "./createcar.css";

interface CreateCarProps {
  onCarAdded: () => void;
}

const Createcar: React.FC<CreateCarProps> = ({ onCarAdded }) => {
  const [name, setName] = useState("");
  const [pick, setPick] = useState(false);
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
      <div className="createcar-form">
        <input
          type="text"
          placeholder="enter model name here ..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="colorpallete">
          {pick ? (
            <div className="colorpallete-picker">
              <ChromePicker
                color={color}
                onChange={(newColor) => setColor(newColor.hex)}
              />
              <button
                className="close-picker"
                style={{ color: color }}
                onClick={() => setPick(false)}
              >
                X
              </button>
            </div>
          ) : (
            <div
              className="color-picker"
              style={{ backgroundColor: color }}
              onClick={() => {
                setPick(true);
                console.log(pick);
              }}
            ></div>
          )}
        </div>
      </div>

      <button onClick={handlePostCar}> Create Car</button>
    </>
  );
};

export default Createcar;
