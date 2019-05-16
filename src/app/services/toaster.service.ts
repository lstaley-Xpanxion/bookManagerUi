import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { ToasterComponent } from "../toaster/toaster.component";

@Injectable({
  providedIn: "root"
})
export class ToasterService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccessToaster(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1000;
    config.horizontalPosition = "right";
    config.verticalPosition = "bottom";
    config.panelClass = "success-toaster";
    config.data = { message, type: "success" };
    this.snackBar.openFromComponent(ToasterComponent, config);
  }

  showErrorToaster(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1000;
    config.horizontalPosition = "right";
    config.verticalPosition = "bottom";
    config.panelClass = "error-toaster";
    config.data = { message, type: "error" };
    this.snackBar.openFromComponent(ToasterComponent, config);
  }

  showInfoToaster(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1000;
    config.horizontalPosition = "right";
    config.verticalPosition = "bottom";
    config.panelClass = "info-toaster";
    config.data = { message, type: "info" };
    this.snackBar.openFromComponent(ToasterComponent, config);
  }

  showWarningToaster(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1000;
    config.horizontalPosition = "right";
    config.verticalPosition = "bottom";
    config.panelClass = "warning-toaster";
    config.data = { message, type: "warning" };
    this.snackBar.openFromComponent(ToasterComponent, config);
  }

  showCustomToaster(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1000;
    config.horizontalPosition = "right";
    config.verticalPosition = "bottom";
    config.panelClass = "default-toaster";
    config.data = { message, type: "default" };
    this.snackBar.openFromComponent(ToasterComponent, config);
  }
}
