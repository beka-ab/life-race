import "./deletecar.css";
interface editorremoveCarprops {
  handleRemove: (carID: number) => void;
  carID: number;
  btnname: any;
}

const EditOrRemoveCar: React.FC<editorremoveCarprops> = ({
  handleRemove,
  carID,
  btnname,
}) => {
  return (
    <button
      className="car-btn"
      onClick={() => {
        handleRemove(carID);
      }}
    >
      {btnname}
    </button>
  );
};

export default EditOrRemoveCar;
