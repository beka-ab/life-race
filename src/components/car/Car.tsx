import React, { useEffect, useState, useRef } from "react";
import { getCars, removeCar, startStopEngine } from "../helper/carsdata";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./car.css";
import Createcar from "../createcar/Createcar";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import Updatecar from "../updatecar/Updatecar";
import { EngineResponse } from "../helper/carsdata";

interface Car {
  name: string;
  color: string;
  id: number;
}

const Cars: React.FC = () => {
  const [carlist, setCarlist] = useState<Car[]>([]);
  const [selectedcar, setSelectedCar] = useState<null | number>(null);
  const [engineData, setEngineData] = useState<EngineResponse | null>(null);
  const [carPosition, setCarPosition] = useState(80);
  const carIconRef = useRef<HTMLDivElement>(null);

  const fetchCars = async () => {
    try {
      const cars = await getCars(1, 11);

      setCarlist(cars);
    } catch (error) {}
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
    } catch (error) {}
  };

  const handleStartEngine = async (carId: number) => {
    if (carId) {
      try {
        const response = await startStopEngine(carId, "started");

        setEngineData(response);
      } catch (error) {
        console.error("Error starting engine:", error);
      }
    }
  };

  const handleStopEngine = async () => {
    if (selectedcar) {
      try {
        const response = await startStopEngine(selectedcar, "stopped");
      } catch (error) {
        console.error("Error stopping engine:", error);
      }
    }
  };

  useEffect(() => {
    if (engineData) {
      const animationDuration =
        engineData.distance / engineData.velocity / 1000;
      const carIcon = carIconRef.current;
      if (carIcon) {
        carIcon.style.transition = `left ${animationDuration}s ease-in-out`;
        console.log(animationDuration);
        carIcon.style.left = `${engineData.distance / 1000}px`;
      }
    }
  }, [engineData]);

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
              <button
                onClick={() => {
                  handleStartEngine(car.id);
                }}
              >
                Start Engine
              </button>
              <button onClick={handleStopEngine}>Stop Engine</button>
            </div>
            <div
              className="car-icon-container"
              ref={carIconRef}
              style={{ left: `${carPosition}px` }}
            >
              <FontAwesomeIcon
                icon={faCarSide}
                color={car.color}
                className="car-icon"
              />
            </div>
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
