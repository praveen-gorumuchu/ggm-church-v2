import { DisplayScreen } from './display-screen.model';
import { DataTableButtons } from './table-headers.model copy';

export interface DailogDataModel  {
  title:string,
  icon?: string,
  iconColor:string,
  buttons:Array<DataTableButtons>,
  screen?: DisplayScreen.TypeEnum,
  data?: any
}
