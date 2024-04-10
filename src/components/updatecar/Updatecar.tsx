import Input from "../input/Input";
import { useState } from "react";
import { updateCar } from "../helper/carsdata";
interface updatecarProps {
  selectedcar: number | null;
  onCarAdded: () => void;
}

const Updatecar: React.FC<updatecarProps> = ({ selectedcar, onCarAdded }) => {
  const [name, setName] = useState("");
  const [pick, setPick] = useState(false);
  const [color, setColor] = useState("#00FF00");

  const handlePostCar = async () => {
    try {
      const updatedCar = await updateCar(selectedcar, {
        name: name,
        color: color,
      });
      console.log("New car created:", updatedCar);
      onCarAdded();
    } catch (error) {
      console.error("Error creating car:", error);
    }
  };
  return (
    <Input
      id={selectedcar}
      color={color}
      name={name}
      setName={setName}
      pick={pick}
      setColor={setColor}
      setPick={setPick}
      handlePostCar={handlePostCar}
      btnname="update car"
    />
  );
};

export default Updatecar;
