import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent {
  userName = '';
  settedName = false;

  constructor(private messageService: MessageService) {}

  goToChat(userName: string) {
    if (userName.trim() !== '') {
      this.userName = userName.trim();
      this.settedName = true;
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Name field is required' });
    }
  }
}
