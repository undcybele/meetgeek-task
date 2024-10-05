import {Component} from '@angular/core';
import {ChatBubbleComponent} from "../../components/chat-bubble/chat-bubble.component";
import {MessageInputComponent} from "../../components/message-input/message-input.component";
import {ChatListComponent} from "../../components/chat-list/chat-list.component";

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [
        ChatBubbleComponent,
        MessageInputComponent,
        ChatListComponent
    ],
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.scss'
})
export class ChatComponent {
}
