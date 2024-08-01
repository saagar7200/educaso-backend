import { Environment } from "../constants/global";
import fs from "fs";
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

export const transferImageFromTempTOUploadFolder = (type: string,name:string) => {
  const TEMP_FOLDER_PATH = path.join(getTempFolderPath(), name);

  const UPLOAD_FOLDER_PATH = path.join(
    getUploadFolderPath(),

    type.toLowerCase()
  );
  !fs.existsSync(UPLOAD_FOLDER_PATH) &&
    fs.mkdirSync(UPLOAD_FOLDER_PATH, { recursive: true });

  fs.renameSync(TEMP_FOLDER_PATH, path.join(UPLOAD_FOLDER_PATH, name));
}
