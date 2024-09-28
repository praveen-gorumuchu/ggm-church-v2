// quiz-types.enum.ts
export enum QuizType {
    QUESTION_AND_ANSWER = 'Q & A',
    TRUE_OR_FALSE = 'True Or False',
    FILL_THE_WORDS = 'Fill the Words',
}

export enum InputType {
    QUESTION_AND_ANSWER = 'QUESTION_AND_ANSWER',
    TRUE_OR_FALSE = 'TRUE_OR_FALSE',
    FILL_THE_LETTERS = 'FILL_THE_LETTERS',
}

export const QuizTypeList = [
    {
        name: 'Q & A',
        categeory: InputType.QUESTION_AND_ANSWER
    },
    {
        name: 'True Or False',
        categeory: InputType.TRUE_OR_FALSE
    },
    {
        name: 'Fill the Words',
        categeory: InputType.FILL_THE_LETTERS
    },
]
