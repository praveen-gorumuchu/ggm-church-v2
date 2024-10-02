export enum CategoryEnum {
    QNA = 'QUESTION_AND_ANSWER',
    FILL_WORD = 'FILL_THE_WORD',
    OPTIONS = 'OPTIONS',
}

export interface QuizQuestionsModel {
    type: CategoryListModel
    id: string;
    question: string;
    answer?: string;
    options?: string[];
    createdBy: string;
    creationDate: Date;
    modifiedBy: string;
    modifiedDate: Date | null;
    deletedBy: string;
    deletionDate: Date | null;
    version?: number;
    timer?: number
  }

  export interface QuizResponseModel {
    data: Array<QuizQuestionsModel>
  }
  

export interface CategoryListModel {
    name: CategoryEnum,
    value: string,
    timer: number
}





