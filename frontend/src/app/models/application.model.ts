export type AppType = 'Internship' | 'Full-time';
export type AppStatus = 'Saved' | 'Applied' | 'Assessment' | 'Interview' | 'Selected' | 'Rejected';

export interface Application {
  _id?: string;
  companyName: string;
  role: string;
  type: AppType;
  location?: string;
  status: AppStatus;
  applicationDate?: string;
  interviewDate?: string;
  jobLink?: string;
  notes?: string;
}