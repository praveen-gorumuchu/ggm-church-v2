export interface DataTableActions {
  action?: ActionType.StatusEnum,
  data?: any,
  deletedRemarks?: any,
}

export namespace ActionType {
  export type StatusEnum = 'Edit' | 'Delete' | 'View' | 'Register' | 'Print'|'Cancel'|'PrintAll' | 'AssessmentStart' | 'Download'| 'Download ALL'| 'Preview' | 'Excel'|'Update';
  export const StatusEnum = {
    EDIT: 'Edit' as StatusEnum,
    DELETE: 'Delete' as StatusEnum,
    VIEW: 'View' as StatusEnum,
    REGISTER: 'Register' as StatusEnum,
    PRINT: 'Print' as StatusEnum,
    CANCEL: 'Cancel' as StatusEnum,
    PRINT_ALL: 'PrintAll' as StatusEnum,
    ASSESSMENT_START: 'AssessmentStart' as StatusEnum,
    WITHDRAW: 'Withdraw' as StatusEnum,
    UPDATE: 'Update' as StatusEnum,
    ALL_PRESENT: 'Mark All Present' as StatusEnum,
    DOWNLOAD: 'Download' as StatusEnum,
    DOWNLOADALL: 'Download All' as StatusEnum,
    PREVIEW: 'Preview' as StatusEnum,
    EXCEL: 'Excel' as StatusEnum,
    DOWNLOADCERT: 'Download Certificate' as StatusEnum
  }
}
