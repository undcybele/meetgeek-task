import {Injectable, signal} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    currentUser = signal<string | null>(null);

    register(user: string): void {
        if (user) this.currentUser.set(user);
    }

    isLoggedIn(): boolean {
        return this.currentUser() !== null;
    }
}
