import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Base } from "../../../entities/base/base.entity";
import { QuizType } from "../quizType/quiztype.entity";
import { SubjectEntity } from "../subject/subject.entity";

@Entity()
export class QuizTypeSubjectEntity extends Base {
  @Column({ name: "number_of_questions" })
  number_of_questions: number;

  @Column({ name: "number_of_long_questions" })
  number_of_long_questions: number;

  @Column({ name: "number_of_short_questions" })
  number_of_short_questions: number;

  @Column({ name: "short_questions_mark" })
  short_questions_mark: number;

  @Column({ name: "long_questions_mark" })
  long_questions_mark: number;

  @Column()
  total_marks: number;

  @ManyToOne(() => QuizType, (quizType) => quizType.quiz_type_subjects)
  quiz_type: QuizType;

  @ManyToOne(() => SubjectEntity, (subject) => subject.quiz_type_subjects)
  subject: SubjectEntity;
}
