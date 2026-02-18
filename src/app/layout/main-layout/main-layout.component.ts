
import {
  ChangeDetectionStrategy,
  Component,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { map, shareReplay } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {

  @ViewChild('sidenav') sidenav!: MatSidenav;

  user$ = this.auth.user$;

  userLabel$ = this.user$.pipe(
    map(u => u ? `${u.username} (${u.role})` : null)
  );



  isMobile$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    public auth: AuthService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) { }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  toggleTheme() {
    document.body.classList.toggle('dark-theme');
  }
}
