import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { ChapterEntity } from "../chapter/chapter.entity";
import { QuizSubTypeEntity } from "../quizSubType/quizsubtype.entity";
import { Base } from "../../../entities/base/base.entity";
import { QuizTypeSubjectEntity } from "../quizTpeSubject/quiztypesubjects.entity";
import { QuestionEntity } from "../question/question.entity";

@Entity()
export class SubjectEntity extends Base {
  @Column()
  name: string;

  @OneToMany(() => ChapterEntity, (chapter) => chapter.subject)
  chapters: ChapterEntity[];

  @OneToMany(
    () => QuizTypeSubjectEntity,
    (quizTypeSubject) => quizTypeSubject.subject
  )
  quiz_type_subjects: QuizTypeSubjectEntity[];

  @ManyToMany(() => QuestionEntity, (question) => question.subjects) // This will use the join table configured in Question
  questions: QuestionEntity[];
}
