export interface QuizNavigationStatus {
    cuurent?: QuizNaviationEnum,
    previous?: QuizNaviationEnum,
    next?: QuizNaviationEnum,
    forward_click?: QuizNavigationArrowEnum,
    backWard_click?: QuizNavigationArrowEnum,
}

export enum QuizNaviationEnum {
    QZ_SELECT_A_STUDENT = 'select A Participent',
    QZ_PICK_CARD = 'PICK A CARD',
    QZ_QUESTION_SCREEN = 'Show Question',
    QZ_EMPTY = ''
}

export enum QuizNavigationArrowEnum {
    FORWARD = 'FORWARD',
    BACKWARD = 'BACKWARD'
}