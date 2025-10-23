'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  MOCK_DATA,
  getCommentsByStoryId,
  getFilesByStoryId,
  getProjectsByCustomerId,
} from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Send, Paperclip, CheckCircle2, Calendar, User } from 'lucide-react';
import { formatDateTime, formatDate } from '@/lib/utils';
import type { StoryStatus, Priority } from '@/lib/types';

const statusLabels = {
  backlog: 'Backlog',
  ready: 'Ready',
  in_development: 'In Development',
  review: 'Review',
  done: 'Done',
};

const priorityVariants = {
  low: 'secondary',
  medium: 'warning',
  high: 'destructive',
} as const;

export default function StoryDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const story = MOCK_DATA.stories.find(s => s.id === params.id);
  const [newComment, setNewComment] = useState('');
  const [checkedCriteria, setCheckedCriteria] = useState<number[]>([]);

  if (!story) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-bold">Story not found</h1>
        <Button onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  const project = MOCK_DATA.projects.find(p => p.id === story.projectId);
  const comments = getCommentsByStoryId(story.id);
  const files = getFilesByStoryId(story.id);

  const handleStatusChange = (newStatus: StoryStatus) => {
    // Phase 1: Visual only
    alert(`Status changed to ${statusLabels[newStatus]} (Phase 1: Not persisted)`);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    // Phase 1: Visual only
    alert(`Comment added! (Phase 1: Not persisted)\n\n${newComment}`);
    setNewComment('');
  };

  const toggleCriteria = (index: number) => {
    setCheckedCriteria(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-muted-foreground">
                {story.id}
              </span>
              <h1 className="text-3xl font-bold">{story.title}</h1>
            </div>
            {project && (
              <p className="text-sm text-muted-foreground mt-1">
                Project: {project.title}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Story Info Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Story Information</CardTitle>
                <div className="flex gap-2">
                  <Badge variant={priorityVariants[story.priority]}>
                    {story.priority} priority
                  </Badge>
                  <Badge>{statusLabels[story.status]}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {story.description}
                </p>
              </div>

              <Separator />

              {/* Acceptance Criteria */}
              <div>
                <h3 className="font-semibold mb-3">Acceptance Criteria</h3>
                <div className="space-y-2">
                  {story.acceptanceCriteria.map((criteria, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Checkbox
                        id={`criteria-${index}`}
                        checked={checkedCriteria.includes(index)}
                        onCheckedChange={() => toggleCriteria(index)}
                        className="mt-1"
                      />
                      <label
                        htmlFor={`criteria-${index}`}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {criteria}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dev Notes */}
              {story.devNotes && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-2">Developer Notes</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {story.devNotes}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle>Comments ({comments.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Comments List */}
              {comments.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No comments yet
                </p>
              ) : (
                <div className="space-y-4">
                  {comments.map(comment => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium shrink-0">
                        {comment.userName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {comment.userName}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDateTime(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Separator />

              {/* Add Comment Form */}
              <div className="space-y-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Add Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Attachments */}
          {files.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Paperclip className="h-5 w-5" />
                  Attachments ({files.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {files.map(file => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <Paperclip className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{file.filename}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.fileSize / 1024).toFixed(1)} KB • {file.uploadedBy}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Priority */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Status & Priority</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={story.status}
                  onValueChange={(value) => handleStatusChange(value as StoryStatus)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Badge variant={priorityVariants[story.priority]} className="w-full justify-center">
                  {story.priority}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Assignee:</span>
                <span className="font-medium">{story.assignee}</span>
              </div>

              {story.deadline && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Deadline:</span>
                  <span className="font-medium">{formatDate(story.deadline)}</span>
                </div>
              )}

              <Separator />

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Created</p>
                <p className="font-medium">{formatDate(story.createdAt)}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Last Updated</p>
                <p className="font-medium">{formatDate(story.updatedAt)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Activity Log */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">Story created</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDateTime(story.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">Status updated</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDateTime(story.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
