import { Base } from "../../../entities/base/base.entity";
import { Column, Entity, JoinTable, ManyToOne, ManyToMany } from "typeorm";
import { QuizType } from "../quizType/quiztype.entity";
import { SubjectEntity } from "../subject/subject.entity";
import { ChapterEntity } from "../chapter/chapter.entity";
@Entity({ name: "question" })
export class QuestionEntity extends Base {
  @Column()
  text: string; // The actual question text

  @Column({
    type: "enum",
    enum: ["MULTIPLE_CHOICE", "TRUE-FALSE", "SUBJECTIVE", "OBJECTIVE"],
    default: "MULTIPLE_CHOICE",
  })
  type: string; // Type of the question

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
    enum: ["Easy", "Medium", "Hard"],
    default: "Easy",
    name: "difficulty_level",
  })
  difficulty_level: string;

  @ManyToOne(() => QuizType, (quizType) => quizType.questions)
  @JoinTable()
  quiz_type: QuizType[];

  @ManyToMany(() => SubjectEntity, (subject) => subject.questions)
  @JoinTable() // Specify the join table here
  subjects: SubjectEntity[];

  @ManyToOne(() => ChapterEntity, (chapter) => chapter.question)
  chapter: ChapterEntity;
}
