import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  providers: [
    AuthService,
    AuthGuard,
    RoleGuard
  ],
  declarations: [
    ToolbarComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('CoreModule already loaded.');
    }
  }
}

//Prevents accidental multiple imports (critical in large teams).