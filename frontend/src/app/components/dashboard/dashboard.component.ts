import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../models/application.model';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  template: `
    <h2 class="mb-4">Dashboard</h2>

    @if (error()) {
      <div class="alert alert-danger">{{ error() }}</div>
    }

    <div class="row g-3">
      <div class="col-6 col-md">
        <div class="card text-bg-primary text-center h-100">
          <div class="card-body">
            <h6 class="card-title">Total Applications</h6>
            <p class="display-6 mb-0">{{ total() }}</p>
          </div>
        </div>
      </div>
      <div class="col-6 col-md">
        <div class="card text-bg-info text-center h-100">
          <div class="card-body">
            <h6 class="card-title">Applied</h6>
            <p class="display-6 mb-0">{{ applied() }}</p>
          </div>
        </div>
      </div>
      <div class="col-6 col-md">
        <div class="card text-bg-warning text-center h-100">
          <div class="card-body">
            <h6 class="card-title">Interviews</h6>
            <p class="display-6 mb-0">{{ interviews() }}</p>
          </div>
        </div>
      </div>
      <div class="col-6 col-md">
        <div class="card text-bg-success text-center h-100">
          <div class="card-body">
            <h6 class="card-title">Selected</h6>
            <p class="display-6 mb-0">{{ selected() }}</p>
          </div>
        </div>
      </div>
      <div class="col-6 col-md">
        <div class="card text-bg-danger text-center h-100">
          <div class="card-body">
            <h6 class="card-title">Rejected</h6>
            <p class="display-6 mb-0">{{ rejected() }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <a routerLink="/applications" class="btn btn-outline-dark me-2">View Applications</a>
      <a routerLink="/add" class="btn btn-dark">+ Add Application</a>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  private service = inject(ApplicationService);
  applications = signal<Application[]>([]);
  error = signal('');

  total = computed(() => this.applications().length);
  applied = computed(() => this.count('Applied'));
  interviews = computed(() => this.count('Interview'));
  selected = computed(() => this.count('Selected'));
  rejected = computed(() => this.count('Rejected'));

  ngOnInit() {
    this.service.getAll().subscribe({
      next: (data) => this.applications.set(data),
      error: () => this.error.set('Could not load data. Is the backend running?'),
    });
  }

  private count(status: string): number {
    return this.applications().filter((a) => a.status === status).length;
  }
}