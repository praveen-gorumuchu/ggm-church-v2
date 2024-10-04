import { DataTableButtons } from "../models/new/table-headers.model copy"
import { ActionType } from "../models/new/data-table-actions"

export class DialogData {
    static readonly noQuestionsLeft = {
        title: "That's all for today.",
        subTitle: 'Results are generated now.!',
        buttons: [
            {
                name: ActionType.StatusEnum.CLOSE,
            },
        ]
    }
}

export const DialogConstants = {
    
}

export interface DailogDataModel {
    title: string,
    subTitle: string,
    buttons: Array<DataTableButtons>
}