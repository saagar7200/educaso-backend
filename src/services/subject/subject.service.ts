import { UserEntity } from "../../entities/allEntities/user/user.entity";
import dataSource from "../../config/database.config";
import { RegisterInput } from "../../validators/user/user.validator";
import AppError from "../../utils/appError";
import BcryptService from "../../utils/bcrypt.service";
import { notFoundMessage } from "../../constants/message.constant";
import { In } from "typeorm";
import { SubjectEntity } from "../../entities/allEntities/subject/subject.entity";
import { SubjectInput } from "../../validators/subject/subject.validator";

class SubjectService {
  constructor(
    private readonly subjectRepository = dataSource.getRepository(SubjectEntity)
  ) {}

  async getAll() {
    const subjects = await this.subjectRepository.find({
      relations: {
        questions: {
          quiz_type: false, // Assuming you want to load back-reference to subject if necessary
          subjects: false, // Load subjects related to questions
          chapter: false, // Load chapter related to questions if required
        },
        quiz_type_subjects: true,
        chapters: true,
        quiz_sub_type: true,
      },
      order: {
        createdAt: "DESC",
      },
    });

    return subjects;
  }

  async getById(id: string) {
    const subject = await this.subjectRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        questions: true,
        quiz_type_subjects: true,
        chapters: true,
        quiz_sub_type: true,
      },
    });

    if (!subject) {
      throw AppError.NotFound(notFoundMessage("exam Type"));
    }
    console.log("created service", subject);

    return subject;
  }
  async getByIds(id: string[]) {
    const subjects = await this.subjectRepository.find({
      where: {
        id: In(id),
      },
      relations: {
        questions: true,
        quiz_type_subjects: true,
        chapters: true,
        quiz_sub_type: true,
      },
    });

    if (!subjects) {
      throw AppError.NotFound(notFoundMessage("exam Type"));
    }

    return subjects;
  }

  async create(data: SubjectInput) {
    console.log("subject service", data);

    const isSubExists = await this.subjectRepository.findOne({
      where: {
        name: data.name,
      },
    });

    if (isSubExists) {
      throw AppError.BadRequest(`Subject already exist with name ${data.name}`);
    }

    const newSubject = new SubjectEntity();
    newSubject.name = data.name;
    newSubject.description = data.description ?? null;
    // const otp = generateRandomOTP();
    // subject.confirmEmailToken = otp.toString();

    const subject = await this.subjectRepository.save(newSubject);
    console.log("created service", subject);

    return subject;
  }

  async update(data: SubjectInput, id) {
    console.log("subject service", data);

    const { name, description } = data;

    const subject = await this.subjectRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!subject) {
      throw AppError.NotFound(notFoundMessage("Exam Type"));
    }

    if (name !== subject.name) {
      subject.name = name;
    }
    if (description !== subject.description) {
      subject.description = description;
    }

    console.log("created service", subject);
    return await this.subjectRepository.save(subject);
  }

  async delete(id: string) {
    const subject = await this.subjectRepository.findOne({
      where: {
        id,
      },
      relations: {
        questions: true,
        quiz_type_subjects: true,
      },
    });

    if (!subject) {
      throw AppError.NotFound(notFoundMessage("Subject"));
    }

    const deleted = await this.subjectRepository.remove(subject);
    console.log("Deleted", deleted);

    return deleted;
  }
}

export default new SubjectService();
