import axios, { AxiosResponse } from "axios";

const baseURL = "http://127.0.0.1:3000";

const garageURL = `${baseURL}/garage`;
const winnersURL = `${baseURL}/winners`;
const engineURL = `${baseURL}/engine`;

interface Car {
  name: string;
  color: string;
  id: number;
}

interface EngineResponse {
  velocity: number;
  distance: number;
}
interface EngineResponse {
  success: boolean;
}
interface Winner {
  id: number;
  wins: number;
  time: number;
}

export const getCars = async (page?: number, limit?: number) => {
  try {
    const params: { [_: string]: any } = {};
    if (page) params._page = page;
    if (limit) params._limit = limit;

    const response: AxiosResponse<Car[]> = await axios.get("/garage", {
      baseURL: "http://127.0.0.1:3000",
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postCar = async (carData: { name: string; color: string }) => {
  try {
    const response: AxiosResponse<Car> = await axios.post("/garage", carData, {
      baseURL: "http://127.0.0.1:3000",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCar = async (
  id: number | null,
  carData: { name: string; color: string }
): Promise<Car> => {
  try {
    const response: AxiosResponse<Car> = await axios.put(
      `/garage/${id}`,
      carData,
      {
        baseURL: "http://127.0.0.1:3000",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const removeCar = async (id: number | null): Promise<Car> => {
  try {
    const response: AxiosResponse<Car> = await axios.delete(`/garage/${id}`, {
      baseURL: "http://127.0.0.1:3000",
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const startStopEngine = async (
  id: number,
  status: "started" | "stopped"
): Promise<EngineResponse> => {
  try {
    const response: AxiosResponse<EngineResponse> = await axios.patch(
      "/engine",
      null,
      {
        baseURL: "http://127.0.0.1:3000",
        params: { id, status },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

///////
export const switchToDriveMode = async (carId: number) => {
  try {
    const response = await axios.patch(`${engineURL}?id=${carId}&status=drive`);

    if (response.status === 200) {
    } else {
      console.error("Failed to switch engine to drive mode:", response.data);
    }
  } catch (error) {
    console.error("Error switching engine to drive mode:", error);
  }
};

//////

export const fetchWinnersData = async (
  updateWinners: (winners: Winner[]) => void
) => {
  try {
    const baseURL = "http://127.0.0.1:3000";
    const winnersURL = `${baseURL}/winners`;

    const response: AxiosResponse<Winner[]> = await axios.get(winnersURL);

    if (response.status === 200) {
      updateWinners(response.data);
    } else {
      console.error("Failed to fetch winners data:", response.data);
    }
  } catch (error) {
    console.error("Error fetching winners data:", error);
  }
};
