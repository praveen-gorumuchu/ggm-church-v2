import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

export interface MatSpinnerConfig {
  value?: number,
  diameter?: number,
  mode?: ProgressSpinnerMode,
  strokeWidth?: number,
  overlay?: boolean,
  color?: string,
  panelClass?: string,
  customClass?: string
}
