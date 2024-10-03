import { CategoryEnum, CategoryListModel, QuizQuestionsModel } from "../../dashboard/models/quiz-models/quiz.model";
import { UserInfo } from "../../shared/models/user-data/uder-list.model";

export interface StudentHistoryModel {
  studentId: string,
  studentName: string,
  previousCategory: CategoryEnum | null,
  answeredQuestions: AnsweredQuestion[];
  score: number;
}



export interface AnsweredQuestion {
  id: string;
  question: string;
  type: CategoryListModel;
  answer?: string;
  userAnswer: string | boolean;
  options?: string[];
}


export interface QuizResult {
  studentName: string,
  studentId: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  score: number;
  attemptedDate: Date;
  orgnasidedBy: UserInfo;
  answeredQuestions: Array<AnsweredQuestion>
  
}
