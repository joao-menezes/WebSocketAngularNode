import { Component, Input, OnInit } from '@angular/core';
import { WebsocketService } from "../web-socket.service";

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  @Input() userName: string = '';
  messages: string[] = [];
  message: string = '';
  private socket: any;

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.socket = this.websocketService.connect('ws://localhost:8080');

    this.socket.subscribe((event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type === 'message') {
        this.messages.push(data.message);
      }else {
        console.warn('Received unknown message type:', event.data);
      }
    });
  }

  sendMessage() {
    if (this.message.trim() !== '') {
      const message = `${this.userName}: ${this.message.trim()}`;
      // const sender = `${this.userName}`;
      this.socket.next({ type: 'message', message});
      // this.socket.next({ type: 'sender', sender });
      this.message = '';
    }
  }
}
