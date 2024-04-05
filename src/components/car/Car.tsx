import React, { useEffect, useState } from "react";
import { getCars } from "../helper/carsdata";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./car.css";
import Createcar from "../createcar/Createcar";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import Updatecar from "../updatecar/Updatecar";

interface Car {
  name: string;
  color: string;
  id: number;
}

const Cars: React.FC = () => {
  const [carlist, setCarlist] = useState<Car[]>([]);
  const [selectedcar, setSelectedCar] = useState<null | number>(null);

  const fetchCars = async () => {
    try {
      const cars = await getCars(1, 10);
      console.log(cars);
      setCarlist(cars);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCars();
  }, []);

  const handleCarAdded = async () => {
    await fetchCars();
  };

  return (
    <div className="car-container">
      <Createcar onCarAdded={handleCarAdded} />
      <Updatecar selectedcar={selectedcar} onCarAdded={handleCarAdded} />

      <h1> cars</h1>
      {carlist.map((car) => {
        return (
          <div className="car-wrapper" key={car.id}>
            <span> {car.name}</span>
            <div className="car-btns">
              <button
                onClick={() => {
                  setSelectedCar(car.id);
                  console.log(selectedcar);
                }}
              >
                Select
              </button>
              <button>Remove</button>
            </div>
            <FontAwesomeIcon
              icon={faCarSide}
              color={car.color}
              className="car-icon"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cars;
