import { ChromePicker } from "react-color";

interface InputProps {
  color: string;
  name: string;
  setName: (name: string) => void;
  pick: boolean;
  setColor: (color: string) => void;
  setPick: (pick: boolean) => void;
  handlePostCar: () => void;
}

const Input: React.FC<InputProps> = ({
  color,
  name,
  setName,
  pick,
  setColor,
  setPick,
  handlePostCar,
}) => {
  return (
    <div className="createcar-container">
      <div className="createcar-form">
        <input
          style={{ color: color }}
          className="carname-input"
          type="text"
          placeholder="enter model ..."
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
    </div>
  );
};

export default Input;
