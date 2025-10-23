import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { FileAttachment } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Download, Eye } from 'lucide-react';

interface FileTableProps {
  files: FileAttachment[];
  onPreview: (file: FileAttachment) => void;
  onDownload: (file: FileAttachment) => void;
}

export function FileTable({ files, onPreview, onDownload }: FileTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Uploaded By</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map(file => (
            <TableRow key={file.id}>
              <TableCell className="font-medium">{file.filename}</TableCell>
              <TableCell>{(file.fileSize / 1024).toFixed(1)} KB</TableCell>
              <TableCell className="text-muted-foreground">
                {file.mimeType.split('/')[1]}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {file.uploadedBy}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(file.uploadedAt)}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPreview(file)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDownload(file)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
