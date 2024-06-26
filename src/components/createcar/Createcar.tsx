import { useState } from "react";
import { postCar } from "../helper/carsdata";
import Input from "../input/Input";
import CreateHundredCar from "./CreateHundredCar";

import "./createcar.css";

interface CreateCarProps {
  onCarAdded: () => void;
}

const Createcar: React.FC<CreateCarProps> = ({ onCarAdded }) => {
  const [name, setName] = useState(``);
  const [pick, setPick] = useState(false);
  const [color, setColor] = useState("#00FF00");

  const handlePostCar = async (name: string, color: string) => {
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
      <Input
        color={color}
        name={name}
        setName={setName}
        pick={pick}
        setColor={setColor}
        setPick={setPick}
        handlePostCar={handlePostCar}
        btnname="create car"
      />
      <CreateHundredCar createcar={handlePostCar} />
    </>
  );
};

export default Createcar;
