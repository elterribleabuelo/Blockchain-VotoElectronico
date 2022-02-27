import {ModuleWithProviders, NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PollCreateComponent } from './poll-create/poll-create.component';
import { AuxPollComponent } from './aux-poll/aux-poll.component';
import { PollComponent } from './poll/poll.component';
import { PollVoteComponent } from './poll-vote/poll-vote.component';
import { DataComponent } from './data/data.component';



const routes:Routes = [
  {path: '', redirectTo: 'home',pathMatch:'full'},
  {path : 'home', component : HomeComponent},
  {path: 'pollCreate',component: PollCreateComponent},
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
