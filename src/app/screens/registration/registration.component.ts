import {Component, HostListener, inject} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {UserService} from "../../services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-registration',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatError,
        MatFormField,
        MatInput
    ],
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
    #router = inject(Router);
    #userService = inject(UserService)
    #toasterService = inject(ToastrService);
    name = new FormControl('', [Validators.required, Validators.minLength(3)]);

    @HostListener('window:keyup.enter')
    onKeyUpEnter() {
        this.accessChat();
    }

    accessChat() {
        if (!this.name.value)
            this.#toasterService.error('Invalid name!')
        else {
            this.#userService.register(this.name.value);
            this.#toasterService.success('Logged in successfully!')
            this.#router.navigate(['/chat']).then();
        }
    }
}
