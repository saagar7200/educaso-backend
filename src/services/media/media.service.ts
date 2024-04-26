import { getUploadFolderPath } from "../../utils/path.util";
import dataSource from "../../config/database.config";
import { Media } from "../../entities/allEntities/media/media.entity";
import fs, { createWriteStream } from "fs";
import { MediaType } from "../../constants/global";
import AppError from "../../utils/appError";
// import nodePath, { default as path } from "path";
import path from "path";
import MediaConfigurations from "../../types/media.config";

class MediaService {
  constructor(
    private readonly mediaRepository = dataSource.getRepository(Media)
  ) {}

  async singleUpload(file, type: MediaType) {
    !fs.existsSync(
      path.join(getUploadFolderPath(), type.toLocaleLowerCase())
    ) &&
      fs.mkdirSync(path.join(getUploadFolderPath(), type.toLocaleLowerCase()), {
        recursive: true,
      });

    const uploadType: MediaType = type;
    if (!uploadType || !Object.values(MediaType).includes(uploadType)) {
      throw AppError.BadRequest("Invalid upload type");
    }
    if (!file) {
      throw AppError.BadRequest("File not upload");
    }

    let modifyFileName: string;
    const { createReadStream, name, mimetype, encoding } = file;

    modifyFileName = `${Date.now()}-${Math.floor(
      1000 + Math.random() * 9000
    )}-${name}`;

    console.log(`modifyFileName: ${modifyFileName}`);
    //    *Check size of file (in bytes)

    // const fileSize = await new Promise<number>((resolve, reject) => {
    //   createReadStream()
    //     .on("data", (chunk) => {
    //       resolve(chunk.length);
    //     })
    //     .on("error", (error) => {
    //       reject(error);
    //     });
    // });

    // const uploadedExtension = path.extname(filename);

    // if (
    //   !MediaConfigurations[
    //     uploadType as MediaType
    //   ].supportedExtensions.includes(uploadedExtension.split(".")[1])
    // ) {
    //   throw AppError.BadRequest(
    //     `Invalid file type. Supported types are ${MediaConfigurations[
    //       uploadType as MediaType
    //     ].supportedExtensions.join(", ")}`
    //   );
    // }

    const path2 = path.resolve(
      getUploadFolderPath(),
      type.toLocaleLowerCase(),
      modifyFileName
    );
    console.log("path2", path2);

    file.mv(path2, function (err) {
      if (err) {
        console.log("Error occurred:", err);
        return;
      }

      console.log("File successfully uploaded!");
    });
    // let newMedia = await this.mediaRepository.create({
    //   mimeType: data.mimeType,
    //   name: data.name,
    //   type: data.type,
    // });
    // await this.mediaRepository.save(newMedia);
    // return newMedia;
    // if (!data) {
    //   throw AppError.BadRequest("Wrong");
    // }
  }
}

export default new MediaService();
