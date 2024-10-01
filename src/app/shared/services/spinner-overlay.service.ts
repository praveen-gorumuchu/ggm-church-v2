import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';

import { MatSpinnerComponent } from '../components/mat-spinner/mat-spinner.component';
import { NumberConstant } from '../constants/number-constant';
import { MatSpinnerConfig } from '../models/new/mat-spinner-config.model';



@Injectable({
  providedIn: 'root'
})
export class SpinnerOverlayService {
  overlayRef!: OverlayRef;
  constructor(private overlay: Overlay) { }

  showSpinner(config?: MatSpinnerConfig) {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });
    const spinnerOverlayPortal = new ComponentPortal(MatSpinnerComponent);
    const customSpineer = spinnerOverlayPortal.attach(this.overlayRef);
    if (config) {
      customSpineer.instance.panelClass = config.panelClass && config.panelClass || '';
      customSpineer.instance.overlay = config.overlay && config.overlay || false;
      customSpineer.instance.customClass = config.customClass && config.customClass || '';
      customSpineer.instance.value = config.value && config.value || NumberConstant.HUNDERED;
      customSpineer.instance.diameter = config.diameter && config.diameter || NumberConstant.FIFTY;
      customSpineer.instance.strokeWidth = config.strokeWidth && config.strokeWidth || NumberConstant.FIVE;
      customSpineer.instance.color = config.color && config.color || 'primary';
      customSpineer.instance.mode = config.mode && config.mode || 'indeterminate';
    }
  }

  hideSpinner() {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }

  }
}
