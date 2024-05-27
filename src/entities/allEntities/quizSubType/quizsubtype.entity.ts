import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Base } from "../../../entities/base/base.entity";
import { QuizType } from "../quizType/quiztype.entity";
import { SubjectEntity } from "../subject/subject.entity";
import { QuizTypeSubjectEntity } from "../quizTpeSubject/quiztypesubjects.entity";

@Entity({
  name: "quiz_sub_category",
})
export class QuizSubTypeEntity extends Base {
  @Column({ name: "name" })
  name: string;

  @Column({ name: "description", type: "text", nullable: true })
  description: string | null;

  @Column({ name: "full_marks" })
  full_marks: number;

  @Column({ name: "exam_duration_minutes" })
  exam_duration_minutes: number;

  @Column({ name: "total_questions" })
  total_questions: number;

  @Column({ name: "total_long_questions" })
  total_long_questions: number;

  @Column({ name: "total_short_questions" })
  total_short_questions: number;

  @ManyToMany((type) => QuizType, (quizType) => quizType.quiz_sub_types, {
    cascade: true,
    onDelete: "SET NULL",
  })
  quiz_type: QuizType[];

  @ManyToMany((type) => SubjectEntity, (sub) => sub.quiz_sub_type, {
    onDelete: "CASCADE",
    nullable: true,
    cascade: true,
  })
  @JoinTable()
  subjects: SubjectEntity[];

  @OneToMany(
    () => QuizTypeSubjectEntity,
    (quizTypeSubject) => quizTypeSubject.quiz_sub_type,
    {
      nullable: true,
      onDelete: "CASCADE",
    }
  )
  quiz_type_subjects: QuizTypeSubjectEntity[];
}
