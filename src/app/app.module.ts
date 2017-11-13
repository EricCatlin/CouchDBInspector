import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { ClockService} from './services/clock.service';
import { CouchService} from './services/couch.service';

import { KeysPipe, OrderByPipe} from './services/pipes';


import { AppComponent } from './app.component';



import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActiveTasks } from './components/active_tasks/active_tasks.component';
import { ReplicationState } from './components/replication_state/replication_state.component';


import { AppRoutingModule } from './app-routing.module';


// PrimeNG Stuff
import { ButtonModule } from 'primeng/primeng';
import { ToolbarModule } from 'primeng/primeng';
import { ChartModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import {ProgressBarModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {InputSwitchModule} from 'primeng/primeng';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    KeysPipe,
    OrderByPipe,
    ActiveTasks,
    ReplicationState
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToolbarModule,
    ButtonModule,
    ChartModule,
    PanelModule,
    ProgressBarModule,
    TabViewModule,
    DropdownModule,
    InputSwitchModule
    
    
  ],
  providers: [ClockService,CouchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
