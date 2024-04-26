import {
    BaseEntity,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
} from "typeorm";

export abstract class Base extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @Column({
    name: "updated_at",
    nullable: true,
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt!: Date | null;

  @BeforeUpdate()
  async updateDate() {
    this.updatedAt = new Date(Date.now());
  }
}
