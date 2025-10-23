import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { FileAttachment } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { FileText, Image, FileCode, Download, Eye } from 'lucide-react';

interface FileCardProps {
  file: FileAttachment;
  onPreview: () => void;
  onDownload: () => void;
}

const getFileIcon = (mimeType: string) => {
  if (mimeType.startsWith('image/')) return Image;
  if (mimeType.includes('pdf') || mimeType.includes('document')) return FileText;
  return FileCode;
};

const getFileColor = (mimeType: string) => {
  if (mimeType.startsWith('image/')) return 'text-blue-500';
  if (mimeType.includes('pdf')) return 'text-red-500';
  if (mimeType.includes('document')) return 'text-indigo-500';
  return 'text-gray-500';
};

export function FileCard({ file, onPreview, onDownload }: FileCardProps) {
  const Icon = getFileIcon(file.mimeType);
  const colorClass = getFileColor(file.mimeType);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 space-y-3">
        {/* File Icon */}
        <div className="flex justify-center py-6">
          <Icon className={`h-16 w-16 ${colorClass}`} />
        </div>

        {/* File Name */}
        <div>
          <p className="font-medium text-sm line-clamp-2" title={file.filename}>
            {file.filename}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {(file.fileSize / 1024).toFixed(1)} KB
          </p>
        </div>

        {/* Metadata */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>Uploaded by {file.uploadedBy}</p>
          <p>{formatDate(file.uploadedAt)}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onPreview}
          >
            <Eye className="h-3 w-3 mr-1" />
            Preview
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onDownload}
          >
            <Download className="h-3 w-3 mr-1" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
