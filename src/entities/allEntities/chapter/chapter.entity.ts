import { Base } from "../../../entities/base/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { SubjectEntity } from "../subject/subject.entity";
import { QuestionEntity } from "../question/question.entity";

@Entity({ name: "chapters" })
export class ChapterEntity extends Base {
  @Column({ name: "name" })
  name: string;

  @Column({ name: "description", nullable: true })
  description: string;

  @ManyToOne(() => QuestionEntity, (question) => question.chapter)
  question: string;

  @ManyToOne(() => SubjectEntity, (subject) => subject.chapters)
  subject: SubjectEntity;
}
