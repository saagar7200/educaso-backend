import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
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

  @Column({ nullable: true, type: "text" })
  description?: string | null;

  @OneToMany(() => ChapterEntity, (chapter) => chapter.subject)
  chapters: ChapterEntity[];

  @OneToMany(
    () => QuizTypeSubjectEntity,
    (quizTypeSubject) => quizTypeSubject.subject,
    {
      cascade: true,
      nullable: true,
    }
  )
  quiz_type_subjects: QuizTypeSubjectEntity[];

  @ManyToMany(() => QuestionEntity, (question) => question.subjects) // This will use the join table configured in Question
  questions: QuestionEntity[];

  @ManyToMany((type) => QuizSubTypeEntity, (sub) => sub.subjects, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinTable()
  quiz_sub_type: QuizSubTypeEntity[];
}
