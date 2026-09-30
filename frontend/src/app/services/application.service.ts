import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../models/application.model';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private http = inject(HttpClient);
private apiUrl = 'https://job-internship-application-tracker.onrender.com/api/applications';

  getAll(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl);
  }

  create(app: Application): Observable<Application> {
    return this.http.post<Application>(this.apiUrl, app);
  }

  update(id: string, app: Application): Observable<Application> {
    return this.http.put<Application>(`${this.apiUrl}/${id}`, app);
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}