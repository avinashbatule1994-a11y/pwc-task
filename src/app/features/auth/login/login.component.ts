import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.scss']
})
export class LoginComponent {

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) { }
  login() {
    if (this.form.invalid) return;
    console.log('form submitted')
    this.userService.getUsers().subscribe(users => {
      const user = users.find(
        u =>
          u.email === this.form.value.email &&
          u.password === this.form.value.password
      );

      if (!user) {
        alert('Invalid credentials');
        return;
      }

      this.auth.login(user);
      this.router.navigate(['/dashboard']);
    });
  }

}
