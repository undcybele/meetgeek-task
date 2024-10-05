import {Component, computed, inject, input} from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";
import {IMessage} from "../../models/IMessage";
import {UserService} from "../../services/user.service";
import {Clipboard} from "@angular/cdk/clipboard";
import {ChatService} from "../../services/chat.service";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {DeletionDialogComponent} from "../deletion-dialog/deletion-dialog.component";

@Component({
    selector: 'app-chat-bubble',
    standalone: true,
    imports: [
        NgOptimizedImage,
        MatIcon,
        MatIconButton,
        NgClass
    ],
    templateUrl: './chat-bubble.component.html',
    styleUrl: './chat-bubble.component.scss'
})
export class ChatBubbleComponent {
    readonly #userService = inject(UserService);
    readonly #chatService = inject(ChatService);
    readonly #clipboard = inject(Clipboard);
    readonly dialog = inject(MatDialog);
    readonly messageData = input.required<IMessage>();
    readonly isOwnMessage = computed(() => this.messageData().user === this.#userService.currentUser());
    readonly profilePicture = computed(() => `https://avatar.iran.liara.run/public/boy?username=${this.messageData().user}`);

    openDeleteDialog(messageId: string): void {
        const dialogRef = this.dialog.open(DeletionDialogComponent, { width: '250px' });
        dialogRef.afterClosed().subscribe(result => {
            this.deleteMessage(messageId);
        });
    }

    deleteMessage(messageId: string) {
        this.#chatService.deleteMessage(messageId)
    }

    copyToClipboard(messageText: string | undefined) {
        if (messageText) this.#clipboard.copy(messageText);
    }
}
