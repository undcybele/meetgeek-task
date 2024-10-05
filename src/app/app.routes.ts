import {Routes} from '@angular/router';
import {RegistrationComponent} from "./screens/registration/registration.component";
import {ChatComponent} from "./screens/chat/chat.component";
import {AuthGuard} from "./auth.guard";

export const routes: Routes = [
    {path: '', component: RegistrationComponent},
    {path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: ''}
];
