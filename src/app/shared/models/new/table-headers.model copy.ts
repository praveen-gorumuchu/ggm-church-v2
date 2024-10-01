import { ActionType } from "./data-table-actions";
import { DisplayScreen } from "./display-screen.model"


export interface TableCols {
  tableColsArray: Array<TableHeaders>
}

export interface TableHeaders {
  key?: any,
  display?: any,
  config?: any,
  colspan?: number,
  rowspan?: number
}

export interface DataTableButtons {
  name: ActionType.StatusEnum,
  color: string,
  icon?: string,
  disable?: boolean,
  print?: boolean,
  screen?: DisplayScreen.TypeEnum,
}
export interface ReportsDataTableButtons {
  action: Array<DataTableButtons>,
  exportButtons: Array<DataTableButtons>
}
