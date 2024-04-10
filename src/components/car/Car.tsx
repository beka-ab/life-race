import React, { useEffect, useState, useRef } from "react";
import { getCars, removeCar, startStopEngine } from "../helper/carsdata";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./car.css";
import Createcar from "../createcar/Createcar";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import Updatecar from "../updatecar/Updatecar";
import ControlCar from "../controlcars/ControlCar";
import EditOrRemoveCar from "../deletecar/EditOrRemoveCar";
interface Car {
  name: string;
  color: string;
  id: number;
}

const Cars: React.FC = () => {
  const [carlist, setCarlist] = useState<Car[]>([]);
  const [selectedcar, setSelectedCar] = useState<null | number>(null);
  const carIconRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [isRaceStarted, setIsRaceStarted] = useState(false);
  const getCarIconElement = (carId: number): HTMLDivElement | null => {
    return carIconRefs.current[carId];
  };

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

  const handleStartEngine = async (
    carId: number,
    carIcon: HTMLDivElement | null
  ) => {
    if (carId && carIcon) {
      try {
        const response = await startStopEngine(carId, "started");

        console.log(carId);
        const animationDuration = response.distance / response.velocity / 1000;
        carIcon.style.transition = `left ${animationDuration}s ease-in-out`;
        carIcon.style.left = `${response.distance / 1000}px`;
      } catch (error) {
        console.error("Error starting engine:", error);
      }
    }
  };

  const handleStopEngine = async (
    carId: number,
    carIcon: HTMLDivElement | null
  ) => {
    if (carId && carIcon) {
      try {
        const response = await startStopEngine(carId, "stopped");
        carIcon.style.left = `${response.distance / 6250}px`;
        console.log(response);
      } catch (error) {
        console.error("Error stopping engine:", error);
      }
    }
  };
  const handleStartRace = async () => {
    setIsRaceStarted(true);
    const startPromises = carlist.map(async (car) => {
      const carIcon = carIconRefs.current[car.id];
      if (carIcon) {
        return handleStartEngine(car.id, carIcon);
      }
    });
    await Promise.all(startPromises);
  };
  return (
    <div className="car-container">
      <Createcar onCarAdded={handleCarAdded} />
      <Updatecar selectedcar={selectedcar} onCarAdded={handleCarAdded} />
      <button onClick={handleStartRace}> start race</button>

      <h1> cars</h1>
      {carlist.map((car) => {
        return (
          <div className="car-wrapper" key={car.id}>
            <div className="car-btns">
              <EditOrRemoveCar
                handleRemove={setSelectedCar}
                carID={car.id}
                btnname="select car"
              />
              <EditOrRemoveCar
                handleRemove={handleRemove}
                carID={car.id}
                btnname="Remove car"
              />
              <ControlCar
                getCarIconElement={getCarIconElement}
                handleControlEngine={handleStartEngine}
                carID={car.id}
                btnname="start engine"
              />
              <ControlCar
                getCarIconElement={getCarIconElement}
                handleControlEngine={handleStopEngine}
                carID={car.id}
                btnname="stop engine"
              />
            </div>
            <div
              className={`car-icon-container ${car.id}  `}
              ref={(element) => (carIconRefs.current[car.id] = element)}
              style={{ left: `80px` }}
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
