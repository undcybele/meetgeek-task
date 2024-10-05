import {
    ChangeDetectionStrategy,
    Component,
    effect,
    ElementRef,
    inject,
    viewChild
} from '@angular/core';
import {ChatBubbleComponent} from "../chat-bubble/chat-bubble.component";
import {ChatService} from "../../services/chat.service";

@Component({
    selector: 'app-chat-list',
    standalone: true,
    imports: [
        ChatBubbleComponent
    ],
    templateUrl: './chat-list.component.html',
    styleUrl: './chat-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatListComponent {
    #chatService = inject(ChatService);
    readonly chatMessages = this.#chatService.messages;
    readonly messagesContainer = viewChild.required<ElementRef>('container');

    constructor() {
        effect(() => {
            this.#chatService.messages();
            this.#scrollToBottom();
        });
    }

    #scrollToBottom() {
        setTimeout(() => {
            this.messagesContainer().nativeElement.scrollTop = this.messagesContainer().nativeElement.scrollHeight;
        }, 100);
    }
}
