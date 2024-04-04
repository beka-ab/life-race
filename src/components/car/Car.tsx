import React, { useEffect, useState } from "react";
import { getCars, postCar } from "../helper/carsdata";

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
  const handlePostCar = async () => {
    try {
      const car = await postCar({
        name: "you know it",
        color: "red",
      });
      console.log("New car created:", car);
    } catch (error) {
      console.error("Error creating car:", error);
    }
  };

  return (
    <>
      <button onClick={handlePostCar}> add car</button>
      <h1> cars</h1>
      {carlist.map((car) => {
        return <div key={car.id}> {car.name}</div>;
      })}
    </>
  );
};

export default Cars;
