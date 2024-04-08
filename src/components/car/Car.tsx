import React, { useEffect, useState } from "react";
import { getCars, removeCar } from "../helper/carsdata";
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
      const cars = await getCars(1, 11);
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

  const handleRemove = async (carId: number) => {
    try {
      await removeCar(carId);
      await fetchCars();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="car-container">
      <Createcar onCarAdded={handleCarAdded} />
      <Updatecar selectedcar={selectedcar} onCarAdded={handleCarAdded} />

      <h1> cars</h1>
      {carlist.map((car) => {
        return (
          <div className="car-wrapper" key={car.id}>
            <div className="car-btns">
              <button
                onClick={() => {
                  setSelectedCar(car.id);
                  console.log(selectedcar);
                }}
              >
                Select
              </button>
              <button
                onClick={() => {
                  handleRemove(car.id);
                }}
              >
                Remove
              </button>
            </div>
            <FontAwesomeIcon
              icon={faCarSide}
              color={car.color}
              className="car-icon"
            />
            <div className="start-line">
              <span className="start-text">start ////</span>
            </div>
            <span> {car.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Cars;
