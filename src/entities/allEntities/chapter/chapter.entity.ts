import { Base } from "../../../entities/base/base.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { SubjectEntity } from "../subject/subject.entity";
import { QuestionEntity } from "../question/question.entity";
import { QuizTypeSubjectChapterSetupEntity } from "../q_type_setup_chapter/q_type_setup_chapter.entity";

@Entity({ name: "chapters" })
export class ChapterEntity extends Base {
  @Column({ name: "name" })
  name: string;

  @Column({ name: "description", nullable: true })
  description: string;

  @OneToMany(() => QuestionEntity, (question) => question.chapter)
  questions: QuestionEntity[];

  @ManyToOne(() => SubjectEntity, (subject) => subject.chapters)
  subject: SubjectEntity;

  @OneToMany(
    () => QuizTypeSubjectChapterSetupEntity,
    (quizTypeSubjectChapter) => quizTypeSubjectChapter.chapter
  )
  quiz_type_subject_chapters: QuizTypeSubjectChapterSetupEntity[];
}
