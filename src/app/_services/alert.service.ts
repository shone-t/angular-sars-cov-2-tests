import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({ providedIn: "root" })
export class AlertService {
  constructor(private messageService: MessageService) {}

  // convenience methods
  success(message: string, options?: any) {
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: message,
    });
  }

  error(message: string, options?: any) {
    this.messageService.add({severity:'error', summary: 'Error', detail: message});
  }

  info(message: string, options?: any) {
    this.messageService.add({severity:'info', summary: 'Info', detail: message});
  }

  warn(message: string, options?: any) {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: message});
  }

  clear() {
    this.messageService.clear();
}

}
