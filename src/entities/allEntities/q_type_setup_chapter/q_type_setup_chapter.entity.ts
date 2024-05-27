import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Base } from "../../../entities/base/base.entity";
import { QuizType } from "../quizType/quiztype.entity";
import { SubjectEntity } from "../subject/subject.entity";
import { QuizSubTypeEntity } from "../quizSubType/quizsubtype.entity";
import { ChapterEntity } from "../chapter/chapter.entity";
import { QuizTypeSubjectEntity } from "../quizTpeSubject/quiztypesubjects.entity";

@Entity({ name: "chapter_setup" })
export class QuizTypeSubjectChapterSetupEntity extends Base {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: "number_of_questions" })
  number_of_questions: number;

  @Column({ name: "number_of_long_questions" })
  number_of_long_questions: number;

  @Column({ name: "number_of_short_questions" })
  number_of_short_questions: number;

  //   @Column({ name: "short_questions_mark" })
  //   short_questions_mark: number;

  //   @Column({ name: "long_questions_mark" })
  //   long_questions_mark: number;

  @Column()
  total_marks: number;

  //   @ManyToOne(() => QuizType, (quizType) => quizType.quiz_type_subjects)
  //   quiz_type: QuizType;

  @ManyToOne(
    () => ChapterEntity,
    (chapter) => chapter.quiz_type_subject_chapters
  )
  chapter: ChapterEntity;

  @ManyToOne(
    () => QuizTypeSubjectEntity,
    (exam_subject) => exam_subject.exam_chapters
  )
  exam_subject: QuizTypeSubjectEntity;
}
