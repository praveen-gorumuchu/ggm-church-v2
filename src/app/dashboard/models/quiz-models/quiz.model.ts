export enum QuizCategory {
    QnA = 'QuestionAndAnswer',
    FillLetter = 'FillTheLetter',
    TrueOrFalse = 'TrueOrFalse',
}

export interface CreateQuiz {
    type: QuizCategory,
    question: string,
    answer: string | boolean,
    createdBy?: string,
    createdDate?: Date,
    deletedBy?: string,
    deltedDate?: Date,
    modifiedBy?: string,
    modifiedDate?: Date,
}



