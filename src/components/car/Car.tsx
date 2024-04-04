import React, { useEffect, useState } from "react";
import { getCars } from "../helper/carsdata";

interface Car {
  name: string;
  color: string;
  id: number;
}

const Cars: React.FC = () => {
  const [carlist, setCarlist] = useState<Car[]>([]);
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const cars = await getCars(1, 10);
        console.log(cars);
        setCarlist(cars);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCars();
  }, []);
  return (
    <>
      <h1> cars</h1>
      {carlist.map((car) => {
        return <div key={car.id}> {car.name}</div>;
      })}
    </>
  );
};

export default Cars;
