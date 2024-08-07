// @ts-nocheck

import path from "path";
import fs from "fs";
import { getTempFolderPath } from "../utils/path.util";
import util from "util";

const mkdir = util.promisify(fs.mkdir);
const moveFile = (file, path) =>
  new Promise((resolve, reject) => {
    file.mv(path, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

export const Upload = <T extends object>(): RequestHandlerParams<
  ParamsDictionary,
  any,
  any,
  ParsedQs,
  Record<string, any>
> => {
  return async function dynamicUpload(req, res, next) {
    // Set the base path for uploads based on user input or defaults
    const basePath = path.join(getTempFolderPath());
    console.log("here middleware basePath", basePath);

    try {
      // Ensure the directory exists
      // !fs.existsSync(path.join(getTempFolderPath())) &&
      //   mkdir(path.join(getTempFolderPath()), {
      //     recursive: true,
      //   });
      !fs.existsSync(basePath) && fs.mkdirSync(basePath, { recursive: true });

      // await mkdir(basePath, { recursive: true });

      console.log("Creating temporary", req.files);
      // Process all uploaded files
      if (req.files) {
        for (const field of Object.keys(req.files)) {
          console.log("field", field);
          const files = req.files[field];
          const fileArray = Array.isArray(files) ? files : [files]; // Ensure it's always an array

          for (const file of fileArray) {
            // Generate a unique file name
            let modifyFileName: string;
            const { name, mimetype, encoding } = file;
            modifyFileName = `${Date.now()}-${Math.floor(
              1000 + Math.random() * 9000
            )}-${name}`;
            const uploadPath = path.join(basePath, modifyFileName);

            await moveFile(file, uploadPath);

            // check uploded files are array or single
            if (Array.isArray(req.files[field])) {
              // check if the file already exists
              if (!Array.isArray(req.body[field])) {
                req.body[field] = [];
              }
              req.body[field].push({
                name: modifyFileName,
                // type: MediaType.PROFILE_IMAGE,
                mimeType: file.mimetype,
              });
            } else {
              req.body[field] = {
                name: modifyFileName,
                // type: MediaType.PROFILE_IMAGE,
                mimeType: file.mimetype,
              };
            }
          }
        }
      }

      // Attach the details to req.body

      next();
    } catch (err) {
      console.error("Error uploading files:", err);
      return res.status(500).json({
        message: "Failed to upload files.",
        success: false,
        data: null,
      });
    }
  };
};
