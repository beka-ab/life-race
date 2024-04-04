import React, { useEffect, useState } from "react";
import { getCars } from "../helper/carsdata";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Createcar from "../createcar/Createcar";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";

interface Car {
  name: string;
  color: string;
  id: number;
}

const Cars: React.FC = () => {
  const [carlist, setCarlist] = useState<Car[]>([]);

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
    <>
      <Createcar onCarAdded={handleCarAdded} />
      <h1> cars</h1>
      {carlist.map((car) => {
        return (
          <div key={car.id}>
            <FontAwesomeIcon icon={faCarSide} color={car.color} />
            <span> {car.name}</span>
          </div>
        );
      })}
    </>
  );
};

export default Cars;
