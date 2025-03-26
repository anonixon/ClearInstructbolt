import React, { useState } from 'react';
import { Upload, X, Loader2, CheckCircle, AlertCircle, XCircle, RefreshCw, FileText } from 'lucide-react';
import FilePreviewModal from './FilePreviewModal';

export interface FileUploadProgress {
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error' | 'cancelled';
  error?: string;
  intervalId?: NodeJS.Timeout;
  retryCount?: number;
}

export interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  onFileComplete: (file: File, url: string) => void;
  onFileRemove: (index: number) => void;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  onFileComplete,
  onFileRemove,
  attachments = [],
  accept = '.pdf,.doc,.docx',
  maxSize = 10,
  className = ''
}) => {
  const [uploadProgress, setUploadProgress] = useState<FileUploadProgress[]>([]);
  const [previewFile, setPreviewFile] = useState<{ name: string; url: string; type: string } | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    // Filter files by type and size
    const validFiles = files.filter(file => {
      const isValidType = accept.split(',').some(type => 
        file.type.includes(type.replace('.', ''))
      );
      const isValidSize = file.size <= maxSize * 1024 * 1024;
      
      if (!isValidType) {
        setUploadProgress(prev => [...prev, {
          file,
          progress: 0,
          status: 'error',
          error: `Invalid file type. Only ${accept} files are allowed.`
        }]);
        return false;
      }
      
      if (!isValidSize) {
        setUploadProgress(prev => [...prev, {
          file,
          progress: 0,
          status: 'error',
          error: `File too large. Maximum size is ${maxSize}MB.`
        }]);
        return false;
      }
      
      return true;
    });

    // Initialize progress tracking for valid files
    setUploadProgress(prev => [
      ...prev,
      ...validFiles.map(file => ({
        file,
        progress: 0,
        status: 'uploading' as const,
        retryCount: 0
      }))
    ]);

    // Simulate file upload with progress
    validFiles.forEach((file, index) => {
      simulateFileUpload(file, index);
    });

    onFileUpload(validFiles);
  };

  const simulateFileUpload = (file: File, index: number) => {
    let progress = 0;
    const intervalId = setInterval(() => {
      progress += 10;
      setUploadProgress(prev => 
        prev.map((p, i) => 
          i === index 
            ? { ...p, progress: Math.min(progress, 100) }
            : p
        )
      );

      if (progress >= 100) {
        clearInterval(intervalId);
        setUploadProgress(prev =>
          prev.map((p, i) =>
            i === index
              ? { ...p, status: 'completed' as const }
              : p
          )
        );

        // Add file to attachments after upload completes
        const url = URL.createObjectURL(file);
        onFileComplete(file, url);

        // Remove progress indicator after 2 seconds
        setTimeout(() => {
          setUploadProgress(prev => prev.filter((_, i) => i !== index));
        }, 2000);
      }
    }, 200);

    // Store interval ID for cancellation
    setUploadProgress(prev => 
      prev.map((p, i) => 
        i === index 
          ? { ...p, intervalId }
          : p
      )
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFiles(Array.from(files));
    }
  };

  const handleCancelUpload = (index: number) => {
    setUploadProgress(prev => {
      const upload = prev[index];
      if (upload.intervalId) {
        clearInterval(upload.intervalId);
      }
      return prev.map((p, i) =>
        i === index
          ? { ...p, status: 'cancelled' as const }
          : p
      );
    });

    // Remove cancelled upload after 2 seconds
    setTimeout(() => {
      setUploadProgress(prev => prev.filter((_, i) => i !== index));
    }, 2000);
  };

  const handleRetryUpload = (index: number) => {
    setUploadProgress(prev => {
      const upload = prev[index];
      return prev.map((p, i) =>
        i === index
          ? {
              ...p,
              status: 'uploading' as const,
              progress: 0,
              error: undefined,
              retryCount: (p.retryCount || 0) + 1
            }
          : p
      );
    });

    // Start the upload simulation again
    simulateFileUpload(uploadProgress[index].file, index);
  };

  const handlePreviewFile = (attachment: { name: string; url: string; type: string }) => {
    setPreviewFile(attachment);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Show existing attachments */}
      {attachments.map((attachment, index) => (
        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-gray-400" />
            <button
              onClick={() => handlePreviewFile(attachment)}
              className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {attachment.name}
            </button>
          </div>
          <button
            onClick={() => onFileRemove(index)}
            className="text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}

      {/* Show upload progress indicators */}
      {uploadProgress.map((upload, index) => (
        <div key={index} className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {upload.status === 'uploading' && (
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
              )}
              {upload.status === 'completed' && (
                <CheckCircle className="w-4 h-4 text-green-500" />
              )}
              {upload.status === 'error' && (
                <AlertCircle className="w-4 h-4 text-red-500" />
              )}
              {upload.status === 'cancelled' && (
                <XCircle className="w-4 h-4 text-gray-500" />
              )}
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {upload.file.name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {upload.progress}%
              </span>
              {upload.status === 'uploading' && (
                <button
                  onClick={() => handleCancelUpload(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              {upload.status === 'error' && (
                <button
                  onClick={() => handleRetryUpload(index)}
                  className="text-blue-600 hover:text-blue-700"
                  title="Retry upload"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                upload.status === 'error' ? 'bg-red-600' :
                upload.status === 'cancelled' ? 'bg-gray-600' :
                'bg-blue-600'
              }`}
              style={{ width: `${upload.progress}%` }}
            />
          </div>
          {upload.status === 'error' && upload.error && (
            <div className="mt-1 flex items-center justify-between">
              <p className="text-sm text-red-600 dark:text-red-400">
                {upload.error}
              </p>
              {upload.retryCount && upload.retryCount > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Retry attempt {upload.retryCount}
                </span>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Upload area */}
      <div
        className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="space-y-1 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600 dark:text-gray-400">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <span>Upload files</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileUpload}
                multiple
                accept={accept}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {accept} up to {maxSize}MB
          </p>
        </div>
      </div>

      {/* Add FilePreviewModal */}
      {previewFile && (
        <FilePreviewModal
          isOpen={!!previewFile}
          onClose={() => setPreviewFile(null)}
          file={previewFile}
        />
      )}
    </div>
  );
};

export default FileUpload; 