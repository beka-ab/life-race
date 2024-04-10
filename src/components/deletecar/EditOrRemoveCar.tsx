import "./deletecar.css";
interface editorremoveCarprops {
  handleRemove: (carID: number) => void;
  carID: number;
  btnname: string;
}

const EditOrRemoveCar: React.FC<editorremoveCarprops> = ({
  handleRemove,
  carID,
  btnname,
}) => {
  return (
    <button
      onClick={() => {
        handleRemove(carID);
      }}
    >
      {btnname}
    </button>
  );
};

export default EditOrRemoveCar;
