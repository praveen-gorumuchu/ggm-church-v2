import { UtilSharedService } from './../../shared/services/util-shared.service';
import { Injectable } from "@angular/core";
import { QuizQuestionsModel } from "../../dashboard/models/quiz-models/quiz.model";
import { StudentModel } from "../../dashboard/models/students/student-list.model";
import { LoginService } from "../../shared/services/login.service";
import { MessageBarService } from "../../shared/services/message-bar.service";
import { AnsweredQuestion, QuizResult, StudentHistoryModel } from "../model/student-history.model";
import { GenerateIdConst } from "../../shared/constants/generate-id.constant";
import { StorageKeyConstant } from "../../shared/constants/storage-keys.constant";
import { TitleConstant } from '../../shared/constants/title.constant';
import moment from 'moment';
import { StringConstant } from '../../shared/constants/string-constant';
import { MomentFormats } from '../../shared/constants/moment-formats';
import { NumberConstant } from '../../shared/constants/number-constant';

@Injectable({
  providedIn: 'root',
})
export class QuizPlayService {
  constructor(private loginService: LoginService, private messageBarService: MessageBarService,
    private utilSharedService: UtilSharedService
  ) { }

  private studentsHistory: StudentHistoryModel[] = [];
  private quizQuestions: QuizQuestionsModel[] = []; // Shared pool for all students




  getRemainingPoolList(): QuizQuestionsModel[] {
    return this.quizQuestions;
  }


  /**
   * Set all quiz questions for the current quiz session.
   * @param response - Array of quiz questions to set.
   */
  setQuizQuestions(response: QuizQuestionsModel[]) {
    this.quizQuestions = response;
  }

  /**
   * Add a student to the quiz session if they are not already added.
   * Initializes their score and answered questions list.
   * @param studentData - Student information to add.
   */
  addStudent(studentData: StudentModel) {
    if (!this.studentsHistory.find(s => s.studentId === studentData.id)) {
      this.studentsHistory.push({
        studentId: studentData.id,
        studentName: studentData.name,
        class: studentData.class,
        answeredQuestions: [],
        previousCategory: null,
        score: 0,
      });
    }
  }

  /**
   * Get the next available question for the student.
   * Ensures no duplicate questions and no consecutive category types.
   * @param studentData - The student requesting the next question.
   * @returns The next quiz question or null if no questions are available.
   */
  getNextQuestionForStudent(studentData: StudentModel): QuizQuestionsModel | null {
    const student = this.studentsHistory.find(s => s.studentId === studentData.id);
    if (!student) {
      this.messageBarService.showErorMsgBar('Student not found');
      return null;
    }

    if (this.quizQuestions.length === 0) {
      this.messageBarService.showErorMsgBar('No more questions are left for the quiz');
      return null;
    }

    const availableQuestions = this.getFilteredQuestionsForStudent(student);

    if (availableQuestions.length === 0) {
      this.messageBarService.showErorMsgBar('No more questions are available for this student');
      return null;
    }

    const nextQuestion = this.getRandomQuestion(availableQuestions);
    student.previousCategory = nextQuestion.type.name;
    return nextQuestion;
  }

  /**
   * Submit the student's answer for a specific question.
   * Updates the student's score and removes the question from the global pool.
   * @param studentData - The student submitting the answer.
   * @param question - The question being answered.
   * @param userAnswer - The answer submitted by the student.
   */
  submitAnswer(studentData: StudentModel, question: QuizQuestionsModel, userAnswer: any, timeTaken: number) {
    const student = this.studentsHistory.find(s => s.studentId === studentData.id);

    if (!student) {
      this.messageBarService.showErorMsgBar('Student not found');
      return;
    }

    if (userAnswer === question.answer) {
      student.score += 10;
    }

    this.removeQuestionFromGlobalPool(question);
    this.recordAnsweredQuestion(student, question, userAnswer, timeTaken);
  }

  /**
   * Remove the answered question from the global pool.
   * Once removed, no other student can get this question.
   * @param question - The question to remove.
   */
  private removeQuestionFromGlobalPool(question: QuizQuestionsModel) {
    this.quizQuestions = this.quizQuestions.filter(q => q.id !== question.id);
  }

  /**
   * Filter the available questions for a student, ensuring no consecutive categories.
   * Excludes questions that have been globally removed.
   * @param student - The student for whom to filter the questions.
   * @returns Filtered list of available questions.
   */
  private getFilteredQuestionsForStudent(student: StudentHistoryModel): QuizQuestionsModel[] {
    const previousCategory = student.previousCategory;

    let filteredQuestions = this.quizQuestions.filter(q =>
      q.type.name !== previousCategory
    );

    // If no questions are available, reset the filter to allow same categories
    if (filteredQuestions.length === 0) {
      filteredQuestions = this.quizQuestions;
    }

    return filteredQuestions;
  }

