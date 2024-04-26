"use strict";
// @ts-nocheck
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const HOST = process.env.APP_HOST || "localhost";
        const app = (0, express_1.default)();
        const httpServer = http.createServer(app);
        const URL = `http://${HOST}:${process.env.PORT}` ||
            `http://localhost:${process.env.PORT}`;
        // dbConnect();
        app.use((0, cors_1.default)());
        app.use((0, morgan_1.default)("dev"));
        app.use(body_parser_1.default.json());
        app.use(body_parser_1.default.urlencoded({ extended: false }));
        // This disables the Content-Security-Policy
        // and X-Download-Options headers.
        app.use(helmet({
            contentSecurityPolicy: false,
            xDownloadOptions: false,
        }));
        // app.use("/api/user", authRouter);
        // app.use("/api/quiz/category", quizCategoryRouter);
        // app.use("/api/quiz", quizRouter);
        // app.use("/api/question", questionRouter);
        // app.use("/api", dashboardRouter);
        // app.use("/api/quiz/result", quizResultRouter);
        // app.use("/api/avatar", avatarRouter);
        app.use(notFound);
        app.use(errorHandler);
        httpServer.listen(PORT, () => {
            console.log(`Server is running at ${URL}`);
        });
    });
}
try {
    bootStrap();
}
catch (error) {
    process.exit(1);
}
