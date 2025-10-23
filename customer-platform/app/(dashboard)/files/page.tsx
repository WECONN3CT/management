'use client';

import { useState } from 'react';
import { MOCK_DATA } from '@/lib/mock-data';
import type { FileAttachment } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Upload, LayoutGrid, List, Search } from 'lucide-react';
import { FileCard } from '@/components/files/file-card';
import { FileTable } from '@/components/files/file-table';
import { FilePreviewModal } from '@/components/files/file-preview-modal';
import { UploadZone } from '@/components/files/upload-zone';
import { useToast } from '@/hooks/use-toast';

type ViewMode = 'grid' | 'list';

export default function FilesPage() {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [selectedFile, setSelectedFile] = useState<FileAttachment | null>(null);
  const [showUploadZone, setShowUploadZone] = useState(false);

  // Filter files
  let filteredFiles = MOCK_DATA.files.filter(file => {
    const matchesSearch = file.filename.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProject = projectFilter === 'all' || file.projectId === projectFilter;
    return matchesSearch && matchesProject;
  });

  const handleDownload = (file: FileAttachment) => {
    toast({
      title: 'Download started',
      description: `Downloading ${file.filename} (Phase 1: Visual only)`,
    });
  };

  const handleUpload = (files: File[]) => {
    toast({
      title: 'Files uploaded',
      description: `${files.length} file(s) uploaded successfully (Phase 1: Visual only)`,
    });
    setShowUploadZone(false);
  };

  // Get unique projects for filter
  const projects = [
    { id: 'all', name: 'All Projects' },
    ...MOCK_DATA.projects.map(p => ({ id: p.id, name: p.title }))
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Files & Documents</h1>
          <p className="text-muted-foreground">
            {filteredFiles.length} file{filteredFiles.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={() => setShowUploadZone(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Files
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:flex-initial sm:w-64">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>

          {/* Project Filter */}
          <Select value={projectFilter} onValueChange={setProjectFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map(project => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* View Toggle */}
        <div className="flex gap-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* File List */}
      {filteredFiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-medium">No files found</p>
          <p className="text-sm text-muted-foreground mt-1">
            {searchQuery ? 'Try adjusting your search' : 'Upload your first file'}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredFiles.map(file => (
            <FileCard
              key={file.id}
              file={file}
              onPreview={() => setSelectedFile(file)}
              onDownload={() => handleDownload(file)}
            />
          ))}
        </div>
      ) : (
        <FileTable
          files={filteredFiles}
          onPreview={(file) => setSelectedFile(file)}
          onDownload={(file) => handleDownload(file)}
        />
      )}

      {/* Upload Zone Modal */}
      {showUploadZone && (
        <UploadZone
          onUpload={handleUpload}
          onClose={() => setShowUploadZone(false)}
        />
      )}

      {/* File Preview Modal */}
      <FilePreviewModal
        file={selectedFile}
        isOpen={!!selectedFile}
        onClose={() => setSelectedFile(null)}
        onDownload={() => selectedFile && handleDownload(selectedFile)}
      />
    </div>
  );
}
