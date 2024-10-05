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
import {ToastrService} from "ngx-toastr";
import {firstValueFrom, tap} from "rxjs";

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
  readonly #toasterService = inject(ToastrService);
  readonly #dialog = inject(MatDialog);
  readonly messageData = input.required<IMessage>();
  readonly isOwnMessage = computed(() => this.messageData().user === this.#userService.currentUser());
  readonly profilePicture = computed(() => `https://avatar.iran.liara.run/public/boy?username=${this.messageData().user}`);

  async openDeleteDialog(messageId: string) {
    const dialogRef = this.#dialog.open(DeletionDialogComponent, {width: '250px'});
    await firstValueFrom(dialogRef.afterClosed().pipe(tap((result) => {
        if (result.delete) {
          this.deleteMessage(messageId)
        }
      }
    )));
  }

  deleteMessage(messageId: string) {
    try {
      this.#chatService.deleteMessage(messageId)
      this.#toasterService.success("Message deleted successfully!");
    } catch (e) {
      this.#toasterService.error("Could not delete message!");
    }
  }

  copyToClipboard(messageText: string | undefined) {
    if (messageText) {
      this.#clipboard.copy(messageText);
      this.#toasterService.success("Message copied to clipboard");
    }
  }
}
