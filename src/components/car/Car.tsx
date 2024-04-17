import React, { useEffect, useState, useRef } from "react";
import { getCars, removeCar, startStopEngine } from "../helper/carsdata";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./car.css";
import Createcar from "../createcar/Createcar";
import {
  faCarSide,
  faPlay,
  faTrash,
  faHand,
  faArrowPointer,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";

import Updatecar from "../updatecar/Updatecar";
import ControlCar from "../controlcars/ControlCar";
import EditOrRemoveCar from "../deletecar/EditOrRemoveCar";
import Pagination from "../pagination";
import Header from "../header/Header";
interface Car {
  name: string;
  color: string;
  id: number;
}

const Garage: React.FC = () => {
  const [carlist, setCarlist] = useState<Car[]>([]);
  const [selectedcar, setSelectedCar] = useState<null | number>(null);
  const carIconRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [isRaceStarted, setIsRaceStarted] = useState(false);
  const getCarIconElement = (carId: number): HTMLDivElement | null => {
    return carIconRefs.current[carId];
  };
  const [currentPage, setCurrentpage] = useState(1);
  const [carPerPage] = useState(7);

  const paginate = (pageNumber: number) => {
    setCurrentpage(pageNumber);
    console.log(currentCars);
  };

  const fetchCars = async () => {
    try {
      const cars = await getCars(1, 500);

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
        carIcon.style.left = `${response.distance / 6000}vw`;
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
        carIcon.style.left = `7vw`;
        console.log(response.distance);
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

  const resetCarPosition = () => {
    Object.values(carIconRefs.current).forEach((carIcon) => {
      if (carIcon) {
        carIcon.style.left = `7vw`;
      }
    });
  };

  const indexOfLastCar = currentPage * carPerPage;
  const indexOfFirstCar = indexOfLastCar - carPerPage;
  const currentCars = carlist.slice(indexOfFirstCar, indexOfLastCar);

  return (
    <div className="car-container">
      <Header />
      <Createcar onCarAdded={handleCarAdded} />
      <Updatecar selectedcar={selectedcar} onCarAdded={handleCarAdded} />
      <button className="shadowed-btn" onClick={handleStartRace}>
        start race
      </button>

      <button className="shadowed-btn" onClick={resetCarPosition}>
        Reset Cars
      </button>
      <h1 className="cars-headline"> cars</h1>
      <p className="cars-headline">Total Cars: {carlist.length}</p>
      {currentCars.map((car) => {
        return (
          <div className="car-wrapper" key={car.id}>
            <div className="car-btns">
              <div className="edit-remove">
                <EditOrRemoveCar
                  handleRemove={setSelectedCar}
                  carID={car.id}
                  btnname={
                    <FontAwesomeIcon icon={faArrowPointer} color={car.color} />
                  }
                />
                <EditOrRemoveCar
                  handleRemove={handleRemove}
                  carID={car.id}
                  btnname={<FontAwesomeIcon icon={faTrash} color={car.color} />}
                />
              </div>
              <div className="control-car">
                {" "}
                <ControlCar
                  getCarIconElement={getCarIconElement}
                  handleControlEngine={handleStartEngine}
                  carID={car.id}
                  btnname={<FontAwesomeIcon icon={faPlay} color={car.color} />}
                />
                <ControlCar
                  getCarIconElement={getCarIconElement}
                  handleControlEngine={handleStopEngine}
                  carID={car.id}
                  btnname={<FontAwesomeIcon icon={faHand} color={car.color} />}
                />
              </div>
            </div>

            <div
              className={`car-icon-container ${car.id}  `}
              ref={(element) => (carIconRefs.current[car.id] = element)}
              style={{ left: `7vw` }}
            >
              <FontAwesomeIcon
                icon={faCarSide}
                color={car.color}
                className="car-icon"
              />
            </div>

            <span className="car-name" style={{ color: car.color }}>
              {" "}
              {car.name}
            </span>
          </div>
        );
      })}
      <Pagination
        carPerPage={carPerPage}
        totalCars={carlist.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Garage;
