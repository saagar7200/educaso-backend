import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Base } from "../../../entities/base/base.entity";
import { QuizType } from "../quizType/quiztype.entity";

@Entity({
  name: "quiz_sub_category",
})
export class QuizSubTypeEntity extends Base {
  @Column({ name: "name" })
  name: string;

  @Column({ name: "full_mark" })
  full_mark: number;

  @Column({ name: "exam_duration" })
  exam_duration: number;

  @Column({ name: "total_questions" })
  total_questions: number;

  @Column({ name: "total_long_questions" })
  total_long_questions: number;

  @Column({ name: "total_short_questions" })
  total_short_questions: number;

  @OneToOne((type) => QuizType)
  @JoinColumn({ name: "quiz_type_id" })
  quiz_type: QuizType;
}
