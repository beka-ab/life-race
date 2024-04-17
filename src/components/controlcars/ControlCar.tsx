interface controlCarprops {
  getCarIconElement: (carID: number) => HTMLDivElement | null;
  carID: number;
  handleControlEngine: (carID: number, carIcon: HTMLDivElement | null) => void;
  btnname: any;
}

const ControlCar: React.FC<controlCarprops> = ({
  handleControlEngine,
  carID,
  getCarIconElement,
  btnname,
}) => {
  return (
    <button
      className="car-btn"
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
