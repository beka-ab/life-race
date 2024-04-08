interface CreateHundredCarProps {
  createcar: () => void;
}

const CreateHundredCar: React.FC<CreateHundredCarProps> = ({ createcar }) => {
  console.log("genetare clicked");
  const GenerateHundred = () => {
    for (let i = 0; i < 100; i++) {
      createcar();
    }
  };
  return (
    <>
      <button onClick={GenerateHundred}>Generate</button>
    </>
  );
};

export default CreateHundredCar;
