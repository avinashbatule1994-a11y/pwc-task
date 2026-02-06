import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { ButtonModule } from 'primeng/button';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    AuthRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class AuthModule { }
