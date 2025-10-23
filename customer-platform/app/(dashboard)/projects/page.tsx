'use client';

import { useState } from 'react';
import { MOCK_DATA, searchProjects, getCustomerById } from '@/lib/mock-data';
import type { ProjectStatus, ProjectType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { ProjectCard } from '@/components/projects/project-card';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<ProjectType | 'all'>('all');

  // Filter projects
  let filteredProjects = searchQuery
    ? searchProjects(searchQuery)
    : MOCK_DATA.projects;

  if (statusFilter !== 'all') {
    filteredProjects = filteredProjects.filter(p => p.status === statusFilter);
  }

  if (typeFilter !== 'all') {
    filteredProjects = filteredProjects.filter(p => p.type === typeFilter);
  }

  const statusCounts = {
    all: MOCK_DATA.projects.length,
    planning: MOCK_DATA.projects.filter(p => p.status === 'planning').length,
    in_development: MOCK_DATA.projects.filter(p => p.status === 'in_development').length,
    review: MOCK_DATA.projects.filter(p => p.status === 'review').length,
    completed: MOCK_DATA.projects.filter(p => p.status === 'completed').length,
  };

  const typeCounts = {
    all: MOCK_DATA.projects.length,
    website: MOCK_DATA.projects.filter(p => p.type === 'website').length,
    app: MOCK_DATA.projects.filter(p => p.type === 'app').length,
    software: MOCK_DATA.projects.filter(p => p.type === 'software').length,
    marketing: MOCK_DATA.projects.filter(p => p.type === 'marketing').length,
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header - Responsive stack on mobile */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Projekte</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-0.5">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button
          onClick={() => alert('New project wizard in Story 5.3!')}
          className="w-full sm:w-auto min-h-touch"
        >
          <Plus className="mr-2 h-4 w-4" />
          Neues Projekt
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="space-y-3 sm:space-y-4">
        {/* Search */}
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:max-w-sm min-h-touch"
        />

        {/* Status Filters */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Status</p>
          <div className="flex flex-wrap gap-2">
            {(['all', 'planning', 'in_development', 'review', 'completed'] as const).map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className="min-h-touch"
              >
                {status === 'all' ? 'All' : status === 'in_development' ? 'In Development' : status.charAt(0).toUpperCase() + status.slice(1)}
                <span className="ml-1 text-xs opacity-60">
                  ({statusCounts[status]})
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Type Filters */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Type</p>
          <div className="flex flex-wrap gap-2">
            {(['all', 'website', 'app', 'software', 'marketing'] as const).map((type) => (
              <Button
                key={type}
                variant={typeFilter === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter(type)}
                className="min-h-touch"
              >
                {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                <span className="ml-1 text-xs opacity-60">
                  ({typeCounts[type]})
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Project Grid */}
      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-medium">No projects found</p>
          <p className="text-sm text-muted-foreground mt-1">
            {searchQuery ? 'Try adjusting your search' : 'Get started by creating a project'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
