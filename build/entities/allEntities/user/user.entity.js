"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const base_entity_1 = require("../../../entities/base/base.entity");
const typeorm_1 = require("typeorm");
const global_1 = require("../../../constants/global");
const media_entity_1 = require("../media/media.entity");
const article_entity_1 = require("../article/article.entity");
const like_entity_1 = require("../article/like.entity");
const message_entity_1 = require("../chat/message.entity");
const crypto = __importStar(require("crypto"));
const comment_entity_1 = require("../article/comment.entity");
const fcmtoken_entity_1 = require("../notification/fcmtoken.entity");
const userFollower_entity_1 = require("../userFollower/userFollower.entity");
let UserEntity = class UserEntity extends base_entity_1.Base {
    generateResetToken() {
        const token = crypto.randomBytes(20).toString("hex");
        //hashing and adding  resetPasswordToken to userschema
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        return { hashedToken, token };
    }
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.Column)({ name: "email" }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "full_name",
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        name: "role",
        default: global_1.Role.USER,
        enum: global_1.Role,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "yearPassedOut", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        name: "house",
        enum: global_1.House,
    }),
    __metadata("design:type", typeof (_a = typeof global_1.House !== "undefined" && global_1.House) === "function" ? _a : Object)
], UserEntity.prototype, "house", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "houseNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "currentCity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "profession", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isEmailVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isPhoneVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, unique: true, nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "resetToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Date, unique: true, nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "resetPasswordExpire", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: String,
        unique: true,
        nullable: true,
    }),
    __metadata("design:type", Object)
], UserEntity.prototype, "confirmEmailToken", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((type) => media_entity_1.Media, (media) => media.user, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", typeof (_b = typeof media_entity_1.Media !== "undefined" && media_entity_1.Media) === "function" ? _b : Object)
], UserEntity.prototype, "profileImage", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => article_entity_1.ArticleEntity, (article) => article.owner, { cascade: true }),
    __metadata("design:type", typeof (_c = typeof article_entity_1.ArticleEntity !== "undefined" && article_entity_1.ArticleEntity) === "function" ? _c : Object)
], UserEntity.prototype, "article", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_entity_1.SLikeEntity, (likes) => likes.user, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }),
    __metadata("design:type", typeof (_d = typeof like_entity_1.SLikeEntity !== "undefined" && like_entity_1.SLikeEntity) === "function" ? _d : Object)
], UserEntity.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.CommentEntity, (comment) => comment.user, { cascade: true }),
    __metadata("design:type", typeof (_e = typeof comment_entity_1.CommentEntity !== "undefined" && comment_entity_1.CommentEntity) === "function" ? _e : Object)
], UserEntity.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.MessageEntity, (senderMessage) => senderMessage.sender, {
        cascade: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "senderMessage", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.MessageEntity, (receiverMessage) => receiverMessage.sender),
    __metadata("design:type", String)
], UserEntity.prototype, "receiverMessage", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => fcmtoken_entity_1.FcmTokenEntity, (fcmToken) => fcmToken.userId, {
        cascade: true,
    }),
    __metadata("design:type", typeof (_f = typeof fcmtoken_entity_1.FcmTokenEntity !== "undefined" && fcmtoken_entity_1.FcmTokenEntity) === "function" ? _f : Object)
], UserEntity.prototype, "fcmTokens", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userFollower_entity_1.UserFollower, (uf) => uf.follower, {
        onDelete: "CASCADE",
        nullable: true,
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "followers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userFollower_entity_1.UserFollower, (uf) => uf.following, {
        nullable: true,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "following", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "user",
    })
], UserEntity);
