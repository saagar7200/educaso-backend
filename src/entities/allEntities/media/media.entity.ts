import { existsSync, renameSync, mkdirSync } from "fs";
import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
//   import { Message } from "../../entities/chat/message.entity";
import { resolve } from "path";
import { UserEntity } from "../user/user.entity";
import { Base } from "../../../entities/base/base.entity";

import fs from "fs";
import path from "path";
import { getUploadFolderPath } from "../../../utils/path.util";
import { getTempFolderPath } from "../../../utils/path.util";

@Entity()
export class Media extends Base {
  @Column({ nullable: true })
  name: string;

  // type of media : profile or article image
  @Column()
  type: string;

  // type of media : jpeg/png
  @Column({ name: "mime_type" })
  mimeType: string;

  @OneToOne((type) => UserEntity, (user) => user.profile_image, {
    nullable: true,
  })
  user: UserEntity;

  public path: string;

  transferImageFromTempTOUploadFolder(type: string) {
    const TEMP_FOLDER_PATH = path.join(getTempFolderPath(), this.name);

    const UPLOAD_FOLDER_PATH = path.join(
      getUploadFolderPath(),

      type.toLowerCase()
    );
    !fs.existsSync(UPLOAD_FOLDER_PATH) &&
      fs.mkdirSync(UPLOAD_FOLDER_PATH, { recursive: true });

    fs.renameSync(TEMP_FOLDER_PATH, path.join(UPLOAD_FOLDER_PATH, this.name));
  }

  @AfterLoad()
  async loadImagePath() {
    this.path = `${process.env.BASE_URL!}/${this.type.toLowerCase()}/${
      this.name
    }`;
  }
}
