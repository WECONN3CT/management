export type UserRole = 'ceo' | 'developer' | 'customer_manager' | 'marketing';
export type CustomerStatus = 'active' | 'completed' | 'on_hold';
export type ProjectType = 'website' | 'app' | 'software' | 'marketing';
export type ProjectStatus = 'planning' | 'in_development' | 'review' | 'completed' | 'archived' | 'on_hold';
export type StoryStatus = 'backlog' | 'ready' | 'in_development' | 'review' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  status: CustomerStatus;
  notes?: string;
  createdAt: string;
  lastContact?: string;
}

export interface Project {
  id: string;
  customerId: string;
  title: string;
  description?: string;
  type: ProjectType;
  status: ProjectStatus;
  progress: number; // 0-100
  deadline?: string;
  assignee: string;
  createdAt: string;
  updatedAt: string;
}

export interface Story {
  id: string; // e.g., "1.1", "1.2"
  projectId: string;
  title: string;
  description: string;
  status: StoryStatus;
  priority: Priority;
  assignee: string;
  deadline?: string;
  acceptanceCriteria: string[];
  devNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FileAttachment {
  id: string;
  projectId?: string;
  storyId?: string;
  filename: string;
  fileSize: number; // in bytes
  mimeType: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface Comment {
  id: string;
  storyId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'deadline' | 'meeting' | 'milestone';
  projectId?: string;
  description?: string;
}
