import React, { useState, useRef } from 'react';
import { Calendar, FileText, Filter, Plus, Search, Upload, X, Trash2, Archive, Send, CheckSquare, Square, Loader2, CheckCircle, AlertCircle, XCircle, RefreshCw } from 'lucide-react';
import FileUpload from '../../shared/FileUpload';
import FilePreviewModal from '../../shared/FilePreviewModal';
import { useRealtimeData } from '../../../hooks/useRealtimeData';
import { supabase } from '../../../lib/supabase';
import { Database } from '../../../lib/database.types';

interface HomeworkFilters {
  subject: string[];
  grade: string[];
  status: ('draft' | 'published' | 'archived' | 'completed')[];
  dateRange: {
    start: string;
    end: string;
  };
  searchQuery: string;
}

interface AssignmentTemplate {
  id: string;
  title: string;
  description: string;
  subject: string;
  grade: string;
  due_date: string;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
  created_at: string;
  updated_at: string;
}

interface UploadProgress {
  progress: number;
  status: 'uploading' | 'completed' | 'error' | 'cancelled';
  error?: string;
}

type Assignment = Database['public']['Tables']['assignments']['Row'];

const Homework = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showNewAssignment, setShowNewAssignment] = useState(false);
  const [showEditAssignment, setShowEditAssignment] = useState(false);
  const [selectedAssignments, setSelectedAssignments] = useState<string[]>([]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, UploadProgress>>({});
  const [filters, setFilters] = useState<HomeworkFilters>({
    subject: [],
    grade: [],
    status: [],
    dateRange: {
      start: '',
      end: ''
    },
    searchQuery: ''
  });

  // Use real-time data hook for assignments
  const { data: assignments, loading: assignmentsLoading, error: assignmentsError, refresh: refreshAssignments } = useRealtimeData({
    table: 'assignments',
    filter: `subject.in.(${filters.subject.join(',')}),grade.in.(${filters.grade.join(',')}),status.in.(${filters.status.join(',')})${filters.dateRange.start ? `,due_date.gte.${filters.dateRange.start}` : ''}${filters.dateRange.end ? `,due_date.lte.${filters.dateRange.end}` : ''}${filters.searchQuery ? `,or(title.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%,subject.ilike.%${filters.searchQuery}%,teacher.ilike.%${filters.searchQuery}%,grade.ilike.%${filters.searchQuery}%)` : ''}`,
    pageSize: 50
  });

  // Use real-time data hook for templates
  const { data: templates, loading: templatesLoading, error: templatesError, refresh: refreshTemplates } = useRealtimeData({
    table: 'assignments',
    filter: 'status.eq.draft',
    pageSize: 20
  });

  const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({
    title: '',
    description: '',
    subject: '',
    grade: '',
    due_date: '',
    status: 'draft',
    attachments: []
  });

  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [previewFile, setPreviewFile] = useState<{ name: string; url: string; type: string } | null>(null);

  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Physics', 'Chemistry', 'Biology'];
  const grades = ['9', '10', '11', '12'];
  const teachers = ['Mrs. Smith', 'Mr. Johnson', 'Mrs. Wilson', 'Mr. Brown'];

  const handleFilterChange = (key: keyof HomeworkFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      subject: [],
      grade: [],
      status: [],
      dateRange: {
        start: '',
        end: ''
      },
      searchQuery: ''
    });
  };

  const handleCreateAssignment = async () => {
    if (newAssignment.title && newAssignment.description && newAssignment.subject && newAssignment.grade && newAssignment.due_date) {
      try {
        const { data, error } = await supabase
          .from('assignments')
          .insert([{
            title: newAssignment.title,
            description: newAssignment.description,
            subject: newAssignment.subject,
            grade: newAssignment.grade,
            due_date: newAssignment.due_date,
            status: 'draft',
            teacher: 'Admin User',
            attachments: newAssignment.attachments || []
          }])
          .select()
          .single();

        if (error) throw error;

        setShowNewAssignment(false);
        setNewAssignment({
          title: '',
          description: '',
          subject: '',
          grade: '',
          due_date: '',
          status: 'draft',
          attachments: []
        });
      } catch (error) {
        console.error('Error creating assignment:', error);
        // Handle error (show notification, etc.)
      }
    }
  };

  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'published':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'draft':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'archived':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const handleEditAssignment = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setShowEditAssignment(true);
  };

  const handleUpdateAssignment = async () => {
    if (editingAssignment) {
      try {
        const { error } = await supabase
          .from('assignments')
          .update({
            title: editingAssignment.title,
            description: editingAssignment.description,
            subject: editingAssignment.subject,
            grade: editingAssignment.grade,
            due_date: editingAssignment.due_date,
            status: editingAssignment.status,
            attachments: editingAssignment.attachments
          })
          .eq('id', editingAssignment.id);

        if (error) throw error;

        setShowEditAssignment(false);
        setEditingAssignment(null);
      } catch (error) {
        console.error('Error updating assignment:', error);
        // Handle error (show notification, etc.)
      }
    }
  };

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
    const validFiles = files.filter(file => {
      const isValidType = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      
      if (!isValidType) {
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: { progress: 0, status: 'error', error: 'Invalid file type. Only PDF, DOC, and DOCX files are allowed.' }
        }));
        return false;
      }
      
      if (!isValidSize) {
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: { progress: 0, status: 'error', error: 'File too large. Maximum size is 10MB.' }
        }));
        return false;
      }
      
      return true;
    });

    validFiles.forEach(file => {
      handleFileUpload([file]);
    });
  };

  const handleFileUpload = (files: File[]) => {
    files.forEach(file => {
      const filePath = `${editingAssignment?.id || 'new'}/${Math.random().toString(36).substring(7)}_${file.name}`;
      
      // Initialize upload progress
      setUploadProgress(prev => ({
        ...prev,
        [file.name]: { progress: 0, status: 'uploading' }
      }));

      // Upload file to Supabase storage
      supabase.storage.from('assignments').upload(filePath, file)
        .then(async ({ error: uploadError }) => {
          if (uploadError) throw uploadError;

          // Get public URL
          const { data: { publicUrl } } = supabase.storage.from('assignments').getPublicUrl(filePath);

          // Create new attachment
          const newAttachment = {
            name: file.name,
            url: publicUrl,
            type: file.type.split('/')[1]
          };

          // Add to either editing or new assignment
          if (editingAssignment) {
            setEditingAssignment({
              ...editingAssignment,
              attachments: [...(editingAssignment.attachments || []), newAttachment]
            });
          } else {
            setNewAssignment({
              ...newAssignment,
              attachments: [...(newAssignment.attachments || []), newAttachment]
            });
          }

          // Update progress to completed
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: { progress: 100, status: 'completed' }
          }));

          // Remove progress after 2 seconds
          setTimeout(() => {
            setUploadProgress(prev => {
              const { [file.name]: _, ...rest } = prev;
              return rest;
            });
          }, 2000);
        })
        .catch(error => {
          console.error('Error uploading file:', error);
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: { progress: 0, status: 'error', error: 'Failed to upload file' }
          }));
        });
    });
  };

  const handleFileComplete = (file: File, url: string) => {
    const newAttachment = {
      name: file.name,
      url,
      type: file.type.split('/')[1]
    };

    if (editingAssignment) {
      setEditingAssignment({
        ...editingAssignment,
        attachments: [...(editingAssignment.attachments || []), newAttachment]
      });
    } else {
      setNewAssignment({
        ...newAssignment,
        attachments: [...(newAssignment.attachments || []), newAttachment]
      });
    }
  };

  const handleFileRemove = (index: number) => {
    if (editingAssignment) {
      setEditingAssignment({
        ...editingAssignment,
        attachments: editingAssignment.attachments?.filter((_, i) => i !== index) || []
      });
    } else {
      setNewAssignment({
        ...newAssignment,
        attachments: newAssignment.attachments?.filter((_, i) => i !== index) || []
      });
    }
  };

  const handlePreviewFile = (attachment: { name: string; url: string; type: string }) => {
    setPreviewFile(attachment);
  };

  const handleClosePreview = () => {
    setPreviewFile(null);
  };

  const handleBulkAction = async (action: 'delete' | 'archive' | 'publish') => {
    if (selectedAssignments.length === 0) return;

    try {
      const updates = selectedAssignments.map(id => ({
        id,
        status: action === 'delete' ? 'deleted' : action === 'archive' ? 'archived' : 'published'
      }));

      const { error } = await supabase
        .from('assignments')
        .upsert(updates);

      if (error) throw error;

      setSelectedAssignments([]);
      refreshAssignments();
    } catch (error) {
      console.error('Error performing bulk action:', error);
      // Handle error (show notification, etc.)
    }
  };

  const handleUseTemplate = async (template: AssignmentTemplate) => {
    try {
      const { error } = await supabase
        .from('assignments')
        .insert([{
          title: template.title,
          description: template.description,
          subject: template.subject,
          grade: template.grade,
          due_date: template.due_date,
          status: 'draft',
          teacher: 'Admin User',
          attachments: template.attachments || []
        }]);

      if (error) throw error;

      setShowTemplates(false);
      refreshTemplates();
    } catch (error) {
      console.error('Error creating template:', error);
      // Handle error (show notification, etc.)
    }
  };

  const handleDeleteTemplate = async (templateId: string) => {
    try {
      const { error } = await supabase
        .from('assignments')
        .delete()
        .eq('id', templateId);

      if (error) throw error;

      refreshTemplates();
    } catch (error) {
      console.error('Error deleting template:', error);
      // Handle error (show notification, etc.)
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Homework Management</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage and monitor homework assignments across the school
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowFilters(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button
            onClick={() => setShowNewAssignment(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Assignment
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-50 z-50">
          <div className="fixed inset-y-0 right-0 max-w-xl w-full bg-white dark:bg-gray-800 shadow-xl">
            <div className="h-full flex flex-col">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filter Assignments</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                {/* Subject Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subjects
                  </label>
                  <div className="space-y-2">
                    {subjects.map(subject => (
                      <label key={subject} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.subject.includes(subject)}
                          onChange={(e) => {
                            const newSubjects = e.target.checked
                              ? [...filters.subject, subject]
                              : filters.subject.filter(s => s !== subject);
                            handleFilterChange('subject', newSubjects);
                          }}
                          className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Grade Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Grades
                  </label>
                  <div className="space-y-2">
                    {grades.map(grade => (
                      <label key={grade} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.grade.includes(grade)}
                          onChange={(e) => {
                            const newGrades = e.target.checked
                              ? [...filters.grade, grade]
                              : filters.grade.filter(g => g !== grade);
                            handleFilterChange('grade', newGrades);
                          }}
                          className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Grade {grade}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <div className="space-y-2">
                    {['draft', 'published', 'archived', 'completed'].map(status => (
                      <label key={status} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.status.includes(status as "draft" | "published" | "archived" | "completed")}
                          onChange={(e) => {
                            const newStatuses = e.target.checked
                              ? [...filters.status, status as "draft" | "published" | "archived" | "completed"]
                              : filters.status.filter(s => s !== status);
                            handleFilterChange('status', newStatuses);
                          }}
                          className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Date Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date Range
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      value={filters.dateRange.start}
                      onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })}
                      className="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    <input
                      type="date"
                      value={filters.dateRange.end}
                      onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, end: e.target.value })}
                      className="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                {/* Search Query */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Search
                  </label>
                  <input
                    type="text"
                    value={filters.searchQuery}
                    onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                    placeholder="Search in title, description, or subject..."
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assignments List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Assignments</h3>
            {selectedAssignments.length > 0 && (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleBulkAction('publish')}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-xs font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <Send className="w-3 h-3 mr-1" />
                  Publish
                </button>
                <button
                  onClick={() => handleBulkAction('archive')}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-xs font-medium text-white bg-yellow-600 hover:bg-yellow-700"
                >
                  <Archive className="w-3 h-3 mr-1" />
                  Archive
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-xs font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {assignments?.map((assignment) => (
            <div key={assignment.id} className="px-6 py-4">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedAssignments.includes(assignment.id)}
                  onChange={(e) => {
                    setSelectedAssignments(prev =>
                      e.target.checked
                        ? [...prev, assignment.id]
                        : prev.filter(id => id !== assignment.id)
                    );
                  }}
                  className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-blue-500 mr-2" />
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {assignment.title}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {assignment.subject} • Grade {assignment.grade} • {assignment.teacher}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                        {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {assignment.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        Due: {new Date(assignment.due_date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FileText className="w-4 h-4 mr-1" />
                        Created: {new Date(assignment.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {assignment.attachments && assignment.attachments.map((attachment, index) => (
                        <button
                          key={index}
                          onClick={() => handlePreviewFile(attachment)}
                          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          {attachment.name}
                        </button>
                      ))}
                      <button
                        onClick={() => handleEditAssignment(assignment)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-xs font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Assignment Modal */}
      {showNewAssignment && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-50 z-50">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">New Assignment</h3>
                <button
                  onClick={() => setShowNewAssignment(false)}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <textarea
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Subject
                    </label>
                    <select
                      value={newAssignment.subject}
                      onChange={(e) => setNewAssignment({ ...newAssignment, subject: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select a subject</option>
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Grade
                    </label>
                    <select
                      value={newAssignment.grade}
                      onChange={(e) => setNewAssignment({ ...newAssignment, grade: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select a grade</option>
                      {grades.map(grade => (
                        <option key={grade} value={grade}>Grade {grade}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newAssignment.due_date}
                    onChange={(e) => setNewAssignment({ ...newAssignment, due_date: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Attachments
                  </label>
                  <FileUpload
                    onFileUpload={handleFiles}
                    onFileComplete={handleFileComplete}
                    onFileRemove={handleFileRemove}
                    attachments={newAssignment.attachments || []}
                    accept=".pdf,.doc,.docx"
                    maxSize={10}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowNewAssignment(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateAssignment}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create Assignment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Assignment Modal */}
      {showEditAssignment && editingAssignment && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-50 z-50">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Edit Assignment</h3>
                <button
                  onClick={() => {
                    setShowEditAssignment(false);
                    setEditingAssignment(null);
                  }}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editingAssignment.title}
                    onChange={(e) => setEditingAssignment({ ...editingAssignment, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <textarea
                    value={editingAssignment.description}
                    onChange={(e) => setEditingAssignment({ ...editingAssignment, description: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Subject
                    </label>
                    <select
                      value={editingAssignment.subject}
                      onChange={(e) => setEditingAssignment({ ...editingAssignment, subject: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Grade
                    </label>
                    <select
                      value={editingAssignment.grade}
                      onChange={(e) => setEditingAssignment({ ...editingAssignment, grade: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      {grades.map(grade => (
                        <option key={grade} value={grade}>Grade {grade}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={editingAssignment.due_date}
                    onChange={(e) => setEditingAssignment({ ...editingAssignment, due_date: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </label>
                  <select
                    value={editingAssignment.status}
                    onChange={(e) => setEditingAssignment({ ...editingAssignment, status: e.target.value as Assignment['status'] })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Attachments
                  </label>
                  <FileUpload
                    onFileUpload={handleFiles}
                    onFileComplete={handleFileComplete}
                    onFileRemove={handleFileRemove}
                    attachments={editingAssignment.attachments || []}
                    accept=".pdf,.doc,.docx"
                    maxSize={10}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowEditAssignment(false);
                    setEditingAssignment(null);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateAssignment}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Templates Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-50 z-50">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Assignment Templates</h3>
                <button
                  onClick={() => setShowTemplates(false)}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {templates?.map((template) => (
                  <div key={template.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {template.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {template.subject} • Grade {template.grade}
                        </p>
                      </div>
                      <button
                        onClick={() => handleUseTemplate(template)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-xs font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Use Template
                      </button>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Description:</span> {template.description}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        <span className="font-medium">Due Date:</span> {new Date(template.due_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowTemplates(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* File Preview Modal */}
      {previewFile && (
        <FilePreviewModal
          isOpen={!!previewFile}
          onClose={handleClosePreview}
          file={previewFile}
        />
      )}
    </div>
  );
};

export default Homework; 