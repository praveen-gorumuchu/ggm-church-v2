import { MessageBarService } from './../../shared/services/message-bar.service';
import { LoginService } from './../../shared/services/login.service';
import { Injectable, inject } from '@angular/core';
import { AnsweredQuestion, QuizResult, StudentHistoryModel } from '../model/student-history.model';
import { CategoryEnum, QuizQuestionsModel } from '../../dashboard/models/quiz-models/quiz.model';
import { StudentModel } from '../../dashboard/models/students/student-list.model';

@Injectable({
  providedIn: 'root',
})
export class QuizPlayService {
  constructor(private loginService: LoginService,
    private messageBarService: MessageBarService
  ) { }
  private studentsHistory: StudentHistoryModel[] = []; // Stores history of each student
  private quizQuestions: QuizQuestionsModel[] = []; // Stores all available quiz questions

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
   * @param studentId - Unique identifier for the student.
   * @param studentName - Name of the student.
   */
  addStudent(studentData: StudentModel) {
    // Check if the student is already added
    if (!this.studentsHistory.find(s => s.studentId === studentData.id)) {
      this.studentsHistory.push({
        studentId: studentData.id,
        studentName: studentData.name,
        answeredQuestions: [],
        previousCategory: null,
        score: 0,
      });
    }
  }

  /**
   * Get the next available question for the student.
   * Ensures that the same category is not asked consecutively and the question has not been answered before.
   * @param studentData - The student requesting the next question.
   * @returns The next quiz question or null if no questions are available.
   */
  getNextQuestionForStudent(studentData: StudentModel): QuizQuestionsModel | null {
    const student = this.studentsHistory.find(s => s.studentId === studentData.id);
    if (!student) {
      this.messageBarService.showErorMsgBar('Student not found');
      return null
    };

    const previousCategory = student.previousCategory;

    // Filter available questions based on category and answered questions
    let availableQuestions = this.quizQuestions.filter(
      q => q.type.name !== previousCategory && !student.answeredQuestions.find(aq => aq.id === q.id)
    );

    // Reset filter if no more questions are left
    if (availableQuestions.length === 0) {
      availableQuestions = this.quizQuestions.filter((questions: QuizQuestionsModel) =>
        !student.answeredQuestions.find((answeredQuestion: AnsweredQuestion) =>
          answeredQuestion.id === questions.id)
      );
    }

    if (availableQuestions.length === 0) {
      this.messageBarService.showErorMsgBar('No more Question are left')
      return null
    };

    // Select a random question from the available ones
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const nextQuestion = availableQuestions[randomIndex];

    // Update student's previous category and add the question to their answered list
    student.previousCategory = nextQuestion.type.name;
    student.answeredQuestions.push(nextQuestion as any);

    return nextQuestion;
  }

  /**
   * Submit the student's answer for a specific question.
   * Updates the student's score and records the answered question.
   * @param studentData - The student submitting the answer.
   * @param question - The question being answered.
   * @param userAnswer - The answer submitted by the student.
   */
  submitAnswer(studentData: StudentModel, question: QuizQuestionsModel, userAnswer: any) {
    const student = this.studentsHistory.find(s => s.studentId === studentData.id);

    if (!student) {
      this.messageBarService.showErorMsgBar('User Not Found');
      return
    };

    if (userAnswer === question.answer) student.score += 10;

    this.recordAnsweredQuestion(student, question, userAnswer);

    this.quizQuestions = this.quizQuestions.filter((q: QuizQuestionsModel) => q.id !== question.id);
  }

  /**
   * Record the answered question in the student's history.
   * @param student - The student who answered the question.
   * @param question - The question that was answered.
   * @param userAnswer - The answer submitted by the student.
   */
  private recordAnsweredQuestion(student: StudentHistoryModel, question: QuizQuestionsModel, userAnswer: boolean) {
    student.answeredQuestions.push({
      id: question.id,
      question: question.question,
      type: question.type,
      answer: question.answer,
      userAnswer,
      options: question.options || [],
    } as AnsweredQuestion);
  }

  /**
   * End the quiz session and calculate results for all students.
   * @returns An array of results for each student.
   */

  endQuiz(): QuizResult[] {
    return this.studentsHistory.map(student => ({
      studentId: student.studentId,
      studentName: student.studentName,
      totalQuestions: student.answeredQuestions.length,
      correctAnswers: student.score / 10, // Total correct answers
      wrongAnswers: student.answeredQuestions.length - (student.score / 10),
      score: student.score,
      orgnasidedBy: this.loginService.loginUser,
      attemptedDate: new Date(),
      answeredQuestions: student.answeredQuestions
    }));
  }

}
