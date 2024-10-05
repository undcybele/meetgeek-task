import {Component, HostListener, inject} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IMessage} from "../../models/IMessage";
import {v4 as uuidv4} from 'uuid';
import {UserService} from "../../services/user.service";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";
import {imgBase64} from "../../../assets/img/imgBase64";

@Component({
    selector: 'app-message-input',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatIcon,
        MatFormField,
        MatInput,
        MatIconButton,
        MatSuffix
    ],
    templateUrl: './message-input.component.html',
    styleUrl: './message-input.component.scss'
})
export class MessageInputComponent {
    #userService = inject(UserService);
    #chatService = inject(ChatService);
    messageText = new FormControl('');
    image: string = '';
    checkBox = true;

    @HostListener('window:keyup.enter', ['$event'])
    onKeyUpEnter(event: KeyboardEvent) {
        if (this.checkBox && this.messageText.valid) {
            event?.preventDefault()
            this.sendMessage()
        }
    }

    sendImageMessage() {
        this.image = imgBase64;
        this.sendMessage();
    }

    sendMessage(): void {
        if (!this.messageText.value && !this.image) {
            return;
        }

        const user = this.#userService.currentUser();

        const newMessage: IMessage = {
            id: uuidv4(),
            messageText: this.messageText.value || '',
            image: this.image,
            timestamp: new Date(),
            user: user || 'anonymous',
        };

        this.#chatService.sendMessage(newMessage);
        this.messageText.setValue('');
        this.image = '';
    }
}
