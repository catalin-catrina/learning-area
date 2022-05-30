import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ContactmanagerAppComponent } from './contactmanager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ContactmanagerAppComponent,
  },
  { children: [{ path: '', component: MainContentComponent }] },
];

@NgModule({
  declarations: [
    ContactmanagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SideNavComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
  ],
})
export class ContactmanagerModule {}
