export type UserRole = 'ceo' | 'developer' | 'customer_manager' | 'marketing';
export type CustomerStatus = 'active' | 'completed' | 'on_hold';
export type ProjectType = 'website' | 'app' | 'software' | 'marketing';
export type ProjectStatus = 'planning' | 'in_development' | 'review' | 'completed' | 'archived' | 'on_hold';
export type StoryStatus = 'backlog' | 'ready' | 'in_development' | 'review' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  status: CustomerStatus;
  notes?: string;
  projectCount?: number;
  lastContact?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  customerId: string;
  title: string;
  description?: string;
  type: ProjectType;
  status: ProjectStatus;
  progress: number;
  deadline?: string;
  prdContent?: any;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Story {
  id: string;
  projectId: string;
  storyNumber: string;
  title: string;
  description: string;
  status: StoryStatus;
  priority: Priority;
  assigneeId?: string;
  deadline?: string;
  acceptanceCriteria: string[];
  devNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface File {
  id: string;
  projectId: string;
  storyId?: string;
  filename: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  uploadedBy: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  storyId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'deadline' | 'meeting' | 'milestone';
  projectId?: string;
  description?: string;
}