  /**
   * Select a random question from the filtered list.
   * @param availableQuestions - Array of filtered questions.
   * @returns A randomly selected question.
   */
  private getRandomQuestion(availableQuestions: QuizQuestionsModel[]): QuizQuestionsModel {
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    return availableQuestions[randomIndex];
  }

  /**
   * Record the answered question in the student's history.
   * @param student - The student who answered the question.
   * @param question - The question that was answered.
   * @param userAnswer - The answer submitted by the student.
   */
  private recordAnsweredQuestion(student: StudentHistoryModel,
    question: QuizQuestionsModel, userAnswer: any, timeTaken: number) {
    student.answeredQuestions.push({
      id: question.id,
      question: question.question,
      type: question.type,
      answer: question.answer,
      userAnswer,
      timeTaken,
      options: question.options || [],
    } as AnsweredQuestion);
  }

  /**
  * Calculate results for a specific student, including score and percentage.
  * @param student - The student for whom to calculate the results.
  * @returns The calculated result for the student.
  */
  private calculateResultsForStudent(student: StudentHistoryModel): QuizResult {
    const correctAnswers: AnsweredQuestion[] =
      student.answeredQuestions.filter((answeredQuestion: AnsweredQuestion) =>
        answeredQuestion.userAnswer === answeredQuestion.answer
      );

    const wrongAnswers: AnsweredQuestion[] =
      student.answeredQuestions.filter((answeredQuestion: AnsweredQuestion) =>
        answeredQuestion.userAnswer !== answeredQuestion.answer
      );

    let totalScore = 0;
    const maxPoints = 10;

    correctAnswers.forEach(answeredQuestion => {
      const question = this.quizQuestions.find(q => q.id === answeredQuestion.id); //
      const totalTime = question ? question.timer : 40;

      const firstThird = totalTime / 3; // First third of the total time
      const secondThird = 2 * firstThird; // Second third of the total time

      const timeTaken = answeredQuestion.timeTaken;

      if (timeTaken <= firstThird) {
        totalScore += maxPoints; // Full points for fast responses
      } else if (timeTaken <= secondThird) {
        totalScore += maxPoints * 0.65; // Reduced points for mid-range responses
      } else {
        totalScore += maxPoints * 0.3; // Minimal points for slow responses
      }
    });

    const totalPossibleScore = student.answeredQuestions.length * maxPoints;
    totalScore = Math.min(totalScore, totalPossibleScore);

    const percentage = (totalScore / totalPossibleScore) * 100;

    return {
      studentId: student.studentId,
      class: student.class,
      studentName: student.studentName,
      totalQuestions: student.answeredQuestions.length,
      correctAnswers: correctAnswers.length,
      wrongAnswers: wrongAnswers.length,
      score: totalScore,
      percentage: percentage,
      organisedBy: this.loginService.loginUser.role,
      organizer: this.loginService.loginUser.name,
      attemptedDate: new Date(),
      answeredQuestions: student.answeredQuestions,
    };
  }


  /**
   * End the quiz session and calculate results for all students.
   * Ensures that duplicate questions are not counted and handles unanswered questions properly.
   * @returns An array of results for each student.
   */
  endQuiz(): QuizResult[] {
    const results: QuizResult[] = this.studentsHistory.map((student: StudentHistoryModel) =>
      this.calculateResultsForStudent(student) // Use the new method to calculate results
    );

    // Sort students by score to determine the ranking
    const sortedResults = results.sort((a, b) => b.score - a.score);

    // Assign ranks based on the sorted order
    sortedResults.forEach((result: QuizResult, index) => {
      result.rank = index + 1;  // Rank starts from 1
    });

    
    if (sortedResults && sortedResults.length > NumberConstant.ZERO) {
      const dateTime = moment(new Date()).format(MomentFormats.MOMENT_MONTH_DATE_YEAR_TIME);
      localStorage.setItem(`${StorageKeyConstant.quiz_result}_${dateTime}`,
        JSON.stringify(sortedResults));
    }


    this.resetData();
    return sortedResults;
  }


  /**
   * Remove duplicated answered questions from the result to ensure uniqueness.
   * @param answeredQuestions - Array of answered questions.
   * @returns A unique array of answered questions.
   */
  private removeDuplicateAnswers(answeredQuestions: AnsweredQuestion[]): AnsweredQuestion[] {
    const uniqueQuestions = new Map<string, AnsweredQuestion>();

    answeredQuestions.forEach(question => {
      if (!uniqueQuestions.has(question.id)) {
        uniqueQuestions.set(question.id, question);
      }
    });

    return Array.from(uniqueQuestions.values());
  }

  resetData() {
    this.studentsHistory = [];
    this.quizQuestions = [];
  }
}
