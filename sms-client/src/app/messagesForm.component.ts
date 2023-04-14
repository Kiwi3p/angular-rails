import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message-form',
  template: `
  <div>

<div>
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-6 text-center">New Message</h1>
    <form class="w-96 max-w-sm mx-auto bg-white p-8 rounded-md shadow-md" (submit)="onSubmit($event)">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
          <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" placeholder="John Doe" type="text" name="recipientName" [(ngModel)]="recipientName" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Phone Number</label>
        <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" type="text" name="recipientPhone" [(ngModel)]="recipientPhone" placeholder="+15555555555" />
      </div>
      <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Message</label>
      <textarea type="text" name="messageBody" [(ngModel)]="messageBody" class="w-full h-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" placeholder="message goes here"></textarea>
      </div>
     
      <button
        class="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
        type="submit">Submit</button>
    </form>
  </div>
</div>
    </div>
  `,
})
export class MessageFormComponent {
  @Output() messageCreated = new EventEmitter();

  recipientName: string = '';
  recipientPhone: string = '';
  messageBody: string = '';

  constructor(private http: HttpClient, private messageService: MessageService) {}

  onSubmit(event: Event): void {
    event.preventDefault();
  
    const message = {
      recipient_name: this.recipientName,
      recipient_phone: this.recipientPhone,
      message_body: this.messageBody,
    };
  
    this.messageService.addMessage(message).subscribe(() => {
      console.log('Message created successfully');
      this.messageService.emitMessageCreated();
    });
  }
}
