//here goes quiz generation process
import QuizSubTypeService from "../services/quiz_sub_type_subject_setup/quiz_subType_subject-setup.service";
import ChapterService from "../services/chapter/chapter.service";
import QuestionService from "../services/question/question.service";
import QuiztypeService from "../services/quiztype/quiztype.service";
import SubjectService from "../services/subject/subject.service";
import QuizSubTypeSubjectService from "../services/quiz_sub_type_subject_setup/quiz_subType_subject-setup.service";
import ExamSetupChapterService from "../services/exam_setup_chapter/exam_setup_chapter.service";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { fetchedMessage } from "../constants/message.constant";
import { Request, Response } from "express";

export class MockTestController {
  constructor(
    // private readonly mockTestService = MockTestService,
    private readonly questionService = QuestionService,
    private readonly chapterService = ChapterService,
    private readonly subjectService = SubjectService,
    private readonly quizTypeService = QuiztypeService,
    private readonly quizSubTypeService = QuizSubTypeService,
    private readonly quizSubTypeSubjectService = QuizSubTypeSubjectService // private readonly quizSubTypeSubjectChapterService = ExamSetypChapterService, // private readonly quizSubTypeSubjectChapterQuestionService = QuizSubTypeSubjectChapterQuestionService, // private readonly quizSubTypeSubjectChapterQuestionAnswerService = QuizSubTypeSubjectChapterQuestionAnswerService, // private readonly quizSubTypeSubjectChapterQuestionAnswerOptionService = QuizSubTypeSubjectChapterQuestionAnswerOptionService, // private readonly quizSubTypeSubjectChapterQuestionAnswerOptionAnswerService = QuizSubTypeSubjectChapterQuestionAnswerOptionAnswerService
  ) {}

  getAll = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const setups = await this.questionService.getAll();
    return res.status(StatusCodes.OK).json({
      message: fetchedMessage("Chapter setups"),
      success: true,
      data: setups,
    });
  });
}
