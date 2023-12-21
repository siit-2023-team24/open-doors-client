import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { MaterialModule } from '../infrastucture/material/material.module';
import { MapComponent } from './map/map.component';




@NgModule({
  declarations: [
    DialogComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    DialogComponent,
    MapComponent
  ]
})
export class SharedModule { }
