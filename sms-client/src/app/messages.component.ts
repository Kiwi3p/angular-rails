import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';

@Component({
  selector: 'app-messages',
  template: `
    <div class="m-5">

    <div>
    <div class="container mx-auto py-8">
        <h1 class="text-2xl font-bold mb-6 text-center">Message History {{messages.length}}</h1>
        <div class="h-96 overflow-scroll w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
        <div *ngFor="let message of messages.reverse()" class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">{{ message.created_at }}</label>
            <div  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            ><strong>{{ message.recipient_name }}</strong>
            {{ message.message_body }}</div>
        </div>
        
        </div>
    </div>
    </div>
    
    </div>
  `,
})
export class MessagesComponent implements OnInit {
  messages: any[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.getMessage().subscribe((messageCreated: boolean) => {
      if (messageCreated) {
        this.messageService.getMessages().subscribe((messages: any[]) => {
          this.messages = messages;
        });
      }
    });
    this.messageService.updateMessages();
    setInterval(() => {
      this.messageService.updateMessages();
    }, 5000);
  }
}
