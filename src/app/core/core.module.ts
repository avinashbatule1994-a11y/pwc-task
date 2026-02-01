import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent:CoreModule){
  if (parent){
    throw new Error('CoreModule already loaded. Import only in AppModule.')
  }
}
 }
//Prevents accidental multiple imports (critical in large teams).