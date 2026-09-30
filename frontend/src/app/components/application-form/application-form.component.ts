import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../models/application.model';

@Component({
  selector: 'app-application-form',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <h2 class="mb-3">{{ isEdit() ? 'Edit Application' : 'Add Application' }}</h2>

    @if (error()) {
      <div class="alert alert-danger">{{ error() }}</div>
    }

    <form [formGroup]="form" (ngSubmit)="submit()" class="card card-body">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Company Name *</label>
          <input
            type="text"
            class="form-control"
            formControlName="companyName"
            [class.is-invalid]="invalid('companyName')"
          />
          <div class="invalid-feedback">Company name is required.</div>
        </div>

        <div class="col-md-6">
          <label class="form-label">Role *</label>
          <input
            type="text"
            class="form-control"
            formControlName="role"
            [class.is-invalid]="invalid('role')"
          />
          <div class="invalid-feedback">Role is required.</div>
        </div>

        <div class="col-md-4">
          <label class="form-label">Type *</label>
          <select class="form-select" formControlName="type" [class.is-invalid]="invalid('type')">
            <option value="">Select type</option>
            @for (t of types; track t) {
              <option [value]="t">{{ t }}</option>
            }
          </select>
          <div class="invalid-feedback">Type is required.</div>
        </div>

        <div class="col-md-4">
          <label class="form-label">Location</label>
          <input type="text" class="form-control" formControlName="location" />
        </div>

        <div class="col-md-4">
          <label class="form-label">Status *</label>
          <select class="form-select" formControlName="status" [class.is-invalid]="invalid('status')">
            <option value="">Select status</option>
            @for (s of statuses; track s) {
              <option [value]="s">{{ s }}</option>
            }
          </select>
          <div class="invalid-feedback">Status is required.</div>
        </div>

        <div class="col-md-6">
          <label class="form-label">Application Date</label>
          <input type="date" class="form-control" formControlName="applicationDate" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Interview Date</label>
          <input type="date" class="form-control" formControlName="interviewDate" />
        </div>

        <div class="col-12">
          <label class="form-label">Job Link</label>
          <input
            type="text"
            class="form-control"
            formControlName="jobLink"
            placeholder="https://..."
          />
        </div>

        <div class="col-12">
          <label class="form-label">Notes</label>
          <textarea class="form-control" rows="3" formControlName="notes"></textarea>
        </div>
      </div>

      <div class="mt-4">
        <button type="submit" class="btn btn-dark me-2" [disabled]="saving()">
          {{ isEdit() ? 'Update' : 'Save' }}
        </button>
        <a routerLink="/applications" class="btn btn-outline-secondary">Cancel</a>
      </div>
    </form>
  `,
})
export class ApplicationFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(ApplicationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  types = ['Internship', 'Full-time'];
  statuses = ['Saved', 'Applied', 'Assessment', 'Interview', 'Selected', 'Rejected'];

  isEdit = signal(false);
  saving = signal(false);
  error = signal('');
  private id: string | null = null;

  form = this.fb.nonNullable.group({
    companyName: ['', Validators.required],
    role: ['', Validators.required],
    type: ['Internship', Validators.required],
    location: [''],
    status: ['Applied', Validators.required],
    applicationDate: [this.today()],
    interviewDate: [''],
    jobLink: [''],
    notes: [''],
  });

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.isEdit.set(true);
      this.service.getAll().subscribe({
        next: (list) => {
          const app = list.find((a) => a._id === this.id);
          if (!app) {
            this.error.set('Application not found.');
            return;
          }
          this.form.patchValue({
            companyName: app.companyName,
            role: app.role,
            type: app.type,
            location: app.location ?? '',
            status: app.status,
            applicationDate: this.toDateInput(app.applicationDate),
            interviewDate: this.toDateInput(app.interviewDate),
            jobLink: app.jobLink ?? '',
            notes: app.notes ?? '',
          });
        },
        error: () => this.error.set('Could not load the application.'),
      });
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.error.set('');

    const v = this.form.getRawValue();
    const payload = {
      ...v,
      applicationDate: v.applicationDate || undefined,
      interviewDate: v.interviewDate || undefined,
    } as Application;

    const request = this.id
      ? this.service.update(this.id, payload)
      : this.service.create(payload);

    request.subscribe({
      next: () => this.router.navigate(['/applications']),
      error: (err) => {
        this.saving.set(false);
        this.error.set(err.error?.message || 'Could not save the application.');
      },
    });
  }

  invalid(name: string): boolean {
    const c = this.form.get(name);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  private today(): string {
    return new Date().toISOString().substring(0, 10);
  }

  private toDateInput(value?: string): string {
    return value ? value.substring(0, 10) : '';
  }
}