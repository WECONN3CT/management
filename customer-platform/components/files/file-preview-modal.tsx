import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { FileAttachment } from '@/lib/types';
import { Download, FileText } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface FilePreviewModalProps {
  file: FileAttachment | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export function FilePreviewModal({ file, isOpen, onClose, onDownload }: FilePreviewModalProps) {
  if (!file) return null;

  const isImage = file.mimeType.startsWith('image/');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="line-clamp-1">{file.filename}</span>
            <Button variant="outline" size="sm" onClick={onDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Preview Area */}
          <div className="rounded-lg border bg-muted/30 p-8 flex items-center justify-center min-h-[300px]">
            {isImage ? (
              <div className="text-center">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  Image preview coming in Phase 2
                </p>
              </div>
            ) : (
              <div className="text-center">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  Preview not available for this file type
                </p>
              </div>
            )}
          </div>

          {/* File Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Size</p>
              <p className="font-medium">{(file.fileSize / 1024).toFixed(1)} KB</p>
            </div>
            <div>
              <p className="text-muted-foreground">Type</p>
              <p className="font-medium">{file.mimeType}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Uploaded by</p>
              <p className="font-medium">{file.uploadedBy}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Upload date</p>
              <p className="font-medium">{formatDate(file.uploadedAt)}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
