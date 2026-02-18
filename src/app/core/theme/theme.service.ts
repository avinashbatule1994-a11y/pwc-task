import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  toggle(): void {
    const themeLink = document.getElementById('app-theme') as HTMLLinkElement;

    const isDark = themeLink.href.includes('pink-bluegrey');

    themeLink.href = isDark
      ? 'https://cdn.jsdelivr.net/npm/@angular/material@16/prebuilt-themes/indigo-pink.css'
      : 'https://cdn.jsdelivr.net/npm/@angular/material@16/prebuilt-themes/pink-bluegrey.css';
  }
}
