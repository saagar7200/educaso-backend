import { Environment } from "../constants/global";
import path from "path";
export const getUploadFolderPath = () => {
  if (process.env.NODE_ENV === Environment.PRODUCTION) {
    return path.resolve(process.cwd(), "public", "uploads");
  }
  return path.join(__dirname, "..", "..", "public", "uploads");
};

export const getTempFolderPath = () => {
  if (process.env.NODE_ENV === Environment.PRODUCTION) {
    return path.resolve(process.cwd(), "public", "uploads", "temp");
  }
  return path.join(__dirname, "..", "..", "public", "uploads", "temp");
};
