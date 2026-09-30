import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand fw-bold" routerLink="/dashboard">JobTrack</a>
        <div class="navbar-nav">
          <a class="nav-link" routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
          <a class="nav-link" routerLink="/applications" routerLinkActive="active">Applications</a>
          <a class="nav-link" routerLink="/add" routerLinkActive="active">+ Add Application</a>
        </div>
      </div>
    </nav>
    <div class="container py-4">
      <router-outlet />
    </div>
  `,
})
export class App {}