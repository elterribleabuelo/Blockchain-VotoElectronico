import {ModuleWithProviders, NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PollCreateComponent } from './poll-create/poll-create.component';
import { AuxPollComponent } from './aux-poll/aux-poll.component';
import { PollComponent } from './poll/poll.component';
import { PollVoteComponent } from './poll-vote/poll-vote.component';
import { DataComponent } from './data/data.component';
import { AuxPollCreateComponent } from './aux-poll-create/aux-poll-create.component';
import { LoginComponent } from './login/login.component';



const routes:Routes = [
  {path: '', redirectTo: 'login',pathMatch:'full'},
  {path:  'login',component:LoginComponent},
  {path : 'home', component : HomeComponent},
  {path: 'pollCreate',component: AuxPollCreateComponent},
  {path: 'poll', component:AuxPollComponent},
  {path: 'pollVote', component:PollVoteComponent},
  {path: 'data', component:DataComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}


// Exportat el modulo
export const appRoutingProviders:any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
