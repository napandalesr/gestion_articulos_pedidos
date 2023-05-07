import axios, { type AxiosStatic } from "axios";

export const httpClient: () => AxiosStatic = () => {
  return axios;
};

export const Config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export const urlBase = "http://localhost:4000";
