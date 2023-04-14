import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  messages: any[] = []; // provide a default value

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.refreshMessages();
  }

  refreshMessages() {
    this.http.get('http://localhost:3000/messages').subscribe((data: any) => {
      this.messages = data;
    });
  }

  onMessageCreated() {
    this.refreshMessages();
  }
}
