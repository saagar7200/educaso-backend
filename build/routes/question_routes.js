"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// const { createQuestion, getSpecificQuestion,
//     deleteSpecificQuestion, updateQuestion, getAllQuestionsFromQuizId } = require('../controller/question_controller');
// const { authMiddleware, isAdmin } = require('../middlewares/auth_middleware');
// router.post('/create', authMiddleware, isAdmin, createQuestion);
// router.get('/:question_id', authMiddleware, getSpecificQuestion);
// router.delete('/:question_id', authMiddleware, isAdmin, deleteSpecificQuestion);
// router.put('/update/:question_id', authMiddleware, isAdmin, updateQuestion);
// router.get('/:quiz_id/questions', authMiddleware, getAllQuestionsFromQuizId);
module.exports = router;
