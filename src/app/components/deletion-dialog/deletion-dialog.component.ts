import {Component, inject} from '@angular/core';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

export interface DialogResult {
    delete: boolean;
}

@Component({
  selector: 'app-deletion-dialog',
  standalone: true,
    imports: [
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        MatDialogTitle
    ],
  templateUrl: './deletion-dialog.component.html',
  styleUrl: './deletion-dialog.component.scss'
})
export class DeletionDialogComponent {
    readonly dialogRef = inject(MatDialogRef<DeletionDialogComponent, DialogResult>);

    save() {
      this.dialogRef.close({delete: true});
    }

    cancel() {
      this.dialogRef.close({delete: false});
    }
}
