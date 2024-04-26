import { Base } from "../../../entities/base/base.entity";
import { Gender } from "../../../constants/enum";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import * as crypto from "crypto";
import { Media } from "../media/media.entity";

@Entity({
  name: "user",
})
export class UserEntity extends Base {
  @Column({ name: "email" })
  email: string;

  @Column({
    name: "full_name",
  })
  fullName: string;

  @Column()
  phoneNumber: string;

  // @Column()
  // currentCity: string;

  @Column()
  profession: string;

  @Column()
  password: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ default: false })
  isPhoneVerified: boolean;

  @Column({ type: String, unique: true, nullable: true })
  resetToken!: string | null;

  @Column({ type: Date, unique: true, nullable: true })
  resetPasswordExpire!: Date | null;

  @Column({
    type: String,
    unique: true,
    nullable: true,
  })
  confirmEmailToken!: string | null;

  @OneToOne((type) => Media, (media) => media.user, { nullable: true })
  @JoinColumn()
  profileImage: Media;

  // @OneToMany(() => ArticleEntity, (article) => article.owner, { cascade: true })
  // article: ArticleEntity;

  // @OneToMany(() => SLikeEntity, (likes) => likes.user, {
  //   onUpdate: "CASCADE",
  //   onDelete: "CASCADE",
  // })
  // likes: SLikeEntity;

  // @OneToMany(() => CommentEntity, (comment) => comment.user, { cascade: true })
  // comments: CommentEntity;

  // @OneToMany(() => MessageEntity, (senderMessage) => senderMessage.sender, {
  //   cascade: true,
  // })
  // senderMessage: String;

  // @OneToMany(() => MessageEntity, (receiverMessage) => receiverMessage.sender)
  // receiverMessage: String;

  // @OneToMany(() => FcmTokenEntity, (fcmToken) => fcmToken.userId, {
  //   cascade: true,
  // })
  // fcmTokens: FcmTokenEntity;
  // @OneToMany(() => UserFollower, (uf: UserFollower) => uf.follower, {
  //   onDelete: "CASCADE",
  //   nullable: true,
  // })
  // followers: UserFollower[];

  // @OneToMany(() => UserFollower, (uf: UserFollower) => uf.following, {
  //   nullable: true,
  //   onDelete: "CASCADE",
  // })
  // following: UserFollower[];

  generateResetToken() {
    const token = crypto.randomBytes(20).toString("hex");
    //hashing and adding  resetPasswordToken to userschema
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    return { hashedToken, token };
  }
}
