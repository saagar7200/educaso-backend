import { Base } from "../../../entities/base/base.entity";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { QuizTypeSubjectEntity } from "../quizTpeSubject/quiztypesubjects.entity";
import { QuestionEntity } from "../question/question.entity";
import { QuizSubTypeEntity } from "../quizSubType/quizsubtype.entity";

@Entity({
  name: "quiz_category",
})
export class QuizType extends Base {
  @Column({ name: "name" })
  name: string;

  @Column({ name: "description", type: "text", nullable: true })
  description: string | null;

  @ManyToMany((type) => QuestionEntity, (question) => question.quiz_type)
  @JoinTable()
  questions: QuestionEntity[];

  @ManyToMany(() => QuizSubTypeEntity, (quizSubType) => quizSubType.quiz_type)
  @JoinTable()
  quiz_sub_types: QuizSubTypeEntity[];

  @OneToMany(
    () => QuizTypeSubjectEntity,
    (quizTypeSubject) => quizTypeSubject.quiz_type
  )
  quiz_type_subjects: QuizTypeSubjectEntity[];
}
