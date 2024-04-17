import models from "../helper/carModels";

interface CreateHundredCarProps {
  createcar: (name: string, color: string) => void;
}
const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
const CreateHundredCar: React.FC<CreateHundredCarProps> = ({ createcar }) => {
  const GenerateHundred = () => {
    for (let i = 0; i < 100; i++) {
      const randomIndex = Math.floor(Math.random() * models.length);
      const randomModel = models[randomIndex];
      const randomColor = getRandomColor();
      createcar(randomModel, randomColor);
    }
  };

  return (
    <>
      <button className="shadowed-btn" onClick={GenerateHundred}>
        Generate
      </button>
    </>
  );
};

export default CreateHundredCar;
