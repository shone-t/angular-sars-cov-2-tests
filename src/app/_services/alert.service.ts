import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { toastDuration } from "../_helpers/constants";

@Injectable({ providedIn: "root" })
export class AlertService {
  constructor(private messageService: MessageService) {}

  // convenience methods
  success(message: string, options?: any) {
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: message,
      life: toastDuration,
    });
  }

  error(message: string, options?: any) {
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: message,
      life: toastDuration,
    });
  }

  info(message: string, options?: any) {
    this.messageService.add({
      severity: "info",
      summary: "Info",
      detail: message,
      life: toastDuration,
    });
  }

  warn(message: string, options?: any) {
    this.messageService.add({
      severity: "warn",
      summary: "Warn",
      detail: message,
      life: toastDuration,
    });
  }

  clear() {
    this.messageService.clear();
  }
}
