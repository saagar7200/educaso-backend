import { Base } from "../../../entities/base/base.entity";
import { Column, Entity, JoinTable, ManyToOne, ManyToMany } from "typeorm";
import { QuizType } from "../quizType/quiztype.entity";
import { SubjectEntity } from "../subject/subject.entity";
import { ChapterEntity } from "../chapter/chapter.entity";
import {
  QUESTION_DIFFICULTY_LEVEL,
  QUESTION_TYPE,
  QUESTION_TYPE_MARKS,
} from "../../../constants/global";
@Entity({ name: "question" })
export class QuestionEntity extends Base {
  @Column()
  text: string; // The actual question text

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({
    type: "enum",
    enum: QUESTION_TYPE_MARKS,
    default: QUESTION_TYPE_MARKS.SHORT_QUESTION,
  })
  question_type: QUESTION_TYPE_MARKS;

  @Column({
    type: "enum",
    enum: QUESTION_TYPE,
    default: QUESTION_TYPE.MULTIPLE_CHOICE,
  })
  type: QUESTION_TYPE; // Type of the question

  @Column("simple-array", { nullable: true })
  choices: string[]; // For storing multiple choice options, applicable only for certain types

  @Column({ nullable: true })
  correct_answer: string; // Applicable for types with definite correct answers

  @Column({ nullable: true })
  explanation: string; // Optional explanation for the answer

  @Column()
  points: number;

  @Column({
    type: "enum",
    enum: QUESTION_DIFFICULTY_LEVEL,
    default: QUESTION_DIFFICULTY_LEVEL.EASY,
    name: "difficulty_level",
  })
  difficulty_level: QUESTION_DIFFICULTY_LEVEL;

  @ManyToMany(() => QuizType, (quizType) => quizType.questions)
  quiz_type: QuizType[];

  @ManyToMany(() => SubjectEntity, (subject) => subject.questions)
  @JoinTable() // Specify the join table here
  subjects: SubjectEntity[];

  @ManyToOne(() => ChapterEntity, (chapter) => chapter.questions)
  chapter: ChapterEntity;
}
