interface controlCarprops {
  getCarIconElement: (carID: number) => HTMLDivElement | null;
  carID: number;
  handleControlEngine: (carID: number, carIcon: HTMLDivElement | null) => void;
  btnname: string;
}

const ControlCar: React.FC<controlCarprops> = ({
  handleControlEngine,
  carID,
  getCarIconElement,
  btnname,
}) => {
  return (
    <button
      onClick={() => {
        const carIcon = getCarIconElement(carID);
        handleControlEngine(carID, carIcon);
      }}
    >
      {btnname}
    </button>
  );
};

export default ControlCar;
