import axios from "axios";
import { PromiseResponse } from "./apiBaseService";

// ==========================================================================================

export type DeskyThemeMap = Record<string, DeskyTheme>

export interface DeskyTheme {
  [key: string]: string;
}

// ==========================================================================================

export const fetchTheme = async (): PromiseResponse<DeskyThemeMap> => {
    return axios
      .get<DeskyThemeMap>("/api/theme")
      .then((response) => ({ Data: response.data, Code: response.status }))
      .catch((err) => {
        throw new Error("Fetch theme failed: " + err.message);
      });
};

export const setupBackground = () => {
  document.body.setAttribute("style", `
    background-image: url('/api/background');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  `);
}