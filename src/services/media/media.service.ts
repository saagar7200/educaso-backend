import { getTempFolderPath, getUploadFolderPath, transferImageFromTempTOUploadFolder } from "../../utils/path.util";
import { MediaType } from "../../constants/global";
import AppError from "../../utils/appError";
import path from "path";
import { existsSync, renameSync ,unlinkSync} from "fs";
import { Message } from "../../constants/message.constant";

const TEMP_FOLDER_PATH = getTempFolderPath();

class MediaService {
 

  async singleUpload(file: any,  folderName: string) {
    console.log(
      "check for file",
      existsSync(path.join(TEMP_FOLDER_PATH, file.name)),
      file.name
    );
    if (!existsSync(path.join(TEMP_FOLDER_PATH, file.name))) {
      throw AppError.BadRequest(
        "Sorry, the image file does not exist. Upload an image first."
      );
    }

    await transferImageFromTempTOUploadFolder(folderName,file.name)
    const uploadFolderPath = getUploadFolderPath();
    const tempFilePath = path.join(TEMP_FOLDER_PATH, file.name);
    const newFilePath = path.join(folderName,file.name);

    // Ensure the destination folder exists
    if (!existsSync(uploadFolderPath)) {
      throw AppError.BadRequest(`Destination folder ${uploadFolderPath} does not exist.`);
    }

    // Move the file from the temp folder to the upload folder
    // renameSync(tempFilePath, newFilePath);


    return newFilePath;
  }

  async delete(uri: string,name?: string) {
    

     // Construct the full file path
     const filePath = path.join(getUploadFolderPath(), uri);

     // Check if the file exists and delete it
     if (existsSync(filePath)) {
       unlinkSync(filePath);
     } else {
       throw AppError.NotFound("File not found on disk");
     }
  }
}

export default new MediaService();