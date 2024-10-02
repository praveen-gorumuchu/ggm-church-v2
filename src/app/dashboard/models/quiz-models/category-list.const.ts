import { CategoryEnum, CategoryListModel } from "./quiz.model";


export const CategoryList: CategoryListModel[] = [
    {
        name: CategoryEnum.FILL_WORD,
        value: 'Fill the Word',
        timer: 50
    },
    {
        name: CategoryEnum.QNA,
        value: 'Question and Answer',
        timer: 60
    },
    {
        name: CategoryEnum.OPTIONS,
        value: 'Options',
        timer: 30
    }
];
