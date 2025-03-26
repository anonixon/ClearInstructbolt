import React from 'react';
import { X, Download, FileText, Image } from 'lucide-react';

interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: {
    name: string;
    url: string;
    type: string;
  };
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  isOpen,
  onClose,
  file
}) => {
  if (!isOpen) return null;

  const isImage = file.type.startsWith('image/');
  const isPDF = file.type === 'application/pdf';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            {isImage ? (
              <Image className="w-5 h-5 text-blue-500" />
            ) : (
              <FileText className="w-5 h-5 text-blue-500" />
            )}
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {file.name}
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <a
              href={file.url}
              download={file.name}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Download className="w-4 h-4 mr-1" />
              Download
            </a>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-hidden">
          {isImage ? (
            <div className="h-full flex items-center justify-center p-4">
              <img
                src={file.url}
                alt={file.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ) : isPDF ? (
            <iframe
              src={file.url}
              className="w-full h-full"
              title={file.name}
            />
          ) : (
            <div className="h-full flex items-center justify-center p-4">
              <div className="text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">
                  Preview not available for this file type
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilePreviewModal; 