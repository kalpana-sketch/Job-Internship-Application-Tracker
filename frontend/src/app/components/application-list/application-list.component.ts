import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../models/application.model';

@Component({
  selector: 'app-application-list',
  imports: [FormsModule, RouterLink, DatePipe],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="mb-0">Applications</h2>
      <a routerLink="/add" class="btn btn-dark">+ Add Application</a>
    </div>

    @if (error()) {
      <div class="alert alert-danger">{{ error() }}</div>
    }

    <div class="row g-2 mb-3">
      <div class="col-md-8">
        <input
          type="text"
          class="form-control"
          placeholder="Search by company or role..."
          [ngModel]="searchText()"
          (ngModelChange)="searchText.set($event)"
        />
      </div>
      <div class="col-md-4">
        <select
          class="form-select"
          [ngModel]="statusFilter()"
          (ngModelChange)="statusFilter.set($event)"
        >
          <option value="">All Statuses</option>
          @for (s of statuses; track s) {
            <option [value]="s">{{ s }}</option>
          }
        </select>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-hover align-middle bg-white border">
        <thead class="table-light">
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Type</th>
            <th>Location</th>
            <th>Status</th>
            <th>Applied</th>
            <th>Interview</th>
            <th>Link</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (app of filtered(); track app._id) {
            <tr>
              <td class="fw-semibold">{{ app.companyName }}</td>
              <td>{{ app.role }}</td>
              <td>{{ app.type }}</td>
              <td>{{ app.location || '-' }}</td>
              <td>
                <span class="badge" [class]="badgeClass(app.status)">{{ app.status }}</span>
              </td>
              <td>{{ app.applicationDate ? (app.applicationDate | date: 'dd MMM yyyy') : '-' }}</td>
              <td>{{ app.interviewDate ? (app.interviewDate | date: 'dd MMM yyyy') : '-' }}</td>
              <td>
                @if (app.jobLink) {
                  <a [href]="app.jobLink" target="_blank" rel="noopener">Open</a>
                } @else {
                  -
                }
              </td>
              <td>{{ app.notes || '-' }}</td>
              <td class="text-nowrap">
                <a [routerLink]="['/edit', app._id]" class="btn btn-sm btn-outline-primary me-1">Edit</a>
                <button class="btn btn-sm btn-outline-danger" (click)="remove(app)">Delete</button>
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="10" class="text-center text-muted py-4">No applications found.</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class ApplicationListComponent implements OnInit {
  private service = inject(ApplicationService);

  statuses = ['Saved', 'Applied', 'Assessment', 'Interview', 'Selected', 'Rejected'];

  applications = signal<Application[]>([]);
  searchText = signal('');
  statusFilter = signal('');
  error = signal('');

  filtered = computed(() => {
    const text = this.searchText().trim().toLowerCase();
    const status = this.statusFilter();
    return this.applications().filter((a) => {
      const matchesText =
        !text ||
        a.companyName.toLowerCase().includes(text) ||
        a.role.toLowerCase().includes(text);
      const matchesStatus = !status || a.status === status;
      return matchesText && matchesStatus;
    });
  });

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe({
      next: (data) => this.applications.set(data),
      error: () => this.error.set('Could not load applications. Is the backend running?'),
    });
  }

  remove(app: Application) {
    if (!app._id) return;
    if (!confirm(`Delete application for ${app.companyName}?`)) return;
    this.service.delete(app._id).subscribe({
      next: () => this.applications.update((list) => list.filter((a) => a._id !== app._id)),
      error: () => this.error.set('Could not delete the application.'),
    });
  }

  badgeClass(status: string): string {
    const map: Record<string, string> = {
      Saved: 'text-bg-secondary',
      Applied: 'text-bg-info',
      Assessment: 'text-bg-primary',
      Interview: 'text-bg-warning',
      Selected: 'text-bg-success',
      Rejected: 'text-bg-danger',
    };
    return 'badge ' + (map[status] || 'text-bg-secondary');
  }
}