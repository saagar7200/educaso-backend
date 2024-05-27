import { UserEntity } from "../../entities/allEntities/user/user.entity";
import dataSource from "../../config/database.config";
import { RegisterInput } from "../../validators/user/user.validator";
import AppError from "../../utils/appError";
import BcryptService from "../../utils/bcrypt.service";
import { notFoundMessage } from "../../constants/message.constant";
import { In } from "typeorm";
import { SubjectEntity } from "../../entities/allEntities/subject/subject.entity";
import { SubjectInput } from "../../validators/subject/subject.validator";
import { ChapterEntity } from "../../entities/allEntities/chapter/chapter.entity";
import { ChapterInput } from "../../validators/chapter/chapter.validator";

class ChapterService {
  constructor(
    private readonly chapterRepository = dataSource.getRepository(ChapterEntity)
  ) {}

  async getAll() {
    const chapters = await this.chapterRepository.find({
      relations: {
        questions: true,
        subject: true,
      },
      order: {
        createdAt: "DESC",
      },
    });

    return chapters;
  }

  async getById(id: string) {
    const chapter = await this.chapterRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        questions: true,
        subject: true,
      },
    });

    if (!chapter) {
      throw AppError.NotFound(notFoundMessage("Chapter"));
    }

    return chapter;
  }
  async getByIds(id: string[]) {
    const chapters = await this.chapterRepository.find({
      where: {
        id: In(id),
      },
      relations: {
        questions: true,
        subject: true,
      },
    });

    if (!chapters) {
      throw AppError.NotFound(notFoundMessage("Chapter"));
    }

    return chapters;
  }

  async create(data: ChapterInput) {
    console.log("chapter service", data);

    const isChapterExists = await this.chapterRepository.findOne({
      where: {
        name: data.name,
      },
    });

    if (isChapterExists) {
      throw AppError.BadRequest(`Chapter already exist with name ${data.name}`);
    }

    const newChapter = new ChapterEntity();
    newChapter.name = data.name;
    newChapter.description = data.description ?? null;
    // const otp = generateRandomOTP();
    // subject.confirmEmailToken = otp.toString();

    const chapter = await this.chapterRepository.save(newChapter);

    return chapter;
  }

  async update(data: ChapterInput, id) {
    console.log("chapter service", data);

    const { name, description } = data;

    const chapter = await this.chapterRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!chapter) {
      throw AppError.NotFound(notFoundMessage("Chapter"));
    }

    if (name !== chapter.name) {
      chapter.name = name;
    }
    if (description !== chapter.description) {
      chapter.description = description;
    }

    return await this.chapterRepository.save(chapter);
  }

  async delete(id: string) {
    const chapter = await this.chapterRepository.findOne({
      where: {
        id,
      },
      relations: {
        questions: true,
        subject: true,
      },
    });

    if (!chapter) {
      throw AppError.NotFound(notFoundMessage("Chapter"));
    }

    const deleted = await this.chapterRepository.remove(chapter);
    console.log("Deleted", deleted);

    return deleted;
  }
}

export default new ChapterService();
