export interface RouterStateModel {
  action: RouterAction.TypeEnum
  data?: any;
}

export namespace RouterAction {
  export type TypeEnum = 'Edit' | 'Create' | '';
  export const TypeEnum = {
    EDIT: 'Edit' as TypeEnum,
    CREATE: 'Create' as TypeEnum,
  }
}
