import axios, { AxiosResponse } from "axios";
const baseURL = "http://127.0.0.1:3000";
interface Car {
  name: string;
  color: string;
  id: number;
}

export interface EngineResponse {
  velocity: number;
  distance: number;
}

export const getCars = async (page?: number, limit?: number) => {
  try {
    const response: AxiosResponse<Car[]> = await axios.get("/garage", {
      baseURL: `${baseURL}`,
      params: { _page: page, _limit: limit },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postCar = async (carData: { name: string; color: string }) => {
  try {
    const response: AxiosResponse<Car> = await axios.post("/garage", carData, {
      baseURL: `${baseURL}`,
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
        baseURL: `${baseURL}`,
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
      baseURL: `${baseURL}`,
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
        baseURL: `${baseURL}`,
        params: { id, status },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
