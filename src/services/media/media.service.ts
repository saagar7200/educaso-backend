import { getTempFolderPath, getUploadFolderPath } from "../../utils/path.util";
import { Media } from "../../entities/allEntities/media/media.entity";
import { MediaType } from "../../constants/global";
import AppError from "../../utils/appError";
import path from "path";
import { MediaInput } from "../../validators/media/media.validator";
import dataSource from "../../config/database.config";
const TEMP_FOLDER_PATH = getTempFolderPath();
import { existsSync } from "fs";
import { Message } from "../../constants/message.constant";
class MediaService {
  constructor(
    private readonly mediaRepository = dataSource.getRepository(Media)
  ) {}

  async singleUpload(file: MediaInput, type: MediaType) {

    console.log(
      "check for file",
      existsSync(path.join(TEMP_FOLDER_PATH, file.name)),
      file.name
    );
    if (!existsSync(path.join(TEMP_FOLDER_PATH, file.name))) {
      throw AppError.BadRequest(
        "Sorry image file does not exists.Upload an image first."
      );
    }

    const newMedia = await this.mediaRepository.create({
      mimeType: file.mimeType,
      name: file.name,
      type: type,
    });
    await this.mediaRepository.save(newMedia);
    newMedia.transferImageFromTempTOUploadFolder(newMedia.type);

    return newMedia;
  }

  async delete(id: string, mediaRequest?: MediaInput) {
    const media = await this.mediaRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!media) {
      throw AppError.NotFound(Message.DATA_NOT_FOUND);
    }
    return await this.mediaRepository.remove(media);
  }
}

export default new MediaService();
