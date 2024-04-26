"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_service_1 = require("../utilities/bcrypt.service");
const database_config_1 = __importDefault(require("../config/database.config"));
const admin_1 = require("../constants/admin");
const user_entity_1 = require("../entities/allEntities/user/user.entity");
database_config_1.default
    .initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    const adminRepository = database_config_1.default.getRepository(user_entity_1.UserEntity);
    for (const el of admin_1.admins) {
        const admin = adminRepository.create(el);
        admin.password = yield new bcrypt_service_1.BcryptService().hash(el.password);
        yield adminRepository.save(admin);
        console.info("Admin seed completed");
    }
}))
    .catch((err) => {
    console.error(err);
})
    .finally(() => {
    database_config_1.default.destroy();
});
