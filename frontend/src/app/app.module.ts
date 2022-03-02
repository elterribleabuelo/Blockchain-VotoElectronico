import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PollCreateComponent } from './poll-create/poll-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PollComponent } from './poll/poll.component';
import { PollVoteComponent } from './poll-vote/poll-vote.component';
import { PollService } from './poll-service/poll.service';
import { LoginComponent } from './login/login.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu'
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { routing,appRoutingProviders } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DataComponent } from './data/data.component';
import { AuxPollComponent } from './aux-poll/aux-poll.component';
import { AuxPollCreateComponent } from './aux-poll-create/aux-poll-create.component';

@NgModule({
  declarations: [
    AppComponent,
    PollCreateComponent,
    PollComponent,
    PollVoteComponent,
    LoginComponent,
    SidenavComponent,
    HeaderComponent,
    HomeComponent,
    DataComponent,
    AuxPollComponent,
    AuxPollCreateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, //4.Forms
    ReactiveFormsModule, //4.Forms
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    routing
  ],
  providers: [
    PollService,
    appRoutingProviders
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
