import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages.component';
import { MessageFormComponent } from './messagesForm.component';
import { SocketIoModule } from 'ngx-socket-io';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    MessageFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot({ url: 'http://localhost:3000', options: {} })
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { 
  messages: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.refreshMessages();
  }

  refreshMessages() {
    this.http.get('http://localhost:3000/messages')
      .subscribe((data: any) => {
        this.messages = data;
      });
  }

  onMessageCreated() {
    this.http.get('http://localhost:3000/messages')
      .subscribe((data: any) => {
        this.messages = data;
        this.messages.push(data[data.length - 1]); // add the new message to the end of the array
      });
  }
}
