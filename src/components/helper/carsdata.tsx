import axios, { AxiosResponse } from "axios";

interface Car {
  name: string;
  color: string;
  id: number;
}

export const getCars = async (page?: number, limit?: number) => {
  try {
    const response: AxiosResponse<Car[]> = await axios.get("/garage", {
      baseURL: "http://127.0.0.1:3000",
      params: { _page: page, _limit: limit },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
