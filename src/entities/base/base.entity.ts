import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import createUUID from "../../utils/genrateUUID";

export abstract class Base extends BaseEntity {
  @PrimaryColumn({ primary: true, type: "uuid" })
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

  @BeforeInsert()
  async UUID() {
    this.id = await createUUID();
  }

  @BeforeUpdate()
  async updateDate() {
    this.updatedAt = new Date(Date.now());
  }
}
