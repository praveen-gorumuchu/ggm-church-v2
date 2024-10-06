import { CategoryEnum, CategoryListModel, QuizQuestionsModel } from "../../dashboard/models/quiz-models/quiz.model";
import { UserInfo, UserRoleEnum } from "../../shared/models/user-data/uder-list.model";

export interface StudentHistoryModel {
  studentId: string,
  studentName: string,
  previousCategory: CategoryEnum | null,
  answeredQuestions: AnsweredQuestion[];
  score: number;
  class: string
  totalTimeTaken: number
}



export interface AnsweredQuestion {
  id: string;
  question: string;
  type: CategoryListModel;
  answer?: string;
  userAnswer: string | boolean;
  options?: string[];
  timeTaken: number
}


export interface QuizResult {
  studentName: string,
  studentId: string;
  class: string
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  score: number;
  attemptedDate: Date;
  organisedBy: UserRoleEnum;
  organizer: string,
  answeredQuestions: Array<AnsweredQuestion>,
  percentage?: number,
  rank?: number
  totalTimeTaken: number
}
