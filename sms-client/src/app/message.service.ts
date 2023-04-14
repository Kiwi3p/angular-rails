import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageSubject = new Subject<any>();
  private messages: any[] = [];

  constructor(private http: HttpClient) {}

  addMessage(message: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const body = {
      message: {
        recipient_name: message.recipient_name,
        recipient_phone: message.recipient_phone,
        message_body: message.message_body,
      },
    };
    return this.http.post(
      'http://localhost:3000/messages',
      JSON.stringify(body),
      { headers }
    );
  }

  getMessage(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  updateMessages(): void {
    this.http.get<any[]>('http://localhost:3000/messages').subscribe(
      (messages) => {
        this.messages = messages;
        this.messageSubject.next(messages);
      },
      (error) => console.log(error)
    );
  }

  getMessages(): Observable<any[]> {
    return of(this.messages);
  }
  

  emitMessageCreated(): void {
    this.messageSubject.next(true);
  }
}
