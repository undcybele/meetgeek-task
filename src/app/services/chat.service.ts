import {Injectable, OnDestroy, signal} from '@angular/core';
import {IMessage} from '../models/IMessage';

@Injectable({
    providedIn: 'root',
})
export class ChatService implements OnDestroy {
    messages = signal<IMessage[]>(this.getMessagesFromLocalStorage());

    constructor() {
        window.addEventListener('storage', (event) => {
            if (event.key === 'chatMessages') {
                this.messages.set(this.getMessagesFromLocalStorage());
            }
        });
    }

    ngOnDestroy(): void {
      window.removeEventListener('storage', (event) => {})
    }

    sendMessage(newMessage: IMessage): void {
        this.simulateServerResponse()
        this.messages.update((currentMessages) => {
            const updatedMessages = [...currentMessages, newMessage];
            localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
            return updatedMessages;
        });
    }

    deleteMessage(id: string): void {
        this.messages.update((currentMessages) => {
            const updatedMessages = currentMessages.filter(message => message.id !== id);
            localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
            return updatedMessages;
        });
        this.simulateServerResponse()
    }

    private getMessagesFromLocalStorage() {
        const savedMessages = localStorage.getItem('chatMessages');
        return savedMessages ? JSON.parse(savedMessages) as IMessage[] : [];
    }

    private simulateServerResponse(): void {
        setTimeout(() => {
        }, 1000);
    }
}
