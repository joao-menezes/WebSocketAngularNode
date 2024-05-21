import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private ws?: WebSocket;
  private subject?: Subject<any>;

  public connect(url: string): Subject<any> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Successfully connected: ' + url);
    }
    return this.subject;
  }

  private create(url: string): Subject<any> {
    this.ws = new WebSocket(url);

    const observable = new Observable((observer) => {
      // @ts-ignore
      this.ws.onmessage = observer.next.bind(observer);
      // @ts-ignore
      this.ws.onerror = observer.error.bind(observer);
      // @ts-ignore
      this.ws.onclose = observer.complete.bind(observer);
      // @ts-ignore
      return () => this.ws.close();
    });

    const observer = {
      next: (data: any) => {
        // @ts-ignore
        if (this.ws.readyState === WebSocket.OPEN) {
          // @ts-ignore
          this.ws.send(JSON.stringify(data));
        }
      }
    };

    return Subject.create(observer, observable);
  }
}
